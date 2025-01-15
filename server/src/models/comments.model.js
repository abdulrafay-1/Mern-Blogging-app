import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts",
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;