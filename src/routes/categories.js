const { Router } = require('express')
const { getDetailCategory, getCategories, addCategory, updateCategory, deleteCategory } = require('../controller/categories')
const upload = require('../helpers/upload')

const router = Router()

router.get('/', getCategories)
router.get('/:id', getDetailCategory)
router.post('/', addCategory)
router.put('/:id', upload.single('image'), updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
