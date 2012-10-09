var mongo = require('mongoskin');
var sensible = require('../../sensible');
var async = require('async');

global.db = mongo.db(sensible.mongourl(), {
	safe : false
});

global.normalizePos = function(nTxt) {
	if (nTxt.p === undefined) {
		nTxt.p = new Array(Number(nTxt.x), Number(nTxt.y));
		delete nTxt.x;
		delete nTxt.y;
	}
};

global.txtLen2Class = function(txtlen) {
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
};

exports.bounds = function(fn) {
	/*jshint evil:true,es5: true*/
	// Never called in node the function is executed in mongo server
	var srvBounds = function() {
		var bnd = [0, 0, 0, 0];
		db.txt.find({}, {
			p : 1
		}).forEach(function(obj) {
			if (obj.p[0] < bnd[0])
				bnd[0] = obj.p[0];
			if (obj.p[1] < bnd[1])
				bnd[1] = obj.p[1];
			if (bnd[2] < obj.p[0])
				bnd[2] = obj.p[0];
			if (bnd[3] < obj.p[1])
				bnd[3] = obj.p[1];
		});
		return bnd;
	};
	db.eval(srvBounds, fn);
};

db.bind('author', {
	newUser : function(author, password, email, url, fn) {
		var pwmd5 = crypto.createHash('md5').update(password).digest("hex");
		this.insert({
			author : author,
			password : pwmd5,
			email : email,
			url : ( url ? url : "http://textopoly.org")
		}, fn);
	},
	checkUser : function(author, password, done) {
		this.findOne({
			author : author
		}, function(err, user) {
			var pwmd5 = crypto.createHash('md5').update(password).digest("hex");

			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message : 'Unknown user'
				});
			}
			if (user.password != pwmd5) {
				return done(null, false, {
					message : 'Invalid password'
				});
			}
			return done(null, user);
		});
	}
});

db.bind('path', {
	newPath : function(aPath, fn) {
		/*jshint evil:true*/
		aPath.d = new Date();
		aPath.title = "";
		async.forEach(aPath.pw.slice(0, 3), function(pos, doneTxt) {
			db.txt.findOne({
				"p" : eval("[" + pos + "]")
			}, function(err, txt) {
				if (txt.t) {
					if (12 < txt.t.length)
						txt.t = txt.t.slice(0, 12);
					aPath.title += txt.t.split(" ")[0];
				} else
					aPath.title += 'image';
				aPath.title += ' .. ';
				doneTxt();
			});
		}, function(err) {
			db.path.insert(aPath, function(err) {
				fn(err, aPath);
			});
		});
	},
	startpath : function(p, fn) {
		db.path.find({
			sp : p
		}, {
			title : 1
		}).toArray(fn);
	},
	allPath : function(fn) {
		this.find({}).toArray(fn);
	},
	fromAuth : function(anAuthor, fn) {
		this.find({
			"a" : anAuthor
		}, {
			"title" : 1,
			"d" : 1,
			"sp" : 1,
			"pw" : 1
		}).toArray(fn);
	},
	authPathList : function(anAuthor, fn) {
		/*jshint evil:true*/
		this.find({
			"a" : anAuthor
		}, {
			"pw" : 1,
			"d" : 1
		}).toArray(function(err, paths) {
			var pa = [];
			async.forEach(paths, function(path, donePath) {
				var aP = {
					id : path._id,
					pw : ""
				};
				async.forEach(path.pw.slice(0, 3), function(pos, doneTxt) {
					db.txt.findOne({
						"p" : eval("[" + pos + "]")
					}, function(err, txt) {
						if (txt.t) {
							if (12 < txt.t.length)
								txt.t = txt.t.slice(0, 12);
							aP.pw += txt.t.split(" ")[0];
						} else {
							aP.pw += 'image';
						}
						aP.pw += ' .. ';
						doneTxt();
					});
				}, function(err) {
					pa.push(aP);
					donePath();
				});
			}, function(err) {
				fn(err, pa);
			});
		});
	},
	expand : function(id, fn) {
		/*jshint evil:true*/
		var txta = [];
		this.findOne({
			"_id" : new this.ObjectID(id)
		}, function(err, p) {
			p.pw.forEach(function(pos, i) {
				db.txt.findOne({
					"p" : eval("[" + pos + "]")
				}, function(err, txt) {
					txta[i] = txt;
					if (txta.length == p.pw.length)
						fn(err, {
							a : p.a,
							pw : txta
						});
				});
			});
		});
	},
	del : function(id, fn) {
		this.remove({
			"_id" : new this.ObjectID(id)
		}, function(err) {
			fn({
				success : true
			});
		});
	}
});

db.bind('txt', {
	aTxt : function(pos, fn) {
		normalizePos(pos);
		this.findOne(pos, fn);
	},
	authors : function(fn) {
		this.distinct("a", fn);
	},
	authorTxt : function(a, fn) {
		this.find({
			a : a
		}, {
			p : 1,
			t : 1,
			d : 1
		}).toArray(fn);
	},
	boxedTxt : function(box, mini, fn) {
		var fields = {};
		if (mini) {
			fields.p = 1;
			fields.s = 1;
			fields.c = 1;
		}
		this.find({
			"p" : {
				"$within" : {
					"$box" : box
				}
			}
		}, fields).toArray(fn);
	},
	insertTxt : function(nTxt, fn) {
		nTxt.d = new Date();
		normalizePos(nTxt);

		var myColl = this;
		this.findOne({
			p : nTxt.p
		}, function(err, aTxt) {
			if (!aTxt) {
				myColl.insert(nTxt, function(err) {
					red.book(nTxt, function(err, ret) {
						fn(err, nTxt);
					});
				});
			}
		});
	},
	updateTxt : function(nTxt, fn) {
		normalizePos(nTxt);
		db.txt.update({
			p : nTxt.p
		}, {
			$set : {
				t : nTxt.t,
				d : new Date()
			}
		}, fn);
	},
	removeTxt : function(nTxt, fn) {
		normalizePos(nTxt);
		this.findOne(nTxt, function(err, data) {
			red.unbook(data, function(err, ret) {
				db.txt.remove(nTxt, function(err) {
					fn({
						success : true
					});
				});
			});
		});
	},
	last20 : function(fn) {
		this.find().sort({
			d : -1
		}).limit(20).toArray(fn);
	},
	lastForA : function(a, fn) {
		this.find({
			a : a
		}).sort({
			d : -1
		}).limit(1).toArray(fn);
	}
});
