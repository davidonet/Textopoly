requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min',
	}
});
var params;
require(["jquery", "jquery-ui", "lib/jquery.ui.touch-punch", "lib/jquery.form", "lib/syronex-colorpicker", "lib/jquery.tipsy"], function($) {

	$(function() {
		$(document).ready(function() {
			params = {
				"zoom" : 2,
				"stepx" : 120,
				"stepy" : 80
			};

			params.xmin = Math.floor(-$(window).width() / (2 * params.stepx));
			params.xmax = Math.ceil($(window).width() / (2 * params.stepx));
			params.ymin = Math.floor(-$(window).height() / (2 * params.stepx));
			params.ymax = Math.ceil($(window).height() / (2 * params.stepx));

			function loadSection() {
				require(["txt"], function(txt) {
					txt.removeInvisible();
					$.ajax({
						url : 'section',
						dataType : 'json',
						data : params,
						success : function(section) {
							$(section.texts).each(function(index, data) {
								txt.insert(data);
							});
						}
					});
				});

			}

			loadSection();

			$(document).keydown(function(e) {
				switch(e.keyCode) {
					case 37:
						{
							params.xmin--;
							params.xmax--;

						}
						break;
					case 39:
						{
							params.xmin++;
							params.xmax++;

						}
						break;
					case 38:
						{
							params.ymin--;
							params.ymax--;
						}
						break;
					case 40:
						{
							params.ymin++;
							params.ymax++;
						}
						break;
				}
				console.log(e.keyCode + " : " + params.xmin + "," + params.xmax);
				loadSection();
				return false;
			});
		});

	});
});
