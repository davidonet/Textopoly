define(["helper"], function(helper) {

	var insert = function(data) {
		var aMsg = $('.msg[dc="' + data.p + '"]');
		if (aMsg !== undefined) {
			if (0 === aMsg.length) {
				var newTxt = $(document.createElement("div")).addClass("msg").addClass(data.s).addClass(data.c).appendTo("#map");
				if (data.a == params.findAuthor) {
					newTxt.addClass("filter");
				}

				if (data !== undefined) {
					if (data.t !== undefined) {
						newTxt.addClass(helper.txtLen2Class(data.t.length));
					} else {
						newTxt.addClass("l0");
					}
				}
				newTxt.attr('dc', data.p);
				newTxt.css(helper.posToCSS(data.p));

				if (params.zoom < 20) {

					if ('image' === data.c) {
						var newImage = $(document.createElement("img")).attr("src", "/getimg/[" + data.p + "]").hide().load(function() {
							$(this).appendTo(newTxt);
							$(this).fadeIn(1000);
						});
					} else {
						var newContent = null;
						if (data.t) {
							// text filled cell
							newContent = $(document.createElement("p")).text(data.t);
						} else {
							// booked cell
							newContent = $(document.createElement("p")).addClass("author").text(data.a);
							newTxt.addClass('l0');
						}
						$(newContent).appendTo(newTxt);
					}

				} else {

				}
			} else {
				if (data.a == params.findAuthor) {
					aMsg.addClass("filter");
				}
			}
		}
	};
	var removeInvisible = function() {
		$('.msg').each(function(elt) {
			var off = $(this).offset(), t = off.top, l = off.left, h = $(this).height(), w = $(this).width(), docH = $(window).height() + 4 * params.stepx, docW = $(window).width() + 4 * params.stepx, isEntirelyVisible = (t > -4 * params.stepy && l > -4 * params.stepx && t + h < docH && l + w < docW);
			if (!isEntirelyVisible) {
				$(this).remove();
			}
		});
	};

	return {
		insert : insert,
		removeInvisible : removeInvisible,
		loadSection : function(bounds, fn) {
			removeInvisible();
			if (10 < params.zoom)
				bounds.mini = 1;
				$('#map').draggable("disable");
			$.ajax({
				url : 'section',
				dataType : 'json',
				data : bounds,
				success : function(section) {
					$(section.texts).each(function(index, data) {
						insert(data);
					});
					$('#map').draggable("enable");
					fn();
				}
			});
		}
	};
});
