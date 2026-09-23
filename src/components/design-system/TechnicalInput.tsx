import React from 'react';

interface TechnicalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  badge?: string;
  error?: string;
}

export const TechnicalInput: React.FC<TechnicalInputProps> = ({
  label,
  badge,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1 font-mono text-xs">
      {label && (
        <div className="flex items-center justify-between text-slate-300">
          <label className="uppercase tracking-wider font-bold">{label}</label>
          {badge && <span className="text-[10px] text-slate-500">[{badge}]</span>}
        </div>
      )}
      <input
        className={`w-full bg-[#05080D] border ${
          error ? 'border-[#FF3344] focus:border-[#FF3344]' : 'border-[#162232] focus:border-[#00F0FF]'
        } rounded p-2.5 text-white placeholder:text-slate-600 focus:outline-none transition-colors text-xs ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] text-[#FF3344]">{error}</p>}
    </div>
  );
};

interface TechnicalTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  maxChars?: number;
  currentCharCount?: number;
}

export const TechnicalTextarea: React.FC<TechnicalTextareaProps> = ({
  label,
  maxChars,
  currentCharCount,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1 font-mono text-xs relative">
      {label && (
        <div className="flex items-center justify-between text-slate-300 mb-1">
          <label className="uppercase tracking-wider font-bold">{label}</label>
          {maxChars !== undefined && currentCharCount !== undefined && (
            <span className={`text-[10px] ${
              maxChars - currentCharCount < 30 ? 'text-[#FF3344] font-bold' : 'text-slate-500'
            }`}>
              {currentCharCount} / {maxChars}
            </span>
          )}
        </div>
      )}
      <textarea
        className={`w-full bg-[#05080D] border border-[#162232] focus:border-[#00F0FF] rounded p-3 text-white placeholder:text-slate-600 focus:outline-none transition-colors text-xs ${className}`}
        {...props}
      />
    </div>
  );
};
