import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Undo2,
  Vibrate,
} from 'lucide-react';
import { TASBIH_PRESETS } from '../data/islamicContent';
import { useAppState } from '../context/AppStateContext';
import { ProgressRing } from './ProgressRing';

const TASBIH_TARGETS = [33, 99, 100, 313];

export const TasbihView: React.FC = () => {
  const {
    tasbih,
    incrementTasbih,
    undoTasbih,
    resetTasbih,
    setTasbihTarget,
    setTasbihPreset,
    vibrationEnabled,
    toggleVibration,
    pushToast,
  } = useAppState();

  const [tapRippleKey, setTapRippleKey] = useState(0);
  const [showCustomTarget, setShowCustomTarget] = useState(false);
  const [customTargetInput, setCustomTargetInput] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const activePreset =
    TASBIH_PRESETS.find((p) => p.id === tasbih.selectedPresetId) ||
    TASBIH_PRESETS[0];

  const isCompleted = tasbih.count >= tasbih.target;
  const pct = Math.min(
    100,
    Math.round((tasbih.count / Math.max(1, tasbih.target)) * 100)
  );

  const handleTap = () => {
    setConfirmReset(false);
    setTapRippleKey((k) => k + 1);
    const { completedNow } = incrementTasbih();
    if (completedNow) {
      pushToast('MashaAlloh! Alloh zikrlaringizni qabul qilsin! 🤲', 'gold');
    }
  };

  const handleReset = () => {
    if (tasbih.count > 0 && !confirmReset) {
      setConfirmReset(true);
      window.setTimeout(() => setConfirmReset(false), 3000);
      return;
    }
    resetTasbih();
    setConfirmReset(false);
  };

  const handleCustomTargetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(customTargetInput, 10);
    if (!Number.isNaN(n) && n > 0) {
      setTasbihTarget(n);
      setShowCustomTarget(false);
      setCustomTargetInput('');
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
            Raqamli Tasbih
          </h1>
          <p className="text-xs sm:text-sm text-[#4D645B] dark:text-[#9AB3A9]">
            Zikringiz avtomatik saqlanadi
          </p>
        </div>

        <button
          type="button"
          onClick={toggleVibration}
          aria-pressed={vibrationEnabled}
          className={`min-h-[44px] inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            vibrationEnabled
              ? 'bg-[#0F5C43]/10 dark:bg-[#1B8A64]/20 border-[#0F5C43]/30 dark:border-[#1B8A64]/40 text-[#0F5C43] dark:text-[#E0B861]'
              : 'bg-white dark:bg-[#0D201A] border-[#0F5C43]/15 dark:border-[#D4AF37]/20 text-[#4D645B] dark:text-[#9AB3A9]'
          }`}
        >
          <Vibrate className="w-4 h-4" />
          <span>{vibrationEnabled ? 'Tebranish yoniq' : 'Tebranish o‘chiq'}</span>
        </button>
      </div>

      {/* Preset Zikr Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TASBIH_PRESETS.map((preset) => {
          const selected = preset.id === activePreset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setTasbihPreset(preset.id);
                setConfirmReset(false);
              }}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selected
                  ? 'bg-[#0F5C43] dark:bg-[#1B8A64] text-white shadow-sm'
                  : 'bg-white dark:bg-[#0D201A] border border-[#0F5C43]/15 dark:border-[#D4AF37]/20 text-[#4D645B] dark:text-[#9AB3A9] hover:text-[#10231C] dark:hover:text-[#F3EFE6]'
              }`}
            >
              {preset.title}
            </button>
          );
        })}
      </div>

      {/* Main Split on Desktop / Centered Thumb Flow on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Selected Dhikr Display Card */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 sm:p-7 space-y-5 islamic-lattice">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#C6933A] dark:text-[#E0B861]">
              Tanlangan zikr
            </span>
            <span className="text-xs text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
              Maqsad: {tasbih.target}
            </span>
          </div>

          <div
            dir="rtl"
            lang="ar"
            className="rounded-2xl bg-[#FAF8F2] dark:bg-[#071410] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-5 text-center"
          >
            <p className="font-arabic text-3xl sm:text-4xl leading-[2.1] text-[#10231C] dark:text-[#F3EFE6]">
              {activePreset.arabic}
            </p>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <p className="text-base font-semibold text-[#10231C] dark:text-[#F3EFE6]">
              {activePreset.transliteration}
            </p>
            <p className="text-sm text-[#4D645B] dark:text-[#9AB3A9]">
              {activePreset.translation}
            </p>
          </div>

          {/* Target Selection */}
          <div className="space-y-2 pt-2 border-t border-[#0F5C43]/10 dark:border-[#D4AF37]/15">
            <p className="text-xs font-semibold text-[#10231C] dark:text-[#F3EFE6]">
              Maqsadni tanlang
            </p>
            <div className="grid grid-cols-5 gap-2">
              {TASBIH_TARGETS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTasbihTarget(t);
                    setShowCustomTarget(false);
                  }}
                  className={`min-h-[40px] rounded-xl text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                    tasbih.target === t && !showCustomTarget
                      ? 'bg-[#0F5C43] dark:bg-[#1B8A64] text-white'
                      : 'bg-[#F3EFE6] dark:bg-[#122922] text-[#10231C] dark:text-[#F3EFE6]'
                  }`}
                >
                  {t}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowCustomTarget((s) => !s)}
                className={`min-h-[40px] rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  showCustomTarget || !TASBIH_TARGETS.includes(tasbih.target)
                    ? 'bg-[#C6933A] text-white'
                    : 'bg-[#F3EFE6] dark:bg-[#122922] text-[#10231C] dark:text-[#F3EFE6]'
                }`}
              >
                Boshqa
              </button>
            </div>

            {showCustomTarget && (
              <form
                onSubmit={handleCustomTargetSubmit}
                className="flex items-center gap-2 pt-1"
              >
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={customTargetInput}
                  onChange={(e) => setCustomTargetInput(e.target.value)}
                  placeholder="Son kiriting..."
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
        </div>

        {/* Centerpiece Tactile Tasbih Ring */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/20 p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between w-full max-w-xs text-xs text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
            <span>
              Joriy hisob: <strong className="text-[#10231C] dark:text-[#F3EFE6]">{tasbih.count}</strong>
            </span>
            <span>
              Bajarildi: <strong className="text-[#0F5C43] dark:text-[#E0B861]">{pct}%</strong>
            </span>
          </div>

          <div className="relative flex items-center justify-center">
            <AnimatePresence>
              {tapRippleKey > 0 && (
                <motion.span
                  key={tapRippleKey}
                  initial={{ scale: 0.85, opacity: 0.45 }}
                  animate={{ scale: 1.18, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-64 h-64 rounded-full border-2 border-[#0F5C43]/40 dark:border-[#E0B861]/45 pointer-events-none"
                />
              )}
            </AnimatePresence>

            <ProgressRing
              value={tasbih.count}
              max={tasbih.target}
              size={252}
              strokeWidth={11}
              accent={isCompleted ? 'gold' : 'emerald'}
            >
              <motion.button
                type="button"
                onClick={handleTap}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.1 }}
                aria-label={`Tasbeh sanash, joriy son ${tasbih.count}`}
                className="w-[202px] h-[202px] rounded-full bg-gradient-to-br from-[#0F5C43] via-[#0B4B36] to-[#062E22] dark:from-[#1B8A64] dark:via-[#12684B] dark:to-[#0A402E] text-white shadow-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none border-4 border-[#F3EFE6]/40 dark:border-[#D4AF37]/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6933A]"
              >
                <span className="text-5xl sm:text-6xl font-bold tabular-nums tracking-tight leading-none">
                  {tasbih.count}
                </span>
                <span className="text-xs font-medium text-[#F1D48A] tabular-nums">
                  / {tasbih.target}
                </span>
                <span className="mt-1 text-[11px] text-white/80">
                  Bosib sanang
                </span>
              </motion.button>
            </ProgressRing>
          </div>

          {/* Completion Banner */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="w-full max-w-md rounded-2xl bg-[#0A4633] dark:bg-[#122922] border border-[#D4AF37]/45 px-5 py-4 text-center text-[#F3EFE6] space-y-1"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1D48A]">
                  <Sparkles className="w-4 h-4" />
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Target bajarildi</span>
                </div>
                <p className="text-sm sm:text-base font-semibold">
                  MashaAlloh! Alloh zikrlaringizni qabul qilsin! 🤲
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Undo & Reset Controls */}
          <div className="flex items-center justify-center gap-3 w-full max-w-xs">
            <button
              type="button"
              onClick={undoTasbih}
              disabled={tasbih.count === 0}
              className="flex-1 min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl border border-[#0F5C43]/15 dark:border-[#D4AF37]/20 bg-[#FAF8F2] dark:bg-[#122922] px-4 py-2.5 text-xs font-semibold text-[#10231C] dark:text-[#F3EFE6] disabled:opacity-45 hover:bg-[#F3EFE6] dark:hover:bg-[#18352C] transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Undo2 className="w-4 h-4" />
              <span>Orqaga</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={tasbih.count === 0}
              className={`flex-1 min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed ${
                confirmReset
                  ? 'bg-[#C6933A] border-[#C6933A] text-white'
                  : 'border-[#0F5C43]/15 dark:border-[#D4AF37]/20 bg-[#FAF8F2] dark:bg-[#122922] text-[#10231C] dark:text-[#F3EFE6] hover:bg-[#F3EFE6] dark:hover:bg-[#18352C]'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{confirmReset ? 'Tasdiqlang' : 'Qayta boshlash'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
