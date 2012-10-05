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

exports.authorpaths = function(req, res) {
	db.path.fromAuth(req.params.a, function(err, paths) {
		res.json({
			a : req.params.a,
			paths : paths
		});
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
		aNP.pw.push([x, y]);
	});
	aNP.pmin = [xmin, ymin];
	aNP.pmax = [xmax, ymax];
	aNP.sp = aNP.pw[0];
	aNP.d = new Date();
	db.path.newPath(aNP, function(err, aRes) {
		res.json(aRes);
	});
};

exports.fa = function(req, res) {
	var x = parseInt(req.params.x, 10), y = parseInt(req.params.y, 10);
	red.single(x, y, function(err, ret) {
		res.json(ret);
	});
};

exports.authors = function(req, res) {
	db.txt.authors(function(err, items) {
		res.json(items);
	});
};

exports.insert = function(req, res) {
	req.body.a = req.user.author;
	db.txt.insertTxt(req.body, function(err, aTxt) {
		io.sockets.emit('book', aTxt);
		var ua = req.header('user-agent');
		if ((/Android/i.test(ua)) || (/Mobile/i.test(ua)) || (/IEMobile/i.test(ua)))
			res.redirect("/m/t/" + aTxt.p[0] + '/' + aTxt.p[1]);
		else
			res.json(aTxt);
	});
};

exports.remove = function(req, res) {
	db.txt.aTxt({
		x : req.params.x,
		y : req.params.y
	}, function(err, item) {
		if ((item.a == req.user.author) || (item.superuser)) {
			db.gridfs().unlink('[' + req.query.x + ',' + req.query.y + ']', function(err, gs) {
			});
			db.gridfs().unlink('s[' + req.query.x + ',' + req.query.y + ']', function(err, gs) {
			});
			var aTxt = req.query;
			normalizePos(aTxt);
			db.txt.removeTxt(aTxt, function(err) {
				res.json(err);
				io.sockets.emit('unbook', aTxt);
			});
		}
	});
};

var RSS = require('rss');

exports.rss = function(req, res) {
	var feed = new RSS({
		title : 'Textopoly',
		description : 'un outil d’écriture en ligne',
		feed_url : 'http://dev.textopoloy.org/rss.xml',
		site_url : 'http://dev.textopoloy.org',
		author : 'La Panacée'
	});
	db.txt.last20(function(err, items) {
		items.forEach(function(txt, idx) {
			feed.item({
				title : txt.p,
				description : txt.t,
				url : 'http://dev.textopoly.org/view?zoom=2&xcenter=' + txt.p[0] + '&ycenter=' + txt.p[1],
				guid : txt._id.toString(),
				author : txt.a,
				date : txt.d
			});
		});
		res.writeHead('200', {
			'Content-Type' : 'application/rss+xml'
		});
		res.end(feed.xml());
	});
};
