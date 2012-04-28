$.fn.typewriter = function(opt, callback) {
	var i = 0;
	var typeone = function(self, text, content) {
		if(text.length > 0) {
			i = i + 1;
			var next = text.match(/(\s*(<[^>]*>)?)*(&.*?;|.?)/)[0];
			text = text.substr(next.length);
			$(self).html(content + next);
			setTimeout(function() {
				typeone(self, text, content + next);
			}, opt['delay']);
			if(text.length == 0)
				if(callback != null)
					callback();
		}
	}
	this.each(function() {
		opt = opt || {
			'delay' : 100
		};
		typeone(this, $(this).html(), '');
	});
	return this;
}

/*

$(".msg > p").typewriter({'delay':200},function(){
    
})




$("#nom").typewriter(null,function(){
    // ce que vous voulez faire à la fin de l'effet;
}


*/