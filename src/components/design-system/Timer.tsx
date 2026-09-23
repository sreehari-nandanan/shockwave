import React from 'react';

interface TimerProps {
  seconds: number;
  totalSeconds?: number;
  running?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'giant';
  showLabel?: boolean;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({
  seconds,
  running = true,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const isCritical = seconds <= 30;

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-5xl sm:text-6xl',
    giant: 'text-7xl sm:text-8xl md:text-9xl'
  }[size];

  return (
    <div className={`flex flex-col font-mono select-none ${className}`}>
      {showLabel && (
        <div className="flex items-center space-x-2 text-[10px] text-slate-400 uppercase tracking-widest mb-1">
          <span className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-[#00E676] animate-ping' : 'bg-slate-500'}`} />
          <span>PRESENTATION CLOCK</span>
          <span className="text-slate-600">//</span>
          <span className={running ? 'text-[#00F0FF]' : 'text-slate-500'}>
            {running ? 'RUNNING' : 'PAUSED'}
          </span>
        </div>
      )}

      <div className={`font-black tracking-tight leading-none ${sizeClasses} ${
        isCritical ? 'text-[#FF3344] animate-pulse glow-danger' : 'text-[#FFE600] glow-gold'
      }`}>
        {timeStr}
      </div>
    </div>
  );
};
