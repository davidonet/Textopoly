exports.path = function(req, res) {
	db.path.expand(req.params.id, function(err, items) {

		items.pw.forEach(function(item, idx) {
			if (item.t)
				items.pw[idx].lc = txtLen2Class(item.t.length);
			else
				items.pw[idx].lc = 'l0';
		});
		res.render('book.jade', {
			title : "Textopoly | Chemin de " + items.a,
			a : items.a,
			id : req.params.id,
			pathwalk : items
		});
	});
};

exports.authors = function(req, res) {
	db.txt.authors(function(err, items) {
		res.render('authors.jade', {
			title : "Textopoly | Qui",
			authors : items
		});
	});
};

exports.choice = function(req, res) {
	db.path.fromAuth(req.params.a, function(err, items) {
		db.txt.authorTxt(req.params.a, function(err, txts) {
			res.render('choice.jade', {
				title : "Textopoly | Chemins de " + req.params.a,
				a : req.params.a,
				paths : items,
				txts : txts
			});
		});
	});
};
