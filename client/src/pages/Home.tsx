import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Home: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [matches, setMatches] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // Normalize type 
  const normalizeType = (type: string, title: string) => {
    const t = (type || "").trim().toUpperCase();
    const ttl = (title || "").toUpperCase();

    if (t === "TEST" || ttl.includes("TEST")) return "TEST";
    if (t === "ODI") return "ODI";
    if (t === "T20") return "T20";

    return "OTHER";
  };

  // Fetch matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("https://crickpluse.onrender.com/api/matches");
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    fetchMatches();
  }, []);

  // Fetch NEWS
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://crickpluse.onrender.com/api/news");
        setNews(res.data);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  // Scroll logic
  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(true);
  };

  const scrollLeft = () => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: -344, behavior: "smooth" }); // 320 + gap
  };

  const scrollRight = () => {
    const el = sliderRef.current;
    if (!el) return;

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 50) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: 344, behavior: "smooth" }); // FIXED
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    checkScroll();
    slider.addEventListener("scroll", checkScroll);

    return () => {
      slider.removeEventListener("scroll", checkScroll);
    };
  }, [matches]);

  // video fetching from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("https://crickpluse.onrender.com/api/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  // Split matches
  const testMatches = matches.filter(
    (m) => normalizeType(m.type, m.title) === "TEST"
  );

  const odiMatches = matches.filter(
    (m) => normalizeType(m.type, m.title) === "ODI"
  );

  const t20Matches = matches.filter(
    (m) => normalizeType(m.type, m.title) === "T20"
  );

  const finalMatches = [
    ...testMatches.slice(0, 2),
    ...odiMatches.slice(0, 2),
    ...t20Matches.slice(0, 2),
  ];

  return (
    <div className="min-h-screen flex flex-col md:pb-0 pb-[50px] bg-gray-100 md:bg-gray-50">
      <Header />

      {/* MATCH SLIDER */}
     <section className="md:py-6 py-3 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-hidden">
        <h2 className="text-2xl font-bold mb-6">Matches</h2>

        {showLeft && (
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-[8%] bg-blue-600 text-white w-10 h-10 rounded-full shadow-lg z-10 items-center justify-center"
          >
            ❮
          </button>
        )}

        {showRight && (
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-[8%] bg-blue-600 text-white w-10 h-10 rounded-full shadow-lg z-10 items-center justify-center"
          >
            ❯
          </button>
        )}

        <div className="w-full overflow-hidden relative">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4 pr-6 w-full"
            style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: "16px", WebkitOverflowScrolling: "touch",overscrollBehaviorX: "contain" }}
          >
            {finalMatches.map((match: any) => {
              const isLive = match.status?.toLowerCase() === "live";
              const isUpcoming = match.status?.toLowerCase() === "upcoming";
              const isCompleted = !isLive && !isUpcoming;

              const type = normalizeType(match.type, match.title);

              const liveMessage = match.liveDetails || "Live";
              const stage = match.title?.includes(",")
                ? match.title.split(",")[1]?.trim()
                : "";

              const isIPLTeam = ["rcb", "mi", "csk", "kkr", "srh", "rr", "gt", "pbks", "dc", "lsg"];

              return (
                <Link
                  key={match._id || match.id}
                  to={`/details/match/${match.id}`}
                  className="relative flex-shrink-0 snap-start w-80 h-44 bg-white pt-8 px-5 pb-5 rounded-2xl shadow-md border flex flex-col justify-between"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <span className="absolute top-2 left-4 text-xs text-gray-500 w-[65%] truncate mt-2">
                    {stage ? `${stage} • ${match.series}` : match.series}
                  </span>

                  <span
                    className={`absolute top-4 right-4 px-1.5 py-0.5 rounded-3xl text-xs font-bold ${type === "ODI"
                      ? "bg-[#0579BC] text-white"
                      : type === "T20"
                        ? "bg-[#424242] text-white"
                        : type === "TEST"
                          ? "bg-pink-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                  >
                    {type}
                  </span>

                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            isIPLTeam.includes(match.team1Code?.toLowerCase())
                              ? `/team-logos/${match.team1Code.toLowerCase()}.png`
                              : `https://flagcdn.com/w40/${match.team1Code}.png`
                          }
                          alt={match.team1}
                          className="w-6 h-4 object-cover rounded-sm"
                        />
                        <span>{match.team1}</span>
                      </div>

                      {(isLive || isCompleted) && match.scores && (
                        <span className="font-semibold">
                          {match.scores.team1} ({match.overs.team1})
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            isIPLTeam.includes(match.team2Code?.toLowerCase())
                              ? `/team-logos/${match.team2Code.toLowerCase()}.png`
                              : `https://flagcdn.com/w40/${match.team2Code}.png`
                          }
                          alt={match.team2}
                          className="w-6 h-4 object-cover rounded-sm"
                        />
                        <span>{match.team2}</span>
                      </div>

                      {(isLive || isCompleted) && match.scores && (
                        <span className="font-semibold">
                          {match.scores.team2} ({match.overs.team2})
                        </span>
                      )}
                    </div>
                  </div>

                  {isLive && (
                    <p className="text-red-600 font-semibold mt-2">
                      {liveMessage}
                    </p>
                  )}

                  {isCompleted && (
                    <p className="text-[#4a90e2] font-semibold mt-2">
                      {match.status}
                    </p>
                  )}

                  {isUpcoming && (
                    <p className="text-orange-500 font-medium mt-2">
                      {match.time || match.score}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

      </section>

      {/* NEWS */}
      <section className="py-10 px-2 sm:px-6 max-w-7xl mx-auto mb-[50px] md:mb-0">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          Latest News
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item: any) => (
            <Link
              key={item._id || item.id}
              to={`/details/news/${item.id}`}
              className="bg-white rounded-xl shadow overflow-hidden flex flex-col"
            >
              <div className="h-56">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm ">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VIDEOS */}
      <section className="py-10 px-2 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          Latest Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 6).map((video: any) => (
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

export default Home;