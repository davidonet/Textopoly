require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js", "jquery.ui.touch-punch", "jquery.form"], function($) {
	$(function() {
		$(document).ready(function() {
			require(["bookingsocket"], function() {
			});
			require(["gridinteraction"], function() {
				anchorPoint();
				require(["writemodule"], function() {
				});
				require(["mapmodule"], function() {
				});
			});
		});
	});
});
