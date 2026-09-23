import React, { useState, useEffect } from 'react';
import { useEvent } from '../context/EventContext';
import { 
  ShieldAlert, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Radio, 
  RefreshCw, 
  Check, 
  X, 
  ChevronRight, 
  UserCheck,
  Zap,
  Lock,
  Unlock,
  Monitor,
  Activity,
  AlertTriangle,
  Settings,
  Search,
  CheckSquare,
  XSquare,
  MessageSquare
} from 'lucide-react';
import { Announcement, Team, Question } from '../types';

const S = {
  bgPanel: 'bg-[#05080C]',
  fontDisplay: 'font-black uppercase tracking-tight',
  fontMono: 'font-mono uppercase tracking-wider',
};

const CrossfireScoreBlock: React.FC<{ question: Question, onScore: (asking: number, defending: number) => void }> = ({ question, onScore }) => {
  const [asking, setAsking] = useState<number | ''>('');
  const [defending, setDefending] = useState<number | ''>('');
  
  return (
    <div className="bg-[#05080C] p-4 border-t border-[#162232] grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-[#162232] p-3">
        <div className={`${S.fontMono} text-[9px] text-[#F4D62E] mb-2`}>SCORE ASKING ({question.asking_team_code})</div>
        <input 
          type="number" 
          value={asking}
          onChange={e => setAsking(e.target.value ? Number(e.target.value) : '')}
          placeholder="MAX 10..."
          className="w-full bg-[#101820] border border-[#162232] text-xs font-mono p-2 text-center text-white outline-none focus:border-[#F4D62E] mb-2"
        />
      </div>
      <div className="border border-[#162232] p-3">
        <div className={`${S.fontMono} text-[9px] text-[#00AEEF] mb-2`}>SCORE DEFENDING ({question.presenting_team_name})</div>
        <input 
          type="number" 
          value={defending}
          onChange={e => setDefending(e.target.value ? Number(e.target.value) : '')}
          placeholder="MAX 10..."
          className="w-full bg-[#101820] border border-[#162232] text-xs font-mono p-2 text-center text-white outline-none focus:border-[#00AEEF] mb-2"
        />
      </div>
      <button 
        onClick={() => onScore(Number(asking), Number(defending))}
        disabled={asking === '' || defending === ''}
        className="md:col-span-2 w-full py-2 border border-[#5CFF9A] text-[#5CFF9A] text-[10px] font-mono hover:bg-[#5CFF9A]/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        COMMIT SCORES TO LEADERBOARD
      </button>
    </div>
  );
};

const JudgingRow: React.FC<{ team: Team, currentScore: any, onSave: (p: number) => void }> = ({ team, currentScore, onSave }) => {
  const [j1p, setJ1p] = useState<number|''>('');
  const [j2p, setJ2p] = useState<number|''>('');
  const [j3p, setJ3p] = useState<number|''>('');

  const calcAverage = () => {
    const pScores = [Number(j1p), Number(j2p), Number(j3p)].filter(n => n > 0);
    const avgP = pScores.length > 0 ? Math.round(pScores.reduce((a,b)=>a+b, 0) / pScores.length) : currentScore.pitch_score;
    
    onSave(avgP);
    setJ1p(''); setJ2p(''); setJ3p('');
  };

  return (
    <tr className="hover:bg-[#101820]">
      <td className="p-4 border-r border-[#162232]">
        <div className="text-[#19D8FF] mb-1">{team.team_code}</div>
        <div className="text-white truncate w-48">{team.name}</div>
      </td>
      <td className="p-4 border-r border-[#162232]">
        <div className="flex gap-2 justify-center">
          <input type="number" value={j1p} onChange={e=>setJ1p(Number(e.target.value)||'')} placeholder="P" className="w-16 bg-[#05080C] border border-[#162232] text-center text-white p-1 outline-none focus:border-[#00AEEF]" />
        </div>
      </td>
      <td className="p-4 border-r border-[#162232]">
        <div className="flex gap-2 justify-center">
          <input type="number" value={j2p} onChange={e=>setJ2p(Number(e.target.value)||'')} placeholder="P" className="w-16 bg-[#05080C] border border-[#162232] text-center text-white p-1 outline-none focus:border-[#00AEEF]" />
        </div>
      </td>
      <td className="p-4 border-r border-[#162232]">
        <div className="flex gap-2 justify-center">
          <input type="number" value={j3p} onChange={e=>setJ3p(Number(e.target.value)||'')} placeholder="P" className="w-16 bg-[#05080C] border border-[#162232] text-center text-white p-1 outline-none focus:border-[#00AEEF]" />
        </div>
      </td>
      <td className="p-4 border-r border-[#162232] text-center">
        <div className="text-[#F4D62E] text-lg font-black">{currentScore.pitch_score}</div>
      </td>
      <td className="p-4 text-center">
        <button onClick={calcAverage} className="px-4 py-1.5 border border-[#5CFF9A] text-[#5CFF9A] hover:bg-[#5CFF9A]/10 text-[9px] cursor-pointer">
          CALCULATE & SAVE
        </button>
      </td>
    </tr>
  );
};

export const AdminDashboard: React.FC = () => {
  const { 
    teams, 
    currentTeam, 
    nextTeamItem, 
    eventState, 
    questions, 
    scores, 
    announcements, 
    setActiveTeam, 
    nextTeam, 
    toggleTimer, 
    resetTimer, 
    approveQuestion, 
    rejectQuestion, 
    addTeam, 
    deleteTeam, 
    publishAnnouncement, 
    deleteAnnouncement, 
    simulateDemoQuestion,
    resetToDefaultDemo,
    updateTeamScore,
    scoreQuestion,
    clearQuestions,
    setDisplayMode
  } = useEvent();

  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'TEAMS' | 'CROSSFIRE' | 'JUDGING' | 'LEADERBOARD' | 'ANNOUNCEMENTS' | 'DISPLAY'>('DASHBOARD');

  // Announcement composer
  const [announcementMsg, setAnnouncementMsg] = useState('');
  const [announcementLevel, setAnnouncementLevel] = useState<Announcement['level']>('info');

  // Add Team Forms
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamCollege, setNewTeamCollege] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newLeader, setNewLeader] = useState('');

  // Operator feedback
  const [opAlert, setOpAlert] = useState<string | null>(null);

  // Crossfire
  const [scoringQuestionId, setScoringQuestionId] = useState<string | null>(null);
  const [questionScores, setQuestionScores] = useState<{[key:string]: string}>({});
  
  const [scoringAnswerTeamId, setScoringAnswerTeamId] = useState<string | null>(null);
  const [answerScores, setAnswerScores] = useState<{[key:string]: string}>({});

  const [judgesCount, setJudgesCount] = useState(3);

  // Teams search
  const [teamSearch, setTeamSearch] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // Leaderboard lock & correction
  const [leaderboardLocked, setLeaderboardLocked] = useState(false);
  const [correctionTeamId, setCorrectionTeamId] = useState('');
  const [correctionCategory, setCorrectionCategory] = useState<'pitch' | 'defense' | 'crossfire'>('pitch');
  const [correctionScore, setCorrectionScore] = useState<number | ''>('');
  const [correctionReason, setCorrectionReason] = useState('');

  const handleScoreCorrection = () => {
    if (!correctionTeamId || correctionScore === '' || !correctionReason.trim()) return;
    
    const existingScore = scores.find(s => s.team_id === correctionTeamId) || { pitch_score: 0, defense_score: 0, crossfire_score: 0 };
    
    let p = existingScore.pitch_score;
    let d = existingScore.defense_score;
    let c = existingScore.crossfire_score;

    if (correctionCategory === 'pitch') p = Number(correctionScore);
    if (correctionCategory === 'defense') d = Number(correctionScore);
    if (correctionCategory === 'crossfire') c = Number(correctionScore);

    updateTeamScore(correctionTeamId, p, d, c, `MANUAL OVERRIDE: ${correctionReason.trim()}`);
    
    setCorrectionScore('');
    setCorrectionReason('');
    triggerOpAlert('SCORE CORRECTION RECORDED');
  };

  const triggerOpAlert = (msg: string) => {
    setOpAlert(msg);
    setTimeout(() => setOpAlert(null), 3500);
  };

  const handlePublishAnn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementMsg.trim()) return;
    publishAnnouncement(announcementMsg, announcementLevel);
    setAnnouncementMsg('');
    triggerOpAlert('BROADCAST TRANSMITTED ACROSS ALL TERMINALS');
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim() || !newProjectName.trim()) return;

    addTeam({
      name: newTeamName.trim(),
      college: newTeamCollege.trim() || 'Toc H Institute of Science & Technology',
      project_name: newProjectName.trim(),
      project_description: '',
      leader: newLeader.trim() || 'Team Lead',
      members: [],
      specs: {
        mcu: '', sensors: [], connectivity: '', power_budget: '', dsp_method: ''
      }
    });

    setShowAddTeamModal(false);
    setNewTeamName('');
    setNewProjectName('');
    setNewTeamCollege('');
    setNewLeader('');
    triggerOpAlert('REGISTRATION GENERATED');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const pendingQuestions = questions.filter(q => q.status === 'pending');
  const approvedQuestions = questions.filter(q => q.status === 'approved' || q.status === 'scored');

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(teamSearch.toLowerCase()) || 
    t.team_code.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.project_name.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const selectedTeamDetails = teams.find(t => t.id === selectedTeamId);

  // ─── STYLES ──────────────────────────────────────────────
  const S = {
    bgApp: 'bg-[#05080C]',
    bgSidebar: 'bg-[#080D12]',
    bgPanel: 'bg-[#0C1218]',
    bgElevated: 'bg-[#101820]',
    textCyan: 'text-[#19D8FF]',
    textBlue: 'text-[#00AEEF]',
    textYellow: 'text-[#F4D62E]',
    textRed: 'text-[#FF4D4D]',
    textGreen: 'text-[#5CFF9A]',
    border: 'border border-[#162232]',
    borderActive: 'border border-[#00AEEF]',
    fontDisplay: 'font-black uppercase tracking-tight',
    fontMono: 'font-mono text-xs uppercase tracking-wider',
  };

  return (
    <div className={`min-h-screen ${S.bgApp} text-slate-100 flex overflow-hidden`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      
      {/* ─── SIDEBAR ───────────────────────────────────────── */}
      <div className={`w-64 ${S.bgSidebar} ${S.border} flex flex-col z-20 shrink-0`}>
        {/* Brand */}
        <div className="p-6 border-b border-[#162232]">
          <h1 className={`${S.fontDisplay} text-3xl leading-none text-white mb-2`}>
            SHOCK<br/><span className={S.textCyan}>WAVE</span>
          </h1>
          <div className={`${S.fontMono} text-[9px] text-slate-500`}>
            SYS / ADMIN<br/>EVENT CONTROL BUILD 01
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1">
          {['DASHBOARD', 'TEAMS', 'CROSSFIRE', 'JUDGING', 'LEADERBOARD', 'ANNOUNCEMENTS', 'DISPLAY'].map((tab, idx) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`w-full text-left px-6 py-3 flex items-center justify-between transition-all ${
                  isActive ? `bg-[#0C1218] border-l-4 border-[#00AEEF] ${S.textCyan}` : `text-slate-500 hover:text-white border-l-4 border-transparent`
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${S.fontMono} text-[10px] opacity-50`}>0{idx + 1}</span>
                  <span className={`${S.fontDisplay} text-sm`}>{tab}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
              </button>
            )
          })}
        </div>

        {/* Status */}
        <div className="p-6 border-t border-[#162232]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#5CFF9A] animate-pulse" />
            <span className={`${S.fontMono} text-[10px] text-[#5CFF9A]`}>SYSTEM ONLINE</span>
          </div>
          <div className={`${S.fontMono} text-[10px] text-slate-500`}>ADMIN // {teams.length} TEAMS</div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Top Bar / Global Actions */}
        <div className="sticky top-0 z-10 px-8 py-4 bg-[#05080C]/90 backdrop-blur border-b border-[#162232] flex justify-between items-center">
          <div className={`${S.fontDisplay} text-xl text-white tracking-widest`}>
            {activeTab}
          </div>
          <div className="flex items-center gap-4">
            {opAlert && (
              <div className={`${S.fontMono} text-[10px] px-3 py-1 bg-[#5CFF9A]/10 text-[#5CFF9A] border border-[#5CFF9A]/30 flex items-center gap-2`}>
                <Check className="w-3 h-3" /> {opAlert}
              </div>
            )}
            <button
              onClick={() => {
                if(window.confirm('RESET TO DEFAULT DEMO STATE?')) { resetToDefaultDemo(); triggerOpAlert('SYSTEM RESET'); }
              }}
              className={`${S.fontMono} flex items-center gap-2 text-[10px] text-slate-500 hover:text-white px-3 py-1.5 border border-[#162232] cursor-pointer`}
            >
              <RotateCcw className="w-3 h-3" /> RESET
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8">

          {/* ============================================================== */}
          {/* DASHBOARD VIEW */}
          {/* ============================================================== */}
          {activeTab === 'DASHBOARD' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* CURRENT TEAM PANEL (Left Col, Span 8) */}
              <div className="lg:col-span-8 space-y-6">
                <div className={`${S.bgPanel} border border-[#162232] p-8 relative overflow-hidden`}>
                  {/* Decorative bracket */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#19D8FF] opacity-50" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#19D8FF] opacity-50" />

                  <div className="flex justify-between items-start mb-12">
                    <div className={`${S.fontMono} text-[10px] text-slate-500`}>NOW PRESENTING // ACTIVE SLOT</div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#00AEEF]">
                      <Activity className="w-3 h-3" /> LIVE
                    </div>
                  </div>

                  {currentTeam ? (
                    <div>
                      <div className={`${S.fontDisplay} text-7xl md:text-8xl text-white leading-none mb-4 tracking-tighter`} style={{ textShadow: '0 0 40px rgba(25, 216, 255, 0.2)' }}>
                        {currentTeam.team_code}
                      </div>
                      <div className={`${S.fontDisplay} text-2xl text-[#19D8FF] mb-2`}>{currentTeam.name}</div>
                      <div className={`${S.fontMono} text-sm text-slate-400 mb-8 max-w-xl`}>{currentTeam.project_name}</div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#162232] pt-6">
                        <div>
                          <div className={`${S.fontMono} text-[9px] text-slate-500 mb-1`}>LEADER</div>
                          <div className={`${S.fontMono} text-xs text-white`}>{currentTeam.leader}</div>
                        </div>
                        <div>
                          <div className={`${S.fontMono} text-[9px] text-slate-500 mb-1`}>COLLEGE</div>
                          <div className={`${S.fontMono} text-xs text-white truncate`}>{currentTeam.college}</div>
                        </div>
                        <div>
                          <div className={`${S.fontMono} text-[9px] text-slate-500 mb-1`}>ROUND</div>
                          <div className={`${S.fontMono} text-xs text-white`}>{eventState.currentRound}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`${S.fontDisplay} text-4xl text-slate-600`}>NO TEAM ACTIVE</div>
                  )}
                </div>

                {/* QUICK CONTROLS */}
                <div className={`${S.bgElevated} border border-[#162232] p-4 flex flex-wrap gap-2`}>
                  <div className={`${S.fontMono} text-[10px] text-slate-500 w-full mb-2`}>PRESENTATION CONTROL</div>
                  
                  <button onClick={toggleTimer} className={`flex-1 px-4 py-3 ${S.fontDisplay} text-sm ${eventState.timerRunning ? 'bg-[#FF4D4D] text-white' : 'bg-[#00AEEF] text-black'} cursor-pointer hover:opacity-80`}>
                    {eventState.timerRunning ? 'PAUSE TIMER' : 'START TIMER'}
                  </button>
                  <button onClick={() => resetTimer(300)} className={`px-4 py-3 ${S.fontDisplay} text-sm bg-transparent border border-[#162232] text-white cursor-pointer hover:bg-[#162232]`}>
                    RESET 05:00
                  </button>
                  <button onClick={nextTeam} className={`flex-1 px-4 py-3 ${S.fontDisplay} text-sm bg-transparent border border-[#00AEEF] text-[#00AEEF] cursor-pointer hover:bg-[#00AEEF] hover:text-black`}>
                    NEXT TEAM
                  </button>
                  
                  <div className="w-full flex items-center gap-2 mt-2 pt-2 border-t border-[#162232]">
                    <span className={`${S.fontMono} text-[10px] text-slate-500`}>JUMP TO:</span>
                    <select
                      value={currentTeam?.id || ''}
                      onChange={(e) => setActiveTeam(e.target.value)}
                      className="bg-transparent border border-[#162232] text-xs font-mono text-white p-1 focus:border-[#00AEEF] outline-none"
                    >
                      <option value="">SELECT...</option>
                      {teams.map(t => (
                        <option key={t.id} value={t.id}>{t.team_code} - {t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* TIMER & FEED (Right Col, Span 4) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* TIMER PANEL */}
                <div className={`${S.bgPanel} border border-[#162232] p-6 text-center`}>
                  <div className={`${S.fontMono} text-[10px] text-slate-500 mb-4`}>MASTER SYNCHRONIZED TIMER</div>
                  
                  <div className={`${S.fontDisplay} text-7xl md:text-8xl tabular-nums leading-none mb-6 ${
                    eventState.timerSeconds < 60 ? S.textRed : 
                    eventState.timerSeconds < 120 ? S.textYellow : 
                    eventState.timerRunning ? S.textCyan : 'text-white'
                  }`}>
                    {formatTime(eventState.timerSeconds)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => resetTimer(eventState.timerSeconds + 60)} className="py-2 border border-[#162232] font-mono text-xs hover:bg-[#162232] cursor-pointer">+ 1 MIN</button>
                    <button onClick={() => resetTimer(eventState.timerSeconds + 30)} className="py-2 border border-[#162232] font-mono text-xs hover:bg-[#162232] cursor-pointer">+ 30 SEC</button>
                    <button onClick={() => resetTimer(Math.max(0, eventState.timerSeconds - 60))} className="py-2 border border-[#162232] font-mono text-xs hover:bg-[#162232] cursor-pointer">- 1 MIN</button>
                    <button onClick={() => resetTimer(Math.max(0, eventState.timerSeconds - 30))} className="py-2 border border-[#162232] font-mono text-xs hover:bg-[#162232] cursor-pointer">- 30 SEC</button>
                  </div>
                </div>

                {/* SMALL QUESTION FEED */}
                <div className={`${S.bgPanel} border border-[#162232] flex flex-col h-80`}>
                  <div className="p-4 border-b border-[#162232] flex justify-between items-center bg-[#101820]">
                    <div className={`${S.fontDisplay} text-sm text-white`}>LIVE FEED</div>
                    <div className={`${S.fontMono} text-[10px] text-[#F4D62E] px-2 py-0.5 border border-[#F4D62E]`}>
                      {pendingQuestions.length} PENDING
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {pendingQuestions.slice(0, 3).map(q => (
                      <div key={q.id} className="p-3 border border-[#162232] bg-[#05080C]">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`${S.fontMono} text-[10px] text-[#19D8FF]`}>{q.asking_team_code}</span>
                          <span className={`${S.fontMono} text-[9px] text-slate-500`}>{new Date(q.created_at).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-xs font-sans text-slate-300 mb-3 line-clamp-3">"{q.question}"</p>
                        <div className="flex gap-2">
                          <button onClick={() => { approveQuestion(q.id); triggerOpAlert('QUESTION CLEARED TO PROJECTOR'); }} className="flex-1 py-1.5 bg-[#5CFF9A]/10 text-[#5CFF9A] border border-[#5CFF9A]/30 text-[10px] font-mono cursor-pointer hover:bg-[#5CFF9A]/20">APPROVE</button>
                          <button onClick={() => rejectQuestion(q.id)} className="flex-1 py-1.5 bg-[#FF4D4D]/10 text-[#FF4D4D] border border-[#FF4D4D]/30 text-[10px] font-mono cursor-pointer hover:bg-[#FF4D4D]/20">REJECT</button>
                        </div>
                      </div>
                    ))}
                    {pendingQuestions.length === 0 && (
                      <div className={`${S.fontMono} text-[10px] text-slate-600 text-center mt-10`}>NO INCOMING SIGNAL</div>
                    )}
                  </div>
                  <button onClick={() => setActiveTab('CROSSFIRE')} className="p-3 border-t border-[#162232] text-center text-[10px] font-mono text-[#00AEEF] hover:bg-[#101820] cursor-pointer">
                    VIEW ALL CROSSFIRE &rarr;
                  </button>
                </div>

              </div>
            </div>
          )}


          {/* ============================================================== */}
          {/* CROSSFIRE VIEW */}
          {/* ============================================================== */}
          {activeTab === 'CROSSFIRE' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LIVE QUEUE (Span 6) */}
              <div className="lg:col-span-6 flex flex-col h-[calc(100vh-160px)]">
                <div className="flex justify-between items-end mb-4">
                  <div className={`${S.fontDisplay} text-2xl text-white`}>INCOMING QUEUE</div>
                  <button onClick={() => window.open('/#/crossfire', '_blank')} className="px-3 py-1 bg-[#00AEEF] text-black text-[10px] font-bold font-mono hover:bg-white flex items-center gap-2">
                    LAUNCH PUBLIC ARENA &#8599;
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {pendingQuestions.map(q => (
                    <div key={q.id} className={`${S.bgPanel} border-l-2 border-l-[#F4D62E] border-y border-r border-y-[#162232] border-r-[#162232] p-5 relative`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className={`${S.fontMono} text-[10px] text-slate-500`}>QUESTION #{q.id.substring(0,6).toUpperCase()}</div>
                          <div className={`${S.fontDisplay} text-lg text-[#F4D62E]`}>{q.asking_team_code}</div>
                        </div>
                        <div className={`${S.fontMono} text-[10px] text-slate-500`}>
                          TARGET: <span className="text-white">{q.presenting_team_name}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm font-sans text-white mb-4 bg-[#05080C] p-3 border border-[#162232]">
                        {q.question}
                      </p>
                      
                      <div className="flex gap-2">
                        <button onClick={() => { approveQuestion(q.id); triggerOpAlert('QUESTION APPROVED'); }} className="px-6 py-2 bg-[#5CFF9A] text-black font-bold text-[11px] font-mono cursor-pointer hover:opacity-80">APPROVE</button>
                        <button onClick={() => rejectQuestion(q.id)} className="px-6 py-2 bg-transparent border border-[#FF4D4D] text-[#FF4D4D] font-bold text-[11px] font-mono cursor-pointer hover:bg-[#FF4D4D]/10">REJECT</button>
                      </div>
                    </div>
                  ))}
                  {pendingQuestions.length === 0 && (
                    <div className={`${S.bgPanel} border border-[#162232] p-10 text-center`}>
                      <Radio className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                      <div className={`${S.fontDisplay} text-xl text-slate-500`}>NO PENDING QUESTIONS</div>
                      <div className={`${S.fontMono} text-[10px] text-slate-600 mt-2`}>WAITING FOR SIGNAL...</div>
                    </div>
                  )}
                </div>
              </div>

              {/* SCORING & HISTORY (Span 6) */}
              <div className="lg:col-span-6 flex flex-col h-[calc(100vh-160px)]">
                
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`${S.fontDisplay} text-2xl text-white`}>SCORING & HISTORY</div>
                    <button onClick={() => { clearQuestions(); triggerOpAlert('CROSSFIRE LOG WIPED'); }} className="px-3 py-1 bg-transparent border border-[#FF4D4D] text-[#FF4D4D] text-[10px] font-mono hover:bg-[#FF4D4D]/10">
                      CLEAR LOG
                    </button>
                  </div>

                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {approvedQuestions.map(q => (
                    <div key={q.id} className={`${S.bgPanel} border border-[#162232] p-0 flex flex-col`}>
                      
                      {/* Header row */}
                      <div className="p-3 bg-[#101820] border-b border-[#162232] flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className={`${S.fontMono} text-[10px] ${q.status==='scored' ? 'text-[#5CFF9A]' : 'text-[#19D8FF]'}`}>
                            {q.status === 'scored' ? 'SCORED' : 'APPROVED'}
                          </span>
                          <span className={`${S.fontMono} text-[10px] text-slate-500`}>#{q.id.substring(0,6).toUpperCase()}</span>
                        </div>
                        <div className={`${S.fontMono} text-[10px] text-slate-500`}>
                          <span className="text-[#19D8FF]">{q.asking_team_code}</span> &rarr; {q.presenting_team_name}
                        </div>
                      </div>

                      <p className="p-4 text-xs font-sans text-slate-300">
                        {q.question}
                      </p>

                      {/* Scoring Section */}
                      {q.status !== 'scored' ? (
                        <CrossfireScoreBlock question={q} onScore={(asking, defending) => {
                          scoreQuestion(q.id, asking, defending);
                          triggerOpAlert('CROSSFIRE SCORES RECORDED');
                        }} />
                      ) : (
                        <div className="bg-[#101820] p-3 text-center border-t border-[#162232]">
                          <div className={`${S.fontMono} text-[10px] text-slate-500`}>
                            SCORED: ASKING (+{q.asking_score}) // DEFENDING (+{q.defending_score})
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TEAMS VIEW */}
          {/* ============================================================== */}
          {activeTab === 'TEAMS' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-160px)]">
              
              {/* TABLE (Span 8) */}
              <div className="xl:col-span-8 flex flex-col h-full border border-[#162232] bg-[#0C1218]">
                <div className="p-4 border-b border-[#162232] bg-[#101820] flex justify-between items-center">
                  <div className={`${S.fontDisplay} text-xl text-white`}>TEAMS <span className="text-slate-600">{teams.length}</span></div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="SEARCH..." 
                        value={teamSearch}
                        onChange={e => setTeamSearch(e.target.value)}
                        className="pl-8 pr-2 py-1.5 bg-[#05080C] border border-[#162232] text-xs font-mono text-white outline-none focus:border-[#00AEEF] w-48"
                      />
                    </div>
                    <button onClick={() => { setSelectedTeamId(null); setShowAddTeamModal(true); }} className="px-3 py-1.5 bg-[#00AEEF] text-black text-[10px] font-bold font-mono cursor-pointer hover:bg-white flex items-center gap-1">
                      <Plus className="w-3 h-3" /> ADD
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#05080C] text-slate-500 text-[9px] sticky top-0 border-b border-[#162232]">
                      <tr>
                        <th className="p-3 font-normal">ID</th>
                        <th className="p-3 font-normal">NAME</th>
                        <th className="p-3 font-normal">PROJECT</th>
                        <th className="p-3 font-normal">STATUS</th>
                        <th className="p-3 font-normal text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#162232]">
                      {filteredTeams.map(t => (
                        <tr key={t.id} 
                            onClick={() => setSelectedTeamId(t.id)}
                            className={`cursor-pointer hover:bg-[#101820] ${selectedTeamId === t.id ? 'bg-[#101820] border-l-2 border-[#19D8FF]' : 'border-l-2 border-transparent'}`}>
                          <td className="p-3 text-[#19D8FF]">{t.team_code}</td>
                          <td className="p-3 text-white">{t.name}</td>
                          <td className="p-3 text-slate-400 truncate max-w-[200px]">{t.project_name}</td>
                          <td className="p-3 text-[#5CFF9A] text-[10px]">REGISTERED</td>
                          <td className="p-3 text-right">
                            <button className="text-slate-500 hover:text-white uppercase text-[9px]">VIEW</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DETAILS SIDE (Span 4) */}
              <div className="xl:col-span-4 border border-[#162232] bg-[#0C1218] flex flex-col h-full overflow-y-auto">
                {showAddTeamModal && !selectedTeamId ? (
                  <div className="p-6">
                    <div className={`${S.fontDisplay} text-xl text-white mb-6 border-b border-[#162232] pb-2`}>ADD REGISTRATION</div>
                    <form onSubmit={handleCreateTeam} className="space-y-4">
                      <div>
                        <label className={`${S.fontMono} text-[9px] text-slate-500 block mb-1`}>TEAM NAME</label>
                        <input required value={newTeamName} onChange={e=>setNewTeamName(e.target.value)} className="w-full p-2 bg-[#05080C] border border-[#162232] text-white text-xs font-mono outline-none focus:border-[#00AEEF]" />
                      </div>
                      <div>
                        <label className={`${S.fontMono} text-[9px] text-slate-500 block mb-1`}>COLLEGE</label>
                        <input required value={newTeamCollege} onChange={e=>setNewTeamCollege(e.target.value)} className="w-full p-2 bg-[#05080C] border border-[#162232] text-white text-xs font-mono outline-none focus:border-[#00AEEF]" />
                      </div>
                      <div>
                        <label className={`${S.fontMono} text-[9px] text-slate-500 block mb-1`}>PROJECT NAME</label>
                        <input required value={newProjectName} onChange={e=>setNewProjectName(e.target.value)} className="w-full p-2 bg-[#05080C] border border-[#162232] text-white text-xs font-mono outline-none focus:border-[#00AEEF]" />
                      </div>
                      <div>
                        <label className={`${S.fontMono} text-[9px] text-slate-500 block mb-1`}>LEADER NAME</label>
                        <input required value={newLeader} onChange={e=>setNewLeader(e.target.value)} className="w-full p-2 bg-[#05080C] border border-[#162232] text-white text-xs font-mono outline-none focus:border-[#00AEEF]" />
                      </div>
                      <button type="submit" className="w-full mt-4 py-3 bg-[#5CFF9A] text-black font-bold text-[10px] font-mono cursor-pointer hover:opacity-80">
                        GENERATE REGISTRATION
                      </button>
                    </form>
                  </div>
                ) : selectedTeamDetails ? (
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-[#162232] bg-[#101820]">
                      <div className={`${S.fontMono} text-[10px] text-slate-500 mb-1`}>TEAM DETAILS</div>
                      <div className={`${S.fontDisplay} text-4xl text-[#19D8FF] mb-1`}>{selectedTeamDetails.team_code}</div>
                      <div className={`${S.fontDisplay} text-xl text-white`}>{selectedTeamDetails.name}</div>
                    </div>
                    
                    <div className="p-6 space-y-6 flex-1">
                      <div>
                        <div className={`${S.fontMono} text-[9px] text-[#F4D62E] mb-2 border-b border-[#162232] pb-1`}>PROJECT</div>
                        <div className="text-sm text-white font-sans">{selectedTeamDetails.project_name}</div>
                      </div>

                      <div>
                        <div className={`${S.fontMono} text-[9px] text-[#F4D62E] mb-2 border-b border-[#162232] pb-1`}>INSTITUTION</div>
                        <div className="text-sm text-white font-sans">{selectedTeamDetails.college}</div>
                      </div>

                      <div>
                        <div className={`${S.fontMono} text-[9px] text-[#F4D62E] mb-2 border-b border-[#162232] pb-1`}>ROSTER</div>
                        <div className="text-xs text-white font-mono flex items-center justify-between py-1"><span className="text-slate-400">LEADER</span> {selectedTeamDetails.leader}</div>
                        {selectedTeamDetails.members.map((m,i) => (
                          <div key={i} className="text-xs text-white font-mono flex items-center justify-between py-1"><span className="text-slate-400">MEMBER {i+2}</span> {m}</div>
                        ))}
                      </div>

                      <div>
                        <div className={`${S.fontMono} text-[9px] text-[#FF4D4D] mb-2 border-b border-[#162232] pb-1`}>LOGIN CREDENTIALS</div>
                        <div className="text-[10px] font-mono text-slate-400 mb-2 flex justify-between">
                          <span>ACCESS KEY:</span>
                          <span className="text-[#5CFF9A] tracking-widest">{selectedTeamDetails.password || 'shockwave'}</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 border border-[#162232] text-xs font-mono hover:bg-[#162232] cursor-pointer text-slate-400">RESET KEY</button>
                          <button className="flex-1 py-2 border border-[#FF4D4D] text-[#FF4D4D] text-xs font-mono hover:bg-[#FF4D4D]/10 cursor-pointer">REVOKE ACCESS</button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-[#162232] flex gap-2">
                      <button onClick={() => setSelectedTeamId(null)} className="flex-1 py-2 bg-[#162232] text-white text-xs font-mono cursor-pointer">CLOSE</button>
                      <button onClick={() => { if(window.confirm('DELETE TEAM?')) { deleteTeam(selectedTeamDetails.id); setSelectedTeamId(null); } }} className="flex-1 py-2 bg-[#FF4D4D] text-white text-xs font-mono cursor-pointer">DELETE</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-slate-600 font-mono text-xs">
                    SELECT A TEAM
                  </div>
                )}
              </div>
            </div>
          )}


          {/* ============================================================== */}
          {/* JUDGING MATRIX VIEW */}
          {/* ============================================================== */}
          {activeTab === 'JUDGING' && (
            <div className="flex flex-col h-[calc(100vh-160px)]">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className={`${S.fontDisplay} text-3xl text-white`}>JUDGING MATRIX</h2>
                  <div className={`${S.fontMono} text-[10px] text-slate-500 mt-1`}>ENTER PITCH SCORES FROM 3 JUDGES</div>
                </div>
              </div>

              <div className="flex-1 overflow-auto border border-[#162232] bg-[#0C1218]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#05080C] text-slate-500 text-[9px] sticky top-0 border-b border-[#162232] z-10">
                    <tr>
                      <th className="p-4 w-64 border-r border-[#162232]">TEAM</th>
                      <th className="p-4 text-center border-r border-[#162232]">JUDGE 1</th>
                      <th className="p-4 text-center border-r border-[#162232]">JUDGE 2</th>
                      <th className="p-4 text-center border-r border-[#162232]">JUDGE 3</th>
                      <th className="p-4 text-center border-r border-[#162232]">AVG PITCH SCORE</th>
                      <th className="p-4 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#162232]">
                    {teams.map(t => {
                      const score = scores.find(s => s.team_id === t.id) || { pitch_score: 0, defense_score: 0, crossfire_score: 0 };
                      return (
                        <JudgingRow 
                          key={t.id} 
                          team={t} 
                          currentScore={score} 
                          onSave={(p) => {
                            updateTeamScore(t.id, p, score.defense_score, score.crossfire_score, 'JUDGE MATRIX AVERAGE');
                            triggerOpAlert('PITCH SCORES AVERAGED & SAVED');
                          }} 
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LEADERBOARD VIEW */}
          {/* ============================================================== */}
          {activeTab === 'LEADERBOARD' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-160px)]">
              
              {/* RANKINGS (Span 8) */}
              <div className="lg:col-span-8 flex flex-col h-full border border-[#162232] bg-[#0C1218]">
                <div className="p-4 border-b border-[#162232] bg-[#101820] flex justify-between items-center">
                  <div className={`${S.fontDisplay} text-xl text-white`}>LIVE RANKINGS</div>
                  <div className="flex gap-2">
                    {leaderboardLocked ? (
                      <button onClick={() => setLeaderboardLocked(false)} className="px-3 py-1.5 bg-[#FF4D4D] text-white text-[10px] font-bold font-mono cursor-pointer flex items-center gap-1">
                        <Lock className="w-3 h-3" /> LOCKED
                      </button>
                    ) : (
                      <button onClick={() => { if(window.confirm('FINALIZE SCORES?')) setLeaderboardLocked(true); }} className="px-3 py-1.5 border border-[#F4D62E] text-[#F4D62E] hover:bg-[#F4D62E]/10 text-[10px] font-bold font-mono cursor-pointer flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> FINALIZE
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4">
                  <div className="space-y-2">
                    {/* Sort teams by total score descending */}
                    {[...teams].map(t => {
                      const s = scores.find(item => item.team_id === t.id) || {
                        pitch_score: 0, defense_score: 0, crossfire_score: 0, total_score: 0
                      };
                      return { team: t, score: s };
                    }).sort((a,b) => b.score.total_score - a.score.total_score)
                    .map((item, idx) => (
                      <div key={item.team.id} className="flex bg-[#05080C] border border-[#162232] items-stretch">
                        <div className={`w-12 flex items-center justify-center font-display text-2xl ${idx===0?'text-[#F4D62E] bg-[#F4D62E]/10 border-r border-[#F4D62E]/30': idx===1?'text-slate-300':'text-slate-600'} border-r border-[#162232]`}>
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1 p-3 flex justify-between items-center">
                          <div>
                            <div className={`${S.fontMono} text-[#19D8FF] text-[10px]`}>{item.team.team_code}</div>
                            <div className={`${S.fontDisplay} text-lg text-white leading-none`}>{item.team.name}</div>
                          </div>
                          <div className="flex gap-4 sm:gap-8 items-center">
                            <div className="hidden sm:flex gap-4 font-mono text-[10px] text-slate-500">
                              <div className="text-center">P<br/><span className="text-white">{item.score.pitch_score}</span></div>
                              <div className="text-center">D<br/><span className="text-white">{item.score.defense_score}</span></div>
                              <div className="text-center">CF<br/><span className="text-white">{item.score.crossfire_score}</span></div>
                            </div>
                            <div className={`${S.fontDisplay} text-3xl ${idx===0?'text-[#F4D62E]':'text-[#19D8FF]'}`}>
                              {item.score.total_score}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CORRECTION (Span 4) */}
              <div className="lg:col-span-4 border border-[#162232] bg-[#0C1218] flex flex-col h-full">
                <div className="p-4 border-b border-[#162232] bg-[#101820]">
                  <div className={`${S.fontDisplay} text-lg text-white`}>MANUAL CORRECTION</div>
                  <div className={`${S.fontMono} text-[9px] text-slate-500`}>OVERRIDE SYSTEM SCORE</div>
                </div>
                
                <div className="p-6 space-y-4">
                  {leaderboardLocked ? (
                    <div className="p-4 border border-[#FF4D4D] bg-[#FF4D4D]/10 text-[#FF4D4D] text-xs font-mono text-center">
                      LEADERBOARD FINALIZED.<br/>CORRECTIONS DISABLED.
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className={`${S.fontMono} text-[9px] text-slate-500 block mb-1`}>SELECT TEAM</label>
                        <select 
                          value={correctionTeamId}
                          onChange={e => setCorrectionTeamId(e.target.value)}
                          className="w-full p-2 bg-[#05080C] border border-[#162232] text-white text-xs font-mono outline-none focus:border-[#00AEEF]"
                        >
                          <option value="">SELECT...</option>
                          {teams.map(t => <option key={t.id} value={t.id}>{t.team_code} - {t.name}</option>)}
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={`${S.fontMono} text-[9px] text-slate-500 block mb-1`}>CATEGORY</label>
                          <select 
                            value={correctionCategory}
                            onChange={e => setCorrectionCategory(e.target.value as any)}
                            className="w-full p-2 bg-[#05080C] border border-[#162232] text-white text-xs font-mono outline-none focus:border-[#00AEEF]"
                          >
                            <option value="pitch">PITCH</option>
                            <option value="defense">DEFENSE</option>
                            <option value="crossfire">CROSSFIRE</option>
                          </select>
                        </div>
                        <div>
                          <label className={`${S.fontMono} text-[9px] text-[#F4D62E] block mb-1`}>NEW SCORE</label>
                          <input 
                            type="number" 
                            value={correctionScore}
                            onChange={e => setCorrectionScore(e.target.value ? Number(e.target.value) : '')}
                            className="w-full p-2 bg-[#101820] border border-[#F4D62E]/50 text-[#F4D62E] text-xs font-mono outline-none text-center" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`${S.fontMono} text-[9px] text-slate-500 block mb-1`}>AUDIT REASON</label>
                        <input 
                          type="text" 
                          value={correctionReason}
                          onChange={e => setCorrectionReason(e.target.value)}
                          placeholder="REQUIRED FOR LOG..." 
                          className="w-full p-2 bg-[#05080C] border border-[#162232] text-white text-xs font-mono outline-none focus:border-[#00AEEF]" 
                        />
                      </div>

                      <button 
                        onClick={handleScoreCorrection}
                        disabled={!correctionTeamId || correctionScore === '' || !correctionReason.trim()}
                        className={`w-full mt-4 py-3 border font-bold text-[10px] font-mono transition-colors ${
                          !correctionTeamId || correctionScore === '' || !correctionReason.trim()
                            ? 'border-[#162232] text-slate-500 cursor-not-allowed'
                            : 'border-[#F4D62E] text-[#F4D62E] hover:bg-[#F4D62E]/10 cursor-pointer'
                        }`}
                      >
                        CONFIRM CORRECTION
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          )}


          {/* ============================================================== */}
          {/* ANNOUNCEMENTS & DISPLAY */}
          {/* ============================================================== */}
          {(activeTab === 'ANNOUNCEMENTS' || activeTab === 'DISPLAY') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* BROADCAST CENTER */}
              <div className={`${S.bgPanel} border border-[#162232] flex flex-col`}>
                <div className="p-4 border-b border-[#162232] bg-[#101820]">
                  <div className={`${S.fontDisplay} text-xl text-white`}>BROADCAST CENTER</div>
                  <div className={`${S.fontMono} text-[9px] text-slate-500`}>PUSH TO ALL PARTICIPANT TERMINALS</div>
                </div>

                <div className="p-6 border-b border-[#162232]">
                  <form onSubmit={handlePublishAnn} className="space-y-4">
                    <div>
                      <label className={`${S.fontMono} text-[9px] text-slate-500 block mb-2`}>PRIORITY LEVEL</label>
                      <div className="flex gap-2">
                        {(['info', 'warning', 'urgent'] as const).map(lvl => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setAnnouncementLevel(lvl)}
                            className={`flex-1 py-2 font-mono text-[10px] uppercase cursor-pointer border ${
                              announcementLevel === lvl 
                                ? lvl === 'urgent' ? 'bg-[#FF4D4D] border-[#FF4D4D] text-white' :
                                  lvl === 'warning' ? 'bg-[#F4D62E] border-[#F4D62E] text-black' : 'bg-[#00AEEF] border-[#00AEEF] text-black'
                                : 'bg-transparent border-[#162232] text-slate-500 hover:text-white'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={`${S.fontMono} text-[9px] text-slate-500 block mb-1`}>MESSAGE PAYLOAD</label>
                      <textarea 
                        required 
                        value={announcementMsg}
                        onChange={e => setAnnouncementMsg(e.target.value)}
                        className="w-full h-24 p-3 bg-[#05080C] border border-[#162232] text-white text-sm font-sans outline-none focus:border-[#00AEEF] resize-none" 
                        placeholder="ENTER TRANSMISSION DATA..."
                      />
                    </div>
                    <button type="submit" className="w-full py-3 bg-white text-black font-bold text-[10px] font-mono cursor-pointer hover:opacity-80">
                      TRANSMIT BROADCAST
                    </button>
                  </form>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-80">
                  <div className={`${S.fontMono} text-[9px] text-slate-500 mb-2`}>TRANSMISSION HISTORY</div>
                  {announcements.map((ann) => (
                    <div key={ann.id} className="p-3 bg-[#05080C] border border-[#162232] flex justify-between items-start">
                      <div>
                        <div className={`text-[9px] font-mono font-bold uppercase mb-1 ${
                          ann.level === 'urgent' ? S.textRed : ann.level === 'warning' ? S.textYellow : S.textCyan
                        }`}>{ann.level}</div>
                        <div className="text-xs font-sans text-white">{ann.message}</div>
                      </div>
                      <button onClick={() => deleteAnnouncement(ann.id)} className="text-slate-600 hover:text-[#FF4D4D] cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXTERNAL DISPLAY CONTROLS */}
              <div className={`${S.bgPanel} border border-[#162232] flex flex-col`}>
                <div className="p-4 border-b border-[#162232] bg-[#101820]">
                  <div className={`${S.fontDisplay} text-xl text-white`}>EVENT DISPLAY</div>
                  <div className={`${S.fontMono} text-[9px] text-slate-500`}>PROJECTOR / MAIN SCREEN OVERRIDE</div>
                </div>

                <div className="p-6 space-y-4">
                  <div className={`${S.fontMono} text-[9px] text-[#00AEEF] mb-4`}>SELECT ACTIVE VIEW MODE:</div>
                  
                  {[
                    { id: 'presentation', label: '01 PRESENTATION DISPLAY', sub: 'Shows active team & live timer' },
                    { id: 'leaderboard', label: '02 LEADERBOARD DISPLAY', sub: 'Top standings' }
                  ].map(mode => (
                    <button 
                      key={mode.id}
                      onClick={() => {
                        setDisplayMode(mode.id as any);
                        triggerOpAlert(`DISPLAY MODE SWITCHED TO: ${mode.id.toUpperCase()}`);
                      }}
                      className="w-full text-left p-4 border border-[#162232] bg-[#05080C] hover:border-[#00AEEF] cursor-pointer transition-colors group flex justify-between items-center"
                    >
                      <div>
                        <div className={`${S.fontDisplay} text-lg text-white group-hover:text-[#00AEEF]`}>{mode.label}</div>
                        <div className={`${S.fontMono} text-[9px] text-slate-500`}>{mode.sub}</div>
                      </div>
                      <Monitor className="w-5 h-5 text-slate-600 group-hover:text-[#00AEEF]" />
                    </button>
                  ))}
                  
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
