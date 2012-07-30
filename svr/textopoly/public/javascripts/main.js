requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min',
	}
});
require(["jquery", "jquery-ui", "lib/jquery.ui.touch-punch", "lib/jquery.form", "lib/syronex-colorpicker", "lib/jquery.tipsy"], function($) {
	$(function() {
		$(document).ready(function() {
			params.txtwidth = Math.floor(($(window).width() + 256) / params.stepx)
			params.txtheight = Math.floor(($(window).height() + 256) / params.stepy)
			params.xmin = params.xcenter - params.txtwidth / 2;
			params.xmax = params.xcenter + params.txtwidth / 2;
			params.ymin = params.ycenter - params.txtheight / 2;
			params.ymax = params.ycenter + params.txtheight / 2;
			require(["mapmodule"], function() {
				require(["pathwalk"], function() {
					require(["dynload"], function(dynload) {
						dynload.loadSection(params);
						$('#map').fadeIn(500);
					});
				});
				require(["userinfo"]);
				require(["writemodule"]);
				require(["uievent"]);

			});
		});
	});
});
