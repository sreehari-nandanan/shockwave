import React from 'react';
import { useEvent } from '../context/EventContext';
import { Radio } from 'lucide-react';

interface ProjectorDisplayProps {
  navigate: (path: string) => void;
}

export const ProjectorDisplay: React.FC<ProjectorDisplayProps> = () => {
  const { currentTeam, eventState, questions, scores, teams } = useEvent();

  const S = {
    fontDisplay: 'font-black uppercase tracking-tight',
    fontMono: 'font-mono uppercase tracking-wider',
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderContent = () => {
    switch (eventState.displayMode) {
      case 'presentation':
        return currentTeam ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-6xl mx-auto">
            <div className={`${S.fontMono} text-2xl text-[#00AEEF] mb-4 tracking-[0.5em]`}>NOW PRESENTING</div>
            
            <div className={`${S.fontDisplay} text-[6rem] text-white leading-none mb-2`}>
              {currentTeam.team_code} <span className="text-[#19D8FF]">// {currentTeam.name}</span>
            </div>
            
            <div className="text-2xl font-sans text-slate-400 max-w-4xl mb-12">
              {currentTeam.project_name}
            </div>

            <div className={`${S.fontDisplay} text-[22rem] tabular-nums leading-none tracking-tighter ${
              eventState.timerSeconds < 60 ? 'text-[#FF4D4D]' : 
              eventState.timerSeconds < 120 ? 'text-[#F4D62E]' : 
              eventState.timerRunning ? 'text-[#19D8FF]' : 'text-white'
            }`} style={{ textShadow: eventState.timerRunning ? '0 0 100px rgba(25,216,255,0.2)' : 'none' }}>
              {formatTime(eventState.timerSeconds)}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className={`${S.fontDisplay} text-6xl text-slate-700`}>SHOCKWAVE STANDBY</div>
          </div>
        );

      case 'leaderboard':
        const sortedScores = [...scores].sort((a,b) => b.total_score - a.total_score).slice(0, 5);
        return (
          <div className="flex flex-col h-full max-w-7xl mx-auto justify-center w-full">
            <div className={`${S.fontMono} text-2xl text-[#00AEEF] mb-12 text-center tracking-[0.5em]`}>LIVE LEADERBOARD</div>
            <div className="space-y-4">
              {sortedScores.map((s, idx) => {
                const t = teams.find(team => team.id === s.team_id);
                if (!t) return null;
                return (
                  <div key={s.id} className="flex bg-[#0C1218] border border-[#162232] items-center">
                    <div className={`w-32 py-8 text-center ${S.fontDisplay} text-6xl ${idx === 0 ? 'text-[#F4D62E] bg-[#F4D62E]/10 border-r border-[#F4D62E]/30' : 'text-slate-500 border-r border-[#162232]'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 px-12 flex justify-between items-center">
                      <div>
                        <div className={`${S.fontMono} text-2xl text-[#19D8FF] mb-2`}>{t.team_code}</div>
                        <div className={`${S.fontDisplay} text-4xl text-white`}>{t.name}</div>
                      </div>
                      <div className={`${S.fontDisplay} text-8xl ${idx === 0 ? 'text-[#F4D62E]' : 'text-[#19D8FF]'}`}>
                        {s.total_score}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className={`${S.fontDisplay} text-[15rem] text-white opacity-10`}>SHOCKWAVE</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#05080C] text-white overflow-hidden relative" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Background scanline/grid effect for projector */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg, #fff 2px, transparent 2px)', backgroundSize: '100px 100px' }} />
      
      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-[#00AEEF] opacity-50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-[#00AEEF] opacity-50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-[#00AEEF] opacity-50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-[#00AEEF] opacity-50" />

      <div className="absolute inset-16 z-10">
        {renderContent()}
      </div>
    </div>
  );
};
