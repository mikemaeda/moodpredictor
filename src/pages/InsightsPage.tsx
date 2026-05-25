import { ForecastCard } from "../components/product/ForecastCard";
import { PatternCard } from "../components/product/PatternCard";
import { WeeklyReview } from "../components/product/WeeklyReview";
import { Card } from "../components/primitives/Card";
import { PageHeader } from "../components/primitives/PageHeader";
import { buildForecast, buildPatterns, buildWeeklyReview } from "../lib/forecast";
import { average, getDominantEmotion } from "../lib/mood";
import type { MoodEntry } from "../types";

export function InsightsPage({ entries }: { entries: MoodEntry[] }) {
  const forecast = buildForecast(entries);
  const patterns = buildPatterns(entries);
  const pleasantness = average(entries.map((entry) => entry.pleasantness)).toFixed(1);
  const energy = average(entries.map((entry) => entry.energy)).toFixed(1);

  return (
    <>
      <PageHeader eyebrow="Insights" title="Patterns, carefully">
        Insights are personal signals from your history, not proof or diagnosis.
      </PageHeader>
      <ForecastCard forecast={forecast} />
      <section className="stats-grid" aria-label="Mood averages">
        <Card><p className="eyebrow">Average pleasantness</p><h2>{pleasantness}/10</h2></Card>
        <Card><p className="eyebrow">Average energy</p><h2>{energy}/10</h2></Card>
        <Card><p className="eyebrow">Common emotion</p><h2>{getDominantEmotion(entries)}</h2></Card>
      </section>
      <WeeklyReview summary={buildWeeklyReview(entries)} />
      <section className="card-grid">
        {patterns.map((pattern) => <PatternCard key={pattern.id} pattern={pattern} />)}
      </section>
    </>
  );
}
