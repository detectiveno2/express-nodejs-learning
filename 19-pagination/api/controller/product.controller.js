var Product = require('./../../models/product.model');

module.exports.index = async function (req, res) {
  var products = await Product.find();
  res.json(products);
};

module.exports.postIndex = function (req, res) {
  res.json(req.body);
};

module.exports.putIndex = async function (req, res) {
  //   var product = await Product.findById(req.params.id);
  var newProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json(newProduct);
};

module.exports.patchIndex = async function (req, res) {
  var newProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json(newProduct);
};

module.exports.deleteIndex = async function (req, res) {
  await Product.findByIdAndDelete(req.params.id);
  var products = await Product.find();
  res.json(products);
};

module.exports.postCreate = async function (res, req) {
  var data = {
    name: 'iPhone 11',
    price: '5.00$',
    description: 'lorem',
    image: 'https://loremflickr.com/240/240',
  };
  var newProduct = await Product.create(data);
  res.json(newProduct);
};
