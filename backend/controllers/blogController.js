import asyncHandler from 'express-async-handler'
import Blog from '../models/blogModel.js'
import User from '../models/userModel.js'


// @desc Get blogs
// @route Get /api/blogs
// @access Public

const getBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find()
        blogs.sort((a, b) => b.totalViews - a.totalViews)

        const mostViewed = blogs.slice(0, 8)
        const remaining = blogs.slice(8)

        remaining.sort((a, b) => a._id.getTimestamp() - b._id.getTimestamp())

        const latest = remaining.slice(0, 5)
        const oldArticles = remaining.slice(5)

        if (blogs) {
            res.json({
                mostViewed: mostViewed,
                latest: latest,
                oldArticles: oldArticles
            })
        }
    } catch (error) {
        res.json({
            error: error,
            message: "Error in fetching blogs"
        })
    }
})


// @desc Get blogs
// @route Get /api/blogs
// @access Public

const getBlog = asyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog) {
            const user = await User.findById(blog.user)
            const date = Date(blog._id.getTimestamp())
            res.send({
                ...blog._doc,
                user: user.userName,
                date: date
            })
        }
        else {
            res.status(404)
            throw new Error("Blog not found")
        }
    } catch (error) {
        res.status(404)
        res.json({
            error: error,
            message: "Blog not found"
        })
    }
})

export { getBlogs, getBlog }