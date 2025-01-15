import mongoose from "mongoose";
import Blog from "../models/blogs.model.js";
import Comments from "../models/comments.model.js";
import Users from "../models/users.model.js";

const addBlog = async (req, res) => {
    const { title, description, author } = req.body;
    if (!(title || description || author)) return res.status(400).json({
        message: "title, description, author is required"
    })
    try {
        const blog = await Blog.create({
            title,
            description,
            author
        })
        await Users.findByIdAndUpdate(author, { $push: { blogs: blog } }, { new: true });
        res.json({
            message: "Blog created successfully",
            blog
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort([['updatedAt', 'descending']])
            .populate('author', 'name')
            .populate('likes', 'name')
            .populate({
                path: "comments",
                select: "text",
                populate: {
                    path: "author",
                    select: "name"
                }
            })
        res.json({ message: "All blogs", blogs })
    } catch (error) {
        res.json({ message: "Internal server error", error });
    }
}

const getUserBlogs = async (req, res) => {
    const { author } = req.params;
    if (!author) return res.status(400).json({
        message: "Author is required"
    })

    try {
        const blogs = await Blog.find({ author });
        res.json({
            message: "Blogs fetched successfully",
            blogs
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

const likeBlog = async (req, res) => {
    const { id } = req.params;
    const { author } = req.body;
    if (!id && !mongoose.isValidObjectId(id)) return res.status(400).json({
        message: "Invalid Blog id"
    })
    if (!author) return res.status(400).json({
        message: "user id is required"
    })
    try {
        const blog = await Blog.findByIdAndUpdate(id, { $push: { likes: author } }, { new: true });
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json({ message: "blog liked", blog });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}

const commentBlog = async (req, res) => {
    const { author, text, post } = req.body;
    if (!(author || text || post)) return res.status(404).json({ message: "author, text and post are required" });
    if (!(mongoose.isValidObjectId(post) || mongoose.isValidObjectId(author))) return res.status(400).json({ message: "Invalid post or author id" });
    const comment = await Comments.create({ author, text, post })
    const blog = await Blog.findByIdAndUpdate(post, { $push: { comments: comment._id } }, { new: true }).populate('author', 'name')
        .populate('likes', 'name')
        .populate({
            path: "comments",
            select: "text",
            populate: {
                path: "author",
                select: "name"
            }
        })
    res.json({
        message: "Comment added",
        comment,
        blog
    });
}

export { addBlog, getUserBlogs, likeBlog, commentBlog, getAllBlogs }