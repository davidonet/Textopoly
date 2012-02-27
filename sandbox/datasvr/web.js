var mongo = require('mongoskin');
var db = mongo.db('mongodb://davido:9ricer4@staff.mongohq.com:10064/textopoly');

db.bind('txt', {
	allTxt : function(fn) {
		this.find().toArray(fn);
	}
});

var connect = require('connect');
var jsonp   = require('connect-jsonp');

var server = connect.createServer(connect.logger({
	format : ':method :url'
}), connect.bodyParser(), jsonp(), connect.router(app), connect.errorHandler({
	dumpExceptions : true,
	showStack : true
})).listen(process.env.PORT || 3000);

function app(app) {
	// simple alert, not exactly x-domain...
	app.get('/', function(req, res) {
		res.writeHead(200, {
			'Content-Type' : 'text/html; charset=utf-8'
		});
		res.end('<script type="text/javascript" src="/section?callback=console.log"></script>');
	});
	// requested after the script tag is rendered, result is evaluated
	app.get('/section', function(req, res) {
		res.writeHead(200, {
			'Content-Type' : 'application/json; charset=utf-8'
		});
		db.txt.allTxt(function(err, items) {
			var response = {
				success : true,
				content : items
			};
			res.end(JSON.stringify(response));
		});
	});
}