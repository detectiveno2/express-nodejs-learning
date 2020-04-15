var db = require('./../lowdb.js');

module.exports.index = function (req, res) {
  // Render products
  var page = parseInt(req.query.page) || 1;
  var perPage = 16;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  var pageQuantity = Math.floor(100 / 16 + 1);

  res.render('products/index.pug', {
    products: db.get('products').value().slice(start, end),
    pageQuantity: pageQuantity,
    page: page,
  });
};
