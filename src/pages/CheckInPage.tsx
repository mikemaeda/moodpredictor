import { useMemo, useState } from "react";
import { EmotionPicker } from "../components/mood/EmotionPicker";
import { MoodMap } from "../components/mood/MoodMap";
import { OptionalDetails } from "../components/mood/OptionalDetails";
import { Link } from "../components/navigation/Link";
import { RecommendationCard } from "../components/product/RecommendationCard";
import { SafetyPanel } from "../components/product/SafetyPanel";
import { Button } from "../components/primitives/Button";
import { PageHeader } from "../components/primitives/PageHeader";
import { emotionOptions } from "../data/emotions";
import { addEntry } from "../lib/storage";
import { detectsCrisisLanguage } from "../lib/safety";
import { getQuadrant } from "../lib/mood";
import { getPrimaryRecommendation, getRecommendedTools } from "../lib/recommendations";
import type { Intensity, MoodEntry } from "../types";

export function CheckInPage({ onSaved }: { onSaved: () => void }) {
  const [pleasantness, setPleasantness] = useState(5);
  const [energy, setEnergy] = useState(5);
  const quadrant = getQuadrant(pleasantness, energy);
  const firstEmotion = emotionOptions.find((emotion) => emotion.quadrant === quadrant)?.label ?? "Mixed";
  const [primaryEmotion, setPrimaryEmotion] = useState(firstEmotion);
  const [secondaryEmotion, setSecondaryEmotion] = useState<string | undefined>();
  const [customEmotion, setCustomEmotion] = useState("");
  const [intensity, setIntensity] = useState<Intensity | undefined>();
  const [sensations, setSensations] = useState<string[]>([]);
  const [contextTags, setContextTags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [voiceNotePlaceholder, setVoiceNotePlaceholder] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recommendationId, setRecommendationId] = useState<string | undefined>();
  const safetyTriggered = detectsCrisisLanguage(note);

  const draft = useMemo<MoodEntry>(() => ({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    pleasantness,
    energy,
    quadrant,
    primaryEmotion: customEmotion.trim() || primaryEmotion,
    secondaryEmotion,
    customEmotion: customEmotion.trim() || undefined,
    intensity,
    sensations,
    contextTags,
    note: note.trim() || undefined,
    voiceNotePlaceholder,
    recommendationId
  }), [contextTags, customEmotion, energy, intensity, note, pleasantness, primaryEmotion, quadrant, recommendationId, secondaryEmotion, sensations, voiceNotePlaceholder]);

  const recommendedTools = getRecommendedTools(draft);
  const recommendation = recommendedTools.find((tool) => tool.id === recommendationId) ?? getPrimaryRecommendation(draft);

  function save() {
    addEntry({ ...draft, recommendationId: recommendation.id });
    setSaved(true);
    onSaved();
  }

  function handleMapChange(nextPleasantness: number, nextEnergy: number) {
    const nextQuadrant = getQuadrant(nextPleasantness, nextEnergy);
    setPleasantness(nextPleasantness);
    setEnergy(nextEnergy);
    setPrimaryEmotion(emotionOptions.find((emotion) => emotion.quadrant === nextQuadrant)?.label ?? "Mixed");
  }

  return (
    <>
      <PageHeader eyebrow="Check in" title="Where are you right now?">
        Choose the closest state, save quickly, or add detail only if it helps.
      </PageHeader>
      <div className="checkin-layout">
        <div className="checkin-main">
          <MoodMap pleasantness={pleasantness} energy={energy} onChange={handleMapChange} />
          <EmotionPicker
            quadrant={quadrant}
            primaryEmotion={primaryEmotion}
            secondaryEmotion={secondaryEmotion}
            customEmotion={customEmotion}
            onPrimary={setPrimaryEmotion}
            onSecondary={setSecondaryEmotion}
            onCustom={setCustomEmotion}
          />
          <OptionalDetails
            intensity={intensity}
            sensations={sensations}
            context={contextTags}
            note={note}
            voiceNotePlaceholder={voiceNotePlaceholder}
            onIntensity={setIntensity}
            onSensations={setSensations}
            onContext={setContextTags}
            onNote={setNote}
            onVoiceNotePlaceholder={setVoiceNotePlaceholder}
          />
          {safetyTriggered ? <SafetyPanel /> : null}
          <div className="sticky-action">
            <Button onClick={save}>Save check-in</Button>
            <Link href="/app" className="button button-secondary">Done in seconds</Link>
            {saved ? <span role="status">Saved. Your dashboard is updated.</span> : null}
          </div>
        </div>
        <aside className="checkin-side">
          <RecommendationCard
            tool={recommendation}
            onSwap={() => {
              const index = recommendedTools.findIndex((tool) => tool.id === recommendation.id);
              setRecommendationId(recommendedTools[(index + 1) % recommendedTools.length]?.id);
            }}
            onSkip={() => setRecommendationId(undefined)}
          />
        </aside>
      </div>
    </>
  );
}
