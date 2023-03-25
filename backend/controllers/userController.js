import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('invalid email or password')
    }
})


// @desc Reguster a new user
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body

    const emailExists = await User.findOne({ email })
    const userNameExists = await User.findOne({ userName })

    if (emailExists) {
        res.status(400)
        throw new Error('Email already exists')
    }
    if (userNameExists) {
        res.status(400)
        throw new Error('Username already exists')
    }

    const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password
    })

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Get user profile
// @route Get /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id,
            firstName: req.user.firstName,
            email: req.user.email,
            isAdmin: req.user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


export { authUser, getUserProfile, registerUser }