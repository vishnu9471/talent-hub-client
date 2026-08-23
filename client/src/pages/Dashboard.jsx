import { useState, useEffect } from "react";
import axios from "../services/api";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Dance");
  const [url, setUrl] = useState("");
  const [genre, setGenre] = useState("Hip-hop");
  const [level, setLevel] = useState("Beginner");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================================
  // UPLOAD VIDEO
  // ================================
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a video title.");
      return;
    }

    if (!url.trim()) {
      alert("Please enter a video URL.");
      return;
    }

    try {
      setLoading(true);

      const postData = {
        title: title.trim(),
        description: description.trim(),
        category,
        genre,
        level,
        video_url: url.trim(),
      };

      console.log("📤 Sending video data:", postData);

      // IMPORTANT:
      // Backend route:
      // POST /api/posts
      //
      // api.js already has:
      // http://localhost:5000/api
      //
      // Therefore we use /posts here.
      const response = await axios.post("/posts", postData);

      console.log("✅ Upload successful:", response.data);

      alert("✅ Video uploaded successfully!");

      // Clear form
      setTitle("");
      setDescription("");
      setCategory("Dance");
      setUrl("");
      setGenre("Hip-hop");
      setLevel("Beginner");

      // Refresh videos
      fetchVideos();
    } catch (err) {
      console.error("🔥 Upload error:", err);

      console.error(
        "Backend response:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.error ||
          "❌ Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // FETCH ALL VIDEOS
  // ================================
  const fetchVideos = async () => {
    try {
      console.log("📡 Fetching videos...");

      const response = await axios.get("/posts/videos");

      console.log("✅ Videos received:", response.data);

      setVideos(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("🔥 Fetch videos failed:", err);

      console.error(
        "Backend response:",
        err.response?.data || err.message
      );

      setVideos([]);
    }
  };

  // ================================
  // LOAD VIDEOS ON PAGE LOAD
  // ================================
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 text-black dark:text-white transition-all duration-300">

      {/* ================================
          UPLOAD SECTION
      ================================= */}

      <h2 className="text-2xl font-bold mb-4 text-red-100">
        Upload Performance
      </h2>

      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-4 mb-10"
      >

        {/* Title */}
        <input
          type="text"
          placeholder="Video Title"
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Video Description"
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />

        {/* Category */}
        <select
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Dance">Dance</option>
          <option value="Singing">Singing</option>
          <option value="Instruments">Instruments</option>
        </select>

        {/* Genre */}
        <select
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="Hip-hop">Hip-hop</option>
          <option value="Classical">Classical</option>
          <option value="Jazz">Jazz</option>
          <option value="Pop">Pop</option>
        </select>

        {/* Level */}
        <select
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Video URL */}
        <input
          type="url"
          placeholder="Video URL (YouTube/S3)"
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        {/* Upload Button */}
        <button
          type="submit"
          disabled={loading}
          className={`py-2 rounded text-white transition-colors ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* ================================
          VIDEOS SECTION
      ================================= */}

      <h3 className="text-xl font-bold mb-4 text-red-100">
        Your Videos
      </h3>

      {videos.length === 0 ? (
        <p className="text-gray-400">
          No videos found.
        </p>
      ) : (
        <div className="grid gap-4">

          {videos.map((video) => (
            <div
              key={video._id}
              className="border p-4 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow transition"
            >

              {/* Title */}
              <h4 className="font-semibold text-lg">
                {video.title}
              </h4>

              {/* Description */}
              {video.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {video.description}
                </p>
              )}

              {/* Category */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Category: {video.category}
              </p>

              {/* Genre */}
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Genre: {video.genre}
              </p>

              {/* Level */}
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Level: {video.level}
              </p>

              {/* Video */}
              {video.video_url && (
                <div className="mt-3">
                  {video.video_url.includes("youtube.com") ||
                  video.video_url.includes("youtu.be") ? (
                    <iframe
                      src={video.video_url
                        .replace("watch?v=", "embed/")
                        .replace("youtu.be/", "www.youtube.com/embed/")}
                      className="w-full aspect-video rounded"
                      title={video.title}
                      allowFullScreen
                    />
                  ) : (
                    <video
                      className="w-full mt-2 rounded"
                      controls
                      src={video.video_url}
                    />
                  )}
                </div>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Dashboard;