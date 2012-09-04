define(["/socket.io/socket.io.js", "helper", "txt"], function(socket_io, helper, txt) {
	// Connection to the server
	var socket = io.connect();

	/**
	 * book event handling
	 * cell is first booked with authors name
	 * then replaced by text or image
	 */

	socket.on('book', function(data) {
		// Remove any msg already displayed at tjis place
		$('.msg[dc="' + data.p + '"]').remove();
		txt.insert(data);
	});

	/**
	 * unbook cell handling event
	 */
	socket.on('unbook', function(data) {
		// fadeout and remove html event
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
			});
		},
		unbook : function(x, y) {
			socket.emit('unbook', {
				x : x,
				y : y
			});
		}
	};
});
