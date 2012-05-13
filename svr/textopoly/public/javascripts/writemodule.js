var delay = 500

// Fonction reinitialise le formulaire d'écriture

function resetWritingBox() {
	$('#writingArea').removeClass('l t f').addClass('s');
	$('#size').val('s');
	$('textarea[name*=t]').val('');
}

// Écrire
$('.z2 > .fz').on('click', function(event) {

	$('#writingBox').show();
	$('textarea[name*=t]').focus();
	$('#writingArea').switchClass('l t f', 's', delay, function() {
		handlesPos();
	});
	handlesPos();

	var dc = $(this).attr('dc');
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
	}, 500);

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

	if($('#writingArea').hasClass('s')) {

		$('#writingArea').switchClass('s', 'l', delay, function() {
			handlesPos();
		});
	} else if($('#writingArea').hasClass('l')) {

		$('#writingArea').switchClass('l', 's', delay, function() {
			handlesPos();
		});
	} else if($('#writingArea').hasClass('t')) {

		$('#writingArea').switchClass('t', 'f', delay, function() {
			handlesPos();
		});
	} else if($('#writingArea').hasClass('f')) {

		$('#writingArea').switchClass('f', 't', delay, function() {
			handlesPos();
		});
	}

});

$('#s').click(function() {

	if($('#writingArea').hasClass('s')) {

		$('#writingArea').switchClass('s', 't', delay, function() {
			handlesPos();
		});
	} else if($('#writingArea').hasClass('l')) {

		$('#writingArea').switchClass('l', 'f', delay, function() {
			handlesPos();
		});
	} else if($('#writingArea').hasClass('t')) {

		$('#writingArea').switchClass('t', 's', delay, function() {
			handlesPos();
		});
	} else if($('#writingArea').hasClass('f')) {

		$('#writingArea').switchClass('f', 'l', delay, function() {
			handlesPos();
		});
	}

});

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

// SWITCH LIVE TYPE END
