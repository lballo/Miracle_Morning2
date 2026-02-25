import { Routine } from '../types';
import { DEFAULT_EXERCISES } from './exercises';

// Helper pour récupérer un exercice par ID et surcharger certains champs
function ex(id: string, overrides: Partial<{ durationMinutes: number; subtitle: string }> = {}) {
  const base = DEFAULT_EXERCISES.find(e => e.id === id);
  if (!base) throw new Error(`Exercise not found: ${id}`);
  return { ...base, ...overrides };
}

export const DEFAULT_ROUTINES: Routine[] = [

  // ── PRÉSENCE ────────────────────────────────────────────────────────────────
  {
    id: 'routine-presence',
    title: 'Routine Présence',
    tag: 'Présence',
    durationMinutes: 39,
    exercises: [
      ex('ex-med-01'),
      ex('ex-bre-01'),
      ex('ex-vis-01'),
      ex('ex-sho-01'),
      ex('ex-man-01', { durationMinutes: 5 }),
    ],
  },

  // ── SÉRÉNITÉ ────────────────────────────────────────────────────────────────
  {
    id: 'routine-serenite',
    title: 'Routine Sérénité',
    tag: 'Sérénité',
    durationMinutes: 49,
    exercises: [
      ex('ex-bre-03'),
      ex('ex-med-04'),
      ex('ex-mov-01'),
      ex('ex-sho-01'),
      ex('ex-man-01', { durationMinutes: 10 }),
    ],
  },

  // ── ÉNERGIE ─────────────────────────────────────────────────────────────────
  {
    id: 'routine-energie',
    title: 'Routine Énergie',
    tag: 'Énergie',
    durationMinutes: 60,
    exercises: [
      ex('ex-bre-02'),
      ex('ex-mov-05'),
      ex('ex-mov-03'),
      ex('ex-sho-02'),
      ex('ex-man-01', { durationMinutes: 10 }),
      ex('ex-vis-02'),
    ],
  },

  // ── ÉMOTIONS ────────────────────────────────────────────────────────────────
  {
    id: 'routine-emotions',
    title: 'Routine Émotions',
    tag: 'Émotions',
    durationMinutes: 72,
    exercises: [
      ex('ex-bre-03'),
      ex('ex-med-03'),
      ex('ex-mov-01'),
      ex('ex-mov-04'),
      ex('ex-sho-01'),
      ex('ex-man-01', { durationMinutes: 10 }),
      ex('ex-jou-01'),
    ],
  },

  // ── FOCUS ───────────────────────────────────────────────────────────────────
  {
    id: 'routine-focus',
    title: 'Routine Focus',
    tag: 'Focus',
    durationMinutes: 45,
    exercises: [
      ex('ex-med-02'),
      ex('ex-bre-04'),
      ex('ex-mov-02'),
      ex('ex-sho-03'),
      ex('ex-man-01', { durationMinutes: 10 }),
    ],
  },
];
