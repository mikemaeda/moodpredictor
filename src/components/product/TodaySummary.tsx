import type { MoodEntry } from "../../types";
import { formatEntryDate, scoreEntry } from "../../lib/mood";
import { Card } from "../primitives/Card";
import { Link } from "../navigation/Link";

export function TodaySummary({ entry }: { entry?: MoodEntry }) {
  if (!entry) {
    return (
      <Card className="summary-card empty-summary">
        <p className="eyebrow">Today</p>
        <h2>No check-in yet</h2>
        <p>A quick check-in is enough to start today gently.</p>
        <Link href="/app/check-in" className="button button-secondary">Start check-in</Link>
      </Card>
    );
  }

  return (
    <Card className="summary-card">
      <p className="eyebrow">Today</p>
      <h2>{entry.primaryEmotion}</h2>
      <p>
        {scoreEntry(entry)}/100 mood score. Logged {formatEntryDate(entry.createdAt)}.
      </p>
    </Card>
  );
}
