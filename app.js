/**
 * Module dependencies
 */
var mongo = require('mongoskin');
var express = require('express');

var app = module.exports = express.createServer();
app.enable('quiet');
global.io = require('socket.io').listen(app,{ log: false });
io.set('log level', 0);
var events = require('events');
global.serverEmitter = new events.EventEmitter();
io.sockets.on('connection', function(socket) {
	socket.on('book', function(data) {
		normalizePos(data);
		socket.broadcast.emit('book', data);
	});
	socket.on('unbook', function(data) {
		normalizePos(data);
		socket.broadcast.emit('unbook', data);
	});
	serverEmitter.on('set', function(data) {
		socket.broadcast.emit('set', data);
	});
	serverEmitter.on('unset', function(data) {
		socket.broadcast.emit('unset', data);
	});
});
// Configuration

var pubpath = (process.env.JS_COV ? 'public-cov' : 'public');


app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express['static'](__dirname + '/public'));
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

var libpath = (process.env.NODE_COV ? './routes-cov' : './routes');
require(libpath)(app);

app.listen(3000);
