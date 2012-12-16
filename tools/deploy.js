var eyes = require('eyes'), haibu = require('haibu');

// Create a new client for communicating with the haibu server
var client = new haibu.drone.Client({
	host : 'http.bype.org',
	port : 9002
});

// A basic package.json for a node.js application on haibu
var app = {
	"user" : "dolivari",
	"name" : "textopoly",
	"domain" : "bype.org",
	"repository" : {
		"type" : "git",
		"url" : "git://github.com/davidonet/Textopoly.git"
	},
	"scripts" : {
		"start" : "textopoly.js"
	}
};

// Attempt to start up a new application
client.get(app.name, function(err) {
	if (!err) {
		client.stop(app.name, function() {
			client.clean(app, function() {
				client.start(app, function(err, result) {
					if (err) {
						console.log('Error', err);
						return;
					}
					console.log("Client updated! " + app.name + " running at " + result.drone.port);
				});
			});
		});
	} else {
		client.start(app, function(err, result) {
			if (err) {
				console.log('Error spawning app: ' + app.name);
				client.clean(app, function() {
					console.log("cleaned");
				});
				return eyes.inspect(err);
			}

			console.log('Successfully spawned app:');
			eyes.inspect(result);
		});
	}
});
