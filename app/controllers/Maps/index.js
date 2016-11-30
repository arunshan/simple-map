/*jshint esversion: 6 */

const MapModel = require('../../models/Map');

exports.userMaps = (req, res, next) => {
  if (!req.session && !req.session.user) {
    return res.redirect('/');
  }
  const user = req.session.user;
  return res.render('map', {user});
};

exports.create = (req, res, next) => {
  if (!req.session && !req.session.user) {
    return res.redirect('/');
  }
  const user = req.session.user;
  const topRightLatitude = req.body.topRightLatitude;
  const topRightLongitude = req.body.topRightLongitude;
  const bottomLeftLatitude = req.body.bottomLeftLatitude;
  const bottomLeftLongitude = req.body.bottomLeftLongitude;
  const map = {
    topRightLat: topRightLatitude,
    topRightLng: topRightLongitude,
    bottomLeftLat: bottomLeftLatitude,
    bottomLeftLng: bottomLeftLongitude,
    user: user._id
  };
  var newMap = new MapModel(map);
  const promise = newMap.save();
  promise.then((user) => {
    return res.redirect('/maps');
  });
};
