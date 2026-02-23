import React from 'react';
import { Home, Sparkles, BookOpen, Bell, Star, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
type Tab = 'home' | 'routines' | 'journal' | 'wakeup' | 'affirmations' | 'profile';
interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}
export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'routines', icon: Sparkles, label: 'Routines' },
    { id: 'journal', icon: BookOpen, label: 'Journal' },
    { id: 'wakeup', icon: Bell, label: 'Réveil' },
    { id: 'affirmations', icon: Star, label: 'Mantra' },
    { id: 'profile', icon: User, label: 'Profil' },
  ] as const;

  return (
    <div className="w-full h-full flex flex-col relative stars-bg">
      {/* Status Bar */}
      <div className="h-12 w-full absolute top-0 left-0 z-50 flex justify-between items-center px-6 text-xs font-medium text-white/80 pointer-events-none">
        <span>9:41</span>
        <div className="flex gap-1.5">
          <div className="w-4 h-2.5 bg-white/90 rounded-[1px]" />
          <div className="w-0.5 h-2.5 bg-white/30 rounded-[1px]" />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="h-[88px] bg-charcoal/90 backdrop-blur-xl border-t border-lavender/10 z-50 pb-6 pt-2 px-2 flex-shrink-0">
        <div className="flex justify-between items-center h-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex-1 flex flex-col items-center justify-center gap-1.5 relative group"
              >
                {isActive && (
                  <motion.div layoutId="activeTabGlow"
                    className="absolute inset-0 bg-lavender/5 rounded-xl blur-md"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                )}
                <div className={`relative p-1.5 rounded-full transition-all duration-300 ${isActive ? 'text-lavender' : 'text-muted group-hover:text-white/70'}`}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div layoutId="activeDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-lavender rounded-full shadow-[0_0_8px_rgba(155,142,196,0.8)]" />
                  )}
                </div>
                <span className={`text-[9px] font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-lavender' : 'text-muted/80'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
