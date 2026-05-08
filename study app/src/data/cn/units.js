// Computer Networks — Unit Registry
// 
// HOW TO ADD UNITS:
// 1. Create unit1.js, unit2.js, etc. in this folder (src/data/cn/)
//    Each file must export: { groups, topics }
//    - groups: Array of { name: string, ids: string[] }
//    - topics: Object keyed by topic ID, each with { title, emoji, tldr, explanation, keyPoints, formula?, examTips, questions }
//
// 2. Add entries to the UNITS array below for each unit you create
//
// 3. Register the imports in:
//    - src/components/UnitPage.jsx  (unitModules.cn and unitsMetaModules.cn)
//    - src/components/SubjectHome.jsx (subjectUnitsModules.cn)
//    - src/components/SearchModal.jsx (unitImporters.cn and unitsMetaModules.cn)
//
// 4. Set available: true for 'cn' in src/data/subjects.js
//
// See src/data/mpca/units.js or src/data/os/units.js for reference.

export const UNITS = [
  // Example:
  // {
  //   id: 1,
  //   title: 'Introduction to Computer Networks',
  //   shortTitle: 'Intro & OSI',
  //   emoji: '🌐',
  //   gradient: 'linear-gradient(135deg, #2a1a2a 0%, #161b22 100%)',
  //   accentColor: '#f59e0b',
  //   description: 'Network fundamentals, OSI model, TCP/IP stack, and network topologies.',
  // },
];
