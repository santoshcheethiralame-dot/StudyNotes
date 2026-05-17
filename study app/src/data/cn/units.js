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
  {
    id: 1,
    title: 'Introduction & Application Layer',
    shortTitle: 'Intro & App Layer',
    emoji: '🌐',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    accentColor: '#38bdf8',
    description: 'Network fundamentals, physical media, switching, delay/loss, and Application layer protocols like HTTP.',
  },
  {
    id: 2,
    title: 'Application Layer + Transport Layer',
    shortTitle: 'App & Transport Layer',
    emoji: '🏗️',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    accentColor: '#fbbf24',
    description: 'Deep dive into HTTP, DNS, Video Streaming, CDNs, Socket Programming, and the fundamentals of the Transport Layer (UDP/RDT).',
  },
  {
    id: 3,
    title: 'Transport Layer + Network Layer',
    shortTitle: 'Transport & Network',
    emoji: '🧭',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    accentColor: '#a855f7',
    description: 'Go-Back-N, Selective Repeat, TCP internals (flow/congestion control, connection handshake), IP protocol, IP addressing/services, and Routing Algorithms (Link-State/Distance-Vector).',
  },
];

