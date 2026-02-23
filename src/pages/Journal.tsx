import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Calendar, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MORNING_QUESTIONS, EVENING_QUESTIONS } from '../data/questions';
import { JournalEntry, Tag } from '../types';

function formatDate(isoStr: string) {
  const d = new Date(isoStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  if (diff === 0) return `Aujourd'hui, ${h}:${m}`;
  if (diff === 1) return `Hier, ${h}:${m}`;
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}, ${h}:${m}`;
}

function WritingModal({ question, type, onSave, onClose }: {
  question: string; type: 'morning' | 'evening'; onSave: (text: string) => void; onClose: () => void;
}) {
  const [text, setText] = useState('');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-midnight">
      <div className="flex items-center justify-between px-6 pt-12 pb-4 border-b border-white/5">
        <button onClick={onClose} className="p-2 rounded-full text-muted hover:text-offwhite"><X size={20} /></button>
        <p className="text-xs text-lavender/70 uppercase tracking-widest font-medium">
          {type === 'morning' ? '🌅 Question matinale' : '🌙 Question du soir'}
        </p>
        <button onClick={() => { if (text.trim()) { onSave(text.trim()); onClose(); } }}
          className={`p-2 rounded-full transition-all ${text.trim() ? 'text-lavender hover:bg-lavender/20' : 'text-muted/30'}`}>
          <Check size={20} />
        </button>
      </div>
      <div className="px-6 py-5 border-b border-white/5 bg-lavender/5">
        <p className="text-lg font-serif text-offwhite leading-relaxed italic">"{question}"</p>
      </div>
      <div className="flex-1 px-6 pt-5">
        <textarea value={text} onChange={e => setText(e.target.value)} autoFocus
          placeholder={type === 'morning' ? 'Laisse venir ce qui est vrai pour toi ce matin…' : 'Ce soir, je reviens à moi…'}
          className="w-full h-full bg-transparent text-offwhite placeholder:text-muted/40 text-base leading-relaxed resize-none focus:outline-none" />
      </div>
    </motion.div>
  );
}

function QuestionCard({ type, tag, onWrite }: { type: 'morning' | 'evening'; tag: Tag | null; onWrite: (q: string) => void }) {
  const questions = type === 'morning' ? (tag ? MORNING_QUESTIONS[tag] : MORNING_QUESTIONS['Présence']) : EVENING_QUESTIONS;
  const [qIdx, setQIdx] = useState(0);
  const question = questions[qIdx % questions.length];
  const isMorning = type === 'morning';
  return (
    <div className={`${isMorning ? 'bg-gradient-to-br from-lavender/20 to-violet-deep/10 border-lavender/10' : 'bg-gradient-to-br from-indigo-500/10 to-violet-deep/10 border-indigo-400/10'} rounded-3xl p-6 border relative overflow-hidden`}>
      <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-[0.06]"><PenLine size={80} /></div>
      <div className="flex items-center justify-between mb-2">
        <p className={`text-xs font-medium ${isMorning ? 'text-lavender' : 'text-indigo-300/80'} uppercase tracking-widest`}>
          {isMorning ? '🌅 Question matinale' : '🌙 Question du soir'}
        </p>
        {questions.length > 1 && (
          <div className="flex gap-1">
            <button onClick={() => setQIdx(i => (i - 1 + questions.length) % questions.length)} className="p-1 text-muted/50 hover:text-muted"><ChevronLeft size={14} /></button>
            <button onClick={() => setQIdx(i => (i + 1) % questions.length)} className="p-1 text-muted/50 hover:text-muted"><ChevronRight size={14} /></button>
          </div>
        )}
      </div>
      <h3 className="text-xl font-serif text-white mb-5 leading-relaxed">{question}</h3>
      <button onClick={() => onWrite(question)}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${isMorning ? 'bg-lavender text-midnight hover:bg-white' : 'bg-indigo-400/20 border border-indigo-400/30 text-indigo-200 hover:bg-indigo-400/30'}`}>
        Commencer à écrire
      </button>
    </div>
  );
}

export function Journal() {
  const { state, dispatch } = useApp();
  const { dailySession, journalEntries } = state;
  const tag = dailySession.tag;
  const [writingFor, setWritingFor] = useState<{ question: string; type: 'morning' | 'evening' } | null>(null);

  const handleSave = (text: string, type: 'morning' | 'evening', question: string) => {
    dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: { id: `j-${Date.now()}`, date: new Date().toISOString(), text, type, tag: tag || undefined, question } });
  };

  return (
    <div className="flex flex-col h-full pt-12">
      {/* Header figé */}
      <div className="flex justify-between items-center px-6 pb-6 flex-shrink-0">
        <h1 className="text-3xl font-serif text-white">Journal</h1>
        <button className="p-2 rounded-full bg-charcoal border border-white/10 text-muted hover:text-white"><Calendar size={20} /></button>
      </div>

      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-4 mb-8">
          <QuestionCard type="morning" tag={tag} onWrite={q => setWritingFor({ question: q, type: 'morning' })} />
          <QuestionCard type="evening" tag={null} onWrite={q => setWritingFor({ question: q, type: 'evening' })} />
        </div>

        {journalEntries.length > 0 ? (
          <div>
            <h4 className="text-xs font-medium text-muted mb-4 uppercase tracking-wider">Récemment</h4>
            <div className="space-y-4">
              {journalEntries.slice(0, 10).map(entry => (
                <div key={entry.id} className="bg-charcoal/40 border border-white/5 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-lavender/80 font-medium">{formatDate(entry.date)}</span>
                    <div className="flex gap-1">
                      <div className={`w-2 h-2 rounded-full ${entry.type === 'morning' ? 'bg-lavender/50' : 'bg-indigo-400/50'}`} />
                    </div>
                  </div>
                  <p className="text-sm text-muted line-clamp-2 leading-relaxed">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">📖</p>
            <p className="text-muted text-sm">Vos entrées de journal apparaîtront ici</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {writingFor && (
          <WritingModal question={writingFor.question} type={writingFor.type}
            onSave={text => handleSave(text, writingFor.type, writingFor.question)}
            onClose={() => setWritingFor(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
