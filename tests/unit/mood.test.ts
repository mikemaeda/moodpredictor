import { describe, expect, it } from "vitest";
import { getQuadrant, scoreEntry } from "../../src/lib/mood";

describe("mood logic", () => {
  it("classifies mood map quadrants", () => {
    expect(getQuadrant(8, 8)).toBe("highPleasantHighEnergy");
    expect(getQuadrant(8, 3)).toBe("highPleasantLowEnergy");
    expect(getQuadrant(3, 8)).toBe("lowPleasantHighEnergy");
    expect(getQuadrant(3, 3)).toBe("lowPleasantLowEnergy");
  });

  it("scores pleasantness and energy transparently", () => {
    expect(scoreEntry({ pleasantness: 8, energy: 6 })).toBe(70);
  });
});
