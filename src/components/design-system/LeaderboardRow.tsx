import React from 'react';
import { Team } from '../../types';

interface LeaderboardRowProps {
  item: Team & {
    pitch_score: number;
    defense_score: number;
    crossfire_score: number;
    total_score: number;
    rank: number;
  };
  isCurrent?: boolean;
  className?: string;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  item,
  isCurrent = false,
  className = ''
}) => {
  const isGold = item.rank === 1;
  const isSilver = item.rank === 2;
  const isBronze = item.rank === 3;

  return (
    <tr
      className={`transition-colors font-mono text-xs hover:bg-white/5 ${
        isCurrent ? 'bg-[#00F0FF]/10 border-l-2 border-[#00F0FF]' : ''
      } ${isGold ? 'bg-[#FFE600]/5' : ''} ${className}`}
    >
      {/* Rank Badge */}
      <td className="py-3.5 px-4 text-center font-bold">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded text-xs ${
          isGold ? 'bg-[#FFE600] text-black font-black shadow-[0_0_10px_rgba(255,230,0,0.5)]' :
          isSilver ? 'bg-slate-300 text-black font-bold' :
          isBronze ? 'bg-amber-700 text-white font-bold' :
          'text-slate-400'
        }`}>
          {String(item.rank).padStart(2, '0')}
        </span>
      </td>

      {/* Team & Project */}
      <td className="py-3.5 px-4">
        <div className="flex items-center space-x-2">
          <span className="font-orbitron font-bold text-white text-sm">
            {item.name}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#080C12] border border-[#162232] text-[#00F0FF]">
            {item.team_code}
          </span>
          {isCurrent && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00F0FF] text-black font-bold animate-pulse">
              IN ARENA
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-400 font-sans mt-0.5">
          {item.project_name} &bull; <span className="text-slate-500">{item.college}</span>
        </div>
      </td>

      {/* Pitch */}
      <td className="py-3.5 px-3 text-right font-bold text-white">
        {item.pitch_score}
      </td>

      {/* Defense */}
      <td className="py-3.5 px-3 text-right font-bold text-slate-300">
        {item.defense_score}
      </td>

      {/* Crossfire */}
      <td className="py-3.5 px-3 text-right font-bold text-[#00F0FF]">
        {item.crossfire_score}
      </td>

      {/* Total */}
      <td className="py-3.5 px-4 text-right">
        <span className={`text-base font-black ${
          isGold ? 'text-[#FFE600] glow-gold' : 'text-[#00F0FF]'
        }`}>
          {item.total_score}
        </span>
      </td>
    </tr>
  );
};
