var express = require('express');
var app = express();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);

db.defaults({ users: [] }).write();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.render('index.pug');
});

app.get('/users', function (req, res) {
  res.render('users/index.pug', {
    users: db.get('users').value(),
  });
});

app.get('/users/search', function (req, res) {
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

app.get('/users/create', function (req, res) {
  res.render('users/create.pug');
});

app.post('/users/create', function (req, res) {
  var bodyParser = require('body-parser');
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

app.listen(port, function () {
  console.log('Server is listening on: ' + port);
});
