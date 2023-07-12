const express = require('express');
const router = express.Router();

//  (only 1 item from Features array showing)

const productsController = require('../controllers/products');

// POST to Products - working
router.post('/', productsController.postProduct);

// GET all Products - working
router.get('/', productsController.getAllProducts);

// GET Product by ID - working
router.get('/:id', productsController.getProductById);

// PUT Product by ID - working
router.put('/:id', productsController.putProductById);

// DELETE Product by ID - working
router.delete('/:id', productsController.deleteProductById);

module.exports = router;