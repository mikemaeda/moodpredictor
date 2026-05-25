import type { MoodEntry } from "../types";
import { getQuadrant } from "../lib/mood";

const daysAgo = (days: number, hour: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 15, 0, 0);
  return date.toISOString();
};

export const seedEntries: MoodEntry[] = [
  {
    id: "seed-1",
    createdAt: daysAgo(7, 9),
    pleasantness: 3,
    energy: 4,
    quadrant: getQuadrant(3, 4),
    primaryEmotion: "Tired",
    intensity: "medium",
    sensations: ["Drained"],
    contextTags: ["Sleep", "Study stress"],
    note: "Late night before class."
  },
  {
    id: "seed-2",
    createdAt: daysAgo(6, 18),
    pleasantness: 7,
    energy: 6,
    quadrant: getQuadrant(7, 6),
    primaryEmotion: "Hopeful",
    intensity: "soft",
    sensations: [],
    contextTags: ["Exercise"],
    note: "Walk helped."
  },
  {
    id: "seed-3",
    createdAt: daysAgo(5, 15),
    pleasantness: 4,
    energy: 8,
    quadrant: getQuadrant(4, 8),
    primaryEmotion: "Overwhelmed",
    intensity: "strong",
    sensations: ["Tense jaw"],
    contextTags: ["Exam", "Caffeine", "Study stress"]
  },
  {
    id: "seed-4",
    createdAt: daysAgo(3, 21),
    pleasantness: 8,
    energy: 3,
    quadrant: getQuadrant(8, 3),
    primaryEmotion: "Calm",
    intensity: "medium",
    sensations: ["Heavy shoulders"],
    contextTags: ["Family", "Food"]
  },
  {
    id: "seed-5",
    createdAt: daysAgo(2, 10),
    pleasantness: 6,
    energy: 7,
    quadrant: getQuadrant(6, 7),
    primaryEmotion: "Proud",
    intensity: "medium",
    sensations: [],
    contextTags: ["Productivity"]
  },
  {
    id: "seed-6",
    createdAt: daysAgo(1, 8),
    pleasantness: 2,
    energy: 3,
    quadrant: getQuadrant(2, 3),
    primaryEmotion: "Lonely",
    intensity: "soft",
    sensations: ["Heavy shoulders"],
    contextTags: ["Loneliness", "Weather"]
  }
];
