import { Tag } from '../types';

// ─── Morning journal questions by tag ────────────────────────────────────────
export const MORNING_QUESTIONS: Record<Tag, string[]> = {
  'Présence': [
    "Qu’est-ce que je n’ai plus besoin de chercher à être aujourd’hui ?",
    "Qu'est-ce qui est vivant en moi, ici et maintenant ?",
    "Si je me donnais la permission d'être pleinement moi, qu'est-ce qui changerait ?",
    "De quoi aurais-je besoin pour pour me sentir plus en présence, pleinement moi-même?",
    "Si j'avais pleinement confiance en moi et dans mes capacités, qu'est-ce que je ferais (que je ne fais peut-être pas encore) ?",
  ],
  'Sérénité': [
    "À partir de ce nouvel état de sérénité, comment est-ce que je vois ma journée?",
    "Qu'est-ce que je peux m'autoriser à lâcher aujourd'hui?",
    "De quoi aurais-je besoin pour lâcher, même partiellement?",
    "Que puis-je mettre en place pour me sentir plus détendu·e dans mon quotidien?",
  ],
  'Focus': [
    "Qu'est-ce qui est essentiel pour moi aujourd'hui?",
    "Quelles sont les 3 choses que je veux avoir faites aujourd'hui?",
    "Quelle action simple me permet d'avancer concrètement?",
    "Où est-ce que je choisis de poser mon énergie en priorité?",
  ],
  'Énergie': [
    "Qu'est-ce qui me met naturellement en mouvement?",
    "Qu'est-ce qui me donne de l'énergie? Qu'est-ce qui m'en coûte?",
    "Qu'ai-je envie d'exprimer ou de créer aujourd'hui?",
    "Quelle action simple pourrait nourrir mon énergie?",
  ],
  'Émotions': [
    "Qu'est-ce que je ressens ici et maintenant?",
    "Quelle émotion est présente en ce moment? De quoi cette émotion a-t-elle besoin?",
    "Comment puis-je laisser être mon émotion, sans lutter ni chercher à comprendre?",
    "Comment est-ce que je vois mes émotions? De quoi aurais-je besoin pour m'autoriser à ressentir pleinement?",
  ],
};

// ─── Evening journal questions ────────────────────────────────────────────────
export const EVENING_QUESTIONS: string[] = [
  "De quoi suis-je reconnaissant·e au sujet de cette journée?",
  "Qu'ai-je découvert sur mes besoins, mes limites ou mon rythme?",
  "Qu'ai-je appris sur moi aujourd'hui?",
  "Quel a été mon principal succès aujourd'hui? De quoi suis-je fier·e?",
];

// ─── Intentions (citations) displayed after tag selection ────────────────────
export const INTENTIONS: Record<Tag, string[]> = {
  'Présence': [
    "Revenir à la présence du corps, ici et maintenant.",
    "Je ne cherche plus à être, je suis.",
    "Je reviens à l'essentiel.",
    "Je n'ai rien à prouver, je suis assez.",
  ],
  'Sérénité': [
    "Je lâche-prise pour revenir à mon essentiel.",
    "Je me sens en sécurité à l'intérieur de moi-même, tout va bien.",
    "Je lâche-prise sur mon besoin de contrôle pour mieux revenir à mon pouvoir intérieur.",
    "J'accepte de ne pas être parfait·e, je suis.",
    "Je suis maître·sse de mon temps et de mon énergie.",
  ],
  'Focus': [
    "Revenir au corps, à soi, à mon enracinement est un acte de clarté intérieure.",
    "Je reviens à l'essentiel: je distingue l'important du bruit. J'apprends à faire silence pour mieux agir.",
    "Se positionner c'est aussi apprendre à faire de vrais choix.",
  ],
  'Énergie': [
    "J'accueille mon mouvement intérieur.",
    "Quand je cesse de lutter, mon énergie retrouve sa véritable direction.",
    "Je ne force pas le vent. J'apprends à ajuster ma voile.",
    "L'énergie suit la cohérence.",
    "Je redeviens à l'écoute de mes désirs et de mon élan vital.",
  ],
  'Émotions': [
    "Mon émotion fait partie de ce que je suis. J'apprends à l'accueillir et à la reconnaître, sans me juger.",
    "Ma sensibilité est comme une pierre précieuse. Elle m'apporte richesse et finesse.",
    "J'apprends à accueillir ma vulnérabilité avec beaucoup d'amour.",
    "Je lâche les armes, je cesse la lutte, je choisis la paix intérieure.",
    "Je m'aime et je m'accepte comme je suis.",
  ],
};

// ─── Welcome mantras (onboarding & daily opening) ────────────────────────────
export const WELCOME_MANTRAS: string[] = [
  "Je reviens à l'essentiel. Je ne cherche plus à être, je suis. J'incarne ma présence.",
  "Chaque matin est une invitation à commencer avec douceur.",
  "Je m'aime et je m'accepte comme je suis.",
  "J'ai le droit et je mérite de prendre du temps pour moi.",
  "Je prends ma place et je m'autorise à être.",
  "Je reviens à l'essentiel, à ma vérité intérieure",
  "Prendre du temps pour soi est un acte d'amour",
  "J'ai le droit de m'apporter de la douceur et de me faire du bien",
  "Chaque jour, je mets en place une routine qui m'aide à avancer vers ce que je désire vraiment.",
];
