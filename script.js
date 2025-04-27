// --- DOM Elements ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startFullBtn = document.getElementById('start-full-btn');
const start2025Btn = document.getElementById('start-2025-btn');
const start2024Btn = document.getElementById('start-2024-btn');
const retryBtn = document.getElementById('retry-btn');
const backToStartBtn = document.getElementById('back-to-start-btn');
const nextBtn = document.getElementById('next-btn');
const questionCounterText = document.getElementById('question-counter');
const feedbackText = document.getElementById('feedback-text');
const questionText = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultText = document.getElementById('result-text');
const quizContainer = document.getElementById('quiz-container');
const questionAnswerContainer = document.getElementById('question-answer-container');
const resultsListElement = document.getElementById('results-list');
// High Score Display Elements
const highScoreDisplay = {
    full: document.getElementById('high-score-full'),
    '2025': document.getElementById('high-score-2025'),
    '2024': document.getElementById('high-score-2024'),
};

// --- Constants ---
const SHRINK_ANIMATION_DURATION = 400;
const CONTENT_FADE_DURATION = 300;
const BASE_ANIMATION_DURATION = 400;
const MIN_FONT_SCALE_FACTOR = 0.5;
const TARGET_VIEWPORT_HEIGHT_RATIO = 0.90;
const HEIGHT_TRANSITION_DURATION = 400;
const COOKIE_EXPIRY_DAYS = 365; // Set cookies to expire in a year

// --- Quiz State Variables ---
let allQuestionsRaw = [];
let questionsToUse = [];
let currentQuestionIndex = 0;
let score = 0;
let quizResults = [];
let lastQuizType = null; // Stores 'full', '2025', or '2024'

// --- Functions ---

// --- Cookie Helper Functions ---
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Added SameSite=Lax for modern browser compatibility
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    console.log(`DEBUG: Setting Cookie: ${name} = ${value}`); // DEBUG LOG
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            const value = c.substring(nameEQ.length, c.length);
            // console.log(`DEBUG: Getting Cookie: ${name} = ${value}`); // DEBUG LOG (can be noisy)
            return value;
        }
    }
    // console.log(`DEBUG: Getting Cookie: ${name} = null`); // DEBUG LOG (can be noisy)
    return null;
}
// --- End Cookie Helper Functions ---


/**
 * Removes duplicate questions based on the question text AND answers.
 * @param {Array} questionsArray Array of question objects.
 * @returns {Array} Array with duplicate questions removed.
 */
function deduplicateQuestions(questionsArray) {
    const uniqueQuestions = new Map();
    questionsArray.forEach(q => {
        const answersString = [...q.answers].sort().join('|');
        const uniqueKey = `${q.question.trim()}|${answersString}`;
        if (!uniqueQuestions.has(uniqueKey)) {
            uniqueQuestions.set(uniqueKey, q);
        }
    });
    return Array.from(uniqueQuestions.values());
}


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
 * Also updates high scores if switching back to the start screen.
 * @param {HTMLElement} activeScreen The screen element to make active.
 */
function switchScreen(activeScreen) {
    console.log(`DEBUG: Switching screen to: ${activeScreen.id}`); // DEBUG LOG
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

             requestAnimationFrame(() => {
                 const targetHeight = quizContainer.scrollHeight;
                 quizContainer.style.maxHeight = targetHeight + 'px';

                 if (activeScreen === quizScreen || activeScreen === endScreen) {
                    checkAndAdjustFontSize();
                 }
                 if (activeScreen === startScreen) {
                     console.log("DEBUG: Calling displayHighScores because switching to start screen."); // DEBUG LOG
                     displayHighScores();
                 }

                 setTimeout(() => {
                    if (activeScreen.classList.contains('active')) {
                         quizContainer.style.maxHeight = 'none';
                    }
                 }, HEIGHT_TRANSITION_DURATION);
             });

        }, BASE_ANIMATION_DURATION);
    } else if (!currentActive) {
         // Initial screen load
         activeScreen.classList.add('active');
         quizContainer.style.setProperty('--font-scale-factor', '1');
         quizContainer.classList.remove('shrinking');
         quizContainer.style.minHeight = '';
         quizContainer.style.maxHeight = 'none';

         requestAnimationFrame(() => {
             const targetHeight = quizContainer.scrollHeight;
             quizContainer.style.maxHeight = targetHeight + 'px';
              if (activeScreen === quizScreen || activeScreen === endScreen) {
                 checkAndAdjustFontSize();
              }
              if (activeScreen === startScreen) {
                 console.log("DEBUG: Calling displayHighScores on initial load."); // DEBUG LOG
                 displayHighScores();
              }
             setTimeout(() => {
                 if (activeScreen.classList.contains('active')) {
                     quizContainer.style.maxHeight = 'none';
                 }
             }, HEIGHT_TRANSITION_DURATION);
         });
    }
}

/**
 * Initializes and starts the quiz based on the selected type.
 * @param {string} quizType - 'full', '2025', or '2024'.
 */
function startQuiz(quizType) {
    console.log(`DEBUG: Starting quiz type: ${quizType}`); // DEBUG LOG
    lastQuizType = quizType;
    score = 0;
    currentQuestionIndex = 0;
    quizResults = [];

    if (allQuestionsRaw.length === 0) {
        const data2025 = typeof quizData !== 'undefined' ? quizData : [];
        const dataOld1 = typeof oldQuizData !== 'undefined' ? oldQuizData : [];
        const dataOld2 = typeof oldQuizDataTwo !== 'undefined' ? oldQuizDataTwo : [];
        const dataOld3 = typeof oldQuizDataThree !== 'undefined' ? oldQuizDataThree : [];
        allQuestionsRaw = data2025.concat(dataOld1, dataOld2, dataOld3);
    }

    let selectedQuestionsRaw = [];
    if (quizType === 'full') {
        selectedQuestionsRaw = allQuestionsRaw;
    } else if (quizType === '2025') {
        selectedQuestionsRaw = (typeof quizData !== 'undefined' ? quizData : []);
    } else if (quizType === '2024') {
        const dataOld1 = typeof oldQuizData !== 'undefined' ? oldQuizData : [];
        const dataOld2 = typeof oldQuizDataTwo !== 'undefined' ? oldQuizDataTwo : [];
        const dataOld3 = typeof oldQuizDataThree !== 'undefined' ? oldQuizDataThree : [];
        selectedQuestionsRaw = dataOld1.concat(dataOld2, dataOld3);
    } else {
        console.error("Invalid quiz type specified:", quizType);
        return;
    }

    questionsToUse = shuffleArray(deduplicateQuestions(selectedQuestionsRaw));
     console.log(`DEBUG: Number of questions to use for ${quizType}: ${questionsToUse.length}`); // DEBUG LOG

    if (questionsToUse.length === 0) {
        console.error("No questions available for the selected quiz type:", quizType);
        alert(`No questions found for the ${quizType} test.`);
        return;
    }

    switchScreen(quizScreen);
    setTimeout(() => {
        showQuestion();
    }, BASE_ANIMATION_DURATION + 50);
}

/**
 * Displays the current question and its answer options.
 * Calculates and applies font scaling for this question.
 */
function showQuestion() {
    resetState();
    questionAnswerContainer.style.opacity = '1';

    const currentQuestion = questionsToUse[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;

    questionCounterText.innerText = `Question ${questionNumber} / ${questionsToUse.length}`;
    questionText.innerText = currentQuestion.question;
    answerButtonsElement.innerHTML = '';

    if (currentQuestion && Array.isArray(currentQuestion.answers)) {
        currentQuestion.answers.forEach((answerText, index) => {
            const button = document.createElement('button');
            const letter = String.fromCharCode(65 + index);
            button.innerText = `${letter}) ${answerText}`;
            button.classList.add('btn');
            button.dataset.answerIndex = index;
            button.addEventListener('click', handleAnswerClick);
            answerButtonsElement.appendChild(button);
        });
    } else {
        console.error("Invalid question format or missing answers:", currentQuestion);
        questionText.innerText = "Error loading question.";
        return;
    }

    quizContainer.style.maxHeight = 'none';
    requestAnimationFrame(() => {
        checkAndAdjustFontSize();
        const newHeight = quizContainer.scrollHeight;
        quizContainer.style.maxHeight = newHeight + 'px';

        setTimeout(() => {
             questionText.classList.remove('text-fade-out');
             questionText.classList.add('text-fade-in');
             answerButtonsElement.style.opacity = '1';
             feedbackText.style.opacity = '1';
        }, 50);

        setTimeout(() => {
            if (quizScreen.classList.contains('active')) {
                 quizContainer.style.maxHeight = 'none';
            }
        }, HEIGHT_TRANSITION_DURATION);
    });

    feedbackText.innerText = '';
    feedbackText.className = 'feedback-text';
    nextBtn.classList.remove('visible');
}

/**
 * Resets the state of UI elements between questions.
 */
function resetState() {
    quizContainer.style.setProperty('--font-scale-factor', '1');
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('correct', 'incorrect', 'disabled');
        button.disabled = false;
    });
    questionText.classList.remove('text-fade-out', 'text-fade-in');
    questionText.style.opacity = '';
    answerButtonsElement.style.opacity = '0';
    feedbackText.style.opacity = '0';
    feedbackText.innerText = '';
    feedbackText.className = 'feedback-text';
    nextBtn.classList.remove('visible');
    quizContainer.classList.remove('shrinking');
}

/**
 * Handles the click event on an answer button.
 * Does NOT recalculate font scaling.
 * @param {Event} event The click event object.
 */
function handleAnswerClick(event) {
    const selectedButton = event.target;
    const selectedAnswerIndex = parseInt(selectedButton.dataset.answerIndex, 10);
    const currentQuestion = questionsToUse[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswerIndex;
    const isCorrect = selectedAnswerIndex === correctAnswerIndex;

    const userAnswerText = currentQuestion.answers[selectedAnswerIndex] || "N/A";
    const correctAnswerText = currentQuestion.answers[correctAnswerIndex] || "N/A";

    quizResults.push({
        question: currentQuestion.question,
        userAnswer: userAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect: isCorrect
    });

    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.add('disabled');
        button.disabled = true;
        if (parseInt(button.dataset.answerIndex, 10) === correctAnswerIndex) {
            button.classList.add('correct');
        }
    });

    feedbackText.style.opacity = '1';
    if (isCorrect) {
        selectedButton.classList.add('correct');
        feedbackText.innerText = "Correct!";
        feedbackText.className = 'feedback-text correct';
        score++;
    } else {
        selectedButton.classList.add('incorrect');
        const correctLetter = String.fromCharCode(65 + correctAnswerIndex);
        feedbackText.innerText = `Incorrect! Correct answer was ${correctLetter}.`;
        feedbackText.className = 'feedback-text incorrect';
    }

    nextBtn.classList.add('visible');
}


/**
 * Moves to the next question or ends the quiz.
 */
function nextQuestion() {
    questionText.classList.remove('text-fade-in');
    questionText.classList.add('text-fade-out');
    answerButtonsElement.style.opacity = '0';
    feedbackText.style.opacity = '0';
    nextBtn.classList.remove('visible');

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionsToUse.length) {
            quizContainer.style.maxHeight = quizContainer.scrollHeight + 'px';
            requestAnimationFrame(() => {
                 showQuestion();
            });
        } else {
             endQuiz();
        }
    }, CONTENT_FADE_DURATION);
}

/**
 * Calculates the letter grade based on percentage score.
 * @param {number} score The number of correct answers.
 * @param {number} total The total number of questions.
 * @returns {string} The letter grade (e.g., "A+", "B", "F").
 */
function calculateGrade(score, total) {
    if (total === 0) return "N/A";
    const percentage = (score / total) * 100;

    if (percentage >= 90) return "A+";
    if (percentage >= 85) return "A";
    if (percentage >= 80) return "A-";
    if (percentage >= 75) return "B+";
    if (percentage >= 70) return "B";
    if (percentage >= 65) return "B-";
    if (percentage >= 60) return "C+";
    if (percentage >= 55) return "C";
    if (percentage >= 50) return "C-";
    if (percentage >= 45) return "D";
    return "F";
}


/**
 * Ends the quiz, displays the final score, saves high score if needed, and displays results.
 */
function endQuiz() {
    console.log("DEBUG: --- End Quiz ---"); // DEBUG LOG
    const totalQuestions = questionsToUse.length;
    resultText.innerText = `You scored ${score} out of ${totalQuestions}!`;
    console.log(`DEBUG: Final Score: ${score}/${totalQuestions}. Quiz Type: ${lastQuizType}`); // DEBUG LOG

    // --- Save High Score ---
    if (lastQuizType && totalQuestions > 0) {
         const scoreCookieName = `highScore_${lastQuizType}_score`;
         const totalCookieName = `highScore_${lastQuizType}_total`;

        console.log(`DEBUG: Checking high score for type: ${lastQuizType}`); // DEBUG LOG
        const previousHighScoreRaw = getCookie(scoreCookieName);
        // const previousTotalRaw = getCookie(totalCookieName); // Total isn't strictly needed for comparison logic

        const previousHighScore = parseInt(previousHighScoreRaw || "-1", 10); // Default to -1 if no cookie

        console.log(`DEBUG: Current Score: ${score} (Type: ${typeof score})`); // DEBUG LOG
        console.log(`DEBUG: Previous High Score from cookie ('${scoreCookieName}'): ${previousHighScoreRaw} -> Parsed: ${previousHighScore} (Type: ${typeof previousHighScore})`); // DEBUG LOG

        // Ensure we are comparing numbers
        if (Number.isInteger(score) && Number.isInteger(previousHighScore)) {
            if (score > previousHighScore) {
                console.log(`DEBUG: New high score! (${score} > ${previousHighScore}). Saving...`); // DEBUG LOG
                setCookie(scoreCookieName, score, COOKIE_EXPIRY_DAYS);
                setCookie(totalCookieName, totalQuestions, COOKIE_EXPIRY_DAYS);
            } else {
                console.log(`DEBUG: Score (${score}) is not higher than previous high score (${previousHighScore}). Not saving.`); // DEBUG LOG
            }
        } else {
             console.error("DEBUG: Type error during high score comparison. Score or PreviousHighScore is not an integer."); // DEBUG LOG
        }

    } else {
        console.log("DEBUG: Not saving high score (No lastQuizType or totalQuestions is 0)."); // DEBUG LOG
    }
    // --- End Save High Score ---

    displayResults();
    quizContainer.style.maxHeight = 'none';
    requestAnimationFrame(() => {
        switchScreen(endScreen);
    });
}

/**
 * Generates and displays the list of quiz results.
 */
function displayResults() {
    resultsListElement.innerHTML = '';
    quizResults.forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const questionElement = document.createElement('strong');
        questionElement.innerText = `Question ${index + 1}: ${result.question}`;
        resultItem.appendChild(questionElement);

        const correctAnswerElement = document.createElement('p');
        correctAnswerElement.classList.add('correct-answer');
        correctAnswerElement.innerText = `Correct Answer: ${result.correctAnswer}`;
        resultItem.appendChild(correctAnswerElement);

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
 * Retrieves high scores from cookies and updates the start screen display.
 */
function displayHighScores() {
    console.log("DEBUG: --- Displaying High Scores ---"); // DEBUG LOG
    const quizTypes = ['full', '2025', '2024'];

    quizTypes.forEach(type => {
        const scoreCookie = getCookie(`highScore_${type}_score`);
        const totalCookie = getCookie(`highScore_${type}_total`);
        const displayElement = highScoreDisplay[type];

        console.log(`DEBUG: Checking display for type: ${type}. Score Cookie: ${scoreCookie}, Total Cookie: ${totalCookie}`); // DEBUG LOG

        if (displayElement) { // Check if the display element exists
            const scoreTextElement = displayElement.querySelector('.score-text');
            const gradeTextElement = displayElement.querySelector('.grade-text');
            const starsContainer = displayElement.querySelector('.stars-container');

            if (scoreCookie !== null && totalCookie !== null) {
                const highScore = parseInt(scoreCookie, 10);
                const totalQuestions = parseInt(totalCookie, 10);

                console.log(`DEBUG: Parsed for ${type}: Score=${highScore}, Total=${totalQuestions}`); // DEBUG LOG

                if (Number.isInteger(highScore) && Number.isInteger(totalQuestions) && totalQuestions > 0) {
                    const percentage = (highScore / totalQuestions) * 100;
                    const grade = calculateGrade(highScore, totalQuestions);

                    console.log(`DEBUG: Calculated for ${type}: Percentage=${percentage.toFixed(1)}%, Grade=${grade}`); // DEBUG LOG

                    if (scoreTextElement) scoreTextElement.innerText = `${highScore}/${totalQuestions}`;
                    if (gradeTextElement) gradeTextElement.innerText = grade;
                    if (starsContainer) {
                        starsContainer.style.setProperty('--star-fill-percentage', `${percentage}%`);
                        console.log(`DEBUG: Set star fill for ${type} to ${percentage}%`); // DEBUG LOG
                    }
                } else {
                     console.log(`DEBUG: Invalid score/total found in cookie for ${type}. Displaying N/A.`); // DEBUG LOG
                     if (scoreTextElement) scoreTextElement.innerText = "N/A";
                     if (gradeTextElement) gradeTextElement.innerText = "";
                     if (starsContainer) starsContainer.style.setProperty('--star-fill-percentage', `0%`);
                }
            } else {
                console.log(`DEBUG: No high score cookies found for ${type}. Displaying N/A.`); // DEBUG LOG
                if (scoreTextElement) scoreTextElement.innerText = "N/A";
                if (gradeTextElement) gradeTextElement.innerText = "";
                if (starsContainer) starsContainer.style.setProperty('--star-fill-percentage', `0%`);
            }
        } else {
             console.error(`DEBUG: High score display element not found for type: ${type}`); // DEBUG LOG
        }
    });
     console.log("DEBUG: --- Finished Displaying High Scores ---"); // DEBUG LOG
}


/**
 * Checks if quiz container content overflows and adjusts font size via CSS variable.
 */
 function checkAndAdjustFontSize() {
    if (!quizScreen.classList.contains('active') && !endScreen.classList.contains('active')) {
        quizContainer.style.setProperty('--font-scale-factor', '1');
        return;
    }

    const currentScale = parseFloat(quizContainer.style.getPropertyValue('--font-scale-factor') || '1');
    quizContainer.style.maxHeight = 'none';
    quizContainer.offsetHeight; // Force reflow

    const contentHeight = quizContainer.scrollHeight;
    const viewportHeight = window.innerHeight;
    const targetHeight = viewportHeight * TARGET_VIEWPORT_HEIGHT_RATIO;
    let applyScaleFactor = 1;

    if (contentHeight > targetHeight) {
        applyScaleFactor = targetHeight / contentHeight;
        applyScaleFactor = Math.max(applyScaleFactor, MIN_FONT_SCALE_FACTOR);
    }

    quizContainer.style.setProperty('--font-scale-factor', applyScaleFactor);
}

// --- Event Listeners ---
startFullBtn.addEventListener('click', () => startQuiz('full'));
start2025Btn.addEventListener('click', () => startQuiz('2025'));
start2024Btn.addEventListener('click', () => startQuiz('2024'));

retryBtn.addEventListener('click', () => {
    if (lastQuizType) {
        startQuiz(lastQuizType);
    } else {
        switchScreen(startScreen);
    }
});

backToStartBtn.addEventListener('click', () => {
    switchScreen(startScreen);
});

nextBtn.addEventListener('click', nextQuestion);

window.addEventListener('resize', () => {
    if (quizScreen.classList.contains('active') || endScreen.classList.contains('active')) {
        // Optional: Could re-run checkAndAdjustFontSize or other adjustments on resize
    }
});


// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DEBUG: DOMContentLoaded - Initializing."); // DEBUG LOG
    if (allQuestionsRaw.length === 0) {
        const data2025 = typeof quizData !== 'undefined' ? quizData : [];
        const dataOld1 = typeof oldQuizData !== 'undefined' ? oldQuizData : [];
        const dataOld2 = typeof oldQuizDataTwo !== 'undefined' ? oldQuizDataTwo : [];
        const dataOld3 = typeof oldQuizDataThree !== 'undefined' ? oldQuizDataThree : [];
        allQuestionsRaw = data2025.concat(dataOld1, dataOld2, dataOld3);
         console.log(`DEBUG: Initial question load complete. Total raw questions: ${allQuestionsRaw.length}`); // DEBUG LOG
    }
    // Call switchScreen which will handle initial display and high score loading
    switchScreen(startScreen);
});
