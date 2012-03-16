require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"], function($) {
	$(function() {
		$(document).ready(function() {
			// masque les infos de debug
			$('.coord').hide();

			require(["bookingsocket"], function() {
			});
			require(["gridinteraction"], function() {
				anchorPoint();
				$('.fz > p').hide();

			});
			require(["jquery.ui.touch-punch.js", "jquery.ui.touch-punch.js"], function(draggable) {
				// drag map
				$('div#map').draggable();
			});
			// blinking ;-)
			function blink() {
				$("#blink").fadeTo(1200, 0).fadeTo(800, 1, function() {
					blink()
				});
			}

			$(function() {
				blink();
			});
		});
	});
});
