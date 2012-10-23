define(["txt", "uievent", "pathWalk", "pathBox", "mapModule", "helper"], function(txt, uievent, pathWalk, pathBox, mapModule, helper) {
	return {
		init : function() {
			uievent.unbindZoom();
			mapModule.zoomTo(4);
			$('#zoomWrap').fadeOut(250);
			pathBox.bindMsg();
			$('#footer').animate({
				bottom : -480
			}, function() {
				$('#colorPicker').hide();
			});
		},
		refresh : function(localParams) {
			var postTxtLoad = function() {
				pathWalk.updatePath();
				pathBox.bindMsg();
			};
			txt.loadSection(localParams, postTxtLoad);
		},
		leave : function() {
			uievent.bindZoom();
			$('.msg').unbind('click');
			pathWalk.cancelPath();
			$('#zoomWrap').fadeIn(250);
		}
	};

});
