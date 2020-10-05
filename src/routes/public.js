const { Router } = require('express')
const { getDetailItem, getItems } = require('../controller/items')
const { addCostumer } = require('../controller/costumers')
const { addSeller } = require('../controller/sellers')
const { getCategories, getDetailCategory } = require('../controller/categories')
const { getColors } = require('../controller/colors')
const { getConditions } = require('../controller/conditions')
const { getProvinces } = require('../controller/provinces')
const { getCities } = require('../controller/cities')

const router = Router()

router.get('/item/', getItems)
router.get('/item/:id', getDetailItem)
router.post('/costumer/', addCostumer)
router.post('/seller/', addSeller)
router.get('/category', getCategories)
router.get('/category/:id', getDetailCategory)
router.get('/color', getColors)
router.get('/condition', getConditions)
router.get('/province', getProvinces)
router.get('/city', getCities)

module.exports = router
