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
	/* Check free surrounding space
	 *    0  1  2  3
	 * 0 00 01 xx 04
	 * 1 03 02 xx 05
	 * 2 xx xx xx xx
	 * 3 08 07 xx 06
	 */
	var multi = this.multi();
	multi.sismember("b", (x + 0) + "," + (y + 0));
	multi.sismember("b", (x + 1) + "," + (y + 0));
	multi.sismember("b", (x + 1) + "," + (y + 1));
	multi.sismember("b", (x + 0) + "," + (y + 1));
	multi.sismember("b", (x + 3) + "," + (y + 0));
	multi.sismember("b", (x + 3) + "," + (y + 1));
	multi.sismember("b", (x + 3) + "," + (y + 3));
	multi.sismember("b", (x + 1) + "," + (y + 3));
	multi.sismember("b", (x + 0) + "," + (y + 3));
	multi.exec(function(err, ret) {
		var s = ret[0] + ret[1] + ret[2] + ret[3];
		var res = {
			's' : s,
			'l' : s + ret[4] + ret[5],
			't' : s + ret[7] + ret[8],
			'f' : s + ret[4] + ret[5] + ret[6] + ret[7] + ret[8]
		};
		fn(err,res);
	});
};

