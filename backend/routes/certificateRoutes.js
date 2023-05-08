import express from 'express'
import { getCertificate } from '../controllers/certificateController.js'

const router = express.Router()

router.get('/:id', getCertificate)

export default router