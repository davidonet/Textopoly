define([], function() {
	function posToLeft(p) {
		return (p[0] - params.xmin) * params.stepx;
	}
	function posToTop(p) {
		return (p[1] - params.ymin) * params.stepy;
	}
	return {
		initLeft : (((params.xmin - params.xcenter - 1) * params.stepx) + $(document).width() / 2),
		initTop : (((params.ymin - params.ycenter - 1) * params.stepy) + $(document).height() / 2),
		getCenterX : function() {
			return (params.xmin - 1) - Math.floor((2 * $('#map').position().left - $(document).width()) / (2 * params.stepx));
		},

		getCenterY : function() {
			return (params.ymin - 1) - Math.floor((2 * $('#map').position().top - $(document).height()) / (2 * params.stepy));
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
			$(bouton).click(function() {
				
				fn();
								
				/*
				$(this).children().animate({
					height : '50px'
				}, 100);
				$(this).mouseleave(function() {
					$(this).children().animate({
						height : '0px'
					}, 100);
				});
				$(this).children().mouseleave(function() {
					$(this).animate({
						height : '0px'
					}, 100);
				}); */
			});
		}
	};
});
