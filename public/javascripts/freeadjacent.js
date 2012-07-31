define(['helper'], function(helper) {

	// Helper Function

	/**
	 * Decode multiple occurence compression array
	 * @param encoded a list af couple (count,value)
	 * @return an expanded array
	 */
	function decode(encoded) {
		var output = new Array;
		$(encoded).each(function(index, pair) {
			var aLocalArray = new Array(pair[0]);
			for(var i = 0, j = aLocalArray.length; i < j; i++) {
				aLocalArray[i] = pair[1];
			};
			output = output.concat(aLocalArray);
		})
		return output;
	}

	/**
	 * Find the index of an x,y
	 */
	function xyToIndex(anX, anY) {
		return (anX - params.xmin) + ((4 + params.xmax - params.xmin) * (anY - params.ymin));
	}

	// (0,1) array of booked cells
	var reservedArray = decode(params.booked);
	// (0,1) array of border cells
	var borderArray = new Array((4 + params.xmax - params.xmin) * (4 + params.ymax - params.ymin));

	// Initialize
	for(var i = 0, j = borderArray.length; i < j; i++) {
		borderArray[i] = 0;
	}
	// Set all candidate to the border
	for(var i = params.ymin + 1, j = params.ymax + 1; i < j; i++) {
		for(var k = params.xmin + 1, l = params.xmax + 1; k < l; k++) {
			var c = reservedArray[xyToIndex(k, i)];
			var x0 = reservedArray[xyToIndex(k - 1, i)];
			var x1 = reservedArray[xyToIndex(k + 1, i)];
			var y0 = reservedArray[xyToIndex(k, i - 1)];
			var y1 = reservedArray[xyToIndex(k, i + 1)];
			var xy00 = reservedArray[xyToIndex(k - 1, i - 1)];
			var xy01 = reservedArray[xyToIndex(k - 1, i + 1)];
			var xy11 = reservedArray[xyToIndex(k + 1, i + 1)];
			var xy10 = reservedArray[xyToIndex(k + 1, i - 1)];

			if((0 == x0) && (0 == c) && (1 == x1))
				borderArray[xyToIndex(k - 1, i)] = 1;
			if((1 == x0) && (0 == c) && (0 == x1))
				borderArray[xyToIndex(k, i)] = 1;

			if((0 == y0) && (0 == c) && (1 == y1))
				borderArray[xyToIndex(k, i - 1)] = 1;
			if((1 == y0) && (0 == c) && (0 == y1))
				borderArray[xyToIndex(k, i)] = 1;

			if((0 == xy00) && (0 == c) && (1 == xy10))
				borderArray[xyToIndex(k - 1, i - 1)] = 1;

			if((1 == xy01 || 1 == xy10) && (0 == c))
				borderArray[xyToIndex(k, i)] = 1;

			if(1 == xy11 && 0 == xy01 && 0 == x0 && 0 == x1 && 0 == y1)
				borderArray[xyToIndex(k - 1, i)] = 1;

		}

	}
	// Removing booked cell
	for(var i = params.ymin + 1, j = params.ymax + 1; i < j; i++) {
		for(var k = params.xmin + 1, l = params.xmax + 1; k < l; k++) {
			var c = reservedArray[xyToIndex(k, i)];
			var x0 = reservedArray[xyToIndex(k - 1, i)];
			var x1 = reservedArray[xyToIndex(k + 1, i)];
			var y0 = reservedArray[xyToIndex(k, i - 1)];
			var y1 = reservedArray[xyToIndex(k, i + 1)];
			var xy00 = reservedArray[xyToIndex(k - 1, i - 1)];
			var xy01 = reservedArray[xyToIndex(k - 1, i + 1)];
			var xy11 = reservedArray[xyToIndex(k + 1, i + 1)];
			var xy10 = reservedArray[xyToIndex(k + 1, i - 1)];

			if(1 == x1)
				borderArray[xyToIndex(k, i)] = 0;
			if(1 == y1)
				borderArray[xyToIndex(k, i)] = 0;
			if(1 == xy11)
				borderArray[xyToIndex(k, i)] = 0;
		}
	}
	// Publishing to the DOM
	for(var i = params.xmin, j = params.xmax + 4; i < j; i++) {
		for(var k = params.ymin, l = params.ymax + 4; k < l; k++) {
			if(1 == borderArray[xyToIndex(i, k)]) {
				var newTxt = $(document.createElement("div")).addClass('fz').addClass('s');
				var aPos = [i, k];
				newTxt.attr('dc', aPos);
				newTxt.css(helper.posToCSS(aPos));
				newTxt.on('dblclick', function(event) {
					var dc = $(this).attr('dc').split(',');
					$(location).attr('href', '/view?zoom=2&xcenter=' + dc[0] + '&ycenter=' + dc[1]);
				});
				$('#map').append(newTxt);
			}
		}
	}

	/**
	 * compute a list of free neighboroud cells around a given cell
	 * @param anX,anY the coordinate of the cell
	 * @return a cardinal e,n,ne... list
	 */
	var freeAdjacent = function(anX, anY) {
		function isP(dX, dY) {
			var aCB = reservedArray[xyToIndex(Number(anX) + Number(dX), Number(anY) + Number(dY))] == 0;
			aCB &= reservedArray[xyToIndex(Number(anX) + Number(dX) + 1, Number(anY) + Number(dY))] == 0;
			aCB &= reservedArray[xyToIndex(Number(anX) + Number(dX) + 1, Number(anY) + Number(dY) + 1)] == 0;
			aCB &= reservedArray[xyToIndex(Number(anX) + Number(dX), Number(anY) + Number(dY) + 1)] == 0;
			return aCB;
		}

		var aResult = new Array();
		if(isP(-2, 0))
			aResult.push('w');
		if(isP(2, 0))
			aResult.push('e');
		if(isP(0, -2)) {
			aResult.push('n');
			if(isP(-2, 0) && isP(-2, -2))
				aResult.push('nw');
			if(isP(2, 0) && isP(2, 2))
				aResult.push('ne');
		}
		if(isP(0, 2)) {
			aResult.push('s');
			if(isP(-2, 0) && isP(-2, 2))
				aResult.push('sw');
			if(isP(2, 0) && isP(2, 2))
				aResult.push('se');
		}

		return aResult;
	}

	return freeAdjacent;
});
