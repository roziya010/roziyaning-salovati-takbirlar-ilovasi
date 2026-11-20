import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 950);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#062E22] text-[#F3EFE6] px-6 select-none"
          onClick={() => setVisible(false)}
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#0D4A36] border border-[#D4AF37]/35 flex items-center justify-center shadow-2xl mb-5">
              <svg
                width="44"
                height="44"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36 10C22.7 10 12 20.7 12 34C12 47.3 22.7 58 36 58C41.8 58 47.1 56 51.3 52.6C48.3 54 45 54.8 41.5 54.8C28.6 54.8 18.2 44.4 18.2 31.5C18.2 20.8 25.4 11.8 35.2 9.2L36 10Z"
                  fill="#E0B861"
                />
                <path
                  d="M44 18L46.2 24.3L52.5 26.5L46.2 28.7L44 35L41.8 28.7L35.5 26.5L41.8 24.3L44 18Z"
                  fill="#F1D48A"
                />
              </svg>
            </div>
            <p className="font-arabic text-2xl text-[#E0B861] mb-2">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white">
              Roziya Salovat
            </h1>
            <p className="mt-1.5 text-xs tracking-wide text-[#A5C3B6]">
              Salovatlar · Takbirlar · Raqamli Tasbeh
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
