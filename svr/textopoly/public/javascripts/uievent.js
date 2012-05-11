$('.msg').on('dblclick', function(event) {
	var dc = $(this).attr('dc').split(',');
	// récupère la propriété dc d'un élément .fz dans un tableau
	var xGrid = dc[0];
	// récupère x de dc
	var yGrid = dc[1];
	$(location).attr('href', '/view?zoom=2&xcenter=' + xGrid + '&ycenter=' + yGrid);
});

$('.ctx').on('click', function(event) {
	var dc = $(this).parent().attr('dc').split(',');
	// récupère la propriété dc d'un élément .fz dans un tableau
	var xGrid = dc[0];
	// récupère x de dc
	var yGrid = dc[1];
	$('#removebox').dialog({
		"resizable" : false,
		"title" : "Suppression ?",
		buttons : {
			"Non, je ne préfère pas" : function() {
				$(this).dialog("close");
			},
			"Oui" : function() {
				$(this).dialog("close");
				$.getJSON('/remove?x=' + xGrid + '&y=' + yGrid, function(data) {
				});
			}
		}

	});
});


function btnOver(bouton) {
	$(bouton).hover(function() {
		$(this).addClass('over');
	}, function() {
		$(this).removeClass('over');
	});
}

btnOver("#btnText");
btnOver("#btnPath");
btnOver("#btnShow");
btnOver("#btnFind");
btnOver("#btnHelp");
btnOver("#btnFocus");

// Clic de menus

function btnClic(bouton) {
	$(bouton).click(function() {
		$(this).children().animate({
			height : '50px'
		}, 100)
		$(this).mouseleave(function() {
			$(this).children().animate({
				height : '0px'
			}, 100)
		})
		$(this).children().mouseleave(function() {
			$(this).animate({
				height : '0px'
			}, 100)
		})
	})
}

btnClic("#btnText");
btnClic("#btnPath");
btnClic("#btnShow");
btnClic("#btnFind"); 