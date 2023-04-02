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
        await Blog.deleteMany()

        const createdMany = await User.insertMany(users)
        const usersLength = createdMany.length

        const sampleBlogs = blogs.map(blog => {
            return { ...blog, user: createdMany[(blog.user + 5) % usersLength]._id }
        })

        await Blog.insertMany(sampleBlogs)
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
        await Blog.deleteMany()

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