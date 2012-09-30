define([""], function() {
	return {
		check : function(fn) {
			if (params.user) {
				fn();
			} else {

				$('#loginresult').text("");
				$('#loginform').ajaxForm({
					success : function(data) {
						params.user = data;
						$('#login').hide();
						$('#footer').animate({
							bottom : -470
						}, fn);
					},
					error : function() {
						$('#loginresult').text("Identification invalide");
					}
				});
				$('#login').show();
				$('#footer').animate({
					bottom : -380
				});
			}
		}
	};
});
