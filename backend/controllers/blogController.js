import asyncHandler from 'express-async-handler'
import Blog from '../models/blogModel.js'
import User from '../models/userModel.js'
import cloudinary from 'cloudinary';

// @desc Get blogs
// @route Get /api/blogs
// @access Public

const getBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find()
        blogs.sort((a, b) => b.totalViews - a.totalViews)

        const mostViewed = blogs.slice(0, 8)
        const remaining = blogs.slice(8)

        remaining.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp())

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
            blog.totalViews += 1
            await blog.save()
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


// function to upload image to cloudinary
async function uploadImageToCloudinary(image) {
    try {
        const result = await cloudinary.uploader.upload(image.path);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Error uploading image to Cloudinary');
    }
}

// @desc POST blogs
// @route POST /api/blogs/create
// @access Public

const createBlog = asyncHandler(async (req, res) => {
    const { user, title, blog } = req.body;
    const image = req.file

    try {
        const cloudinaryResult = await uploadImageToCloudinary(image);

        const newBlog = new Blog({
            user: user,
            title: title,
            blog: blog,
            totalViews: 0,
            imagePath: cloudinaryResult.secure_url
        });

        const savedBlog = await newBlog.save();

        res.status(201).json(savedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



export { getBlogs, getBlog, createBlog }