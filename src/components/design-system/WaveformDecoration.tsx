import React from 'react';

interface WaveformDecorationProps {
  color?: string;
  height?: number;
  type?: 'cardiac' | 'carrier' | 'spectrum';
  className?: string;
}

export const WaveformDecoration: React.FC<WaveformDecorationProps> = ({
  color = '#00F0FF',
  height = 36,
  type = 'cardiac',
  className = ''
}) => {
  return (
    <div className={`overflow-hidden select-none opacity-40 ${className}`}>
      <svg 
        viewBox="0 0 400 36" 
        preserveAspectRatio="none" 
        className="w-full" 
        style={{ height: `${height}px` }}
      >
        {type === 'cardiac' && (
          <path
            d="M 0 18 L 80 18 L 95 6 L 105 30 L 115 2 L 125 34 L 135 12 L 145 22 L 155 18 L 240 18 L 255 6 L 265 30 L 275 2 L 285 34 L 295 12 L 305 22 L 315 18 L 400 18"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
        )}
        {type === 'carrier' && (
          <path
            d="M 0 18 Q 20 4, 40 18 T 80 18 T 120 18 T 160 18 T 200 18 T 240 18 T 280 18 T 320 18 T 360 18 T 400 18"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
        )}
        {type === 'spectrum' && (
          <g fill={color}>
            {[10, 25, 40, 55, 70, 85, 100, 115, 130, 145, 160, 175, 190, 205, 220, 235, 250, 265, 280, 295, 310, 325, 340, 355, 370, 385].map((x, i) => (
              <rect
                key={x}
                x={x}
                y={18 - (Math.sin(i * 0.4) * 12 + 2)}
                width="4"
                height={Math.sin(i * 0.4) * 24 + 4}
                opacity={0.8}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};
