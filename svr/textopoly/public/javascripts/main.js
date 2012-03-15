require(["jquery"], function($) {
	$(function() {
		$(document).ready(function() {
			require(["bookingsocket"], function() {
			});
			require(["gridinteraction"], function() {
				anchorPoint();
			});
		// masque les infos de debug
			$('.coord').hide();
		$('.anchorpoint > p').hide();
		// drag map
	$('div#map').draggable({
		appendTo : 'div#content'
	});
			
	
		
		
		});
	});
});
