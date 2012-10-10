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
var adminC = require('./controllers/admin');

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
	app.get('/t/:x/:y', jsonC.atxt);
	app.get('/fa/:x/:y', jsonC.fa);
	app.get('/a/:a', jsonC.authorboard);
	app.get('/ap/:a', jsonC.authorpaths);
	app.get('/p/:id', jsonC.path);
	app.get('/dp/:id', ensureJSONAuth, jsonC.delpath);
	app.get('/sp/:x/:y', jsonC.startpath);
	app.get('/del/:x/:y', ensureJSONAuth, jsonC.remove);
	app.post('/update/:x/:y', ensureJSONAuth, jsonC.update);

	function superUserPower(req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user.superuser)
				return next();
		}
		res.redirect("/");
	}


	app.get('/admin', superUserPower, adminC.list_author);
	app.get('/admin/user/:a', ensureMobileAuth, adminC.edit_author);
	app.get('/admin/del/:a', superUserPower, adminC.remove_author);
	app.post('/admin/user/new', superUserPower, adminC.new_author);

	app.post('/postimg', imgC.postimg);
	app.get('/section', jsonC.section);
	app.post('/insert', ensureJSONAuth, jsonC.insert);
	app.get('/authors', jsonC.authors);
	app.post('/newpath', ensureJSONAuth, jsonC.newpath);
	app.get('/allpath', jsonC.allpath);

	app.get('/rss', jsonC.rss);

	app.get('/book/:id', bookC.path);
	app.get('/mpath/:a', bookC.choice);
	app.get('/mauth', bookC.authors);
	app.get('/mtxt/:x/:y', bookC.txt);

	app.get('/m/v/:x/:y', mobC.v);
	app.get('/m/w/:x/:y', ensureMobileAuth, mobC.w);
	app.get('/m/t/:x/:y', mobC.t);
	app.get('/m/a/:a', mobC.a);

	app.get('/logout', function(req, res) {
		req.logOut();
		res.json({
			success : true
		});
	});

	app.post('/login', passport.authenticate('local'), function(req, res) {
		db.txt.lastForA(req.user.author, function(err, items) {
			if (items[0])
				req.user.lastT = items[0].p;
			else
				req.user.lastT = [0, 0];

			res.json(req.user);
		});
	});

	app.post('/m/login', passport.authenticate('local', {
		successRedirect : '/',
		failureRedirect : '/m/login.html'
	}));

};
