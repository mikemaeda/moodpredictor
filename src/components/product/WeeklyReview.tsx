import { Card } from "../primitives/Card";

export function WeeklyReview({ summary }: { summary: string }) {
  return (
    <Card className="weekly-review">
      <p className="eyebrow">Weekly review</p>
      <h2>A kind look back</h2>
      <p>{summary}</p>
    </Card>
  );
}
