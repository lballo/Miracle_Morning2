import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Routines } from './pages/Routines';
import { Journal } from './pages/Journal';
import { WakeUp } from './pages/WakeUp';
import { Affirmations } from './pages/Affirmations';
import { Profile } from './pages/Profile';
import { RoutineExecution } from './pages/RoutineExecution';
import { Tag } from './types';
import { WELCOME_MANTRAS } from './data/questions';

type Tab = 'home' | 'routines' | 'journal' | 'wakeup' | 'affirmations' | 'profile';

function SplashScreen({ onDismiss }: { onDismiss: () => void }) {
  const mantra = useMemo(() => WELCOME_MANTRAS[Math.floor(Math.random() * WELCOME_MANTRAS.length)], []);
  useEffect(() => { const t = setTimeout(onDismiss, 3000); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 z-[100] bg-midnight flex items-center justify-center cursor-pointer stars-bg"
      onClick={onDismiss}
    >
      <motion.p
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="text-2xl font-serif text-offwhite italic leading-relaxed text-center px-10"
      >
        "{mantra}"
      </motion.p>
    </motion.div>
  );
}

function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = (e: any) => { e.preventDefault(); setDeferredPrompt(e); setShow(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  if (!show) return null;
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShow(false); setDeferredPrompt(null);
  };
  return (
    <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
      className="absolute bottom-24 left-3 right-3 z-40 bg-charcoal border border-lavender/20 rounded-2xl px-5 py-4 flex items-center justify-between shadow-xl">
      <div>
        <p className="text-sm font-medium text-offwhite">Installer l'application</p>
        <p className="text-xs text-muted mt-0.5">Accès rapide depuis l'écran d'accueil</p>
      </div>
      <div className="flex gap-2 ml-4">
        <button onClick={() => setShow(false)} className="text-xs text-muted/60 hover:text-muted px-2 py-1">Plus tard</button>
        <button onClick={handleInstall} className="text-xs bg-lavender text-midnight font-semibold px-4 py-2 rounded-full hover:bg-white transition-colors">Installer</button>
      </div>
    </motion.div>
  );
}

function AppInner() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeRoutineId, setActiveRoutineId] = useState<string | null>(null);
  const [routineTag, setRoutineTag] = useState<Tag>('Présence');
  const [homeKey, setHomeKey] = useState(0);
  const [splashDone, setSplashDone] = useState(false);

  if (!state.onboardingComplete) return <Onboarding />;

  const activeRoutine = activeRoutineId ? state.routines.find(r => r.id === activeRoutineId) || null : null;

  const startRoutine = (tag: Tag) => {
    const routine = state.routines.find(r => r.tag === tag);
    if (routine) { setActiveRoutineId(routine.id); setRoutineTag(tag); }
  };

  const startRoutineById = (id: string) => {
    const routine = state.routines.find(r => r.id === id);
    if (routine) { setActiveRoutineId(id); setRoutineTag(routine.tag); }
  };

  const exitRoutine = () => setActiveRoutineId(null);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'home') setHomeKey(k => k + 1);
  };

  if (activeRoutineId && activeRoutine) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center p-0 md:p-8">
        <div className="w-full max-w-sm h-[100vh] md:h-[844px] bg-midnight relative overflow-hidden shadow-2xl md:rounded-[3rem] border-0 md:border-8 border-charcoal flex flex-col stars-bg">
          <div className="h-12 w-full absolute top-0 left-0 z-50 flex justify-between items-center px-6 text-xs font-medium text-white/60 pointer-events-none">
            <span>{new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}</span>
            <div className="flex gap-1.5"><div className="w-4 h-2.5 bg-white/70 rounded-[1px]" /></div>
          </div>
          <div className="flex-1 overflow-hidden mt-12 flex flex-col">
            <RoutineExecution
              routine={activeRoutine}
              tag={routineTag}
              onComplete={exitRoutine}
              onViewRoutines={() => { exitRoutine(); handleTabChange('routines'); }}
              onJournal={() => { exitRoutine(); handleTabChange('journal'); }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-0 md:p-8 font-sans text-offwhite">
      <div className="w-full max-w-sm h-[100vh] md:h-[844px] bg-midnight relative overflow-hidden shadow-2xl md:rounded-[3rem] border-0 md:border-8 border-charcoal flex flex-col">
        <AnimatePresence>
          {!splashDone && <SplashScreen onDismiss={() => setSplashDone(true)} />}
        </AnimatePresence>
        <Layout activeTab={activeTab} onTabChange={handleTabChange}>
          <AnimatePresence>
            <InstallBanner />
          </AnimatePresence>
          {activeTab === 'home' && <Home key={homeKey} onNavigate={(tab) => handleTabChange(tab as Tab)} onStartRoutine={startRoutine} />}
          {activeTab === 'routines' && <Routines onPlayRoutine={startRoutineById} />}
          {activeTab === 'journal' && <Journal />}
          {activeTab === 'wakeup' && <WakeUp onNavigate={(tab) => handleTabChange(tab as Tab)} onStartRoutineById={startRoutineById} />}
          {activeTab === 'affirmations' && <Affirmations />}
          {activeTab === 'profile' && <Profile onNavigate={(tab) => handleTabChange(tab as Tab)} />}
        </Layout>
      </div>
    </div>
  );
}

export function App() {
  return <AppProvider><AppInner /></AppProvider>;
}
