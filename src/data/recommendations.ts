import type { RecommendationTool } from "../types";

export const recommendationTools: RecommendationTool[] = [
  {
    id: "extended-exhale",
    title: "1-minute extended-exhale breathing",
    match: ["lowPleasantHighEnergy"],
    energy: "high",
    duration: "1 min",
    why: "A longer exhale can help downshift an activated, pressured state.",
    steps: ["Inhale for 3 counts.", "Exhale for 5 counts.", "Repeat gently for one minute."]
  },
  {
    id: "grounding",
    title: "Short grounding exercise",
    match: ["lowPleasantHighEnergy", "lowPleasantLowEnergy"],
    energy: "any",
    duration: "2 min",
    why: "Grounding redirects attention toward concrete sensory information.",
    steps: ["Name five things you can see.", "Name four things you can feel.", "Choose one steady next action."]
  },
  {
    id: "reframe",
    title: "Brief reframe prompt",
    match: ["lowPleasantHighEnergy"],
    energy: "medium",
    duration: "3 min",
    why: "Reframing can create a little space between a thought and a reaction.",
    steps: ["Write the stressful thought.", "Ask what else might be true.", "Pick the kindest useful next sentence."]
  },
  {
    id: "self-compassion",
    title: "Self-compassion reflection",
    match: ["lowPleasantLowEnergy"],
    energy: "low",
    duration: "2 min",
    why: "Low-energy moods often need care before problem solving.",
    steps: ["Put a hand somewhere comfortable.", "Say what feels hard.", "Offer yourself one sentence you would give a friend."]
  },
  {
    id: "tiny-walk",
    title: "Tiny walk challenge",
    match: ["lowPleasantLowEnergy", "highPleasantLowEnergy"],
    energy: "low",
    duration: "5 min",
    why: "Light movement can shift energy without demanding a full workout.",
    steps: ["Walk to the door or outside.", "Notice temperature and light.", "Stop while it still feels doable."]
  },
  {
    id: "trusted-text",
    title: "Text someone you trust",
    match: ["lowPleasantLowEnergy", "lowPleasantHighEnergy"],
    energy: "any",
    duration: "2 min",
    why: "Support and connection can soften isolation and pressure.",
    steps: ["Pick one safe person.", "Send a short honest text.", "No need to explain everything at once."]
  },
  {
    id: "savoring",
    title: "Savoring prompt",
    match: ["highPleasantHighEnergy", "highPleasantLowEnergy"],
    energy: "any",
    duration: "2 min",
    why: "Savoring helps your brain register what is already going well.",
    steps: ["Name one good detail.", "Stay with it for ten breaths.", "Write one sentence about why it matters."]
  },
  {
    id: "gratitude",
    title: "Gratitude note",
    match: ["highPleasantLowEnergy", "highPleasantHighEnergy"],
    energy: "any",
    duration: "3 min",
    why: "Gratitude practice can strengthen attention to supportive details.",
    steps: ["Choose one person, place, or moment.", "Write what it gave you.", "Let it be small and specific."]
  }
];
