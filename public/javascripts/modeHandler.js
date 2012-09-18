define(['helper', 'defaultMode', 'writeMode', 'mapModule'], function(helper, defaultMode, writeMode, mapModule) {
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
				$('.active').switchClass('active', 'normal');
				$(this).switchClass('normal', 'active');
				changeMode('pathMode');
				return false;
			});
			helper.btnClic("#btnText", function(event) {
				$('.active').switchClass('active', 'normal');
				$(this).switchClass('normal', 'active');
				changeMode('writeMode');
				return false;
			});
			helper.btnClic("#btnCenter", function(event) {
				$('svg').hide();
				mapModule.centerTo([0, 0], true, function() {
					mapModule.zoomTo(params.zoom);
					return false;
				});

			});
		},
		refresh : refresh
	};
});

