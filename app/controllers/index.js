var express = require('express');
var router = express.Router();
var passport = require('passport')

var Account = require('../models/User')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

var users = require('./Users')

router.get('/', (req, res) => {
  res.render('index', { user : req.user });
})

router.get('/register', (req, res) => {
  res.render('create', {});
})

router.post('/register', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const user = {
    username,
    password
  }
  var newUser = new Account(user)
  const promise = newUser.save()
  promise.then((user) => {
    return res.redirect('/login')
  })
})

router.get('/login', (req, res) => {
  res.render('index', { user : req.user });
})

router.post('/login', (req, res, next) => {
  req.session.save((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

module.exports = router;
