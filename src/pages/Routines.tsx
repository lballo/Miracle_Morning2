import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, MoreHorizontal, Plus, X, Trash2, Pencil, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Routine, Tag, Exercise } from '../types';
import { DEFAULT_ROUTINES } from '../data/routines';

const EXERCISE_TYPES = ['meditation', 'breathing', 'movement', 'shower', 'mantra', 'journal', 'visualization', 'autre'];
const EXERCISE_TYPE_LABELS: Record<string, string> = {
  meditation: 'Méditation', breathing: 'Respiration', movement: 'Mouvement',
  shower: 'Douche', mantra: 'Mantra', journal: 'Journal', visualization: 'Visualisation', autre: 'Autre',
};
const EXERCISE_TYPE_ICONS: Record<string, string> = {
  meditation: '🧘', breathing: '🌬', movement: '🏃', shower: '🚿',
  mantra: '🌸', journal: '📖', visualization: '✨', autre: '⭐',
};

// ─── Routine Card ─────────────────────────────────────────────────────────────
function RoutineCard({ routine, onPlay, onEdit, onDelete }: {
  routine: Routine; onPlay: () => void; onEdit: () => void; onDelete: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-charcoal/60 border border-white/5 rounded-3xl p-5 hover:border-lavender/30 transition-all relative">
      <div className="flex justify-between items-start mb-4">
        <button onClick={onPlay} className="w-10 h-10 rounded-2xl bg-lavender/15 flex items-center justify-center hover:bg-lavender/30 transition-all">
          <Play size={18} fill="currentColor" className="ml-0.5 text-lavender" />
        </button>
        <button onClick={() => setMenuOpen(o => !o)} className="text-muted/50 hover:text-offwhite p-1"><MoreHorizontal size={20} /></button>
      </div>
      <h3 className="text-lg font-medium text-offwhite mb-1">{routine.title}</h3>
      <div className="flex items-center gap-4 text-xs text-muted">
        <div className="flex items-center gap-1.5"><Clock size={12} /><span>{routine.durationMinutes} min</span></div>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <span>{routine.exercises.length} étapes</span>
        {routine.isCustom && <span className="px-2 py-0.5 rounded-full bg-lavender/10 text-lavender">Perso</span>}
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-4 top-14 z-50 bg-charcoal border border-white/10 rounded-2xl shadow-xl overflow-hidden min-w-[160px]">
            <button onClick={() => { onPlay(); setMenuOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-offwhite hover:bg-lavender/10 flex items-center gap-3"><Play size={15} /><span>Démarrer</span></button>
            <button onClick={() => { onEdit(); setMenuOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-offwhite hover:bg-lavender/10 flex items-center gap-3"><Pencil size={15} /><span>Modifier</span></button>
            <button onClick={() => { onDelete(); setMenuOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-rose-400 hover:bg-rose-400/10 flex items-center gap-3"><Trash2 size={15} /><span>Supprimer</span></button>
          </motion.div>
        )}
      </AnimatePresence>
      {menuOpen && <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}

// ─── Modale édition d'une étape ───────────────────────────────────────────────
function StepEditModal({ step, onSave, onClose }: {
  step: Partial<Exercise>;
  onSave: (s: Partial<Exercise>) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Partial<Exercise>>({ ...step });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-5"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93 }}
        className="w-full bg-[#1a1a28] border border-lavender/20 rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <h4 className="text-sm font-serif text-offwhite">Modifier l'exercice</h4>
          <button onClick={onClose} className="w-6 h-6 rounded-full bg-charcoal flex items-center justify-center text-muted hover:text-offwhite">
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4 space-y-3">
          <div>
            <label className="text-[10px] text-muted uppercase tracking-widest mb-1 block">Type d'activité</label>
            <select
              value={draft.type || ''}
              onChange={e => setDraft(d => ({ ...d, type: e.target.value as any }))}
              className="w-full bg-charcoal border border-lavender/20 rounded-xl px-3 py-2 text-offwhite text-sm focus:outline-none focus:border-lavender/50"
            >
              <option value="">À définir</option>
              {EXERCISE_TYPES.map(t => <option key={t} value={t}>{EXERCISE_TYPE_LABELS[t]}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-muted uppercase tracking-widest mb-1 block">Titre</label>
            <input
              type="text"
              value={draft.title || ''}
              onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
              placeholder="Ex: Méditation d'ancrage"
              className="w-full bg-charcoal border border-lavender/20 rounded-xl px-3 py-2 text-offwhite text-sm placeholder:text-muted/50 focus:outline-none focus:border-lavender/50"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] text-muted uppercase tracking-widest mb-1 block">Durée (min)</label>
              <input
                type="number" min="1"
                value={draft.durationMinutes ?? ''}
                onChange={e => setDraft(d => ({ ...d, durationMinutes: e.target.value ? parseInt(e.target.value) : undefined }))}
                placeholder="—"
                className="w-full bg-charcoal border border-lavender/20 rounded-xl px-3 py-2 text-offwhite text-sm placeholder:text-muted/50 focus:outline-none focus:border-lavender/50"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-muted uppercase tracking-widest mb-1 block">Sous-titre</label>
              <input
                type="text"
                value={draft.subtitle || ''}
                onChange={e => setDraft(d => ({ ...d, subtitle: e.target.value }))}
                placeholder="Optionnel"
                className="w-full bg-charcoal border border-lavender/20 rounded-xl px-3 py-2 text-offwhite text-sm placeholder:text-muted/50 focus:outline-none focus:border-lavender/50"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-muted uppercase tracking-widest mb-1 block">Descriptif</label>
            <textarea
              value={draft.description || ''}
              onChange={e => setDraft(d => ({ ...d, description: e.target.value }))}
              placeholder="Instructions, consignes, guidage…"
              rows={3}
              className="w-full bg-charcoal border border-lavender/20 rounded-xl px-3 py-2 text-offwhite text-sm placeholder:text-muted/50 focus:outline-none focus:border-lavender/50 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-4 pb-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full bg-charcoal border border-white/10 text-muted text-sm"
          >
            Annuler
          </button>
          <button
            onClick={() => { onSave(draft); onClose(); }}
            className="flex-1 py-2.5 rounded-full bg-lavender text-midnight text-sm font-medium"
          >
            Enregistrer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Ligne d'étape ────────────────────────────────────────────────────────────
function StepRow({ step, index, total, onMoveUp, onMoveDown, onEdit, onRemove, onDragStart, onDragOver, onDrop, isDragging }: {
  step: Partial<Exercise>;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onRemove: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  isDragging: boolean;
}) {
  const icon = step.type ? EXERCISE_TYPE_ICONS[step.type] || '⭐' : '⭐';
  const typeLabel = step.type ? EXERCISE_TYPE_LABELS[step.type] : 'À définir';

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`flex items-center gap-2 bg-midnight/60 border rounded-2xl px-3 py-2.5 transition-all ${
        isDragging ? 'border-lavender/50 bg-lavender/5 opacity-60' : 'border-white/5'
      }`}
    >
      {/* Drag handle */}
      <div className="cursor-grab active:cursor-grabbing text-muted/30 hover:text-muted/60 flex-shrink-0">
        <GripVertical size={16} />
      </div>

      {/* Icon */}
      <div className="w-8 h-8 rounded-xl bg-lavender/10 flex items-center justify-center text-sm flex-shrink-0">
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-offwhite truncate">
          {step.title || typeLabel}
        </p>
        <p className="text-[10px] text-muted">
          {typeLabel}{step.durationMinutes ? ` · ${step.durationMinutes} min` : ''}
        </p>
      </div>

      {/* Flèches */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
            index === 0 ? 'text-muted/20' : 'text-muted/60 hover:text-offwhite hover:bg-white/10'
          }`}
        >
          <ChevronUp size={12} />
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
            index === total - 1 ? 'text-muted/20' : 'text-muted/60 hover:text-offwhite hover:bg-white/10'
          }`}
        >
          <ChevronDown size={12} />
        </button>
      </div>

      {/* Crayon */}
      <button
        onClick={onEdit}
        className="w-7 h-7 rounded-xl bg-lavender/10 border border-lavender/20 flex items-center justify-center text-lavender hover:bg-lavender/20 flex-shrink-0"
      >
        <Pencil size={12} />
      </button>

      {/* Croix */}
      <button
        onClick={onRemove}
        className="w-7 h-7 rounded-xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center text-rose-400 hover:bg-rose-400/20 flex-shrink-0"
      >
        <X size={12} />
      </button>
    </div>
  );
}

// ─── Modal routine ────────────────────────────────────────────────────────────
function RoutineModal({ routine, onSave, onClose }: {
  routine?: Partial<Routine>; onSave: (r: Partial<Routine>) => void; onClose: () => void;
}) {
  const [title, setTitle] = useState(routine?.title || '');
  const [steps, setSteps] = useState<Partial<Exercise>[]>(
    routine?.exercises?.length ? routine.exercises : []
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const totalDuration = steps.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);

  const addStep = () => {
    setSteps(s => [...s, { type: undefined, title: '', durationMinutes: undefined, description: '', subtitle: '' }]);
    setEditingIndex(steps.length); // ouvre directement la modale sur la nouvelle étape
  };

  const updateStep = (i: number, s: Partial<Exercise>) =>
    setSteps(prev => prev.map((p, idx) => idx === i ? s : p));

  const removeStep = (i: number) =>
    setSteps(prev => prev.filter((_, idx) => idx !== i));

  const moveStep = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= steps.length) return;
    setSteps(prev => {
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  // Drag & drop
  const handleDragOver = (e: React.DragEvent, overIndex: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === overIndex) return;
    setSteps(prev => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(overIndex, 0, moved);
      return next;
    });
    setDragIndex(overIndex);
  };

  const handleSave = () => {
    if (!title.trim()) return;
    const exercises: Exercise[] = steps.map((s, i) => ({
      id: s.id || `custom-ex-${Date.now()}-${i}`,
      type: (s.type || 'autre') as any,
      title: s.title || (s.type ? EXERCISE_TYPE_LABELS[s.type] : 'Étape'),
      subtitle: s.subtitle || '',
      durationMinutes: s.durationMinutes ?? 1,
      description: s.description || '',
    }));
    onSave({ title: title.trim(), exercises, durationMinutes: totalDuration, tag: 'Présence' });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-midnight overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-12 pb-4 border-b border-white/5 flex-shrink-0 bg-midnight sticky top-0 z-10">
        <button onClick={onClose} className="text-muted hover:text-offwhite p-1"><X size={22} /></button>
        <h3 className="text-xl font-serif text-white">{routine?.id ? 'Modifier' : 'Nouvelle routine'}</h3>
        <button
          onClick={handleSave}
          className={`text-sm font-medium transition-all ${title.trim() ? 'text-lavender hover:text-white' : 'text-muted/30 pointer-events-none'}`}
        >
          {routine?.id ? 'Enregistrer' : 'Créer'}
        </button>
      </div>

      <div className="px-6 pt-5 pb-24 relative">
        {/* Titre */}
        <label className="text-xs text-muted uppercase tracking-widest mb-2 block">Titre de la routine</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Ex: Routine du matin"
          className="w-full bg-charcoal border border-lavender/20 rounded-xl px-4 py-3 text-offwhite placeholder:text-muted/50 mb-6 focus:outline-none focus:border-lavender/50"
        />

        {/* Étapes header */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-medium text-offwhite">
            Étapes <span className="text-muted ml-2">{totalDuration} min au total</span>
          </p>
          <button
            onClick={addStep}
            className="flex items-center gap-1.5 text-xs text-lavender hover:text-white transition-colors px-3 py-1.5 rounded-full border border-lavender/30 hover:bg-lavender/10"
          >
            <Plus size={14} />Ajouter
          </button>
        </div>

        {/* Liste des étapes */}
        <div className="space-y-2">
          {steps.map((step, i) => (
            <StepRow
              key={i}
              step={step}
              index={i}
              total={steps.length}
              onMoveUp={() => moveStep(i, -1)}
              onMoveDown={() => moveStep(i, 1)}
              onEdit={() => setEditingIndex(i)}
              onRemove={() => removeStep(i)}
              onDragStart={() => setDragIndex(i)}
              onDragOver={e => handleDragOver(e, i)}
              onDrop={() => setDragIndex(null)}
              isDragging={dragIndex === i}
            />
          ))}
        </div>

        {steps.length === 0 && (
          <div className="text-center py-8 text-muted text-sm">Ajoutez au moins une étape</div>
        )}

        {/* Modale édition étape — rendue dans le même conteneur */}
        <AnimatePresence>
          {editingIndex !== null && (
            <StepEditModal
              step={steps[editingIndex]}
              onSave={s => updateStep(editingIndex, s)}
              onClose={() => setEditingIndex(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SaveAsPopup({ onSaveNew, onSaveOriginal, onClose }: { onSaveNew: () => void; onSaveOriginal: () => void; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        className="w-full max-w-sm bg-charcoal border border-white/10 rounded-3xl p-6" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-serif text-white mb-2 text-center">Modifier la routine</h3>
        <p className="text-muted text-sm text-center mb-6">Souhaitez-vous modifier la routine prédéfinie ou l'enregistrer comme une nouvelle routine personnalisée ?</p>
        <div className="space-y-3">
          <button onClick={onSaveNew} className="w-full py-3 rounded-full bg-lavender text-midnight font-medium hover:bg-white">Enregistrer comme nouvelle routine</button>
          <button onClick={onSaveOriginal} className="w-full py-3 rounded-full border border-white/10 text-offwhite font-medium hover:bg-white/5">Modifier la routine prédéfinie</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function Routines({ onPlayRoutine }: { onPlayRoutine: (routineId: string) => void }) {
  const { state, dispatch } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [editRoutine, setEditRoutine] = useState<Routine | null>(null);
  const [saveAsConfirm, setSaveAsConfirm] = useState<{ routine: Routine; data: Partial<Routine> } | null>(null);

  const handleAdd = (data: Partial<Routine>) => {
    dispatch({ type: 'ADD_ROUTINE', payload: { id: `custom-${Date.now()}`, title: data.title!, tag: data.tag || 'Présence', durationMinutes: data.durationMinutes || 0, exercises: data.exercises || [], isCustom: true } });
  };

  const handleEditSave = (r: Routine, data: Partial<Routine>) => {
    if (!r.isCustom) setSaveAsConfirm({ routine: r, data });
    else dispatch({ type: 'EDIT_ROUTINE', payload: { ...r, ...data } });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Supprimer cette routine ?')) dispatch({ type: 'DELETE_ROUTINE', payload: id });
  };

  return (
    <div className="flex flex-col h-full pt-12">
      {/* Header figé */}
      <div className="flex justify-between items-end px-6 pb-6 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-serif text-white mb-1">Mes Routines</h1>
          <p className="text-muted text-sm">Organisez votre journée</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="w-10 h-10 rounded-full bg-charcoal border border-white/10 flex items-center justify-center text-offwhite hover:bg-lavender/20 transition-colors">
          <Plus size={20} />
        </button>
      </div>

      {/* Liste scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-4">
          {[...DEFAULT_ROUTINES, ...state.routines].map(routine => (
            <motion.div key={routine.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <RoutineCard routine={routine} onPlay={() => onPlayRoutine(routine.id)} onEdit={() => setEditRoutine(routine)} onDelete={() => handleDelete(routine.id)} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showAdd && <RoutineModal onSave={data => { handleAdd(data); setShowAdd(false); }} onClose={() => setShowAdd(false)} />}
        {editRoutine && (
          <RoutineModal routine={editRoutine}
            onSave={data => { handleEditSave(editRoutine, data); setEditRoutine(null); }}
            onClose={() => setEditRoutine(null)} />
        )}
        {saveAsConfirm && (
          <SaveAsPopup
            onSaveNew={() => { dispatch({ type: 'ADD_ROUTINE', payload: { ...saveAsConfirm.routine, ...saveAsConfirm.data, id: `custom-${Date.now()}`, isCustom: true } }); setSaveAsConfirm(null); }}
            onSaveOriginal={() => { dispatch({ type: 'EDIT_ROUTINE', payload: { ...saveAsConfirm.routine, ...saveAsConfirm.data } }); setSaveAsConfirm(null); }}
            onClose={() => setSaveAsConfirm(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
