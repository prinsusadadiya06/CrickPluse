import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const Archive: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState("international");
  const [categories, setCategories] = useState<string[]>([]);

  const [yearGroups, setYearGroups] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [openYear, setOpenYear] = useState(false);

  const [data, setData] = useState<any>({});

  const [search, setSearch] = useState("");

  // FETCH META
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [catRes, yearRes] = await Promise.all([
          axios.get("http://localhost:5000/api/archive/categories"),
          axios.get("http://localhost:5000/api/archive/years")
        ]);

        if (Array.isArray(catRes.data)) {

          const ordered = ["international", "league", "domestic", "women"];

          const sortedCategories = ordered.filter(c =>
            catRes.data.includes(c)
          );

          setCategories(sortedCategories);

          // default always international
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
      }
    };

    fetchMeta();
  }, []);

  // FETCH DATA
  useEffect(() => {
    if (selectedYear !== null && selectedCategory) {
      fetchArchive();
    }
  }, [selectedCategory, selectedYear]);

  const fetchArchive = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/archive", {
        params: {
          year: selectedYear,
        }
      });

      setData(res.data || {});
    } catch (err) {
      console.log(err);
    }
  };

  //  SECTION WITH SEARCH FILTER
  const Section = ({ title, items }: { title: string; items: any[] }) => (
    <div className="flex pb-3">
      <div className="hidden md:block w-[120px] shrink-0 font-bold text-blue-600 text-[15px] pt-4">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </div>
      <div className="flex-1">
        {items
          ?.filter((item) =>
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

  const allYears = yearGroups.flatMap(group => group.years);

  return (
    <div className="bg-[#ECF0F1] md:pb-0 pb-[63px] min-h-screen">
      <Header />

      {/* MOBILE CATEGORY */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-lg font-bold">Cricket Match Archives</h1>
        </div>

        <div className="overflow-x-auto">
          <div className="flex whitespace-nowrap px-4 py-2">
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

      {/* YEAR FILTER (MOBILE) */}
      <div className="md:hidden flex flex-col gap-2 ps-4 pr-2">

        <div className="flex justify-end relative">
          <button
            onClick={() => setOpenYear(!openYear)}
            className="px-3 mt-2 py-2 border border-gray-300 rounded-md bg-blue-600 text-white flex items-center gap-1"
          >
            {selectedYear ?? "Year"}

            <svg
              className={`w-4 h-4 ${openYear ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
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

        {/* SEARCH BAR */}
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

      {/* MAIN CONTENT */}
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
                .filter((key) => {
                  // mobile only selected category
                  if (window.innerWidth < 768) {
                    return key === selectedCategory;
                  }
                  // desktop all category
                  return true;
                })
                .map((key) => (
                  <Section key={key} title={key} items={data[key]} />
                ))}
            </div>

          </div>

          {/* SIDEBAR DESKTOP */}
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

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Archive;