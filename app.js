var MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/'
var FACEBOOK_BASE_URL = 'graph.facebook.com/v2.5/search'


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
    console.log('got here');
    // $("#search-page").hide();
    // $("#welcome-page").show();
  })
  
});



function getDataFromMapsApi(longitude, latitude, dist, callback) {
    console.log(searchTerm, callback);

    var settings = {
        url: FACEBOOK_BASE_URL,
        data: {
            address: 'high+st+hasting',
            components: 'postal_code:' + searchTerm,
            key: 'AIzaSyB09YmR2_3rgQwRuLN_BDOIQiKI9hJAZJc',
            q: searchTerm
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
}

function recieveMapsData(data) {
    var resultElement = '';
    if (data.items.length > 0) {
          console.log(data);
        data.items.forEach(function(item) {
        });
    } else {
        resultElement += '<p>No results</p>';
    }
    $("#search-page").hide();
    $("#results-page").show();

    // $('.js-search-results').html(resultElement);
}

function getDataFromFacebookApi(searchTerm, callback) {
    var settings = {
        url: MAPS_BASE_URL,
        data: {
            center: longitude + ',' + latitude,
            distance: dist,
            type: 'place'
            key: 'EAAagTuIJs0EBAOwjejepM0DuMmoAZCZANHdVcZAYHIOmccjo4yNcsgwmqXQq4CKZBZCeBw2pda191BYX8mkLUZC4sP24YgKDBGV2njETZBXmL77oj7NwDi6HQANWiLUKIWlN0NlhFIhpUmpvrdSq9kjEPheTZB0IY1JFmaXVN2UY9n8F1S0uaoZCKbuxi9m3AKkcZD',
            q: 'swing_dance'
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
}


search?center=43.025015,-87.913646&distance=10000&q=swing&type=place
