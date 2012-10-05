define(["lib/fileuploader", 'lib/jquery.cookie'], function(fileUploader) {

	var delay = 150;
	var textarea = true;
	var msgInfo = false;
	var auth = ($.cookie("author") !== null);
	var freeZone;
	var isBooked = false;
	var uploader = new qq.FileUploader({
		element : $('.imageArea')[0],
		action : '/postimg',
		debug : false,
		uploadButtonText : 'cliquer ou déposer une image',
		onComplete : function() {
			resetWritingBox();
		}
	});

	/***********************************************************************************
	 * BEGIN RESET
	 ***********************************************************************************/

	// Reset writingBox
	function resetWritingBox() {
		$('#writingBox').fadeOut(200, function() {
			require(["helper"], function(helper) {
				$('.editArea').switchClass('l t f', 's', delay, function() {
					helper.handlesPos('.editArea');
				});
				$('.editArea').addClass('l4').removeClass('l15 l50 l150 l300 l600');
				$('.editArea > .e.handle').switchClass('al', 'ar', 0);
				$('.editArea > .so.handle').switchClass('au', 'ad', 0);
				$('.editArea > .sw.handle').switchClass('tx', 'me', 0);
				$('.editArea > .sw.handle').show();
				$('.editArea > .e.handle').show();
				$('.editArea > .so.handle').show();
				$('textarea#write').val('');
				$('input[name*=image]').val('');
				$('.imageArea').hide();
				$('.authorArea').hide();
				$('textarea#write').show();
				$('#writingBox').removeAttr('dc');
				textarea = true;
			});
		});
	}

	// Reset infoBox

	function writingBox(xPos, yPos, data) {
		require(["booking", "userinfo", "helper"], function(booking, userinfo, helper) {

			isFatFree = false;
			var dc = data.pos;
			$('#informationBox').fadeOut(100);
			if ($('#writingBox').attr('dc')) {
				var aDC = $('#writingBox').attr('dc').split(',');
				booking.unbook(aDC[0], aDC[1]);
			}
			// positionnement du formulaire d'écriture
			$('#writingBox').css({
				'left' : xPos - 10,
				'top' : yPos - 10
			}).fadeIn();

			$('textarea#write').focus();
			$('.editArea').switchClass('l t f', 's', delay, function() {
				helper.handlesPos('.editArea');
			});

			$('.editArea > .e.handle').switchClass('al', 'ar', 0);
			$('.editArea > .so.handle').switchClass('au', 'ad', 0);
			/*$('.editArea > .sw.handle').switchClass('tx', 'me', 0)*/

			$('#writingBox').attr('dc', dc);
			// récupère la propriété dc d'un élément .fz dans un tableau
			var xGrid = dc[0];
			// récupère x de dc
			var yGrid = dc[1];
			// récupère y de dc
			booking.book(xGrid, yGrid, 's', params.c, params.user.author);
			var position = $('#writingBox').position();
			freeZone = data.freeZone;
			$('.editArea > .e.handle').hide();
			$('.editArea > .so.handle').hide();
			if (freeZone.l === 0)
				$('.editArea > .e.handle').show();
			if (freeZone.t === 0)
				$('.editArea > .so.handle').show();
		});
	}

	/***********************************************************************************
	 * END WRITINGBOX
	 ***********************************************************************************/

	function newSize(s) {
		if ($('#writingBox').attr('dc')) {
			var aDC = $('#writingBox').attr('dc').split(',');
			require(["booking", "userinfo"], function(booking, userinfo) {
				booking.unbook(aDC[0], aDC[1]);
				booking.book(aDC[0], aDC[1], s, params.c, params.user.author);
			});
		}
	}

	/***********************************************************************************
	 * BEGIN INTERACTIONS ON WRITINGBOX HANDLES
	 ***********************************************************************************/

	// WRITINGBOX NORTH WEST > cancel action
	$('.editArea > .nw.handle').click(function() {
		require(["booking"], function(booking) {
			if ($('#writingBox').attr('dc')) {
				var aDC = $('#writingBox').attr('dc').split(',');
				booking.unbook(aDC[0], aDC[1]);
			}
			resetWritingBox();
		});
		return false;
	});
	// WRITINGBOX EAST > scale box on X direction
	$('.editArea > .e.handle').click(function() {
		require(["helper"], function(helper) {
			$(this).hide();

			if (freeZone.f !== 0)
				$('.editArea > .so.handle').hide();
			if ($('.editArea').hasClass('s')) {
				$('.editArea').switchClass('s', 'l', delay, function() {
					helper.handlesPos('.editArea');
					$('.editArea > .e.handle').switchClass('ar', 'al', 0);
					$('.editArea > .e.handle').show();
					newSize('l');

				});
			} else if ($('.editArea').hasClass('l')) {

				$('.editArea').switchClass('l', 's', delay, function() {
					helper.handlesPos('.editArea');
					$('.editArea > .e.handle').switchClass('al', 'ar', 0);
					$('.editArea > .e.handle').show();
					if (freeZone.t === 0)
						$('.editArea > .so.handle').show();
					newSize('s');
				});
			} else if ($('.editArea').hasClass('t')) {

				$('.editArea').switchClass('t', 'f', delay, function() {
					helper.handlesPos('.editArea');
					$('.editArea > .e.handle').switchClass('ar', 'al', 0);
					$('.editArea > .e.handle').show();
					newSize('f');
				});
			} else if ($('.editArea').hasClass('f')) {

				$('.editArea').switchClass('f', 't', delay, function() {
					helper.handlesPos('.editArea');
					$('.editArea > .e.handle').switchClass('al', 'ar', 0);
					$('.editArea > .e.handle').show();
					newSize('t');
				});
			}
		});
		return false;
	});

	// WRITINGBOX SOUTH EAST > validate form / author informations
	$('.editArea > .se.handle').click(function() {
		if ($('textarea#write').val() !== "") {
			var dc = $('#writingBox').attr('dc').split(',');
			var aSize = 's';
			if ($('.editArea').hasClass('l'))
				aSize = 'l';
			else if ($('.editArea').hasClass('t'))
				aSize = 't';
			else if ($('.editArea').hasClass('f'))
				aSize = 'f';
			var data = {
				'a' : params.user.author,
				'c' : params.c,
				'x' : dc[0],
				'y' : dc[1],
				't' : $('textarea#write').val(),
				's' : aSize
			};
			$.ajax({
				type : 'POST',
				url : '/insert',
				data : data,
				success : function(res) {
					resetWritingBox();
					params.user.lastT = dc;
				},
				dataType : 'json'
			});
		}
		return false;
	});

	// WRITINGBOX SOUTH > scale box on Y direction
	$('.editArea > .so.handle').click(function() {
		require(["helper"], function(helper) {
			$(this).hide();
			if (freeZone.f !== 0)
				$('.editArea > .e.handle').hide();
			if ($('.editArea').hasClass('s')) {

				$('.editArea').switchClass('s', 't', delay, function() {
					helper.handlesPos('.editArea');
					$('.editArea > .so.handle').switchClass('ad', 'au', 0);
					$('.editArea > .so.handle').show();
					newSize('t');
				});
			} else if ($('.editArea').hasClass('l')) {

				$('.editArea').switchClass('l', 'f', delay, function() {
					helper.handlesPos('.editArea');
					$('.editArea > .so.handle').switchClass('ad', 'au', 0);
					$('.editArea > .so.handle').show();
					newSize('f');
				});
			} else if ($('.editArea').hasClass('t')) {

				$('.editArea').switchClass('t', 's', delay, function() {
					helper.handlesPos('.editArea');
					$('.editArea > .so.handle').switchClass('au', 'ad', 0);
					$('.editArea > .so.handle').show();
					if (freeZone.l === 0)
						$('.editArea > .e.handle').show();
					newSize('s');
				});
			} else if ($('.editArea').hasClass('f')) {

				$('.editArea').switchClass('f', 'l', delay, function() {
					helper.handlesPos('.editArea');
					$('.editArea > .so.handle').switchClass('au', 'ad', 0);
					$('.editArea > .so.handle').show();
					newSize('l');
				});
			}
		});
		return false;
	});

	// WRITINGBOX SOUTH WEST > media uploader
	$('.editArea > .sw.handle').click(function() {

		if (textarea === true) {
			$('textarea#write').hide();
			$('.imageArea').show();
			var dc = $('#writingBox').attr('dc').split(',');
			var aSize = 's';
			if ($('.editArea').hasClass('l'))
				aSize = 'l';
			else if ($('.editArea').hasClass('t'))
				aSize = 't';
			else if ($('.editArea').hasClass('f'))
				aSize = 'f';

			var data = {
				'a' : params.user.author,
				'c' : 'image',
				'x' : dc[0],
				'y' : dc[1],
				's' : aSize
			};
			uploader.setParams(data);
			textarea = false;
			$('.editArea > .sw.handle').switchClass('me', 'tx', 0);
		} else {
			$('input[name*=image]').val('');
			$('.imageArea').hide();
			$('textarea#write').show();
			$('.editArea > .sw.handle').switchClass('tx', 'me', 0);
			textarea = true;
		}

		return false;
	});

	/***********************************************************************************
	 * END INTERACTIONS ON WRITINGBOX HANDLES
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN SWITCHLIVETYPE
	 ***********************************************************************************/

	$('#write').keyup(function() {
		var wA = $('.editArea');
		var charLength = $(this).val().length;
		if (charLength >= 0 && 3 >= charLength) {
			wA.addClass('l4').removeClass('l15 l50 l150 l300 l600');

		} else if (charLength >= 4 && 14 >= charLength) {
			wA.addClass('l15').removeClass('l4 l50 l150 l300 l600');

		} else if (charLength >= 15 && 49 >= charLength) {
			wA.addClass('l50').removeClass('l4 l15 l150 l300 l600');

		} else if (charLength >= 50 && 149 >= charLength) {
			wA.addClass('l150').removeClass('l4 l15 l50 l300 l600');

		} else if (charLength >= 150 && 299 >= charLength) {
			wA.addClass('l300').removeClass('l4 l15 l50 l150 l600');

		} else if (charLength >= 300 && 600 >= charLength) {
			wA.addClass('l600').removeClass('l4 l15 l50 l150 l300');
		} else {
		}

		var txt = $(this).val();
		$(this).val(txt.replace(/[\n\r]+/g, " "));

	});

	/***********************************************************************************
	 * END SWITCHLIVETYPE
	 ***********************************************************************************/
	return {
		updateClick : function() {
			$('#writingBox').click(function(event) {
				if (!$(event.target).is("input")) {
					event.stopPropagation();
					return false;
				}
			});
			if (params.zoom != 2) {
				$('#content').unbind('click');
				$('.msg').unbind('click');
			} else {
				$('#content').click(function(event) {
					$('#informationBox').fadeOut(100);
					if (event.pageX !== null) {
						var x = event.pageX - (params.stepx / 2), y = event.pageY - (params.stepy / 2);
						var posX = params.xmin + Math.floor((x - $('#map').position().left) / params.stepx), posY = params.ymin + Math.floor((y - $('#map').position().top) / params.stepy);
						$.ajax({
							url : 'fa/' + posX + '/' + posY,
							dataType : 'json',
							success : function(fA) {
								if (fA.s === 0) {
									// La case est libre il faut positionner la writing box
									var data = {
										pos : [posX, posY],
										freeZone : fA,
										event : event
									};
									require(["helper"], function(helper) {
										var x = helper.posToLeft(data.pos), y = helper.posToTop(data.pos);
										writingBox(x, y, data);
									});
								} else {
								}

							}
						});
					}
				});

			}
		}
	};
});
