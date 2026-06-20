export const questions = [
    {
        id: 1,
        courseId: 'html',
        question: "Which tag is used to define an unordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        correctAnswer: 0,
        explanation: "<ul> defines an unordered list, whereas <ol> is for ordered (numbered) lists.",
        difficulty: "easy"
    },
    {
        id: 2,
        courseId: 'js',
        question: "How do you declare a constant in ES6?",
        options: ["var", "let", "const", "def"],
        correctAnswer: 2,
        explanation: "'const' is used for variables that won't be reassigned.",
        difficulty: "easy"
    },
    {
        id: 3,
        courseId: 'html',
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "High Tech Modern Language"],
        correctAnswer: 0,
        explanation: "HTML is the standard markup language for creating Web pages.",
        difficulty: "easy"
    }
];

export const flashcards = [
    { id: 1, front: "What is ReactDOM?", back: "A package that provides DOM-specific methods to enable React to interact with the web browser's DOM." },
    { id: 2, front: "Explain the Virtual DOM", back: "An in-memory representation of the real DOM. React updates this first, then efficiently syncs changes to the real DOM (Reconciliation)." },
    { id: 3, front: "What is JSX?", back: "Syntax extension for JavaScript. It looks like HTML but compiles to standard JavaScript objects." },
    { id: 4, front: "Difference between State and Props?", back: "Props are read-only and passed from parent. State is mutable and managed within the component." },
    { id: 5, front: "What is the useEffect hook?", back: "A hook that lets you perform side effects (fetching data, subscriptions) in function components." }
];

export const cssChallengeQuestions = [
    {
        id: 101,
        question: "Which property controls the stacking order of elements?",
        options: ["z-index", "order", "stack-level", "position"],
        correctAnswer: 0,
        explanation: "z-index Determine the stack level of an element.",
        difficulty: "easy"
    },
    {
        id: 102,
        question: "How do you select an element with id 'header'?",
        options: [".header", "#header", "header", "*header"],
        correctAnswer: 1,
        explanation: "# symbol is used for ID selectors.",
        difficulty: "easy"
    },
    {
        id: 103,
        question: "Which value of display makes an element a block-level container?",
        options: ["inline", "block", "hidden", "flex"],
        correctAnswer: 1,
        explanation: "display: block makes the element take up the full width.",
        difficulty: "easy"
    },
    {
        id: 104,
        question: "What is the default value of 'position'?",
        options: ["relative", "absolute", "fixed", "static"],
        correctAnswer: 3,
        explanation: "static is the default positioning behavior.",
        difficulty: "easy"
    },
    {
        id: 105,
        question: "Which property is used to change text color?",
        options: ["text-color", "color", "font-color", "background"],
        correctAnswer: 1,
        explanation: "The 'color' property sets the color of the text.",
        difficulty: "easy"
    },
    {
        id: 106,
        question: "How do you make a Flex container?",
        options: ["display: flex", "position: flex", "float: left", "align: flex"],
        correctAnswer: 0,
        explanation: "display: flex enables flexbox layout.",
        difficulty: "easy"
    },
    {
        id: 107,
        question: "Which unit is relative to the font-size of the root element?",
        options: ["em", "rem", "px", "%"],
        correctAnswer: 1,
        explanation: "rem stands for root em.",
        difficulty: "easy"
    },
    {
        id: 108,
        question: "How to maximize width of an element?",
        options: ["width: 100vh", "width: 100%", "size: max", "display: wide"],
        correctAnswer: 1,
        explanation: "width: 100% takes the full width of the parent.",
        difficulty: "easy"
    }
];

export function generateMockQuestions(topic) {
    const safeTopic = topic || "General subject";
    return [
        {
            id: Date.now() + 1,
            question: `Which of the following is a key concept in ${safeTopic}?`,
            options: ["The foundational theory", "The advanced mechanics", "The standard protocols", "All of the above"],
            correctAnswer: 3,
            explanation: `All of these are fundamentally related to understanding ${safeTopic}.`,
            difficulty: "easy"
        },
        {
            id: Date.now() + 2,
            question: `How is ${safeTopic} typically implemented in a professional environment?`,
            options: ["Using legacy methods", "By following standard practices", "Avoiding it entirely", "Using deprecated systems"],
            correctAnswer: 1,
            explanation: `Professionals always adhere to standard practices when working with ${safeTopic}.`,
            difficulty: "medium"
        },
        {
            id: Date.now() + 3,
            question: `What is the primary benefit of mastering ${safeTopic}?`,
            options: ["Decreased performance", "Higher complexity", "Improved efficiency and structure", "No tangible benefit"],
            correctAnswer: 2,
            explanation: `Mastering ${safeTopic} directly leads to improved efficiency and better overall structure.`,
            difficulty: "hard"
        }
    ];
}

export function generateMockFlashcards(topic) {
    const safeTopic = topic || "General subject";
    return [
        { id: Date.now() + 1, front: `What is the core definition of ${safeTopic}?`, back: `It is the foundational system that enables the associated mechanisms to work efficiently.` },
        { id: Date.now() + 2, front: `List the main benefits of ${safeTopic}.`, back: `Improved efficiency, better structure, scalability, and easier understanding for newcomers.` },
        { id: Date.now() + 3, front: `How do you apply ${safeTopic} in practice?`, back: `By analyzing the requirements and implementing the standard patterns step-by-step.` },
    ];
}

