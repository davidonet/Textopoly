requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min'
	}
});
require(["jquery", "jquery-ui", "modeHandler", "mapModule"], function($, jqui, modeHandler, mapModule) {
	$(function() {
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
			modeHandler.refresh();
		});
	});
});

