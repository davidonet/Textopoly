var models = require('../models/mongodrv');

function prepareMapData(xcenter, ycenter, zoom, fn) {
	var range = 16;
	var stepX = 120;
	var stepY = 80;
	var xmin = xcenter - range;
	var xmax = xcenter + range;
	var ymin = ycenter - range;
	var ymax = ycenter + range;

	function txtLen2Class(txtlen) {
		var lclass = '';
		if (txtlen < 1) {
			lclass = 'l0';
		} else if (txtlen < 4) {
			lclass = 'l4';
		} else if (txtlen < 15) {
			lclass = 'l15';
		} else if (txtlen < 50) {
			lclass = 'l50';
		} else if (txtlen < 150) {
			lclass = 'l150';
		} else if (txtlen < 300) {
			lclass = 'l300';
		} else if (txtlen < 601) {
			lclass = 'l600';
		} else {
			lclass = 'warning';
		}
		return lclass;
	}

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
			height :stepY * range,
			range : range,
			leftC : xcenter-range/2,
			rightC : xcenter+range/2,
			topC : ycenter-range/2,
			bottomC : ycenter+range/2
		});
	});
}

exports.v = function(req, res) {
	var xcenter = (req.query.xcenter ? Number(req.query.xcenter) : 10);
	var ycenter = (req.query.ycenter ? Number(req.query.ycenter) : 10);
	var zoom = 2;
	prepareMapData(xcenter, ycenter, zoom, function(data) {
		res.render('mview.jade', data);
	});
};
