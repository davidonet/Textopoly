define(["txt", "uievent","pathWalk", "infoBox", "mapModule", "helper", ], function(txt, uievent,pathWalk, infoBox, mapModule, helper) {
	return {
		init : function() {
			mapModule.zoomTo(4);
			uievent.unbindZoom();
			$('#zoomWrap').fadeOut(250);

		},
		refresh : function(localParams) {
			var postTxtLoad = function() {
				if (params.zoom == 2) {
					infoBox.bindMsg();
				} else {
					$('.msg').dblclick(function(e) {
						mapModule.centerTo([helper.xToPos(e.pageX), helper.yToPos(e.pageY)], false, function() {
							mapModule.zoomTo(2);
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
			uievent.bindZoom();
			$('#zoomWrap').fadeIn(250);

		}
	};
});
