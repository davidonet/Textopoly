define([], function() {
	function posToLeft(p) {
		return (p[0] - params.xmin) * params.stepx;
	}

	function posToTop(p) {
		return (p[1] - params.ymin) * params.stepy;
	}

	var isOn = false;
	setInterval(function() {
		if (isOn)
			$('#blink').hide();
		else
			$('#blink').show();
		isOn = !isOn;
	}, 1000);

	var xToPos = function(X) {
		var x = X - (params.stepx / 2);
		return params.xmin + Math.ceil((x - $('#map').position().left) / params.stepx);
	};
	var yToPos = function(Y) {
		var y = Y - (params.stepy / 2);
		return params.ymin + Math.ceil((y - $('#map').position().top) / params.stepy);
	};

	return {
		xToPos : xToPos,
		yToPos : yToPos,
		initLeft : (((params.xmin - params.xcenter - 1) * params.stepx) + $(document).width() / 2),
		initTop : (((params.ymin - params.ycenter - 1) * params.stepy) + $(document).height() / 2),
		getCenterX : function() {
			return xToPos($(document).width() / 2);
		},

		getCenterY : function() {
			return yToPos($(document).height() / 2);
		},
		posToLeft : posToLeft,
		posToTop : posToTop,
		/**
		 * Compute the html top, left
		 */
		posToCSS : function(p) {
			return {
				left : posToLeft(p) + 'px',
				top : posToTop(p) + 'px'
			};
		},
		/**
		 * Compute the message class depending on the text lenght
		 * @param txtlen a characters count
		 */
		txtLen2Class : function(txtlen) {
			var lclass = '';
			if (txtlen < 1) {
				lclass = 'l0';
			} else if (txtlen < 4) {
				lclass = 'l4';
			} else if (txtlen < 15) {
				lclass = 'l15';
			} else if (txtlen < 50) {
				lclass = 'l50';
			} else if (txtlen < 150) {
				lclass = 'l150';
			} else if (txtlen < 300) {
				lclass = 'l300';
			} else if (txtlen < 601) {
				lclass = 'l600';
			} else {
				lclass = 'warning';
			}
			return lclass;
		},
		/**
		 * Custom over management
		 */
		btnOver : function(bouton) {
			$(bouton).hover(function() {
				$(this).addClass('over');
			}, function() {
				$(this).removeClass('over');
			});
		},
		/**
		 * Menu button handling
		 */
		btnClic : function(bouton, fn) {
			$(bouton).click(fn);
		},
		handlesPos : function(targetArea) {
			var r = 10;
			var w = $(targetArea).parent().outerWidth();
			var h = $(targetArea).parent().outerHeight();

			$(targetArea + '>.nw.handle').css({
				top : -2 * r,
				left : -2 * r
			});

			$(targetArea + '> .n.handle').css({
				top : -2 * r,
				left : -2 * r + w / 2
			});

			$(targetArea + '> .ne.handle').css({
				top : -2 * r,
				left : -2 * r + w
			});

			$(targetArea + '> .e.handle').css({
				top : -2 * r + h / 2,
				left : -2 * r + w
			});

			$(targetArea + '> .se.handle').css({
				top : -2 * r + h,
				left : -2 * r + w
			});

			$(targetArea + '> .so.handle').css({
				top : -2 * r + h,
				left : -2 * r + w / 2
			});

			$(targetArea + '> .sw.handle').css({
				top : -2 * r + h,
				left : -2 * r
			});

			$(targetArea + '> .w.handle').css({
				top : -2 * r + h / 2,
				left : -2 * r
			});
		}
	};
});
