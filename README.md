# Mood Predictor

A simple Python-based Mood Predictor that analyzes user input and predicts emotional state based on self-reported scores. This project was developed to practice core Python programming concepts while building a small, practical application that demonstrates data input, decision-making logic, and file handling.

---
Project presentation files can be viewed below:






## Overview

The Mood Predictor is an interactive console application where users answer five short questions related to their emotional state. Based on the responses, the program predicts a mood category such as happy, stressed, calm, sad, angry, or neutral.

The system also saves results to a text file, allowing users to keep a history of their mood entries over time.

This project focuses on applying programming fundamentals to a real-world inspired problem while maintaining simplicity and usability.

---

## Core Functionality

- User creates or loads a profile.
- User answers five mood-related questions on a scale of 1–10.
- The system predicts a mood using rule-based logic.
- Results are saved automatically to a text file.
- Mood history is stored in the user's Downloads folder.
- Generated file opens automatically after saving.

---

## The Five Mood Inputs

Users provide scores from **1 to 10** for:

- Energy
- Positivity
- Stress
- Connection
- Control

These inputs are used to determine the predicted mood.

---

## Mood Prediction Logic

The program uses conditional logic to determine mood:

- High positivity + low stress → **Happy**
- High stress + low control → **Stressed**
- Low energy + low positivity → **Sad**
- High stress + low positivity → **Angry**
- Low stress + high control → **Calm**
- Otherwise → **Neutral**

This rule-based approach allows the system to make simple but meaningful predictions.

---

## Program Flow
Start Program
↓
Create / Load User Profile
↓
Answer 5 Questions
↓
Predict Mood
↓
Save Results to File
↓
Display Output / Exit


---

## Technologies Used

- **Language:** Python
- **Concepts Applied:**
  - Input and Output (`input()`, `print()`)
  - Control flow (`if`, `elif`, `else`)
  - Loops (`while`)
  - Functions and modular programming
  - Dictionaries and data structures
  - File handling (File I/O)

---

## File Storage System

Each user has a dedicated text file:

<username>_mood.txt


Example entry:



2025-12-10 14:30
Scores: [8, 7, 2, 9, 8]
Mood: Happy
Note: Good coding session!

This allows users to track mood history over time.

---

## Challenges Solved

- Input validation to ensure only values between 1–10 are accepted.
- Error handling for missing or invalid user profiles.
- Safe file creation using username-based filenames.
- Ensuring consistent data storage format.

---

## Future Improvements

- Mood trend visualization using matplotlib.
- Graphical user interface (GUI) using Tkinter.
- Weekly or monthly mood summaries.
- Data privacy improvements through encryption.
- Exporting mood reports.


---

## Project Purpose

This project was created to strengthen understanding of Python fundamentals through practical application, demonstrating how simple logic and structured programming can be used to solve real-world inspired problems.

---

## Author

**Mike Maeda**  
Computer Science & Data Analytics Student  
Alfred University


