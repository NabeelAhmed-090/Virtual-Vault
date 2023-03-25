import express from "express"
import color from "colors"
import dotenv from "dotenv"
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV || development

app.use('/api/users', userRoutes)

app.listen(PORT, console.log(`server running in ${MODE} on port ${PORT}...`.yellow.bold))