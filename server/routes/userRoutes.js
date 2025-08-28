import express from "express";
import {  getUserById,getProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; 
import {register, login,} from "../controllers/authController.js"
const router = express.Router();


router.post("/register", register);
router.post("/login", login);

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});
router.get("/profile", verifyToken, getProfile);


router.get("/:id", verifyToken, getUserById);

export default router;
