const { Router } = require('express')
const { updateSeller, updateSellerPartial, deleteSeller, getItemSeller, getDetailSeller } = require('../controller/sellers')

const router = Router()

// router.get('/', getSellers)
router.get('/item/', getItemSeller)
router.get('/', getDetailSeller)
router.put('/', updateSeller)
router.patch('/', updateSellerPartial)
router.delete('/:id', deleteSeller)

module.exports = router
