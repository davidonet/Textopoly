define(["txt", "uievent", "pathWalk", "pathBox", "mapModule", "helper"], function(txt, uievent, pathWalk, pathBox, mapModule, helper) {
	return {
		init : function() {
			mapModule.zoomTo(4);
			uievent.unbindZoom();
			$('#zoomWrap').fadeOut(250);
						pathBox.bindPath();


		},
		refresh : function(localParams) {

			var postTxtLoad = function() {

				$('.msg').dblclick(function(e) {
					mapModule.centerTo([helper.xToPos(e.pageX), helper.yToPos(e.pageY)], false, function() {
						mapModule.zoomTo(2);
					});
				});

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
