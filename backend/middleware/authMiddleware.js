const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req?.headers?.authorization.split(" ")[1];
        try {
            if(token){
                const decode = jwt.verify(token,process.env.JWT_SECRET)
                console.log(decode)
                const user = await User.findById(decode?.id)
                req.user = user,
                next();
            }
        } catch (error) {
            throw new Error('Not Authorized Token Has Expired,Pls Login Again')
        }
    }else{
        throw new Error('There is no token attached to header')
    }
})

//isAdmin

const isAdmin = asyncHandler(async(req,res,next)=>{
    // console.log(req.user)
    const {email} = req.user;
    const adminUser = await User.findOne({email})
    if(adminUser.role!=="admin"){
        throw new Error('You Are not Admin Get Lost !')
    }else{
        next();
    }
})

module.exports = {authMiddleware,isAdmin}