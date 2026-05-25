import type { MoodEntry, Quadrant, TimeOfDay } from "../types";

export function getQuadrant(pleasantness: number, energy: number): Quadrant {
  if (pleasantness >= 6 && energy >= 6) return "highPleasantHighEnergy";
  if (pleasantness >= 6 && energy < 6) return "highPleasantLowEnergy";
  if (pleasantness < 6 && energy >= 6) return "lowPleasantHighEnergy";
  return "lowPleasantLowEnergy";
}

export function scoreEntry(entry: Pick<MoodEntry, "pleasantness" | "energy">): number {
  return Math.round(((entry.pleasantness + entry.energy) / 20) * 100);
}

export function getTimeOfDay(date: Date): TimeOfDay {
  const hour = date.getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 22) return "evening";
  return "night";
}

export function average(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

export function uniqueDays(entries: MoodEntry[]): number {
  return new Set(entries.map((entry) => entry.createdAt.slice(0, 10))).size;
}

export function getDominantEmotion(entries: MoodEntry[]): string {
  const counts = new Map<string, number>();
  entries.forEach((entry) => {
    counts.set(entry.primaryEmotion, (counts.get(entry.primaryEmotion) ?? 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Not enough data";
}

export function formatEntryDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}
