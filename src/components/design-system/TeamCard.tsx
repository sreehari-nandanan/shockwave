import React from 'react';
import { Team } from '../../types';

interface TeamCardProps {
  team: Team;
  active?: boolean;
  onSelect?: (teamId: string) => void;
  className?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  team,
  active = false,
  onSelect,
  className = ''
}) => {
  return (
    <div 
      onClick={() => onSelect && onSelect(team.id)}
      className={`p-4 rounded-lg bg-[#0B1118] border transition-all font-mono ${
        active 
          ? 'border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.25)]' 
          : 'border-[#162232] hover:border-[#00F0FF]/40'
      } ${onSelect ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-[#00F0FF] font-bold">
          SLOT #{team.presentation_order} // {team.team_code}
        </span>
        {active && (
          <span className="px-2 py-0.5 rounded bg-[#00F0FF] text-black font-extrabold text-[10px] animate-pulse">
            CURRENT DEFENDER
          </span>
        )}
      </div>

      <h3 className="font-orbitron font-bold text-lg text-white mb-0.5">
        {team.name}
      </h3>

      <div className="text-xs text-[#FFE600] font-semibold mb-2">
        {team.project_name}
      </div>

      <p className="text-xs text-slate-300 font-sans line-clamp-2 mb-3">
        {team.project_description}
      </p>

      {/* Hardware Tags */}
      <div className="grid grid-cols-2 gap-1.5 text-[10px] pt-2 border-t border-[#162232]">
        <div className="bg-[#05080D] p-1.5 rounded truncate">
          <span className="text-slate-500 block">MCU:</span>
          <span className="text-slate-200">{team.specs.mcu}</span>
        </div>
        <div className="bg-[#05080D] p-1.5 rounded truncate">
          <span className="text-slate-500 block">RF / LINK:</span>
          <span className="text-[#00F0FF]">{team.specs.connectivity}</span>
        </div>
      </div>
    </div>
  );
};
