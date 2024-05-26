const express = require('express')
const { createCategory, updateCategory, deleteCategory, getACategory, getAllCategory } = require('../controller/productCategoryCtrl')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/',authMiddleware,isAdmin,createCategory)
router.put('/:id',authMiddleware,isAdmin,updateCategory)
router.delete('/:id',authMiddleware,isAdmin,deleteCategory)
router.get('/:id',getACategory)
router.get('/',getAllCategory)

module.exports=router