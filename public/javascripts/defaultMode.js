define(["txt", "pathWalk", "infoBox", "mapModule"], function(txt, pathWalk, infoBox, mapModule) {
	return {
		init : function() {

		},
		refresh : function(localParams) {
			var postTxtLoad = function() {
				if (params.zoom == 2) {
					infoBox.bindMsg();
				} else {
					$('.msg').dblclick(function(e) {
						var x = e.pageX - (params.stepx / 2), y = e.pageY - (params.stepy / 2);
						var posX = params.xmin + Math.floor((x - $('#map').position().left) / params.stepx), posY = params.ymin + Math.floor((y - $('#map').position().top) / params.stepy);
						mapModule.centerTo([posX, posY]);
						mapModule.zoomTo(2);
					});
				}
				if ((1 < params.zoom) && (params.zoom < 20)) {
					//Activate path display
					pathWalk.updatePath();
				}

			};
			txt.loadSection(localParams, postTxtLoad);
		},
		leave : function() {
			infoBox.unbindMsg();
			$('.msg').unbind('dblclick');
		}
	};
});
