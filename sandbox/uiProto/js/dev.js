$(document).ready(function() {

	// slider
	
	// masque les coordonnées
	$('.coord').hide();
	$('.anchorpoint > p').hide();
	//	$('#map').hide();

	$('div#zoomSlider').slider({
			orientation: "vertical",value:40,
			min: 0,
			max: 50,
			step: 10,
		});

	// drag map
	$('div#map').draggable();

	// blinking ;-)
	function blink() {
		$("#blink").fadeTo(600, 0).fadeTo(400, 1, function() {
			blink()
		});
	}

	$(function() {
		blink();
	});
	
	
	

	
});
