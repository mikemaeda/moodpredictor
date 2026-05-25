import { recommendationTools } from "../data/recommendations";
import type { MoodEntry, RecommendationTool } from "../types";

function energyBand(energy: number): RecommendationTool["energy"] {
  if (energy <= 4) return "low";
  if (energy >= 7) return "high";
  return "medium";
}

export function getRecommendedTools(entry: Pick<MoodEntry, "quadrant" | "energy">): RecommendationTool[] {
  const band = energyBand(entry.energy);
  const matches = recommendationTools.filter((tool) => {
    const quadrantMatches = tool.match.includes(entry.quadrant);
    const energyMatches = tool.energy === "any" || tool.energy === band;
    return quadrantMatches && energyMatches;
  });

  return matches.length ? matches : recommendationTools.filter((tool) => tool.match.includes(entry.quadrant));
}

export function getPrimaryRecommendation(entry: Pick<MoodEntry, "quadrant" | "energy">): RecommendationTool {
  return getRecommendedTools(entry)[0] ?? recommendationTools[0];
}

export function swapRecommendation(currentId: string, entry: Pick<MoodEntry, "quadrant" | "energy">): RecommendationTool {
  const tools = getRecommendedTools(entry);
  const index = tools.findIndex((tool) => tool.id === currentId);
  return tools[(index + 1 + tools.length) % tools.length] ?? recommendationTools[0];
}
