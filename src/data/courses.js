export const courses = [
    {
        id: "html",
        title: "HTML5 Structure",
        level: 1,
        xp: 1200,
        totalXp: 3000,
        mastery: 65,
        color: "from-orange-500 to-red-600",
        icon: "Globe",
        missions: [
            { id: "h1", title: "Semantic Tags Basics", xp: 100, completed: true },
            { id: "h2", title: "Forms & Inputs", xp: 150, completed: true },
            { id: "h3", title: "SEO Best Practices", xp: 200, completed: false },
            { id: "h4", title: "Accessibility (A11y)", xp: 300, completed: false },
        ],
        objective: "Master proper document structure for accessible, SEO-friendly web pages.",
        contentIncludes: [
            "Semantic HTML5 (header, nav, article)",
            "Forms, Inputs & Validation attributes",
            "SEO meta tags & A11y ARIA roles"
        ],
        progressLogic: [
            "Quizzes passed",
            "Proper tag usage in challenges"
        ]
    },
    {
        id: "css",
        title: "CSS3 Styling",
        level: 3,
        xp: 2400,
        totalXp: 5000,
        mastery: 48,
        color: "from-blue-500 to-cyan-600",
        icon: "Palette",
        missions: [
            { id: "c1", title: "Box Model Mastery", xp: 150, completed: true },
            { id: "c2", title: "Flexbox Layouts", xp: 250, completed: false },
            { id: "c3", title: "Grid Systems", xp: 300, completed: false },
            { id: "c4", title: "Responsive Design", xp: 400, completed: false },
        ],
        objective: "Create responsive, visually stunning layouts without frameworks.",
        contentIncludes: [
            "Box Model, Margins, & Padding",
            "Flexbox & Grid architecture",
            "Media queries & Mobile-first design"
        ],
        progressLogic: [
            "Layout challenges completed",
            "CSS Selectors accuracy"
        ]
    },
    {
        id: "js",
        title: "JavaScript Logic",
        level: 5,
        xp: 800,
        totalXp: 8000,
        mastery: 10,
        color: "from-yellow-400 to-orange-500",
        icon: "Cpu",
        missions: [
            { id: "j1", title: "Variables & Types", xp: 100, completed: true },
            { id: "j2", title: "Functions & Scope", xp: 200, completed: false },
            { id: "j3", title: "DOM Manipulation", xp: 350, completed: false },
            { id: "j4", title: "Async/Await", xp: 500, completed: false },
        ],
        objective: "Build interactive, dynamic web experiences with vanilla JS.",
        contentIncludes: [
            "ES6+ Syntax & Scope",
            "DOM Events & Manipulation",
            "Async Logic (Promises, Fetch)"
        ],
        progressLogic: [
            "Algorithms solved",
            "Bug fixing streaks"
        ]
    },
    {
        id: "react",
        title: "React Framework",
        level: 8,
        xp: 0,
        totalXp: 10000,
        mastery: 0,
        color: "from-cyan-400 to-blue-500",
        icon: "Atom",
        isLocked: true,
        missions: [],
        objective: "Learn the modern component-based UI paradigm.",
        contentIncludes: [
            "Components & Props",
            "State & Hooks (useState, useEffect)",
            "React Router & Context"
        ],
        progressLogic: [
            "Flashcards mastered",
            "Component builds"
        ]
    }
];
