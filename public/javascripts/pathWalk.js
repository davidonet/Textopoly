define(['helper'], function(helper) {
	var paper;

	function pathPlay(aPath) {
		var aPos = aPath.shift();
		if (aPos) {
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

	function drawPath(aMsgList) {
		var aPosList = [];
		$(aMsgList).each(function(index, point) {
			var aPN = $('.msg[dc="' + point + '"]');
			var aPos = aPN.offset();
			if (aPos) {
				aPos.left += params.stepx;
				aPos.top += params.stepy;

				if (aPN.hasClass('l') || aPN.hasClass('f'))
					aPos.left += params.stepx;
				if (aPN.hasClass('t') || aPN.hasClass('f'))
					aPos.top += params.stepy;
				aPosList.push(aPos);

			}
		});
		var aSVG = "";
		$.each(aPosList, function(index, value) {
			if (0 < index) {
				var shiftx = Math.floor((Number(value.left) + Number(aPosList[index - 1].left)) / 2 + (Math.random() - 2.0) * params.stepx);
				var shifty = Math.floor((Number(value.top) + Number(aPosList[index - 1].top)) / 2 + (Math.random() - 2.0) * params.stepy);
				aSVG += "S" + shiftx + "," + shifty + "," + value.left + "," + value.top;
			} else {
				aSVG += "M" + value.left + "," + value.top;
			}
		});
		var aPath;
		if (4 < params.zoom)
			aPath = paper.path(aSVG).attr("stroke", "#fff").attr("stroke-width", 5 / params.zoom);
		else
			aPath = paper.path(aSVG).attr("stroke", "#eeeeee").attr("stroke-width", 5 / params.zoom);
		$.each(aPosList, function(index, value) {
			if (0 < index) {
				var shiftx = Math.floor((Number(value.left) + Number(aPosList[index - 1].left)) / 2 + (Math.random() - 2.0) * params.stepx);
				var shifty = Math.floor((Number(value.top) + Number(aPosList[index - 1].top)) / 2 + (Math.random() - 2.0) * params.stepy);
				if (index < (aPosList.length - 1))
					paper.circle(value.left, value.top, 20 / params.zoom).attr("fill", "#D3D7CF").attr("stroke", "#eeeeee").attr("stroke-width", 5 / params.zoom);
				else
					paper.circle(value.left, value.top, 20 / params.zoom).attr("fill", "#D3D7CF").attr("stroke", "#eeeeee").attr("stroke-width", 5 / params.zoom);
			} else {
				paper.circle(value.left, value.top, 20 / params.zoom).attr("fill", "#fff").attr("stroke", "#eee").attr("stroke-width", 5 / params.zoom);
			}
		});
		return aPath;
	}

	return {
		startPath : function() {
			var aPathPack = {
				msgPath : [],
				posList : [],
				svgList : []
			};
			return aPathPack;
		},
		addNode : function(aPathPack, aDC) {
			if (aDC) {
				var aPN = $('.msg[dc="' + aDC + '"]');
				var aPos = aPN.position();
				aPos.left += params.stepx;
				aPos.top += params.stepy;
				if (aPN.hasClass('l') || aPN.hasClass('f'))
					aPos.left += params.stepx;
				if (aPN.hasClass('t') || aPN.hasClass('f'))
					aPos.top += params.stepy;
				aPathPack.msgPath.push(aDC);
				aPathPack.posList.push(aPos);
				if (1 < aPathPack.posList.length) {
					var aPath = "M" + aPathPack.posList[aPathPack.posList.length - 2].left + "," + aPathPack.posList[aPathPack.posList.length - 2].top;
					aPath += "L" + aPos.left + "," + aPos.top;
					var lPath = paper.path(aPath).attr("stroke", "#fce94f").attr("stroke-width", "2");
					aPathPack.svgList.push(lPath);
				}
				var aCircle = paper.circle(aPos.left, aPos.top, 16).attr("fill", "#555753").attr("stroke", "none");
				var aText = paper.text(aPos.left, aPos.top, aPathPack.posList.length).attr("stroke", "#fff");
				aPathPack.svgList.push(aCircle);
				aPathPack.svgList.push(aText);
			}
		},
		endPath : function(aPathPack) {
			$.each(aPathPack.svgList, function(index, value) {
				value.remove();
			});
			$.ajax({
				type : 'POST',
				url : '/newpath',
				data : {
					'a' : $('#current_author').val(),
					'pw' : aPathPack.msgPath
				},
				success : function(res) {

				},
				dataType : 'json'
			});
			return drawPath(aPathPack.msgPath);
		},
		pathPlay : pathPlay,
		hidePath : function() {
			$('svg').hide();
			$('svg').remove();
		},
		updatePath : function() {
			$('svg').remove();
			paper = Raphael('content');
			$.getJSON('/allpath', function(data) {
				$(data).each(function(index, path) {
					drawPath(path.pw);
				});
				$('svg').css({
					'z-index' : '-10',
					'position' : 'fixed',
					'top' : '0px',
					'left' : '0px'
				});
				$('#uiWrap').after($('svg'));
			});
		}
	};
});
