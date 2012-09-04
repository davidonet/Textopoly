define(["txt", 'writemodule'], function(txt, writemodule) {
	return {
		loadSection : function(bounds, fn) {
			txt.removeInvisible();
			$.ajax({
				url : 'section',
				dataType : 'json',
				data : bounds,
				success : function(section) {
					$(section.texts).each(function(index, data) {
						txt.insert(data);
					});
					writemodule.updateClick();
					fn();
				}
			});
		}
	};
});
