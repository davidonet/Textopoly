/**
 * @author Adrien Revel
 */

$(document).ready(function() {

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

	})
});
