define(['helper', 'defaultMode', 'writeMode', 'pathMode', 'searchMode', 'mapModule', 'authentification'], function(helper, defaultMode, writeMode, pathMode, searchMode, mapModule, authentification) {
	params.currentMode = 'default';
	var currentMode = defaultMode;

	var refresh = function(localParams) {
		//console.log("refresh to mode : " + params.currentMode + " at zoom : " + params.zoom + " center : " + params.xcenter + "," + params.ycenter);
		if (localParams === undefined)
			localParams = params;
		currentMode.refresh(localParams);
	};

	function changeMode(newMode) {

		if (newMode != params.currentMode) {

			currentMode.leave();
			$('.' + params.currentMode).switchClass(params.currentMode, newMode, 500);
			params.currentMode = newMode;
			if (params.currentMode == 'default') {
				currentMode = defaultMode;
			} else if (params.currentMode == 'writeMode') {
				currentMode = writeMode;
			} else if (params.currentMode == 'pathMode') {
				currentMode = pathMode;
			} else if (params.currentMode == 'searchMode') {
				currentMode = searchMode;
			}

			currentMode.init();
			refresh();
		}
	}

	return {
		init : function() {
			helper.btnClic("#btnShow", function(event) {
				$('.active').switchClass('active', 'normal');
				$(this).switchClass('normal', 'active');
				changeMode('default');
				return false;
			});
			helper.btnClic("#btnFind", function(event) {
				$('.active').switchClass('active', 'normal');
				$(this).switchClass('normal', 'active');
				return false;
			});
			helper.btnClic("#btnPath", function(event) {
				authentification.check(function() {
					$('.active').switchClass('active', 'normal');
					$("#btnPath").switchClass('normal', 'active');
					changeMode('pathMode');
				});
				return false;
			});
			helper.btnClic("#btnText", function(event) {
				
				authentification.check(function() {
					$('.active').switchClass('active', 'normal');
					$("#btnText").switchClass('normal', 'active');
					changeMode('writeMode');
				});
				return false;
			});
			helper.btnClic("#btnFind", function(event) {
				$('.active').switchClass('active', 'normal');
				$(this).switchClass('normal', 'active');
				changeMode('searchMode');
				return false;
			});
			helper.btnClic("#btnCenter", function(event) {
				mapModule.centerTo([0, 0], true, function() {
					var xmin = params.xmin + Math.ceil((-$('#map').position().left - params.stepx) / (params.stepx));
					var ymin = params.ymin + Math.ceil((-$('#map').position().top - params.stepy) / (params.stepy));
					var lparam = {
						"xmin" : xmin - 2,
						"ymin" : ymin - 2,
						"xmax" : xmin + params.txtwidth + 2,
						"ymax" : ymin + params.txtheight + 2
					};
					refresh(lparam);
				});
				return false;
			});
		},
		refresh : refresh
	};
});

