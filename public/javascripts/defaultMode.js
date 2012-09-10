define(["txt", "pathWalk", "infoBox"], function(txt, pathWalk, infoBox) {
	return {
		init : function() {

		},
		refresh : function(localParams) {
			var postTxtLoad = function() {
				if (params.zoom == 2)
					infoBox.bindMsg();
				if ((1 < params.zoom) && (params.zoom < 20)) {
					//Activate path display
					pathWalk.updatePath();
				}
			};
			txt.loadSection(localParams, postTxtLoad);
		},
		leave : function() {
			infoBox.unbindMsg();
		}
	};
});
