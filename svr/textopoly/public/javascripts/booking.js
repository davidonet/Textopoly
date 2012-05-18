define(["/socket.io/socket.io.js", "helper"], function(socket_io, helper) {
	// Connection to the server
	var socket = io.connect();

	/**
	 *  book event handling
	 *  cell is first booked with authors name
	 *  then replaced by text or image
	 */
	socket.on('book', function(data) {
		// Remove any msg already displayed at tjis place
		$('.msg[dc="' + data.p + '"]').fadeOut(function() {
			$(this).remove();
		});
		// New cell building
		var newTxt = $(document.createElement("div")).addClass("msg").addClass(data.s).addClass(data.c);
		if(data.t != null)
			newTxt.addClass(helper.txtLen2Class(data.t.length));
		newTxt.hide();
		newTxt.attr('dc', data.p);
		newTxt.css(helper.posToCSS(data.p));
		if(data.c == 'image') {
			var newContent = $(document.createElement("img")).attr("src", "/getimg/[" + data.p + "]");
		} else {
			if(data.t) {
				// text filled cell
				var newContent = $(document.createElement("p")).text(data.t);
			} else {
				// booked cell
				var newContent = $(document.createElement("p")).addClass("author").text(data.a);
				newTxt.addClass('l0');
			}
		}
		newTxt.append(newContent);
		$('#map').append(newTxt);
		newTxt.fadeIn();

	});

	/**
	 * unbook cell handling event
	 */
	socket.on('unbook', function(data) {
		// fadeout and remove html event
		console.log(data.p);
		$('.msg[dc="' + data.p + '"]').remove();

	});
	return {
		book : function(x, y, s, c, a) {
			socket.emit('book', {
				x : x,
				y : y,
				s : s,
				c : c,
				a : a,
				t : ""
			})
		},
		unbook : function(x, y) {
			socket.emit('unbook', {
				x : x,
				y : y
			});
		},
	}
});
