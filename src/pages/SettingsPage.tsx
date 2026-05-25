import { Button } from "../components/primitives/Button";
import { Card } from "../components/primitives/Card";
import { PageHeader } from "../components/primitives/PageHeader";
import { clearEntries, clearForecastHistory, writeSettings } from "../lib/storage";
import { downloadExport } from "../lib/export";
import type { AppSettings, MoodEntry } from "../types";
import { Link } from "../components/navigation/Link";

interface SettingsPageProps {
  entries: MoodEntry[];
  settings: AppSettings;
  onEntriesChange: () => void;
  onSettingsChange: () => void;
}

export function SettingsPage({ entries, settings, onEntriesChange, onSettingsChange }: SettingsPageProps) {
  function updateSettings(next: AppSettings) {
    writeSettings(next);
    onSettingsChange();
  }

  return (
    <>
      <PageHeader eyebrow="Settings" title="Privacy and control">
        Export, delete, and adjust your experience without pressure.
      </PageHeader>
      <section className="settings-grid">
        <Card>
          <h2>Data</h2>
          <p>Your mood history is stored locally in this browser for the MVP.</p>
          <div className="button-row">
            <Button variant="secondary" onClick={() => downloadExport(entries)}>Export data</Button>
            <Button
              variant="danger"
              onClick={() => {
                clearEntries();
                onEntriesChange();
              }}
            >
              Delete all data
            </Button>
            <Button variant="ghost" onClick={clearForecastHistory}>Clear forecast history</Button>
          </div>
        </Card>
        <Card>
          <h2>Preferences</h2>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.analyticsEnabled}
              onChange={(event) => updateSettings({ ...settings, analyticsEnabled: event.target.checked })}
            />
            <span>Enable analytics</span>
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(event) => updateSettings({ ...settings, reducedMotion: event.target.checked })}
            />
            <span>Reduce motion</span>
          </label>
        </Card>
        <Card>
          <h2>Support</h2>
          <p>Need urgent support or want to understand the safety language?</p>
          <Link href="/help-now" className="button button-secondary">Need help now?</Link>
        </Card>
      </section>
    </>
  );
}
