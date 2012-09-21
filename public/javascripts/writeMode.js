define(["mapModule", "txt", "uievent", "writemodule"], function(mapModule, txt, uievent, writemodule) {
	return {
		init : function() {
			$('#zoomSlider').slider("disable");
			uievent.unbindZoom();
			mapModule.zoomTo(2);
			$('#zoomWrap').fadeOut(250);
		},
		refresh : function(localParams) {
			txt.loadSection(localParams, writemodule.updateClick);
		},
		leave : function() {
			$('#content').unbind('click');
			$('.msg').unbind('click');
			$('#zoomSlider').slider("enable");
			uievent.bindZoom();
			$('#zoomWrap').fadeIn(250);
			$('#writingBox').fadeOut(100);
		}
	};
});
