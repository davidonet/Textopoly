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

				var writingForm = '<div id="writingBox"><form id = "writingForm" action="/insert"  method="post"><div><textarea name="t" rows="9" maxlength="600" cols="70"></textarea></div><div><input name="x" type="number" min="-100" max="100"/><input name="y" type="number" min="-100" max="100"/><select name="s"><option value="s">Small</option><option value="l">Long</option><option value="t">Tall</option><option value="f">Fat</option></select><select name="a"><option>davidonet</option><option>zakxxi</option></select><select name="c" value="butter"><option>butter</option><option>orange</option><option>chocolate</option><option>chameleon</option><option>skyblue</option><option>plum</option><option>scarletred</option></select><input type="submit" value="Insert" /></div></form></div>'
				$('#map').append(writingForm);

				// AJAXifie le formulaire d'écriture

				$('#writingForm').ajaxForm(function() {
					var alert = '<div id="alert"><h2>Thank you for post</h2></div>'
					$('body').append(alert);
					$('#alert').dialog({
						buttons : {
							"OK" : function() {
								$(this).dialog("close");

								location.reload();
							}
						}
					});

				});
				// cache les champs X et Y du formulaire d'écriture
				$('input[name*="x"]').hide();
				$('input[name*="y"]').hide();

				// écrire
				$('.fz').on('click', function(event) {

					var dc = $(this).attr('dc').split(',');
					// récupère la propriété dc d'un élément .fz dans un tableau
					var xGrid = dc[0];
					// récupère x de dc
					var yGrid = dc[1];
					// récupère y de dc
					console.log('xGrid= ' + xGrid + ' | yGrid= ' + yGrid);
					console.log(freeAdjacent(xGrid, yGrid));
					var position = $(this).position();
					// récupère la position absolue d'un élément .fz
					var xPos = position.left;
					var yPos = position.top;
					console.log('xPos= ' + xPos + ' | yPos= ' + yPos);

					// positionnement du formulaire d'écriture
					$('#writingBox').css({
						'left' : xPos,
						'top' : yPos
					});

					// ajoute les coordonnées X Y dans le formulaire
					$('input[name*="x"]').val(xGrid);
					$('input[name*="y"]').val(yGrid);
				});
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

			// Réglage du zoomSlider

			$('#zoomSlider').slider({
				orientation : "vertical",
				min : 0,
				max : 5,
				step : 1,
				value : zoomValue,
				change : function() {

					var sliderValue = $(this).slider("option", "value");

					switch(sliderValue) {
						case 0:
							$(location).attr('href', '/view?zoom=40');
							break;
						case 1:
							$(location).attr('href', '/view?zoom=20');
							break;
						case 2:
							$(location).attr('href', '/view?zoom=10');
							break;
						case 3:
							$(location).attr('href', '/view?zoom=4');
							break;
						case 4:
							$(location).attr('href', '/view?zoom=2');
							break;
						case 5:
							$(location).attr('href', '/view?zoom=1');
							break;
					}

				}
			});

			// drag map
			$('#map').draggable();

			// center map
			$('#map').animate({
				left : (params.xmin * params.stepx) + $(document).width() / 2,
				top : (params.ymin * params.stepy) + $(document).height() / 2
			});
			$('#map').css({
				width : (params.xmax - params.xmin) * params.stepx,
				height : (params.ymax - params.ymin) * params.stepy
			});

		});
	});
});
