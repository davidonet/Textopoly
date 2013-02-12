define(["helper", "uievent", "lib/async"], function(helper, uievent, async) {

	var insert = function(data) {
		//var aMsg = $('.msg[dc="' + data.p + '"]');
		var aMsg = $("#p" + data.p.toString().replace(",", "y").replace("-", "m"));
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
					if (params.zoom == 2)
						if (data.m) {
							var sndelt = $(document.createElement("div")).addClass("sndcld").attr("url", data.m).appendTo(newTxt);
							$(sndelt).click(function() {
								if ($('#stratus').length > 0) {
									var src = 'http://stratus.sc/player?' + $.param({
										auto_play : true,
										links : data.m,
										download : false,
										buying : false,
										stats : false
									}, true) + '&link=' + encodeURIComponent(document.location.href);
									$.postMessage(data.m, src, $('#stratus iframe')[0].contentWindow);
								} else {
									$.stratus({
										auto_play : true,
										links : data.m,
										download : false,
										buying : false,
										stats : false
									});
								}
							});

						}
				}
				newTxt.attr('dc', data.p);
				newTxt.attr('id', "p" + data.p.toString().replace(",", "y").replace("-", "m"));
				newTxt.css(helper.posToCSS(data.p));

				if (params.zoom < 20) {

					if ('image' === data.c) {
						if (params.zoom < 4) {
							$(document.createElement("img")).attr("src", "/getimg/[" + data.p + "]").appendTo(newTxt);

						} else {
							$(document.createElement("img")).attr("src", "/getimg/s[" + data.p + "]").appendTo(newTxt);
						}

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
		async.each($('.msg'), function(elt, done) {

			var off = $(elt).offset(), t = off.top, l = off.left, h = $(elt).height(), w = $(elt).width(), docH = $(window).height() + 4 * params.stepx, docW = $(window).width() + 4 * params.stepx, isEntirelyVisible = (t > -4 * params.stepy && l > -4 * params.stepx && t + h < docH && l + w < docW);
			if (!isEntirelyVisible) {
				$(elt).remove();
			}
			done();
		}, function() {
		});
	};

	return {
		insert : insert,
		removeInvisible : removeInvisible,
		loadSection : function(bounds, fn) {
			if (xhr)
				xhr.abort();
			xhr = $.ajax({
				url : 'section',
				dataType : 'json',
				data : bounds,
				async : true,
				success : function(section) {
					async.each($(section.texts), function(data, done) {
						insert(data);
						done();
					}, function() {
						removeInvisible();
						fn();
					});

				}
			});
		}
	};
});
