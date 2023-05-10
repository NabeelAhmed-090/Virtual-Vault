import express from 'express'
import { getCertificate, getUserCertificate } from '../controllers/certificateController.js'

const router = express.Router()

router.get('/:id', getCertificate)
router.get('/user_certificates/:id', getUserCertificate)

export default router