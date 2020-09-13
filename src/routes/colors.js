const { Router } = require('express')
const { getDetailColor, getColors, addColor, updateColor, deleteColor } = require('../controller/colors')

const router = Router()

router.get('/', getColors)
// router.get('/:id', getDetailColor)
router.post('/', addColor)
router.put('/:id', updateColor)
router.delete('/:id', deleteColor)

module.exports = router
