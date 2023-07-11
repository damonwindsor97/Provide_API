const {Product, validateProduct} = require('../models/product')
const {Provider} = require('../models/provider')

module.exports = {
    // POST to Products
    async postProduct(req, res) {
        const { error } = validateProduct(req.body)
        if (error) return res.status(400).send(error.details)

        const provider = await Provider.findById(req.body.providerId)
        if(!provider) return res.status(404).send("Invalid Provider ID")

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
                    
                providerId: {
                    _id: provider._Id,
                    name: provider.name,
                    developer: provider.developer,
                    products: provider.products,
                    paymentMethods: provider.paymentMethods,
                    isTrusted: provider.isTrusted
                }
            })
            product = await product.save()
            res.send(product);
        } catch (error) {
            console.log(error)
        }
    },



}