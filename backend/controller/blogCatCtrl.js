const Category = require('../models/blogCatModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbid')
const validateMongodbId = require('../utils/validateMongodbid')

//create category
const createCategory = asyncHandler(async(req,res)=>{
    try {
        const newCategory = await Category.create(req.body)
        res.json(newCategory)
    } catch (error) {
        throw new Error(error)
    }
})

//update category
const updateCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongodbId(id)
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.json(updatedCategory)
    } catch (error) {
        throw new Error(error)
    }
})

//delete category
const deleteCategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const deletedCategory = await Category.findByIdAndDelete(id)
        res.json(deletedCategory)
    } catch (error) {
        throw new Error(error)
    }
})

//get a category
const getACategory = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const getCategory = await Category.findById(id)
        res.json(getCategory)
    } catch (error) {
        throw new Error(error)
    }
})

//get all category
const getAllCategory = asyncHandler(async(req,res)=>{
    try {
        const getallCategory = await Category.find()
        res.json(getallCategory)
    } catch (error) {
        throw new Error(error)
    }
})
module.exports={createCategory,updateCategory,deleteCategory,getACategory,getAllCategory}