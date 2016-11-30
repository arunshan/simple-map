/*jshint esversion: 6 */

exports.userMaps = (req, res, next) => {
  if (!req.session && !req.session.user) {
    return res.redirect('/');
  }
  const user = req.session.user;
  return res.render('map', {user});
};
