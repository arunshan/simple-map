var express = require('express');
var router = express.Router();
var passport = require('passport')

var Account = require('../models/User')

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

var users = require('./Users')
router.get('/', (req, res) => res.render('index', {}))
router.get('/register', (req, res) =>  res.render('create', {}))
router.post('/register', (req, res, next) => users.createUser(req, res, next))

router.get('/login', (req, res) => res.render('index', {}))
router.post('/login', (req, res, next) => users.login(req, res, next))

module.exports = router;
