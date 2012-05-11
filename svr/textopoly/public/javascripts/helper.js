define([], function() {
	function posToLeft(p) {
		return (p[0] - params.xmin) * params.stepx;
	};
	function posToTop(p) {
		return (p[1] - params.ymin) * params.stepy;
	};
	return {
		initLeft : (((params.xmin - params.xcenter - 1) * params.stepx) + $(document).width() / 2),
		initTop : (((params.ymin - params.ycenter - 1) * params.stepy) + $(document).height() / 2),
		centerLeft : function() {
			return (params.xmin - 1) - Math.floor((2 * $('#map').position().left - $(document).width()) / (2 * params.stepx));
		},

		centerTop : function() {
			return (params.ymin - 1) - Math.floor((2 * $('#map').position().top - $(document).height()) / (2 * params.stepy));
		},
		posToLeft : posToLeft,
		posToTop : posToTop,
		posToCSS : function(p) {
			return {
				left : posToLeft(p) + 'px',
				top : posToTop(p) + 'px',
			};
		}
	}
});
