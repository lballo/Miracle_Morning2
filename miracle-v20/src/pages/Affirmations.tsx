import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Share2, Star, Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Mantra, Quality, Tag } from '../types';

const TAGS: Tag[] = ['Présence', 'Sérénité', 'Focus', 'Énergie', 'Émotions'];

// ─── Add/Edit Modal ────────────────────────────────────────────────────────────
function ItemModal({ isQuality, initial, onSave, onClose }: {
  isQuality: boolean;
  initial?: { text: string; tag: Tag };
  onSave: (text: string, tag: Tag) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState(initial?.text || '');
  const [tag, setTag] = useState<Tag>(initial?.tag || 'Présence');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-midnight">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-12 pb-4 border-b border-white/5 flex-shrink-0">
        <button onClick={onClose} className="p-2 text-muted hover:text-offwhite rounded-full"><X size={20} /></button>
        <h3 className="text-lg font-serif text-white">{initial ? 'Modifier' : isQuality ? 'Ajouter une qualité' : 'Ajouter un mantra'}</h3>
        <button onClick={() => { if (text.trim()) { onSave(text.trim(), tag); onClose(); } }}
          className={`text-sm font-medium transition-all px-3 py-1 rounded-full ${text.trim() ? 'text-lavender hover:bg-lavender/10' : 'text-muted/30 pointer-events-none'}`}>
          {initial ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pt-5 pb-10">
        <textarea value={text} onChange={e => setText(e.target.value)} rows={isQuality ? 2 : 4} autoFocus
          placeholder={isQuality ? 'Ex: Courageux·se' : 'Ex: Je suis en paix avec moi-même...'}
          className="w-full bg-charcoal border border-lavender/30 rounded-xl p-4 text-offwhite text-sm resize-none focus:outline-none focus:border-lavender/60 mb-6" />
        <label className="text-xs text-muted uppercase tracking-widest mb-3 block">Tag (catégorie)</label>
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map(t => (
            <button key={t} onClick={() => setTag(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${tag === t ? 'bg-lavender text-midnight' : 'bg-charcoal border border-white/10 text-muted hover:border-lavender/30'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-full bg-white/5 text-muted font-medium hover:bg-white/10">Annuler</button>
          <button onClick={() => { if (text.trim()) { onSave(text.trim(), tag); onClose(); } }}
            className={`flex-1 py-3 rounded-full font-medium transition-colors ${text.trim() ? 'bg-lavender text-midnight hover:bg-white' : 'bg-lavender/30 text-midnight/50 cursor-not-allowed'}`}>
            {initial ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mantra Card ───────────────────────────────────────────────────────────────
function MantraCard({ item, onToggleFav, onEdit, onDelete }: {
  item: Mantra; onToggleFav: () => void; onEdit: () => void; onDelete: () => void;
}) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className="bg-charcoal border border-white/5 rounded-3xl p-6 relative group">
      <Quote className="absolute top-5 left-5 text-lavender/10" size={36} />
      <p className="text-lg font-serif italic text-offwhite leading-relaxed mb-5 text-center relative z-10">"{item.text}"</p>
      <div className="flex gap-3 justify-center">
        <button onClick={onToggleFav} className={`p-2.5 rounded-full transition-colors ${item.favorite ? 'bg-yellow-400/15 text-yellow-400' : 'bg-white/5 text-muted hover:text-yellow-400 hover:bg-yellow-400/10'}`}>
          <Star size={17} fill={item.favorite ? 'currentColor' : 'none'} />
        </button>
        <button onClick={onEdit} className="p-2.5 rounded-full bg-white/5 text-muted hover:text-lavender hover:bg-lavender/10 transition-colors"><Pencil size={17} /></button>
        <button onClick={onDelete} className="p-2.5 rounded-full bg-white/5 text-muted hover:text-rose-400 hover:bg-rose-400/10 transition-colors"><Trash2 size={17} /></button>
        <button className="p-2.5 rounded-full bg-white/5 text-muted hover:text-lavender hover:bg-lavender/10 transition-colors"><Share2 size={17} /></button>
      </div>
    </motion.div>
  );
}

// ─── Quality Card ──────────────────────────────────────────────────────────────
function QualityCard({ item, onToggleFav, onEdit, onDelete }: {
  item: Quality; onToggleFav: () => void; onEdit: () => void; onDelete: () => void;
}) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className="bg-charcoal border border-white/5 rounded-3xl p-6">
      <p className="text-lg font-medium text-offwhite mb-4">{item.text}</p>
      <div className="flex gap-3">
        <button onClick={onToggleFav} className={`p-2.5 rounded-full transition-colors ${item.favorite ? 'bg-yellow-400/15 text-yellow-400' : 'bg-white/5 text-muted hover:text-yellow-400 hover:bg-yellow-400/10'}`}>
          <Star size={17} fill={item.favorite ? 'currentColor' : 'none'} />
        </button>
        <button onClick={onEdit} className="p-2.5 rounded-full bg-white/5 text-muted hover:text-lavender hover:bg-lavender/10 transition-colors"><Pencil size={17} /></button>
        <button onClick={onDelete} className="p-2.5 rounded-full bg-white/5 text-muted hover:text-rose-400 hover:bg-rose-400/10 transition-colors"><Trash2 size={17} /></button>
      </div>
    </motion.div>
  );
}

// ─── Main Affirmations Page ───────────────────────────────────────────────────
export function Affirmations() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'mantras' | 'qualites'>('mantras');
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<(Mantra | Quality) | null>(null);

  const isQuality = activeTab === 'qualites';

  const handleAdd = (text: string, tag: Tag) => {
    if (isQuality) {
      dispatch({ type: 'ADD_QUALITY', payload: { id: `q-${Date.now()}`, text, tag, favorite: false, isCustom: true } });
    } else {
      dispatch({ type: 'ADD_MANTRA', payload: { id: `m-${Date.now()}`, text, tag, favorite: false, isCustom: true } });
    }
  };

  const handleEdit = (id: string, text: string, tag: Tag) => {
    if (isQuality) dispatch({ type: 'EDIT_QUALITY', payload: { id, text, tag } });
    else dispatch({ type: 'EDIT_MANTRA', payload: { id, text, tag } });
  };

  const handleDelete = (id: string) => {
    if (isQuality) dispatch({ type: 'DELETE_QUALITY', payload: id });
    else dispatch({ type: 'DELETE_MANTRA', payload: id });
  };

  const handleToggleFav = (id: string) => {
    if (isQuality) dispatch({ type: 'TOGGLE_QUALITY_FAVORITE', payload: id });
    else dispatch({ type: 'TOGGLE_MANTRA_FAVORITE', payload: id });
  };

  return (
    <div className="flex flex-col h-full pt-12">
      {/* Header figé */}
      <div className="px-6 flex-shrink-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-serif text-white">Mantra</h1>
          <button onClick={() => setShowAdd(true)}
            className="w-10 h-10 rounded-full bg-charcoal border border-white/10 flex items-center justify-center text-offwhite hover:bg-lavender/20 hover:border-lavender/30 transition-colors">
            <Plus size={20} />
          </button>
        </div>
        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {(['mantras', 'qualites'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${activeTab === tab ? 'bg-lavender/10 border-lavender/60 text-lavender' : 'bg-charcoal border-white/10 text-muted hover:border-lavender/20'}`}>
              {tab === 'mantras' ? 'Mantras' : 'Qualités'}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <AnimatePresence mode="popLayout">
          <div className="space-y-4">
            {activeTab === 'mantras'
              ? state.mantras.map(item => (
                  <MantraCard key={item.id} item={item}
                    onToggleFav={() => handleToggleFav(item.id)}
                    onEdit={() => setEditItem(item)}
                    onDelete={() => handleDelete(item.id)} />
                ))
              : state.qualities.map(item => (
                  <QualityCard key={item.id} item={item}
                    onToggleFav={() => handleToggleFav(item.id)}
                    onEdit={() => setEditItem(item)}
                    onDelete={() => handleDelete(item.id)} />
                ))
            }
          </div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showAdd && <ItemModal isQuality={isQuality} onSave={handleAdd} onClose={() => setShowAdd(false)} />}
        {editItem && (
          <ItemModal isQuality={isQuality} initial={{ text: editItem.text, tag: editItem.tag }}
            onSave={(text, tag) => { handleEdit(editItem.id, text, tag); setEditItem(null); }}
            onClose={() => setEditItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
