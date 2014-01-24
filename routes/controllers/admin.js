var models = require('../models/mongodrv');
var async = require('async');
var crypto = require('crypto');
var uuid = require('node-uuid');
var sensible = require('../../sensible');
var nodemailer = require("nodemailer");
var sensible = require('../../sensible');

exports.new_user = function(req, res) {
	res.render('newuser.jade', {
		title : "Nouvel Utilisateur"
	});
};

exports.lostpwd = function(req, res) {
	res.render('lostpwd.jade', {
		title : "Mot de Passe perdu"
	});
};

exports.resetform = function(req, res) {
	res.render('resetform.jade', {
		title : "Mot de Passe perdu",
		key : req.query.key
	});
};

exports.reset = function(req, res) {
	db.author.findOne({
		key : req.body.key
	}, function(err, user) {
		var pwmd5 = crypto.createHash('md5').update(req.body.password).digest("hex");
		if (user === null)
			res.redirect("/");
		else {
			db.author.update({
				key : req.body.key
			}, {
				$unset : {
					key : 1
				},
				$set : {
					password : pwmd5
				}
			}, function(err, item) {
				res.redirect("/");
			});
		}
	});
};

exports.resetpwd = function(req, res) {
	var key = uuid.v1();
	db.author.update({
		email : req.query.email
	}, {
		$set : {
			key : key
		}
	}, function(err, item) {
		var link = "http://textopoly.org/resetform?key=" + key;
		var mailOptions = {
			from : "Textopoly <textopoly@lapanacee.org>", // sender address
			to : req.query.email, // list of receivers
			subject : "Inscription à Textopoly", // Subject line
			text : "Bonjour \nPour réinitialiser votre mot de de passe ouvrez l'adresse " + link + " dans un navigateur.", // plaintext body
			html : "<h1>Pour réinitialiser votre mot de de passe</h1><p>Cliquer sur le lien : <a href='" + link + "'>ici</a>" // html body
		};
		var transport = nodemailer.createTransport("SMTP", {
			service : "Gmail",
			auth : {
				user : "textopoly.lapanacee@gmail.com",
				pass : sensible.getPwd()
			}
		});
		smtpTransport.sendMail(mailOptions, function(error, response) {
			if (error) {
				console.log(error);
			} else {
				console.log("Message sent: " + response.message);
			}
			smtpTransport.close();
		});
		res.redirect("/");
	});
};

exports.list_author = function(req, res) {
	db.author.find({}).toArray(function(err, items) {
		res.render('admin/admin.jade', {
			authors : items
		});
	});
};

exports.edit_author = function(req, res) {
	db.author.findOne({
		author : req.params.a
	}, function(err, item) {
		db.path.fromAuth(req.params.a, function(err, paths) {
			db.txt.authorTxt(req.params.a, function(err, txts) {
				item.author = req.params.a;
				item.paths = paths;
				item.txts = txts;
				item.su = (req.user ? req.user.superuser : false);
				res.render('admin/user.jade', item);
			});
		});
	});

};

exports.new_author = function(req, res) {
	if ((req.body.author !== "") && (req.body.password !== "")) {
		var pwmd5 = crypto.createHash('md5').update(req.body.password).digest("hex");
		var key = uuid.v1()
		db.author.insert({
			author : req.body.author,
			password : pwmd5,
			email : req.body.email,
			url : req.body.url,
			key : key
		}, function(err) {
			var link = "http://textopoly.org/confirm?key=" + key;
			var mailOptions = {
				from : "Textopoly <textopoly@lapanacee.org>", // sender address
				to : req.body.email, // list of receivers
				subject : "Inscription à Textopoly", // Subject line
				text : "Bonjour " + req.body.author + "\nPour confirmer votre inscription ouvrez l'adresse " + link + " dans un navigateur.", // plaintext body
				html : "<h1>Confirmation de votre inscription à Textopoly</h1><h2>" + req.body.author + "</h2><p>Cliquer sur le lien : <a href='" + link + "'>ici</a>" // html body
			};

			var transport = nodemailer.createTransport("SMTP", {
				service : "Gmail",
				auth : {
					user : "textopoly.lapanacee@gmail.com",
					pass : sensible.getPwd()
				}
			});
			smtpTransport.sendMail(mailOptions, function(error, response) {
				if (error) {
					console.log(error);
				} else {
					console.log("Message sent: " + response.message);
				}
				smtpTransport.close();
			});
			res.redirect("/admin/user/" + req.body.author);
		});
	} else {
		res.redirect("/admin/");
	}
};

exports.confirm_user = function(req, res) {
	db.author.findOne({
		key : req.query.key
	}, function(err, user) {
		console.log(err, user);
		if (user === null)
			res.redirect("/");
		else {
			db.author.update({
				key : req.query.key
			}, {
				$unset : {
					key : 1
				}
			}, function(err, item) {
				res.redirect("/admin/user/" + user.author);
			});
		}
	});
};

exports.remove_book = function(req, res) {
	db.path.findOne({
		_id : db.path.ObjectID(req.params.id)
	}, function(err, item) {
		if ((item.a == req.user.author) || (req.user.superuser)) {
			db.path.remove({
				_id : db.path.ObjectID(req.params.id)
			}, function(err) {
				res.redirect("/admin/user/" + item.a);
			});
		} else {
			res.redirect("/admin/user/" + item.a);
		}
	});
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
						res.redirect("/admin/");
					});
				});
			});
		});
	});
};
