import { useEffect, useMemo, useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CheckInPage } from "./pages/CheckInPage";
import { HistoryPage } from "./pages/HistoryPage";
import { InsightsPage } from "./pages/InsightsPage";
import { ToolsPage } from "./pages/ToolsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ForecastingPage } from "./pages/ForecastingPage";
import { HelpNowPage } from "./pages/HelpNowPage";
import { PreviewPage } from "./pages/PreviewPage";
import type { AppSettings, MoodEntry } from "./types";
import { defaultSettings, readEntries, readSettings } from "./lib/storage";

function usePathname() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return path;
}

export function App() {
  const path = usePathname();
  const [entries, setEntries] = useState<MoodEntry[]>(() => readEntries());
  const [settings, setSettings] = useState<AppSettings>(() => readSettings());

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = settings.reducedMotion ? "true" : "false";
  }, [settings.reducedMotion]);

  const refreshEntries = () => setEntries(readEntries());
  const refreshSettings = () => setSettings(readSettings() ?? defaultSettings);

  const page = useMemo(() => {
    if (path === "/") return <LandingPage />;
    if (path === "/onboarding") return <OnboardingPage />;
    if (path === "/privacy") return <PrivacyPage />;
    if (path === "/forecasting") return <ForecastingPage />;
    if (path === "/help-now") return <HelpNowPage />;
    if (path === "/preview") return <PreviewPage entries={entries} />;
    if (path === "/app/check-in") return <CheckInPage onSaved={refreshEntries} />;
    if (path === "/app/history") return <HistoryPage entries={entries} />;
    if (path === "/app/insights") return <InsightsPage entries={entries} />;
    if (path === "/app/tools") return <ToolsPage />;
    if (path === "/app/settings") {
      return <SettingsPage entries={entries} settings={settings} onEntriesChange={refreshEntries} onSettingsChange={refreshSettings} />;
    }
    return <DashboardPage entries={entries} />;
  }, [entries, path, settings]);

  const isPublicPage = ["/", "/onboarding", "/privacy", "/forecasting", "/help-now"].includes(path);

  return isPublicPage ? page : <AppShell>{page}</AppShell>;
}
