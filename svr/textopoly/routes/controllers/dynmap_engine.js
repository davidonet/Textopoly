exports.dynmap = function(req, res) {
	var xcenter = (req.query.xcenter ? Number(req.query.xcenter) : 0);
	var ycenter = (req.query.ycenter ? Number(req.query.ycenter) : 0);
	var zoom = (req.query.zoom ? Number(req.query.zoom) : 4);
	var stepX = 120;
	var stepY = 80;

	switch(zoom) {
		case 1:
			stepX = 240;
			stepY = 160;
			break;
		case 2:
			stepX = 120;
			stepY = 80;
			break;
		case 4:
			stepX = 60;
			stepY = 40;
			break;
		case 10:
			stepX = 24;
			stepY = 16;
			break;
		case 20:
			stepX = 12;
			stepY = 8;
			break;
		case 40:
			stepX = 6;
			stepY = 4;
			break;
	}

	var response = {
		title : 'Textopoly',
		params : {
			zoom : zoom,
			xcenter : xcenter,
			ycenter : ycenter,
			stepx : stepX,
			stepy : stepY,
		},
	};
	res.render('dynmap.jade', response);
}

exports.get = function(req, res) {
	var x = (req.query.x ? Number(req.query.x) : 0);
	var y = (req.query.y ? Number(req.query.y) : 0);
	var aPos = [x, y];
	db.txt.aTxt(aPos, function(err, item) {
		res.json(item);
	});
}

exports.block = function(req, res) {

	var u = (req.query.u ? Number(req.query.u) : 0);
	var v = (req.query.v ? Number(req.query.v) : 0);

	var aBoundingBox = [[(u * 20) - 10, (v * 20) - 10], [(u * 20) + 9, (v * 20) + 9]];

	db.txt.boxedTxt(aBoundingBox, function(err, items) {
		var response = {
			success : true,
			xmin : aBoundingBox[0][0],
			ymin : aBoundingBox[0][1],
			xmax : aBoundingBox[1][0],
			ymax : aBoundingBox[1][1],
			texts : items
		};
		res.json(response);
	});
}

