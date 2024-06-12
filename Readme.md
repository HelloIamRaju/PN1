# 🎓 Computer Science Interactive Learning Website

Welcome to our project! We’re building a website to help BIT and CSIT students learn more effectively.

## 🌟 Features

- 📚 **Interactive Documentation**: Detailed explanations of course topics.
- 🎥 **Educational Videos**: Visualize and understand complex concepts.
- 📝 **Quizzes**: Test your knowledge with interactive quizzes.
- 💻 **Practical Exercises**: Apply what you've learned in real-world scenarios.

## 📢 Join Us

We need your skills! Contribute in:
- ✨ **Animation**
- 🎨 **Design**
- 📝 **Notes**
- 💻 **Development**
- 🖋️ **Content Creation**

## 🤝 Why Contribute?

- Gain valuable experience
- Collaborate with fellow students
- Enhance your resume
- Create a lasting impact

We believe in the power of collaboration. Let’s make learning more engaging and effective for all!

---

Thank you for your support!


**------------------------------------------------------------------------------------------------------------------------------------------**

### Javascript

1. **Navigation Click Handler (`querySelectorAll('.nav-details a').forEach(link => { ... })`)**
   -: Handles clicks on topic links in the navigation menu.
   - : Prevents the default link action, saves the selected topic in local storage, and starts the quiz for that topic.

2. **Fetch Quiz Questions (`fetchQuizQuestions(topic, limit = 10)`)**
   -: Retrieves quiz questions from an external API.
   -: Constructs the API URL with the provided topic and fetches questions. Handles network errors and logs the response data.

3. **Show Quiz (`showQuiz(topic)`)**
   -: Sets up and displays the quiz section.
   -: Hides the title and enter sections, fetches questions for the selected topic, and initializes the quiz interface.

4. **Attach Option Listeners (`attachOptionListeners()`)**
   -: Marks the selected answer for the current question.
   -: Adds click event listeners to answer options, highlights the selected option, and stores its index in an array.

5. **Attach Exit Listener (`attachExitListener()`)**
   -: Allows users to exit the quiz and return to the home screen.
   -: Adds a click event listener to the exit button, hides the quiz section, and shows the title and enter sections again.

6. **Show Question (`showQuestion(index)`)**
   -: Displays a specific question and its options.
   -: Updates the question text and options, highlights the selected answer, updates the progress bar, and manages navigation buttons.

7. **Update Navigation Buttons (`updateNavigationButtons()`)**
   -: Controls the visibility of navigation buttons.
   -: Shows or hides the Previous, Next, Submit, and Show Results buttons based on the current question index.

8. **Update Progress Bar (`updateProgressBar()`)**
   -: Visualizes the user's progress through the quiz.
   -: Calculates and updates the width of the progress bar according to the current question index.

9. **Navigation Click Handler for Navigation Buttons (`document.addEventListener('click', (event) => { ... })`)**
   -: Manages clicks on navigation buttons (Previous, Next, Submit, Results).
   -: Moves to the previous or next question, submits the quiz, or shows detailed results.

10. **Show Results (`showResults()`)**
    -: Displays the user's quiz score.
    -: Calculates the score based on correct answers and displays it, along with an option to see detailed results.

11. **Show Detailed Results (`showDetailedResults()`)**
    -: Provides a detailed breakdown of the user's answers.
    -: Iterates over each question, highlighting correct and selected answers, and displays explanations if available.

12. **Contact and Join Us Handling (`document.addEventListener('DOMContentLoaded', function() { ... })`)**
    -: Manages the display of contact and join forms.
    -: Shows the contact form by default and toggles between the contact and join forms based on button clicks.

13. **Course Display Handler (`document.addEventListener('DOMContentLoaded', function() { ... })`)**
    -: Renders course content based on selected semester.
    -: Displays courses for the selected semester, updating the course content section based on the clicked navigation link.

---

