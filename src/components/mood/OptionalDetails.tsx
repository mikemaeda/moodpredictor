import { contextTags, sensationTags } from "../../data/emotions";
import type { Intensity } from "../../types";
import { Chip } from "../primitives/Chip";

interface OptionalDetailsProps {
  intensity?: Intensity;
  sensations: string[];
  context: string[];
  note: string;
  voiceNotePlaceholder: boolean;
  onIntensity: (value: Intensity | undefined) => void;
  onSensations: (values: string[]) => void;
  onContext: (values: string[]) => void;
  onNote: (value: string) => void;
  onVoiceNotePlaceholder: (value: boolean) => void;
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function OptionalDetails({
  intensity,
  sensations,
  context,
  note,
  voiceNotePlaceholder,
  onIntensity,
  onSensations,
  onContext,
  onNote,
  onVoiceNotePlaceholder
}: OptionalDetailsProps) {
  return (
    <details className="details-panel">
      <summary>Add optional details</summary>
      <div className="field">
        <span>Intensity</span>
        <div className="chip-grid">
          {(["soft", "medium", "strong"] as Intensity[]).map((value) => (
            <Chip key={value} selected={intensity === value} onClick={() => onIntensity(intensity === value ? undefined : value)}>
              {value}
            </Chip>
          ))}
        </div>
      </div>
      <div className="field">
        <span>Physical sensations</span>
        <div className="chip-grid">
          {sensationTags.map((tag) => (
            <Chip key={tag} selected={sensations.includes(tag)} onClick={() => onSensations(toggleValue(sensations, tag))}>
              {tag}
            </Chip>
          ))}
        </div>
      </div>
      <div className="field">
        <span>Context</span>
        <div className="chip-grid">
          {contextTags.map((tag) => (
            <Chip key={tag} selected={context.includes(tag)} onClick={() => onContext(toggleValue(context, tag))}>
              {tag}
            </Chip>
          ))}
        </div>
      </div>
      <label className="field">
        <span>Note</span>
        <textarea value={note} onChange={(event) => onNote(event.target.value)} maxLength={280} rows={4} />
      </label>
      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={voiceNotePlaceholder}
          onChange={(event) => onVoiceNotePlaceholder(event.target.checked)}
        />
        <span>Save a voice note placeholder for later</span>
      </label>
    </details>
  );
}
