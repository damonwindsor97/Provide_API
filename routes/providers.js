const express = require('express')
const router = express.Router()

// Import Controller
const providersController = require('../controllers/provider')

// Initial Provider endpoint
//  GET all Providers
router.get('/', providersController.getAllProviders);

// GET Provider by ID
router.get('/:id', providersController.getProviderById)


// POST to Endpoint
router.post('/', providersController.postProvider)

// PUT Endpoint
router.put('/:id', providersController.putProviderById)


// DELETE Endpoint
router.delete('/:id', providersController.deleteProviderById);


module.exports = router