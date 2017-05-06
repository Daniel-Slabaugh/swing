$(document).ready(function() {

  $("#search-page").hide();

  $("#sign-in").submit(function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    console.log(email, password);
    $("#search-page").show();
    $("#sign-in-page").hide();    
  });

  $("#log-out").click(function() {
    $("#search-page").hide();
    $("#sign-in-page").show();
  })
  
});