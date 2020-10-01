const { Router } = require('express')
const { addCategory, updateCategory, deleteCategory } = require('../controller/categories')

const router = Router()

router.post('/', addCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
