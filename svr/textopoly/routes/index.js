/*
 * GET home page.
 */

var models = require('./models/mongodrv');
var mapC = require('./controllers/map');
var imgC = require('./controllers/img');
var jsonC = require('./controllers/json');

module.exports = function(app) {
	app.get('/', mapC.view);
	app.get('/map', mapC.map);
	app.get('/view', mapC.view);
	app.get('/getimg/:id', imgC.getimg);
	app.post('/postimg', imgC.postimg);
	app.get('/section', jsonC.section);
	app.post('/insert', jsonC.insert);
	app.get('/remove', jsonC.remove);
	app.get('/authors', jsonC.authors);
	app.post('/newpath', jsonC.newpath);
	app.get('/allpath', jsonC.allpath);
	}