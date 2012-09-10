define(['helper', 'defaultMode'], function(helper, defaultMode) {
	params.currentMode = 'default';

	function refresh() {
		console.log("refresh to mode : " + params.currentMode + " at zoom : " + params.zoom + " center : " + params.xcenter + "," + params.ycenter);
		if (params.currentMode == 'default')
			defaultMode.refresh();
	}

	function changeMode(newMode) {
		$(params.currentMode).switchClass(params.currentMode, newMode, 500);
		params.currentMode = newMode;
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
		refresh : function() {
			refresh();
		}
	};
});

