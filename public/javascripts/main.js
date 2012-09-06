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
							$('#map').show();
							dynload.loadSection(params, pathwalk.updatePath);
						});
						var isOn = false;
						setInterval(function() {
							if (isOn)
								$('#blink').hide();
							else
								$('#blink').show();
							isOn = !isOn;
						}, 1000);

						require(["userinfo"]);
						require(["writemodule"]);
						require(["uievent"]);
					});
				});
			});
		});
	});
});

