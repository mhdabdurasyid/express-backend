const { Router } = require('express')
const { getConditions, addCondition, updateCondition, deleteCondition } = require('../controller/conditions')

const router = Router()

router.get('/', getConditions)
// router.get('/:id', getDetailCondition)
router.post('/', addCondition)
// router.put('/:id', updateCondition)
// router.delete('/:id', deleteCondition)

module.exports = router
