require(["freeadjacent"], function(freeAdjacent) {
	/*
	$('.msg').on('click', function(event) {
		var dc = $(this).attr('dc').split(',');
		// récupère la propriété dc d'un élément .msg dans un tableau
		var xGrid = dc[0];
		// récupère x de dc
		var yGrid = dc[1];
		// récupère y de dc
		var position = $(this).position();
		// récupère la position absolue d'un élément .msg
		var xPos = position.left;
		var yPos = position.top;

	});
	*/
	// boutons jqueryui

	$('.fz > p').hide();

	// Fonction reinitialise le formulaire d'écriture

	function resetWritingBox() {
		$('#writingArea').removeClass('l t f').addClass('s');
		$('#size').val('s');
		$('textarea[name*=t]').val('');
	}

	// ferme le formulaire d'écriture

	$('#closeBox').click(function() {
		resetWritingBox()
		$('#writingBox').hide();
	});
	// AJAXifie le formulaire d'écriture

	$('#writingForm').ajaxForm(function() {

		var xGrid = $('#writingForm').find('input[name*="x"]').val();
		var yGrid = $('#writingForm').find('input[name*="y"]').val();

		$(location).attr('href', '/view?zoom=2&xcenter=' + xGrid + '&ycenter=' + yGrid);

	});
	// Cache les champs X et Y du formulaire d'écriture
	/*
	$('input[name*="x"]').hide();
	$('input[name*="y"]').hide();
	*/

	// Écrire
	$('.z2 > .fz').on('click', function(event) {
		console.log("click");
		$('#writingBox').show();
		$('textarea[name*=t]').focus();
		$('#writingArea').removeClass('l t f').addClass('s');
		$('#size').val('s');

		var dc = $(this).attr('dc').split(',');
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

		// active les posibilités de tailles
		$('#e').hide();
		$('#se').hide();
		$('#s').hide();
		$.each(fA, function(index, value) {
			$('#' + value).show();
		});
		// positionnement du formulaire d'écriture
		$('#writingBox').css({
			'left' : xPos,
			'top' : yPos
		});

		// ajoute les coordonnées X Y dans le formulaire
		$('input[name*="x"]').val(xGrid);
		$('input[name*="y"]').val(yGrid);
		$('input[name*="a"]').val(params.a);
		$('input[name*="c"]').val(params.c);
		$('#writingArea').focus();
	});
	// change la taille du formulaire

	$('#nw').click(function() {
		$('#writingArea').removeClass('l t f').addClass('s');
		$('textarea[name*=t]').focus();
		$('input[name*="s"]').val('s');
	});
	$('#e').click(function() {
		$('#writingArea').removeClass('s t f').addClass('l');
		$('textarea[name*=t]').focus();
		$('input[name*="s"]').val('l');
	});
	$('#se').click(function() {
		$('#writingArea').removeClass('l t s').addClass('f');
		$('textarea[name*=t]').focus();
		$('input[name*="s"]').val('f');
	})
	$('#s').click(function() {
		$('#writingArea').removeClass('l s f').addClass('t');
		$('textarea[name*=t]').focus();
		$('input[name*="s"]').val('t');
	})
	// SWITCH LIVE TYPE

	var wT = '.z2 * > textarea[name*=t]'
	var wA = '.z2 * > #writingArea'
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

		// change le style // WORK IN PROGRESS

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
