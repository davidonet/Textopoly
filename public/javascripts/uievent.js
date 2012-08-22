define(['helper', 'pathwalk', 'dynload'], function(helper, pathwalk, dynload) {
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
	 * Draggable Map with reload
	 */

	var localParams = {
		xmin : params.xmin,
		xmax : params.xmax,
		ymin : params.ymin,
		ymax : params.ymax
	};

	$('#map').draggable({
		/**
		 * At the of a map drag, check if we are too close from the end of the map.
		 * In this case, we recenter the map and reload the section at this new center
		 */
		drag : function(event, ui) {
			var xmin = params.xmin + Math.ceil((-$('#map').position().left - 256) / (params.stepx));
			var ymin = params.ymin + Math.ceil((-$('#map').position().top - 256) / (params.stepy));
			var lparam = {
				"xmin" : xmin,
				"ymin" : ymin,
				"xmax" : xmin + params.txtwidth,
				"ymax" : ymin + params.txtheight
			};
			if ((0 < Math.abs(lparam.xmin - localParams.xmin)) && (0 < Math.abs(lparam.xmax - localParams.xmax)) && (0 < Math.abs(lparam.ymin - localParams.ymin)) && (0 < Math.abs(lparam.ymax - localParams.ymax))) {
				localParams.xmin = lparam.xmin;
				localParams.xmax = lparam.xmax;
				localParams.ymin = lparam.ymin;
				localParams.ymax = params.ymax;
				dynload.loadSection(lparam, function() {
				});
			}
		},
		stop : function(event, ui) {
			pathwalk.updatePath();
		},
		start : function(event, ui) {
			pathwalk.hidePath();
		}
	});

	$('#content').click(function(event) {
		if (event.pageX !== null) {
			var p = [params.xmin + Math.floor((event.pageX - $('#map').position().left) / params.stepx), params.ymin + Math.floor((event.pageY - $('#map').position().top) / params.stepy)];
			$.ajax({
				url : 'fa',
				dataType : 'json',
				data : {
					'p' : p
				},
				success : function(fA) {
					/*
					$('#writingBox').css(helper.posToCSS(p));
					$('#writingBox').fadeIn();
					*/
				}
			});
		}
	});

	/***********************************************************************************
	 * BEGIN TIPSY
	 ***********************************************************************************/

	// WritingBox bulles d'aides

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

	$('.editArea > .s.handle').tipsy({
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
		fallback : 'Supprimer', // fallback text to use when no tooltip text
		gravity : 'e' // gravity
	});

	$('.infoArea > .e.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Créer un chemin', // fallback text to use when no tooltip text
		gravity : 'w' // gravity
	});

	$('.infoArea > .se.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Infos', // fallback text to use when no tooltip text
		gravity : 'w' // gravity
	});

	/***********************************************************************************
	 * END TIPSY
	 ***********************************************************************************/

});
