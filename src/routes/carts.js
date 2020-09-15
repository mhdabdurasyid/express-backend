const { Router } = require('express')
const { addCart, updateCartPartial, deleteCart, getDetailCart } = require('../controller/Carts')

const router = Router()

router.get('/:costumerID', getDetailCart)
router.post('/', addCart)
router.patch('/:costumerID/:itemID', updateCartPartial)
router.delete('/:costumerID/:itemID', deleteCart)

module.exports = router
