/*
 * GET home page.
 */
var passport = require('passport');
var models = require('./models/mongodrv');
var memcache = require('./models/redisdrv');
var mapC = require('./controllers/map');
var imgC = require('./controllers/img');
var jsonC = require('./controllers/json');
var bookC = require('./controllers/book');
var mobC = require('./controllers/mobile');
var authC = require('./controllers/authent');

function ensureJSONAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.body.notAuth = true;
	res.json(req.body);
}

function ensureMobileAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/m/login.html");
}

module.exports = function(app) {
	app.get('/', function(req, res) {
		var ua = req.header('user-agent');
		if ((/Android/i.test(ua)) || (/Mobile/i.test(ua)) || (/IEMobile/i.test(ua)))
			mobC.v(req, res);
		else
			mapC.view(req, res);
	});
	app.get('/view', mapC.view);
	app.get('/getimg/:pos', imgC.getimg);
	app.get('/info/:x/:y', jsonC.info);
	app.get('/t/:x/:y', jsonC.atxt);
	app.get('/fa/:x/:y', jsonC.fa);
	app.get('/a/:a', jsonC.authorboard);
	app.get('/p/:id', jsonC.path);

	app.post('/postimg', imgC.postimg);
	app.get('/section', jsonC.section);
	app.post('/insert', ensureJSONAuth, jsonC.insert);
	app.get('/remove', ensureJSONAuth, jsonC.remove);
	app.get('/authors', jsonC.authors);
	app.post('/newpath', ensureJSONAuth, jsonC.newpath);
	app.get('/allpath', jsonC.allpath);

	app.get('/rss', jsonC.rss);

	app.get('/mbook/:id', bookC.path);
	app.get('/mpath/:a', bookC.choice);
	app.get('/mauth', bookC.authors);
	app.get('/mtxt/:x/:y', bookC.txt);

	app.get('/m/v/:x/:y', mobC.v);
	app.get('/m/w/:x/:y', ensureMobileAuth, mobC.w);
	app.get('/m/t/:x/:y', mobC.t);
	app.get('/m/a/:a', mobC.a);

	app.get('/logout', function(req, res) {
		req.logOut();
		res.redirect('/');
	});

	app.post('/login', passport.authenticate('local'), function(req, res) {
		res.json(req.user);
	});

	app.post('/m/login', passport.authenticate('local', {
		successRedirect : '/',
		failureRedirect : '/m/login.html'
	}));

};
