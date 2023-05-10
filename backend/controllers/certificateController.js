import asyncHandler from 'express-async-handler'
import Certificate from '../models/certificateModel.js'
import User from '../models/userModel.js'


// @desc Get Certificate
// @route Get /api/certificate/:id
// @access Public

const getCertificate = asyncHandler(async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id)
        const user = await User.findById(certificate.user)
        if (certificate && user) {
            res.json({
                certificate: certificate,
                user: {
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    city: user.city,
                }
            })
        } else {
            res.status(404)
            throw new Error("Certificate not found")
        }
    } catch (error) {
        res.json({
            error: error,
            message: "Error in fetching Certificate"
        })
    }
})


// @desc Get User Certificate
// @route Get /api/certificate/user_certificates/:id
// @access Public

const getUserCertificate = asyncHandler(async (req, res) => {
    try {
        const user = req.params.id;
        const allCertificates = await Certificate.find()
        var certificates = allCertificates.filter((certificate) => certificate.user.toString() == user)
        if (certificates) {
            res.json({
                certificates: certificates
            })
        } else {
            res.status(404)
            throw new Error("Certificates not found")
        }
    } catch (error) {
        res.json({
            error: error,
            message: "Error in fetching Certificates"
        })
    }
})

export { getCertificate, getUserCertificate }
