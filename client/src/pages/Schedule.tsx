import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import Footer from "../components/Footer";

const categories = [
  "International",
  "T20 League",
  "Domestic",
  "Women",
  "All Matches",
];

const Schedule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("International");
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch matches from backend
  const fetchMatches = async (category: string) => {
    try {
      setLoading(true);

      const res = await axios.get("https://crickpluse.onrender.com/api/matches", {
        params:
          category && category !== "All Matches"
            ? { category }
            : {},
      });

      setMatches(res.data);
    } catch (err) {
      console.error("Error fetching matches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches(selectedCategory);
  }, [selectedCategory]);

  // Group matches by date
  const matchesByDate = matches.reduce<Record<string, any[]>>((acc, match) => {
    if (!acc[match.date]) acc[match.date] = [];
    acc[match.date].push(match);
    return acc;
  }, {});

  const sortedDates = Object.keys(matchesByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="min-h-screen flex md:pb-0 pb-[95px] flex-col bg-white">
      <Header />

      {/* MOBILE HEADER */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-lg font-bold">Cricket Schedule</h1>
        </div>

        <div className="overflow-x-auto">
          <div className="flex whitespace-nowrap py-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-3 text-sm font-semibold relative ${isActive ? "text-white" : "text-green-200"
                    }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DESKTOP HEADER */}
      <div className="hidden md:block px-4 pt-4 pb-2 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">
          Cricket Schedule
        </h1>
      </div>

      {/* DESKTOP FILTER */}
      <div className="hidden md:block py-3 px-5">
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-gray-700"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {loading ? (
          <p className="text-center py-10">Loading matches...</p>
        ) : (
          <>
            {/* MOBILE UI */}
            <div className="md:hidden">
              {sortedDates.map((date) => (
                <div key={date}>
                  <div className="text-center font-bold bg-[#ECF0F1] py-2">
                    {date}
                  </div>

                  {matchesByDate[date].map((m, index, arr) => {
                    const showSeries =
                      index === 0 || m.series !== arr[index - 1].series;

                    const showLine =
                      index < arr.length - 1 &&
                      m.series === arr[index + 1].series;

                    return (
                      <div key={m._id || m.id}>
                        {showSeries && (
                          <div className="bg-[#d7e3e0] px-4 py-2 text-base font-bold uppercase text-gray-700 flex justify-between">
                            {m.series}
                            <span>›</span>
                          </div>
                        )}

                        <div className="bg-white px-4 py-3 border-b">
                          <div className="text-xs text-gray-500 mb-2">
                            {m.title}
                          </div>

                          <div className="flex items-center gap-3 py-1">
                            <img
                              src={`https://flagcdn.com/w40/${m.team1Code}.png`}
                              alt={m.team1}
                              className="w-6 h-4"
                            />
                            <span>{m.team1}</span>
                          </div>

                          <div className="flex items-center gap-3 py-1">
                            <img
                              src={`https://flagcdn.com/w40/${m.team2Code}.png`}
                              alt={m.team2}
                              className="w-6 h-4"
                            />
                            <span>{m.team2}</span>
                          </div>
                        </div>

                        {showLine && (
                          <div className="border-b border-gray-300 my-1"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* DESKTOP UI */}
            <div className="hidden md:block md:p-6 space-y-6">
              {sortedDates.length > 0 ? (
                sortedDates.map((date) => (
                  <div key={date}>
                    <h2 className="bg-gray-200 px-4 py-2 rounded font-semibold text-gray-700">
                      {date}
                    </h2>

                    <div className="mt-3 flex flex-col space-y-3">
                      {matchesByDate[date].map((m, index, arr) => {
                        const showSeries =
                          index === 0 || m.series !== arr[index - 1].series;

                        const showLine =
                          index < arr.length - 1 &&
                          m.series === arr[index + 1].series;

                        return (
                          <MatchCard
                            key={m._id || m.id}
                            match={m}
                            showSeries={showSeries}
                            showLine={showLine}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No matches found for "{selectedCategory}"
                </p>
              )}
            </div>
          </>
        )}
      </main>

      {/* FOOTER */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Schedule;