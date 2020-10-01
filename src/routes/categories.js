const { Router } = require('express')
const { getDetailCategory, addCategory, updateCategory, deleteCategory } = require('../controller/categories')

const router = Router()

router.get('/:id', getDetailCategory)
router.post('/', addCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
