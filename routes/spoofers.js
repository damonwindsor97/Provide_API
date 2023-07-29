const express = require('express')
const router = express.Router()

const spoofersController = require('../controllers/spoofers')


router.post('/', spoofersController.postSpoofer)



module.exports = router