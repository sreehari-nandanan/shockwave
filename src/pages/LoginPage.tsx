import React, { useState } from 'react';
import { useEvent } from '../context/EventContext';
import { 
  SectionLabel, 
  TabNavigation, 
  TechnicalInput, 
  PrimaryButton, 
  SecondaryButton, 
  StatusIndicator 
} from '../components/design-system';
import { 
  Lock, 
  Cpu, 
  UserCheck, 
  ShieldAlert, 
  ArrowRight, 
  Terminal, 
  Key 
} from 'lucide-react';
import { Role } from '../types';

interface LoginPageProps {
  navigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { teams, switchUserRole } = useEvent();
  const [activeTab, setActiveTab] = useState<string>('team');
  const [teamCode, setTeamCode] = useState('SW-001');
  const [accessKey, setAccessKey] = useState('IEEE-SPS-2026');
  const [errorMsg, setErrorMsg] = useState('');

  const loginTabs = [
    { id: 'team', label: 'TEAM CONSOLE', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'judge', label: 'JUDGE CONTROL', icon: <UserCheck className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'ADMIN ROOM', icon: <ShieldAlert className="w-3.5 h-3.5" /> }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'team') {
      const formatted = teamCode.trim().toUpperCase();
      const targetTeam = teams.find(t => t.team_code.toUpperCase() === formatted || t.name.toUpperCase().includes(formatted));
      if (targetTeam) {
        switchUserRole('team', targetTeam.id);
        navigate('/team');
      } else {
        setErrorMsg(`Unknown Team Code "${teamCode}". Try SW-001 or SW-002.`);
      }
    } else if (activeTab === 'judge') {
      switchUserRole('judge');
      navigate('/judge');
    } else if (activeTab === 'admin') {
      switchUserRole('admin');
      navigate('/admin');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 font-mono text-xs relative z-10">
      {/* Control Room Aesthetic Window */}
      <div className="p-6 sm:p-8 rounded-lg bg-[#080C12] border border-[#162232] shadow-2xl tech-corner-box">
        {/* Top Status */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#162232]">
          <SectionLabel index="AUTH_GATE" title="CONTROL ROOM LOGIN" color="cyan" />
          <StatusIndicator status="ACTIVE" label="SECURE" />
        </div>

        {/* Tab selection for TEAM, JUDGE, ADMIN */}
        <div className="mb-6">
          <TabNavigation
            tabs={loginTabs}
            activeTab={activeTab}
            onChange={(id) => {
              setActiveTab(id);
              setErrorMsg('');
            }}
            variant={activeTab === 'admin' ? 'danger' : activeTab === 'judge' ? 'gold' : 'cyan'}
          />
        </div>

        {/* Dynamic Form Content */}
        <form onSubmit={handleLogin} className="space-y-4">
          {activeTab === 'team' && (
            <>
              <TechnicalInput
                label="TEAM IDENTIFIER CODE"
                badge="ASSIGNED"
                value={teamCode}
                onChange={(e) => {
                  setTeamCode(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="e.g. SW-001"
                required
              />
              <div className="text-[10px] text-slate-500">
                Demo codes: <span className="text-[#00F0FF] cursor-pointer" onClick={() => setTeamCode('SW-001')}>SW-001</span> (Aether), <span className="text-[#00F0FF] cursor-pointer" onClick={() => setTeamCode('SW-002')}>SW-002</span> (CircuitX)
              </div>
            </>
          )}

          {activeTab === 'judge' && (
            <>
              <TechnicalInput
                label="JUDGE CALLSIGN / EMAIL"
                value="judge1@shockwave.ieee.org"
                readOnly
                badge="AUTHORIZED"
              />
              <TechnicalInput
                label="EVALUATION ACCESS TOKEN"
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                badge="ENCRYPTED"
              />
              <div className="text-[10px] text-[#FFE600]">
                Pre-authorized as Dr. Radhakrishnan (IEEE Senior Member)
              </div>
            </>
          )}

          {activeTab === 'admin' && (
            <>
              <TechnicalInput
                label="OPERATOR CONSOLE ID"
                value="control@shockwave.org"
                readOnly
                badge="MASTER"
              />
              <TechnicalInput
                label="ARENA ENCRYPTION KEY"
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                badge="ROOT"
              />
              <div className="text-[10px] text-[#FF3344]">
                IEEE SPS × MuLearn Master Orchestration Desk
              </div>
            </>
          )}

          {errorMsg && (
            <div className="text-[11px] text-[#FF3344] bg-[#FF3344]/10 p-2 rounded border border-[#FF3344]/30">
              {errorMsg}
            </div>
          )}

          <div className="pt-2">
            <PrimaryButton 
              type="submit" 
              fullWidth 
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              AUTHENTICATE CONSOLE
            </PrimaryButton>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#162232] text-center text-slate-500 text-[11px]">
          Need to register a team?{' '}
          <button 
            onClick={() => navigate('/register')} 
            className="text-[#00F0FF] hover:underline cursor-pointer font-bold"
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};
