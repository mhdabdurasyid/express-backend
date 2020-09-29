const { Router } = require('express')
const { getSellers, updateSeller, updateSellerPartial, deleteSeller, getItemSeller } = require('../controller/sellers')

const router = Router()

router.get('/', getSellers)
router.get('/item/:id', getItemSeller)
router.put('/:id', updateSeller)
router.patch('/:id', updateSellerPartial)
router.delete('/:id', deleteSeller)

module.exports = router
