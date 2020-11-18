const { Router } = require('express')
const { postOrder, postOrderDetail } = require('../controller/orders')

const router = Router()

router.post('/', postOrder)
router.post('/detail', postOrderDetail)

module.exports = router
