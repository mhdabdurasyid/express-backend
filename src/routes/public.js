const { Router } = require('express')
const { getDetailItem, getItems } = require('../controller/items')
const { addCostumer } = require('../controller/costumers')

const router = Router()

router.get('/item/', getItems)
router.get('/item/:id', getDetailItem)
router.post('/costumer/', addCostumer)

module.exports = router
