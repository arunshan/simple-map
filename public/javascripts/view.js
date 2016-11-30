/*jshint esversion: 6 */
(function () {
  mapboxgl.accessToken = window.mapboxgl.accessToken;
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-77.04, 38.907],
    zoom: 11.15
  });
  map.on('load', function () {
    const markers = $('.markers').data('markers');
    var markersArray = [];
    markers.map(marker => {
      markersArray.push({
        "type": "Feature",
        "properties": {
          "icon": "theatre"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [marker.lat, marker.lng]
        }
      })
    })
    map.addSource("places", {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": markersArray
      }
    })
    map.addLayer({
        "id": "places",
        "type": "symbol",
        "source": "places",
        "layout": {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true
        }
    });
  });

  var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
  });

  map.on('mousemove', (e) => {
    var features = map.queryRenderedFeatures(e.point, { layers: ['places'] });
    // Change the cursor style as a UI indicator.
    console.log('the features are ', features)
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    // var popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: false
    // });
    if (!features.length) {
        popup.remove();
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.description)
        .addTo(map);
  });

  map.on('click', (e) => {
    var mapParams = location.search.split('params=').length > 1 ? location.search.split('params=')[1] : null;
    mapParams = JSON.parse(decodeURIComponent(mapParams));
    var domelem = document.createElement('a');
    domelem.href = "/createMarker?map=${JSON.stringify(mapParams)}&latlng=${JSON.stringify(map.unproject(e.point))}";
    domelem.innerHTML = "Create New Marker";
    domelem.onclick = function() {
        alert(this.href);
    };
    var button = document.createElement('button');
    button.innerHTML = "Create New Marker";
    button.onclick = () => {
      window.location.href = `/createMarker?map=${JSON.stringify(mapParams)}&latlng=${JSON.stringify(map.unproject(e.point))}`;
    };
    var popup = new mapboxgl.Popup({closeButton: false})
        .setLngLat(map.unproject(e.point))
        .setDOMContent(button)
        .addTo(map);
  });
}());
