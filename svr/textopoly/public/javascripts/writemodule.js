// recupere coord
$('.msg').on('click', function(event) {

	var dc = $(this).attr('dc').split(',');
	// récupère la propriété dc d'un élément .msg dans un tableau
	var xGrid = dc[0];
	// récupère x de dc
	var yGrid = dc[1];
	// récupère y de dc
	console.log('xGrid= ' + xGrid + ' | yGrid= ' + yGrid);

	var position = $(this).position();
	// récupère la position absolue d'un élément .msg
	var xPos = position.left;
	var yPos = position.top;
	console.log('xPos= ' + xPos + ' | yPos= ' + yPos);
});
$('.fz > p').hide();

// Insère formulaire d'écriture

var writingForm = '<div id="writingBox"><form id = "writingForm" action="/insert"  method="post"><div><textarea name="t" rows="9" maxlength="600" cols="70"></textarea></div><div><input name="x" type="number" min="-100" max="100"/><input name="y" type="number" min="-100" max="100"/><select name="s"><option value="s">Small</option><option value="l">Long</option><option value="t">Tall</option><option value="f">Fat</option></select><select name="a"><option>davidonet</option><option>zakxxi</option></select><select name="c" value="butter"><option>butter</option><option>orange</option><option>chocolate</option><option>chameleon</option><option>skyblue</option><option>plum</option><option>scarletred</option></select><input type="submit" value="Insert" /></div></form></div>'
$('#map').append(writingForm);

// AJAXifie le formulaire d'écriture

$('#writingForm').ajaxForm(function() {
	var alert = '<div id="alert"><h2>Thank you for post</h2></div>'
	$('body').append(alert);
	$('#alert').dialog({
		buttons : {
			"OK" : function() {
				$(this).dialog("close");

				location.reload();
			}
		}
	});

});
// cache les champs X et Y du formulaire d'écriture
$('input[name*="x"]').hide();
$('input[name*="y"]').hide();

// écrire
$('.fz').on('click', function(event) {

	var dc = $(this).attr('dc').split(',');
	// récupère la propriété dc d'un élément .fz dans un tableau
	var xGrid = dc[0];
	// récupère x de dc
	var yGrid = dc[1];
	// récupère y de dc
	console.log('xGrid= ' + xGrid + ' | yGrid= ' + yGrid);
	console.log(freeAdjacent(xGrid, yGrid));
	var position = $(this).position();
	// récupère la position absolue d'un élément .fz
	var xPos = position.left;
	var yPos = position.top;
	console.log('xPos= ' + xPos + ' | yPos= ' + yPos);

	// positionnement du formulaire d'écriture
	$('#writingBox').css({
		'left' : xPos,
		'top' : yPos
	});

	// ajoute les coordonnées X Y dans le formulaire
	$('input[name*="x"]').val(xGrid);
	$('input[name*="y"]').val(yGrid);
});
