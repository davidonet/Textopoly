define(['lib/jquery.cookie', "lib/syronex-colorpicker"], function() {
	$('#current_author').val($.cookie("author"));
	$('#current_author').keyup(function() {
		$.cookie("author", $('#current_author').val());
	});
	$('#colorPicker').colorPicker({
		color : new Array("#fce94f", "#fcaf3e", "#8ae234", "#729fcf", "#ad7fa8", "#ef2929"),
		defaultColor : $.cookie("colorIdx"),
		columns : 6,
		click : function(color) {
			switch(color) {
				case "#fce94f" :
					params.c = "butter";
					break;
				case "#fcaf3e" :
					params.c = "orange";
					break;
				case "#8ae234" :
					params.c = "chameleon";
					break;
				case "#729fcf" :
					params.c = "skyblue";
					break;
				case "#ad7fa8" :
					params.c = "plum";
					break;
				case "#ef2929" :
					params.c = "scarletred";
					break;
			}
			$.cookie("colorIdx", color);
		}
	});
	return {
		msgInfo : function(x, y, fn) {
			$.getJSON('/info/' + x + '/' + y, function(data) {
				fn(data);
			});
		},
		get : function() {
			return $.cookie("author");
		},
		set : function(name) {
			$.cookie("author", name);
		}
	};
});
