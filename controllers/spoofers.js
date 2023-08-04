const {Spoofer, validateSpoofer} = require('../models/spoofer')

module.exports = {
    // POST to Spoofers
    async postSpoofer(req, res) {
        const { error } = validateSpoofer(req.body)
        if (error) return res.status(400).send(error.details)
        try {
            let spoofer = new Spoofer({
                name: req.body.name,
                developer: req.body.developer,
                supportedACs: req.body.supportedACs,
                supportedWindows: req.body.supportedWindows,
                detectionHistory: req.body.detectionHistory,
                paymentMethods: req.body.paymentMethods
            })
            spoofer = await spoofer.save()
            res.send(spoofer);
        } catch (error) {
            console.log(error)
        }
    },






}