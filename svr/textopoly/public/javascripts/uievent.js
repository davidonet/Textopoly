define(['helper', 'pathwalk'], function(helper, pathwalk) {
	/**
	 * Double click to zoom and recenter map
	 */
	$('.msg').on('dblclick', function(event) {
		var dc = $(this).attr('dc').split(',');
		$(location).attr('href', '/view?zoom=2&xcenter=' + dc[0] + '&ycenter=' + dc[1]);
	});

	/**
	 * Top Menu Handling
	 */
	helper.btnClic("#btnText");
	helper.btnClic("#btnPath");
	helper.btnClic("#btnShow");
	helper.btnClic("#btnFind");
	helper.btnOver("#btnText");
	helper.btnOver("#btnPath");
	helper.btnOver("#btnShow");
	helper.btnOver("#btnFind");
	helper.btnOver("#btnHelp");
	helper.btnOver("#btnFocus");

	/**
	 * Path Walk interaction handling
	 */
	$("#path_start").button().click(function() {
		$(this).hide();
		var aPathPack = pathwalk.startPath();
		$("#map").click(function(event) {
			var aDC = $(event.target).attr('dc');
			if(aDC == undefined)
				aDC = $(event.target.parentNode).attr('dc');
			pathwalk.addNode(aPathPack, aDC);
		});
		$("#path_end").show().click(function() {
			$(this).hide();
			$("#path_start").show();
			$("#map").unbind('click');
			pathwalk.endPath(aPathPack);
			$("#path_play").button().click(function() {
				pathwalk.pathPlay(aPathPack.msgPath)
			});
		});
	});
	$("#path_end").button().hide();

	/***********************************************************************************
	 * Begin temporary delete ui
	 ***********************************************************************************/
	$('.ctx').on('click', function(event) {
		var dc = $(this).parent().attr('dc').split(',');
		var xGrid = dc[0];
		var yGrid = dc[1];
		$('#removebox').dialog({
			"resizable" : false,
			"title" : "Suppression ?",
			buttons : {
				"Non, je ne préfère pas" : function() {
					$(this).dialog("close");
				},
				"Oui" : function() {
					$(this).dialog("close");
					$.getJSON('/remove?x=' + xGrid + '&y=' + yGrid, function(data) {
					});
				}
			}

		});
	});
	/***********************************************************************************
	 * End of temporary delete ui
	 */

});
