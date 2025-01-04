import express from "express"
import { registerUser, getAllUsers, loginUser, regenerateAccessToken, logout, authenticateUser } from "../controllers/users.controller.js";

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