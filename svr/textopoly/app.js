/**
 * Module dependencies.
 */

var mongo = require('mongoskin');
var sensible = require('./sensible');

var express = require('express'), routes = require('./routes');

var app = module.exports = express.createServer()
var io = require('socket.io').listen(app);
// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.enable("jsonp callback");
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});
// Routes

app.get('/section', routes.section);
app.post('/insert', routes.insert);
app.post('/remove', routes.remove);

io.sockets.on('connection', function(socket) {
	socket.emit('news', {
		hello : 'world'
	});
	socket.on('book', function(data) {
		console.log(data);
	});
	socket.on('unbook', function(data) {
		console.log(data);
	});
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
