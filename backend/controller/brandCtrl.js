const Brand = require('../models/brandModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbid')
const validateMongodbId = require('../utils/validateMongodbid')

//create Brand
const createBrand = asyncHandler(async(req,res)=>{
    try {
        const newBrand = await Brand.create(req.body)
        res.json(newBrand)
    } catch (error) {
        throw new Error(error)
    }
})

//update Brand
const updateBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongodbId(id)
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.json(updatedBrand)
    } catch (error) {
        throw new Error(error)
    }
})

//delete Brand
const deleteBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id)
        res.json(deletedBrand)
    } catch (error) {
        throw new Error(error)
    }
})

//get a Brand
const getABrand = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const getBrand = await Brand.findById(id)
        res.json(getBrand)
    } catch (error) {
        throw new Error(error)
    }
})

//get all Brand
const getAllBrand = asyncHandler(async(req,res)=>{
    try {
        const getallBrand = await Brand.find()
        res.json(getallBrand)
    } catch (error) {
        throw new Error(error)
    }
})
module.exports={createBrand,updateBrand,deleteBrand,getABrand,getAllBrand}