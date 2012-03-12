$(document).ready(function() {

	$('.coord').hide();
	// masque les coordonnées

	$('.msg > p').each(function(i) {
		var $txt = $.trim($(this).text());
		// nettoie les espaces et stocke dans une variable
		var $len = $txt.length;
		// compte les caractères

		console.log(i, $len);
		// vérif des valeur

		/* On attribue les classes l4 l15 l50 l150 l300 l600 en fonction de la valeur de $len */

		if(5 > $len) {
			$(this).parent().addClass('l4');
		} else if(15 > $len) {
			$(this).parent().addClass('l15');
		} else if(50 > $len) {
			$(this).parent().addClass('l50');
		} else if(150 > $len) {
			$(this).parent().addClass('l150');
		} else if(300 > $len) {
			$(this).parent().addClass('l300');
		} else if(600 > $len) {
			$(this).parent().addClass('l600');
		} else {
			$(this).parent().addClass('warning');
		}
	});
});
