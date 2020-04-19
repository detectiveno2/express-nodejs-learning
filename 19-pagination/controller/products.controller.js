var Product = require('./../models/product.model.js');

module.exports.index = async function (req, res) {
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  var pageQuantity = Math.floor(9 / 8 + 1);

  var products = await Product.find();
  res.render('products/index.pug', {
    products: products.slice(start, end),
    pageQuantity: pageQuantity,
    page: page,
  });
};
