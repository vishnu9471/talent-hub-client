import express from "express";
import {
  uploadVideoToCloudinary,
  uploadYouTubeVideo,
  getAllVideos,
  getMyVideos,
  deleteVideo,
  getFilteredVideos,
  getVideosByCategory
}from "../controllers/videoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";

const router = express.Router();
const upload = multer({ storage });


router.post(
  "/",
  verifyToken,
  upload.single("video"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }
    next();
  },
  uploadVideoToCloudinary
);


router.post("/youtube",verifyToken,uploadYouTubeVideo);


router.get("/get-all-video",getAllVideos);

router.get("/my-video",verifyToken,getMyVideos);

router.get("/category/:category",getVideosByCategory);

router.get("/filter",getFilteredVideos);



router.delete("/:id", verifyToken,deleteVideo);



router.get("/youtube-test", (req, res) => {
  console.log("YouTube Test Route Hit");
  res.json({ message: "Video routes are working fine" });
});

export default router;
