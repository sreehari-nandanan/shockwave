import React from 'react';
import { LogIn, ShieldAlert } from 'lucide-react';

interface LandingPageProps {
  navigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ background: '#05080C' }}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Main Content */}
      <div className="text-center z-10 w-full max-w-2xl">
        
        {/* Title */}
        <h1 
          className="font-black uppercase tracking-tighter leading-none mb-4"
          style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}
        >
          SHOCK<span style={{ color: '#00AEEF' }}>WAVE</span>
        </h1>
        
        <div className="font-mono text-[10px] sm:text-xs text-slate-500 tracking-widest uppercase mb-16">
          Hardware & IoT Pitch Competition
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          
          <button
            onClick={() => navigate('/participant/login')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer group relative overflow-hidden"
            style={{ border: '1px solid rgba(0, 174, 239, 0.5)', color: '#00AEEF' }}
          >
            <div className="absolute inset-0 bg-[#00AEEF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out opacity-10" />
            <LogIn className="w-4 h-4" />
            Team Portal
          </button>

          <button
            onClick={() => navigate('/control/login')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer group relative overflow-hidden"
            style={{ border: '1px solid rgba(255, 77, 77, 0.5)', color: '#FF4D4D' }}
          >
            <div className="absolute inset-0 bg-[#FF4D4D] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out opacity-10" />
            <ShieldAlert className="w-4 h-4" />
            Admin Control
          </button>
          
        </div>

      </div>

    </div>
  );
};
