$(document).ready(function() {

  $("#search-page").hide();

  $("#start").submit(function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    console.log(email, password);
    $("#search-page").show();
    $("#welcome-page").hide();    
  });

  $("#log-out").click(function() {
    $("#search-page").hide();
    $("#welcome-page").show();
  })
  
});