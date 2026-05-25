export type Quadrant =
  | "highPleasantHighEnergy"
  | "highPleasantLowEnergy"
  | "lowPleasantHighEnergy"
  | "lowPleasantLowEnergy";

export type Intensity = "soft" | "medium" | "strong";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface EmotionOption {
  id: string;
  label: string;
  quadrant: Quadrant;
}

export interface MoodEntry {
  id: string;
  createdAt: string;
  pleasantness: number;
  energy: number;
  quadrant: Quadrant;
  primaryEmotion: string;
  secondaryEmotion?: string;
  customEmotion?: string;
  intensity?: Intensity;
  sensations: string[];
  contextTags: string[];
  note?: string;
  voiceNotePlaceholder?: boolean;
  recommendationId?: string;
}

export interface RecommendationTool {
  id: string;
  title: string;
  match: Quadrant[];
  energy: "low" | "medium" | "high" | "any";
  duration: string;
  why: string;
  steps: string[];
}

export interface PatternCardData {
  id: string;
  title: string;
  body: string;
  strength: "early" | "noticing" | "consistent";
}

export interface Forecast {
  status: "not-enough-data" | "ready";
  confidence: "low" | "moderate";
  message: string;
  factors: string[];
  generatedAt: string;
}

export interface AppSettings {
  analyticsEnabled: boolean;
  reducedMotion: boolean;
}
