// --- DOM Elements ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');
const nextBtn = document.getElementById('next-btn'); // The 'Next Question' button
const questionCounterText = document.getElementById('question-counter');
const feedbackText = document.getElementById('feedback-text');
const questionText = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultText = document.getElementById('result-text');
const quizContainer = document.getElementById('quiz-container'); // Main container
const questionAnswerContainer = document.getElementById('question-answer-container');
const resultsListElement = document.getElementById('results-list'); // New element for results list

// --- Constants ---
const SHRINK_ANIMATION_DURATION = 400; // Match CSS max-height transition duration (if using shrinking)
const CONTENT_FADE_DURATION = 300; // Match CSS text opacity transition duration
const BASE_ANIMATION_DURATION = 400; // Original fade duration (used for screen switching)
const MIN_FONT_SCALE_FACTOR = 0.5; // Minimum text size (e.g., 50%)
const TARGET_VIEWPORT_HEIGHT_RATIO = 0.90; // Target height (e.g., 90% of viewport)
const HEIGHT_TRANSITION_DURATION = 400; // Match the max-height transition in CSS

// --- New Quiz Data Structure ---
// Define the Question object structure:
// {
//   question: "Question text string",
//   answers: ["Answer 1", "Answer 2 (Correct)", "Answer 3", "Answer 4"], // Array of answer strings
//   correctAnswerIndex: 1 // Index of the correct answer in the 'answers' array
// }

import { quizData } from './questions.js'; // Import quizData from the new file
import { oldQuizData } from './questions.js'; // Import quizData from the new file
import { oldQuizDataTwo } from './questions.js'; // Import quizData from the new file
import { oldQuizDataThree } from './questions.js'; // Import quizData from the new file





// --- Quiz State Variables ---
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
// Array to store the results of each question
let quizResults = []; // { question: string, userAnswer: string, correctAnswer: string, isCorrect: boolean }

// --- Functions ---

/**
 * Shuffles an array in place using the Fisher-Yates (Knuth) algorithm.
 * @param {Array} array The array to shuffle.
 * @returns {Array} The shuffled array.
 */
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
 }

/**
 * Switches the visible screen with fade animations and resets font scale.
 * @param {HTMLElement} activeScreen The screen element to make active.
 */
function switchScreen(activeScreen) {
    const currentActive = document.querySelector('.screen.active');
    if (currentActive && currentActive !== activeScreen) {
        currentActive.classList.add('fade-out');
        setTimeout(() => {
            currentActive.classList.remove('active', 'fade-out');
            activeScreen.classList.add('active');
            quizContainer.style.setProperty('--font-scale-factor', '1');
            quizContainer.classList.remove('shrinking');
            quizContainer.style.minHeight = '';
            quizContainer.style.maxHeight = 'none';
            if (activeScreen === quizScreen || activeScreen === endScreen) {
                 requestAnimationFrame(() => checkAndAdjustFontSize());
            }
        }, BASE_ANIMATION_DURATION);
    } else if (!currentActive) {
         activeScreen.classList.add('active');
         quizContainer.style.setProperty('--font-scale-factor', '1');
         quizContainer.classList.remove('shrinking');
         quizContainer.style.minHeight = '';
         quizContainer.style.maxHeight = 'none';
         if (activeScreen === quizScreen || activeScreen === endScreen) {
            requestAnimationFrame(() => checkAndAdjustFontSize());
         }
    }
}

/**
 * Initializes and starts the quiz.
 */
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    quizResults = []; // Clear previous results
    shuffledQuestions = shuffleArray([...quizData]); // Shuffle the new quiz data objects
    switchScreen(quizScreen);
    setTimeout(() => {
        showQuestion();
    }, BASE_ANIMATION_DURATION + 50);
}

/**
 * Displays the current question and its answer options using the new structure.
 */
function showQuestion() {
    questionAnswerContainer.style.opacity = '1';

    const currentQuestion = shuffledQuestions[currentQuestionIndex]; // Get the question object
    const questionNumber = currentQuestionIndex + 1;

    questionCounterText.innerText = `Question ${questionNumber} / ${shuffledQuestions.length}`;
    questionText.innerText = currentQuestion.question; // Use question property
    answerButtonsElement.innerHTML = ''; // Clear previous answer buttons

    // Iterate through the 'answers' array in the current question object
    currentQuestion.answers.forEach((answerText, index) => {
        const button = document.createElement('button');
        const letter = String.fromCharCode(65 + index); // A, B, C, D...
        button.innerText = `${letter}) ${answerText}`; // Display letter and answer text
        button.classList.add('btn');
        button.dataset.answerIndex = index; // Store the index (0, 1, 2, 3...)
        button.addEventListener('click', handleAnswerClick);
        answerButtonsElement.appendChild(button);
    });

    // --- Height Transition and Fade Logic (remains largely the same) ---
    quizContainer.offsetHeight; // Force reflow
    const newHeight = quizContainer.scrollHeight;
    quizContainer.style.maxHeight = newHeight + 'px';

    setTimeout(() => {
         questionText.classList.remove('text-fade-out');
         questionText.classList.add('text-fade-in');
         answerButtonsElement.style.opacity = '1';
         requestAnimationFrame(() => {
             checkAndAdjustFontSize();
         });
    }, 50);

    setTimeout(() => {
        quizContainer.style.maxHeight = 'none';
    }, HEIGHT_TRANSITION_DURATION);

    feedbackText.style.opacity = '1';
    feedbackText.innerText = '';
    feedbackText.className = 'feedback-text';
}

/**
 * Resets the state of UI elements between questions.
 * (No major changes needed here)
 */
function resetState() {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('correct', 'incorrect', 'disabled');
        button.disabled = false;
    });
    questionText.classList.remove('text-fade-out', 'text-fade-in');
    questionText.style.opacity = '';
    questionText.offsetHeight;
    quizContainer.classList.remove('shrinking');
}

/**
 * Handles the click event on an answer button using the new structure.
 * @param {Event} event The click event object.
 */
function handleAnswerClick(event) {
    const selectedButton = event.target;
    const selectedAnswerIndex = parseInt(selectedButton.dataset.answerIndex, 10); // Get the clicked index
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswerIndex; // Get correct index from question object
    const isCorrect = selectedAnswerIndex === correctAnswerIndex;

    // Store the result for this question
    quizResults.push({
        question: currentQuestion.question,
        userAnswer: currentQuestion.answers[selectedAnswerIndex], // Store the chosen answer text
        correctAnswer: currentQuestion.answers[correctAnswerIndex], // Store the correct answer text
        isCorrect: isCorrect
    });

    // Disable all answer buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.add('disabled');
        button.disabled = true;
        // Highlight the correct answer regardless of user choice
        if (parseInt(button.dataset.answerIndex, 10) === correctAnswerIndex) {
            button.classList.add('correct');
        }
    });

    // Provide feedback
    if (isCorrect) {
        selectedButton.classList.add('correct'); // Already added above, but safe
        feedbackText.innerText = "Correct!";
        feedbackText.className = 'feedback-text correct';
        score++;
    } else {
        selectedButton.classList.add('incorrect'); // Highlight the incorrect choice
        const correctLetter = String.fromCharCode(65 + correctAnswerIndex);
        feedbackText.innerText = `Incorrect! Correct answer was ${correctLetter}.`;
        feedbackText.className = 'feedback-text incorrect';
    }

    // Show the Next Question button
    nextBtn.classList.add('visible');
    // requestAnimationFrame(() => checkAndAdjustFontSize()); // Optional check
}


/**
 * Moves to the next question or ends the quiz.
 * Includes optional shrink effect and smooth height transition.
 * (No major changes needed here, relies on showQuestion/endQuiz)
 */
function nextQuestion() {
    // Optional: Start shrinking
    // quizContainer.classList.add('shrinking');
    const delayBeforeFade = quizContainer.classList.contains('shrinking') ? SHRINK_ANIMATION_DURATION : 50;

    setTimeout(() => {
        nextBtn.classList.remove('visible');
        questionText.classList.remove('text-fade-in');
        questionText.classList.add('text-fade-out');
        answerButtonsElement.style.opacity = '0';
        feedbackText.style.opacity = '0';
        questionAnswerContainer.style.opacity = '0';

        setTimeout(() => {
            // Optional: Remove shrinking class
            // quizContainer.classList.remove('shrinking');
            // quizContainer.style.minHeight = '';

            const currentHeight = quizContainer.scrollHeight;
            quizContainer.style.maxHeight = currentHeight + 'px';
            quizContainer.offsetHeight; // Reflow

            quizContainer.style.setProperty('--font-scale-factor', '1');
            quizContainer.offsetHeight; // Optional reflow

            currentQuestionIndex++;
            if (currentQuestionIndex < shuffledQuestions.length) {
                showQuestion(); // Calls the updated showQuestion
            } else {
                quizContainer.style.maxHeight = 'none';
                endQuiz(); // Calls the updated endQuiz
            }
        }, CONTENT_FADE_DURATION);

    }, delayBeforeFade);
}


/**
 * Ends the quiz and displays the final score and results.
 */
function endQuiz() {
    resultText.innerText = `You scored ${score} out of ${shuffledQuestions.length}!`;
    displayResults(); // Call the updated displayResults
    quizContainer.style.maxHeight = 'none';
    switchScreen(endScreen);
}

/**
 * Generates and displays the list of quiz results using the new quizResults structure.
 */
function displayResults() {
    resultsListElement.innerHTML = ''; // Clear previous results

    quizResults.forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        // Display Question
        const questionElement = document.createElement('strong');
        questionElement.innerText = `Question ${index + 1}: ${result.question}`;
        resultItem.appendChild(questionElement);

        // Display Correct Answer (already stored in result object)
        const correctAnswerElement = document.createElement('p');
        correctAnswerElement.classList.add('correct-answer');
        correctAnswerElement.innerText = `Correct Answer: ${result.correctAnswer}`;
        resultItem.appendChild(correctAnswerElement);

        // Display User Answer (already stored in result object)
        const userAnswerElement = document.createElement('p');
        userAnswerElement.classList.add('user-answer');
        userAnswerElement.innerText = `Your Answer: ${result.userAnswer}`;
        if (!result.isCorrect) {
            userAnswerElement.classList.add('incorrect');
        }
        resultItem.appendChild(userAnswerElement);

        resultsListElement.appendChild(resultItem);
    });
}


/**
 * Checks if quiz container content overflows and adjusts font size via CSS variable.
 * (No changes needed here)
 */
function checkAndAdjustFontSize() {
    if (!quizScreen.classList.contains('active') && !endScreen.classList.contains('active')) {
        return;
    }
    const originalMaxHeight = quizContainer.style.maxHeight;
    quizContainer.style.maxHeight = 'none';
    const currentScale = quizContainer.style.getPropertyValue('--font-scale-factor');
    quizContainer.style.setProperty('--font-scale-factor', '1');
    quizContainer.offsetHeight;
    const contentHeight = quizContainer.scrollHeight;
    const viewportHeight = window.innerHeight;
    const targetHeight = viewportHeight * TARGET_VIEWPORT_HEIGHT_RATIO;
    let applyScaleFactor = 1;
    if (contentHeight > targetHeight) {
        applyScaleFactor = targetHeight / contentHeight;
        applyScaleFactor = Math.max(applyScaleFactor, MIN_FONT_SCALE_FACTOR);
        // console.log(`Font scaling needed. ContentH: ${contentHeight}, TargetH: ${targetHeight}, ScaleFactor: ${applyScaleFactor}`);
    } else {
        // console.log(`No font scaling needed. ContentH: ${contentHeight}, TargetH: ${targetHeight}`);
    }
    quizContainer.style.setProperty('--font-scale-factor', applyScaleFactor);
    if (applyScaleFactor === 1 && currentScale !== '1') {
         quizContainer.style.setProperty('--font-scale-factor', '1');
    }
    requestAnimationFrame(() => {
        const finalHeight = quizContainer.scrollHeight;
        if (originalMaxHeight !== 'none') {
             quizContainer.style.maxHeight = finalHeight + 'px';
        } else {
             quizContainer.style.maxHeight = 'none';
        }
     });
}

// --- Event Listeners ---
startBtn.addEventListener('click', startQuiz);
retryBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

// Recalculate font size and potentially adjust height on window resize
window.addEventListener('resize', () => {
    if (quizScreen.classList.contains('active') || endScreen.classList.contains('active')) {
        quizContainer.style.maxHeight = 'none';
        checkAndAdjustFontSize();
        const finalHeight = quizContainer.scrollHeight;
        quizContainer.style.maxHeight = finalHeight + 'px';
        setTimeout(() => {
            quizContainer.style.maxHeight = 'none';
        }, HEIGHT_TRANSITION_DURATION);
    }
});

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    switchScreen(startScreen); // Show start screen initially
});
