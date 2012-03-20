require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js", "jquery.ui.touch-punch"], function($) {
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
			// slider

			/* Valeurs Slider - Echelles
			 * 5 1:1
			 * 4 1:2
			 * 3 1:4
			 * 2 1:10
			 * 1 1:20
			 * 0 1:40
			 */
			
			// Récupère la valeur de zoom de la page et règle le slider

			var zoomFactor = params.zoom;
			var zoomValue = 3;

			console.log(params.zoom);

			switch(zoomFactor) {
				case 40:
					zoomValue = 0;
					break;
				case 20:
					zoomValue = 1;
					break;
				case 10:
					zoomValue = 2;
					break;
				case 4:
					zoomValue = 3;
					break;
				case 2:
					zoomValue = 4;
					break;
				case 1:
					zoomValue = 5;
					break;
			};

			// Réglage du zoomSlider

			$('div#zoomSlider').slider({
				orientation : "vertical",
				min : 0,
				max : 5,
				step : 1,
				value : zoomValue,
				change : function() {

					var sliderValue = $(this).slider("option", "value");

					switch(sliderValue) {
						case 0:
							$(location).attr('href', '/view?zoom=40');
							break;
						case 1:
							$(location).attr('href', '/view?zoom=20');
							break;
						case 2:
							$(location).attr('href', '/view?zoom=10');
							break;
						case 3:
							$(location).attr('href', '/view?zoom=4');
							break;
						case 4:
							$(location).attr('href', '/view?zoom=2');
							break;
						case 5:
							$(location).attr('href', '/view?zoom=1');
							break;

					}

				}
			});

			

			// drag map
			$('div#map').draggable();

		});
	});
});
