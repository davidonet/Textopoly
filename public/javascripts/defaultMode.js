define(["dynload", "pathwalk"], function(dynload, pathwalk) {
	return {
		refresh : function() {
			var postTxtLoad = function() {
			};
			if ((2 < params.zoom) && (params.zoom < 20)) {
				//Activate path display
				postTxtLoad = pathwalk.updatePath;
			}
			dynload.loadSection(params, postTxtLoad);
		}
	};
});
