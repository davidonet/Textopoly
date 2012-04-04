require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js", "jquery.ui.touch-punch", "jquery.form"], function($) {
	$(function() {
		$(document).ready(function() {

			// masque les infos de debug
			require(["bookingsocket"], function() {
			});
			require(["gridinteraction"], function() {
				anchorPoint();
				require(["writemodule"], function() {
					require(["mapmodule"], function() {
						$('#map').fadeIn(500);
						var removebox = '<div id="removebox"><h2>Suppression</h2></div>'
						$('body').append(removebox);
											
					});
				});
			});
		})
	});
});
