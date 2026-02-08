"""
Mike's CS 156 Final Project
Title: Simple Mood Predictor

Concepts used in class 
- input(), print()
- if/elif/else
- functions
- loops
- dictionaries
- file generation input/output
"""

import os
from datetime import datetime

# used to show the Path to the user's Downloads folder
DOWNLOADS = os.path.join(os.path.expanduser("~"), "Downloads")


# -CLEAR SCREEN(DISABLED)--

def clear_screen():
    """Disabled to avoid flicker in IDLE/VS Code."""
    pass
    #taken from the internet. 

# Functions and if/ statements. 

def user_file_name(name):
    """
    Return the full file path for a user's mood file,
    stored inside the Downloads folder.

    Example:
      name = "mike"
      -> C:/Users/YourName/Downloads/mike_mood.txt
    """
    safe_name = name.strip().replace(" ", "_")
    filename = f"{safe_name}_mood.txt"
    return os.path.join(DOWNLOADS, filename)


def create_new_user():
    """Create a new user and write base info into their file."""
    clear_screen()
    print(" Create New User Profile ")

    name = input("Enter your name: ").strip()
    age = input("Enter your age: ").strip()
    reason = input("Why do you want to track your mood? (optional): ").strip()

    filename = user_file_name(name)

    # Make sure Downloads exists (it should, but just in case)
    os.makedirs(DOWNLOADS, exist_ok=True)

    with open(filename, "w") as f:
        f.write(f"User: {name}\n")
        f.write(f"Age: {age}\n")
        f.write(f"Reason: {reason}\n")
        f.write("----- Mood History -----\n")

    print(f"\nProfile created. Your file is: {filename}")
    input("Press Enter to continue...")
    return name


def load_existing_user():
    """Load a user only if their file already exists."""
    clear_screen()
    print(" Load Existing User Profile ")

    name = input("Enter your name exactly as before: ").strip()
    filename = user_file_name(name)

    if os.path.exists(filename):
        print(f"\nProfile found! Using file: {filename}")
        input("Press Enter to continue...")
        return name
    else:
        print("\nNo profile found.")
        print(f"I looked for: {filename}")
        input("Press Enter to continue...")
        return None


def choose_user():
    """Menu: create new, load existing, or quit."""
    while True:
        print(" Mood Predictor ")
        print("1. Create new user profile")
        print("2. Load existing user profile")
        print("3. Quit")

        choice = input("Choose (1-3): ").strip()

        if choice == "1":
            return create_new_user()
        elif choice == "2":
            name = load_existing_user()
            if name is not None:
                return name
        elif choice == "3":
            print("Goodbye!")
            exit(0)
        else:
            print("Invalid option.")
            input("Press Enter to try again...")


#  QUESTION LOGIC

def ask_rating(prompt):
    """Ask for a number from 1 to 10 and validate it."""
    while True:
        answer = input(prompt)
        try:
            value = int(answer)
            if 1 <= value <= 10:
                return value
            else:
                print("Please enter a number from 1 to 10.")
        except ValueError:
            print("Please enter a number from 1 to 10.")


def ask_five_questions():
    "Ask 5 mood questions and return answers as a dictionary."
    print("\n Daily Mood Questionnaire ")
    print("Rate each from 1 to 10.\n")

    energy = ask_rating("1) How much ENERGY do you have? (1-10): ")
    
    valence = ask_rating("2) How POSITIVE do you feel? (1-10): ")
    
    stress = ask_rating("3) How STRESSED are you? (1-10): ")
    
    connection = ask_rating("4) How CONNECTED do you feel? (1-10): ")
    
    control = ask_rating("5) How much CONTROL do you feel you have? (1-10): ")

    answers = {
        "energy": energy,
        "valence": valence,
        "stress": stress,
        "connection": connection,
        "control": control,
    }
    return answers


#  MOOD PREDICTION - this could vary  

def predict_mood_from_answers(answers):
    "Return happy / sad / stressed / angry / calm / neutral."
    energy = answers["energy"]
    valence = answers["valence"]
    stress = answers["stress"]
    control = answers["control"]

    if valence >= 7 and stress <= 4 and energy >= 5:
        mood = "happy"
        
    elif stress >= 7 and control <= 4:
        mood = "stressed"
        
    elif valence <= 3 and energy <= 4:
        mood = "sad"
        
    elif stress >= 6 and valence <= 4:
        mood = "angry"
        
    elif stress <= 3 and control >= 7:
        mood = "calm"
    else:
        mood = "neutral"

    return mood


def mood_advice(mood):
    """Return simple advice based on mood."""
    advice = {
        "happy": "You're feeling good today—enjoy it!",
        "sad": "It's okay to feel sad. Take it easy today.",
        "stressed": "Try relaxing, taking a break, or deep breaths.",
        "angry": "Step away and cool down before reacting.",
        "calm": "Great! Use this peaceful moment well.",
        "neutral": "Your mood is steady. Do one small nice thing for yourself.",
    }
    return advice.get(mood, "")


#  SAVE MOOD ENTRY 

def save_mood_entry(user_name, answers, mood, note):
    """
    Write one line of mood history into the user's file
    and open the file so the user can see their summary.
    """
    filename = user_file_name(user_name)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")

    os.makedirs(DOWNLOADS, exist_ok=True)

    with open(filename, "a") as f:
        f.write(
            f"{timestamp} | "
            f"energy={answers['energy']}, "
            f"valence={answers['valence']}, "
            f"stress={answers['stress']}, "
            f"connection={answers['connection']}, "
            f"control={answers['control']} | "
            f"mood={mood.upper()} | "
            f"note={note}\n"
        )

    # Try to open the file automatically (works on Windows)
    try:
        if os.name == "nt":
            os.startfile(filename)
        else:
            # On Mac/Linux, you could use 'open' or 'xdg-open' if you want.
            pass
    except Exception as e:
        print("Could not open file automatically:", e)


#  MAIN MENU 

def main_menu(user_name):
    """Main loop after selecting a user."""
    while True:
        print(f"\n Mood Predictor (User: {user_name}) ")
        print("1. Answer today's mood questions")
        print("2. Switch user")
        print("3. Exit")

        choice = input("Choose (1-3): ").strip()

        if choice == "1":
            answers = ask_five_questions()
            note = input("\nOptional note about your day: ")

            mood = predict_mood_from_answers(answers)

            print(f"\nYour mood is: {mood.upper()}")
            print("Advice:", mood_advice(mood))

            save_mood_entry(user_name, answers, mood, note)

            print("\nSaved to your file in your Downloads folder.")
            print("The file should now be open so you can review it.")
            input("Press Enter to continue...")

        elif choice == "2":
            user_name = choose_user()

        elif choice == "3":
            print("Goodbye!")
            break

        else:
            print("Invalid option.")
            input("Press Enter to try again...")


#  ENTRY POINT 

def main():
    user = choose_user()
    main_menu(user)


if __name__ == "__main__":
    main()
