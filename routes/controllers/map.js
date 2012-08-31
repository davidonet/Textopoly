var models = require('../models/mongodrv'), raphael = require('node-raphael');

exports.map = function(req, res) {
	var xcenter = (req.query.xcenter ? Number(req.query.xcenter) : 0);
	var ycenter = (req.query.ycenter ? Number(req.query.ycenter) : 0);
	var zoom = (req.query.zoom ? Number(req.query.zoom) : 4);
	models.bounds(function(err, ret) {
		var data = {
			title : 'Textopoly',
			params : {
				xmin : ret[0],
				ymin : ret[1],
				xmax : ret[2],
				ymax : ret[3],
				xcenter : xcenter,
				ycenter : ycenter
			},
			layout : 'layout'
		};
		res.render('map.jade', data);
	});
};

exports.mapimg = function(req, res) {

	models.bounds(function(err, ret) {
		var xmin = ret[0], ymin = ret[1], xmax = ret[2], ymax = ret[3];
		var width = 30 * (xmax - xmin), height = 20 * (ymax - ymin);
		db.txt.cells(function(err, txts) {
			var svg = raphael.generate(width, height, function(paper) {
				txts.forEach(function(value, index) {
					var x = value.p[0];
					var y = value.p[1];
					x -= xmin;
					y -= ymin;
					var rect;
					if (value.s == 's')
						rect = paper.rect(x * 30, y * 20, 60, 40);
					if (value.s == 'l')
						rect = paper.rect(x * 30, y * 20, 120, 40);
					if (value.s == 't')
						rect = paper.rect(x * 30, y * 20, 60, 80);
					if (value.s == 'f')
						rect = paper.rect(x * 30, y * 20, 120, 80);
					if (value.c == "butter")
						rect.attr("fill", "#fce94f");
					else if (value.c == "orange")
						rect.attr("fill", "#fcaf3e");
					else if (value.c == "chameleon")
						rect.attr("fill", "#8ae234");
					else if (value.c == "skyblue")
						rect.attr("fill", "#729fcf");
					else if (value.c == "plum")
						rect.attr("fill", "#ad7fa8");
					else if (value.c == "scarletred")
						rect.attr("fill", "#ef2929");
					else if (value.c == "chocolate")
						rect.attr("fill", "#e9b96e");
					rect.attr("stroke-width", ".1");
				});

			});
			res.writeHead('200', {
				'Content-Type' : 'image/svg+xml'
			});
			res.end(svg);
		});

	});
};

exports.view = function(req, res) {
	var xcenter = (req.query.xcenter ? Number(req.query.xcenter) : 0);
	var ycenter = (req.query.ycenter ? Number(req.query.ycenter) : 0);
	var zoom = (req.query.zoom ? Number(req.query.zoom) : 4);
	var data = {
		title : 'Textopoly',
		params : {
			zoom : zoom,
			xcenter : xcenter,
			ycenter : ycenter
		},
		layout:'layout'
		
	};
	res.render('view.jade', data);
};

