exports.map = function(req, res) {
	var xcenter = (req.query.xcenter ? Number(req.query.xcenter) : 0);
	var ycenter = (req.query.ycenter ? Number(req.query.ycenter) : 0);
	var zoom = (req.query.zoom ? Number(req.query.zoom) : 4);
	var data = {
		title : 'Textopoly',
		params : {
			zoom : zoom,
			xcenter : xcenter,
			ycenter : ycenter,
			xmin : xmin,
			ymin : ymin,
			xmax : xmax,
			ymax : ymax,
			stepx : stepX,
			stepy : stepY
			//booked : compOutput
		}
	};

	res.render('map.jade', data);

};

exports.view = function(req, res) {
	var xcenter = (req.query.xcenter ? Number(req.query.xcenter) : 0);
	var ycenter = (req.query.ycenter ? Number(req.query.ycenter) : 0);
	var zoom = (req.query.zoom ? Number(req.query.zoom) : 4);
	var data = {
		title : 'Textopoly',
		params : {
			zoom : zoom,
			xcenter : xcenter,
			ycenter : ycenter
		}
	};
	res.render('view.jade', data);
};