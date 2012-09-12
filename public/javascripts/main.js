requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min',
		'hammer' : 'http://eightmedia.github.com/hammer.js/hammer',
		'jqhammer' : 'http://eightmedia.github.com/hammer.js/jquery.hammer'
	}
});
require(["jquery", "jquery-ui", "modeHandler", "mapModule", "uievent"], function($, jqui, modeHandler, mapModule, uievent) {
	$(function() {
		(function($, sr) {
			// debouncing function from John Hann
			// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
			var debounce = function(func, threshold, execAsap) {
				var timeout;

				return function debounced() {
					var obj = this, args = arguments;
					function delayed() {
						if (!execAsap)
							func.apply(obj, args);
						timeout = null;
					}

					if (timeout)
						clearTimeout(timeout);
					else if (execAsap)
						func.apply(obj, args);

					timeout = setTimeout(delayed, threshold || 100);
				};
			};
			jQuery.fn[sr] = function(fn) {
				return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
			};

		})(jQuery, 'smartresize');
		$(document).ready(function() {
			// Avoid `console` errors in browsers that lack a console.
			if (!(window.console && console.log)) {( function() {
						var noop = function() {
						};
						var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
						var length = methods.length;
						var console = window.console = {};
						while (length--) {
							console[methods[length]] = noop;
						}
					}());
			}

			modeHandler.init();
			mapModule.init();
			uievent.init();
			modeHandler.refresh();
		});
	});
});

