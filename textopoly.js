var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path'), socket = require('socket.io'), fs = require('fs'), passport = require('passport');
var app = express();
var sensible = require('./sensible');
var RedisStore = require('connect-redis')(express);

app.configure(function() {
	app.set('port', 5020);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({
		secret : 'cosmopolette',
		maxAge: new Date(Date.now() + 3600000),
		store : new RedisStore({
			host : sensible.redisHost(),
			port : 6379,
			db : 8
		})
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	fs.stat('public-optimize', function(er, s) {
		var pubpath = (process.env.JS_COV ? '/public-cov' : (!er ? '/public-optimize' : '/public'));

		app.use(require('less-middleware')({
			src : __dirname + pubpath,
			compress : true,
			optimization : 2
		}));
		app.use(express['static'](__dirname + pubpath));
		app.enable('quiet');
	});
});

app.configure('development', function() {
	app.use(express.errorHandler());
	//app.use(express.logger('dev'));
});

var libpath = (process.env.NODE_COV ? './routes-cov' : './routes');
require(libpath)(app);


var server = http.createServer(app).listen(app.get('port'));


global.io = socket.listen(server, {
	log : false
});

global.io.configure(function() {
	io.set("polling duration", 10);
	io.set('log level', 0);
});


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
	this.setMaxListeners(0);
});


//io.set('log level', 0);

