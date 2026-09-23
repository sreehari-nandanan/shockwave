import React, { useState } from 'react';
import { useEvent } from '../context/EventContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface ControlLoginProps {
  navigate: (path: string) => void;
}

export const ControlLogin: React.FC<ControlLoginProps> = ({ navigate }) => {
  const { switchUserRole } = useEvent();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    if (username.trim().toLowerCase() === 'sps' && password === '2026') {
      switchUserRole('admin');
      navigate('/admin');
    } else {
      setError('ACCESS DENIED. INVALID CREDENTIALS.');
    }
  };

  return (
    <div className="min-h-screen bg-[#05080C] text-slate-100 font-mono relative flex items-center justify-center p-6">
      
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Back button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-[10px] text-slate-500 hover:text-[#FF4D4D] flex items-center gap-2 tracking-widest uppercase transition-colors z-10 cursor-pointer"
      >
        <ArrowLeft className="w-3 h-3" /> BACK TO GATEWAY
      </button>

      <div className="w-full max-w-lg z-10">
        
        <div className="border border-[#FF4D4D]/30 bg-[#0C1218] p-10 relative">
          
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FF4D4D] opacity-50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF4D4D] opacity-50" />

          <div className="text-[10px] tracking-widest text-[#FF4D4D] uppercase mb-4 font-bold flex items-center gap-2">
            <ShieldAlert className="w-3 h-3" /> RESTRICTED ACCESS AREA
          </div>

          <h2 className="font-black text-4xl sm:text-5xl text-white uppercase mb-8 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            ADMIN <span className="text-[#FF4D4D]">CONTROL</span>
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div>
              <label className="text-[10px] tracking-widest text-slate-500 uppercase block mb-2">
                OPERATOR ID
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                className="w-full bg-[#05080C] border border-[#162232] p-4 text-sm text-white font-mono uppercase focus:outline-none focus:border-[#FF4D4D] transition-colors"
                placeholder="e.g. SPS"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-widest text-slate-500 uppercase block mb-2">
                ACCESS KEY
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-[#05080C] border border-[#162232] p-4 text-sm text-white font-mono uppercase focus:outline-none focus:border-[#FF4D4D] transition-colors"
                placeholder="••••••••"
              />
              {error && (
                <div className="mt-2 text-[#FF4D4D] text-[10px] uppercase font-bold bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 p-2">
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#FF4D4D] text-white font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-80 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              AUTHORIZE ACCESS
            </button>
            
          </form>

          <div className="mt-8 pt-6 border-t border-[#162232]">
            <p className="text-[10px] text-slate-500 uppercase leading-relaxed">
              This terminal is for event administrators and authorized judges only. All access attempts are logged.
            </p>
          </div>
          
        </div>

      </div>
    </div>
  );
};
