import React, { useState } from 'react';
import { useEvent } from '../context/EventContext';
import { Filter, ArrowLeft } from 'lucide-react';

interface LeaderboardPageProps {
  navigate?: (path: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ navigate }) => {
  const { leaderboard, currentTeam } = useEvent();
  const [filterCollege, setFilterCollege] = useState<string>('all');

  const colleges = Array.from(new Set(leaderboard.map(t => t.college)));
  const filtered = filterCollege === 'all'
    ? leaderboard
    : leaderboard.filter(t => t.college === filterCollege);

  const S = {
    fontDisplay: 'font-black uppercase tracking-tight',
    fontMono: 'font-mono text-xs uppercase tracking-wider',
  };

  return (
    <div className="min-h-screen bg-[#05080C] text-slate-100 flex flex-col p-6 lg:p-12 relative" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {navigate && (
        <button 
          onClick={() => navigate('/')}
          className={`absolute top-8 left-8 ${S.fontMono} text-[10px] text-slate-500 hover:text-[#00AEEF] flex items-center gap-2 transition-colors z-10 cursor-pointer bg-[#05080C] p-2`}
        >
          <ArrowLeft className="w-3 h-3" /> BACK
        </button>
      )}

      <div className="max-w-6xl mx-auto w-full z-10 pt-4">
        
        {/* Header */}
        <div className="mb-4 border-b border-[#162232] pb-2 flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <div className={`${S.fontMono} text-[10px] text-[#00AEEF] mb-1`}>PUBLIC DISPLAY</div>
            <h1 className={`${S.fontDisplay} text-3xl md:text-5xl text-white tracking-tighter leading-none`}>
              LIVE <span className="text-[#00AEEF]">LEADERBOARD</span>
            </h1>
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 border border-[#162232] bg-[#0C1218] text-center text-slate-500 font-mono text-xs">
              NO TEAMS FOUND
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div 
                key={item.id} 
                className={`flex bg-[#0C1218] border ${item.id === currentTeam?.id ? 'border-[#19D8FF]' : 'border-[#162232]'} items-stretch relative`}
              >
                {/* Active team indicator */}
                {item.id === currentTeam?.id && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#19D8FF]" />
                )}

                <div className={`w-12 md:w-16 flex items-center justify-center ${S.fontDisplay} text-xl md:text-2xl ${
                  idx === 0 ? 'text-[#F4D62E] bg-[#F4D62E]/10 border-r border-[#F4D62E]/30' : 
                  idx === 1 ? 'text-slate-300 border-r border-[#162232]' : 
                  idx === 2 ? 'text-[#CD7F32] border-r border-[#162232]' : 
                  'text-slate-600 border-r border-[#162232]'
                }`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                
                <div className="flex-1 p-2 md:p-3 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`${S.fontDisplay} text-lg md:text-xl text-white leading-none w-48 truncate`}>{item.name}</div>
                    <div className={`${S.fontMono} text-[10px] text-[#19D8FF] hidden md:flex items-center gap-2`}>
                      {item.team_code}
                      {item.id === currentTeam?.id && <span className="bg-[#19D8FF]/20 text-[#19D8FF] px-1 py-0.5 border border-[#19D8FF]/30 text-[8px]">ACTIVE</span>}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 sm:gap-6 items-center border-t border-[#162232] sm:border-0 pt-2 sm:pt-0">
                    <div className="flex gap-3 font-mono text-[9px] text-slate-500 hidden sm:flex">
                      <div className="text-center">P<br/><span className="text-white text-[10px]">{item.pitch_score}</span></div>
                      <div className="text-center">D<br/><span className="text-white text-[10px]">{item.defense_score}</span></div>
                      <div className="text-center">CF<br/><span className="text-white text-[10px]">{item.crossfire_score}</span></div>
                    </div>
                    <div className={`${S.fontDisplay} text-2xl md:text-4xl tabular-nums leading-none ${idx === 0 ? 'text-[#F4D62E]' : 'text-[#19D8FF]'}`}>
                      {item.total_score}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center font-mono text-[10px] text-slate-600 pb-12">
          {filtered.length} TEAM{filtered.length !== 1 ? 'S' : ''} LOGGED // SECURE CONNECTION
        </div>

      </div>
    </div>
  );
};
