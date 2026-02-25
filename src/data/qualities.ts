import { Quality } from '../types';

export const DEFAULT_QUALITIES: Quality[] = [
  // ── Présence ────────────────────────────────────────────────────────────────
  { id: 'q-p1', text: 'Ancré·e', tag: 'Présence', favorite: false },
  { id: 'q-p2', text: 'Présent·e', tag: 'Présence', favorite: false },
  { id: 'q-p3', text: 'Incarné·e', tag: 'Présence', favorite: true },
  { id: 'q-p4', text: 'Conscient·e', tag: 'Présence', favorite: false },
  { id: 'q-p5', text: 'Enraciné·e', tag: 'Présence', favorite: false },

  // ── Sérénité ────────────────────────────────────────────────────────────────
  { id: 'q-s1', text: 'Serein·e', tag: 'Sérénité', favorite: false },
  { id: 'q-s2', text: 'Apaisé·e', tag: 'Sérénité', favorite: true },
  { id: 'q-s3', text: 'Confiant·e', tag: 'Sérénité', favorite: false },
  { id: 'q-s4', text: 'Équilibré·e', tag: 'Sérénité', favorite: false },
  { id: 'q-s5', text: 'Zen', tag: 'Sérénité', favorite: false },

  // ── Focus ───────────────────────────────────────────────────────────────────
  { id: 'q-f1', text: 'Déterminé·e', tag: 'Focus', favorite: false },
  { id: 'q-f2', text: 'Clair·e', tag: 'Focus', favorite: true },
  { id: 'q-f3', text: 'Centré·e', tag: 'Focus', favorite: false },
  { id: 'q-f4', text: 'Discipliné·e', tag: 'Focus', favorite: false },
  { id: 'q-f5', text: 'Lucide', tag: 'Focus', favorite: false },

  // ── Énergie ─────────────────────────────────────────────────────────────────
  { id: 'q-e1', text: 'Dynamique', tag: 'Énergie', favorite: false },
  { id: 'q-e2', text: 'Vivant·e', tag: 'Énergie', favorite: true },
  { id: 'q-e3', text: 'Enthousiaste', tag: 'Énergie', favorite: false },
  { id: 'q-e4', text: 'Créatif·ve', tag: 'Énergie', favorite: false },
  { id: 'q-e5', text: 'Rayonnant·e', tag: 'Énergie', favorite: false },

  // ── Émotions ────────────────────────────────────────────────────────────────
  { id: 'q-em1', text: 'Résilient·e', tag: 'Émotions', favorite: false },
  { id: 'q-em2', text: 'Empathique', tag: 'Émotions', favorite: false },
  { id: 'q-em3', text: 'Sensible', tag: 'Émotions', favorite: true },
  { id: 'q-em4', text: 'Courageux·se', tag: 'Émotions', favorite: false },
  { id: 'q-em5', text: 'Bienveillant·e', tag: 'Émotions', favorite: false },
];
