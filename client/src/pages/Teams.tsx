import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChevronRight, Search } from "lucide-react";
import axios from "axios";

interface Team {
  _id: string;
  name: string;
  code: string;
  players?: number;
  category: string;
  logo?: string;
  country?: string;
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("International");

  const categories = ["International", "Domestic", "League", "Women"];

  // FETCH FROM BACKEND
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get("https://crickpluse.onrender.com/api/teams");
        setTeams(res.data);
      } catch (err) {
        console.error("Error fetching teams", err);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <Header />

      <div className="flex-1 max-w-5xl mx-auto w-full">
        {/* MOBILE HEADER */}
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <div className="px-4 pt-4 pb-2">
            <h1 className="text-lg sm:text-2xl font-bold text-white">
              Cricket Teams
            </h1>
          </div>

          <div className="overflow-x-auto">
            <div className="flex whitespace-nowrap px-6 py-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-3 text-sm font-semibold relative
              ${isActive ? "text-white" : "text-green-200"}`}
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
        <div className="hidden md:block">
          <div className="px-4 pt-4 pb-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Cricket Teams
            </h1>
          </div>

          <div className="py-3 px-2">
            <div className="grid grid-cols-2 sm:flex sm:overflow-x-auto gap-3 px-4">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`
              px-4 sm:px-5 py-1 rounded-full font-semibold whitespace-nowrap
              text-sm sm:text-base transition-all duration-300 ease-in-out
              transform hover:scale-105 hover:shadow-lg mb-2
              ${isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-indigo-100 text-gray-700 hover:bg-gray-200"
                      }
            `}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:p-4 md:pt-0 pt-3 md:pb-0 pb-[80px]">
          {/* SEARCH */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-4 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Teams"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* INTERNATIONAL */}
          {selectedCategory === "International" && (
            <>
              {/* TEST TEAMS */}
              <div className="bg-blue-200 px-4 py-2 font-bold text-gray-700 mb-4">
                TEST TEAMS
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 mb-10">
                {teams
                  .filter(
                    (team) => team.category.toLowerCase() === "international"
                  )
                  .filter((team) =>
                    team.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice(0, 12)
                  .map((team) => (
                    <div
                      key={team._id}
                      className="flex items-center justify-between py-4 border-b cursor-pointer hover:bg-gray-50 px-2"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://flagcdn.com/w40/${team.code}.png`}
                          alt={team.name}
                          className="w-10 h-6 object-cover"
                        />
                        <span className="text-lg">{team.name}</span>
                      </div>
                      <ChevronRight className="text-gray-500" size={22} />
                    </div>
                  ))}
              </div>

              {/* ASSOCIATE */}
              <div className="bg-blue-200 px-4 py-2 font-bold text-gray-700 mb-4">
                ASSOCIATE TEAMS
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                {teams
                  .filter(
                    (team) => team.category.toLowerCase() === "international"
                  )
                  .filter((team) =>
                    team.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice(12)
                  .map((team) => (
                    <div
                      key={team._id}
                      className="flex items-center justify-between py-4 border-b cursor-pointer hover:bg-gray-50 px-2"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://flagcdn.com/w40/${team.code}.png`}
                          alt={team.name}
                          className="w-10 h-6 object-cover"
                        />
                        <span className="text-lg">{team.name}</span>
                      </div>
                      <ChevronRight className="text-gray-500" size={22} />
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* OTHER */}
          {selectedCategory !== "International" && (
            <>
              <div className="bg-blue-200 px-4 py-2 font-bold text-gray-700 mb-4">
                {selectedCategory.toUpperCase()} TEAMS
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                {teams
                  .filter(
                    (team) =>
                      team.category.toLowerCase() === selectedCategory.toLowerCase()
                  )
                  .filter((team) =>
                    team.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((team) => (
                    <div
                      key={team._id}
                      className="flex items-center justify-between py-2 border-b cursor-pointer hover:bg-gray-50 px-2"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            team.logo
                              ? team.logo
                              : `https://flagcdn.com/w40/${team.code}.png`
                          }
                          alt={team.name}
                          className="w-10 h-14 object-contain"
                        />
                        <span className="text-lg">{team.name}</span>
                      </div>
                      <ChevronRight className="text-gray-500" size={22} />
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Teams;