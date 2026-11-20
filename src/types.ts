export enum AppTab {
  HOME = 'home',
  SALAWAT = 'salawat',
  TASBIH = 'tasbih',
  MARATHON = 'marathon',
  PROFILE = 'profile',
}

export type SalawatHubMode = 'salawat' | 'takbir';

export interface DhikrTextItem {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  source?: string;
}

export interface SalawatCategory {
  id: string;
  order: number;
  title: string;
  shortDesc: string;
  description: string;
  iconName:
    | 'sun'
    | 'key'
    | 'compass'
    | 'flame'
    | 'anchor'
    | 'heart-pulse'
    | 'feather'
    | 'sparkles'
    | 'book-open'
    | 'crown';
  defaultTarget: number;
  items: DhikrTextItem[];
}

export interface TakbirItem extends DhikrTextItem {
  shortDesc: string;
  defaultTarget: number;
}

export interface TasbihPreset {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  defaultTarget: number;
  categoryType: 'salawat' | 'takbir' | 'tasbih';
}

export interface DailyStats {
  salawat: number;
  takbir: number;
  tasbih: number;
}

export interface ItemProgress {
  count: number;
  target: number;
}

export interface MarathonState {
  joined: boolean;
  participantName: string;
  dailyGoal: number;
  joinedDate: string | null;
}

export interface ReminderSettings {
  enabled: boolean;
  time: string;
  browserPermission: NotificationPermission | 'unsupported';
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  requirementLabel: string;
  unlocked: boolean;
  progress: number;
  target: number;
  icon: 'crescent' | 'star' | 'flame' | 'award' | 'heart' | 'compass';
}

export interface AppToast {
  id: string;
  message: string;
  tone?: 'emerald' | 'gold';
}
