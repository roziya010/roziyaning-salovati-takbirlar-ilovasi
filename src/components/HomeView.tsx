import React from 'react';
import {
  ArrowRight,
  BookHeart,
  ChevronRight,
  CircleDot,
  Flame,
  Heart,
  Moon,
  Sparkles,
  Sun,
  Trophy,
} from 'lucide-react';
import {
  HERO_IMAGE_URL,
  SALAWAT_CATEGORIES,
  TAKBIR_ITEMS,
  getDailyMotivation,
} from '../data/islamicContent';
import { useAppState } from '../context/AppStateContext';
import { AppTab, SalawatHubMode } from '../types';
import { CategoryIcon, RubElHizbDivider } from './CategoryIcon';
import { PWAInstallButton } from './PWAInstallButton';

interface HomeViewProps {
  onNavigateTab: (tab: AppTab) => void;
  onOpenSalawatCategory: (categoryId: string) => void;
  onOpenSalawatHub: (mode: SalawatHubMode) => void;
  onOpenTakbirItem: (takbirId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onOpenSalawatCategory,
  onOpenSalawatHub,
  onOpenTakbirItem,
}) => {
  const {
    theme,
    toggleTheme,
    todayStats,
    totalSalawat,
    currentStreak,
    marathon,
    favorites,
  } = useAppState();

  const dailyMotivation = getDailyMotivation();

  const favoriteSalawats = SALAWAT_CATEGORIES.filter((c) =>
    favorites.includes(c.id)
  );
  const favoriteTakbirs = TAKBIR_ITEMS.filter((t) => favorites.includes(t.id));

  const marathonPct = Math.min(
    100,
    Math.round((todayStats.salawat / Math.max(1, marathon.dailyGoal)) * 100)
  );

  return (
    <div className="space-y-7 pb-6">
      {/* Mobile Top Utility Row (non-sticky to preserve viewport space) */}
      <div className="md:hidden flex items-center justify-between gap-3 pt-1">
        <span className="font-display text-2xl font-bold tracking-tight text-[#0A4633] dark:text-[#F3EFE6]">
          Roziya Salovat
        </span>
        <div className="flex items-center gap-2">
          <PWAInstallButton variant="compact" />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Tungi rejimga o‘tish'
            }
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-[#0F5C43]/15 dark:border-[#D4AF37]/25 bg-white dark:bg-[#0D201A] text-[#0F5C43] dark:text-[#E0B861]"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Hero Welcome Sanctuary */}
      <section className="relative overflow-hidden rounded-3xl bg-[#072B20] text-white shadow-lg border border-[#D4AF37]/20">
        <img
          src={HERO_IMAGE_URL}
          alt="Yulduzli osmon, hilol oy va nurli fonuslar bilan bezatilgan islomiy hovli"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Measured scrim for crisp WCAG AA contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#041A13]/95 via-[#06271D]/78 to-[#072B20]/45"
        />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 space-y-4">
            <p className="font-arabic text-xl sm:text-2xl text-[#F1D48A] leading-relaxed">
              اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ
            </p>

            <h1 className="font-display text-2xl sm:text-4xl font-bold leading-tight text-white [text-wrap:balance]">
              Assalomu alaykum, Roziyaning Salovat va Takbirlar ilovasiga xush
              kelibsiz! 🤍
            </h1>

            <p className="text-sm sm:text-base text-[#E6EFEA]/90 leading-relaxed max-w-2xl">
              Alloh taolo qilayotgan zikr va ibodatlaringizni qabul aylasin. Har
              bir aytilgan salovatingiz qalbingizga nur, hayotingizga baraka olib
              kelsin. 🤲
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenSalawatHub('salawat')}
                className="min-h-[46px] inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] hover:bg-[#C6933A] px-5 py-2.5 text-sm font-semibold text-[#062218] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
              >
                <BookHeart className="w-4 h-4" />
                <span>Salovat o‘qish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab(AppTab.TASBIH)}
                className="min-h-[46px] inline-flex items-center gap-2 rounded-xl bg-white/12 hover:bg-white/20 backdrop-blur-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <CircleDot className="w-4 h-4 text-[#F1D48A]" />
                <span>Raqamli Tasbih</span>
              </button>
            </div>
          </div>

          {/* Desktop subtle daily reflection inside hero */}
          <div className="lg:col-span-4 rounded-2xl bg-[#041C14]/75 backdrop-blur-md border border-[#D4AF37]/25 p-5 space-y-2">
            <p className="text-xs font-medium text-[#F1D48A]">
              Bugungi hikmat
            </p>
            <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
              “{dailyMotivation}”
            </p>
          </div>
        </div>
      </section>

      {/* Today's Metrics Strip */}
      <section aria-label="Bugungi ko‘rsatkichlar" className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 sm:p-5">
          <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] truncate">
            Bugungi salovat
          </p>
          <p className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#0F5C43] dark:text-[#E0B861] tabular-nums">
            {todayStats.salawat.toLocaleString('uz-UZ')}
          </p>
          <p className="mt-1 text-[11px] text-[#4D645B] dark:text-[#8BA399]">
            Jami: {totalSalawat.toLocaleString('uz-UZ')}
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 sm:p-5">
          <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] truncate">
            Bugungi takbir
          </p>
          <p className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#10231C] dark:text-[#F3EFE6] tabular-nums">
            {todayStats.takbir.toLocaleString('uz-UZ')}
          </p>
          <p className="mt-1 text-[11px] text-[#4D645B] dark:text-[#8BA399]">
            Tasbeh: {todayStats.tasbih.toLocaleString('uz-UZ')}
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 sm:p-5">
          <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] truncate">
            Davomiylik
          </p>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-[#C6933A] dark:text-[#E0B861] tabular-nums">
              {currentStreak}
            </span>
            <span className="text-xs font-medium text-[#4D645B] dark:text-[#9AB3A9]">
              kun
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#4D645B] dark:text-[#8BA399] inline-flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#C6933A]" />
            <span>Faol seriya</span>
          </p>
        </div>
      </section>

      {/* Primary Quick Sections */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onOpenSalawatHub('takbir')}
          className="text-left rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-5 hover:border-[#0F5C43]/30 dark:hover:border-[#D4AF37]/35 transition-colors flex items-center justify-between gap-4 cursor-pointer group"
        >
          <div className="space-y-1.5">
            <div className="w-10 h-10 rounded-xl bg-[#0F5C43]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center text-[#0F5C43] dark:text-[#E0B861]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-[#10231C] dark:text-[#F3EFE6]">
              Takbirlar bo‘limi
            </h2>
            <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] leading-relaxed">
              Takbiri Tashriq va sahih takbir zikrlarini sanash
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#4D645B] dark:text-[#9AB3A9] group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab(AppTab.TASBIH)}
          className="text-left rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-5 hover:border-[#0F5C43]/30 dark:hover:border-[#D4AF37]/35 transition-colors flex items-center justify-between gap-4 cursor-pointer group"
        >
          <div className="space-y-1.5">
            <div className="w-10 h-10 rounded-xl bg-[#0F5C43]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center text-[#0F5C43] dark:text-[#E0B861]">
              <CircleDot className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-[#10231C] dark:text-[#F3EFE6]">
              Raqamli Tasbih
            </h2>
            <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] leading-relaxed">
              Tebranish, maqsad halqasi va avtomatik saqlash
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#4D645B] dark:text-[#9AB3A9] group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab(AppTab.MARATHON)}
          className="text-left rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-5 hover:border-[#0F5C43]/30 dark:hover:border-[#D4AF37]/35 transition-colors flex items-center justify-between gap-4 cursor-pointer group"
        >
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#C6933A]/15 dark:bg-[#E0B861]/15 flex items-center justify-center text-[#C6933A] dark:text-[#E0B861]">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#0F5C43] dark:text-[#E0B861] tabular-nums">
                {marathonPct}%
              </span>
            </div>
            <h2 className="text-base font-semibold text-[#10231C] dark:text-[#F3EFE6]">
              Zikr Marafoni
            </h2>
            <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] leading-relaxed">
              Kundalik maqsad: {marathon.dailyGoal.toLocaleString('uz-UZ')} salovat
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#4D645B] dark:text-[#9AB3A9] group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </section>

      <RubElHizbDivider />

      {/* Featured Salawat Categories */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
              Salovat turlari
            </h2>
            <p className="text-xs sm:text-sm text-[#4D645B] dark:text-[#9AB3A9]">
              10 ta tanlangan salovat va Qur’oniy duolar bo‘limi
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenSalawatHub('salawat')}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F5C43] dark:text-[#E0B861] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Barchasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SALAWAT_CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onOpenSalawatCategory(cat.id)}
              className="text-left rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 sm:p-5 hover:border-[#0F5C43]/30 dark:hover:border-[#D4AF37]/35 transition-colors flex items-start gap-3.5 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#F3EFE6] dark:bg-[#122922] flex items-center justify-center text-[#0F5C43] dark:text-[#E0B861] shrink-0">
                <CategoryIcon name={cat.iconName} className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-[#C6933A] dark:text-[#E0B861] tabular-nums">
                  {String(cat.order).padStart(2, '0')} · Maqsad {cat.defaultTarget}
                </p>
                <h3 className="mt-0.5 text-base font-semibold text-[#10231C] dark:text-[#F3EFE6] truncate">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs text-[#4D645B] dark:text-[#9AB3A9] line-clamp-2 leading-relaxed">
                  {cat.shortDesc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Favorites Shelf */}
      {(favoriteSalawats.length > 0 || favoriteTakbirs.length > 0) && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#C6933A] dark:text-[#E0B861] fill-current" />
            <h2 className="font-display text-xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
              Sevimli zikrlar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoriteSalawats.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onOpenSalawatCategory(cat.id)}
                className="text-left rounded-2xl bg-[#F3EFE6]/70 dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-[#F3EFE6] dark:hover:bg-[#122922] transition-colors cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                    Salovat
                  </p>
                  <p className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6] truncate">
                    {cat.title}
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
                className="text-left rounded-2xl bg-[#F3EFE6]/70 dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-[#F3EFE6] dark:hover:bg-[#122922] transition-colors cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                    Takbir
                  </p>
                  <p className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6] truncate">
                    {tak.title}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0F5C43] dark:text-[#E0B861] shrink-0" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Desktop subtle install card if available */}
      <div className="hidden md:flex items-center justify-between gap-4 rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-5">
        <div>
          <h3 className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6]">
            Mobil ilova sifatida o‘rnating
          </h3>
          <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] mt-0.5">
            Roziya Salovat ilovasini bosh ekranga qo‘shib, internetsiz ham zikr
            qiling.
          </p>
        </div>
        <PWAInstallButton variant="compact" />
      </div>
    </div>
  );
};
