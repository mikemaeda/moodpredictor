import type { EmotionOption, Quadrant } from "../types";

export const quadrantLabels: Record<Quadrant, string> = {
  highPleasantHighEnergy: "Bright energy",
  highPleasantLowEnergy: "Soft ease",
  lowPleasantHighEnergy: "Activated stress",
  lowPleasantLowEnergy: "Heavy low"
};

export const emotionOptions: EmotionOption[] = [
  { id: "joyful", label: "Joyful", quadrant: "highPleasantHighEnergy" },
  { id: "excited", label: "Excited", quadrant: "highPleasantHighEnergy" },
  { id: "hopeful", label: "Hopeful", quadrant: "highPleasantHighEnergy" },
  { id: "proud", label: "Proud", quadrant: "highPleasantHighEnergy" },
  { id: "playful", label: "Playful", quadrant: "highPleasantHighEnergy" },
  { id: "grateful", label: "Grateful", quadrant: "highPleasantLowEnergy" },
  { id: "calm", label: "Calm", quadrant: "highPleasantLowEnergy" },
  { id: "content", label: "Content", quadrant: "highPleasantLowEnergy" },
  { id: "relieved", label: "Relieved", quadrant: "highPleasantLowEnergy" },
  { id: "peaceful", label: "Peaceful", quadrant: "highPleasantLowEnergy" },
  { id: "anxious", label: "Anxious", quadrant: "lowPleasantHighEnergy" },
  { id: "angry", label: "Angry", quadrant: "lowPleasantHighEnergy" },
  { id: "overwhelmed", label: "Overwhelmed", quadrant: "lowPleasantHighEnergy" },
  { id: "restless", label: "Restless", quadrant: "lowPleasantHighEnergy" },
  { id: "frustrated", label: "Frustrated", quadrant: "lowPleasantHighEnergy" },
  { id: "sad", label: "Sad", quadrant: "lowPleasantLowEnergy" },
  { id: "lonely", label: "Lonely", quadrant: "lowPleasantLowEnergy" },
  { id: "tired", label: "Tired", quadrant: "lowPleasantLowEnergy" },
  { id: "discouraged", label: "Discouraged", quadrant: "lowPleasantLowEnergy" },
  { id: "numb", label: "Numb", quadrant: "lowPleasantLowEnergy" }
];

export const sensationTags = [
  "Tight chest",
  "Heavy shoulders",
  "Restless",
  "Fluttering stomach",
  "Headache",
  "Drained",
  "Tense jaw"
];

export const contextTags = [
  "Sleep",
  "Study stress",
  "Social",
  "Family",
  "Work",
  "Exercise",
  "Food",
  "Caffeine",
  "Weather",
  "Commute",
  "Loneliness",
  "Exam",
  "Productivity",
  "Overwhelm"
];
