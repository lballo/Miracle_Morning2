import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pause, Play, Check, Volume2, VolumeX } from 'lucide-react';
import { useApp, useMantrasByTag, useQualitiesByTag } from '../context/AppContext';
import { Routine, Tag } from '../types';

// ─── Fade durations ───────────────────────────────────────────────────────────
const FADE_IN_DURATION  = 3000; // ms
const FADE_OUT_DURATION = 2500; // ms

// ─── Gong helper ──────────────────────────────────────────────────────────────
function playGong(volume: number = 0.7) {
  const audio = new Audio('/sounds/transition-gong.mp3');
  audio.volume = volume;
  audio.play().catch(() => {});
}

// ─── Hook musique de fond ─────────────────────────────────────────────────────
function useBgMusic(exerciseId: string, musicSrc: string | null | undefined, targetVolume: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef  = useRef<number | null>(null);

  const clearFade = () => { if (fadeRef.current) { clearInterval(fadeRef.current); fadeRef.current = null; } };

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    audio.play().catch(() => {});
    const steps = 30;
    const interval = FADE_IN_DURATION / steps;
    let step = 0;
    clearFade();
    fadeRef.current = window.setInterval(() => {
      step++;
      audio.volume = Math.min(targetVolume, (step / steps) * targetVolume);
      if (step >= steps) clearFade();
    }, interval);
  };

  const fadeOut = (audio: HTMLAudioElement, onDone?: () => void) => {
    const startVol = audio.volume;
    const steps = 25;
    const interval = FADE_OUT_DURATION / steps;
    let step = 0;
    clearFade();
    fadeRef.current = window.setInterval(() => {
      step++;
      audio.volume = Math.max(0, startVol * (1 - step / steps));
      if (step >= steps) { clearFade(); audio.pause(); audio.currentTime = 0; onDone?.(); }
    }, interval);
  };

  // Changer la musique quand l'exercice change
  useEffect(() => {
    const src = musicSrc;
    // Fade out l'ancien
    if (audioRef.current) {
      const old = audioRef.current;
      fadeOut(old);
      audioRef.current = null;
    }
    if (!src) return;
    // Fade in le nouveau
    const audio = new Audio(src);
    audio.loop = true;
    audioRef.current = audio;
    fadeIn(audio);
    return () => { clearFade(); audio.pause(); };
  }, [exerciseId]);

  // Ajuster le volume cible en temps réel
  useEffect(() => {
    if (audioRef.current && !fadeRef.current) {
      audioRef.current.volume = targetVolume;
    }
  }, [targetVolume]);

  const stopNow = useCallback(() => {
    if (audioRef.current) { fadeOut(audioRef.current); audioRef.current = null; }
  }, []);

  return { stopNow };
}

// ─── Timer (isActive contrôlé depuis le parent) ───────────────────────────────
function Timer({ durationMinutes, isActive, onComplete }: {
  durationMinutes: number; isActive: boolean; onComplete: () => void;
}) {
  const total = durationMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(total);

  useEffect(() => { setTimeLeft(total); }, [total]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0) onComplete();
      return;
    }
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const progress = ((total - timeLeft) / total) * 100;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const r = 70;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="relative w-40 h-40 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={r} stroke="currentColor" strokeWidth="2" fill="transparent" className="text-charcoal" />
        <motion.circle
          cx="80" cy="80" r={r} stroke="currentColor" strokeWidth="3" fill="transparent"
          className="text-lavender"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          strokeLinecap="round"
          animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-light tabular-nums text-white">{mins}:{String(secs).padStart(2, '0')}</span>
        <span className="text-xs text-muted mt-0.5">{durationMinutes} min</span>
      </div>
    </div>
  );
}

// ─── Mantra Exercise ──────────────────────────────────────────────────────────
function MantraExercise({ tag }: { tag: Tag }) {
  const mantras = useMantrasByTag(tag).slice(0, 5);
  const qualities = useQualitiesByTag(tag).slice(0, 3);
  return (
    <div className="space-y-4">
      {mantras.map((m, i) => (
        <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="bg-midnight/60 border border-lavender/10 rounded-2xl p-4">
          <p className="text-base font-serif italic text-offwhite leading-relaxed">"{m.text}"</p>
        </motion.div>
      ))}
      <div className="border-t border-white/5 pt-4">
        <p className="text-xs text-lavender/60 uppercase tracking-widest mb-3">Qualités</p>
        <div className="flex flex-wrap gap-2">
          {qualities.map(q => (
            <span key={q.id} className="px-4 py-1.5 rounded-full bg-lavender/10 border border-lavender/20 text-lavender text-sm font-medium">{q.text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Écran de fin ─────────────────────────────────────────────────────────────
function RoutineSummary({ routine, onViewRoutines, onJournal }: {
  routine: Routine; onViewRoutines: () => void; onJournal: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center stars-bg">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
        className="w-20 h-20 rounded-full bg-gradient-to-tr from-lavender to-violet-deep flex items-center justify-center mb-8 shadow-glow-strong">
        <Check size={40} className="text-white" strokeWidth={3} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full max-w-[300px]">
        <h2 className="text-3xl font-serif text-white mb-4">Routine Complétée</h2>
        <p className="text-muted text-base mb-10 leading-relaxed">
          Bravo d'avoir pris ce temps pour toi. Je te souhaite une belle journée.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <button onClick={onViewRoutines} className="w-full px-8 py-4 rounded-full bg-white text-midnight font-medium hover:bg-lavender transition-colors shadow-lg">
            Voir mes routines
          </button>
          <button onClick={onJournal} className="w-full px-8 py-4 rounded-full bg-charcoal border border-lavender/30 text-lavender font-medium hover:bg-lavender/10 transition-colors">
            Compléter mon journal
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
interface RoutineExecutionProps {
  routine: Routine; tag: Tag;
  onComplete: () => void; onViewRoutines: () => void; onJournal: () => void;
}

export function RoutineExecution({ routine, tag, onComplete, onViewRoutines, onJournal }: RoutineExecutionProps) {
  const { dispatch } = useApp();
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [showVolume, setShowVolume] = useState(false);

  const exercises = routine.exercises;
  const exercise = exercises[exerciseIdx];
  const isLast = exerciseIdx === exercises.length - 1;
  const hasBgMusic = !!exercise.music;
  const { stopNow } = useBgMusic(exercise.id, exercise.music, volume);

  const handleComplete = useCallback(() => {
    stopNow();
    playGong(1.0);
    setTimeout(() => playGong(1.0), 2500);
    dispatch({ type: 'COMPLETE_ROUTINE', payload: { durationMinutes: routine.durationMinutes } });
    setCompleted(true);
  }, [dispatch, routine.durationMinutes, stopNow]);

  const goNext = (fromTimer = false) => {
    if (isLast) handleComplete();
    else {
      if (fromTimer) playGong(0.5);
      setExerciseIdx(i => i + 1);
      setIsActive(true);
    }
  };
  const goPrev = () => {
    if (exerciseIdx > 0) { setExerciseIdx(i => i - 1); setIsActive(true); }
  };

  if (completed) {
    return (
      <RoutineSummary
        routine={routine}
        onViewRoutines={() => { onComplete(); onViewRoutines(); }}
        onJournal={() => { onComplete(); onJournal(); }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header figé : titre de la routine + progression */}
      <div className="px-6 pt-5 pb-3 flex items-center gap-3 flex-shrink-0">
        <div className="flex-1">
          <p className="text-xs text-lavender/60 uppercase tracking-widest font-medium">{routine.title}</p>
          <p className="text-xs text-muted">{exerciseIdx + 1} / {exercises.length}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Bouton volume — visible uniquement si musique active */}
          {hasBgMusic && (
            <div className="relative">
              <button
                onClick={() => setShowVolume(v => !v)}
                className={`p-2 rounded-full transition-all ${showVolume ? 'bg-lavender/20 text-lavender' : 'text-muted/40 hover:text-muted'}`}
              >
                {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <AnimatePresence>
                {showVolume && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-10 bg-charcoal border border-white/10 rounded-2xl px-4 py-3 z-10 shadow-xl"
                  >
                    <input
                      type="range" min={0} max={1} step={0.05}
                      value={volume}
                      onChange={e => setVolume(parseFloat(e.target.value))}
                      className="w-24 accent-lavender cursor-pointer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <div className="flex gap-1">
            {exercises.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i < exerciseIdx ? 'bg-lavender w-4' : i === exerciseIdx ? 'bg-lavender/80 w-5' : 'bg-white/10 w-3'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Titre + sous-titre de l'exercice */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`header-${exercise.id}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center px-6 pb-3 flex-shrink-0"
        >
          <h2 className="text-2xl font-serif text-white mb-1">{exercise.title}</h2>
          {exercise.subtitle && <p className="text-lavender/70 text-sm">{exercise.subtitle}</p>}
        </motion.div>
      </AnimatePresence>

      {/* Timer */}
      <div className="flex justify-center py-4 flex-shrink-0">
        <Timer key={exercise.id} durationMinutes={exercise.durationMinutes || 1} isActive={isActive} onComplete={() => goNext(true)} />
      </div>

      {/* Description scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pb-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`desc-${exercise.id}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {exercise.type === 'mantra' ? (
              <MantraExercise tag={tag} />
            ) : (
              exercise.description ? (
                <div className="bg-charcoal/30 border border-white/5 rounded-2xl p-5">
                  <p className="text-offwhite/80 text-sm leading-relaxed whitespace-pre-line">{exercise.description}</p>
                </div>
              ) : null
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer — ← pause → */}
      <div className="flex-shrink-0 border-t border-white/5 px-8 py-4 bg-midnight/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={exerciseIdx === 0}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${exerciseIdx === 0 ? 'border-white/5 text-muted/20 cursor-not-allowed' : 'border-white/10 text-muted hover:text-offwhite hover:border-white/30'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => setIsActive(a => !a)}
            className="w-14 h-14 rounded-full bg-lavender text-midnight flex items-center justify-center hover:bg-white transition-colors shadow-glow"
          >
            {isActive ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" className="ml-0.5" size={20} />}
          </button>
          <button
            onClick={() => goNext()}
            className="w-12 h-12 rounded-full bg-lavender/20 border border-lavender/30 text-lavender flex items-center justify-center hover:bg-lavender hover:text-midnight transition-all"
          >
            {isLast ? <Check size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
