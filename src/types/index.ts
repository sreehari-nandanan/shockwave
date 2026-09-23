export type Role = 'team' | 'judge' | 'admin' | 'spectator';

export interface HardwareSpecs {
  mcu: string;
  sensors: string[];
  connectivity: string;
  power_budget: string;
  dsp_method: string;
}

export interface Team {
  id: string;
  team_code: string; // e.g. "SW-001"
  name: string;
  college: string;
  project_name: string;
  project_description: string;
  leader: string;
  members: string[];
  presentation_order: number;
  specs: HardwareSpecs;
  created_at: string;
  password?: string; // managed by judges
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  team_id?: string;
  designation?: string;
}

export type QuestionStatus = 'pending' | 'approved' | 'rejected' | 'duplicate' | 'scored';

export interface Question {
  id: string;
  asking_team_id: string;
  asking_team_code: string;
  asking_team_name: string;
  presenting_team_id: string;
  presenting_team_name: string;
  question: string;
  category: 'Architecture' | 'Power & Energy' | 'Signal Processing' | 'RF & Wireless' | 'Edge AI & Memory' | 'General';
  status: QuestionStatus;
  asking_score?: number; // 0 to 10
  defending_score?: number; // 0 to 10
  judge_note?: string;
  created_at: string;
}

export interface Score {
  id: string;
  team_id: string;
  judge_id: string;
  pitch_score: number;      // 0 - 100
  defense_score: number;    // 0 - 20
  crossfire_score: number;  // 0 - 40
  total_score: number;      // 0 - 160
  notes?: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  message: string;
  level: 'info' | 'warning' | 'urgent';
  active: boolean;
  created_at: string;
}

export interface EventState {
  currentRound: string;
  currentTeamId: string;
  timerSeconds: number;
  timerTotal: number;
  timerRunning: boolean;
  activeQuestionId: string | null;
  displayMode: 'presentation' | 'leaderboard' | 'crossfire_focus' | 'timer' | 'info';
  scanlineMode: boolean;
  soundEnabled: boolean;
}
