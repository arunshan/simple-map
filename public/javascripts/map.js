/*jshint esversion: 6 */
(function () {
  mapboxgl.accessToken = window.mapboxgl.accessToken;

  $('.create').click(() => {
    window.location.href = '/create';
  });

  $('.editButton').click(e => {
    var mapData = $(e.target).data('map')
    window.location.reload();
  });

  $('.deleteButton').click(e => {
    var mapData = $(e.target).data('map')
    $.ajax({
      url: '/delete',
      type: 'POST',
      data: mapData,
      success: (data) => {
        window.location.href = '/maps';
      }
    });
  });

}());
