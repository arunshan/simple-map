/*jshint esversion: 6 */

const MapModel = require('../../models/Map');
const MarkerModel = require('../../models/Marker')
exports.userMaps = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  const user = req.session.user;
  MapModel.find({user: user._id}).exec().then(maps => {
    var finalMaps = []
    maps.map(singleMap => {
      var tempMap = {}
      tempMap.id = singleMap._id
      tempMap.topRightLat = singleMap.topRightLat
      tempMap.topRightLng = singleMap.topRightLng
      tempMap.bottomLeftLat = singleMap.bottomLeftLat
      tempMap.bottomLeftLng = singleMap.bottomLeftLng
      tempMap.user = singleMap.user
      finalMaps.push(tempMap)
    })
    return res.render('maps', {
      user,
      maps: finalMaps
    });
  });
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
    return res.json(user);
  });
};

exports.deleteMap = (req, res, next) => {
  if (!req.session && !req.session.user) {
    return res.redirect('/');
  }
  var user = req.session.user;

  MapModel.findOne({_id: req.body.id}).remove().exec().then(map => {
    return res.json(map);
  });
};

exports.editMap = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  MapModel.findOne({_id: req.body.id}).exec().then(map => {
    map.topRightLat = parseFloat(req.body.topRightLatitude);
    map.topRightLng = parseFloat(req.body.topRightLongitude);
    map.bottomLeftLat = parseFloat(req.body.bottomLeftLatitude);
    map.bottomLeftLng = parseFloat(req.body.bottomLeftLongitude);
    const promise = map.save();
    promise.then(() => {
      return res.json(map);
    });
  });
};

exports.viewMap = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  const user = req.session.user;
  const mapId = JSON.parse(req.query.params).id;
  MarkerModel.find({map: mapId}).exec().then(markers => {
    console.log('the markers are ', markers)
    return res.render('view', {user, markers});
  })
};
