define(["/socket.io/socket.io.js"], function() {
	var socket = io.connect();

	socket.on('book', function(data) {
		$('.msg#' + 'x' + (8000 + data.p[0]) + 'y' + (8000 + data.p[1])).fadeOut(function() {
			this.remove();
		});
		var newTxt = $(document.createElement("div")).addClass("msg").addClass(data.s);
		newTxt.hide();
		newTxt.attr('id', 'x' + (8000 + data.p[0]) + 'y' + (8000 + data.p[1]));
		newTxt.css({
			left : (data.p[0] - params.xmin) * params.stepx + 'px',
			top : (data.p[1] - params.ymin) * params.stepy + 'px',
		});
		if(data.t) {
			var newContent = $(document.createElement("p")).text(data.t);
			newTxt.fadeIn();
		} else {
			var newContent = $(document.createElement("p")).addClass("author").text(data.a);
			newTxt.css({
				'background-color' : data.c
			});
			newTxt.fadeIn();
		}
		newTxt.append(newContent);
		$('#map').append(newTxt);
	});

	socket.on('unbook', function(data) {
		$('.msg#' + 'x' + (8000 + data.p[0]) + 'y' + (8000 + data.p[1])).fadeOut(function() {
			$(this).remove();
		});
	});
});
