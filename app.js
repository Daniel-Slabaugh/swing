$(document).ready(function() {

  $("#sign-in").submit(function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    console.log(email, password);
  });

});