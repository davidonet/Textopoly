define(['helper', "infoBox", "mapModule"], function(helper, infoBox, mapModule) {
	var handleMouseWheel = function(e) {
		var delta = 0, element = $('#zoomSlider'), value, result;
		value = element.slider('value');

		if (e.wheelDelta) {
			delta = -e.wheelDelta;
		}
		if (e.detail) {
			delta = e.detail * 4;
		}

		value -= delta / 128;
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
		require(["hammer", "jqhammer"], function() {
			$("#content").hammer({
				prevent_default : true
			}).bind('transform', function(ev) {
				console.log(ev.scale);

				var delta = 0, element = $('#zoomSlider'), value, result;
				value = element.slider('value');

				value += (Math.floor(ev.scale)<1?-1:1);

				if (value > 5) {
					value = 5;
				}
				if (value < 0) {
					value = 0;
				}

				if (result !== false) {
					element.slider('value', value);
				}
				return false;
			});
		});

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

		},
		bindZoom : bindZoom,
		unbindZoom : unbindZoom
	};
});
