import { getQuadrant } from "../../lib/mood";

interface MoodMapProps {
  pleasantness: number;
  energy: number;
  onChange: (pleasantness: number, energy: number) => void;
}

const moodStates = [
  {
    id: "good",
    title: "Good",
    subtitle: "positive, available, moving",
    pleasantness: 8,
    energy: 7
  },
  {
    id: "steady",
    title: "Steady",
    subtitle: "clear, calm, grounded",
    pleasantness: 7,
    energy: 4
  },
  {
    id: "stressed",
    title: "Stressed",
    subtitle: "pressured, tense, activated",
    pleasantness: 3,
    energy: 8
  },
  {
    id: "low",
    title: "Low",
    subtitle: "tired, sad, withdrawn",
    pleasantness: 3,
    energy: 3
  },
  {
    id: "mixed",
    title: "Mixed",
    subtitle: "unclear, changing, in-between",
    pleasantness: 5,
    energy: 5,
  }
];

export function MoodMap({ pleasantness, energy, onChange }: MoodMapProps) {
  const selectedState = moodStates.find((state) => state.pleasantness === pleasantness && state.energy === energy);

  return (
    <section className="mood-map-card" aria-labelledby="mood-map-title">
      <div className="map-title-row">
        <div>
          <p className="eyebrow">Mood check</p>
          <h2 id="mood-map-title">Choose the closest state</h2>
        </div>
        <span className="map-readout" aria-live="polite">
          {selectedState?.title ?? "Custom"}
        </span>
      </div>
      <div className="mood-state-grid" role="group" aria-label="Quick mood states">
        {moodStates.map((state) => {
          const selected = state.pleasantness === pleasantness && state.energy === energy;
          return (
            <button
              key={state.id}
              type="button"
              className={`mood-state-card ${selected ? "mood-state-selected" : ""} ${getQuadrant(state.pleasantness, state.energy)}`}
              aria-label={`${state.title}. Pleasantness ${state.pleasantness}, energy ${state.energy}. ${state.subtitle}`}
              aria-pressed={selected}
              onClick={() => onChange(state.pleasantness, state.energy)}
            >
              <span className="state-meter" aria-hidden="true">
                <i style={{ height: `${state.pleasantness * 8}%` }} />
                <i style={{ height: `${state.energy * 8}%` }} />
              </span>
              <span className="mood-state-copy">
                <strong>{state.title}</strong>
                <small>{state.subtitle}</small>
              </span>
            </button>
          );
        })}
      </div>
      <p className="state-helper">
        Behind the scenes, Mood Compass still tracks pleasantness and energy. You do not have to think in numbers.
      </p>
    </section>
  );
}
