define(["txt", "pathWalk"], function(txt, pathWalk) {
	return {
		init : function() {
			
		},
		refresh : function(localParams) {
			var postTxtLoad = function() {
			};
			if ((1 < params.zoom) && (params.zoom < 20)) {
				//Activate path display
				postTxtLoad = pathWalk.updatePath;
			}
			txt.loadSection(localParams, postTxtLoad);
		},
		leave : function() {

		}
	};
});
