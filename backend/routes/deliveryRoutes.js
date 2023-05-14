import express from 'express'
import { getDeliveryAddress, setDeliveryAddress } from '../controllers/deliveryController.js'

const router = express.Router()

router.get('/:id', getDeliveryAddress)
router.post('/set', setDeliveryAddress)

export default router