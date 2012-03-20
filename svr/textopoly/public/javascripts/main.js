require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js","jquery.ui.touch-punch"], function($) {
	$(function() {
		$(document).ready(function() {
			// masque les infos de debug
			require(["bookingsocket"], function() {
			});
			require(["gridinteraction"], function() {
				anchorPoint();
				$('.fz > p').hide();
			});
			// drag map
			$('div#map').draggable();
			$('div#map').animate({
				left:(params.xmin * params.stepx)+$(document).width()/2,
				top:(params.ymin * params.stepy)+$(document).height()/2
			});
			
		});
	});
});