define(["txt", "uievent", "pathWalk", "pathBox", "mapModule", "helper"], function(txt, uievent, pathWalk, pathBox, mapModule, helper) {
	return {
		init : function() {
			mapModule.zoomTo(4);
			uievent.unbindZoom();
			$('#zoomWrap').fadeOut(250);
			pathBox.bindMsg();

		},
		refresh : function(localParams) {
			pathBox.bindMsg();

			var postTxtLoad = function() {

				if ((1 < params.zoom) && (params.zoom < 20)) {
					//Activate path display
					pathWalk.updatePath();
				}

			};
			txt.loadSection(localParams, postTxtLoad);
		},
		leave : function() {
			$('.msg').bind('dblclick');
			uievent.bindZoom();
			$('#zoomWrap').fadeIn(250);

		}
	};

});
