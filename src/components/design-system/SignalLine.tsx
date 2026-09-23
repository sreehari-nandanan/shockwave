import React from 'react';

interface SignalLineProps {
  color?: string;
  height?: number;
  animated?: boolean;
  className?: string;
}

export const SignalLine: React.FC<SignalLineProps> = ({
  color = '#00F0FF',
  height = 24,
  animated = true,
  className = ''
}) => {
  return (
    <div className={`w-full overflow-hidden flex items-center select-none ${className}`}>
      <svg 
        viewBox="0 0 1000 24" 
        preserveAspectRatio="none" 
        className="w-full h-full block" 
        style={{ height: `${height}px` }}
      >
        <defs>
          <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="30%" stopColor={color} stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="70%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
          <filter id="sigGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base faint circuit track */}
        <path
          d="M 0 12 L 350 12 L 380 4 L 400 20 L 420 2 L 440 22 L 460 6 L 480 16 L 500 12 L 1000 12"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.25"
        />

        {/* Active Waveform Pulse */}
        <path
          d="M 0 12 L 350 12 L 380 4 L 400 20 L 420 2 L 440 22 L 460 6 L 480 16 L 500 12 L 1000 12"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          filter="url(#sigGlow)"
          strokeDasharray={animated ? "80 200" : "none"}
        >
          {animated && (
            <animate
              attributeName="stroke-dashoffset"
              from="280"
              to="-280"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Nodes and Solder Pads */}
        <circle cx="350" cy="12" r="3" fill={color} />
        <circle cx="500" cy="12" r="3" fill="#FFE600" />
        <rect x="375" y="2" width="4" height="4" fill={color} />
        <rect x="435" y="18" width="4" height="4" fill={color} />
      </svg>
    </div>
  );
};
