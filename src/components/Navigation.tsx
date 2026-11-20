import React from 'react';
import {
  BookHeart,
  CircleDot,
  Home,
  Moon,
  Sun,
  Trophy,
  User,
} from 'lucide-react';
import { AppTab } from '../types';
import { useAppState } from '../context/AppStateContext';

interface NavigationProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

const NAV_ITEMS: {
  id: AppTab;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: AppTab.HOME, label: 'Bosh sahifa', icon: Home },
  { id: AppTab.SALAWAT, label: 'Salovatlar', icon: BookHeart },
  { id: AppTab.TASBIH, label: 'Tasbih', icon: CircleDot },
  { id: AppTab.MARATHON, label: 'Marafon', icon: Trophy },
  { id: AppTab.PROFILE, label: 'Profil', icon: User },
];

export const DesktopTopBar: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const { theme, toggleTheme } = useAppState();

  return (
    <header className="hidden md:block sticky top-0 z-30 bg-[#FAF8F2]/90 dark:bg-[#071410]/90 backdrop-blur-md border-b border-[#0F5C43]/10 dark:border-[#D4AF37]/15">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab(AppTab.HOME)}
          className="font-display text-2xl font-bold tracking-tight text-[#0A4633] dark:text-[#F3EFE6] whitespace-nowrap shrink-0 cursor-pointer"
        >
          Roziya Salovat
        </button>

        {/* Zone 2: Clean single-line text nav links */}
        <nav
          aria-label="Asosiy menyu"
          className="flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#0F5C43] dark:text-[#E0B861] font-semibold'
                    : 'text-[#4D645B] dark:text-[#9AB3A9] hover:text-[#10231C] dark:hover:text-[#F3EFE6]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#0F5C43] dark:bg-[#E0B861]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (Theme Switch) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Tungi rejimga o‘tish'
            }
            className="min-h-[40px] px-3.5 py-2 flex items-center gap-2 rounded-xl border border-[#0F5C43]/15 dark:border-[#D4AF37]/25 bg-white dark:bg-[#0D201A] text-xs font-medium text-[#10231C] dark:text-[#F3EFE6] hover:bg-[#F3EFE6] dark:hover:bg-[#122922] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-[#E0B861]" />
                <span>Yorug‘</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#0F5C43]" />
                <span>Tungi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export const MobileBottomNav: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <nav
      aria-label="Mobil navigatsiya"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0A1A15]/95 backdrop-blur-md border-t border-[#0F5C43]/10 dark:border-[#D4AF37]/15 pb-safe"
    >
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl transition-transform active:scale-95 ${
                isActive
                  ? 'text-[#0F5C43] dark:text-[#E0B861]'
                  : 'text-[#4D645B] dark:text-[#8BA399]'
              }`}
            >
              <div
                className={`relative flex items-center justify-center w-10 h-7 rounded-full transition-colors ${
                  isActive
                    ? 'bg-[#0F5C43]/12 dark:bg-[#E0B861]/15'
                    : 'bg-transparent'
                }`}
              >
                <Icon
                  className={`w-[21px] h-[21px] transition-transform duration-150 ${
                    isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.75]'
                  }`}
                />
              </div>
              <span
                className={`text-[10.5px] leading-none tracking-tight whitespace-nowrap ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
