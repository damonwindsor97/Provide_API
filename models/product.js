const mongoose = require('mongoose');
const Joi = require('joi')

const { providerSchema } = require('./provider')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },

    // TO BE ADDED - Relationship with Developer Database
    developer: {
        type: String,
        required: true,
        trim: true
    },

    verification: {
        type: String,
        required: true
    },
    features: {
        type: String
    },
    detectionHistory: {
        type: [String]
    },
    isDetected: {
        type: Boolean,
        required: true
    },
    isUpdating: {
        type: Boolean,
        required: true
    },
    isUpdated: {
        type: Boolean,
        required: true
    },
    // Relationship with Provider Database - switch relationship to Provider DB
    providerId: {
        type: providerSchema,
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        productName: Joi.string().min(2).max(255).required(),
        developer: Joi.string().required(),
        verification: Joi.string().required(),
        features: Joi.string(),
        detectionHistory: Joi.array(),
        isDetected: Joi.boolean().required(),
        isUpdating: Joi.boolean().required(),
        isUpdated: Joi.boolean().required(),
        providerId: Joi.required(),
    })
    return schema.validate(product)
}

module.exports.Product = Product;
module.exports.validateProduct = validateProduct;
module.exports.productSchema = productSchema;