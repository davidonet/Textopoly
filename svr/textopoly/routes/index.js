/*
 * GET home page.
 */

var mongo = require('mongoskin');
var sensible = require('../sensible');
var db = mongo.db(sensible.mongourl());

function normalizePos(nTxt) {
	if(nTxt.p == undefined) {
		nTxt.p = new Array(Number(nTxt.x), Number(nTxt.y))
		delete nTxt.x;
		delete nTxt.y;
	}
}

db.bind('txt', {
	boxedTxt : function(box, fn) {
		this.find({
			"p" : {
				"$within" : {
					"$box" : box
				}
			}
		}).toArray(fn);
	},
	insertTxt : function(nTxt, fn) {
		nTxt.d = new Date();
		normalizePos(nTxt);
		var myColl = this;
		this.findOne({
			p : nTxt.p
		}, function(err, aTxt) {
			if(aTxt) {
				fn("already exist", aTxt);
			} else {
				myColl.insert(nTxt, function(err) {
					fn(err, nTxt);
				});
			}
		});
	},
	removeTxt : function(nTxt, fn) {
		normalizePos(nTxt);
		this.remove(nTxt, function(err) {
			fn({
				success : true
			});
		});
	}
});

exports.section = function(req, res) {

	var xmin = (req.query.xmin ? Number(req.query.xmin) : 0);
	var xmax = (req.query.xmax ? Number(req.query.xmax) : xmin + 1);
	var ymin = (req.query.ymin ? Number(req.query.ymin) : 0);
	var ymax = (req.query.ymax ? Number(req.query.ymax) : ymin) + 1;

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
	});
}

exports.remove = function(req, res) {
	db.txt.removeTxt(req.body, function(err) {
		res.json(err);
	});
}

exports.view = function(req, res) {
	var zoom = 'z' + (req.query.zoom ? req.query.zoom : '2');
	var xmin = (req.query.xmin ? Number(req.query.xmin) : 0);
	var xmax = (req.query.xmax ? Number(req.query.xmax) : xmin + 1);
	var ymin = (req.query.ymin ? Number(req.query.ymin) : 0);
	var ymax = (req.query.ymax ? Number(req.query.ymax) : ymin) + 1;
	var stepX = 120;
	var stepY = 80;
	var aBoundingBox = [[xmin, ymin], [xmax, ymax]];

	db.txt.boxedTxt(aBoundingBox, function(err, items) {
		items.forEach(function(value, index) {
			value.absx = (value.p[0] - xmin) * stepX;
			value.absy = (value.p[1] - ymin) * stepY;
			console.log(stepX + " x " + value.p[0] + " = " + value.absx);
		});
		var response = {
			title : 'Textopoly | ' + aBoundingBox,
			zoom : zoom,
			xmin : xmin,
			ymin : ymin,
			xmax : xmax,
			ymax : ymax,
			texts : items
		};

		res.render('view.jade', response);
	});
}