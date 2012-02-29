var mongo = require('mongoskin');
var sensible = require('./sensible');
var db = mongo.db(sensible.mongourl());

db.bind('txt', {
	boxedTxt : function(box, fn) {
		this.find({"position" : {"$within" : { "$box" : box}}}).toArray(fn);
	}
});

var connect = require('connect');
var url = require('url');
var qs = require('qs');
var jsonp = require('./connect-jsonp')

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
		res.end('<script type="text/javascript" src="/section?Xm=-3&XM=2&Ym=-2&YM=2&callback=console.log"></script>');
	});
	// requested after the script tag is rendered, result is evaluated
	app.get('/section', function(req, res) {

		var myParam = qs.parse(url.parse(req.url).query);
		res.writeHead(200, {
			'Content-Type' : 'application/json; charset=utf-8'
		});
		var aBoundingBox = [[Number(myParam.Xm), Number(myParam.Ym)], [Number(myParam.XM), Number(myParam.YM)]];
		
		db.txt.boxedTxt(aBoundingBox,function(err, items) {
			var response = {
				success : true,
				minX : myParam.Xm,
				minY : myParam.Ym,
				maxX : myParam.XM,
				maxY : myParam.YM,
				texts : items
			};
			res.end(JSON.stringify(response));
		});
	});
}