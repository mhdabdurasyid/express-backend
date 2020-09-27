const { Router } = require('express')
const { sellerLoginController } = require('../controller/auth')

const router = Router()

router.post('/seller/login', sellerLoginController)

module.exports = router
