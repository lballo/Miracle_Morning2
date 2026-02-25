import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Tag, Mood, Mantra, Quality, Routine, JournalEntry, User, Alarm, Exercise } from '../types';
import { DEFAULT_MANTRAS } from '../data/mantras';
import { DEFAULT_QUALITIES } from '../data/qualities';
import { DEFAULT_ROUTINES } from '../data/routines';
import { DEFAULT_EXERCISES } from '../data/exercises';

// ─── Initial State ─────────────────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0];

const INITIAL_STATE: AppState = {
  user: { firstName: '', age: null, gender: null, avatar: null, isPremium: false },
  onboardingComplete: false,
  dailySession: {
    date: today,
    mood: null,
    tag: null,
    routineCompleted: false,
    onboardingComplete: false,
  },
  mantras: DEFAULT_MANTRAS,
  qualities: DEFAULT_QUALITIES,
  routines: [],           // routines custom uniquement — DEFAULT_ROUTINES injectées à l'affichage
  customExercises: [],    // exercices custom uniquement — DEFAULT_EXERCISES injectés à l'affichage
  journalEntries: [],
  alarm: {
    hour: 6,
    minute: 30,
    days: [true, true, true, true, true, false, false],
    enabled: true,
    ringtone: 'Douceur Matinale',
    routineId: null,
    smartBedtime: true,
  },
  stats: { streak: 0, totalMinutes: 0, routinesCompleted: 0 },
};

// ─── Actions ───────────────────────────────────────────────────────────────────
type Action =
  | { type: 'COMPLETE_ONBOARDING'; payload: User }
  | { type: 'SET_MOOD'; payload: Mood }
  | { type: 'SET_TAG'; payload: Tag }
  | { type: 'COMPLETE_ROUTINE'; payload: { durationMinutes: number } }
  | { type: 'TOGGLE_MANTRA_FAVORITE'; payload: string }
  | { type: 'ADD_MANTRA'; payload: Mantra }
  | { type: 'EDIT_MANTRA'; payload: { id: string; text: string; tag: Tag } }
  | { type: 'DELETE_MANTRA'; payload: string }
  | { type: 'TOGGLE_QUALITY_FAVORITE'; payload: string }
  | { type: 'ADD_QUALITY'; payload: Quality }
  | { type: 'EDIT_QUALITY'; payload: { id: string; text: string; tag: Tag } }
  | { type: 'DELETE_QUALITY'; payload: string }
  | { type: 'ADD_ROUTINE'; payload: Routine }
  | { type: 'EDIT_ROUTINE'; payload: Routine }
  | { type: 'DELETE_ROUTINE'; payload: string }
  | { type: 'ADD_EXERCISE'; payload: Exercise }
  | { type: 'EDIT_EXERCISE'; payload: Exercise }
  | { type: 'DELETE_EXERCISE'; payload: string }
  | { type: 'ADD_JOURNAL_ENTRY'; payload: JournalEntry }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'UPDATE_ALARM'; payload: Partial<Alarm> }
  | { type: 'RESET_DAILY_SESSION' }
  | { type: 'LOAD_STATE'; payload: AppState };

// ─── Reducer ───────────────────────────────────────────────────────────────────
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true, user: action.payload };

    case 'SET_MOOD':
      return { ...state, dailySession: { ...state.dailySession, mood: action.payload } };

    case 'SET_TAG':
      return { ...state, dailySession: { ...state.dailySession, tag: action.payload } };

    case 'COMPLETE_ROUTINE':
      return {
        ...state,
        dailySession: { ...state.dailySession, routineCompleted: true },
        stats: {
          ...state.stats,
          routinesCompleted: state.stats.routinesCompleted + 1,
          totalMinutes: state.stats.totalMinutes + action.payload.durationMinutes,
          streak: state.stats.streak + 1,
        },
      };

    case 'RESET_DAILY_SESSION':
      return {
        ...state,
        dailySession: { date: today, mood: null, tag: null, routineCompleted: false, onboardingComplete: false },
      };

    case 'TOGGLE_MANTRA_FAVORITE':
      return {
        ...state,
        mantras: state.mantras.map(m =>
          m.id === action.payload ? { ...m, favorite: !m.favorite } : m
        ),
      };

    case 'ADD_MANTRA':
      return { ...state, mantras: [...state.mantras, action.payload] };

    case 'EDIT_MANTRA':
      return {
        ...state,
        mantras: state.mantras.map(m =>
          m.id === action.payload.id ? { ...m, text: action.payload.text, tag: action.payload.tag } : m
        ),
      };

    case 'DELETE_MANTRA':
      return { ...state, mantras: state.mantras.filter(m => m.id !== action.payload) };

    case 'TOGGLE_QUALITY_FAVORITE':
      return {
        ...state,
        qualities: state.qualities.map(q =>
          q.id === action.payload ? { ...q, favorite: !q.favorite } : q
        ),
      };

    case 'ADD_QUALITY':
      return { ...state, qualities: [...state.qualities, action.payload] };

    case 'EDIT_QUALITY':
      return {
        ...state,
        qualities: state.qualities.map(q =>
          q.id === action.payload.id ? { ...q, text: action.payload.text, tag: action.payload.tag } : q
        ),
      };

    case 'DELETE_QUALITY':
      return { ...state, qualities: state.qualities.filter(q => q.id !== action.payload) };

    case 'ADD_ROUTINE':
      return { ...state, routines: [...state.routines, action.payload] };

    case 'EDIT_ROUTINE':
      return {
        ...state,
        routines: state.routines.map(r => r.id === action.payload.id ? action.payload : r),
      };

    case 'DELETE_ROUTINE':
      return { ...state, routines: state.routines.filter(r => r.id !== action.payload) };

    case 'ADD_EXERCISE':
      return { ...state, customExercises: [...state.customExercises, action.payload] };

    case 'EDIT_EXERCISE':
      return {
        ...state,
        customExercises: state.customExercises.map(e =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case 'DELETE_EXERCISE':
      return { ...state, customExercises: state.customExercises.filter(e => e.id !== action.payload) };

    case 'ADD_JOURNAL_ENTRY':
      return { ...state, journalEntries: [action.payload, ...state.journalEntries] };

    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };

    case 'UPDATE_ALARM':
      return { ...state, alarm: { ...state.alarm, ...action.payload } };

    default:
      return state;
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | null>(null);
const STORAGE_KEY = 'miracle-routine-state-v1';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AppState;
        // Check if daily session needs reset (new day)
        const savedDate = parsed.dailySession?.date;
        if (savedDate && savedDate !== today) {
          parsed.dailySession = { date: today, mood: null, tag: null, routineCompleted: false, onboardingComplete: false };
        }
        // Toujours réinjecter les données app fraîches depuis les fichiers (jamais depuis localStorage)
        parsed.routines = parsed.routines?.filter(r => r.isCustom) ?? [];
        parsed.customExercises = parsed.customExercises ?? [];
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      }
    } catch (e) {
      console.warn('Could not load saved state');
    }
  }, []);

  // Save to localStorage — exclure les données app (DEFAULT_ROUTINES, DEFAULT_EXERCISES)
  useEffect(() => {
    try {
      const toSave = {
        ...state,
        routines: state.routines.filter(r => r.isCustom),  // custom uniquement
        // customExercises déjà séparés, on les persiste normalement
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Could not save state');
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// ─── Selector hooks ────────────────────────────────────────────────────────────
export function useMantrasByTag(tag: Tag | null) {
  const { state } = useApp();
  if (!tag) return state.mantras.slice(0, 5);
  return state.mantras.filter(m => m.tag === tag);
}

export function useQualitiesByTag(tag: Tag | null) {
  const { state } = useApp();
  if (!tag) return state.qualities.slice(0, 3);
  return state.qualities.filter(q => q.tag === tag);
}

export function useRoutineByTag(tag: Tag | null) {
  const { state } = useApp();
  const allRoutines = [...DEFAULT_ROUTINES, ...state.routines];
  if (!tag) return allRoutines[0];
  return allRoutines.find(r => r.tag === tag) || allRoutines[0];
}

export function useRandomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
