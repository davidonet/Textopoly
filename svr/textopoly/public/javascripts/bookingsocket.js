define(["/socket.io/socket.io.js", "helper"], function(socket_io, helper) {
	/**
	 * Compute the message class depending on the text lenght
	 * @param txtlen a characters count
	 */
	function txtLen2Class(txtlen) {
		var lclass = '';
		if(txtlen < 1) {
			lclass = 'l0';
		} else if(txtlen < 4) {
			lclass = 'l4';
		} else if(txtlen < 15) {
			lclass = 'l15';
		} else if(txtlen < 50) {
			lclass = 'l50';
		} else if(txtlen < 150) {
			lclass = 'l150';
		} else if(txtlen < 300) {
			lclass = 'l300';
		} else if(txtlen < 601) {
			lclass = 'l600';
		} else {
			lclass = 'warning';
		}
		return lclass;
	}

	var socket = io.connect();

	socket.on('book', function(data) {
		$('.msg[dc="' + data.p + '"]').fadeOut(function() {
			this.remove();
		});
		var newTxt = $(document.createElement("div")).addClass("msg").addClass("mdf").addClass(data.s).addClass(data.c);
		newTxt.addClass(txtLen2Class(data.t.length));
		newTxt.hide();
		newTxt.attr('dc', data.p);
		newTxt.css(helper.posToCSS(data.p));
		if(data.t) {
			var newContent = $(document.createElement("p")).text(data.t);
			newTxt.fadeIn();
		} else {
			var newContent = $(document.createElement("p")).addClass("author").text(data.a);
			newTxt.addClass('l0');
			newTxt.fadeIn();
		}
		newTxt.append(newContent);
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
		$('#map').append(newTxt);
	});

	socket.on('unbook', function(data) {
		$('.msg[dc="' + data.p + '"]').fadeOut(function() {
			$(this).remove();
		});
	});
});
