// recupere coord
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


// boutons jqueryui

$('.fz > p').hide();

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
	$('#writingArea').removeClass('l t f').addClass('s');

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
	/*
	$('#e').hide();
	$('#se').hide();
	$('#s').hide();
	$.each(fA, function(index, value) {
		$('#' + value).show();
	});
	*/
	
	// positionnement du formulaire d'écriture
	$('#writingBox').css({
		'left' : xPos -8,
		'top' : yPos -8
	});

});

// change la taille du formulaire

$('#e').click(function() {
	$('#writingArea').removeClass('s t f').addClass('l');
	$('textarea[name*=t]').focus();
});

$('#s').click(function() {
	$('#writingArea').removeClass('l s f').addClass('t');
	$('textarea[name*=t]').focus();
})

$('#se').click(function() {
	$('#writingArea').removeClass('l s t').addClass('f');
	$('textarea[name*=t]').focus();
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
