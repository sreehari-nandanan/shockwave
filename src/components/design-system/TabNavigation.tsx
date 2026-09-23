import React from 'react';

interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'cyan' | 'gold' | 'danger';
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'cyan',
  className = ''
}) => {
  const activeColor = {
    cyan: 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10',
    gold: 'border-[#FFE600] text-[#FFE600] bg-[#FFE600]/10',
    danger: 'border-[#FF3344] text-[#FF3344] bg-[#FF3344]/10'
  }[variant];

  return (
    <div className={`flex flex-wrap items-center gap-1.5 p-1 bg-[#080C12] border border-[#162232] rounded font-mono text-xs select-none ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`px-3 py-1.5 rounded transition-all uppercase font-bold tracking-wider flex items-center space-x-1.5 cursor-pointer ${
              isActive
                ? `${activeColor} border shadow-sm`
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                isActive ? 'bg-black/40 text-current' : 'bg-[#162232] text-slate-400'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
