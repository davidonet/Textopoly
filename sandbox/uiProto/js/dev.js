$(document).ready(function() {

	// slider

	$('div#zoomSlider').slider({
		orientation : "vertical",
		value : 4,
		min : 0,
		max : 5,
		step : 1,
		change : function() {

			var zoomFactor = $("div#zoomSlider").slider("option", "value");
			console.log(zoomFactor)

			switch(zoomFactor) {
				case 0:
					$(location).attr('href', "/view?zoom=1");
				case 1:
					$(location).attr('href', "http://www.google.com/");
				case 2:
					$(location).attr('href', "http://www.google.com/");
				case 3:
					$(location).attr('href', "http://www.google.com/");
				case 4:
					$(location).attr('href', "http://www.google.com/");
				case 5:
					$(location).attr('href', "http://www.google.com/");
				default:
				
				break;
				
			}

		}
	});

	/* Valeurs Slider - Echelles
	* 5 1:1
	* 4 1:2
	* 3 1:4
	* 2 1:10
	* 1 1:20
	* 0 1:40
	*/

	// masque les coordonnées
	$('.coord').hide();
	$('.anchorpoint > p').hide();
	//	$('#map').hide();

	// drag map
	$('div#map').draggable();

});
