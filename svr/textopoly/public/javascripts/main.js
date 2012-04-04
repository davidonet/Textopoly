require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js", "jquery.ui.touch-punch", "jquery.form"], function($) {
	$(function() {
		$(document).ready(function() {

			// masque les infos de debug
			require(["bookingsocket"], function() {
			});
			require(["gridinteraction"], function() {
				anchorPoint();
				require(["writemodule"], function() {
					require(["mapmodule"], function() {
						$('#map').fadeIn(500);
						var removebox = '<div id="removebox"><h2>Suppression</h2></div>'
						$('body').append(removebox);

						// Survol de menus

						function btnOver(bouton) {
							$(bouton).hover(function() {

								$(this).addClass('over');

							}, function() {

								$(this).removeClass('over');

							});
						}

						btnOver("#btnText");
						btnOver("#btnPath");
						btnOver("#btnShow");
						btnOver("#btnFind");
						btnOver("#btnHelp");
						btnOver("#btnFocus");

						// Clic de menus

						function btnClic(bouton) {

							$(bouton).mouseenter(function() {
								$(this).children().animate({
									height : '100px'
								}, 100)
								$(this).mouseleave(function() {
									$(this).children().animate({
										height : '0px'

									}, 100)
								})
								$(this).children().mouseleave(function() {
									$(this).animate({
										height : '0px'
									}, 100)
								})
							})
						}

						btnClic("#btnText");
						btnClic("#btnPath");
						btnClic("#btnShow");
						btnClic("#btnFind");

					});
				});
			});
		})
	});
});
