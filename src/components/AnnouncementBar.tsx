import React from 'react';
import { useEvent } from '../context/EventContext';
import { AlertTriangle, Info, Bell, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { announcements, deleteAnnouncement } = useEvent();
  const activeAnnouncements = announcements.filter(a => a.active);

  if (activeAnnouncements.length === 0) return null;

  return (
    <div className="bg-[#080C12] border-b border-shockwave-gold/30 px-4 py-1.5 flex items-center justify-between text-xs font-mono">
      <div className="flex items-center space-x-2 overflow-hidden flex-1">
        <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-shockwave-gold/20 text-shockwave-gold border border-shockwave-gold/40 text-[10px] uppercase font-bold shrink-0">
          <Bell className="w-3 h-3 animate-bounce" />
          <span>BROADCAST</span>
        </div>

        <div className="truncate text-slate-200">
          {activeAnnouncements.map((ann, i) => (
            <span key={ann.id} className="inline-flex items-center mr-6">
              {ann.level === 'urgent' && <AlertTriangle className="w-3 h-3 text-shockwave-danger inline mr-1" />}
              {ann.level === 'warning' && <AlertTriangle className="w-3 h-3 text-shockwave-gold inline mr-1" />}
              <span className={ann.level === 'urgent' ? 'text-shockwave-danger font-bold' : ann.level === 'warning' ? 'text-shockwave-gold' : 'text-slate-200'}>
                {ann.message}
              </span>
              {i < activeAnnouncements.length - 1 && (
                <span className="mx-3 text-slate-600">//</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {activeAnnouncements[0] && (
        <button
          onClick={() => deleteAnnouncement(activeAnnouncements[0].id)}
          className="text-slate-500 hover:text-slate-300 ml-2 shrink-0 p-0.5"
          title="Dismiss Announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
