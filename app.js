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
        success: callback
    };
    $.ajax(settings);
}

function recieveMapsData(data) {
    var resultElement = '';
    console.log(data);
    if (data.results.length > 0) {
      var latitude = data.results[0].geometry.location.lat
      var longitude = data.results[0].geometry.location.lng
      var dist = 100000
      getDataFromFacebookApi(longitude, latitude, dist) 

    } else {
        resultElement += '<p>No results</p>';
    }
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
            key: 'EAAagTuIJs0EBACrfTvjmo0IlPpW4Pmx11IbweCH1jk5QcKsZCdEpEF6LTdLaYgXitaA2jcneHFVlcbTB5DdfDMxmCFMVybGZC0D4Rqjrqd5ovXrsjNs2XCCMKhGEod4T6s1bZAAskNfR4ZCQLkicocoWBrZAjfbZCJg5Wk9xhaXl2bZAohZC32QEdZAcPgLZCozjYZD',
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
