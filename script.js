// --- DOM Elements ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startFullBtn = document.getElementById('start-full-btn');
const start2025Btn = document.getElementById('start-2025-btn');
const start2024Btn = document.getElementById('start-2024-btn');
const retryBtn = document.getElementById('retry-btn'); // retryBtn element is no longer in HTML but keep reference for safety
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
// High Score Display Elements now use querySelector on document as it's outside quizContainer
// We still need the container reference to find elements within it.
const highScoreArea = document.getElementById('high-scores-area'); // Get the main panel
const highScoreDisplay = {
    full: highScoreArea ? highScoreArea.querySelector('#high-score-full') : null,
    '2025': highScoreArea ? highScoreArea.querySelector('#high-score-2025') : null,
    '2024': highScoreArea ? highScoreArea.querySelector('#high-score-2024') : null,
};

// --- Constants ---
const SHRINK_ANIMATION_DURATION = 400;
const CONTENT_FADE_DURATION = 300;
const BASE_ANIMATION_DURATION = 400;
const MIN_FONT_SCALE_FACTOR = 0.5;
const TARGET_VIEWPORT_HEIGHT_RATIO = 0.90; // For main quiz container
const HEIGHT_TRANSITION_DURATION = 400;
const COOKIE_EXPIRY_DAYS = 365; // Set cookies to expire in a year
const STAR_GLOW_THRESHOLDS = [33.33, 66.67, 100]; // Percentage thresholds for star 1, 2, 3 glow

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
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    // console.log(`DEBUG: Setting Cookie: ${name} = ${value}`);
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}
// --- End Cookie Helper Functions ---

// --- Session Storage Helper Functions ---
function setSessionStorageScore(quizType, score, total) {
    if (typeof(Storage) !== "undefined") {
        const scoreKey = `sessionScore_${quizType}_score`;
        const totalKey = `sessionScore_${quizType}_total`;
        sessionStorage.setItem(scoreKey, score);
        sessionStorage.setItem(totalKey, total);
        // console.log(`DEBUG: Setting Session Storage: ${scoreKey}=${score}, ${totalKey}=${total}`);
    } else {
        console.warn("Session storage is not supported by this browser.");
    }
}

function getSessionStorageScore(quizType) {
     if (typeof(Storage) !== "undefined") {
        const scoreKey = `sessionScore_${quizType}_score`;
        const totalKey = `sessionScore_${quizType}_total`;
        const score = sessionStorage.getItem(scoreKey);
        const total = sessionStorage.getItem(totalKey);
        return (score !== null && total !== null) ? { score: parseInt(score, 10), total: parseInt(total, 10) } : null;
    } else {
        return null;
    }
}
// --- End Session Storage Helper Functions ---


/**
 * Removes duplicate questions based on the question text AND answers.
 */
function deduplicateQuestions(questionsArray) {
    const uniqueQuestions = new Map();
    questionsArray.forEach(q => {
        // Ensure answers is an array before sorting and joining
        const answersString = (Array.isArray(q.answers) ? [...q.answers] : []).sort().join('|');
        const questionText = q.question ? q.question.trim() : '';
        const uniqueKey = `${questionText}|${answersString}`;
        if (!uniqueQuestions.has(uniqueKey)) {
            uniqueQuestions.set(uniqueKey, q);
        }
    });
    return Array.from(uniqueQuestions.values());
}


/**
 * Shuffles an array in place using the Fisher-Yates (Knuth) algorithm.
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
 * Switches the visible screen within the quiz container.
 * Does not affect the high score panel visibility (it's always visible now).
 * @param {HTMLElement} activeScreen The screen element to make active.
 */
function switchScreen(activeScreen) {
    // Always ensure high score panel is visible when switching screens inside quiz
    // This check might be redundant if highScoreArea is never hidden, but safe to keep.
    if (highScoreArea) {
        highScoreArea.style.display = 'block'; // Or 'flex' if it becomes a flex item in some layout
    } else {
        console.error("High score area element not found!");
    }


    console.log(`DEBUG: Switching screen to: ${activeScreen.id}`);
    const currentActive = quizContainer.querySelector('.screen.active'); // Look inside quiz container

    if (currentActive && currentActive !== activeScreen) {
        currentActive.classList.add('fade-out');
        setTimeout(() => {
            currentActive.classList.remove('active', 'fade-out');
            activeScreen.classList.add('active');
            // Reset font scale and manage height only for quiz container
            quizContainer.style.setProperty('--font-scale-factor', '1');
            // Also explicitly set it on high score area if it exists, to ensure consistency
            if (highScoreArea) {
                 highScoreArea.style.setProperty('--font-scale-factor', '1');
            }
            quizContainer.classList.remove('shrinking');
            quizContainer.style.minHeight = ''; // Reset min-height if needed
            quizContainer.style.maxHeight = 'none'; // Allow natural height

             // Animate height transition
             requestAnimationFrame(() => { // Wait for styles to apply
                 const targetHeight = quizContainer.scrollHeight; // Get natural height
                 quizContainer.style.maxHeight = targetHeight + 'px'; // Set max-height for transition

                 // Adjust font size after height is known
                 if (activeScreen === quizScreen || activeScreen === endScreen) {
                    checkAndAdjustFontSize(); // Adjust font size for quiz container (and implicitly high score area via CSS var)
                 }
                 // Refresh high scores display when returning to start screen
                 if (activeScreen === startScreen) {
                     console.log("DEBUG: Calling displayHighScores because switching to start screen.");
                     displayHighScores();
                 }

                 // After transition, allow height to be auto again
                 setTimeout(() => {
                    if (activeScreen.classList.contains('active')) { // Ensure it's still the active one
                         quizContainer.style.maxHeight = 'none';
                    }
                 }, HEIGHT_TRANSITION_DURATION);
             });

        }, BASE_ANIMATION_DURATION); // Wait for fade-out animation
    } else if (!currentActive) {
         // Initial screen load
         activeScreen.classList.add('active');
         quizContainer.style.setProperty('--font-scale-factor', '1');
         if (highScoreArea) {
             highScoreArea.style.setProperty('--font-scale-factor', '1');
         }
         quizContainer.classList.remove('shrinking');
         quizContainer.style.minHeight = '';
         quizContainer.style.maxHeight = 'none';

         requestAnimationFrame(() => {
             const targetHeight = quizContainer.scrollHeight;
             quizContainer.style.maxHeight = targetHeight + 'px';
              if (activeScreen === quizScreen || activeScreen === endScreen) {
                 checkAndAdjustFontSize();
              }
              // Display high scores on initial load (when start screen becomes active)
              if (activeScreen === startScreen) {
                 console.log("DEBUG: Calling displayHighScores on initial load.");
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
 */
function startQuiz(quizType) {
    console.log(`DEBUG: Starting quiz type: ${quizType}`);
    lastQuizType = quizType;
    score = 0;
    currentQuestionIndex = 0;
    quizResults = [];

    // Ensure question data arrays exist, default to empty arrays if not defined
    const data2025 = typeof quizData !== 'undefined' ? quizData : [];
    const dataOld1 = typeof oldQuizData !== 'undefined' ? oldQuizData : [];
    const dataOld2 = typeof oldQuizDataTwo !== 'undefined' ? oldQuizDataTwo : [];
    const dataOld3 = typeof oldQuizDataThree !== 'undefined' ? oldQuizDataThree : [];

    // Load all questions only once
    if (allQuestionsRaw.length === 0) {
        allQuestionsRaw = data2025.concat(dataOld1, dataOld2, dataOld3);
         console.log(`DEBUG: Initial question load. Raw questions: ${allQuestionsRaw.length}`);
    }

    // Select questions based on quiz type
    let selectedQuestionsRaw = [];
    if (quizType === 'full') {
        // Use the pre-combined list if available, otherwise combine now
        selectedQuestionsRaw = allQuestionsRaw.length > 0 ? allQuestionsRaw : data2025.concat(dataOld1, dataOld2, dataOld3);
    } else if (quizType === '2025') {
        selectedQuestionsRaw = data2025;
    } else if (quizType === '2024') {
        // Combine all non-2025 data sources
        selectedQuestionsRaw = dataOld1.concat(dataOld2, dataOld3);
    } else {
        console.error("Invalid quiz type specified:", quizType);
        // Optionally provide user feedback here (e.g., an alert)
        return;
    }

    // Deduplicate and shuffle the selected questions
    questionsToUse = shuffleArray(deduplicateQuestions(selectedQuestionsRaw));
     console.log(`DEBUG: Questions to use for ${quizType}: ${questionsToUse.length}`);

    // Handle case where no questions are available for the selected type
    if (questionsToUse.length === 0) {
        console.error("No questions available for the selected quiz type:", quizType);
        // Use a more user-friendly way to show errors than alert if possible
        alert(`Error: No questions found for the '${quizType}' test.`);
        switchScreen(startScreen); // Go back to start screen
        return;
    }

    // Switch to the quiz screen and show the first question after a delay
    switchScreen(quizScreen);
    // Delay showing question slightly to allow screen transition animation
    setTimeout(() => { showQuestion(); }, BASE_ANIMATION_DURATION + 50);
}

/**
 * Displays the current question and its answer options.
 */
function showQuestion() {
    resetState(); // Reset UI state (buttons, feedback, etc.)

    // Safety check for invalid index
    if (currentQuestionIndex >= questionsToUse.length || currentQuestionIndex < 0) {
         console.error(`Invalid currentQuestionIndex: ${currentQuestionIndex}. Total questions: ${questionsToUse.length}`);
         endQuiz(); // End quiz if index is out of bounds
         return;
    }

    const currentQuestion = questionsToUse[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    const totalQuestions = questionsToUse.length;

    // Update HUD
    questionCounterText.innerText = `Question ${questionNumber} / ${totalQuestions}`;

    // Validate question object
    if (!currentQuestion || typeof currentQuestion.question !== 'string') {
        console.error("Error: Invalid question object at index:", currentQuestionIndex, currentQuestion);
        questionText.innerText = "Error loading question text.";
        answerButtonsElement.innerHTML = ''; // Clear any previous buttons
        nextBtn.classList.add('visible'); // Allow skipping broken question
        return;
    }

    // Display question text
    questionText.innerText = currentQuestion.question;
    answerButtonsElement.innerHTML = ''; // Clear previous answer buttons

    // Create and display answer buttons
    if (Array.isArray(currentQuestion.answers)) {
        currentQuestion.answers.forEach((answerText, index) => {
            const button = document.createElement('button');
            const letter = String.fromCharCode(65 + index); // A, B, C...
            // Ensure answerText is a string before displaying
            button.innerText = `${letter}) ${typeof answerText === 'string' ? answerText : 'Invalid Option'}`;
            button.classList.add('btn');
            button.dataset.answerIndex = index; // Store index for checking answer
            button.addEventListener('click', handleAnswerClick);
            answerButtonsElement.appendChild(button);
        });
    } else {
        // Handle case where answers are missing or invalid
        console.error("Invalid or missing answers array for question:", currentQuestionIndex, currentQuestion);
        questionText.innerText = currentQuestion.question + "\n\n (Error: Answers could not be loaded.)";
         nextBtn.classList.add('visible'); // Allow skipping
    }

    // Manage quiz container height and font size adjustments
    quizContainer.style.maxHeight = 'none'; // Allow height to adjust naturally first
    requestAnimationFrame(() => { // Wait for reflow
        checkAndAdjustFontSize(); // Adjust font size based on content (affects both panels now)
        const newHeight = quizContainer.scrollHeight; // Get height after font adjustment
        quizContainer.style.maxHeight = newHeight + 'px'; // Set max-height for transition

        // Fade in new question content after a slight delay
        setTimeout(() => {
             questionText.classList.remove('text-fade-out'); // Ensure fade-out class is removed
             questionText.classList.add('text-fade-in');
             answerButtonsElement.style.opacity = '1';
             feedbackText.style.opacity = '1'; // Also fade in feedback area (even if empty)
        }, 50); // Small delay for visual smoothness

        // Remove max-height after transition completes
        setTimeout(() => {
            // Check if still on quiz screen before removing max-height
            if (quizScreen.classList.contains('active')) {
                 quizContainer.style.maxHeight = 'none';
            }
        }, HEIGHT_TRANSITION_DURATION);
    });

    // Clear previous feedback
    feedbackText.innerText = '';
    feedbackText.className = 'feedback-text'; // Reset feedback style
    nextBtn.classList.remove('visible'); // Hide next button initially
}

/**
 * Resets the state of UI elements between questions.
 */
function resetState() {
    // Re-enable buttons and remove result styling
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('correct', 'incorrect', 'disabled');
        button.disabled = false;
    });

    // Reset question text animation classes and opacity
    questionText.classList.remove('text-fade-out', 'text-fade-in');
    questionText.style.opacity = ''; // Let CSS handle initial state (can be 0 or 1)

    // Hide elements that should fade in with the question
    answerButtonsElement.style.opacity = '0';
    feedbackText.style.opacity = '0';

    // Clear feedback text and styling
    feedbackText.innerText = '';
    feedbackText.className = 'feedback-text';

    // Hide the next button
    nextBtn.classList.remove('visible');

    // Ensure container is not stuck in shrinking state (if applicable)
    quizContainer.classList.remove('shrinking');
}

/**
 * Handles the click event on an answer button.
 */
function handleAnswerClick(event) {
    const selectedButton = event.target;
    // Ensure dataset.answerIndex exists and parse it
    const selectedAnswerIndex = selectedButton.dataset.answerIndex !== undefined
        ? parseInt(selectedButton.dataset.answerIndex, 10)
        : undefined;


    // Safety check for quiz state
    if (currentQuestionIndex >= questionsToUse.length || currentQuestionIndex < 0) {
        console.error("Error in handleAnswerClick: Invalid currentQuestionIndex:", currentQuestionIndex);
        return; // Exit if state is invalid
    }
    const currentQuestion = questionsToUse[currentQuestionIndex];

    // Validate necessary data before proceeding
    if (!currentQuestion || !Array.isArray(currentQuestion.answers) || typeof currentQuestion.correctAnswerIndex !== 'number' || selectedAnswerIndex === undefined) {
        console.error("Error processing answer click: Invalid question data or selected index.", currentQuestionIndex, currentQuestion);
        // Disable all buttons to prevent further interaction
        Array.from(answerButtonsElement.children).forEach(button => { button.classList.add('disabled'); button.disabled = true; });
        nextBtn.classList.add('visible'); // Allow user to proceed
        return;
    }

    const correctAnswerIndex = currentQuestion.correctAnswerIndex;
    const isCorrect = selectedAnswerIndex === correctAnswerIndex;

    // Get text for user's answer and correct answer for results log
    const userAnswerText = currentQuestion.answers[selectedAnswerIndex] || "Invalid Answer Selected";
    const correctAnswerText = currentQuestion.answers[correctAnswerIndex] || "Correct Answer N/A";

    // Log the result
    quizResults.push({
        question: currentQuestion.question || "Missing Question Text",
        userAnswer: userAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect: isCorrect
    });

    // Disable all buttons and highlight the correct one
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.add('disabled');
        button.disabled = true;
        // Highlight the actual correct answer regardless of user choice
        if (parseInt(button.dataset.answerIndex, 10) === correctAnswerIndex) {
            button.classList.add('correct');
        }
    });

    // Provide visual feedback on the selected button and text feedback
    feedbackText.style.opacity = '1'; // Make feedback visible
    if (isCorrect) {
        // If selected button is correct, it's already styled by the loop above
        feedbackText.innerText = "Correct!";
        feedbackText.className = 'feedback-text correct'; // Add green color class
        score++; // Increment score
    } else {
        // If selected button is incorrect, add incorrect styling to it
        selectedButton.classList.add('incorrect'); // Add red color / shake animation
        const correctLetter = String.fromCharCode(65 + correctAnswerIndex); // Get letter of correct answer
        feedbackText.innerText = `Incorrect! Correct answer was ${correctLetter}.`;
        feedbackText.className = 'feedback-text incorrect'; // Add red color class
    }

    // --- NEW LOGIC: Check if this was the last question and save/display score immediately ---
    const totalQuestions = questionsToUse.length;
    if (currentQuestionIndex === totalQuestions - 1) {
        console.log("DEBUG: Last question answered. Calling saveAndDisplayCurrentScore.");
        // Call the function to save and display the score immediately
        saveAndDisplayCurrentScore(lastQuizType, score, totalQuestions);
    }
    // --- END NEW LOGIC ---


    // Show the 'Next' button
    nextBtn.classList.add('visible');
}


/**
 * Moves to the next question or ends the quiz.
 */
function nextQuestion() {
    // Fade out current question content
    questionText.classList.remove('text-fade-in'); // Ensure fade-in is removed first
    questionText.classList.add('text-fade-out');
    answerButtonsElement.style.opacity = '0';
    feedbackText.style.opacity = '0';
    nextBtn.classList.remove('visible'); // Hide next button during transition

    // Wait for fade-out animation to complete before loading next question
    setTimeout(() => {
        currentQuestionIndex++; // Move to the next index
        if (currentQuestionIndex < questionsToUse.length) {
            // If there are more questions, set container height for transition and show next question
            quizContainer.style.maxHeight = quizContainer.scrollHeight + 'px'; // Lock height before content change
            requestAnimationFrame(() => { showQuestion(); }); // Show next question in next frame
        } else {
             // If no more questions, end the quiz
             endQuiz();
        }
    }, CONTENT_FADE_DURATION); // Duration should match CSS fade-out time
}

/**
 * Calculates the letter grade based on percentage score.
 */
function calculateGrade(score, total) {
    // Handle invalid inputs
    if (total === 0 || isNaN(score) || isNaN(total)) return "N/A";

    const percentage = (score / total) * 100;

    // Define grade thresholds
    if (percentage >= 90) return "A+";
    if (percentage >= 85) return "A";
    if (percentage >= 80) return "A-";
    if (percentage >= 75) return "B+";
    if (percentage >= 70) return "B";
    if (percentage >= 65) return "B-";
    if (percentage >= 60) return "C+";
    if (percentage >= 55) return "C";
    if (percentage >= 50) return "C-";
    if (percentage >= 45) return "D"; // Assuming 45 is the threshold for D
    return "F"; // Anything below D threshold
}

/**
 * Saves the current quiz score to session storage and cookies (if it's a high score),
 * and then updates the high score display panel.
 * @param {string} quizType The type of quiz ('full', '2025', or '2024').
 * @param {number} finalScore The final score achieved in the quiz.
 * @param {number} totalQuestions The total number of questions in the quiz.
 */
function saveAndDisplayCurrentScore(quizType, finalScore, totalQuestions) {
    console.log("DEBUG: --- Saving and Displaying Current Score ---");
    // Only save if a quiz type was selected and there were questions
    if (quizType && totalQuestions > 0) {
         const scoreCookieName = `highScore_${quizType}_score`;
         const totalCookieName = `highScore_${quizType}_total`;

         // Get previous high score from cookie
         const previousHighScoreRaw = getCookie(scoreCookieName);
         const previousHighScore = parseInt(previousHighScoreRaw || "-1", 10); // Default to -1 if no cookie

         console.log(`DEBUG: Checking high score for ${quizType}. Current: ${finalScore}, Previous Cookie: ${previousHighScore}`);

        // Ensure scores are valid numbers before comparing/saving
        if (Number.isInteger(finalScore) && Number.isInteger(totalQuestions)) {
            // Always save the current score to session storage
            setSessionStorageScore(quizType, finalScore, totalQuestions);

            // Save to cookie only if it's a new high score (or equal)
            if (finalScore >= previousHighScore) {
                 console.log(`DEBUG: New/Equal high score! Saving to cookie...`);
                setCookie(scoreCookieName, finalScore, COOKIE_EXPIRY_DAYS);
                setCookie(totalCookieName, totalQuestions, COOKIE_EXPIRY_DAYS);
            } else {
                 console.log(`DEBUG: Score (${finalScore}) not higher than cookie (${previousHighScore}). Not updating cookie.`);
            }
        } else {
             console.error("DEBUG: Type error during high score comparison/save. Score or Total invalid.");
        }
    } else {
        console.log("DEBUG: Not saving high score (No quizType or totalQuestions is 0).");
    }
    // --- End Save High Score ---

    // Update the high score display panel immediately (add a small delay to help trigger CSS transition)
    setTimeout(() => {
        displayHighScores();
    }, 50); // Add a small delay (e.g., 50ms)

     console.log("DEBUG: --- Finished Saving and Displaying Current Score ---");
}


/**
 * Ends the quiz, displays the final score, and displays results.
 */
function endQuiz() {
    console.log("DEBUG: --- End Quiz ---");
    const totalQuestions = questionsToUse.length;
    const finalScore = score; // Use the accumulated score

    // Display final score text
    resultText.innerText = totalQuestions > 0
        ? `You scored ${finalScore} out of ${totalQuestions}!`
        : `Quiz ended. No questions were attempted.`; // Handle case of 0 questions

    console.log(`DEBUG: Final Score: ${finalScore}/${totalQuestions}. Quiz Type: ${lastQuizType}`);

    // --- REMOVED: Score saving and display logic moved to saveAndDisplayCurrentScore ---
    // The logic that was here before has been moved to the saveAndDisplayCurrentScore function,
    // which is now called when the LAST question is answered.
    // --- END REMOVED ---


    // Display the detailed results list (This remains in endQuiz)
    displayResults();

    // Prepare for screen transition (This remains in endQuiz)
    quizContainer.style.maxHeight = 'none'; // Allow end screen to determine height
    requestAnimationFrame(() => { switchScreen(endScreen); }); // Switch to end screen
}

/**
 * Generates and displays the list of quiz results on the end screen.
 */
function displayResults() {
    resultsListElement.innerHTML = ''; // Clear previous results
    if (quizResults.length === 0) {
         // Display a message if there are no results (e.g., quiz ended prematurely)
         resultsListElement.innerHTML = '<div class="result-item"><p>No results to display.</p></div>';
         return;
    }

    // Create an item for each result
    quizResults.forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        // Use innerHTML to structure the result item easily
        resultItem.innerHTML = `
            <strong>Question ${index + 1}: ${result.question || 'Question text missing'}</strong>
            <p class="correct-answer">Correct Answer: ${result.correctAnswer || 'N/A'}</p>
            <p class="user-answer ${!result.isCorrect ? 'incorrect' : ''}">Your Answer: ${result.userAnswer || 'N/A'}</p>
        `;
        resultsListElement.appendChild(resultItem);
    });
}


/**
 * Retrieves high scores (from session or cookie) and updates the high score panel display, including stars.
 */
function displayHighScores() {
    console.log("DEBUG: --- Displaying High Scores ---");
    const quizTypes = ['full', '2025', '2024']; // Types of quizzes to display scores for

    quizTypes.forEach(type => {
        // Find the specific display container for this quiz type
        const displayElement = highScoreDisplay[type];

        if (!displayElement) {
             console.error(`DEBUG: High score display element not found for type: ${type}`);
             return; // Skip this type if its display element doesn't exist
        }

        // Find the elements within the display container needed for updates
        const scoreTextElement = displayElement.querySelector('.score-text');
        const gradeTextElement = displayElement.querySelector('.grade-text');
        const starsContainer = displayElement.querySelector('.stars-container');
        const starsForeground = starsContainer ? starsContainer.querySelector('.stars-foreground') : null;
        // Get individual star spans within the foreground div
        const starSpans = starsForeground ? starsForeground.querySelectorAll('.star') : []; // Use foreground stars for glow

        // Check if all necessary sub-elements were found
        if (!scoreTextElement || !gradeTextElement || !starsContainer || !starsForeground || starSpans.length !== 3) {
            console.warn(`DEBUG: Missing required elements within high score display for type: ${type}. Check HTML structure.`);
            // Attempt to clear/reset the display partially if possible
            if(scoreTextElement) scoreTextElement.innerText = "Error";
            if(gradeTextElement) gradeTextElement.innerText = "";
            if(starsForeground) starsForeground.style.width = '0%';
            if(starsContainer) starsContainer.classList.remove('rainbow-stars');
            // Ensure starSpans exists before iterating
            if(starSpans) starSpans.forEach(span => span.classList.remove('glow'));
            return; // Skip further processing for this entry
        }


        // --- Determine the score to display (Session > Cookie) ---
        let highScore = -1; // Default score if none found
        let totalQuestions = 0; // Default total
        let scoreSource = 'None'; // Track where the score came from

        // 1. Try Session Storage first (most recent score)
        const sessionScoreData = getSessionStorageScore(type);
        if (sessionScoreData && Number.isInteger(sessionScoreData.score) && Number.isInteger(sessionScoreData.total) && sessionScoreData.total > 0) {
             highScore = sessionScoreData.score;
             totalQuestions = sessionScoreData.total;
             scoreSource = 'Session';
        } else {
            // 2. If no session score, try Cookies (persistent high score)
            const scoreCookie = getCookie(`highScore_${type}_score`);
            const totalCookie = getCookie(`highScore_${type}_total`);
            if (scoreCookie !== null && totalCookie !== null) {
                const cookieScore = parseInt(scoreCookie, 10);
                const cookieTotal = parseInt(totalCookie, 10);
                 // Validate cookie data
                 if (Number.isInteger(cookieScore) && Number.isInteger(cookieTotal) && cookieTotal > 0) {
                    highScore = cookieScore;
                    totalQuestions = cookieTotal;
                    scoreSource = 'Cookie';
                    // Optional: Sync cookie score back to session if session was empty
                    setSessionStorageScore(type, highScore, totalQuestions);
                }
            }
        }
        // --- End Score Determination ---

        // Update Score and Grade Text Display
        if (highScore > -1 && totalQuestions > 0) {
            scoreTextElement.innerText = `${highScore}/${totalQuestions}`;
            gradeTextElement.innerText = calculateGrade(highScore, totalQuestions);
        } else {
            // Display 'N/A' if no valid score was found
            scoreTextElement.innerText = "N/A";
            gradeTextElement.innerText = ""; // Clear grade text
        }

        // Update Star Rating Display (Fill, Glow, Rainbow)
        let percentage = 0;
        if (highScore > -1 && totalQuestions > 0) {
            // Calculate percentage, ensuring it's between 0 and 100
            percentage = Math.max(0, Math.min(100, (highScore / totalQuestions) * 100));
        }

        // Set star fill percentage - This triggers the CSS transition
        starsForeground.style.width = `${percentage}%`;

        // Add/remove rainbow class for 100% scores
        if (percentage === 100) {
            starsContainer.classList.add('rainbow-stars');
        } else {
            starsContainer.classList.remove('rainbow-stars');
        }

        // Set individual star glow based on percentage thresholds
        starSpans.forEach((star, index) => {
            // Add 'glow' class if percentage meets or exceeds the threshold for this star
            if (percentage >= STAR_GLOW_THRESHOLDS[index]) {
                 star.classList.add('glow');
            } else {
                star.classList.remove('glow');
            }
        });

        // Log the final state for debugging
        console.log(`DEBUG: ${type} - Score: ${highScore}/${totalQuestions} (${percentage.toFixed(1)}%). Source: ${scoreSource}. Glow: [${starSpans[0].classList.contains('glow')}, ${starSpans[1].classList.contains('glow')}, ${starSpans[2].classList.contains('glow')}]. Rainbow: ${percentage === 100}.`);

    }); // End loop through quizTypes
     console.log("DEBUG: --- Finished Displaying High Scores ---");
}


/**
 * Checks if quiz container content overflows its available vertical space
 * and adjusts font size via CSS variable (--font-scale-factor) if needed.
 * This affects both .quiz-container and #high-scores-area now.
 */
 function checkAndAdjustFontSize() {
    // Ensure quizContainer exists (it controls the scaling)
    if (!quizContainer) {
        console.warn("checkAndAdjustFontSize: quizContainer element not found.");
        return;
    }

    // Only perform adjustment if the quiz or end screen is active within the quiz container
    const quizScreenActive = quizScreen && quizScreen.classList.contains('active');
    const endScreenActive = endScreen && endScreen.classList.contains('active');

    // Default scale factor
    let applyScaleFactor = 1;

    if (quizScreenActive || endScreenActive) {
        // Temporarily remove max-height to measure natural content height
        quizContainer.style.maxHeight = 'none';
        // Force browser reflow to get updated scrollHeight
        quizContainer.offsetHeight;

        const contentHeight = quizContainer.scrollHeight; // Height of content inside
        const viewportHeight = window.innerHeight; // Height of the browser window

        // Calculate available height for the quiz container
        const containerMarginTop = parseInt(getComputedStyle(quizContainer).marginTop) || 0;
        const containerMarginBottom = parseInt(getComputedStyle(quizContainer).marginBottom) || 0;
        const bodyPaddingTop = parseInt(getComputedStyle(document.body).paddingTop) || 0;
        const bodyPaddingBottom = parseInt(getComputedStyle(document.body).paddingBottom) || 0;
        const availableHeight = viewportHeight - containerMarginTop - containerMarginBottom - bodyPaddingTop - bodyPaddingBottom;

        // Target height is a percentage of the available height
        const targetHeight = availableHeight * TARGET_VIEWPORT_HEIGHT_RATIO;

        // If content overflows the target height, calculate the required scale factor
        if (contentHeight > targetHeight && targetHeight > 0) { // Ensure targetHeight is positive
            applyScaleFactor = targetHeight / contentHeight;
            // Clamp the scale factor to the minimum allowed value
            applyScaleFactor = Math.max(applyScaleFactor, MIN_FONT_SCALE_FACTOR);
        }
    }

    // Apply the calculated scale factor using the CSS variable on BOTH containers
    quizContainer.style.setProperty('--font-scale-factor', applyScaleFactor);
    if (highScoreArea) {
        highScoreArea.style.setProperty('--font-scale-factor', applyScaleFactor);
    }
}

// --- Event Listeners ---
// Attach listeners only if the buttons exist
if(startFullBtn) startFullBtn.addEventListener('click', () => startQuiz('full'));
if(start2025Btn) start2025Btn.addEventListener('click', () => startQuiz('2025'));
if(start2024Btn) start2024Btn.addEventListener('click', () => startQuiz('2024'));

// The retry button is removed from HTML, listener is effectively unused but harmless if kept
// if(retryBtn) retryBtn.addEventListener('click', () => {
//     // Retry the last quiz type if known, otherwise go to start
//     if (lastQuizType) {
//         startQuiz(lastQuizType);
//     } else {
//         switchScreen(startScreen);
//     }
// });

if(backToStartBtn) backToStartBtn.addEventListener('click', () => { switchScreen(startScreen); });
if(nextBtn) nextBtn.addEventListener('click', nextQuestion);

// Adjust quiz container font size on window resize
window.addEventListener('resize', checkAndAdjustFontSize);


// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DEBUG: DOMContentLoaded - Initializing.");

    // --- Critical Element Check ---
    // Verify that all essential container elements exist in the DOM
     if (!quizContainer || !startScreen || !quizScreen || !endScreen || !highScoreArea) {
         console.error("CRITICAL ERROR: Core layout elements missing from HTML. Aborting initialization. Check IDs: quiz-container, start-screen, quiz-screen, end-screen, high-scores-area");
         // Display an error message to the user if core elements are missing
         document.body.innerHTML = '<p style="color: red; font-size: 1.5em; text-align: center; padding: 50px; background: #333; border-radius: 10px; margin: 50px auto; max-width: 600px;">Error: Could not initialize quiz. Essential HTML elements are missing. Please check the HTML file structure.</p>';
         return; // Stop execution if critical elements are missing
     }
     // --- End Critical Element Check ---

    // Load question data (assuming questions.js defines these variables globally)
    const data2025 = typeof quizData !== 'undefined' ? quizData : [];
    const dataOld1 = typeof oldQuizData !== 'undefined' ? oldQuizData : [];
    const dataOld2 = typeof oldQuizDataTwo !== 'undefined' ? oldQuizDataTwo : [];
    const dataOld3 = typeof oldQuizDataThree !== 'undefined' ? oldQuizDataThree : [];

    // Combine all questions into a single raw list if not already done
    if (allQuestionsRaw.length === 0) {
        allQuestionsRaw = data2025.concat(dataOld1, dataOld2, dataOld3);
         console.log(`DEBUG: Initial question load on DOMContentLoaded. Raw questions: ${allQuestionsRaw.length}`);
    }

    // Switch to the start screen initially.
    // displayHighScores will be called by switchScreen when the start screen becomes active.
    switchScreen(startScreen);
});
