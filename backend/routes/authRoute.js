const express = require('express');
const { createUser, loginUserCtrl, getAllUsers, getaUser, deleteaUser, updateaUser, unblockUser, blockUser, handleRefreshToken, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, logout, saveAddress, userCart, getUserCart,  emptyCart, applyCoupon, createOrder, getOrder, updateOrderStatus, removeProductFromCart, updateProductQuantityFromCart, createOrderProduct, getMyOrders } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { checkout, paymentVerification } = require('../controller/paymentCtrl');
const router = express.Router()

router.post('/register',createUser)
router.post('/forgot-password-token',forgotPasswordToken)
router.put('/reset-password/:token',resetPassword)
router.put('/order/uodate-password/:id',authMiddleware,isAdmin,updateOrderStatus)
router.post('/login',loginUserCtrl)
router.post('/login-admin',loginAdmin)
router.post('/cart',authMiddleware,userCart)
router.post('/order/checkout',authMiddleware,checkout)
router.post('/order/paymentVerification',authMiddleware,paymentVerification)
router.post('/cart/applyCoupon',authMiddleware,applyCoupon)
router.post('/cart/cash-order',authMiddleware,createOrder)
router.post('/cart/create-order',authMiddleware,createOrderProduct)
router.put('/password',authMiddleware,updatePassword)
router.get('/logout',logout)
router.get('/all-users',getAllUsers)
router.get('/getmyorders',authMiddleware,getMyOrders)
router.get('/wishlist',authMiddleware,getWishList)
router.get('/cart',authMiddleware,getUserCart)

router.get('/refresh',handleRefreshToken)
router.get('/:id',authMiddleware,isAdmin,getaUser)
router.delete('/:id',deleteaUser)
router.delete('/delete-product-cart/:cartItemId',authMiddleware,removeProductFromCart)
router.delete('/empty-cart',authMiddleware,emptyCart)
router.put('/update-product-cart/:cartItemId/:newQuantity',authMiddleware,updateProductQuantityFromCart)
router.put('/edit-user',authMiddleware,updateaUser)
router.put('/save-address',authMiddleware,saveAddress)
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser)
router.put('/unblock-user/:id',authMiddleware,isAdmin,unblockUser)
module.exports = router;