define(['helper'], function(helper) {

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

	$('#zoomSlider').slider({
		orientation : "vertical",
		min : 0,
		max : 5,
		step : 1,
		value : zoomValue,
		change : function() {

			var sliderValue = $(this).slider("option", "value");
			var xcenter = helper.getCenterX();
			var ycenter = helper.getCenterY();
			$('#map').fadeOut(300, function() {
				switch(sliderValue) {
					case 0:
						$(location).attr('href', '/view?zoom=40&xcenter=' + xcenter + '&ycenter=' + ycenter);
						break;
					case 1:
						$(location).attr('href', '/view?zoom=20&xcenter=' + xcenter + '&ycenter=' + ycenter);
						break;
					case 2:
						$(location).attr('href', '/view?zoom=10&xcenter=' + xcenter + '&ycenter=' + ycenter);
						break;
					case 3:
						$(location).attr('href', '/view?zoom=4&xcenter=' + xcenter + '&ycenter=' + ycenter);
						break;
					case 4:
						$(location).attr('href', '/view?zoom=2&xcenter=' + xcenter + '&ycenter=' + ycenter);
						break;
					case 5:
						$(location).attr('href', '/view?zoom=1&xcenter=' + xcenter + '&ycenter=' + ycenter);
				}
			});
		}
	});

	

	// center map
	$('#map').css({
		left : helper.initLeft,
		top : helper.initTop,
		width : (params.xmax - params.xmin) * params.stepx,
		height : (params.ymax - params.ymin) * params.stepy
	});
});
