import type { AppSettings, MoodEntry } from "../types";

const entriesKey = "mood-compass.entries";
const settingsKey = "mood-compass.settings";
const onboardingKey = "mood-compass.onboarded";

export const defaultSettings: AppSettings = {
  analyticsEnabled: false,
  reducedMotion: false
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function readEntries(): MoodEntry[] {
  return readJson<MoodEntry[]>(entriesKey, []).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function writeEntries(entries: MoodEntry[]): void {
  localStorage.setItem(entriesKey, JSON.stringify(entries));
}

export function addEntry(entry: MoodEntry): MoodEntry[] {
  const entries = [entry, ...readEntries()];
  writeEntries(entries);
  return entries;
}

export function clearEntries(): void {
  localStorage.removeItem(entriesKey);
}

export function readSettings(): AppSettings {
  return readJson<AppSettings>(settingsKey, defaultSettings);
}

export function writeSettings(settings: AppSettings): void {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
}

export function hasCompletedOnboarding(): boolean {
  return localStorage.getItem(onboardingKey) === "true";
}

export function completeOnboarding(): void {
  localStorage.setItem(onboardingKey, "true");
}

export function clearForecastHistory(): void {
  localStorage.removeItem("mood-compass.forecast-cache");
}
