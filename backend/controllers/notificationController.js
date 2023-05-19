import asyncHandler from 'express-async-handler';
import Notification from '../models/notificationModel.js';

// @desc Get Notifications
// @route Get /api/notifications
// @access Public

const getNotifications = asyncHandler(async (req, res) => {
  try {
    const user = req.params.id;
    const allNotifications = await Notification.find();
    var notifications = allNotifications.filter(
      (notification) => notification.user.toString() == user
    );
    notifications = notifications.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
    const unreadNotifications = notifications.filter(
      (notification) => notification.unread == true
    ).length;
    if (notifications) {
      res.json({
        notifications: notifications,
        unreadNotifications: unreadNotifications
      });
    } else {
      res.status(404);
      throw new Error('Notifications not found');
    }
  } catch (error) {
    res.json({
      error: error,
      message: 'Error in fetching Notificcation'
    });
  }
});

const markAsRead = asyncHandler(async (req, res) => {
  try {
    const notification = req.params.id;
    const markNotification = await Notification.findById(notification);
    if (markNotification) {
      markNotification.unread = false;
      const updatedNotification = await markNotification.save();
      res.json(updatedNotification);
    } else {
      res.status(404);
      throw new Error('Notification not found');
    }
  } catch (error) {
    res.json({
      error: error,
      message: 'Error in marking Notificcation'
    });
  }
});

export { getNotifications, markAsRead };
