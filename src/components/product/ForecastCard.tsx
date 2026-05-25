import type { Forecast } from "../../types";
import { Card } from "../primitives/Card";
import { Tag } from "../primitives/Tag";

export function ForecastCard({ forecast }: { forecast: Forecast }) {
  return (
    <Card className="forecast-card" aria-live="polite">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Gentle forecast</p>
          <h2>{forecast.status === "ready" ? "Personal forecast" : "Not enough history yet"}</h2>
        </div>
        <Tag>{forecast.confidence} confidence</Tag>
      </div>
      <p>{forecast.message}</p>
      <ul className="plain-list">
        {forecast.factors.map((factor) => (
          <li key={factor}>{factor}</li>
        ))}
      </ul>
    </Card>
  );
}
