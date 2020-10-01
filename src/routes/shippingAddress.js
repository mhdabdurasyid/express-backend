const { Router } = require('express')
const { addShippingAddress, getDetailShippingAddress, updateShippingAddress, deleteShippingAddress } = require('../controller/shippingAddress')

const router = Router()

router.post('/', addShippingAddress)
router.get('/', getDetailShippingAddress)
router.put('/:id', updateShippingAddress)
router.delete('/:id', deleteShippingAddress)

module.exports = router
