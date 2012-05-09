var fs = require('fs');
var im = require('imagemagick');

exports.postimg = function(req, res, next) {
	var aGSData = {
		"content_type" : req.files.image.type,
		"metadata" : {
			"a" : req.body.a,
			"x" : req.body.x,
			"y" : req.body.y,
			"s" : req.body.s,
			"c" : 'image'
		}
	};

	im.resize({
		srcPath : req.files.image.path,
		dstPath : req.files.image.path,
		format : 'jpg',
		progressive : false,
		width : 960,
		height : 640,
		strip : true,
		filter : 'Lagrange',
		sharpening : 0.2,
	}, function(err, stdout, stderr) {
	
		db.gridfs().open('[' + req.body.x + ',' + req.body.y + ']', 'w', aGSData, function(err, gs) {

			gs.writeFile(req.files.image.path, function(err, gs) {
				fs.unlink(req.files.image.path, function(err) {
					if(err)
						throw err;
				});
				aGSData.metadata.i = gs._id;
				db.txt.insertTxt(aGSData.metadata, function(err, aTxt) {
					res.json(aTxt);
					io.sockets.emit('book', aTxt);
				});
			});
		});

	});
}

exports.getimg = function(req, res, next) {
	db.gridfs().open(req.params.id, 'r', function(err, gs) {
		gs.read(function(err, reply) {
			if(err)
				next(err)
			else {
				res.writeHead('200', {
					'Content-Type' : gs.contentType
				});
				res.end(reply, 'binary');
			}
		});
	});
}