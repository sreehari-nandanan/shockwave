import React from 'react';

export const CircuitBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-70" />

      {/* Radial Gradient Vignette for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,240,255,0.04)_0%,_rgba(5,8,13,0.8)_60%,_#05080D_100%)]" />

      {/* PCB Trace Graphic Overlay */}
      <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pcb-traces" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 20 60 L 60 100 L 140 100 L 180 140 L 180 200" fill="none" stroke="#00F0FF" strokeWidth="1" strokeDasharray="4 2" />
            <path d="M 0 160 L 50 160 L 90 120 L 110 120" fill="none" stroke="#00F0FF" strokeWidth="1" />
            <circle cx="60" cy="100" r="3" fill="#00F0FF" />
            <circle cx="140" cy="100" r="3" fill="#00F0FF" />
            <circle cx="110" cy="120" r="2.5" fill="#FFE600" />
            <rect x="175" y="135" width="10" height="10" fill="none" stroke="#00F0FF" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb-traces)" />
      </svg>

      {/* Corner Coordinate Badges */}
      <div className="absolute top-16 left-6 font-mono text-[10px] text-shockwave-cyan/30 tracking-widest hidden md:block">
        [SYS.NODE: 0x7E3A // LAT: 09°58&apos;N // IEEE-SPS]
      </div>
      <div className="absolute top-16 right-6 font-mono text-[10px] text-shockwave-gold/30 tracking-widest hidden md:block">
        [RF.BAND: 868.10 MHz // MOD: CHIRP // MULEARN]
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-slate-700 tracking-widest hidden md:block">
        TIST STUDENT CHAPTER // AMRUTHAM HALL // 2026.09.29
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-slate-700 tracking-widest hidden md:block">
        TELEMETRY: SYNCHRONIZED [REALTIME BUS]
      </div>
    </div>
  );
};
