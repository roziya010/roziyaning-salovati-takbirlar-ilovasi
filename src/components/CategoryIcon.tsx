import React from 'react';
import {
  Anchor,
  BookOpen,
  Compass,
  Crown,
  Feather,
  Flame,
  HeartPulse,
  KeyRound,
  Sparkles,
  Sun,
} from 'lucide-react';
import { SalawatCategory } from '../types';

export const CategoryIcon: React.FC<{
  name: SalawatCategory['iconName'];
  className?: string;
}> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'sun':
      return <Sun className={className} />;
    case 'key':
      return <KeyRound className={className} />;
    case 'compass':
      return <Compass className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'anchor':
      return <Anchor className={className} />;
    case 'heart-pulse':
      return <HeartPulse className={className} />;
    case 'feather':
      return <Feather className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'book-open':
      return <BookOpen className={className} />;
    case 'crown':
      return <Crown className={className} />;
  }
};

export const RubElHizbDivider: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <span className="h-px flex-1 bg-[#0F5C43]/15 dark:bg-[#D4AF37]/20" />
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-[#C6933A] dark:text-[#E0B861] shrink-0"
    >
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="1.5"
        transform="rotate(45 12 12)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
    <span className="h-px flex-1 bg-[#0F5C43]/15 dark:bg-[#D4AF37]/20" />
  </div>
);
