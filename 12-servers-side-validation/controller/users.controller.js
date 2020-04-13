var db = require('../lowdb.js');
var shortid = require('shortid');

module.exports.index = function (req, res) {
  res.render('users/index.pug', {
    users: db.get('users').value(),
  });
};

module.exports.search = function (req, res) {
  var q = req.query.q;
  var users = db.get('users').value();
  var matchedUsers = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index.pug', {
    users: matchedUsers,
    queryInput: q,
  });
};

module.exports.create = function (req, res) {
  res.render('users/create.pug');
};

module.exports.postCreate = function (req, res) {
  var bodyParser = require('body-parser');
  var errors = [];
  if (!req.body.name) errors.push('Name is require.');
  if (!req.body.phone) errors.push('Phone is require.');
  if (errors.length) {
    res.render('users/create.pug', {
      errors: errors,
      values: req.body,
    });
    return;
  }
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
};

module.exports.view = function (req, res) {
  var id = req.params.id;
  var user = db.get('users').find({ id: id }).value();
  res.render('users/view.pug', {
    user: user,
  });
};
