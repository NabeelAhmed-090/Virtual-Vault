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
            userName: user.userName,
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
    const { email, password, userName, firstName, lastName, city } = req.body

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
        email,
        password,
        userName,
        firstName,
        lastName,
        city
    })

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            firstName: user.firstName,
            userName: user.userName,
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
            email: req.user.email,
            userName: req.user.userName,
            lastName: req.user.lastName,
            firstName: req.user.firstName,
            city: req.user.city,
            isAdmin: req.user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (id) {
        const user = await User.findById(id)
        if (user) {
            user.email = req.body.email || user.email
            user.userName = req.body.userName || user.userName
            user.lastName = req.body.lastName || user.lastName
            user.firstName = req.body.firstName || user.firstName
            user.city = req.body.city || user.city
            if (req.body.password !== '') {
                user.password = req.body.password
            }
            const updatedUser = await user.save()
            res.json({
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                userName: user.userName,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id)
            })
        }
    }
    else {
        res.status(404)
        throw new Error("User not found")
    }
})


export { authUser, getUserProfile, registerUser, updateUserProfile }