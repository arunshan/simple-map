/*jshint esversion: 6 */
(function () {
  mapboxgl.accessToken = window.mapboxgl.accessToken;
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-74.50, 40],
      zoom: 9
  });

  var editParams = location.search.split('params=').length > 1 ? location.search.split('params=')[1] : null;
  if (editParams) {
    editParams = JSON.parse(decodeURIComponent(editParams));
    $('.topRightLatitude').val(editParams.topRightLat);
    $('.topRightLongitude').val(editParams.topRightLng);
    $('.bottomLeftLatitude').val(editParams.bottomLeftLat);
    $('.bottomLeftLongitude').val(editParams.bottomLeftLng);
    getPreview()
  }

  function getPreview() {
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
  }
  // preview map
  $('.previewMapButton').click(() => {
    getPreview()
  });

  // submit map
  $('button.createFormButton').click(() => {
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
          if (editParams) {
            $.ajax({
              url: '/edit',
              type: 'post',
              dataType: 'json',
              data: $('form#createMap').serialize() + '&id=' + editParams.id,
              success: (data) => {
                window.location.href = '/maps';
              }
            });
          } else {
            $.ajax({
              url: '/create',
              type: 'post',
              dataType: 'json',
              data: $('form#createMap').serialize(),
              success: (data) => {
                window.location.href = '/maps';
              }
            });
          }
        } catch (err) {
          alert(err);
        }
      }
  });

}());
