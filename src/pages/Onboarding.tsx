import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Gender, User } from '../types';

type OnboardStep = 'welcome' | 'explain1' | 'mantra' | 'explain2' | 'profile';

const ONBOARDING_MANTRA = 'Prendre soin de soi est un acte quotidien';

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-lavender rounded-full blur-xl opacity-0"
          style={{
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 0.25, 0], y: [0, -80] }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Screen 1: Welcome ────────────────────────────────────────────────────────
function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center relative">
      <Particles />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Logo */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-lavender to-violet-deep flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(155,142,196,0.4)]">
          <span className="text-4xl">✦</span>
        </div>
        <h1 className="text-4xl font-serif text-white mb-3 tracking-tight">Miracle Routine</h1>
        <p className="text-muted text-lg font-light leading-relaxed mb-16 max-w-[280px]">
          Bienvenu·e dans Miracle Routine,<br />
          une nouvelle manière de commencer ta journée.
        </p>
        <button
          onClick={onNext}
          className="px-10 py-4 rounded-full bg-lavender text-midnight font-semibold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(155,142,196,0.5)] hover:shadow-none"
        >
          Commencer
        </button>
      </motion.div>
    </div>
  );
}

// ─── Screen 2: Explain 1 ─────────────────────────────────────────────────────
function Explain1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-10" />
        <h2 className="text-3xl font-serif text-white mb-6 leading-tight">
          Ta routine,<br />ton sanctuaire
        </h2>
        <p className="text-muted text-base leading-relaxed mb-14 max-w-[300px]">
          Miracle Routine t'accompagne dans la mise en place de routines matinales conscientes. Prends soin de ton énergie et commence chaque journée avec intention.
        </p>
        <button
          onClick={onNext}
          className="px-10 py-4 rounded-full bg-lavender text-midnight font-semibold hover:bg-white transition-all duration-300"
        >
          Continuer
        </button>
      </motion.div>
    </div>
  );
}

// ─── Screen 3: Mantra (auto-advance after 4s) ─────────────────────────────────
function MantraScreen({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const t = setTimeout(onNext, 3000);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-10 text-center relative" onClick={onNext}>
      <Particles />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10"
      >
        <p className="text-3xl font-serif text-offwhite italic leading-relaxed">
          "{ONBOARDING_MANTRA}"
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-xs text-muted/40 mt-10"
        >
          Toucher pour continuer
        </motion.p>
      </motion.div>
    </div>
  );
}

// ─── Screen 4: Explain 2 ─────────────────────────────────────────────────────
function Explain2({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="mb-10" />
        <h2 className="text-3xl font-serif text-white mb-6 leading-tight">
          Des routines<br />personnalisées
        </h2>
        <p className="text-muted text-base leading-relaxed mb-14 max-w-[300px]">
          Miracle Routine bénéficie de routines pré-enregistrées que vous pouvez sélectionner en fonction de votre état émotionnel. Vous pouvez aussi créer vos propres routines personnalisables. Une pratique concrète et simple pour transformer votre quotidien.
        </p>
        <button
          onClick={onNext}
          className="px-10 py-4 rounded-full bg-lavender text-midnight font-semibold hover:bg-white transition-all duration-300"
        >
          Continuer
        </button>
      </motion.div>
    </div>
  );
}

// ─── Screen 5: Profile setup ─────────────────────────────────────────────────
function ProfileSetup({ onComplete }: { onComplete: (user: User) => void }) {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);

  const canSubmit = firstName.trim().length > 0;

  return (
    <div className="flex flex-col h-full px-7 pt-16 pb-10 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h2 className="text-3xl font-serif text-white mb-2">Faisons connaissance</h2>
        <p className="text-muted mb-10">Bonjour, comment vous appelez-vous ?</p>

        {/* Firstname */}
        <div className="mb-6">
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="Votre prénom"
            className="w-full bg-charcoal/50 border border-white/10 rounded-2xl px-5 py-4 text-offwhite placeholder:text-muted/50 text-lg focus:outline-none focus:border-lavender/50 transition-colors"
          />
        </div>

        {/* Age */}
        <div className="mb-6">
          <label className="text-xs font-medium text-muted uppercase tracking-widest mb-3 block">Âge (optionnel)</label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="Votre âge"
            min="1"
            max="120"
            className="w-full bg-charcoal/50 border border-white/10 rounded-2xl px-5 py-4 text-offwhite placeholder:text-muted/50 focus:outline-none focus:border-lavender/50 transition-colors"
          />
        </div>

        {/* Gender */}
        <div className="mb-10">
          <label className="text-xs font-medium text-muted uppercase tracking-widest mb-3 block">Genre (optionnel)</label>
          <div className="space-y-2">
            {(['Femme', 'Homme', 'Je préfère ne pas répondre'] as Gender[]).map(g => (
              <button
                key={g}
                onClick={() => setGender(g === gender ? null : g)}
                className={`w-full text-left px-5 py-3.5 rounded-2xl border transition-all text-sm font-medium ${
                  gender === g
                    ? 'bg-lavender/20 border-lavender/50 text-lavender'
                    : 'bg-charcoal/30 border-white/8 text-muted hover:border-white/20'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted/40 text-center mb-8">
          Ces informations nous permettront d'adapter votre expérience.
        </p>

        <button
          onClick={() => {
            if (!canSubmit) return;
            onComplete({
              firstName: firstName.trim(),
              age: age ? parseInt(age) : null,
              gender,
              avatar: null,
            });
          }}
          disabled={!canSubmit}
          className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
            canSubmit
              ? 'bg-lavender text-midnight hover:bg-white shadow-[0_0_30px_rgba(155,142,196,0.4)]'
              : 'bg-charcoal text-muted/40 cursor-not-allowed'
          }`}
        >
          Je me lance
        </button>
      </motion.div>
    </div>
  );
}

// ─── Progress dots ─────────────────────────────────────────────────────────────
function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${
            i === step ? 'bg-lavender w-5' : i < step ? 'bg-lavender/40 w-3' : 'bg-white/10 w-3'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────
const STEPS: OnboardStep[] = ['welcome', 'explain1', 'mantra', 'explain2', 'profile'];

export function Onboarding() {
  const [step, setStep] = useState<OnboardStep>('welcome');
  const { dispatch } = useApp();

  const goNext = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const handleComplete = (user: User) => {
    dispatch({ type: 'COMPLETE_ONBOARDING', payload: user });
  };

  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-0 md:p-8">
      <div className="w-full max-w-sm h-[100vh] md:h-[844px] bg-midnight relative overflow-hidden shadow-2xl md:rounded-[3rem] border-0 md:border-8 border-charcoal flex flex-col stars-bg">
        <div className="h-12 flex-shrink-0" />
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {step === 'welcome'  && <Welcome  onNext={goNext} />}
              {step === 'explain1' && <Explain1 onNext={goNext} />}
              {step === 'mantra'   && <MantraScreen onNext={goNext} />}
              {step === 'explain2' && <Explain2 onNext={goNext} />}
              {step === 'profile'  && <ProfileSetup onComplete={handleComplete} />}
            </motion.div>
          </AnimatePresence>
        </div>
        {step !== 'profile' && (
          <ProgressDots step={stepIdx} total={STEPS.length} />
        )}
      </div>
    </div>
  );
}
