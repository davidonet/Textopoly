var socket = io.connect('http://192.168.1.79');
socket.on('book', function(data) {
	var newTxt = $(document.createElement("div")).addClass("msg").addClass(data.s);
	newTxt.attr('id','x'+(8000+data.p[0])+'y'+(8000+data.p[1]));
	newTxt.css({
		left : (data.p[0] - params.xmin) * params.stepx + 'px',
		top : (data.p[1] - params.ymin) * params.stepy+ 'px',
		'background-color': data.c
	});
	var newAuthor = $(document.createElement("p")).addClass("author").text(data.a);
	newTxt.append(newAuthor);
	$('#map').append(newTxt);
});
socket.on('unbook', function(data) {
	$('.msg#'+'x'+(8000+data.p[0])+'y'+(8000+data.p[1])).remove();
});
