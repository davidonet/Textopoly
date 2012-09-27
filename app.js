var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path'), socket = require('socket.io'), fs = require('fs'), passport = require('passport');
var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({
		secret : 'keyboard cat'
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.methodOverride());
	app.use(app.router);
	fs.stat('public-optimize', function(er, s) {
		var pubpath = (process.env.JS_COV ? '/public-cov' : (!er ? '/public-optimize' : '/public'));

		app.use(require('less-middleware')({
			src : __dirname + pubpath
		}));
		app.use(express['static'](__dirname + pubpath));
		app.enable('quiet');
	});
});

app.configure('development', function() {
	app.use(express.errorHandler());
	app.use(express.logger('dev'));
});

var libpath = (process.env.NODE_COV ? './routes-cov' : './routes');
require(libpath)(app);

var server = http.createServer(app).listen(app.get('port'));

global.io = socket.listen(server, {
	log : false
});

io.set('log level', 0);

