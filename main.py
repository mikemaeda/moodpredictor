from __future__ import annotations

import csv
import json
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

APP_NAME = "Mood Predictor"
DATA_DIR_ENV = "MOOD_PREDICTOR_DIR"
DEFAULT_DATA_DIR = Path.home() / "Documents" / "MoodPredictor"
QUESTIONS = [
    ("energy", "How much energy do you have?"),
    ("positivity", "How positive do you feel?"),
    ("stress", "How stressed do you feel?"),
    ("connection", "How connected do you feel to people around you?"),
    ("control", "How much control do you feel you have today?"),
]
FIELDNAMES = ["timestamp", "energy", "positivity", "stress", "connection", "control", "mood", "note"]


@dataclass(frozen=True)
class Profile:
    name: str
    slug: str
    age: str = ""
    reason: str = ""


@dataclass(frozen=True)
class MoodResult:
    mood: str
    message: str


def data_dir() -> Path:
    configured = os.environ.get(DATA_DIR_ENV)
    return Path(configured).expanduser() if configured else DEFAULT_DATA_DIR


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9_-]+", "_", value.strip().lower()).strip("_")
    return slug or "user"


def profile_path(slug: str) -> Path:
    return data_dir() / f"{slug}_profile.json"


def history_path(slug: str) -> Path:
    return data_dir() / f"{slug}_mood_history.csv"


def ensure_data_dir() -> None:
    data_dir().mkdir(parents=True, exist_ok=True)


def print_header(title: str = APP_NAME) -> None:
    line = "=" * len(title)
    print(f"\n{title}\n{line}")


def ask_required(prompt: str) -> str:
    while True:
        value = input(prompt).strip()
        if value:
            return value
        print("Please enter a value.")


def ask_rating(prompt: str) -> int:
    while True:
        answer = input(f"{prompt} (1-10): ").strip()
        try:
            rating = int(answer)
        except ValueError:
            print("Please enter a whole number from 1 to 10.")
            continue

        if 1 <= rating <= 10:
            return rating
        print("Please enter a number from 1 to 10.")


def create_profile() -> Profile:
    print_header("Create Profile")
    name = ask_required("Name: ")
    age = input("Age (optional): ").strip()
    reason = input("Why are you tracking your mood? (optional): ").strip()
    slug = slugify(name)
    profile = Profile(name=name, slug=slug, age=age, reason=reason)

    ensure_data_dir()
    profile_path(slug).write_text(json.dumps(profile.__dict__, indent=2), encoding="utf-8")
    initialize_history_file(slug)

    print(f"\nProfile saved for {profile.name}.")
    print(f"Data folder: {data_dir()}")
    return profile


def load_profile() -> Profile | None:
    print_header("Load Profile")
    name = ask_required("Name: ")
    slug = slugify(name)
    path = profile_path(slug)

    if not path.exists():
        print(f"\nNo profile found for {name}.")
        print(f"Expected file: {path}")
        return None

    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        print("That profile file exists, but it is not valid JSON.")
        return None

    return Profile(
        name=payload.get("name", name),
        slug=payload.get("slug", slug),
        age=payload.get("age", ""),
        reason=payload.get("reason", ""),
    )


def choose_profile() -> Profile | None:
    while True:
        print_header()
        print("1. Create profile")
        print("2. Load profile")
        print("3. Quit")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            return create_profile()
        if choice == "2":
            profile = load_profile()
            if profile:
                return profile
            pause()
        elif choice == "3":
            return None
        else:
            print("Invalid option.")
            pause()


def initialize_history_file(slug: str) -> None:
    path = history_path(slug)
    if path.exists():
        return

    with path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
        writer.writeheader()


def ask_mood_questions() -> dict[str, int]:
    print_header("Daily Check-In")
    print("Rate each prompt from 1 to 10.\n")
    return {key: ask_rating(prompt) for key, prompt in QUESTIONS}


def predict_mood(answers: dict[str, int]) -> MoodResult:
    energy = answers["energy"]
    positivity = answers["positivity"]
    stress = answers["stress"]
    connection = answers["connection"]
    control = answers["control"]

    if stress >= 7 and control <= 4 and positivity <= 5:
        return MoodResult("Stressed", "High stress and low control are pulling the day down.")
    if stress >= 7 and positivity <= 4:
        return MoodResult("Angry", "Stress is high and positivity is low, so frustration may be building.")
    if positivity <= 3 and energy <= 4 and connection <= 5:
        return MoodResult("Sad", "Low energy, positivity, and connection point toward a heavier day.")
    if positivity >= 7 and stress <= 4 and energy >= 5:
        return MoodResult("Happy", "Positive mood, manageable stress, and enough energy are lining up well.")
    if stress <= 3 and control >= 7:
        return MoodResult("Calm", "Low stress and strong control suggest a steady mood.")
    return MoodResult("Neutral", "Your answers are balanced without one strong mood signal.")


def mood_advice(mood: str) -> str:
    advice = {
        "Happy": "Use the momentum for something that matters to you.",
        "Calm": "Protect the calm and keep your day simple.",
        "Neutral": "Pick one small task or habit to give the day direction.",
        "Sad": "Be gentle with yourself and reach for one supportive action.",
        "Angry": "Pause before reacting and give yourself space to cool down.",
        "Stressed": "Lower the pressure: breathe, list priorities, and handle one thing at a time.",
    }
    return advice.get(mood, "Take a moment to check in with yourself.")


def save_entry(profile: Profile, answers: dict[str, int], result: MoodResult, note: str) -> Path:
    ensure_data_dir()
    initialize_history_file(profile.slug)
    path = history_path(profile.slug)

    row = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "mood": result.mood,
        "note": note.strip(),
        **answers,
    }

    with path.open("a", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=FIELDNAMES)
        writer.writerow(row)

    return path


def read_history(profile: Profile) -> list[dict[str, str]]:
    path = history_path(profile.slug)
    if not path.exists():
        return []

    with path.open("r", newline="", encoding="utf-8") as file:
        return list(csv.DictReader(file))


def show_history(profile: Profile) -> None:
    print_header("Mood History")
    rows = read_history(profile)
    if not rows:
        print("No entries yet.")
        return

    for row in rows[-10:]:
        note = f" - {row['note']}" if row.get("note") else ""
        print(f"{row['timestamp']} | {row['mood']}{note}")

    if len(rows) > 10:
        print(f"\nShowing the latest 10 of {len(rows)} entries.")


def show_summary(profile: Profile) -> None:
    print_header("Mood Summary")
    rows = read_history(profile)
    if not rows:
        print("No entries yet.")
        return

    mood_counts: dict[str, int] = {}
    totals = {key: 0 for key, _ in QUESTIONS}

    for row in rows:
        mood_counts[row["mood"]] = mood_counts.get(row["mood"], 0) + 1
        for key in totals:
            totals[key] += int(row[key])

    print(f"Entries: {len(rows)}")
    print("\nMood counts:")
    for mood, count in sorted(mood_counts.items(), key=lambda item: item[1], reverse=True):
        print(f"- {mood}: {count}")

    print("\nAverage scores:")
    for key, total in totals.items():
        print(f"- {key.title()}: {total / len(rows):.1f}/10")


def open_history_file(profile: Profile) -> None:
    path = history_path(profile.slug)
    if not path.exists():
        print("No history file exists yet.")
        return

    try:
        if sys.platform.startswith("win"):
            os.startfile(path)  # type: ignore[attr-defined]
        elif sys.platform == "darwin":
            subprocess.run(["open", str(path)], check=False)
        else:
            subprocess.run(["xdg-open", str(path)], check=False)
        print(f"Opened: {path}")
    except OSError as exc:
        print(f"Could not open the file automatically: {exc}")
        print(f"History file: {path}")


def record_mood(profile: Profile) -> None:
    answers = ask_mood_questions()
    note = input("\nOptional note about your day: ")
    result = predict_mood(answers)
    path = save_entry(profile, answers, result, note)

    print_header("Result")
    print(f"Mood: {result.mood}")
    print(result.message)
    print(f"Advice: {mood_advice(result.mood)}")
    print(f"\nSaved to: {path}")


def profile_menu(profile: Profile) -> bool:
    print_header(f"{APP_NAME} - {profile.name}")
    print("1. Record today's mood")
    print("2. View recent history")
    print("3. View summary")
    print("4. Open history file")
    print("5. Switch profile")
    print("6. Quit")
    choice = input("Choose an option: ").strip()

    if choice == "1":
        record_mood(profile)
    elif choice == "2":
        show_history(profile)
    elif choice == "3":
        show_summary(profile)
    elif choice == "4":
        open_history_file(profile)
    elif choice == "5":
        return False
    elif choice == "6":
        raise SystemExit(0)
    else:
        print("Invalid option.")

    pause()
    return True


def pause() -> None:
    input("\nPress Enter to continue...")


def main() -> None:
    while True:
        profile = choose_profile()
        if profile is None:
            print("Goodbye.")
            return

        keep_current_profile = True
        while keep_current_profile:
            keep_current_profile = profile_menu(profile)


if __name__ == "__main__":
    main()
