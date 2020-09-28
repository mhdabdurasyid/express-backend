const { Router } = require('express')
const { updateCostumerPartial, deleteCostumer, getDetailCostumer } = require('../controller/costumers')

const router = Router()

router.get('/:id', getDetailCostumer)
router.patch('/:id', updateCostumerPartial)
router.delete('/:id', deleteCostumer)

module.exports = router
