var mongo = require('mongoskin');
var fs = require('fs');
var im = require('imagemagick');

try {
	var sensible = require('../sensible');
	global.db = mongo.db(sensible.mongourl());
} catch(err) {
	console.log("No sensible file");
}

db.bind('txt', {
	images : function(fn) {
		this.find({
			"c" : "image"
		}, {
			"p" : 1
		}).toArray(fn);
	}
});

db.txt.images(function(err, items) {
	items.forEach(function(value, index) {
		var pos = '[' + value.p[0] + ',' + value.p[1] + ']';
		var aGSData = {
			"content_type" : "image/jpg",
			"metadata" : {
				"a" : value.a,
				"x" : value.p[0],
				"y" : value.p[1],
				"s" : value.s,
				"c" : 'image'
			}
		};
		db.gridfs().open(pos, 'r', function(err, gs) {
			var oFn = '/tmp/t' + pos + '.jpg';
			var sFn = '/tmp/s' + pos + '.jpg';
			var ws = fs.createWriteStream(oFn);
			gs.read(function(err, reply) {
				ws.write(reply, function() {
					im.resize({
						srcPath : oFn,
						dstPath : sFn,
						format : 'jpg',
						progressive : false,
						width : 192,
						height : 128,
						strip : true,
						filter : 'Lagrange',
						sharpening : 0.2
					}, function(err, stdout, stderr) {
						db.gridfs().unlink('s' + pos, function(err, gs1) {
							db.gridfs().open('s' + pos, 'w', aGSData, function(err, gs) {
								gs.writeFile(sFn, function(err, gs) {
									fs.unlink(sFn, function(err) {
										fs.unlink(oFn, function(err) {
											console.log(pos + " : done");
										});
									});
								});
							});
						});
					});
				});
			});
		});

	});
});

