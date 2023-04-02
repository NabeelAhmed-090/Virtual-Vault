import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    totalViews: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timetamps: true
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog