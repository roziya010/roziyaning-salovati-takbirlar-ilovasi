import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { DhikrTextItem } from '../types';
import { useAppState } from '../context/AppStateContext';
import { ProgressRing } from './ProgressRing';
import { RubElHizbDivider } from './CategoryIcon';

interface SalawatDetailViewProps {
  id: string;
  title: string;
  description: string;
  kind: 'salawat' | 'takbir';
  defaultTarget: number;
  items: DhikrTextItem[];
  onBack: () => void;
}

const TARGET_PRESETS = [33, 100, 313];

export const SalawatDetailView: React.FC<SalawatDetailViewProps> = ({
  id,
  title,
  description,
  kind,
  defaultTarget,
  items,
  onBack,
}) => {
  const {
    getItemProgress,
    incrementItemCount,
    resetItemCount,
    setItemTarget,
    isFavorite,
    toggleFavorite,
    pushToast,
  } = useAppState();

  const [activeIndex, setActiveIndex] = useState(0);
  const [fontScale, setFontScale] = useState<'md' | 'lg' | 'xl'>('lg');
  const [showCustomTarget, setShowCustomTarget] = useState(false);
  const [customTargetInput, setCustomTargetInput] = useState('');
  const [celebrating, setCelebrating] = useState(false);
  const [tapPulse, setTapPulse] = useState(0);

  const progress = getItemProgress(id, defaultTarget);
  const favorited = isFavorite(id);
  const currentItem = items[activeIndex] || items[0];

  useEffect(() => {
    setActiveIndex(0);
    setCelebrating(false);
  }, [id]);

  const handleCountTap = () => {
    setTapPulse((p) => p + 1);
    const { completedNow } = incrementItemCount(id, kind, defaultTarget);
    if (completedNow) {
      setCelebrating(true);
      pushToast('MashaAlloh! Alloh zikrlaringizni qabul qilsin! 🤲', 'gold');
    }
  };

  const handleApplyCustomTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(customTargetInput, 10);
    if (!Number.isNaN(num) && num > 0) {
      setItemTarget(id, num);
      setShowCustomTarget(false);
      setCustomTargetInput('');
    }
  };

  const pct = Math.min(
    100,
    Math.round((progress.count / Math.max(1, progress.target)) * 100)
  );
  const isGoalComplete = progress.count >= progress.target;

  const arabicSizeClass =
    fontScale === 'md'
      ? 'text-2xl sm:text-3xl leading-[2.1]'
      : fontScale === 'lg'
        ? 'text-3xl sm:text-4xl leading-[2.15]'
        : 'text-4xl sm:text-5xl leading-[2.2]';

  return (
    <div className="space-y-6 pb-8">
      {/* Top Action Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#10231C] dark:text-[#F3EFE6] hover:bg-[#F3EFE6] dark:hover:bg-[#122922] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-[#0F5C43]/15 dark:border-[#D4AF37]/20 bg-white dark:bg-[#0D201A] p-0.5">
            {(['md', 'lg', 'xl'] as const).map((sz, i) => (
              <button
                key={sz}
                type="button"
                onClick={() => setFontScale(sz)}
                aria-label={`Arabcha matn o‘lchami ${i + 1}`}
                className={`min-h-[36px] min-w-[36px] rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  fontScale === sz
                    ? 'bg-[#0F5C43] text-white dark:bg-[#1B8A64]'
                    : 'text-[#4D645B] dark:text-[#9AB3A9]'
                }`}
              >
                {i === 0 ? 'A-' : i === 1 ? 'A' : 'A+'}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite(id)}
            aria-label={
              favorited ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga saqlash'
            }
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors cursor-pointer ${
              favorited
                ? 'bg-[#C6933A]/15 border-[#C6933A]/40 text-[#C6933A] dark:text-[#E0B861]'
                : 'bg-white dark:bg-[#0D201A] border-[#0F5C43]/15 dark:border-[#D4AF37]/20 text-[#4D645B] dark:text-[#9AB3A9]'
            }`}
          >
            <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Category Heading */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-[#C6933A] dark:text-[#E0B861]">
          {kind === 'salawat' ? 'Salovat bo‘limi' : 'Takbir bo‘limi'}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
          {title}
        </h1>
        <p className="text-sm text-[#4D645B] dark:text-[#9AB3A9] leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>

      {/* Multi-item Switcher if category has multiple items */}
      {items.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeIndex === idx
                  ? 'bg-[#0F5C43] dark:bg-[#1B8A64] text-white'
                  : 'bg-white dark:bg-[#0D201A] border border-[#0F5C43]/15 dark:border-[#D4AF37]/20 text-[#4D645B] dark:text-[#9AB3A9] hover:text-[#10231C] dark:hover:text-[#F3EFE6]'
              }`}
            >
              {idx + 1}. {item.title}
            </button>
          ))}
        </div>
      )}

      {/* Main Layout: Text Card + Counter Card on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Arabic & Uzbek Translation Card */}
        <article className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 sm:p-8 space-y-6 islamic-lattice">
          {items.length > 1 && (
            <h2 className="text-sm font-semibold text-[#0F5C43] dark:text-[#E0B861]">
              {currentItem.title}
            </h2>
          )}

          <div
            dir="rtl"
            lang="ar"
            className="rounded-2xl bg-[#FAF8F2]/95 dark:bg-[#071410]/85 border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-5 sm:p-7 text-right"
          >
            <p
              className={`font-arabic ${arabicSizeClass} text-[#10231C] dark:text-[#F3EFE6]`}
            >
              {currentItem.arabic}
            </p>
          </div>

          <RubElHizbDivider />

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-[#C6933A] dark:text-[#E0B861] mb-1">
                O‘qilishi (Transkripsiya)
              </h3>
              <p className="text-sm sm:text-base font-medium text-[#10231C] dark:text-[#F3EFE6] leading-relaxed">
                {currentItem.transliteration}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-[#0F5C43] dark:text-[#9AB3A9] mb-1">
                Ma’nosi
              </h3>
              <p className="text-sm text-[#4D645B] dark:text-[#C4D6CE] leading-relaxed">
                {currentItem.translation}
              </p>
            </div>

            {currentItem.source && (
              <p className="text-xs text-[#4D645B] dark:text-[#8BA399] pt-2 border-t border-[#0F5C43]/10 dark:border-[#D4AF37]/15">
                Manba: {currentItem.source}
              </p>
            )}
          </div>
        </article>

        {/* Interactive Counter & Goal Panel */}
        <aside className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 space-y-5 lg:sticky lg:top-24">
          {/* Target Picker */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                Kunlik maqsad
              </span>
              <span className="text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
                {progress.count} / {progress.target} ({pct}%)
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {TARGET_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setItemTarget(id, preset);
                    setShowCustomTarget(false);
                  }}
                  className={`min-h-[40px] rounded-xl text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                    progress.target === preset && !showCustomTarget
                      ? 'bg-[#0F5C43] dark:bg-[#1B8A64] text-white'
                      : 'bg-[#F3EFE6] dark:bg-[#122922] text-[#10231C] dark:text-[#F3EFE6] hover:bg-[#E7E1D3] dark:hover:bg-[#18352C]'
                  }`}
                >
                  {preset}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowCustomTarget((s) => !s)}
                className={`min-h-[40px] rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  showCustomTarget || !TARGET_PRESETS.includes(progress.target)
                    ? 'bg-[#C6933A] text-white'
                    : 'bg-[#F3EFE6] dark:bg-[#122922] text-[#10231C] dark:text-[#F3EFE6]'
                }`}
              >
                Maxsus
              </button>
            </div>

            {showCustomTarget && (
              <form
                onSubmit={handleApplyCustomTarget}
                className="flex items-center gap-2 pt-1"
              >
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={customTargetInput}
                  onChange={(e) => setCustomTargetInput(e.target.value)}
                  placeholder="Masalan: 500"
                  className="flex-1 min-h-[42px] rounded-xl border border-[#0F5C43]/20 dark:border-[#D4AF37]/25 bg-[#FAF8F2] dark:bg-[#071410] px-3 text-sm text-[#10231C] dark:text-[#F3EFE6] focus:outline-none focus:ring-2 focus:ring-[#0F5C43]"
                />
                <button
                  type="submit"
                  className="min-h-[42px] px-4 rounded-xl bg-[#0F5C43] dark:bg-[#1B8A64] text-xs font-semibold text-white cursor-pointer"
                >
                  Saqlash
                </button>
              </form>
            )}
          </div>

          {/* Progress Ring & Digital Counter Button */}
          <div className="flex flex-col items-center py-2 space-y-4">
            <ProgressRing
              value={progress.count}
              max={progress.target}
              size={184}
              strokeWidth={10}
              accent={isGoalComplete ? 'gold' : 'emerald'}
            >
              <motion.button
                key={tapPulse}
                type="button"
                onClick={handleCountTap}
                whileTap={{ scale: 0.94 }}
                className="w-[144px] h-[144px] rounded-full bg-gradient-to-br from-[#0F5C43] to-[#083B2A] dark:from-[#1B8A64] dark:to-[#0C4F38] text-white shadow-lg flex flex-col items-center justify-center gap-1 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6933A]"
              >
                <span className="text-4xl font-bold tabular-nums leading-none">
                  {progress.count}
                </span>
                <span className="text-xs font-medium text-white/85">
                  Sanash (+1)
                </span>
              </motion.button>
            </ProgressRing>

            {/* Linear bar + Reset */}
            <div className="w-full space-y-3">
              <div className="h-2 w-full rounded-full bg-[#F3EFE6] dark:bg-[#122922] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-[width] duration-300 ${
                    isGoalComplete
                      ? 'bg-[#C6933A] dark:bg-[#E0B861]'
                      : 'bg-[#0F5C43] dark:bg-[#1B8A64]'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    resetItemCount(id, defaultTarget);
                    setCelebrating(false);
                  }}
                  className="min-h-[44px] inline-flex items-center gap-2 rounded-xl border border-[#0F5C43]/15 dark:border-[#D4AF37]/20 px-4 py-2 text-xs font-semibold text-[#4D645B] dark:text-[#9AB3A9] hover:text-[#10231C] dark:hover:text-[#F3EFE6] hover:bg-[#F3EFE6] dark:hover:bg-[#122922] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Qayta boshlash</span>
                </button>

                <button
                  type="button"
                  onClick={handleCountTap}
                  className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F5C43] dark:bg-[#1B8A64] hover:bg-[#0A4633] text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  <span>+1 Sanash</span>
                </button>
              </div>
            </div>
          </div>

          {/* Completion Celebration */}
          <AnimatePresence>
            {(celebrating || isGoalComplete) && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="rounded-2xl bg-[#0A4633] dark:bg-[#122922] border border-[#D4AF37]/45 p-4 text-center text-[#F3EFE6] space-y-1.5"
              >
                <div className="inline-flex items-center justify-center gap-1.5 text-[#F1D48A] text-xs font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Maqsad bajarildi</span>
                </div>
                <p className="text-sm font-semibold leading-snug">
                  MashaAlloh! Alloh zikrlaringizni qabul qilsin! 🤲
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
};
