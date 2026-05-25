import { ForecastCard } from "../components/product/ForecastCard";
import { Heatmap } from "../components/product/Heatmap";
import { PatternCard } from "../components/product/PatternCard";
import { RecommendationCard } from "../components/product/RecommendationCard";
import { SafetyPanel } from "../components/product/SafetyPanel";
import { PageHeader } from "../components/primitives/PageHeader";
import { recommendationTools } from "../data/recommendations";
import { seedEntries } from "../data/seed";
import { buildForecast, buildPatterns } from "../lib/forecast";
import type { MoodEntry } from "../types";

export function PreviewPage({ entries }: { entries: MoodEntry[] }) {
  const previewEntries = entries.length ? entries : seedEntries;
  const forecast = buildForecast([...previewEntries, ...seedEntries]);
  const patterns = buildPatterns(previewEntries);

  return (
    <>
      <PageHeader eyebrow="Preview" title="Component preview">
        A lightweight route for portfolio screenshots and visual review.
      </PageHeader>
      <section className="preview-stack">
        <ForecastCard forecast={forecast} />
        <RecommendationCard tool={recommendationTools[0]} />
        <SafetyPanel />
        <Heatmap entries={previewEntries} />
        <section className="card-grid">
          {patterns.map((pattern) => <PatternCard key={pattern.id} pattern={pattern} />)}
        </section>
      </section>
    </>
  );
}
