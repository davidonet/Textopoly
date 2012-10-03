define(['helper'], function(helper) {
	var paper;
	var aPathPack;

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

	function drawPath(aMsgList, strokecolor) {

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
			if (!strokecolor) {
				if (0 < index) {

					var shiftx = Math.floor((Number(value.left) + Number(aPosList[index - 1].left)) / 2 + (Math.random() - 2.0) * params.stepx);
					var shifty = Math.floor((Number(value.top) + Number(aPosList[index - 1].top)) / 2 + (Math.random() - 2.0) * params.stepy);
					aSVG += "S" + shiftx + "," + shifty + "," + value.left + "," + value.top;
				} else {
					aSVG += "M" + value.left + "," + value.top;
				}
			} else {
				if (0 < index) {
					aSVG += "M" + aPosList[index - 1].left + "," + aPosList[index - 1].top;
					aSVG += "L" + value.left + "," + value.top;
				}
			}
		});
		var aPath = paper.path(aSVG).attr("stroke", ( strokecolor ? "#fce94f" : "#eeeeee")).attr("stroke-width", 12 / params.zoom);

		if (!strokecolor) {
			$.each(aPosList, function(index, value) {
				if (0 < index) {
					var shiftx = Math.floor((Number(value.left) + Number(aPosList[index - 1].left)) / 2 + (Math.random() - 2.0) * params.stepx);
					var shifty = Math.floor((Number(value.top) + Number(aPosList[index - 1].top)) / 2 + (Math.random() - 2.0) * params.stepy);
					if (index < (aPosList.length - 1))
						paper.circle(value.left, value.top, 20 / params.zoom).attr("fill", "#D3D7CF").attr("stroke", "#eeeeee").attr("stroke-width", 12 / params.zoom);
					else
						paper.circle(value.left, value.top, 20 / params.zoom).attr("fill", "#eeeeee").attr("stroke", "#eeeeee").attr("stroke-width", 12 / params.zoom);
				} else {
					paper.circle(value.left, value.top, 30 / params.zoom).attr("fill", "#fff").attr("stroke", "#eee").attr("stroke-width", 12 / params.zoom);
				}
			});
		} else {
			$.each(aPosList, function(index, value) {
				paper.circle(value.left, value.top, 16).attr("fill", "#555753").attr("stroke", "none");
				paper.text(value.left, value.top, index).attr("stroke", "#eee").attr("fill", "#eee").attr("font-size", "20");
			});
		}
		return aPath;
	}

	function resize() {
		if (paper !== undefined)
			if (paper.canvas !== undefined)
				$(paper.canvas).remove();
		paper = Raphael('content');
		$(paper.canvas).css({
			'z-index' : '-10',
			'position' : 'fixed',
			'top' : '0px',
			'left' : '0px'
		});
		$('#uiWrap').after($(paper.canvas));
	}

	var updatePath = function() {
		if (paper === undefined) {
			resize();
		} else {
			paper.clear();
		}
		if (aPathPack)
			drawPath(aPathPack.msgPath, true);
		$.getJSON('/allpath', function(data) {
			$(data).each(function(index, path) {
				drawPath(path.pw);
			});
		});
	};

	return {
		startPath : function() {
			aPathPack = {
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
				drawPath(aPathPack.msgPath, true);
			}
		},
		endPath : function(aPathPack) {
			$.each(aPathPack.svgList, function(index, value) {
				value.remove();
			});
			require(["userinfo"], function(userinfo) {
				$.ajax({
					type : 'POST',
					url : '/newpath',
					data : {
						'a' : params.user.author,
						'pw' : aPathPack.msgPath
					},
					success : function(res) {
						aPathPack.msgPath = [];
						updatePath();
					},
					dataType : 'json'
				});
			});
		},
		pathPlay : pathPlay,
		hidePath : function() {
			paper.clear();
		},
		resize : resize,
		updatePath : updatePath
	};
});
