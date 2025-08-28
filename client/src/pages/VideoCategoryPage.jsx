import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

// Helper function to extract YouTube video ID
const extractYouTubeID = (url) => {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

const VideoCategoryPage = () => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/category/${category}`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [category]);

  if (loading) {
    return <p className="text-center mt-12 text-gray-600">Loading videos...</p>;
  }

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 capitalize text-red-100">
        {decodeURIComponent(category)} Videos
      </h1>
      {videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => {
            const youtubeID = extractYouTubeID(video.video_url);
            return (
              <div
                key={video._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="aspect-video">
                  {youtubeID ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${youtubeID}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <video
                      src={video.video_url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold dark:text-white">{video.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{video.author}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {video.genre} • {video.level}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VideoCategoryPage;
