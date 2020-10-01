const { Router } = require('express')
const { getDetailItem, getItems } = require('../controller/items')
const { addCostumer } = require('../controller/costumers')
const { addSeller } = require('../controller/sellers')
const { getCategories, getDetailCategory } = require('../controller/categories')

const router = Router()

router.get('/item/', getItems)
router.get('/item/:id', getDetailItem)
router.post('/costumer/', addCostumer)
router.post('/seller/', addSeller)
router.get('/category', getCategories)
router.get('/category/:id', getDetailCategory)

module.exports = router
