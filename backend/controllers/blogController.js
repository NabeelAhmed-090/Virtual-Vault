import asyncHandler from 'express-async-handler'
import Blog from '../models/blogModel.js'

// @desc Get blogs
// @route Get /api/blogs
// @access Public

const getBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find()
        blogs.sort((a, b) => b.totalViews - a.totalViews)

        const mostViewed = blogs.slice(0, 6)
        const remaining = blogs.slice(6)

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
        console.log(error)
    }
})

export { getBlogs }