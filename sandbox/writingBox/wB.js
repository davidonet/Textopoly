// http://code.google.com/p/jquery-in-place-editor/

$(document).ready(function() {

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

});
