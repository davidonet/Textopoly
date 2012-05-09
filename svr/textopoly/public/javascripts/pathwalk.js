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
				aPath += "L" + aPos.left + "," + aPos.top;
				var lPath = paper.path(aPath).attr("stroke", "#fce94f").attr("stroke-width", "2");
				tagList.push(lPath);
			}
			var aCircle = paper.circle(aPos.left, aPos.top, 16).attr("fill", "#555753").attr("stroke", "none");
			var aText = paper.text(aPos.left, aPos.top, posList.length).attr("stroke", "#fff");
			tagList.push(aCircle);
			tagList.push(aText);

		}
	});
});

function drawPath(aPosList) {
	var aSVG = "";
	$.each(aPosList, function(index, value) {
		if(0 < index) {
			var shiftx = Math.floor((Number(value.left) + Number(aPosList[index - 1].left)) / 2 + (Math.random() - 2.0) * params.stepx);
			var shifty = Math.floor((Number(value.top) + Number(aPosList[index - 1].top)) / 2 + (Math.random() - 2.0) * params.stepy);
			aSVG += "S" + shiftx + "," + shifty + "," + value.left + "," + value.top;
		} else {
			aSVG += "M" + value.left + "," + value.top;

		}

	});
	var aPath;
	if(4 < params.zoom)
		aPath = paper.path(aSVG).attr("stroke", "#fff").attr("stroke-width", 5 / params.zoom);
	else
		aPath = paper.path(aSVG).attr("stroke", "#eeeeee").attr("stroke-width", 5 / params.zoom);
	$.each(aPosList, function(index, value) {
		if(0 < index) {
			var shiftx = Math.floor((Number(value.left) + Number(aPosList[index - 1].left)) / 2 + (Math.random() - 2.0) * params.stepx);
			var shifty = Math.floor((Number(value.top) + Number(aPosList[index - 1].top)) / 2 + (Math.random() - 2.0) * params.stepy);
			if(index < (aPosList.length - 1))
				paper.circle(value.left, value.top, 20 / params.zoom).attr("fill", "#D3D7CF").attr("stroke", "#eeeeee").attr("stroke-width", 5 / params.zoom);
			else
				paper.circle(value.left, value.top, 20 / params.zoom).attr("fill", "#888a85").attr("stroke", "#eeeeee").attr("stroke-width", 5 / params.zoom);
		} else {
			paper.circle(value.left, value.top, 20 / params.zoom).attr("fill", "#555753").attr("stroke", "#eeeeee").attr("stroke-width", 5 / params.zoom);
		}
	});
	return aPath;
}


$("#path_end").button().hide().click(function() {
	$(this).hide();
	$("#path_start").show();
	$("#map").unbind('click');
	drawPath(posList);
	$.each(tagList, function(index, value) {
		value.remove();
	});

	$.ajax({
		type : 'POST',
		url : '/newpath',
		data : {
			'a' : $('#current_author').val(),
			'pw' : currentPath
		},
		success : function(res) {
			console.log(res);
		},
		dataType : 'json'
	});
	currentPath = 0;
	posList = 0;
});

var gPath;
function showPath() {
	$.getJSON('/allpath', function(data) {
		$(data).each(function(index, path) {
			var lPosList = new Array();
			$(path.pw).each(function(index, point) {
				var aPN = $('.msg[dc="' + point + '"]');
				var aPos = aPN.position();
				if(aPos) {
					aPos.left += params.stepx;
					aPos.top += params.stepy

					if(aPN.hasClass('l') || aPN.hasClass('f'))
						aPos.left += params.stepx;
					if(aPN.hasClass('t') || aPN.hasClass('f'))
						aPos.top += params.stepy
					lPosList.push(aPos);
				}
			});
			gPath = drawPath(lPosList);
			gPath = data[0].pw;
		});
	});
}


$("#path_play").button().click(function() {
	pathPlay(gPath)
});

function pathPlay(aPath) {
	var aPos = aPath.shift();
	if(aPos) {
		aPos = aPos.split(',');
		$('#map').animate({
			left : ((params.xmin - aPos[0] - 1) * params.stepx) + $(document).width() / 2,
			top : ((params.ymin - aPos[1] - 1) * params.stepy) + $(document).height() / 2
		}, 2000).animate({
			left : ((params.xmin - aPos[0] - 1) * params.stepx) + $(document).width() / 2,
			top : ((params.ymin - aPos[1] - 1) * params.stepy) + $(document).height() / 2
		}, 2000, function() {
			pathPlay(aPath);
		});
	}
}

