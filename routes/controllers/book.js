exports.path = function(req, res) {
	db.path.expand(req.params.id, function(err, items) {
		res.render('book.jade', {
			title : "Textopoly | Chemin de " + items.a,
			a : items.a,
			pathwalk : items,
			layout : 'mobile'
		});
	});
};

exports.authors = function(req, res) {
	db.txt.authors(function(err, items) {
		res.render('authors.jade', {
			title : "Textopoly | Qui",
			authors : items,
			layout : 'mobile'
		});
	});
};

exports.txt = function(req, res) {
	db.txt.aTxt({
		x : req.params.x,
		y : req.params.y
	}, function(err, items) {
		res.render('txt.jade', {
			title : "Textopoly | "+req.params.x+","+req.params.y,
			t : items,
			layout : 'mobile'
		});
	});
};

exports.choice = function(req, res) {
	db.path.fromAuth(req.params.a, function(err, items) {
		db.txt.authorTxt(req.params.a, function(err, txts) {
			console.log(txts);
			res.render('choice.jade', {
				title : "Textopoly | Chemins de " + req.params.a,
				a : req.params.a,
				paths : items,
				txts : txts,
				layout : 'mobile'
			});
		});
	});
};
