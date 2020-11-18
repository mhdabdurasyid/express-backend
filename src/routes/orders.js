const { Router } = require('express')
const { postOrder, postOrderDetail, getOrder, getOrderDetail } = require('../controller/orders')

const router = Router()

router.get('/', getOrder)
router.post('/', postOrder)
router.post('/detail', postOrderDetail)
router.get('/detail/:id', getOrderDetail)

module.exports = router
