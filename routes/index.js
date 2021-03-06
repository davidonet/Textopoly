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
	res.redirect('/')
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
	app.get('/admin/user/:a', adminC.edit_author);
	app.get('/admin/del/:a', superUserPower, adminC.remove_author);
	app.get('/admin/delbook/:id', ensureJSONAuth, adminC.remove_book);
	app.post('/admin/user/new', ensureJSONAuth, adminC.new_author);
	app.get('/newuser', adminC.new_user);
	app.get('/confirm', adminC.confirm_user);
	app.get('/lostpwd', adminC.lostpwd);
	app.get('/user/reset', adminC.resetpwd);
	app.get('/resetform', adminC.resetform);
	app.post('/reset', adminC.reset);

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

	app.post('/auth/browserid', passport.authenticate('persona', {
		failureRedirect : '/newuser'
	}), function(req, res) {
		res.redirect('/');
	});

	app.post('/m/login', passport.authenticate('persona', {
		successRedirect : '/',
		failureRedirect : '/m/login.html'
	}));

};
