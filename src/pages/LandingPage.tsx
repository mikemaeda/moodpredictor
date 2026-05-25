import { Footer } from "../components/layout/Footer";
import { Link } from "../components/navigation/Link";
import { Card } from "../components/primitives/Card";

export function LandingPage() {
  return (
    <div className="marketing-page">
      <header className="marketing-nav">
        <Link href="/" className="brand-link">
          <span className="brand-glyph">MC</span>
          <span>Mood Compass</span>
        </Link>
        <nav>
          <Link href="/privacy">Privacy</Link>
          <Link href="/forecasting">Forecasting</Link>
          <Link href="/app">Open app</Link>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Mood tracking that feels human</p>
            <h1>Check in without overthinking it.</h1>
            <p>
              Mood Compass helps you name your current state, notice patterns over time, and choose a small next step without turning your mood into homework.
            </p>
            <div className="button-row">
              <Link href="/onboarding" className="button button-primary">Try a 10-second check-in</Link>
              <Link href="/app" className="button button-secondary">View dashboard</Link>
            </div>
            <ul className="hero-points" aria-label="Mood Compass benefits">
              <li>Local-first by default</li>
              <li>Optional depth, never forced</li>
              <li>Transparent forecasts only after enough history</li>
            </ul>
          </div>
          <div className="product-preview" aria-label="Mood Compass app preview">
            <div className="preview-window">
              <div className="showcase-header">
                <span>Today</span>
                <strong>private</strong>
              </div>
              <h2>Choose the closest state</h2>
              <div className="preview-state-list">
                <div className="preview-state active"><strong>Steady</strong><span>clear, calm, grounded</span></div>
                <div className="preview-state"><strong>Stressed</strong><span>pressured, tense, activated</span></div>
                <div className="preview-state"><strong>Low</strong><span>tired, sad, withdrawn</span></div>
              </div>
              <div className="preview-insight">
                <p className="eyebrow">Pattern</p>
                <p>Sleep and study stress appear near lower evening energy.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="landing-band" aria-label="How Mood Compass works">
          <div>
            <p className="eyebrow">Built for real use</p>
            <h2>A fuller check-in when you want it, a fast one when you do not.</h2>
          </div>
          <div className="feature-grid">
          <Card><h2>Choose by recognition</h2><p>Plain mood states make the first tap fast. The compass logic still works quietly underneath.</p></Card>
          <Card><h2>Local by default</h2><p>Your MVP data stays in your browser. Sync and analytics are opt-in concepts, not defaults.</p></Card>
          <Card><h2>Transparent forecasts</h2><p>No fake AI. Forecasts use rolling averages and patterns only after enough history exists.</p></Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
