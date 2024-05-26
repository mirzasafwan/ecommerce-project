const User = require("../models/userModel")
const Product = require("../models/productModel")
const Cart = require("../models/cartModel")
const Coupon = require("../models/couponModel")
const Order = require("../models/orderModel")
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken')
const validateMongodbId = require("../utils/validateMongodbid")
const { generateRefreshToken } = require("../config/refreshToken")
const jwt = require('jsonwebtoken')
const { sendEmail } = require("./emailCtrl")
const crypto = require('crypto')
const uniqid = require("uniqid")

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });

  if (!findUser) {
      try {
          const newUser = await User.create(req.body);
          res.status(201).json(newUser); // Send a 201 status code for created resource
      } catch (error) {
          res.status(500).json({ message: 'Error creating user' });
      }
  } else {
      res.status(400).json({ message: 'User Already Exists!' });
  }
});


// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if user exists or not
      const findUser = await User.findOne({ email });
      if (findUser && (await findUser.isPasswordMatched(password))) {
          const refreshToken = await generateRefreshToken(findUser._id);
          const updateuser = await User.findByIdAndUpdate(
              findUser.id,
              { refreshToken },
              { new: true }
          );
          res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              maxAge: 72 * 60 * 60 * 1000,
          });
          res.json({
              _id: findUser._id,
              firstname: findUser.firstname,
              lastname: findUser.lastname,
              email: findUser.email,
              mobile: findUser.mobile,
              token: generateToken(findUser._id),
          });
      } else {
          res.status(401).json({ message: 'Invalid Credentials' });
      }
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


//login Admin
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if(findAdmin.role !== "admin") throw new Error("Not Authorized !")
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });

//get user

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }

})
//update user
const updateaUser = asyncHandler(async (req, res) => {
    console.log(req.user)
    const { _id } = req.user;
    validateMongodbId(_id)
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body.firstname,
            lastname: req?.body.lastname,
            mobile: req?.body.mobile,
            email: req?.body.email,
        }, {
            new: true,
        })
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
})

//save address
const saveAddress = asyncHandler(async (req, res) => {
    console.log(req.user)
    const { _id } = req.user;
    validateMongodbId(_id)
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            address: req?.body.address,
        }, {
            new: true,
        })
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
})

//get a single user

const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)

    // console.log(id)
    try {
        const getaUser = await User.findById(id)
        res.json({
            getaUser
        })
    } catch (error) {
        throw new Error(error)
    }
})

//delete a User

const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)

    // console.log(id)
    try {
        const deleteaUser = await User.findByIdAndDelete(id)
        res.json({
            deleteaUser
        })
    } catch (error) {
        throw new Error(error)
    }
})


//block user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const blockUser = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        }, {
            new: true,
        })
        res.json({
            message: "User is Blocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const unblockUser = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        }, {
            new: true,
        })
        res.json({
            message: "User is UnBlocked"
        })
    } catch (error) {
        throw new Error(error)
    }
})


/// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    // console.log(cookies);
    if (!cookies?.refreshToken) throw new Error('No Refresh Token In Cookies')
    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({ refreshToken })
    if (!user) throw new Error('No Refresh Token Present in db or Not Matched')
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if(err ||user.id !== decoded.id){
        throw new Error('There is something wrong with refresh token !')
    }
    const accessToken = generateRefreshToken(user?._id)
    res.json({accessToken})
    })
})

//logout

const logout = asyncHandler(async(req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.refreshToken) throw new Error('No Refresh Token In Cookies')
    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({ refreshToken })
    if(!user){
        res.clearCookie('refreshToken',{
            httpOnly:true,
            secure:true,
        })
        return res.sendStatus(204)   //forbidden
    }
    await User.findOneAndUpdate(refreshToken,{
        refreshToken:""
    })
    res.clearCookie('refreshToken',{
        httpOnly:true,
        secure:true,
    })
    res.sendStatus(204) //forbidden
})

///update password
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    const user = await User.findById(_id);
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  });


//save address

  //forgot password token
  const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click Here</>`;
      const data = {
        to: email,
        text: "Hey User",
        subject: "Forgot Password Link",
        html: resetURL,
      };
      sendEmail(data);
      res.json(token);
    } catch (error) {
      throw new Error(error);
    }
  });

  //reset password 

  const resetPassword = asyncHandler(async(req,res)=>{
    const {password} = req.body;
    const {token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
        passwordResetToken : hashedToken ,
        passwordResetExpires:{ $gt: Date.now()},
    })
    if(!user) throw new Error('Token Expired,Please Try Again Later')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.json(user)
  })


  //get wishlist
const getWishList = asyncHandler(async(req,res)=>{
    const { id } = req.user;
    try {
        const findUser = await User.findById(id).populate("wishlist")
        res.json(findUser)
    } catch (error) {
        throw new Error(error)
    }
})


//user cart
const userCart = asyncHandler(async (req, res) => {
  const { productId, price, quantity, color } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
      let newCartItem = await Cart.create({
          userId: _id,
          productId,
          color,
          quantity,
          price
      });
      res.json(newCartItem);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

  

//get a user cart
const getUserCart = asyncHandler(async(req,res)=>{
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const cart = await Cart.find({ userId:_id }).populate("productId").populate('color')
        res.json(cart)
    } catch (error) {
        throw new Error(error)
    }
})

//remove from cart
const removeProductFromCart = asyncHandler(async(req,res)=>{
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongodbId(_id);
  try {
      const deleteProductFromCart = await Cart.deleteOne({userId:_id,_id:cartItemId})
      res.json(deleteProductFromCart)
  } catch (error) {
      throw new Error(error)
  }
})
//update quantity from cart
const updateProductQuantityFromCart = asyncHandler(async(req,res)=>{
  const { _id } = req.user;
  console.log(_id)
  const { cartItemId,newQuantity } = req.params;
  validateMongodbId(_id);
  try {
      const cartItem = await Cart.findOne({ userId: _id, _id :cartItemId})
      cartItem.quantity = newQuantity;
      cartItem.save()
      res.json(cartItem)
  } catch (error) {
      throw new Error(error)
  }
})

//create order
const createOrderProduct = asyncHandler(async (req, res) => {
  const { shippingInfo, orderItems, paymentInfo, totalPrice, totalAfterDiscount } = req.body;
  const { _id } = req.user;

  try {
    // Create the order
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      totalPrice,
      totalAfterDiscount,
      user: _id
    });

    // Send a success response
    res.status(201).json({ success: true, order });
  } catch (error) {
    // Log the error
    console.error('Error creating order:', error);

    // Send an error response
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
});

//empty cart
const emptyCart = asyncHandler(async(req,res)=>{
    const { _id } = req.user;
    console.log('User ID:', _id); // Add this line
    validateMongodbId(_id);

    try {
        const emptyCart = await Cart.deleteMany({userId:_id})
        res.json(emptyCart)
    } catch (error) {
        throw new Error(error)
    }
})

//apply coupon
const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      throw new Error("Invalid Coupon");
    }
    const user = await User.findOne({ _id });
    let { cartTotal } = await Cart.findOne({
      orderby: user._id,
    }).populate("products.product");
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { orderby: user._id },
      { totalAfterDiscount },
      { new: true }
    );
    res.json(totalAfterDiscount);
});


//create order
const createOrder = asyncHandler (async(req,res)=>{
  const { COD,appliedCoupon } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);

  try {
    if(!COD) throw new Error("Create cash order failed")
    const user = await User.findById(_id)
    let userCart = await Cart.findOne({ orderby:user._id });
    let finalAmount = 0;
    if(appliedCoupon && userCart.totalAfterDiscount){
      finalAmount = userCart.totalAfterDiscount;
    }else{
      finalAmount = userCart.cartTotal;
    }
    let newOrder = await new Order({
      products : userCart.products,
      paymentIntent:{
        id:uniqid(),
        method:"COD",
        amount:finalAmount,
        status:"Cash On Delivery",
        created:Date.now(),
        currency:"usd"
      },
      orderby:user._id,
      orderStatus:"Cash On Delivery"
    }).save();
    let update = userCart.products.map((item)=>{
      return{
        updateOne:{
          filter : { _id:item.product._id},
          update : { $inc : { quantity : -item.count, solid: +item.count } }
        }
      }
    })
    const updated = await Product.bulkWrite(update, {})
    res.json({message:"success"})
  } catch (error) {
    throw new Error(error)
  }
})


const getMyOrders = asyncHandler(async(req,res)=>{
  const { _id } = req.user;
  try {
    const orders = await Order.find({user:_id}).populate("user").populate("orderItems.product").populate("orderItems.color")
    res.json({
      orders
    })
  } catch (error) {
    throw new Error(error)
  }
})
//get order


//update order status
const updateOrderStatus = asyncHandler(async(req,res)=>{
  const { status } = req.body;
  const{ id } = req.params;
  validateMongodbId(id)
  
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus:status,
        paymentIntent:{
          status:status
        }
      },
      {
        new:true
      }
    )
    res.json(updateOrderStatus)
  } catch (error) {
    throw new Error(error)
  }
})
module.exports = { createUser, loginUserCtrl, getAllUsers, getaUser, deleteaUser, updateaUser, logout,blockUser, unblockUser, handleRefreshToken,updatePassword,forgotPasswordToken,resetPassword,loginAdmin,getWishList,saveAddress,userCart,getUserCart,emptyCart,applyCoupon,createOrder,updateOrderStatus,removeProductFromCart,updateProductQuantityFromCart,createOrderProduct,getMyOrders}