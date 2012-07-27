define(["helper"], function(helper) {
	return {
		insert : function(data) {
			$('.msg[dc="' + data.p + '"]').remove();
			
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
		},
		removeInvisible : function() {
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
		}
	}
});
