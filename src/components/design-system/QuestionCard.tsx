import React from 'react';
import { Question } from '../../types';

interface QuestionCardProps {
  question: Question;
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onScore?: (id: string) => void;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  showActions = false,
  onApprove,
  onReject,
  onDuplicate,
  onScore,
  className = ''
}) => {
  const statusStyles = {
    pending: 'bg-slate-800 text-slate-300 border-slate-700',
    approved: 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40',
    scored: 'bg-[#FFE600]/15 text-[#FFE600] border-[#FFE600]/40',
    rejected: 'bg-[#FF3344]/15 text-[#FF3344] border-[#FF3344]/40',
    duplicate: 'bg-slate-800 text-slate-400 border-slate-700'
  }[question.status];

  return (
    <div className={`p-4 rounded-lg bg-[#080C12] border border-[#162232] hover:border-[#00F0FF]/40 transition-colors font-mono ${className}`}>
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF] font-bold border border-[#00F0FF]/30">
            {question.asking_team_code}
          </span>
          <span className="text-white font-bold">{question.asking_team_name}</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-slate-400 text-[11px]">{question.category}</span>
        </div>

        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusStyles}`}>
          {question.status === 'scored' ? `SCORED ${question.asking_score}/10` : question.status}
        </span>
      </div>

      <p className="text-slate-200 text-sm font-sans my-2 leading-relaxed">
        &ldquo;{question.question}&rdquo;
      </p>

      {question.judge_note && (
        <div className="mt-2 text-[11px] text-slate-400 bg-[#05080D] p-2 rounded border border-[#162232]">
          <span className="text-[#FFE600] font-bold">JUDGE EVALUATION:</span> {question.judge_note}
        </div>
      )}

      {showActions && question.status === 'pending' && (
        <div className="mt-3 pt-2.5 border-t border-[#162232] flex items-center space-x-2">
          {onApprove && (
            <button
              onClick={() => onApprove(question.id)}
              className="px-3 py-1 rounded bg-[#00F0FF] text-black font-bold text-xs uppercase hover:bg-white transition-colors cursor-pointer"
            >
              APPROVE
            </button>
          )}
          {onReject && (
            <button
              onClick={() => onReject(question.id)}
              className="px-3 py-1 rounded bg-[#FF3344]/20 text-[#FF3344] hover:bg-[#FF3344] hover:text-white border border-[#FF3344]/40 text-xs transition-colors cursor-pointer"
            >
              REJECT
            </button>
          )}
          {onDuplicate && (
            <button
              onClick={() => onDuplicate(question.id)}
              className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs transition-colors cursor-pointer"
            >
              DUPLICATE
            </button>
          )}
        </div>
      )}
    </div>
  );
};
