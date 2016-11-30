/*jshint esversion: 6 */
(function () {
  mapboxgl.accessToken = window.mapboxgl.accessToken;
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-74.50, 40],
      zoom: 9
  });

  $('.previewMapButton').click(() => {
    $('.content').css({display: 'flex'});
    var topRightLatitude = $('.topRightLatitude').val();
    var topRightLongitude = $('.topRightLongitude').val();
    var bottomLeftLatitude = $('.bottomLeftLatitude').val();
    var bottomLeftLongitude = $('.bottomLeftLongitude').val();
    if (topRightLatitude && topRightLongitude && bottomLeftLatitude && bottomLeftLongitude) {
      try {
        map.fitBounds([[
          topRightLatitude,
          topRightLongitude
        ], [
          bottomLeftLatitude,
          bottomLeftLongitude
        ]]);
      } catch (err) {
        alert(err)
      }
    } else {
      map.fitBounds([[
        32.958984,
        -5.353521
      ], [
        43.50585,
        5.615985
      ]]);
    }
  });
}());
