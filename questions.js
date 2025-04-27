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
            "Derived requirements may lead to the creation of new high-level requirements.", 
            "Testing engineers should have input into the requirements as they may provide a different perspective on edge cases."
        ],
        correctAnswerIndex: 0 // Index 2 corresponds to 'a' (the one that is NOT true)
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

const oldQuizData = [
    {
        question: "In terms of the definition of what is a safety-critical system in an engineering context, which of the following is the best description?",
        answers: [
            "There may be loss of life or serious injury.",
            "There may be significant damage to property or the environment.",
            "There may be loss of life or serious injury, or significant damage to property or the environment.",
            "The system is used to critically assess the safety of other systems."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "In the context of safety-critical systems, which of the following statements is true about the role or nature of software?",
        answers: [
            "The controller of the system should always be software.",
            "Software can directly cause injury or loss of life.",
            "Software is easier to model and test than hardware since software typically has fewer possible states.",
            "Software does not deteriorate in the same predicable ways over time as hardware does."
        ],
        correctAnswerIndex: 3 // Index 1 corresponds to option D
    },
    {
        question: "The design of safety-critical systems is about handling hazards. Which of the following statements most accurately reflects the role of design?",
        answers: [
            "The system design must handle hazards as if they were independent of the envi- ronment the system operates in.",
            "All states related to that hazard must be eliminated.",
            "All states related to that hazard must have the potential loss associated with that state mitigated.",
            "All states related to that hazard must either be eliminated or have the potential loss associated with that state mitigated."
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "Considering the design strategies for safety-critical software, which strategy is most effective in mitigating risk of catastrophic failure?",
        answers: [
            "Implementing rigorous user authentication.",
            "Designing redundant system components.",
            "Using faster processors.",
            "Increasing the software's user base."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "What does the concept of 'redundancy' imply in the engineering of safety-critical sys- tems?",
        answers: [
            "Duplicate critical components to enhance system availability.",
            "Overdesign the system to increase its complexity.",
            "Reduce the number of system components to simplify maintenance as some com- ponents are no longer needed.",
            "Increase the system's processing power to handle more tasks."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    },
    {
        question: "In DO178-C, the number of objectives differs depending on the severity classification / level. Which of the following statements is true?",
        answers: [
            "The number of objectives that teams must be free to independently verify them- selves separate from the accrediting body increases the higher the severity classi- fication / level.",
            "At the catastrophic severity classification/level, one of the objectives must be to document how the team intends to keep calm and carry on.",
            "There are five severity classifications in DO178-C.",
            "The number of objectives decreases the higher the severity level, to reflect the fact that the team must focus more."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "Which statement about 'Fault Tree Analysis' in safety-critical software development is true?",
        answers: [
            "It is useful to identify who is liable for a fault having occurred.",
            "It is focussed on finding the one root cause of all possible hazards.",
            "It is a form of testing that is done on a code base.",
            "It can help in identifying where system redundancies are needed."
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "What is the primary purpose of employing 'ALARP' (\"As Low As Reasonably Practi- cable\") in the design of safety-critical systems?",
        answers: [
            "To ensure that risk are associated with low-level software requirements rather than high-level software requirements.",
            "To balance risk reduction ensuring that costs of risk reduction do not grossly and disproportionately outweigh benefits.",
            "To ensure that there are as few risks as possible.",
            "To completely eliminate all risks in the system."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Which safety-critical standard explicitly states traceability as a key requirement during the process of developing a safety-critical system in avionics?",
        answers: [
            "The Waterfall Standard",
            "The Scrum Standard.",
            "The DO178-C Standard.",
            "The IEC-61508 Standard."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "Why are 'Black-box' testing methods used in safety-critical software development?",
        answers: [
            "To test the physical durability of the hardware.",
            "To meet legal requirements that black boxes be part of all avionics systems for data logging and disaster analysis purposes.",
            "To assess the software's appearance and the usability of the user interface.",
            "To evaluate the software without being biased by knowledge of its in- ternal workings."
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "What is the purpose of a 'Safety Case' in the development of safety-critical software?",
        answers: [
            "To document the financial cost of the system's safety features.",
            "To provide a structured argument supported by evidence that a system is safe for a given application in a given environment.",
            "To list all the safety incidents that have occurred during testing.",
            "To outline the safety training required for system operators."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "How does a 'prescriptive standard' differ from a 'performance-based standard' in safety- critical systems?",
        answers: [
            "Prescriptive standards specify exact requirements to be followed in the process; performance-based standards specify the outcomes that need to be achieved.",
            "Prescriptive standards are based on past performance; performance-based stan- dards outline future goals.",
            "There is no significant difference; both terms can be used interchangeably.",
            "Prescriptive standards apply only to hardware; performance-based standards ap- ply only to software."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    },
    {
        question: "What has in the experience of some assessors for IEC 61508 been one of the most challenging aspects for software developers to gain certification of their systems?",
        answers: [
            "Legacy code issues.",
            "Arguments over which coding standards to apply.",
            "The incremental approach chosen by the developers.",
            "An over-reliance on software tools."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    },
    {
        question: "Which of the following statements is NOT true about the concept of 'Derived Re- quirements'?",
        answers: [
            "They can be requirements that may not be directly traceable to higher level requirements.",
            "They can specify behaviour beyond that specified by the system requirements or higher level requirements.",
            "They appear in DO-178C.",
            "They are requirements that are based on similar past projects."
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "Why is the 'Layered Architecture' approach beneficial for safety-critical systems?",
        answers: [
            "It ensures faster development times by allowing developers to work in parallel.",
            "It enhances system security by incorporating multiple layers of encryption.",
            "It facilitates system maintenance and upgrades by separating concerns into different layers.",
            "It reduces the system's operational costs by utilising fewer resources."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "Given the critical nature of software updates in safety-critical systems, which of the following approaches would be best for managing and deploying updates that ensures ongoing system safety and integrity?",
        answers: [
            "Updates should be deployed as soon as they are written to ensure immediate benefit.",
            "Each update must undergo comprehensive regression testing, risk as- sessment, and be certified against relevant safety standards before de- ployment.",
            "Deploy updates only when users request them, to minimise disruption.",
            "Focus solely on security updates, ignoring functional improvements."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "What is a primary advantage of using static analysis tools in software development?",
        answers: [
            "They can execute the program to identify runtime errors.",
            "They help in optimising the code for better performance.",
            "They can detect errors and defects in the source code without program execution.",
            "They enhance the user interface aspects of software applications through the anal- ysis of wireframes."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "What does 100% Modified Condition/Decision Coverage (MC/DC) ensure about the test cases?",
        answers: [
            "Each loop in the program is executed at least once.",
            "Each condition within a decision has been tested independently.",
            "All variables in the program have been initialized and used.",
            "Every function in the program has been called at least once."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "In the context of 'Control-Flow Graphs' and 'Definite Assignment' in Static Analysis, which of the following statements best defines the concept of 'Conservatism'?",
        answers: [
            "The number of steps between the assignment of a value to a variable and the use of that value must be minimised.",
            "It is not taken into account which paths are infeasible.",
            "All variables must always be assigned values in the very first node of the control flow graph.",
            "Variables can only be assigned values on the right-hand side of the control flow graph."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Which of the following four agile software development practice is most challenging and difficult to implement in safety-critical systems development due to the stringent documentation and verification requirements?",
        answers: [
            "Continuous Integration.",
            "Sprint Backlogs",
            "Daily Scrums.",
            "Building Safety Requirements into User Stories."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    },
    {
        question: "Which standard directly requires that safety-critical software systems undergo a process of hazard analysis and risk assessment?",
        answers: [
            "ISO-9001",
            "DO-1780",
            "IEC-61508",
            "Agile Manifesto"
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "Which of the following statements about the DO-178C standard is NOT true?",
        answers: [
            "It requires that software development processes be auditable and reproducible.",
            "It mandates the use of a small subset of possible programming lan- guages.",
            "It involves demonstrating compliance with software requirements.",
            "It emphasises the traceability of software requirements through all stages of de- velopment."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Safety Integrity Levels (SIL) are part of safety standard IEC-61508. Which of the following statements about SIL is true?",
        answers: [
            "SIL are a system used to measure the experience of the safety critical software development team, with more experienced teams able to work on more dangerous systems.",
            "The level needed for a particular safety function is dependent on the difference between the assessed risk and the acceptable risk of failure of a safety-critical component.",
            "The permitted probability of failure of a safety function for a particular SIL is measured the same way independent of whether it is low demand or high demand.",
            "SIL measure the integrity of the team developing the safety-critical software and how much of a safety-conscious culture exists within the team."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Which of the following is NOT an example of 'Functional Safety'?",
        answers: [
            "Adaptive cruise control in a car that detects if a car ahead is braking.",
            "Emergency stop on a conveyor belt in a factory.",
            "A guard rail that would stop someone falling off a narrow walkway.",
            "A camera that would detect if someone is standing on a bridge before retracting it."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "In a '2003' system architecture, what does '2003' stand for?",
        answers: [
            "Two out of three components must agree for the system to proceed.",
            "Two out of three attempts to execute a command must succeed.",
            "The system consists of two operational units and one backup unit.",
            "The system operates on two out of three layers of security."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    }
];

const oldQuizDataTwo = [
    {
        question: "In terms of the definition of what is a safety-critical system in an engineering context, which of the following is the best description?",
        answers: [
            "The system is used to critically assess the safety of other systems.",
            "There may be loss of life or serious injury.",
            "There may be loss of life or serious injury, or significant damage to property or the environment.", // Correct based on PDF
            "There may be significant damage to property or the environment."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "The design of safety-critical systems is about handling hazards. Which of the following statements most accurately reflects the role of design?",
        answers: [
            "All states related to that hazard must have the potential loss associated with that state mitigated.",
            "All states related to that hazard must either be eliminated or have the potential loss associated with that state mitigated.", // Correct based on PDF
            "The system design must handle hazards as if they were independent of the envi- ronment the system operates in.",
            "All states related to that hazard must be eliminated."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "In safety-critical systems, why is redundancy considered a critical design feature?",
        answers: [
            "It ensures system performance optimisation.",
            "It guarantees faster system response times as there are more components working than you minimally need.",
            "It provides a backup in case of system component failure.", // Correct based on PDF
            "It reduces the overall cost of the system as components identified as redundant can be removed in the design phase before the team has to pay the cost of imple- mentation."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "In DO178-C, there are different levels of consequences that are used in conjunction with likelihoods to determine if a risk is acceptable. Which of the following statements is true?",
        answers: [
            "Catastrophic consequences deal with loss of a single life.",
            "Critical consequences with improbable likelihoods are acceptable as they stand, though need to be monitored.",
            "Critical consequences deal with the loss of a single life.",
            "Catastrophic consequences that have an incredible likelihood of occurring are un- acceptable in any circumstance." // Correct based on PDF
        ],
        correctAnswerIndex: 2 // Index 2 changed corresponds to option C
    },
    {
        question: "What does the concept of 'safety assurance' mean in the context of safety-critical systems?",
        answers: [
            "It is about the team outwardly projecting confidence to end users that they are safe so as to avoid stoking fear.",
            "It provides confidence that the costs of hazards can be adequately covered by those liable.",
            "It provides some kind of measurement to predict the quantity and nature of acci- dents that will occur.",
            "It provides confidence that hazards have been eliminated or controlled." // Correct based on PDF
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "Which of the following is NOT a phase in DO178-C?",
        answers: [
            "Requirements Phase.",
            "Verification Phase.",
            "Traceability Phase.", // Correct based on PDF
            "Planning Phase."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "In DO178-C, the number of objectives differs depending on the severity classification /level. Which of the following statements is true?",
        answers: [
            "The number of objectives decreases the higher the severity level, to reflect the fact that the team must focus more.",
            "The number of objectives that teams must be free to independently verify them- selves separate from the accrediting body increases the higher the severity classi- fication / level.", // Correct based on PDF
            "At the catastrophic severity classification/level, one of the objectives must be to document how the team intends to keep calm and carry on.",
            "There are five severity classifications in DO178-C."
        ],
        correctAnswerIndex: 3 // Index 1 changed corresponds to option D
    },
    {
        question: "Which statement about 'Fault Tree Analysis' in safety-critical software development is true?",
        answers: [
            "It is focussed on finding the one root cause of all possible hazards.",
            "It is a form of testing that is done on a code base.",
            "It is useful to identify who is liable for a fault having occurred.",
            "It can help in identifying where system redundancies are needed." // Correct based on PDF
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "A 'minimal cut set' is a concept in fault tree analysis. Which of the following statements is true about minimal cut sets?",
        answers: [
            "A minimal cut set is a linear ordering of all of the leaf nodes in a fault tree.",
            "Only a single minimal cut set can exist in a fault tree.",
            "Multiple minimal cut sets may exist in a fault tree.", // Correct based on PDF
            "The minimal cut set is the vertical slice of the fault tree analysis (including the root node and intermediary pseudo-events) which is the narrowest sub-tree available that still leads to the root node event occurring."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "Why are 'Black-box' testing methods used in safety-critical software development?",
        answers: [
            "To test the physical durability of the hardware.",
            "To meet legal requirements that black boxes be part of all avionics systems for data logging and disaster analysis purposes.",
            "To assess the software's appearance and the usability of the user interface.",
            "To evaluate the software without being biased by knowledge of its in- ternal workings." // Correct based on PDF
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "What is the purpose of a 'Safety Case' in the development of safety-critical software?",
        answers: [
            "To document the financial cost of the system's safety features.",
            "To outline the safety training required for system operators.",
            "To provide a structured argument supported by evidence that a system is safe for a given application in a given environment.", // Correct based on PDF
            "To list all the safety incidents that have occurred during testing."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "How does a 'prescriptive standard' differ from a 'performance-based standard' in safety- critical systems?",
        answers: [
            "There is no significant difference; both terms can be used interchangeably.",
            "Prescriptive standards apply only to hardware; performance-based standards ap- ply only to software.",
            "Prescriptive standards specify exact requirements to be followed in the process; performance-based standards specify the outcomes that need to be achieved.", // Correct based on PDF
            "Prescriptive standards are based on past performance; performance-based stan- dards outline future goals."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "Why is the 'Layered Architecture' approach beneficial for safety-critical systems?",
        answers: [
            "It reduces the system's operational costs by utilising fewer resources.",
            "It facilitates system maintenance and upgrades by separating concerns into different layers.", // Correct based on PDF
            "It ensures faster development times by allowing developers to work in parallel.",
            "It enhances system security by incorporating multiple layers of encryption."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Given the critical nature of software updates in safety-critical systems, which of the following approaches would be best for managing and deploying updates that ensures ongoing system safety and integrity?",
        answers: [
            "Each update must undergo comprehensive regression testing, risk as- sessment, and be certified against relevant safety standards before de- ployment.", // Correct based on PDF
            "Updates should be deployed as soon as they are written to ensure immediate benefit.",
            "Focus solely on security updates, ignoring functional improvements.",
            "Deploy updates only when users request them, to minimise disruption."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    },
    {
        question: "What is a primary advantage of using static analysis tools in software development?",
        answers: [
            "They help in optimising the code for better performance.",
            "They can detect errors and defects in the source code without program execution.", // Correct based on PDF
            "They can execute the program to identify runtime errors.",
            "They enhance the user interface aspects of software applications through the anal- ysis of wireframes."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "What does 100% Modified Condition/Decision Coverage (MC/DC) ensure about the test cases?",
        answers: [
            "Each loop in the program is executed at least once.",
            "Every function in the program has been called at least once.",
            "Each condition within a decision has been tested independently.", // Correct based on PDF
            "All variables in the program have been initialized and used."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "In the context of 'Control-Flow Graphs' and 'Definite Assignment' in Static Analysis, which of the following statements best defines the concept of 'Conservatism'?",
        answers: [
            "The number of steps between the assignment of a value to a variable and the use of that value must be minimised.",
            "It is not taken into account which paths are infeasible.", // Correct based on PDF
            "Variables can only be assigned values on the right-hand side of the control flow graph.",
            "All variables must always be assigned values in the very first node of the control flow graph."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Which of the following four agile software development practice is most challenging and difficult to implement in safety-critical systems development due to the stringent documentation and verification requirements?",
        answers: [
            "Building Safety Requirements into User Stories.", // Correct based on PDF
            "Continuous Integration",
            "Sprint Backlogs",
            "Daily Scrums."
        ],
        correctAnswerIndex: 1 // Index 0 changed corresponds to option B
    },
    {
        question: "Which standard directly requires that safety-critical software systems undergo a process of hazard analysis and risk assessment?",
        answers: [
            "IEC-61508", // Correct based on PDF
            "Agile Manifesto",
            "ISO-9001",
            "DO-1780"
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    },
    {
        question: "GAMAB is a similar concept to ALARP (\"As Low As Reasonably Practicable\"). What does GAMAB say about the acceptable level of risk in a system under design?",
        answers: [
            "That risks should have good assurance models at believable levels.",
            "That risks be stated in multiple languages, including French, as international audiences may have different levels of acceptability for risk and their input is important to determine what is as low as reasonably practicable.",
            "That acceptable levels of risk should be lower than what the average client would think is the case, as the average client usually doesn't know what they are talking about.",
            "That the level of risk in a new system must be no worse than any existing equivalent system." // Correct based on PDF
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "Which of the following is NOT an example of 'Functional Safety'?",
        answers: [
            "Emergency stop on a conveyor belt in a factory.",
            "A guard rail that would stop someone falling off a narrow walkway.", // Correct based on PDF
            "Adaptive cruise control in a car that detects if a car ahead is braking.",
            "A camera that would detect if someone is standing on a bridge before retracting it."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "In a '2003' system architecture, what does '2003' stand for?",
        answers: [
            "The system consists of two operational units and one backup unit.",
            "The system operates on two out of three layers of security.",
            "Two out of three components must agree for the system to proceed.", // Correct based on PDF
            "Two out of three attempts to execute a command must succeed."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "Errors in the development of the Therac-25 system led to multiple deaths through radiation overdosing. Which of the following statements is true?",
        answers: [
            "The Therac-25 system failed despite being signed off as being DO178-C compliant by an accrediting body, demonstrating that standards can't absolutely guarantee safety.",
            "The radiation overdosing was caused by a race condition in concurrent programming, as a result of the operator interface and machines tasks interacting.", // Correct based on PDF
            "Lives were saved by the replacement of the hardware interlocks in the Therac-6 and Therac-25 by superior and more rigorous software safety controls.",
            "The Therac-25 system avoided using legacy code, which was detrimental to the Therac-25 as the previous legacy code worked on the Therac-6 and Therac-25."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Which of the following statements is true about the role of software testing in safety- critical systems?",
        answers: [
            "Software testing is required by DO178-C, but not by IEC-61508.",
            "Software testing is necessary but not sufficient to demonstrate the sys- tem is safe.", // Correct based on PDF
            "Software testing is best done by the developers as they will know which execution paths to avoid.",
            "Software testing should avoid using regression testing as progression testing is more forward thinking."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Safety Integrity Levels (SIL) are part of safety standard IEC-61508. Which of the following statements about SIL is true?",
        answers: [
            "SIL measures the integrity of the team developing the safety-critical software and how much of a safety-conscious culture exists within the team.",
            "SIL are a system used to measure the experience of the safety-critical software development team, with more experienced teams able to work on more dangerous systems.",
            "The level needed for a particular safety function is dependent on the difference between the assessed risk and the acceptable risk of failure of a safety-critical component.", // Correct based on PDF
            "The permitted probability of failure of a safety function for a particular SIL is measured the same way independent of whether it is low demand or high demand."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    }
];


const oldQuizDataThree = [
    {
        question: "In terms of the definition of what is a safety-critical system in an engineering context, which of the following is the best description?",
        answers: [
            "The system is used to critically assess the safety of other systems.",
            "There may be loss of life or serious injury.",
            "There may be loss of life or serious injury, or significant damage to property or the environment.", // Correct based on PDF
            "There may be significant damage to property or the environment."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "In the context of safety-critical systems, which of the following statements is true about the role or nature of software?",
        answers: [
            "The controller of the system should always be software.",
            "Software is easier to model and test than hardware since software typically has fewer possible states.",
            "Software can directly cause injury or loss of life.", // Correct based on PDF
            "Software does not deteriorate in the same predicable ways over time as hardware does."
        ],
        correctAnswerIndex: 3 // Index 2 corresponds changed to option D
    },
    {
        question: "In safety-critical systems, why is redundancy considered a critical design feature?",
        answers: [
            "It ensures system performance optimisation.",
            "It guarantees faster system response times as there are more components working than you minimally need.",
            "It provides a backup in case of system component failure.", // Correct based on PDF
            "It reduces the overall cost of the system as components identified as redundant can be removed in the design phase before the team has to pay the cost of imple- mentation."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "In DO178-C, there are different levels of consequences that are used in conjunction with likelihoods to determine if a risk is acceptable. Which of the following statements is true?",
        answers: [
            "Critical consequences with a likelihood level of 'remote' are tolerable if cost of mitigation would exceed improvement.", // Correct based on PDF
            "Marginal consequences with a likelihood level of 'probable' are acceptable as they stand, though need to be monitored.",
            "Critical consequences deal with the loss of multiple lives.",
            "Critical consequences that have a likelihood level of 'occasional' are unacceptable in any circumstance."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    },
    {
        question: "The design of safety-critical systems is about handling hazards. Which of the following statements most accurately reflects the role of design?",
        answers: [
            "All states related to that hazard must have the potential loss associated with that state mitigated.",
            "All states related to that hazard must either be eliminated or have the potential loss associated with that state mitigated.", // Correct based on PDF
            "The system design must handle hazards as if they were independent of the envi- ronment the system operates in.",
            "All states related to that hazard must be eliminated."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "What has in the experience of some assessors for IEC 61508 been one of the most challenging aspects for software developers to gain certification of their systems?",
        answers: [
            "Arguments over which coding standards to apply.",
            "The incremental approach chosen by the developers.",
            "Legacy code issues.", // Correct based on PDF
            "An over-reliance on software tools."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "In DO178-C, the number of objectives differs depending on the severity classification / level. Which of the following statements is true?",
        answers: [
            "The number of objectives that teams must use an independent author- ity external to themselves to verify increases the higher the severity classification / level.", // Correct based on PDF
            "The number of objectives decreases the higher the severity level, to reflect the fact that the team can't be expected to cope with higher stress and more complexity.",
            "At the catastrophic severity classification/level, one of the objectives must be to document how the team intends to avoid unnecessary panic.",
            "There are eight severity classifications in DO178-C."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    },
    {
        question: "Which statement about 'Fault Tree Analysis' in safety-critical software development is true?",
        answers: [
            "It is focussed on finding the one root cause of all possible hazards.",
            "It is a form of testing that is done on a code base.",
            "It is useful to identify who is liable for a fault having occurred.",
            "It can help in identifying where system redundancies are needed." // Correct based on PDF
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "A 'minimal cut set' is a concept in fault tree analysis. Which of the following statements is true about minimal cut sets?",
        answers: [
            "A minimal cut set is a linear ordering of all of the leaf nodes in a fault tree.",
            "Only a single minimal cut set can exist in a fault tree.",
            "Multiple minimal cut sets may exist in a fault tree.", // Correct based on PDF
            "The minimal cut set is the vertical slice of the fault tree analysis (including the root node and intermediary pseudo-events) which is the narrowest sub-tree available that still leads to the root node event occurring."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "Which of the following statements is true about 'white-box' testing methods used in safety-critical software development?",
        answers: [
            "Where as 'black box testing' involves using requirements to create new test cases, 'white-box' testing is about using test cases to create new requirements.",
            "'White-box testing' allows developers to verify and test the internal workings of the system in a way that 'black box testing' does not sup- port.", // Correct based on PDF
            "Unlike 'black-box testing', 'white-box testing' is not a requirement for avionics systems as only black boxes are installed on aircraft.",
            "It's done after all bugs have been found and resolved, as a final sanity check to ensure nothing has been missed."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "What is the purpose of a 'Safety Case' in the development of safety-critical software?",
        answers: [
            "To document the financial cost of the system's safety features.",
            "To provide a structured argument supported by evidence that a system is safe for a given application in a given environment.", // Correct based on PDF
            "To list all the safety incidents that have occurred during testing.",
            "To outline the safety training required for system operators."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Which of the following statements is NOT true about the concept of 'Derived Re- quirements'?",
        answers: [
            "They can be requirements that may not be directly traceable to higher level requirements.",
            "They can specify behaviour beyond that specified by the system requirements or higher level requirements.",
            "They appear in DO-178C.",
            "They are requirements that are based on similar past projects." // Correct based on PDF
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "Why is the 'Layered Architecture' approach beneficial for safety-critical systems?",
        answers: [
            "It reduces the system's operational costs by utilising fewer resources.",
            "It facilitates system maintenance and upgrades by separating concerns into different layers.", // Correct based on PDF
            "It ensures faster development times by allowing developers to work in parallel.",
            "It enhances system security by incorporating multiple layers of encryption."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Given the critical nature of software updates in safety-critical systems, which of the following approaches would be best for managing and deploying updates that ensures ongoing system safety and integrity?",
        answers: [
            "Focus solely on security updates, ignoring functional improvements.",
            "Each update must undergo comprehensive regression testing, risk as- sessment, and be certified against relevant safety standards before de- ployment.", // Correct based on PDF
            "Updates should be deployed as soon as they are written to ensure immediate benefit.",
            "Deploy updates only when users request them, to minimise disruption."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "What is a primary advantage of using static analysis tools in software development?",
        answers: [
            "They help in optimising the code for better performance.",
            "They can detect errors and defects in the source code without program execution.", // Correct based on PDF
            "They can execute the program to identify runtime errors.",
            "They enhance the user interface aspects of software applications through the anal- ysis of wireframes."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "What is the primary purpose of employing 'ALARP' (\"As Low As Reasonably Practi- cable\") in the design of safety-critical systems?",
        answers: [
            "To ensure that risk are associated with low-level software requirements rather than high-level software requirements.",
            "To completely eliminate all risks in the system.",
            "To balance risk reduction ensuring that costs of risk reduction do not grossly and disproportionately outweigh benefits.", // Correct based on PDF
            "To ensure that there are as few risks as possible."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "In the context of 'Control-Flow Graphs' and 'Definite Assignment' in Static Analysis, which of the following statements best defines the concept of 'Conservatism'?",
        answers: [
            "The number of steps between the assignment of a value to a variable and the use of that value must be minimised.",
            "It is not taken into account which paths are infeasible.", // Correct based on PDF
            "Variables can only be assigned values on the right-hand side of the control flow graph.",
            "All variables must always be assigned values in the very first node of the control flow graph."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "What does the concept of 'safety assurance' mean in the context of safety-critical systems?",
        answers: [
            "It is about the team outwardly projecting confidence to end users that they are safe so as to avoid stoking fear.",
            "It provides confidence that the costs of hazards can be adequately covered by those liable.",
            "It provides some kind of measurement to predict the quantity and nature of acci- dents that will occur.",
            "It provides confidence that hazards have been eliminated or controlled." // Correct based on PDF
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "Which standard directly requires that safety-critical software systems undergo a process of hazard analysis and risk assessment?",
        answers: [
            "DO-178C",
            "IEC-61508", // Correct based on PDF
            "Agile Manifesto",
            "ISO-9001"
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "GAMAB is a similar concept to ALARP (\"As Low As Reasonably Practicable\"). What does GAMAB say about the acceptable level of risk in a system under design?",
        answers: [
            "That risks should have good assurance models at believable levels.",
            "That the level of risk in a new system must be no worse than any existing equivalent system.", // Correct based on PDF
            "That risks be stated in multiple languages, including French, as international audiences may have different levels of acceptability for risk and their input is important to determine what is as low as reasonably practicable.",
            "That acceptable levels of risk should be lower than what the average client would think is the case, as the average client usually doesn't know what they are talking about."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    },
    {
        question: "Which of the following is NOT an example of 'Functional Safety'?",
        answers: [
            "A physical fixed guard on a device that stops someone from placing their eye in the direct line of a laser beam.", // Correct based on PDF
            "A sensor that stops a spinning blade if someone's hand is detected in close prox- imity.",
            "Collision detection sensors and alerts on a grounded aircraft that stop the aircraft (assume wheels down and on the tarmac).",
            "A barrier that is automatically lowered over a train crossing to stop cars and pedestrians from crossing train tracks when a train's approach is detected."
        ],
        correctAnswerIndex: 0 // Index 0 corresponds to option A
    },
    {
        question: "In a '2003' system architecture, what does '2003' stand for?",
        answers: [
            "Two out of three attempts to execute a command must succeed.",
            "The system operates on two out of three layers of security.",
            "Two out of three components must agree for the system to proceed.", // Correct based on PDF
            "The system consists of two operational units and one backup unit."
        ],
        correctAnswerIndex: 2 // Index 2 corresponds to option C
    },
    {
        question: "Errors in the development of the Therac-25 system led to multiple deaths through radiation overdosing. Which of the following statements is true?",
        answers: [
            "Lives were saved by the replacement of the hardware interlocks in the Therac-6 and Therac-25 by superior and more rigorous software safety controls.",
            "The Therac-25 system avoided using legacy code, which was detrimental to the Therac-25 as the previous legacy code worked on the Therac-6 and Therac-25.",
            "The Therac-25 system failed despite being signed off as being DO178-C compliant by an accrediting body, demonstrating that standards can't absolutely guarantee safety.",
            "The radiation overdosing was caused by a race condition in concurrent programming, as a result of the operator interface and machines tasks interacting." // Correct based on PDF
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "Which of the following statements is true about the role of software testing in safety- critical systems?",
        answers: [
            "Software testing should avoid generating some test cases based on the code as this introduces bias.",
            "A plan for software testing should be generated after coding has substantially finished, as otherwise the plan will necessarily be incomplete or out of date.",
            "Regression testing is done when reverting back to an earlier version of the code base.",
            "Even if all individual components of a system have passed their tests, it cannot be assumed the system as a whole will pass tests." // Correct based on PDF
        ],
        correctAnswerIndex: 3 // Index 3 corresponds to option D
    },
    {
        question: "Safety Integrity Levels (SIL) are part of safety standard IEC-61508. Which of the following statements about SIL is true?",
        answers: [
            "SIL are a system used to measure the experience of the safety-critical software development team, with more experienced teams able to work on more dangerous systems.",
            "The level needed for a particular safety function is dependent on the difference between the assessed risk and the acceptable risk of failure of a safety-critical component.", // Correct based on PDF
            "SIL measures the integrity of the team developing the safety-critical software and how much of a safety-conscious culture exists within the team.",
            "The permitted probability of failure of a safety function for a particular SIL is measured the same way independent of whether it is low demand or high demand."
        ],
        correctAnswerIndex: 1 // Index 1 corresponds to option B
    }
];
