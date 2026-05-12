// Design & Analysis of Algorithms — Unit Registry
//
// HOW TO ADD UNITS:
// 1. Create unit1.js, unit2.js, etc. in this folder (src/data/daa/)
//    Each file must export: { groups, topics }
//    - groups: Array of { name: string, ids: string[] }
//    - topics: Object keyed by topic ID, each with { title, emoji, tldr, explanation, keyPoints, formula?, examTips, questions }
//
// 2. Add entries to the UNITS array below for each unit you create
//
// 3. Register the imports in:
//    - src/components/UnitPage.jsx  (unitModules.daa and unitsMetaModules.daa)
//    - src/components/SubjectHome.jsx (subjectUnitsModules.daa)
//    - src/components/SearchModal.jsx (unitImporters.daa and unitsMetaModules.daa)
//
// 4. Set available: true for 'daa' in src/data/subjects.js
//
// See src/data/mpca/units.js or src/data/os/units.js for reference.

export const UNITS = [
  {
    id: 1,
    title: 'Algorithm Analysis & Brute Force',
    shortTitle: 'Basics & Brute Force',
    emoji: '🧠',
    gradient: 'linear-gradient(135deg, #1a1a2f 0%, #161b22 100%)',
    accentColor: '#bc8cff',
    description: 'Algorithm fundamentals, asymptotic notations, recursive/non-recursive analysis, and brute force techniques.',
  },
  {
    id: 2,
    title: 'Decrease & Conquer and Divide & Conquer',
    shortTitle: 'Decrease & Conquer and Divide & Conquer',
    emoji: '📉',
    gradient: 'linear-gradient(135deg, #1a1a2f 0%, #161b22 100%)',
    accentColor: '#bc8cff',
    description: 'Decrease-and-conquer, divide-and-conquer, graph traversals, sorting, and advanced multiplication algorithms.',
  },
];
