'use strict'

const Account = require('../../models/User')

exports.create = (req, res, next) => {
  res.render('create', {})
}

exports.login = (req, res, next) => {
  res.redirect('/')
}

exports.createUser = (req, res, next) => {
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
}

exports.login = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const user = {
    username,
    password
  }
  Account.findOne(user).exec().then(user => {
    return res.render('map', {user})
  })
}
