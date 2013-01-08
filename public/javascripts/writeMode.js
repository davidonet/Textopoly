define(["mapModule", "txt", "uievent", "writemodule"], function(mapModule, txt, uievent, writemodule) {
	return {
		init : function() {
			uievent.unbindZoom();
			mapModule.zoomTo(2);
			$('#zoomWrap').fadeOut(250);
			$('#colorPicker').show();
			$('#footer').animate({
				bottom : 0
			});
			$('#footer').click(function(event) {
				event.preventDefault();
				return false;
			});
			$('.msg').click(function(event) {
				event.preventDefault();
				return false;
			});
		},
		refresh : function(localParams) {
			txt.loadSection(localParams, writemodule.updateClick);
		},
		leave : function() {
			$('#content').unbind('click');
			$('.msg').unbind('click');
			uievent.bindZoom();
			$('#zoomWrap').fadeIn(250);
			$('#writingBox').fadeOut(100);
			$('#footer').unbind('click');

		}
	};
});
