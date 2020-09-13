const { Router } = require('express')
const { getSellers, addSeller, updateSeller, deleteSeller } = require('../controller/sellers')

const router = Router()

router.get('/', getSellers)
// router.get('/:id', getDetailSeller)
router.post('/', addSeller)
// router.put('/:id', updateSeller)
// router.delete('/:id', deleteSeller)

module.exports = router
