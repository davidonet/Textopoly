define(['helper', 'pathwalk', 'dynload', 'writemodule'], function(helper, pathwalk, dynload, writemodule) {
	var localParams = {
		xmin : params.xmin,
		xmax : params.xmax,
		ymin : params.ymin,
		ymax : params.ymax
	};
	return {
		init : function() {

			helper.btnOver("#btnCenter");
			helper.btnOver("#btnText");
			helper.btnOver("#btnPath");
			helper.btnOver("#btnShow");
			helper.btnOver("#btnFind");
		}
	};
});
