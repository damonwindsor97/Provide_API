const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.post('/', productsController.postProduct);

module.exports = router;