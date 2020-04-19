var md5 = require('md5');

var User = require('./../models/user.model.js');

module.exports.login = function (req, res, next) {
  res.render('auth/login.pug');
};

module.exports.postLogin = async function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  var user = await User.findOne({ email: email });

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

  res.cookie('userId', user._id, {
    signed: true,
  });

  res.redirect('/users');
};
