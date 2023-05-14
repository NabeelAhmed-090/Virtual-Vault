import asyncHandler from 'express-async-handler'
import Delivery from '../models/deliveryModel.js'
import mongoose from 'mongoose'
import ObjectId from 'mongodb'
import User from '../models/userModel.js'

// @desc Get Delivery Address
// @route Get /api/delivery/:id
// @access Public

const getDeliveryAddress = asyncHandler(async (req, res) => {
    try {
        const address = await Delivery.findOne({ user: req.params.id })
        if (address) {
            res.json({
                address: address
            })
        } else {
            res.json({
                address: null
            })
        }
    } catch (error) {
        res.json({
            error: error,
            message: "Error in fetching Address"
        })
    }
})


// @desc POST Delivery Address
// @route POST /api/delivery/set
// @access Public

const setDeliveryAddress = asyncHandler(async (req, res) => {
    const { address, additionalInfo, user } = req.body;
    try {
        const delivery = await Delivery.findOne({ user });
        if (delivery) {
            delivery.address = address;
            delivery.additionalInfo = additionalInfo;
            const updatedDelivery = await delivery.save();
            res.json({ updatedDelivery });
        } else {
            const existingUser = await User.findById(user);
            if (!existingUser) {
                throw new Error('User not found');
            }
            const newDelivery = await Delivery.create({
                address,
                additionalInfo,
                user: existingUser._id,
            });
            res.json({ newDelivery });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export { getDeliveryAddress, setDeliveryAddress }
