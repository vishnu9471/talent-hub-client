// import React, { useState } from "react";
// import axios from "../services/api";
// import { useNavigate } from "react-router-dom";

// const categories = ["Dance", "Singing", "Instruments"];
// const genres = ["Hip-hop", "Classical", "Jazz", "Pop"];
// const levels = ["Beginner", "Intermediate", "Advanced"];

// export default function Upload() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "Dance",
//     genre: "Hip-hop",
//     level: "Beginner",
//     video_url: "",
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       console.log("🔑 Upload token exists:", !!token);

//       if (!token) {
//         setMessage("❌ Please login before uploading a video.");
//         setLoading(false);
//         navigate("/login");
//         return;
//       }

//       console.log("📤 Sending video data:", form);

//       const response = await axios.post("/posts", form);

//       console.log("✅ Upload response:", response.data);

//       setMessage("✅ Video uploaded successfully!");

//       setForm({
//         title: "",
//         description: "",
//         category: "Dance",
//         genre: "Hip-hop",
//         level: "Beginner",
//         video_url: "",
//       });

//       setTimeout(() => {
//         navigate("/talent");
//       }, 1500);
//     } catch (err) {
//       console.error("❌ Upload error:", err);

//       console.error(
//         "Backend response:",
//         err.response?.data
//       );

//       if (err.response?.status === 401) {
//         setMessage(
//           "❌ Your login session has expired. Please login again."
//         );

//         localStorage.removeItem("token");

//         setTimeout(() => {
//           navigate("/login");
//         }, 1500);
//       } else {
//         setMessage(
//           err.response?.data?.error ||
//             "❌ Failed to upload video. Please try again."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-6 py-12">
//       <div
//         className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-3xl p-8"
//         style={{
//           boxShadow:
//             "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//         }}
//       >
//         <h1 className="text-3xl font-bold mb-6 text-center text-indigo-200">
//           Upload Your Talent
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6"
//         >
//           <input
//             type="text"
//             name="title"
//             placeholder="Video Title"
//             value={form.title}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <div className="flex flex-col md:flex-row gap-4">
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="flex-1 px-4 py-2 rounded-lg border bg-white text-black"
//               required
//             >
//               {categories.map((category) => (
//                 <option
//                   key={category}
//                   value={category}
//                 >
//                   {category}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="genre"
//               value={form.genre}
//               onChange={handleChange}
//               className="flex-1 px-4 py-2 rounded-lg border bg-white text-black"
//               required
//             >
//               {genres.map((genre) => (
//                 <option
//                   key={genre}
//                   value={genre}
//                 >
//                   {genre}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="level"
//               value={form.level}
//               onChange={handleChange}
//               className="flex-1 px-4 py-2 rounded-lg border bg-white text-black"
//               required
//             >
//               {levels.map((level) => (
//                 <option
//                   key={level}
//                   value={level}
//                 >
//                   {level}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <input
//             type="url"
//             name="video_url"
//             placeholder="Video URL (YouTube/S3 link)"
//             value={form.video_url}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md hover:shadow-xl transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Uploading..." : "Upload Video"}
//           </button>
//         </form>

//         {message && (
//           <p
//             className={`mt-4 text-center font-medium text-sm ${
//               message.includes("✅")
//                 ? "text-green-300"
//                 : "text-red-300"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useRef, useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const categories = ["Dance", "Singing", "Instruments"];
const genres = ["Hip-hop", "Classical", "Jazz", "Pop"];
const levels = ["Beginner", "Intermediate", "Advanced"];

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Dance",
    genre: "Hip-hop",
    level: "Beginner",
    video_url: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // VIDEO FILE SELECT
  // ==========================================

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    console.log("🎥 Selected video:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Maximum file size: 100 MB
    const maxSize = 100 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage("❌ Video size must be less than 100 MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setVideoFile(null);
      return;
    }

    // Some Android devices/browsers may return an empty MIME type.
    // Check extension as a fallback.
    const fileName = file.name.toLowerCase();

    const validVideoExtension =
      fileName.endsWith(".mp4") ||
      fileName.endsWith(".webm") ||
      fileName.endsWith(".mov") ||
      fileName.endsWith(".m4v") ||
      fileName.endsWith(".avi") ||
      fileName.endsWith(".mkv");

    const validVideoType =
      file.type && file.type.startsWith("video/");

    if (!validVideoType && !validVideoExtension) {
      setMessage("❌ Please select a valid video file.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setVideoFile(null);
      return;
    }

    setMessage("");
    setVideoFile(file);

    // Clear manually entered URL
    setForm((previous) => ({
      ...previous,
      video_url: "",
    }));
  };

  // ==========================================
  // REMOVE VIDEO
  // ==========================================

  const removeVideo = () => {
    setVideoFile(null);
    setUploadProgress(0);
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // UPLOAD VIDEO TO CLOUDINARY
  // IMPORTANT:
  // DO NOT USE YOUR BACKEND AXIOS INSTANCE HERE.
  // ==========================================

  const uploadToCloudinary = async (file) => {
    const cloudName =
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();

    const uploadPreset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();

    console.log("☁️ Cloudinary configuration:", {
      cloudName: cloudName ? "Loaded" : "Missing",
      uploadPreset: uploadPreset ? "Loaded" : "Missing",
    });

    if (!cloudName) {
      throw new Error(
        "Cloudinary cloud name is missing. Check Vercel environment variable VITE_CLOUDINARY_CLOUD_NAME."
      );
    }

    if (!uploadPreset) {
      throw new Error(
        "Cloudinary upload preset is missing. Check Vercel environment variable VITE_CLOUDINARY_UPLOAD_PRESET."
      );
    }

    // IMPORTANT:
    // Use Cloudinary's direct upload endpoint.
    const cloudinaryUrl =
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("folder", "talent-hub/videos");

    console.log("☁️ Starting Cloudinary upload...");
    console.log("📁 File:", file.name);
    console.log("📦 Type:", file.type || "unknown");
    console.log("📏 Size:", file.size);

    /*
     * IMPORTANT:
     *
     * Do NOT use:
     *
     * axios.post(cloudinaryUrl, ...)
     *
     * because your axios instance may contain:
     *
     * withCredentials: true
     *
     * That causes Cloudinary CORS failure.
     *
     * fetch() does not send credentials by default.
     */

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: data,
      credentials: "omit",
    });

    let result = null;

    try {
      result = await response.json();
    } catch {
      throw new Error(
        "Cloudinary returned an invalid response."
      );
    }

    if (!response.ok) {
      console.error("❌ Cloudinary error:", result);

      throw new Error(
        result?.error?.message ||
          "Cloudinary upload failed."
      );
    }

    if (!result?.secure_url) {
      console.error(
        "❌ Cloudinary response:",
        result
      );

      throw new Error(
        "Cloudinary upload completed but no video URL was returned."
      );
    }

    console.log("✅ Cloudinary upload successful");
    console.log("🔗 Video URL:", result.secure_url);

    setUploadProgress(100);

    return result.secure_url;
  };

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    setUploadProgress(0);

    try {
      // ========================================
      // CHECK LOGIN
      // ========================================

      const token = localStorage.getItem("token");

      console.log(
        "🔑 Upload token exists:",
        !!token
      );

      if (!token) {
        setMessage(
          "❌ Please login before uploading a video."
        );

        setLoading(false);
        navigate("/login");
        return;
      }

      // ========================================
      // GET VIDEO URL
      // ========================================

      let videoUrl = form.video_url.trim();

      // ========================================
      // UPLOAD FILE TO CLOUDINARY
      // ========================================

      if (videoFile) {
        setMessage(
          "☁️ Uploading your video to Cloudinary..."
        );

        videoUrl = await uploadToCloudinary(videoFile);

        console.log(
          "✅ Cloudinary video URL:",
          videoUrl
        );
      }

      // ========================================
      // REQUIRE VIDEO
      // ========================================

      if (!videoUrl) {
        setMessage(
          "❌ Please select a video or enter a video URL."
        );

        setLoading(false);
        return;
      }

      // ========================================
      // SEND VIDEO DATA TO BACKEND
      // ========================================

      const postData = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        genre: form.genre,
        level: form.level,
        video_url: videoUrl,
      };

      console.log(
        "📤 Sending post data to backend:",
        postData
      );

      setMessage(
        "📤 Saving video information..."
      );

      /*
       * Your normal axios instance is correct HERE
       * because this request goes to your backend.
       */
      const response = await axios.post(
        "/posts",
        postData
      );

      console.log(
        "✅ Backend response:",
        response.data
      );

      // ========================================
      // SUCCESS
      // ========================================

      setMessage(
        "✅ Video uploaded successfully! Check your Talent Gallery."
      );

      // ========================================
      // RESET FORM
      // ========================================

      setForm({
        title: "",
        description: "",
        category: "Dance",
        genre: "Hip-hop",
        level: "Beginner",
        video_url: "",
      });

      setVideoFile(null);
      setUploadProgress(0);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // ========================================
      // GO TO TALENT GALLERY
      // ========================================

      setTimeout(() => {
        navigate("/talent");
      }, 1500);
    } catch (err) {
      console.error("❌ Upload error:", err);

      console.error(
        "Backend / Cloudinary response:",
        err.response?.data
      );

      // ========================================
      // AUTH ERROR
      // ========================================

      if (err.response?.status === 401) {
        setMessage(
          "❌ Your login session has expired. Please login again."
        );

        localStorage.removeItem("token");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      // ========================================
      // NETWORK ERROR
      // ========================================

      if (
        err.name === "TypeError" &&
        err.message === "Failed to fetch"
      ) {
        setMessage(
          "❌ Unable to connect to Cloudinary. Please check your Cloudinary configuration."
        );

        return;
      }

      // ========================================
      // OTHER ERROR
      // ========================================

      setMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "❌ Failed to upload video. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // OPEN VIDEO PICKER
  // ==========================================

  const openVideoPicker = () => {
    if (loading) {
      return;
    }

    fileInputRef.current?.click();
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div
        className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-3xl p-5 sm:p-8"
        style={{
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-200">
          Upload Your Talent
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* =================================
              TITLE
          ================================= */}

          <input
            type="text"
            name="title"
            placeholder="Video Title"
            value={form.title}
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-4 py-3 rounded-lg border bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* =================================
              DESCRIPTION
          ================================= */}

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-lg border bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* =================================
              CATEGORY / GENRE / LEVEL
          ================================= */}

          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-lg border bg-white text-black"
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
              className="flex-1 px-4 py-3 rounded-lg border bg-white text-black"
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
              className="flex-1 px-4 py-3 rounded-lg border bg-white text-black"
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

          {/* =================================
              VIDEO FILE
          ================================= */}

          <div className="space-y-3">
            <label className="block text-white font-semibold">
              Upload Video
            </label>

            {/*
              IMPORTANT FOR ANDROID:

              No capture="environment"

              This lets Android/browser open its normal
              file/photo/video picker instead of explicitly
              requesting the camera.
            */}

            <input
              ref={fileInputRef}
              id="video-file"
              type="file"
              accept="video/*,.mp4,.webm,.mov,.m4v"
              onChange={handleVideoChange}
              className="hidden"
            />

            {/* Custom picker button */}

            <button
              type="button"
              onClick={openVideoPicker}
              disabled={loading}
              className="w-full py-4 px-4 rounded-xl border-2 border-dashed border-white/40 bg-white/10 text-white font-semibold hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-2xl block mb-1">
                🎥
              </span>

              <span className="block">
                {videoFile
                  ? "Change Video"
                  : "Choose Video from Device"}
              </span>

              <span className="block text-xs text-gray-300 mt-1">
                Select a video from Gallery, Photos or Files
              </span>
            </button>

            {/* Selected video */}

            {videoFile && (
              <div className="rounded-xl bg-white/10 border border-white/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white text-sm break-all">
                      🎥 {videoFile.name}
                    </p>

                    <p className="text-gray-300 text-xs mt-1">
                      {(
                        videoFile.size /
                        (1024 * 1024)
                      ).toFixed(2)}{" "}
                      MB
                    </p>

                    <p className="text-gray-300 text-xs mt-1">
                      {videoFile.type || "Video"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removeVideo}
                    disabled={loading}
                    className="shrink-0 px-3 py-1 rounded-lg bg-red-500/80 text-white text-xs font-semibold hover:bg-red-600 disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =================================
              CLOUDINARY PROGRESS
          ================================= */}

          {loading &&
            videoFile &&
            uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>
                    Uploading video...
                  </span>

                  <span>
                    {uploadProgress}%
                  </span>
                </div>

                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>
              </div>
            )}

          {/* =================================
              OR VIDEO URL
          ================================= */}

          <div className="text-center text-gray-300 font-semibold">
            OR
          </div>

          <input
            type="url"
            name="video_url"
            placeholder="Video URL (YouTube/S3/Cloudinary link)"
            value={form.video_url}
            onChange={handleChange}
            disabled={!!videoFile || loading}
            className="w-full px-4 py-3 rounded-lg border bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />

          {/* =================================
              SUBMIT
          ================================= */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? videoFile
                ? `Uploading... ${uploadProgress}%`
                : "Uploading..."
              : "Upload Video"}
          </button>
        </form>

        {/* =================================
            MESSAGE
        ================================= */}

        {message && (
          <p
            className={`mt-4 text-center font-medium text-sm ${
              message.includes("✅")
                ? "text-green-300"
                : message.includes("☁️") ||
                  message.includes("📤")
                ? "text-yellow-300"
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


