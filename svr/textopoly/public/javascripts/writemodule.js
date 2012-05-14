require(["freeadjacent"], function(freeAdjacent) {
	var delay = 250
	var textarea = true
	var auth = ($.cookie("author") != null);
	var isFatFree = false;
	// Fonction reinitialise le formulaire d'écriture
	

	function resetWritingBox() {
		$('#editArea').switchClass('l t f', 's', delay, function() {
			handlesPos();
		});

		$('#editArea').addClass('l4').removeClass('l15 l50 l150 l300 l600');

		$('#e').switchClass('al', 'ar', 0)
		$('#s').switchClass('au', 'ad', 0)
		$('#sw').switchClass('tx', 'me', 0)

		$('#sw').show();
		$('#e').show();
		$('#s').show();
		$('textarea[name*=t]').val('');
		$('input[name*=image]').val('');
		$('#writingBox').fadeOut(delay);
		$('#imageArea').hide();
		$('#authorArea').hide();
		$('textarea[name*=t]').show();
		textarea = true
	};

	// Écrire
	$('.z2 > .fz').on('click', function(event) {
		$('#writingBox').fadeIn(delay);
		$('textarea[name*=t]').focus();
		$('#editArea').switchClass('l t f', 's', delay, function() {
			handlesPos();
		});

		$('#e').switchClass('al', 'ar', 0)
		$('#s').switchClass('au', 'ad', 0)
		$('#sw').switchClass('tx', 'me', 0)

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

		$('#e').hide();
		$('#s').hide();

		$(fA).each(function(index, value) {

			if(value == 'e')
				$('#e').show();
			if(value == 's')
				$('#s').show();
			if(value == 'se')
				isFatFree = true;
		});

		// active les posibilités de tailles
		/*
		$('#e').hide();
		$('#se').hide();
		$('#s').hide();
		$.each(fA, function(index, value) {
		$('#' + value).show();
		});
		*/

		// positionnement du formulaire d'écriture
		$('#writingBox').animate({
			'left' : parseInt(xPos - 10),
			'top' : parseInt(yPos - 10),
		}, delay);

	});

	// position des poignées

	function handlesPos() {
		var r = 10;
		var w = $('#writingBox').outerWidth();
		var h = $('#writingBox').outerHeight();

		$('#nw').css({
			top : -2 * r,
			left : -2 * r
		});

		$('#n').css({
			top : -2 * r,
			left : -2 * r + w / 2
		});

		$('#ne').css({
			top : -2 * r,
			left : -2 * r + w
		});

		$('#e').css({
			top : -2 * r + h / 2,
			left : -2 * r + w
		});

		$('#se').css({
			top : -2 * r + h,
			left : -2 * r + w
		});

		$('#s').css({
			top : -2 * r + h,
			left : -2 * r + w / 2
		});

		$('#sw').css({
			top : -2 * r + h,
			left : -2 * r
		});

		$('#w').css({
			top : -2 * r + h / 2,
			left : -2 * r
		});
	}

	// change la taille du formulaire

	$('#e').click(function() {
		$(this).hide()
		if(!isFatFree)
			$('#s').hide();
		if($('#editArea').hasClass('s')) {

			$('#editArea').switchClass('s', 'l', delay, function() {
				handlesPos();
				$('#e').switchClass('ar', 'al', 0)
				$('#e').show()
			});
		} else if($('#editArea').hasClass('l')) {

			$('#editArea').switchClass('l', 's', delay, function() {
				handlesPos();
				$('#e').switchClass('al', 'ar', 0)
				$('#e').show()

			});
		} else if($('#editArea').hasClass('t')) {

			$('#editArea').switchClass('t', 'f', delay, function() {
				handlesPos();
				$('#e').switchClass('ar', 'al', 0)
				$('#e').show()

			});
		} else if($('#editArea').hasClass('f')) {

			$('#editArea').switchClass('f', 't', delay, function() {
				handlesPos();
				$('#e').switchClass('al', 'ar', 0)
				$('#e').show()

			});
		}

	});

	$('#s').click(function() {
		$(this).hide()
		if(!isFatFree)
			$('#s').hide();
		if($('#editArea').hasClass('s')) {

			$('#editArea').switchClass('s', 't', delay, function() {
				handlesPos();
				$('#s').switchClass('ad', 'au', 0)
				$('#s').show()
			});
		} else if($('#editArea').hasClass('l')) {

			$('#editArea').switchClass('l', 'f', delay, function() {
				handlesPos();
				$('#s').switchClass('ad', 'au', 0)
				$('#s').show()
			});
		} else if($('#editArea').hasClass('t')) {

			$('#editArea').switchClass('t', 's', delay, function() {
				handlesPos();
				$('#s').switchClass('au', 'ad', 0)

				$('#s').show()
			});
		} else if($('#editArea').hasClass('f')) {

			$('#editArea').switchClass('f', 'l', delay, function() {
				handlesPos();
				$('#s').switchClass('au', 'ad', 0)

				$('#s').show()
			});
		}

	});

	// actions sur les poignées

	$('#nw').click(function() {
		resetWritingBox();

	})

	$('#se').click(function() {

		if(auth == false) {
			$('#sw').hide();
			$('#e').hide();
			$('#s').hide();
			$('#imageArea').hide();
			$('textarea[name*=t]').hide();
			$('#authorArea').show();
			auth = true

		} else {

			var dc = $('#writingBox').attr('dc').split(',');
			var aSize = 's';
			if($('#editArea').hasClass('l'))
				aSize = 'l';
			else if($('#editArea').hasClass('t'))
				aSize = 't';
			else if($('#editArea').hasClass('f'))
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

	$('#sw').click(function() {
		if(textarea == true) {
			$('textarea[name*=t]').val('');
			$('#editArea').addClass('l4').removeClass('l15 l50 l150 l300 l600');
			$('textarea[name*=t]').hide();
			$('#imageArea').show()
			textarea = false
			$('#sw').switchClass('me', 'tx', 0)
		} else {
			$('input[name*=image]').val('');
			$('#imageArea').hide();
			$('textarea[name*=t]').show();
			$('#sw').switchClass('tx', 'me', 0)
			textarea = true
		}

	});

	// SWITCH LIVE TYPE

	var wT = '.z2 * > textarea[name*=t]'
	var wA = '.z2 * > #editArea'
	// controls character input/counter
	$(wT).keyup(function() {
		var charLength = $(this).val().length;

		// Afficher le nombre de caractères
		$('div#charCount').html(charLength + ' / 600');

		// 600
		/*
		if($(this).val().length > 600) {
		$('div#charCount').html('<strong>600 max</strong>');
		}
		*/

		// change le style

		//

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

	// interdiction linebreak
	/*
	$(wT).keypress(function(event) {
	if(event.keyCode == 13) {
	event.preventDefault();
	}
	});
	*/

	// Remplace les sauts de ligne par des espaces

	$(wT).keyup(function() {
		var txt = $(wT).val();
		$(wT).val(txt.replace(/[\n\r]+/g, " "));

	});
});
// SWITCH LIVE TYPE END