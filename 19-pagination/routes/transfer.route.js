var express = require('express');
var router = express.Router();

var controller = require('./../controller/transfer.controller.js');

router.get('/create', controller.create);

router.post('/create', controller.createPost);

module.exports = router;
