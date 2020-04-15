var express = require('express');
var router = express.Router();

var controller = require('./../controller/products.controller.js');
var productsMiddleware = require('./../middleware/products/products.middleware.js');

router.get('/', productsMiddleware.requirePage, controller.index);

module.exports = router;
