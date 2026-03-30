import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const News: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [specials, setSpecials] = useState<any[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      const specialRes = await axios.get("http://localhost:5000/api/specials");

      const data = res.data;

      setNews(data);
      setSpecials(specialRes.data);

      setSpecials(specialRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#ECF0F1] min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto sm:px-6 md:py-8 md:pb-0 pb-[63px] space-y-0 md:space-y-16">

        {/* Latest News */}
        <section>
          <h2 className="md:text-2xl text-lg font-bold md:mb-8 mb-4 md:mt-0 mt-4 text-blue-700 border-l-4 border-blue-500 pl-3">
            Latest News
          </h2>

          <div className="flex flex-col space-y-0 md:space-y-4">
            {news.map((item) => (
              <Link
                key={item._id}
                to={`/details/news/${item._id}`}
                className="
                    flex flex-row flex-wrap
                    bg-white border-b border-gray-200 py-3 px-2  
                    md:flex-nowrap md:shadow-md md:rounded-md md:overflow-hidden md:h-auto md:px-0 md:py-0 md:border-none 
                  "
              >
                {/* Image */}
                <div className="
                        w-24 h-16 rounded overflow-hidden flex-shrink-0   
                        md:w-1/3 md:h-full md:rounded-none                
                    ">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="
                   flex flex-col ml-3 flex-1               
                   md:w-2/3 md:p-4 md:ml-0 md:gap-2        
                   ">
                  <h3 className="
                        font-semibold text-sm leading-tight line-clamp-2   
                        md:text-lg md:font-bold                           
                     ">
                    {item.title}
                  </h3>

                  {/* Time */}
                  <span className="text-xs text-gray-400 mt-1">
                    {item.time || "2h ago"}
                  </span>

                  {/* Desktop description */}
                  <p className="hidden md:block text-gray-600 text-sm line-clamp-4 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Mobile description */}
                <p className="w-full text-gray-600 text-xs line-clamp-2 mt-2 md:hidden">
                  {item.description}
                </p>

              </Link>
            ))}
          </div>
        </section>

        {/* Special Stories */}
        <section>
          <h2 className="md:text-2xl text-lg font-bold md:mb-8 mb-4 md:mt-0 mt-4 text-blue-700 border-l-4 border-blue-500 pl-3">
            Special Stories
          </h2>

          <div className="flex flex-col space-y-0 md:space-y-4">
            {specials.map((item) => (
              <Link
                key={item._id}
                to={`/details/special/${item._id}`}
                className="
                  flex flex-row flex-wrap
                  bg-white border-b border-gray-200 py-3 px-2
                  md:flex-nowrap md:shadow-md md:rounded-md md:overflow-hidden md:h-auto md:px-0 md:py-0 md:border-none
                "
              >

                {/* Image */}
                <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0 md:w-1/3 md:h-full md:rounded-none">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex flex-col ml-3 flex-1 md:w-2/3 md:p-4 md:ml-0 md:gap-2">
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2 md:text-lg md:font-semibold">
                    {item.title}
                  </h3>

                  {/* Time */}
                  <span className="text-xs text-gray-400 mt-1">
                    {item.time || "2h ago"}
                  </span>

                  {/* Desktop description */}
                  <p className="hidden md:block text-gray-600 text-sm line-clamp-4 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Mobile description */}
                <p className="w-full text-gray-600 text-xs line-clamp-2 mt-2 md:hidden">
                  {item.description}
                </p>

              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default News;