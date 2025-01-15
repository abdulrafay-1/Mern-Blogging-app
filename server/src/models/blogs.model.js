import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }]
    },
    {
        timestamps: true
    }
)

const Blog = mongoose.model("Blogs", blogSchema);
export default Blog;