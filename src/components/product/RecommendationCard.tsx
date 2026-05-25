import type { RecommendationTool } from "../../types";
import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";

interface RecommendationCardProps {
  tool: RecommendationTool;
  onSwap?: () => void;
  onSkip?: () => void;
}

export function RecommendationCard({ tool, onSwap, onSkip }: RecommendationCardProps) {
  return (
    <Card className="recommendation-card">
      <p className="eyebrow">Suggested tool</p>
      <h2>{tool.title}</h2>
      <p>{tool.why}</p>
      <p className="duration">Takes {tool.duration}</p>
      <ol className="step-list">
        {tool.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="button-row">
        {onSwap ? <Button variant="secondary" onClick={onSwap}>Swap</Button> : null}
        {onSkip ? <Button variant="ghost" onClick={onSkip}>Skip</Button> : null}
      </div>
    </Card>
  );
}
