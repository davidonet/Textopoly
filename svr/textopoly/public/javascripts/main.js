require(["jquery"], function($) {
	$(function() {
		$(document).ready(function() {
			require(["bookingsocket"], function() {
			});
			require(["gridinteraction"], function() {
				anchorPoint();
			});
		});
	});
});
