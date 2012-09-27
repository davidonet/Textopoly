define(["lib/jquery.tipsy", "pathWalk"], function(tip, pathWalk) {
	var delay = 150;
	bindMsg = function() {
		$('.msg').click(function(event) {

			var elt = this;
			var position = $(elt).position();
			// récupère la position absolue d'un élément .fz
			var xPos = position.left;
			var yPos = position.top;
			isBooked = $(elt).hasClass('l0');
			isImage = $(elt).hasClass('image');

			if (isBooked === true && isImage === false) {
			} else {

				// positionnement de la boite de chemin
				$('#pathBox').css({
					'left' : xPos - 10,
					'top' : yPos - 10
				});
				$('#pathBox').fadeIn(100);

				// récupère la position
				var dc = $(elt).attr('dc');

				$('#pathBox').attr('dc', dc);

				// règle la taille en fonction du type de case
				require(["helper"], function(helper) {
					if ($(elt).hasClass('s')) {

						$('.pathArea').switchClass('l t f', 's', delay, function() {
							helper.handlesPos('.pathArea');
						});
					} else if ($(elt).hasClass('l')) {

						$('.pathArea').switchClass('s t f', 'l', delay, function() {
							helper.handlesPos('.pathArea');
						});
					} else if ($(elt).hasClass('t')) {

						$('.pathArea').switchClass('s l f', 't', delay, function() {
							helper.handlesPos('.pathArea');
						});
					} else if ($(elt).hasClass('f')) {

						$('.pathArea').switchClass('s l t', 'f', delay, function() {
							helper.handlesPos('.pathArea');
						});
					}
				});
			}
			return false;
		});
	};
	return {
		init : function() {
			$('.pathArea > .n.handle.pa').tipsy({
				delayIn : 500, // delay before showing tooltip (ms)
				fallback : 'Commencer un chemin', // fallback text to use when no tooltip text
				gravity : 'e' // gravity
			});
			var aPPack;
			$('.pathArea > .n.handle.pa').click(function() {
				if (aPPack === undefined)
					aPPack = pathWalk.startPath();
				pathWalk.addNode(aPPack, $(this).parent().parent().attr('dc'));
				console.log(aPPack);
			});
			$('.pathArea > .so.handle.ok').click(function() {
				if (aPPack !== undefined)
					pathWalk.endPath(aPPack);
				aPPack = undefined;
			});
			bindMsg();
		},
		bindMsg : bindMsg,
		unbindMsg : function() {
			$('.msg').unbind('click');
		}
	};

});
