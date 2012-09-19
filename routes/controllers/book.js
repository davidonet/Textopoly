function txtLen2Class(txtlen) {
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
}

exports.path = function(req, res) {
	db.path.expand(req.params.id, function(err, items) {
		
		items.pw.forEach(function(item,idx){
			items.pw[idx].lc = txtLen2Class(item.t.length);
		});
		res.render('book.jade', {
			title : "Textopoly | Chemin de " + items.a,
			a : items.a,
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

exports.txt = function(req, res) {
	db.txt.aTxt({
		x : req.params.x,
		y : req.params.y
	}, function(err, items) {
		res.render('txt.jade', {
			title : "Textopoly | " + req.params.x + "," + req.params.y,
			t : items,
			lc : txtLen2Class(items.t.length)
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
