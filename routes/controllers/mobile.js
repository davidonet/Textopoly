var models = require('../models/mongodrv');

var range = 16;
var stepX = 120;
var stepY = 80;

function prepareMapData(xcenter, ycenter, zoom, fn) {

	var xmin = xcenter - range;
	var xmax = xcenter + range;
	var ymin = ycenter - range;
	var ymax = ycenter + range;

	var aBoundingBox = [[xmin, ymin], [xmax, ymax]];

	db.txt.boxedTxt(aBoundingBox, function(err, items) {
		items.forEach(function(value, index) {
			value.absx = (value.p[0] - xmin) * stepX;
			value.absy = (value.p[1] - ymin) * stepY;
			var txtlen = 0;
			if (value.t)
				txtlen = value.t.length;
			value.lclass = txtLen2Class(txtlen);
		});
		fn({
			title : 'Textopoly | ' + aBoundingBox,
			params : {
				zoom : zoom,
				xcenter : xcenter,
				ycenter : ycenter,
				xmin : xmin,
				ymin : ymin,
				xmax : xmax,
				ymax : ymax,
				stepx : stepX,
				stepy : stepY
			},
			texts : items,
			width : stepX * range,
			height : stepY * range,
			range : range,
			leftC : xcenter - range / 2,
			rightC : xcenter + range / 2,
			topC : ycenter - range / 2,
			bottomC : ycenter + range / 2
		});
	});
}

exports.w = function(req, res) {
	var xcenter = (req.params.x ? Number(req.params.x) : 0);
	var ycenter = (req.params.y ? Number(req.params.y) : 0);
	var xmin = xcenter - range ;
	var ymin = ycenter - range ;
	red.find(xmin, ymin, 2*range, function(err, ret) {
		res.json(ret);
	});
};

exports.v = function(req, res) {
	var xcenter = (req.params.x ? Number(req.params.x) : 0);
	var ycenter = (req.params.y ? Number(req.params.y) : 0);
	var zoom = 2;
	prepareMapData(xcenter, ycenter, zoom, function(data) {
		res.render('mview.jade', data);
	});
};

exports.t = function(req, res) {
	db.txt.aTxt({
		x : req.params.x,
		y : req.params.y
	}, function(err, items) {
		var lc = (items.t ? txtLen2Class(items.t.length) : 'notext');
		var data = {
			t : items,
			lc : lc
		};
		res.render('mtxt.jade', data);
	});
};

exports.a = function(req, res) {
	db.path.fromAuth(req.params.a, function(err, items) {
		db.txt.authorTxt(req.params.a, function(err, txts) {
			res.render('mauth.jade', {
				title : "Textopoly | Chemins de " + req.params.a,
				a : req.params.a,
				paths : items,
				txts : txts
			});
		});
	});
};
