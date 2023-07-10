const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

// Define our Schema for a Provider
const providerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    developer: {type: [String], required: true},
    products: {type: [String], required: true},
    paymentMethods: {type: [String], required: true},
    isTrusted: {type: Boolean, required: true}
})

// Create Model, name of the collection, then using the Schema
// Model will allow us to talk to the DB
const Provider = mongoose.model('Provider', providerSchema);


// Initial Provider endpoint
//  GET all Providers
router.get('/', async (req, res) => {
    const providers = await Provider.find().sort('name')
    res.send(providers)
});

// GET Provider by ID
router.get('/:id', async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id)
        if(!provider) return res.status(404).send('The Provider with the given ID was not found.')
        res.send(provider);
    } catch (error) {
        console.log(error)
    }
})


// POST to Endpoint
router.post('/', async (req, res) => {
    // Validation
    const { error } = validateProvider(req.body)
    // If result contains error, send 400 with error message
    if (error) return res.status(400).send(error.details)
      
    try {
        let provider = new Provider({
            name: req.body.name,
            developer: req.body.developer,
            products: req.body.products,
            paymentMethods: req.body.paymentMethods,
            isTrusted: req.body.isTrusted
        });
        provider = await provider.save();
        res.send(provider);
    } catch (error) {
        console.log(error)
    }
})

// PUT Endpoint
router.put('/:id', async (req, res) => {
    // Validation
    const { error } = validateProvider(req.body)
    // If result contains error, send 400 with error message
    if (error) return res.status(400).send(error.details)
      
    try {
        let provider = await Provider.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        if(!provider) return res.status(404).send('The Provider with the given ID was not found.')
        res.send(provider);
    } catch (error) {
        console.log(error)
    }
})


// DELETE Endpoint
router.delete('/:id', async (req, res) => {
    try {
        const provider = await Provider.findByIdAndRemove(req.params.id)
        if (!provider) res.status(404).send('The Provider with the given ID was not found')
        res.send(provider);
    } catch (error) {
        console.log(error)
    }
});

function validateProvider(provider) {
    // Schema = what the data coming in SHOULD look like
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        developer: Joi.array().min(1).required(),
        products: Joi.array().min(1).required(),
        paymentMethods: Joi.array().min(1).required(),
        isTrusted: Joi.boolean().required()
    })
    // use schema to validate the data user is sending
    return schema.validate(provider)
}

module.exports = router