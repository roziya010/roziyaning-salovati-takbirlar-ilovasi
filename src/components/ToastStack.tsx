import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, CheckCircle2, X } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const ToastStack: React.FC = () => {
  const { toasts, dismissToast } = useAppState();

  return (
    <div
      className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-40 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto flex items-start gap-3 rounded-2xl px-4 py-3 shadow-lg border backdrop-blur-md ${
              toast.tone === 'gold'
                ? 'bg-[#0A4633]/95 dark:bg-[#122922]/95 border-[#D4AF37]/40 text-[#F3EFE6]'
                : 'bg-white/95 dark:bg-[#0D201A]/95 border-[#0F5C43]/20 dark:border-[#D4AF37]/25 text-[#10231C] dark:text-[#F3EFE6]'
            }`}
          >
            {toast.tone === 'gold' ? (
              <Bell className="w-4 h-4 text-[#E0B861] shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#0F5C43] dark:text-[#1B8A64] shrink-0 mt-0.5" />
            )}
            <p className="text-xs sm:text-sm font-medium leading-snug flex-1">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Bildirishnomani yopish"
              className="p-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
