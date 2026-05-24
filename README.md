# Mood Predictor

A polished Python command-line app for recording daily mood check-ins, predicting a mood category from self-reported scores, and saving a local mood history for later review.

The app uses a transparent rule-based model instead of a black-box prediction system. Users rate five factors from 1 to 10, and the program uses those answers to classify the day as `Happy`, `Calm`, `Neutral`, `Sad`, `Angry`, or `Stressed`.

## Features

- Create and load local user profiles
- Record daily ratings for energy, positivity, stress, connection, and control
- Predict a mood using clear rule-based logic
- Save mood history to CSV
- View recent entries from the terminal
- Generate a simple mood summary with counts and averages
- Open the saved history file from the app
- Includes automated tests and GitHub Actions CI

## Project Structure

```text
.
├── main.py                              # Mood Predictor CLI app
├── tests/
│   └── test_main.py                     # Unit tests for core behavior
├── docs/
│   ├── mood-predictor-presentation.pdf
│   └── mood-predictor-presentation.pptx
└── .github/workflows/ci.yml             # Syntax and test checks
```

## How It Works

The app asks for five ratings:

| Factor | Meaning |
| --- | --- |
| Energy | How physically or mentally energized the user feels |
| Positivity | How positive the user feels overall |
| Stress | How much pressure the user feels |
| Connection | How connected the user feels to others |
| Control | How much control the user feels over the day |

Those scores are passed into a rule-based mood classifier. For example:

- High positivity, low stress, and enough energy -> `Happy`
- Low stress and high control -> `Calm`
- High stress and low control -> `Stressed`
- Low positivity and low energy -> `Sad`

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

## Notes

This project is for personal tracking and programming practice. It is not a medical, mental health, or diagnostic tool.

## Author

Mike Maeda  
Computer Science & Data Analytics, Alfred University
