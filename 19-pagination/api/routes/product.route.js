var express = require('express');
var router = express.Router();

var controller = require('./../controller/product.controller');

router.get('/', controller.index);
router.post('/', controller.postIndex);
router.put('/:id', controller.putIndex);
router.patch('/:id', controller.patchIndex);
router.delete('/:id', controller.deleteIndex);

router.post('/create', controller.postCreate);

module.exports = router;
