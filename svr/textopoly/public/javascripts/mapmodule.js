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
			var xcenter = helper.centerLeft();
			var ycenter = helper.centerTop();
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

	// drag map
	$('#map').draggable({
		/**
		 * At the of a map drag, check if we are too close from the end of the map.
		 * In this case, we recenter the map and reload the section at this new center  
		 */
		stop : function(event, ui) {
			var dX = Math.abs(helper.initX - ui.position.left);
			var dY = Math.abs(helper.initY - ui.position.top);
			var xcenter = helper.initLeft;
			var ycenter = helper.initTop;

			var bX = 0;
			var bY = 0;
			if(10 < params.zoom) {
				bX = 300 * params.stepx;
				bY = 300 * params.stepy;
			} else {
				bX = 50 * params.stepx;
				bY = 50 * params.stepy;
			}
			if((bX < dX) || (bY < dY)) {
				$('#map').animate({
					left : ((params.xmin - helper.centerLeft() - 1) * params.stepx) + $(document).width() / 2,
					top : ((params.ymin - helper.centerTop() - 1) * params.stepy) + $(document).height() / 2
				}, function() {
					$(location).attr('href', '/view?zoom=' + params.zoom + '&xcenter=' + xcenter + '&ycenter=' + ycenter);

				});
			}
		},
	});

	// center map
	$('#map').css({
		left : helper.initLeft,
		top : helper.initTop,
		width : (params.xmax - params.xmin) * params.stepx,
		height : (params.ymax - params.ymin) * params.stepy
	});
});
