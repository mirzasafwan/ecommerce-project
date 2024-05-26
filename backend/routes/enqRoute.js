const express = require('express')

const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')
const { createEnquiry, updateEnquiry, deleteEnquiry, getAEnquiry, getAllEnquiry } = require('../controller/enqCtrl')

const router = express.Router()

router.post('/',createEnquiry)
router.put('/:id',authMiddleware,isAdmin,updateEnquiry)
router.delete('/:id',authMiddleware,isAdmin,deleteEnquiry)
router.get('/:id',getAEnquiry)
router.get('/',getAllEnquiry)

module.exports=router