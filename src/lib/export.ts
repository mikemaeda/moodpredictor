import type { MoodEntry } from "../types";

export function buildExportPayload(entries: MoodEntry[]): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      app: "Mood Compass",
      entries
    },
    null,
    2
  );
}

export function downloadExport(entries: MoodEntry[]): void {
  const blob = new Blob([buildExportPayload(entries)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mood-compass-export.json";
  link.click();
  URL.revokeObjectURL(url);
}
