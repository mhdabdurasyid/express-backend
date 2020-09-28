const { Router } = require('express')
const { getSellers, updateSeller, updateSellerPartial, deleteSeller, getDetailSeller } = require('../controller/sellers')

const router = Router()

router.get('/', getSellers)
router.get('/:id', getDetailSeller)
router.put('/:id', updateSeller)
router.patch('/:id', updateSellerPartial)
router.delete('/:id', deleteSeller)

module.exports = router
