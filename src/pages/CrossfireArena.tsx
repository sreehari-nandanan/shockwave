import React from 'react';
import { useEvent } from '../context/EventContext';
import { Radio } from 'lucide-react';

interface CrossfireArenaProps {
  navigate: (path: string) => void;
}

export const CrossfireArena: React.FC<CrossfireArenaProps> = ({ navigate }) => {
  const { currentTeam, questions } = useEvent();

  // Public view shows all approved/scored questions in the stream
  const publicQuestions = questions.filter(q => q.status === 'approved' || q.status === 'scored');

  const S = {
    fontDisplay: 'font-black uppercase tracking-tight',
    fontMono: 'font-mono text-xs uppercase tracking-wider',
  };

  return (
    <div className="min-h-screen bg-[#05080C] text-slate-100 flex flex-col p-6 lg:p-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-6xl mx-auto w-full z-10 pt-4">
        
        {/* Header & Target (Inline for space) */}
        <div className="mb-4 pb-2 border-b border-[#162232] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className={`${S.fontMono} text-[10px] text-[#00AEEF] mb-1`}>PUBLIC DISPLAY</div>
            <h1 className={`${S.fontDisplay} text-3xl md:text-5xl text-white tracking-tighter leading-none`}>
              CROSSFIRE <span className="text-[#00AEEF]">ARENA</span>
            </h1>
          </div>

          {currentTeam ? (
            <div className="bg-[#0C1218] border border-[#162232] px-4 py-2 flex items-center gap-4 relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#19D8FF]" />
              <div className={`${S.fontMono} text-[10px] text-slate-500`}>DEFENDING:</div>
              <div className={`${S.fontDisplay} text-2xl text-[#19D8FF]`}>{currentTeam.team_code}</div>
              <div className={`${S.fontDisplay} text-lg text-white hidden md:block`}>{currentTeam.name}</div>
            </div>
          ) : (
            <div className="px-4 py-2 border border-[#162232] bg-[#0C1218] text-center">
              <div className={`${S.fontDisplay} text-lg text-slate-600`}>STANDBY</div>
            </div>
          )}
        </div>

        {/* Approved Questions Stream */}
        <div className="space-y-4">
          <div className={`${S.fontMono} text-[10px] text-slate-500 flex items-center gap-2 mb-4`}>
            <Radio className="w-3 h-3 text-[#F4D62E]" /> LIVE CHALLENGE STREAM
          </div>
          
          {publicQuestions.length === 0 ? (
            <div className="p-12 border border-[#162232] bg-[#05080C] text-center text-slate-600 font-mono text-[10px]">
              NO ACTIVE CHALLENGES APPROVED YET
            </div>
          ) : (
            publicQuestions.map((q, idx) => (
              <div key={q.id} className="bg-[#0C1218] border border-[#162232] relative flex flex-col md:flex-row md:items-stretch">
                {/* Accent bar */}
                <div className="w-full md:w-2 h-1 md:h-auto bg-[#00AEEF] shrink-0" />
                
                <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-3 shrink-0 md:w-48 border-b md:border-b-0 border-[#162232] pb-3 md:pb-0 md:border-r pr-0 md:pr-4">
                    <span className={`${S.fontMono} text-[10px] text-slate-500`}>CHALLENGE 0{idx + 1}</span>
                    <span className={`${S.fontMono} text-[9px] px-2 py-1 bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/30`}>
                      APPROVED
                    </span>
                    <span className={`${S.fontMono} text-[10px] text-slate-400`}>
                      FROM: <span className="text-white font-bold">{q.asking_team_code}</span>
                    </span>
                  </div>

                  <div className="flex-1 flex items-center">
                    <p className="text-lg md:text-2xl font-sans text-white leading-relaxed">
                      "{q.question}"
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
