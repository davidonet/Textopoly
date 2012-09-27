define(["txt", "pathWalk", "infoBox", "mapModule", "helper"], function(txt, pathWalk, infoBox, mapModule, helper) {
	return {
		init : function() {

		},
		refresh : function(localParams) {
			var postTxtLoad = function() {
				if (params.zoom == 2) {
					infoBox.bindMsg();
				} else {
					$('.msg').dblclick(function(e) {
						mapModule.centerTo([helper.xToPos(e.pageX), helper.yToPos(e.pageY)], false, function() {
							mapModule.zoomTo(2);
							require(["modeHandler"], function(modeHandler) {
								modeHandler.refresh();
							});
						});
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
			$('#informationBox').fadeOut(100);

		}
	};
});
