const { Router } = require('express')
const { getDetailItem, getItems } = require('../controller/items')

const router = Router()

router.get('/item/', getItems)
router.get('/item/:id', getDetailItem)

module.exports = router
