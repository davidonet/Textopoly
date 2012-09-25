( {
	appDir : "..",
	baseUrl : "javascripts",
	dir : "../../public-optimize",
	paths : {
		"jquery" : "lib/require-jquery",
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min'
	},
	modules : [{
		name : "main",
		exclude : ["jquery"]
	}]
});