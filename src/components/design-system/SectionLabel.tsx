import React from 'react';

interface SectionLabelProps {
  index?: string;
  title: string;
  badge?: string;
  color?: 'cyan' | 'gold' | 'danger';
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  index = 'SYS_01',
  title,
  badge,
  color = 'cyan',
  className = ''
}) => {
  const colorMap = {
    cyan: {
      text: 'text-[#00F0FF]',
      bg: 'bg-[#00F0FF]/10',
      border: 'border-[#00F0FF]/40',
      bar: 'bg-[#00F0FF]'
    },
    gold: {
      text: 'text-[#FFE600]',
      bg: 'bg-[#FFE600]/10',
      border: 'border-[#FFE600]/40',
      bar: 'bg-[#FFE600]'
    },
    danger: {
      text: 'text-[#FF3344]',
      bg: 'bg-[#FF3344]/10',
      border: 'border-[#FF3344]/40',
      bar: 'bg-[#FF3344]'
    }
  }[color];

  return (
    <div className={`flex items-center space-x-2 font-mono select-none ${className}`}>
      <span className={`w-1.5 h-3.5 ${colorMap.bar}`} />
      <span className="text-[10px] text-slate-500 tracking-wider">
        [{index}]
      </span>
      <span className={`text-xs font-bold uppercase tracking-widest ${colorMap.text}`}>
        {title}
      </span>
      {badge && (
        <span className={`text-[9px] px-1.5 py-0.2 rounded border ${colorMap.bg} ${colorMap.border} ${colorMap.text} uppercase font-bold`}>
          {badge}
        </span>
      )}
    </div>
  );
};
