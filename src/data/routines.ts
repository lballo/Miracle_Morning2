import { Routine } from '../types';

export const DEFAULT_ROUTINES: Routine[] = [
  // ── PRÉSENCE ────────────────────────────────────────────────────────────────
  {
    id: 'routine-presence',
    title: 'Routine Présence',
    tag: 'Présence',
    durationMinutes: 39,
    exercises: [
      {
        id: 'rp-1', type: 'meditation',
        title: 'Méditation d\'Ancrage', subtitle: 'Présence et conscience corporelle', durationMinutes: 7,
        description: 'S\'asseoir confortablement en ayant une attention particulière sur les points d\'appuis (pieds, bassin). Votre respiration est naturelle.\n\nSi des pensées vous viennent, vous pouvez imaginer qu\'il s\'agit de nuages que vous pouvez laisser passer.\n\nVotre respiration est de plus en plus lente et profonde. Que ressentez-vous dans votre corps en cet instant?\n\n"Je rentre chez moi, dans mon corps."',
      },
      {
        id: 'rp-2', type: 'breathing',
        title: 'Respiration d\'Enracinement', subtitle: 'Je respire et je prends ma place', durationMinutes: 5,
        description: 'Inspiration par le nez — 4 temps\nExpiration par la bouche — 6 temps\nMa main est posée sur le ventre.\n\nJe laisse la sensation me traverser. Si je ressens un endroit de tension, je peux respirer dans la sensation avec cette intention: "je t\'autorise à être" pour accueillir la sensation.',
      },
      {
        id: 'rp-3', type: 'visualization',
        title: 'Le Chêne', subtitle: 'Je consolide mes racines', durationMinutes: 7,
        description: 'Debout je prends le temps de prendre conscience de mes pieds, de mon socle, de ma respiration.\n\nJe visualise des racines qui poussent de plus en plus en profondeur comme si j\'étais un magnifique chêne. Je peux visualiser une forêt autour de moi. Je prends conscience de ce que je vois, des sons, des odeurs...\n\nJe ressens cette énergie remonter le long de mes racines pour m\'apporter encore plus de solidité. Du haut de cette confiance et de cette solidité, qu\'est-ce que je suis désormais capable d\'accomplir?',
      },
      {
        id: 'rp-4', type: 'shower',
        title: 'Douche Consciente', subtitle: 'Reprendre contact avec mon corps', durationMinutes: 15,
        description: 'Je peux prendre le temps de faire des frottements doux en prenant conscience de mes sensations avec les mains ou un gant. J\'éveille la sensation sans accélérer en restant dans ma présence.\n\nEn fin de douche je peux réveiller mon corps avec de l\'eau fraîche.',
      },
      {
        id: 'rp-5', type: 'mantra',
        title: 'Mantra', subtitle: 'Mes affirmations positives', durationMinutes: 5,
        description: 'Je prends le temps de m\'imprégner de ces mantras et qualités. Je peux prendre un temps pour en écrire d\'autres si je le souhaite.',
      },
    ],
  },

  // ── SÉRÉNITÉ ────────────────────────────────────────────────────────────────
  {
    id: 'routine-serenite',
    title: 'Routine Sérénité',
    tag: 'Sérénité',
    durationMinutes: 49,
    exercises: [
      {
        id: 'rs-1', type: 'breathing',
        title: 'Respiration Apaisante', subtitle: 'Faire silence en soi', durationMinutes: 7,
        description: 'Je m\'installe debout ou assis·e avec le dos droit. J\'inspire sur 5 temps, je retiens sur 5 temps et j\'expire sur 5 temps. Je recommence. Je peux ralentir progressivement ma respiration pour me détendre encore plus.\n\nJe calme progressivement mon système nerveux.',
      },
      {
        id: 'rs-2', type: 'meditation',
        title: 'Ma Sécurité Intérieure', subtitle: 'Mon lieu ressource', durationMinutes: 7,
        description: 'Je prends le temps de respirer profondément et de ressentir l\'espace qui se crée à l\'intérieur de moi. Cette respiration est de plus en plus profonde.\n\nProgressivement, je visualise un lieu qui m\'apporte du lâcher-prise, sérénité et détente. Je suis libre de m\'y plonger pleinement en toute sécurité, de me balader, d\'explorer, de voyager.\n\nJe ressens toutes les sensations associées: les sons, les odeurs, les couleurs, les images...\n\nJe peux renforcer encore ces sensations et les associer à une couleur ou à une image qui sera une ancre pour moi.',
      },
      {
        id: 'rs-3', type: 'movement',
        title: 'Mouvement Doux', subtitle: 'Je me relâche', durationMinutes: 10,
        description: 'Je réalise des étirements lents.\nJe tiens les postures sans recherche de performance.\nJ\'allonge mon expiration à chaque relâchement.\nJ\'écoute mon corps, sans objectif.',
      },
      {
        id: 'rs-4', type: 'shower',
        title: 'Douche Consciente', subtitle: 'Sérénité & Bien-être', durationMinutes: 15,
        description: 'Je prends le temps d\'une douche chaude, enveloppante.',
      },
      {
        id: 'rs-5', type: 'mantra',
        title: 'Mantra', subtitle: 'Mes affirmations positives', durationMinutes: 10,
        description: 'Je prends le temps de m\'imprégner de ces mantras et qualités. Je peux prendre un temps pour en écrire d\'autres si je le souhaite.',
      },
    ],
  },

  // ── ÉNERGIE ─────────────────────────────────────────────────────────────────
  {
    id: 'routine-energie',
    title: 'Routine Énergie',
    tag: 'Énergie',
    durationMinutes: 60,
    exercises: [
      {
        id: 're-1', type: 'breathing',
        title: 'Respiration Dynamique', subtitle: 'Connecter l\'énergie au corps', durationMinutes: 5,
        description: 'J\'inspire profondément par le nez pendant 4 temps.\nJ\'expire par la bouche pendant 6 temps.\nJe pose une main sur mon ventre et je me connecte à mon élan intérieur.',
      },
      {
        id: 're-2', type: 'movement',
        title: 'Échauffement Corporel', subtitle: 'Réveil & dynamisme', durationMinutes: 15,
        description: 'J\'échauffe chaque partie de mon corps: la nuque, les épaules, les hanches et les genoux, les chevilles...\n\nJe réalise des mouvements circulaires, progressifs et respectueux de mon rythme. Puis je peux aller plus loin en étant toujours à l\'écoute de mon corps: planche, montée de genoux, squats, abdos...',
      },
      {
        id: 're-3', type: 'movement',
        title: 'Mouvement Libre & Danse', subtitle: 'J\'exprime mon élan vital', durationMinutes: 10,
        description: 'Je mets une musique que j\'aime et je laisse mon corps guider le mouvement. Il n\'y a rien besoin d\'être, ni besoin de réfléchir. Je laisse mon mouvement naturel s\'exprimer.\n\nJe ressens ce qui est vivant en moi.',
      },
      {
        id: 're-4', type: 'shower',
        title: 'Douche Dynamisante', subtitle: 'Réveiller le corps et stimuler l\'élan vital', durationMinutes: 15,
        description: 'Je prends une douche en laissant l\'eau froide ou fraîche stimuler mon corps.\nJe respire calmement pendant que l\'eau réveille mon énergie.\nJe peux alterner eau chaude et eau froide si cela me semble plus juste pour moi. Je suis à l\'écoute de mon corps.',
      },
      {
        id: 're-5', type: 'mantra',
        title: 'Mantra', subtitle: 'Mes affirmations positives', durationMinutes: 10,
        description: 'Je prends le temps de m\'imprégner de ces mantras et qualités. Je peux prendre un temps pour en écrire d\'autres si je le souhaite.',
      },
      {
        id: 're-6', type: 'visualization',
        title: 'Mes Désirs Profonds', subtitle: 'Rêves & désirs', durationMinutes: 5,
        description: 'Sur une musique inspirante, je peux prendre le temps de visualiser ce que je désire véritablement, qui me met en joie et qui me donne cet élan vital.\n\nJe ressens dans mon corps ce que cela éveille: l\'enthousiasme, l\'élan, la motivation.\nJe laisse ces images nourrir mon énergie.',
      },
    ],
  },

  // ── ÉMOTIONS ────────────────────────────────────────────────────────────────
  {
    id: 'routine-emotions',
    title: 'Routine Émotions',
    tag: 'Émotions',
    durationMinutes: 72,
    exercises: [
      {
        id: 'rem-1', type: 'breathing',
        title: 'Respiration Équilibre', subtitle: 'Apaiser et créer de l\'espace intérieur', durationMinutes: 5,
        description: 'Je pratique une respiration lente.\nJ\'inspire pendant 4 temps et j\'expire pendant 6 temps, sans rétention.\nJe laisse l\'expiration s\'allonger naturellement pour apaiser mon état intérieur.',
      },
      {
        id: 'rem-2', type: 'meditation',
        title: 'Accueillir l\'Émotion', subtitle: 'Accueillir & Libérer', durationMinutes: 7,
        description: 'Je prends conscience de mon corps, j\'observe les sensations à l\'intérieur de moi: crispation, détente, contraction...\n\nJe porte mon attention sur l\'endroit où l\'émotion est présente.\nJe respire en profondeur dans cette zone de manière fluide sans bloquer.\n\nJe pose intérieurement cette intention: "je t\'autorise à être". Si une émotion survient, je la laisse simplement me traverser sans jugement.',
      },
      {
        id: 'rem-3', type: 'movement',
        title: 'Mouvement Doux et Yoga', subtitle: 'Redonner au corps sa place d\'appui', durationMinutes: 10,
        description: 'Je prends le temps de m\'échauffer les différentes parties du corps: cou, épaules, hanches, genoux, chevilles.\n\nJe réalise des étirements lents, je tiens les postures et j\'enchaîne des mouvements fluides.\nJe synchronise chaque mouvement avec ma respiration.',
      },
      {
        id: 'rem-4', type: 'movement',
        title: 'Mouvement Émotionnel', subtitle: 'Émotions & corps', durationMinutes: 10,
        description: 'Je mets une musique que j\'aime. Je laisse mon corps s\'exprimer, je vis mon émotion au travers du mouvement et de la danse.\n\nJe choisis de ressentir plutôt que de comprendre, je ressens ce qui est vivant chez moi.\n\nAlternative: je ressens l\'émotion, je commence par un petit mouvement et j\'exprime l\'émotion par le mouvement.\n\nJ\'exprime ce qui est vivant.',
      },
      {
        id: 'rem-5', type: 'shower',
        title: 'Douche Consciente', subtitle: 'Sérénité & Bien-être', durationMinutes: 15,
        description: 'Je prends le temps d\'une douche chaude, enveloppante.',
      },
      {
        id: 'rem-6', type: 'mantra',
        title: 'Mantra', subtitle: 'Prendre soin & s\'aimer', durationMinutes: 10,
        description: 'Je prends le temps de m\'imprégner de ces mantras et qualités. Je peux prendre un temps pour en écrire d\'autres si je le souhaite.',
      },
      {
        id: 'rem-7', type: 'journal',
        title: 'La Lettre d\'Amour à Moi-Même', subtitle: 'M\'aimer & m\'honorer', durationMinutes: 15,
        description: 'J\'écris une lettre d\'amour à une personne que j\'aime profondément: moi. Je prends le temps de détailler mes joies, mes qualités, mes succès, ce dont je suis fier·e.\n\nJ\'apprends aussi à reconnaître mon magnifique parcours ainsi que la personne que je suis devenu·e. Je peux accepter ce que je suis, me pardonner, prendre ce temps avec moi pour me complimenter et m\'honorer.\n\nJe peux finir avec cette conviction profonde que oui je mérite d\'être heureux·se, que oui je mérite tout l\'amour du monde.\n\nJe peux finir par: je m\'aime.',
      },
    ],
  },

  // ── FOCUS ───────────────────────────────────────────────────────────────────
  {
    id: 'routine-focus',
    title: 'Routine Focus',
    tag: 'Focus',
    durationMinutes: 45,
    exercises: [
      {
        id: 'rf-1', type: 'meditation',
        title: 'Méditation de Centrage', subtitle: 'Revenir à l\'essentiel', durationMinutes: 5,
        description: 'Je m\'assois confortablement, le dos droit.\nJe porte mon attention sur un point précis, comme le souffle au niveau du nez ou le contact de mes pieds avec le sol.\n\nChaque fois que mon esprit s\'échappe, je reviens simplement à ce point, sans jugement.',
      },
      {
        id: 'rf-2', type: 'breathing',
        title: 'Respiration Focus', subtitle: 'Rassembler l\'attention et réduire la dispersion mentale', durationMinutes: 5,
        description: 'Je pratique une respiration carrée.\nJ\'inspire pendant 5 temps, je retiens pendant 5 temps, j\'expire pendant 5 temps, puis je marque une pause de 5 temps.\n\nJe répète pendant 5 minutes.',
      },
      {
        id: 'rf-3', type: 'movement',
        title: 'Mouvement Dynamique', subtitle: 'Engager le corps et transformer l\'intention en énergie', durationMinutes: 15,
        description: 'Je mets mon corps en mouvement de façon continue et volontaire: marche rapide, cardio doux ou renforcement léger.\n\nMon corps est engagé et mon rythme reste régulier.',
      },
      {
        id: 'rf-4', type: 'shower',
        title: 'Douche Dynamisante', subtitle: 'Réveiller le corps', durationMinutes: 15,
        description: 'Je prends une douche en laissant l\'eau froide ou fraîche stimuler mon corps.\nJe respire calmement pendant que l\'eau réveille mon énergie.',
      },
      {
        id: 'rf-5', type: 'mantra',
        title: 'Mantra', subtitle: 'Mes affirmations positives', durationMinutes: 10,
        description: 'Je prends le temps de m\'imprégner de ces mantras et qualités. Je peux prendre un temps pour en écrire d\'autres si je le souhaite.',
      },
    ],
  },
];
