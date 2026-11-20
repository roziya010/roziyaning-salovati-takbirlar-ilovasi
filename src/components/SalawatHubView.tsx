import React, { useState } from 'react';
import { ChevronRight, Heart, Search, Sparkles } from 'lucide-react';
import {
  SALAWAT_CATEGORIES,
  TAKBIR_ITEMS,
  TAKBIR_IMAGE_URL,
} from '../data/islamicContent';
import { useAppState } from '../context/AppStateContext';
import { SalawatHubMode } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface SalawatHubViewProps {
  mode: SalawatHubMode;
  onChangeMode: (mode: SalawatHubMode) => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectTakbir: (takbirId: string) => void;
}

export const SalawatHubView: React.FC<SalawatHubViewProps> = ({
  mode,
  onChangeMode,
  onSelectCategory,
  onSelectTakbir,
}) => {
  const { getItemProgress, isFavorite, toggleFavorite } = useAppState();
  const [filterFavOnly, setFilterFavOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.trim().toLowerCase();

  const filteredCategories = SALAWAT_CATEGORIES.filter((cat) => {
    if (filterFavOnly && !isFavorite(cat.id)) return false;
    if (!q) return true;
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.shortDesc.toLowerCase().includes(q)
    );
  });

  const filteredTakbirs = TAKBIR_ITEMS.filter((tak) => {
    if (filterFavOnly && !isFavorite(tak.id)) return false;
    if (!q) return true;
    return (
      tak.title.toLowerCase().includes(q) ||
      tak.shortDesc.toLowerCase().includes(q) ||
      tak.transliteration.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Header & Mode Segmented Control */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#10231C] dark:text-[#F3EFE6]">
            {mode === 'salawat' ? 'Salovatlar to‘plami' : 'Takbirlar bo‘limi'}
          </h1>
          <p className="mt-1 text-sm text-[#4D645B] dark:text-[#9AB3A9]">
            {mode === 'salawat'
              ? '10 xil sahih va mumtoz salovatlar hamda Qur’oniy duolar'
              : 'Allohni ulug‘lovchi sahih takbir lafzlari va sanash paneli'}
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-[#F3EFE6] dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onChangeMode('salawat')}
            className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'salawat'
                ? 'bg-white dark:bg-[#1B8A64] text-[#0F5C43] dark:text-white shadow-sm'
                : 'text-[#4D645B] dark:text-[#9AB3A9]'
            }`}
          >
            Salovatlar (10)
          </button>
          <button
            type="button"
            onClick={() => onChangeMode('takbir')}
            className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'takbir'
                ? 'bg-white dark:bg-[#1B8A64] text-[#0F5C43] dark:text-white shadow-sm'
                : 'text-[#4D645B] dark:text-[#9AB3A9]'
            }`}
          >
            Takbirlar ({TAKBIR_ITEMS.length})
          </button>
        </div>
      </div>

      {/* Search & Favorites Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#4D645B] dark:text-[#9AB3A9] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              mode === 'salawat'
                ? 'Salovat nomini qidirish...'
                : 'Takbir nomini qidirish...'
            }
            className="w-full min-h-[44px] rounded-xl border border-[#0F5C43]/15 dark:border-[#D4AF37]/20 bg-white dark:bg-[#0D201A] pl-10 pr-4 text-sm text-[#10231C] dark:text-[#F3EFE6] placeholder:text-[#4D645B]/70 dark:placeholder:text-[#9AB3A9]/70 focus:outline-none focus:ring-2 focus:ring-[#0F5C43]"
          />
        </div>

        <button
          type="button"
          onClick={() => setFilterFavOnly((prev) => !prev)}
          className={`min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            filterFavOnly
              ? 'bg-[#C6933A]/15 border-[#C6933A]/45 text-[#9A6F22] dark:text-[#E0B861]'
              : 'bg-white dark:bg-[#0D201A] border-[#0F5C43]/15 dark:border-[#D4AF37]/20 text-[#4D645B] dark:text-[#9AB3A9]'
          }`}
        >
          <Heart className={`w-4 h-4 ${filterFavOnly ? 'fill-current' : ''}`} />
          <span>Sevimlilar</span>
        </button>
      </div>

      {/* Content Grid */}
      {mode === 'salawat' ? (
        filteredCategories.length === 0 ? (
          <div className="rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6]">
              Mos salovat topilmadi
            </p>
            <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
              Qidiruv so‘zini yoki sevimlilar filtrini o‘zgartirib ko‘ring.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCategories.map((cat) => {
              const prog = getItemProgress(cat.id, cat.defaultTarget);
              const fav = isFavorite(cat.id);
              const pct = Math.min(
                100,
                Math.round((prog.count / Math.max(1, prog.target)) * 100)
              );

              return (
                <div
                  key={cat.id}
                  className="rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-5 flex flex-col justify-between gap-4 hover:border-[#0F5C43]/30 dark:hover:border-[#D4AF37]/35 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className="flex items-start gap-3.5 text-left flex-1 min-w-0 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] dark:bg-[#122922] flex items-center justify-center text-[#0F5C43] dark:text-[#E0B861] shrink-0">
                        <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#C6933A] dark:text-[#E0B861] tabular-nums">
                          {String(cat.order).padStart(2, '0')} · {cat.items.length}{' '}
                          matn
                        </p>
                        <h2 className="mt-0.5 text-lg font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                          {cat.title}
                        </h2>
                        <p className="mt-1 text-xs text-[#4D645B] dark:text-[#9AB3A9] leading-relaxed">
                          {cat.shortDesc}
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(cat.id)}
                      aria-label={`${cat.title} sevimlilarga qo‘shish`}
                      className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer shrink-0 ${
                        fav
                          ? 'text-[#C6933A] dark:text-[#E0B861]'
                          : 'text-[#4D645B]/60 dark:text-[#9AB3A9]/60 hover:text-[#C6933A]'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${fav ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Progress & Open CTA */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
                      <span>
                        Jarayon: {prog.count} / {prog.target}
                      </span>
                      <span className="font-semibold text-[#0F5C43] dark:text-[#E0B861]">
                        {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#F3EFE6] dark:bg-[#122922] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#0F5C43] dark:bg-[#1B8A64] transition-[width] duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className="w-full min-h-[44px] flex items-center justify-between rounded-xl bg-[#FAF8F2] dark:bg-[#122922] hover:bg-[#F3EFE6] dark:hover:bg-[#18352C] px-4 py-2.5 text-xs font-semibold text-[#0F5C43] dark:text-[#E0B861] transition-colors cursor-pointer"
                    >
                      <span>O‘qish va sanash</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="space-y-6">
          {/* Takbir Sanctuary Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0A4633] text-white border border-[#D4AF37]/25">
            <img
              src={TAKBIR_IMAGE_URL}
              alt="Oq marmar masjid ustunlari va quyosh nuri"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#051F16]/92 via-[#072B20]/80 to-[#072B20]/45"
            />
            <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <p className="font-arabic text-2xl sm:text-3xl text-[#F1D48A]">
                  اللَّهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا
                </p>
                <h2 className="font-display text-2xl font-bold text-white">
                  Allohni ulug‘lash — qalb quvvati
                </h2>
                <p className="text-xs sm:text-sm text-[#E6EFEA]/90 leading-relaxed">
                  Har bir takbir qalbingizdagi ishonch va shukronalikni ziyoda
                  qilsin. Istagan takbirni tanlab kunlik maqsad belgilang.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#F1D48A] shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>

          {filteredTakbirs.length === 0 ? (
            <div className="rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-8 text-center">
              <p className="text-sm font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                Mos takbir topilmadi
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTakbirs.map((tak) => {
                const prog = getItemProgress(tak.id, tak.defaultTarget);
                const fav = isFavorite(tak.id);
                const pct = Math.min(
                  100,
                  Math.round((prog.count / Math.max(1, prog.target)) * 100)
                );

                return (
                  <div
                    key={tak.id}
                    className="rounded-2xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-5 flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectTakbir(tak.id)}
                        className="text-left flex-1 min-w-0 cursor-pointer"
                      >
                        <h3 className="text-lg font-semibold text-[#10231C] dark:text-[#F3EFE6]">
                          {tak.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                          {tak.shortDesc}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(tak.id)}
                        aria-label={`${tak.title} sevimlilarga qo‘shish`}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer shrink-0 ${
                          fav
                            ? 'text-[#C6933A] dark:text-[#E0B861]'
                            : 'text-[#4D645B]/60 dark:text-[#9AB3A9]/60 hover:text-[#C6933A]'
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${fav ? 'fill-current' : ''}`}
                        />
                      </button>
                    </div>

                    <div
                      dir="rtl"
                      lang="ar"
                      onClick={() => onSelectTakbir(tak.id)}
                      className="rounded-xl bg-[#FAF8F2] dark:bg-[#071410] border border-[#0F5C43]/10 dark:border-[#D4AF37]/15 p-4 text-right cursor-pointer"
                    >
                      <p className="font-arabic text-2xl leading-[2] text-[#10231C] dark:text-[#F3EFE6]">
                        {tak.arabic}
                      </p>
                    </div>

                    <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9] leading-relaxed">
                      {tak.transliteration}
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-[#4D645B] dark:text-[#9AB3A9] tabular-nums">
                        <span>
                          Jarayon: {prog.count} / {prog.target}
                        </span>
                        <span className="font-semibold text-[#0F5C43] dark:text-[#E0B861]">
                          {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#F3EFE6] dark:bg-[#122922] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#C6933A] dark:bg-[#E0B861] transition-[width] duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectTakbir(tak.id)}
                        className="w-full min-h-[44px] flex items-center justify-between rounded-xl bg-[#FAF8F2] dark:bg-[#122922] hover:bg-[#F3EFE6] dark:hover:bg-[#18352C] px-4 py-2.5 text-xs font-semibold text-[#0F5C43] dark:text-[#E0B861] transition-colors cursor-pointer"
                      >
                        <span>Takbir aytish va sanash</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
