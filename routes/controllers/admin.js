var models = require('../models/mongodrv');

exports.list_author = function(req, res) {
	db.author.find({}).toArray(function(err, items) {
		console.log(items);
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
				item.paths = paths;
				item.txts = txts;
				res.render('admin/user.jade', item);
			});
		});
	});
};
