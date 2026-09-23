import React from 'react';

interface CircuitDecorationProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';
  className?: string;
}

export const CircuitDecoration: React.FC<CircuitDecorationProps> = ({
  position = 'inline',
  className = ''
}) => {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg 
        viewBox="0 0 160 80" 
        className="w-40 h-20 opacity-30 stroke-current text-[#00F0FF]"
        fill="none"
      >
        <path d="M 0 10 L 60 10 L 80 30 L 140 30 L 160 50" strokeWidth="1" />
        <path d="M 20 40 L 50 40 L 70 60 L 120 60" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M 40 70 L 90 70 L 100 80" strokeWidth="1" />
        
        {/* Test Points & Vias */}
        <circle cx="60" cy="10" r="2.5" fill="#00F0FF" />
        <circle cx="80" cy="30" r="2.5" fill="#FFE600" />
        <circle cx="140" cy="30" r="3" stroke="#00F0FF" strokeWidth="1" fill="#05080D" />
        <circle cx="70" cy="60" r="2" fill="#00F0FF" />
        
        {/* SMD Pad arrays */}
        <rect x="100" y="27" width="5" height="6" fill="#00F0FF" opacity="0.8" />
        <rect x="110" y="27" width="5" height="6" fill="#00F0FF" opacity="0.8" />
        <rect x="120" y="27" width="5" height="6" fill="#00F0FF" opacity="0.8" />

        {/* Technical Label */}
        <text x="5" y="75" fill="#00F0FF" fontSize="7" fontFamily="monospace" opacity="0.7">
          BUS_CH01 // 868MHz
        </text>
      </svg>
    </div>
  );
};
