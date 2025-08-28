import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const categories = ["Dance", "Singing", "Instruments"];
const genres = ["Hip-hop", "Classical", "Jazz", "Pop"];
const levels = ["Beginner", "Intermediate", "Advanced"];

export default function Upload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Dance",
    genre: "Hip-hop",
    level: "Beginner",
    video_url: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/videos/upload", form); // Corrected endpoint
      setMessage("✅ Video uploaded successfully!");
      setTimeout(() => navigate("/talent"), 1500); // Navigate to a more relevant page
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to upload video. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div
        className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/30 shadow-lg 
                   rounded-3xl p-8 transition-all duration-500"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-200">Upload Your Talent</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Video Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-white/20 dark:bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-white/20 dark:bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex flex-col md:flex-row gap-4 text-black">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 dark:text-white"
              required
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 dark:text-white"
              required
            >
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 dark:text-white"
              required
            >
              {levels.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <input
            type="url"
            name="video_url"
            placeholder="Video URL (e.g., YouTube/S3 link)"
            value={form.video_url}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-white/20 dark:bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
          >
            Upload Video
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center font-medium text-sm ${message.includes("✅") ? "text-green-300" : "text-red-300"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}