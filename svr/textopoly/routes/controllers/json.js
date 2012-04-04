exports.section = function(req, res) {

	var xmin = (req.query.xmin ? Number(req.query.xmin) : -40);
	var xmax = (req.query.xmax ? Number(req.query.xmax) : 40);
	var ymin = (req.query.ymin ? Number(req.query.ymin) : -40);
	var ymax = (req.query.ymax ? Number(req.query.ymax) : 40);

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

exports.insert = function(req, res) {
	db.txt.insertTxt(req.body, function(err, aTxt) {
		res.json(aTxt);
		io.sockets.emit('book', aTxt);
	});
}

exports.remove = function(req, res) {
	db.gridfs().unlink('[' + req.query.x + ',' + req.query.y + ']', function(err, gs) {
		console.log("image removed")
	});
	db.txt.removeTxt(req.query, function(err) {
		res.json(err);
		io.sockets.emit('unbook', req.query);
	});
}
