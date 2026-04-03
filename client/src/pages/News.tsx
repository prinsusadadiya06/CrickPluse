import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const News: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [specials, setSpecials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://crickpluse.onrender.com/api/news");
      const specialRes = await axios.get("https://crickpluse.onrender.com/api/specials");

      setNews(res.data);
      setSpecials(specialRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ECF0F1] min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col">
        {/* FULL SCREEN LOADER */}
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

              <p className="mt-2 text-sm text-blue-600 text-center">
                Loading News...
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:py-8 md:pb-0 pb-[95px] space-y-8 md:space-y-16">
            {/* Latest News Section */}
            <section>
              <h2 className="md:text-2xl text-lg font-bold mb-4 md:mb-8 mt-4 md:mt-0 text-blue-700 border-l-4 border-blue-500 pl-3">
                Latest News
              </h2>

              <div className="flex flex-col space-y-3 md:space-y-4">
                {news.map((item) => (
                  <Link
                    key={item._id}
                    to={`/details/news/${item._id}`}
                    className="flex flex-row flex-wrap bg-white border-b border-gray-200 py-3 px-2 md:flex-nowrap md:shadow-md md:rounded-md md:overflow-hidden md:h-auto md:px-0 md:py-0 md:border-none transition-transform hover:scale-[1.01]"
                  >
                    {/* Image Container */}
                    <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0 md:w-1/3 md:h-full md:rounded-none">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-col ml-3 flex-1 md:w-2/3 md:p-4 md:ml-0 md:gap-2">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2 md:text-lg md:font-bold">
                        {item.title}
                      </h3>
                      <span className="text-xs text-gray-400 mt-1">
                        {item.time || "2h ago"}
                      </span>
                      <p className="hidden md:block text-gray-600 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Mobile Only Description */}
                    <p className="w-full text-gray-600 text-xs  mt-2 md:hidden line-clamp-2">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Special Stories Section */}
            <section>
              <h2 className="md:text-2xl text-lg font-bold mb-4 md:mb-8 mt-4 md:mt-0 text-blue-700 border-l-4 border-blue-500 pl-3">
                Special Stories
              </h2>

              <div className="flex flex-col space-y-3 md:space-y-4">
                {specials.map((item) => (
                  <Link
                    key={item._id}
                    to={`/details/special/${item._id}`}
                    className="flex flex-row flex-wrap bg-white border-b border-gray-200 py-3 px-2 md:flex-nowrap md:shadow-md md:rounded-md md:overflow-hidden md:h-auto md:px-0 md:py-0 md:border-none transition-transform hover:scale-[1.01]"
                  >
                    <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0 md:w-1/3 md:h-full md:rounded-none">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col ml-3 flex-1 md:w-2/3 md:p-4 md:ml-0 md:gap-2">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2 md:text-lg md:font-semibold">
                        {item.title}
                      </h3>
                      <span className="text-xs text-gray-400 mt-1">
                        {item.time || "2h ago"}
                      </span>
                      <p className="hidden md:block text-gray-600 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Mobile Only Description */}
                    <p className="w-full text-gray-600 text-xs line-clamp-2 mt-2 md:hidden line-clamp-2">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default News;