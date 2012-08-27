requirejs.config({
	paths : {
		'jquery-ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min'
	}
});
require(["jquery", "jquery-ui", "lib/raphael-zpd"], function($) {
	$(function() {
		$(document).ready(function() {
			var paper;
			paper = Raphael('vectormap', $(document).width(), $(document).height());
			var zpd = new RaphaelZPD(paper, {
				zoom : true,
				pan : true,
				drag : false
			});

			$.getJSON('http://redis.david-o.net:7379/SMEMBERS/b', function(data) {
				$(data.SMEMBERS).each(function(index, coord) {
					var x = parseInt(coord.split(',')[0], 10);
					var y = parseInt(coord.split(',')[1], 10);
					x -= params.xmin;
					y -= params.ymin;
					var rect = paper.rect(x*3.1, y*2.1, 3, 2);
					rect.attr("fill", "#444").attr("stroke","none");
				});
			});
		});
	});
});
