import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Video {
  _id?: string;
  id?: string;
  title: string;
  image: string;
  url: string;
}

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <p className="text-center py-10">Loading videos...</p>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:pb-0 pb-20 bg-gray-100 md:bg-gray-50">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <section className="md:py-10 py-3 px-2 sm:px-6 max-w-7xl mx-auto flex-1">
        <h2 className="md:text-2xl text-lg font-bold md:mb-8 mb-4  text-blue-700 border-l-4 border-blue-500 pl-3">
          All Cricket Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video._id || video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow overflow-hidden flex flex-col hover:shadow-lg transition"
            >
              <div className="h-56 relative">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />

                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-10 h-10 bg-gray-800 rounded-full p-2"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold mb-1">{video.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Videos;