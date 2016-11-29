'use strict'

exports.create = (req, res, next) => {
  res.render('create', {})
}

exports.login = (req, res, next) => {
  res.redirect('/')
}
