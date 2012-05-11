define(['lib/jquery.cookie'], function() {

	$('#current_author').change(function() {
		params.a = $('#current_author').val();
		$.cookie("author", params.a);
	}).val($.cookie("author"));

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
		},
	});
});
