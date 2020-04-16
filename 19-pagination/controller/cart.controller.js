var db = require('./../lowdb.js');

module.exports.index = function (req, res) {
  // Get session

  var session = db
    .get('sessions')
    .find({ id: req.signedCookies.sessionId })
    .value();

  // Get cart array

  var arrayCart = [];

  for (var product in session.cart) {
    var productData = db.get('products').find({ id: product }).value();
    productData.quantity = session.cart[product];
    arrayCart.push(productData);
  }

  res.render('cart/index.pug', {
    cart: arrayCart,
    quantityProduct: session.cart,
  });
};

module.exports.addToCart = function (req, res) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect('/products');
    return;
  }

  // Get quantity of products:

  var count = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId, 0)
    .value();

  // Update quantity of products:

  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, count + 1)
    .write();

  res.redirect('/products');
};
