define(["dynload", "pathWalk"], function(dynload, pathWalk) {
	return {
		refresh : function(localParams) {
			var postTxtLoad = function() {
			};
			if ((2 < params.zoom) && (params.zoom < 20)) {
				//Activate path display
				postTxtLoad = pathWalk.updatePath;
			}
			dynload.loadSection(localParams, postTxtLoad);
		}
	};
});
