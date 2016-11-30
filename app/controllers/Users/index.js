/*jshint esversion: 6 */

const Account = require('../../models/User');

exports.create = (req, res, next) => {
  res.render('create', {});
};

exports.createUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = {
    username,
    password
  };
  var newUser = new Account(user);
  const promise = newUser.save();
  promise.then((user) => {
    return res.redirect('/login');
  });
};

exports.login = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/maps');
  }
  const session = req.session;
  const username = req.body.username;
  const password = req.body.password;
  const user = {
    username,
    password
  };
  Account.findOne(user).exec().then(user => {
    req.session.user = user;
    return res.render('maps', {user});
  });
};

exports.checkSession = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/maps');
  }
  res.render('index', {});
};
