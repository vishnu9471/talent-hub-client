import Video from "../models/Video.js";

// Upload YouTube video (direct URL-based upload)
export const uploadYouTubeVideo = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, description, category, genre, level, video_url } = req.body;

    // Ensure the required fields are provided
    if (!title || !video_url || !category || !genre || !level) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const video = new Video({
      user_id,
      title,
      description,
      category: category.toLowerCase(), // Convert to lowercase for consistency
      genre,
      level,
      video_url,
      isPublic: true, // Assuming public by default
    });

    await video.save();
    res.status(201).json({ message: "YouTube video uploaded successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: `Failed to upload YouTube video: ${err.message}` });
  }
};

// Get all videos with pagination
export const getAllVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10
    const skip = (page - 1) * limit;

    const videos = await Video.find({ isPublic: true }) // Only public videos
      .populate("user_id", "name") // Get user name
      .sort({ createdAt: -1 }) // Sort by latest
      .skip(skip) // Skip previous pages
      .limit(Number(limit)); // Limit number of records per page

    const totalCount = await Video.countDocuments({ isPublic: true });

    res.status(200).json({ videos, totalCount });
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: `Failed to fetch videos: ${err.message}` });
  }
};

// Get videos uploaded by the current user with pagination
export const getMyVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10
    const skip = (page - 1) * limit;

    const videos = await Video.find({ user_id: req.user.id }) // Fetch user's videos
      .populate("user_id", "name") // Include user name
      .sort({ createdAt: -1 }) // Sort by latest
      .skip(skip) // Skip previous pages
      .limit(Number(limit)); // Limit number of records per page

    const totalCount = await Video.countDocuments({ user_id: req.user.id });

    res.status(200).json({ videos, totalCount });
  } catch (err) {
    console.error("Error fetching user videos:", err);
    res.status(500).json({ error: `Failed to fetch user videos: ${err.message}` });
  }
};

// Delete a video by its ID
export const deleteVideo = async (req, res) => {
  try {
    const result = await Video.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id, // Ensure the video belongs to the user
    });

    if (!result) {
      return res.status(404).json({ error: "Video not found or unauthorized" });
    }

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: `Failed to delete video: ${err.message}` });
  }
};

// Get videos based on filters (category, genre, level) with pagination
export const getFilteredVideos = async (req, res) => {
  try {
    const { category = "All", genre = "All", level = "All", page = 1, limit = 10 } = req.query; // Default values
    const skip = (page - 1) * limit;

    const filters = {};
    if (category && category !== "All") filters.category = category.toLowerCase();
    if (genre && genre !== "All") filters.genre = genre;
    if (level && level !== "All") filters.level = level;

    const videos = await Video.find(filters)
      .populate("user_id", "name") // Include the author's name
      .sort({ createdAt: -1 }) // Sort by latest
      .skip(skip) // Skip previous pages
      .limit(Number(limit)); // Limit number of records per page

    const totalCount = await Video.countDocuments(filters);

    res.status(200).json({ videos, totalCount });
  } catch (err) {
    console.error("Filter error:", err);
    res.status(500).json({ error: `Failed to fetch filtered videos: ${err.message}` });
  }
};

// Get videos by category with pagination
export const getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10
    const skip = (page - 1) * limit;

    const videos = await Video.aggregate([
      { $match: { category: category.toLowerCase(), isPublic: true } }, // Only public videos
      { $sample: { size: 100 } }, // Randomly select up to 100 videos (for example)
      {
        $lookup: {
          from: "users", // Lookup user info from the 'users' collection
          localField: "user_id",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: "$authorInfo" }, // Flatten the user data
      {
        $project: {
          title: 1,
          description: 1,
          category: 1,
          genre: 1,
          level: 1,
          video_url: 1,
          createdAt: 1,
          author: "$authorInfo.name", // Include author's name
        },
      },
    ]);

    const totalCount = await Video.countDocuments({ category: category.toLowerCase(), isPublic: true });

    res.status(200).json({ videos, totalCount });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: `Failed to fetch videos by category: ${err.message}` });
  }
};
