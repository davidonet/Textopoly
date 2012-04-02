exports.view = function(req, res) {
	var zoom = (req.query.zoom ? Number(req.query.zoom) : 4);
	var xmin = (req.query.xmin ? Number(req.query.xmin) : -40);
	var xmax = (req.query.xmax ? Number(req.query.xmax) : 40);
	var ymin = (req.query.ymin ? Number(req.query.ymin) : -40);
	var ymax = (req.query.ymax ? Number(req.query.ymax) : 40);
	var stepX = 120;
	var stepY = 80;
	switch(zoom) {
		case 1:
			stepX = 240;
			stepY = 160;
			break;
		case 2:
			stepX = 120;
			stepY = 80;
			break;
		case 4:
			stepX = 60;
			stepY = 40;
			break;
		case 10:
			stepX = 24;
			stepY = 16;
			break;
		case 20:
			stepX = 12;
			stepY = 8;
			break;
		case 40:
			stepX = 6;
			stepY = 4;
			break;
	}

	var reservedArray = new Array((4 + xmax - xmin) * (4 + ymax - ymin));
	for(var i = 0, j = reservedArray.length; i < j; i++) {
		reservedArray[i] = 0;
	}

	function xyToIndex(anX, anY) {
		return (anX - xmin) + ((4 + xmax - xmin) * (anY - ymin));
	}

	function reserveABlock(aX, aY) {

		reservedArray[xyToIndex(aX, aY)] = 1;
		reservedArray[xyToIndex(aX + 1, aY)] = 1;
		reservedArray[xyToIndex(aX, aY + 1)] = 1;
		reservedArray[xyToIndex(aX + 1, aY + 1)] = 1;
	}

	function encode(input) {
		var encoding = [];
		var prev, count, i;
		for( count = 1, prev = input[0], i = 1; i < input.length; i++) {
			if(input[i] != prev) {
				encoding.push([count, prev]);
				count = 1;
				prev = input[i];
			} else
				count++;
		}
		encoding.push([count, prev]);
		return encoding;
	}

	function txtLen2Class(txtlen) {

		var lclass = '';
		if(txtlen < 1) {
			lclass = 'l0';
		} else if(txtlen < 4) {
			lclass = 'l4';
		} else if(txtlen < 15) {
			lclass = 'l15';
		} else if(txtlen < 50) {
			lclass = 'l50';
		} else if(txtlen < 150) {
			lclass = 'l150';
		} else if(txtlen < 300) {
			lclass = 'l300';
		} else if(txtlen < 601) {
			lclass = 'l600';
		} else {
			lclass = 'warning';
		}
		return lclass;
	}

	var aBoundingBox = [[xmin, ymin], [xmax, ymax]];
	db.txt.boxedTxt(aBoundingBox, function(err, items) {
		items.forEach(function(value, index) {
			value.absx = (value.p[0] - xmin) * stepX;
			value.absy = (value.p[1] - ymin) * stepY;
			value.absid = 'x' + (8000 + value.p[0]) + 'y' + (8000 + value.p[1]);
			var txtlen = 0;
			if(value.t)
				txtlen = value.t.length;
			value.lclass = txtLen2Class(txtlen);

			var aX = value.p[0], aY = value.p[1];
			reserveABlock(aX, aY);
			if(('l' == value.s) || ('f' == value.s))
				reserveABlock(aX + 2, aY);
			if(('t' == value.s) || ('f' == value.s))
				reserveABlock(aX, aY + 2);
			if('f' == value.s)
				reserveABlock(aX + 2, aY + 2);
		});
		var compOutput = encode(reservedArray);

		var response = {
			title : 'Textopoly | ' + aBoundingBox,
			params : {
				zoom : zoom,
				xmin : xmin,
				ymin : ymin,
				xmax : xmax,
				ymax : ymax,
				stepx : stepX,
				stepy : stepY,
				booked : compOutput
			},
			texts : items
		};

		res.render('view.jade', response);
	});
}