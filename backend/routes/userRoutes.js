import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getUserData } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.get('/data/:id', getUserData)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(updateUserProfile)

export default router