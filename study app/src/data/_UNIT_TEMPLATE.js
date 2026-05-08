// ═══════════════════════════════════════════════════════════════
// UNIT DATA TEMPLATE — Copy this file and rename to unit1.js, unit2.js, etc.
// ═══════════════════════════════════════════════════════════════
//
// STEPS TO USE:
// 1. Copy this file → rename to unit1.js (or unit2.js, etc.)
// 2. Fill in the groups and topics below
// 3. Register the unit in units.js (same folder)
// 4. Register imports in UnitPage.jsx, SubjectHome.jsx, SearchModal.jsx
// 5. Set available: true in src/data/subjects.js

// Groups define sidebar sections — each group has a name and an array of topic IDs
export const groups = [
  {
    name: "Introduction",           // Sidebar section header
    ids: ["topic_1", "topic_2"],    // Topic IDs in this group
  },
  {
    name: "Core Concepts",
    ids: ["topic_3", "topic_4"],
  },
  // Add more groups as needed...
];

// Topics are keyed by their ID (must match the IDs used in groups above)
export const topics = {
  topic_1: {
    title: "Topic Title Here",
    emoji: "📘",
    tldr: "One-line summary of the topic for quick review.",
    explanation: "Detailed explanation text.\n\nUse double newlines for paragraph breaks.\n\nThis supports multi-paragraph content.",
    keyPoints: [
      "Key point 1 — important takeaway",
      "Key point 2 — another critical concept",
      "Key point 3 — practical implication",
    ],
    formula: {
      code: "// Code example or formula\nfunction example() {\n  return 'hello';\n}",
      explanation: "Explain what this code/formula does.",
    },
    examTips: [
      "Exam tip 1 — likely to appear in exams",
      "Exam tip 2 — common mistake to avoid",
    ],
    questions: [
      {
        q: "Sample question for practice?",
        a: "Sample answer for the question above.",
      },
      {
        q: "Another practice question?",
        a: "Its corresponding answer.",
      },
    ],
  },

  topic_2: {
    title: "Another Topic",
    emoji: "📗",
    tldr: "Quick summary...",
    explanation: "Full explanation here...",
    keyPoints: ["Point 1", "Point 2"],
    // formula is optional — omit if not needed
    examTips: ["Tip 1"],
    questions: [
      { q: "Question?", a: "Answer." },
    ],
  },

  // Add more topics following the same structure...
};
