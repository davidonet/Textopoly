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

// Insère formulaire d'écriture

var writingBox = '<!-- WRITING BOX --><div id="writingBox"><div id="writingArea" class="msg s l4"><textarea name="t" rows="9" maxlength="600" cols="70" spellcheck="false"  wrap="off"></textarea><div id="nw" class="handle">nw</div><div id="n" class="handle">n</div><div id="ne" class="handle">ne</div><div id="e" class="handle">e</div><div id="se" class="handle">se</div><div id="s" class="handle">s</div><div id="sw" class="handle">sw</div><div id="w" class="handle">w</div></div></div><!-- WRITING BOX -->';
$('#map').append(writingBox)

// Masque formulaire d'écriture
$('#writingBox').hide();

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
	console.log(fA);

	$('#size').children().remove();
	$('#size').append('<option value="s">Small</option>');
	// active les posibilités de tailles
	$.each(fA, function(index, value) {
		switch(value) {
			case "e":
				$('#size').append('<option value="l">Long</option>');
				break;
			case "s":
				$('#size').append('<option value="t">Tall</option>');
				break;
			case "se":
				$('#size').append('<option value="f">Fat</option>');
				break;
		}
	});
	// positionnement du formulaire d'écriture
	$('#writingBox').css({
		'left' : xPos,
		'top' : yPos
	});

	// ajoute les coordonnées X Y dans le formulaire
	$('input[name*="x"]').val(xGrid);
	$('input[name*="y"]').val(yGrid);
	$('#writingArea').focus();
});
// change la taille du formulaire

$('#size').change(function() {
	var size = $('#size option:selected').val();
	switch(size) {
		case 's':
			$('#writingArea').removeClass('l t f').addClass('s');
			$('textarea[name*=t]').focus();

			break;
		case 'l':
			$('#writingArea').removeClass('s t f').addClass('l');
			$('textarea[name*=t]').focus();

			break;
		case 't':
			$('#writingArea').removeClass('l s f').addClass('t');
			$('textarea[name*=t]').focus();

			break;
		case 'f':
			$('#writingArea').removeClass('l t s').addClass('f');
			$('textarea[name*=t]').focus();

			break;

	};

})
// sélecteur couleur provisoire

$('#color').css('backgroundColor', '#edd400')

$('#color').change(function() {
	var color = $('#color option:selected').val();
	switch(color) {
		case 'butter':
			$('#color').css('backgroundColor', '#edd400')
			break;
		case 'orange':
			$('#color').css('backgroundColor', '#f57900')
			break;
		case 'chocolate':
			$('#color').css('backgroundColor', '#c17d11')
			break;
		case 'chameleon':
			$('#color').css('backgroundColor', '#73d216')
			break;
		case 'skyblue':
			$('#color').css('backgroundColor', '#3465a4')
			break;
		case 'plum':
			$('#color').css('backgroundColor', '#75507b')
			break;
		case 'scarletred':
			$('#color').css('backgroundColor', '#cc0000')
			break;
	};
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

// SWITCH LIVE TYPE END
