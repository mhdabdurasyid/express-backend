const { Router } = require('express')
const { updateCostumerPartial, deleteCostumer, getDetailCostumer } = require('../controller/costumers')

const router = Router()

router.get('/', getDetailCostumer)
router.patch('/', updateCostumerPartial)
router.delete('/:id', deleteCostumer)

module.exports = router
