( {
	appDir : "..",
	baseUrl : "javascripts",
	dir : "../../public-optimize",
	keepBuildDir: false,
	paths : {
		"jquery" : "lib/require-jquery",
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min',
		"socket.io" : '../../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io'
	},
	modules : [{
		name : "main",
		exclude : ["jquery"]
	}]
})