var redis = require("redis"), sensible = require('../../sensible');

global.red = redis.createClient(6379, sensible.redisHost());
global.red.on("error", function(err) {
	console.log("Error " + err);
});

redis.debug_mode = false;

global.red.on("connect", function() {
	console.log("Got Unix socket connection.");
});

global.red.single = function(x, y, fn) {
	var multi = this.multi();
	multi.sismember("b", x + "," + y);
	multi.sismember("b", (x + 1) + "," + y);
	multi.sismember("b", x + "," + (y + 1));
	multi.sismember("b", (x + 1) + "," + (y + 1));
	multi.exec(function(err, ret) {
		var isB = 0;
		ret.forEach(function(elt) {
			isB += elt;
		});
		fn(err, isB);
	});
};

