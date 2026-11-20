import React, { useState } from 'react';
import { Download, Smartphone, WifiOff, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
      return;
    }
    setShowGuideModal(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={
          variant === 'full'
            ? 'w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#0F5C43] dark:bg-[#1B8A64] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0A4633] dark:hover:bg-[#157252] transition-colors whitespace-nowrap shrink-0 cursor-pointer'
            : 'min-h-[40px] flex items-center gap-2 rounded-xl border border-[#0F5C43]/20 dark:border-[#D4AF37]/30 bg-white dark:bg-[#0D201A] px-3.5 py-2 text-xs font-semibold text-[#0F5C43] dark:text-[#E0B861] hover:bg-[#F3EFE6] dark:hover:bg-[#122922] transition-colors whitespace-nowrap shrink-0 cursor-pointer'
        }
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>Ilovani o‘rnatish</span>
      </button>

      {showGuideModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-guide-title"
        >
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0D201A] border border-[#0F5C43]/15 dark:border-[#D4AF37]/20 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0F5C43]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center text-[#0F5C43] dark:text-[#E0B861]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    id="pwa-guide-title"
                    className="text-base font-semibold text-[#10231C] dark:text-[#F3EFE6]"
                  >
                    Bosh ekranga o‘rnatish
                  </h3>
                  <p className="text-xs text-[#4D645B] dark:text-[#9AB3A9]">
                    Roziya Salovat mobil ilovasi
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                aria-label="Yopish"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#4D645B] dark:text-[#9AB3A9] hover:bg-[#F3EFE6] dark:hover:bg-[#122922]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isIOS ? (
              <ol className="mt-4 space-y-2.5 text-sm text-[#10231C] dark:text-[#F3EFE6]/90 leading-relaxed">
                <li>
                  1. Safari brauzerining pastki panelidagi{' '}
                  <strong className="font-semibold">Ulashish (Share)</strong>{' '}
                  tugmasini bosing.
                </li>
                <li>
                  2. Ro‘yxatdan{' '}
                  <strong className="font-semibold">
                    “Add to Home Screen” (Bosh ekranga qo‘shish)
                  </strong>{' '}
                  bandini tanlang.
                </li>
                <li>
                  3. Yuqori burchakdagi{' '}
                  <strong className="font-semibold">“Add” (Qo‘shish)</strong>{' '}
                  tugmasini bosing.
                </li>
              </ol>
            ) : (
              <ol className="mt-4 space-y-2.5 text-sm text-[#10231C] dark:text-[#F3EFE6]/90 leading-relaxed">
                <li>
                  1. Android Chrome brauzerida yuqori o‘ng burchakdagi{' '}
                  <strong className="font-semibold">⋮ (Menyu)</strong>{' '}
                  tugmasini bosing.
                </li>
                <li>
                  2.{' '}
                  <strong className="font-semibold">
                    “Ilovani o‘rnatish” (Install app)
                  </strong>{' '}
                  yoki{' '}
                  <strong className="font-semibold">
                    “Bosh ekranga qo‘shish”
                  </strong>{' '}
                  tugmasini tanlang.
                </li>
                <li>
                  3. Ilova telefoningizga o‘rnatiladi va internetsiz ham
                  ishlaydi.
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="mt-5 w-full min-h-[44px] rounded-xl bg-[#0F5C43] dark:bg-[#1B8A64] py-2.5 text-sm font-semibold text-white hover:bg-[#0A4633] transition-colors"
            >
              Tushunarli
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl bg-[#0A4633] dark:bg-[#122922] border border-[#D4AF37]/40 px-3.5 py-2 text-xs font-medium text-[#F3EFE6] shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#E0B861] shrink-0" />
      <span className="whitespace-nowrap">
        Oflayn rejim — ma’lumotlaringiz saqlanmoqda
      </span>
    </div>
  );
};
