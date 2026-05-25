import type { Forecast, MoodEntry, PatternCardData } from "../types";
import { average, getTimeOfDay, uniqueDays } from "./mood";

const MIN_FORECAST_ENTRIES = 8;
const MIN_FORECAST_DAYS = 3;

export function buildForecast(entries: MoodEntry[], now = new Date()): Forecast {
  if (entries.length < MIN_FORECAST_ENTRIES || uniqueDays(entries) < MIN_FORECAST_DAYS) {
    return {
      status: "not-enough-data",
      confidence: "low",
      message: "Not enough history yet for a personal forecast.",
      factors: [
        `Needs at least ${MIN_FORECAST_ENTRIES} check-ins`,
        `Needs check-ins across at least ${MIN_FORECAST_DAYS} days`
      ],
      generatedAt: now.toISOString()
    };
  }

  const sorted = [...entries].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const recent = sorted.slice(-5);
  const earlier = sorted.slice(-10, -5);
  const recentEnergy = average(recent.map((entry) => entry.energy));
  const earlierEnergy = average(earlier.map((entry) => entry.energy));
  const recentPleasantness = average(recent.map((entry) => entry.pleasantness));
  const lowSleepRecent = recent.filter((entry) => entry.contextTags.includes("Sleep")).length;
  const targetTime = getTimeOfDay(now);
  const matchingTime = sorted.filter((entry) => getTimeOfDay(new Date(entry.createdAt)) === targetTime);
  const matchingEnergy = average(matchingTime.map((entry) => entry.energy));
  const factors: string[] = [];

  if (lowSleepRecent >= 2) {
    factors.push("Sleep has appeared in recent low or tired check-ins.");
  }
  if (recentEnergy < earlierEnergy - 1) {
    factors.push("Your recent energy average is lower than the previous window.");
  }
  if (matchingTime.length >= 3) {
    factors.push(`${targetTime} check-ins average ${matchingEnergy.toFixed(1)}/10 energy.`);
  }

  const lowerEnergySignal = recentEnergy <= 4.8 || lowSleepRecent >= 2 || matchingEnergy <= 4.8;
  const message = lowerEnergySignal
    ? `Your next ${targetTime} may feel lower-energy than usual based on recent patterns.`
    : `Your next ${targetTime} looks likely to stay near your recent baseline.`;

  return {
    status: "ready",
    confidence: entries.length >= 14 && matchingTime.length >= 3 ? "moderate" : "low",
    message,
    factors: factors.length ? factors : [`Recent pleasantness averages ${recentPleasantness.toFixed(1)}/10.`],
    generatedAt: now.toISOString()
  };
}

export function buildPatterns(entries: MoodEntry[]): PatternCardData[] {
  if (entries.length < 4) {
    return [
      {
        id: "early",
        title: "Patterns need a little time",
        body: "Save a few more check-ins and Mood Compass will start noticing gentle personal patterns.",
        strength: "early"
      }
    ];
  }

  const sleepEntries = entries.filter((entry) => entry.contextTags.includes("Sleep"));
  const walkEntries = entries.filter((entry) => entry.contextTags.includes("Exercise"));
  const studyStressEntries = entries.filter((entry) => entry.contextTags.includes("Study stress"));
  const cards: PatternCardData[] = [];

  if (sleepEntries.length >= 2) {
    cards.push({
      id: "sleep",
      title: "Sleep may be shaping mornings",
      body: "Entries tagged with sleep tend to carry lower energy, so morning check-ins are worth watching.",
      strength: "noticing"
    });
  }

  if (walkEntries.length >= 1) {
    cards.push({
      id: "walks",
      title: "Movement looks supportive",
      body: "Exercise-tagged entries are appearing near steadier or more pleasant moods.",
      strength: "early"
    });
  }

  if (studyStressEntries.length >= 2) {
    cards.push({
      id: "study-stress",
      title: "Study stress clusters with activation",
      body: "Study stress is showing up around higher-energy tense states.",
      strength: "noticing"
    });
  }

  return cards.length ? cards : [
    {
      id: "baseline",
      title: "Your baseline is forming",
      body: "The current history is enough to show a baseline, but not a strong recurring pattern yet.",
      strength: "early"
    }
  ];
}

export function buildWeeklyReview(entries: MoodEntry[]): string {
  if (!entries.length) return "No check-ins yet this week. One quick entry is enough to start.";
  const recent = entries.slice(0, 7);
  const pleasantness = average(recent.map((entry) => entry.pleasantness)).toFixed(1);
  const energy = average(recent.map((entry) => entry.energy)).toFixed(1);
  const commonTag = recent.flatMap((entry) => entry.contextTags)[0] ?? "your routines";
  return `This week, your average pleasantness is ${pleasantness}/10 and energy is ${energy}/10. ${commonTag} is one area worth noticing without judging.`;
}
