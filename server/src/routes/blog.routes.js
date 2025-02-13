import { Router } from "express"
import { addBlog, commentBlog, deleteBlog, getAllBlogs, getUserBlogs, likeBlog } from "../controllers/blogs.controller.js";
import { authenticateUser } from "../../middlewares/auth.js";

const router = Router();

router.post("/blog", authenticateUser, addBlog)
router.delete("/blog/:id", authenticateUser, deleteBlog)
router.get("/blog/:author", authenticateUser, getUserBlogs);
router.get("/blog", getAllBlogs);
router.post("/likeblog/:id", authenticateUser, likeBlog);
router.post("/commentblog", authenticateUser, commentBlog);

export default router;