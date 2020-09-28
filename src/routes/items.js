const { Router } = require('express')
const { addItem, updateItem, updatePartiallyItem, deleteItem } = require('../controller/items')

const router = Router()

router.post('/', addItem)
router.put('/:id', updateItem)
router.patch('/:id', updatePartiallyItem)
router.delete('/:id', deleteItem)

module.exports = router
