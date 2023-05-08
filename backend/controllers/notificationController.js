import asyncHandler from 'express-async-handler'
import Notification from '../models/notificationModel.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose';

// @desc Get Notifications
// @route Get /api/notifications
// @access Public

const getNotifications = asyncHandler(async (req, res) => {
    try {
        const user = req.params.id;
        const allNotifications = await Notification.find()
        const notifications = allNotifications.filter((notification) => notification.user.toString() == user)
        if (notifications) {
            res.json({
                notifications: notifications
            })
        } else {
            res.status(404)
            throw new Error("Notifications not found")
        }
    } catch (error) {
        res.json({
            error: error,
            message: "Error in fetching Notificcation"
        })
    }
})

export { getNotifications }
