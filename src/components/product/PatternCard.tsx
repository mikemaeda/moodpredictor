import type { PatternCardData } from "../../types";
import { Card } from "../primitives/Card";
import { Tag } from "../primitives/Tag";

export function PatternCard({ pattern }: { pattern: PatternCardData }) {
  return (
    <Card as="article" className="pattern-card">
      <div className="section-heading-row">
        <h3>{pattern.title}</h3>
        <Tag>{pattern.strength}</Tag>
      </div>
      <p>{pattern.body}</p>
    </Card>
  );
}
