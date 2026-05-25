import { emotionOptions, quadrantLabels } from "../../data/emotions";
import type { Quadrant } from "../../types";
import { Chip } from "../primitives/Chip";

interface EmotionPickerProps {
  quadrant: Quadrant;
  primaryEmotion: string;
  secondaryEmotion?: string;
  customEmotion: string;
  onPrimary: (emotion: string) => void;
  onSecondary: (emotion: string | undefined) => void;
  onCustom: (emotion: string) => void;
}

export function EmotionPicker({
  quadrant,
  primaryEmotion,
  secondaryEmotion,
  customEmotion,
  onPrimary,
  onSecondary,
  onCustom
}: EmotionPickerProps) {
  const options = emotionOptions.filter((emotion) => emotion.quadrant === quadrant);

  return (
    <section className="flow-section emotion-section" aria-labelledby="emotion-title">
      <div className="compact-section-header">
        <div>
          <p className="eyebrow">{quadrantLabels[quadrant]}</p>
          <h2 id="emotion-title">Closest emotion</h2>
        </div>
        <span>{primaryEmotion}</span>
      </div>
      <div className="chip-grid compact-chip-grid" aria-label="Primary emotions">
        {options.map((emotion) => (
          <Chip
            key={emotion.id}
            selected={primaryEmotion === emotion.label}
            onClick={() => onPrimary(emotion.label)}
          >
            {emotion.label}
          </Chip>
        ))}
      </div>
      <details className="inline-details">
        <summary>Add secondary emotion or custom word</summary>
        <label className="field">
          <span>Optional secondary emotion</span>
          <div className="chip-grid compact-chip-grid">
            {options.map((emotion) => (
              <Chip
                key={`secondary-${emotion.id}`}
                selected={secondaryEmotion === emotion.label}
                onClick={() => onSecondary(secondaryEmotion === emotion.label ? undefined : emotion.label)}
              >
                {emotion.label}
              </Chip>
            ))}
          </div>
        </label>
        <label className="field">
          <span>Custom emotion word</span>
          <input value={customEmotion} onChange={(event) => onCustom(event.target.value)} maxLength={32} />
        </label>
      </details>
    </section>
  );
}
