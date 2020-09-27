const { Router } = require('express')
const { sellerLoginController, customerLoginController } = require('../controller/auth')

const router = Router()

router.post('/seller/login', sellerLoginController)
router.post('/customer/login', customerLoginController)

module.exports = router
