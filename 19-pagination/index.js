require('dotenv').config();

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route.js');
var authRoute = require('./routes/auth.route.js');
var productsRoute = require('./routes/products.route.js');
var cartRoute = require('./routes/cart.route.js');

var authMiddleware = require('./middleware/auth/auth.middleware.js');
var sessionMiddleware = require('./middleware/session/session.middleware.js');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);

app.get('/', function (req, res) {
  res.render('index.pug');
});

app.listen(port, function () {
  console.log('Server is listening on: ' + port);
});
