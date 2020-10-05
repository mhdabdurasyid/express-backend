const { Router } = require('express')
const { addColor, updateColor, deleteColor } = require('../controller/colors')

const router = Router()

router.post('/', addColor)
router.put('/:id', updateColor)
router.delete('/:id', deleteColor)

module.exports = router
