import React from "react";

export interface Team {
  id: string;
  name: string;
  players: number;
  code: string;
}

interface TeamCardProps {
  team: Team;
  onView: (teamName: string) => void;
  isActive: boolean;
}

const TeamCard = ({ team, onView, isActive }: TeamCardProps) => {
  return (
    <div
      onClick={() => onView(team.name)}
      className={`cursor-pointer bg-white p-6 rounded-2xl shadow-md border 
      hover:shadow-xl hover:scale-105 transition duration-300
      ${isActive ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={`https://flagcdn.com/w40/${team.code}.png`}
          alt={team.name}
          className="w-8 h-5 object-cover rounded-sm"
        />
        <h3 className="text-lg">{team.name}</h3>
      </div>
    </div>
  );
};

export default TeamCard;