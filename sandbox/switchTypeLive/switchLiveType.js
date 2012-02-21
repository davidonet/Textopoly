$(document).ready(function() {

	// controls character input/counter
	$('textarea#switchTypeLive').keyup(function() {
		var charLength = $(this).val().length;

		// Afficher le nombre de caractères
		$('div#charCount').html(charLength + ' / 600');

		// 600
		/*if($(this).val().length > 600) {
		$('div#charCount').html('<strong>600 max</strong>');
		}*/

		// change le style // WORK IN PROGRESS

		if($(this).val().length >= 0 && $(this).val().length <= 3) {
			$('textarea#switchTypeLive').addClass('format1');
			$('textarea#switchTypeLive').removeClass('format2');
		} else if($(this).val().length >= 4 && $(this).val().length <= 49) {
			$('textarea#switchTypeLive').addClass('format2');
			$('textarea#switchTypeLive').removeClass('format1');
			$('textarea#switchTypeLive').removeClass('format3');
		} else if($(this).val().length >= 50 && $(this).val().length <= 149) {
			$('textarea#switchTypeLive').addClass('format3');
			$('textarea#switchTypeLive').removeClass('format2');
			$('textarea#switchTypeLive').removeClass('format4');
		} else if($(this).val().length >= 150 && $(this).val().length <= 299) {
			$('textarea#switchTypeLive').addClass('format4');
			$('textarea#switchTypeLive').removeClass('format3');
			$('textarea#switchTypeLive').removeClass('format5');

		} else if($(this).val().length >= 300 && $(this).val().length <= 599) {
			$('textarea#switchTypeLive').addClass('format5');
			$('textarea#switchTypeLive').removeClass('format4');

		} else {
		}
	});
	// interdiction linebreak

	$('textarea#switchTypeLive').keypress(function(event) {
		if(event.keyCode == 13) {
			event.preventDefault();
		}
	});

	$('textarea#switchTypeLive').keyup(function() {
		var txt = $('textarea#switchTypeLive').val();
		$('textarea#switchTypeLive').val(txt.replace(/[\n\r]+/g, " "));

	});
});
