import React from 'react';

export type StatusType = 'LIVE' | 'ONLINE' | 'ACTIVE' | 'TRANSMITTING' | 'STANDBY' | 'WARNING' | 'ERROR';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  className = ''
}) => {
  const config = {
    LIVE: { dot: 'bg-[#00F0FF]', text: 'text-[#00F0FF]', ping: true },
    ONLINE: { dot: 'bg-[#00E676]', text: 'text-[#00E676]', ping: false },
    ACTIVE: { dot: 'bg-[#00F0FF]', text: 'text-[#00F0FF]', ping: true },
    TRANSMITTING: { dot: 'bg-[#FFE600]', text: 'text-[#FFE600]', ping: true },
    STANDBY: { dot: 'bg-slate-500', text: 'text-slate-400', ping: false },
    WARNING: { dot: 'bg-[#FFE600]', text: 'text-[#FFE600]', ping: true },
    ERROR: { dot: 'bg-[#FF3344]', text: 'text-[#FF3344]', ping: true }
  }[status];

  return (
    <div className={`inline-flex items-center space-x-1.5 font-mono text-[11px] select-none ${className}`}>
      <span className="relative flex h-2 w-2">
        {config.ping && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>
      <span className={`font-bold tracking-wider uppercase ${config.text}`}>
        {label || status}
      </span>
    </div>
  );
};
