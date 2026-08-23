import React, { useEffect, useState } from "react";
import axios from "../services/api";

const genres = ["all", "hip-hop", "classical", "jazz", "pop"];
const levels = ["all", "beginner", "intermediate", "advanced"];

const Learn = () => {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [genre, setGenre] = useState("all");
  const [level, setLevel] = useState("all");
  const [search, setSearch] = useState("");

  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalVideo, setModalVideo] = useState(null);

  // =========================================================
  // FETCH ALL VIDEOS
  // Backend route:
  // GET /api/posts/videos
  // =========================================================
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("📚 Fetching videos...");

        const response = await axios.get("/posts/videos");

        console.log("✅ Videos received:", response.data);

        const data = Array.isArray(response.data) ? response.data : [];

        setVideos(data);
        setFiltered(data);
      } catch (error) {
        console.error("❌ Error fetching videos:", error);

        console.error(
          "Backend response:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.error ||
            "Failed to load videos. Please try again."
        );

        setVideos([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // =========================================================
  // FILTER VIDEOS
  // =========================================================
  useEffect(() => {
    let result = [...videos];

    // Filter by genre
    if (genre !== "all") {
      result = result.filter(
        (video) =>
          video.genre?.toLowerCase() === genre.toLowerCase()
      );
    }

    // Filter by level
    if (level !== "all") {
      result = result.filter(
        (video) =>
          video.level?.toLowerCase() === level.toLowerCase()
      );
    }

    // Search
    if (search.trim()) {
      const searchText = search.toLowerCase().trim();

      result = result.filter((video) => {
        const title = video.title?.toLowerCase() || "";
        const description = video.description?.toLowerCase() || "";
        const videoGenre = video.genre?.toLowerCase() || "";
        const category = video.category?.toLowerCase() || "";

        return (
          title.includes(searchText) ||
          description.includes(searchText) ||
          videoGenre.includes(searchText) ||
          category.includes(searchText)
        );
      });
    }

    setFiltered(result);

    // Reset visible videos when filters change
    setVisibleCount(6);
  }, [genre, level, search, videos]);

  // =========================================================
  // LOAD MORE
  // =========================================================
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // =========================================================
  // OPEN MODAL
  // =========================================================
  const openModal = (video) => {
    setModalVideo(video);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================
  const closeModal = () => {
    setModalVideo(null);
  };

  // =========================================================
  // YOUTUBE URL CONVERTER
  // =========================================================
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    try {
      // Already an embed URL
      if (url.includes("youtube.com/embed/")) {
        return url;
      }

      // youtube.com/watch?v=...
      if (url.includes("youtube.com/watch")) {
        const urlObject = new URL(url);
        const videoId = urlObject.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      // youtu.be/...
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      return null;
    } catch (error) {
      console.error("Invalid YouTube URL:", error);
      return null;
    }
  };

  // =========================================================
  // VIDEO PLAYER
  // =========================================================
  const renderVideo = (video, isModal = false) => {
    const embedUrl = getYoutubeEmbedUrl(video.video_url);

    if (embedUrl) {
      return (
        <iframe
          src={embedUrl}
          className={
            isModal
              ? "absolute top-0 left-0 w-full h-full"
              : "absolute top-0 left-0 w-full h-full rounded"
          }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.title || "TalentHub Video"}
        />
      );
    }

    return (
      <video
        src={video.video_url}
        controls
        className={
          isModal
            ? "absolute top-0 left-0 w-full h-full object-contain"
            : "absolute top-0 left-0 w-full h-full object-cover rounded"
        }
      >
        Your browser does not support the video player.
      </video>
    );
  };

  return (
    <div className="relative p-6 md:p-12 min-h-screen bg-transparent text-gray-800">

      {/* =====================================================
          PAGE TITLE
      ====================================================== */}
      <h1 className="text-3xl font-bold mb-6 text-red-100">
        🎓 Learn Videos
      </h1>

      {/* =====================================================
          SEARCH & FILTERS
      ====================================================== */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-white border text-gray-700 shadow-sm focus:outline-none w-64"
        />

        {/* Genre */}
        <select
          className="px-4 py-2 rounded bg-white border text-gray-700 shadow-sm focus:outline-none"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>

        {/* Level */}
        <select
          className="px-4 py-2 rounded bg-white border text-gray-700 shadow-sm focus:outline-none"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          {levels.map((l) => (
            <option key={l} value={l}>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </option>
          ))}
        </select>

        {/* Reset */}
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setGenre("all");
            setLevel("all");
          }}
          className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 shadow-sm"
        >
          Reset
        </button>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}
      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Unable to load videos</p>
          <p className="text-sm mt-1">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* =====================================================
          LOADING
      ====================================================== */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-600 text-lg">
            Loading videos...
          </p>
        </div>
      )}

      {/* =====================================================
          NO VIDEOS
      ====================================================== */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg font-semibold">
            No videos found.
          </p>

          <p className="text-gray-500 mt-2">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* =====================================================
          VIDEO CARDS
      ====================================================== */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {filtered.slice(0, visibleCount).map((video) => (
            <div
              key={video._id}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg p-4 transform transition hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer"
              onClick={() => openModal(video)}
            >

              {/* Video Preview */}
              <div className="relative pb-[56.25%] rounded overflow-hidden shadow-inner bg-black">
                {renderVideo(video)}
              </div>

              {/* Video Information */}
              <div className="mt-4 space-y-2">

                <h2 className="text-lg font-bold truncate">
                  {video.title || "Untitled Video"}
                </h2>

                <p className="text-sm opacity-90 line-clamp-2">
                  {video.description || "No description available."}
                </p>

                {/* Category */}
                {video.category && (
                  <p className="text-xs opacity-80">
                    📂 {video.category}
                  </p>
                )}

                {/* Genre + Level */}
                <div className="flex justify-between text-xs mt-3 gap-2">

                  <span className="bg-white text-indigo-600 px-2 py-1 rounded-md">
                    🎵 {video.genre || "N/A"}
                  </span>

                  <span className="bg-white text-purple-600 px-2 py-1 rounded-md">
                    📈 {video.level || "N/A"}
                  </span>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================
          LOAD MORE
      ====================================================== */}
      {visibleCount < filtered.length && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleLoadMore}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow-md"
          >
            Load More
          </button>
        </div>
      )}

      {/* =====================================================
          VIDEO MODAL
      ====================================================== */}
      {modalVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Video */}
            <div className="relative pb-[56.25%] bg-black">
              {renderVideo(modalVideo, true)}
            </div>

            {/* Details */}
            <div className="p-5">

              <h2 className="text-2xl font-bold text-gray-900">
                {modalVideo.title || "Untitled Video"}
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                {modalVideo.description || "No description available."}
              </p>

              {/* Category */}
              {modalVideo.category && (
                <p className="text-sm text-gray-700 mt-3">
                  📂 Category: {modalVideo.category}
                </p>
              )}

              {/* Genre + Level */}
              <div className="flex flex-wrap gap-4 mt-3">

                <span className="text-sm text-indigo-700">
                  🎵 Genre: {modalVideo.genre || "N/A"}
                </span>

                <span className="text-sm text-purple-700">
                  📈 Level: {modalVideo.level || "N/A"}
                </span>

              </div>

              {/* Close */}
              <button
                type="button"
                onClick={closeModal}
                className="mt-5 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;