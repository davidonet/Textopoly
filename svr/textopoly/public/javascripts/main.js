requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min',
	}
});
require(["jquery", "jquery-ui", "lib/jquery.ui.touch-punch", "lib/jquery.form", "lib/syronex-colorpicker", "lib/jquery.tipsy"], function($) {
	$(function() {
		$(document).ready(function() {
			switch(params.zoom) {
				case 1:
					params.stepx = 240;
					params.stepy = 160;
					break;
				case 2:
					params.stepx = 120;
					params.stepy = 80;
					break;
				case 4:
					params.stepx = 60;
					params.stepy = 40;
					break;
				case 10:
					params.stepx = 24;
					params.stepy = 16;
					break;
				case 20:
					params.stepx = 12;
					params.stepy = 8;
					break;
				case 40:
					params.stepx = 6;
					params.stepy = 4;
					break;
			}

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
