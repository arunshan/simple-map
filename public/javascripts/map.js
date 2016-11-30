/*jshint esversion: 6 */
(function () {
  mapboxgl.accessToken = window.mapboxgl.accessToken;

  $('.create').click(() => {
    window.location.href = '/create';
  });

  $('.editButton').click(e => {
    var mapData = $(e.target).data('map');
    var uriStr = JSON.stringify(mapData);
    window.location.href = '/create?params=' + uriStr;
  });

  $('.deleteButton').click(e => {
    var mapData = $(e.target).data('map');
    $.ajax({
      url: '/delete',
      type: 'POST',
      data: mapData,
      success: (data) => {
        window.location.href = '/maps';
      }
    });
  });

  $('.viewButton').click(e => {
    var mapData = $(e.target).data('map');
    var uriStr = JSON.stringify(mapData);
    window.location.href = '/view?params=' + uriStr;
  });
}());
