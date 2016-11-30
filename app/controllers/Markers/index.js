/*jshint esversion: 6 */

const MarkerModel = require('../../models/Marker');

exports.createMarker = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  const map = JSON.parse(req.query.map);
  const latlng = JSON.parse(req.query.latlng);
  const marker = {
    lat: latlng.lat,
    lng: latlng.lng,
    map: map.id
  };
  var newMarker = new MarkerModel(marker);
  const promise = newMarker.save();
  promise.then((marker) => {
    return res.redirect(`/view?params=${req.query.map}`);
  });
};
