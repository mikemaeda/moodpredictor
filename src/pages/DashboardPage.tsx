import { Link } from "../components/navigation/Link";
import { Heatmap } from "../components/product/Heatmap";
import { PatternCard } from "../components/product/PatternCard";
import { TodaySummary } from "../components/product/TodaySummary";
import { WeeklyReview } from "../components/product/WeeklyReview";
import { Card } from "../components/primitives/Card";
import { PageHeader } from "../components/primitives/PageHeader";
import { buildPatterns, buildWeeklyReview } from "../lib/forecast";
import type { MoodEntry } from "../types";

export function DashboardPage({ entries }: { entries: MoodEntry[] }) {
  const today = entries.find((entry) => entry.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10));
  const gentleStreak = new Set(entries.slice(0, 14).map((entry) => entry.createdAt.slice(0, 10))).size;
  const patterns = buildPatterns(entries).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow="Dashboard" title="A calm overview">
        Your dashboard is here to notice patterns, not judge streaks.
      </PageHeader>
      <section className="dashboard-grid dashboard-hero" aria-label="Dashboard summary">
        <TodaySummary entry={today} />
        <Card className="summary-card">
          <p className="eyebrow">Gentle streak</p>
          <h2>{gentleStreak} recent check-in days</h2>
          <p>No shame if the number drops. This is a support tool, not a scoreboard.</p>
          <Link href="/app/check-in" className="button button-primary">Check in</Link>
        </Card>
      </section>
      <WeeklyReview summary={buildWeeklyReview(entries)} />
      <section className="card-grid aligned-card-grid" aria-label="Pattern cards">
        {patterns.map((pattern) => <PatternCard key={pattern.id} pattern={pattern} />)}
      </section>
      <Card className="heatmap-card">
        <Heatmap entries={entries} />
      </Card>
    </>
  );
}
