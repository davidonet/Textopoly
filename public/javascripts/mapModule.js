define(['helper', 'pathWalk'], function(helper, pathWalk) {

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

	function getZoomSlider() {
		var zoomValue = 3;

		switch(params.zoom) {
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
		return zoomValue;
	}

	function getZoomValue(sliderValue) {
		var zoom = params.zoom;
		switch(sliderValue) {
			case 0:
				zoom = 40;
				break;
			case 1:
				zoom = 20;
				break;
			case 2:
				zoom = 10;
				break;
			case 3:
				zoom = 4;
				break;
			case 4:
				zoom = 2;
				break;
			case 5:
				zoom = 1;
		}
		return zoom;
	}

	var zoomTo = function(zoomLevel, center) {
		if (params.zoom != zoomLevel) {
			$('#writingBox').hide();
			$('#informationBox').hide();
			$('#map').removeClass('z1').removeClass('z2').removeClass('z4').removeClass('z10').removeClass('z20').removeClass('z40');
			params.zoom = zoomLevel;
			switch(zoomLevel) {
				case 40:
					$('#map').addClass('z40');
					break;
				case 20:
					$('#map').addClass('z20');
					break;
				case 10:
					$('#map').addClass('z10');
					break;
				case 4:
					$('#map').addClass('z4');
					break;
				case 2:
					$('#map').addClass('z2');
					break;
				case 1:
					$('#map').addClass('z1');
			}

			$('.msg').remove();
			pathWalk.hidePath();
			if (center) {
				params.xcenter = center[0];
				params.ycenter = center[1];
			} else {
				params.xcenter = helper.getCenterX();
				params.ycenter = helper.getCenterY();
			}
			$('#map').css({
				top : 0,
				left : 0
			});
			computeCellSize();
			computeParams();
			$('#zoomSlider').slider('value', getZoomSlider());

		}
	};

	centerTo = function(pos, smooth, fn) {
		var x = 1 + Math.floor(helper.posToLeft(pos) / 2) * 2, y = 1 + Math.floor(helper.posToTop(pos) / 2) * 2;
		pathWalk.hidePath();
		if (smooth) {
			$("#map").animate({
				left : Math.floor($(document).width() / 2) - x,
				top : Math.floor($(document).height() / 2) - y
			}, fn);
		} else {
			$("#map").css({
				left : Math.floor($(document).width() / 2) - x,
				top : Math.floor($(document).height() / 2) - y
			});
			fn();
		}
	};

	return {
		zoomTo : zoomTo,
		centerTo : centerTo,
		init : function() {

			$('#content').mousemove(function(event) {
				if (event.pageX !== null) {
					$("#posInfo").text(helper.xToPos(event.pageX) + ',' + helper.yToPos(event.pageY));
				}
			});

			$('#map').draggable({
				stop : function(event, ui) {
					var xmin = params.xmin + Math.ceil((-$('#map').position().left - params.stepx) / (params.stepx));
					var ymin = params.ymin + Math.ceil((-$('#map').position().top - params.stepy) / (params.stepy));
					var lparam = {
						"xmin" : xmin - 2,
						"ymin" : ymin - 2,
						"xmax" : xmin + params.txtwidth + 2,
						"ymax" : ymin + params.txtheight + 2
					};
					require(["modeHandler"], function(modeHandler) {
						modeHandler.refresh(lparam);
					});
				},
				start : function(event, ui) {
					pathWalk.hidePath();
				}
			});

			$(window).smartresize(function() {
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
				require(["modeHandler"], function(modeHandler) {
					pathWalk.resize();
					modeHandler.refresh(lparam);
				});
			});

			$('#zoomSlider').slider({
				orientation : "vertical",
				min : 0,
				max : 5,
				step : 1,
				value : getZoomSlider(),
				change : function() {
					var sliderValue = $(this).slider("option", "value");
					var zoom = getZoomValue(sliderValue);
					if (zoom != params.zoom) {
						zoomTo(zoom);
						require(["modeHandler"], function(modeHandler) {
							modeHandler.refresh();
						});
					}
				}
			});

			computeParams();
			// center map
			$('#map').css({
				left : helper.initLeft,
				top : helper.initTop
			});
		}
	};
});
