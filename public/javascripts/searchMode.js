define(["txt", "pathWalk", "infoBox", "mapModule", "helper"], function(txt, pathWalk, infoBox, mapModule, helper) {

	return {
		init : function() {
			params.findAuthor = undefined;

			// récupère la liste des auteurs
			$.getJSON('/authors', function(data) {
				$('#searchMap').autocomplete({
					source : data,
					minLength : 2,
					appendTo : $('#footer'),
					select : function(event, ui) {
						$('.filter').removeClass('filter');
						params.findAuthor = ui.item.label;
						require(["modeHandler"], function(modeHandler) {
							modeHandler.refresh();
						});
					}
				});
			});
			$('#posInfo').hide();
			$('#filter').show();			
			$('#footer').animate({
				bottom : -380
			});

		},
		refresh : function(localParams) {
			var postTxtLoad = function() {
				if (params.zoom == 2) {

				} else {
					$('.msg').dblclick(function(e) {
						mapModule.centerTo([helper.xToPos(e.pageX), helper.yToPos(e.pageY)], false, function() {
							mapModule.zoomTo(2);
						});
					});
				}
				if ((1 < params.zoom) && (params.zoom < 20)) {
					//Activate path display
					pathWalk.updatePath();
				}

			};
			txt.loadSection(localParams, postTxtLoad);
		},
		leave : function() {
			$('.msg').unbind('dblclick');
			$('.filter').removeClass('filter');
			params.findAuthor = undefined;

			$('#footer').animate({
				bottom : -480
			});
			$('#posInfo').show();
			$('#filter').hide();	

		}
	};
});
