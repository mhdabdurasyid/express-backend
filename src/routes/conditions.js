const { Router } = require('express')
const { addCondition, updateCondition, deleteCondition } = require('../controller/conditions')

const router = Router()

router.post('/', addCondition)
router.put('/:id', updateCondition)
router.delete('/:id', deleteCondition)

module.exports = router
