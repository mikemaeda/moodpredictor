import { Footer } from "../components/layout/Footer";
import { Link } from "../components/navigation/Link";
import { Card } from "../components/primitives/Card";
import { PageHeader } from "../components/primitives/PageHeader";

export function PrivacyPage() {
  return (
    <div className="public-doc">
      <Link href="/" className="brand-link"><span className="brand-glyph">MC</span><span>Mood Compass</span></Link>
      <PageHeader eyebrow="Privacy" title="Plain-English privacy">
        Mood Compass is designed local-first for the MVP.
      </PageHeader>
      <Card>
        <h2>What is stored</h2>
        <p>Your saved mood entries, tags, notes, and settings are stored in your browser local storage.</p>
        <h2>What is not sent</h2>
        <p>This MVP does not send your mood data to a server. Analytics are off by default.</p>
        <h2>Your controls</h2>
        <p>You can export your data or delete all local data from settings at any time.</p>
      </Card>
      <Footer />
    </div>
  );
}
