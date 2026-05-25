import type { ReactNode } from "react";
import { Link } from "../navigation/Link";
import { Footer } from "./Footer";

const navItems = [
  ["/app", "Dashboard"],
  ["/app/check-in", "Check in"],
  ["/app/history", "History"],
  ["/app/insights", "Insights"],
  ["/app/tools", "Tools"],
  ["/app/settings", "Settings"]
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const currentPath = window.location.pathname;

  return (
    <div className="app-layout">
      <aside className="side-nav" aria-label="Primary">
        <Link href="/" className="brand-link">
          <span className="brand-glyph">MC</span>
          <span>Mood Compass</span>
        </Link>
        <nav>
          {navItems.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              aria-current={currentPath === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="content-wrap">
        <main className="page-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
