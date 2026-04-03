import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const Archive: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState("international");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [yearGroups, setYearGroups] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [openYear, setOpenYear] = useState(false);

  const [data, setData] = useState<any>({});
  const [search, setSearch] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  // MOBILE DETECTION (SAFE FOR VERCEL)
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // FETCH META
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        setLoading(true);

        const [catRes, yearRes] = await Promise.all([
          axios.get("https://crickpluse.onrender.com/api/archive/categories"),
          axios.get("https://crickpluse.onrender.com/api/archive/years")
        ]);

        if (Array.isArray(catRes.data)) {
          const ordered = ["international", "league", "domestic", "women"];

          const sortedCategories = ordered.filter(c =>
            catRes.data.includes(c)
          );

          setCategories(sortedCategories);
          setSelectedCategory("international");
        }

        if (Array.isArray(yearRes.data)) {
          setYearGroups(yearRes.data);

          if (yearRes.data.length > 0 && yearRes.data[0].years.length > 0) {
            setSelectedYear(yearRes.data[0].years[0]);
          }
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeta();
  }, []);

  // FETCH DATA
  const fetchArchive = React.useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get("https://crickpluse.onrender.com/api/archive", {
        params: { year: selectedYear }
      });

      setData(res.data || {});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear !== null && selectedCategory) {
      fetchArchive();
    }
  }, [selectedCategory, selectedYear, fetchArchive]);

  // SECTION
  const Section = ({ title, items }: { title: string; items: any[] }) => (
    <div className="flex pb-3">
      <div className="hidden md:block w-[120px] shrink-0 font-bold text-blue-600 text-[15px] pt-4">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </div>
      <div className="flex-1">
        {(items || [])
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((item, idx) => (
            <div
              key={idx}
              className="flex items-start group border-b border-gray-200 pb-2 pt-4 last:border-0"
            >
              <h3 className="text-[14px] font-bold group-hover:underline cursor-pointer">
                {item.title}
                {item.isPostponed && (
                  <span className="text-[14px] font-bold">(Postponed)</span>
                )}
              </h3>

              <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap ml-4 pt-1">
                {item.dateRange}
              </span>
            </div>
          ))}
      </div>
    </div>
  );

  const allYears = yearGroups.flatMap(group => Array.isArray(group.years) ? group.years : []);

  return (
    <div className="bg-[#ECF0F1] md:pb-0 pb-[63px] min-h-screen">

      {/* Hide Header while loading */}
      {!loading && <Header />}

      {loading ? (
        // FULL SCREEN LOADER
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

            <p className="mt-2 text-sm text-blue-600 text-center">
              Loading Archives...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* MOBILE CATEGORY */}
          <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <div className="px-4 pt-4 pb-2">
              <h1 className="text-lg font-bold">Cricket Match Archives</h1>
            </div>

            <div className="overflow-x-auto">
              <div className="flex whitespace-nowrap px-6 py-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 mr-2 text-sm font-semibold relative ${isActive ? "text-white" : "text-green-200"
                        }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* YEAR FILTER */}
          <div className="md:hidden flex flex-col gap-2 ps-4 pr-2">

            <div className="flex justify-end relative">
              <button
                onClick={() => setOpenYear(!openYear)}
                className="px-3 mt-2 py-2 border border-gray-300 rounded-md bg-blue-600 text-white"
              >
                {selectedYear ?? "Year"}
              </button>

              {openYear && (
                <div className="absolute right-0 top-14 text-center py-3 px-4 w-24 bg-white border rounded-md shadow-xl max-h-56 overflow-y-auto z-50">
                  {allYears.map((year: number) => (
                    <div
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setOpenYear(false);
                      }}
                      className={`py-1 cursor-pointer ${year === selectedYear
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-200"
                        }`}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SEARCH */}
            <div className="pb-3">
              <input
                type="text"
                placeholder="Search series..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* MAIN */}
          <div className="max-w-[1000px] mx-auto bg-white p-4 md:p-8">
            <div className="flex flex-col md:flex-row gap-2">

              <div className="flex-1 md:border-r pr-4">

                <header className="hidden md:block mb-1">
                  <h1 className="text-[22px] font-bold mb-1">
                    Cricket Match Archives
                  </h1>
                  <h2 className="text-[20px] font-bold mt-3">
                    {selectedYear}
                  </h2>
                  <div className="border-t mt-2"></div>
                </header>

                <div className="space-y-3">
                  {Object.keys(data)
                    .filter((key) => (isMobile ? key === selectedCategory : true))
                    .map((key) => (
                      <Section key={key} title={key} items={data[key] || []} />
                    ))}
                </div>

              </div>

              {/* SIDEBAR */}
              <aside className="hidden md:block w-[280px]">
                <h2 className="text-base font-bold mb-3 border-b pb-1">
                  ALL SEASONS
                </h2>

                {yearGroups.map(group => (
                  <div key={group._id}>
                    <h3 className="mb-2 text-sm font-bold">{group.range}</h3>

                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {group.years.map((year: number) => (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className={`p-2 text-xs ${year === selectedYear
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-gray-300"
                            }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </aside>

            </div>
          </div>

          {/* FOOTER */}
          <div className="hidden md:block">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Archive;