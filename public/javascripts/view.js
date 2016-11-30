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
    // Add a GeoJSON source containing the state polygons.
    map.addSource('states', {
        'type': 'geojson',
        'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
    });

    // Add a layer showing the state polygons.
    map.addLayer({
      'id': 'states-layer',
      'type': 'fill',
      'source': 'states',
      'paint': {
        'fill-color': 'rgba(0, 0, 0, 0)'
      }
    });
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
    var popup = new mapboxgl.Popup()
        .setLngLat(map.unproject(e.point))
        .setDOMContent(button)
        .addTo(map);
  });
}());
