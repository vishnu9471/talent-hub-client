import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const categories = ["Dance", "Singing", "Instruments"];
const genres = ["Hip-hop", "Classical", "Jazz", "Pop"];
const levels = ["Beginner", "Intermediate", "Advanced"];

export default function Upload() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Dance",
    genre: "Hip-hop",
    level: "Beginner",
    video_url: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      console.log("🔑 Upload token exists:", !!token);

      if (!token) {
        setMessage("❌ Please login before uploading a video.");
        setLoading(false);
        navigate("/login");
        return;
      }

      console.log("📤 Sending video data:", form);

      const response = await axios.post("/posts", form);

      console.log("✅ Upload response:", response.data);

      setMessage("✅ Video uploaded successfully!");

      setForm({
        title: "",
        description: "",
        category: "Dance",
        genre: "Hip-hop",
        level: "Beginner",
        video_url: "",
      });

      setTimeout(() => {
        navigate("/talent");
      }, 1500);
    } catch (err) {
      console.error("❌ Upload error:", err);

      console.error(
        "Backend response:",
        err.response?.data
      );

      if (err.response?.status === 401) {
        setMessage(
          "❌ Your login session has expired. Please login again."
        );

        localStorage.removeItem("token");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(
          err.response?.data?.error ||
            "❌ Failed to upload video. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div
        className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-3xl p-8"
        style={{
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-200">
          Upload Your Talent
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Video Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border bg-white text-black"
              required
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border bg-white text-black"
              required
            >
              {genres.map((genre) => (
                <option
                  key={genre}
                  value={genre}
                >
                  {genre}
                </option>
              ))}
            </select>

            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border bg-white text-black"
              required
            >
              {levels.map((level) => (
                <option
                  key={level}
                  value={level}
                >
                  {level}
                </option>
              ))}
            </select>
          </div>

          <input
            type="url"
            name="video_url"
            placeholder="Video URL (YouTube/S3 link)"
            value={form.video_url}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md hover:shadow-xl transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium text-sm ${
              message.includes("✅")
                ? "text-green-300"
                : "text-red-300"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}