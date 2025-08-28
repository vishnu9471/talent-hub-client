import express from "express";
import {
  uploadYouTubeVideo, // Handling YouTube video URL upload
  getAllVideos,
  getMyVideos,
  deleteVideo,
  getFilteredVideos,
  getVideosByCategory
} from "../controllers/videoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for uploading YouTube videos by URL (No file upload here)
router.post("/youtube", verifyToken, uploadYouTubeVideo);

// Get all videos
router.get("/get-all-video", getAllVideos);

// Get videos uploaded by the current user
router.get("/my-video", verifyToken, getMyVideos);

// Get videos by category
router.get("/category/:category", getVideosByCategory);

// Filter videos based on category, genre, and level
router.get("/filter", getFilteredVideos);

// Delete a video by its ID
router.delete("/:id", verifyToken, deleteVideo);

// A test route for checking YouTube video routes
router.get("/youtube-test", (req, res) => {
  console.log("YouTube Test Route Hit");
  res.json({ message: "Video routes are working fine" });
});

export default router;
