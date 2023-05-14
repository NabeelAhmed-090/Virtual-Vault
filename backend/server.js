import express from "express"
import color from "colors"
import dotenv from "dotenv"
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import notificationRoutes from './routes/notificationsRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js'
import deliveryRoutes from './routes/deliveryRoutes.js'
import { config } from 'cloudinary';
import cors from 'cors';


dotenv.config()

config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

connectDB()

const app = express()

app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV || development

app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/games', gameRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/certificate', certificateRoutes)
app.use('/api/delivery', deliveryRoutes)




app.listen(PORT, console.log(`server running in ${MODE} on port ${PORT}...`.yellow.bold))