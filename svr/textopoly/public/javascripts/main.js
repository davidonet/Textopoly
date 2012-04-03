require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js", "jquery.ui.touch-punch", "jquery.form"], function($) {
	$(function() {
		$(document).ready(function() {
			// recupere coord
			$('.msg').on('click', function(event) {

				var dc = $(this).attr('dc').split(',');
				// récupère la propriété dc d'un élément .msg dans un tableau
				var xGrid = dc[0];
				// récupère x de dc
				var yGrid = dc[1];
				// récupère y de dc
				console.log('xGrid= ' + xGrid + ' | yGrid= ' + yGrid);

				var position = $(this).position();
				// récupère la position absolue d'un élément .msg
				var xPos = position.left;
				var yPos = position.top;
				console.log('xPos= ' + xPos + ' | yPos= ' + yPos);
			});
			// boutons jqueryui

			// masque les infos de debug
			require(["bookingsocket"], function() {
			});
			require(["gridinteraction"], function() {
				anchorPoint();
				$('.fz > p').hide();

				// Insère formulaire d'écriture

				var writingBox = '<div id="writingBox"><form id = "writingForm" action="/insert"  method="post"><div id="writingArea" class="s"><textarea class="l0" name="t" rows="9" maxlength="600" cols="70"></textarea></div><div id="writingCommands"><input type="hidden" name="x" type="number" min="-100" max="100"  /><input type="hidden" name="y" type="number" min="-100" max="100" /><select id="size" name="s"><option value="s">Small</option><option value="l">Long</option><option value="t">Tall</option><option value="f">Fat</option></select><select name="a"><option>davidonet</option><option>zakxxi</option><option>batartxxi</option></select><select id="color" name="c" value="butter"><option>butter</option><option>orange</option><option>chocolate</option><option>chameleon</option><option>skyblue</option><option>plum</option><option>scarletred</option></select><input id="closeBox" type="button" value="X" /><input type="submit" value="OK" /></div></form></div>'
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

					location.reload();

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
					console.log('xGrid= ' + xGrid + ' | yGrid= ' + yGrid);
					var position = $(this).position();
					// récupère la position absolue d'un élément .fz
					var xPos = position.left;
					var yPos = position.top;
					console.log('xPos= ' + xPos + ' | yPos= ' + yPos);
					// récupère les cases libres autour
					var fA = (freeAdjacent(xGrid, yGrid));

					// active les posibilités de tailles

					$.each(fA, function(index, value) {
						console.log(value);
						return value;
					});
					// positionnement du formulaire d'écriture
					$('#writingBox').css({
						'left' : xPos,
						'top' : yPos
					});

					// ajoute les coordonnées X Y dans le formulaire
					$('input[name*="x"]').val(xGrid);
					$('input[name*="y"]').val(yGrid);
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

				})
			});
			// slider

			/* Valeurs Slider - Echelles
			* 5 1:1
			* 4 1:2
			* 3 1:4
			* 2 1:10
			* 1 1:20
			* 0 1:40
			*/

			// Récupère la valeur de zoom de la page et règle le slider

			var zoomFactor = params.zoom;
			var zoomValue = 3;

			switch(zoomFactor) {
				case 40:
					zoomValue = 0;
					break;
				case 20:
					zoomValue = 1;
					break;
				case 10:
					zoomValue = 2;
					break;
				case 4:
					zoomValue = 3;
					break;
				case 2:
					zoomValue = 4;
					break;
				case 1:
					zoomValue = 5;
					break;
			};
			function getXCenter() {
				return (params.xmin - 1) - Math.floor((2 * $('#map').position().left - $(document).width()) / (2 * params.stepx));
			}

			function getYCenter() {
				return (params.ymin - 1) - Math.floor((2 * $('#map').position().top - $(document).height()) / (2 * params.stepy));
			}

			// Réglage du zoomSlider

			$('#zoomSlider').slider({
				orientation : "vertical",
				min : 0,
				max : 5,
				step : 1,
				value : zoomValue,
				change : function() {

					var sliderValue = $(this).slider("option", "value");
					var xcenter = getXCenter();
					var ycenter = getYCenter();
					$('#map').fadeOut(300, function() {
						switch(sliderValue) {
							case 0:
								$(location).attr('href', '/view?zoom=40&xcenter=' + xcenter + '&ycenter=' + ycenter);
								break;
							case 1:
								$(location).attr('href', '/view?zoom=20&xcenter=' + xcenter + '&ycenter=' + ycenter);
								break;
							case 2:
								$(location).attr('href', '/view?zoom=10&xcenter=' + xcenter + '&ycenter=' + ycenter);
								break;
							case 3:
								$(location).attr('href', '/view?zoom=4&xcenter=' + xcenter + '&ycenter=' + ycenter);
								break;
							case 4:
								$(location).attr('href', '/view?zoom=2&xcenter=' + xcenter + '&ycenter=' + ycenter);
								break;
							case 5:
								$(location).attr('href', '/view?zoom=1&xcenter=' + xcenter + '&ycenter=' + ycenter);
						}
					});
				}
			});

			// drag map
			$('#map').draggable();

			// center map
			$('#map').css({
				left : ((params.xmin - params.xcenter - 1) * params.stepx) + $(document).width() / 2,
				top : ((params.ymin - params.ycenter - 1) * params.stepy) + $(document).height() / 2,
				width : (params.xmax - params.xmin) * params.stepx,
				height : (params.ymax - params.ymin) * params.stepy
			});
			$('#map').fadeIn(500);
		});
	});
});
