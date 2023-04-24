import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users from "./data/users.js";
import blogs from "./data/blogs.js"
import User from './models/userModel.js'
import Blog from './models/blogModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()

        await User.insertMany(users)

        console.log('Data Imported!'.green.inverse)
        process.exit(0)
    } catch (error) {
        console.log(`${error}`.red.inverse.underline)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        console.log('Data Destroyed!'.red.inverse.bold)
        process.exit(0)
    } catch (error) {
        console.log(`${error}`.red.inverse.underline)
        process.exit(1)
    }
}


if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}