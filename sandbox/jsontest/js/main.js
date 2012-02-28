$(document).ready(function() {
	// Opening json file
	$.getJSON('http://textopoly.herokuapp.com/section?callback=?', function(data, textStatus, jqXHR) {
		console.log(data);
		var minX = data["minX"];
		var minY = data["minY"];
		var stepY = $(document).height() / 20;
		var stepX = stepY * 4 / 3;

		$.each(data["texts"], function(index, aValue) {
			var aX = Math.floor((aValue["position"][0] - minX) * stepX);
			var aY = Math.floor((aValue["position"][1] - minY) * stepY);
			var newTxt = $(document.createElement("div")).addClass("msg");
			var aWidth = Math.floor(stepX * 2);
			var aHeight = Math.floor(stepY * 2);
			if((aValue["s"] == "l") || (aValue["s"] == "f"))
				aWidth *= 2;
			if((aValue["s"] == "t") || (aValue["s"] == "f"))
				aHeight *= 2;
			newTxt.css({
				left : aX,
				top : aY,
				width : aWidth,
				height : aHeight
			});
			if(aValue["t"])
				newTxt.text(aValue["t"]);
			else if(aValue["i"]) {
				var newImg = $(document.createElement("img")).addClass("msg");
				newImg.attr({
					src : aValue["i"]
				});
				newTxt.append(newImg);
			}

			$("body").append(newTxt);
		});
	});
	$(window).resize(function() {
		window.location.reload()
	});
});