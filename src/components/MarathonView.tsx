import React, { useMemo, useState } from 'react';
import {
  Award,
  Check,
  Compass,
  Flame,
  Heart,
  Moon,
  Plus,
  Share2,
  Star,
  Trophy,
} from 'lucide-react';
import {
  MARATHON_CREST_URL,
  buildAchievements,
} from '../data/islamicContent';
import { getDateKey, useAppState } from '../context/AppStateContext';
import { AchievementBadge, AppTab } from '../types';
import { ProgressRing } from './ProgressRing';

const GOAL_OPTIONS = [100, 313, 500, 1000];

const SHARE_MESSAGE =
  'Assalomu alaykum! Men Roziyaning Salovat va Takbirlar ilovasida har kuni salovat aytyapman. Siz ham bizga qo‘shiling! 🤲';

const BadgeIcon: React.FC<{ icon: AchievementBadge['icon']; className?: string }> = ({
  icon,
  className = 'w-5 h-5',
}) => {
  switch (icon) {
    case 'crescent':
      return <Moon className={className} />;
    case 'star':
      return <Star className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'compass':
      return <Compass className={className} />;
  }
};

export const MarathonView: React.FC<{
  onNavigateTab: (tab: AppTab) => void;
}> = ({ onNavigateTab }) => {
  const {
    marathon,
    joinMarathon,
    updateMarathonGoal,
    addMarathonSalawat,
    todayStats,
    totalSalawat,
    totalTakbir,
    totalAllZikr,
    currentStreak,
    dailyLogs,
    pushToast,
  } = useAppState();

  const [nameInput, setNameInput] = useState(marathon.participantName || 'Roziya');
  const [selectedGoal, setSelectedGoal] = useState(marathon.dailyGoal || 313);
  const [customGoalInput, setCustomGoalInput] = useState('');
  const [showCustomGoal, setShowCustomGoal] = useState(false);

  const dailyPct = Math.min(
    100,
    Math.round(
      (todayStats.salawat / Math.max(1, marathon.dailyGoal)) * 100
    )
  );
  const goalDone = todayStats.salawat >= marathon.dailyGoal;

  const achievements = useMemo(
    () =>
      buildAchievements(totalSalawat, totalTakbir, totalAllZikr, currentStreak),
    [totalSalawat, totalTakbir, totalAllZikr, currentStreak]
  );

  const last7Days = useMemo(() => {
    const dayNames = ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'];
    const arr: { key: string; label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = getDateKey(d);
      const log = dailyLogs[key];
      arr.push({
        key,
        label: dayNames[d.getDay()],
        count: log ? log.salawat : 0,
      });
    }
    return arr;
  }, [dailyLogs]);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customNum = parseInt(customGoalInput, 10);
    const goalToUse =
      showCustomGoal && !Number.isNaN(customNum) && customNum >= 10
        ? customNum
        : selectedGoal;
    joinMarathon(nameInput, goalToUse);
  };

  const handleQuickAdd = (amount: number) => {
    const { goalReachedNow } = addMarathonSalawat(amount);
    if (goalReachedNow) {
      pushToast(
        'MashaAlloh! Bugungi Zikr Marafoni maqsadingiz bajarildi! 🤲',
        'gold'
      );
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Roziya – Salawat & Takbir',
          text: SHARE_MESSAGE,
          url: shareUrl,
        });
        return;
      } catch {
        // user cancelled or fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${SHARE_MESSAGE}\n${shareUrl}`);
      pushToast('Taklif matni nusxalandi! Yaqinlaringizga yuborishingiz mumkin.', 'emerald');
    } catch {
      pushToast(SHARE_MESSAGE, 'gold');
    }
  };

  return (
    <div className="space-y-7 pb-8">
      {/* Hero Banner */}
      <section className="rounded-3xl bg-[#072B20] text-white border border-[#D4AF37]/25 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-[#D4AF37]/35 shrink-0 bg-[#0A4633]">
          <img
            src={MARATHON_CREST_URL}
            alt="Zikr Marafoni oltin yulduz va hilol ramzi"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#F1D48A]">
            <Trophy className="w-4 h-4" />
            <span>Kundalik hamjihatlik zikri</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Zikr Marafoni
          </h1>
          <p className="text-sm sm:text-base text-[#E6EFEA]/90 leading-relaxed max-w-xl">
            Keling, bugun ham birgalikda ko‘proq salovat aytamiz! 🤲
          </p>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] hover:bg-[#C6933A] px-4 py-2.5 text-xs font-semibold text-[#062218] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Do‘stlarni taklif qilish</span>
        </button>
      </section>

      {/* Join Marathon or Active Marathon Progress */}
      {!marathon.joined ? (
        <form
          onSubmit={handleJoinSubmit}
          className="rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/15 dark:border-[#D4AF37]/20 p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
              Marafonga qo‘shilish
            </h2>
            <p className="text-sm text-[#4D645B] dark:text-[#9AB3A9]">
              Ismingizni va kundalik salovat maqsadingizni tanlang. Natijalaringiz
              har kuni avtomatik hisoblanadi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label
                htmlFor="marathon-name"
                className="block text-xs font-semibold text-[#10231C] dark:text-[#F3EFE6]"
              >
                Ismingiz
              </label>
              <input
                id="marathon-name"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Ismingizni kiriting"
                className="w-full min-h-[44px] rounded-xl border border-[#0F5C43]/20 dark:border-[#D4AF37]/25 bg-[#FAF8F2] dark:bg-[#071410] px-4 text-sm text-[#10231C] dark:text-[#F3EFE6] focus:outline-none focus:ring-2 focus:ring-[#0F5C43]"
              />
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                Kundalik salovat maqsadi
              </span>
              <div className="grid grid-cols-5 gap-2">
                {GOAL_OPTIONS.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => {
                      setSelectedGoal(goal);
                      setShowCustomGoal(false);
                    }}
                    className={`min-h-[44px] rounded-xl text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                      selectedGoal === goal && !showCustomGoal
                        ? 'bg-[#0F5C43] dark:bg-[#1B8A64] text-white'
                        : 'bg-[#F3EFE6] dark:bg-[#122922] text-[#10231C] dark:text-[#F3EFE6]'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowCustomGoal(true)}
                  className={`min-h-[44px] rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    showCustomGoal
                      ? 'bg-[#C6933A] text-white'
                      : 'bg-[#F3EFE6] dark:bg-[#122922] text-[#10231C] dark:text-[#F3EFE6]'
                  }`}
                >
                  Boshqa
                </button>
              </div>
              {showCustomGoal && (
                <input
                  type="number"
                  min={10}
                  max={100000}
                  value={customGoalInput}
                  onChange={(e) => setCustomGoalInput(e.target.value)}
                  placeholder="Masalan: 1500"
                  className="mt-2 w-full min-h-[44px] rounded-xl border border-[#0F5C43]/20 dark:border-[#D4AF37]/25 bg-[#FAF8F2] dark:bg-[#071410] px-4 text-sm text-[#10231C] dark:text-[#F3EFE6]"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="min-h-[48px] w-full sm:w-auto px-7 rounded-xl bg-[#0F5C43] dark:bg-[#1B8A64] hover:bg-[#0A4633] text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            Marafonga qo‘shilish
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Today's Marathon Progress */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 sm:p-7 flex flex-col justify-between gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-[#C6933A] dark:text-[#E0B861]">
                  Ishtirokchi: {marathon.participantName}
                </p>
                <h2 className="font-display text-2xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
                  Bugungi marafon natijasi
                </h2>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg tabular-nums ${
                  goalDone
                    ? 'bg-[#C6933A]/15 text-[#9A6F22] dark:text-[#E0B861]'
                    : 'bg-[#0F5C43]/10 text-[#0F5C43] dark:text-[#E0B861]'
                }`}
              >
                {goalDone ? 'Maqsad bajarildi ✓' : `${dailyPct}% bajarildi`}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ProgressRing
                value={todayStats.salawat}
                max={marathon.dailyGoal}
                size={168}
                strokeWidth={10}
                accent={goalDone ? 'gold' : 'emerald'}
              >
                <span className="text-3xl font-bold text-[#10231C] dark:text-[#F3EFE6] tabular-nums">
                  {dailyPct}%
                </span>
                <span className="text-xs text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
                  {todayStats.salawat} / {marathon.dailyGoal}
                </span>
              </ProgressRing>

              <div className="flex-1 w-full space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                    Tezkor salovat qo‘shish
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 10, 33].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleQuickAdd(amt)}
                        className="min-h-[44px] inline-flex items-center justify-center gap-1 rounded-xl bg-[#0F5C43] dark:bg-[#1B8A64] hover:bg-[#0A4633] text-white text-xs font-semibold tabular-nums transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{amt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                    Kunlik maqsadni o‘zgartirish
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {GOAL_OPTIONS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateMarathonGoal(g)}
                        className={`min-h-[38px] rounded-xl text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                          marathon.dailyGoal === g
                            ? 'bg-[#C6933A] text-white'
                            : 'bg-[#F3EFE6] dark:bg-[#122922] text-[#10231C] dark:text-[#F3EFE6]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#0F5C43]/10 dark:border-[#D4AF37]/15 flex items-center justify-between text-xs text-[#4D645B] dark:text-[#9AB3A9]">
              <span>
                Jami aytilgan salovatlar:{' '}
                <strong className="text-[#10231C] dark:text-[#F3EFE6] tabular-nums">
                  {totalSalawat.toLocaleString('uz-UZ')}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => onNavigateTab(AppTab.SALAWAT)}
                className="font-semibold text-[#0F5C43] dark:text-[#E0B861] hover:underline cursor-pointer"
              >
                Salovat matnlarini o‘qish →
              </button>
            </div>
          </div>

          {/* 7-Day Streak Card */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 sm:p-7 flex flex-col justify-between gap-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                  Barqarorlik ko‘rsatkichi
                </p>
                <p className="mt-1 text-3xl font-bold text-[#C6933A] dark:text-[#E0B861] tabular-nums">
                  {currentStreak} kun
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#C6933A]/15 flex items-center justify-center text-[#C6933A] dark:text-[#E0B861]">
                <Flame className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                So‘nggi 7 kunlik faollik
              </p>
              <div className="grid grid-cols-7 gap-2">
                {last7Days.map((day) => {
                  const active = day.count > 0;
                  const met = day.count >= marathon.dailyGoal;
                  return (
                    <div
                      key={day.key}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        title={`${day.count} salovat`}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-semibold tabular-nums border ${
                          met
                            ? 'bg-[#0F5C43] dark:bg-[#1B8A64] border-[#0F5C43] text-white'
                            : active
                              ? 'bg-[#0F5C43]/15 dark:bg-[#1B8A64]/20 border-[#0F5C43]/30 text-[#0F5C43] dark:text-[#E0B861]'
                              : 'bg-[#FAF8F2] dark:bg-[#122922] border-[#0F5C43]/10 dark:border-[#D4AF37]/15 text-[#4D645B] dark:text-[#8BA399]'
                        }`}
                      >
                        {met ? <Check className="w-4 h-4" /> : day.count}
                      </div>
                      <span className="text-[11px] text-[#4D645B] dark:text-[#9AB3A9]">
                        {day.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl bg-[#FAF8F2] dark:bg-[#071410] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 space-y-2">
              <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] leading-relaxed">
                “{SHARE_MESSAGE}”
              </p>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5C43] dark:text-[#E0B861] hover:underline cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Natijani ulashish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Screen */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
            Yutuqlar va nishonlar
          </h2>
          <p className="text-xs sm:text-sm text-[#4D645B] dark:text-[#9AB3A9]">
            Zikr va salovat davomiyligingiz uchun ochiladigan ruhiy bosqichlar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((badge) => {
            const pct = Math.min(
              100,
              Math.round((badge.progress / badge.target) * 100)
            );
            return (
              <div
                key={badge.id}
                className={`rounded-2xl border p-5 space-y-3 transition-colors ${
                  badge.unlocked
                    ? 'bg-white dark:bg-[#0D201A] border-[#C6933A]/45 dark:border-[#E0B861]/40'
                    : 'bg-[#F3EFE6]/60 dark:bg-[#0D201A]/60 border-[#0F5C43]/10 dark:border-[#D4AF37]/10 opacity-85'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                      badge.unlocked
                        ? 'bg-[#C6933A]/15 text-[#C6933A] dark:text-[#E0B861]'
                        : 'bg-[#0F5C43]/10 dark:bg-[#122922] text-[#4D645B] dark:text-[#8BA399]'
                    }`}
                  >
                    <BadgeIcon icon={badge.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
                    {badge.unlocked ? 'Ochildi ✓' : badge.requirementLabel}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                    {badge.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#4D645B] dark:text-[#9AB3A9] leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded-full bg-[#F3EFE6] dark:bg-[#122922] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-[width] duration-300 ${
                        badge.unlocked
                          ? 'bg-[#C6933A] dark:bg-[#E0B861]'
                          : 'bg-[#0F5C43] dark:bg-[#1B8A64]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-right text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
                    {badge.progress.toLocaleString('uz-UZ')} /{' '}
                    {badge.target.toLocaleString('uz-UZ')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
