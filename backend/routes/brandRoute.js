const express = require('express')

const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')
const { createBrand, updateBrand, deleteBrand, getABrand, getAllBrand } = require('../controller/brandCtrl')
const router = express.Router()

router.post('/',authMiddleware,isAdmin,createBrand)
router.put('/:id',authMiddleware,isAdmin,updateBrand)
router.delete('/:id',authMiddleware,isAdmin,deleteBrand)
router.get('/:id',getABrand)
router.get('/',getAllBrand)

module.exports=router