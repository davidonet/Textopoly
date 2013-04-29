/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) {
	var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 15000, //< Default Max Timout is 3s
	start = new Date().getTime(), condition = false, interval = setInterval(function() {
		if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
			// If not time-out yet and condition not yet fulfilled
			condition = ( typeof (testFx) === "string" ? eval(testFx) : testFx());
			//< defensive code
		} else {
			if (!condition) {
				// If condition still not fulfilled (timeout but condition is 'false')
				console.log("'waitFor()' timeout");
				phantom.exit(1);
			} else {
				// Condition fulfilled (timeout and/or condition is 'true')
				console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
				typeof (onReady) === "string" ? eval(onReady) : onReady();
				//< Do what it's supposed to do once the condition is fulfilled
				clearInterval(interval);
				//< Stop this interval
			}
		}
	}, 250);
	//< repeat check every 250ms
};

var page = require('webpage').create();

var xmin = 2432;
var ymin = -95;
var xmax = 2473;
var ymax = 44;

function textoload(x, y) {

	console.log("Loading :" + x + "," + y);
	page.open("http://localhost:5020/view?zoom=1&xcenter=" + x + "&ycenter=" + y, function(status) {
		page.viewportSize = {
			width : 1920,
			height : 1280
		};
		setTimeout(function() {
			page.evaluate(function() {
				var body = document.body;
				body.querySelector('#uiWrap').style.display = 'none';
			});
			page.render('/tmp/Print_' + xmin + '_' + ymin + 'a' + xmax + '_' + ymax + '/textopoly_x' + x + 'y' + y + '.png');
			console.log("Redering :" + x + "," + y);
			if ((xmax < x) && (ymax < y))
				phantom.exit();
			if (xmax < x) {
				x = xmin;
				y += 6;
			}
			textoload(x + 6, y, xmax, ymax);
		}, 5000);
	});
}

textoload(xmin, ymin);
