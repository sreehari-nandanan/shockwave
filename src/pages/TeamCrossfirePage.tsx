import React, { useState } from 'react';
import { useEvent } from '../context/EventContext';
import { Radio, ShieldAlert } from 'lucide-react';
import { Team } from '../types';

interface TeamCrossfirePageProps {
  myTeam: Team;
}

export const TeamCrossfirePage: React.FC<TeamCrossfirePageProps> = ({ myTeam }) => {
  const { currentTeam, submitQuestion, questions } = useEvent();
  const [questionText, setQuestionText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const S = {
    fontDisplay: 'font-black uppercase tracking-tight',
    fontMono: 'font-mono text-xs uppercase tracking-wider',
  };

  const myQuestions = questions.filter(q => q.asking_team_id === myTeam.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTeam) {
      setError('WAITING FOR ADMIN TO START PRESENTATION');
      return;
    }
    if (currentTeam.id === myTeam.id) {
      setError('CANNOT CHALLENGE YOUR OWN TEAM');
      return;
    }
    if (questionText.trim().length < 10) {
      setError('QUESTION TOO SHORT. ELABORATE.');
      return;
    }
    
    submitQuestion(
      myTeam.id,
      currentTeam.id,
      questionText.trim(),
      'General'
    );

    setQuestionText('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
      
      {/* ── Submission Form (Left) ── */}
      <div className="md:col-span-8 flex flex-col h-full bg-[#0C1218] border border-[#162232]">
        <div className="p-4 border-b border-[#162232] bg-[#101820] flex items-center justify-between">
          <div className={`${S.fontDisplay} text-xl text-white`}>CROSSFIRE TERMINAL</div>
          <div className={`${S.fontMono} text-[10px] text-slate-500`}>SECURE TRANSMISSION LINE</div>
        </div>

        <div className="p-8 flex-1 flex flex-col">
          {currentTeam ? (
            <div className="mb-6 p-4 border border-[#F4D62E]/30 bg-[#F4D62E]/5">
              <div className={`${S.fontMono} text-[10px] text-[#F4D62E] mb-1`}>TARGET: NOW PRESENTING</div>
              <div className={`${S.fontDisplay} text-2xl text-white`}>{currentTeam.team_code} - {currentTeam.name}</div>
            </div>
          ) : (
            <div className="mb-6 p-4 border border-[#FF4D4D]/30 bg-[#FF4D4D]/5 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-[#FF4D4D]" />
              <div className={`${S.fontMono} text-xs text-[#FF4D4D] font-bold`}>NO TEAM CURRENTLY PRESENTING</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <label className={`${S.fontMono} text-[10px] text-slate-500 mb-2 block`}>
              ENTER QUESTION DATA
            </label>
            <textarea
              disabled={!currentTeam || currentTeam.id === myTeam.id}
              value={questionText}
              onChange={(e) => {
                setQuestionText(e.target.value);
                setError('');
              }}
              placeholder="e.g. How does your signal processing algorithm handle high frequency noise?"
              className="flex-1 w-full bg-[#05080C] border border-[#162232] p-4 text-white font-sans text-sm outline-none focus:border-[#00AEEF] resize-none mb-4 disabled:opacity-50"
            />
            
            {error && (
              <div className="mb-4 p-3 border border-[#FF4D4D] bg-[#FF4D4D]/10 text-[#FF4D4D] text-[10px] font-mono font-bold">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 border border-[#5CFF9A] bg-[#5CFF9A]/10 text-[#5CFF9A] text-[10px] font-mono font-bold">
                QUESTION TRANSMITTED TO CONTROL.
              </div>
            )}

            <button
              type="submit"
              disabled={!currentTeam || currentTeam.id === myTeam.id || questionText.trim().length === 0}
              className={`w-full py-4 font-bold text-xs uppercase tracking-wider font-mono cursor-pointer transition-colors ${
                !currentTeam || currentTeam.id === myTeam.id
                  ? 'bg-[#162232] text-slate-500 cursor-not-allowed'
                  : 'bg-[#F4D62E] text-black hover:bg-white'
              }`}
            >
              TRANSMIT QUESTION
            </button>
          </form>
        </div>
      </div>

      {/* ── History (Right) ── */}
      <div className="md:col-span-4 flex flex-col h-full bg-[#0C1218] border border-[#162232]">
        <div className="p-4 border-b border-[#162232] bg-[#101820]">
          <div className={`${S.fontDisplay} text-lg text-white`}>MY TRANSMISSIONS</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {myQuestions.length === 0 ? (
            <div className="text-center p-8 text-slate-600 font-mono text-[10px]">
              <Radio className="w-6 h-6 mx-auto mb-2 opacity-50" />
              NO TRANSMISSIONS LOGGED
            </div>
          ) : (
            myQuestions.map(q => (
              <div key={q.id} className="p-3 border border-[#162232] bg-[#05080C]">
                <div className="flex justify-between items-start mb-2">
                  <div className={`${S.fontMono} text-[9px] text-slate-500`}>TO: {q.presenting_team_name}</div>
                  <div className={`${S.fontMono} text-[9px] font-bold ${
                    q.status === 'approved' || q.status === 'scored' ? 'text-[#5CFF9A]' :
                    q.status === 'rejected' ? 'text-[#FF4D4D]' : 'text-[#F4D62E]'
                  }`}>
                    {q.status.toUpperCase()}
                  </div>
                </div>
                <div className="text-xs font-sans text-slate-300">"{q.question}"</div>
                {q.asking_score !== undefined && (
                  <div className="mt-2 pt-2 border-t border-[#162232] text-[10px] font-mono text-[#00AEEF]">
                    SCORE AWARDED: {q.asking_score}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
