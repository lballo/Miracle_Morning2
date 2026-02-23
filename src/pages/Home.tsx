import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Wind, Flame, Zap, Compass, ChevronRight, ArrowLeft } from 'lucide-react';
import { useApp, useRoutineByTag } from '../context/AppContext';
import { Tag, Mood } from '../types';
import { WELCOME_MANTRAS, INTENTIONS } from '../data/questions';

type HomeStep = 'checkin' | 'transition-mantra' | 'needs' | 'intention' | 'ready';
const FLOW: HomeStep[] = ['checkin', 'transition-mantra', 'needs', 'intention', 'ready'];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div key={i} className="absolute bg-lavender rounded-full blur-xl"
          style={{ width: Math.random() * 50 + 15, height: Math.random() * 50 + 15, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0, 0.3, 0], y: [0, -100] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}
    </div>
  );
}

// Écran de checkin — contenu en zone médiane/basse
function CheckIn({ onNext, firstName, gender }: { onNext: (mood: Mood) => void; firstName: string; gender: string | null }) {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0'), m = String(now.getMinutes()).padStart(2, '0');
  const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

  const isMasc = gender === 'Homme';
  const moods: Mood[] = isMasc
    ? ['Reposé','Anxieux','Enthousiaste','Fatigué','Calme']
    : ['Reposée','Anxieuse','Enthousiaste','Fatiguée','Calme'];
  return (
    <div className="flex flex-col min-h-full relative">
      <Particles />
      {/* Contenu centré verticalement et horizontalement */}
      <div className="flex flex-col flex-1 justify-end px-6 pb-20 pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-left w-full max-w-[320px]">
          <h2 className="text-lavender/80 text-sm font-medium tracking-widest uppercase mb-2">Bonjour, {firstName || 'Alex'} ·</h2>
          <h1 className="text-7xl font-serif text-white tracking-tight drop-shadow-lg mb-1">{h}:{m}</h1>
          <p className="text-muted text-lg font-light">{days[now.getDay()]} {now.getDate()} {months[now.getMonth()]}</p>
        </motion.div>
        <div className="w-full max-w-[320px]">
          <p className="text-offwhite/80 font-serif italic text-xl mb-8">"Comment vous sentez-vous ce matin ?"</p>
          <div className="flex flex-wrap gap-3">
            {moods.map((mood, i) => (
              <motion.button key={mood} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                onClick={() => onNext(mood)}
                className="px-5 py-2.5 rounded-full bg-charcoal border border-lavender/20 text-offwhite hover:bg-lavender/20 hover:border-lavender/50 hover:shadow-glow transition-all duration-300 text-sm font-medium">
                {mood}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Écran citation de transition — centré, aucun bouton, auto 2s
function TransitionMantra({ onNext }: { onNext: () => void }) {
  const mantra = useMemo(() => WELCOME_MANTRAS[Math.floor(Math.random() * WELCOME_MANTRAS.length)], []);
  useEffect(() => { const t = setTimeout(onNext, 3000); return () => clearTimeout(t); }, [onNext]);
  return (
    <div className="absolute inset-0 flex items-center justify-center px-10 text-center bg-midnight stars-bg cursor-pointer" onClick={onNext}>
      <Particles />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        className="text-2xl font-serif text-offwhite italic leading-relaxed relative z-10">
        "{mantra}"
      </motion.p>
    </div>
  );
}

const TAG_CONFIG: { id: Tag; icon: React.ElementType; desc: string }[] = [
  { id: 'Présence', icon: Wind,    desc: 'Respiration et enracinement' },
  { id: 'Sérénité', icon: Moon,    desc: 'Calme & paix' },
  { id: 'Focus',    icon: Flame,   desc: 'Clarté et direction' },
  { id: 'Énergie',  icon: Zap,     desc: 'Mouvement & force' },
  { id: 'Émotions', icon: Compass, desc: 'Journaling & Cœur' },
];

function Needs({ onNext, onBack }: { onNext: (tag: Tag) => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header figé */}
      <div className="flex-shrink-0 px-6 pt-14 pb-2">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-offwhite transition-all mb-4">
          <ArrowLeft size={16} /><span>Retour</span>
        </button>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-serif text-white mb-1">Votre besoin ?</h2>
          <p className="text-muted">Quelle est votre intention pour aujourd'hui ?</p>
        </motion.div>
      </div>
      {/* Liste scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        <div className="space-y-3">
          {TAG_CONFIG.map(({ id, icon: Icon, desc }, i) => (
            <motion.button key={id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => onNext(id)}
              className="group w-full relative overflow-hidden rounded-2xl bg-charcoal/50 border border-white/5 p-5 text-left hover:bg-charcoal hover:border-lavender/30 transition-all duration-300 hover:shadow-glow">
              <div className="absolute inset-0 bg-gradient-to-r from-lavender/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 rounded-full bg-midnight border border-lavender/20 text-lavender group-hover:scale-110 transition-transform duration-300"><Icon size={20} /></div>
                <div>
                  <h3 className="text-lg font-medium text-offwhite">{id}</h3>
                  <p className="text-sm text-muted group-hover:text-lavender/80">{desc}</p>
                </div>
                <ChevronRight className="ml-auto text-muted/30 group-hover:text-lavender/50 group-hover:translate-x-1 transition-all" size={20} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Écran intention — centré, aucun bouton, auto 2s
function IntentionScreen({ tag, onNext }: { tag: Tag; onNext: () => void }) {
  const intention = useMemo(() => { const arr = INTENTIONS[tag]; return arr[Math.floor(Math.random() * arr.length)]; }, [tag]);
  useEffect(() => { const t = setTimeout(onNext, 3000); return () => clearTimeout(t); }, [onNext]);
  return (
    <div className="absolute inset-0 flex items-center justify-center px-10 text-center bg-midnight stars-bg cursor-pointer" onClick={onNext}>
      <Particles />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10">
        <p className="text-xs text-lavender/70 uppercase tracking-widest mb-6 font-medium">{tag}</p>
        <p className="text-2xl font-serif text-offwhite italic leading-relaxed mb-6">"{intention}"</p>
      </motion.div>
    </div>
  );
}

function ReadyScreen({ tag, onStartRoutine, onSkip }: { tag: Tag; onStartRoutine: () => void; onSkip: () => void }) {
  const routine = useRoutineByTag(tag);
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center pt-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-20 h-20 rounded-full bg-lavender/10 border border-lavender/30 flex items-center justify-center mx-auto mb-8">
          <span className="text-3xl">✦</span>
        </div>
        <p className="text-lavender/60 text-xs uppercase tracking-widest mb-2">{tag}</p>
        <h2 className="text-3xl font-serif text-white mb-3">{routine?.title}</h2>
        <p className="text-muted mb-2">{routine?.exercises.length} étapes · {routine?.durationMinutes} min</p>
        <p className="text-offwhite/60 text-sm mb-12 max-w-[260px]">Ta routine est prête. Prends le temps de te préparer confortablement.</p>
        <div className="space-y-3 w-full max-w-[280px]">
          <button onClick={onStartRoutine} className="w-full py-4 rounded-full bg-lavender text-midnight font-semibold hover:bg-white transition-colors shadow-glow">
            Démarrer la routine
          </button>
          <button onClick={onSkip} className="text-xs text-muted/40 hover:text-muted transition-colors mt-2 block w-full">Passer</button>
        </div>
      </motion.div>
    </div>
  );
}

export function Home({ onNavigate, onStartRoutine }: { onNavigate: (tab: string) => void; onStartRoutine: (tag: Tag) => void }) {
  const { state, dispatch } = useApp();
  const { dailySession, user } = state;
  const [step, setStep] = useState<HomeStep>('checkin');

  const goNext = () => { const idx = FLOW.indexOf(step); if (idx < FLOW.length - 1) setStep(FLOW[idx + 1]); };
  const goBack = () => { const idx = FLOW.indexOf(step); if (idx > 0) setStep(FLOW[idx - 1]); };

  const handleMood = (mood: Mood) => { dispatch({ type: 'SET_MOOD', payload: mood }); goNext(); };
  const handleTag = (tag: Tag) => { dispatch({ type: 'SET_TAG', payload: tag }); goNext(); };
  const tag = dailySession.tag;

  const isFullscreen = step === 'transition-mantra' || step === 'intention';

  return (
    <div className="h-full relative flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={isFullscreen ? 'absolute inset-0' : 'flex-1 h-full'}>
          {step === 'checkin'           && <CheckIn onNext={handleMood} firstName={user.firstName} gender={user.gender} />}
          {step === 'transition-mantra' && <TransitionMantra onNext={goNext} />}
          {step === 'needs'             && <Needs onNext={handleTag} onBack={goBack} />}
          {step === 'intention' && tag  && <IntentionScreen tag={tag} onNext={goNext} />}
          {step === 'ready'     && tag  && <ReadyScreen tag={tag} onStartRoutine={() => onStartRoutine(tag)} onSkip={() => onNavigate('routines')} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
