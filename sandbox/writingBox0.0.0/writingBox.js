/**
 * @author Adrien Revel
 */

$(document).ready(function() {

	$(function() {

		$("#writingArea").resizable({
			handles : 'e, s, se',
			grid : [240, 160],
			minWidth : 240,
			maxWidth : 480,
			minHeight : 160,
			maxHeight : 320,
			alsoResize : '#writingBox'
		});
		$("#writingBox").resizable();

	});
});
