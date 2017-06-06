var MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
var FACEBOOK_BASE_URL = 'https://graph.facebook.com/v2.9/search'


$(document).ready(function() {

  $("#search-page").hide();
  $("#results-page").hide();

  $("#start").submit(function(e) {
    e.preventDefault();

    $("#search-page").show();
    $("#welcome-page").hide();   
        console.log('got here');
 
  });

  $("#search").submit(function(e) {
    e.preventDefault();
    var zipcode = $("#zipcode").val();
    getDataFromMapsApi(zipcode, recieveMapsData);
    1609.34
    // $("#search-page").hide();
    // $("#welcome-page").show();
  })
  
});



function getDataFromMapsApi(searchTerm, callback) {
  console.log(searchTerm, callback);

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
      console.log(data);
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

function recieveMapsData(data) {

    // $("#search-page").hide();
    // $("#results-page").show();

    // $('.js-search-results').html(resultElement);
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
    success: function(result) {

      console.log(result);
    }
  };
  $.ajax(settings);
}


// search?center=43.025015,-87.913646&distance=10000&q=swing&type=place
