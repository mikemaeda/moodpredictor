import { RecommendationCard } from "../components/product/RecommendationCard";
import { PageHeader } from "../components/primitives/PageHeader";
import { recommendationTools } from "../data/recommendations";

export function ToolsPage() {
  return (
    <>
      <PageHeader eyebrow="Tools" title="Small supports you can actually use">
        Every tool is short, skippable, and matched to a mood state.
      </PageHeader>
      <section className="card-grid">
        {recommendationTools.map((tool) => <RecommendationCard key={tool.id} tool={tool} />)}
      </section>
    </>
  );
}
