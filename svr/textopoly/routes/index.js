/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {
		title : 'Express'
	})
};
var mongo = require('mongoskin');
var sensible = require('../sensible');
var db = mongo.db(sensible.mongourl());

db.bind('txt', {
	boxedTxt : function(box, fn) {
		this.find({
			"position" : {
				"$within" : {
					"$box" : box
				}
			}
		}).toArray(fn);
	}
});

exports.section = function(req, res) {
	res.header('Content-Type', 'application/json');
	res.header('Charset', 'utf-8');

	var xmin, ymin, xmax, ymax;
	if(req.query.xmin)
		xmin = Number(req.query.xmin);
	else
		xmin = -5;
	if(req.query.ymin)
		ymin = Number(req.query.ymin);
	else
		ymin = -5;
	if(req.query.xmax)
		xmax = Number(req.query.xmax);
	else
		xmax = 5;
	if(req.query.ymax)
		ymax = Number(req.query.ymax);
	else
		ymax = 5;
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
		if(req.query.callback)
			res.send(req.query.callback + '(' + JSON.stringify(response) + ');');
		else
			res.send(JSON.stringify(response));
	});
};
