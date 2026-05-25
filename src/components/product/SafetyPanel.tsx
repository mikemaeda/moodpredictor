import { Link } from "../navigation/Link";
import { Card } from "../primitives/Card";

export function SafetyPanel() {
  return (
    <Card className="safety-panel" role="status">
      <p className="eyebrow">Support matters</p>
      <h2>You do not have to handle this alone</h2>
      <p>
        If you may hurt yourself or someone else, call emergency services now. In the U.S.,
        you can call or text 988 for the Suicide & Crisis Lifeline.
      </p>
      <p>
        Mood Compass is not a substitute for a licensed professional. Reaching out to a trusted person or professional care is a strong next step.
      </p>
      <Link href="/help-now" className="text-link">Open help resources</Link>
    </Card>
  );
}
