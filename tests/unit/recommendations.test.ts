import { describe, expect, it } from "vitest";
import { getRecommendedTools } from "../../src/lib/recommendations";

describe("recommendation logic", () => {
  it("matches activated low-pleasant moods with calming tools", () => {
    const tools = getRecommendedTools({ quadrant: "lowPleasantHighEnergy", energy: 8 });
    expect(tools.map((tool) => tool.id)).toContain("extended-exhale");
  });
});
