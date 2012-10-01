var models = require('../models/mongodrv');

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
	if (req.isAuthenticated()){
		console.log(req.user);
		data.params.user = req.user;
		data.params.xcenter = req.user.lastT[0];
		data.params.ycenter = req.user.lastT[1];
		}
		
	res.render('view', data);
};

