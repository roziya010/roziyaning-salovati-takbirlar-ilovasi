import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  SALAWAT_CATEGORIES,
  TAKBIR_ITEMS,
  TASBIH_PRESETS,
} from '../data/islamicContent';
import {
  AppToast,
  DailyStats,
  ItemProgress,
  MarathonState,
  ReminderSettings,
} from '../types';

const STORAGE_KEY = 'roziya_salovat_state_v1';

export function getDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

interface PersistedState {
  theme: 'light' | 'dark';
  vibrationEnabled: boolean;
  favorites: string[];
  itemProgress: Record<string, ItemProgress>;
  dailyLogs: Record<string, DailyStats>;
  tasbih: {
    count: number;
    target: number;
    selectedPresetId: string;
    historyStack: number[];
  };
  marathon: MarathonState;
  reminders: {
    enabled: boolean;
    time: string;
    lastShownDate: string | null;
  };
}

const DEFAULT_STATE: PersistedState = {
  theme: 'light',
  vibrationEnabled: true,
  favorites: ['ibrohimiya', 'takbir-tashriq'],
  itemProgress: {},
  dailyLogs: {},
  tasbih: {
    count: 0,
    target: 33,
    selectedPresetId: 'tasbih-salovat',
    historyStack: [],
  },
  marathon: {
    joined: false,
    participantName: 'Roziya',
    dailyGoal: 313,
    joinedDate: null,
  },
  reminders: {
    enabled: true,
    time: '08:00',
    lastShownDate: null,
  },
};

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      tasbih: { ...DEFAULT_STATE.tasbih, ...(parsed.tasbih || {}) },
      marathon: { ...DEFAULT_STATE.marathon, ...(parsed.marathon || {}) },
      reminders: { ...DEFAULT_STATE.reminders, ...(parsed.reminders || {}) },
      itemProgress: parsed.itemProgress || {},
      dailyLogs: parsed.dailyLogs || {},
      favorites: Array.isArray(parsed.favorites)
        ? parsed.favorites
        : DEFAULT_STATE.favorites,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

interface AppStateContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  vibrationEnabled: boolean;
  toggleVibration: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getItemProgress: (id: string, defaultTarget?: number) => ItemProgress;
  incrementItemCount: (
    id: string,
    kind: 'salawat' | 'takbir',
    defaultTarget?: number
  ) => { completedNow: boolean };
  resetItemCount: (id: string, defaultTarget?: number) => void;
  setItemTarget: (id: string, target: number) => void;
  tasbih: PersistedState['tasbih'];
  incrementTasbih: () => { completedNow: boolean };
  undoTasbih: () => void;
  resetTasbih: () => void;
  setTasbihTarget: (target: number) => void;
  setTasbihPreset: (presetId: string) => void;
  marathon: MarathonState;
  joinMarathon: (name: string, dailyGoal: number) => void;
  updateMarathonGoal: (dailyGoal: number) => void;
  updateParticipantName: (name: string) => void;
  addMarathonSalawat: (amount?: number) => { goalReachedNow: boolean };
  dailyLogs: Record<string, DailyStats>;
  todayStats: DailyStats;
  totalSalawat: number;
  totalTakbir: number;
  totalTasbih: number;
  totalAllZikr: number;
  currentStreak: number;
  longestStreak: number;
  reminders: ReminderSettings;
  toggleReminders: () => Promise<void>;
  setReminderTime: (time: string) => void;
  toasts: AppToast[];
  pushToast: (message: string, tone?: 'emerald' | 'gold') => void;
  dismissToast: (id: string) => void;
  triggerHaptic: (pattern?: number | number[]) => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<PersistedState>(loadInitialState);
  const [toasts, setToasts] = useState<AppToast[]>([]);

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute(
        'content',
        state.theme === 'dark' ? '#071410' : '#0A4633'
      );
    }
  }, [state.theme]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  const pushToast = useCallback(
    (message: string, tone: 'emerald' | 'gold' = 'emerald') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const triggerHaptic = useCallback(
    (pattern: number | number[] = 16) => {
      if (!state.vibrationEnabled) return;
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(pattern);
        } catch {
          // unsupported in some webviews
        }
      }
    },
    [state.vibrationEnabled]
  );

  // Daily reminder check (in-app gentle notification once per day after configured time)
  useEffect(() => {
    if (!state.reminders.enabled) return;
    const todayKey = getDateKey();
    if (state.reminders.lastShownDate === todayKey) return;

    const [hh, mm] = state.reminders.time.split(':').map(Number);
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const targetMinutes = (hh || 8) * 60 + (mm || 0);

    if (currentMinutes >= targetMinutes) {
      const timer = window.setTimeout(() => {
        pushToast(
          'Kundalik eslatma: Bugungi salovat va zikrlaringizni aytishni unutmang 🤲',
          'gold'
        );
        setState((prev) => ({
          ...prev,
          reminders: { ...prev.reminders, lastShownDate: todayKey },
        }));
      }, 2800);
      return () => window.clearTimeout(timer);
    }
  }, [
    state.reminders.enabled,
    state.reminders.time,
    state.reminders.lastShownDate,
    pushToast,
  ]);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const toggleVibration = useCallback(() => {
    setState((prev) => ({
      ...prev,
      vibrationEnabled: !prev.vibrationEnabled,
    }));
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      setState((prev) => {
        const exists = prev.favorites.includes(id);
        const next = exists
          ? prev.favorites.filter((item) => item !== id)
          : [...prev.favorites, id];
        return { ...prev, favorites: next };
      });
      triggerHaptic(12);
    },
    [triggerHaptic]
  );

  const isFavorite = useCallback(
    (id: string) => state.favorites.includes(id),
    [state.favorites]
  );

  const getItemProgress = useCallback(
    (id: string, defaultTarget = 33): ItemProgress => {
      const existing = state.itemProgress[id];
      if (existing) return existing;
      const cat = SALAWAT_CATEGORIES.find((c) => c.id === id);
      const tak = TAKBIR_ITEMS.find((t) => t.id === id);
      return {
        count: 0,
        target: cat?.defaultTarget ?? tak?.defaultTarget ?? defaultTarget,
      };
    },
    [state.itemProgress]
  );

  const incrementItemCount = useCallback(
    (id: string, kind: 'salawat' | 'takbir', defaultTarget = 33) => {
      let completedNow = false;
      const todayKey = getDateKey();

      setState((prev) => {
        const current = prev.itemProgress[id] || {
          count: 0,
          target: defaultTarget,
        };
        const nextCount = current.count + 1;
        if (nextCount === current.target) {
          completedNow = true;
        }
        const dayLog = prev.dailyLogs[todayKey] || {
          salawat: 0,
          takbir: 0,
          tasbih: 0,
        };
        const nextDayLog: DailyStats = {
          ...dayLog,
          salawat: kind === 'salawat' ? dayLog.salawat + 1 : dayLog.salawat,
          takbir: kind === 'takbir' ? dayLog.takbir + 1 : dayLog.takbir,
        };
        return {
          ...prev,
          itemProgress: {
            ...prev.itemProgress,
            [id]: { ...current, count: nextCount },
          },
          dailyLogs: {
            ...prev.dailyLogs,
            [todayKey]: nextDayLog,
          },
        };
      });

      triggerHaptic(completedNow ? [25, 45, 25] : 16);
      return { completedNow };
    },
    [triggerHaptic]
  );

  const resetItemCount = useCallback(
    (id: string, defaultTarget = 33) => {
      setState((prev) => {
        const current = prev.itemProgress[id] || {
          count: 0,
          target: defaultTarget,
        };
        return {
          ...prev,
          itemProgress: {
            ...prev.itemProgress,
            [id]: { ...current, count: 0 },
          },
        };
      });
      triggerHaptic(12);
    },
    [triggerHaptic]
  );

  const setItemTarget = useCallback((id: string, target: number) => {
    const safeTarget = Math.max(1, Math.min(100000, Math.floor(target)));
    setState((prev) => {
      const current = prev.itemProgress[id] || { count: 0, target: 33 };
      return {
        ...prev,
        itemProgress: {
          ...prev.itemProgress,
          [id]: { ...current, target: safeTarget },
        },
      };
    });
  }, []);

  const incrementTasbih = useCallback(() => {
    let completedNow = false;
    const todayKey = getDateKey();
    const preset =
      TASBIH_PRESETS.find((p) => p.id === state.tasbih.selectedPresetId) ||
      TASBIH_PRESETS[0];

    setState((prev) => {
      const nextCount = prev.tasbih.count + 1;
      if (nextCount === prev.tasbih.target) {
        completedNow = true;
      }
      const dayLog = prev.dailyLogs[todayKey] || {
        salawat: 0,
        takbir: 0,
        tasbih: 0,
      };
      const nextDayLog: DailyStats = {
        salawat:
          preset.categoryType === 'salawat'
            ? dayLog.salawat + 1
            : dayLog.salawat,
        takbir:
          preset.categoryType === 'takbir' ? dayLog.takbir + 1 : dayLog.takbir,
        tasbih: dayLog.tasbih + 1,
      };
      return {
        ...prev,
        tasbih: {
          ...prev.tasbih,
          count: nextCount,
          historyStack: [...prev.tasbih.historyStack.slice(-24), prev.tasbih.count],
        },
        dailyLogs: {
          ...prev.dailyLogs,
          [todayKey]: nextDayLog,
        },
      };
    });

    triggerHaptic(completedNow ? [30, 50, 30] : 18);
    return { completedNow };
  }, [state.tasbih.selectedPresetId, triggerHaptic]);

  const undoTasbih = useCallback(() => {
    const todayKey = getDateKey();
    const preset =
      TASBIH_PRESETS.find((p) => p.id === state.tasbih.selectedPresetId) ||
      TASBIH_PRESETS[0];

    setState((prev) => {
      if (prev.tasbih.count <= 0) return prev;
      const dayLog = prev.dailyLogs[todayKey] || {
        salawat: 0,
        takbir: 0,
        tasbih: 0,
      };
      const nextDayLog: DailyStats = {
        salawat:
          preset.categoryType === 'salawat'
            ? Math.max(0, dayLog.salawat - 1)
            : dayLog.salawat,
        takbir:
          preset.categoryType === 'takbir'
            ? Math.max(0, dayLog.takbir - 1)
            : dayLog.takbir,
        tasbih: Math.max(0, dayLog.tasbih - 1),
      };
      return {
        ...prev,
        tasbih: {
          ...prev.tasbih,
          count: prev.tasbih.count - 1,
          historyStack: prev.tasbih.historyStack.slice(0, -1),
        },
        dailyLogs: {
          ...prev.dailyLogs,
          [todayKey]: nextDayLog,
        },
      };
    });
    triggerHaptic(10);
  }, [state.tasbih.selectedPresetId, triggerHaptic]);

  const resetTasbih = useCallback(() => {
    setState((prev) => ({
      ...prev,
      tasbih: {
        ...prev.tasbih,
        count: 0,
        historyStack: [],
      },
    }));
    triggerHaptic(15);
  }, [triggerHaptic]);

  const setTasbihTarget = useCallback((target: number) => {
    const safeTarget = Math.max(1, Math.min(100000, Math.floor(target)));
    setState((prev) => ({
      ...prev,
      tasbih: { ...prev.tasbih, target: safeTarget },
    }));
  }, []);

  const setTasbihPreset = useCallback((presetId: string) => {
    const preset = TASBIH_PRESETS.find((p) => p.id === presetId);
    setState((prev) => ({
      ...prev,
      tasbih: {
        ...prev.tasbih,
        selectedPresetId: presetId,
        target: preset?.defaultTarget ?? prev.tasbih.target,
        count: 0,
        historyStack: [],
      },
    }));
  }, []);

  const joinMarathon = useCallback(
    (name: string, dailyGoal: number) => {
      const cleanName = name.trim() || 'Roziya';
      const safeGoal = Math.max(10, Math.min(100000, Math.floor(dailyGoal)));
      setState((prev) => ({
        ...prev,
        marathon: {
          joined: true,
          participantName: cleanName,
          dailyGoal: safeGoal,
          joinedDate: prev.marathon.joinedDate || getDateKey(),
        },
      }));
      pushToast(
        `Tabriklaymiz, ${cleanName}! Zikr Marafoniga muvaffaqiyatli qo‘shildingiz 🤲`,
        'gold'
      );
      triggerHaptic([20, 40, 20]);
    },
    [pushToast, triggerHaptic]
  );

  const updateMarathonGoal = useCallback((dailyGoal: number) => {
    const safeGoal = Math.max(10, Math.min(100000, Math.floor(dailyGoal)));
    setState((prev) => ({
      ...prev,
      marathon: { ...prev.marathon, dailyGoal: safeGoal },
    }));
  }, []);

  const updateParticipantName = useCallback((name: string) => {
    setState((prev) => ({
      ...prev,
      marathon: { ...prev.marathon, participantName: name },
    }));
  }, []);

  const addMarathonSalawat = useCallback(
    (amount = 1) => {
      const todayKey = getDateKey();
      let goalReachedNow = false;
      setState((prev) => {
        const dayLog = prev.dailyLogs[todayKey] || {
          salawat: 0,
          takbir: 0,
          tasbih: 0,
        };
        const prevSalawat = dayLog.salawat;
        const nextSalawat = prevSalawat + amount;
        if (
          prevSalawat < prev.marathon.dailyGoal &&
          nextSalawat >= prev.marathon.dailyGoal
        ) {
          goalReachedNow = true;
        }
        return {
          ...prev,
          dailyLogs: {
            ...prev.dailyLogs,
            [todayKey]: {
              ...dayLog,
              salawat: nextSalawat,
            },
          },
        };
      });
      triggerHaptic(goalReachedNow ? [30, 50, 30] : 16);
      return { goalReachedNow };
    },
    [triggerHaptic]
  );

  const toggleReminders = useCallback(async () => {
    const nextEnabled = !state.reminders.enabled;
    if (
      nextEnabled &&
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'default'
    ) {
      try {
        await Notification.requestPermission();
      } catch {
        // ignore if blocked
      }
    }
    setState((prev) => ({
      ...prev,
      reminders: { ...prev.reminders, enabled: nextEnabled },
    }));
    pushToast(
      nextEnabled
        ? 'Kundalik zikr eslatmalari yoqildi'
        : 'Kundalik zikr eslatmalari o‘chirildi',
      'emerald'
    );
  }, [state.reminders.enabled, pushToast]);

  const setReminderTime = useCallback((time: string) => {
    setState((prev) => ({
      ...prev,
      reminders: { ...prev.reminders, time, lastShownDate: null },
    }));
  }, []);

  const todayKey = getDateKey();
  const todayStats: DailyStats = state.dailyLogs[todayKey] || {
    salawat: 0,
    takbir: 0,
    tasbih: 0,
  };

  const {
    totalSalawat,
    totalTakbir,
    totalTasbih,
    totalAllZikr,
    currentStreak,
    longestStreak,
  } = useMemo(() => {
    let salawatSum = 0;
    let takbirSum = 0;
    let tasbihSum = 0;

    const activeDates = new Set<string>();
    Object.entries(state.dailyLogs).forEach(([dateStr, log]) => {
      salawatSum += log.salawat;
      takbirSum += log.takbir;
      tasbihSum += log.tasbih;
      if (log.salawat + log.takbir + log.tasbih > 0) {
        activeDates.add(dateStr);
      }
    });

    // Current streak: consecutive days ending today (or yesterday if today not yet started)
    let streak = 0;
    const cursor = new Date();
    if (!activeDates.has(getDateKey(cursor))) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (activeDates.has(getDateKey(cursor))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    // Longest streak across recorded history
    const sortedDates = Array.from(activeDates).sort();
    let maxStreak = 0;
    let run = 0;
    let prevDate: Date | null = null;
    for (const ds of sortedDates) {
      const [y, m, d] = ds.split('-').map(Number);
      const curr = new Date(y, m - 1, d);
      if (prevDate) {
        const diffDays = Math.round(
          (curr.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        run = diffDays === 1 ? run + 1 : 1;
      } else {
        run = 1;
      }
      if (run > maxStreak) maxStreak = run;
      prevDate = curr;
    }

    return {
      totalSalawat: salawatSum,
      totalTakbir: takbirSum,
      totalTasbih: tasbihSum,
      totalAllZikr: salawatSum + takbirSum + tasbihSum,
      currentStreak: streak,
      longestStreak: Math.max(maxStreak, streak),
    };
  }, [state.dailyLogs]);

  const browserPermission: NotificationPermission | 'unsupported' =
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'unsupported';

  const value: AppStateContextValue = {
    theme: state.theme,
    toggleTheme,
    vibrationEnabled: state.vibrationEnabled,
    toggleVibration,
    favorites: state.favorites,
    toggleFavorite,
    isFavorite,
    getItemProgress,
    incrementItemCount,
    resetItemCount,
    setItemTarget,
    tasbih: state.tasbih,
    incrementTasbih,
    undoTasbih,
    resetTasbih,
    setTasbihTarget,
    setTasbihPreset,
    marathon: state.marathon,
    joinMarathon,
    updateMarathonGoal,
    updateParticipantName,
    addMarathonSalawat,
    dailyLogs: state.dailyLogs,
    todayStats,
    totalSalawat,
    totalTakbir,
    totalTasbih,
    totalAllZikr,
    currentStreak,
    longestStreak,
    reminders: {
      enabled: state.reminders.enabled,
      time: state.reminders.time,
      browserPermission,
    },
    toggleReminders,
    setReminderTime,
    toasts,
    pushToast,
    dismissToast,
    triggerHaptic,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}
