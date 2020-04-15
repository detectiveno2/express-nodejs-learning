var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/avatar/' });

var authMiddleware = require('./../middleware/auth/auth.middleware.js');
var controller = require('./../controller/users.controller.js');
var validation = require('./../middleware/validation/users.validation.js');

router.get('', authMiddleware.requireAuth, controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post(
  '/create',
  upload.single('avatar'),
  validation.postCreate,
  controller.postCreate
);

router.get('/:id', controller.view);

module.exports = router;
