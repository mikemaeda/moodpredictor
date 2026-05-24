# Mood Predictor

A polished Python command-line app for daily mood check-ins, local mood history, and lightweight personal trend analysis.

Mood Predictor uses a transparent rule-based model: users rate five factors from 1 to 10, then the app predicts a mood category and calculates a 0-100 mood score. It keeps the logic easy to understand while still giving users useful history, summaries, and trend feedback.

## Highlights

- Create and load local user profiles
- Record daily ratings for energy, positivity, stress, connection, and control
- Predict a mood: `Happy`, `Calm`, `Neutral`, `Sad`, `Angry`, or `Stressed`
- Calculate a 0-100 mood score with a clear wellness level
- Save mood history to CSV
- View recent entries from the terminal
- Review mood counts, average ratings, and focus areas
- Display an ASCII trend chart for recent mood scores
- Open the saved history file from the app
- Includes automated tests and GitHub Actions CI

## Project Structure

```text
.
├── main.py                              # Mood Predictor CLI app
├── tests/
│   └── test_main.py                     # Unit tests for scoring, prediction, and storage
├── docs/
│   ├── mood-predictor-presentation.pdf
│   └── mood-predictor-presentation.pptx
└── .github/workflows/ci.yml             # Syntax and test checks
```

## How Scoring Works

The app asks for five ratings:

| Factor | Meaning |
| --- | --- |
| Energy | How physically or mentally energized the user feels |
| Positivity | How positive the user feels overall |
| Stress | How much pressure the user feels |
| Connection | How connected the user feels to others |
| Control | How much control the user feels over the day |

The mood score combines the four positive factors with an inverse stress score. Higher stress lowers the final score, while stronger energy, positivity, connection, and control raise it.

```text
Mood score = energy + positivity + connection + control + inverse stress
```

Scores are translated into simple wellness levels:

| Score | Level |
| --- | --- |
| 80-100 | Strong |
| 60-79 | Stable |
| 40-59 | Mixed |
| 0-39 | Low |

## Run Locally

```bash
python main.py
```

The app stores local data in:

```text
~/Documents/MoodPredictor
```

To choose a different storage location, set the `MOOD_PREDICTOR_DIR` environment variable before running the app.

## Run Tests

```bash
python -m unittest discover -s tests
```

## Example Output

```text
Mood: Happy
Score: [###############...]  82/100 (Strong)
Positive mood, manageable stress, and enough energy are lining up well.
Advice: Use the momentum for something that matters to you.
```

## Notes

This project is for personal tracking and programming practice. It is not a medical, mental health, or diagnostic tool.

## Author

Mike Maeda  
Computer Science & Data Analytics, Alfred University
