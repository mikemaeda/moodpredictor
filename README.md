# Mood Compass

**Live app:** https://moodpredictor.vercel.app

**Repository:** https://github.com/mikemaeda/moodpredictor

Mood Compass is a privacy-first mood tracking web app built with React, TypeScript, and Vite. It helps users complete quick mood check-ins, track local patterns over time, receive small evidence-informed recommendations, and view gentle personal forecasts once enough history exists.

Mood Compass is intentionally **non-diagnostic**. It is a wellness and self-reflection tool, not a medical device or replacement for professional care.

## Highlights

- Quick mood check-ins with simple state selection
- Optional deeper details: emotions, intensity, sensations, context tags, and notes
- Local-first storage using the browser
- Export and delete controls for user data
- Dashboard with today summary, gentle streaks, weekly review, and mood pixels
- History, insights, tools, settings, privacy, forecasting, and help-now pages
- Evidence-informed recommendation tools
- Transparent forecasting logic with confidence labels
- Accessibility-minded UI with keyboard support, focus states, and reduced-motion support
- Deployed on Vercel

## Privacy-First Design

Mood Compass stores each user's data locally in their browser for the MVP. No account is required, and mood history is not sent to a server.

Users can:

- Save mood entries locally
- Export their data as JSON
- Delete all local data
- Disable analytics
- Enable reduced motion

Because storage is local-first, data does not automatically sync across devices or browsers.

## How It Works

1. Choose the closest current mood state.
2. Optionally add a primary emotion, tags, sensations, or note.
3. Save the check-in locally.
4. Review trends, patterns, and recommendations over time.
5. After enough history exists, Mood Compass shows a gentle forecast based on personal patterns.

Forecasts are explainable and never presented as certain.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Local Storage
- Vitest
- Testing Library
- Playwright
- Vercel

## Project Structure

```text
src/
|-- components/
|   |-- layout/
|   |-- mood/
|   |-- navigation/
|   |-- primitives/
|   `-- product/
|-- data/
|-- lib/
|-- pages/
|-- styles/
|-- App.tsx
`-- main.tsx
```

Core logic lives in `src/lib`:

- `mood.ts`: mood state, scoring, dates, summaries
- `recommendations.ts`: mood-state tool matching
- `forecast.ts`: transparent personal forecasting and pattern detection
- `safety.ts`: crisis-language detection
- `storage.ts`: local-first persistence
- `export.ts`: JSON export

## Run Locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Tests:

```bash
npm test
npm run test:e2e
```

Legacy Python CLI tests:

```bash
python -m unittest discover -s tests -p "test_main.py"
```

## Evidence-Informed Basis

Mood Compass is inspired by:

- Valence-arousal emotion models: https://pmc.ncbi.nlm.nih.gov/articles/PMC2367156/
- Positive and negative affect self-report concepts: https://pubmed.ncbi.nlm.nih.gov/3397865/
- Practical self-care guidance from NIMH: https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health

## Author

Mike Maeda  
Computer Science & Data Analytics, Alfred University
