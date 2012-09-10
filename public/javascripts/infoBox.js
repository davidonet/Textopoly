define(["lib/jquery.tipsy"], function() {
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

		}
	};
});
