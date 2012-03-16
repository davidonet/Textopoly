function decode(encoded) {
	var output = new Array;
	encoded.forEach(function(pair) {
		var aLocalArray = new Array(pair[0]);
		for(var i = 0, j = aLocalArray.length; i < j; i++) {
			aLocalArray[i] = pair[1];
		};
		output = output.concat(aLocalArray);
	})
	return output;
}

var reservedArray = decode(params.booked);

var borderArray = new Array((4 + params.xmax - params.xmin) * (4 + params.ymax - params.ymin));

for(var i = 0, j = borderArray.length; i < j; i++) {
	borderArray[i] = 0;
}

function xyToIndex(anX, anY) {
	return (anX - params.xmin) + ((4 + params.xmax - params.xmin) * (anY - params.ymin));
}

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
function anchorPoint() {
	for(var i = params.xmin, j = params.xmax + 4; i < j; i++) {
		for(var k = params.ymin, l = params.ymax + 4; k < l; k++) {
			if(1 == borderArray[xyToIndex(i, k)]) {
				var newTxt = $(document.createElement("div")).addClass('fz');
				newTxt.attr('data-coords',[i,k]);
				newTxt.css({
					left : (i - params.xmin) * params.stepx + 'px',
					top : (k - params.ymin) * params.stepy + 'px',
					width : 2 * params.stepx + 'px',
					height : 2 * params.stepy + 'px',

				});
				var newContent = $(document.createElement("p")).text('(' + i + ',' + k + ')');
				newTxt.append(newContent);
				$(newTxt).on('click', function(event) {
				  console.log($(this).attr('data-coords'));
				});
				$('#map').append(newTxt);
				
			}
		}
	}
}