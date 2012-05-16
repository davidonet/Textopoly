require(["freeadjacent", "lib/fileuploader"], function(freeAdjacent, fileUploader) {

	var delay = 250
	var textarea = true
	var auth = ($.cookie("author") != null);
	var isFatFree = false;
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
		$('#writingBox').fadeOut(delay);
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

		$(targetArea+'>.nw.handle').css({
			top : -2 * r,
			left : -2 * r
		});

		$(targetArea+'> .n.handle').css({
			top : -2 * r,
			left : -2 * r + w / 2
		});

		$(targetArea+'> .ne.handle').css({
			top : -2 * r,
			left : -2 * r + w
		});

		$(targetArea+'> .e.handle').css({
			top : -2 * r + h / 2,
			left : -2 * r + w
		});

		$(targetArea+'> .se.handle').css({
			top : -2 * r + h,
			left : -2 * r + w
		});

		$(targetArea+'> .s.handle').css({
			top : -2 * r + h,
			left : -2 * r + w / 2
		});

		$(targetArea+'> .sw.handle').css({
			top : -2 * r + h,
			left : -2 * r
		});

		$(targetArea+'> .w.handle').css({
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
		$('#writingBox').fadeIn(delay);
		$('textarea[name*=t]').focus();
		$('.editArea').switchClass('l t f', 's', delay, function() {
			handlesPos('.editArea');
		});

		$('.editArea > .e.handle').switchClass('al', 'ar', 0)
		$('.editArea > .s.handle').switchClass('au', 'ad', 0)
		$('.editArea > .sw.handle').switchClass('tx', 'me', 0)

		var dc = $(this).attr('dc').split(',');
		$('#writingBox').attr('dc', $(this).attr('dc'));
		// récupère la propriété dc d'un élément .fz dans un tableau
		var xGrid = dc[0];
		// récupère x de dc
		var yGrid = dc[1];
		// récupère y de dc
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
		}, delay);

	});

	/***********************************************************************************
	 * END WRITINGBOX
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN INTERACTIONS ON WRITINGBOX HANDLES
	 ***********************************************************************************/

	// WRITINGBOX EAST
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

	// WRITINGBOX SOUTH
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

	//WRITINGBOX NORTH WEST
	$('.editArea > .nw.handle').click(function() {
		resetWritingBox();
	})
	//WRITINGBOX SOUTH EST
	$('.editArea > .se.handle').click(function() {
		if(auth == false) {
			$('.editArea > .sw.handle').hide();
			$('.editArea > .e.handle').hide();
			$('.editArea > .s.handle').hide();
			$('.imageArea').hide();
			$('textarea[name*=t]').hide();
			$('.authorArea').show();
			auth = true
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
				'a' : $('#current_author').val(),
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

	// WRITINGBOX SOUTH WEST
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
				'a' : $('#current_author').val(),
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




	/***********************************************************************************
	 * END INFOBOX
	 ***********************************************************************************/

	/***********************************************************************************
	 * BEGIN INTERACTIONS ON INFOBOX HANDLES
	 ***********************************************************************************/




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