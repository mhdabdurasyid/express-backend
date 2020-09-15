const { Router } = require('express')
const { addCart, updateCartPartial, deleteCart, getDetailCart } = require('../controller/Carts')

const router = Router()

// router.get('/:id', getDetailCart)
router.post('/', addCart)
// router.patch('/:id', updateCartPartial)
// router.delete('/:id', deleteCart)

module.exports = router
