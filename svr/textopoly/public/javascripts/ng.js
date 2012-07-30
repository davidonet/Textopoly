requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min',
	}
});
var params;
var mD = false;
var xS, yS;
require(["jquery", "jquery-ui", "lib/jquery.ui.touch-punch", "lib/jquery.form", "lib/syronex-colorpicker", "lib/jquery.tipsy"], function($) {

	$(function() {
		$(document).ready(function() {
			params = {
				"zoom" : 2,
				"stepx" : 120,
				"stepy" : 80,
				"xcenter" : 0,
				"ycenter" : 0
			};

			params.txtwidth = Math.floor(($(window).width()+256) / params.stepx)
			params.txtheight = Math.floor(($(window).height()+256) / params.stepy)
			params.xmin = params.xcenter - params.txtwidth / 2;
			params.xmax = params.xcenter + params.txtwidth / 2;
			params.ymin = params.ycenter - params.txtheight / 2;
			params.ymax = params.ycenter + params.txtheight / 2;

			require(["dynload"], function(dynload) {
				dynload.loadSection(params);
				$('#map').fadeIn(500);
				$('#map').draggable({
					stop : function(event, ui) {
						var xmin = params.xmin+Math.ceil((-$('#map').position().left-256) / (params.stepx));
						var ymin =  params.ymin+Math.ceil((-$('#map').position().top-256) / (params.stepy));
						var lparam = {
							"xmin" : xmin,
							"ymin" : ymin,
							"xmax" : xmin+params.txtwidth,
							"ymax" : ymin+params.txtheight
						};
						console.log(lparam);
						dynload.loadSection(lparam);
					}
				});
			});
		});
	});
});
