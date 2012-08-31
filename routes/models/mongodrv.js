var mongo = require('mongoskin');
var sensible = require('../../sensible');

global.db = mongo.db(sensible.mongourl());

function normalizePos(nTxt) {
	if (nTxt.p === undefined) {
		nTxt.p = new Array(Number(nTxt.x), Number(nTxt.y));
		delete nTxt.x;
		delete nTxt.y;
	}
}

exports.bounds = function(fn) {
	/*jshint evil:true,es5: true*/
	srvBounds = function() {
		var bnd = [0, 0, 0, 0];
		db.txt.find({}, {
			p : 1
		}).forEach(function(obj) {
			if (obj.p[0] < bnd[0]) {
				bnd[0] = obj.p[0];
			}
			if (obj.p[1] < bnd[1]) {
				bnd[1] = obj.p[1];
			}
			if (bnd[2] < obj.p[0]) {
				bnd[2] = obj.p[0];
			}
			if (bnd[3] < obj.p[1]) {
				bnd[3] = obj.p[1];
			}
		});
		return bnd;
	};
	db.eval(srvBounds, fn);
};

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
	fromAuth : function(anAuthor, fn) {
		this.find({
			"a" : anAuthor
		}, {
			"pw" : 1
		}).toArray(fn);
	},
	expand : function(id, fn) {
		var txta = new Array();
		this.findOne({
			"_id" : new this.ObjectID(id)
		}, function(err, p) {
			p.pw.forEach(function(pos, i) {
				db.txt.findOne({
					"p" : eval("[" + pos + "]")
				}, function(err, txt) {
					txta[i] = txt;
					if (txta.length == p.pw.length)
						fn(err, txta);
				});
			});
		});
	}
});

db.bind('txt', {
	cells : function(fn) {
		this.find({}, {
			"p" : 1,
			"s" : 1,
			"c" : 1
		}).toArray(fn);
	},
	aTxt : function(pos, fn) {
		normalizePos(pos);
		this.findOne(pos, fn);
	},
	exist : function(box, fn) {
		this.find({
			"p" : {
				"$within" : {
					"$box" : box
				}
			}
		}).count(fn);
	},
	authors : function(fn) {
		this.distinct("a", fn);
	},
	authorTxt : function(a, fn) {
		this.find({
			a : a
		}, {
			p : 1
		}).toArray(fn);
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
			if (aTxt) {
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
