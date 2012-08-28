define(['helper', "pathwalk", "dynload"], function(helper, pathwalk, dynload) {

	function computeCellSize() {
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

	}

	function computeParams() {
		computeCellSize();
		params.txtwidth = Math.ceil(($(window).width()) / params.stepx);
		params.txtheight = Math.ceil(($(window).height()) / params.stepy);
		params.xmin = Math.ceil(params.xcenter - params.txtwidth / 2);
		params.xmax = Math.ceil(params.xcenter + params.txtwidth / 2);
		params.ymin = Math.ceil(params.ycenter - params.txtheight / 2);
		params.ymax = Math.ceil(params.ycenter + params.txtheight / 2);
	}

	computeParams();

	$(window).resize(function() {
		params.txtwidth = Math.ceil(($(window).width()) / params.stepx);
		params.txtheight = Math.ceil(($(window).height()) / params.stepy);
		var xmin = params.xmin + Math.ceil((-$('#map').position().left - params.stepx) / (params.stepx));
		var ymin = params.ymin + Math.ceil((-$('#map').position().top - params.stepy) / (params.stepy));
		var lparam = {
			"xmin" : xmin,
			"ymin" : ymin,
			"xmax" : xmin + params.txtwidth,
			"ymax" : ymin + params.txtheight
		};
		dynload.loadSection(lparam, function() {
		});
	});

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
	}

	// Réglage du zoomSlider

	$('#zoomSlider').slider({
		orientation : "vertical",
		min : 0,
		max : 5,
		step : 1,
		value : zoomValue,
		change : function() {

			var sliderValue = $(this).slider("option", "value");
			$('#map').fadeOut(300, function() {
				$('#map').removeClass('z1').removeClass('z2').removeClass('z4').removeClass('z10').removeClass('z20').removeClass('z40');
				switch(sliderValue) {
					case 0:
						params.zoom = 40;
						$('#map').addClass('z40');
						break;
					case 1:
						params.zoom = 20;
						$('#map').addClass('z20');
						break;
					case 2:
						params.zoom = 10;
						$('#map').addClass('z10');
						break;
					case 3:
						params.zoom = 4;
						$('#map').addClass('z4');
						break;
					case 4:
						params.zoom = 2;
						$('#map').addClass('z2');
						break;
					case 5:
						params.zoom = 1;
						$('#map').addClass('z1');
				}
				$('.msg').remove();
				$('svg').remove();
				params.xcenter = helper.getCenterX();
				params.ycenter = helper.getCenterY();
				
				$('#map').css({
					top : 0,
					left : 0
				})
				computeCellSize();
				computeParams();
				dynload.loadSection(params, pathwalk.updatePath);
			});
		}
	});

	// center map
	$('#map').css({
		left : helper.initLeft,
		top : helper.initTop
	});
});
