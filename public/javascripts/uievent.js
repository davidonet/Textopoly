define(['helper', "infoBox", "mapModule"], function(helper, infoBox, mapModule) {
	var handleMouseWheel = function(e) {
		var delta = 0, element = $('#zoomSlider'), value, result;
		value = element.slider('value');

		if (e.wheelDelta) {
			delta = -e.wheelDelta;
		}
		if (e.detail) {
			delta = e.detail;
		}

		value -= delta / 200;
		if (value > 5) {
			value = 5;
		}
		if (value < 0) {
			value = 0;
		}

		if (result !== false) {
			element.slider('value', value);
		}

		e.preventDefault();
		return false;
	};

	var bindZoom = function() {
		if ($.browser.webkit) {
			window.addEventListener('mousewheel', handleMouseWheel, false);
			// Chrome/Safari
		} else if ($.browser.mozilla) {
			window.addEventListener('DOMMouseScroll', handleMouseWheel, false);
			// Firefox
		} else {
			window.addEventListener('mousewheel', handleMouseWheel, false);
			// others (Opera, Explorer9)
		}

	};

	var unbindZoom = function() {
		if ($.browser.webkit) {
			window.removeEventListener('mousewheel', handleMouseWheel, false);
			// Chrome/Safari
		} else if ($.browser.mozilla) {
			window.removeEventListener('DOMMouseScroll', handleMouseWheel, false);
			// Firefox
		} else {
			window.removeEventListener('mousewheel', handleMouseWheel, false);
			// others (Opera, Explorer9)
		}
	};

	return {
		init : function() {

			helper.btnOver("#btnCenter");
			helper.btnOver("#btnText");
			helper.btnOver("#btnPath");
			helper.btnOver("#btnShow");
			helper.btnOver("#btnFind");
			bindZoom();
			infoBox.init();

			if (params.user) {

				$("#btnLog").removeClass('log').addClass('out');

			} else {

			}
			$('#btnHelp').click(function() {
				var url = 'http://blog.textopoly.org/?p=119';
				window.open(url);
			});


			$('#btnFocus').click(function() {
				console.log("Focus");

				if ($('#header').hasClass('big')=== true){
					$('#slider').hide();
					$('#header').removeClass('big').addClass('small');


				} else if ($('#header').hasClass('small')=== true) {
					$('#slider').show();
					$('#header').removeClass('small').addClass('big');


				}

				


			});

			// TIPSY ON TOP MENU
			$('#btnLog').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Connecter / Déconnecter', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			$('#btnHelp').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Aide', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			$('#btnFocus').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Masquer', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			// TIPSY ON MAIN MENU
			$('#btnShow').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Explorer', // fallback text to use when no tooltip text
				gravity : 'n' // gravity
			});

			$('#btnText').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Écrire / Ajouter', // fallback text to use when no tooltip text
				gravity : 'n' // gravity
			});

			$('#btnPath').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Tracer un chemin', // fallback text to use when no tooltip text
				gravity : 'n' // gravity
			});

			$('#btnFind').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Filtrer la carte', // fallback text to use when no tooltip text
				gravity : 'n' // gravity
			});

			$('#btnCenter').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Aller sur le dernier billet', // fallback text to use when no tooltip text
				gravity : 'n' // gravity
			});

			$('.ui-slider-handle').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Zoomer sur la carte', // fallback text to use when no tooltip text
				gravity : 'w' // gravity
			});

		},
		bindZoom : bindZoom,
		unbindZoom : unbindZoom
	};
});
