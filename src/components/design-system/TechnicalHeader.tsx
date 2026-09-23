import React from 'react';

interface TechnicalHeaderProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const TechnicalHeader: React.FC<TechnicalHeaderProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* Small Organization Accreditation Vector Badges */}
      <div className="flex items-center space-x-4 mb-2 font-mono text-[11px] tracking-wider text-slate-400">
        <div className="flex items-center space-x-1.5">
          {/* IEEE SPS Vector Logo Mark */}
          <svg className="w-4 h-4 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 12 12 22 22 12 12 2" />
            <line x1="12" y1="6" x2="12" y2="18" />
            <circle cx="12" cy="12" r="2" fill="#00F0FF" />
          </svg>
          <span className="font-bold text-slate-200">IEEE SPS</span>
          <span className="text-[9px] text-slate-500 hidden sm:inline">TIST CHAPTER</span>
        </div>

        <span className="text-slate-600">&times;</span>

        <div className="flex items-center space-x-1.5">
          {/* MuLearn Vector Logo Mark */}
          <div className="w-4 h-4 rounded bg-[#0A84FF]/20 border border-[#0A84FF]/40 flex items-center justify-center font-bold text-[#0A84FF] text-[10px]">
            µ
          </div>
          <span className="font-bold text-slate-200">µLearn</span>
          <span className="text-[9px] text-slate-500 hidden sm:inline">TIST</span>
        </div>
      </div>

      {/* Bespoke Native SVG SHOCKWAVE Jagged Lightning Wordmark */}
      <div className="relative w-full max-w-3xl flex items-center justify-center my-1">
        <svg 
          viewBox="0 0 840 140" 
          className="w-full h-auto max-h-28 overflow-visible"
        >
          <defs>
            <filter id="shockwaveCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#0A84FF" />
            </linearGradient>
          </defs>

          {/* Left Signal Waveform Extension */}
          <path
            d="M 10 70 L 140 70 L 155 45 L 170 95 L 185 30 L 200 110 L 215 55 L 230 70 L 260 70"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="3"
            filter="url(#shockwaveCyanGlow)"
          />
          <circle cx="10" cy="70" r="4" fill="#00F0FF" />

          {/* Right Signal Waveform Extension */}
          <path
            d="M 580 70 L 610 70 L 625 45 L 640 95 L 655 30 L 670 110 L 685 55 L 700 70 L 830 70"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="3"
            filter="url(#shockwaveCyanGlow)"
          />
          <circle cx="830" cy="70" r="4" fill="#00F0FF" />

          {/* Center High-Voltage SHOCKWAVE Lettering */}
          <g filter="url(#shockwaveCyanGlow)">
            {/* Outer Cyan Silhouette Shadow */}
            <text
              x="420"
              y="94"
              textAnchor="middle"
              fontFamily="'Orbitron', sans-serif"
              fontSize="68"
              fontWeight="900"
              letterSpacing="8"
              fill="#05080D"
              stroke="#00F0FF"
              strokeWidth="6"
              strokeLinejoin="miter"
            >
              SHOCKWAVE
            </text>

            {/* Inner High-Contrast White / Lightning Fill */}
            <text
              x="420"
              y="94"
              textAnchor="middle"
              fontFamily="'Orbitron', sans-serif"
              fontSize="68"
              fontWeight="900"
              letterSpacing="8"
              fill="url(#lightningGrad)"
            >
              SHOCKWAVE
            </text>
          </g>

          {/* Central Lightning Bolt Glyph in the center */}
          <polygon
            points="422,35 410,65 423,65 416,105 435,68 424,68"
            fill="#FFE600"
            filter="url(#shockwaveCyanGlow)"
          />
        </svg>
      </div>

      {showSubtitle && (
        <div className="flex flex-col items-center">
          <div className="font-mono text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#FFE600] uppercase mt-1 flex items-center space-x-2">
            <span>BUILD</span>
            <span className="text-slate-600">/</span>
            <span>PITCH</span>
            <span className="text-slate-600">/</span>
            <span>CHALLENGE</span>
          </div>

          <div className="font-mono text-[11px] text-slate-400 tracking-widest uppercase mt-1">
            A Hardware &amp; IoT Pitch Competition
          </div>
        </div>
      )}
    </div>
  );
};
