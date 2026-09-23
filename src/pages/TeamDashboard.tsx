import React, { useState } from 'react';
import { useEvent } from '../context/EventContext';
import { LogOut, Activity, MessageSquare, Award } from 'lucide-react';
import { TeamCrossfirePage } from './TeamCrossfirePage';

interface TeamDashboardProps {
  navigate: (path: string) => void;
}

export const TeamDashboard: React.FC<TeamDashboardProps> = ({ navigate }) => {
  const { teams, currentUser, questions, scores, switchUserRole, eventState } = useEvent();
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'CROSSFIRE'>('DASHBOARD');

  const myTeam = teams.find(t => t.id === currentUser.team_id) || teams[0];
  const myScore = scores.find(s => s.team_id === myTeam.id) || {
    pitch_score: 0, defense_score: 0, crossfire_score: 0, total_score: 0
  };

  const myQuestions = questions.filter(q => q.asking_team_id === myTeam.id);
  const approvedCount = myQuestions.filter(q => q.status === 'approved' || q.status === 'scored').length;

  const handleLogout = () => {
    switchUserRole('spectator');
    navigate('/');
  };

  const S = {
    fontDisplay: 'font-black uppercase tracking-tight',
    fontMono: 'font-mono text-xs uppercase tracking-wider',
  };

  return (
    <div className="min-h-screen bg-[#05080C] text-slate-100 flex flex-col" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-[#05080C]/90 backdrop-blur border-b border-[#162232] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className={`${S.fontDisplay} text-xl text-white leading-none`}>
            SHOCK<span className="text-[#00AEEF]">WAVE</span>
          </h1>
          <div className="hidden sm:block h-4 w-px bg-[#162232]" />
          <div className={`${S.fontMono} text-[10px] text-slate-500 hidden sm:block`}>
            PARTICIPANT TERMINAL
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`${S.fontMono} text-[10px] text-[#00AEEF] border border-[#00AEEF]/30 bg-[#00AEEF]/10 px-3 py-1 flex items-center gap-2`}>
            <Activity className="w-3 h-3" /> {myTeam.team_code}
          </div>
          <button 
            onClick={handleLogout}
            className={`${S.fontMono} text-[10px] text-slate-500 hover:text-[#FF4D4D] cursor-pointer flex items-center gap-1`}
          >
            <LogOut className="w-3 h-3" /> DISCONNECT
          </button>
        </div>
      </header>

      {/* ── Ambient Background ── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 z-10 flex flex-col">
        
        {/* ── Tabs ── */}
        <div className="flex border-b border-[#162232] mb-8">
          <button 
            onClick={() => setActiveTab('DASHBOARD')}
            className={`px-8 py-4 ${S.fontMono} text-[11px] font-bold transition-colors cursor-pointer ${activeTab === 'DASHBOARD' ? 'border-b-2 border-[#00AEEF] text-[#00AEEF] bg-[#0C1218]' : 'text-slate-500 hover:text-white hover:bg-[#0C1218]'}`}
          >
            OVERVIEW
          </button>
          <button 
            onClick={() => setActiveTab('CROSSFIRE')}
            className={`px-8 py-4 ${S.fontMono} text-[11px] font-bold transition-colors cursor-pointer ${activeTab === 'CROSSFIRE' ? 'border-b-2 border-[#00AEEF] text-[#00AEEF] bg-[#0C1218]' : 'text-slate-500 hover:text-white hover:bg-[#0C1218]'}`}
          >
            CROSSFIRE TERMINAL
          </button>
        </div>

        {activeTab === 'CROSSFIRE' ? (
          <TeamCrossfirePage myTeam={myTeam} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* ── Main ID Panel ── */}
            <div className="md:col-span-8 bg-[#0C1218] border border-[#162232] p-8 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00AEEF] opacity-50" />
              
              <div className={`${S.fontMono} text-[10px] text-slate-500 mb-6`}>REGISTRATION PROFILE</div>
              
              <div className={`${S.fontDisplay} text-6xl sm:text-7xl text-white mb-2 tracking-tighter`} style={{ textShadow: '0 0 20px rgba(0, 174, 239, 0.2)' }}>
                {myTeam.team_code}
              </div>
              <div className={`${S.fontDisplay} text-2xl text-[#00AEEF] mb-6`}>{myTeam.name}</div>
              
              <div className="border-t border-[#162232] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className={`${S.fontMono} text-[9px] text-[#F4D62E] mb-2`}>PROJECT TITLE</div>
                  <div className="text-sm text-white font-sans">{myTeam.project_name}</div>
                </div>
                <div>
                  <div className={`${S.fontMono} text-[9px] text-[#F4D62E] mb-2`}>INSTITUTION</div>
                  <div className="text-sm text-white font-sans">{myTeam.college}</div>
                </div>
              </div>
            </div>

            {/* ── Metrics Panel ── */}
            <div className="md:col-span-4 flex flex-col gap-6">
              
              <div className="bg-[#0C1218] border border-[#162232] p-6 flex-1 flex flex-col justify-center items-center text-center">
                <div className={`${S.fontMono} text-[10px] text-slate-500 mb-4`}>TOTAL SCORE</div>
                <div className={`${S.fontDisplay} text-7xl text-[#5CFF9A]`}>{myScore.total_score}</div>
                <div className="flex gap-4 mt-4 pt-4 border-t border-[#162232] w-full justify-center">
                  <div className="text-center"><div className={`${S.fontMono} text-[9px] text-slate-500`}>PITCH</div><div className="text-white font-mono">{myScore.pitch_score}</div></div>
                  <div className="text-center"><div className={`${S.fontMono} text-[9px] text-slate-500`}>DEFENSE</div><div className="text-white font-mono">{myScore.defense_score}</div></div>
                  <div className="text-center"><div className={`${S.fontMono} text-[9px] text-slate-500`}>CROSSFIRE</div><div className="text-white font-mono">{myScore.crossfire_score}</div></div>
                </div>
              </div>

              <div className="bg-[#0C1218] border border-[#162232] p-6 flex items-center justify-between">
                <div>
                  <div className={`${S.fontMono} text-[10px] text-slate-500 mb-1`}>CROSSFIRE ACTIVITY</div>
                  <div className="text-white font-mono text-sm">{approvedCount} APPROVED Qs</div>
                </div>
                <MessageSquare className="w-6 h-6 text-[#F4D62E] opacity-50" />
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
};
