import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, LifeBuoy, FileText, Shield, ChevronRight, X, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Gender } from '../types';

const GENDERS: Gender[] = ['Femme', 'Homme', 'Je préfère ne pas répondre'];

function StatCard({ label, value, unit, color }: { label: string; value: number | string; unit: string; color: string }) {
  return (
    <div className="bg-charcoal/50 border border-white/5 rounded-2xl p-4 flex flex-col">
      <span className={`text-xs font-medium uppercase tracking-wider ${color} mb-2`}>{label}</span>
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs text-muted mt-0.5">{unit}</span>
    </div>
  );
}

// ─── Modal Informations ───────────────────────────────────────────────────────
function EditUserModal({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useApp();
  const [firstName, setFirstName] = useState(state.user.firstName);
  const [age, setAge] = useState(state.user.age?.toString() || '');
  const [gender, setGender] = useState<Gender | null>(state.user.gender);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-sm bg-charcoal border border-white/10 rounded-3xl flex flex-col"
        style={{ maxHeight: 'calc(100vh - 120px)' }}>
        <div className="flex-1 overflow-y-auto p-6 pb-2">
          <h3 className="text-xl font-serif text-white mb-6">Mes informations</h3>
          <label className="text-xs text-muted uppercase tracking-widest mb-2 block">Prénom</label>
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
            className="w-full bg-midnight/60 border border-lavender/20 rounded-xl px-4 py-3 text-offwhite mb-4 focus:outline-none focus:border-lavender/50" />
          <label className="text-xs text-muted uppercase tracking-widest mb-2 block">Âge</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} min="1" max="120"
            className="w-full bg-midnight/60 border border-lavender/20 rounded-xl px-4 py-3 text-offwhite mb-4 focus:outline-none focus:border-lavender/50" />
          <label className="text-xs text-muted uppercase tracking-widest mb-2 block">Genre</label>
          <div className="space-y-2">
            {GENDERS.map(g => (
              <button key={g} onClick={() => setGender(g === gender ? null : g)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${gender === g ? 'bg-lavender/20 border-lavender/50 text-lavender' : 'bg-midnight/40 border-white/8 text-muted hover:border-white/20'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 flex gap-3 px-6 py-4 border-t border-white/5">
          <button onClick={onClose} className="flex-1 py-3 rounded-full bg-white/5 text-muted font-medium hover:bg-white/10">Annuler</button>
          <button onClick={() => { dispatch({ type: 'UPDATE_USER', payload: { firstName: firstName.trim(), age: age ? parseInt(age) : null, gender } }); onClose(); }}
            className="flex-1 py-3 rounded-full bg-lavender text-midnight font-medium hover:bg-white">Enregistrer</button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Modal générique plein écran (Légal / Politique) ─────────────────────────
function TextPageModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-midnight flex flex-col">
      <div className="flex-shrink-0 flex items-center gap-4 px-6 pt-14 pb-4 border-b border-white/5">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center text-muted hover:text-white">
          <X size={18} />
        </button>
        <h2 className="text-lg font-serif text-white">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 text-sm text-muted leading-relaxed space-y-4">
        {children}
      </div>
    </motion.div>
  );
}

// ─── Contenu Légal ────────────────────────────────────────────────────────────
function LegalContent({ onClose }: { onClose: () => void }) {
  return (
    <TextPageModal title="Mentions légales" onClose={onClose}>
      <p className="text-offwhite font-medium">Éditeur de l'application</p>
      <p>Miracle Routine est une application développée et éditée par Laura Ballo, auto-entrepreneur, exerçant sous le nom commercial Laura Ballo Coaching.</p>

      <p className="text-offwhite font-medium">Contact</p>
      <p>Pour toute question relative à l'application, vous pouvez contacter l'éditeur à l'adresse suivante : contact@lauraballo.com</p>

      <p className="text-offwhite font-medium">Propriété intellectuelle</p>
      <p>L'ensemble des contenus présents dans l'application Miracle Routine (textes, images, sons, mantras, routines) sont la propriété exclusive de Laura Ballo Coaching et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.</p>

      <p className="text-offwhite font-medium">Responsabilité</p>
      <p>L'application Miracle Routine est proposée à titre de support de bien-être personnel. Elle ne constitue pas un avis médical ou psychologique. L'éditeur ne saurait être tenu responsable de l'utilisation faite de l'application par ses utilisateurs.</p>

      <p className="text-offwhite font-medium">Droit applicable</p>
      <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
    </TextPageModal>
  );
}

// ─── Contenu Politique de confidentialité ────────────────────────────────────
function PrivacyContent({ onClose }: { onClose: () => void }) {
  return (
    <TextPageModal title="Politique de confidentialité" onClose={onClose}>
      <p className="text-offwhite font-medium">Données collectées</p>
      <p>Miracle Routine ne collecte aucune donnée personnelle sur un serveur externe. Toutes les informations saisies dans l'application (prénom, âge, genre, routines, journal, mantras) sont stockées exclusivement sur votre appareil et ne sont jamais transmises à des tiers.</p>

      <p className="text-offwhite font-medium">Stockage local</p>
      <p>Les données sont enregistrées dans la mémoire locale de votre navigateur ou appareil (localStorage). Elles peuvent être supprimées à tout moment en désinstallant l'application ou en effaçant les données de votre navigateur.</p>

      <p className="text-offwhite font-medium">Publicités</p>
      <p>Dans le cadre d'une future version monétisée, l'application pourra afficher des publicités via Google AdMob. Dans ce cas, Google peut collecter certaines données à des fins publicitaires conformément à sa propre politique de confidentialité. Cette politique sera mise à jour en conséquence.</p>

      <p className="text-offwhite font-medium">Droits de l'utilisateur</p>
      <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : contact@lauraballo.com</p>

      <p className="text-offwhite font-medium">Contact</p>
      <p>Laura Ballo Coaching — contact@lauraballo.com</p>

      <p className="text-muted/50 text-xs">Dernière mise à jour : Février 2026</p>
    </TextPageModal>
  );
}

// ─── Main Profile ─────────────────────────────────────────────────────────────
export function Profile({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { state } = useApp();
  const { user, stats, mantras, qualities } = state;
  const [showEdit, setShowEdit]       = useState(false);
  const [showLegal, setShowLegal]     = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const favMantraCount = mantras.filter(m => m.favorite).length + qualities.filter(q => q.favorite).length;

  const sections = [
    {
      title: 'Compte',
      items: [
        { label: 'Informations', icon: User, type: 'button', action: () => setShowEdit(true) },
      ],
    },
    {
      title: 'Aide & Légal',
      items: [
        { label: 'Support', icon: LifeBuoy, type: 'link', href: 'mailto:contact@lauraballo.com' },
        { label: 'Découvrir Laura Ballo Coaching', icon: Globe, type: 'link', href: 'https://lauraballo.com' },
        { label: 'Légal', icon: FileText, type: 'button', action: () => setShowLegal(true) },
        { label: 'Politique de confidentialité', icon: Shield, type: 'button', action: () => setShowPrivacy(true) },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full pt-0">
      <div className="px-6 flex-shrink-0">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-lavender to-violet-deep flex items-center justify-center text-2xl font-serif text-white shadow-glow">
            {user.firstName?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-serif text-white">{user.firstName || 'Mon profil'}</h2>
          </div>
          <button onClick={() => setShowEdit(true)} className="w-10 h-10 rounded-full bg-charcoal border border-white/10 flex items-center justify-center text-muted hover:text-offwhite">
            <Settings size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="grid grid-cols-2 gap-3 mb-8">
          <StatCard label="🏆 Série"    value={stats.streak}                                        unit="Jours"      color="text-lavender"  />
          <StatCard label="📈 Total"    value={Math.round(stats.totalMinutes / 60 * 10) / 10}       unit="Heures"     color="text-blue-400"  />
          <StatCard label="📊 Routines" value={stats.routinesCompleted}                             unit="Complétées" color="text-green-400" />
          <StatCard label="⭐ Mantras"  value={favMantraCount}                                      unit="Favoris"    color="text-yellow-400"/>
        </div>

        {/* Bannière coaching */}
        <a href="https://calendly.com/laura-ballo1993/echangecoaching" target="_blank" rel="noopener noreferrer"
          className="block bg-lavender/10 border border-lavender/25 rounded-2xl px-5 py-4 mb-6 hover:bg-lavender/15 transition-colors">
          <p className="text-offwhite text-sm font-medium mb-3">✦ Vous souhaitez aller plus loin dans votre leadership ?</p>
          <span className="inline-block px-4 py-2 rounded-full bg-lavender text-midnight text-xs font-semibold">
            Votre rendez-vous offert
          </span>
        </a>

        {sections.map(section => (
          <div key={section.title} className="mb-6">
            <p className="text-xs text-muted uppercase tracking-widest mb-3">{section.title}</p>
            <div className="bg-charcoal/40 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
              {section.items.map((item, i) => {
                const content = (
                  <>
                    <div className="w-8 h-8 rounded-xl bg-midnight flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-muted" />
                    </div>
                    <span className="text-offwhite text-sm flex-1">{item.label}</span>
                    <ChevronRight size={16} className="text-muted/40" />
                  </>
                );

                if (item.type === 'link') {
                  return (
                    <a key={i} href={(item as any).href}
                      className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-white/3 transition-colors text-left">
                      {content}
                    </a>
                  );
                }

                return (
                  <button key={i} onClick={(item as any).action || (() => {})}
                    className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-white/3 transition-colors text-left">
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showEdit    && <EditUserModal onClose={() => setShowEdit(false)} />}
        {showLegal   && <LegalContent  onClose={() => setShowLegal(false)} />}
        {showPrivacy && <PrivacyContent onClose={() => setShowPrivacy(false)} />}
      </AnimatePresence>
    </div>
  );
}
