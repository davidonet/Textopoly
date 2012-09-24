/*
 * GET home page.
 */

var models = require('./models/mongodrv');
var memcache = require('./models/redisdrv');
var mapC = require('./controllers/map');
var imgC = require('./controllers/img');
var jsonC = require('./controllers/json');
var bookC = require('./controllers/book');
var mobC = require('./controllers/mobile');

module.exports = function(app) {
	app.get('/', function(req, res) {
		var ua = req.header('user-agent');
		console.log(ua);
		if( (/Android/i.test(ua)) ||  (/Mobile/i.test(ua)) || (/IEMobile/i.test(ua)) ) 
			mobC.v(req,res);
		else
			mapC.view(req,res);
	});
	app.get('/view', mapC.view);
	app.get('/getimg/:pos', imgC.getimg);
	app.get('/t/:x/:y', jsonC.atxt);
	app.get('/fa/:x/:y', jsonC.fa);
	app.get('/a/:a', jsonC.authorboard);
	app.get('/p/:id', jsonC.path);
	app.get('/ap/:a', jsonC.authpath);
	app.post('/postimg', imgC.postimg);
	app.get('/section', jsonC.section);
	app.post('/insert', jsonC.insert);
	app.get('/remove', jsonC.remove);
	app.get('/authors', jsonC.authors);
	app.post('/newpath', jsonC.newpath);
	app.get('/allpath', jsonC.allpath);
	app.get('/msg', jsonC.msg);

	app.get('/rss', jsonC.rss);

	app.get('/mbook/:id', bookC.path);
	app.get('/mpath/:a', bookC.choice);
	app.get('/mauth', bookC.authors);
	app.get('/mtxt/:x/:y', bookC.txt);

	app.get('/m/v', mobC.v);
	app.get('/m/t/:x/:y', mobC.t);

};
