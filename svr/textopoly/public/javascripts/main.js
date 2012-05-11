requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min',
		'konami' : 'http://konami-js.googlecode.com/svn/trunk/konami'
	}
});
require(["jquery", "jquery-ui", "lib/jquery.ui.touch-punch", "lib/jquery.form", "lib/syronex-colorpicker"], function($) {
	$(function() {
		$(document).ready(function() {
			$('#map').fadeIn(500);
			require(["mapmodule"], function() {
				require(["bookingsocket"]);
				require(["writemodule"]);
				require(["pathwalk"]);
				require(["uievent"]);
			});
		});
	});
});
