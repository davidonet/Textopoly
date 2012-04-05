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

var writingBox = '<div id="writingBox"><form id = "writingForm" action="/insert"  method="post"><div id="writingArea" class="s">';
writingBox += '<textarea class="l0" name="t" rows="9" maxlength="600" cols="70"></textarea></div><div id="writingCommands">';
writingBox += '<input type="hidden" name="x" type="number" min="-100" max="100"  /><input type="hidden" name="y" type="number" min="-100" max="100" />';
writingBox += '<select id="size" name="s"></select><select name="a"><option>Ribouldingue</option><option>Filochard</option><option>Croquignol</option>';
writingBox += '<option>Manounou</option><option>Croquenot</option></select><select id="color" name="c" value="butter"><option>butter</option><option>orange</option><option>chocolate</option><option>chameleon</option><option>skyblue</option><option>plum</option><option>scarletred</option></select><input id="closeBox" type="button" value="X" /><input type="submit" value="OK" /></div></form></div>'
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

$('input[name*="x"]').hide();
$('input[name*="y"]').hide();

// Écrire
$('.fz').on('click', function(event) {

	resetWritingBox()
	$('#writingBox').show();
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
