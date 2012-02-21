$(document).ready(function() {

	$("#toggleGrid").click(function(evt) {
		$('#content').toggleClass('showgrid')
		evt.stopPropagation();
	});

});
