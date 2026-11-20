import React, { useMemo } from 'react';
import {
  Award,
  Bell,
  ChevronRight,
  Flame,
  Heart,
  Moon,
  Share2,
  Sun,
  Vibrate,
} from 'lucide-react';
import {
  SALAWAT_CATEGORIES,
  TAKBIR_ITEMS,
  buildAchievements,
} from '../data/islamicContent';
import { getDateKey, useAppState } from '../context/AppStateContext';
import { PWAInstallButton } from './PWAInstallButton';

interface ProfileViewProps {
  onOpenSalawatCategory: (categoryId: string) => void;
  onOpenTakbirItem: (takbirId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenSalawatCategory,
  onOpenTakbirItem,
}) => {
  const {
    theme,
    toggleTheme,
    vibrationEnabled,
    toggleVibration,
    todayStats,
    totalSalawat,
    totalTakbir,
    totalAllZikr,
    currentStreak,
    longestStreak,
    marathon,
    dailyLogs,
    favorites,
    reminders,
    toggleReminders,
    setReminderTime,
    pushToast,
  } = useAppState();

  const weeklyData = useMemo(() => {
    const dayNames = ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'];
    const rows: {
      key: string;
      label: string;
      salawat: number;
      takbir: number;
      total: number;
    }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = getDateKey(d);
      const log = dailyLogs[key] || { salawat: 0, takbir: 0, tasbih: 0 };
      rows.push({
        key,
        label: dayNames[d.getDay()],
        salawat: log.salawat,
        takbir: log.takbir,
        total: log.salawat + log.takbir + log.tasbih,
      });
    }
    return rows;
  }, [dailyLogs]);

  const weeklyMax = Math.max(
    10,
    ...weeklyData.map((d) => d.salawat + d.takbir)
  );
  const weeklySalawatSum = weeklyData.reduce((acc, r) => acc + r.salawat, 0);
  const weeklyTakbirSum = weeklyData.reduce((acc, r) => acc + r.takbir, 0);

  const monthlyCells = useMemo(() => {
    const cells: { key: string; count: number; dayNum: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = getDateKey(d);
      const log = dailyLogs[key];
      const count = log ? log.salawat + log.takbir + log.tasbih : 0;
      cells.push({ key, count, dayNum: d.getDate() });
    }
    return cells;
  }, [dailyLogs]);

  const monthlyTotal = monthlyCells.reduce((acc, c) => acc + c.count, 0);

  const achievements = useMemo(
    () =>
      buildAchievements(totalSalawat, totalTakbir, totalAllZikr, currentStreak),
    [totalSalawat, totalTakbir, totalAllZikr, currentStreak]
  );
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const favoriteSalawats = SALAWAT_CATEGORIES.filter((c) =>
    favorites.includes(c.id)
  );
  const favoriteTakbirs = TAKBIR_ITEMS.filter((t) => favorites.includes(t.id));

  const handleShareApp = async () => {
    const text =
      'Assalomu alaykum! Men Roziyaning Salovat va Takbirlar ilovasida har kuni salovat aytyapman. Siz ham bizga qo‘shiling! 🤲';
    const url = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Roziya – Salawat & Takbir',
          text,
          url,
        });
        return;
      } catch {
        // fallback
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      pushToast('Ulashish matni nusxalandi!', 'emerald');
    } catch {
      pushToast(text, 'gold');
    }
  };

  return (
    <div className="space-y-7 pb-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#C6933A] dark:text-[#E0B861]">
            Shaxsiy natijalar va sozlamalar
          </p>
          <h1 className="font-display text-3xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
            {marathon.participantName || 'Roziya'} — Statistika
          </h1>
        </div>
        <div className="flex items-center gap-2.5">
          <PWAInstallButton variant="compact" />
          <button
            type="button"
            onClick={handleShareApp}
            className="min-h-[40px] inline-flex items-center gap-2 rounded-xl bg-[#0F5C43] dark:bg-[#1B8A64] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0A4633] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Ulashish</span>
          </button>
        </div>
      </div>

      {/* 4 Primary KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 sm:p-5">
          <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
            Bugungi salovat
          </p>
          <p className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#0F5C43] dark:text-[#E0B861] tabular-nums">
            {todayStats.salawat.toLocaleString('uz-UZ')}
          </p>
          <p className="mt-1 text-[11px] text-[#4D645B] dark:text-[#8BA399] tabular-nums">
            Maqsad: {marathon.dailyGoal.toLocaleString('uz-UZ')}
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 sm:p-5">
          <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
            Bugungi takbir
          </p>
          <p className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#10231C] dark:text-[#F3EFE6] tabular-nums">
            {todayStats.takbir.toLocaleString('uz-UZ')}
          </p>
          <p className="mt-1 text-[11px] text-[#4D645B] dark:text-[#8BA399] tabular-nums">
            Tasbeh: {todayStats.tasbih.toLocaleString('uz-UZ')}
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 sm:p-5">
          <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
            Jami salovatlar
          </p>
          <p className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#0F5C43] dark:text-[#1B8A64] tabular-nums">
            {totalSalawat.toLocaleString('uz-UZ')}
          </p>
          <p className="mt-1 text-[11px] text-[#4D645B] dark:text-[#8BA399] tabular-nums">
            Jami takbir: {totalTakbir.toLocaleString('uz-UZ')}
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 sm:p-5">
          <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
            Joriy seriya
          </p>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-[#C6933A] dark:text-[#E0B861] tabular-nums">
              {currentStreak}
            </span>
            <span className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
              kun
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#4D645B] dark:text-[#8BA399] inline-flex items-center gap-1 tabular-nums">
            <Flame className="w-3 h-3 text-[#C6933A]" />
            <span>Eng uzun: {longestStreak} kun</span>
          </p>
        </div>
      </section>

      {/* Weekly Chart & Monthly Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Progress Chart */}
        <section className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
                Haftalik jarayon
              </h2>
              <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
                Salovat: {weeklySalawatSum.toLocaleString('uz-UZ')} · Takbir:{' '}
                {weeklyTakbirSum.toLocaleString('uz-UZ')}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#4D645B] dark:text-[#9AB3A9]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0F5C43] dark:bg-[#1B8A64]" />
                Salovat
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#C6933A] dark:bg-[#E0B861]" />
                Takbir
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2.5 items-end h-44 pt-4">
            {weeklyData.map((day) => {
              const sHeight = Math.round((day.salawat / weeklyMax) * 100);
              const tHeight = Math.round((day.takbir / weeklyMax) * 100);
              return (
                <div
                  key={day.key}
                  className="flex flex-col items-center justify-end h-full gap-2"
                >
                  <span className="text-[11px] font-medium text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
                    {day.salawat + day.takbir}
                  </span>
                  <div className="w-full max-w-[34px] flex-1 flex flex-col justify-end rounded-xl bg-[#FAF8F2] dark:bg-[#071410] overflow-hidden p-0.5 gap-0.5">
                    {day.takbir > 0 && (
                      <div
                        className="w-full rounded-t-md bg-[#C6933A] dark:bg-[#E0B861] transition-[height] duration-300"
                        style={{ height: `${Math.max(6, tHeight)}%` }}
                      />
                    )}
                    {day.salawat > 0 && (
                      <div
                        className="w-full rounded-b-md rounded-t-sm bg-[#0F5C43] dark:bg-[#1B8A64] transition-[height] duration-300"
                        style={{ height: `${Math.max(8, sHeight)}%` }}
                      />
                    )}
                  </div>
                  <span className="text-xs font-medium text-[#10231C] dark:text-[#F3EFE6]">
                    {day.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Monthly 30-day Overview */}
        <section className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="font-display text-xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
                Oylik faollik (30 kun)
              </h2>
              <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
                Jami 30 kunda: {monthlyTotal.toLocaleString('uz-UZ')} zikr
              </p>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#C6933A] dark:text-[#E0B861] tabular-nums">
              <Award className="w-4 h-4" />
              <span>
                {unlockedCount}/{achievements.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {monthlyCells.map((cell) => {
              const level =
                cell.count === 0
                  ? 'bg-[#FAF8F2] dark:bg-[#122922] text-[#4D645B]/60 dark:text-[#8BA399]/60'
                  : cell.count < 50
                    ? 'bg-[#0F5C43]/20 dark:bg-[#1B8A64]/25 text-[#0F5C43] dark:text-[#E0B861]'
                    : cell.count < 150
                      ? 'bg-[#0F5C43]/55 dark:bg-[#1B8A64]/60 text-white'
                      : 'bg-[#0F5C43] dark:bg-[#1B8A64] text-white';

              return (
                <div
                  key={cell.key}
                  title={`${cell.key}: ${cell.count} zikr`}
                  className={`h-9 rounded-lg flex items-center justify-center text-[11px] font-semibold tabular-nums ${level}`}
                >
                  {cell.dayNum}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Favorites & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Saved Favorites */}
        <section className="lg:col-span-6 rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#C6933A] dark:text-[#E0B861] fill-current" />
            <h2 className="font-display text-xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
              Sevimli salovat va takbirlar
            </h2>
          </div>

          {favoriteSalawats.length === 0 && favoriteTakbirs.length === 0 ? (
            <p className="text-sm text-[#4D645B] dark:text-[#9AB3A9] py-4">
              Hali sevimlilar ro‘yxati bo‘sh. Istalgan salovat yoki takbir
              kartasidagi yurakcha belgisini bosing.
            </p>
          ) : (
            <div className="divide-y divide-[#0F5C43]/10 dark:divide-[#D4AF37]/15">
              {favoriteSalawats.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onOpenSalawatCategory(cat.id)}
                  className="w-full min-h-[56px] py-3 flex items-center justify-between gap-3 text-left hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                      {cat.title}
                    </p>
                    <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                      Salovat · {cat.shortDesc}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#0F5C43] dark:text-[#E0B861] shrink-0" />
                </button>
              ))}

              {favoriteTakbirs.map((tak) => (
                <button
                  key={tak.id}
                  type="button"
                  onClick={() => onOpenTakbirItem(tak.id)}
                  className="w-full min-h-[56px] py-3 flex items-center justify-between gap-3 text-left hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                      {tak.title}
                    </p>
                    <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                      Takbir · {tak.shortDesc}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#0F5C43] dark:text-[#E0B861] shrink-0" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Settings & Reminders */}
        <section className="lg:col-span-6 rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 space-y-5">
          <h2 className="font-display text-xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
            Ilova sozlamalari
          </h2>

          <div className="divide-y divide-[#0F5C43]/10 dark:divide-[#D4AF37]/15">
            {/* Theme */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] dark:bg-[#122922] flex items-center justify-center text-[#0F5C43] dark:text-[#E0B861]">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                    Ko‘rinish rejimi
                  </p>
                  <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                    {theme === 'dark' ? 'Tungi zumrad rejim' : 'Yorug‘ rejim'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="min-h-[40px] px-4 rounded-xl bg-[#F3EFE6] dark:bg-[#122922] text-xs font-semibold text-[#10231C] dark:text-[#F3EFE6] cursor-pointer"
              >
                Almashtirish
              </button>
            </div>

            {/* Vibration */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] dark:bg-[#122922] flex items-center justify-center text-[#0F5C43] dark:text-[#E0B861]">
                  <Vibrate className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                    Tasbeh tebranishi
                  </p>
                  <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                    Har bosishda yengil tebranish (qo‘llab-quvvatlansa)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleVibration}
                className={`min-h-[40px] px-4 rounded-xl text-xs font-semibold cursor-pointer ${
                  vibrationEnabled
                    ? 'bg-[#0F5C43] dark:bg-[#1B8A64] text-white'
                    : 'bg-[#F3EFE6] dark:bg-[#122922] text-[#4D645B] dark:text-[#9AB3A9]'
                }`}
              >
                {vibrationEnabled ? 'Yoniq' : 'O‘chiq'}
              </button>
            </div>

            {/* Daily Reminders */}
            <div className="py-3.5 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] dark:bg-[#122922] flex items-center justify-center text-[#C6933A] dark:text-[#E0B861]">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                      Kundalik zikr eslatmasi
                    </p>
                    <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                      Har kuni tanlangan vaqtda ilova ichida eslatadi
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleReminders}
                  className={`min-h-[40px] px-4 rounded-xl text-xs font-semibold cursor-pointer ${
                    reminders.enabled
                      ? 'bg-[#0F5C43] dark:bg-[#1B8A64] text-white'
                      : 'bg-[#F3EFE6] dark:bg-[#122922] text-[#4D645B] dark:text-[#9AB3A9]'
                  }`}
                >
                  {reminders.enabled ? 'Yoniq' : 'O‘chiq'}
                </button>
              </div>

              {reminders.enabled && (
                <div className="flex items-center justify-between gap-3 pl-13">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="reminder-time"
                      className="text-xs text-[#4D645B] dark:text-[#9AB3A9]"
                    >
                      Eslatma vaqti:
                    </label>
                    <input
                      id="reminder-time"
                      type="time"
                      value={reminders.time}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="min-h-[38px] rounded-lg border border-[#0F5C43]/20 dark:border-[#D4AF37]/25 bg-[#FAF8F2] dark:bg-[#071410] px-2.5 text-xs font-semibold text-[#10231C] dark:text-[#F3EFE6]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      pushToast(
                        'Alloh zikrlaringizga baraka bersin! Bugungi salovatni aytishni unutmang 🤲',
                        'gold'
                      )
                    }
                    className="text-xs font-semibold text-[#0F5C43] dark:text-[#E0B861] hover:underline cursor-pointer"
                  >
                    Sinab ko‘rish
                  </button>
                </div>
              )}
            </div>
          </div>

          <PWAInstallButton variant="full" />
        </section>
      </div>
    </div>
  );
};
