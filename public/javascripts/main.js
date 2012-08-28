requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min'
	}
});
require(["jquery", "jquery-ui", "lib/jquery.ui.touch-punch", "lib/jquery.form", "lib/syronex-colorpicker", "lib/jquery.tipsy"], function($) {
	$(function() {
		$(document).ready(function() {
			require(["mapmodule"], function(mapmodule) {
				require(["pathwalk"], function() {
					require(["dynload"], function(dynload) {
						require(["pathwalk"], function(pathwalk) {
							dynload.loadSection(params, pathwalk.updatePath);
							$('#map').fadeIn(500);

						});
						require(["userinfo"]);
						require(["writemodule"]);
						require(["uievent"]);
					});
				});
			});
		});
	});
});
