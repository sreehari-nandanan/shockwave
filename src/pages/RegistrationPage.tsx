import React, { useState } from 'react';
import { useEvent } from '../context/EventContext';
import { ArrowLeft, Check } from 'lucide-react';
import { Team } from '../types';

interface RegistrationPageProps {
  navigate: (path: string) => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ navigate }) => {
  const { addTeam, switchUserRole } = useEvent();

  const [teamName, setTeamName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [institution, setInstitution] = useState('');
  const [teamLeader, setTeamLeader] = useState('');
  const [member2, setMember2] = useState('');
  const [member3, setMember3] = useState('');
  const [member4, setMember4] = useState('');

  const [registeredTeam, setRegisteredTeam] = useState<Team | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !projectName.trim() || !teamLeader.trim()) return;

    const membersList = [member2, member3, member4].filter(m => m.trim().length > 0);

    const newTeam = addTeam({
      name: teamName.trim(),
      college: institution.trim() || 'Toc H Institute of Science & Technology',
      project_name: projectName.trim(),
      project_description: '',
      leader: teamLeader.trim(),
      members: membersList,
      specs: {
        mcu: '', sensors: [], connectivity: '', power_budget: '', dsp_method: ''
      }
    });

    setRegisteredTeam(newTeam);
  };

  const handleEnterDashboard = () => {
    if (registeredTeam) {
      switchUserRole('team', registeredTeam.id);
      navigate('/team');
    }
  };

  const S = {
    fontDisplay: 'font-black uppercase tracking-tight',
    fontMono: 'font-mono text-xs uppercase tracking-wider',
  };

  if (registeredTeam) {
    return (
      <div className="min-h-screen bg-[#05080C] text-slate-100 flex items-center justify-center p-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="w-full max-w-xl bg-[#0C1218] border border-[#162232] p-12 text-center relative">
          
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#5CFF9A] opacity-50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#5CFF9A] opacity-50" />

          <Check className="w-16 h-16 text-[#5CFF9A] mx-auto mb-6" />
          
          <div className={`${S.fontMono} text-[#5CFF9A] mb-4`}>REGISTRATION SUCCESSFUL</div>
          
          <h2 className={`${S.fontDisplay} text-5xl text-white mb-2`}>{registeredTeam.name}</h2>
          <div className="text-xl text-slate-400 font-sans mb-8">{registeredTeam.project_name}</div>
          
          <div className="bg-[#05080C] border border-[#162232] p-6 mb-8 text-left">
            <div className={`${S.fontMono} text-slate-500 mb-2`}>CRITICAL // SAVE THIS CREDENTIAL</div>
            <div className={`${S.fontDisplay} text-5xl text-[#00AEEF] text-center`}>{registeredTeam.team_code}</div>
            <div className="text-[10px] font-mono text-slate-500 mt-2 text-center">TEAM IDENTIFIER CODE REQUIRED FOR PORTAL LOGIN</div>
          </div>

          <button 
            onClick={handleEnterDashboard}
            className={`w-full py-4 bg-[#5CFF9A] text-black font-bold ${S.fontMono} hover:bg-white transition-colors cursor-pointer`}
          >
            ENTER PARTICIPANT PORTAL
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080C] text-slate-100 relative" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Back button */}
      <button 
        onClick={() => navigate('/')}
        className={`absolute top-8 left-8 ${S.fontMono} text-slate-500 hover:text-[#00AEEF] flex items-center gap-2 transition-colors z-10 cursor-pointer bg-[#05080C] p-2`}
      >
        <ArrowLeft className="w-3 h-3" /> BACK TO GATEWAY
      </button>

      <div className="max-w-3xl mx-auto pt-24 pb-12 px-6 z-10 relative">
        
        <div className="mb-12 border-b border-[#162232] pb-6 text-center">
          <div className={`${S.fontMono} text-[#00AEEF] mb-2`}>TEAM ONBOARDING</div>
          <h1 className={`${S.fontDisplay} text-5xl sm:text-6xl text-white tracking-tighter leading-none`}>
            NEW <span className="text-[#00AEEF]">REGISTRATION</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-[#0C1218] border border-[#162232] p-8 sm:p-12 relative">
          
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#19D8FF] opacity-50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#19D8FF] opacity-50" />

          {/* Project Details */}
          <div className="space-y-6">
            <h3 className={`${S.fontMono} text-[#19D8FF] border-b border-[#162232] pb-2`}>PROJECT SPECIFICATIONS</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={`${S.fontMono} text-slate-500 block mb-2`}>TEAM NAME *</label>
                <input required value={teamName} onChange={e=>setTeamName(e.target.value)} className="w-full bg-[#05080C] border border-[#162232] p-3 text-white font-sans text-sm focus:border-[#00AEEF] outline-none" />
              </div>
              <div>
                <label className={`${S.fontMono} text-slate-500 block mb-2`}>PROJECT TITLE *</label>
                <input required value={projectName} onChange={e=>setProjectName(e.target.value)} className="w-full bg-[#05080C] border border-[#162232] p-3 text-white font-sans text-sm focus:border-[#00AEEF] outline-none" />
              </div>
            </div>

            <div>
              <label className={`${S.fontMono} text-slate-500 block mb-2`}>INSTITUTION</label>
              <input value={institution} onChange={e=>setInstitution(e.target.value)} placeholder="Toc H Institute of Science & Technology" className="w-full bg-[#05080C] border border-[#162232] p-3 text-white font-sans text-sm focus:border-[#00AEEF] outline-none" />
            </div>
          </div>

          {/* Team Roster */}
          <div className="space-y-6 pt-6 border-t border-[#162232]">
            <h3 className={`${S.fontMono} text-[#19D8FF] border-b border-[#162232] pb-2`}>TEAM ROSTER</h3>
            
            <div>
              <label className={`${S.fontMono} text-[#F4D62E] block mb-2`}>TEAM LEADER (PRIMARY CONTACT) *</label>
              <input required value={teamLeader} onChange={e=>setTeamLeader(e.target.value)} className="w-full bg-[#101820] border border-[#F4D62E]/30 p-3 text-white font-sans text-sm focus:border-[#F4D62E] outline-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className={`${S.fontMono} text-slate-500 block mb-2`}>MEMBER 2</label>
                <input value={member2} onChange={e=>setMember2(e.target.value)} className="w-full bg-[#05080C] border border-[#162232] p-3 text-white font-sans text-sm focus:border-[#00AEEF] outline-none" />
              </div>
              <div>
                <label className={`${S.fontMono} text-slate-500 block mb-2`}>MEMBER 3</label>
                <input value={member3} onChange={e=>setMember3(e.target.value)} className="w-full bg-[#05080C] border border-[#162232] p-3 text-white font-sans text-sm focus:border-[#00AEEF] outline-none" />
              </div>
              <div>
                <label className={`${S.fontMono} text-slate-500 block mb-2`}>MEMBER 4</label>
                <input value={member4} onChange={e=>setMember4(e.target.value)} className="w-full bg-[#05080C] border border-[#162232] p-3 text-white font-sans text-sm focus:border-[#00AEEF] outline-none" />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button type="submit" className={`w-full py-4 bg-[#00AEEF] text-black font-bold ${S.fontMono} hover:bg-white transition-colors cursor-pointer`}>
              GENERATE REGISTRATION PROFILE
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
