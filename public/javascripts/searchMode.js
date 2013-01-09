define(["txt", "pathWalk", "infoBox", "mapModule", "helper"], function(txt, pathWalk, infoBox, mapModule, helper) {

	return {
		init : function() {

			mapModule.zoomTo(40);
			$('#results').empty();
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
						$.getJSON('/ap/' + params.findAuthor, function(res) {
							$(res.paths).each(function(i, path) {
								var newPath = $(document.createElement("a")).attr('href', '/book/' + path._id).text(path.title);
								$('#results').append($(document.createElement("p")).append(newPath));
							});
						});
					}
				});
			});
			$('#login').hide();
			$('#colorPicker').hide();
			$('#filter').show();
			$('#searchMap').val('');
			$('#searchMap').focus();

		},
		refresh : function(localParams) {
			var postTxtLoad = function() {
				if (params.zoom == 2) {
				} else {
					$('.msg').dblclick(function(e) {
						mapModule.centerTo([helper.xToPos(e.pageX), helper.yToPos(e.pageY)], false, function() {
							mapModule.zoomTo(2);
							require(["modeHandler"], function(modeHandler) {
								modeHandler.refresh();
							});
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

			$('#filter').hide();

		}
	};
});
