const { Router } = require('express')
const { postOrder, postOrderDetail, getDetailCart } = require('../controller/orders')

const router = Router()

router.get('/', getDetailCart)
router.post('/', postOrder)
router.post('/detail', postOrderDetail)

module.exports = router
