import type { MoodEntry } from "../../types";
import { scoreEntry } from "../../lib/mood";

export function Heatmap({ entries }: { entries: MoodEntry[] }) {
  const byDate = new Map(entries.map((entry) => [entry.createdAt.slice(0, 10), scoreEntry(entry)]));
  const today = new Date();
  const days = Array.from({ length: 70 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (69 - index));
    const key = date.toISOString().slice(0, 10);
    return { key, score: byDate.get(key) };
  });

  if (!entries.length) {
    return (
      <section aria-labelledby="heatmap-title">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Mood pixels</p>
            <h2 id="heatmap-title">No saved days yet</h2>
          </div>
        </div>
        <div className="heatmap-empty" role="status">
          <span />
          <p>Your check-ins will slowly fill this space. One entry is enough to begin.</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="heatmap-title">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Year in pixels preview</p>
          <h2 id="heatmap-title">Recent mood pixels</h2>
        </div>
      </div>
      <div className="heatmap" role="img" aria-label="Recent mood check-ins shown as colored pixels">
        {days.map((day) => (
          <span
            key={day.key}
            className="heat-dot"
            data-level={day.score ? Math.ceil(day.score / 25) : 0}
            title={day.score ? `${day.key}: ${day.score}/100` : `${day.key}: no check-in`}
          />
        ))}
      </div>
    </section>
  );
}
