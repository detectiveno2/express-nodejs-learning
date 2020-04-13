var db = require('../lowdb.js');
var bodyParser = require('body-parser');
var md5 = require('md5');

module.exports.login = function (req, res, next) {
  res.render('auth/login.pug');
};

module.exports.postLogin = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  var user = db.get('users').find({ email: email }).value();

  if (!user) {
    res.render('auth/login.pug', {
      error: 'User does not exists.',
    });
    return;
  }

  var hashedPassword = md5(password);

  if (user.password !== hashedPassword) {
    res.render('auth/login', {
      error: 'Wrong password.',
      values: req.body,
    });
    return;
  }

  res.cookie('userId', user.id);
  res.redirect('/users');
};
