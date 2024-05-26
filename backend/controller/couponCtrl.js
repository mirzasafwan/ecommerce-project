const Coupon = require("../models/couponModel")
const asyncHandler = require("express-async-handler")
const validateMongodbId = require("../utils/validateMongodbid")


const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    } catch (error) {
        throw new Error(error)
    }
})


//get all coupon
const getAllCoupon = asyncHandler(async (req, res) => {
    try {
        const findCoupon = await Coupon.find()
        res.json(findCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    try {
        const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updatecoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        console.log('Request Body:', req.body);
        console.log('Coupon ID:', id);
        console.log('Updated Coupon:', updatecoupon);
        res.json(updatecoupon);

        // res.json(updatecoupon);
    } catch (error) {
        console.error('Error updating coupon:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deletecoupon = await Coupon.findByIdAndDelete(id);
        res.json(deletecoupon);
    } catch (error) {
        throw new Error(error);
    }
});
const getCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getAcoupon = await Coupon.findById(id);
        res.json(getAcoupon);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getCoupon }