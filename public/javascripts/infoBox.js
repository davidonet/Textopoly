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
				$('.infoArea > .editArea').hide();
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
				$('.infoArea > .msgRemove').hide();
				$('.infoArea > .editArea').hide();
				return false;

			});

			// INFOBOX NORTH EAST >  delete action
			$('.infoArea > .ne.handle').click(function() {
				$('#msgDel').text("");
				$('.infoArea > .msgInfo').hide();

				$('.infoArea > .msgRemove').toggle('slow', function() {
				});

				$('#cancelRemove').click(function() {
					$('.infoArea > .msgRemove').fadeOut(100);
				});
				$('#okRemove').click(function() {

					var dc = $('#informationBox').attr('dc').split(',');
					var xGrid = dc[0];
					var yGrid = dc[1];

					$.getJSON('/del/' + xGrid + '/' + yGrid, function(data) {
						if (data.success) {
							$('.infoArea > .msgRemove').fadeOut(100);
							$('#informationBox').fadeOut(100);
						} else {
							if (data.notAuth) {
								$('#msgDel').text("Vous n'êtes pas authentifié.");
							} else {
								$('#msgDel').text("Ce billet ne vous appartient pas.");
							}
							$('#informationBox').effect("shake", 50);
						}
					});
				});

				return false;
			});

			$('#pathGo').click(function() {
				document.location = $('#pathList').val();
			});

			// INFOBOX SOUTH EAST >  display msgInfo
			$('.infoArea > .se.handle').click(function() {
				$('.infoArea > .msgRemove').hide();
				$('#pathList').empty();
				var dc = $('#informationBox').attr('dc').split(',');
				require(["userinfo"], function(userinfo) {
					userinfo.msgInfo(dc[0], dc[1], function(data) {
						$('#infoname').text('Écrit par : ' + data.a);
						var aDate = new Date(data.d);
						$('#infodate').text($.datepicker.formatDate('le : ' + 'dd/mm/yy', aDate) + " à : " + aDate.getHours() + ":" + aDate.getMinutes());
						$("a[href='#permalink']").attr('href', 'http://textopoly.org/view?zoom=' + params.zoom + '&xcenter=' + dc[0] + '&ycenter=' + dc[1]);
						$(data.spw).each(function(index, path) {
							var newPath = $(document.createElement("option")).attr('value', '/book/' + path._id).text(path.title);
							$('#pathList').append(newPath);
						});
					});
				});
				$('.infoArea > .msgInfo').toggle('slow', function() {
					// Animation complete.
				});
				return false;
			});

			// controls character input/counter
			$('#edit').keyup(function() {
				var wA = $('.infoArea > .editArea');
				var charLength = $(this).val().length;
				if (charLength >= 0 && 3 >= charLength) {
					wA.addClass('l4').removeClass('l15 l50 l150 l300 l600');

				} else if (charLength >= 4 && 14 >= charLength) {
					wA.addClass('l15').removeClass('l4 l50 l150 l300 l600');

				} else if (charLength >= 15 && 49 >= charLength) {
					wA.addClass('l50').removeClass('l4 l15 l150 l300 l600');

				} else if (charLength >= 50 && 149 >= charLength) {
					wA.addClass('l150').removeClass('l4 l15 l50 l300 l600');

				} else if (charLength >= 150 && 299 >= charLength) {
					wA.addClass('l300').removeClass('l4 l15 l50 l150 l600');

				} else if (charLength >= 300 && 600 >= charLength) {
					wA.addClass('l600').removeClass('l4 l15 l50 l150 l300');
				} else {
				}
				var txt = $(this).val();
				$(this).val(txt.replace(/[\n\r]+/g, " "));
			});

			$('.infoArea > .sw.handle.tx').click(function() {
				if (params.user) {
					var dc = $('#informationBox').attr('dc').split(',');
					if ($('.infoArea > .editArea').is(":visible")) {
						var aT = $('#edit').val();

						if ((aT !== "") && ((aT.replace(/\s/g, '').length) !== 0)) {
							$.ajax({
								type : 'POST',
								url : '/update/' + dc[0] + '/' + dc[1],
								data : {
									t : aT
								},
								success : function(res) {
									params.user.lastT = dc;

									require(["helper"], function(helper) {
										$('.msg[dc="' + dc + '"]').removeClass('l4 l15 l50 l150 l300 l600');
										$('.msg[dc="' + dc + '"]').addClass(helper.txtLen2Class(aT.length));
									});
									$('.msg[dc="' + dc + '"] > p').text(aT);
									$('.infoArea > .editArea').fadeOut();
									$('#edit').val("");
								},
								dataType : 'json'
							});
						} else {
							$('#informationBox').fadeOut(200);
							$('.infoArea > .msgRemove').hide();
							$('.infoArea > .editArea').hide();
							$('#edit').val("");
							return false;
						}
					} else {
						require(["userinfo", "helper"], function(userinfo, helper) {
							$('.infoArea > .editArea').removeClass("s l t f");
							$('.infoArea > .editArea').removeClass('l4 l15 l50 l150 l300 l600');
							$('#edit').text("");
							userinfo.msgInfo(dc[0], dc[1], function(data) {
								if (((params.user.author == data.a) || (params.user.superuser)) && data.t) {
									$('#edit').text(data.t);
									$('.infoArea > .editArea').addClass(data.s);
									$('.infoArea > .editArea').addClass(helper.txtLen2Class(data.t.length));
									$('.infoArea > .editArea').fadeIn(function() {
										$('#edit').focus();
									});
								} else {
									$('#informationBox').effect("shake", 50);
								}

							});
						});
					}
				}
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
