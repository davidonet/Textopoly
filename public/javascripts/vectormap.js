requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min'
	}
});
require(["jquery", "jquery-ui", "lib/jquery.svg.min", "lib/jquery-svgpan"], function($) {
	$(function() {
		$(document).ready(function() {
			$('#canvas').css({
					width : $(document).width(),
					height : $(document).height()
				});
			$(window).resize(function() {
				$('#canvas').css({
					width : $(document).width(),
					height : $(document).height()
				});
			});
			var svg = $('#canvas').svg({
				loadURL : '/mapimg.svg', // External document to load
				changeSize: true,
				onLoad : function() {
					var elt = document.createElementNS('http://www.w3.org/2000/svg', 'g');
					elt.id = 'viewport';
					$(elt).attr('transform', "matrix(0.7990641593933107,0,0,0.7990641593933107,-2392.7929427248896,-1090.6144970294554)");
					$($('#canvas').svg('get').root()).prepend(elt);
					$('#canvas svg rect').appendTo(elt);
					$('#canvas svg').svgPan('viewport', true, true, false, 0.4);
				}, // Callback once loaded
				settings : {}, // Additional settings for SVG element
				initPath : ''
			});

		});
	});
});
