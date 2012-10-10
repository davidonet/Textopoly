var models = require('../models/mongodrv');
var async = require('async');
var crypto = require('crypto');
exports.list_author = function(req, res) {
	db.author.find({}).toArray(function(err, items) {
		res.render('admin/admin.jade', {
			authors : items
		});
	});
};

exports.edit_author = function(req, res) {
	if ((req.user.author == req.params.a) || (req.user.superuser)) {
		db.author.findOne({
			author : req.params.a
		}, function(err, item) {
			db.path.fromAuth(req.params.a, function(err, paths) {
				db.txt.authorTxt(req.params.a, function(err, txts) {
					item.paths = paths;
					item.txts = txts;
					item.su = req.user.superuser;
					res.render('admin/user.jade', item);
				});
			});
		});
	} else {
		res.redirect("/");
	}
};

exports.new_author = function(req, res) {
	if ((req.body.author !== "") && (req.body.password !== "")) {
		var pwmd5 = crypto.createHash('md5').update(req.body.password).digest("hex");
		db.author.insert({
			author : req.body.author,
			password : pwmd5,
			email : req.body.email,
			url : (req.body.url ? req.body.url : "http://textopoly.org")
		}, function(err) {
			res.redirect("/admin/user/" + req.body.author);
		});
	} else {
		res.redirect("/admin/");
	}
};

exports.remove_author = function(req, res) {
	db.author.findOne({
		author : req.params.a
	}, function(err, item) {
		db.path.remove({
			a : req.params.a
		}, function(err) {
			db.txt.find({
				a : req.params.a
			}).toArray(function(err, txts) {
				async.forEach(txts, function(txt, done) {
					db.gridfs().unlink('[' + txt.p[0] + ',' + txt.p[1] + ']', function(err, gs) {
					});
					db.gridfs().unlink('s[' + txt.p[0] + ',' + txt.p[1] + ']', function(err, gs) {
					});
					db.txt.remove(txt, done);
				}, function(err) {
					db.author.remove({
						author : req.params.a
					}, function(err) {
						res.json({
							success : true
						});
					});
				});
			});
		});
	});
};
