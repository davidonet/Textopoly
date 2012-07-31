define(['helper'], function(helper) {

	switch(params.zoom) {
		case 1:
			params.stepx = 240;
			params.stepy = 160;
			break;
		case 2:
			params.stepx = 120;
			params.stepy = 80;
			break;
		case 4:
			params.stepx = 60;
			params.stepy = 40;
			break;
		case 10:
			params.stepx = 24;
			params.stepy = 16;
			break;
		case 20:
			params.stepx = 12;
			params.stepy = 8;
			break;
		case 40:
			params.stepx = 6;
			params.stepy = 4;
			break;
	}

	params.txtwidth = Math.floor(($(window).width() + 256) / params.stepx)
	params.txtheight = Math.floor(($(window).height() + 256) / params.stepy)
	params.xmin = params.xcenter - params.txtwidth / 2;
	params.xmax = params.xcenter + params.txtwidth / 2;
	params.ymin = params.ycenter - params.txtheight / 2;
	params.ymax = params.ycenter + params.txtheight / 2;

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
	});
});
