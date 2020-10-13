const { Router } = require('express')
const { addShippingAddress, getDetailShippingAddress, updateShippingAddress, deleteShippingAddress, getShippingAddressByID, getPrimaryAddress } = require('../controller/shippingAddress')

const router = Router()

router.post('/', addShippingAddress)
router.get('/', getDetailShippingAddress)
router.get('/primary', getPrimaryAddress)
router.put('/:id', updateShippingAddress)
router.delete('/:id', deleteShippingAddress)
router.get('/:shippingAddressID', getShippingAddressByID)

module.exports = router
