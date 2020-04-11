var express = require('express');
var app = express();

var userRoute = require('./routes/user.route.js');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/users', userRoute);

app.get('/', function (req, res) {
  res.render('index.pug');
});

app.listen(port, function () {
  console.log('Server is listening on: ' + port);
});
