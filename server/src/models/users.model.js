import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UsersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        blogs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blogs"
        }]
    },
    {
        timestamps: true
    }
)

UsersSchema.pre("save", async function name(next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})


const Users = mongoose.model("Users", UsersSchema)

export default Users