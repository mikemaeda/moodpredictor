import { describe, expect, it } from "vitest";
import { seedEntries } from "../../src/data/seed";
import { buildForecast } from "../../src/lib/forecast";

describe("forecast logic", () => {
  it("does not forecast before enough history exists", () => {
    const forecast = buildForecast(seedEntries.slice(0, 2));
    expect(forecast.status).toBe("not-enough-data");
    expect(forecast.message).toMatch(/Not enough history/i);
  });

  it("creates explainable forecasts after enough history", () => {
    const forecast = buildForecast([...seedEntries, ...seedEntries.map((entry, index) => ({ ...entry, id: `${entry.id}-more-${index}` }))]);
    expect(forecast.status).toBe("ready");
    expect(forecast.factors.length).toBeGreaterThan(0);
  });
});
