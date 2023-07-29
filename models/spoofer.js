const mongoose = require('mongoose');
const Joi = require('joi');

const spooferSchema = new mongoose.Schema({
    name: {type: String, required: true},
    developer: {type: String, required: true},
    supportedACs: {type: [String], required: true},
    supportedWindows: {type: [String], required: true},
    detectionHistory: {type: [String], required: true},
    paymentMethods: {type: [String], required: true},
    publishDate: {type: Date, default: Date.now}
})

const Spoofer = mongoose.model("Spoofer", spooferSchema);


function validateSpoofer(spoofer) {
    const schema = Joi.object({
        name: Joi.string().required(),
        developer: Joi.string().required(),
        supportedACs: Joi.array().required(),
        supportedWindows: Joi.array().required(),
        detectionHistory: Joi.array().required(),
        paymentMethods: Joi.array().required(),
    })
    return schema.validate(spoofer)
}

module.exports.Spoofer = Spoofer;
module.exports.validateSpoofer = validateSpoofer;
module.exports.spooferSchema = spooferSchema;