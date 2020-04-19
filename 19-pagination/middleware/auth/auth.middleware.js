var User = require('./../../models/user.model.js');

module.exports.requireAuth = async function (req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect('/auth/login');
  }

  var user = await User.find({ id: req.signedCookies.userId });

  if (!user) {
    res.redirect('/auth/login');
    return;
  }

  res.locals.user = user;

  next();
};
