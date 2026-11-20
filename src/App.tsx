import { useState } from 'react';
import { AppStateProvider } from './context/AppStateContext';
import { SALAWAT_CATEGORIES, TAKBIR_ITEMS } from './data/islamicContent';
import { AppTab, SalawatHubMode } from './types';
import { DesktopTopBar, MobileBottomNav } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { SalawatHubView } from './components/SalawatHubView';
import { SalawatDetailView } from './components/SalawatDetailView';
import { TasbihView } from './components/TasbihView';
import { MarathonView } from './components/MarathonView';
import { ProfileView } from './components/ProfileView';
import { SplashScreen } from './components/SplashScreen';
import { OfflineIndicator } from './components/PWAInstallButton';
import { ToastStack } from './components/ToastStack';

function AppShell() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [hubMode, setHubMode] = useState<SalawatHubMode>('salawat');
  const [selectedSalawatId, setSelectedSalawatId] = useState<string | null>(
    null
  );
  const [selectedTakbirId, setSelectedTakbirId] = useState<string | null>(null);

  const handleSelectTab = (tab: AppTab) => {
    setActiveTab(tab);
    setSelectedSalawatId(null);
    setSelectedTakbirId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSalawatCategory = (categoryId: string) => {
    setActiveTab(AppTab.SALAWAT);
    setHubMode('salawat');
    setSelectedSalawatId(categoryId);
    setSelectedTakbirId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTakbirItem = (takbirId: string) => {
    setActiveTab(AppTab.SALAWAT);
    setHubMode('takbir');
    setSelectedTakbirId(takbirId);
    setSelectedSalawatId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSalawatHub = (mode: SalawatHubMode) => {
    setActiveTab(AppTab.SALAWAT);
    setHubMode(mode);
    setSelectedSalawatId(null);
    setSelectedTakbirId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeSalawatCategory = selectedSalawatId
    ? SALAWAT_CATEGORIES.find((c) => c.id === selectedSalawatId)
    : null;

  const activeTakbirItem = selectedTakbirId
    ? TAKBIR_ITEMS.find((t) => t.id === selectedTakbirId)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] dark:bg-[#071410] text-[#10231C] dark:text-[#F3EFE6] transition-colors">
      <SplashScreen />
      <OfflineIndicator />

      <DesktopTopBar activeTab={activeTab} onSelectTab={handleSelectTab} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-7 pb-24 md:pb-12">
        {activeTab === AppTab.HOME && (
          <HomeView
            onNavigateTab={handleSelectTab}
            onOpenSalawatCategory={handleOpenSalawatCategory}
            onOpenSalawatHub={handleOpenSalawatHub}
            onOpenTakbirItem={handleOpenTakbirItem}
          />
        )}

        {activeTab === AppTab.SALAWAT && (
          <>
            {activeSalawatCategory ? (
              <SalawatDetailView
                id={activeSalawatCategory.id}
                title={activeSalawatCategory.title}
                description={activeSalawatCategory.description}
                kind="salawat"
                defaultTarget={activeSalawatCategory.defaultTarget}
                items={activeSalawatCategory.items}
                onBack={() => setSelectedSalawatId(null)}
              />
            ) : activeTakbirItem ? (
              <SalawatDetailView
                id={activeTakbirItem.id}
                title={activeTakbirItem.title}
                description={activeTakbirItem.shortDesc}
                kind="takbir"
                defaultTarget={activeTakbirItem.defaultTarget}
                items={[activeTakbirItem]}
                onBack={() => setSelectedTakbirId(null)}
              />
            ) : (
              <SalawatHubView
                mode={hubMode}
                onChangeMode={setHubMode}
                onSelectCategory={handleOpenSalawatCategory}
                onSelectTakbir={handleOpenTakbirItem}
              />
            )}
          </>
        )}

        {activeTab === AppTab.TASBIH && <TasbihView />}

        {activeTab === AppTab.MARATHON && (
          <MarathonView onNavigateTab={handleSelectTab} />
        )}

        {activeTab === AppTab.PROFILE && (
          <ProfileView
            onOpenSalawatCategory={handleOpenSalawatCategory}
            onOpenTakbirItem={handleOpenTakbirItem}
          />
        )}
      </main>

      <ToastStack />
      <MobileBottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppShell />
    </AppStateProvider>
  );
}
