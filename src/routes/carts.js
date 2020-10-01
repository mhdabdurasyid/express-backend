const { Router } = require('express')
const { addCart, updateCartPartial, deleteCart, getDetailCart } = require('../controller/Carts')

const router = Router()

router.get('/', getDetailCart)
router.post('/', addCart)
router.patch('/:itemID', updateCartPartial)
router.delete('/:itemID', deleteCart)

module.exports = router
