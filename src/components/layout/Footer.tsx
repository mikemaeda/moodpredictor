import { Link } from "../navigation/Link";

export function Footer() {
  return (
    <footer className="footer">
      <span>Mood Compass is not a diagnosis app.</span>
      <Link href="/privacy">Privacy</Link>
      <Link href="/forecasting">How forecasting works</Link>
      <Link href="/help-now">Need help now?</Link>
    </footer>
  );
}
