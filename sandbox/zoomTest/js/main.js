$(document).ready(function() {

	 $(".zoomTarget").click(function(evt) {
      $(this).zoomTo({targetsize:0.6});
      evt.stopPropagation();
    });
    
   
    $("#content").click(function(evt) {
      $(".zoomTarget").zoomTo({targetsize:0.2});
      evt.stopPropagation();
    });
    
    $("html").click(function(evt) {
      $(".zoomTarget").zoomTo({targetsize:0.2});
      evt.stopPropagation();
    });
  });
  

  
  
