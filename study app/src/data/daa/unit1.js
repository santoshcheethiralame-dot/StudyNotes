// Design & Analysis of Algorithms — Unit 1 Data (UPDATED)
// Topics: Algorithm basics, Analysis framework, Asymptotic notations,
//         Non-recursive & recursive analysis, Brute force, Exhaustive search
// ADDITIONS: Filled PYQs, Master Theorem, Cheat Sheet, PYQ Bank, Complexity Table

export const groups = [
  {
    name: "🧠 Algorithm Fundamentals",
    ids: ["algo-intro", "algo-characteristics", "algo-design-process", "euclid-gcd", "problem-types"],
  },
  {
    name: "📐 Analysis Framework",
    ids: ["analysis-framework", "input-size", "basic-operation", "orders-of-growth", "best-worst-avg"],
  },
  {
    name: "📊 Asymptotic Notations",
    ids: ["big-o", "big-omega", "big-theta", "little-o-omega", "limit-method", "addition-theorem"],
  },
  {
    name: "🔢 Non-Recursive Analysis",
    ids: ["nonrecursive-steps", "max-element", "unique-elements", "matrix-mult"],
  },
  {
    name: "🔁 Recursive Analysis",
    ids: ["recursive-steps", "factorial-recurrence", "bin-rec", "tower-hanoi"],
  },
  {
    name: "📈 Solving Recurrences",
    ids: ["backward-substitution", "recurrence-examples", "master-theorem"],
  },
  {
    name: "💪 Brute Force",
    ids: ["brute-force-intro", "selection-sort", "bubble-sort", "sequential-search-sentinel", "string-matching"],
  },
  {
    name: "🔍 Exhaustive Search",
    ids: ["exhaustive-intro", "tsp", "knapsack", "assignment-problem"],
  },
  {
    name: "⚡ Space-Time Tradeoffs",
    ids: ["comparison-counting-sort"],
  },
  {
    name: "📚 PYQ Bank & Reference",
    ids: ["cheat-sheet", "complexity-table", "pyq-bank", "common-mistakes"],
  },
];

export const topics = {

  // ─────────────────────────────────────────────
  // ALGORITHM FUNDAMENTALS
  // ─────────────────────────────────────────────

  "algo-intro": {
    title: "What is an Algorithm?",
    emoji: "🧠",
    tldr: "A sequence of unambiguous instructions that produces the required output for any valid input in a finite amount of time.",
    explanation: `An algorithm is a step-by-step procedure for solving a computational problem. It takes input, processes it through a series of well-defined steps, and produces output.

The word "algorithm" is derived from the name of the 9th-century Persian mathematician Al-Khwarizmi, who developed systematic procedures for arithmetic.

Key properties that distinguish an algorithm from informal instructions:
- Every step must be UNAMBIGUOUS — no room for interpretation. There is exactly one way to carry out each instruction.
- The range of VALID INPUTS must be specified clearly.
- The same algorithm can be IMPLEMENTED in many different programming languages or styles.
- MULTIPLE algorithms may exist for the same problem — some better than others in terms of speed or memory.

Why do we care about precision? Because a computer cannot guess or infer intent. If a step says "pick the best option," the machine doesn't know what "best" means unless we define it exactly.`,
    keyPoints: [
      "Algorithm = finite, unambiguous, sequence of instructions for solving a problem",
      "Must terminate after a finite number of steps for any valid input",
      "Multiple algorithms can solve the same problem — efficiency differs",
      "Same algorithm can be expressed in different programming languages",
      "The input domain (valid inputs) must be explicitly defined",
    ],
    formula: {
      code: `Algorithm  →  takes valid INPUT
           →  performs unambiguous STEPS
           →  produces correct OUTPUT
           →  terminates in FINITE time

Example: "Add two numbers A and B"
  Step 1: Read A and B
  Step 2: Compute sum = A + B
  Step 3: Return sum

This is unambiguous, finite, correct — a valid algorithm.`,
      explanation: "Every algorithm must satisfy: unambiguity, correct output, finite termination, and defined input range.",
    },
    examTips: [
      "Definition: a sequence of UNAMBIGUOUS instructions solving a problem in FINITE time",
      "MCQ: 'The same algorithm cannot be represented in different ways' → FALSE",
      "MCQ: 'An algorithm must always terminate' → TRUE",
      "The range of valid inputs must be SPECIFIED — not just 'any input'",
    ],
    questions: [
      {
        q: "What is an algorithm? List its essential properties.",
        a: "An algorithm is a sequence of unambiguous instructions for solving a problem, which produces the required output for any valid input in a finite amount of time. Essential properties (IDFEO): (1) Input — zero or more quantities supplied externally. (2) Definiteness — each instruction is clear and unambiguous. (3) Finiteness — terminates after a finite number of steps. (4) Effectiveness — each step is primitive and feasible. (5) Output — at least one quantity produced.",
      },
      {
        q: "Why is it important that an algorithm be unambiguous? Give an example of an ambiguous instruction.",
        a: "Unambiguity is critical because a computer has no capacity for judgment or interpretation — it executes instructions literally. An ambiguous step like 'choose a reasonable value for x' cannot be executed by a machine. A clear algorithm must specify exactly: 'set x ← (a + b) / 2'. There is only one way to carry out each instruction.",
      },
      {
        q: "Can two different algorithms solve the same problem? How do they differ?",
        a: "Yes. Multiple algorithms can solve the same problem. They may differ in (1) time efficiency — one may run in O(n log n) while another runs in O(n²); (2) space efficiency — one may need O(n) extra space while another is in-place; (3) simplicity — one may be easier to implement and verify; (4) generality — one may handle a broader range of inputs. Example: both Selection Sort and Merge Sort sort an array, but Merge Sort is O(n log n) vs Selection Sort's O(n²).",
      },
    ],
  },

  "algo-characteristics": {
    title: "Algorithm Characteristics (IDFEO)",
    emoji: "✅",
    tldr: "Five key properties: Input, Definiteness, Finiteness, Effectiveness, Output — remembered as IDFEO.",
    explanation: `Every algorithm must satisfy five fundamental characteristics. These are often tested directly in exams under the acronym IDFEO.

INPUT: An algorithm takes zero or more input quantities. "Zero or more" is deliberate — some algorithms require no external input (e.g., an algorithm that always computes π to 10 decimal places). The inputs must come from a specified set of valid values.

DEFINITENESS: Every instruction in the algorithm must be clear, precise, and unambiguous. There must be exactly one way to interpret and carry out each step. Vague instructions like "sort somehow" or "pick a reasonable value" are not allowed.

FINITENESS: The algorithm must eventually terminate after a finite number of steps for every valid input. An infinite loop or a procedure that never ends is NOT an algorithm (it may be a program or process, but not an algorithm in the formal sense).

EFFECTIVENESS: Each individual step must be basic enough to be carried out exactly and in a finite amount of time. Steps must be primitive and feasible — "compute the largest prime" is not effective unless you also specify how.

OUTPUT: The algorithm must produce at least one output quantity — the answer or result. An algorithm that produces nothing is pointless.`,
    keyPoints: [
      "Input — zero or more external quantities supplied to the algorithm",
      "Definiteness — every step is clear and unambiguous (exactly one interpretation)",
      "Finiteness — terminates after a finite number of steps for ALL valid inputs",
      "Effectiveness — each step is primitive and can be done in finite time",
      "Output — at least one quantity produced as a result",
      "Acronym: IDFEO (Input, Definiteness, Finiteness, Effectiveness, Output)",
    ],
    formula: {
      code: `Characteristic │ Meaning                        │ Violation Example
───────────────┼────────────────────────────────┼─────────────────────────────
Input          │ ≥0 valid external quantities    │ Undefined input domain
Definiteness   │ Each step unambiguous           │ "Pick a good value"
Finiteness     │ Terminates in finite steps      │ while(true) { ... }
Effectiveness  │ Steps are primitive & feasible  │ "Find the largest prime"
Output         │ ≥1 quantity produced            │ No return value`,
      explanation: "If ANY characteristic is violated, the procedure is not a valid algorithm.",
    },
    examTips: [
      "Acronym: IDFEO — Input, Definiteness, Finiteness, Effectiveness, Output",
      "Input can be ZERO or more (some algorithms need no input)",
      "Output must be at LEAST one quantity",
      "Finiteness: must terminate for ALL valid inputs, not just some",
      "MCQ: which property requires each step to be 'primitive and feasible'? → Effectiveness",
    ],
    questions: [
      {
        q: "Which algorithm characteristic requires that each step be primitive and executable in finite time?",
        a: "Effectiveness. This property ensures that every instruction in the algorithm is basic enough to be carried out exactly and in a finite amount of time. For example, 'divide by zero' or 'find the largest prime' would violate effectiveness.",
      },
      {
        q: "Distinguish between Definiteness and Effectiveness with examples.",
        a: "Definiteness means each instruction has exactly one interpretation — no ambiguity. Example violation: 'pick the largest element somehow.' Effectiveness means each step can actually be carried out in finite time using primitive operations. Example violation: 'compute all prime numbers' (infinite task). A step can be definite but not effective (e.g., 'compute the millionth decimal of π using infinite series' — clearly defined but not finitely executable without truncation). Both must hold for a valid algorithm.",
      },
      {
        q: "Is a program with an infinite loop an algorithm? Justify.",
        a: "No. An infinite loop violates the Finiteness property — the algorithm must terminate in a finite number of steps for ALL valid inputs. A program that loops forever (e.g., an operating system's event loop) is a process but not an algorithm in the formal sense. The distinction matters because algorithm analysis (correctness proofs, complexity analysis) assumes termination.",
      },
    ],
  },

  "algo-design-process": {
    title: "Algorithm Design and Analysis Process",
    emoji: "🛠️",
    tldr: "6 steps: Understand → Decide means → Design → Prove correctness → Analyze → Code. Design techniques: Brute Force, D&C, Dynamic Programming, Greedy, etc.",
    explanation: `Designing an algorithm is not just about writing code — it's an engineering process with well-defined phases.

STEP 1 — UNDERSTAND THE PROBLEM: Read the problem carefully. Identify: what are the inputs? What are the valid inputs? What should the output be? Work through small examples by hand. Clarify ambiguities before designing.

STEP 2 — DECIDE ON COMPUTATIONAL MEANS: Choose between sequential (RAM model) vs parallel (PRAM model) execution. Decide whether an exact solution is required or an approximation is acceptable. Choose appropriate data structures (arrays, trees, graphs, etc.).

STEP 3 — DESIGN AN ALGORITHM: Select a design technique — Brute Force, Divide and Conquer, Decrease and Conquer, Transform and Conquer, Dynamic Programming, Greedy, Branch and Bound, or Backtracking. Specify the algorithm using pseudocode, flowchart, or natural language (pseudocode is preferred for precision and conciseness).

STEP 4 — PROVE CORRECTNESS: For exact algorithms, prove mathematically that it gives the correct result for ALL valid inputs in finite time. For approximation algorithms, prove the error is within a predefined bound. Common proof techniques: mathematical induction, loop invariants.

STEP 5 — ANALYZE THE ALGORITHM: Evaluate time efficiency (how fast?), space efficiency (how much memory?), simplicity (how readable?), generality (works for a broad range of inputs?).

STEP 6 — CODE THE ALGORITHM: Implement in a programming language. The analysis from step 5 guides choices.`,
    keyPoints: [
      "Step 1: Understand the problem — identify inputs, outputs, constraints",
      "Step 2: Decide computational means — sequential vs parallel, exact vs approximate, data structures",
      "Step 3: Design using a technique — Brute Force, D&C, DP, Greedy, etc.",
      "Step 4: Prove correctness — for all valid inputs in finite time",
      "Step 5: Analyze — time, space, simplicity, generality",
      "Step 6: Code the algorithm",
      "Pseudocode: uses ← for assignment, indentation for scope, no declarations",
      "Design techniques: Brute Force, Divide and Conquer, Decrease and Conquer, Transform and Conquer, Dynamic Programming, Greedy, Branch and Bound, Backtracking",
    ],
    formula: {
      code: `Algorithm Specification Methods (least → most precise):
  Natural Language → Pseudocode → Flowchart → Code

Pseudocode conventions:
  ←  for assignment         (e.g., x ← 5)
  Indentation for scope     (e.g., for loops, if blocks)
  No variable declarations  (just use variables directly)
  Comments with //

Design Techniques:
  1. Brute Force             5. Dynamic Programming
  2. Divide and Conquer      6. Greedy Technique
  3. Decrease and Conquer    7. Branch and Bound
  4. Transform and Conquer   8. Backtracking`,
      explanation: "Pseudocode is the sweet spot: precise enough for correctness proofs, flexible enough for design.",
    },
    examTips: [
      "6 steps: Understand → Means → Design → Prove → Analyze → Code",
      "Pseudocode uses ← for assignment, not = or :=",
      "Analyzing = checking time efficiency, space efficiency, simplicity, generality",
      "Correctness proof for approximation: error must not exceed a predefined limit",
    ],
    questions: [
      {
        q: "What are the 6 steps of the algorithm design and analysis process?",
        a: "(1) Understand the problem. (2) Decide on computational means (sequential/parallel, exact/approximate, data structures). (3) Design the algorithm using a design technique. (4) Prove correctness. (5) Analyze the algorithm (time, space, simplicity, generality). (6) Code the algorithm.",
      },
      {
        q: "What four properties are evaluated during algorithm analysis (Step 5)?",
        a: "(1) Time efficiency — how fast does it run as a function of input size? (2) Space efficiency — how much memory does it use? (3) Simplicity — is the algorithm easy to understand, implement, and verify? (4) Generality — does it handle the broadest range of inputs? An algorithm may be highly efficient but not general (e.g., works only for sorted input), so all four dimensions matter.",
      },
      {
        q: "Why is proving correctness (Step 4) necessary even if the algorithm 'looks right'?",
        a: "Algorithms may appear correct on test cases but fail on edge cases or specific input structures. Formal correctness proof (using mathematical induction or loop invariants) guarantees the algorithm works for ALL valid inputs. For example, Euclid's GCD algorithm always terminates because m mod n < n strictly decreases — this must be proved, not assumed. Approximation algorithms additionally require proof that the error bound is never exceeded.",
      },
    ],
  },

  "euclid-gcd": {
    title: "Example: Euclid's GCD Algorithm",
    emoji: "🔢",
    tldr: "Based on gcd(m,n) = gcd(n, m mod n). Repeat until second number = 0. Example: gcd(60,24) → gcd(24,12) → gcd(12,0) = 12.",
    explanation: `Euclid's algorithm for computing the Greatest Common Divisor (GCD) is one of the oldest known algorithms (300 BCE) and a classic example for teaching algorithm analysis.

MATHEMATICAL BASIS: gcd(m, n) = gcd(n, m mod n)

Why is this correct? If d divides both m and n, then d also divides m mod n (since m mod n = m − ⌊m/n⌋ × n). Conversely, if d divides n and m mod n, then it divides m. So the set of common divisors of (m, n) equals the set of common divisors of (n, m mod n).

BASE CASE: gcd(m, 0) = m (any number's GCD with 0 is itself).

The algorithm:
  1. Compute r = m mod n
  2. Set m ← n, n ← r
  3. Repeat until n = 0
  4. Return m

TRACE: gcd(60, 24)
  r = 60 mod 24 = 12 → m=24, n=12
  r = 24 mod 12 = 0  → m=12, n=0
  n = 0, return 12 ✓

The algorithm terminates because m mod n < n always (the remainder is strictly less than the divisor), so n strictly decreases each iteration until it hits 0.`,
    keyPoints: [
      "Based on: gcd(m, n) = gcd(n, m mod n)",
      "Base case: gcd(m, 0) = m",
      "Each iteration: r ← m mod n; m ← n; n ← r",
      "Terminates because remainder r < n → n strictly decreasing",
      "Example: gcd(60, 24) → gcd(24, 12) → gcd(12, 0) = 12",
      "One of the oldest known algorithms — about 300 BCE",
    ],
    formula: {
      code: `ALGORITHM Euclid(m, n)
// Computes gcd(m, n)
// Input: Two nonneg integers, not both zero
// Output: GCD of m and n
while n ≠ 0 do
    r ← m mod n
    m ← n
    n ← r
return m

Trace: gcd(60, 24)
  Iteration 1: r = 60 mod 24 = 12; m = 24; n = 12
  Iteration 2: r = 24 mod 12 = 0;  m = 12; n = 0
  n = 0 → return m = 12  ✓`,
      explanation: "The key insight: m mod n is always strictly less than n, guaranteeing termination.",
    },
    examTips: [
      "gcd(m, n) = gcd(n, m mod n) — the mathematical basis",
      "Algorithm terminates because remainder < divisor, so n strictly decreases",
      "gcd(m, 0) = m — this is the base case / termination condition",
      "Trace questions: write each row as (m, n, r) until n=0",
    ],
    questions: [
      {
        q: "Trace Euclid's algorithm for gcd(48, 18).",
        a: "Step 1: r = 48 mod 18 = 12; m=18, n=12. Step 2: r = 18 mod 12 = 6; m=12, n=6. Step 3: r = 12 mod 6 = 0; m=6, n=0. n=0 → return 6. So gcd(48, 18) = 6.",
      },
      {
        q: "Trace Euclid's algorithm for gcd(31, 14).",
        a: "Step 1: r = 31 mod 14 = 3; m=14, n=3. Step 2: r = 14 mod 3 = 2; m=3, n=2. Step 3: r = 3 mod 2 = 1; m=2, n=1. Step 4: r = 2 mod 1 = 0; m=1, n=0. n=0 → return 1. So gcd(31, 14) = 1 (they are coprime).",
      },
      {
        q: "Why does Euclid's algorithm always terminate? Prove it.",
        a: "The algorithm terminates because n strictly decreases at every step. At each iteration, n is replaced by r = m mod n. By the definition of modulo, 0 ≤ r < n strictly. Therefore n decreases by at least 1 each iteration. Since n is a non-negative integer and strictly decreasing, it must eventually reach 0. When n = 0, the algorithm terminates and returns m.",
      },
    ],
  },

  "problem-types": {
    title: "Important Problem Types",
    emoji: "🗂️",
    tldr: "7 types: Sorting, Searching, String Processing, Graph Problems, Combinatorial, Geometric, Numerical. Know stable vs in-place for sorting.",
    explanation: `Computer science problems can be categorized into a small number of fundamental types. Understanding which category a problem falls into guides algorithm selection.

SORTING: Rearrange n items in non-decreasing (or non-increasing) order. Fundamental because sorted data enables efficient searching and other operations. Key variants: internal (fits in RAM) vs external (too large for RAM).
Properties: Stable (preserves relative order of equal elements) vs Unstable. In-place (uses O(1) extra space) vs not.

SEARCHING: Find a given value (key) in a given set. From simple sequential search (O(n)) to binary search (O(log n)) to hash tables (O(1) average).

STRING PROCESSING: Search for a pattern within a text. Fundamental in text editors, compilers, bioinformatics. Algorithms: Brute-force, KMP, Boyer-Moore, Rabin-Karp.

GRAPH PROBLEMS: Represent relationships between objects. Fundamental operations: traversal (BFS, DFS), shortest path (Dijkstra, Bellman-Ford), spanning tree (Prim, Kruskal), topological sort. Many real-world problems reduce to graph problems.

COMBINATORIAL PROBLEMS: Find an optimal object from a combinatorial (discrete) set — usually permutations or subsets. Examples: Travelling Salesman Problem (TSP), Knapsack. Typically hardest category (NP-hard).

GEOMETRIC PROBLEMS: Deal with geometric objects (points, lines, polygons). Examples: Closest pair problem, Convex hull.

NUMERICAL PROBLEMS: Involve continuous mathematical objects (equations, integrals, matrices). Challenges: round-off errors. Examples: solving systems of equations, numerical integration.`,
    keyPoints: [
      "Sorting: rearrange items in order. Key algorithms: Selection, Bubble, Merge sort.",
      "Searching: find a key. Key algorithms: Sequential search, Binary search.",
      "String Processing: find patterns in text. Key: Brute-force string match, KMP.",
      "Graph Problems: traversal, shortest path, spanning tree. BFS, DFS, Dijkstra.",
      "Combinatorial: optimal subsets/permutations. TSP, Knapsack. Usually NP-hard.",
      "Geometric: closest pair, convex hull.",
      "Numerical: equations, integrals. Continuous math with round-off concerns.",
      "Stable sort: preserves relative order of equal elements.",
      "In-place sort: uses no extra memory beyond a few units.",
    ],
    formula: {
      code: `Problem Type     │ Description              │ Key Examples
─────────────────┼──────────────────────────┼────────────────────────────
Sorting          │ Rearrange in order        │ Selection, Bubble, Merge sort
Searching        │ Find a key in a set       │ Sequential, Binary search
String Processing│ Match patterns in text    │ Brute-force match, KMP
Graph Problems   │ Traversal, shortest path  │ BFS, DFS, Dijkstra
Combinatorial    │ Optimal subsets/perms     │ TSP, Knapsack
Geometric        │ Closest pair, hull        │ Closest pair, Convex hull
Numerical        │ Equations, integrals      │ Gaussian elimination

Sorting Properties:
  Stable:   equal elements preserve original relative order
  In-place: uses only O(1) extra memory (few units beyond input)`,
      explanation: "Combinatorial problems are the hardest class — most are NP-hard with no known polynomial algorithm.",
    },
    examTips: [
      "Stable sort: equal elements stay in original order — Merge sort is stable, Selection sort is NOT",
      "In-place sort: O(1) extra space — Selection, Bubble, Insertion are in-place; Merge sort is NOT",
      "Graph problems: BFS and DFS are traversal; Dijkstra is shortest path",
      "Hardest category: Combinatorial (TSP, Knapsack) — often NP-hard",
    ],
    questions: [
      {
        q: "What does 'stable' mean for a sorting algorithm? Give an example of a stable and an unstable sort.",
        a: "A stable sorting algorithm preserves the relative order of elements with equal keys. Example: if two records have key=5, after a stable sort they appear in the same relative order as before. Merge sort is stable. Selection sort is NOT stable (swapping distant elements can change relative order of equal elements).",
      },
      {
        q: "Classify: (a) Finding the shortest route between two cities. (b) Checking if a string contains a keyword. (c) Solving a system of linear equations.",
        a: "(a) Graph Problem — this is the single-source shortest path problem, solved by Dijkstra's algorithm on a weighted graph. (b) String Processing — this is pattern matching, solved by brute-force string matching or KMP. (c) Numerical Problem — this is solved by Gaussian elimination. Each classification guides which algorithms to consider.",
      },
      {
        q: "What is the difference between internal and external sorting? When would you use each?",
        a: "Internal sorting: the entire dataset fits in main memory (RAM). All comparison-based sorts (QuickSort, MergeSort, HeapSort) are internal sorts. External sorting: the dataset is too large to fit in RAM and must be stored on disk. It requires techniques like external merge sort, which minimizes disk I/O by reading/writing large blocks. Use external sorting when processing files that are gigabytes or terabytes in size, far exceeding available RAM.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // ANALYSIS FRAMEWORK
  // ─────────────────────────────────────────────

  "analysis-framework": {
    title: "Analysis Framework — Overview",
    emoji: "📐",
    tldr: "Two approaches: empirical (run it and time it) vs theoretical (count operations mathematically). Theoretical is machine-independent and covers all inputs.",
    explanation: `Before analyzing an algorithm, we need a consistent framework. The goal is to understand HOW FAST and HOW MUCH MEMORY an algorithm uses, as a function of the input size.

TWO APPROACHES:

PERFORMANCE MEASUREMENT (Empirical): Write the actual program, run it on a real machine, and measure the wall-clock time. This gives real results for specific hardware and compilers, but it's machine-dependent, requires full implementation, and can't cover all possible inputs.

Limitations of empirical: (1) Need a working implementation first. (2) Results depend on hardware/OS/compiler — not portable. (3) Can't test all inputs — only representative ones. (4) Hard to compare across different systems.

PERFORMANCE ANALYSIS (Theoretical): Analyze the algorithm at a high level using a mathematical model. The result is a function T(n) giving running time (in terms of basic operations) as a function of input size n. This is:
  - Machine-independent
  - Covers all possible inputs of size n
  - Gives insight into asymptotic behavior
  - No implementation required

For most purposes in this course, theoretical analysis is the standard approach.`,
    keyPoints: [
      "Two approaches: empirical (run and time) vs theoretical (count operations)",
      "Empirical: machine-dependent, needs implementation, can't cover all inputs",
      "Theoretical: machine-independent, covers all inputs, no implementation needed",
      "Theoretical gives T(n) = number of basic operations as a function of input size n",
      "We focus on THEORETICAL analysis in this course",
    ],
    formula: {
      code: `Empirical Analysis:
  Steps: Implement → Run on hardware → Measure time
  Result: actual runtime in seconds for specific machine
  Limitation: machine-dependent, subset of inputs only

Theoretical Analysis:
  Steps: Identify basic operation → Count executions → Express as T(n)
  Result: T(n) = function of input size n (machine-independent)
  Benefit: covers ALL inputs of size n, no implementation needed

Key insight:
  T(n) ≈ c_op × C(n)
  where c_op = time for one basic operation (constant, machine-specific)
        C(n) = number of times basic operation executes (what we compute)`,
      explanation: "By separating C(n) from c_op, we make the analysis machine-independent.",
    },
    examTips: [
      "Theoretical analysis = machine-independent; empirical = machine-dependent",
      "Theoretical advantage: covers ALL inputs of size n (not just test inputs)",
      "We express efficiency as a function of input size n",
      "MCQ: 'Which approach requires implementing the algorithm first?' → Empirical",
    ],
    questions: [
      {
        q: "Compare empirical and theoretical approaches to algorithm analysis. Which is preferred and why?",
        a: "Empirical (performance measurement): implement the algorithm, run on real hardware, measure wall-clock time. Advantage: gives actual runtime numbers. Disadvantages: machine-dependent, requires full implementation, can't test all inputs, results not portable across hardware. Theoretical (performance analysis): count basic operations mathematically, express as T(n). Advantages: machine-independent, covers all inputs of size n, no implementation needed, gives insight into asymptotic growth. Theoretical is preferred in academic and design contexts because it characterizes the algorithm's intrinsic efficiency, not a specific hardware implementation.",
      },
      {
        q: "What does it mean for an analysis to be 'machine-independent'? Why is this important?",
        a: "Machine-independent means the analysis result doesn't depend on the specific hardware, compiler, or operating system used. We achieve this by expressing efficiency as C(n) — the count of basic operations — rather than wall-clock time. Since T(n) = c_op × C(n), the constant c_op absorbs the machine-specific factor, and C(n) captures the algorithm's intrinsic behavior. This is important because it allows us to compare algorithms fairly, design algorithms that will remain efficient on any hardware, and make statements like 'this algorithm is O(n²)' that are universally valid.",
      },
    ],
  },

  "input-size": {
    title: "Measuring Input Size",
    emoji: "📏",
    tldr: "Efficiency is defined as T(n), a function of input size n. n = number of items (list), matrix dimension (matrices), number of bits (number theory), etc.",
    explanation: `The running time of an algorithm depends on the size of its input. We define efficiency as a function of a single parameter n representing the input size.

CHOOSING THE INPUT SIZE MEASURE:
The right measure of n depends on the problem:

For SORTING n numbers: n = number of items to sort (most natural).

For MULTIPLYING two n×n matrices: n = the dimension of the matrices. (The actual number of elements is n², but we typically use n as the parameter and express complexity as n², n³, etc.)

For SEARCHING in a list of n items: n = number of items.

For STRING MATCHING: may use n = length of text and m = length of pattern. Sometimes combined.

For NUMBER THEORY problems (e.g., checking if n is prime): the input size is the number of BITS in n, which is ⌊log₂n⌋ + 1. This is because primality of 1000-digit numbers is very different from 10-digit numbers, and the bit-length reflects the true "size" of the input.

The key insight is that all operations in the algorithm eventually scale with this chosen parameter n.`,
    keyPoints: [
      "Efficiency expressed as T(n), a function of input size parameter n",
      "Sorting n numbers: n = number of items",
      "Multiplying n×n matrices: n = matrix dimension",
      "Searching list: n = number of items",
      "Number theory (e.g., primality): n = number of BITS (log₂ of the number)",
      "Choose n to reflect the actual 'size' of the problem",
    ],
    formula: {
      code: `Problem                    │ Input Size n    │ Why
───────────────────────────┼─────────────────┼────────────────────────────
Sort n numbers             │ n               │ # items to sort
Search in list of n items  │ n               │ # items to search
Multiply n×n matrices      │ n               │ matrix dimension
Find nth Fibonacci         │ n               │ index n
Primality test of number N │ ⌊log₂N⌋ + 1    │ # bits in N
Evaluate polynomial        │ degree n        │ # coefficients`,
      explanation: "For number theory: N=1000000 has about 20 bits. The bit-length is the true 'size' of a number.",
    },
    examTips: [
      "For number theory (primality, GCD of large numbers): input size = number of BITS",
      "For most other problems: n = number of items or dimension",
      "MCQ: 'For multiplying two n×n matrices, the basic operation count is expressed in terms of?' → n",
    ],
    questions: [
      {
        q: "For a primality test, why is the input size measured in bits rather than the numeric value itself?",
        a: "Because the number of bits b = ⌊log₂N⌋+1 reflects the 'size' of the representation. If an algorithm runs in O(N) steps, that's exponential in b (since N = 2^b approximately), making it exponential-time. But if it runs in O(b²) = O(log²N) steps, that's truly polynomial. Measuring by numeric value N would make a O(√N) algorithm appear efficient when it is actually exponential in the bit-length. This distinction between polynomial and pseudopolynomial algorithms is fundamental to complexity theory.",
      },
      {
        q: "What is the input size for the following? (a) Searching an array, (b) Graph traversal, (c) Binary exponentiation of aⁿ.",
        a: "(a) Searching an array of n elements: input size = n (number of elements). (b) Graph traversal: input size is typically expressed in terms of both V (number of vertices) and E (number of edges), since both affect the runtime of BFS/DFS which is O(V+E). (c) Binary exponentiation to compute aⁿ: input size = number of bits in n, i.e., ⌊log₂n⌋+1, since the number of squarings performed equals the bit-length of n.",
      },
    ],
  },

  "basic-operation": {
    title: "Basic Operation and Running Time Formula",
    emoji: "⚙️",
    tldr: "Basic operation = the operation contributing most to total running time, typically in the innermost loop. T(n) ≈ c_op × C(n).",
    explanation: `Instead of timing every individual instruction (which would be machine-dependent), we count the execution of the most significant operation — the BASIC OPERATION.

DEFINITION: The basic operation is the operation that contributes the most to the total running time of an algorithm. Typically, it's the operation inside the innermost loop (since loops execute many times).

Examples:
  - For SORTING: comparisons between elements (the key comparison)
  - For MATRIX multiplication: multiplications of matrix elements
  - For SEARCHING: comparison of search key with array element
  - For POLYNOMIAL evaluation: multiplications

Why not count ALL operations? Because the basic operation dominates — other operations (loop increments, comparisons for loop bounds, index updates) execute the same number of times as the basic operation or fewer, and differ only by constant factors.

RUNNING TIME FORMULA:
T(n) ≈ c_op × C(n)

where:
  c_op = time to execute one instance of the basic operation (machine-specific constant)
  C(n) = count of how many times the basic operation executes (what we compute)

By focusing on C(n), our analysis is machine-independent. The constant c_op only shifts timing by a constant factor.`,
    keyPoints: [
      "Basic operation = operation contributing MOST to runtime, usually in innermost loop",
      "T(n) ≈ c_op × C(n), where c_op is machine-specific and C(n) is what we analyze",
      "For sorting/searching: basic operation = key comparison",
      "For matrix multiplication: basic operation = multiplication",
      "Counting only basic operation gives machine-independent analysis",
      "Other operations differ by constant factors from the basic operation count",
    ],
    formula: {
      code: `Problem              │ Input Size │ Basic Operation
─────────────────────┼────────────┼────────────────────────
Search in n items    │ n          │ Key comparison A[i]=K
Add two n×n matrices │ n          │ Addition of elements
Multiply matrices    │ n          │ Multiplication
Sort n items         │ n          │ Element comparison
Polynomial of degree n│ n         │ Multiplication

Running time formula:
  T(n) ≈ c_op × C(n)
  c_op = execution time per basic operation (constant)
  C(n) = how many times basic op executes

Example: if C(n) = n²/2 and c_op = 0.001 seconds:
  T(1000) ≈ 0.001 × (10^6/2) = 500 seconds`,
      explanation: "C(n) is what we compute theoretically. c_op is measured empirically once.",
    },
    examTips: [
      "Basic operation = usually the INNERMOST LOOP operation",
      "For comparison-based algorithms (sort/search): basic op = comparison",
      "For arithmetic problems (matrix mult): basic op = multiplication",
      "T(n) = c_op × C(n) — know this formula",
    ],
    questions: [
      {
        q: "What is the basic operation for matrix multiplication, and why?",
        a: "The basic operation for matrix multiplication is the multiplication of two matrix elements. This is the innermost loop operation: C[i][j] += A[i][k] * B[k][j]. Each multiplication is paired with an addition, but multiplication dominates in floating-point cost. There are n³ such multiplications (three nested loops from 0 to n-1), so C(n) = n³.",
      },
      {
        q: "Why do we count only the 'basic operation' rather than every individual instruction?",
        a: "Because all other operations (loop counter increments, boundary checks, index computations) execute proportionally to the basic operation — at most as many times, differing only by constant factors. By the formula T(n) = c_op × C(n), constant factors are absorbed into c_op. Counting only the basic operation yields C(n), which captures the growth rate of the algorithm independent of machine speed. This gives a clean, machine-independent characterization of efficiency.",
      },
      {
        q: "Identify the basic operation: (a) Sequential search, (b) Bubble sort, (c) Polynomial evaluation p(x) = aₙxⁿ + ... + a₀.",
        a: "(a) Sequential search: comparison A[i] = K (checking if current element matches the key). (b) Bubble sort: comparison A[j] > A[j+1] (comparing adjacent elements in the innermost loop). (c) Polynomial evaluation (Horner's method): multiplication, since computing each term aᵢxⁱ requires i multiplications and Horner's method reduces this to n multiplications total, which is the dominant operation.",
      },
    ],
  },

  "orders-of-growth": {
    title: "Orders of Growth",
    emoji: "📈",
    tldr: "Focus on dominant term, ignore constants. Hierarchy: 1 < log n < n < n log n < n² < n³ < 2ⁿ < n!",
    explanation: `When analyzing algorithms, we focus on how the running time GROWS as input size n increases, ignoring constant factors and lower-order terms.

WHY IGNORE CONSTANTS? Because hardware improvements can change constants (a 2× faster CPU halves c_op), but the growth rate is fundamental to the algorithm. An O(n²) algorithm remains O(n²) regardless of the machine.

WHY IGNORE LOWER-ORDER TERMS? For large n, the dominant term overwhelms all others. For n=10⁶: n² = 10¹², but n = 10⁶ — the linear term is a million times smaller than the quadratic one.

GROWTH RATE HIERARCHY (slowest to fastest):
1 < log n < √n < n < n log n < n² < n³ < 2ⁿ < n!

Key observations:
- LOGARITHMIC (log n): extremely fast, barely grows — divide-and-conquer algorithms
- LINEAR (n): grows proportionally — fine for large inputs
- n log n: only slightly worse than linear — still excellent (merge sort)
- QUADRATIC (n²): doubles → 4× slowdown — problematic for large inputs
- EXPONENTIAL (2ⁿ): doubles every extra element — impractical beyond n≈30
- FACTORIAL (n!): faster than exponential — impractical beyond n≈12

IMPORTANT: log_a(n) and log_b(n) belong to the SAME growth class because they differ only by a constant factor (log_a(n) = log_b(n)/log_b(a)). So we just write log n.`,
    keyPoints: [
      "Focus on dominant term; ignore constants and lower-order terms",
      "Hierarchy: 1 < log n < n < n log n < n² < n³ < 2ⁿ < n!",
      "log n: binary search, divide-and-conquer — extremely efficient",
      "n log n: merge sort — best comparison-based sorting",
      "n²: bubble/selection sort — problematic for large n",
      "2ⁿ, n!: exhaustive algorithms — impractical beyond small n",
      "All log_a(n) belong to same class Θ(log n) regardless of base",
    ],
    formula: {
      code: `Class    │ Name       │ n=10  │ n=100     │ n=1000     │ Example
─────────┼────────────┼───────┼───────────┼────────────┼────────────────────
1        │ Constant   │ 1     │ 1         │ 1          │ Array access
log n    │ Logarithmic│ 3.3   │ 6.6       │ 10         │ Binary search
n        │ Linear     │ 10    │ 100       │ 1000       │ Sequential search
n log n  │ n-log-n    │ 33    │ 664       │ 10,000     │ Merge sort
n²       │ Quadratic  │ 100   │ 10,000    │ 10⁶        │ Bubble sort
n³       │ Cubic      │ 1000  │ 10⁶       │ 10⁹        │ Matrix multiply
2ⁿ       │ Exponential│ 1024  │ 1.3×10³⁰  │ ≫ atoms    │ Subset generation
n!       │ Factorial  │ 3.6M  │ ≈ 10¹⁵⁸   │ ≫ ≫ atoms  │ TSP brute force

Order hierarchy (IMPORTANT):
  log n < n^ε (any ε>0) < a^n (any a>1) < n! < n^n`,
      explanation: "The gap between polynomial and exponential growth is enormous — this is why algorithms matter.",
    },
    examTips: [
      "Hierarchy: 1 < log n < n < n log n < n² < n³ < 2ⁿ < n! — memorise this",
      "All logarithms belong to same class: log₂n ∈ Θ(log n) = log₃n ∈ Θ(log n)",
      "For n=100: 2¹⁰⁰ ≈ 10³⁰ — exponential is truly impractical",
      "MCQ: 'Which class is faster than n but slower than n²?' → n log n",
    ],
    questions: [
      {
        q: "Why are all logarithmic functions in the same asymptotic class?",
        a: "Because log_a(n) = log_b(n) / log_b(a) for any bases a and b. The change of base formula shows they differ only by a constant factor (1/log_b(a)). Since asymptotic notation ignores constant factors, log_2(n) ∈ Θ(log n) = log_3(n) ∈ Θ(log n) regardless of base.",
      },
      {
        q: "Arrange the following in increasing order of growth rate: n!, 2ⁿ, n³, n log n, log n, n, 1, n².",
        a: "1 < log n < n < n log n < n² < n³ < 2ⁿ < n!. Justification: constant < logarithmic < linear < linearithmic < quadratic < cubic < exponential < factorial. This is the fundamental growth-rate hierarchy in algorithm analysis.",
      },
      {
        q: "An algorithm with n=1000 takes 1 second at O(n log n). Estimate time for n=2000 at (a) O(n log n) and (b) O(n²).",
        a: "(a) O(n log n): ratio ≈ (2000 × log 2000)/(1000 × log 1000) = (2000 × 10.96)/(1000 × 9.97) ≈ 2.2. Time ≈ 2.2 seconds. (b) O(n²): ratio = (2000)²/(1000)² = 4. Time ≈ 4 seconds. This illustrates how doubling n gives very different slowdowns depending on the growth class.",
      },
    ],
  },

  "best-worst-avg": {
    title: "Best, Worst, and Average Case Analysis",
    emoji: "📊",
    tldr: "When efficiency depends on INPUT TYPE (not just size), analyze three cases. Sequential search: worst=n, best=1, avg=p(n+1)/2 + (1-p)n.",
    explanation: `For some algorithms, the running time depends not just on the SIZE of the input, but on the specific CONTENT of the input. For these, we must analyze three cases.

BEST CASE: The minimum number of basic operations over all inputs of size n. This is the most favorable arrangement of input.

WORST CASE: The maximum number of operations over all inputs of size n. Most important in practice — it gives a GUARANTEE: "no matter what input you give, it won't exceed this."

AVERAGE CASE: The expected number of operations over all inputs of size n, assuming some probability distribution over inputs. Most informative but hardest to compute.

EXAMPLE — SEQUENTIAL SEARCH:
Searching for key K in array A[0..n-1].

Worst case: K is not in A → must check all n elements → C_worst(n) = n ∈ O(n)
Best case: K is the first element A[0] → C_best(n) = 1
Average case: Let p = probability that K is in A.
  - If found (probability p): average position is (n+1)/2 → C_avg,found = (n+1)/2
  - If not found (probability 1-p): check all n → C_avg,notfound = n
  - Combined: C_avg(n) = p(n+1)/2 + (1-p)n
  - Special case p=1 (always in list): C_avg = (n+1)/2

Note: For algorithms with FIXED behavior regardless of input content (like matrix addition), all three cases are identical.`,
    keyPoints: [
      "Best case: minimum operations over all size-n inputs (most favorable)",
      "Worst case: maximum operations — gives guaranteed upper bound",
      "Average case: expected operations under probability distribution",
      "Sequential search: worst=n, best=1, avg=p(n+1)/2 + (1-p)n",
      "For p=1 (key always present): avg = (n+1)/2 ≈ n/2",
      "Not all algorithms need three cases — fixed-behavior algorithms have one case",
    ],
    formula: {
      code: `ALGORITHM SequentialSearch(A[0..n-1], K)
// Input: Array A[0..n-1], search key K
// Output: Index of first match, or -1
i ← 0
while i < n and A[i] ≠ K do
    i ← i + 1
if i < n return i
else return -1

Analysis (basic op = key comparison A[i] ≠ K):
  Worst case:  C_worst(n) = n           (K not in A)
  Best case:   C_best(n)  = 1           (K = A[0])
  Average case (p = probability K is in list):
    C_avg(n) = p × (n+1)/2 + (1-p) × n

  When p = 1 (key always present):
    C_avg(n) = (n+1)/2 ≈ n/2  ∈ Θ(n)

  When p = 0 (key never present):
    C_avg(n) = n  ∈ Θ(n)`,
      explanation: "The average case formula covers both found and not-found scenarios, weighted by probability p.",
    },
    examTips: [
      "Average case formula: p(n+1)/2 + (1-p)n — know this for sequential search",
      "When p=1 (always found): avg = (n+1)/2",
      "Worst case is the most practically important — it's a performance GUARANTEE",
      "Best case can be misleadingly optimistic — don't rely on it alone",
    ],
    questions: [
      {
        q: "Derive the average case complexity of sequential search assuming the key is always present (p=1).",
        a: "If the key is always in the list (p=1), it's equally likely to be at any of the n positions. The expected number of comparisons = (1+2+3+...+n)/n = n(n+1)/2 / n = (n+1)/2. So C_avg(n) = (n+1)/2 ∈ Θ(n).",
      },
      {
        q: "For sequential search, compute average case C_avg when p = 0.5 and n = 10.",
        a: "Using C_avg(n) = p(n+1)/2 + (1-p)n = 0.5 × (11/2) + 0.5 × 10 = 0.5 × 5.5 + 5 = 2.75 + 5 = 7.75. So on average 7.75 comparisons are needed when there's a 50% chance the key is in the list of 10 elements.",
      },
      {
        q: "Why is worst-case analysis the most practically important of the three cases?",
        a: "Because worst-case analysis provides a performance GUARANTEE. It tells you: 'no matter what input you feed this algorithm, it will never take more than X operations.' This is critical for real-time systems, security systems, or any application where predictable performance is required. Best-case analysis is misleadingly optimistic (the best input may rarely occur). Average-case analysis requires a probability distribution that may not reflect real data. Worst-case guarantees are always valid and actionable.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // ASYMPTOTIC NOTATIONS
  // ─────────────────────────────────────────────

  "big-o": {
    title: "Big-O Notation (Upper Bound)",
    emoji: "⬆️",
    tldr: "t(n) ∈ O(g(n)) means t(n) grows NO FASTER than g(n). Formal: ∃ c>0, n₀≥0 such that t(n) ≤ c·g(n) for all n≥n₀.",
    explanation: `Big-O notation provides an UPPER BOUND on the growth rate of a function. It says: beyond some point n₀, the function t(n) never exceeds c×g(n) for some constant c.

FORMAL DEFINITION: t(n) ∈ O(g(n)) if there exist positive constants c and n₀ such that:
  t(n) ≤ c·g(n)   for all n ≥ n₀

MEANING: t(n) grows NO FASTER than g(n). g(n) is an upper bound on t(n)'s growth rate (up to a constant factor, and beyond some threshold n₀).

INTUITION: "t(n) is at most proportional to g(n) for large n."

EXAMPLES:
  100n + 5 ∈ O(n): Take c=101, n₀=5. Then 100n+5 ≤ 101n for all n≥5. ✓
  5n² ∈ O(n²): Take c=5, n₀=1.
  n² ∈ O(n³): Upper bounds can be loose — n² grows slower than n³.
  n³ ∉ O(n²): n³ grows faster than n², so n² is not an upper bound.

IMPORTANT: O() notation is just an upper bound — it doesn't say t(n) actually reaches that rate. n ∈ O(n²) is technically true but not tight. For tight bounds, use Θ().`,
    keyPoints: [
      "O(g(n)) = upper bound on growth rate",
      "t(n) ∈ O(g(n)) iff ∃ c>0, n₀≥0 such that t(n) ≤ c·g(n) for all n≥n₀",
      "Means: t(n) grows no faster than g(n)",
      "Upper bounds can be loose: n ∈ O(n²) is technically correct but not tight",
      "Example: 100n+5 ∈ O(n). Example: n² ∉ O(n).",
      "Most common notation in practice — gives worst-case growth guarantee",
    ],
    formula: {
      code: `Definition: t(n) ∈ O(g(n)) iff
  ∃ c > 0  and  n₀ ≥ 0  such that:
  t(n) ≤ c·g(n)   for all n ≥ n₀

Example 1: Show 100n + 5 ∈ O(n)
  Need: 100n + 5 ≤ c·n for large n
  Choose c = 101, n₀ = 5
  For n ≥ 5: 100n + 5 ≤ 100n + n = 101n  ✓

Example 2: Show n² ∉ O(n)
  Need: n² ≤ c·n for all large n → n ≤ c
  But n is unbounded → no constant c works  ✗

Example 3: n ∈ O(n²) (loose but valid upper bound)
  Choose c = 1: n ≤ n² for all n ≥ 1  ✓  (but Θ(n) is tighter)`,
      explanation: "To prove O(): find explicit constants c and n₀ satisfying the inequality.",
    },
    examTips: [
      "O() = upper bound. Formal: t(n) ≤ c·g(n) for all n≥n₀",
      "To prove O(): find explicit c and n₀, verify the inequality",
      "Big-O does NOT mean tight bound — for tight bounds use Θ()",
      "Proof technique: find c = sum of all coefficients, n₀ = 1",
    ],
    questions: [
      {
        q: "Prove that 5n² + 3n + 2 ∈ O(n²).",
        a: "Need: 5n²+3n+2 ≤ c·n² for all n≥n₀. Choose n₀=1: for n≥1, 3n ≤ 3n² and 2 ≤ 2n². So 5n²+3n+2 ≤ 5n²+3n²+2n² = 10n². Choose c=10, n₀=1. Then 5n²+3n+2 ≤ 10n² for all n≥1. ∴ 5n²+3n+2 ∈ O(n²). ✓",
      },
      {
        q: "Prove that n³ ∉ O(n²).",
        a: "Assume for contradiction that n³ ∈ O(n²). Then ∃ constants c>0, n₀ such that n³ ≤ c·n² for all n≥n₀. Dividing both sides by n² (positive for n>0): n ≤ c for all n≥n₀. But n is unbounded — we can always choose n > c. Contradiction. Therefore n³ ∉ O(n²). ✗",
      },
      {
        q: "Show that n log n ∈ O(n²).",
        a: "Need: n log n ≤ c·n² for all n≥n₀. Dividing by n (positive): log n ≤ c·n. Choose c=1, n₀=1. For all n≥1, log n ≤ n (log n grows slower than n, provable by derivative: d/dn(log n) = 1/(n ln 2) < 1 = d/dn(n) for n > 1/(ln 2) ≈ 1.44). So n log n ≤ n·n = n² for all n≥2. With c=1, n₀=2: n log n ∈ O(n²). ✓",
      },
    ],
  },

  "big-omega": {
    title: "Omega Notation (Lower Bound)",
    emoji: "⬇️",
    tldr: "t(n) ∈ Ω(g(n)) means t(n) grows AT LEAST AS FAST as g(n). Formal: t(n) ≥ c·g(n) for all n≥n₀.",
    explanation: `Omega notation provides a LOWER BOUND on the growth rate. It says t(n) is at least as fast as g(n) (up to a constant).

FORMAL DEFINITION: t(n) ∈ Ω(g(n)) if there exist positive constants c and n₀ such that:
  t(n) ≥ c·g(n)   for all n ≥ n₀

MEANING: t(n) grows AT LEAST AS FAST as g(n). g(n) is a lower bound on t(n)'s growth rate.

INTUITION: "t(n) is at least proportional to g(n) for large n."

EXAMPLES:
  10n² ∈ Ω(n²): Take c=10, n₀=1. Then 10n² ≥ 10·n². ✓ (tight lower bound)
  10n² ∈ Ω(n): Take c=1, n₀=1. Then 10n² ≥ n for all n≥1. ✓ (loose but valid)
  n ∉ Ω(n²): n grows slower than n², so n² is not a lower bound for n.

USE CASE: Proving LOWER BOUNDS on algorithms. For example, any comparison-based sorting algorithm requires at least Ω(n log n) comparisons — this is a fundamental lower bound on the problem, not just one algorithm.`,
    keyPoints: [
      "Ω(g(n)) = lower bound on growth rate",
      "t(n) ∈ Ω(g(n)) iff ∃ c>0, n₀≥0 such that t(n) ≥ c·g(n) for all n≥n₀",
      "Means: t(n) grows at least as fast as g(n)",
      "Example: 10n² ∈ Ω(n²). Example: n ∉ Ω(n²).",
      "Used to prove lower bounds on problems (e.g., sorting requires Ω(n log n))",
    ],
    formula: {
      code: `Definition: t(n) ∈ Ω(g(n)) iff
  ∃ c > 0  and  n₀ ≥ 0  such that:
  t(n) ≥ c·g(n)   for all n ≥ n₀

Example 1: Show 10n² ∈ Ω(n²)
  Choose c = 10, n₀ = 1
  10n² ≥ 10·n² for all n ≥ 1  ✓

Example 2: Show n ∉ Ω(n²)
  Need: n ≥ c·n² → 1 ≥ c·n
  But n is unbounded → no constant c > 0 works  ✗

Relationship with O():
  t(n) ∈ O(g(n))  ↔  g(n) ∈ Ω(t(n))
  (O and Ω are "inverses" of each other)`,
      explanation: "Ω is the mirror image of O. O gives a ceiling; Ω gives a floor.",
    },
    examTips: [
      "Ω() = lower bound. Formal: t(n) ≥ c·g(n) for all n≥n₀",
      "O() is ceiling; Ω() is floor",
      "Sorting lower bound: any comparison sort requires Ω(n log n)",
      "t(n) ∈ O(g(n)) ↔ g(n) ∈ Ω(t(n))",
    ],
    questions: [
      {
        q: "Prove that 3n² + 5 ∈ Ω(n²).",
        a: "Need: 3n²+5 ≥ c·n² for all n≥n₀. Since 3n²+5 ≥ 3n² for all n≥0, choose c=3 and n₀=0. Then 3n²+5 ≥ 3·n² for all n≥0. ∴ 3n²+5 ∈ Ω(n²). ✓",
      },
      {
        q: "Prove that n ∉ Ω(n²).",
        a: "Suppose for contradiction that n ∈ Ω(n²). Then ∃ c>0, n₀ such that n ≥ c·n² for all n≥n₀. Dividing by n (positive): 1 ≥ c·n for all n≥n₀. But c·n → ∞ as n→∞, so there is no positive c making this hold for all large n. Contradiction. ∴ n ∉ Ω(n²). ✗",
      },
      {
        q: "State the relationship between O and Ω. If f(n) ∈ O(g(n)), what can you say about g(n)?",
        a: "The relationship is: t(n) ∈ O(g(n)) if and only if g(n) ∈ Ω(t(n)). They are inverse notations. If f(n) ∈ O(g(n)), it means f grows no faster than g, which means g grows at least as fast as f, which is exactly g(n) ∈ Ω(f(n)). Example: n ∈ O(n²) ↔ n² ∈ Ω(n).",
      },
    ],
  },

  "big-theta": {
    title: "Theta Notation (Tight Bound)",
    emoji: "🎯",
    tldr: "t(n) ∈ Θ(g(n)) means t(n) grows at the SAME RATE as g(n). Both O and Ω hold simultaneously. Example: (1/2)n(n-1) ∈ Θ(n²).",
    explanation: `Theta notation provides a TIGHT BOUND — it says t(n) grows at exactly the same rate as g(n) (up to constant factors).

FORMAL DEFINITION: t(n) ∈ Θ(g(n)) if there exist positive constants c₁, c₂, and n₀ such that:
  c₂·g(n) ≤ t(n) ≤ c₁·g(n)   for all n ≥ n₀

EQUIVALENTLY: t(n) ∈ Θ(g(n)) iff t(n) ∈ O(g(n)) AND t(n) ∈ Ω(g(n)).

MEANING: t(n) is SANDWICHED between c₂·g(n) and c₁·g(n). It grows at EXACTLY the same asymptotic rate as g(n).

EXAMPLE: Show (1/2)n(n-1) ∈ Θ(n²)
  Upper bound: (1/2)n(n-1) = (1/2)n² - (1/2)n ≤ (1/2)n² ≤ n² → O(n²) with c₁=1
  Lower bound: (1/2)n(n-1) = (1/2)n² - (1/2)n ≥ (1/4)n² for n≥2 → Ω(n²) with c₂=1/4
  Both hold → (1/2)n(n-1) ∈ Θ(n²)

PRACTICAL USE: When we say an algorithm "is Θ(n²)," we mean its complexity is exactly quadratic — not just upper-bounded by n² (which could be loose), but also lower-bounded by n².`,
    keyPoints: [
      "Θ(g(n)) = tight bound — both O() and Ω() hold",
      "t(n) ∈ Θ(g(n)) iff c₂·g(n) ≤ t(n) ≤ c₁·g(n) for all n≥n₀",
      "Means: t(n) grows at EXACTLY the same rate as g(n)",
      "Example: (1/2)n(n-1) ∈ Θ(n²). Example: n²+5n ∈ Θ(n²).",
      "Preferred notation when we know the exact growth class",
      "t(n) ∈ Θ(g(n)) ↔ t(n) ∈ O(g(n)) and t(n) ∈ Ω(g(n))",
    ],
    formula: {
      code: `Definition: t(n) ∈ Θ(g(n)) iff
  ∃ c₁, c₂ > 0  and  n₀ ≥ 0  such that:
  c₂·g(n) ≤ t(n) ≤ c₁·g(n)   for all n ≥ n₀

Example: Show (1/2)n(n-1) ∈ Θ(n²)
  Upper: (1/2)n(n-1) = (1/2)n² - (1/2)n ≤ (1/2)n² ≤ n²    (c₁=1)
  Lower: (1/2)n(n-1) = (1/2)n² - (1/2)n ≥ (1/4)n² for n≥2  (c₂=1/4, n₀=2)
  → (1/2)n(n-1) ∈ Θ(n²)  ✓

Equivalence:
  t(n) ∈ Θ(g(n))  ↔  t(n) ∈ O(g(n))  AND  t(n) ∈ Ω(g(n))

Visual: c₂·g(n) ─── t(n) ─── c₁·g(n)
        [t(n) sandwiched between two multiples of g(n)]`,
      explanation: "Theta is the 'exact' notation — the algorithm's complexity is precisely the stated class.",
    },
    examTips: [
      "Θ() = tight bound = O() AND Ω() simultaneously",
      "To prove Θ(): prove both O() and Ω() separately",
      "Dominant term determines Θ class: 5n²+3n+1 ∈ Θ(n²)",
      "MCQ: 'Which notation gives both upper and lower bounds?' → Θ (Theta)",
    ],
    questions: [
      {
        q: "Prove that 5n² + 4n + 2 ∈ Θ(n²).",
        a: "Upper bound: 5n²+4n+2 ≤ 5n²+4n²+2n² = 11n² for n≥1. So ∈ O(n²) with c₁=11, n₀=1. Lower bound: 5n²+4n+2 ≥ 5n² ≥ 5n² for all n≥0. So ∈ Ω(n²) with c₂=5, n₀=0. Both bounds hold, so 5n²+4n+2 ∈ Θ(n²).",
      },
      {
        q: "Show that n²/4 - n ∈ Θ(n²).",
        a: "Upper: n²/4 - n ≤ n²/4 ≤ n² for all n≥1. So ∈ O(n²) with c₁=1, n₀=1. Lower: n²/4 - n = n(n/4 - 1) ≥ n·(n/8) = n²/8 for n≥8 (since n/4 - 1 ≥ n/8 when n ≥ 8). So ∈ Ω(n²) with c₂=1/8, n₀=8. Both hold → n²/4 - n ∈ Θ(n²). ✓",
      },
      {
        q: "Is 2ⁿ ∈ Θ(3ⁿ)? Justify.",
        a: "No. lim(n→∞) 2ⁿ/3ⁿ = lim (2/3)ⁿ = 0, since 2/3 < 1. Since the limit is 0, 2ⁿ ∈ o(3ⁿ), meaning 2ⁿ grows strictly slower than 3ⁿ. For Θ, we need the limit to be a nonzero finite constant. Since it's 0, 2ⁿ ∉ Θ(3ⁿ). Different exponential bases are NEVER in the same Θ class.",
      },
    ],
  },

  "little-o-omega": {
    title: "Little-o and Little-ω Notations",
    emoji: "🔬",
    tldr: "o(g): strictly slower growth than g. ω(g): strictly faster growth than g. Unlike O and Ω, these are STRICT inequalities — the limit must be 0 or ∞.",
    explanation: `Little-o and little-omega are the STRICT versions of O and Ω. They exclude the possibility of equal growth rates.

LITTLE-o NOTATION: t(n) ∈ o(g(n)) if for ANY c > 0 (no matter how small):
  t(n) < c·g(n)   for all sufficiently large n

This means t(n) grows STRICTLY SLOWER than g(n). Using limits: lim(t(n)/g(n)) = 0.

Example: n ∈ o(n²) because lim n/n² = lim 1/n = 0. ✓
But: n² ∉ o(n²) because lim n²/n² = 1 ≠ 0. ✗ (same growth rate)

LITTLE-ω NOTATION: t(n) ∈ ω(g(n)) if for ANY c > 0:
  t(n) > c·g(n)   for all sufficiently large n

This means t(n) grows STRICTLY FASTER than g(n). Using limits: lim(t(n)/g(n)) = ∞.

Example: 3n² + 2 ∈ ω(n) because lim (3n²+2)/n = lim (3n+2/n) = ∞. ✓

KEY DIFFERENCE from O/Ω:
  t(n) ∈ O(g(n)) allows lim = c (finite constant, including equal growth)
  t(n) ∈ o(g(n)) requires lim = 0 (strictly slower)
  t(n) ∈ ω(g(n)) requires lim = ∞ (strictly faster)`,
    keyPoints: [
      "o(g(n)) = strictly slower growth: lim t(n)/g(n) = 0",
      "ω(g(n)) = strictly faster growth: lim t(n)/g(n) = ∞",
      "Unlike O and Ω, little-o and ω exclude equal growth rates",
      "Example: n ∈ o(n²). But n ∉ o(n) (same rate).",
      "Example: n² ∈ ω(n). But n ∉ ω(n) (same rate).",
      "n ∈ Θ(n) — so n ∉ o(n) and n ∉ ω(n)",
    ],
    formula: {
      code: `Little-o: t(n) ∈ o(g(n)) iff
  for ANY c > 0: t(n) < c·g(n) for all sufficiently large n
  Equivalently: lim(n→∞) t(n)/g(n) = 0

Little-ω: t(n) ∈ ω(g(n)) iff
  for ANY c > 0: t(n) > c·g(n) for all sufficiently large n
  Equivalently: lim(n→∞) t(n)/g(n) = ∞

Comparison summary:
  Notation │ Limit lim t/g │ Meaning
  ─────────┼───────────────┼─────────────────────────
  o(g)     │ = 0           │ t strictly slower than g
  O(g)     │ ≤ finite      │ t no faster than g
  Θ(g)     │ = c (0<c<∞)   │ t same rate as g
  Ω(g)     │ ≥ positive    │ t at least as fast as g
  ω(g)     │ = ∞           │ t strictly faster than g`,
      explanation: "The 5 notations form a complete hierarchy from strictly slower to strictly faster.",
    },
    examTips: [
      "o() requires limit = 0 (strictly slower). ω() requires limit = ∞ (strictly faster).",
      "n² ∈ o(n³): lim n²/n³ = lim 1/n = 0 ✓",
      "n ∈ ω(log n): lim n/log n = ∞ ✓",
      "n ∉ o(n): lim n/n = 1 ≠ 0 ✗",
    ],
    questions: [
      {
        q: "Show that log n ∈ o(n).",
        a: "Need: lim(n→∞) log n / n = 0. Applying L'Hôpital's Rule (∞/∞ form): d/dn(log n) / d/dn(n) = (1/(n ln 2)) / 1 = 1/(n ln 2) → 0 as n→∞. Since the limit = 0, log n ∈ o(n). ✓ (log n grows strictly slower than n)",
      },
      {
        q: "Show that n² ∈ ω(n log n).",
        a: "Need: lim(n→∞) n² / (n log n) = lim n / log n = ∞. Applying L'Hôpital: d/dn(n) / d/dn(log n) = 1 / (1/(n ln 2)) = n ln 2 → ∞ as n→∞. Since limit = ∞, n² ∈ ω(n log n). ✓ (n² grows strictly faster than n log n)",
      },
      {
        q: "Is n ∈ o(2n)? Is n ∈ ω(2n)?",
        a: "lim(n→∞) n / (2n) = lim 1/2 = 1/2 (a finite nonzero constant). Since the limit is neither 0 nor ∞, n ∉ o(2n) and n ∉ ω(2n). Instead, n ∈ Θ(2n) — they are in the same growth class. This illustrates that o() and ω() exclude functions of the same growth rate (constant multiples of each other).",
      },
    ],
  },

  "limit-method": {
    title: "Limit Method for Comparing Growth Rates",
    emoji: "🧮",
    tldr: "Compute lim(n→∞) t(n)/g(n). If 0 → o(); if constant c → Θ(); if ∞ → ω(). Tools: L'Hôpital's Rule, Stirling's Formula.",
    explanation: `The limit method provides a convenient way to determine the asymptotic relationship between two functions without finding explicit constants c, n₀.

METHOD: Compute lim(n→∞) t(n)/g(n) and interpret:

  0: t grows strictly SLOWER than g → t(n) ∈ o(g(n)) AND O(g(n))
  c (finite nonzero): t grows at SAME RATE as g → t(n) ∈ Θ(g(n))
  ∞: t grows strictly FASTER than g → t(n) ∈ ω(g(n)) AND Ω(g(n))

TOOLS:
1. L'HÔPITAL'S RULE: When limit is 0/0 or ∞/∞ form, differentiate numerator and denominator:
   lim t(n)/g(n) = lim t'(n)/g'(n)
   Apply repeatedly until the limit is determinable.

2. STIRLING'S FORMULA: For large n:
   n! ≈ √(2πn) × (n/e)ⁿ
   Used to handle n! in limit comparisons.

EXAMPLE 1: t(n) = 5n³+6n+2, g(n) = n⁴
  lim (5n³+6n+2)/n⁴ = lim (5/n + 6/n³ + 2/n⁴) = 0
  → t(n) ∈ o(n⁴) and O(n⁴)

EXAMPLE 2: t(n) = 5n²+4n+2, find Θ class
  Try g(n) = n²: lim (5n²+4n+2)/n² = lim (5 + 4/n + 2/n²) = 5
  Limit = 5 (finite, nonzero) → t(n) ∈ Θ(n²)`,
    keyPoints: [
      "lim t(n)/g(n) = 0 → t(n) ∈ o(g(n)) and O(g(n))",
      "lim t(n)/g(n) = c ≠ 0, ∞ → t(n) ∈ Θ(g(n))",
      "lim t(n)/g(n) = ∞ → t(n) ∈ ω(g(n)) and Ω(g(n))",
      "L'Hôpital's rule: differentiate when limit is 0/0 or ∞/∞",
      "Stirling's Formula: n! ≈ √(2πn) × (n/e)ⁿ",
      "All log_a(n) ∈ Θ(log n); all degree-k polynomials ∈ Θ(nᵏ); aⁿ ≠ Θ(bⁿ) for a≠b",
    ],
    formula: {
      code: `Limit Rule:
  lim(n→∞) t(n)/g(n) = │ 0 → t ∈ o(g) ∩ O(g)
                         │ c → t ∈ Θ(g)
                         │ ∞ → t ∈ ω(g) ∩ Ω(g)

L'Hôpital's Rule: lim t(n)/g(n) = lim t'(n)/g'(n)  [when 0/0 or ∞/∞]

Example: Compare log n vs √n
  lim log₂n / √n  [∞/∞ form → apply L'Hôpital]
  = lim (1/n·ln2) / (1/2√n)
  = lim 2√n / (n·ln2) = lim 2/(√n·ln2) = 0
  → log n ∈ o(√n) → log n grows SLOWER than √n

Stirling's Formula:
  n! ≈ √(2πn) × (n/e)ⁿ   for large n
  Use: lim n!/aⁿ or comparing n! with other functions

Important facts:
  All log_a(n) ∈ Θ(log n)          (same class, different base = constant factor)
  a_k·nᵏ + lower terms ∈ Θ(nᵏ)    (dominant term determines class)
  3ⁿ ∉ Θ(2ⁿ): lim 3ⁿ/2ⁿ = lim (3/2)ⁿ = ∞  (different exponential bases ≠ same class)`,
      explanation: "The limit method avoids finding explicit constants — much faster in practice.",
    },
    examTips: [
      "Limit = 0 → t grows slower (O). Limit = constant → same class (Θ). Limit = ∞ → t grows faster (Ω).",
      "L'Hôpital: use when you see ∞/∞ or 0/0 forms (log/polynomial, exponential/polynomial)",
      "3ⁿ ≠ Θ(2ⁿ) because lim 3ⁿ/2ⁿ = ∞ — different exponential bases are different classes",
      "Dominant term trick: 5n²+4n+2 → try g=n², limit=5 → Θ(n²)",
    ],
    questions: [
      {
        q: "Use the limit method to determine the relationship between t(n) = n log n and g(n) = n².",
        a: "lim (n log n)/n² = lim (log n)/n. This is ∞/∞ form → apply L'Hôpital: = lim (1/n·ln2) / 1 = lim 1/(n·ln2) = 0. Limit = 0, so n log n ∈ o(n²). n log n grows strictly slower than n².",
      },
      {
        q: "Use the limit method to compare 2ⁿ and n¹⁰⁰.",
        a: "lim 2ⁿ/n¹⁰⁰. Apply L'Hôpital 100 times (differentiating the denominator 100 times reduces n¹⁰⁰ to a constant 100!, while numerator becomes 2ⁿ·(ln 2)¹⁰⁰). So limit = lim 2ⁿ·(ln 2)¹⁰⁰ / 100! = ∞. Therefore 2ⁿ ∈ ω(n¹⁰⁰): any exponential grows faster than any polynomial, no matter how large the exponent.",
      },
      {
        q: "Use Stirling's formula to show that n! ∈ ω(2ⁿ).",
        a: "lim n!/2ⁿ. Using Stirling: n! ≈ √(2πn)·(n/e)ⁿ. So lim √(2πn)·(n/e)ⁿ / 2ⁿ = lim √(2πn)·(n/(2e))ⁿ. Since n/(2e) > 1 for n > 2e ≈ 5.4, the term (n/(2e))ⁿ → ∞ faster than any polynomial. So the limit = ∞, and n! ∈ ω(2ⁿ). Factorial grows strictly faster than exponential.",
      },
    ],
  },

  "addition-theorem": {
    title: "Addition Theorem for Asymptotic Notations",
    emoji: "➕",
    tldr: "If t₁ ∈ O(g₁) and t₂ ∈ O(g₂), then t₁+t₂ ∈ O(max{g₁,g₂}). The DOMINANT part determines overall efficiency.",
    explanation: `When an algorithm consists of sequential parts, we need to know the overall complexity. The Addition Theorem gives us the answer.

ADDITION THEOREM (for O notation):
If t₁(n) ∈ O(g₁(n)) and t₂(n) ∈ O(g₂(n)), then:
  t₁(n) + t₂(n) ∈ O(max{g₁(n), g₂(n)})

The same theorem holds for Ω and Θ.

PROOF SKETCH: Since t₁ ≤ c₁·g₁ and t₂ ≤ c₂·g₂, then:
  t₁+t₂ ≤ c₁·g₁ + c₂·g₂ ≤ (c₁+c₂)·max{g₁,g₂} + (c₁+c₂)·max{g₁,g₂} ≤ 2(c₁+c₂)·max{g₁,g₂}
So t₁+t₂ ∈ O(max{g₁,g₂}) with c=2(c₁+c₂).

PRACTICAL IMPLICATION: "The overall efficiency of a sequential algorithm is determined by its LEAST EFFICIENT (dominant) part."

EXAMPLE: An algorithm has a part that runs in O(n²) and another in O(n). Overall: O(max{n², n}) = O(n²). The linear part is "absorbed" by the quadratic part.`,
    keyPoints: [
      "Addition Theorem: t₁∈O(g₁) and t₂∈O(g₂) → t₁+t₂ ∈ O(max{g₁,g₂})",
      "Same holds for Ω and Θ",
      "Overall efficiency = efficiency of the DOMINANT (least efficient) part",
      "Linear part absorbed by quadratic: O(n²+n) = O(n²)",
      "Applies to sequential parts of an algorithm",
    ],
    formula: {
      code: `Addition Theorem:
  If t₁(n) ∈ O(g₁(n)) and t₂(n) ∈ O(g₂(n)), then:
  t₁(n) + t₂(n) ∈ O(max{g₁(n), g₂(n)})
  (Same for Ω and Θ)

Examples:
  O(n²) + O(n)     = O(max{n², n})     = O(n²)
  O(n log n) + O(n) = O(max{n log n, n}) = O(n log n)
  O(n³) + O(2ⁿ)   = O(max{n³, 2ⁿ})   = O(2ⁿ)    [since 2ⁿ dominates n³]

Implication for algorithm analysis:
  Algorithm with phases: Phase1=O(n²), Phase2=O(n), Phase3=O(n log n)
  Overall = O(max{n², n, n log n}) = O(n²)
  Only the slowest phase matters asymptotically!`,
      explanation: "The slowest phase dominates — optimizing faster phases doesn't improve overall asymptotic complexity.",
    },
    examTips: [
      "Addition theorem: overall = O(max of individual parts)",
      "Implication: only the WORST part matters for overall complexity",
      "O(n³) + O(n!) = O(n!) — factorial dominates everything polynomial",
      "To improve algorithm: optimize the DOMINANT (slowest) part",
    ],
    questions: [
      {
        q: "An algorithm sorts an array in O(n²), then performs binary search O(log n) times in a loop. What is the overall complexity?",
        a: "The overall complexity is O(max{n², log n}) = O(n²). The sorting phase dominates. Even though binary search is very efficient, it cannot improve the quadratic sorting step. By the Addition Theorem, only the largest term matters.",
      },
      {
        q: "Prove the Addition Theorem: if t₁ ∈ O(g₁) and t₂ ∈ O(g₂), then t₁+t₂ ∈ O(max{g₁,g₂}).",
        a: "By definition: ∃ c₁, n₁ such that t₁(n) ≤ c₁·g₁(n) for n≥n₁; and ∃ c₂, n₂ such that t₂(n) ≤ c₂·g₂(n) for n≥n₂. For n ≥ max{n₁,n₂}: t₁+t₂ ≤ c₁g₁ + c₂g₂ ≤ c₁·max{g₁,g₂} + c₂·max{g₁,g₂} = (c₁+c₂)·max{g₁,g₂}. Setting c = c₁+c₂ and n₀ = max{n₁,n₂}, we have t₁+t₂ ≤ c·max{g₁,g₂} for all n≥n₀. ∴ t₁+t₂ ∈ O(max{g₁,g₂}). ✓",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // NON-RECURSIVE ANALYSIS
  // ─────────────────────────────────────────────

  "nonrecursive-steps": {
    title: "Steps for Analyzing Non-Recursive Algorithms",
    emoji: "📋",
    tldr: "5 steps: (1) Input size n, (2) Basic operation, (3) Check best/worst/avg, (4) Set up summation C(n), (5) Simplify using formulas.",
    explanation: `To systematically analyze any non-recursive algorithm, follow these 5 steps.

STEP 1 — DECIDE INPUT SIZE n: Identify what quantity determines the problem size. Usually the number of elements n, or matrix dimension n.

STEP 2 — IDENTIFY THE BASIC OPERATION: Find the operation that executes most — typically the comparison or arithmetic in the innermost loop.

STEP 3 — CHECK DEPENDENCY ON INPUT TYPE: Does C(n) depend only on the size n, or also on the specific values in the input? If the latter, you'll need separate best/worst/average case analyses.

STEP 4 — SET UP THE SUMMATION C(n): Write a sum that counts how many times the basic operation executes. Use loop bounds to determine summation limits.

STEP 5 — SIMPLIFY USING STANDARD FORMULAS: Use standard summation identities to get a closed form.

KEY SUMMATION FORMULAS:
  Σᵢ₌ₗᵘ 1 = u - l + 1
  Σᵢ₌₁ⁿ i = n(n+1)/2
  Σᵢ₌₁ⁿ i² = n(n+1)(2n+1)/6
  Σᵢ₌₀ⁿ aⁱ = (aⁿ⁺¹ − 1)/(a-1) for a ≠ 1`,
    keyPoints: [
      "Step 1: Identify input size parameter n",
      "Step 2: Identify the basic operation (innermost loop operation)",
      "Step 3: Check if count varies by input type → best/worst/avg",
      "Step 4: Set up summation expression for C(n)",
      "Step 5: Simplify using standard formulas",
      "Key formula: Σᵢ₌₁ⁿ i = n(n+1)/2",
      "Key formula: Σᵢ₌ₗᵘ 1 = u - l + 1",
    ],
    formula: {
      code: `Standard Summation Formulas:
  Σᵢ₌ₗᵘ 1     = u - l + 1           (count of integers from l to u)
  Σᵢ₌₁ⁿ i     = n(n+1)/2            (sum of first n integers)
  Σᵢ₌₁ⁿ i²    = n(n+1)(2n+1)/6      (sum of squares)
  Σᵢ₌₀ⁿ aⁱ    = (aⁿ⁺¹ − 1)/(a-1)   (geometric series, a≠1)
  Σᵢ₌₀ⁿ⁻¹ i   = n(n-1)/2            (0 to n-1)

Key: Σᵢ₌₀ⁿ⁻² (n-1-i) = (n-1)n/2 ≈ n²/2  ← appears in O(n²) sorting algorithms`,
      explanation: "These formulas are used constantly in algorithm analysis — memorise the first two especially.",
    },
    examTips: [
      "Σᵢ₌₁ⁿ i = n(n+1)/2 — used for O(n²) algorithms",
      "Σᵢ₌ₗᵘ 1 = u-l+1 — used for fixed-iteration loops",
      "Geometric series formula used for recursive algorithms with halving",
      "5 steps: n → basic op → dependency → summation → simplify",
    ],
    questions: [
      {
        q: "Apply the 5-step analysis framework to this pseudocode: for i←0 to n-1 do for j←0 to i do sum ← sum + A[i]*A[j].",
        a: "Step 1: n = size of array. Step 2: Basic operation = multiplication A[i]*A[j] (innermost loop). Step 3: Count is fixed regardless of array values → no best/worst distinction. Step 4: C(n) = Σᵢ₌₀ⁿ⁻¹ Σⱼ₌₀ⁱ 1 = Σᵢ₌₀ⁿ⁻¹ (i+1) = 1+2+...+n = n(n+1)/2. Step 5: C(n) = n(n+1)/2 ∈ Θ(n²).",
      },
      {
        q: "Evaluate Σᵢ₌₁¹⁰⁰ i² using the standard formula.",
        a: "Σᵢ₌₁ⁿ i² = n(n+1)(2n+1)/6. For n=100: 100 × 101 × 201 / 6 = 100 × 101 × 201 / 6. 100 × 101 = 10100. 10100 × 201 = 2,030,100. 2,030,100 / 6 = 338,350.",
      },
    ],
  },

  "max-element": {
    title: "Analysis: Max Element Algorithm",
    emoji: "🏆",
    tldr: "Find maximum in array of n elements. Basic op = comparison. C(n) = n-1 ∈ Θ(n). Same for all inputs — no best/worst distinction.",
    explanation: `The Max Element algorithm scans an array once, maintaining the current maximum. It's the simplest example of non-recursive analysis.

ALGORITHM: Initialize maxval = A[0]. Loop from i=1 to n-1, comparing A[i] > maxval, updating if necessary.

ANALYSIS:
Input size: n (number of elements in the array)
Basic operation: comparison A[i] > maxval (in the loop body)

Is there a best/worst case? NO — the loop always runs from 1 to n-1, making exactly n-1 comparisons regardless of the input values. The if-condition is executed n-1 times regardless of whether it's true or false.

C(n) = Σᵢ₌₁ⁿ⁻¹ 1 = n - 1

Since n-1 ∈ Θ(n), the algorithm is Θ(n) — linear time. This is optimal: you MUST examine every element at least once to guarantee you've found the maximum.`,
    keyPoints: [
      "Input size: n elements",
      "Basic operation: comparison A[i] > maxval",
      "C(n) = n - 1 (loop runs from 1 to n-1 exactly)",
      "No best/worst case — always n-1 comparisons",
      "C(n) ∈ Θ(n) — linear time",
      "Optimal: must examine all n elements",
    ],
    formula: {
      code: `ALGORITHM MaxElement(A[0..n-1])
// Input: Array A[0..n-1] of real numbers
// Output: Value of the largest element
maxval ← A[0]
for i ← 1 to n-1 do
    if A[i] > maxval      ← BASIC OPERATION
        maxval ← A[i]
return maxval

Analysis:
  C(n) = Σᵢ₌₁ⁿ⁻¹ 1
       = n - 1
       ∈ Θ(n)

No best/worst case distinction: loop always runs n-1 times.`,
      explanation: "The simplest non-recursive analysis: one loop, one basic op, fixed count = n-1.",
    },
    examTips: [
      "C(n) = n-1 for MaxElement — NOT n",
      "No best/worst/avg distinction — same for all inputs",
      "Θ(n) — linear time — optimal for unsorted array",
    ],
    questions: [
      {
        q: "Analyze the MaxElement algorithm. How many comparisons does it make for n=7?",
        a: "C(n) = n-1 comparisons. For n=7, C(7) = 6 comparisons. The algorithm initializes maxval = A[0], then compares each of A[1], A[2], A[3], A[4], A[5], A[6] against maxval — exactly 6 comparisons. This is fixed regardless of the array's content.",
      },
      {
        q: "Is the MaxElement algorithm optimal? Justify using a lower bound argument.",
        a: "Yes. Lower bound argument: to guarantee finding the maximum in an unsorted array, every element must be examined at least once. If any element is not compared, it could be the maximum and we'd miss it. Therefore any correct max-finding algorithm requires at least n-1 comparisons (one element can be the 'undefeated champion' after n-1 comparisons). MaxElement makes exactly n-1 comparisons, matching this lower bound. ∴ It is optimal.",
      },
    ],
  },

  "unique-elements": {
    title: "Analysis: Element Uniqueness",
    emoji: "🔍",
    tldr: "Check if all elements in array are distinct. Worst case: Θ(n²). Best case: 1 comparison (first two elements equal).",
    explanation: `The Element Uniqueness problem asks: are all n elements in the array distinct?

ALGORITHM: Compare every pair (A[i], A[j]) for i < j. If any pair is equal, return false immediately. If all pairs checked without finding a match, return true.

ANALYSIS:
Input size: n
Basic operation: comparison A[i] = A[j]

BEST CASE: The very first pair checked (A[0], A[1]) is equal → return false immediately.
  C_best(n) = 1

WORST CASE: All elements are distinct (or duplicates are only at the last pair checked).
  Every pair is checked: the double loop completes fully.
  C_worst(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1 = Σᵢ₌₀ⁿ⁻² (n-1-i) = (n-1)n/2 ≈ n²/2 ∈ Θ(n²)

Why does Σᵢ₌₀ⁿ⁻² (n-1-i) = n(n-1)/2?
  When i=0: n-1 terms. When i=1: n-2 terms. ... When i=n-2: 1 term.
  Sum = (n-1) + (n-2) + ... + 1 = n(n-1)/2.`,
    keyPoints: [
      "Input size: n",
      "Basic op: comparison A[i] = A[j]",
      "Best case: 1 (first two elements equal → immediate return)",
      "Worst case: n(n-1)/2 ≈ n²/2 ∈ Θ(n²) (all unique)",
      "Worst case: two nested loops — outer 0 to n-2, inner i+1 to n-1",
    ],
    formula: {
      code: `ALGORITHM UniqueElements(A[0..n-1])
for i ← 0 to n-2 do
    for j ← i+1 to n-1 do
        if A[i] = A[j]      ← BASIC OPERATION
            return false
return true

Worst case analysis:
  C_worst(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1
             = Σᵢ₌₀ⁿ⁻² (n-1-i)
             = (n-1) + (n-2) + ... + 1
             = n(n-1)/2
             ≈ n²/2  ∈ Θ(n²)

Best case: C_best(n) = 1  (A[0] = A[1])`,
      explanation: "The inner summation Σᵢ₌₀ⁿ⁻² (n-1-i) is the classic triangular sum = n(n-1)/2.",
    },
    examTips: [
      "Worst case: n(n-1)/2 ∈ Θ(n²)",
      "Triangular sum: (n-1)+(n-2)+...+1 = n(n-1)/2",
      "Best case = 1 (not n or n²)",
      "Double loop with inner starting at i+1 always gives triangular sum",
    ],
    questions: [
      {
        q: "For UniqueElements with n=5, what is the worst-case comparison count? Trace the outer loop iterations.",
        a: "Worst case: n(n-1)/2 = 5×4/2 = 10 comparisons. Outer i=0: inner j runs 1,2,3,4 → 4 comparisons. Outer i=1: inner j runs 2,3,4 → 3 comparisons. Outer i=2: inner j runs 3,4 → 2 comparisons. Outer i=3: inner j runs 4 → 1 comparison. Total: 4+3+2+1 = 10 comparisons = n(n-1)/2 = 10. ✓",
      },
      {
        q: "Derive the worst-case count C_worst(n) = n(n-1)/2 for UniqueElements using summation formulas.",
        a: "C_worst(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1. Inner sum: Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1 = (n-1) - (i+1) + 1 = n-1-i. Outer sum: Σᵢ₌₀ⁿ⁻² (n-1-i). Let k = n-1-i; as i goes 0 to n-2, k goes n-1 down to 1. So = Σₖ₌₁ⁿ⁻¹ k = (n-1)n/2. ∴ C_worst(n) = n(n-1)/2 ∈ Θ(n²). ✓",
      },
    ],
  },

  "matrix-mult": {
    title: "Analysis: Matrix Multiplication",
    emoji: "🔢",
    tldr: "Multiply two n×n matrices. Basic op = multiplication. M(n) = n³ ∈ Θ(n³). Three nested loops each from 0 to n-1.",
    explanation: `Classic matrix multiplication computes C = A × B where A, B are n×n matrices.
C[i][j] = Σₖ₌₀ⁿ⁻¹ A[i][k] × B[k][j]

ALGORITHM: Three nested loops (over i, j, k), each from 0 to n-1.

ANALYSIS:
Input size: n (matrix dimension)
Basic operation: multiplication A[i][k] * B[k][j] (innermost loop)
(Each multiplication is paired with an addition, but multiplication typically dominates.)

Count of multiplications:
  M(n) = Σᵢ₌₀ⁿ⁻¹ Σⱼ₌₀ⁿ⁻¹ Σₖ₌₀ⁿ⁻¹ 1 = n × n × n = n³

This is a fixed count regardless of input values → no best/worst distinction.

M(n) = n³ ∈ Θ(n³) — cubic time.

NOTE: Better algorithms exist (Strassen's O(n^2.81), recent O(n^2.37...)), but the standard algorithm is Θ(n³).`,
    keyPoints: [
      "Input size: n (dimension of n×n matrices)",
      "Basic operation: multiplication A[i][k] * B[k][j]",
      "Three nested loops, each 0 to n-1: M(n) = n³",
      "M(n) ∈ Θ(n³) — cubic time",
      "No best/worst distinction — count is fixed for all n×n inputs",
      "Strassen's algorithm: O(n^log₂7) ≈ O(n^2.807) — better asymptotically",
    ],
    formula: {
      code: `ALGORITHM MatrixMultiplication(A[0..n-1, 0..n-1], B[0..n-1, 0..n-1])
for i ← 0 to n-1 do
    for j ← 0 to n-1 do
        C[i,j] ← 0.0
        for k ← 0 to n-1 do
            C[i,j] ← C[i,j] + A[i,k] * B[k,j]   ← BASIC OP
return C

Analysis:
  M(n) = Σᵢ₌₀ⁿ⁻¹ Σⱼ₌₀ⁿ⁻¹ Σₖ₌₀ⁿ⁻¹ 1
       = Σᵢ₌₀ⁿ⁻¹ Σⱼ₌₀ⁿ⁻¹ n
       = Σᵢ₌₀ⁿ⁻¹ n²
       = n³  ∈ Θ(n³)`,
      explanation: "Three loops each contributing factor n gives n×n×n = n³ operations.",
    },
    examTips: [
      "M(n) = n³ for standard matrix multiplication ∈ Θ(n³)",
      "Three nested loops each 0 to n-1 → count = n³",
      "No best/worst case — always exactly n³ multiplications",
      "Strassen's: O(n^2.807) — mention only if asked about improvements",
    ],
    questions: [
      {
        q: "Analyze the standard matrix multiplication algorithm. Identify the basic operation and derive the exact count.",
        a: "Input size: n (matrix dimension). Basic operation: multiplication A[i][k]*B[k][j] in the innermost loop. The three loops each run n times (i: 0 to n-1, j: 0 to n-1, k: 0 to n-1). Count: M(n) = Σᵢ₌₀ⁿ⁻¹ Σⱼ₌₀ⁿ⁻¹ Σₖ₌₀ⁿ⁻¹ 1 = n·n·n = n³ ∈ Θ(n³). There is also an equal number of additions n³, but multiplication is chosen as the basic operation since it dominates floating-point cost.",
      },
      {
        q: "How many multiplications does Strassen's algorithm use compared to standard matrix multiplication for n=1024?",
        a: "Standard: n³ = 1024³ ≈ 1.07 × 10⁹ multiplications. Strassen's: O(n^log₂7) = O(n^2.807). For n=1024=2¹⁰: n^2.807 = (2¹⁰)^2.807 = 2^28.07 ≈ 3.6 × 10⁸ multiplications. Ratio: 10⁹/3.6×10⁸ ≈ 2.97×. Strassen's is about 3× fewer multiplications for n=1024, and the gap grows with n.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // RECURSIVE ANALYSIS
  // ─────────────────────────────────────────────

  "recursive-steps": {
    title: "Steps for Analyzing Recursive Algorithms",
    emoji: "🔄",
    tldr: "5 steps: (1) Input size n, (2) Basic operation, (3) Check input type dependency, (4) Set up RECURRENCE RELATION, (5) Solve the recurrence.",
    explanation: `Recursive algorithms can't be analyzed with simple summations — they require recurrence relations.

STEP 1 — DECIDE INPUT SIZE n: Same as non-recursive.

STEP 2 — IDENTIFY THE BASIC OPERATION: Find the operation in the base case and recursive case.

STEP 3 — CHECK INPUT TYPE DEPENDENCY: Does the number of recursive calls or the work per call depend on input values?

STEP 4 — SET UP RECURRENCE RELATION WITH INITIAL CONDITION:
Express C(n) in terms of C(smaller input) + work done at this level.
Don't forget the BASE CASE C(base) = 0 (or 1, depending on the algorithm).

STEP 5 — SOLVE THE RECURRENCE:
Use backward substitution (unrolling method):
  Expand C(n) → C(n-1) → C(n-2) → ... → base case.

TWO MAIN RECURRENCE TYPES:
  Decrease-by-one: C(n) = C(n-1) + f(n)   [linear recursion]
  Decrease-by-half: C(n) = C(n/2) + f(n)  [divide and conquer]`,
    keyPoints: [
      "Step 4 is different from non-recursive: set up RECURRENCE RELATION",
      "Recurrence = C(n) in terms of C(smaller) + work at this level",
      "Must specify BASE CASE (initial condition)",
      "Decrease-by-one: C(n) = C(n-1) + f(n)",
      "Decrease-by-half: C(n) = C(n/2) + f(n)",
      "Solve using backward substitution",
    ],
    formula: {
      code: `Two main recurrence types:

1. Decrease-by-one: C(n) = C(n-1) + f(n)
   Example: Factorial, Sequential search
   Solution technique: unroll n times to reach base case C(0) or C(1)

2. Decrease-by-factor-b: C(n) = a·C(n/b) + f(n)
   Example: Binary search (a=1, b=2), Merge sort (a=2, b=2)
   Technique: substitute n = 2^k to convert to a simple recursion in k

Base case examples:
  C(0) = 0  (no operations on empty input)
  C(1) = 0  (no operation on single element)
  C(1) = 1  (one operation on single element)`,
      explanation: "The base case is critical — get it wrong and the closed form will be off by a constant.",
    },
    examTips: [
      "Always write down both: (1) the recurrence C(n) = ... and (2) the base case C(0)=...",
      "Decrease-by-one: unroll n steps. Decrease-by-half: substitute n=2ᵏ.",
      "For divide-and-conquer: often result in Θ(log n) or Θ(n log n)",
      "Don't forget the base case — it's what stops the unrolling",
    ],
    questions: [
      {
        q: "Write the recurrence relation for computing the sum of array elements recursively: Sum(A[0..n-1]) = A[n-1] + Sum(A[0..n-2]).",
        a: "Let C(n) = number of additions. At each call: one addition (adding A[n-1]) plus C(n-1) additions from the recursive call. Base case: C(0) = 0 (empty array, no addition needed). Recurrence: C(n) = C(n-1) + 1, C(0) = 0. Solving by backward substitution: C(n) = C(n-1)+1 = C(n-2)+2 = ... = C(0)+n = n. So C(n) = n ∈ Θ(n).",
      },
      {
        q: "What is backward substitution and how does it work for decrease-by-one recurrences?",
        a: "Backward substitution is a method for solving recurrences by iteratively replacing the recursive call with its own definition. For T(n) = T(n-1) + f(n): Step 1: T(n) = T(n-1) + f(n). Step 2: Replace T(n-1) = T(n-2) + f(n-1) → T(n) = T(n-2) + f(n-1) + f(n). Step 3: After k substitutions: T(n) = T(n-k) + Σᵢ₌₁ᵏ f(n-i+1). Step 4: Set k=n to reach base case T(0): T(n) = T(0) + Σᵢ₌₁ⁿ f(i). Then simplify the sum using standard formulas.",
      },
    ],
  },

  "factorial-recurrence": {
    title: "Recursive Analysis: Factorial",
    emoji: "❗",
    tldr: "F(n) = F(n-1) × n. Recurrence: M(n) = M(n-1)+1, M(0)=0. Solution: M(n) = n ∈ Θ(n).",
    explanation: `The recursive factorial algorithm is the classic simplest recursive analysis.

ALGORITHM: F(n) = 1 if n=0, else F(n-1) × n.

ANALYSIS:
Input size: n
Basic operation: multiplication (the * in return F(n-1) * n)
Base case: F(0) returns 1 — zero multiplications, so M(0) = 0.

RECURRENCE:
M(n) = M(n-1) + 1,   M(0) = 0
(The multiplication in the current call, plus the count from the recursive call.)

SOLVING by backward substitution:
  M(n) = M(n-1) + 1
       = [M(n-2) + 1] + 1 = M(n-2) + 2
       = [M(n-3) + 1] + 2 = M(n-3) + 3
       ...
       = M(0) + n = 0 + n = n

Therefore M(n) = n ∈ Θ(n).

This makes sense: computing n! requires exactly n multiplications (n×(n-1)×...×1).`,
    keyPoints: [
      "F(n) = F(n-1) × n, base case F(0) = 1",
      "Basic operation: multiplication",
      "Recurrence: M(n) = M(n-1) + 1, M(0) = 0",
      "Solved by unrolling: M(n) = M(0) + n = n",
      "M(n) = n ∈ Θ(n) — linear in n",
    ],
    formula: {
      code: `ALGORITHM F(n)
// Computes n! recursively
if n = 0 return 1
else return F(n-1) * n       ← BASIC OP: one multiplication

Recurrence: M(n) = M(n-1) + 1,  M(0) = 0

Backward substitution:
  M(n) = M(n-1) + 1
       = M(n-2) + 2
       = M(n-3) + 3
       ...
       = M(n-k) + k
  Set n-k = 0 → k = n:
       = M(0) + n = 0 + n = n

∴ M(n) = n  ∈ Θ(n)`,
      explanation: "The pattern M(n-k) + k appears after k substitutions. Set k=n to reach the base case M(0).",
    },
    examTips: [
      "Recurrence: M(n) = M(n-1) + 1, M(0) = 0",
      "Solution: M(n) = n",
      "Pattern in unrolling: M(n-k) + k → set k=n → M(0) + n = n",
      "Θ(n) — this is the MINIMUM — you must do n multiplications to compute n!",
    ],
    questions: [
      {
        q: "Write and solve the recurrence for recursive factorial. Verify for n=4.",
        a: "Recurrence: M(n) = M(n-1)+1, M(0)=0. Solution: M(n) = n. Verification for n=4: M(4) = M(3)+1 = M(2)+2 = M(1)+3 = M(0)+4 = 0+4 = 4. Manually: 4! = 4×(3×(2×(1×1))) — exactly 4 multiplications (4×3, 3×2, 2×1, 1×1). Wait, actually F(0)=1 is base case with no multiplication. F(1)=F(0)×1 = 1 multiplication. F(2)=F(1)×2 = 2nd. F(3)=3rd. F(4)=4th. Total = 4 = M(4). ✓",
      },
      {
        q: "Suppose we modify factorial to count down: F(n) = F(n-1) + n (sum instead of product). Does the recurrence and solution change?",
        a: "The recurrence for the basic operation count (additions) is IDENTICAL: M(n) = M(n-1)+1, M(0)=0 → M(n) = n. The recurrence describes the number of operations, not the values computed. Whether we're multiplying or adding doesn't change that exactly one operation is performed per call. Solution M(n) = n ∈ Θ(n) is the same.",
      },
    ],
  },

  "bin-rec": {
    title: "Recursive Analysis: BinRec (Count Binary Digits)",
    emoji: "0️⃣1️⃣",
    tldr: "Count bits in n: BinRec(n) = BinRec(⌊n/2⌋) + 1. Recurrence: A(n) = A(n/2)+1. Substituting n=2ᵏ: A(n) = log₂n ∈ Θ(log n).",
    explanation: `BinRec counts the number of binary digits in a positive integer n by repeatedly halving it.

ALGORITHM: If n=1, return 1. Else return BinRec(⌊n/2⌋) + 1.
The idea: ⌊n/2⌋ in binary is n with the last bit dropped, so it has one fewer digit.

ANALYSIS:
Input size: n (the number itself)
Basic operation: addition (+1 in return BinRec(⌊n/2⌋) + 1)
Base case: A(1) = 0 (the if n=1 branch returns 1 without any addition, so 0 additions)

RECURRENCE: A(n) = A(⌊n/2⌋) + 1,   A(1) = 0

SOLVING by substitution with n = 2ᵏ:
  A(2ᵏ) = A(2ᵏ⁻¹) + 1
          = A(2ᵏ⁻²) + 2
          = ...
          = A(2⁰) + k = A(1) + k = 0 + k = k

Since k = log₂n: A(n) = log₂n ∈ Θ(log n)

This makes perfect sense: a positive integer n has exactly ⌊log₂n⌋ + 1 binary digits.`,
    keyPoints: [
      "Count binary digits of n using BinRec(n) = BinRec(⌊n/2⌋) + 1",
      "Basic op: addition. Base case: A(1) = 0",
      "Recurrence: A(n) = A(n/2) + 1, A(1) = 0",
      "Solve by substituting n = 2ᵏ: unrolls to A(1) + k = k",
      "Since k = log₂n: A(n) = log₂n ∈ Θ(log n)",
    ],
    formula: {
      code: `ALGORITHM BinRec(n)
// Input: Positive decimal integer n
// Output: Number of binary digits in n
if n = 1 return 1
else return BinRec(⌊n/2⌋) + 1      ← BASIC OP: addition

Recurrence: A(n) = A(n/2) + 1,  A(1) = 0

Substitute n = 2ᵏ (so k = log₂n):
  A(2ᵏ) = A(2ᵏ⁻¹) + 1
         = A(2ᵏ⁻²) + 2
         = A(2ᵏ⁻³) + 3
         ...
         = A(2⁰) + k
         = A(1) + k
         = 0 + k = k = log₂n

∴ A(n) = log₂n  ∈ Θ(log n)`,
      explanation: "Substituting n=2ᵏ turns the recursive halving into a linear sequence, easily summed to k steps.",
    },
    examTips: [
      "Technique for halving recurrences: substitute n=2ᵏ",
      "A(n) = log₂n ∈ Θ(log n)",
      "Base case is A(1) = 0, not A(1) = 1",
      "Pattern: A(2ᵏ) = A(1) + k → A(n) = log₂n",
    ],
    questions: [
      {
        q: "Trace BinRec(16) and verify using the formula.",
        a: "BinRec(16) = BinRec(8)+1 = BinRec(4)+2 = BinRec(2)+3 = BinRec(1)+4 = 0+4 = 4. Formula check: A(16) = log₂16 = log₂2⁴ = 4. ✓ 16 in binary is 10000, which has 5 digits — but A(n) counts additions, not digits. The number of binary digits of 16 is ⌊log₂16⌋+1 = 4+1 = 5. A(n) = log₂n counts the number of recursive calls = number of halvings = number of bits minus 1.",
      },
      {
        q: "Solve the recurrence A(n) = A(n/2) + 1, A(1) = 1 (base case changed to 1).",
        a: "Substitute n=2ᵏ: A(2ᵏ) = A(2ᵏ⁻¹)+1. Unrolling: A(2ᵏ) = A(2⁰)+k = A(1)+k = 1+k. Since k=log₂n: A(n) = 1+log₂n ∈ Θ(log n). Same asymptotic class, just shifted by 1 due to the different base case. This is the Binary Search recurrence.",
      },
    ],
  },

  "tower-hanoi": {
    title: "Recursive Analysis: Tower of Hanoi",
    emoji: "🗼",
    tldr: "Move n disks: C(n) = 2C(n-1)+1, C(0)=0. Solution: C(n) = 2ⁿ−1 ∈ Θ(2ⁿ). Exponential — impractical for large n.",
    explanation: `The Tower of Hanoi puzzle requires moving n disks from a source peg to a destination peg, using an auxiliary peg, with only smaller disks placed on larger ones. It requires EXACTLY 2ⁿ − 1 moves.

ALGORITHM:
  If n = 0: do nothing.
  Else: (1) Move n-1 disks from Src to Aux (using Dst as auxiliary).
         (2) Move disk n from Src to Dst.
         (3) Move n-1 disks from Aux to Dst (using Src as auxiliary).

ANALYSIS:
Input size: n (number of disks)
Basic operation: moving a disk (one peg-to-peg transfer)
Base case: C(0) = 0 (no moves needed for 0 disks)

RECURRENCE: C(n) = 2C(n-1) + 1,   C(0) = 0
(Two recursive calls of size n-1, plus one move for disk n)

SOLVING by backward substitution:
  C(n) = 2C(n-1) + 1
       = 2[2C(n-2)+1] + 1 = 4C(n-2) + 3
       = 4[2C(n-3)+1] + 3 = 8C(n-3) + 7
       = 2ᵏC(n-k) + (2ᵏ - 1)
  Set k=n: C(n) = 2ⁿC(0) + (2ⁿ - 1) = 0 + 2ⁿ - 1 = 2ⁿ - 1

C(n) = 2ⁿ - 1 ∈ Θ(2ⁿ) — EXPONENTIAL growth.
For n=64 disks (the legend): 2⁶⁴ - 1 ≈ 1.8 × 10¹⁹ moves. At 1 move/second → 585 billion years!`,
    keyPoints: [
      "Recurrence: C(n) = 2C(n-1) + 1, C(0) = 0",
      "Solution: C(n) = 2ⁿ - 1",
      "C(n) ∈ Θ(2ⁿ) — exponential time",
      "Cannot be done in fewer than 2ⁿ-1 moves — this IS the minimum",
      "Two recursive calls of size n-1 → recurrence 2C(n-1)+1",
      "n=64: 2⁶⁴ - 1 ≈ 585 billion years at 1 move/second",
    ],
    formula: {
      code: `ALGORITHM TowerOfHanoi(n, Src, Aux, Dst)
if n = 0 return
TowerOfHanoi(n-1, Src, Dst, Aux)   ← recursion on n-1
Move disk n from Src to Dst         ← BASIC OP: 1 move
TowerOfHanoi(n-1, Aux, Src, Dst)   ← recursion on n-1

Recurrence: C(n) = 2C(n-1) + 1,  C(0) = 0

Backward substitution:
  C(n) = 2C(n-1) + 1
       = 2[2C(n-2) + 1] + 1 = 4C(n-2) + 3 = 4C(n-2) + (4-1)
       = 8C(n-3) + 7 = 8C(n-3) + (8-1)
  Pattern: C(n) = 2ᵏC(n-k) + (2ᵏ - 1)
  Set k = n: C(n) = 2ⁿ·C(0) + (2ⁿ-1) = 0 + 2ⁿ - 1

∴ C(n) = 2ⁿ - 1  ∈ Θ(2ⁿ)`,
      explanation: "Pattern 2ᵏC(n-k) + (2ᵏ-1) emerges after k substitutions. Setting k=n gives the closed form.",
    },
    examTips: [
      "Recurrence: C(n) = 2C(n-1)+1. Solution: C(n) = 2ⁿ-1.",
      "Θ(2ⁿ) — exponential, same as worst exhaustive search",
      "Pattern in expansion: coefficient doubles each step, constant = 2ᵏ - 1",
      "MCQ: 'Tower of Hanoi with 3 disks requires how many moves?' → 2³-1 = 7 moves",
    ],
    questions: [
      {
        q: "Solve the Tower of Hanoi recurrence C(n) = 2C(n-1) + 1, C(0) = 0.",
        a: "By backward substitution: C(n) = 2C(n-1)+1 = 4C(n-2)+3 = 8C(n-3)+7 = ... = 2ᵏC(n-k)+(2ᵏ-1). Setting k=n: C(n) = 2ⁿC(0) + (2ⁿ-1) = 0 + 2ⁿ-1 = 2ⁿ-1. So C(n) = 2ⁿ-1 ∈ Θ(2ⁿ).",
      },
      {
        q: "How many moves does Tower of Hanoi require for n=4 disks? Verify both by formula and by pattern.",
        a: "Formula: C(4) = 2⁴-1 = 16-1 = 15 moves. Pattern verification: C(1)=1, C(2)=3, C(3)=7, C(4)=15. Each step: C(n)=2C(n-1)+1. C(1)=2×0+1=1. C(2)=2×1+1=3. C(3)=2×3+1=7. C(4)=2×7+1=15. ✓",
      },
      {
        q: "Why is the Tower of Hanoi optimal — i.e., can it be done in fewer than 2ⁿ-1 moves?",
        a: "No. By induction: to move the largest disk (disk n) from Src to Dst, all n-1 smaller disks must first be on Aux (requiring at least 2ⁿ⁻¹-1 moves), then disk n moves (1 move), then all n-1 disks move from Aux to Dst (at least 2ⁿ⁻¹-1 more moves). Total minimum = (2ⁿ⁻¹-1) + 1 + (2ⁿ⁻¹-1) = 2ⁿ-1. The algorithm achieves exactly this minimum, so it is optimal.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // RECURRENCES
  // ─────────────────────────────────────────────

  "backward-substitution": {
    title: "Solving Recurrences: Backward Substitution",
    emoji: "↩️",
    tldr: "Unroll T(n) into T(n-1), T(n-2), ... until you see a pattern. Express in terms of T(base case), substitute, simplify.",
    explanation: `Backward substitution (also called iterative substitution or the method of back-substitution) is the standard method for solving recurrences.

METHOD:
1. Start with the recurrence T(n) = something in terms of T(n-1) or T(n/b).
2. Replace T(n-1) with its definition (T(n-2) + ...), expand.
3. Repeat — replace T(n-2) with T(n-3) + ..., expand.
4. After k steps, you see: T(n) = (some expression in k) + T(n-k) or T(n/bᵏ).
5. Identify the pattern for general k.
6. Choose k such that the argument of T reaches the base case (k=n for T(n-k)=T(0), or k=log_b(n) for T(n/bᵏ)=T(1)).
7. Substitute the base case value.
8. Simplify.

KEY INSIGHT: After each substitution, the pattern becomes clearer. Express T in terms of T(n-k), then find k from the base case condition.`,
    keyPoints: [
      "Unroll by repeatedly substituting the recurrence into itself",
      "After k steps: T(n) = pattern(k) + T(n-k) or T(n/bᵏ)",
      "For decrease-by-1: set k=n to reach base case T(0) or T(1)",
      "For decrease-by-b: set bᵏ=n → k=log_b(n) to reach base case",
      "Express the accumulated sum as a standard formula (geometric series, triangular sum)",
    ],
    formula: {
      code: `Template for decrease-by-one: T(n) = T(n-1) + f(n)
  T(n) = T(n-1) + f(n)
       = T(n-2) + f(n-1) + f(n)
       = T(n-3) + f(n-2) + f(n-1) + f(n)
       ...
       = T(0) + f(1) + f(2) + ... + f(n)
       = T(0) + Σᵢ₌₁ⁿ f(i)

Template for decrease-by-factor-b: T(n) = T(n/b) + f(n)
  Substitute n = bᵏ (k = log_b n):
  T(bᵏ) = T(bᵏ⁻¹) + f(bᵏ)
         = T(bᵏ⁻²) + f(bᵏ⁻¹) + f(bᵏ)
         ...
         = T(1) + Σᵢ₌₁ᵏ f(bⁱ)`,
      explanation: "The key step: after k substitutions, express T(n) = base_case + accumulated_sum.",
    },
    examTips: [
      "Always write 3-4 steps to identify the pattern before jumping to the general form",
      "Decrease-by-1: sum runs from 1 to n after reaching T(0)",
      "Decrease-by-half: substitute n=2ᵏ first, then unroll",
      "Check your answer: plug n=1,2,3 into both recurrence and solution",
    ],
    questions: [
      {
        q: "Solve T(n) = T(n-1) + n, T(0) = 0 using backward substitution.",
        a: "T(n) = T(n-1)+n = T(n-2)+(n-1)+n = T(n-3)+(n-2)+(n-1)+n = ... = T(0) + 1+2+...+n = 0 + n(n+1)/2. So T(n) = n(n+1)/2 ∈ Θ(n²). General pattern after k steps: T(n) = T(n-k) + Σᵢ₌ⁿ⁻ᵏ⁺¹ⁿ i. Setting k=n: T(n) = T(0) + Σᵢ₌₁ⁿ i = n(n+1)/2.",
      },
      {
        q: "Solve T(n) = T(n/3) + 1, T(1) = 0 using the substitution n = 3ᵏ.",
        a: "Substitute n=3ᵏ (k = log₃n): T(3ᵏ) = T(3ᵏ⁻¹)+1. Unrolling: T(3ᵏ) = T(3ᵏ⁻²)+2 = T(3ᵏ⁻³)+3 = ... = T(3⁰)+k = T(1)+k = 0+k = k. Since k=log₃n: T(n) = log₃n ∈ Θ(log n). (All logarithms are in the same Θ class regardless of base.)",
      },
    ],
  },

  "recurrence-examples": {
    title: "Recurrence Examples (All 4 Types)",
    emoji: "📝",
    tldr: "T(n)=T(n-1)+1 → O(n). T(n)=T(n-1)+2n-1 → O(n²). T(n)=T(n/2)+1 → O(log n). T(n)=2T(n/2)+cn → O(n log n).",
    explanation: `Four canonical recurrences with full solutions — these patterns recur throughout DAA.

EXAMPLE 1: T(n) = T(n-1) + 1, T(0) = 1
  Each call does 1 unit of work. Unrolling n times: T(n) = 1 + n → O(n)
  This is the factorial recurrence pattern.

EXAMPLE 2: T(n) = T(n-1) + 2n-1, T(0) = 0
  Each call does 2n-1 work. Unrolling and summing: T(n) = 1+3+5+...+(2n-1) = n² → O(n²)
  (Sum of first n odd numbers = n²)

EXAMPLE 3: T(n) = T(n/2) + 1, T(1) = 1
  Each call does 1 unit, then halves. Substituting n=2ᵏ:
  T(2ᵏ) = T(1) + k = 1 + log₂n → O(log n)
  This is the BinRec/Binary Search pattern.

EXAMPLE 4: T(n) = 2T(n/2) + cn, T(1) = c
  Two recursive calls of size n/2, each level does cn work. Classic merge sort:
  T(n) = cn·log₂n + n → O(n log n)`,
    keyPoints: [
      "T(n)=T(n-1)+1, T(0)=1 → T(n)=n+1 → O(n)",
      "T(n)=T(n-1)+(2n-1), T(0)=0 → T(n)=n² → O(n²)",
      "T(n)=T(n/2)+1, T(1)=1 → T(n)=1+log₂n → O(log n)",
      "T(n)=2T(n/2)+cn, T(1)=c → T(n)=cn·log₂n+n → O(n log n)",
    ],
    formula: {
      code: `Example 1: T(n) = T(n-1) + 1,  T(0) = 1
  T(n) = T(0) + n·1 = 1 + n  →  O(n)

Example 2: T(n) = T(n-1) + (2n-1),  T(0) = 0
  T(n) = Σᵢ₌₁ⁿ (2i-1) = 2·n(n+1)/2 - n = n² + n - n = n²  →  O(n²)

Example 3: T(n) = T(n/2) + 1,  T(1) = 1  [substitute n=2ᵏ]
  T(2ᵏ) = T(1) + k = 1 + k = 1 + log₂n  →  O(log n)

Example 4: T(n) = 2T(n/2) + cn,  T(1) = c  [substitute n=2ᵏ]
  T(2ᵏ) = 2T(2ᵏ⁻¹) + c·2ᵏ
         = 4T(2ᵏ⁻²) + 2c·2ᵏ
         = 2ʲT(2ᵏ⁻ʲ) + j·c·2ᵏ
  Set j=k: T(2ᵏ) = 2ᵏ·T(1) + k·c·2ᵏ = c·2ᵏ + k·c·2ᵏ = c·n + cn·log₂n
  →  O(n log n)`,
      explanation: "These four patterns are the most important recurrences in algorithm analysis.",
    },
    examTips: [
      "Memorise: T(n/2)+1 → O(log n). T(n/2)+n → O(n). 2T(n/2)+n → O(n log n).",
      "Sum of n odd numbers = n² (pattern 2: 1+3+5+...+(2n-1) = n²)",
      "Example 4 is Merge Sort's recurrence → O(n log n)",
      "For halving recurrences: always substitute n=2ᵏ first",
    ],
    questions: [
      {
        q: "Solve T(n) = 2T(n/2) + cn, T(1) = c. Show the answer is O(n log n).",
        a: "Substitute n = 2ᵏ (k = log₂n): T(2ᵏ) = 2T(2ᵏ⁻¹) + c·2ᵏ. Unrolling: = 4T(2ᵏ⁻²) + 2c·2ᵏ = 8T(2ᵏ⁻³) + 3c·2ᵏ = 2ʲT(2ᵏ⁻ʲ) + j·c·2ᵏ. Set j=k: = 2ᵏT(1) + k·c·2ᵏ = c·2ᵏ + ck·2ᵏ = cn + cn·log₂n = cn(1 + log₂n). So T(n) ∈ O(n log n).",
      },
      {
        q: "Identify which recurrence type matches each scenario: (a) Binary search, (b) Merge sort, (c) Iterating through an array once.",
        a: "(a) Binary search: T(n) = T(n/2) + 1 → Type 3 → O(log n). At each step, one comparison is done and the array is halved. (b) Merge sort: T(n) = 2T(n/2) + n → Type 4 → O(n log n). Array is split in two halves (2 recursive calls of size n/2) and merged in O(n) time. (c) Iterating through an array: not a recurrence — it's a simple loop with T(n) = n → O(n) (non-recursive analysis).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MASTER THEOREM (NEW TOPIC)
  // ─────────────────────────────────────────────

  "master-theorem": {
    title: "Master Theorem",
    emoji: "👑",
    tldr: "Solve T(n) = aT(n/b) + f(n) directly. Compare f(n) with n^(log_b a). Three cases: f dominates → Case 3; n^log_b_a dominates → Case 1; equal → Case 2.",
    explanation: `The Master Theorem provides a cookbook solution for divide-and-conquer recurrences of the form:
  T(n) = aT(n/b) + f(n),   where a ≥ 1, b > 1

Here: a = number of subproblems, b = factor by which problem shrinks, f(n) = cost of non-recursive work.

COMPARISON: Compute n^(log_b a) and compare with f(n).

CASE 1: f(n) ∈ O(n^(log_b a - ε)) for some ε > 0
  → f(n) grows SLOWER than n^(log_b a)
  → Solution: T(n) ∈ Θ(n^(log_b a))
  [Recursive work dominates]

CASE 2: f(n) ∈ Θ(n^(log_b a))
  → f(n) grows at the SAME RATE as n^(log_b a)
  → Solution: T(n) ∈ Θ(n^(log_b a) · log n)
  [Equal contributions — log factor added]

CASE 3: f(n) ∈ Ω(n^(log_b a + ε)) for some ε > 0, AND af(n/b) ≤ cf(n) for some c<1 (regularity condition)
  → f(n) grows FASTER than n^(log_b a)
  → Solution: T(n) ∈ Θ(f(n))
  [Non-recursive work dominates]

EXAMPLES:
  Binary search: T(n) = T(n/2) + 1. a=1,b=2 → n^log₂1 = n⁰ = 1. f(n)=1 ∈ Θ(1) → Case 2 → T(n) ∈ Θ(log n).
  Merge sort: T(n) = 2T(n/2) + n. a=2,b=2 → n^log₂2 = n. f(n)=n ∈ Θ(n) → Case 2 → T(n) ∈ Θ(n log n).
  Matrix mult: T(n) = 8T(n/2) + n². a=8,b=2 → n^log₂8 = n³. f(n)=n² ∈ O(n^(3-1)) → Case 1 → T(n) ∈ Θ(n³).`,
    keyPoints: [
      "Master Theorem: T(n)=aT(n/b)+f(n). Compare f(n) with n^(log_b a).",
      "Case 1: f grows slower → T(n) ∈ Θ(n^(log_b a)). Recursion dominates.",
      "Case 2: f grows same → T(n) ∈ Θ(n^(log_b a) · log n). Equal contributions.",
      "Case 3: f grows faster → T(n) ∈ Θ(f(n)). Non-recursive work dominates.",
      "Critical value: p = log_b a. Compare f(n) against nᵖ.",
      "Case 3 requires regularity condition: af(n/b) ≤ cf(n) for some c<1.",
    ],
    formula: {
      code: `Master Theorem: T(n) = aT(n/b) + f(n)
  where a≥1, b>1. Let p = log_b(a).

  Case 1: f(n) ∈ O(nᵖ⁻ᵉ) for ε>0  →  T(n) ∈ Θ(nᵖ)
  Case 2: f(n) ∈ Θ(nᵖ)              →  T(n) ∈ Θ(nᵖ log n)
  Case 3: f(n) ∈ Ω(nᵖ⁺ᵉ) for ε>0  →  T(n) ∈ Θ(f(n))
          [AND regularity: af(n/b) ≤ cf(n)]

Common applications:
  T(n)=T(n/2)+1    a=1,b=2,p=0: f=1=Θ(n⁰)→Case 2→ Θ(log n)   [binary search]
  T(n)=2T(n/2)+n   a=2,b=2,p=1: f=n=Θ(n¹)→Case 2→ Θ(n log n) [merge sort]
  T(n)=4T(n/2)+n   a=4,b=2,p=2: f=n=O(n²⁻¹)→Case 1→ Θ(n²)
  T(n)=4T(n/2)+n²  a=4,b=2,p=2: f=n²=Θ(n²)→Case 2→ Θ(n² log n)
  T(n)=4T(n/2)+n³  a=4,b=2,p=2: f=n³=Ω(n²⁺¹)→Case 3→ Θ(n³)
  T(n)=8T(n/2)+n²  a=8,b=2,p=3: f=n²=O(n³⁻¹)→Case 1→ Θ(n³)   [naive matrix mult]`,
      explanation: "Step 1: compute p=log_b(a). Step 2: compare f(n) with nᵖ. Step 3: apply matching case.",
    },
    examTips: [
      "Compute p = log_b(a) FIRST. That's your comparison target.",
      "Case 2 is the most common in practice — Merge Sort, Binary Search both hit Case 2.",
      "Case 3 requires checking regularity condition (af(n/b) ≤ cf(n)) — easy to forget.",
      "Master Theorem DOESN'T apply if a<1, or if f(n) is not a polynomial (e.g., f(n)=n log n may need extra care).",
    ],
    questions: [
      {
        q: "Apply the Master Theorem to T(n) = 2T(n/2) + n log n.",
        a: "a=2, b=2, p=log₂2=1. So nᵖ=n. f(n)=n log n. Compare: n log n vs n. Since n log n grows faster than n but n log n = n·log n ∈ O(n^(1+ε)) for any ε>0? Actually n log n ∉ Ω(n^(1+ε)) for fixed ε (log n grows slower than nᵉ). So this falls into a GAP — the standard Master Theorem doesn't apply directly. The solution is T(n) ∈ Θ(n log² n) (proved by Akra-Bazzi or extended master theorem). This is a classic trick question — know that n log n in f(n) is a borderline case.",
      },
      {
        q: "Apply the Master Theorem to T(n) = 3T(n/4) + n.",
        a: "a=3, b=4, p=log₄3 ≈ 0.79. nᵖ = n^0.79. f(n)=n = n¹. Since 1 > 0.79, f(n)=n ∈ Ω(n^(0.79+ε)) for ε=0.2 (since n ∈ Ω(n^0.99) ⊃ Ω(n^0.79+ε)). Regularity check: 3f(n/4) = 3·(n/4) = 3n/4 ≤ (3/4)·n = cf(n) with c=3/4 < 1. ✓ Case 3 applies → T(n) ∈ Θ(n).",
      },
      {
        q: "Use the Master Theorem to find the complexity of Merge Sort: T(n) = 2T(n/2) + n.",
        a: "a=2, b=2. p = log₂2 = 1, so nᵖ = n. f(n) = n ∈ Θ(n) = Θ(n¹) = Θ(nᵖ). This matches Case 2 (f(n) same rate as nᵖ). Therefore T(n) ∈ Θ(nᵖ log n) = Θ(n¹ · log n) = Θ(n log n). Merge Sort is Θ(n log n). ✓",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // BRUTE FORCE
  // ─────────────────────────────────────────────

  "brute-force-intro": {
    title: "Brute Force Strategy",
    emoji: "💪",
    tldr: "Solve directly from the problem definition, no clever tricks. Always finds a solution. Simple to implement. May be slow (combinatorial explosion) but often the starting point.",
    explanation: `Brute force is the most straightforward problem-solving strategy: solve the problem exactly as its definition states, without any optimization tricks or clever shortcuts.

PHILOSOPHY: "Just do it the obvious way."

ADVANTAGES:
1. SIMPLE TO IMPLEMENT: The code directly mirrors the problem definition. Less chance of bugs.
2. ALWAYS CORRECT: Since it follows the definition exactly, it will always find the answer.
3. USEFUL FOR SMALL INPUTS: For small n, the inefficiency doesn't matter.
4. BASELINE: Used as a reference to verify results from more complex algorithms.

DISADVANTAGES:
1. SLOW: Usually O(n²), O(n³), O(2ⁿ), or O(n!) — impractical for large n.
2. COMBINATORIAL EXPLOSION: For combinatorial problems, the number of candidates grows explosively.

WHEN TO USE:
- Input sizes are small (brute force may be fast enough)
- Simplicity and correctness are priorities (prototyping, debugging)
- No clever algorithm is known (some problems have no known fast algorithm)
- The algorithm is a subroutine for rare cases

EXAMPLES: Selection sort, Bubble sort, Brute-force string matching, Exhaustive search (TSP, Knapsack).`,
    keyPoints: [
      "Solve directly from the problem definition — no clever tricks",
      "Always correct, simple to implement, good for small inputs",
      "Usually slow: O(n²) to O(n!) depending on the problem",
      "Good baseline to verify more complex algorithms",
      "Exhaustive search IS brute force for combinatorial problems",
    ],
    formula: {
      code: `Brute Force Characteristics:
  Correctness:    GUARANTEED (follows definition exactly)
  Simplicity:     HIGH (straightforward code)
  Time efficiency: LOW (usually O(n²) or worse)
  Space efficiency: VARIABLE

Examples and their complexity:
  Selection Sort:         Θ(n²)
  Bubble Sort:            Θ(n²)
  Sequential Search:      Θ(n)  [actually efficient for this problem]
  String Matching:        O(nm) worst case
  TSP Exhaustive:         Ω((n-1)!)
  Knapsack Exhaustive:    Ω(2ⁿ)
  Assignment Exhaustive:  Θ(n!)`,
      explanation: "Brute force's complexity depends on how many candidates exist — O(2ⁿ) for subsets, O(n!) for permutations.",
    },
    examTips: [
      "Brute force = solve from definition, no cleverness",
      "Always correct, simple, but inefficient for large inputs",
      "Good for: small inputs, prototyping, reference implementations",
      "MCQ: 'Which design technique checks all possible solutions?' → Brute Force (Exhaustive Search)",
    ],
    questions: [
      {
        q: "What are the main advantages and disadvantages of the brute force strategy?",
        a: "Advantages: (1) Correctness guaranteed — follows problem definition directly. (2) Simple to implement — code mirrors the problem statement. (3) Works for small inputs. (4) Useful as a baseline to test correctness of efficient algorithms. Disadvantages: (1) Time inefficiency — usually O(n²) to O(n!) depending on combinatorial structure. (2) Combinatorial explosion — for TSP/Knapsack-class problems, number of candidates grows as n! or 2ⁿ, becoming impractical very quickly. (3) Wasteful — ignores structure of the problem that could be exploited.",
      },
      {
        q: "Give an example of a problem where brute force is acceptable and one where it is not.",
        a: "Acceptable: Finding the maximum in an unsorted array of n=1000 elements using sequential scan — O(n) = 1000 operations, instant on modern hardware. Not acceptable: Solving TSP with n=25 cities — (n-1)! = 24! ≈ 6×10²³ tours to check. At 1 billion tours per second, this would take ≈ 2×10¹⁰ years — longer than the age of the universe. For TSP with n>20, heuristic or approximation algorithms must be used.",
      },
    ],
  },

  "selection-sort": {
    title: "Selection Sort",
    emoji: "📌",
    tldr: "On pass i, find minimum in A[i..n-1] and swap to position i. Always Θ(n²) comparisons. In-place, NOT stable.",
    explanation: `Selection sort is the simplest sorting algorithm and a prime example of brute force.

IDEA: On each pass i (from 0 to n-2), find the minimum element in the unsorted portion A[i..n-1] and swap it into position i. After pass i, A[0..i] is sorted.

Why "selection"? Because each pass SELECTS the minimum from the remaining unsorted portion.

ANALYSIS:
Input size: n
Basic operation: comparison A[j] < A[min]
The double loop structure: outer loop i from 0 to n-2, inner loop j from i+1 to n-1.

C(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1 = Σᵢ₌₀ⁿ⁻² (n-1-i) = (n-1)n/2 ≈ n²/2 ∈ Θ(n²)

KEY PROPERTIES:
IN-PLACE: Only a fixed amount of extra memory (for the swap). ✓
NOT STABLE: Swapping non-adjacent elements can change relative order of equal elements.
For example, [5a, 5b, 3]: pass 0 swaps 3 to position 0, making it [3, 5b, 5a]. The relative order of 5a and 5b changed.
NO BEST/WORST CASE: Always exactly n(n-1)/2 comparisons regardless of input.`,
    keyPoints: [
      "Repeatedly select minimum from unsorted portion and swap to front",
      "C(n) = n(n-1)/2 ≈ n²/2 ∈ Θ(n²) — always, regardless of input",
      "In-place: O(1) extra space",
      "NOT stable: swapping non-adjacent elements can rearrange equal elements",
      "At most n-1 swaps total (one per pass) — fewer swaps than Bubble Sort",
    ],
    formula: {
      code: `ALGORITHM SelectionSort(A[0..n-1])
for i ← 0 to n-2 do
    min ← i
    for j ← i+1 to n-1 do
        if A[j] < A[min]      ← BASIC OP
            min ← j
    swap A[i] and A[min]

Analysis:
  C(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1
       = Σᵢ₌₀ⁿ⁻² (n-1-i)
       = (n-1) + (n-2) + ... + 1
       = (n-1)n/2  ∈ Θ(n²)

Example: Sort [89, 45, 68, 90, 29, 34, 17]
  Pass 0: min=17 (index 6) → swap → [17, 45, 68, 90, 29, 34, 89]
  Pass 1: min=29 (index 4) → swap → [17, 29, 68, 90, 45, 34, 89]
  ... (continue until sorted)`,
      explanation: "Selection sort has exactly n(n-1)/2 comparisons regardless of input — no best case.",
    },
    examTips: [
      "C(n) = n(n-1)/2 ∈ Θ(n²) — always, no best/worst distinction",
      "In-place: ✓. Stable: ✗",
      "Advantage over Bubble: at most n-1 swaps (Bubble can swap O(n²) times)",
      "MCQ: 'Is selection sort stable?' → NO (swapping non-adjacent can reorder equals)",
    ],
    questions: [
      {
        q: "Trace Selection Sort on [5, 1, 4, 2, 3].",
        a: "Pass 0: min=1 at index 1. Swap A[0]↔A[1] → [1, 5, 4, 2, 3]. Pass 1: min=2 at index 3. Swap A[1]↔A[3] → [1, 2, 4, 5, 3]. Pass 2: min=3 at index 4. Swap A[2]↔A[4] → [1, 2, 3, 5, 4]. Pass 3: min=4 at index 4. Swap A[3]↔A[4] → [1, 2, 3, 4, 5]. Done.",
      },
      {
        q: "Show with a counter-example that Selection Sort is NOT stable.",
        a: "Consider A = [3a, 3b, 1] where 3a and 3b both have value 3 but distinct identities. Pass 0: find min=1 at index 2. Swap A[0] with A[2] → [1, 3b, 3a]. Now 3b precedes 3a, but in the original array, 3a preceded 3b. The relative order of equal elements changed. ∴ Selection Sort is unstable.",
      },
      {
        q: "Compare Selection Sort and Insertion Sort in terms of comparisons and swaps.",
        a: "Selection Sort: always Θ(n²) comparisons, at most n-1 swaps. Insertion Sort: worst case Θ(n²) comparisons and Θ(n²) swaps (reverse-sorted input), best case Θ(n) comparisons and 0 swaps (already sorted). Selection Sort wins when writes/swaps are expensive (e.g., flash memory). Insertion Sort wins for nearly-sorted inputs. Insertion Sort is stable; Selection Sort is not.",
      },
    ],
  },

  "bubble-sort": {
    title: "Bubble Sort",
    emoji: "🫧",
    tldr: "Repeatedly compare and swap adjacent elements. Largest element 'bubbles up' each pass. Always Θ(n²). In-place, IS stable.",
    explanation: `Bubble sort compares adjacent elements and swaps them if they're out of order. Larger elements "bubble up" to their correct positions.

IDEA: In each pass i (0 to n-2), compare adjacent pairs A[j] and A[j+1] for j = 0 to n-2-i. After pass i, the largest unsorted element has moved to position n-1-i.

ANALYSIS:
Basic operation: comparison A[j+1] < A[j]
C(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌₀ⁿ⁻²⁻ⁱ 1 = Σᵢ₌₀ⁿ⁻² (n-1-i) = n(n-1)/2 ∈ Θ(n²)

Same number of COMPARISONS as Selection Sort: n(n-1)/2.

KEY PROPERTIES:
IN-PLACE: Yes, O(1) extra space.
STABLE: YES — when two equal adjacent elements are compared, we only swap if strictly A[j+1] < A[j], not ≤. So equal elements are never swapped → relative order preserved.
INEFFICIENCY: Can make O(n²) swaps in the worst case (Selection Sort makes only O(n)).

OPTIMIZED VERSION: Add a flag to detect if no swaps occurred in a pass — if so, array is sorted and we can stop early. Best case becomes O(n) comparisons.`,
    keyPoints: [
      "Compare adjacent elements, swap if out of order — largest bubbles up each pass",
      "C(n) = n(n-1)/2 ≈ n²/2 ∈ Θ(n²) — same comparisons as Selection Sort",
      "In-place: ✓. STABLE: ✓ (never swap equals, so relative order preserved)",
      "Disadvantage: up to O(n²) swaps (Selection Sort: at most n-1)",
      "Optimized with flag: can detect early termination if already sorted",
    ],
    formula: {
      code: `ALGORITHM BubbleSort(A[0..n-1])
for i ← 0 to n-2 do
    for j ← 0 to n-2-i do
        if A[j+1] < A[j]      ← BASIC OP
            swap A[j] and A[j+1]

Analysis:
  C(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌₀ⁿ⁻²⁻ⁱ 1
       = Σᵢ₌₀ⁿ⁻² (n-1-i) = (n-1)n/2  ∈ Θ(n²)

Comparison: Both Selection and Bubble Sort have SAME comparison count = n(n-1)/2
Difference: Bubble Sort can have O(n²) swaps; Selection Sort has at most n-1 swaps.

Stability example:
  [5a, 3, 5b] with bubble sort:
  Compare 5a,3: swap → [3, 5a, 5b]
  Compare 5a,5b: 5b ≮ 5a, NO swap → [3, 5a, 5b] ✓ (5a before 5b preserved)`,
      explanation: "Bubble sort is stable because it only swaps STRICTLY out-of-order pairs, never equal elements.",
    },
    examTips: [
      "Same C(n) = n(n-1)/2 as Selection Sort — both Θ(n²)",
      "Bubble Sort: STABLE ✓. Selection Sort: NOT stable ✗.",
      "Bubble Sort: more swaps than Selection Sort (disadvantage)",
      "With early-termination flag: best case O(n) for already-sorted input",
    ],
    questions: [
      {
        q: "Trace Bubble Sort on [4, 3, 1, 2]. Show all passes.",
        a: "Pass 0 (i=0, j runs 0 to 2): Compare A[0],A[1]: 4>3 → swap → [3,4,1,2]. Compare A[1],A[2]: 4>1 → swap → [3,1,4,2]. Compare A[2],A[3]: 4>2 → swap → [3,1,2,4]. Pass 1 (i=1, j runs 0 to 1): Compare 3,1: 3>1 → swap → [1,3,2,4]. Compare 3,2: 3>2 → swap → [1,2,3,4]. Pass 2 (i=2, j runs 0 to 0): Compare 1,2: 1<2 → no swap → [1,2,3,4]. Done. C(4) = 3+2+1 = 6 = 4(3)/2 = 6. ✓",
      },
      {
        q: "Describe the optimized Bubble Sort with early termination. What is its best-case complexity?",
        a: "Add a boolean flag 'swapped' initialized to false before each pass. If any swap occurs, set swapped=true. After each pass, if swapped=false, no elements were out of order — array is fully sorted — terminate immediately. Best case: already-sorted input [1,2,3,...,n]. Pass 0: 0 swaps occur → flag remains false → terminate after 1 pass. Only n-1 comparisons made. Best case = Θ(n). Worst case remains Θ(n²) (reverse-sorted). This makes optimized Bubble Sort adaptive.",
      },
    ],
  },

  "sequential-search-sentinel": {
    title: "Sequential Search with Sentinel",
    emoji: "🔍",
    tldr: "Append key K to end as 'sentinel'. Eliminates the boundary check (A[i]≠K AND i<n) → single condition (A[i]≠K). Same Θ(n) but constant factor improved.",
    explanation: `The sentinel version of sequential search is a small but clever optimization that eliminates one condition from the loop.

ORIGINAL SEQUENTIAL SEARCH: The while loop has TWO conditions:
  while i < n AND A[i] ≠ K

At every iteration, BOTH conditions are checked. This doubles the work per iteration.

SENTINEL VERSION: Append K as an extra element at position A[n]. Now the loop only needs ONE condition:
  while A[i] ≠ K

The search will ALWAYS find K (either in A[0..n-1] or at the sentinel position A[n]). No need to check i < n because K will stop the loop before we go past A[n].

After the loop, check: if i < n, the key was found in the original array; else it was found only at the sentinel (not in the array).

ADVANTAGE: The loop condition is simpler (one comparison instead of two). This is a constant-factor improvement — the asymptotic complexity remains Θ(n), but the constant is halved.

ANALYSIS: Θ(n) in worst case (n comparisons when K not in A[0..n-1] — found at sentinel).`,
    keyPoints: [
      "Sentinel: append K to A[n], then search with single condition while A[i]≠K",
      "Eliminates the i<n boundary check from each iteration",
      "Loop always terminates (K is guaranteed to be found at A[n] if not before)",
      "Check i<n after loop to distinguish found vs not found",
      "Same Θ(n) asymptotic complexity but constant factor improvement",
    ],
    formula: {
      code: `ALGORITHM SequentialSearch2(A[0..n], K)
// Input: Array A[0..n-1] of n elements, search key K
// Append K as sentinel at A[n]
A[n] ← K
i ← 0
while A[i] ≠ K do      ← ONE condition (vs two in original)
    i ← i + 1
if i < n
    return i            ← found in original array
else
    return -1           ← found only at sentinel → not in array

Comparison: Original has condition (i < n AND A[i] ≠ K)
            Sentinel has condition (A[i] ≠ K)
Savings: Eliminates n comparisons of (i < n) in the worst case

Worst case: n+1 iterations (loop goes to sentinel) = n+1 comparisons of A[i]≠K
            But only checks ONE condition per step instead of two.`,
      explanation: "Sentinel trades one array slot for half the number of condition evaluations per iteration.",
    },
    examTips: [
      "Sentinel = append K to array end, simplify loop to single condition",
      "After loop: if i<n → found; else → not found (hit sentinel)",
      "Same Θ(n) but better constant factor — fewer comparisons per iteration",
      "Array must have space for A[n] — need n+1 slots",
    ],
    questions: [
      {
        q: "Why is the sentinel technique considered a 'space-time tradeoff'?",
        a: "It trades one extra memory slot (A[n] for the sentinel value) for improved time performance (halving the number of condition checks per loop iteration). We spend O(1) extra space to eliminate n boundary checks (i<n) in the worst case. This is a classic space-time tradeoff: use a small amount of extra space to reduce the hidden constant in the running time.",
      },
      {
        q: "What is the worst case for sentinel search and for original search? Are they the same asymptotically?",
        a: "Original: worst case requires checking both conditions (i<n AND A[i]≠K) at each of n iterations = 2n condition evaluations + final check = 2n+2 total. Sentinel: worst case requires checking one condition (A[i]≠K) at each of n+1 iterations = n+1 evaluations + final check (i<n) = n+2 total. Both are Θ(n) — the same asymptotic class. The sentinel saves approximately half the condition checks, improving the constant but not the order of growth.",
      },
    ],
  },

  "string-matching": {
    title: "Brute-Force String Matching",
    emoji: "🔤",
    tldr: "Align pattern P at each position in text T, compare character by character. Worst case: O(mn). Pattern length m, text length n.",
    explanation: `Brute-force string matching searches for the first occurrence of a pattern in a text by trying every possible alignment.

TERMINOLOGY:
  Pattern P: the string of m characters to search for
  Text T: the string of n characters to search in (n ≥ m)
  Goal: find the smallest index i such that T[i..i+m-1] = P[0..m-1]

ALGORITHM:
  For each possible starting position i (0 to n-m):
    Compare P[0..m-1] with T[i..i+m-1] character by character.
    If all m characters match: return i (found at position i).
  If no position matched: return -1.

Number of starting positions: n - m + 1

ANALYSIS:
Basic operation: character comparison P[j] = T[i+j]

WORST CASE: Pattern almost matches at every position but fails at the last character.
  Example: P = "aaab", T = "aaaa...aaab" (all a's then b)
  At each of the n-m+1 positions, m comparisons before mismatch.
  C_worst(n,m) = m(n-m+1) ∈ O(nm)

BEST CASE: Mismatch on first character at every position (until found).
  C_best = n-m+1 if not found, or 1 if P[0] = T[0] matches immediately.`,
    keyPoints: [
      "Align pattern at each of n-m+1 positions, compare m chars",
      "Basic operation: character comparison",
      "Worst case: m(n-m+1) comparisons ∈ O(nm)",
      "Worst case example: T='aaaa...a', P='aaa...ab'",
      "Best case: 1 comparison per alignment (immediate mismatch)",
      "Better algorithms: KMP (O(n+m)), Boyer-Moore (average sub-linear)",
    ],
    formula: {
      code: `ALGORITHM BruteForceStringMatch(T[0..n-1], P[0..m-1])
// Input: Text T of n chars, Pattern P of m chars
// Output: Index of first match, or -1
for i ← 0 to n-m do        ← n-m+1 starting positions
    j ← 0
    while j < m and P[j] = T[i+j] do     ← BASIC OP: comparison
        j ← j + 1
    if j = m return i       ← all m chars matched
return -1

Analysis:
  Worst case: P="aaab", T="aaaa...aaab"
  At each position: m comparisons before mismatch
  C_worst = m × (n-m+1) ∈ O(nm)

  Example: n=10, m=4 → at most 4×7 = 28 comparisons in worst case

  Best case: T="bbbb...", P="ab..."
  C_best = n-m+1 = 1 comparison per position`,
      explanation: "O(nm) worst case makes brute-force impractical for large texts — use KMP or Boyer-Moore instead.",
    },
    examTips: [
      "Worst case: O(nm) — quadratic-ish when m ≈ √n",
      "Worst case example: near-matches at every position (like 'aaab' in 'aaaa...a')",
      "n-m+1 starting positions total (0 to n-m inclusive)",
      "MCQ: worst case comparisons for n=10, m=3 → 3×8 = 24",
    ],
    questions: [
      {
        q: "Trace brute-force string matching for T='ABCABABC', P='ABC'. Show each alignment.",
        a: "n=8, m=3. Starting positions: i=0 to 5. i=0: T[0..2]='ABC', P='ABC'. Compare A=A✓, B=B✓, C=C✓ → MATCH at position 0! Return 0. Total comparisons = 3. (Terminates early on first match.)",
      },
      {
        q: "What is the worst case input for brute-force string matching and what is its comparison count?",
        a: "Worst case: T = 'aaa...a' (n a's) and P = 'aaa...ab' (m-1 a's followed by b). At each of the n-m+1 starting positions, the first m-1 characters match (all a's) and only the last character (b vs a) causes a mismatch — requiring m comparisons per position. Total: m(n-m+1) comparisons. For m=n/2: n/2 × (n/2+1) ≈ n²/4 ∈ O(n²). This is the maximum.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // EXHAUSTIVE SEARCH
  // ─────────────────────────────────────────────

  "exhaustive-intro": {
    title: "Exhaustive Search Strategy",
    emoji: "🔍",
    tldr: "Generate ALL candidate solutions systematically, check feasibility, keep the best. Used for combinatorial problems. Complexity: O(2ⁿ) for subsets, O(n!) for permutations.",
    explanation: `Exhaustive search is brute force applied to combinatorial optimization problems. Instead of looking for a single solution, these problems ask: find the BEST solution from a discrete (combinatorial) set.

METHOD:
1. GENERATE: Systematically generate ALL potential solutions (all permutations, all subsets, etc.)
2. EVALUATE: For each candidate, check if it satisfies the constraints (is it feasible?)
3. KEEP THE BEST: Among all feasible candidates, record the one with the best objective value

WHEN TO USE:
- When no polynomial-time algorithm is known (NP-hard problems)
- For small input sizes where the combinatorial explosion is manageable
- As a reference implementation to verify better algorithms

COMPLEXITY:
- Problems over SUBSETS of n items: 2ⁿ candidates → Ω(2ⁿ)
- Problems over PERMUTATIONS of n items: n! candidates → Ω(n!)
- Both grow impossibly fast: for n=20, 2²⁰ ≈ 10⁶ (manageable) but for n=60, 2⁶⁰ ≈ 10¹⁸ (not feasible)

MAIN EXAMPLES:
- Travelling Salesman Problem (TSP): permutations → Ω((n-1)!)
- 0/1 Knapsack: subsets → Ω(2ⁿ)
- Assignment Problem: permutations → Θ(n!)`,
    keyPoints: [
      "Exhaustive search = brute force for combinatorial optimization",
      "3 steps: Generate all candidates → Check feasibility → Keep best",
      "Subset problems: 2ⁿ candidates. Permutation problems: n! candidates.",
      "TSP: Ω((n-1)!). Knapsack: Ω(2ⁿ). Assignment: Θ(n!).",
      "Impractical for large n — but correct for small n",
    ],
    formula: {
      code: `General Exhaustive Search Framework:
  BestSolution ← null
  for each candidate solution s do:
      if s is feasible (satisfies constraints):
          if s is better than BestSolution:
              BestSolution ← s
  return BestSolution

Complexity by problem type:
  Permutation problems: n! candidates → Ω(n!)
    Example: TSP with n cities → (n-1)!/2 tours → Ω((n-1)!)
    n=10: 9! = 362,880 (manageable)
    n=20: 19! ≈ 10^17 (impossible)

  Subset problems: 2^n candidates → Ω(2^n)
    Example: Knapsack with n items → 2^n subsets
    n=20: 2^20 ≈ 10^6 (manageable)
    n=60: 2^60 ≈ 10^18 (impossible)`,
      explanation: "The combinatorial explosion is the fundamental barrier — exhaustive search is only practical for small n.",
    },
    examTips: [
      "Exhaustive search = enumerate all, check constraints, track best",
      "TSP: (n-1)!/2 tours (fix start city, permute rest, tours are undirected)",
      "Knapsack: 2ⁿ subsets",
      "Assignment: n! permutations",
    ],
    questions: [
      {
        q: "Explain the 3-step exhaustive search process and apply it to the Knapsack problem.",
        a: "The 3 steps: (1) Generate — systematically enumerate ALL candidate solutions. For Knapsack: enumerate all 2ⁿ subsets of n items (each item either included or excluded). (2) Evaluate — for each candidate subset, check feasibility: is total weight ≤ capacity W? Infeasible subsets are discarded. (3) Keep Best — among all feasible subsets, track the one with maximum total value. Return that subset. Complexity: Ω(2ⁿ) since all subsets must be generated.",
      },
      {
        q: "Why do TSP and Assignment Problem have factorial complexity while Knapsack is exponential?",
        a: "TSP and Assignment involve PERMUTATIONS: each solution is an ordering of n items (cities or job assignments). The number of permutations of n items is n!. TSP uses (n-1)!/2 (fixing start city, undirected). Knapsack involves SUBSETS: each item is either in or out (binary choice), so 2ⁿ subsets. n! > 2ⁿ for all n ≥ 3 (n=10: 10!=3,628,800 vs 2¹⁰=1024), so permutation problems are computationally harder than subset problems for the same n.",
      },
    ],
  },

  "tsp": {
    title: "Exhaustive Search: Travelling Salesman Problem",
    emoji: "🗺️",
    tldr: "Find shortest Hamiltonian Circuit (visits each city once, returns to start). Fix start city, enumerate (n-1)! permutations. Impractical for large n.",
    explanation: `The Travelling Salesman Problem (TSP) asks: given n cities with known distances between each pair, find the shortest route that visits each city exactly once and returns to the starting city.

Such a route is called a HAMILTONIAN CIRCUIT.

EXHAUSTIVE APPROACH:
Fix the starting city (by symmetry, we can always start from city a). Then enumerate all permutations of the remaining n-1 cities. For each permutation, compute the total tour length. The minimum is the answer.

Number of permutations of n-1 cities: (n-1)!
But since each undirected tour is counted twice (a→b→c→a = a→c→b→a), unique tours = (n-1)!/2.

Complexity: Ω((n-1)!) — sub-factorial is still factorial in asymptotic terms.

EXAMPLE (4 cities a,b,c,d):
All tours starting from a:
  a→b→c→d→a: 2+3+7+5 = 17 ✓
  a→b→d→c→a: 2+4+7+8 = 21
  a→c→b→d→a: 8+3+4+5 = 20
  a→c→d→b→a: 8+7+4+2 = 21
  a→d→b→c→a: 5+4+3+8 = 20
  a→d→c→b→a: 5+7+3+2 = 17 ← (reverse of first tour)
Minimum: 17 (two optimal tours, both length 17).`,
    keyPoints: [
      "Find shortest Hamiltonian Circuit: visit each city exactly once and return to start",
      "Fix start city, enumerate (n-1)! permutations of remaining cities",
      "Unique tours: (n-1)!/2 (each undirected tour counted twice)",
      "Complexity: Ω((n-1)!) — impractical for n > 20",
      "NP-hard: no known polynomial-time algorithm exists",
      "For n=4: 3! = 6 tours to check (3 unique since each counted twice)",
    ],
    formula: {
      code: `TSP Exhaustive Search:
  1. Fix starting city (WLOG, city 1)
  2. Generate all (n-1)! permutations of remaining n-1 cities
  3. For each permutation [c₁, c₂, ..., cₙ₋₁]:
       compute tour length = d(1,c₁) + d(c₁,c₂) + ... + d(cₙ₋₁,1)
  4. Return permutation with minimum tour length

Complexity: (n-1)! tours to check → Ω((n-1)!)

n=4 example (cities a,b,c,d; fix start at a):
  Tour a→b→c→d→a: 2+3+7+5 = 17 ← optimal
  Tour a→b→d→c→a: 2+4+7+8 = 21
  Tour a→c→b→d→a: 8+3+4+5 = 20
  Tour a→c→d→b→a: 8+7+4+2 = 21
  Tour a→d→b→c→a: 5+4+3+8 = 20
  Tour a→d→c→b→a: 5+7+3+2 = 17
  Minimum: 17

Scale reality check: n=20 → 19! ≈ 1.2 × 10^17 tours — impractical`,
      explanation: "Even at 10 billion tours/second, n=20 would take 4 million years — TSP exhaustive is truly impractical.",
    },
    examTips: [
      "Exhaustive TSP: fix one city, enumerate (n-1)! permutations of the rest",
      "Complexity: Ω((n-1)!)",
      "For n=4: 3! = 6 tours. For n=5: 4! = 24 tours.",
      "NP-hard: no polynomial algorithm known; approximation algorithms exist",
    ],
    questions: [
      {
        q: "For TSP with 5 cities, how many tours are evaluated in exhaustive search? How many unique (undirected) tours?",
        a: "Fix one starting city. Enumerate permutations of remaining 4 cities: (5-1)! = 4! = 24 tours are evaluated. Since each undirected tour is counted twice (forward and backward directions give the same route), unique tours = 24/2 = 12.",
      },
      {
        q: "Why do we fix the starting city in TSP? How does this reduce the search space?",
        a: "In TSP, all Hamiltonian circuits are cyclic — a→b→c→d→a is the same circuit regardless of where you start (a→b→c→d→a = b→c→d→a→b = c→d→a→b→c = d→a→b→c→d). By fixing the start city, we eliminate n equivalent cyclic rotations of each tour. Without fixing: n! tours. With fixed start: (n-1)! tours. Reduction factor: n. This is why exhaustive TSP evaluates (n-1)! and not n! permutations.",
      },
    ],
  },

  "knapsack": {
    title: "Exhaustive Search: Knapsack Problem",
    emoji: "🎒",
    tldr: "n items with weights and values. Capacity W. Find maximum-value subset with total weight ≤ W. Enumerate all 2ⁿ subsets. Complexity: Ω(2ⁿ).",
    explanation: `The 0/1 Knapsack Problem: given n items each with weight wᵢ and value vᵢ, and a knapsack of capacity W, find the subset of items maximizing total value while total weight ≤ W. ("0/1" means each item is either included (1) or not (0).)

EXHAUSTIVE APPROACH:
Generate all 2ⁿ subsets of the n items. For each subset:
  1. Compute total weight. If weight > W: infeasible (skip).
  2. Compute total value. Track the maximum feasible value.

Complexity: Ω(2ⁿ) — must check all 2ⁿ subsets.

EXAMPLE (W = 16kg, 4 items):
  Item 1: 2kg, $20
  Item 2: 5kg, $30
  Item 3: 10kg, $50
  Item 4: 5kg, $10

  All 16 subsets: {}, {1}, {2}, {3}, {4}, {1,2}, {1,3}, {1,4}, {2,3}, {2,4}, {3,4}, {1,2,3}, {1,2,4}, {1,3,4}, {2,3,4}, {1,2,3,4}
  
  {1,2,3}: 2+5+10=17kg > 16 → infeasible
  {2,3}: 5+10=15kg ≤ 16, value=$80
  {1,2,4}: 2+5+5=12kg ≤ 16, value=$60
  ... → Maximum: {2,3} with value $80 at 15kg.`,
    keyPoints: [
      "n items with weights/values, capacity W. Maximize value subject to weight ≤ W.",
      "Exhaustive: enumerate all 2ⁿ subsets, check feasibility, track max value",
      "Complexity: Ω(2ⁿ)",
      "NP-hard: no known polynomial algorithm for exact solution",
      "Dynamic programming gives O(nW) pseudo-polynomial solution",
    ],
    formula: {
      code: `Knapsack Exhaustive Search:
  1. Generate all 2ⁿ subsets of n items
  2. For each subset S:
       if Σᵢ∈S wᵢ ≤ W:          ← feasibility check
           if Σᵢ∈S vᵢ > best:   ← optimality check
               best ← Σᵢ∈S vᵢ
               bestSubset ← S
  3. Return bestSubset

Complexity: Ω(2ⁿ) — generate and check all 2ⁿ subsets

Example (W=16):
  Items:    {1:2kg,$20}, {2:5kg,$30}, {3:10kg,$50}, {4:5kg,$10}
  {1,2,3}: 17kg > 16 → infeasible
  {2,3}:   15kg ≤ 16, value=$80  ← OPTIMAL
  {1,3}:   12kg ≤ 16, value=$70
  {1,2,4}: 12kg ≤ 16, value=$60
  ...
  Result: {2,3} → $80`,
      explanation: "With n=4, we check 16 subsets. With n=30, we'd check over a billion — intractable.",
    },
    examTips: [
      "Knapsack exhaustive: 2ⁿ subsets → Ω(2ⁿ)",
      "NP-hard: exact solution requires exponential time (no known polynomial algorithm)",
      "Dynamic programming: O(nW) — pseudo-polynomial (efficient when W is small)",
      "For exam: always verify total weight ≤ W before counting value",
    ],
    questions: [
      {
        q: "Solve exhaustive Knapsack: W=10, items: {A:6kg,$30}, {B:3kg,$14}, {C:4kg,$16}, {D:2kg,$9}.",
        a: "2⁴=16 subsets. Check feasible ones (weight≤10): {A}: 6kg,$30. {B}: 3kg,$14. {C}: 4kg,$16. {D}: 2kg,$9. {A,D}: 8kg,$39. {B,C}: 7kg,$30. {B,D}: 5kg,$23. {C,D}: 6kg,$25. {A,B}: 9kg,$44. {A,C}: 10kg,$46. ← $46 at 10kg. {B,C,D}: 9kg,$39. {A,B,D}: infeasible (11kg). {A,C,D}: infeasible (12kg). Others infeasible. Maximum: {A,C} = $46. ✓",
      },
      {
        q: "What is the difference between the 0/1 Knapsack and the Fractional Knapsack?",
        a: "0/1 Knapsack: each item is either fully included (1) or excluded (0) — no partial items. This makes it NP-hard; exhaustive search needs Ω(2ⁿ) time. Fractional Knapsack: items can be split and fractions can be taken (like breaking a bar of gold). This is efficiently solvable in O(n log n) time by a greedy algorithm: sort items by value/weight ratio descending and fill greedily. The key difference is the ability to take fractional amounts, which enables the greedy approach.",
      },
    ],
  },

  "assignment-problem": {
    title: "Exhaustive Search: Assignment Problem",
    emoji: "👥",
    tldr: "n people, n jobs. Cost matrix C[i][j]. Find min-cost perfect matching. Enumerate all n! permutations. Complexity: Θ(n!).",
    explanation: `The Assignment Problem: given n people and n jobs with cost matrix C[i][j] (cost of assigning person i to job j), find the minimum-cost assignment where each person gets exactly one job and each job goes to exactly one person. (This is a perfect matching.)

EXHAUSTIVE APPROACH:
An assignment is a permutation of {1, 2, ..., n}: person 1 gets job j₁, person 2 gets job j₂, etc.
There are n! such permutations. For each:
  Compute total cost = Σᵢ₌₁ⁿ C[i][jᵢ].
  Track the minimum.

Complexity: Θ(n!) — must generate and evaluate all n! permutations.

EXAMPLE (3×3 cost matrix):
  C = [9  2  7]   Person 1 can do jobs 1,2,3
      [6  4  3]   Person 2 can do jobs 1,2,3
      [5  8  1]   Person 3 can do jobs 1,2,3

  Assignment (1,2,3) → person 1→job1, p2→job2, p3→job3: 9+4+1=14
  Assignment (1,3,2) → p1→job1, p2→job3, p3→job2: 9+3+8=20
  Assignment (2,1,3) → p1→job2, p2→job1, p3→job3: 2+6+1=9 ← minimum?
  ... (all 6 permutations for n=3)

NOTE: The HUNGARIAN ALGORITHM solves the assignment problem in O(n³) — much better than O(n!).`,
    keyPoints: [
      "n people, n jobs, cost matrix C[i][j]. Minimize total assignment cost.",
      "Exhaustive: enumerate all n! permutations of job assignments",
      "Complexity: Θ(n!)",
      "n=10: 10! = 3,628,800 (marginal). n=20: 20! ≈ 2.4×10¹⁸ (impossible).",
      "Better: Hungarian Algorithm solves in O(n³)",
    ],
    formula: {
      code: `Assignment Problem Exhaustive Search:
  1. Generate all n! permutations p of {1, ..., n}
  2. For each permutation p = [j₁, j₂, ..., jₙ]:
       cost = C[1][j₁] + C[2][j₂] + ... + C[n][jₙ]
       if cost < minCost: minCost ← cost; bestAssignment ← p
  3. Return bestAssignment

Complexity: Θ(n!) permutations × O(n) per evaluation = Θ(n × n!)

n=3 example:
  All 3! = 6 permutations of jobs {1,2,3}:
  Perm (1,2,3): 9+4+1 = 14
  Perm (1,3,2): 9+3+8 = 20
  Perm (2,1,3): 2+6+1 = 9  ← optimal
  Perm (2,3,1): 2+3+5 = 10
  Perm (3,1,2): 7+6+8 = 21
  Perm (3,2,1): 7+4+5 = 16
  Minimum: 9 (assignment person1→job2, person2→job1, person3→job3)`,
      explanation: "n! grows faster than 2ⁿ for large n — assignment problem exhaustive is the most expensive of the three.",
    },
    examTips: [
      "Assignment problem: n! permutations → Θ(n!)",
      "Harder than TSP (n! vs (n-1)!) but same polynomial-vs-exponential picture",
      "Hungarian Algorithm: O(n³) — mention as the efficient alternative",
      "n=4: 4! = 24 assignments to evaluate",
    ],
    questions: [
      {
        q: "Solve the assignment problem exhaustively for the cost matrix C=[[9,2,7],[6,4,3],[5,8,1]].",
        a: "All 3! = 6 permutations: (1,2,3): C[1][1]+C[2][2]+C[3][3]=9+4+1=14. (1,3,2): 9+3+8=20. (2,1,3): 2+6+1=9 ← MINIMUM. (2,3,1): 2+3+5=10. (3,1,2): 7+6+8=21. (3,2,1): 7+4+5=16. Optimal assignment: Person1→Job2, Person2→Job1, Person3→Job3. Cost = 9.",
      },
      {
        q: "Why does the Assignment Problem have exactly n! solutions in exhaustive search, not 2ⁿ?",
        a: "Because the Assignment Problem requires a PERFECT MATCHING: every person gets exactly one job and every job goes to exactly one person. This is a bijection from {persons} to {jobs}. The number of bijections from a set of n elements to itself is n! (the number of permutations). Unlike Knapsack where each item is independently included/excluded (giving 2ⁿ subsets), here including person i in a job excludes others from that job — the structure is permutation-based, not subset-based.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SPACE-TIME TRADEOFFS
  // ─────────────────────────────────────────────

  "comparison-counting-sort": {
    title: "Space-Time Tradeoff: Comparison Counting Sort",
    emoji: "⚡",
    tldr: "For each element, count how many elements are smaller → that's its final index. C(n) = n(n-1)/2 ∈ Θ(n²). Uses O(n) extra space. Demonstrates space-time tradeoff concept.",
    explanation: `Comparison Counting Sort is an example of the INPUT ENHANCEMENT technique — preprocessing the input to gain information that can speed up the sorting process.

IDEA: For each element A[i], count how many elements are smaller than A[i]. That count is exactly its position in the sorted output array (0-indexed: if 3 elements are smaller, A[i] goes to position 3).

ALGORITHM:
1. Initialize Count[i] = 0 for all i.
2. For every pair (i, j) with i < j:
   - If A[i] < A[j]: increment Count[j] (one more element smaller than A[j])
   - Else: increment Count[i] (one more element smaller than A[i])
3. Copy A[i] to S[Count[i]] for all i.

EXAMPLE: A = [62, 31, 84, 96, 19, 47]
After counting: Count = [3, 1, 4, 5, 0, 2]
Interpretation: 62 has 3 smaller → goes to index 3; 19 has 0 smaller → goes to index 0
Result S = [19, 31, 47, 62, 84, 96] ✓

ANALYSIS:
C(n) = n(n-1)/2 ∈ Θ(n²) — same as Selection Sort and Bubble Sort.

DRAWBACK: Uses O(n) extra space for the Count array. Same asymptotic efficiency as simpler in-place sorts, plus extra space. This shows the tradeoff: extra space bought us... nothing here. The concept is more useful in other contexts (like counting sort for integers).`,
    keyPoints: [
      "For each element: count how many smaller elements exist → that's its sorted position",
      "Uses O(n) extra space (Count array and output array S)",
      "C(n) = n(n-1)/2 ∈ Θ(n²) — same comparisons as Selection/Bubble Sort",
      "No improvement in time complexity — illustrates space-time tradeoff CONCEPT",
      "Input enhancement: preprocess to gain useful information (here: rank of each element)",
    ],
    formula: {
      code: `ALGORITHM ComparisonCountingSort(A[0..n-1])
// Initialize count array
for i ← 0 to n-1 do Count[i] ← 0

// Count pairs: for each pair (i,j), increment one count
for i ← 0 to n-2 do
    for j ← i+1 to n-1 do
        if A[i] < A[j]
            Count[j] ← Count[j] + 1    ← BASIC OP (comparison)
        else
            Count[i] ← Count[i] + 1

// Place elements in sorted positions
for i ← 0 to n-1 do
    S[Count[i]] ← A[i]
return S

Example: A = [62, 31, 84, 96, 19, 47]
  After comparisons: Count = [3, 1, 4, 5, 0, 2]
  S[3]=62, S[1]=31, S[4]=84, S[5]=96, S[0]=19, S[2]=47
  S = [19, 31, 47, 62, 84, 96] ✓

Analysis:
  C(n) = Σᵢ₌₀ⁿ⁻² Σⱼ₌ᵢ₊₁ⁿ⁻¹ 1 = n(n-1)/2 ∈ Θ(n²)
  Extra space: O(n) for Count[] and S[]`,
      explanation: "Same Θ(n²) time as simpler in-place sorts, plus extra O(n) space — not a practical improvement.",
    },
    examTips: [
      "C(n) = n(n-1)/2 ∈ Θ(n²) — same as Selection and Bubble Sort",
      "Uses O(n) extra space — contrast with in-place sorts",
      "The algorithm is NOT an improvement in efficiency — it illustrates the CONCEPT",
      "Count[i] = number of elements SMALLER than A[i] = final sorted index of A[i]",
      "MCQ: 'Compared to Selection Sort, Comparison Counting Sort uses...' → More space (O(n) extra)",
    ],
    questions: [
      {
        q: "Apply Comparison Counting Sort to A = [3, 1, 4, 1, 5]. What is the Count array?",
        a: "Compare all pairs (i<j): (3,1): 3>1 → Count[0]++. (3,4): 3<4 → Count[2]++. (3,1): 3>1 → Count[0]++. (3,5): 3<5 → Count[4]++. (1,4): 1<4 → Count[2]++. (1,1): equal, but code says else → Count[1]++. (1,5): 1<5 → Count[4]++. (4,1): 4>1 → Count[2]++. Actually: (4,5): 4<5 → Count[4]++. (1,5): 1<5 → Count[4]++. Count = [2, 0, 3, 1, 4]. So S = [1, 1, 3, 4, 5]. (Note: duplicate 1s may cause equal comparison issue — algorithm handles it by placing in Count[i] position).",
      },
      {
        q: "What is the space-time tradeoff in Comparison Counting Sort? Is this a good tradeoff?",
        a: "Space traded: O(n) extra memory for the Count array and output array S (total 2n extra). Time gained: ...none. The algorithm still runs in Θ(n²) — identical to in-place Selection Sort and Bubble Sort. This is a BAD tradeoff in terms of efficiency. Extra space was spent without any improvement in time complexity. The value is educational: it demonstrates the CONCEPT of input enhancement (computing ranks as a preprocessing step) and space-time tradeoffs. Better space-time tradeoffs are seen in Radix Sort or hash tables where extra space genuinely reduces time.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PYQ BANK & REFERENCE (NEW SECTION)
  // ─────────────────────────────────────────────

  "cheat-sheet": {
    title: "Unit 1 Formula Cheat Sheet",
    emoji: "📄",
    tldr: "All key formulas, recurrences, complexities, and notation definitions in one place.",
    explanation: `Complete formula reference for DAA Unit 1 — everything you need for a closed-book exam.`,
    keyPoints: [
      "Asymptotic definitions, growth hierarchy, summation formulas all in one place",
      "All standard recurrences and their solutions",
      "Algorithm complexity quick-reference table",
      "Properties of sorting algorithms",
    ],
    formula: {
      code: `════════════════════════════════════════════
ASYMPTOTIC NOTATION DEFINITIONS
════════════════════════════════════════════
Big-O (upper):    t(n) ≤ c·g(n)         for all n≥n₀
Big-Ω (lower):    t(n) ≥ c·g(n)         for all n≥n₀
Big-Θ (tight):    c₂g(n) ≤ t(n) ≤ c₁g(n) for all n≥n₀
Little-o:         lim t/g = 0           (strictly slower)
Little-ω:         lim t/g = ∞           (strictly faster)

LIMIT METHOD: lim t(n)/g(n) = 0 → O; = c → Θ; = ∞ → Ω

════════════════════════════════════════════
GROWTH HIERARCHY (slowest → fastest)
════════════════════════════════════════════
1 < log n < √n < n < n log n < n² < n³ < 2ⁿ < n!

════════════════════════════════════════════
SUMMATION FORMULAS
════════════════════════════════════════════
Σᵢ₌ₗᵘ 1       = u - l + 1
Σᵢ₌₁ⁿ i       = n(n+1)/2
Σᵢ₌₁ⁿ i²      = n(n+1)(2n+1)/6
Σᵢ₌₀ⁿ aⁱ      = (aⁿ⁺¹-1)/(a-1)       [geometric, a≠1]
(n-1)+(n-2)+...+1 = n(n-1)/2           [triangular]
1+3+5+...+(2n-1) = n²                   [sum of odd]

════════════════════════════════════════════
KEY RECURRENCES & SOLUTIONS
════════════════════════════════════════════
T(n) = T(n-1) + 1,   T(0)=0  →  T(n) = n       [Θ(n)]
T(n) = T(n-1) + n,   T(0)=0  →  T(n) = n(n+1)/2 [Θ(n²)]
T(n) = 2T(n-1) + 1, T(0)=0  →  T(n) = 2ⁿ-1    [Θ(2ⁿ)]
T(n) = T(n/2) + 1,  T(1)=0  →  T(n) = log n    [Θ(log n)]
T(n) = 2T(n/2) + n, T(1)=c  →  T(n) ≈ n log n  [Θ(n log n)]

════════════════════════════════════════════
MASTER THEOREM: T(n) = aT(n/b) + f(n)
Let p = log_b(a)
════════════════════════════════════════════
Case 1: f(n) ∈ O(nᵖ⁻ᵉ)  →  T(n) ∈ Θ(nᵖ)
Case 2: f(n) ∈ Θ(nᵖ)    →  T(n) ∈ Θ(nᵖ log n)
Case 3: f(n) ∈ Ω(nᵖ⁺ᵉ) [+regularity] → T(n) ∈ Θ(f(n))

════════════════════════════════════════════
ALGORITHM COMPLEXITY TABLE
════════════════════════════════════════════
Algorithm           │ Best    │ Worst   │ Stable │ In-place
────────────────────┼─────────┼─────────┼────────┼──────────
Selection Sort      │ Θ(n²)   │ Θ(n²)   │ No     │ Yes
Bubble Sort         │ Θ(n)†   │ Θ(n²)   │ Yes    │ Yes
Sequential Search   │ Θ(1)    │ Θ(n)    │ n/a    │ Yes
BF String Match     │ Θ(n-m)  │ Θ(nm)   │ n/a    │ Yes
TSP (Exhaustive)    │ -       │ Ω((n-1)!)│ -     │ -
Knapsack (Exhaust.) │ -       │ Ω(2ⁿ)   │ -      │ -
Assignment (Exhaust)│ -       │ Θ(n!)   │ -      │ -
Matrix Multiply     │ Θ(n³)   │ Θ(n³)   │ n/a    │ No
Max Element         │ Θ(n)    │ Θ(n)    │ n/a    │ Yes
† = with early termination flag`,
      explanation: "Print this page. Study the recurrences and growth hierarchy above all else.",
    },
    examTips: [
      "The three notation proofs always use: find explicit c and n₀, verify the inequality",
      "Master Theorem shortcut: compute p=log_b(a), compare degree of f(n) with p",
      "Growth hierarchy must be memorised — appears in almost every exam",
      "Backward substitution: always write at least 3 expansion steps before generalising",
    ],
    questions: [],
  },

  "complexity-table": {
    title: "Complexity Comparison Table",
    emoji: "📊",
    tldr: "Side-by-side comparison of all Unit 1 algorithms: time complexity, space, stability, technique used.",
    explanation: `Quick reference for all algorithms covered in Unit 1, organized for comparison.`,
    keyPoints: [
      "All algorithms from Unit 1 in one table",
      "Highlights which algorithms have no best/worst distinction vs those that do",
      "Shows which algorithms are NP-hard vs polynomial",
    ],
    formula: {
      code: `NON-RECURSIVE ALGORITHMS
─────────────────────────────────────────────────────────────────
Algorithm          │ C(n)         │ Class   │ Varies w/Input?
───────────────────┼──────────────┼─────────┼────────────────────
Max Element        │ n-1          │ Θ(n)    │ No
Unique Elements    │ n(n-1)/2     │ Θ(n²)   │ Yes (best=1)
Matrix Multiply    │ n³           │ Θ(n³)   │ No
Seq Search (worst) │ n            │ Θ(n)    │ Yes (best=1)
Selection Sort     │ n(n-1)/2     │ Θ(n²)   │ No
Bubble Sort        │ n(n-1)/2     │ Θ(n²)   │ No (basic)
BF String Match    │ m(n-m+1)     │ O(nm)   │ Yes (best=n-m)
Comp Count Sort    │ n(n-1)/2     │ Θ(n²)   │ No

RECURSIVE ALGORITHMS
─────────────────────────────────────────────────────────────────
Algorithm          │ Recurrence      │ Solution   │ Class
───────────────────┼─────────────────┼────────────┼────────────
Factorial          │ M(n)=M(n-1)+1   │ M(n)=n     │ Θ(n)
BinRec             │ A(n)=A(n/2)+1   │ log₂n      │ Θ(log n)
Tower of Hanoi     │ C(n)=2C(n-1)+1  │ 2ⁿ-1       │ Θ(2ⁿ)
Merge Sort*        │ T(n)=2T(n/2)+n  │ n log n    │ Θ(n log n)

EXHAUSTIVE SEARCH ALGORITHMS
─────────────────────────────────────────────────────────────────
Problem            │ Candidates      │ Complexity │ Better Algorithm
───────────────────┼─────────────────┼────────────┼────────────────────
TSP                │ (n-1)!/2 tours  │ Ω((n-1)!)  │ Approx (2-opt etc)
0/1 Knapsack       │ 2ⁿ subsets      │ Ω(2ⁿ)      │ DP: O(nW)
Assignment         │ n! perms        │ Θ(n!)      │ Hungarian: O(n³)

SORTING PROPERTIES
─────────────────────────────────────────────────────────────────
Algorithm   │ Stable │ In-place │ Adaptive │ Swaps
────────────┼────────┼──────────┼──────────┼────────────────────
Selection   │ No     │ Yes      │ No       │ ≤ n-1
Bubble      │ Yes    │ Yes      │ Yes†     │ Up to n(n-1)/2
Merge Sort* │ Yes    │ No       │ No       │ n/a (not swap-based)
† = with early-termination flag`,
      explanation: "The rows marked * (Merge Sort) are outside Unit 1 proper but appear in recurrence examples.",
    },
    examTips: [
      "Selection: in-place ✓, stable ✗ — always Θ(n²)",
      "Bubble: in-place ✓, stable ✓ — Θ(n²) worst, Θ(n) best with flag",
      "TSP/Knapsack/Assignment: know candidate counts and better algorithms",
    ],
    questions: [],
  },

  "pyq-bank": {
    title: "PYQ Bank — Common Exam Questions",
    emoji: "📝",
    tldr: "Frequently asked questions from university exams, organized by topic. Work through these before your exam.",
    explanation: `Compiled list of high-probability exam questions for DAA Unit 1. Study these patterns.`,
    keyPoints: [
      "Proof questions: showing t(n) ∈ O/Ω/Θ(g(n)) with explicit constants",
      "Recurrence questions: solve using backward substitution",
      "Trace questions: trace sorting/searching algorithms step by step",
      "Analysis questions: derive C(n) for given pseudocode",
      "Comparison questions: compare algorithms on stability, in-place, complexity",
    ],
    formula: {
      code: `CATEGORY 1: ASYMPTOTIC NOTATION PROOFS (5–8 marks each)
─────────────────────────────────────────────────────────────
Q: Prove 5n² + 3n + 2 ∈ O(n²). [Standard proof template]
A: Choose c=10, n₀=1. For n≥1: 5n²+3n+2 ≤ 5n²+3n²+2n²=10n². ✓

Q: Prove 5n² + 3n + 2 ∈ Ω(n²).
A: Choose c=5, n₀=0. For n≥0: 5n²+3n+2 ≥ 5n². ✓

Q: Prove 5n² + 3n + 2 ∈ Θ(n²). [Combine above two]

Q: Prove n³ ∉ O(n²). [Contradiction proof]
A: Assume n³≤cn² → n≤c, contradiction for large n.

Q: Arrange in order of growth: n!, 2ⁿ, n³, n log n, log n, n, 1, n²
A: 1 < log n < n < n log n < n² < n³ < 2ⁿ < n!

─────────────────────────────────────────────────────────────
CATEGORY 2: RECURRENCE SOLVING (5–8 marks each)
─────────────────────────────────────────────────────────────
Q: Solve T(n) = T(n-1) + 1, T(0) = 0.  →  T(n) = n ∈ Θ(n)
Q: Solve T(n) = T(n-1) + n, T(0) = 0.  →  T(n) = n(n+1)/2 ∈ Θ(n²)
Q: Solve T(n) = 2T(n-1) + 1, T(0) = 0. →  T(n) = 2ⁿ-1 ∈ Θ(2ⁿ)
Q: Solve T(n) = T(n/2) + 1, T(1) = 0.  →  T(n) = log₂n ∈ Θ(log n)
Q: Solve T(n) = 2T(n/2) + n, T(1) = 1. →  T(n) = n log n ∈ Θ(n log n)

─────────────────────────────────────────────────────────────
CATEGORY 3: ALGORITHM ANALYSIS (5–10 marks each)
─────────────────────────────────────────────────────────────
Q: Analyze Selection Sort. What is C(n)?
A: C(n) = n(n-1)/2 ∈ Θ(n²). Steps: set up double summation, simplify.

Q: Analyze Matrix Multiplication. What is M(n)?
A: M(n) = n³ ∈ Θ(n³). Three nested loops each 0 to n-1.

Q: Write recurrence for Tower of Hanoi. Solve it.
A: C(n)=2C(n-1)+1, C(0)=0. Solution: C(n)=2ⁿ-1 ∈ Θ(2ⁿ).

Q: What is the average case of sequential search for p=1?
A: C_avg(n) = (n+1)/2. Use formula p(n+1)/2 + (1-p)n with p=1.

─────────────────────────────────────────────────────────────
CATEGORY 4: TRACE QUESTIONS (4–6 marks each)
─────────────────────────────────────────────────────────────
Q: Trace Selection Sort on [4, 2, 7, 1, 5].
Q: Trace Bubble Sort on [5, 3, 8, 1, 2].
Q: Trace Euclid's algorithm for gcd(48,18).
Q: Trace brute-force string match for T="ABABABC", P="ABA".
Q: Trace TSP exhaustive for 4 cities with given distance matrix.
Q: Trace Knapsack exhaustive for 3 items, W=10.

─────────────────────────────────────────────────────────────
CATEGORY 5: SHORT ANSWER / MCQ (2–3 marks each)
─────────────────────────────────────────────────────────────
Q: Is Selection Sort stable? → NO
Q: Is Bubble Sort stable? → YES
Q: What is the basic operation for matrix multiplication? → Multiplication
Q: Which notation gives both upper and lower bounds? → Θ (Theta)
Q: Tower of Hanoi for n=5 requires how many moves? → 2⁵-1 = 31
Q: What is the worst-case for sequential search? → n comparisons
Q: Knapsack with 4 items: how many subsets? → 2⁴ = 16
Q: TSP with 5 cities: how many tours? → (5-1)!/2 = 12`,
      explanation: "Memorise the proof template: find c and n₀, verify the inequality. This works for all O/Ω/Θ proofs.",
    },
    examTips: [
      "Category 1 (proofs): always state c and n₀ explicitly. Lose marks if you don't.",
      "Category 2 (recurrences): write 3 expansion steps, identify pattern, set k=n or k=log n.",
      "Category 3 (analysis): always identify input size, basic op, set up summation, simplify.",
      "Category 4 (traces): write out each step as a table. Don't skip steps.",
    ],
    questions: [
      {
        q: "What are the five IDFEO properties of an algorithm?",
        a: "I — Input: zero or more external quantities. D — Definiteness: each step is unambiguous. F — Finiteness: terminates in finite steps for all inputs. E — Effectiveness: each step is primitive and feasible. O — Output: at least one quantity produced. All five must hold for a procedure to be called an algorithm.",
      },
      {
        q: "State and prove the Addition Theorem for O notation.",
        a: "Statement: If t₁(n)∈O(g₁(n)) and t₂(n)∈O(g₂(n)), then t₁(n)+t₂(n) ∈ O(max{g₁(n),g₂(n)}). Proof: ∃c₁,n₁: t₁≤c₁g₁ for n≥n₁; ∃c₂,n₂: t₂≤c₂g₂ for n≥n₂. For n≥max{n₁,n₂}: t₁+t₂ ≤ c₁g₁+c₂g₂ ≤ (c₁+c₂)max{g₁,g₂}+(c₁+c₂)max{g₁,g₂} = 2(c₁+c₂)max{g₁,g₂}. Setting c=2(c₁+c₂): t₁+t₂ ≤ c·max{g₁,g₂}. ∴ t₁+t₂ ∈ O(max{g₁,g₂}). ✓",
      },
    ],
  },

  "common-mistakes": {
    title: "Common Exam Mistakes to Avoid",
    emoji: "⚠️",
    tldr: "The most frequent errors students make in DAA Unit 1 exams — and how to avoid them.",
    explanation: `Learn from common mistakes before the exam. These are the exact errors that cost marks.`,
    keyPoints: [
      "Proof errors: forgetting to state c and n₀ explicitly",
      "Recurrence errors: wrong base case or forgetting it entirely",
      "Analysis errors: off-by-one in loop bounds",
      "Terminology errors: confusing O/Ω/Θ properties",
      "Classification errors: calling a non-stable sort stable",
    ],
    formula: {
      code: `MISTAKE 1: Forgetting c and n₀ in asymptotic proofs
  ✗ Wrong: "5n²+3n+2 ≤ 10n² so it's O(n²)"
  ✓ Right: "Choose c=10, n₀=1. For n≥1: 5n²+3n+2 ≤ 10n². ∴ ∈ O(n²)"

MISTAKE 2: Wrong base case for recurrences
  ✗ Wrong: T(n)=T(n-1)+1 → "T(n) = n+1" (forgot M(0)=0 vs M(0)=1)
  ✓ Right: Always state the base case! M(0)=0 gives M(n)=n; M(0)=1 gives M(n)=n+1.

MISTAKE 3: Saying MaxElement has C(n)=n (should be n-1)
  ✗ Wrong: "loop runs n times so C(n)=n"
  ✓ Right: "loop runs from i=1 to n-1, so C(n) = Σᵢ₌₁ⁿ⁻¹ 1 = n-1"

MISTAKE 4: Saying Bubble Sort is always O(n²)
  ✗ Wrong: "Bubble Sort is always O(n²)"
  ✓ Right: "Without flag: always Θ(n²). With early-termination flag: best case Θ(n)."

MISTAKE 5: Saying Selection Sort is stable
  ✗ Wrong: "Selection Sort is stable because it's simple"
  ✓ Right: "Selection Sort is NOT stable — swapping non-adjacent elements can reorder equals."

MISTAKE 6: Confusing o() and O()
  ✗ Wrong: "n ∈ o(n²) because n ∈ O(n²)"
  ✓ Right: n ∈ o(n²) requires lim n/n² = 0 (which is true). n ∈ O(n²) allows limit=constant.
            But n ∉ o(n): lim n/n = 1 ≠ 0. Note that O() is weaker than o().

MISTAKE 7: Wrong Master Theorem case
  ✗ Wrong: "T(n)=2T(n/2)+n, p=log₂2=1, f=n, so it's Case 1"
  ✓ Right: f(n)=n = Θ(n¹) = Θ(nᵖ) → it's Case 2 → T(n) ∈ Θ(n log n).
           Case 1 is when f grows SLOWER than nᵖ, not equal.

MISTAKE 8: TSP tour count
  ✗ Wrong: "TSP has n! tours"
  ✓ Right: Fix start city → (n-1)! permutations. Undirected → (n-1)!/2 unique tours.

MISTAKE 9: Knapsack feasibility check
  ✗ Wrong: Adding value first, then checking weight
  ✓ Right: ALWAYS check weight ≤ W FIRST. Only count value if feasible.

MISTAKE 10: Average case formula
  ✗ Wrong: "Average case = n/2 comparisons"
  ✓ Right: C_avg = p(n+1)/2 + (1-p)n. Only equals (n+1)/2 ≈ n/2 when p=1.`,
      explanation: "Read through all 10 mistakes at least twice before your exam.",
    },
    examTips: [
      "ALWAYS state c and n₀ in proofs — 1-2 marks lost if you don't",
      "ALWAYS write the base case for recurrences — solution will be wrong without it",
      "MaxElement: n-1, NOT n comparisons",
      "Selection Sort: NOT stable. Bubble Sort: stable.",
    ],
    questions: [
      {
        q: "A student writes: 'Since 3n²+2 ≤ 3n² for all n, therefore 3n²+2 ∈ O(n²).' What is wrong with this proof?",
        a: "Two errors: (1) 3n²+2 ≤ 3n² is FALSE — adding 2 makes the left side LARGER, not smaller. The student has the inequality backwards. (2) The proof doesn't specify c and n₀. The correct proof: 3n²+2 ≤ 3n²+2n² = 5n² for all n≥1. Choose c=5, n₀=1. Then 3n²+2 ≤ 5·n² for all n≥1. ∴ 3n²+2 ∈ O(n²).",
      },
      {
        q: "A student writes the Tower of Hanoi recurrence as C(n)=2C(n-1)+1, C(1)=0. What is wrong?",
        a: "The base case is wrong. C(1)=0 would mean moving 1 disk requires 0 moves — but moving 1 disk obviously requires 1 move. The correct base case is C(1)=1 (or equivalently C(0)=0). With C(1)=0: solution would give C(n) = 2ⁿ⁻¹-1 ≠ 2ⁿ-1. With correct C(0)=0: C(n) = 2ⁿ-1. For n=1: C(1) = 2¹-1 = 1 ✓. Always verify your answer with small cases!",
      },
    ],
  },
};