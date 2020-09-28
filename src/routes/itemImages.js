const { Router } = require('express')
const { addItemImage, getItemImage, updateItemImage } = require('../controller/itemImages')

const router = Router()

router.get('/:id', getItemImage)
router.post('/', addItemImage)
router.put('/:id', updateItemImage)
// router.delete('/:id', deleteCategory)

module.exports = router
