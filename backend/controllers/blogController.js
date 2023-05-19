import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';
import cloudinary from 'cloudinary';

// @desc Get All blogs
// @route Get /api/blogs/all
// @access Public

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();

    blogs.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());

    if (blogs) {
      res.json({
        blogs: blogs
      });
    }
  } catch (error) {
    res.json({
      error: error,
      message: 'Error in fetching blogs'
    });
  }
});

// @desc Get All blogs
// @route Get /api/blogs/all
// @access Public
const getUserBlogs = asyncHandler(async (req, res) => {
  try {
    const user = req.params.id;
    const allBlogs = await Blog.find();
    var blogs = allBlogs.filter((blog) => blog.user.toString() == user);
    if (blogs) {
      res.json({
        blogs: blogs
      });
    }
  } catch (error) {
    res.json({
      error: error,
      message: 'Error in fetching blogs'
    });
  }
});

// @desc PUT Update blog approve status
// @route Get /api/blogs/approve/:id
// @access Public

const updateBlogApproval = asyncHandler(async (req, res) => {
  try {
    const { id, isApproved } = req.body;

    const blog = await Blog.findById(id);
    if (blog) {
      blog.isApproved = isApproved;
      const newNotification = new Notification({
        user: blog.user,
        message: isApproved == true ? 'Your blog has been approved' : 'Your blog has been rejected',
        unread: true,
        link: '/blogs/' + blog._id
      });
      await newNotification.save();
      await blog.save();
      res.json({
        blog: blog
      });
    } else {
      res.isApproved(404);
      res.json({
        blog: null,
        message: 'Blog not found'
      });
    }
  } catch (error) {
    res.json({
      error: error,
      message: 'Error in updating isApproved'
    });
  }
});

// @desc Get blogs
// @route Get /api/blogs
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  try {
    const unfilteredBlogs = await Blog.find();
    const blogs = unfilteredBlogs.filter((blog) => blog.isApproved === true);
    blogs.sort((a, b) => b.totalViews - a.totalViews);

    const mostViewed = blogs.slice(0, 8);
    const remaining = blogs.slice(8);

    remaining.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());

    const latest = remaining.slice(0, 5);
    const oldArticles = remaining.slice(5);

    if (blogs) {
      res.json({
        mostViewed: mostViewed,
        latest: latest,
        oldArticles: oldArticles
      });
    }
  } catch (error) {
    res.json({
      error: error,
      message: 'Error in fetching blogs'
    });
  }
});

// @desc Get blog
// @route Get /api/blogs/:id
// @access Public

const getBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      blog.totalViews += 1;
      await blog.save();
      const user = await User.findById(blog.user);
      const date = Date(blog._id.getTimestamp());
      res.send({
        ...blog._doc,
        user: user.userName,
        date: date
      });
    } else {
      res.status(404);
      throw new Error('Blog not found');
    }
  } catch (error) {
    res.status(404);
    res.json({
      error: error,
      message: 'Blog not found'
    });
  }
});

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
  const image = req.file;

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

export { getBlogs, getBlog, createBlog, getAllBlogs, updateBlogApproval, getUserBlogs };
