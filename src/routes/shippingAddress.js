const { Router } = require('express')
const { addShippingAddress } = require('../controller/shippingAddress')

const router = Router()

router.post('/', addShippingAddress)
// router.get('/:id', getDetailShippingAddress)
// router.put('/:id', updateShippingAddress)
// router.delete('/:id', deleteShippingAddress)

module.exports = router
