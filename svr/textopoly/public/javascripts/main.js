require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js", "jquery.ui.touch-punch", "jquery.form", "http://konami-js.googlecode.com/svn/trunk/konami.js", "syronex-colorpicker"], function($) {
	$(function() {
		$(document).ready(function() {
			// easteregg de paques
			/* The Code

			 In case you don't know, the Konami Code is:

			 Up, Up, Down, Down, Left, Right, Left, Right, B, A, Start

			 For our purposes, we've replaced Start with Enter.*/

			konami = new Konami()
			konami.code = function() {
				$(".msg > p").typewriter({
					'delay' : 200
				}, function() {

				})
			}

			konami.load()

			// colorPicker

			$('#colorPicker').colorPicker({

				click : function(color) {
					console.log(color);
				},
			});

			// masque les infos de debug
			require(["bookingsocket"], function() {
			});
			require(["typewriter"], function() {
			});
			require(["gridinteraction"], function() {
				anchorPoint();
				require(["writemodule"], function() {
					require(["mapmodule"], function() {
						$('#map').fadeIn(500);
						var removebox = '<div id="removebox" style="display:none;"><small><span style="color:red">Attention</span><br>Cette opération est irréversible.</small></div>'
						$('body').append(removebox);
						$('#removebox').hide();
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

							$(bouton).click(function() {
								$(this).children().animate({
									height : '50px'
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

						require(["pathwalk"], function() {

						});

					});
				});
			});
		})
	});
});
