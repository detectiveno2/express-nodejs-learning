var express = require('express');
var router = express.Router();
var db = require('../lowdb.js');
var shortid = require('shortid');

router.get('', function (req, res) {
  res.render('users/index.pug', {
    users: db.get('users').value(),
  });
});

router.get('/search', function (req, res) {
  var q = req.query.q;
  var users = db.get('users').value();
  var matchedUsers = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index.pug', {
    users: matchedUsers,
    queryInput: q,
  });
});

router.get('/create', function (req, res) {
  res.render('users/create.pug');
});

router.post('/create', function (req, res) {
  var bodyParser = require('body-parser');
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  var user = db.get('users').find({ id: id }).value();
  res.render('users/view.pug', {
    user: user,
  });
});

module.exports = router;
