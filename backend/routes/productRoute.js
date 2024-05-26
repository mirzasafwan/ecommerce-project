const express = require('express')
const { createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct, addToWhisList, rating, uploadImages, deleteImage } = require('../controller/productCtrl')
const { isAdmin, authMiddleware } = require('../middleware/authMiddleware')
const {  productImgResize, uploadPhoto } = require('../middleware/uploadImages')
const router = express.Router()

router.post('/',authMiddleware,isAdmin,createProduct)
router.put('/upload/',authMiddleware,isAdmin,uploadPhoto.array("images",10),productImgResize,uploadImages)
router.get('/:id',authMiddleware,getaProduct)
router.put('/wishlist',authMiddleware,addToWhisList)
router.put('/rating',authMiddleware,rating)
router.put('/:id',authMiddleware,isAdmin,updateProduct)
router.delete('/:id',authMiddleware,isAdmin,deleteProduct)
router.delete('/delete-image/:id',authMiddleware,isAdmin,deleteImage)
router.get('/',getAllProducts)

module.exports=router