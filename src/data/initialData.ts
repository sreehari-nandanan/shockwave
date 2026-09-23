import { Team, User, Question, Score, Announcement, EventState } from '../types';

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-1',
    team_code: 'SW-001',
    name: 'TEAM AETHER',
    college: 'Toc H Institute of Science & Technology',
    project_name: 'Smart Environmental Monitoring Node',
    project_description: 'Solar-harvested LoRaWAN edge node with ultra-low power BME680 gas/particulate analysis and Kalman-filtered ambient telemetry.',
    leader: 'Arjun Menon',
    members: ['Priya Nair', 'Rohan Varghese', 'Kevin Thomas'],
    presentation_order: 1,
    specs: {
      mcu: 'ESP32-S3 Dual-Core Xtensa LX7',
      sensors: ['Bosch BME680 Gas/Temp', 'Sensirion SPS30 Optical PM'],
      connectivity: 'LoRaWAN 868 MHz (Semtech SX1262)',
      power_budget: '14.2 mW avg (2.5W Solar MPPT + LiFePO4)',
      dsp_method: 'Adaptive 2-stage Kalman Filter for sensor drift'
    },
    created_at: '2026-09-23T09:00:00Z'
  },
  {
    id: 'team-2',
    team_code: 'SW-002',
    name: 'CIRCUITX',
    college: 'Model Engineering College (MEC)',
    project_name: 'Autonomous Micro-Grid Power Controller',
    project_description: 'High-speed current sensing and real-time reactive power compensation unit with sub-cycle islanding detection.',
    leader: 'Sneha Balakrishnan',
    members: ['Ashwin Kumar', 'Fahad Mohammed', 'Ananya R.'],
    presentation_order: 2,
    specs: {
      mcu: 'STM32H743 480MHz ARM Cortex-M7',
      sensors: ['Hall Effect ACS712-30A', 'Precision Rogowski Coils'],
      connectivity: 'Isolated RS-485 Modbus + CAN Bus 2.0B',
      power_budget: '3.2W continuous (Auxiliary loop power)',
      dsp_method: '1024-point radix-4 FFT for 50Hz harmonic analysis'
    },
    created_at: '2026-09-23T09:05:00Z'
  },
  {
    id: 'team-3',
    team_code: 'SW-003',
    name: 'VOLTAGE',
    college: 'Rajagiri School of Engineering & Technology (RSET)',
    project_name: 'Bio-Impedance Sensor Array for Wearable Diagnostics',
    project_description: 'Multi-frequency bio-impedance spectroscopy patch with analog front-end integration for real-time muscular hydration tracking.',
    leader: 'Siddharth Rajesh',
    members: ['Meera Krishna', 'Varun Das', 'Divya S.'],
    presentation_order: 3,
    specs: {
      mcu: 'Nordic nRF5340 Dual ARM Cortex-M33',
      sensors: ['Analog Devices AD5940 Bio-AFE', '6-Axis TDK IMU'],
      connectivity: 'Bluetooth 5.3 LE + NFC Forum-compliant',
      power_budget: '8.4 mW (120mAh Li-Po, 36h runtime)',
      dsp_method: 'Cole-Cole nonlinear impedance parameter fitting'
    },
    created_at: '2026-09-23T09:10:00Z'
  },
  {
    id: 'team-4',
    team_code: 'SW-004',
    name: 'SIGNAL X',
    college: 'Govt. Engineering College (GEC) Thrissur',
    project_name: 'Acoustic Defect Detection for Industrial Motors',
    project_description: 'High-frequency ultrasound MEMS sensor node utilizing edge TinyML spectrogram classification for predictive motor bearing faults.',
    leader: 'Deepak Chandran',
    members: ['Riya Joy', 'Amal Paul', 'Gayathri V.'],
    presentation_order: 4,
    specs: {
      mcu: 'Raspberry Pi RP2040 + Coral Edge TPU via SPI',
      sensors: ['Knowles Ultrasonic I2S MEMS (up to 80kHz)'],
      connectivity: 'Wi-Fi 6 (ESP32-C6 co-processor) / MQTT-SN',
      power_budget: '450 mW peak during inference',
      dsp_method: 'Continuous Wavelet Transform (CWT) + Quantized CNN'
    },
    created_at: '2026-09-23T09:15:00Z'
  },
  {
    id: 'team-5',
    team_code: 'SW-005',
    name: 'BYTEFORGE',
    college: 'Toc H Institute of Science & Technology',
    project_name: 'Sub-GHz Agricultural Mesh for Soil Salinity',
    project_description: 'Distributed multi-hop mesh network for precision agricultural permittivity and salinity profiling in drought-prone topographies.',
    leader: 'Karthik S.',
    members: ['Sandra Mathew', 'Akhil George', 'Neha Susan'],
    presentation_order: 5,
    specs: {
      mcu: 'Microchip ATmega4808 + Semtech SX1262',
      sensors: ['Custom 4-probe TDR permittivity rod', 'PT100 RTD'],
      connectivity: 'Sub-GHz 433 MHz custom mesh routing',
      power_budget: '0.8 mW sleep / 85 mW TX pulse (Supercap + PV)',
      dsp_method: 'Exponential decay curve integration'
    },
    created_at: '2026-09-23T09:20:00Z'
  },
  {
    id: 'team-6',
    team_code: 'SW-006',
    name: 'NEXUS',
    college: 'Cochin University of Science & Technology (CUSAT)',
    project_name: 'FPGA-Accelerated SDR for Emergency Mesh',
    project_description: 'Portable software-defined radio transceiver node capable of dynamic spectrum sensing and ad-hoc emergency voice relay during natural disasters.',
    leader: 'Rahul Pillai',
    members: ['Aishwarya Nair', 'Harishankar M.', 'Pooja B.'],
    presentation_order: 6,
    specs: {
      mcu: 'Xilinx Zynq-7000 SoC (Dual ARM Cortex-A9 + FPGA)',
      sensors: ['Analog Devices AD9361 RF Agile Transceiver'],
      connectivity: '70 MHz to 6 GHz RF frequency agile',
      power_budget: '4.8W (4S 18650 Li-Ion battery pack)',
      dsp_method: 'Parallel polyphase decimation filter bank in HDL'
    },
    created_at: '2026-09-23T09:25:00Z'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-team-1',
    name: 'Arjun Menon (Team Aether)',
    email: 'aether@shockwave.internal',
    role: 'team',
    team_id: 'team-1',
    designation: 'Team Leader'
  },
  {
    id: 'user-team-2',
    name: 'Sneha Balakrishnan (CircuitX)',
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
    asking_team_name: 'CIRCUITX',
    presenting_team_id: 'team-1',
    presenting_team_name: 'TEAM AETHER',
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
    asking_team_name: 'SIGNAL X',
    presenting_team_id: 'team-1',
    presenting_team_name: 'TEAM AETHER',
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
    asking_team_name: 'VOLTAGE',
    presenting_team_id: 'team-1',
    presenting_team_name: 'TEAM AETHER',
    question: 'What is your capacitor bank ESR and how does it prevent brownouts during 20dBm LoRa transmit pulses?',
    category: 'Power & Energy',
    status: 'approved',
    created_at: '2026-09-23T09:44:02Z'
  },
  {
    id: 'q-104',
    asking_team_id: 'team-5',
    asking_team_code: 'SW-005',
    asking_team_name: 'BYTEFORGE',
    presenting_team_id: 'team-1',
    presenting_team_name: 'TEAM AETHER',
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
