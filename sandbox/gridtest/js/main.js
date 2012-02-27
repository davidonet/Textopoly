$(document).ready(function() {
	
	$('.msg').each(function(elt) {
		$(this).css({
			left : this.offsetLeft * 120,
			top : this.offsetTop * 90
		});
	});

	$(document).bind('mousewheel', function(event, delta) {
		console.log(delta);
		if(0 < delta)
			factor = 1.5;
		else
			factor = .75;
		$('.msg').each(function(elt) {
			$(this).stop(true,false).animate({
				left : Math.floor(this.offsetLeft * factor),
				top : Math.floor(this.offsetTop * factor),
				width : Math.floor($(this).width() * factor),
				height : Math.floor($(this).height() * factor)
			},500);
		});
		event.stopPropagation();
		event.preventDefault();
		return false;
	});
});
