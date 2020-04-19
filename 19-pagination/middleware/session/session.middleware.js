var Session = require('./../../models/session.model.js');

module.exports = async function (req, res, next) {
  if (!req.signedCookies.sessionId) {
    var session = new Session();
    await session.save();
    res.cookie('sessionId', session.id, {
      signed: true,
    });
  }
  next();
};
