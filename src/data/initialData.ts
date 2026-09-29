import { Team, User, Question, Score, Announcement, EventState } from '../types';

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-1',
    team_code: 'SW-001',
    name: 'CLEANSHEETS',
    college: 'To Be Updated',
    project_name: 'HYDRO TRACK',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 1,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-2',
    team_code: 'SW-002',
    name: 'SEVERUS',
    college: 'To Be Updated',
    project_name: 'ENERGY SEEK',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 2,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-3',
    team_code: 'SW-003',
    name: 'BARIN.EXE',
    college: 'To Be Updated',
    project_name: 'SMART UTILITY METER',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 3,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-4',
    team_code: 'SW-004',
    name: 'PARAKKUM THALIKA',
    college: 'To Be Updated',
    project_name: 'SMART CLASS ROOM ENERGY',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 4,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-5',
    team_code: 'SW-005',
    name: 'GLADIATOR',
    college: 'To Be Updated',
    project_name: 'SMART HOUSEHOLD',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 5,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-6',
    team_code: 'SW-006',
    name: 'CATALYST',
    college: 'To Be Updated',
    project_name: 'SILENT GUARDIAN SWARM',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 6,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-7',
    team_code: 'SW-007',
    name: 'NEXUS',
    college: 'To Be Updated',
    project_name: 'COOK SAFE AI',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 7,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-8',
    team_code: 'SW-008',
    name: 'INNOVATEX',
    college: 'To Be Updated',
    project_name: 'SAFE DRIVE',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 8,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-9',
    team_code: 'SW-009',
    name: 'DIMENSION',
    college: 'To Be Updated',
    project_name: 'WATER LEAKAGE MANAGMENT SYSTEM',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 9,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-10',
    team_code: 'SW-010',
    name: 'BRAINSPARKS',
    college: 'To Be Updated',
    project_name: 'SMART SENSING OF ETHANOL',
    project_description: 'To Be Updated',
    leader: 'To Be Updated',
    members: [],
    presentation_order: 10,
    specs: {
      mcu: 'To Be Updated',
      sensors: [],
      connectivity: 'To Be Updated',
      power_budget: 'To Be Updated',
      dsp_method: 'To Be Updated'
    },
    created_at: '2026-09-23T09:00:00Z'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-team-1',
    name: 'Arjun Menon (CLEANSHEETS)',
    email: 'aether@shockwave.internal',
    role: 'team',
    team_id: 'team-1',
    designation: 'Team Leader'
  },
  {
    id: 'user-team-2',
    name: 'Sneha Balakrishnan (SEVERUS)',
    email: 'circuitx@shockwave.internal',
    role: 'team',
    team_id: 'team-2',
    designation: 'Hardware Architect'
  },
  {
    id: 'user-judge-1',
    name: 'Dr. Radhakrishnan K.',
    email: 'judge1@shockwave.ieee.org',
    role: 'judge',
    designation: 'IEEE Senior Member / IoT Lead'
  },
  {
    id: 'user-judge-2',
    name: 'Prof. Anjali Kurian',
    email: 'judge2@shockwave.ieee.org',
    role: 'judge',
    designation: 'DSP & Communications Specialist'
  },
  {
    id: 'user-admin-1',
    name: 'IEEE SPS / MuLearn Control',
    email: 'control@shockwave.org',
    role: 'admin',
    designation: 'Arena Master / Lead Coordinator'
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-101',
    asking_team_id: 'team-2',
    asking_team_code: 'SW-002',
    asking_team_name: 'SEVERUS',
    presenting_team_id: 'team-1',
    presenting_team_name: 'CLEANSHEETS',
    question: 'Why did you choose LoRa instead of Wi-Fi HaLow or NB-IoT given your 14mW average power envelope?',
    category: 'Architecture',
    status: 'scored',
    asking_score: 9,
    defending_score: 9,
    judge_note: 'Sharp critique on physical layer tradeoffs and duty-cycle regulations.',
    created_at: '2026-09-23T09:40:12Z'
  },
  {
    id: 'q-102',
    asking_team_id: 'team-4',
    asking_team_code: 'SW-004',
    asking_team_name: 'PARAKKUM THALIKA',
    presenting_team_id: 'team-1',
    presenting_team_name: 'CLEANSHEETS',
    question: 'How do you calibrate the BME680 MOX gas sensor baseline against thermal hysteresis in field conditions?',
    category: 'Signal Processing',
    status: 'approved',
    asking_score: 8,
    defending_score: 8,
    judge_note: 'Directly addresses hardware sensor drift and environmental validation.',
    created_at: '2026-09-23T09:42:45Z'
  },
  {
    id: 'q-103',
    asking_team_id: 'team-3',
    asking_team_code: 'SW-003',
    asking_team_name: 'BARIN.EXE',
    presenting_team_id: 'team-1',
    presenting_team_name: 'CLEANSHEETS',
    question: 'What is your capacitor bank ESR and how does it prevent brownouts during 20dBm LoRa transmit pulses?',
    category: 'Power & Energy',
    status: 'approved',
    created_at: '2026-09-23T09:44:02Z'
  },
  {
    id: 'q-104',
    asking_team_id: 'team-5',
    asking_team_code: 'SW-005',
    asking_team_name: 'GLADIATOR',
    presenting_team_id: 'team-1',
    presenting_team_name: 'CLEANSHEETS',
    question: 'What is the maximum packet loss tolerated by your dual-stage Kalman filter under dense forest canopy?',
    category: 'RF & Wireless',
    status: 'pending',
    created_at: '2026-09-23T09:46:18Z'
  }
];

export const INITIAL_SCORES: Score[] = [
  {
    id: 'sc-1',
    team_id: 'team-1',
    judge_id: 'user-judge-1',
    pitch_score: 82,
    defense_score: 17,
    crossfire_score: 36,
    total_score: 135,
    notes: 'Exceptional board layout, solid understanding of RF impedance matching and low-power states.',
    updated_at: '2026-09-23T09:48:00Z'
  },
  {
    id: 'sc-2',
    team_id: 'team-2',
    judge_id: 'user-judge-1',
    pitch_score: 80,
    defense_score: 16,
    crossfire_score: 33,
    total_score: 129,
    notes: 'Great reactive power isolation; defense on galvanic isolation was solid.',
    updated_at: '2026-09-23T09:30:00Z'
  },
  {
    id: 'sc-3',
    team_id: 'team-3',
    judge_id: 'user-judge-1',
    pitch_score: 75,
    defense_score: 15,
    crossfire_score: 31,
    total_score: 121,
    notes: 'Complex analog front-end design with impressive Cole-Cole bio-impedance curve fitting.',
    updated_at: '2026-09-23T09:20:00Z'
  },
  {
    id: 'sc-4',
    team_id: 'team-4',
    judge_id: 'user-judge-1',
    pitch_score: 72,
    defense_score: 14,
    crossfire_score: 31,
    total_score: 117,
    notes: 'Strong Edge TinyML implementation, need more benchmark data on power budget under sustained load.',
    updated_at: '2026-09-23T09:10:00Z'
  },
  {
    id: 'sc-5',
    team_id: 'team-5',
    judge_id: 'user-judge-1',
    pitch_score: 68,
    defense_score: 14,
    crossfire_score: 27,
    total_score: 109,
    notes: 'Pragmatic agricultural design; mesh synchronization protocol needs deeper analysis.',
    updated_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'sc-6',
    team_id: 'team-6',
    judge_id: 'user-judge-1',
    pitch_score: 65,
    defense_score: 13,
    crossfire_score: 26,
    total_score: 104,
    notes: 'Ambitious FPGA design, but thermal dissipation in portable enclosure remains a challenge.',
    updated_at: '2026-09-23T08:50:00Z'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    message: 'ROUND 1 CROSSFIRE IN PROGRESS — ALL TEAMS SUBMIT QUESTIONS DIRECTLY TO ARENA BUS.',
    level: 'info',
    active: true,
    created_at: '2026-09-23T09:30:00Z'
  },
  {
    id: 'ann-2',
    message: 'REMINDER: KTU ACTIVITY POINTS & E-CERTIFICATES REQUIRE ACTIVE CROSSFIRE PARTICIPATION.',
    level: 'warning',
    active: true,
    created_at: '2026-09-23T09:35:00Z'
  }
];

export const INITIAL_EVENT_STATE: EventState = {
  currentRound: 'ROUND 1 — CROSSFIRE',
  currentTeamId: 'team-1',
  timerSeconds: 272, // 04:32 remaining
  timerTotal: 300,   // 5 minutes presentation + crossfire
  timerRunning: true,
  activeQuestionId: 'q-101',
  displayMode: 'presentation',
  scanlineMode: false,
  soundEnabled: true
};
