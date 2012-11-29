define(["lib/syronex-colorpicker"], function() {

	var updateCP = function() {
		if (params.user) {
			$('#colorPicker').colorPicker({
				color : new Array("#fce94f", "#fcaf3e", "#8ae234", "#729fcf", "#ad7fa8", "#ef2929"),
				defaultColor : params.user.color,
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
					params.user.color = color;
				}
			});
		}
	};

	var check = function(fn) {
		if (params.user) {
			updateCP();
			fn();

			$("#btnLog").removeClass('log').addClass('out');
			
		


		} else {
			$('#loginresult').text("");
			$('#loginform').ajaxForm({
				success : function(data) {
					params.user = data;
					updateCP();
					$('#login').hide();
					$('#footer').animate({
						bottom : -438
					}, fn);
					$("#btnLog").removeClass('log').addClass('out');

				},
				error : function() {
					$('#loginresult').text("Identification invalide");
				}
			});
			$('#login').show();
			$('#footer').animate({
				bottom : -342
			});
		}
	};
	return {
		init : function() {
			updateCP();
			$("#cancelLogin").click(function() {
				$('#login').hide();
				$('#footer').animate({
					bottom : -448
				});
			});
			$("#btnLog").click(function() {
				if (params.user) {
					$.getJSON("/logout", function() {

						
						$("#btnShow").click();
						params.user = undefined;
						$("#btnLog").removeClass('out').addClass('log');

					});
				} else {
					check(function() {
						// user validate
					});
				}
			});
		},
		check : check,
		msgInfo : function(x, y, fn) {
			$.getJSON('/t/' + x + '/' + y, function(data) {
				fn(data);
			});
		}
	};
});
