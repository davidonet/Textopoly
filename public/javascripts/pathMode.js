define(["txt", "uievent", "pathWalk", "pathBox", "mapModule", "helper"], function(txt, uievent, pathWalk, pathBox, mapModule, helper) {
	return {
		init : function() {
			uievent.unbindZoom();
			mapModule.zoomTo(4);
			$('#zoomWrap').fadeOut(250);
			pathBox.bindMsg();
		},
		refresh : function(localParams) {
			var postTxtLoad = function() {

				if ((1 < params.zoom) && (params.zoom < 20)) {
					//Activate path display
					pathWalk.updatePath();
					pathBox.bindMsg();
				}
			};
			txt.loadSection(localParams, postTxtLoad);
		},
		leave : function() {
			uievent.bindZoom();
			$('#pathBox').fadeOut(100);
			$('#zoomWrap').fadeIn(250);
		}
	};

});
