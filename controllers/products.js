const {Product, validateProduct} = require('../models/product')


module.exports = {
    // POST to Products
    async postProduct(req, res) {
        const { error } = validateProduct(req.body)
        if (error) return res.status(400).send(error.details)


        try {

            let product = new Product({
                productName: req.body.productName,
                developer: req.body.developer,
                verification: req.body.verification,
                features: req.body.features,
                detectionHistory: req.body.detectionHistory,
                isDetected: req.body.isDetected,
                isUpdating: req.body.isUpdating,
                isUpdated: req.body.isUpdated,
            })
            product = await product.save()
            res.send(product);
        } catch (error) {
            console.log(error)
        }
    },



}