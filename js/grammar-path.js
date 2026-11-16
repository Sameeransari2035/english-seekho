// js/grammar-path.js
const pathData = [
  {
    level: 1,
    name: "Beginner",
    icon: "🌱",
    color: "#10b981",
    lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    boss: {
      title: "Beginner Boss",
      icon: "👾",
      questions: [
        { q: "Inme se 'Proper Noun' kaunsa hai?", options: ["boy", "city", "Delhi", "book"], correct: 2 },
        { q: "Sahi pronoun chuno: '___ is my sister.'", options: ["He", "She", "It", "They"], correct: 1 },
        { q: "Sahi verb chuno: 'She ___ to school every day.'", options: ["go", "goes", "going", "gone"], correct: 1 }
      ]
    }
  },
  {
    level: 2,
    name: "Intermediate",
    icon: "🚀",
    color: "#6366f1",
    lessons: [], // Locked
    boss: { title: "Intermediate Boss", icon: "👹", questions: [] }
  },
  {
    level: 3,
    name: "Advanced",
    icon: "⭐",
    color: "#f59e0b",
    lessons: [], // Locked
    boss: { title: "Advanced Boss", icon: "🐉", questions: [] }
  },
  {
    level: 4,
    name: "Master",
    icon: "👑",
    color: "#ec4899",
    lessons: [], // Locked
    boss: { title: "Master Boss", icon: "👺", questions: [] }
  }
];

// ... (Baaki aapka purana code (renderPath, startBoss, etc.) waisa hi rahega, bas neeche wala code add kar dein)