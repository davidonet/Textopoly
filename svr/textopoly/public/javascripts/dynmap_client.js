require(["jquery", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js", "jquery.ui.touch-punch", "jquery.form"], function($) {
	$(function() {
		$(document).ready(function() {
			$("#map").css({
				width: $(document).width()*3,
				height:$(document).height()*3,
			});
			
			$('#map').draggable({
				stop:function(event,ui){
				console.log(event);
				console.log(ui);	
				}
			});
			
			$.getJSON('/block', function(data, textStatus, jqXHR) {

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

				var xmin = data["xmin"];
				var ymin = data["ymin"];
				var stepx = params["stepx"];
				var stepy = params["stepy"];

				$.each(data["texts"], function(index, aValue) {
					var aX = Math.floor((aValue["p"][0] - xmin) * stepx);
					var aY = Math.floor((aValue["p"][1] - ymin) * stepy);
					var aT = aValue["t"];
					var newTxt = $(document.createElement("div")).addClass("msg").addClass("mdf");
					newTxt.addClass(aValue["s"]).addClass(aValue["c"]);
					if(aT)
						newTxt.addClass(txtLen2Class(aT.length))
					newTxt.css({
						left : aX+"px",
						top : aY+"px",
					});
					var aP = $(document.createElement("p")).text(aT);
					newTxt.append(aP);
					$("#map").append(newTxt);
				});
				$('#map').fadeIn(500);
			});
		});
	});
});
