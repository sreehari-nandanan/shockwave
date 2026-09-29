import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Team, User, Question, Score, Announcement, EventState, Role, QuestionStatus } from '../types';
import { 
  INITIAL_TEAMS, 
  INITIAL_USERS, 
  INITIAL_QUESTIONS, 
  INITIAL_SCORES, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_EVENT_STATE 
} from '../data/initialData';
import { playSound } from '../utils/audio';

interface EventContextType {
  teams: Team[];
  users: User[];
  questions: Question[];
  scores: Score[];
  announcements: Announcement[];
  eventState: EventState;
  currentUser: User;
  currentTeam: Team | undefined;
  nextTeamItem: Team | undefined;
  leaderboard: (Team & { pitch_score: number; defense_score: number; crossfire_score: number; total_score: number; rank: number })[];
  
  // Actions
  setCurrentUser: (user: User) => void;
  switchUserRole: (role: Role, teamId?: string) => void;
  submitQuestion: (askingTeamId: string, presentingTeamId: string, text: string, category: Question['category']) => Question;
  approveQuestion: (questionId: string) => void;
  rejectQuestion: (questionId: string) => void;
  markDuplicate: (questionId: string) => void;
  scoreQuestion: (questionId: string, askingScore: number, defendingScore: number) => void;
  clearQuestions: () => void;
  updateTeamScore: (teamId: string, pitch: number, defense: number, crossfire: number, notes?: string) => void;
  setActiveTeam: (teamId: string) => void;
  nextTeam: () => void;
  prevTeam: () => void;
  toggleTimer: () => void;
  resetTimer: (seconds?: number) => void;
  extendTimer: (seconds: number) => void;
  setDisplayMode: (mode: EventState['displayMode']) => void;
  toggleScanlines: () => void;
  toggleSound: () => void;
  addTeam: (teamData: Omit<Team, 'id' | 'team_code' | 'presentation_order' | 'created_at'>) => Team;
  updateTeam: (team: Team) => void;
  deleteTeam: (teamId: string) => void;
  updateTeamPassword: (teamId: string, newPassword: string) => void;
  publishAnnouncement: (message: string, level?: Announcement['level']) => void;
  deleteAnnouncement: (id: string) => void;
  resetToDefaultDemo: () => void;
  simulateDemoQuestion: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const BROADCAST_CHANNEL_NAME = 'shockwave_realtime_bus';

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Safe LocalStorage Initializer
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(`shockwave_v2_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [teams, setTeams] = useState<Team[]>(() => loadStored('teams', INITIAL_TEAMS));
  const [users] = useState<User[]>(() => loadStored('users', INITIAL_USERS));
  const [questions, setQuestions] = useState<Question[]>(() => loadStored('questions', INITIAL_QUESTIONS));
  const [scores, setScores] = useState<Score[]>(() => loadStored('scores', INITIAL_SCORES));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => loadStored('announcements', INITIAL_ANNOUNCEMENTS));
  const [eventState, setEventState] = useState<EventState>(() => loadStored('event_state', INITIAL_EVENT_STATE));
  
  // Current user defaults to Team Aether leader for testing, can be switched
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser = loadStored<User | null>('current_user', null);
    return savedUser || INITIAL_USERS[0];
  });

  // Broadcast Channel setup for instant multi-window & projector synchronization
  const [broadcastChannel, setBroadcastChannel] = useState<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.onmessage = (event) => {
        const { type, payload } = event.data;
        if (type === 'STATE_UPDATE') {
          if (payload.teams) setTeams(payload.teams);
          if (payload.questions) setQuestions(payload.questions);
          if (payload.scores) setScores(payload.scores);
          if (payload.announcements) setAnnouncements(payload.announcements);
          if (payload.eventState) setEventState(payload.eventState);
        }
      };
      setBroadcastChannel(channel);
      return () => {
        channel.close();
      };
    }
  }, []);

  const broadcastState = useCallback((partial: {
    teams?: Team[];
    questions?: Question[];
    scores?: Score[];
    announcements?: Announcement[];
    eventState?: EventState;
  }) => {
    if (broadcastChannel) {
      broadcastChannel.postMessage({
        type: 'STATE_UPDATE',
        payload: partial
      });
    }
  }, [broadcastChannel]);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('shockwave_v2_teams', JSON.stringify(teams));
      localStorage.setItem('shockwave_v2_questions', JSON.stringify(questions));
      localStorage.setItem('shockwave_v2_scores', JSON.stringify(scores));
      localStorage.setItem('shockwave_v2_announcements', JSON.stringify(announcements));
      localStorage.setItem('shockwave_v2_event_state', JSON.stringify(eventState));
      localStorage.setItem('shockwave_v2_current_user', JSON.stringify(currentUser));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [teams, questions, scores, announcements, eventState, currentUser]);

  // Listen for LocalStorage changes from other tabs as fallback
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'shockwave_v2_event_state' && e.newValue) {
        try {
          setEventState(JSON.parse(e.newValue));
        } catch (err) { }
      }
      if (e.key === 'shockwave_v2_questions' && e.newValue) {
        try {
          setQuestions(JSON.parse(e.newValue));
        } catch (err) { }
      }
      if (e.key === 'shockwave_v2_teams' && e.newValue) {
        try {
          setTeams(JSON.parse(e.newValue));
        } catch (err) { }
      }
      if (e.key === 'shockwave_v2_scores' && e.newValue) {
        try {
          setScores(JSON.parse(e.newValue));
        } catch (err) { }
      }
      if (e.key === 'shockwave_v2_announcements' && e.newValue) {
        try {
          setAnnouncements(JSON.parse(e.newValue));
        } catch (err) { }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync scanline class on body
  useEffect(() => {
    if (eventState.scanlineMode) {
      document.body.classList.add('scanlines-active');
    } else {
      document.body.classList.remove('scanlines-active');
    }
  }, [eventState.scanlineMode]);

  // Global Timer Tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (eventState.timerRunning && eventState.timerSeconds > 0) {
      interval = setInterval(() => {
        setEventState((prev) => {
          if (!prev.timerRunning || prev.timerSeconds <= 0) return prev;
          const nextSec = prev.timerSeconds - 1;

          // Sound alert when 30s or 10s left
          if ((nextSec === 30 || nextSec === 10 || (nextSec <= 5 && nextSec > 0)) && prev.soundEnabled) {
            playSound('alert', true);
          }

          const updated = { ...prev, timerSeconds: nextSec };
          broadcastState({ eventState: updated });
          return updated;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [eventState.timerRunning, eventState.timerSeconds, eventState.soundEnabled, broadcastState]);

  // Derived Values
  const currentTeam = useMemo(() => {
    return teams.find(t => t.id === eventState.currentTeamId) || teams[0];
  }, [teams, eventState.currentTeamId]);

  const nextTeamItem = useMemo(() => {
    if (!currentTeam) return undefined;
    const sorted = [...teams].sort((a, b) => a.presentation_order - b.presentation_order);
    const currentIndex = sorted.findIndex(t => t.id === currentTeam.id);
    return sorted[(currentIndex + 1) % sorted.length];
  }, [teams, currentTeam]);

  // Computed Leaderboard
  const leaderboard = useMemo(() => {
    const list = teams.map((team) => {
      const scoreObj = scores.find(s => s.team_id === team.id);
      const pitch = scoreObj ? scoreObj.pitch_score : 0;
      const defense = scoreObj ? scoreObj.defense_score : 0;
      const crossfire = scoreObj ? scoreObj.crossfire_score : 0;
      const total = pitch + defense + crossfire;
      return {
        ...team,
        pitch_score: pitch,
        defense_score: defense,
        crossfire_score: crossfire,
        total_score: total,
        rank: 1
      };
    });

    list.sort((a, b) => b.total_score - a.total_score);

    return list.map((item, idx) => ({
      ...item,
      rank: idx + 1
    }));
  }, [teams, scores]);

  // ACTIONS

  const switchUserRole = useCallback((role: Role, teamId?: string) => {
    playSound('click', eventState.soundEnabled);
    if (role === 'team') {
      const targetTeamId = teamId || 'team-1';
      const targetTeam = teams.find(t => t.id === targetTeamId) || teams[0];
      const user = users.find(u => u.team_id === targetTeam.id) || {
        id: `user-${targetTeam.id}`,
        name: `${targetTeam.leader} (${targetTeam.name})`,
        email: `${targetTeam.name.toLowerCase().replace(/\s+/g, '')}@shockwave.internal`,
        role: 'team',
        team_id: targetTeam.id,
        designation: 'Team Leader'
      };
      setCurrentUser(user);
    } else if (role === 'judge') {
      const judgeUser = users.find(u => u.role === 'judge') || INITIAL_USERS[2];
      setCurrentUser(judgeUser);
    } else if (role === 'admin') {
      const adminUser = users.find(u => u.role === 'admin') || INITIAL_USERS[4];
      setCurrentUser(adminUser);
    } else {
      setCurrentUser({
        id: 'user-spectator',
        name: 'Spectator / Guest',
        email: 'guest@shockwave.live',
        role: 'spectator'
      });
    }
  }, [teams, users, eventState.soundEnabled]);

  const submitQuestion = useCallback((askingTeamId: string, presentingTeamId: string, text: string, category: Question['category']): Question => {
    const askingTeam = teams.find(t => t.id === askingTeamId);
    const presentingTeam = teams.find(t => t.id === presentingTeamId);
    
    const newQuestion: Question = {
      id: `q-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      asking_team_id: askingTeamId,
      asking_team_code: askingTeam ? askingTeam.team_code : 'SW-???',
      asking_team_name: askingTeam ? askingTeam.name : 'UNKNOWN TEAM',
      presenting_team_id: presentingTeamId,
      presenting_team_name: presentingTeam ? presentingTeam.name : 'PRESENTING TEAM',
      question: text.trim(),
      category: category || 'Architecture',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    setQuestions(prev => {
      const next = [newQuestion, ...prev];
      broadcastState({ questions: next });
      return next;
    });

    playSound('transmit', eventState.soundEnabled);
    return newQuestion;
  }, [teams, eventState.soundEnabled, broadcastState]);

  const approveQuestion = useCallback((questionId: string) => {
    playSound('approved', eventState.soundEnabled);
    setQuestions(prev => {
      const next = prev.map(q => q.id === questionId ? { ...q, status: 'approved' as QuestionStatus } : q);
      broadcastState({ questions: next });
      return next;
    });
    setEventState(prev => {
      const nextState = { ...prev, activeQuestionId: questionId };
      broadcastState({ eventState: nextState });
      return nextState;
    });
  }, [eventState.soundEnabled, broadcastState]);

  const rejectQuestion = useCallback((questionId: string) => {
    playSound('click', eventState.soundEnabled);
    setQuestions(prev => {
      const next = prev.map(q => q.id === questionId ? { ...q, status: 'rejected' as QuestionStatus } : q);
      broadcastState({ questions: next });
      return next;
    });
  }, [eventState.soundEnabled, broadcastState]);

  const markDuplicate = useCallback((questionId: string) => {
    playSound('click', eventState.soundEnabled);
    setQuestions(prev => {
      const next = prev.map(q => q.id === questionId ? { ...q, status: 'duplicate' as QuestionStatus } : q);
      broadcastState({ questions: next });
      return next;
    });
  }, [eventState.soundEnabled, broadcastState]);

  const scoreQuestion = useCallback((questionId: string, askingScore: number, defendingScore: number) => {
    playSound('score', eventState.soundEnabled);

    let askingTeamId = '';
    let presentingTeamId = '';
    
    setQuestions(prev => {
      const next = prev.map(q => {
        if (q.id === questionId) {
          askingTeamId = q.asking_team_id;
          presentingTeamId = q.presenting_team_id;
          return {
            ...q,
            status: 'scored' as QuestionStatus,
            asking_score: askingScore,
            defending_score: defendingScore
          };
        }
        return q;
      });
      broadcastState({ questions: next });
      return next;
    });

    if (askingTeamId || presentingTeamId) {
      setScores(prev => {
        let next = [...prev];
        
        // Award Asking Team
        if (askingTeamId) {
          next = next.map(s => {
            if (s.team_id === askingTeamId) {
              const newCrossfire = Math.min(40, s.crossfire_score + askingScore);
              return { ...s, crossfire_score: newCrossfire, total_score: s.pitch_score + s.defense_score + newCrossfire, updated_at: new Date().toISOString() };
            }
            return s;
          });
        }
        
        // Award Defending Team
        if (presentingTeamId) {
          next = next.map(s => {
            if (s.team_id === presentingTeamId) {
              const newCrossfire = Math.min(40, s.crossfire_score + defendingScore);
              return { ...s, crossfire_score: newCrossfire, total_score: s.pitch_score + s.defense_score + newCrossfire, updated_at: new Date().toISOString() };
            }
            return s;
          });
        }
        
        broadcastState({ scores: next });
        return next;
      });
    }
  }, [eventState.soundEnabled, broadcastState]);

  const clearQuestions = useCallback(() => {
    playSound('click', eventState.soundEnabled);
    setQuestions([]);
    broadcastState({ questions: [] });
  }, [eventState.soundEnabled, broadcastState]);

  const updateTeamScore = useCallback((teamId: string, pitch: number, defense: number, crossfire: number, notes?: string) => {
    playSound('score', eventState.soundEnabled);
    const total = pitch + defense + crossfire;
    setScores(prev => {
      const exists = prev.find(s => s.team_id === teamId);
      let next: Score[];
      if (exists) {
        next = prev.map(s => s.team_id === teamId ? {
          ...s,
          pitch_score: pitch,
          defense_score: defense,
          crossfire_score: crossfire,
          total_score: total,
          notes: notes !== undefined ? notes : s.notes,
          updated_at: new Date().toISOString()
        } : s);
      } else {
        const newScore: Score = {
          id: `sc-${Date.now()}`,
          team_id: teamId,
          judge_id: currentUser.id,
          pitch_score: pitch,
          defense_score: defense,
          crossfire_score: crossfire,
          total_score: total,
          notes: notes || '',
          updated_at: new Date().toISOString()
        };
        next = [...prev, newScore];
      }
      return next;
    });
    // We must broadcast after the state is set, but since we need the updated array,
    // we'll rely on the localStorage effect or broadcast it directly
    const exists = scores.find(s => s.team_id === teamId);
    let nextScores: Score[];
    if (exists) {
      nextScores = scores.map(s => s.team_id === teamId ? {
        ...s,
        pitch_score: pitch,
        defense_score: defense,
        crossfire_score: crossfire,
        total_score: total,
        notes: notes !== undefined ? notes : s.notes,
        updated_at: new Date().toISOString()
      } : s);
    } else {
      nextScores = [...scores, {
        id: `sc-${Date.now()}`,
        team_id: teamId,
        judge_id: currentUser.id,
        pitch_score: pitch,
        defense_score: defense,
        crossfire_score: crossfire,
        total_score: total,
        notes: notes || '',
        updated_at: new Date().toISOString()
      }];
    }
    broadcastState({ scores: nextScores });
  }, [currentUser.id, eventState.soundEnabled, broadcastState, scores]);

  const setActiveTeam = useCallback((teamId: string) => {
    playSound('click', eventState.soundEnabled);
    const nextState: EventState = {
      ...eventState,
      currentTeamId: teamId,
      timerSeconds: 300,
      timerTotal: 300,
      timerRunning: true,
      activeQuestionId: null
    };
    setEventState(nextState);
    broadcastState({ eventState: nextState });
  }, [eventState, broadcastState]);

  const nextTeam = useCallback(() => {
    if (!nextTeamItem) return;
    setActiveTeam(nextTeamItem.id);
  }, [nextTeamItem, setActiveTeam]);

  const prevTeam = useCallback(() => {
    if (!currentTeam) return;
    const sorted = [...teams].sort((a, b) => a.presentation_order - b.presentation_order);
    const currentIndex = sorted.findIndex(t => t.id === currentTeam.id);
    const prevIndex = (currentIndex - 1 + sorted.length) % sorted.length;
    setActiveTeam(sorted[prevIndex].id);
  }, [teams, currentTeam, setActiveTeam]);

  const toggleTimer = useCallback(() => {
    playSound('click', eventState.soundEnabled);
    const nextState = { ...eventState, timerRunning: !eventState.timerRunning };
    setEventState(nextState);
    broadcastState({ eventState: nextState });
  }, [eventState, broadcastState]);

  const resetTimer = useCallback((seconds: number = 300) => {
    playSound('click', eventState.soundEnabled);
    const nextState = {
      ...eventState,
      timerSeconds: seconds,
      timerTotal: seconds,
      timerRunning: false
    };
    setEventState(nextState);
    broadcastState({ eventState: nextState });
  }, [eventState, broadcastState]);

  const extendTimer = useCallback((seconds: number) => {
    playSound('click', eventState.soundEnabled);
    const nextState = {
      ...eventState,
      timerSeconds: eventState.timerSeconds + seconds,
      timerTotal: eventState.timerTotal + seconds
    };
    setEventState(nextState);
    broadcastState({ eventState: nextState });
  }, [eventState, broadcastState]);

  const setDisplayMode = useCallback((mode: EventState['displayMode']) => {
    playSound('click', eventState.soundEnabled);
    const nextState = { ...eventState, displayMode: mode };
    setEventState(nextState);
    broadcastState({ eventState: nextState });
  }, [eventState, broadcastState]);

  const toggleScanlines = useCallback(() => {
    playSound('click', eventState.soundEnabled);
    const nextState = { ...eventState, scanlineMode: !eventState.scanlineMode };
    setEventState(nextState);
    broadcastState({ eventState: nextState });
  }, [eventState, broadcastState]);

  const toggleSound = useCallback(() => {
    const nextSound = !eventState.soundEnabled;
    if (nextSound) playSound('click', true);
    const nextState = { ...eventState, soundEnabled: nextSound };
    setEventState(nextState);
    broadcastState({ eventState: nextState });
  }, [eventState, broadcastState]);

  const addTeam = useCallback((teamData: Omit<Team, 'id' | 'team_code' | 'presentation_order' | 'created_at'>): Team => {
    const nextOrder = teams.length + 1;
    const teamCode = `SW-${String(nextOrder).padStart(3, '0')}`;
    const newTeam: Team = {
      ...teamData,
      id: `team-${Date.now()}`,
      team_code: teamCode,
      presentation_order: nextOrder,
      created_at: new Date().toISOString()
    };

    setTeams(prev => {
      const next = [...prev, newTeam];
      broadcastState({ teams: next });
      return next;
    });

    // Create empty score row
    setScores(prev => {
      const next = [...prev, {
        id: `sc-${Date.now()}`,
        team_id: newTeam.id,
        judge_id: 'user-judge-1',
        pitch_score: 0,
        defense_score: 0,
        crossfire_score: 0,
        total_score: 0,
        notes: 'Pending presentation',
        updated_at: new Date().toISOString()
      }];
      broadcastState({ scores: next });
      return next;
    });

    return newTeam;
  }, [teams.length, broadcastState]);

  const updateTeam = useCallback((team: Team) => {
    setTeams(prev => {
      const next = prev.map(t => t.id === team.id ? team : t);
      broadcastState({ teams: next });
      return next;
    });
  }, [broadcastState]);

  const deleteTeam = useCallback((teamId: string) => {
    setTeams(prev => {
      const next = prev.filter(t => t.id !== teamId);
      broadcastState({ teams: next });
      return next;
    });
  }, [broadcastState]);

  const updateTeamPassword = useCallback((teamId: string, newPassword: string) => {
    setTeams(prev => {
      const next = prev.map(t => t.id === teamId ? { ...t, password: newPassword } : t);
      broadcastState({ teams: next });
      return next;
    });
  }, [broadcastState]);

  const publishAnnouncement = useCallback((message: string, level: Announcement['level'] = 'info') => {
    playSound('alert', eventState.soundEnabled);
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      message: message.trim().toUpperCase(),
      level,
      active: true,
      created_at: new Date().toISOString()
    };
    setAnnouncements(prev => {
      const next = [newAnn, ...prev.slice(0, 4)];
      broadcastState({ announcements: next });
      return next;
    });
  }, [eventState.soundEnabled, broadcastState]);

  const deleteAnnouncement = useCallback((id: string) => {
    setAnnouncements(prev => {
      const next = prev.filter(a => a.id !== id);
      broadcastState({ announcements: next });
      return next;
    });
  }, [broadcastState]);

  const resetToDefaultDemo = useCallback(() => {
    playSound('alert', true);
    setTeams(INITIAL_TEAMS);
    setQuestions(INITIAL_QUESTIONS);
    setScores(INITIAL_SCORES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setEventState(INITIAL_EVENT_STATE);
    setCurrentUser(INITIAL_USERS[0]);
    broadcastState({
      teams: INITIAL_TEAMS,
      questions: INITIAL_QUESTIONS,
      scores: INITIAL_SCORES,
      announcements: INITIAL_ANNOUNCEMENTS,
      eventState: INITIAL_EVENT_STATE
    });
  }, [broadcastState]);

  const simulateDemoQuestion = useCallback(() => {
    const candidateTeams = teams.filter(t => t.id !== eventState.currentTeamId);
    if (candidateTeams.length === 0) return;
    const randomAskingTeam = candidateTeams[Math.floor(Math.random() * candidateTeams.length)];
    
    const sampleQuestions = [
      'What is your measured clock jitter during continuous high-speed SPI bus bursts?',
      'How does your firmware guard against brownout resets during sudden RF transceiver power spikes?',
      'What is the thermal junction dissipation of your voltage regulator at 40°C ambient room temperature?',
      'Have you evaluated 4-layer PCB ground plane return current loops to minimize RF EMI interference?',
      'What is the latency penalty of your edge Kalman filter compared to raw sensor throughput?'
    ];
    const categories: Question['category'][] = ['Architecture', 'Power & Energy', 'Signal Processing', 'RF & Wireless', 'Edge AI & Memory'];
    const chosenQ = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    const chosenCat = categories[Math.floor(Math.random() * categories.length)];

    submitQuestion(randomAskingTeam.id, eventState.currentTeamId, chosenQ, chosenCat);
  }, [teams, eventState.currentTeamId, submitQuestion]);

  return (
    <EventContext.Provider value={{
      teams,
      users,
      questions,
      scores,
      announcements,
      eventState,
      currentUser,
      currentTeam,
      nextTeamItem,
      leaderboard,
      setCurrentUser,
      switchUserRole,
      submitQuestion,
      approveQuestion,
      rejectQuestion,
      markDuplicate,
      scoreQuestion,
      clearQuestions,
  updateTeamScore,
      setActiveTeam,
      nextTeam,
      prevTeam,
      toggleTimer,
      resetTimer,
      extendTimer,
      setDisplayMode,
      toggleScanlines,
      toggleSound,
      addTeam,
      updateTeam,
      deleteTeam,
      updateTeamPassword,
      publishAnnouncement,
      deleteAnnouncement,
      resetToDefaultDemo,
      simulateDemoQuestion
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
