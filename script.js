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

// --- Original Raw Data (for conversion) ---
const quizData = [
    {
        question: "In terms of the definition of what is a safety-critical system in an engineering context, which of the following is the best description?",
        answers: [
            "There may be loss of life or serious injury.",
            "There may be loss of life or serious injury, or significant damage to property or the environment.",
            "The system is used to critically identify the safety of other systems.",
            "There may be significant damage to property or the environment."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "In the context of safety-critical systems, which of the following statements is true about the role or nature of software?",
        answers: [
            "Software is easier to model and test than hardware since software typically has fewer possible states.",
            "Software can directly cause injury or loss of life.",
            "The controller of the system should always be software.",
            "Software does not deteriorate in the same predicable ways over time as hardware does."
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to 'd'
    },
    {
        question: "In safety-critical systems, why is redundancy considered a critical design feature?",
        answers: [
            "It provides a backup in case of system component failure.",
            "It reduces the overall cost of the system as components identified as redundant can be removed after the design phase before the team has to pay the cost of implementation.",
            "It ensures system performance optimisation.",
            "It guarantees faster system response times as there are more components working than you minimally need."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to 'a'
    },
    {
        question: "In IEC-61508, there are different levels of consequences that are used in conjunction with likelihoods to determine if a risk is acceptable. Which of the following statements is true?",
        answers: [
            "Critical consequences with a likelihood level of 'remote' are tolerable if cost of mitigation would exceed improvement.",
            "Marginal consequences with a likelihood level of 'probable' are acceptable as they stand, though need to be monitored.",
            "Critical consequences deal with the loss of multiple lives.",
            "Critical consequences that have a likelihood level of 'occasional' are unacceptable in any circumstance."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to 'a'
    },
    {
        question: "The design of safety-critical systems is about handling hazards. Which of the following statements most accurately reflects the role of design?",
        answers: [
            "All states related to that hazard must have the potential loss associated with that state mitigated.",
            "All states related to that hazard must either be eliminated or have the potential loss associated with that state mitigated.",
            "The system design must handle hazards as if they were independent of the environment the system operates in.",
            "All states related to that hazard must be eliminated."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "In DO178-C, the number of objectives differs depending on the severity classification / level. Which of the following statements is true?",
        answers: [
            "The number of objectives that teams must use an independent authority – external to themselves – to verify increases the higher the severity classification / level.",
            "The number of objectives decreases the higher the severity level, to reflect the fact that the team can't be expected to cope with higher stress and more complexity.",
            "At the catastrophic severity classification/level, one of the objectives must be to document how the team intends to avoid unnecessary panic.",
            "There are eight severity classifications in DO178-C."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to 'a'
    },
    {
        question: "Which statement about 'Fault Tree Analysis' in safety-critical software development is true?",
        answers: [
            "It is focussed on finding the one root cause of all possible hazards.",
            "It is a form of static analysis that is done on a design model.",
            "It is useful to identify the level of liability if a fault occurs.",
            "It can help in identifying where system redundancies are needed."
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to 'd'
    },
    {
        question: "What has – in the experience of some assessors for IEC 61508 – been one of the most challenging aspects for software developers to gain certification of their systems?",
        answers: [
            "Arguments over which coding standards to apply.",
            "Legacy code issues.",
            "The incremental approach chosen by the developers.",
            "An over-reliance on software tools."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "Why is the 'Layered Architecture' approach beneficial for safety-critical systems?",
        answers: [
            "It can ensure that systems operate in a time-critical manner by removing layers on-demand for efficiency gains.",
            "It facilitates system maintenance and upgrades by separating concerns into different layers.",
            "It ensures faster development times by allowing developers to work in parallel.",
            "It enhances system security by incorporating multiple layers of encryption."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "Given the critical nature of software updates in safety-critical systems, which of the following approaches would be best for managing and deploying updates that ensures ongoing system safety and integrity?",
        answers: [
            "Focus solely on security updates, ignoring functional improvements.",
            "Each update must undergo comprehensive regression testing, risk assessment, and be certified against relevant safety standards before deployment.",
            "Updates should be deployed as soon as they are written to ensure immediate benefit.",
            "Deploy updates only when users request them, to minimise disruption."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "What is a primary advantage of using static analysis tools in software development?",
        answers: [
            "They can execute the program to identify runtime errors.",
            "They help in optimising the code for better performance.",
            "They can detect errors and defects in the source code without program execution.",
            "They enhance the usability of the system by identifying performance bottlenecks that will slow users down."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to 'c'
    },
    {
        question: "What is the primary purpose of employing 'ALARP' (\"As Low As Reasonably Practicable\") in the design of safety-critical systems?",
        answers: [
            "To ensure that risk are associated with low-level software requirements rather than high-level software requirements.",
            "To completely eliminate all risks in the system.",
            "To balance risk reduction ensuring that costs of risk reduction do not grossly and disproportionately outweigh benefits.",
            "To ensure that there are as few risks as possible."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to 'c'
    },
    {
        question: "A 'minimal cut set' is a concept in fault tree analysis. Which of the following statements is true about minimal cut sets?",
        answers: [
            "A minimal cut set is a linear ordering of all of the leaf nodes in a fault tree.",
            "Only a single minimal cut set can exist in a fault tree.",
            "Multiple minimal cut sets may exist in a fault tree.",
            "The minimal cut set is the vertical slice of the fault tree analysis (including the root node and intermediary pseudo-events) which is the narrowest sub-tree available that still leads to the root node event occurring."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to 'c'
    },
    {
        question: "Which of the following statements is true about 'white-box' testing methods used in safety-critical software development?",
        answers: [
            "Where as 'black box testing' involves using requirements to create new test cases, 'white-box' testing is about using test cases to create new requirements.",
            "'White-box testing' allows developers to verify and test the internal workings of the system in a way that 'black box testing' does not support.",
            "Unlike 'black-box testing', 'white-box testing' is not a requirement for avionics systems as only black boxes are installed on aircraft.",
            "'White-box testing' is only done after all bugs have been found and resolved, as a final sanity check to ensure nothing has been missed."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "What is the purpose of a 'Safety Case' in the development of safety-critical software?",
        answers: [
            "To document the financial cost of the system's safety features.",
            "To provide a structured argument supported by evidence that a system is safe for a given application in a given environment.",
            "To list all the safety incidents that have occurred during testing.",
            "To outline the safety training required for system operators."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "Which of the following statements is NOT true about the concept of 'Derived Requirements' ?",
        answers: [
            "They can be requirements that may not be directly traceable to higher level requirements.",
            "They can specify behaviour beyond that specified by the system requirements or higher level requirements.",
            "They appear in DO-178C.",
            "They are requirements that are based on similar past projects." // Correct answer is the NOT true statement
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to 'd'
    },
    {
        question: "In the context of 'Control-Flow Graphs' and 'Definite Assignment' in Static Analysis, which of the following statements best defines the concept of 'Conservatism' ?",
        answers: [
            "The number of steps between the assignment of a value to a variable and the use of that value must be minimised.",
            "It is not taken into account which paths are infeasible.",
            "Variables can only be assigned values on the right-hand side of the control flow graph.",
            "All variables must always be assigned values in the very first node of the control flow graph."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "What does the concept of 'safety assurance' mean in the context of safety-critical systems?",
        answers: [
            "It is about the team outwardly projecting confidence to end users that they are safe so as to avoid stoking fear.",
            "It provides confidence that the costs of hazards can be adequately covered by those liable.",
            "It provides some kind of measurement to predict the quantity and nature of accidents that will occur.",
            "It provides confidence that hazards have been eliminated or controlled."
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to 'd'
    },
    {
        question: "Which standard directly requires that safety-critical software systems undergo a process of hazard analysis and risk assessment?",
        answers: [
            "DO-178C",
            "IEC-61508",
            "Agile Manifesto",
            "ISO-9001"
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "GAMAB is a similar concept to ALARP (\"As Low As Reasonably Practicable\"). What does GAMAB say about the acceptable level of risk in a system under design?",
        answers: [
            "That risks should have good assurance models at believable levels.",
            "That the level of risk in a new system must be no worse than any existing equivalent system.",
            "That risks be stated in multiple languages, including French, as international audiences may have different levels of acceptability for risk and their input is important to determine what is as low as reasonably practicable.",
            "That acceptable levels of risk should be lower than what the average client would think is the case, as the average client usually doesn't know what they are talking about."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "Which of the following is NOT an example of 'Functional Safety' ?",
        answers: [
            "A physical fixed guard on a device that stops someone from placing their eye in the direct line of a laser beam.", // This is physical safety, not functional safety.
            "A sensor that stops a spinning blade if someone's hand is detected in close proximity.",
            "Collision detection sensors and alerts on a grounded aircraft that stop the aircraft (assume wheels down and on the tarmac).",
            "A barrier that is automatically lowered over a train crossing to stop cars and pedestrians from crossing train tracks when an approaching train is detected."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to 'a' (the one that is NOT functional safety)
    },
    {
        question: "In a '2oo3' system architecture, what does '2oo3' stand for?",
        answers: [
            "Two out of three components must agree for the system to proceed.",
            "Two out of three attempts to execute a command must succeed.",
            "The system operates on two out of three layers of security.",
            "The system consists of two operational units and one backup unit."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to 'a'
    },
    {
        question: "Errors in the development of the Therac-25 system led to multiple deaths through radiation overdosing. Which of the following statements is true?",
        answers: [
            "Lives were saved by the replacement of the hardware interlocks in the Therac-6 and Therac-20 by superior and more rigorous software safety controls.",
            "The Therac-25 system avoided using legacy code, which was detrimental to the Therac-25 as the previous legacy code worked on the Therac-6 and Therac-20.",
            "The Therac-25 system failed despite being signed off as being DO178-C compliant by an accrediting body, demonstrating that standards can't absolutely guarantee safety.",
            "The radiation overdosing was caused by a race condition in concurrent programming, as a result of the operator interface and machines tasks interacting."
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to 'd'
    },
    {
        question: "Which of the following statements is true about the role of software testing in safety-critical systems?",
        answers: [
            "Software testing should avoid generating some test cases based on the code as this introduces bias.",
            "A plan for software testing should be generated after coding has substantially finished, as otherwise the plan will necessarily be incomplete or out of date.",
            "Regression testing is a form of testing done when reverting back to an earlier version of the code base.",
            "Even if all individual components of a system have passed their tests, it cannot be assumed the system as a whole will pass tests."
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to 'd'
    },
    {
        question: "Safety Integrity Levels (SIL) are part of safety standard IEC-61508. Which of the following statements about SIL is true?",
        answers: [
            "SIL are a system used to measure the experience of the safety-critical software development team, with more experienced teams able to work on more dangerous systems.",
            "The level needed for a particular safety function is dependent on the difference between the assessed risk and the acceptable risk of failure of a safety-critical component.",
            "SIL measures the integrity of the team developing the safety-critical software and how much of a safety-conscious culture exists within the team.",
            "The permitted probability of failure of a safety function for a particular SIL is measured the same way independent of whether it is low demand or high demand."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "In ISO 26262, the Automotive Safety Integrity Level (ASIL) of a safety feature is determined by what method?",
        answers: [
            "Determining the manufacturer's liability if an incident were to occur and assessing the likelihood of losing a case in court.",
            "Assessing factors such as severity, exposure and controllability of risk factors.",
            "Assessing factors such as cost and probability and modelling expected fatalities if the safety feature is not present.",
            "By the team reflecting on \"what would Elon Musk do in this situation?\"."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "Which of the following statements about ISO 26262 is NOT true?",
        answers: [
            "ISO 26262 is a domain-specific variant of IEC-61508.",
            "ISO 26262 uses HARA rather than Fault Tree Analysis for assessing hazards and risks.",
            "ISO 26262 is a standard that focusses specifically on autonomous self-driving vehicles.", // This is the NOT true statement
            "ISO 26262, unlike DO-178C, focusses on safety functions rather than the whole system."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to 'c' (the one that is NOT true)
    },
    {
        question: "In the context of software design, we often want to include and document constraints on our software components. Which of the following is typically NOT a constraint included in a software component's design documentation and modelling?",
        answers: [
            "Memory Usage.",
            "Processor Time.",
            "Algorithmic Complexity.",
            "Implementation Deadlines." // Deadlines are project management constraints, not typically part of the component's technical design constraints.
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to 'd' (the one that is NOT typically a design constraint)
    },
    {
        question: "In the context of software design, which of the following statements is true about the difference between structured design and object-oriented design?",
        answers: [
            "Structured design is better for legacy systems while object-oriented design is better for more modern systems.",
            "Structured design focusses more on data encapsulation as its core principle, while object-oriented design's core principle is functional decomposition through combining data and behaviour.",
            "Structured designs tend to be tree-like, with a top-down decomposition from a higher-level module, while object-oriented designs tend to be graph-like, with a bottom-up composition.", // Correct statement
            "Structured designs are well suited for testing designs before implementation, whereas object-oriented designs are well suited for changing software to fix bugs after testing."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to 'c'
    },
    {
        question: "Which of the following statements about requirements in DO178-C is NOT true?",
        answers: [
            "The key focus of traceability is being able to trace from high-level requirements to low-level requirements.",
            "Low-level requirements have a lot of similarities with software design.",
            "Derived requirements may lead to the creation of new high-level requirements.", // This is the NOT true statement - derived requirements typically refine existing requirements or add details, they don't create entirely new high-level ones.
            "Testing engineers should have input into the requirements as they may provide a different perspective on edge cases."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to 'c' (the one that is NOT true)
    },
    {
        question: "You are working for a major aircraft manufacturer, and have been told that the new variant of a previously successfully line of aircraft now has an issue as the engines have been made larger to be more efficient. The larger engines cause the aircraft to raise its nose due to the different aerodynamics of those new engines. You have been tasked with writing software that will correct this, based on a sensor that will send your software the angle of attack data. As a software engineer working on this safety-critical project, your correct cause of action is to:",
        answers: [
            "Quietly find employment elsewhere, and ensure you never fly on this model of aircraft, as this is an unsolvable problem.",
            "Implement the software so that it silently lowers the nose of the aircraft when needed, in a way that the pilots don't need to know about so they aren't distracted, ensuring that the code is formally verified as being correct against the specifications.",
            "Identify the sensor as a single point of failure and mitigate this risk by turning the engines off if the sensor is identified to be malfunctioning, as that may reduce the aerodynamics issue causing the nose of the aircraft to lift in the first place, removing the hazard.",
            "Raise concerns with your manager about the overall safety of the system, and alert the auditor if need be." // This is the ethically and professionally correct action in a safety-critical context.
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to 'd'
    },
    {
        question: "Which of the following is a Power of Ten rule?",
        answers: [
            "Use recursion as it simplifes code structure compared to longer iterative alternaves.",
            "Garbage collection in Java solves the issue of rogue memory deallocation in C/C++, and the use of garbage collectors is encouraged.",
            "Functions should typically not be longer than 60 lines of code.", // A well-known Power of Ten rule
            "Maximal use of preprocessors support clever hacks that reduce code length and improve readability."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to 'c'
    },
    {
        question: "Which of the following is a Power of Ten rule?",
        answers: [
            "Declaring objects with the largest scope can assist with reducing complex parameter passing, as parameter passing is challenging for static analysis tools to handle.",
            "Declaring objects with the smallest scope can assist with data encapsulation and avoid data corruption.", // A well-known Power of Ten rule
            "We should aim for at most two assertions per function, as any more suggests that the function is too complicated.",
            "No class should have more than ten methods, because if it has more then the methods are unlikely to be cohesive."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to 'b'
    },
    {
        question: "Consider the concepts of reliability and availability in the context of software systems. Which of the following statements is true?",
        answers: [
            "If software architecture A has a higher availability then software architecture B, then A must also have have equal or higher reliability than B.",
            "Availability is a measure of whether the software system will remain executing irrespective of whether it is a safe or unsafe state.",
            "Reliability is not a function of time, and reliability is measured the same irrespective of how long the system is supposed to execute for.",
            "A \"2 out of 3\" architecture has a higher availability than a \"1 out of 2\" architecture, despite the \"2 out of 3\" architecture assuming two components are functioning correctly." // This statement about 2oo3 vs 1oo2 availability is generally true.
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to 'd'
    },
    {
        question: "Fault Injection is used in Software Testing. Which of the following statements about fault injection is true, assuming that the bugs deliberately injected are representative of the complete set of bugs in the system? Assume X is the set of bugs you insert into the system, Y is the set of bugs you found during testing, and Z is the set of bugs you inserted into the system that you also found during testing.",
        answers: [
            "The total number of bugs in the system can be approximated as (X/Y ) ∗ Z.",
            "If Z > X, then you can have high confidence in your software testing methodology.",
            "The total number of bugs in the system can be approximated as (X/Z) ∗ Y .", // This is a formula used in capture-recapture or fault injection for estimating total bugs.
            "Fault injection testing can be risky as you may never again find the bugs you initially insert into the system, reducing the stability of the system upon deployment."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to 'c'
    }
];

// --- Convert Raw Data to New Question Object Format ---
const quizData = Object.keys(quizDataRaw).map((question, index) => {
    const optionsRaw = quizDataRaw[question].split('|');
    // Clean up options (remove trailing commas, trim whitespace)
    const optionsCleaned = optionsRaw.map(opt => opt.trim().replace(/,$/, ''));

    // Determine the correct answer index based on the letter in answerList
    const correctAnswerLetter = answerList[index].toLowerCase(); // e.g., 'b'
    let correctAnswerIndex = -1;
    // Find the index corresponding to the letter (A=0, B=1, etc.)
    correctAnswerIndex = correctAnswerLetter.charCodeAt(0) - 'a'.charCodeAt(0);

    // Validate index (optional but good practice)
    if (correctAnswerIndex < 0 || correctAnswerIndex >= optionsCleaned.length) {
        console.error(`Invalid correct answer letter '${correctAnswerLetter}' or index for question: ${question}`);
        // Handle error appropriately, maybe default to 0 or skip question
        correctAnswerIndex = 0;
    }

    return {
        question: question.trim(),
        answers: optionsCleaned, // Use the cleaned array of answer strings
        correctAnswerIndex: correctAnswerIndex // Store the 0-based index
    };
});

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
