// ─── Core Tags ───────────────────────────────────────────────────────────────
export type Tag = 'Présence' | 'Sérénité' | 'Focus' | 'Énergie' | 'Émotions';
export type Mood = 'Reposée' | 'Anxieuse' | 'Enthousiaste' | 'Fatiguée' | 'Calme';
export type Gender = 'Femme' | 'Homme' | 'Je préfère ne pas répondre';

// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  firstName: string;
  age: number | null;
  gender: Gender | null;
  avatar: string | null;
}

// ─── Mantra & Quality ────────────────────────────────────────────────────────
export interface Mantra {
  id: string;
  text: string;
  tag: Tag;
  favorite: boolean;
  isCustom?: boolean;
}

export interface Quality {
  id: string;
  text: string;
  tag: Tag;
  favorite: boolean;
  isCustom?: boolean;
}

// ─── Routine ─────────────────────────────────────────────────────────────────
export interface Exercise {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  description: string;
  type: 'meditation' | 'breathing' | 'movement' | 'shower' | 'mantra' | 'journal' | 'visualization';
}

export interface Routine {
  id: string;
  title: string;
  tag: Tag;
  exercises: Exercise[];
  isCustom?: boolean;
  durationMinutes: number;
}

// ─── Journal ─────────────────────────────────────────────────────────────────
export interface JournalEntry {
  id: string;
  date: string; // ISO string
  text: string;
  type: 'morning' | 'evening';
  tag?: Tag;
  question?: string;
}

// ─── Alarm ───────────────────────────────────────────────────────────────────
export interface Alarm {
  hour: number;
  minute: number;
  days: boolean[]; // [L, M, M, J, V, S, D]
  enabled: boolean;
  ringtone: string;
  routineId: string | null;
  smartBedtime: boolean;
}

// ─── App State ───────────────────────────────────────────────────────────────
export interface DailySession {
  date: string; // YYYY-MM-DD
  mood: Mood | null;
  tag: Tag | null;
  routineCompleted: boolean;
  onboardingComplete: boolean;
}

export interface Stats {
  streak: number;
  totalMinutes: number;
  routinesCompleted: number;
}

export interface AppState {
  user: User;
  onboardingComplete: boolean;
  dailySession: DailySession;
  mantras: Mantra[];
  qualities: Quality[];
  routines: Routine[];
  journalEntries: JournalEntry[];
  alarm: Alarm;
  stats: Stats;
}
