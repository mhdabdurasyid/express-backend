const { Router } = require('express')
const { addShippingAddress, getDetailShippingAddress, updateShippingAddress, deleteShippingAddress, getShippingAddressByID } = require('../controller/shippingAddress')

const router = Router()

router.post('/', addShippingAddress)
router.get('/', getDetailShippingAddress)
router.put('/:id', updateShippingAddress)
router.delete('/:id', deleteShippingAddress)
router.get('/:shippingAddressID', getShippingAddressByID)

module.exports = router
