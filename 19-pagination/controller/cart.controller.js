var Session = require('./../models/session.model.js');
var Product = require('./../models/product.model.js');

module.exports.index = async function (req, res) {
  // Get session
  var session = await Session.findById(req.signedCookies.sessionId);

  // Get cart array
  var arrayCart = [];
  for (var product of session.cart) {
    var data = await Product.findById(product._id);
    data.quantity = product.quantity;
    arrayCart.push(data);
  }

  res.render('cart/index.pug', {
    cart: arrayCart,
  });
};

module.exports.addToCart = async function (req, res) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  // Get session
  var session = await Session.findById(sessionId);

  // Check product
  var selectedProduct = session.cart.find(function (product) {
    return product._id.toString() === productId;
  });

  if (!selectedProduct) {
    await session.updateOne({
      $push: {
        cart: {
          _id: productId,
          quantity: 1,
        },
      },
    });
  } else {
    selectedProduct.quantity += 1;
    await session.save();
  }

  res.redirect('/products');
};
