const { Router } = require('express')
const { addCostumer, updateCostumerPartial, deleteCostumer, getDetailCostumer } = require('../controller/costumers')

const router = Router()

router.get('/:id', getDetailCostumer)
router.post('/', addCostumer)
router.patch('/:id', updateCostumerPartial)
// router.delete('/:id', deleteCostumer)

module.exports = router
