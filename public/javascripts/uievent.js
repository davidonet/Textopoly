define(['helper', 'pathwalk', 'dynload', 'writemodule'], function(helper, pathwalk, dynload, writemodule) {

	/**
	 * Top Menu Handling
	 */
	helper.btnClic("#btnShow");
	helper.btnClic("#btnFind");
	helper.btnOver("#btnCenter");
	helper.btnOver("#btnText");
	helper.btnOver("#btnPath");
	helper.btnOver("#btnShow");
	helper.btnOver("#btnFind");

	/**
	 * Draggable Map with dynamic load
	 */

	var localParams = {
		xmin : params.xmin,
		xmax : params.xmax,
		ymin : params.ymin,
		ymax : params.ymax
	};

	$('#map').draggable({
		stop : function(event, ui) {
			var xmin = params.xmin + Math.ceil((-$('#map').position().left - params.stepx) / (params.stepx));
			var ymin = params.ymin + Math.ceil((-$('#map').position().top - params.stepy) / (params.stepy));
			var lparam = {
				"xmin" : xmin - 2,
				"ymin" : ymin - 2,
				"xmax" : xmin + params.txtwidth + 2,
				"ymax" : ymin + params.txtheight + 2
			};
			dynload.loadSection(lparam, function() {
			});
			pathwalk.updatePath();
		},
		start : function(event, ui) {
			pathwalk.hidePath();
		}
	});

	$('#content').click(function(event) {
		$('#informationBox').fadeOut(100);
		if (params.zoom == 2)
			if (event.pageX !== null) {
				var x = event.pageX - (params.stepx / 2), y = event.pageY - (params.stepy / 2);
				var posX = params.xmin + Math.floor((x - $('#map').position().left) / params.stepx), posY = params.ymin + Math.floor((y - $('#map').position().top) / params.stepy);
				$.ajax({
					url : 'fa/'+posX+'/'+posY,
					dataType : 'json',
					success : function(fA) {
						writemodule.initBox({
							pos : [posX,posY],
							freeZone : fA,
							event : event
						});
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
		fallback : 'Fermer', // fallback text to use when no tooltip text
		gravity : 'e' // gravity
	});

	$('.infoArea > .ne.handle').tipsy({
		delayIn : 500, // delay before showing tooltip (ms)
		fallback : 'Supprimer', // fallback text to use when no tooltip text
		gravity : 'w' // gravity
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
