const { Router } = require('express')
const { postOrder, postOrderDetail, getOrder } = require('../controller/orders')

const router = Router()

router.get('/', getOrder)
router.post('/', postOrder)
router.post('/detail', postOrderDetail)

module.exports = router
