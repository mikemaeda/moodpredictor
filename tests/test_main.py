import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import main


class MoodPredictorTests(unittest.TestCase):
    def test_slugify_keeps_file_names_safe(self):
        self.assertEqual(main.slugify("Mike Maeda"), "mike_maeda")
        self.assertEqual(main.slugify(" Mike!!! 2026 "), "mike_2026")
        self.assertEqual(main.slugify("   "), "user")

    def test_predicts_happy_mood(self):
        result = main.predict_mood(
            {
                "energy": 8,
                "positivity": 9,
                "stress": 2,
                "connection": 8,
                "control": 7,
            }
        )
        self.assertEqual(result.mood, "Happy")

    def test_predicts_stressed_mood(self):
        result = main.predict_mood(
            {
                "energy": 4,
                "positivity": 4,
                "stress": 9,
                "connection": 5,
                "control": 3,
            }
        )
        self.assertEqual(result.mood, "Stressed")

    def test_save_and_read_history(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            with patch.dict(os.environ, {main.DATA_DIR_ENV: temp_dir}):
                profile = main.Profile(name="Test User", slug="test_user")
                answers = {
                    "energy": 7,
                    "positivity": 8,
                    "stress": 3,
                    "connection": 7,
                    "control": 8,
                }
                saved_path = main.save_entry(profile, answers, main.MoodResult("Happy", "ok"), "good day")
                rows = main.read_history(profile)

                self.assertEqual(saved_path, Path(temp_dir) / "test_user_mood_history.csv")
                self.assertEqual(len(rows), 1)
                self.assertEqual(rows[0]["mood"], "Happy")
                self.assertEqual(rows[0]["note"], "good day")


if __name__ == "__main__":
    unittest.main()
