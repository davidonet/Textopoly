/*
 * GET home page.
 */

var models = require('./models/mongodrv');
var mapC = require('./controllers/map');
var imgC = require('./controllers/img');
var jsonC = require('./controllers/json');
var dmC = require('./controllers/dynmap_engine');

module.exports = function(app) {
	app.get('/', mapC.view);
	app.get('/view', mapC.view);
	app.get('/getimg/:id', imgC.getimg);
	app.post('/postimg', imgC.postimg);
	app.get('/section', jsonC.section);
	app.post('/insert', jsonC.insert);
	app.get('/remove', jsonC.remove);
	app.get('/block', dmC.block);
	app.get('/dynmap', dmC.dynmap);
	app.get('/get', dmC.get);
}