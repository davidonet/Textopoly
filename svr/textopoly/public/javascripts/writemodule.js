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



var writingBox = '<div id="writingBox"><form id = "writingForm" action="/insert"  method="post"><div id="writingArea" class="msg s l4">';
writingBox += '<textarea name="t" rows="9" maxlength="600" cols="70" spellcheck="false"></textarea></div><div id="writingCommands">';
writingBox += '<div id="charCount">0/600</div>'
writingBox += '<input type="hidden" name="x" type="number" min="-100" max="100"  /><input type="hidden" name="y" type="number" min="-100" max="100" />';
writingBox += '<select id="size" name="s"></select><select name="a"><option>Ribouldingue</option><option>Filochard</option><option>Croquignol</option>';
writingBox += '<option>Manounou</option><option>Croquenot</option></select><select id="color" name="c" value="butter"><option>butter</option>';
writingBox += '<option>orange</option><option>chocolate</option><option>chameleon</option><option>skyblue</option><option>plum</option><option>scarletred</option>';
writingBox += '</select><input id="closeBox" type="button" value="X" /><input type="submit" value="OK" /></div>';
writingBox += '</form></div>';


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
$('.fz').on('click', function(event) {

	$('#writingBox').show();
	
		$('#writingArea').removeClass('l t f').addClass('s');
	$('#size').val('s');
	$('textarea[name*=t]').focus();
	
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
			break;
		case 'l':
			$('#writingArea').removeClass('s t f').addClass('l');
			break;
		case 't':
			$('#writingArea').removeClass('l s f').addClass('t');
			break;
		case 'f':
			$('#writingArea').removeClass('l t s').addClass('f');
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

	wT = '.z2 * > textarea[name*=t]'
	wA = '.z2 * > #writingArea'
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
			$(wA).addClass('l4');
			$(wA).removeClass('l15 l50 l150 l300 l600');

		} else if($(this).val().length >= 4 && 15 >= $(this).val().length) {
			$(wA).addClass('l15');
			$(wA).removeClass('l4 l50 l150 l300 l600');

		} else if($(this).val().length >= 16 && 50 >= $(this).val().length) {
			$(wA).addClass('l50');
			$(wA).removeClass('l4 l15 l150 l300 l600');

		} else if($(this).val().length >= 51 && 150 >= $(this).val().length) {
			$(wA).addClass('l150');
			$(wA).removeClass('l4 l15 l50 l300 l600');

		} else if($(this).val().length >= 151 && 300 >= $(this).val().length) {
			$(wA).addClass('l300');
			$(wA).removeClass('l4 l15 l50 l150 l600');

		} else if($(this).val().length >= 301 && 600 >= $(this).val().length) {
			$(wA).addClass('l600');
			$(wA).removeClass('l4 l15 l50 l150 l300');
		} else {
		}
	});
	// interdiction linebreak

	$(wT).keypress(function(event) {
		if(event.keyCode == 13) {
			event.preventDefault();
		}
	});

	$(wT).keyup(function() {
		var txt = $(wT).val();
		$(wT).val(txt.replace(/[\n\r]+/g, " "));

	});
	
	
		// SWITCH LIVE TYPE END
