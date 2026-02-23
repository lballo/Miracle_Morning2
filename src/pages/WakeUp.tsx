import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Bell, AlarmCheck, BellOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const RINGTONES: { label: string; file: string }[] = [
  { label: 'Douceur Matinale', file: 'douceur-matinale.mp3' },
  { label: 'Bol Tibétain',     file: 'bol-tibetain.mp3'     },
  { label: 'Carillon',         file: 'carillon.mp3'         },
  { label: 'Sons Naturels',    file: 'sons-naturels.mp3'    },
  { label: 'Rivière Calme',    file: 'riviere-calme.mp3'    },
  { label: 'Zen',              file: 'zen.mp3'              },
  { label: 'Souffle',          file: 'souffle.mp3'          },
];

// ─── Vibreur ──────────────────────────────────────────────────────────────────
function startVibration(intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>) {
  if (!('vibrate' in navigator)) return;
  const doVibrate = () => navigator.vibrate([600, 400, 600, 400, 600]);
  doVibrate();
  intervalRef.current = setInterval(doVibrate, 2400);
}

function stopVibration(intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>) {
  if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  if ('vibrate' in navigator) navigator.vibrate(0);
}

// ─── Bouton flèche — Pointer Events + 2 phases d'accélération ────────────────
function ArrowBtn({ delta, onChange, label }: {
  delta: number; onChange: (d: number) => void; label: string;
}) {
  const phase1Ref  = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const phase2Ref  = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const intervalRef= useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAll = () => {
    if (phase1Ref.current)   { clearTimeout(phase1Ref.current);   phase1Ref.current   = null; }
    if (phase2Ref.current)   { clearTimeout(phase2Ref.current);   phase2Ref.current   = null; }
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    onChange(delta);
    phase1Ref.current = setTimeout(() => {
      intervalRef.current = setInterval(() => onChange(delta), 150);
      phase2Ref.current = setTimeout(() => {
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
        intervalRef.current = setInterval(() => onChange(delta), 80);
      }, 1000);
    }, 350);
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={stopAll}
      onPointerCancel={stopAll}
      onPointerLeave={stopAll}
      className="text-muted hover:text-lavender active:text-lavender transition-colors text-xl font-light select-none touch-none w-10 h-10 flex items-center justify-center"
    >
      {label}
    </button>
  );
}

// ─── Modal alarme ─────────────────────────────────────────────────────────────
function AlarmModal({ routineTitle, onSnooze, onLaunch, onDismiss }: {
  routineTitle: string | null;
  onSnooze: () => void;
  onLaunch: () => void;
  onDismiss: () => void;
}) {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-midnight/95 backdrop-blur-sm flex flex-col items-center justify-center px-8 text-center stars-bg"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
        className="w-full max-w-[300px]"
      >
        <div className="w-24 h-24 rounded-full bg-lavender/20 border border-lavender/40 flex items-center justify-center mx-auto mb-6">
          <Bell className="text-lavender" size={40} />
        </div>
        <p className="text-7xl font-serif text-white mb-2">{h}:{m}</p>
        <p className="text-muted mb-10">C'est l'heure de ta routine matinale</p>
        <div className="flex flex-col gap-3 w-full">
          {routineTitle && (
            <button onClick={onLaunch}
              className="w-full py-4 rounded-full bg-lavender text-midnight font-semibold hover:bg-white transition-colors shadow-glow">
              Lancer {routineTitle}
            </button>
          )}
          <button onClick={onSnooze}
            className="w-full py-4 rounded-full bg-charcoal border border-lavender/30 text-lavender font-medium hover:bg-lavender/10 transition-colors">
            Reporter 10 min
          </button>
          <button onClick={onDismiss}
            className="w-full py-4 rounded-full bg-white/5 border border-white/10 text-offwhite font-medium hover:bg-white/10 transition-colors mt-1">
            Ignorer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Modal sélection sonnerie ─────────────────────────────────────────────────
function RingtoneModal({ current, onConfirm, onClose }: {
  current: string;
  onConfirm: (label: string) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(current);
  const previewRef = useRef<HTMLAudioElement | null>(null);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopPreview = () => {
    if (previewRef.current) { previewRef.current.pause(); previewRef.current.currentTime = 0; previewRef.current = null; }
    if (timerRef.current)   { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const playPreview = (ringtone: { label: string; file: string }) => {
    stopPreview();
    setSelected(ringtone.label);
    const audio = new Audio(`/sounds/${ringtone.file}`);
    audio.play().catch(() => {});
    previewRef.current = audio;
    // Arrêt auto après 6 secondes
    timerRef.current = setTimeout(stopPreview, 6000);
  };

  // Nettoyage au démontage
  useEffect(() => () => stopPreview(), []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-midnight/80 backdrop-blur-sm flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }} transition={{ type: 'spring', bounce: 0.2 }}
        className="w-full max-w-md bg-charcoal border border-white/10 rounded-t-3xl px-5 pt-5 pb-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-offwhite font-semibold text-base">Choisir une sonnerie</h2>
          <button onClick={onClose} className="text-muted hover:text-white text-xl leading-none">✕</button>
        </div>

        {/* Liste */}
        <div className="space-y-1 mb-5">
          {RINGTONES.map(r => (
            <button
              key={r.file}
              onClick={() => playPreview(r)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                selected === r.label
                  ? 'bg-lavender/20 border border-lavender/40'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className={`text-sm font-medium flex-1 text-left ${selected === r.label ? 'text-lavender' : 'text-offwhite'}`}>
                {r.label}
              </span>
              {selected === r.label && (
                <span className="text-lavender text-xs">▶</span>
              )}
            </button>
          ))}
        </div>

        {/* Valider */}
        <button
          onClick={() => { stopPreview(); onConfirm(selected); }}
          className="w-full py-3.5 rounded-2xl bg-lavender text-midnight font-semibold hover:bg-white transition-colors"
        >
          Valider
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function WakeUp({ onNavigate, onStartRoutineById }: {
  onNavigate?: (tab: string) => void;
  onStartRoutineById?: (id: string) => void;
}) {
  const { state, dispatch } = useApp();
  const { alarm, routines } = state;

  const update    = (patch: Partial<typeof alarm>) => dispatch({ type: 'UPDATE_ALARM', payload: patch });
  const toggleDay = (i: number) => { const days = [...alarm.days]; days[i] = !days[i]; update({ days }); };
  const changeHour= (delta: number) => update({ hour:   (alarm.hour   + delta + 24) % 24 });
  const changeMin = (delta: number) => update({ minute: (alarm.minute + delta + 60) % 60 });

  const [alarmFiring, setAlarmFiring] = useState(false);
  const [showRingtoneModal, setShowRingtoneModal] = useState(false);
  const audioRef           = useRef<HTMLAudioElement | null>(null);
  const vibrateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const snoozeTimerRef     = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const dismissedKeyRef    = useRef<string | null>(null);

  const linkedRoutine = alarm.routineId ? routines.find(r => r.id === alarm.routineId) : null;
  const occKey = (h: number, m: number) =>
    `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;

  // Vérification toutes les 20s
  useEffect(() => {
    const check = () => {
      if (!alarm.enabled || alarmFiring) return;
      const now = new Date();
      const dayIndex = (now.getDay() + 6) % 7;
      const key = occKey(now.getHours(), now.getMinutes());
      if (dismissedKeyRef.current === key) return;
      if (
        alarm.days[dayIndex] &&
        now.getHours()   === alarm.hour &&
        now.getMinutes() === alarm.minute
      ) triggerAlarm();
    };
    const interval = setInterval(check, 20000);
    check();
    return () => clearInterval(interval);
  }, [alarm, alarmFiring]);

  // Lecture MP3 avec boucle
  const triggerAlarm = () => {
    setAlarmFiring(true);
    try {
      const ringtone = RINGTONES.find(r => r.label === alarm.ringtone) ?? RINGTONES[0];
      const audio = new Audio(`/sounds/${ringtone.file}`);
      audio.loop = true;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } catch (e) {}
    if (alarm.smartBedtime) startVibration(vibrateIntervalRef);
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    stopVibration(vibrateIntervalRef);
    if (snoozeTimerRef.current) { clearTimeout(snoozeTimerRef.current); snoozeTimerRef.current = null; }
  };

  const handleSnooze = () => {
    dismissedKeyRef.current = occKey(alarm.hour, alarm.minute);
    stopAlarm();
    setAlarmFiring(false);
    const totalMin = alarm.hour * 60 + alarm.minute + 10;
    update({ hour: Math.floor(totalMin / 60) % 24, minute: totalMin % 60 });
  };

  const handleLaunch = () => {
    dismissedKeyRef.current = occKey(alarm.hour, alarm.minute);
    stopAlarm();
    setAlarmFiring(false);
    if (alarm.routineId && onStartRoutineById) {
      onStartRoutineById(alarm.routineId);
    } else if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleDismiss = () => {
    dismissedKeyRef.current = occKey(alarm.hour, alarm.minute);
    stopAlarm();
    setAlarmFiring(false);
  };

  // Sonnerie sélectionnée (label)
  const currentRingtone = RINGTONES.find(r => r.label === alarm.ringtone) ?? RINGTONES[0];

  return (
    <>
      <AnimatePresence>
        {alarmFiring && (
          <AlarmModal
            routineTitle={linkedRoutine?.title || null}
            onSnooze={handleSnooze}
            onLaunch={handleLaunch}
            onDismiss={handleDismiss}
          />
        )}
        {showRingtoneModal && (
          <RingtoneModal
            current={currentRingtone.label}
            onConfirm={label => { update({ ringtone: label }); setShowRingtoneModal(false); }}
            onClose={() => setShowRingtoneModal(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col h-full pt-12">
        <div className="px-6 pb-4 flex-shrink-0">
          <h1 className="text-3xl font-serif text-white">Réveil Matin</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24 pt-2">
          <div className="bg-charcoal/60 border border-white/5 rounded-3xl p-7 mb-6 text-center">
            <div className="w-14 h-14 rounded-full bg-midnight flex items-center justify-center mx-auto mb-5">
              <Sun className="text-lavender/80" size={28} />
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex flex-col items-center gap-1">
                <ArrowBtn delta={1}  onChange={changeHour} label="▲" />
                <span className="text-6xl font-serif text-white tabular-nums w-24 text-center">{String(alarm.hour).padStart(2, '0')}</span>
                <ArrowBtn delta={-1} onChange={changeHour} label="▼" />
              </div>
              <span className="text-5xl font-light text-white/40 pb-1">:</span>
              <div className="flex flex-col items-center gap-1">
                <ArrowBtn delta={1}  onChange={changeMin} label="▲" />
                <span className="text-6xl font-serif text-white tabular-nums w-24 text-center">{String(alarm.minute).padStart(2, '0')}</span>
                <ArrowBtn delta={-1} onChange={changeMin} label="▼" />
              </div>
            </div>
            <div className="flex justify-center gap-2 mb-6">
              {DAYS.map((day, i) => (
                <button key={i} onClick={() => toggleDay(i)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${alarm.days[i] ? 'bg-lavender text-midnight' : 'bg-midnight border border-white/10 text-muted hover:border-lavender/30'}`}>
                  {day}
                </button>
              ))}
            </div>
            <button onClick={() => update({ enabled: !alarm.enabled })}
              className={`w-full py-3.5 rounded-2xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${alarm.enabled ? 'bg-lavender text-midnight shadow-glow' : 'bg-white/5 border border-white/10 text-muted'}`}>
              {alarm.enabled ? <><AlarmCheck size={18} />Activé</> : <><BellOff size={18} />Désactivé</>}
            </button>
          </div>

          <div className="space-y-3">
            {/* Sonnerie */}
            <div className="bg-charcoal/40 border border-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-midnight flex items-center justify-center">
                  <Bell className="text-lavender/60" size={20} />
                </div>
                <span className="text-offwhite font-medium flex-1">Sonnerie</span>
                <button
                  onClick={() => setShowRingtoneModal(true)}
                  className="text-muted text-sm hover:text-lavender transition-colors"
                >
                  {currentRingtone.label} ›
                </button>
              </div>
            </div>

            {/* Vibreur */}
            <div className="bg-charcoal/40 border border-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-midnight flex items-center justify-center">
                  <span className="text-lavender/60 text-lg">📳</span>
                </div>
                <div className="flex-1">
                  <span className="text-offwhite font-medium">Vibreur</span>
                  <p className="text-xs text-muted mt-0.5">Android uniquement (iOS ne supporte pas)</p>
                </div>
                <button onClick={() => update({ smartBedtime: !alarm.smartBedtime })}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${alarm.smartBedtime ? 'bg-lavender' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${alarm.smartBedtime ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            {/* Routine associée */}
            <div className="bg-charcoal/40 border border-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-midnight flex items-center justify-center">
                  <span className="text-lavender/60 text-lg">✦</span>
                </div>
                <span className="text-offwhite font-medium flex-1">Routine associée</span>
                <select value={alarm.routineId || ''} onChange={e => update({ routineId: e.target.value || null })}
                  className="bg-transparent text-muted text-sm focus:outline-none cursor-pointer max-w-[140px]">
                  <option value="">Aucune</option>
                  {routines.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-lavender/5 border border-lavender/10 rounded-2xl p-4">
              <p className="text-xs text-muted leading-relaxed">
                ⚠️ Pour que l'alarme fonctionne, l'application doit être ouverte dans votre navigateur. Les navigateurs mobiles peuvent restreindre les sons en arrière-plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
