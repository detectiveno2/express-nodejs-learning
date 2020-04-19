var Transfer = require('./../models/transfer.model.js');

module.exports.create = function (req, res) {
  res.render('transfer/index.pug', {
    csrfToken: req.csrfToken(),
  });
};

module.exports.createPost = async function (req, res) {
  var data = new Transfer({
    accountId: req.body.accountId,
    amount: parseInt(req.body.amount),
    userId: req.signedCookies.userId,
  });
  await data.save();

  res.redirect('/transfer/create');
};
