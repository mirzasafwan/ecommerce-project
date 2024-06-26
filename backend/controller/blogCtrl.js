const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbid')
const { cloudinaryUploadImg } = require('../utils/cloudinary')


//create blog
const createBlog = asyncHandler(async(req,res)=>{
    try {
        const newBlog = await Blog.create(req.body)
        res.json({
            status:"success",
            newBlog
        })
    } catch (error) {
        throw new Error(error)
    }
})


//update blog


const updateBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.json({
            status:"success",
            updatedBlog
        })
    } catch (error) {
        throw new Error(error)
    }
})


//getblog



const getBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes")
        await Blog.findByIdAndUpdate(
            id,
            {
                $inc:{numViews:1}
            },{
                new:true
            }
        )
        res.json(getBlog)
    } catch (error) {
        throw new Error(error)
    }
})

//get all blog

const getAllBlog = asyncHandler(async(req,res)=>{
    try {
        const getAllBlog = await Blog.find()
        res.json(getAllBlog)
    } catch (error) {
        throw new Error(error)
    }
})

//delete blog

const deleteBlog = asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id)
        res.json(deleteBlog)
    } catch (error) {
        throw new Error(error)
    }
})

//is like the blog


const liketheBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  });


  //dislike the blog


  const disliketheBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisliked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  });


  //upload images
  const uploadImages = asyncHandler(async(req,res)=>{
    // console.log(req.files)
    const { id } = req.params;
    validateMongodbId(id)
    console.log(req.files)
    try {
      const uploader = (path) => cloudinaryUploadImg(path,"images");
      const urls = [];
      const files = req.files;
      console.log(req.files)
      for(const file of files) {
        const {path} = file;
        const newPath = await uploader(path)
        console.log(newPath)
        urls.push(newPath)
      }
      const findBlog = await Blog.findByIdAndUpdate(
        id,
        {
          images:urls.map((file)=>{
            return file;
          })
        },{
          new:true
        }
      )
      res.json(findBlog)
    } catch (error) {
      throw new Error(error)
    }
  })
module.exports={createBlog,updateBlog,getBlog,getAllBlog,deleteBlog,liketheBlog,disliketheBlog,uploadImages}