import React from 'react';

interface TechnicalPanelProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'cyan' | 'gold' | 'danger' | 'success';
  chamfer?: boolean;
  className?: string;
}

export const TechnicalPanel: React.FC<TechnicalPanelProps> = ({
  children,
  title,
  subtitle,
  badge,
  badgeColor = 'cyan',
  chamfer = false,
  className = ''
}) => {
  const badgeClasses = {
    cyan: 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40',
    gold: 'bg-[#FFE600]/15 text-[#FFE600] border-[#FFE600]/40',
    danger: 'bg-[#FF3344]/15 text-[#FF3344] border-[#FF3344]/40',
    success: 'bg-[#00E676]/15 text-[#00E676] border-[#00E676]/40'
  }[badgeColor];

  return (
    <div className={`relative bg-[#0B1118] border border-[#162232] rounded-md ${chamfer ? 'clip-chamfer' : 'tech-corner-box'} ${className}`}>
      {(title || badge) && (
        <div className="px-4 py-2.5 bg-[#080C12] border-b border-[#162232] flex items-center justify-between font-mono">
          <div>
            {title && (
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                <span>{title}</span>
              </h4>
            )}
            {subtitle && (
              <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {badge && (
            <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${badgeClasses}`}>
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
};
