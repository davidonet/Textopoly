define(['helper', 'defaultMode'], function(helper, defaultMode) {
	params.currentMode = 'default';
	var currentMode = defaultMode;

	var refresh = function(localParams) {
		console.log("refresh to mode : " + params.currentMode + " at zoom : " + params.zoom + " center : " + params.xcenter + "," + params.ycenter);
		if (localParams === undefined)
			localParams = params;
		currentMode.refresh(localParams);
	};

	function changeMode(newMode) {
		$(params.currentMode).switchClass(params.currentMode, newMode, 500);
		params.currentMode = newMode;
		if (params.currentMode == 'default') {
			currentMode = defaultMode;
		}
		refresh();
	}

	return {
		init : function() {
			helper.btnClic("#btnShow", function(event) {
				changeMode('default');
				return false;
			});
			helper.btnClic("#btnFind", function(event) {
				return false;
			});
			helper.btnClic("#btnPath", function(event) {
				changeMode('pathMode');
				return false;
			});
			helper.btnClic("#btnText", function(event) {
				changeMode('writeMode');
				return false;
			});
			helper.btnClic("#btnCenter", function(event) {
				changeMode('default');
				params.xcenter = 0;
				params.ycenter = 0;
				return false;
			});
		},
		refresh : refresh
	};
});

