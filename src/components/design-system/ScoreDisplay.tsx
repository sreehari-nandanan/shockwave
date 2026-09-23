import React from 'react';

interface ScoreDisplayProps {
  pitch: number;
  defense: number;
  crossfire: number;
  total: number;
  compact?: boolean;
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  pitch,
  defense,
  crossfire,
  total,
  compact = false,
  className = ''
}) => {
  if (compact) {
    return (
      <div className={`flex items-baseline space-x-2 font-mono ${className}`}>
        <span className="text-xl sm:text-2xl font-black text-[#FFE600] glow-gold">
          {total}
        </span>
        <span className="text-[10px] text-slate-500">/ 160 PTS</span>
      </div>
    );
  }

  return (
    <div className={`bg-[#05080D] border border-[#162232] rounded p-3 font-mono ${className}`}>
      <div className="grid grid-cols-3 gap-2 text-center pb-2 mb-2 border-b border-[#162232]">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">PITCH</span>
          <span className="text-sm font-bold text-white">{pitch}</span>
          <span className="text-[9px] text-slate-500 block">/ 100</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">DEFENSE</span>
          <span className="text-sm font-bold text-[#00F0FF]">{defense}</span>
          <span className="text-[9px] text-slate-500 block">/ 20</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">CROSSFIRE</span>
          <span className="text-sm font-bold text-[#FFE600]">{crossfire}</span>
          <span className="text-[9px] text-slate-500 block">/ 40</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-slate-400 uppercase font-bold">TOTAL SCORE:</span>
        <div className="flex items-baseline space-x-1">
          <span className="text-xl font-black text-[#FFE600] glow-gold">{total}</span>
          <span className="text-[10px] text-slate-500">/ 160</span>
        </div>
      </div>
    </div>
  );
};
