import express from "express";
import * as postController from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================================
// CREATE VIDEO POST
// POST /api/posts
// ============================================
router.post("/", verifyToken, postController.createPost);

// ============================================
// GET LOGGED-IN USER'S POSTS
// GET /api/posts
// ============================================
router.get("/", verifyToken, postController.getPosts);

// ============================================
// GET ALL VIDEOS
// GET /api/posts/videos
// ============================================
router.get("/videos", postController.getAllVideos);

// ============================================
// DELETE USER POST
// DELETE /api/posts/:id
// ============================================
router.delete("/:id", verifyToken, postController.deletePost);

export default router;