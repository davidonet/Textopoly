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
			this.remove();
		});
		// New cell building
		var newTxt = $(document.createElement("div")).addClass("msg").addClass("mdf").addClass(data.s).addClass(data.c);
		newTxt.addClass(helper.txtLen2Class(data.t.length));
		newTxt.hide();
		newTxt.attr('dc', data.p);
		newTxt.css(helper.posToCSS(data.p));
		if(data.t) {
			// text filled cell
			var newContent = $(document.createElement("p")).text(data.t);
			newTxt.fadeIn();
		} else {
			// booked cell
			var newContent = $(document.createElement("p")).addClass("author").text(data.a);
			newTxt.addClass('l0');
			newTxt.fadeIn();
		}
		newTxt.append(newContent);

		/***********************************************************************************
		 * Begin temporary delete ui
		 ***********************************************************************************/
		var newCtx = $(document.createElement("div")).addClass("ctx").text("x");
		newCtx.on('click', function(event) {
			var dc = $(this).parent().attr('dc').split(',');
			// récupère la propriété dc d'un élément .fz dans un tableau
			var xGrid = dc[0];
			// récupère x de dc
			var yGrid = dc[1];
			$('#removebox').dialog({
				"resizable" : false,
				"title" : "Suppression ?",
				buttons : {
					"Non, je ne préfère pas" : function() {
						$(this).dialog("close");
					},
					"Oui" : function() {
						$(this).dialog("close");
						$.getJSON('/remove?x=' + xGrid + '&y=' + yGrid, function(data) {
						});
					}
				}
			});
		});
		newTxt.append(newCtx);
		/***********************************************************************************
		 * End of temporary delete ui
		 */

		$('#map').append(newTxt);

	});

	/**
	 * unbook cell handling event
	 */
	socket.on('unbook', function(data) {
		// fadeout and remove html event
		$('.msg[dc="' + data.p + '"]').fadeOut(function() {
			$(this).remove();
		});
	});
});
