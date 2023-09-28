const express = require('express');
const router = express.Router();
const cors = require('cors')

var whitelist = ['http://localhost:3000/', 'https://www.provideapi.dev/']
var corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new error('Not allowed by CORS'))
        }
    }
}

//  (only 1 item from Features array showing)

const productsController = require('../controllers/products');

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// POST to Products - working
router.post('/', [auth, admin], productsController.postProduct);

// GET all Products - working
router.get('/', cors(corsOptions), productsController.getAllProducts);

// GET Product by ID - working
router.get('/:id', productsController.getProductById);

// PUT Product by ID - working
router.put('/:id', [auth], productsController.putProductById);

// DELETE Product by ID - working
router.delete('/:id', [auth], productsController.deleteProductById);

module.exports = router;