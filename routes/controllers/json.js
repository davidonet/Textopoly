exports.section = function(req, res) {
	var xmin = (req.query.xmin ? Number(req.query.xmin) : 0);
	var xmax = (req.query.xmax ? Number(req.query.xmax) : 0);
	var ymin = (req.query.ymin ? Number(req.query.ymin) : xmin + 1);
	var ymax = (req.query.ymax ? Number(req.query.ymax) : ymin + 1);

	var aBoundingBox = [[xmin, ymin], [xmax, ymax]];

	db.txt.boxedTxt(aBoundingBox, function(err, items) {
		var response = {
			success : true,
			xmin : xmin,
			ymin : ymin,
			xmax : xmax,
			ymax : ymax,
			texts : items
		};
		res.json(response);
	});
};

exports.atxt = function(req, res) {
	db.txt.aTxt({
		x : req.params.x,
		y : req.params.y
	}, function(err, items) {
		res.json(items);
	});
};

exports.allpath = function(req, res) {
	db.path.allPath(function(err, items) {
		res.json(items);
	});
};

exports.authorboard = function(req, res) {
	db.path.fromAuth(req.params.a, function(err, paths) {
		db.txt.authorTxt(req.params.a, function(err, txts) {
			res.json({
				a : req.params.a,
				paths : paths,
				txts : txts
			});
		});
	});
};

exports.authpath = function(req, res) {
	db.path.fromAuth(req.params.a, function(err, items) {
		res.json(items);
	});
};

exports.path = function(req, res) {
	db.path.expand(req.params.id, function(err, items) {
		res.json(items);
	});
};

exports.newpath = function(req, res) {
	var xmin = 0, ymin = 0, xmax = 0, ymax = 0;
	var aNP = {
		'a' : req.body.a,
		'pw' : []
	};
	req.body.pw.forEach(function(value, index) {
		var x = Number(value.split(',')[0]), y = Number(value.split(',')[1]);
		if (x < xmin)
			xmin = x;
		if (xmax < x)
			xmax = x;
		if (y < ymin)
			ymin = y;
		if (ymax < y)
			ymax = y;
		aNP.pw.push(x + "," + y);
	});
	aNP.pmin = [xmin, ymin];
	aNP.pmax = [xmax, ymax];
	db.path.newPath(aNP, function(err, aRes) {
		res.json(aRes);
	});
};

exports.fa = function(req, res) {
	x = parseInt(req.query.p[0], 10);
	y = parseInt(req.query.p[1], 10);
	red.single(x, y, function(err, ret) {
		res.json(ret);
	});
};

exports.msg = function(req, res) {
	db.txt.aTxt(req.query, function(err, ret) {
		res.json(ret);
	});
};

exports.authors = function(req, res) {
	db.txt.authors(function(err, items) {
		res.json(items);
	});
};

exports.insert = function(req, res) {
	db.txt.insertTxt(req.body, function(err, aTxt) {
		res.json(aTxt);
		io.sockets.emit('book', aTxt);
	});
};

exports.remove = function(req, res) {
	db.gridfs().unlink('[' + req.query.x + ',' + req.query.y + ']', function(err, gs) {
		console.log("image removed");
	});
	var aTxt = req.query;
	normalizePos(aTxt);
	db.txt.removeTxt(aTxt, function(err) {
		res.json(err);
		io.sockets.emit('unbook', aTxt);
	});
};
