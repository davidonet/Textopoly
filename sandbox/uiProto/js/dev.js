$(document).ready(function() {

	// masque les coordonnées
	$('.coord').hide();
	$('.anchorpoint > p').hide();
	//	$('#map').hide();

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
