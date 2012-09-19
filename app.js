var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path'), socket = require('socket.io');
var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	var pubpath = (process.env.JS_COV ? '/public-cov' : '/public');
	app.use(require('less-middleware')({
		src : __dirname + pubpath
	}));
	app.use(express['static'](__dirname + pubpath));
	app.enable('quiet');
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

var libpath = (process.env.NODE_COV ? './routes-cov' : './routes');
require(libpath)(app);

var server = http.createServer(app).listen(app.get('port'), function() {
	global.io = socket.listen(server);
});

