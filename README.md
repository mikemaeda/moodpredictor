# Mood Compass

Mood Compass is a privacy-first React + TypeScript web app for quick mood check-ins, local pattern tracking, small evidence-informed recommendations, and transparent personal mood forecasting after enough history exists.

It is portfolio-ready, deployable on Vercel, and intentionally non-diagnostic.

## Product Decisions

- **Fast first:** the basic check-in can be completed in seconds with a tap on the pleasantness x energy mood map.
- **Progressive depth:** emotion, intensity, physical sensations, context tags, notes, and voice-note placeholders are optional.
- **No fake AI:** forecasts use explainable rolling averages, recent patterns, time-of-day signals, and context tags.
- **Privacy-first:** mood data is stored locally in the browser for the MVP. Export and delete are available in settings.
- **Safety-aware:** crisis-oriented note text triggers a calm support panel with emergency/help resources.
- **Accessible:** the app uses semantic pages, visible focus states, keyboard-operable controls, reduced-motion support, and high-contrast UI.

## Route Map

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/onboarding` | First-time education |
| `/app` | Dashboard |
| `/app/check-in` | Mood check-in flow |
| `/app/history` | Timeline and mood pixels |
| `/app/insights` | Patterns, weekly review, gentle forecast |
| `/app/tools` | Recommendation library |
| `/app/settings` | Export, delete, analytics, reduced motion |
| `/privacy` | Plain-English privacy page |
| `/forecasting` | How forecasting works |
| `/help-now` | Support resources placeholder |
| `/preview` | Storybook-like component preview route |

## Architecture

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

- `mood.ts`: quadrant, scoring, dates, summaries
- `recommendations.ts`: mood-state tool matching
- `forecast.ts`: transparent personal forecast and patterns
- `safety.ts`: crisis-language detection
- `storage.ts`: local-first persistence
- `export.ts`: JSON export

## Data Model

Mood entries include:

- pleasantness and energy
- quadrant
- primary and optional secondary emotion
- optional custom emotion
- optional intensity
- optional sensations and context tags
- optional note and voice-note placeholder
- recommendation id

## Local Development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run unit and component tests:

```bash
npm test
```

Run e2e tests:

```bash
npm run test:e2e
```

## Deploy On Vercel

1. Push this repository to GitHub.
2. Import it in Vercel.
3. Use the default Vite settings.
4. Deploy.

`vercel.json` includes an SPA rewrite to `index.html`.

## Evidence-Informed Basis

Mood Compass uses:

- Pleasantness/energy mood mapping inspired by valence-arousal emotion models:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC2367156/
- Affect self-report concepts related to positive and negative affect:
  https://pubmed.ncbi.nlm.nih.gov/3397865/
- Practical self-care behaviors such as movement, sleep, hydration, connection, and breathing:
  https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health

Mood Compass is not a medical device, diagnostic tool, or replacement for licensed professional care.

## Legacy Python CLI

The original CLI prototype remains in `main.py` with tests in `tests/test_main.py`.

```bash
python -m unittest discover -s tests -p "test_main.py"
```

## Author

Mike Maeda  
Computer Science & Data Analytics, Alfred University
