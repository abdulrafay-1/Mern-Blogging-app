import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./src/db/index.js";
import userRoute from "./src/routes/user.routes.js"
import blogRoute from "./src/routes/blog.routes.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/v1", userRoute)
app.use("/api/v1", blogRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}`)
    })
})
    .catch((err) => {
        console.log("MONGODB connection FAILED ", err);
        process.exit(1);
    })