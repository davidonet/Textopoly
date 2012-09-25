var fs = require('fs');
var im = require('imagemagick');

exports.postimg = function(req, res, next) {

	if (req.xhr) {
		var fName = req.header('x-file-name'), fSize = req.header('x-file-size'), fType = req.header('x-file-type'), ws = fs.createWriteStream('/tmp/' + fName);

		var aGSData = {
			"content_type" : fType,
			"metadata" : {
				"a" : req.query.a,
				"x" : req.query.x,
				"y" : req.query.y,
				"s" : req.query.s,
				"c" : 'image'
			}
		};

		req.on('data', function(data) {
			ws.write(data);
		});

		req.on('end', function() {

			im.resize({
				srcPath : '/tmp/' + fName,
				dstPath : '/tmp/' + fName,
				format : 'jpg',
				progressive : false,
				width : 960,
				height : 640,
				strip : true,
				filter : 'Lagrange',
				sharpening : 0.2
			}, function(err, stdout, stderr) {

				db.gridfs().open('[' + req.query.x + ',' + req.query.y + ']', 'w', aGSData, function(err, gs) {

					gs.writeFile('/tmp/' + fName, function(err, gs) {
						fs.unlink('/tmp/' + fName, function(err) {
							if (err)
								throw err;
						});
						aGSData.metadata.i = gs._id;
						db.txt.insertTxt(aGSData.metadata, function(err, aTxt) {
							aTxt.success = true;
							res.json(aTxt);
							io.sockets.emit('book', aTxt);
						});
					});
				});

				im.resize({
					srcPath : '/tmp/' + fName,
					dstPath : '/tmp/t' + fName,
					format : 'jpg',
					progressive : false,
					width : 192,
					height : 128,
					strip : true,
					filter : 'Lagrange',
					sharpening : 0.2
				}, function(err, stdout, stderr) {

					db.gridfs().open('s[' + req.query.x + ',' + req.query.y + ']', 'w', aGSData, function(err, gs) {

						gs.writeFile('/tmp/t' + fName, function(err, gs) {
							fs.unlink('/tmp/t' + fName, function(err) {
								if (err)
									throw err;
							});
						});
					});

				});
			});
		});
	}
};

exports.getimg = function(req, res, next) {
	db.gridfs().open(req.params.pos, 'r', function(err, gs) {
		gs.read(function(err, reply) {
			if (err)
				next(err);
			else {
				res.writeHead('200', {
					'Content-Type' : 'image/jpeg',
					'Cache-Control' : 'public, max-age= 3600'
				});
				res.end(reply, 'image/jpeg');
			}
		});
	});
};
