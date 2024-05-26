const express = require('express')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, liketheBlog, disliketheBlog, uploadImages } = require('../controller/blogCtrl')
const { uploadPhoto,  blogImgResize } = require('../middleware/uploadImages')
const router = express.Router()

router.post('/',authMiddleware,isAdmin,createBlog)
router.put('/upload/:id',authMiddleware,isAdmin,uploadPhoto.array("images",2),blogImgResize,uploadImages)
router.put('/likes',authMiddleware,liketheBlog)
router.put('/dislikes',authMiddleware,disliketheBlog)
router.put('/:id',authMiddleware,isAdmin,updateBlog)
router.delete('/:id',authMiddleware,isAdmin,deleteBlog)
router.get('/:id',getBlog)
router.get('/',getAllBlog)

module.exports=router