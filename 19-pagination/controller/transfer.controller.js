var db = require('./../lowdb.js');
var shortid = require('shortid');

module.exports.create = function (req, res, next) {
  res.render('transfer/index.pug', {
    csrfToken: req.csrfToken(),
  });
};

module.exports.createPost = function (req, res, next) {
  var data = {
    id: shortid.generate(),
    accountId: req.body.accountId,
    amount: parseInt(req.body.amount),
    userId: req.signedCookies.userId,
  };
  db.get('transfer').push(data).write();
  res.redirect('/transfer/create');
};
