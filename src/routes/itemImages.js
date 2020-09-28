const { Router } = require('express')
const { addItemImage } = require('../controller/itemImages')

const router = Router()

// router.get('/:id', getDetailCategory)
router.post('/', addItemImage)
// router.put('/:id', updateCategory)
// router.delete('/:id', deleteCategory)

module.exports = router
