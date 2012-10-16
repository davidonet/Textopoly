var models = require('../models/mongodrv');

exports.view = function(req, res) {
	var data = {
		title : 'Textopoly',
		params : {
			zoom : (req.query.zoom ? Number(req.query.zoom) : 4)
		}
	};
	if (req.isAuthenticated()) {
		data.params.user = req.user;
		data.params.xcenter = (req.query.xcenter ? Number(req.query.xcenter) : req.user.lastT[0]);
		data.params.ycenter = (req.query.ycenter ? Number(req.query.ycenter) : req.user.lastT[1]);
	} else {

		data.params.xcenter = (req.query.xcenter ? Number(req.query.xcenter) : -6);
		data.params.ycenter = (req.query.ycenter ? Number(req.query.ycenter) : -30);
	}
	res.render('view', data);
};

