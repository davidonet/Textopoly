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

			// TIPSY ON TOP MENU

			$('#btnLog.log').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Se connecter', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			$('#btnLog.set').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Paramètres', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			$('#btnHelp').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Obtenir de l\'aide', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			$('#btnFocus').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Mode concentration', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});

			// TIPSY ON MAIN MENU
			$('#btnShow').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Naviguer sur la carte', // fallback text to use when no tooltip text
				gravity : 'n' // gravity
			});

			$('#btnText').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Écrire sur la carte', // fallback text to use when no tooltip text
				gravity : 'n' // gravity
			});

			$('#btnPath').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Cheminer sur la carte', // fallback text to use when no tooltip text
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
