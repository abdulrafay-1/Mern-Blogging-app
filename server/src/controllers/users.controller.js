import Users from "../models/users.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateRefreshToken = (user) => {
    return jwt.sign(
        { email: user.email, password: user.password }
        , process.env.REFRESH_JWT_SECRET,
        { expiresIn: '7d' }
    )
}

const generateAccessToken = (user) => {
    return jwt.sign(
        { email: user.email, password: user.password }
        , process.env.ACCESS_JWT_SECRET,
        { expiresIn: 60 }
    )
}
const getAllUsers = async (req, res) => {
    const users = await Users.find({})
    res.json({
        users
    })
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!(name || email || password)) return res.json({
        message: "name, password, email is required"
    })

    try {
        const userExist = await Users.findOne({ email })
        if (userExist) {
            throw new Error("Email already exists");
        }
        const user = await Users.create({ name, password, email })
        res.json({
            message: "User created",
            user,
        })
    } catch (error) {
        if (error.message) return res.status(500).json({
            message: error.message,
        })
        res.status(500).json({
            message: "Internal server error",
            error,
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!(email || password)) return res.json({
        message: "password, email is required"
    })

    try {
        const user = await Users.findOne({ email })
        if (!user) {
            throw new Error("User not registered");
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            throw new Error("Incorrect Password")
        };

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie("refreshToken", refreshToken, { secure: true, httpOnly: true });

        res.json({
            message: "User loggedin successfully",
            accessToken,
            refreshToken,
            user,
        })
    } catch (error) {
        if (error.message) return res.status(500).json({
            message: error.message,
        })
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "user logout successfully" });
}

const regenerateAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token found !" });

    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        const user = await Users.findOne({ email: decodedToken.email });
        if (!user) res.status(404).json({ message: "Invalid refresh token" });

        const accessToken = generateAccessToken(user);
        res.json({
            message: "access token generated",
            accessToken,
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error
        })
    }
}



export { registerUser, getAllUsers, loginUser, logout, regenerateAccessToken, }