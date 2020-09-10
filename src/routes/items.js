const { Router } = require('express')
const { getDetailItem, getItems, addItem, updateItem, updatePartiallyItem, deleteItem } = require('../controller/items')

const router = Router()

router.get('/', getItems)
router.get('/:id', getDetailItem)
router.post('/', addItem)
router.put('/:id', updateItem)
router.patch('/:id', updatePartiallyItem)
router.delete('/:id', deleteItem)

module.exports = router
