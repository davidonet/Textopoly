define(["txt", "pathWalk", "infoBox", "mapModule", "helper"], function(txt, pathWalk, infoBox, mapModule, helper) {
	return {
		init : function() {
			params.findAuthor = "davidonet";

			// récupère la liste des auteurs

			var authors = $.ajax({
				url : 'http://localhost:3000/authors',
				type : 'get',
				dataType : JSON,
				async: false
	
			}).responseText;
			
			console.log(typeof(authors),authors);

			$('#searchMap').autocomplete({
				source: authors

			})

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
		}
	};
});
