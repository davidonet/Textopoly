define(['helper', 'pathwalk'], function(helper, pathwalk) {
	/**
	 * Double click to zoom and recenter map
	 */
	$('.msg').on('dblclick', function(event) {
		var dc = $(this).attr('dc').split(',');
		$(location).attr('href', '/view?zoom=2&xcenter=' + dc[0] + '&ycenter=' + dc[1]);
	});

	/**
	 * Top Menu Handling
	 */
	helper.btnClic("#btnText");
	helper.btnClic("#btnPath");
	helper.btnClic("#btnShow");
	helper.btnClic("#btnFind");
	helper.btnOver("#btnText");
	helper.btnOver("#btnPath");
	helper.btnOver("#btnShow");
	helper.btnOver("#btnFind");
	helper.btnOver("#btnHelp");
	helper.btnOver("#btnFocus");

	/**
	 * Path Walk interaction handling
	 */
	$("#path_start").button().click(function() {
		$(this).hide();
		var aPathPack = pathwalk.startPath();
		$("#map").click(function(event) {
			var aDC = $(event.target).attr('dc');
			if(aDC == undefined)
				aDC = $(event.target.parentNode).attr('dc');
			pathwalk.addNode(aPathPack, aDC);
		});
		$("#path_end").show().click(function() {
			$(this).hide();
			$("#path_start").show();
			$("#map").unbind('click');
			pathwalk.endPath(aPathPack);
			$("#path_play").button().click(function() {
				pathwalk.pathPlay(aPathPack.msgPath)
			});
		});
	});
	$("#path_end").button().hide();

	/**
	 * Draggable Map with reload
	 */
	$('#map').draggable({
		/**
		 * At the of a map drag, check if we are too close from the end of the map.
		 * In this case, we recenter the map and reload the section at this new center
		 */
		stop : function(event, ui) {
			var dX = Math.abs(helper.initLeft - ui.position.left);
			var dY = Math.abs(helper.initTop - ui.position.top);
			var xcenter = helper.getCenterX();
			var ycenter = helper.getCenterY();

			var bX = 0;
			var bY = 0;
			if(10 < params.zoom) {
				bX = 300 * params.stepx;
				bY = 300 * params.stepy;
			} else {
				bX = 50 * params.stepx;
				bY = 50 * params.stepy;
			}
			if((bX < dX) || (bY < dY)) {
				$('#map').animate({
					left : ((params.xmin - xcenter - 1) * params.stepx) + $(document).width() / 2,
					top : ((params.ymin - ycenter - 1) * params.stepy) + $(document).height() / 2
				}, function() {
					$(location).attr('href', '/view?zoom=' + params.zoom + '&xcenter=' + xcenter + '&ycenter=' + ycenter);

				});
			}
		},
	});

	/***********************************************************************************
	 * Begin temporary delete ui
	 ***********************************************************************************/
	$('.ctx').on('click', function(event) {
		var dc = $(this).parent().attr('dc').split(',');
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
					});
				}
			}

		});
	});
	/***********************************************************************************
	 * End of temporary delete ui
	 */

	/***********************************************************************************
	 * BEGIN TIPSY
	 ***********************************************************************************/

	// WritingBox bulles d'aides

	$('.editArea > .nw.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Fermer', // fallback text to use when no tooltip text
		gravity : 'e',    // gravity
	})

	$('.editArea > .e.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Agrandir / Réduire', // fallback text to use when no tooltip text
		gravity : 'w',    // gravity
	})

	$('.editArea > .se.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Poster', // fallback text to use when no tooltip text
		gravity : 'w',    // gravity
	})

	$('.editArea > .s.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Agrandir / Réduire', // fallback text to use when no tooltip text
		gravity : 'n',    // gravity
	})

	$('.editArea > .sw.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Texte / Image', // fallback text to use when no tooltip text
		gravity : 'e',    // gravity
	})

	// InfoBox bulles d'aides

	$('.infoArea > .nw.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Supprimer', // fallback text to use when no tooltip text
		gravity : 'e',    // gravity
	})

	$('.infoArea > .e.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Créer un chemin', // fallback text to use when no tooltip text
		gravity : 'w',    // gravity
	})

	$('.infoArea > .se.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Infos', // fallback text to use when no tooltip text
		gravity : 'w',    // gravity
	})

	/***********************************************************************************
	 * END TIPSY
	 ***********************************************************************************/

});
