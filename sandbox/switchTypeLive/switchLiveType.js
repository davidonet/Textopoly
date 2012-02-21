$(document).ready(function() {

	// controls character input/counter
	$('textarea#switchTypeLive').keyup(function() {
		var charLength = $(this).val().length;

		// Afficher le nombre de caractères
		$('div#charCount').html(charLength + ' / 600');

		// 600
		if($(this).val().length > 600)
			$('div#charCount').html('<strong>600 max</strong>');
			
		// change le style // WORK IN PROGRESS

		if($(this).val().length >=0 && $(this).val().length <= 3)
			$('textarea#switchTypeLive').addClass('format1');
			
		else if($(this).val().length >=4 && $(this).val().length <= 6)
			$('textarea#switchTypeLive').addClass('format2');
			
		else if($(this).val().length >=7 && $(this).val().length <= 9)
			$('textarea#switchTypeLive').addClass('format2');
			
	});
});
