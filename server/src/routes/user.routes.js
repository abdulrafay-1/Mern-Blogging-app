import express from "express"
import { registerUser, getAllUsers, loginUser, regenerateAccessToken, logout, } from "../controllers/users.controller.js";
import { authenticateUser } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/user", getAllUsers)
router.get("/logout", logout)
router.post("/user", registerUser)
router.post("/loginuser", loginUser)
router.post("/generatetoken", regenerateAccessToken)
router.post("/authenticate", authenticateUser, (req, res) => {
    res.json({ user: req.user })
})

export default router;