import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get(
          "https://crickpluse.onrender.com/api/matches"
        );

        const found = res.data.find(
          (m: any) => m.id?.toString() === id
        );

        setItem(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-2 text-sm text-blue-600">Loading LiveScore...</p>
        </div>
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
        {/* Match UI */}
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

          {/* VS */}
          <div className="flex flex-col items-center gap-2">
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
      </div>
    </div>
  );
};

export default MatchDetails;