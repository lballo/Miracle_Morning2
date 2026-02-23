import { Mantra } from '../types';

export const DEFAULT_MANTRAS: Mantra[] = [
  // ── Présence ────────────────────────────────────────────────────────────────
  { id: 'm-p1', text: 'Je reviens à l\'essentiel. Je ne cherche plus à être, je suis.', tag: 'Présence', favorite: false },
  { id: 'm-p2', text: 'J\'incarne ma présence ici et maintenant.', tag: 'Présence', favorite: false },
  { id: 'm-p3', text: 'Je n\'ai rien à prouver, je suis assez.', tag: 'Présence', favorite: false },
  { id: 'm-p4', text: 'Je suis capable de réaliser tout ce que je désire avec calme et détermination.', tag: 'Présence', favorite: true },
  { id: 'm-p5', text: 'Je suis ancré·e dans mon corps et dans l\'instant présent.', tag: 'Présence', favorite: false },

  // ── Sérénité ────────────────────────────────────────────────────────────────
  { id: 'm-s1', text: 'Je lâche-prise pour revenir à mon essentiel.', tag: 'Sérénité', favorite: false },
  { id: 'm-s2', text: 'Je me sens en sécurité à l\'intérieur de moi-même, tout va bien.', tag: 'Sérénité', favorite: false },
  { id: 'm-s3', text: 'J\'accepte de ne pas être parfait·e, je suis.', tag: 'Sérénité', favorite: false },
  { id: 'm-s4', text: 'Je suis maître·sse de mon temps et de mon énergie.', tag: 'Sérénité', favorite: true },
  { id: 'm-s5', text: 'Je prends ma place, je suis maître·sse de mon temps.', tag: 'Sérénité', favorite: false },

  // ── Focus ───────────────────────────────────────────────────────────────────
  { id: 'm-f1', text: 'Je reviens à l\'essentiel : je distingue l\'important du bruit.', tag: 'Focus', favorite: false },
  { id: 'm-f2', text: 'J\'apprends à faire silence pour mieux agir.', tag: 'Focus', favorite: false },
  { id: 'm-f3', text: 'Se positionner c\'est aussi apprendre à faire de vrais choix.', tag: 'Focus', favorite: false },
  { id: 'm-f4', text: 'Ma clarté intérieure guide chaque action.', tag: 'Focus', favorite: true },
  { id: 'm-f5', text: 'Chaque jour, je grandis et je deviens une meilleure version de moi-même.', tag: 'Focus', favorite: false },

  // ── Énergie ─────────────────────────────────────────────────────────────────
  { id: 'm-e1', text: 'J\'accueille mon mouvement intérieur.', tag: 'Énergie', favorite: false },
  { id: 'm-e2', text: 'Quand je cesse de lutter, mon énergie retrouve sa véritable direction.', tag: 'Énergie', favorite: false },
  { id: 'm-e3', text: 'Je ne force pas le vent. J\'apprends à ajuster ma voile.', tag: 'Énergie', favorite: false },
  { id: 'm-e4', text: 'L\'énergie suit la cohérence.', tag: 'Énergie', favorite: false },
  { id: 'm-e5', text: 'Je redeviens à l\'écoute de mes désirs et de mon élan vital.', tag: 'Énergie', favorite: true },

  // ── Émotions ────────────────────────────────────────────────────────────────
  { id: 'm-em1', text: 'Mon émotion fait partie de ce que je suis. Je l\'accueille sans me juger.', tag: 'Émotions', favorite: false },
  { id: 'm-em2', text: 'Ma sensibilité est comme une pierre précieuse. Elle m\'apporte richesse et finesse.', tag: 'Émotions', favorite: false },
  { id: 'm-em3', text: 'J\'apprends à accueillir ma vulnérabilité avec beaucoup d\'amour.', tag: 'Émotions', favorite: false },
  { id: 'm-em4', text: 'Je m\'aime et je m\'accepte comme je suis.', tag: 'Émotions', favorite: true },
  { id: 'm-em5', text: 'Je mérite la paix, la joie et l\'abondance dans ma vie.', tag: 'Émotions', favorite: false },
];
