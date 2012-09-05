define(["lib/fileuploader", "pathwalk", "userinfo", "booking", "helper"], function(fileUploader, pathwalk, userinfo, booking, helper) {

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
			$('.editArea').switchClass('l t f', 's', delay, function() {
				handlesPos('.editArea');
			});
			$('.editArea').addClass('l4').removeClass('l15 l50 l150 l300 l600');
			$('.editArea > .e.handle').switchClass('al', 'ar', 0);
			$('.editArea > .s.handle').switchClass('au', 'ad', 0);
			$('.editArea > .sw.handle').switchClass('tx', 'me', 0);
			$('.editArea > .sw.handle').show();
			$('.editArea > .e.handle').show();
			$('.editArea > .s.handle').show();
			$('textarea[name*=t]').val('');
			$('input[name*=image]').val('');
			$('.imageArea').hide();
			$('.authorArea').hide();
			$('textarea[name*=t]').show();
			$('#writingBox').removeAttr('dc');
			textarea = true;
		});
	}

	// Reset infoBox

	/***********************************************************************************
	 * END RESET
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN HANDLEPOS
	 ***********************************************************************************/

	function handlesPos(targetArea) {
		var r = 10;
		var w = $(targetArea).parent().outerWidth();
		var h = $(targetArea).parent().outerHeight();

		$(targetArea + '>.nw.handle').css({
			top : -2 * r,
			left : -2 * r
		});

		$(targetArea + '> .n.handle').css({
			top : -2 * r,
			left : -2 * r + w / 2
		});

		$(targetArea + '> .ne.handle').css({
			top : -2 * r,
			left : -2 * r + w
		});

		$(targetArea + '> .e.handle').css({
			top : -2 * r + h / 2,
			left : -2 * r + w
		});

		$(targetArea + '> .se.handle').css({
			top : -2 * r + h,
			left : -2 * r + w
		});

		$(targetArea + '> .s.handle').css({
			top : -2 * r + h,
			left : -2 * r + w / 2
		});

		$(targetArea + '> .sw.handle').css({
			top : -2 * r + h,
			left : -2 * r
		});

		$(targetArea + '> .w.handle').css({
			top : -2 * r + h / 2,
			left : -2 * r
		});
	}

	/***********************************************************************************
	 * END HANDLEPOS
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN WRITINGBOX
	 ***********************************************************************************/

	$(window).unload(function() {
		if ($('#writingBox').attr('dc')) {
			var aDC = $('#writingBox').attr('dc').split(',');
			booking.unbook(aDC[0], aDC[1]);
		}
	});

	function writingBox(xPos, yPos, data) {
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

		$('textarea[name*=t]').focus();
		$('.editArea').switchClass('l t f', 's', delay, function() {
			handlesPos('.editArea');
		});

		$('.editArea > .e.handle').switchClass('al', 'ar', 0);
		$('.editArea > .s.handle').switchClass('au', 'ad', 0);
		/*$('.editArea > .sw.handle').switchClass('tx', 'me', 0)*/

		$('#writingBox').attr('dc', dc);
		// récupère la propriété dc d'un élément .fz dans un tableau
		var xGrid = dc[0];
		// récupère x de dc
		var yGrid = dc[1];
		// récupère y de dc
		booking.book(xGrid, yGrid, 's', params.c, userinfo.get());
		var position = $('#writingBox').position();
		freeZone = data.freeZone;
		$('.editArea > .e.handle').hide();
		$('.editArea > .s.handle').hide();
		if (freeZone.l === 0)
			$('.editArea > .e.handle').show();
		if (freeZone.t === 0)
			$('.editArea > .s.handle').show();
	}

	/***********************************************************************************
	 * END WRITINGBOX
	 ***********************************************************************************/

	function newSize(s) {
		if ($('#writingBox').attr('dc')) {
			var aDC = $('#writingBox').attr('dc').split(',');
			booking.unbook(aDC[0], aDC[1]);
			booking.book(aDC[0], aDC[1], s, params.c, userinfo.get());
		}
	}

	/***********************************************************************************
	 * BEGIN INTERACTIONS ON WRITINGBOX HANDLES
	 ***********************************************************************************/

	// WRITINGBOX NORTH WEST > cancel action
	$('.editArea > .nw.handle').click(function() {
		if ($('#writingBox').attr('dc')) {
			var aDC = $('#writingBox').attr('dc').split(',');
			booking.unbook(aDC[0], aDC[1]);
		}
		resetWritingBox();
		return false;
	});
	// WRITINGBOX EAST > scale box on X direction
	$('.editArea > .e.handle').click(function() {
		$(this).hide();

		if (freeZone.f !== 0)
			$('.editArea > .s.handle').hide();
		if ($('.editArea').hasClass('s')) {
			$('.editArea').switchClass('s', 'l', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .e.handle').switchClass('ar', 'al', 0);
				$('.editArea > .e.handle').show();
				newSize('l');
			});
		} else if ($('.editArea').hasClass('l')) {

			$('.editArea').switchClass('l', 's', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .e.handle').switchClass('al', 'ar', 0);
				$('.editArea > .e.handle').show();
				if (freeZone.t === 0)
					$('.editArea > .s.handle').show();
				newSize('s');
			});
		} else if ($('.editArea').hasClass('t')) {

			$('.editArea').switchClass('t', 'f', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .e.handle').switchClass('ar', 'al', 0);
				$('.editArea > .e.handle').show();
				newSize('f');
			});
		} else if ($('.editArea').hasClass('f')) {

			$('.editArea').switchClass('f', 't', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .e.handle').switchClass('al', 'ar', 0);
				$('.editArea > .e.handle').show();
				newSize('t');
			});
		}
		return false;
	});

	// WRITINGBOX SOUTH EAST > validate form / author informations
	$('.editArea > .se.handle').click(function() {
		if (userinfo.get() === null) {
			$('.editArea > .sw.handle').hide();
			$('.editArea > .e.handle').hide();
			$('.editArea > .s.handle').hide();
			$('.imageArea').hide();
			$('textarea[name*=t]').hide();
			$('.authorArea').show();

		} else {
			var dc = $('#writingBox').attr('dc').split(',');
			var aSize = 's';
			if ($('.editArea').hasClass('l'))
				aSize = 'l';
			else if ($('.editArea').hasClass('t'))
				aSize = 't';
			else if ($('.editArea').hasClass('f'))
				aSize = 'f';
			var data = {
				'a' : userinfo.get(),
				'c' : params.c,
				'x' : dc[0],
				'y' : dc[1],
				't' : $('textarea[name*=t]').val(),
				's' : aSize
			};
			$.ajax({
				type : 'POST',
				url : '/insert',
				data : data,
				success : function(res) {
					resetWritingBox();
				},
				dataType : 'json'
			});
		}
		return false;
	});

	// WRITINGBOX SOUTH > scale box on Y direction
	$('.editArea > .s.handle').click(function() {
		$(this).hide();
		if (freeZone.f !== 0)
			$('.editArea > .e.handle').hide();
		if ($('.editArea').hasClass('s')) {

			$('.editArea').switchClass('s', 't', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .s.handle').switchClass('ad', 'au', 0);
				$('.editArea > .s.handle').show();
				newSize('t');
			});
		} else if ($('.editArea').hasClass('l')) {

			$('.editArea').switchClass('l', 'f', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .s.handle').switchClass('ad', 'au', 0);
				$('.editArea > .s.handle').show();
				newSize('f');
			});
		} else if ($('.editArea').hasClass('t')) {

			$('.editArea').switchClass('t', 's', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .s.handle').switchClass('au', 'ad', 0);
				$('.editArea > .s.handle').show();
				if (freeZone.l === 0)
					$('.editArea > .e.handle').show();
				newSize('s');
			});
		} else if ($('.editArea').hasClass('f')) {

			$('.editArea').switchClass('f', 'l', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .s.handle').switchClass('au', 'ad', 0);
				$('.editArea > .s.handle').show();
				newSize('l');
			});
		}
		return false;
	});

	// WRITINGBOX SOUTH WEST > media uploader
	$('.editArea > .sw.handle').click(function() {
		if (textarea === true) {
			$('textarea[name*=t]').val('');
			$('.editArea').addClass('l4').removeClass('l15 l50 l150 l300 l600');
			$('textarea[name*=t]').hide();

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
				'a' : userinfo.get(),
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
			$('textarea[name*=t]').show();
			$('.editArea > .sw.handle').switchClass('tx', 'me', 0);
			textarea = true;
		}
		return false;
	});

	/***********************************************************************************
	 * END INTERACTIONS ON WRITINGBOX HANDLES
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN INFOBOX
	 ***********************************************************************************/

	/***********************************************************************************
	 * END INFOBOX
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN INTERACTIONS ON INFOBOX HANDLES
	 ***********************************************************************************/

	$('.infoArea > .nw.handle').click(function() {
		$('#informationBox').fadeOut(200);
		return false;

	});

	// INFOBOX NORTH EAST >  delete action
	$('.infoArea > .ne.handle').click(function() {
		var dc = $('#informationBox').attr('dc').split(',');
		var xGrid = dc[0];
		var yGrid = dc[1];
		console.log(xGrid + ' ' + yGrid);

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
						$('#informationBox').fadeOut(500);
					});
				}
			}

		});
		return false;
	});

	// INFOBOX SOUTH EAST >  display msgInfo
	$('.infoArea > .se.handle').click(function() {
		var dc = $('#informationBox').attr('dc').split(',');
		userinfo.msgInfo(dc[0], dc[1], function(data) {
			$('#infoname').text('Écrit par : ' + data.a);
			var aDate = new Date(data.d);
			$('#infodate').text($.datepicker.formatDate('le : ' + 'dd/mm/yy', aDate) + " à : " + aDate.getHours() + ":" + aDate.getMinutes());
			$("a[href='#permalink']").attr('href', 'http://dev.textopoly.org/view?zoom=' + params.zoom + '&xcenter=' + dc[0] + '&ycenter=' + dc[1]);

		});
		$('.infoArea > .msgInfo').toggle('slow', function() {
			// Animation complete.
		});
		return false;
	});
	/***********************************************************************************
	 * END INTERACTIONS ON INFOBOX HANDLES
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN SWITCHLIVETYPE
	 ***********************************************************************************/

	var wT = 'textarea[name*=t]';
	var wA = '.editArea';
	// controls character input/counter
	$(wT).keyup(function() {
		var charLength = $(this).val().length;

		if ($(this).val().length >= 0 && 3 >= $(this).val().length) {
			$(wA).addClass('l4').removeClass('l15 l50 l150 l300 l600');

		} else if ($(this).val().length >= 4 && 14 >= $(this).val().length) {
			$(wA).addClass('l15').removeClass('l4 l50 l150 l300 l600');

		} else if ($(this).val().length >= 15 && 49 >= $(this).val().length) {
			$(wA).addClass('l50').removeClass('l4 l15 l150 l300 l600');

		} else if ($(this).val().length >= 50 && 149 >= $(this).val().length) {
			$(wA).addClass('l150').removeClass('l4 l15 l50 l300 l600');

		} else if ($(this).val().length >= 150 && 299 >= $(this).val().length) {
			$(wA).addClass('l300').removeClass('l4 l15 l50 l150 l600');

		} else if ($(this).val().length >= 300 && 600 >= $(this).val().length) {
			$(wA).addClass('l600').removeClass('l4 l15 l50 l150 l300');
		} else {
		}
	});

	// Remplace les sauts de ligne par des espaces

	$(wT).keyup(function() {
		var txt = $(wT).val();
		$(wT).val(txt.replace(/[\n\r]+/g, " "));

	});

	/***********************************************************************************
	 * END SWITCHLIVETYPE
	 ***********************************************************************************/
	return {
		updateClick : function() {
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
									var x = helper.posToLeft(data.pos), y = helper.posToTop(data.pos);
									writingBox(x, y, data);
								} else {
								}

							}
						});
					}
				});
				$('.msg').click(function(event) {
					var elt = this;
					var position = $(elt).position();
					// récupère la position absolue d'un élément .fz
					var xPos = position.left;
					var yPos = position.top;
					isBooked = $(elt).hasClass('l0');
					isImage = $(elt).hasClass('image');

					if (isBooked === true && isImage === false) {
						// rien ne se passe
						console.log("Booked msg");

					} else {

						resetWritingBox();
						// positionnement du formulaire d'écriture
						//$('#writingBox').fadeOut(100);
						$('.infoArea > .msgInfo').hide();
						$('#informationBox').css({
							'left' : xPos - 10,
							'top' : yPos - 10
						});
						$('#informationBox').fadeIn(100);

						// récupère la position
						var dc = $(elt).attr('dc');

						$('#informationBox').attr('dc', dc);

						// règle la taille en fonction du type de case

						if ($(elt).hasClass('s')) {

							$('.infoArea').switchClass('l t f', 's', delay, function() {
								handlesPos('.infoArea');
							});
						} else if ($(elt).hasClass('l')) {

							$('.infoArea').switchClass('s t f', 'l', delay, function() {
								handlesPos('.infoArea');
							});
						} else if ($(elt).hasClass('t')) {

							$('.infoArea').switchClass('s l f', 't', delay, function() {
								handlesPos('.infoArea');
							});
						} else if ($(elt).hasClass('f')) {

							$('.infoArea').switchClass('s l t', 'f', delay, function() {
								handlesPos('.infoArea');
							});
						}
					}
					return false;
				});
			}
		}
	};
});
