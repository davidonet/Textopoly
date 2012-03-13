require(["jquery",], function() {
    console.log('require jquery');
   	require(["/socket.io/socket.io.js"], function() {
		console.log('socket.io loaded');
  		require(["bookingsocket"], function() {
			console.log('configure booking socket');
		});
	});
});

