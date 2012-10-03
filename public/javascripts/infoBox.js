define(["lib/jquery.tipsy"], function() {
	var delay = 150;
	bindMsg = function() {

		$('.msg').click(function(event) {

			var elt = this;
			var position = $(elt).position();
			// récupère la position absolue d'un élément .fz
			var xPos = position.left;
			var yPos = position.top;
			isBooked = $(elt).hasClass('l0');
			isImage = $(elt).hasClass('image');

			if (isBooked === true && isImage === false) {
			} else {

				// positionnement du formulaire d'écriture
				//$('#writingBox').fadeOut(100);
				$('.infoArea > .msgInfo').hide();
				$('#informationBox').css({
					'left' : xPos - 10,
					'top' : yPos - 10
				});
				$('#informationBox').fadeIn(100);

				// récupère la position
				var dc = $(elt).attr('dc');

				$('#informationBox').attr('dc', dc);

				// règle la taille en fonction du type de case
				require(["helper"], function(helper) {
					if ($(elt).hasClass('s')) {

						$('.infoArea').switchClass('l t f', 's', delay, function() {
							helper.handlesPos('.infoArea');
						});
					} else if ($(elt).hasClass('l')) {

						$('.infoArea').switchClass('s t f', 'l', delay, function() {
							helper.handlesPos('.infoArea');
						});
					} else if ($(elt).hasClass('t')) {

						$('.infoArea').switchClass('s l f', 't', delay, function() {
							helper.handlesPos('.infoArea');
						});
					} else if ($(elt).hasClass('f')) {

						$('.infoArea').switchClass('s l t', 'f', delay, function() {
							helper.handlesPos('.infoArea');
						});
					}
				});
			}
			return false;
		});
	};
	return {
		init : function() {
			$('.editArea > .nw.handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Fermer', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			$('.editArea > .e.handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Agrandir / Réduire', // fallback text to use when no tooltip text
				gravity : 'w' // gravity
			});

			$('.editArea > .se.handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Poster', // fallback text to use when no tooltip text
				gravity : 'w' // gravity
			});

			$('.editArea > .so.handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Agrandir / Réduire', // fallback text to use when no tooltip text
				gravity : 'n' // gravity
			});

			$('.editArea > .sw.handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Texte / Image', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			// InfoBox bulles d'aides

			$('.infoArea > .nw.handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Fermer', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			$('.infoArea > .ne.handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Supprimer', // fallback text to use when no tooltip text
				gravity : 'w' // gravity
			});
			
			$('.infoArea > .sw.handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Éditer', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});			
			
			$('.infoArea > .se.handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Infos', // fallback text to use when no tooltip text
				gravity : 'w' // gravity
			});

			$('.infoArea > .nw.handle').click(function() {
				$('#informationBox').fadeOut(200);
				return false;

			});

			// INFOBOX NORTH EAST >  delete action
			$('.infoArea > .ne.handle').click(function() {
				var dc = $('#informationBox').attr('dc').split(',');
				var xGrid = dc[0];
				var yGrid = dc[1];

				$('#removebox').dialog({
					"resizable" : false,
					"title" : "Suppression ?",
					buttons : {
						"Non, je ne préfère pas" : function() {
							$(this).dialog("close");
						},
						"Oui" : function() {
							$(this).dialog("close");
							$.getJSON('/remove?x=' + xGrid + '&y=' + yGrid, function(data) {
								$('#informationBox').fadeOut(500);
							});
						}
					}

				});
				return false;
			});

			// INFOBOX SOUTH EAST >  display msgInfo
			$('.infoArea > .se.handle').click(function() {
				var dc = $('#informationBox').attr('dc').split(',');
				require(["userinfo"], function(userinfo) {
					userinfo.msgInfo(dc[0], dc[1], function(data) {
						$('#infoname').text('Écrit par : ' + data.a);
						var aDate = new Date(data.d);
						$('#infodate').text($.datepicker.formatDate('le : ' + 'dd/mm/yy', aDate) + " à : " + aDate.getHours() + ":" + aDate.getMinutes());
						$("a[href='#permalink']").attr('href', 'http://dev.textopoly.org/view?zoom=' + params.zoom + '&xcenter=' + dc[0] + '&ycenter=' + dc[1]);

					});
				});
				$('.infoArea > .msgInfo').toggle('slow', function() {
					// Animation complete.
				});
				return false;
			});
			bindMsg();
		},
		bindMsg : bindMsg,
		unbindMsg : function() {
			$('.msg').unbind('click');
		}
	};
});
