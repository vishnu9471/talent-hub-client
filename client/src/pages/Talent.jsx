// import React, { useEffect, useState } from "react";
// import axios from "../services/api";
// import { Link } from "react-router-dom";

// const Talent = () => {
//   const [videos, setVideos] = useState([]);
//   const [filteredVideos, setFilteredVideos] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({
//     category: "All",
//     genre: "All",
//     level: "All",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const categories = ["All", "Dance", "Singing", "Instrument"];
//   const genres = ["All", "Hip-hop", "Classical", "Jazz", "Pop"];
//   const levels = ["All", "Beginner", "Intermediate", "Advanced"];

//   // Fetch uploaded videos
//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`/videos/get-all-video`);
//         if (Array.isArray(res.data)) {
//           setVideos(res.data);
//           setFilteredVideos(res.data);
//         } else {
//           setError("Unexpected response format");
//         }
//       } catch (err) {
//         setError("Failed to fetch videos.");
//         console.error("Failed to fetch videos", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, []);

//   // Filter videos based on search and dropdowns
//   useEffect(() => {
//     const filtered = videos.filter((v) => {
//       return (
//         (filters.category === "All" || v.category === filters.category) &&
//         (filters.genre === "All" || v.genre === filters.genre) &&
//         (filters.level === "All" || v.level === filters.level) &&
//         (v.title?.toLowerCase().includes(search.toLowerCase()) ||
//           v.description?.toLowerCase().includes(search.toLowerCase()))
//       );
//     });
//     setFilteredVideos(filtered);
//   }, [search, filters, videos]);

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="px-6 py-10">
//       <h1 className="text-3xl font-bold mb-6 text-center text-red-100">🎭 Talent Gallery</h1>

//       {/* Search & Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
//         <input
//           type="text"
//           placeholder="🔍 Search by title or description..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded-md w-full md:w-1/3 bg-white text-black"
//         />

//         <select
//           name="category"
//           value={filters.category}
//           onChange={handleFilterChange}
//           className="px-4 py-2 border rounded-md bg-white text-black"
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>

//         <select
//           name="genre"
//           value={filters.genre}
//           onChange={handleFilterChange}
//           className="px-4 py-2 border rounded-md bg-white text-black"
//         >
//           {genres.map((g) => (
//             <option key={g} value={g}>
//               {g}
//             </option>
//           ))}
//         </select>

//         <select
//           name="level"
//           value={filters.level}
//           onChange={handleFilterChange}
//           className="px-4 py-2 border rounded-md bg-white text-black"
//         >
//           {levels.map((lvl) => (
//             <option key={lvl} value={lvl}>
//               {lvl}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Loading State */}
//       {loading && <p className="text-center text-gray-500">Loading videos...</p>}

//       {/* Error State */}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {/* Video Cards */}
//       {filteredVideos.length === 0 && !loading ? (
//         <p className="text-center text-gray-500">No videos found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredVideos.map((video) => (
//             <div
//               key={video._id}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
//             >
//               <div className="relative pb-[56.25%]">
//                 {video.video_url.includes("youtube.com") ||
//                 video.video_url.includes("youtu.be") ? (
//                   <iframe
//                     className="absolute top-0 left-0 w-full h-full"
//                     src={
//                       video.video_url.includes("watch?v=")
//                         ? video.video_url.replace("watch?v=", "embed/") 
//                         : video.video_url.replace("youtu.be/", "youtube.com/embed/")
//                     }
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     title={video.title}
//                   ></iframe>
//                 ) : (
//                   <video
//                     src={video.video_url}
//                     controls
//                     className="absolute top-0 left-0 w-full h-full object-cover"
//                   />
//                 )}
//               </div>
//               <div className="p-4 space-y-1">
//                 <h2 className="text-lg font-bold truncate">{video.title}</h2>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">
//                   {video.description}
//                 </p>
//                 <p className="text-sm">🎵 Genre: {video.genre}</p>
//                 <p className="text-sm">📈 Level: {video.level}</p>

//                 {video.user_id && (
//                   <Link
//                     to={`/profile/${video.user_id}`}
//                     className="inline-block text-indigo-600 hover:underline text-sm mt-2"
//                   >
//                     View Uploader Profile →
//                   </Link>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Talent;

















// import React, { useEffect, useState } from "react";
// import axios from "../services/api";
// import { Link } from "react-router-dom";

// const Talent = () => {
//   const [videos, setVideos] = useState([]);
//   const [filteredVideos, setFilteredVideos] = useState([]);

//   const [search, setSearch] = useState("");

//   const [filters, setFilters] = useState({
//     category: "All",
//     genre: "All",
//     level: "All",
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ============================================
//   // FILTER OPTIONS
//   // ============================================

//   const categories = [
//     "All",
//     "dance",
//     "singing",
//     "instrument",
//   ];

//   const genres = [
//     "All",
//     "Hip-Hop",
//     "Jazz",
//     "Classical",
//     "Pop",
//     "Rock",
//   ];

//   const levels = [
//     "All",
//     "Beginner",
//     "Intermediate",
//     "Advanced",
//   ];

//   // ============================================
//   // FETCH ALL TALENT VIDEOS
//   // ============================================

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         console.log("🎬 Fetching all talent videos...");

//         // IMPORTANT:
//         // Backend route:
//         // app.use("/api/posts", postRoutes)
//         //
//         // postRoutes:
//         // router.get("/videos", postController.getAllVideos)

//         const res = await axios.get("/posts/videos");

//         console.log("📥 Talent Gallery response:", res.data);

//         if (Array.isArray(res.data)) {
//           setVideos(res.data);
//         } else if (Array.isArray(res.data?.videos)) {
//           setVideos(res.data.videos);
//         } else {
//           console.error("Unexpected response:", res.data);
//           setVideos([]);
//           setError("Unexpected response from server.");
//         }
//       } catch (err) {
//         console.error("❌ Failed to fetch talent videos:", err);

//         console.error(
//           "Backend response:",
//           err.response?.data
//         );

//         setError(
//           err.response?.data?.error ||
//             "Failed to load talent videos."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   // ============================================
//   // FILTER VIDEOS
//   // ============================================

//   useEffect(() => {
//     const searchText = search.toLowerCase().trim();

//     const filtered = videos.filter((video) => {
//       const title = video.title?.toLowerCase() || "";
//       const description =
//         video.description?.toLowerCase() || "";

//       const category =
//         video.category?.toLowerCase() || "";

//       const genre =
//         video.genre?.toLowerCase() || "";

//       const level =
//         video.level?.toLowerCase() || "";

//       const selectedCategory =
//         filters.category.toLowerCase();

//       const selectedGenre =
//         filters.genre.toLowerCase();

//       const selectedLevel =
//         filters.level.toLowerCase();

//       const matchesSearch =
//         !searchText ||
//         title.includes(searchText) ||
//         description.includes(searchText);

//       const matchesCategory =
//         filters.category === "All" ||
//         category === selectedCategory;

//       const matchesGenre =
//         filters.genre === "All" ||
//         genre === selectedGenre;

//       const matchesLevel =
//         filters.level === "All" ||
//         level === selectedLevel;

//       return (
//         matchesSearch &&
//         matchesCategory &&
//         matchesGenre &&
//         matchesLevel
//       );
//     });

//     setFilteredVideos(filtered);
//   }, [videos, search, filters]);

//   // ============================================
//   // HANDLE FILTER CHANGE
//   // ============================================

//   const handleFilterChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ============================================
//   // YOUTUBE URL CONVERTER
//   // ============================================

//   const getYouTubeEmbedUrl = (url) => {
//     if (!url) return null;

//     try {
//       const parsedUrl = new URL(url);

//       // youtube.com/watch?v=VIDEO_ID
//       if (
//         parsedUrl.hostname.includes("youtube.com") &&
//         parsedUrl.searchParams.get("v")
//       ) {
//         const videoId = parsedUrl.searchParams.get("v");

//         return `https://www.youtube.com/embed/${videoId}`;
//       }

//       // youtu.be/VIDEO_ID
//       if (parsedUrl.hostname === "youtu.be") {
//         const videoId = parsedUrl.pathname.substring(1);

//         if (videoId) {
//           return `https://www.youtube.com/embed/${videoId}`;
//         }
//       }

//       // Already embed URL
//       if (
//         parsedUrl.hostname.includes("youtube.com") &&
//         parsedUrl.pathname.startsWith("/embed/")
//       ) {
//         return url;
//       }

//       return null;
//     } catch (error) {
//       return null;
//     }
//   };

//   // ============================================
//   // LOADING
//   // ============================================

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>

//           <p className="text-gray-600 dark:text-gray-300">
//             Loading talent videos...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ============================================
//   // MAIN PAGE
//   // ============================================

//   return (
//     <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

//       {/* ========================================
//           HEADER
//       ======================================== */}

//       <div className="max-w-7xl mx-auto mb-10 text-center">

//         <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
//           🎭 Talent Gallery
//         </h1>

//         <p className="text-gray-600 dark:text-gray-400">
//           Discover amazing performances from our talented creators.
//         </p>

//       </div>

//       {/* ========================================
//           ERROR
//       ======================================== */}

//       {error && (
//         <div className="max-w-4xl mx-auto mb-8 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-center">
//           {error}
//         </div>
//       )}

//       {/* ========================================
//           SEARCH + FILTERS
//       ======================================== */}

//       <div className="max-w-7xl mx-auto mb-10">

//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">

//           <div className="flex flex-col lg:flex-row gap-4">

//             {/* SEARCH */}

//             <input
//               type="text"
//               placeholder="🔍 Search by title or description..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
//             />

//             {/* CATEGORY */}

//             <select
//               name="category"
//               value={filters.category}
//               onChange={handleFilterChange}
//               className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
//             >
//               {categories.map((category) => (
//                 <option
//                   key={category}
//                   value={category}
//                 >
//                   {category === "All"
//                     ? "All Categories"
//                     : category.charAt(0).toUpperCase() +
//                       category.slice(1)}
//                 </option>
//               ))}
//             </select>

//             {/* GENRE */}

//             <select
//               name="genre"
//               value={filters.genre}
//               onChange={handleFilterChange}
//               className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
//             >
//               {genres.map((genre) => (
//                 <option
//                   key={genre}
//                   value={genre}
//                 >
//                   {genre === "All"
//                     ? "All Genres"
//                     : genre}
//                 </option>
//               ))}
//             </select>

//             {/* LEVEL */}

//             <select
//               name="level"
//               value={filters.level}
//               onChange={handleFilterChange}
//               className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
//             >
//               {levels.map((level) => (
//                 <option
//                   key={level}
//                   value={level}
//                 >
//                   {level === "All"
//                     ? "All Levels"
//                     : level}
//                 </option>
//               ))}
//             </select>

//           </div>

//         </div>

//       </div>

//       {/* ========================================
//           VIDEO COUNT
//       ======================================== */}

//       <div className="max-w-7xl mx-auto mb-5">

//         <p className="text-gray-600 dark:text-gray-400">
//           Showing{" "}
//           <span className="font-semibold text-indigo-600 dark:text-indigo-400">
//             {filteredVideos.length}
//           </span>{" "}
//           {filteredVideos.length === 1
//             ? "video"
//             : "videos"}
//         </p>

//       </div>

//       {/* ========================================
//           NO VIDEOS
//       ======================================== */}

//       {filteredVideos.length === 0 ? (
//         <div className="max-w-7xl mx-auto">

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">

//             <div className="text-6xl mb-4">
//               🎬
//             </div>

//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
//               No Videos Found
//             </h2>

//             <p className="text-gray-500 dark:text-gray-400">
//               There are no videos matching your search or filters.
//             </p>

//           </div>

//         </div>
//       ) : (

//         /* ========================================
//            VIDEO GRID
//         ======================================== */

//         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

//           {filteredVideos.map((video) => {

//             const youtubeUrl =
//               getYouTubeEmbedUrl(video.video_url);

//             return (
//               <div
//                 key={video._id || video.id}
//                 className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
//               >

//                 {/* ==================================
//                     VIDEO
//                 ================================== */}

//                 <div className="relative aspect-video bg-black">

//                   {youtubeUrl ? (

//                     <iframe
//                       className="absolute inset-0 w-full h-full"
//                       src={youtubeUrl}
//                       title={video.title || "Talent video"}
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />

//                   ) : (

//                     <video
//                       src={video.video_url}
//                       controls
//                       className="absolute inset-0 w-full h-full object-cover"
//                     />

//                   )}

//                 </div>

//                 {/* ==================================
//                     VIDEO INFORMATION
//                 ================================== */}

//                 <div className="p-5">

//                   <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate mb-2">
//                     {video.title || "Untitled Video"}
//                   </h2>

//                   {video.description && (
//                     <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
//                       {video.description}
//                     </p>
//                   )}

//                   {/* CATEGORY */}

//                   {video.category && (
//                     <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
//                       🎭 Category:{" "}
//                       <span className="font-medium">
//                         {video.category}
//                       </span>
//                     </p>
//                   )}

//                   {/* GENRE */}

//                   {video.genre && (
//                     <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
//                       🎵 Genre:{" "}
//                       <span className="font-medium">
//                         {video.genre}
//                       </span>
//                     </p>
//                   )}

//                   {/* LEVEL */}

//                   {video.level && (
//                     <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
//                       📈 Level:{" "}
//                       <span className="font-medium">
//                         {video.level}
//                       </span>
//                     </p>
//                   )}

//                   {/* USER PROFILE */}

//                   {video.user_id && (
//                     <Link
//                       to={`/profile/${video.user_id}`}
//                       className="inline-block text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
//                     >
//                       View Uploader Profile →
//                     </Link>
//                   )}

//                 </div>

//               </div>
//             );
//           })}

//         </div>
//       )}

//     </div>
//   );
// };

// export default Talent;

import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

const Talent = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "All",
    genre: "All",
    level: "All",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================
  // FILTER OPTIONS
  // ============================================

  const categories = [
    "All",
    "dance",
    "singing",
    "instrument",
  ];

  const genres = [
    "All",
    "Hip-Hop",
    "Jazz",
    "Classical",
    "Pop",
    "Rock",
  ];

  const levels = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  // ============================================
  // CLOUDINARY PLAYABLE VIDEO URL
  // ============================================

  const getPlayableVideoUrl = (url) => {
    if (!url) return "";

    // Cloudinary video
    if (
      url.includes("res.cloudinary.com") &&
      url.includes("/video/upload/")
    ) {
      // Don't add transformation twice
      if (
        url.includes("f_mp4") ||
        url.includes("vc_h264") ||
        url.includes("ac_aac")
      ) {
        return url;
      }

      return url.replace(
        "/video/upload/",
        "/video/upload/f_mp4,vc_h264,ac_aac/"
      );
    }

    return url;
  };

  // ============================================
  // YOUTUBE URL CONVERTER
  // ============================================

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    try {
      const parsedUrl = new URL(url);

      // youtube.com/watch?v=VIDEO_ID
      if (
        parsedUrl.hostname.includes("youtube.com") &&
        parsedUrl.searchParams.get("v")
      ) {
        const videoId = parsedUrl.searchParams.get("v");

        return `https://www.youtube.com/embed/${videoId}`;
      }

      // youtu.be/VIDEO_ID
      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.substring(1);

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      // Already embed URL
      if (
        parsedUrl.hostname.includes("youtube.com") &&
        parsedUrl.pathname.startsWith("/embed/")
      ) {
        return url;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  // ============================================
  // FETCH ALL TALENT VIDEOS
  // ============================================

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("🎬 Fetching all talent videos...");

        const res = await axios.get("/posts/videos");

        console.log("📥 Talent Gallery response:", res.data);

        if (Array.isArray(res.data)) {
          setVideos(res.data);
        } else if (Array.isArray(res.data?.videos)) {
          setVideos(res.data.videos);
        } else {
          console.error("Unexpected response:", res.data);

          setVideos([]);
          setError("Unexpected response from server.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch talent videos:", err);

        console.error(
          "Backend response:",
          err.response?.data
        );

        setError(
          err.response?.data?.error ||
            "Failed to load talent videos."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // ============================================
  // FILTER VIDEOS
  // ============================================

  useEffect(() => {
    const searchText = search.toLowerCase().trim();

    const filtered = videos.filter((video) => {
      const title =
        video.title?.toLowerCase() || "";

      const description =
        video.description?.toLowerCase() || "";

      const category =
        video.category?.toLowerCase() || "";

      const genre =
        video.genre?.toLowerCase() || "";

      const level =
        video.level?.toLowerCase() || "";

      const selectedCategory =
        filters.category.toLowerCase();

      const selectedGenre =
        filters.genre.toLowerCase();

      const selectedLevel =
        filters.level.toLowerCase();

      const matchesSearch =
        !searchText ||
        title.includes(searchText) ||
        description.includes(searchText);

      const matchesCategory =
        filters.category === "All" ||
        category === selectedCategory;

      const matchesGenre =
        filters.genre === "All" ||
        genre === selectedGenre;

      const matchesLevel =
        filters.level === "All" ||
        level === selectedLevel;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGenre &&
        matchesLevel
      );
    });

    setFilteredVideos(filtered);
  }, [videos, search, filters]);

  // ============================================
  // HANDLE FILTER CHANGE
  // ============================================

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // VIDEO ERROR HANDLER
  // ============================================

  const handleVideoError = (e, video) => {
    console.error(
      "❌ Video playback error:",
      video?.video_url
    );

    console.error(
      "Video element error:",
      e.currentTarget.error
    );
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 dark:text-gray-300">
            Loading talent videos...
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN PAGE
  // ============================================

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          🎭 Talent Gallery
        </h1>

        <p className="text-gray-600 dark:text-gray-400">
          Discover amazing performances from our talented creators.
        </p>
      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="max-w-4xl mx-auto mb-8 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* ========================================
          SEARCH + FILTERS
      ======================================== */}

      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-5">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* SEARCH */}

            <input
              type="text"
              placeholder="🔍 Search by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-0 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* CATEGORY */}

            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full lg:w-auto px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category === "All"
                    ? "All Categories"
                    : category.charAt(0).toUpperCase() +
                      category.slice(1)}
                </option>
              ))}
            </select>

            {/* GENRE */}

            <select
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
              className="w-full lg:w-auto px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
            >
              {genres.map((genre) => (
                <option
                  key={genre}
                  value={genre}
                >
                  {genre === "All"
                    ? "All Genres"
                    : genre}
                </option>
              ))}
            </select>

            {/* LEVEL */}

            <select
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
              className="w-full lg:w-auto px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
            >
              {levels.map((level) => (
                <option
                  key={level}
                  value={level}
                >
                  {level === "All"
                    ? "All Levels"
                    : level}
                </option>
              ))}
            </select>

          </div>
        </div>
      </div>

      {/* ========================================
          VIDEO COUNT
      ======================================== */}

      <div className="max-w-7xl mx-auto mb-5">
        <p className="text-gray-600 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {filteredVideos.length}
          </span>{" "}
          {filteredVideos.length === 1
            ? "video"
            : "videos"}
        </p>
      </div>

      {/* ========================================
          NO VIDEOS
      ======================================== */}

      {filteredVideos.length === 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">

            <div className="text-6xl mb-4">
              🎬
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              No Videos Found
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              There are no videos matching your search or filters.
            </p>

          </div>
        </div>
      ) : (

        /* ========================================
           VIDEO GRID
        ======================================== */

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredVideos.map((video) => {

            const youtubeUrl =
              getYouTubeEmbedUrl(video.video_url);

            const playableVideoUrl =
              getPlayableVideoUrl(video.video_url);

            return (
              <div
                key={video._id || video.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >

                {/* ==================================
                    VIDEO
                ================================== */}

                <div className="relative aspect-video bg-black overflow-hidden">

                  {/* ================================
                      YOUTUBE
                  ================================= */}

                  {youtubeUrl ? (

                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={youtubeUrl}
                      title={
                        video.title ||
                        "Talent video"
                      }
                      frameBorder="0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />

                  ) : (

                    /* ================================
                       CLOUDINARY / NORMAL VIDEO
                    ================================= */

                    <video
                      src={playableVideoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover bg-black"
                      onError={(e) =>
                        handleVideoError(e, video)
                      }
                    >
                      Your browser does not support
                      HTML5 video.
                    </video>

                  )}

                </div>

                {/* ==================================
                    VIDEO INFORMATION
                ================================== */}

                <div className="p-5">

                  <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate mb-2">
                    {video.title ||
                      "Untitled Video"}
                  </h2>

                  {video.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {video.description}
                    </p>
                  )}

                  {/* CATEGORY */}

                  {video.category && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      🎭 Category:{" "}
                      <span className="font-medium">
                        {video.category}
                      </span>
                    </p>
                  )}

                  {/* GENRE */}

                  {video.genre && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      🎵 Genre:{" "}
                      <span className="font-medium">
                        {video.genre}
                      </span>
                    </p>
                  )}

                  {/* LEVEL */}

                  {video.level && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      📈 Level:{" "}
                      <span className="font-medium">
                        {video.level}
                      </span>
                    </p>
                  )}

                  {/* USER PROFILE */}

                  {video.user_id && (
                    <Link
                      to={`/profile/${video.user_id}`}
                      className="inline-block text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
                    >
                      View Uploader Profile →
                    </Link>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default Talent;