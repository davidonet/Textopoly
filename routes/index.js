/*
 * GET home page.
 */

var models = require('./models/mongodrv');
var memcache = require('./models/redisdrv');
var mapC = require('./controllers/map');
var imgC = require('./controllers/img');
var jsonC = require('./controllers/json');

module.exports = function(app) {
	app.get('/', mapC.view);
	app.get('/map', mapC.map);
	app.get('/mapimg.svg', mapC.mapimg);
	app.get('/view', mapC.view);
	app.get('/getimg/:id', imgC.getimg);
	app.get('/t/:x/:y',jsonC.atxt);
	app.get('/a/:a',jsonC.authorboard);
	app.get('/p/:id',jsonC.path);
	app.get('/ap/:a', jsonC.authpath);
	app.post('/postimg', imgC.postimg);
	app.get('/section', jsonC.section);
	app.post('/insert', jsonC.insert);
	app.get('/remove', jsonC.remove);
	app.get('/authors', jsonC.authors);
	app.post('/newpath', jsonC.newpath);
	app.get('/allpath', jsonC.allpath);
	app.get('/msg', jsonC.msg);
	app.get('/fa', jsonC.fa);
	};
	