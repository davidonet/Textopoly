require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js","jquery.ui.touch-punch"], function($) {
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
			// drag map
			$('div#map').draggable();
			
		});
	});
});