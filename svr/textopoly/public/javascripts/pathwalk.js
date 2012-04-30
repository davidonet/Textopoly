var paper = Raphael('map');
var currentPath;
var posList;
var tagList;
var tempPath;

$("#path_start").button().click(function() {
	$(this).hide();
	$("#path_end").show();
	currentPath = new Array();
	posList = new Array();
	tagList = new Array();
	$("#map").click(function(event) {
		var aPN = $(event.target.parentNode);
		var aDC = aPN.attr('dc');
		if(aDC) {
			var aPos = $(event.target.parentNode).position();
			aPos.left += params.stepx;
			aPos.top += params.stepy

			if(aPN.hasClass('l') || aPN.hasClass('f'))
				aPos.left += params.stepx;
			if(aPN.hasClass('t') || aPN.hasClass('f'))
				aPos.top += params.stepy
			currentPath.push(aDC);
			posList.push(aPos);
			if(1 < posList.length) {
				var aPath = "M" + posList[posList.length - 2].left + "," + posList[posList.length - 2].top;
				aPath +="L"+aPos.left+","+aPos.top;
				var lPath = paper.path(aPath).attr("stroke", "#fce94f").attr("stroke-width", "2");
				tagList.push(lPath);
			}
			var aCircle = paper.circle(aPos.left, aPos.top, 16).attr("fill", "#555753").attr("stroke", "none");
			var aText = paper.text(aPos.left, aPos.top, posList.length ).attr("stroke", "#fff");
			tagList.push(aCircle);
			tagList.push(aText);

		}
	});
});
$("#path_end").button().hide().click(function() {
	$(this).hide();
	$("#path_start").show();
	$("#map").unbind('click');
	var aSVG = "";
	$.each(posList, function(index, value) {
		if(0 < index) {
			var shiftx = Math.floor((Number(value.left) + Number(posList[index - 1].left)) / 2 + (-.8 * Math.random() + .4) * params.stepx);
			var shifty = Math.floor((Number(value.top) + Number(posList[index - 1].top)) / 2 + (-.8 * Math.random() + .4) * params.stepy);
			aSVG += "T" + shiftx + "," + shifty + "T" + value.left + "," + value.top;
		} else {
			aSVG += "M" + value.left + "," + value.top;
		}
	});
	$.each(tagList, function(index, value) {
		value.remove();
	});
	paper.path(aSVG).attr("stroke", "#fff");

	console.log(currentPath);
	currentPath = 0;
	posList = 0;
});
