import { Heatmap } from "../components/product/Heatmap";
import { Link } from "../components/navigation/Link";
import { Card } from "../components/primitives/Card";
import { PageHeader } from "../components/primitives/PageHeader";
import { formatEntryDate, scoreEntry } from "../lib/mood";
import type { MoodEntry } from "../types";

export function HistoryPage({ entries }: { entries: MoodEntry[] }) {
  return (
    <>
      <PageHeader eyebrow="History" title="Your mood timeline">
        A private record of what you chose to save in this browser.
      </PageHeader>
      <Card className="heatmap-card">
        <Heatmap entries={entries} />
      </Card>
      <section className="timeline" aria-label="Mood entries">
        {entries.length ? entries.map((entry) => (
          <Card key={entry.id} as="article" className="timeline-item">
            <div>
              <p className="eyebrow">{formatEntryDate(entry.createdAt)}</p>
              <h2>{entry.primaryEmotion}</h2>
              <p>{scoreEntry(entry)}/100 mood score. {entry.note}</p>
            </div>
            <div className="tag-row">
              {entry.contextTags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              {entry.sensations.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </Card>
        )) : (
          <Card className="empty-state-card">
            <p className="eyebrow">Empty history</p>
            <h2>No entries yet</h2>
            <p>Your first check-in will appear here with tags, notes, and patterns over time.</p>
            <Link href="/app/check-in" className="button button-primary">Create first entry</Link>
          </Card>
        )}
      </section>
    </>
  );
}
