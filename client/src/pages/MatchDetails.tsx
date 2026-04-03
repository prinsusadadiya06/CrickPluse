import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const MatchDetails: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();

  const [matches, setMatches] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  //Backend API
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [matchRes, newsRes, videoRes] = await Promise.all([
          axios.get("https://crickpluse.onrender.com/api/matches"),
          axios.get("https://crickpluse.onrender.com/api/news"),
          axios.get("https://crickpluse.onrender.com/api/videos"),
        ]);

        setMatches(matchRes.data);
        setNews(newsRes.data);
        setVideos(videoRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  let item: any = null;

  // Find the item based on type
  switch (type) {
    case "match":
      item = matches.find((m) => m.id?.toString() === id);
      break;
    case "news":
      item = news.find((n) => n.id?.toString() === id);
      break;
    case "video":
      item = videos.find((v) => v.id?.toString() === id);
      break;
    default:
      item = null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!item)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
        <Link to="/" className="text-blue-600 underline">
          Go Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="max-w-2xl w-full mx-auto p-4 sm:p-6 lg:p-8 mt-8 bg-white rounded-3xl shadow-lg">
        {type === "match" ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Team 1 */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={`https://flagcdn.com/w80/${item.team1Code}.png`}
                alt={item.team1}
                className="w-16 h-10 sm:w-20 sm:h-12 object-cover rounded-sm"
              />
              <span className="text-lg font-semibold">{item.team1}</span>
              {item.scores?.team1 && (
                <span className="text-2xl font-bold">
                  {item.scores.team1}
                </span>
              )}
            </div>

            {/* VS & Status */}
            <div className="flex flex-col items-center gap-2 my-4 md:my-0">
              <span className="text-2xl font-bold text-gray-500">vs</span>
              <span
                className={`text-lg font-medium ${item.status.toLowerCase().includes("live")
                    ? "text-green-600"
                    : item.status.toLowerCase().includes("upcoming")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
              >
                {item.status}
              </span>
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={`https://flagcdn.com/w80/${item.team2Code}.png`}
                alt={item.team2}
                className="w-16 h-10 sm:w-20 sm:h-12 object-cover rounded-sm"
              />
              <span className="text-lg font-semibold">{item.team2}</span>
              {item.scores?.team2 && (
                <span className="text-2xl font-bold">
                  {item.scores.team2}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">
              {item.title}
            </h1>

            {/* Image */}
            {item.image && (
              <div className="w-full rounded-xl shadow-md overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto max-h-[500px] object-cover object-center"
                  onError={(e: any) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />

                {/* Video */}
                {type === "video" && item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-20 h-20 bg-black/60 rounded-full flex items-center justify-center hover:scale-110 transition">
                      <div className="ml-1 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-white"></div>
                    </div>
                  </a>
                )}
              </div>
            )}

            {/* Description */}
            {item.description && (
              <div className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <div
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;