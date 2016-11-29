var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

var users = require('./Users')
router.get('/create', (req, res, next) => users.create(req, res, next))

module.exports = router;
