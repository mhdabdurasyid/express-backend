const { Router } = require('express')
const { addItemImage, getItemImage } = require('../controller/itemImages')

const router = Router()

router.get('/:id', getItemImage)
router.post('/', addItemImage)
// router.put('/:id', updateCategory)
// router.delete('/:id', deleteCategory)

module.exports = router
