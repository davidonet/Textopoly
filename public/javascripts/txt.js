define(["helper"], function(helper) {
	return {
		insert : function(data) {
			var aMsg = $('.msg[dc="' + data.p + '"]');
			if (aMsg !== undefined) {
				if (0 === aMsg.length) {
					var newTxt = $(document.createElement("div")).addClass("msg").addClass(data.s).addClass(data.c);
					newTxt.hide();
					if (data !== undefined) {
						if (data.t !== undefined) {
							newTxt.addClass(helper.txtLen2Class(data.t.length));
						}
					}
					newTxt.attr('dc', data.p);
					newTxt.css(helper.posToCSS(data.p));

					if (params.zoom < 20) {
						var newContent;
						if ('image' === data.c) {
							newContent = $(document.createElement("img")).attr("src", "/getimg/[" + data.p + "]");
						} else {
							if (data.t) {
								// text filled cell
								newContent = $(document.createElement("p")).text(data.t);
							} else {
								// booked cell
								newContent = $(document.createElement("p")).addClass("author").text(data.a);
								newTxt.addClass('l0');
							}
						}
						newTxt.append(newContent);
					}
					$('#map').append(newTxt);
					newTxt.fadeIn(500);
				}
			}
		},
		removeInvisible : function() {
			$('.msg').each(function(elt) {
				var off = $(this).offset(), t = off.top, l = off.left, h = $(this).height(), w = $(this).width(), docH = $(window).height() + params.txtheight, docW = $(window).width() + params.txtwidth, isEntirelyVisible = (t > -params.txtheight && l > -params.txtwidth && t + h < docH && l + w < docW);
				if (!isEntirelyVisible) {
					$(this).remove();
				}
			});
		}
	};
});
