import React from 'react';

interface DataWindowProps {
  title: string;
  code?: string;
  status?: string;
  children: React.ReactNode;
  variant?: 'cyan' | 'gold' | 'dark';
  className?: string;
}

export const DataWindow: React.FC<DataWindowProps> = ({
  title,
  code = '0x7E',
  status = 'ONLINE',
  children,
  variant = 'cyan',
  className = ''
}) => {
  const borderCol = variant === 'gold' ? 'border-[#FFE600]/40' : variant === 'cyan' ? 'border-[#00F0FF]/40' : 'border-[#162232]';
  const headerBg = variant === 'gold' ? 'bg-[#FFE600]/10 text-[#FFE600]' : variant === 'cyan' ? 'bg-[#00F0FF]/10 text-[#00F0FF]' : 'bg-[#080C12] text-slate-300';

  return (
    <div className={`crt-data-window rounded border ${borderCol} overflow-hidden font-mono ${className}`}>
      {/* Window Titlebar */}
      <div className={`px-3 py-1.5 flex items-center justify-between border-b ${borderCol} ${headerBg} text-[11px]`}>
        <div className="flex items-center space-x-2">
          {/* Retro terminal dots */}
          <div className="flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#FF3344] inline-block opacity-80" />
            <span className="w-2 h-2 rounded-full bg-[#FFE600] inline-block opacity-80" />
            <span className="w-2 h-2 rounded-full bg-[#00E676] inline-block opacity-80" />
          </div>
          <span className="font-bold tracking-wider uppercase">{title}</span>
          <span className="text-[10px] opacity-60">[{code}]</span>
        </div>

        <div className="flex items-center space-x-2 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
          <span className="font-bold">{status}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 text-xs">
        {children}
      </div>
    </div>
  );
};
