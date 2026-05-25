import { Footer } from "../components/layout/Footer";
import { Link } from "../components/navigation/Link";
import { Card } from "../components/primitives/Card";
import { PageHeader } from "../components/primitives/PageHeader";

export function HelpNowPage() {
  return (
    <div className="public-doc">
      <Link href="/" className="brand-link"><span className="brand-glyph">MC</span><span>Mood Compass</span></Link>
      <PageHeader eyebrow="Need help now?" title="Reach out now if you might be unsafe">
        You deserve support from real people, especially in urgent moments.
      </PageHeader>
      <Card className="safety-panel">
        <h2>Immediate support</h2>
        <p>If you may hurt yourself or someone else, call emergency services now.</p>
        <p>In the U.S., call or text 988 for the Suicide & Crisis Lifeline.</p>
        <p>Outside the U.S., use your local emergency number or a trusted local crisis service.</p>
        <p>Mood Compass is not medical care. A licensed professional can provide support this app cannot.</p>
      </Card>
      <Footer />
    </div>
  );
}
