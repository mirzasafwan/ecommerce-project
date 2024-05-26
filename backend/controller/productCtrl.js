const Product = require('../models/productModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const validateMongodbId = require('../utils/validateMongodbid')
const fs = require("fs")
const {cloudinaryUploadImg,cloudinaryDeleteImg} = require("../utils/cloudinary")

const createProduct = asyncHandler(async(req,res)=>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
})


//update product

const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    // validateMongoDbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await Product.findOneAndUpdate({_id:id}, req.body, {
        new: true,
      });
      res.json(updateProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    // validateMongoDbId(id);
    try {
      
      const deleteProduct = await Product.findOneAndDelete(id, req.body, {
        new: true,
      });
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
//get a single product

const getaProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
    const findProduct = await Product.findById(id).populate('color')
    res.json(findProduct)
    } catch (error) {
        throw new Error(error)
    }
})

//get all products
const getAllProducts = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Product.find(JSON.parse(queryStr));
  
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
  
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const product = await query;
      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  });
// const getAllProducts = asyncHandler(async (req, res) => {
//     try {
//       const { brand, category, color } = req.query;
//       console.log('Received query parameters:', { brand, category, color });
  
//       const filter = {};
//       if (brand) {
//         filter.brand = { $regex: new RegExp(brand, 'i') }; // Case-insensitive regex
//       }
//       if (category) {
//         filter.category = { $regex: new RegExp(category, 'i') }; // Case-insensitive regex
//       }
//       if (color) {
//         filter.color = { $regex: new RegExp(color, 'i') }; // Case-insensitive regex
//       }
  
//       console.log('Constructed filter:', filter);
  
//       const allProducts = await Product.find(filter);
//       console.log('Found products:', allProducts);
  
//       res.json(allProducts);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//Add to WhishList
const addToWhisList = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  const {prodId} = req.body;

  try {
    const user = await User.findById(_id)
    const alreadyAdded = user.wishlist.find((id)=>id.toString() === prodId)
    if(alreadyAdded){
      let user = await User.findByIdAndUpdate(_id,
        {
          $pull:{wishlist:prodId}
        },{
          new:true
        })
    res.json(user)
    }else{
      let user = await User.findByIdAndUpdate(_id,
        {
          $push:{wishlist:prodId}
        },{
          new:true
        })
    res.json(user)
    }
  } catch (error) {
    throw new Error(error)
  }
})

//Rating
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body.data;
  console.log("User ID:", _id);
  console.log("Request body:", req.body); 

  try {
    const product = await Product.findById(prodId);
    console.log("Product:", product); // Log the product to see if it's fetched correctly

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      // Update existing rating
      const updateRating = await Product.updateOne(
        { "ratings._id": alreadyRated._id }, // Using _id of the rating document
        { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
        { new: true }
      );
      console.log("Update result:", updateRating); // Log the update result
    } else {
      // Add new rating
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
      console.log("New rating:", rateProduct); // Log the new rating
    }

    // Recalculate total rating and update product
    const getallratings = await Product.findById(prodId);
    console.log("All ratings:", getallratings.ratings); // Log all ratings to verify

    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);

    // Update totalrating of the product
    const finalproduct = await Product.findByIdAndUpdate(
      prodId,
      { totalrating: actualRating },
      { new: true }
    );
    console.log("Final product:", finalproduct); // Log the final product after updating totalrating

    res.json(finalproduct);
  } catch (error) {
    console.error("Error:", error); // Log any error that occurs
    res.status(500).json({ error: "Internal server error" });
  }
});



//upload images
// const uploadImages = asyncHandler(async(req,res)=>{
//   // console.log(req.files)
 
//   try {
//     const uploader = (path) => cloudinaryUploadImg(path,"images");
//     const urls = [];
//     const files = req.files;
//     console.log(req.files)
//     for(const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path)
//       console.log(newPath)
//       urls.push(newPath)
//       fs.unlinkSync(path)
//     }
//     const images = urls.map((file)=>{
//       return file
//     })
//     res.json(images)
//   } catch (error) {
//     throw new Error(error)
//   }
// })
const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    
    // Ensure req.files is an array and contains elements
    const files = Array.isArray(req.files) ? req.files.filter(file => file) : [];

    console.log(files);

    for (const file of files) {
      try {
        if (file && file.path) {
          const { path } = file;
          const newPath = await uploader(path);
          console.log(newPath);
          urls.push(newPath);
          fs.unlinkSync(path);
        } else {
          console.error('Invalid file:', file);
        }
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
      }
    }

    const images = urls.map((file) => file);

    res.json(images);
  } catch (error) {
    console.error('Error in uploadImages handler:', error);
    throw new Error(error);
  }
});


//delete images
const deleteImage = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id,"images")
    res.json({
      message:"Deleted"
    })
  } catch (error) {
    throw new Error(error)
  }
})
module.exports={createProduct,getaProduct,getAllProducts,updateProduct,deleteProduct,addToWhisList,rating,uploadImages,deleteImage}