import { completeOnboarding } from "../lib/storage";
import { Link } from "../components/navigation/Link";
import { Button } from "../components/primitives/Button";
import { Card } from "../components/primitives/Card";

export function OnboardingPage() {
  return (
    <main className="onboarding-page">
      <section className="onboarding-card">
        <p className="eyebrow">Welcome</p>
        <h1>Build a kinder record of your moods.</h1>
        <div className="onboarding-grid">
          <Card><h2>Quick check-ins</h2><p>Use a pleasantness by energy map to capture the moment without overthinking.</p></Card>
          <Card><h2>Pattern tracking</h2><p>Optional tags help you notice sleep, study stress, movement, social time, and more.</p></Card>
          <Card><h2>Useful recommendations</h2><p>Small tools are matched to your state and always skippable.</p></Card>
          <Card><h2>Privacy first</h2><p>Data stays local for the MVP. Export and delete are always available.</p></Card>
        </div>
        <p className="disclaimer">Mood Compass is not a diagnosis app or substitute for professional care.</p>
        <Link href="/app/check-in" onClick={() => completeOnboarding()} className="button button-primary">Begin first check-in</Link>
      </section>
    </main>
  );
}
