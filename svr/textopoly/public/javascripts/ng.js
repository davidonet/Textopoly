requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min',
	}
});
var params;
require(["jquery", "jquery-ui", "lib/jquery.ui.touch-punch", "lib/jquery.form", "lib/syronex-colorpicker", "lib/jquery.tipsy"], function($) {

	$(function() {
		$(document).ready(function() {
			params = {
				"zoom" : 2,
				"xcenter" : 0,
				"ycenter" : 0,
				"xmin" : -5,
				"ymin" : -5,
				"xmax" : 5,
				"ymax" : 5,
				"stepx" : 120,
				"stepy" : 80
			};
			function loadSection() {
				$('.msg').each(function(elt) {
					var off = $(this).offset();
					var t = off.top;
					var l = off.left;
					var h = $(this).height();
					var w = $(this).width();
					var docH = $(window).height();
					var docW = $(window).width();
					var isEntirelyVisible = (t > 0 && l > 0 && t + h < docH && l + w < docW);
					if (!isEntirelyVisible) {
						$(this).remove();
					}
				});
				require(["helper"], function(helper) {
					$.ajax({
						url : 'section',
						dataType : 'json',
						data : params,
						success : function(section) {
							$(section.texts).each(function(index, data) {
								$('.msg[dc="' + data.p + '"]').fadeOut(function() {
									$(this).remove();
								});
								var newTxt = $(document.createElement("div")).addClass("msg").addClass(data.s).addClass(data.c);
								if (data.t != null)
									newTxt.addClass(helper.txtLen2Class(data.t.length));
								newTxt.attr('dc', data.p);
								newTxt.css(helper.posToCSS(data.p));
								if (data.c == 'image') {
									var newContent = $(document.createElement("img")).attr("src", "/getimg/[" + data.p + "]");
								} else {
									if (data.t) {
										// text filled cell
										var newContent = $(document.createElement("p")).text(data.t);
									} else {
										// booked cell
										var newContent = $(document.createElement("p")).addClass("author").text(data.a);
										newTxt.addClass('l0');
									}
								}
								newTxt.append(newContent);

								$('#map').append(newTxt);
							});
						}
					});
				});
			}

			loadSection();

			$('#map').on('dblclick', function(event) {
				params.xmin++;
				params.xmax++;

				loadSection();
			});
		});
	});
});
