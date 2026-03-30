import React from "react";

interface Match {
  id: string;
  date: string;
  series: string;
  title: string;
  venue: string;
  time: string;
  gmtTime: string;
}

interface Props {
  match: Match;
  showSeries: boolean;
  showLine?: boolean;
}

const MatchCard: React.FC<Props> = ({ match, showSeries, showLine }) => {
  return (
    <div className="flex flex-col w-full p-4 bg-white">

      {/* Top Row: Left, Center, Right */}
      <div className="flex w-full items-start">

        {/* Left Section - Series */}
        <div className="flex-shrink-0 w-[30%] text-left">
          {showSeries && (
            <p className="text-gray-800 font-bold text-sm sm:text-base">
              {match.series}
            </p>
          )}
        </div>

        {/* Center Section - Match Title + Venue */}
        <div className="w-[60%] text-left px-4 sm:px-2 flex flex-col">
          <p className="text-gray-700 font-medium text-sm sm:text-base">
            {match.title}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            {match.venue}
          </p>
        </div>

        {/* Right Section - Time + GMT Time */}
        <div className="w-[40%] text-left pl-6 sm:pl-10 md:pl-16 flex flex-col justify-start">
          <p className="text-gray-800 font-semibold text-sm sm:text-base">
            {match.time}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {match.gmtTime}
          </p>
        </div>

      </div>

      {/* Bottom Line spanning center + right */}
      {showLine && <div className="w-[70%] ml-auto border-b border-gray-300 mt-6"></div>}

    </div>
  );
};

export default MatchCard;