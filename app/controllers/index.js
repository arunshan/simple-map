/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

var users = require('./Users');
router.get('/', (req, res) => res.render('index', {}));
router.get('/register', (req, res) =>  res.render('create', {}));
router.post('/register', (req, res, next) => users.createUser(req, res, next));
router.get('/login', (req, res, next) => users.checkSession(req, res, next));
router.post('/login', (req, res, next) => users.login(req, res, next));

var maps = require('./Maps');
router.get('/maps', (req, res, next) => maps.userMaps(req, res, next));
router.get('/create', (req, res, next) => res.render('createMap', {}));
router.post('/create', (req, res, next) => maps.create(req, res, next));
router.post('/delete', (req, res, next) => maps.deleteMap(req, res, next));
router.post('/edit', (req, res, next) => maps.editMap(req, res, next));

module.exports = router;
