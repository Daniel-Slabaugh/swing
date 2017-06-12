var MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
var FACEBOOK_BASE_URL = 'https://graph.facebook.com/v2.9/search'


$(document).ready(function() {

  $("#search-page").hide();
  $("#results-page").hide();

  InfiniteRotator()

  $("#start").submit(function(e) {
    e.preventDefault();
    $("#search-page").show();
    $("#welcome-page").hide();    
  });

  $("#search").submit(function(e) {
    e.preventDefault();
    var zipcode = $("#zipcode").val();
    if (!isNaN(zipcode) && zipcode.length == 5) {
      getDataFromMapsApi(zipcode);
    } else {
      alert("Incorrect Zipcode");
    }
  })

  $("#search-again").click(function(e) {
    e.preventDefault();
    $("#results-page").hide();
    $("#search-page").show();
  })
  
});

function getDataFromMapsApi(searchTerm) {
  var settings = {
    url: MAPS_BASE_URL,
    data: {
        components: 'postal_code:' + searchTerm,
        key: 'AIzaSyB09YmR2_3rgQwRuLN_BDOIQiKI9hJAZJc',
    },
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      var resultElement = '';
      if (data.results.length > 0) {
        var latitude = data.results[0].geometry.location.lat;
        var longitude = data.results[0].geometry.location.lng;
        //not sure if this is best practaces
        var distance = ($('#distance').val() * 1609.34); // turn miles into meters
        getDataFromFacebookApi(longitude, latitude, distance);
      } else {
        resultElement += '<p>No results</p>';
      }
    }
  };
  $.ajax(settings);
}

function getDataFromFacebookApi(longitude, latitude, dist) {
  var settings = {
    url: FACEBOOK_BASE_URL,
    data: {
      center: latitude  + ',' + longitude,
      distance: dist,
      type: 'place',
      access_token: '1865110520443713|TNN7qd7qh7o1HdfMF8GL4Ar6dUw',
      q: 'swing_dance'
    },
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      var resultElement = '';
      if (data.data.length > 0) {
          data.data.forEach(function(object) {
              resultElement += '<tr><td><a href="https://www.facebook.com/' + object.id + '">' + object.name + '</a></td></tr>';
          });
      } else {
          resultElement += '<p>No results</p>';
      }
      $('#results').html(resultElement);
      $("#search-page").hide();
      $("#results-page").show();
      },
  };
  $.ajax(settings);
}

function InfiniteRotator()  {
  var urls = ["swing-pic-1.png", "swing-pic-2.jpg","swing-pic-3.jpg","swing-pic-4.jpg"];

  //initial fade-in time (in milliseconds)
  var initialFadeIn = 1000;

  //interval between items (in milliseconds)
  var itemInterval = 5000;

  //cross-fade time (in milliseconds)
  var fadeTime = 2500;

  //count number of items
  var numberOfItems = urls.length;

  //set current item
  var currentItem = 0;

  var background = $('.container')
  //show first item
  background.css({"background-image":"url(Swing-Dance-image.jpg)"});
  // background.background-image.fadeIn(initialFadeIn);

  //loop through the items    
  var infiniteLoop = setInterval(function() {

    // background.background-image.fadeOut(fadeTime)

    if (currentItem == numberOfItems - 1) {
      currentItem = 0;
    } else {
      currentItem++;
    }
    background.css({"background-image":"url(images/" +urls[currentItem] +")"});
  // background.background-image.fadeIn(initialFadeIn);

  }, itemInterval);
}