require(["freeadjacent", "lib/fileuploader", "pathwalk", "userinfo", "booking"], function(freeAdjacent, fileUploader, pathwalk, userinfo, booking) {

	var delay = 250
	var textarea = true
	var msgInfo = false
	var auth = ($.cookie("author") != null);
	var isFatFree = false;
	var isBooked = false
	var uploader = new qq.FileUploader({
		element : $('.imageArea')[0],
		action : '/postimg',
		debug : false,
		onComplete : function() {
			var dc = $('#writingBox').attr('dc').split(',');
			$(location).attr('href', '/view?zoom=2&xcenter=' + dc[0] + '&ycenter=' + dc[1]);
		}
	});

	/***********************************************************************************
	 * BEGIN RESET
	 ***********************************************************************************/

	// Reset writingBox
	function resetWritingBox() {
		$('.editArea').switchClass('l t f', 's', delay, function() {
			handlesPos('.editArea');
		});
		$('.editArea').addClass('l4').removeClass('l15 l50 l150 l300 l600');
		$('.editArea > .e.handle').switchClass('al', 'ar', 0)
		$('.editArea > .s.handle').switchClass('au', 'ad', 0)
		$('.editArea > .sw.handle').switchClass('tx', 'me', 0)
		$('.editArea > .sw.handle').show();
		$('.editArea > .e.handle').show();
		$('.editArea > .s.handle').show();
		$('textarea[name*=t]').val('');
		$('input[name*=image]').val('');
		$('#writingBox').fadeOut(500);
		$('.imageArea').hide();
		$('.authorArea').hide();
		$('textarea[name*=t]').show();
		textarea = true
	};

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

	$('.z2 > .fz').on('click', function(event) {

		$('#informationBox').fadeOut(500);
		$('#writingBox').fadeIn(500);
		$('textarea[name*=t]').focus();
		$('.editArea').switchClass('l t f', 's', delay, function() {
			handlesPos('.editArea');
		});

		$('.editArea > .e.handle').switchClass('al', 'ar', 0)
		$('.editArea > .s.handle').switchClass('au', 'ad', 0)
		/*$('.editArea > .sw.handle').switchClass('tx', 'me', 0)*/

		var dc = $(this).attr('dc').split(',');
		if($('#writingBox').attr('dc')) {
			var aDC = $('#writingBox').attr('dc').split(',');
			booking.unbook(aDC[0], aDC[1]);
		}

		$('#writingBox').attr('dc', $(this).attr('dc'));
		// récupère la propriété dc d'un élément .fz dans un tableau
		var xGrid = dc[0];
		// récupère x de dc
		var yGrid = dc[1];
		// récupère y de dc
		booking.book(xGrid, yGrid, 's', params.c, userinfo.get())
		var position = $(this).position();
		// récupère la position absolue d'un élément .fz
		var xPos = position.left;
		var yPos = position.top;

		// récupère les cases libres autour
		var fA = (freeAdjacent(xGrid, yGrid));

		$('.editArea > .e.handle').hide();
		$('.editArea > .s.handle').hide();

		$(fA).each(function(index, value) {

			if(value == 'e')
				$('.editArea > .e.handle').show();
			if(value == 's')
				$('.editArea > .s.handle').show();
			if(value == 'se')
				isFatFree = true;
		});

		// positionnement du formulaire d'écriture
		$('#writingBox').animate({
			'left' : parseInt(xPos - 10),
			'top' : parseInt(yPos - 10),
		}, 500);

	});

	/***********************************************************************************
	 * END WRITINGBOX
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN INTERACTIONS ON WRITINGBOX HANDLES
	 ***********************************************************************************/

	// WRITINGBOX NORTH WEST > cancel action
	$('.editArea > .nw.handle').click(function() {
		resetWritingBox();
	})
	// WRITINGBOX EAST > scale box on X direction
	$('.editArea > .e.handle').click(function() {
		$(this).hide()
		if(!isFatFree)
			$('.editArea > .s.handle').hide();
		if($('.editArea').hasClass('s')) {

			$('.editArea').switchClass('s', 'l', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .e.handle').switchClass('ar', 'al', 0)
				$('.editArea > .e.handle').show()
			});
		} else if($('.editArea').hasClass('l')) {

			$('.editArea').switchClass('l', 's', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .e.handle').switchClass('al', 'ar', 0)
				$('.editArea > .e.handle').show()

			});
		} else if($('.editArea').hasClass('t')) {

			$('.editArea').switchClass('t', 'f', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .e.handle').switchClass('ar', 'al', 0)
				$('.editArea > .e.handle').show()

			});
		} else if($('.editArea').hasClass('f')) {

			$('.editArea').switchClass('f', 't', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .e.handle').switchClass('al', 'ar', 0)
				$('.editArea > .e.handle').show()

			});
		}

	});

	// WRITINGBOX SOUTH EAST > validate form / author informations
	$('.editArea > .se.handle').click(function() {
		console.log(userinfo.get());
		if(userinfo.get() === null) {
			$('.editArea > .sw.handle').hide();
			$('.editArea > .e.handle').hide();
			$('.editArea > .s.handle').hide();
			$('.imageArea').hide();
			$('textarea[name*=t]').hide();
			$('.authorArea').show();
		} else {
			var dc = $('#writingBox').attr('dc').split(',');
			var aSize = 's';
			if($('.editArea').hasClass('l'))
				aSize = 'l';
			else if($('.editArea').hasClass('t'))
				aSize = 't';
			else if($('.editArea').hasClass('f'))
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
					$(location).attr('href', '/view?zoom=2&xcenter=' + dc[0] + '&ycenter=' + dc[1]);
					resetWritingBox();
				},
				dataType : 'json'
			});
		}
	});

	// WRITINGBOX SOUTH > scale box on Y direction
	$('.editArea > .s.handle').click(function() {
		$(this).hide()
		if(!isFatFree)
			$('.editArea > .s.handle').hide();
		if($('.editArea').hasClass('s')) {

			$('.editArea').switchClass('s', 't', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .s.handle').switchClass('ad', 'au', 0)
				$('.editArea > .s.handle').show()
			});
		} else if($('.editArea').hasClass('l')) {

			$('.editArea').switchClass('l', 'f', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .s.handle').switchClass('ad', 'au', 0)
				$('.editArea > .s.handle').show()
			});
		} else if($('.editArea').hasClass('t')) {

			$('.editArea').switchClass('t', 's', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .s.handle').switchClass('au', 'ad', 0)
				$('.editArea > .s.handle').show()
			});
		} else if($('.editArea').hasClass('f')) {

			$('.editArea').switchClass('f', 'l', delay, function() {
				handlesPos('.editArea');
				$('.editArea > .s.handle').switchClass('au', 'ad', 0)
				$('.editArea > .s.handle').show()
			});
		}

	});

	// WRITINGBOX SOUTH WEST > media uploader
	$('.editArea > .sw.handle').click(function() {
		if(textarea == true) {
			$('textarea[name*=t]').val('');
			$('.editArea').addClass('l4').removeClass('l15 l50 l150 l300 l600');
			$('textarea[name*=t]').hide();

			$('.imageArea').show();
			var dc = $('#writingBox').attr('dc').split(',');
			var aSize = 's';
			if($('.editArea').hasClass('l'))
				aSize = 'l';
			else if($('.editArea').hasClass('t'))
				aSize = 't';
			else if($('.editArea').hasClass('f'))
				aSize = 'f';
			var data = {
				'a' : userinfo.get(),
				'c' : 'image',
				'x' : dc[0],
				'y' : dc[1],
				's' : aSize
			};
			uploader.setParams(data);
			textarea = false
			$('.editArea > .sw.handle').switchClass('me', 'tx', 0)
		} else {
			$('input[name*=image]').val('');
			$('.imageArea').hide();
			$('textarea[name*=t]').show();
			$('.editArea > .sw.handle').switchClass('tx', 'me', 0)
			textarea = true
		}

	});

	/***********************************************************************************
	 * END INTERACTIONS ON WRITINGBOX HANDLES
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN INFOBOX
	 ***********************************************************************************/

	$('.z2 > .msg').on('click', function(event) {

		isBooked = $(this).hasClass('l0')
		isImage = $(this).hasClass('image')

		if(isBooked == true && isImage == false) {
			// rien ne se passe
			console.log("Booked msg")

		} else {

			resetWritingBox();
			$('#writingBox').fadeOut(500);
			$('.infoArea > .msgInfo').hide();
			$('#informationBox').fadeIn(500);

			// récupère la position
			var dc = $(this).attr('dc');
			// Copying the data coord of the msg
			$('#informationBox').attr('dc', dc);

			var position = $(this).position();
			// récupère la position absolue d'un élément .fz
			var xPos = position.left;
			var yPos = position.top;

			// positionnement du formulaire d'écriture
			$('#informationBox').animate({
				'left' : parseInt(xPos - 10),
				'top' : parseInt(yPos - 10),
			}, 500);

			// règle la taille en fonction du type de case

			if($(this).hasClass('s')) {

				$('.infoArea').switchClass('l t f', 's', delay, function() {
					handlesPos('.infoArea');
				})
			} else if($(this).hasClass('l')) {

				$('.infoArea').switchClass('s t f', 'l', delay, function() {
					handlesPos('.infoArea');
				})
			} else if($(this).hasClass('t')) {

				$('.infoArea').switchClass('s l f', 't', delay, function() {
					handlesPos('.infoArea');
				})
			} else if($(this).hasClass('f')) {

				$('.infoArea').switchClass('s l t', 'f', delay, function() {
					handlesPos('.infoArea');
				})
			}
		}

	});

	/***********************************************************************************
	 * END INFOBOX
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN INTERACTIONS ON INFOBOX HANDLES
	 ***********************************************************************************/

	// INFOBOX NORTH WEST >  delete action
	$('.infoArea > .nw.handle').click(function() {
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
	})
	// INFOBOX EAST >  path action
	var aPathPack;
	$('.infoArea > .e.handle').click(function() {
		if(aPathPack == null) {
			aPathPack = pathwalk.startPath();
			pathwalk.addNode(aPathPack, $('#informationBox').attr('dc'));
			$("#map").click(function(event) {
				var aDC = $(event.target).attr('dc');
				if(aDC == undefined)
					aDC = $(event.target.parentNode).attr('dc');
				pathwalk.addNode(aPathPack, aDC);
			});
			$('.infoArea > .e.handle').attr('title', 'Valider le chemin');
		} else {
			pathwalk.endPath(aPathPack);
			aPathPack = null;
			$("#map").unbind('click');
			$('.infoArea > .e.handle').attr('title', 'Créer chemin');
		}
	})
	// INFOBOX SOUTH EAST >  display msgInfo
	$('.infoArea > .se.handle').click(function() {
		var dc = $('#informationBox').attr('dc').split(',');
		userinfo.msgInfo(dc[0],dc[1],function(data){
			$('#infoname').text('Écrit par : '+data.a);
			var aDate = new Date(data.d);
			$('#infodate').text($.datepicker.formatDate('le : '+'dd/mm/yy',aDate)+" à : "+aDate.getHours()+":"+aDate.getMinutes());
			$("a[href='#permalink']").attr('href','http://dev.textopoly.org/view?zoom='+params.zoom+'&xcenter=' + dc[0] + '&ycenter=' + dc[1]);

		})
		$('.infoArea > .msgInfo').toggle('slow', function() {
			// Animation complete.
		});
	})
	/***********************************************************************************
	 * END INTERACTIONS ON INFOBOX HANDLES
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN SWITCHLIVETYPE
	 ***********************************************************************************/

	var wT = 'textarea[name*=t]'
	var wA = '.editArea'
	// controls character input/counter
	$(wT).keyup(function() {
		var charLength = $(this).val().length;

		if($(this).val().length >= 0 && 3 >= $(this).val().length) {
			$(wA).addClass('l4').removeClass('l15 l50 l150 l300 l600');

		} else if($(this).val().length >= 4 && 14 >= $(this).val().length) {
			$(wA).addClass('l15').removeClass('l4 l50 l150 l300 l600');

		} else if($(this).val().length >= 15 && 49 >= $(this).val().length) {
			$(wA).addClass('l50').removeClass('l4 l15 l150 l300 l600');

		} else if($(this).val().length >= 50 && 149 >= $(this).val().length) {
			$(wA).addClass('l150').removeClass('l4 l15 l50 l300 l600');

		} else if($(this).val().length >= 150 && 299 >= $(this).val().length) {
			$(wA).addClass('l300').removeClass('l4 l15 l50 l150 l600');

		} else if($(this).val().length >= 300 && 600 >= $(this).val().length) {
			$(wA).addClass('l600').removeClass('l4 l15 l50 l150 l300');
		} else {
		}
	});

	// Remplace les sauts de ligne par des espaces

	$(wT).keyup(function() {
		var txt = $(wT).val();
		$(wT).val(txt.replace(/[\n\r]+/g, " "));

	});
});

/***********************************************************************************
 * END SWITCHLIVETYPE
 ***********************************************************************************/