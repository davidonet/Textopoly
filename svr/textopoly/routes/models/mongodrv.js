var mongo = require('mongoskin');
var sensible = require('../../sensible');

global.db = mongo.db(sensible.mongourl());

function normalizePos(nTxt) {
	if(nTxt.p == undefined) {
		nTxt.p = new Array(Number(nTxt.x), Number(nTxt.y))
		delete nTxt.x;
		delete nTxt.y;
	}
}

db.bind('path', {
	newPath : function(aPath, fn) {
		aPath.d = new Date();
		this.insert(aPath, function(err) {
			fn(err, aPath);
		});
	},
	allPath : function(fn) {
		this.find({}).toArray(fn);
	},
});

db.bind('txt', {
	aTxt : function(pos, fn) {
		this.findOne({
			'p' : pos
		}, fn);
	},
	authors : function(fn) {
		this.distinct("a", fn);
	},
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
				myColl.remove(aTxt, function(err) {
					myColl.insert(nTxt, function(err) {
						fn(err, nTxt);
					});
				});
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
