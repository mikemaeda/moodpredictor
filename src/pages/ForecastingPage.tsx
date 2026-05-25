import { Footer } from "../components/layout/Footer";
import { Link } from "../components/navigation/Link";
import { Card } from "../components/primitives/Card";
import { PageHeader } from "../components/primitives/PageHeader";

export function ForecastingPage() {
  return (
    <div className="public-doc">
      <Link href="/" className="brand-link"><span className="brand-glyph">MC</span><span>Mood Compass</span></Link>
      <PageHeader eyebrow="Forecasting" title="How gentle forecasting works">
        No fake AI, no certainty claims, and no diagnosis.
      </PageHeader>
      <Card>
        <h2>When it turns on</h2>
        <p>Mood Compass waits until you have at least 8 check-ins across at least 3 days.</p>
        <h2>What it uses</h2>
        <p>It looks at rolling averages, recent energy and pleasantness, time of day, day patterns, and repeated context tags.</p>
        <h2>What it shows</h2>
        <p>Forecasts are labeled as low or moderate confidence and include the factors that influenced them.</p>
      </Card>
      <Footer />
    </div>
  );
}
