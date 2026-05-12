// Design & Analysis of Algorithms — Unit 2 Data
// Topics: Decrease & Conquer, Divide & Conquer, Graph Traversals,
//         Sorting (Insertion, Merge, Quick), Strassen, Karatsuba,
//         Binary Search, Fake Coin, Josephus, Quickselect, Permutations/Subsets

export const groups = [
  {
    name: "📉 Decrease and Conquer",
    ids: ["dc-overview", "insertion-sort", "graph-traversals", "topological-sort"],
  },
  {
    name: "🔢 Generating Combinatorial Objects",
    ids: ["generating-permutations", "johnson-trotter", "generating-subsets"],
  },
  {
    name: "🔍 Decrease by Factor",
    ids: ["binary-search", "fake-coin", "russian-peasant", "josephus", "quickselect"],
  },
  {
    name: "⚔️ Divide and Conquer",
    ids: ["divide-conquer-overview", "master-theorem-u2", "mergesort", "quicksort"],
  },
  {
    name: "🌲 Tree Algorithms",
    ids: ["tree-height", "tree-traversals"],
  },
  {
    name: "🔢 Advanced Multiply",
    ids: ["strassen", "karatsuba", "exponentiation"],
  },
  {
    name: "📚 PYQ Bank & Reference",
    ids: ["u2-cheat-sheet", "u2-complexity-table", "u2-pyq-bank", "u2-common-mistakes"],
  },
];

export const topics = {

  // ─────────────────────────────────────────────
  // DECREASE AND CONQUER
  // ─────────────────────────────────────────────

  "dc-overview": {
    title: "Decrease and Conquer — Overview",
    emoji: "📉",
    tldr: "Reduce a size-n problem to a smaller instance, solve that, extend the answer back. Three types: by constant (−1), by factor (/2), by variable amount.",
    explanation: `Decrease-and-conquer is a strategy where the problem of size n is reduced to a single smaller problem — then that smaller problem is solved (recursively), and its solution is extended back to solve the original.

THREE TYPES:

DECREASE BY A CONSTANT (usually 1): Problem size reduces by exactly 1 each step.
Examples: Insertion Sort (sort n-1 first, then insert the nth), DFS/BFS (visit one vertex, recurse on rest), Topological Sort, Factorial (n! = n×(n-1)!).
Recurrence pattern: T(n) = T(n-1) + f(n). Solutions range from Θ(n) to Θ(n²).

DECREASE BY A CONSTANT FACTOR (usually 2): Problem size halves each step.
Examples: Binary Search (discard one half), Fake Coin (discard 2/3 of coins), Russian Peasant Multiplication, Exponentiation by squaring, Josephus problem.
Recurrence pattern: T(n) = T(n/b) + f(n). Solutions give Θ(log n).

VARIABLE-SIZE DECREASE: Problem size reduction is not fixed — depends on input.
Examples: Euclid's GCD (remainder varies), Quickselect (pivot position varies), Interpolation Search.
These don't fit neatly into a recurrence template.

KEY DISTINCTION — Decrease vs Divide-and-Conquer:
Decrease & Conquer → recurses on EXACTLY ONE smaller subproblem.
Divide & Conquer → recurses on MULTIPLE (≥2) smaller subproblems.

This is the critical MCQ distinction. Insertion sort is Decrease-and-Conquer; Mergesort is Divide-and-Conquer.`,
    keyPoints: [
      "Reduce to ONE smaller subproblem (vs Divide & Conquer which creates multiple)",
      "Decrease by 1: T(n)=T(n-1)+f(n). Examples: Insertion Sort, DFS, BFS",
      "Decrease by factor b: T(n)=T(n/b)+f(n). Examples: Binary Search, Fake Coin",
      "Variable decrease: Euclid's GCD, Quickselect — no fixed pattern",
      "Key exam distinction: D&C recurses on ONE sub-problem; Divide & Conquer on TWO or more",
    ],
    formula: {
      code: `Three types of Decrease and Conquer:

Type 1 — Constant decrease:     T(n) = T(n-1) + f(n)
  f(n) = 1    → T(n) = Θ(n)        [Factorial]
  f(n) = n    → T(n) = Θ(n²)       [Selection Sort recurrence]
  f(n) = n-1  → T(n) = Θ(n²)       [Insertion Sort worst case]

Type 2 — Factor decrease:        T(n) = T(n/b) + f(n)
  b=2, f(n)=1 → T(n) = Θ(log n)    [Binary Search]
  b=3, f(n)=1 → T(n) = Θ(log n)    [Fake Coin 3-way]
  b=2, f(n)=n → T(n) = Θ(n)        [Quickselect average]

Type 3 — Variable decrease:
  Euclid: gcd(m,n) = gcd(n, m mod n)   No fixed pattern
  Quickselect: depends on pivot position

Key distinction:
  Decrease & Conquer: ONE recursive call (one sub-problem)
  Divide & Conquer:   TWO+ recursive calls (multiple sub-problems)`,
      explanation: "The number of recursive calls is what distinguishes Decrease from Divide. Insertion Sort → 1 call. Mergesort → 2 calls.",
    },
    examTips: [
      "MCQ: 'Insertion Sort is an example of ___' → Decrease and Conquer (NOT Divide and Conquer)",
      "MCQ: 'Binary Search is an example of ___' → Decrease by constant factor",
      "Key: D&C makes ONE smaller subproblem; Divide & Conquer makes TWO or more",
      "Euclid's GCD = variable-size decrease (remainder varies each step)",
    ],
    questions: [
      {
        q: "What are the three types of Decrease-and-Conquer? Give one example of each.",
        a: "(1) Decrease by constant (usually 1): Insertion Sort — to sort A[0..n-1], sort A[0..n-2] first then insert A[n-1]. (2) Decrease by constant factor (usually 2): Binary Search — compare with middle element and discard half the array. (3) Variable-size decrease: Euclid's GCD — gcd(m,n) = gcd(n, m mod n), where m mod n varies each step.",
      },
      {
        q: "What is the key difference between Decrease-and-Conquer and Divide-and-Conquer?",
        a: "Decrease-and-Conquer reduces the problem to EXACTLY ONE smaller subproblem, solves it, and extends the answer. Divide-and-Conquer splits into TWO OR MORE subproblems of similar size, solves all of them independently, and combines the results. Example: Insertion Sort (D&C) makes one recursive call on A[0..n-2]. Mergesort (Divide & Conquer) makes two recursive calls, one on each half.",
      },
    ],
  },

  "insertion-sort": {
    title: "Insertion Sort",
    emoji: "📥",
    tldr: "Sort A[0..n-2] first, then insert A[n-1] in its correct position. Best Θ(n), Worst Θ(n²). In-place, stable, online.",
    explanation: `Insertion Sort embodies the Decrease-and-Conquer strategy perfectly: to sort A[0..n-1], assume A[0..n-2] is already sorted (by recursing on it), then insert the new element A[n-1] into its correct position in the sorted prefix.

ALGORITHM (iterative form):
For each i from 1 to n-1, pick A[i] as the new element. Scan backwards from position i-1, shifting all elements larger than A[i] one position right. Insert A[i] at the correct position.

Why decrease-and-conquer? The loop invariant is: A[0..i-1] is sorted. Each step extends the sorted prefix by one element — classic "decrease by 1, extend solution" pattern.

EXAMPLE — Sort [6, 4, 1, 8, 5]:
  i=1: Insert 4 into [6] → [4, 6 | 1, 8, 5]
  i=2: Insert 1 into [4,6] → [1, 4, 6 | 8, 5]
  i=3: Insert 8 into [1,4,6] → [1, 4, 6, 8 | 5]
  i=4: Insert 5 into [1,4,6,8] → [1, 4, 5, 6, 8]

ANALYSIS (basic op = comparison A[j] > v):
  Best case: array already sorted → inner while never executes → n-1 comparisons → Θ(n)
  Worst case: reverse sorted → shift all elements → C = 1+2+...+(n-1) = n(n-1)/2 → Θ(n²)
  Average case: ≈ n²/4 comparisons → Θ(n²)

PROPERTIES:
  In-place: Yes (O(1) extra space, just the variable v for current element)
  Stable: Yes (never swaps equal elements — > not ≥ in comparison)
  Online: Yes — can sort elements as they arrive (streaming)
  Adaptive: Best for nearly-sorted data

SPECIAL CASE — k-sorted arrays:
If every element is at most k positions away from its final sorted position, each insertion requires at most k shifts. Total: Θ(nk). For k=O(1), this is Θ(n) — linear!`,
    keyPoints: [
      "Decrease-and-conquer: sort A[0..n-2], then insert A[n-1] in the right place",
      "Best: Θ(n) (already sorted). Average/Worst: Θ(n²) (reverse sorted).",
      "In-place ✓, Stable ✓, Online ✓, Adaptive ✓",
      "Inner loop: shift elements right until correct position found",
      "k-sorted arrays: Θ(nk) — if each element ≤ k away from final position",
      "Outperforms O(n log n) sorts for small n or nearly-sorted data",
    ],
    formula: {
      code: `ALGORITHM InsertionSort(A[0..n-1])
for i ← 1 to n-1 do
    v ← A[i]             ← element to insert
    j ← i - 1
    while j ≥ 0 and A[j] > v do
        A[j+1] ← A[j]   ← shift right
        j ← j - 1
    A[j+1] ← v           ← insert at correct position

Recursive version:
ALGORITHM InsertionSortRec(A[0..n-1])
if n > 1
    InsertionSortRec(A[0..n-2])   ← sort smaller subproblem
    // now insert A[n-1] into sorted A[0..n-2]
    temp ← A[n-1]; j ← n-2
    while j ≥ 0 and A[j] > temp do
        A[j+1] ← A[j]; j ← j - 1
    A[j+1] ← temp

Analysis:
  Best case (sorted):    C_best  = n-1     ∈ Θ(n)
  Worst case (reverse):  C_worst = n(n-1)/2 ∈ Θ(n²)
  Average case:          C_avg   ≈ n²/4    ∈ Θ(n²)

k-sorted input: C = Θ(nk)  [each of n elements shifts at most k positions]`,
      explanation: "The comparison A[j] > v (not ≥) ensures stability — equal elements are never swapped.",
    },
    examTips: [
      "Best case = n-1 comparisons (NOT 0 or n) — the outer loop still runs",
      "Stable because inner condition is A[j] > v (strictly greater — equal stays)",
      "Worst case = reverse sorted. C_worst = 1+2+...+(n-1) = n(n-1)/2",
      "k-sorted: Θ(nk) — memorise this for MCQs",
      "Online sort: can process elements one by one without knowing future elements",
    ],
    questions: [
      {
        q: "Trace Insertion Sort on [5, 3, 8, 1, 4]. Show each pass.",
        a: "i=1: v=3, compare 5>3 → shift → [5,5,8,1,4], insert → [3,5,8,1,4]. i=2: v=8, 5<8 no shift → [3,5,8,1,4]. i=3: v=1, 8>1 shift, 5>1 shift, 3>1 shift → [1,3,5,8,4]. i=4: v=4, 8>4 shift, 5>4 shift, 3<4 stop → [1,3,4,5,8]. Total comparisons: 1+1+3+2 = 7.",
      },
      {
        q: "Why is Insertion Sort preferred over Merge Sort for small or nearly-sorted arrays?",
        a: "For small n (say n ≤ 16), Θ(n²) sorts like Insertion Sort have smaller constants than Θ(n log n) sorts — the overhead of recursive calls, memory allocation, and function calls makes Merge Sort slower in practice. For nearly-sorted arrays, Insertion Sort runs in Θ(n) (best case) because the inner while loop rarely executes. This is why Timsort and IntroSort use Insertion Sort as their base case for small subarrays.",
      },
      {
        q: "Is Insertion Sort stable? Prove it.",
        a: "Yes. The inner while loop condition is A[j] > v (strictly greater than). When A[j] = v (equal elements), the condition is false and the loop stops — the new element v is inserted AFTER all equal elements. This preserves the original relative order of equal elements. Hence Insertion Sort is stable.",
      },
      {
        q: "What is the complexity of Insertion Sort on a k-sorted array? Explain.",
        a: "Θ(nk). A k-sorted array is one where each element is at most k positions away from its final sorted position. When inserting element A[i], the inner while loop shifts at most k elements before finding the correct position. Since there are n-1 insertions and each takes at most k comparisons/shifts: total = O(nk). Lower bound: at least n-1 comparisons for the outer loop, so Ω(n). Combined: Θ(nk).",
      },
    ],
  },

  "graph-traversals": {
    title: "DFS and BFS Graph Traversals",
    emoji: "🌐",
    tldr: "DFS: go deep, backtrack (stack). BFS: level-by-level (queue). Both visit every vertex and edge once → Θ(|V|+|E|). DFS finds back edges; BFS finds shortest paths.",
    explanation: `Both DFS and BFS are Decrease-and-Conquer algorithms: to traverse a graph starting from v, traverse v's neighbors (subproblems), and extend back.

DFS — DEPTH FIRST SEARCH:
Uses a stack (explicit or implicit via recursion). At each vertex, go as deep as possible before backtracking. Generates a DFS tree (or DFS forest if graph is disconnected).

DFS procedure:
  Mark all vertices as unvisited.
  For each unvisited vertex v: call dfs(v).
  dfs(v): mark v visited. For each neighbor w: if w unvisited, call dfs(w). When all neighbors explored, v is a "dead end" — record v in the popping order.

DFS EDGES (in directed graphs):
  Tree edges: edges to unvisited vertices (part of DFS tree).
  Back edges: edges to ancestors in DFS tree. INDICATES A CYCLE.
  Cross edges: edges to vertices in different subtrees.
  Forward edges: edges to descendants.

BFS — BREADTH FIRST SEARCH:
Uses a queue. Visits all vertices at distance k from the start before any at distance k+1.

BFS procedure:
  Enqueue start vertex, mark as visited.
  While queue non-empty: dequeue vertex u. For each unvisited neighbor w: enqueue w, mark visited.

BFS TREE: All tree edges in BFS tree go from level k to level k+1. No back edges (undirected graph). BFS gives SHORTEST PATH distances from the source.

COMPLEXITY: Both are Θ(|V| + |E|) with adjacency list representation.
  Each vertex is processed once: O(|V|).
  Each edge is examined at most twice (once per endpoint): O(|E|).
  Total: O(|V| + |E|).`,
    keyPoints: [
      "DFS uses a stack (or recursion). BFS uses a queue.",
      "DFS: goes deep first, backtracks. BFS: visits all neighbors at level k before level k+1.",
      "Both: Θ(|V| + |E|) with adjacency list.",
      "DFS back edge → cycle detected. BFS gives shortest unweighted paths.",
      "DFS popping order (reversed) → topological order for DAGs.",
      "DFS forest: if graph is disconnected, DFS visits each component.",
    ],
    formula: {
      code: `DFS Pseudocode:
ALGORITHM DFS(G)
  mark all vertices as unvisited
  for each v in V do
    if v is unvisited then dfs(v)

dfs(v):
  mark v as visited
  for each w adjacent to v do
    if w is unvisited then dfs(w)
  // v becomes a dead-end here — record in popping order

BFS Pseudocode:
ALGORITHM BFS(G, s)
  mark s as visited; enqueue s
  while queue not empty do
    u ← dequeue
    for each w adjacent to u do
      if w unvisited then
        mark w visited
        enqueue w

Complexity: Θ(|V| + |E|) for BOTH (adjacency list)
  With adjacency matrix: Θ(|V|²) — must scan all rows

DFS Edge Types (directed graph):
  Tree edge:    to an unvisited vertex
  Back edge:    to an ancestor (→ cycle if found)
  Cross edge:   to a vertex in another DFS subtree
  Forward edge: to a descendant (not a tree edge)

BFS: only tree edges and cross edges (no back/forward).
BFS gives shortest PATH (minimum edges) from source.`,
      explanation: "Adjacency list gives Θ(|V|+|E|) because we only visit each edge once. Matrix forces scanning all n entries per vertex = Θ(n²).",
    },
    examTips: [
      "DFS + back edge → cycle. BFS never produces back edges for undirected graphs.",
      "BFS gives shortest path (unweighted). DFS does NOT guarantee shortest path.",
      "Complexity: Θ(V+E) for list, Θ(V²) for matrix. Know which is used.",
      "DFS popping order reversed = topological order (only for DAGs).",
    ],
    questions: [
      {
        q: "What data structure does DFS use vs BFS? How does this determine traversal order?",
        a: "DFS uses a STACK (LIFO — last in, first out), or equivalently, recursion (which uses the call stack). This means the most recently discovered vertex is explored next — leading to deep exploration before backtracking. BFS uses a QUEUE (FIFO — first in, first out). Vertices are explored in the order they were discovered, level by level. The queue ensures all vertices at distance k are processed before any at distance k+1.",
      },
      {
        q: "What is the time complexity of DFS and BFS with adjacency list vs adjacency matrix? Why?",
        a: "Adjacency list: Θ(|V|+|E|). Each vertex is visited once (O(|V|)), and each adjacency list is scanned once (total O(|E|) across all vertices). Adjacency matrix: Θ(|V|²). For each vertex, we must scan all |V| entries in its row to find neighbors, even if most are zeros. Total: |V| × |V| = |V|². For sparse graphs (|E| << |V|²), adjacency list is far more efficient.",
      },
      {
        q: "How can DFS detect cycles in a directed graph?",
        a: "During DFS, maintain the color of each vertex: WHITE (unvisited), GRAY (currently in recursion stack), BLACK (fully processed). If during dfs(v) we encounter a neighbor w that is GRAY, then w is an ancestor of v in the DFS tree — meaning there's a path from w to v (through the tree) AND an edge from v back to w. This is a BACK EDGE and confirms a directed cycle. If no back edge is found, the graph is a DAG.",
      },
    ],
  },

  "topological-sort": {
    title: "Topological Sort",
    emoji: "📋",
    tldr: "Order vertices of a DAG so every edge goes left-to-right. Two methods: DFS-based (reverse popping order) and Source Removal. Both Θ(|V|+|E|). Only possible if graph is a DAG.",
    explanation: `Topological Sort orders vertices v₁, v₂, …, vₙ of a directed graph such that for every edge (vᵢ, vⱼ), vᵢ appears before vⱼ. Think of it as ordering tasks where some must precede others.

EXISTENCE: A topological sort exists IF AND ONLY IF the graph is a DAG (Directed Acyclic Graph). Any directed cycle makes it impossible — no ordering can put all cycle members before themselves.

METHOD 1 — DFS-based:
1. Run DFS on the digraph.
2. When a vertex becomes a dead-end (all neighbors explored), append it to a list.
3. REVERSE the list → this is the topological order.

Why correct? A vertex v is popped (finished) only after ALL vertices reachable from v are finished. In the reverse, all predecessors of v come before v.

Cycle detection: if during DFS a back edge (u → ancestor) is found → no topological sort exists.

METHOD 2 — Source Removal (Kahn's algorithm):
1. Compute in-degree of all vertices.
2. Find any vertex with in-degree 0 (a "source").
3. Add it to the output, delete it and all its outgoing edges (decrement in-degree of neighbors).
4. Repeat.

If at any step there's no vertex with in-degree 0 but vertices remain → CYCLE detected.

Both methods: Θ(|V| + |E|).`,
    keyPoints: [
      "Topological sort: order vertices so every directed edge goes from earlier to later",
      "Exists ONLY for DAGs (Directed Acyclic Graphs). Cycle → impossible.",
      "Method 1: DFS, reverse the popping (finishing) order",
      "Method 2: Source Removal — repeatedly remove in-degree-0 vertices",
      "Both run in Θ(|V| + |E|)",
      "Multiple valid topological orders can exist for one graph",
    ],
    formula: {
      code: `METHOD 1 — DFS-based Topological Sort:
  1. Run DFS on G
  2. When vertex v finishes (all neighbors explored), prepend v to list
  3. Output the list (no reversal needed if prepending)

METHOD 2 — Source Removal:
ALGORITHM TopSort_SourceRemoval(G)
  Compute in-degree for each vertex
  Queue ← all vertices with in-degree 0
  while Queue not empty do
    u ← dequeue
    output u
    for each edge (u, v) do
      decrement in-degree(v)
      if in-degree(v) = 0 then enqueue v
  if output has fewer than |V| vertices → CYCLE DETECTED

Example graph edges: a→b, a→c, a→f, b→e, b→g, d→a, d→b, d→c, d→g, e→g, f→g

DFS popping order: g, e, b, c, f, a, d
Topological order (reversed): d → a → f → c → b → e → g

Source Removal: d (in-degree 0 first), then a, then b/c/f, then e, then g
Result: d, a, b, c, f, e, g  (one valid ordering)

Both are valid topological orderings.`,
      explanation: "Source Removal is often easier to trace manually. DFS-based is more elegant for implementation.",
    },
    examTips: [
      "DFS method: popping order = REVERSE of topological order",
      "Source Removal: start with in-degree 0 vertices only",
      "If at any point no source exists → cycle → no topological sort",
      "Multiple valid orderings exist for most DAGs — both methods give valid answers",
      "Complexity: Θ(V+E) for both methods",
    ],
    questions: [
      {
        q: "Why can a topological sort only exist for a DAG? Prove by contradiction.",
        a: "Suppose G has a directed cycle v₁ → v₂ → ... → vₖ → v₁. In any topological ordering, for edge (vᵢ, vᵢ₊₁), vᵢ must come before vᵢ₊₁. Following the cycle: v₁ before v₂ before ... before vₖ before v₁. But this means v₁ must come before v₁ — a contradiction. Hence no topological sort exists when a cycle is present. Conversely, every DAG has at least one source (a vertex with in-degree 0), which can always be placed first, leading to a valid ordering by induction.",
      },
      {
        q: "Apply source-removal topological sort to: vertices {A,B,C,D,E}, edges A→C, B→C, B→D, C→E, D→E.",
        a: "In-degrees: A=0, B=0, C=2, D=1, E=2. Sources: {A, B}. Remove A: C's in-degree → 1. Output: A. Remove B: C's in-degree → 0, D's in-degree → 0. Output: A,B. Remove C (or D, both in-degree 0): say C. E's in-degree → 1. Output: A,B,C. Remove D: E's in-degree → 0. Output: A,B,C,D. Remove E. Output: A,B,C,D,E. ✓ Valid topological ordering.",
      },
      {
        q: "Why does the DFS-based method reverse the popping order to get topological order?",
        a: "When DFS finishes vertex v (pops it from stack), all vertices reachable from v have already been finished and popped. In the topological ordering, v must appear BEFORE all vertices it has edges to. Since those vertices are already in the popped list when v is popped, v should appear BEFORE them in the final order. The popping order has v AFTER its successors — so reversing gives v BEFORE its successors, which is exactly topological order.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // GENERATING COMBINATORIAL OBJECTS
  // ─────────────────────────────────────────────

  "generating-permutations": {
    title: "Generating Permutations — Lexicographic Order",
    emoji: "🔀",
    tldr: "Find next permutation in lex order: scan right for first descent, swap with next larger, reverse suffix. O(n) per permutation, Θ(n·n!) total.",
    explanation: `Generating all n! permutations in lexicographic (dictionary) order is a classic decrease-and-conquer problem. Given the current permutation, find the next one.

ALGORITHM — Next Lexicographic Permutation:

Given permutation a₁a₂…aₙ:
STEP 1: Scan from right, find the largest index i such that aᵢ < aᵢ₊₁.
  - If no such i exists: this is the LAST permutation (a₁a₂…aₙ is descending).

STEP 2: Scan from right again, find the largest j > i such that aⱼ > aᵢ.
  (The suffix aᵢ₊₁…aₙ is in descending order, so the first aⱼ > aᵢ from the right is the smallest element larger than aᵢ in the suffix.)

STEP 3: Swap aᵢ ↔ aⱼ.

STEP 4: Reverse the suffix aᵢ₊₁…aₙ.
  (It was in descending order; reversing it gives the smallest arrangement of that suffix.)

EXAMPLE — Next permutation after [1, 3, 4, 2]:
Step 1: Scan right: a₃=4 > a₄=2 (no, decreasing); a₂=3 < a₃=4 → i=2.
Step 2: Scan right for aⱼ > a₂=3: a₄=2? No. a₃=4? Yes → j=3.
Step 3: Swap a₂ ↔ a₃ → [1, 4, 3, 2].
Step 4: Reverse suffix from position 3: [3,2] → [2,3] → [1, 4, 2, 3]. ✓

COMPLEXITY: O(n) per step. Generating all n! permutations: Θ(n·n!).`,
    keyPoints: [
      "Find the rightmost 'descent': largest i where aᵢ < aᵢ₊₁",
      "Find the next larger element in the suffix: largest j>i where aⱼ > aᵢ",
      "Swap aᵢ and aⱼ, then reverse the suffix aᵢ₊₁…aₙ",
      "O(n) per permutation, Θ(n·n!) to generate all",
      "Works for any alphabet, not just integers",
      "No 'i' found → current permutation is the last one (fully descending)",
    ],
    formula: {
      code: `ALGORITHM NextPermutation(A[1..n])
// Find rightmost ascent position i
i ← n - 1
while i > 0 and A[i] ≥ A[i+1] do i ← i - 1
if i = 0 return "last permutation"

// Find rightmost element > A[i] in suffix
j ← n
while A[j] ≤ A[i] do j ← j - 1

// Swap and reverse
swap A[i] ↔ A[j]
reverse A[i+1..n]
return A

Trace: [1, 2, 3, 4] → [1, 2, 4, 3] → [1, 3, 2, 4] → [1, 3, 4, 2] → [1, 4, 2, 3] → ...

Example step: [1, 4, 3, 5, 2]
  i: 5>2 no, 3<5 yes → i=3 (A[3]=3)
  j: rightmost > 3 in [5,2]: j=4 (A[4]=5)
  Swap A[3]↔A[4]: [1, 4, 5, 3, 2]
  Reverse suffix A[4..5]=[3,2] → [2,3]: [1, 4, 5, 2, 3]

Total permutations of n elements: n!
Total time to generate all: Θ(n · n!)`,
      explanation: "The suffix after position i is always in descending order — reversing it gives the smallest possible suffix arrangement.",
    },
    examTips: [
      "Four steps: find i (rightmost ascent), find j (rightmost > A[i]), swap, reverse suffix",
      "Suffix is ALWAYS descending at the point of swap — reversing gives ascending (minimum arrangement)",
      "If no i exists: it's the last permutation (entire array is descending)",
      "Time per step: O(n). All n!: Θ(n·n!).",
    ],
    questions: [
      {
        q: "Find the next permutation in lex order after [3, 4, 6, 5, 2, 1].",
        a: "Step 1: scan right for largest i where A[i] < A[i+1]. Check: 2<1? No. 5<2? No. 6<5? No. 4<6? YES → i=2 (A[2]=4). Step 2: scan right for largest j>2 where A[j]>4. Check A[6]=1 no, A[5]=2 no, A[4]=5 yes → j=4 (A[4]=5). Step 3: swap A[2]↔A[4] → [3, 5, 6, 4, 2, 1]. Step 4: reverse A[3..6]=[6,4,2,1]→[1,2,4,6] → [3, 5, 1, 2, 4, 6]. ✓",
      },
      {
        q: "How many permutations of {1,2,3} are there? List them in lex order.",
        a: "3! = 6 permutations: [1,2,3] → [1,3,2] → [2,1,3] → [2,3,1] → [3,1,2] → [3,2,1]. Each step: find rightmost ascent, swap with next-larger, reverse suffix. Last permutation [3,2,1] has no rightmost ascent (fully descending).",
      },
    ],
  },

  "johnson-trotter": {
    title: "Johnson-Trotter Algorithm",
    emoji: "↔️",
    tldr: "Generate all n! permutations with exactly one adjacent swap between consecutive permutations. Track direction (←/→) for each element. Swap the largest mobile element.",
    explanation: `The Johnson-Trotter algorithm generates all n! permutations such that consecutive permutations differ by exactly ONE adjacent transposition (swap of neighboring elements). This is useful when updating a quantity (like TSP tour cost) incrementally — you only need to account for one swap.

SETUP:
Each element has a DIRECTION: → (right) or ← (left). Initially all elements point LEFT (←).
Starting permutation: 1 2 3 … n, all pointing left.

MOBILE ELEMENT: An element k is MOBILE if its arrow points to an adjacent element that is SMALLER than k.
  - k pointing ← is mobile if the element to its LEFT is smaller.
  - k pointing → is mobile if the element to its RIGHT is smaller.

ALGORITHM:
  While any mobile element exists:
    1. Find the LARGEST mobile element k.
    2. Swap k with the adjacent element in the direction its arrow points.
    3. Reverse the direction of ALL elements LARGER than k.

WHY reverse larger elements? After swapping k, elements larger than k may now be "blocked" on the other side — flipping their direction prepares them for future swaps.

EXAMPLE (n=3): Start: ←1 ←2 ←3
  ←3 is mobile (←, left neighbor ←2 < ←3). Largest mobile = 3.
  Swap 3 left: ←1 ←3 ←2. No elements > 3. → State: ←1 ←3 ←2
  ←3 still mobile (left neighbor 1 < 3). Swap 3 left: ←3 ←1 ←2. → State: ←3 ←1 ←2
  ←3 not mobile (no left neighbor). ←2 not mobile (←, left neighbor 1 < 2 — wait, is 1 < 2? yes so 2 IS mobile). Swap 2 left: ←3 ←2 ←1. Reverse direction of elements > 2 (i.e., 3): →3. → State: →3 ←2 ←1
  →3 is mobile (→, right neighbor — none!). ←2 mobile? left neighbor 3>2 no. Actually: →3 left, →3 right is ←1. Right neighbor 1 < 3, so →3 IS mobile. Swap 3 right: ←2 →3 ←1. Reverse >3? None. → State: ←2 →3 ←1
  Continue until no mobile element → 3! = 6 permutations generated.`,
    keyPoints: [
      "Each element has a direction (← or →). All start pointing ←.",
      "Mobile: element k whose arrow points to an adjacent SMALLER element",
      "Each step: swap the LARGEST mobile element in its direction",
      "After swap: reverse direction of ALL elements LARGER than swapped element",
      "Generates all n! permutations with exactly one adjacent swap between any two",
      "Useful for incremental updates (e.g., TSP cost update after one swap)",
    ],
    formula: {
      code: `ALGORITHM JohnsonTrotter(n)
Initialize: 1←  2←  3← ... n←  (all pointing left)
Output first permutation

while any mobile element exists do
    k ← largest mobile element
    swap k with neighbor in direction of k's arrow
    reverse direction of all elements > k
    output current permutation

Mobility check:
  Element k at position p with direction ←:
    Mobile if p > 1 and element at p-1 < k
  Element k at position p with direction →:
    Mobile if p < n and element at p+1 < k

n=3 full trace:
  ←1 ←2 ←3   →   ←1 ←3 ←2   →   ←3 ←1 ←2
  →   ←3 ←2 ←1   →   ←2 →3 ←1   →   ←2 ←1 →3

  Permutations: 123, 132, 312, 321, 231, 213 (all 3!=6 generated)

Key property: consecutive permutations differ by exactly 1 adjacent swap.`,
      explanation: "The direction reversal ensures that larger elements will eventually become mobile again after smaller elements are swapped.",
    },
    examTips: [
      "Track arrows carefully — largest mobile, swap in arrow direction, flip larger elements",
      "Mobile = arrow points to SMALLER neighbor",
      "Reverse direction of ALL elements GREATER than the swapped element (not equal)",
      "Advantage: consecutive permutations differ by exactly 1 adjacent swap",
    ],
    questions: [
      {
        q: "Apply Johnson-Trotter for n=3. List all 6 permutations with directions at each step.",
        a: "Start: ←1 ←2 ←3. Largest mobile: 3 (←, left neighbor 2 < 3). Swap: ←1 ←3 ←2. Reverse >3: none. | Mobile: 3 (←, left neighbor 1 < 3). Swap: ←3 ←1 ←2. Reverse >3: none. | Mobile: 2 (←, left neighbor 1 < 2) and 3 not mobile (no left). Largest = 2. Swap: ←3 ←2 ←1. Reverse >2: 3 becomes →3. | →3 mobile? Right neighbor is ←1, 1<3 yes. Swap 3 right: →3 ←2 ←1 wait — ←3 ←2 ←1 → after swap and reverse: →3 ←2 ←1 → wait... Resulting permutations: 123, 132, 312, 321, 231, 213.",
      },
      {
        q: "What is the advantage of Johnson-Trotter over lexicographic permutation generation?",
        a: "Johnson-Trotter generates consecutive permutations with EXACTLY ONE adjacent swap. This means if you're computing a quantity on each permutation (like TSP tour length), you only need to update for the one swapped pair — O(1) update per permutation instead of O(n). Lexicographic order may produce consecutive permutations that differ in many positions, requiring O(n) re-computation. Johnson-Trotter is preferred when incremental updates are expensive.",
      },
    ],
  },

  "generating-subsets": {
    title: "Generating Subsets",
    emoji: "🔢",
    tldr: "2ⁿ subsets of n elements. Decrease-by-1: subsets of {a₁..aₙ} = subsets of {a₁..aₙ₋₁} ∪ those subsets + {aₙ}. Bit-string: each subset ↔ n-bit binary number.",
    explanation: `Generating all subsets of {a₁, a₂, …, aₙ} is a classic decrease-by-1 problem.

DECREASE-BY-1 APPROACH:
To generate all subsets of {a₁, a₂, …, aₙ}:
1. Generate all subsets of {a₁, a₂, …, aₙ₋₁} (recursive subproblem of size n-1).
2. Form new subsets by adding aₙ to EACH of those subsets.
3. The full collection = old subsets ∪ new subsets.

Example for {a, b, c}:
  Subsets of {a,b}: {}, {a}, {b}, {a,b} → 4 subsets
  Add c to each: {c}, {a,c}, {b,c}, {a,b,c} → 4 new subsets
  All subsets of {a,b,c}: {}, {a}, {b}, {a,b}, {c}, {a,c}, {b,c}, {a,b,c} → 8 = 2³

COMPLEXITY: Θ(2ⁿ) — there are exactly 2ⁿ subsets.

BIT-STRING METHOD:
Establish a 1-to-1 correspondence: n-bit binary string b₁b₂…bₙ ↔ subset where element aᵢ is included iff bᵢ = 1.
  000 ↔ {}   001 ↔ {a₃}   010 ↔ {a₂}   011 ↔ {a₂,a₃}   etc.
This makes generating subsets equivalent to counting from 0 to 2ⁿ - 1 in binary.

BINARY REFLECTED GRAY CODE:
A sequence of 2ⁿ bit strings where consecutive strings differ in EXACTLY ONE BIT position. This corresponds to adding or removing EXACTLY ONE ELEMENT between consecutive subsets — useful for incremental computations.
  000 → 001 → 011 → 010 → 110 → 111 → 101 → 100
  {}    {c}  {b,c}  {b}  {a,b} {a,b,c} {a,c} {a}

SQUASHED ORDER: When listing subsets of {a₁,…,aₙ}, all subsets involving aⱼ are listed only AFTER all subsets of {a₁,…,aⱼ₋₁}.`,
    keyPoints: [
      "2ⁿ subsets of n elements. Decrease-by-1: subsets(n) = subsets(n-1) ∪ {subsets(n-1) + aₙ}",
      "Bit-string: aᵢ included iff bit i = 1. Enumerate 0 to 2ⁿ-1.",
      "Gray Code: consecutive subsets differ by exactly 1 element (add or remove one)",
      "Squashed order: subsets with aⱼ listed after all subsets of {a₁..aⱼ₋₁}",
      "Total: 2ⁿ subsets → Θ(2ⁿ) to generate all",
    ],
    formula: {
      code: `Decrease-by-1 subset generation:
  Subsets({a,b,c}):
    Subsets({a,b}) = {∅, {a}, {b}, {a,b}}
    Add c: {{c}, {a,c}, {b,c}, {a,b,c}}
    All: {∅, {a}, {b}, {a,b}, {c}, {a,c}, {b,c}, {a,b,c}}

Bit string mapping (n=3, elements = {a₁, a₂, a₃}):
  000 = {}      100 = {a₁}
  001 = {a₃}    101 = {a₁,a₃}
  010 = {a₂}    110 = {a₁,a₂}
  011 = {a₂,a₃} 111 = {a₁,a₂,a₃}

Binary Reflected Gray Code (n=3):
  000 → 001 → 011 → 010 → 110 → 111 → 101 → 100
  Each consecutive pair differs in exactly 1 bit position.

Construction rule for Gray Code:
  G(1) = [0, 1]
  G(n) = [0 + G(n-1), 1 + reverse(G(n-1))]
  e.g., G(2) = [00, 01, 11, 10]`,
      explanation: "Gray Code is optimal for incremental computation — you add or remove exactly one element between consecutive subsets.",
    },
    examTips: [
      "Number of subsets = 2ⁿ always. Total generation time = Θ(2ⁿ)",
      "Bit string method: bit i = 1 → aᵢ included. Enumerate 0 to 2ⁿ-1.",
      "Gray Code: consecutive subsets differ in exactly 1 element",
      "MCQ: 'How many subsets does {1,2,3,4} have?' → 2⁴ = 16",
    ],
    questions: [
      {
        q: "List all subsets of {1, 2, 3} using the decrease-by-1 approach. Show the construction.",
        a: "Base: Subsets({1}) = {∅, {1}}. Add 2: {∅, {1}, {2}, {1,2}}. Add 3: take all 4, add 3 to each: {3}, {1,3}, {2,3}, {1,2,3}. All 8 subsets: {∅, {1}, {2}, {1,2}, {3}, {1,3}, {2,3}, {1,2,3}} = 2³ = 8 subsets. ✓",
      },
      {
        q: "What is the Binary Reflected Gray Code? Why is it useful for generating subsets?",
        a: "Binary Reflected Gray Code is a sequence of all 2ⁿ binary strings of length n where consecutive strings differ in exactly ONE bit position. Example for n=2: 00→01→11→10. In terms of subsets, each step adds or removes exactly one element. This is useful when computing something on each subset that can be updated incrementally (e.g., sum of elements): when one element is added/removed, update the sum in O(1) rather than recomputing from scratch in O(n).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // DECREASE BY FACTOR
  // ─────────────────────────────────────────────

  "binary-search": {
    title: "Binary Search",
    emoji: "🔎",
    tldr: "Compare key with middle element, discard half. Worst: ⌊log₂n⌋+1 ∈ Θ(log n). Requires sorted array. Classic decrease-by-factor-2.",
    explanation: `Binary search is the prototypical decrease-by-constant-factor algorithm. On each step, the problem size exactly halves by discarding the half that cannot contain the key.

PRECONDITION: The array must be SORTED in non-decreasing order.

ALGORITHM:
Compare K with the middle element A[m] where m = ⌊(l+r)/2⌋:
  K = A[m]: found! Return m.
  K < A[m]: key must be in left half → search A[l..m-1].
  K > A[m]: key must be in right half → search A[m+1..r].
  l > r: key not in array → return -1.

ANALYSIS:
  Best case: K = A[m] on first comparison → 1 comparison → Θ(1).
  Worst case: key not found or found at very end.
    Recurrence: C_worst(n) = C_worst(⌊n/2⌋) + 1, C_worst(1) = 1.
    Solution (n = 2ᵏ): C_worst = k + 1 = log₂n + 1.
    General: C_worst(n) = ⌊log₂n⌋ + 1 ∈ Θ(log n).
  Average case: C_avg(n) ≈ log₂n ∈ Θ(log n).

PRACTICAL INSIGHT: n = 10⁶ → at most 20 comparisons! n = 10⁹ → at most 30.

IMPORTANT: Binary search can only be applied to a sorted array. For unsorted arrays, must use sequential search O(n).`,
    keyPoints: [
      "Requires sorted array. Compare with middle, discard one half.",
      "Worst case: ⌊log₂n⌋ + 1 comparisons ∈ Θ(log n)",
      "Best case: 1 comparison (Θ(1)) — key is exactly at middle",
      "Average case: ≈ log₂n ∈ Θ(log n)",
      "Recurrence: C(n) = C(⌊n/2⌋) + 1, C(1) = 1 → C(n) = ⌊log₂n⌋ + 1",
      "n=10⁶ needs at most 20 comparisons — extremely efficient",
    ],
    formula: {
      code: `Iterative Binary Search:
ALGORITHM BinarySearch(A[0..n-1], K)
l ← 0; r ← n-1
while l ≤ r do
    m ← ⌊(l + r) / 2⌋
    if A[m] = K return m
    else if A[m] < K then l ← m + 1
    else r ← m - 1
return -1

Recursive Binary Search:
ALGORITHM BinarySearchRec(A[l..r], K)
if l > r return -1
m ← ⌊(l + r) / 2⌋
if K = A[m] return m
else if K < A[m] return BinarySearchRec(A[l..m-1], K)
else return BinarySearchRec(A[m+1..r], K)

Worst-case recurrence: C(n) = C(⌊n/2⌋) + 1, C(1) = 1
Solving (n=2ᵏ): C(2ᵏ) = C(2ᵏ⁻¹)+1 = ... = C(1)+k = 1+k = 1+log₂n

General: C_worst(n) = ⌊log₂n⌋ + 1

Comparison table (n vs max comparisons):
  n = 10     → 4 comparisons
  n = 100    → 7 comparisons
  n = 1,000  → 10 comparisons
  n = 10⁶   → 20 comparisons
  n = 10⁹   → 30 comparisons`,
      explanation: "Each step reduces the search space by half. After k steps, size = n/2ᵏ. When n/2ᵏ = 1 → k = log₂n steps.",
    },
    examTips: [
      "Worst case: ⌊log₂n⌋ + 1. This is also written as ⌈log₂(n+1)⌉.",
      "Recurrence: C(n)=C(n/2)+1, C(1)=1. Solve with n=2ᵏ substitution.",
      "Array must be SORTED — if not sorted, binary search is invalid",
      "Both iterative and recursive versions — iterative uses less stack space",
    ],
    questions: [
      {
        q: "Trace binary search for K=7 in A=[1,3,5,7,9,11,13]. How many comparisons?",
        a: "n=7, l=0, r=6. Step 1: m=3, A[3]=7. K=7=A[3] → FOUND at index 3. Comparisons: 1. This is the best case — key is exactly at the middle.",
      },
      {
        q: "Trace binary search for K=6 in A=[1,3,5,7,9,11,13]. How many comparisons?",
        a: "n=7, l=0, r=6. Step 1: m=3, A[3]=7. 6<7 → r=2. Step 2: m=1, A[1]=3. 6>3 → l=2. Step 3: m=2, A[2]=5. 6>5 → l=3. Now l=3 > r=2 → return -1 (not found). Comparisons: 3 = ⌊log₂7⌋+1 = 3. ✓",
      },
      {
        q: "Derive the worst-case complexity of binary search: C_worst(n) = ⌊log₂n⌋+1.",
        a: "Recurrence: C_worst(n) = C_worst(⌊n/2⌋) + 1 (one comparison per step, search space halves), C_worst(1) = 1 (one comparison for size 1). For n = 2ᵏ: C(2ᵏ) = C(2ᵏ⁻¹)+1 = C(2ᵏ⁻²)+2 = ... = C(1)+k = 1+k. Since k = log₂n: C(2ᵏ) = 1+log₂n. For general n: ⌊log₂n⌋ + 1 (the floor accounts for non-power-of-2 inputs). This is Θ(log n).",
      },
    ],
  },

  "fake-coin": {
    title: "Fake Coin Problem",
    emoji: "🪙",
    tldr: "One lighter coin among n. Decrease-by-2 needs ⌈log₂n⌉ weighings. Decrease-by-3 needs ⌈log₃n⌉. The 3-way method is ≈1.585× more efficient.",
    explanation: `Given n identical-looking coins where exactly one is lighter (the fake), identify it using a balance scale. This is a classic decrease-by-factor problem.

METHOD 1 — DECREASE BY FACTOR 2:
Divide n coins into two equal groups. Weigh them.
The lighter group contains the fake. Recurse on that group.
If n is odd, set one coin aside; if the two groups balance → the set-aside coin is fake.

Recurrence: W(n) = W(⌊n/2⌋) + 1, W(1) = 0.
Solution: W(n) = ⌈log₂n⌉ weighings.

METHOD 2 — DECREASE BY FACTOR 3 (OPTIMAL):
Divide n coins into three groups of ⌊n/3⌋ (approximately).
Weigh group 1 vs group 2.
  Group 1 lighter → fake in group 1. Group 2 lighter → fake in group 2. Balanced → fake in group 3.
Recurse on the identified group of ~n/3 coins.

Recurrence: W(n) = W(⌈n/3⌉) + 1, W(1) = 0.
Solution: W(n) = ⌈log₃n⌉ weighings.

WHY IS FACTOR-3 BETTER?
A balance scale has 3 possible outcomes: left lighter, right lighter, balanced. The factor-2 method uses only 2 outcomes per weighing, wasting the balanced outcome. The factor-3 method uses all 3 outcomes, extracting maximum information (log₃ bits per weighing vs log₂ bits for factor-2).

Speedup ratio: W₂(n)/W₃(n) = ⌈log₂n⌉/⌈log₃n⌉ = log₃2 ≈ 1.585.
The 3-way method is ≈1.585× fewer weighings.

INFORMATION-THEORETIC LOWER BOUND: To identify 1 fake among n coins, we need to distinguish n possibilities. Each 3-outcome weighing can resolve at most 3ᵏ possibilities in k weighings. Minimum: ⌈log₃n⌉ weighings. The factor-3 method achieves this — it is OPTIMAL.`,
    keyPoints: [
      "Factor-2: W(n) = ⌈log₂n⌉ weighings. Two-pile comparison.",
      "Factor-3: W(n) = ⌈log₃n⌉ weighings. Three-pile comparison — OPTIMAL.",
      "Speedup: factor-2/factor-3 = log₃2 ≈ 1.585",
      "Balance scale has 3 outcomes — factor-3 uses all 3, factor-2 wastes one",
      "Factor-3 is information-theoretically optimal",
      "If n odd in factor-2: set one coin aside — it's fake if both groups balance",
    ],
    formula: {
      code: `Factor-2 algorithm:
ALGORITHM FakeCoin2(coins[1..n])
if n = 1 return coins[1]
if n is odd: set aside coins[n]; n ← n-1
Weigh coins[1..n/2] vs coins[n/2+1..n]
if left lighter: return FakeCoin2(coins[1..n/2])
if right lighter: return FakeCoin2(coins[n/2+1..n])
if balanced: return coins[n+1]  // the set-aside coin

Recurrence: W(n) = W(⌊n/2⌋) + 1, W(1) = 0
Solution: W(n) = ⌈log₂n⌉

Factor-3 algorithm:
ALGORITHM FakeCoin3(coins[1..n])
if n = 1 return coins[1]
k ← ⌊n/3⌋
pileA ← coins[1..k]; pileB ← coins[k+1..2k]; pileC ← coins[2k+1..n]
Weigh pileA vs pileB
if balanced:    return FakeCoin3(pileC)
if A lighter:   return FakeCoin3(pileA)
if B lighter:   return FakeCoin3(pileB)

Recurrence: W(n) = W(⌈n/3⌉) + 1, W(1) = 0
Solution: W(n) = ⌈log₃n⌉

Comparison for n=27:
  Factor-2: ⌈log₂27⌉ = ⌈4.75⌉ = 5 weighings
  Factor-3: ⌈log₃27⌉ = 3 weighings
  Speedup: 5/3 ≈ 1.667 (close to theoretical 1.585)`,
      explanation: "Each weighing with 3 outcomes eliminates 2/3 of candidates. With 2 outcomes it only eliminates 1/2.",
    },
    examTips: [
      "Factor-2: ⌈log₂n⌉. Factor-3: ⌈log₃n⌉. Always ceiling, not floor.",
      "Speedup = log₃2 ≈ 1.585 (ratio of weighings needed)",
      "Factor-3 is optimal because balance scale has exactly 3 outcomes",
      "MCQ: n=9 coins, factor-3 → ⌈log₃9⌉ = 2 weighings. Factor-2 → ⌈log₂9⌉ = 4.",
    ],
    questions: [
      {
        q: "How many weighings does the factor-3 method need for n=81 coins? Compare with factor-2.",
        a: "Factor-3: ⌈log₃81⌉ = ⌈4⌉ = 4 weighings (since 3⁴=81). Factor-2: ⌈log₂81⌉ = ⌈6.34⌉ = 7 weighings. Speedup: 7/4 = 1.75. The factor-3 method saves 3 weighings out of 7 — a 43% reduction.",
      },
      {
        q: "Why is the 3-way fake coin algorithm information-theoretically optimal?",
        a: "Information-theoretic lower bound: we need to identify 1 fake among n coins → n distinct outcomes. Each weighing with a balance scale has 3 possible outcomes (left lighter, right lighter, balanced). After k weighings, at most 3ᵏ outcomes can be distinguished. We need 3ᵏ ≥ n → k ≥ log₃n → minimum k = ⌈log₃n⌉ weighings. The factor-3 algorithm uses exactly ⌈log₃n⌉ weighings, matching this lower bound — hence it is optimal.",
      },
    ],
  },

  "russian-peasant": {
    title: "Russian Peasant Multiplication",
    emoji: "🇷🇺",
    tldr: "Compute n×m using only halving, doubling, and addition. If n is odd, add m to result; then halve n, double m. Θ(log n) steps. Decrease-by-factor-2.",
    explanation: `Russian Peasant Multiplication computes the product n × m using only halving (of n), doubling (of m), and addition — no actual multiplication. It's equivalent to binary multiplication.

MATHEMATICAL BASIS:
  n × m = (n/2) × (2m)           if n is even
  n × m = ((n-1)/2) × (2m) + m  if n is odd

This is classic decrease-by-factor-2: n halves each step.

ITERATIVE ALGORITHM:
  result ← 0
  While n > 0:
    If n is odd: add m to result
    Double m (m ← 2m)
    Halve n (n ← ⌊n/2⌋)
  Return result

WHY IT WORKS: This is exactly binary multiplication. At step i, m has been doubled i times (m = original_m × 2ⁱ). n decreases by halving. A bit of n contributes to the result iff that bit is 1. This is exactly evaluating n in binary: n = Σ bᵢ × 2ⁱ, so n × m = Σ bᵢ × (m × 2ⁱ).

EXAMPLE — 50 × 65:
  n=50 (even): m=65 → 130, n=25
  n=25 (odd): result += 130 → result=130, m→260, n=12
  n=12 (even): m→520, n=6
  n=6 (even): m→1040, n=3
  n=3 (odd): result += 1040 → result=1170, m→2080, n=1
  n=1 (odd): result += 2080 → result=3250, m→4160, n=0
  Return 3250 = 50×65 ✓

COMPLEXITY: Θ(log n) steps (n halves each time), each step O(1) → total Θ(log n).`,
    keyPoints: [
      "Multiply n×m using halving n, doubling m, adding m when n is odd",
      "Based on: n×m = (n/2)×(2m) if even; = ((n-1)/2)×(2m)+m if odd",
      "This is binary multiplication — each bit of n contributes m×2ⁱ",
      "Decrease-by-factor-2: n halves each step → Θ(log n) total",
      "Only uses halving, doubling, addition — no actual multiplication (useful for hardware)",
    ],
    formula: {
      code: `Iterative Algorithm:
ALGORITHM RussianPeasant(n, m)
result ← 0
while n > 0 do
    if n is odd then result ← result + m
    m ← 2 * m         ← doubling
    n ← ⌊n / 2⌋       ← halving
return result

Recursive Algorithm:
ALGORITHM Multiply(n, m)
if n = 1 return m
if n is odd return m + Multiply((n-1)/2, 2*m)
else return Multiply(n/2, 2*m)

Recurrence: M(n) = M(n/2) + O(1) → Θ(log n)

Example trace: 50 × 65
  n  │ m    │ n odd? │ result
  ───┼──────┼────────┼───────
  50 │ 65   │ No     │ 0
  25 │ 130  │ Yes    │ 130
  12 │ 260  │ No     │ 130
  6  │ 520  │ No     │ 130
  3  │ 1040 │ Yes    │ 1170
  1  │ 2080 │ Yes    │ 3250
  0  │ 4160 │ —      │ 3250 ✓

Connection to binary: 50 = 110010₂
  Odd at positions (from right, 0-indexed): 1, 4 → contributions: 130×1 + 1040×1 + 2080×1 = 3250 ✓`,
      explanation: "The algorithm works because each time n is odd, the current m (= original_m × 2^step) contributes to the product.",
    },
    examTips: [
      "Trace as a table: n column halves, m column doubles, add m to result when n is odd",
      "Final result = sum of m values where n was odd",
      "Θ(log n) — n halves each step",
      "MCQ: Why only halving/doubling/addition? → Useful for hardware (bit shifts + addition)",
    ],
    questions: [
      {
        q: "Use Russian Peasant Multiplication to compute 35 × 24. Show the table.",
        a: "n=35, m=24. n=35 odd: result+=24=24, m→48, n→17. n=17 odd: result+=48=72, m→96, n→8. n=8 even: m→192, n→4. n=4 even: m→384, n→2. n=2 even: m→768, n→1. n=1 odd: result+=768=840, m→1536, n→0. Return 840. Check: 35×24=840 ✓",
      },
      {
        q: "Explain how Russian Peasant Multiplication relates to binary representation.",
        a: "The algorithm is exactly binary multiplication. At step i (starting from 0), m has been doubled i times to become m×2ⁱ. The condition 'n is odd' is equivalent to checking if bit i of n is 1 (since n halves each step, each check examines the next bit). When n is odd, we add m×2ⁱ to the result. The final result = Σ bᵢ×m×2ⁱ = m × Σ bᵢ×2ⁱ = m×n, where bᵢ are the binary digits of n.",
      },
    ],
  },

  "josephus": {
    title: "Josephus Problem",
    emoji: "⭕",
    tldr: "n people in circle, every 2nd eliminated. Find survivor J(n). Recurrence: J(2k)=2J(k)−1, J(2k+1)=2J(k)+1. Elegant: J(n) = 1-bit cyclic left shift of n in binary.",
    explanation: `n people stand in a circle numbered 1 to n. Starting from person 1, every second person is eliminated until one survivor remains. J(n) gives the position of the survivor.

DECREASE-BY-FACTOR-2 APPROACH:
After the first full pass through the circle, every second person is eliminated. Half the people remain, renumbered.

  n = 2k (even): After first pass, k people remain in positions 2,4,6,...,2k. They renumber to 1,2,...,k starting from what was position 3. J(2k) = 2·J(k) - 1.
  n = 2k+1 (odd): Person 1 is eliminated at the end of the first pass. Similar analysis: J(2k+1) = 2·J(k) + 1.
  Base case: J(1) = 1.

COMPUTING EXAMPLES:
  J(6) = 2k=6, k=3 → J(6) = 2·J(3) - 1. J(3) = 2k+1=3, k=1 → J(3) = 2·J(1)+1 = 2+1 = 3. So J(6) = 2×3-1 = 5.
  J(7) = 2k+1=7, k=3 → J(7) = 2·J(3)+1 = 2×3+1 = 7.

ELEGANT CLOSED FORM — 1-BIT CYCLIC LEFT SHIFT:
If n in binary is 1b_{k-1}b_{k-2}…b₁b₀ (leading 1 followed by bits), then:
J(n) = b_{k-1}b_{k-2}…b₁b₀1 (move the leading 1 to the rightmost position)

Examples:
  J(6) = J(110₂) → 101₂ = 5. ✓
  J(7) = J(111₂) → 111₂ = 7. ✓
  J(10) = J(1010₂) → 0101₂... wait: 1010 → shift: 0101 = 5? Let's verify: J(10) = 2J(5)-1. J(5)=2J(2)+1=2(2J(1)-1)+1=2(1)+1=3. J(10)=2×3-1=5. Binary: J(1010₂)= cyclic left shift = 0101₂=5. ✓`,
    keyPoints: [
      "J(2k) = 2·J(k) - 1 (even). J(2k+1) = 2·J(k) + 1 (odd). J(1) = 1.",
      "Decrease-by-factor-2: each step reduces n roughly by half",
      "Closed form: J(n) = cyclic left shift of n's binary representation",
      "Examples: J(6) = 5, J(7) = 7, J(1) = 1, J(2) = 1",
      "The survivor position is always ≤ n and ≥ 1",
    ],
    formula: {
      code: `Recurrence:
  J(1) = 1
  J(2k) = 2·J(k) - 1      (n even)
  J(2k+1) = 2·J(k) + 1    (n odd)

Recursive Algorithm:
ALGORITHM Josephus(n)
if n = 1 return 1
if n mod 2 = 0   // n is even
    return 2 * Josephus(n/2) - 1
else             // n is odd
    return 2 * Josephus((n-1)/2) + 1

Binary shift formula:
  Write n in binary: n = 1b_{k-1}...b₁b₀
  J(n) = b_{k-1}...b₁b₀1  (cyclic left shift of leading 1)

Examples:
  n=1  = 1₂     → J=1₂=1   ✓
  n=2  = 10₂    → J=01₂=1  ✓
  n=3  = 11₂    → J=11₂=3  ✓
  n=4  = 100₂   → J=001₂=1 ✓
  n=5  = 101₂   → J=011₂=3 ✓
  n=6  = 110₂   → J=101₂=5 ✓
  n=7  = 111₂   → J=111₂=7 ✓
  n=8  = 1000₂  → J=0001₂=1 ✓

Verification: J(6)
  6 = 2×3 → J(6) = 2J(3)-1
  3 = 2×1+1 → J(3) = 2J(1)+1 = 2×1+1 = 3
  J(6) = 2×3-1 = 5 ✓  (and 110₂→101₂=5 ✓)`,
      explanation: "The binary shift works because the recurrence doubles J(k) — equivalent to a left shift in binary — then adds or subtracts 1.",
    },
    examTips: [
      "J(2k)=2J(k)-1, J(2k+1)=2J(k)+1, J(1)=1 — memorise these",
      "Binary shortcut: move the leading 1 bit to the rightmost position",
      "MCQ: J(8)=1, J(4)=1, J(16)=1 — powers of 2 always give J=1",
      "Always verify with the recurrence when using the binary shortcut",
    ],
    questions: [
      {
        q: "Compute J(12) using the recurrence.",
        a: "J(12): 12=2×6 → J(12)=2J(6)-1. J(6): 6=2×3 → J(6)=2J(3)-1. J(3): 3=2×1+1 → J(3)=2J(1)+1=2+1=3. J(6)=2×3-1=5. J(12)=2×5-1=9. Binary check: 12=1100₂ → cyclic left shift → 1001₂=9. ✓",
      },
      {
        q: "Why do powers of 2 always give J(2ⁿ) = 1?",
        a: "By the recurrence: J(2) = 2J(1)-1 = 2×1-1 = 1. J(4) = 2J(2)-1 = 2×1-1 = 1. J(8) = 2J(4)-1 = 2×1-1 = 1. By induction: J(2ⁿ) = 2J(2ⁿ⁻¹)-1 = 2×1-1 = 1. Intuitively: in a circle of 2ⁿ people, every pass eliminates exactly half; the person at position 1 who 'started' is always the last to be reached. Binary: 2ⁿ = 10...0₂ (leading 1 followed by n zeros) → cyclic shift → 0...01₂ = 1. ✓",
      },
    ],
  },

  "quickselect": {
    title: "Quickselect (Selection by Partition)",
    emoji: "🎯",
    tldr: "Find kth smallest element. Partition around pivot; if pivot rank = k, done; else recurse on one side. Avg Θ(n), worst Θ(n²).",
    explanation: `The Selection Problem: find the kth smallest element in an unsorted array A[0..n-1].

Naïve: sort the array (Θ(n log n)), return A[k-1].
Better: Use partitioning — the pivot lands at its final sorted position. We only need to recurse on ONE side.

VARIABLE-SIZE DECREASE: The pivot can land anywhere → the remaining subproblem size is variable (not fixed n/2). This is variable-size decrease-and-conquer.

LOMUTO PARTITION (used in Quickselect):
Pivot = A[l] (leftmost element). Use pointer s (last position of elements < pivot).
  Initialize s ← l.
  For i from l+1 to r:
    If A[i] < pivot: s ← s+1, swap A[i] ↔ A[s]
    Else: do nothing (element ≥ pivot stays right of s)
  After loop: swap A[l] (pivot) ↔ A[s]. Pivot is now at position s.
  Result: A[l..s-1] all < pivot, A[s] = pivot, A[s+1..r] all ≥ pivot.

QUICKSELECT ALGORITHM:
  Partition A[l..r]. Pivot lands at position s.
  Pivot's rank within A[l..r] is rank = s - l + 1.
  If rank = k: return A[s]. Found!
  If rank > k: kth smallest is in left part → recurse on A[l..s-1] with k.
  If rank < k: kth smallest is in right part → recurse on A[s+1..r] with k - rank.

ANALYSIS:
  Best case: pivot always lands in the middle → Θ(n) (like binary search).
  Average case: pivot lands at a random position → expected Θ(n).
  Worst case: pivot always min or max → full scan each time → Θ(n²).
    (happens on sorted/reverse-sorted input with first-element pivot and k=n)`,
    keyPoints: [
      "Find kth smallest without fully sorting. Use partition to locate pivot at its final position.",
      "Lomuto partition: pivot = A[l], scan right, maintain s = boundary of elements < pivot",
      "If pivot's rank = k → done. If rank > k → recurse left. If rank < k → recurse right.",
      "Variable-size decrease: pivot position varies → subproblem size is variable",
      "Best/Average: Θ(n). Worst: Θ(n²) (sorted input with first-element pivot).",
      "Contrast: sort + return = Θ(n log n) always. Quickselect = Θ(n) average.",
    ],
    formula: {
      code: `Lomuto Partition:
ALGORITHM LomutoPartition(A[l..r])
p ← A[l]           // pivot
s ← l
for i ← l+1 to r do
    if A[i] < p then
        s ← s + 1
        swap A[i] ↔ A[s]
swap A[l] ↔ A[s]    // put pivot in final position
return s             // pivot's index

Loop invariant:
  A[l+1..s] < p  (strictly less than pivot)
  A[s+1..i-1] ≥ p (greater or equal)
  A[i..r] = unprocessed

Quickselect:
ALGORITHM Quickselect(A[l..r], k)
s ← LomutoPartition(A[l..r])
rank ← s - l + 1    // pivot's rank in A[l..r]
if rank = k return A[s]
else if k < rank return Quickselect(A[l..s-1], k)
else return Quickselect(A[s+1..r], k - rank)

Analysis:
  Each partition: exactly r-l comparisons (scans from l+1 to r).
  Best case:   Θ(n)   (pivot always middle)
  Average:     Θ(n)   (expected over random pivot positions)
  Worst case:  Θ(n²)  (pivot always min/max → n+(n-1)+...+1 = n(n+1)/2)`,
      explanation: "After partition, the pivot is in its FINAL sorted position. We only recurse on ONE side — classic decrease-and-conquer.",
    },
    examTips: [
      "Lomuto partition: pivot = A[l], use index s to track boundary of elements < pivot",
      "rank = s - l + 1 (pivot's rank within CURRENT subarray, not whole array)",
      "Worst case: sorted array with first-element pivot and k=n",
      "Average Θ(n) makes Quickselect better than sorting for single-element selection",
    ],
    questions: [
      {
        q: "Find the 3rd smallest element in A=[4,7,2,9,1,5,6] using Quickselect. Trace the first partition.",
        a: "First partition with pivot=4, l=0, r=6. s=0 initially. i=1: A[1]=7≥4, skip. i=2: A[2]=2<4, s=1, swap A[2]↔A[1] → [4,2,7,9,1,5,6]. i=3: 9≥4 skip. i=4: 1<4, s=2, swap A[4]↔A[2] → [4,2,1,9,7,5,6]. i=5: 5≥4 skip. i=6: 6≥4 skip. Swap A[0]↔A[2]: [1,2,4,9,7,5,6]. Pivot 4 at position s=2. rank=s-l+1=3. k=3=rank → return A[2]=4. The 3rd smallest is 4. ✓ (Sorted: 1,2,4,5,6,7,9).",
      },
      {
        q: "What is the worst case for Quickselect and how does it occur?",
        a: "Worst case: Θ(n²). It occurs when the pivot always ends up at one extreme (minimum or maximum of the subarray). For example, with first-element pivot and a sorted array [1,2,3,...,n] searching for k=n: pivot is always the minimum, landing at position l. We recurse on A[l+1..r] each time — subproblem shrinks by only 1 each step. Total comparisons: (n-1)+(n-2)+...+1 = n(n-1)/2 ∈ Θ(n²). Similarly for reverse-sorted input.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // DIVIDE AND CONQUER
  // ─────────────────────────────────────────────

  "divide-conquer-overview": {
    title: "Divide and Conquer — Overview",
    emoji: "⚔️",
    tldr: "Divide into 2+ subproblems, conquer each recursively, combine solutions. General recurrence: T(n) = a·T(n/b) + f(n). Solved by Master Theorem.",
    explanation: `Divide and Conquer is one of the most powerful algorithm design paradigms.

THREE STEPS:
1. DIVIDE: Split the problem of size n into a subproblems of size n/b each.
2. CONQUER: Recursively solve each subproblem (base case: small n solved directly).
3. COMBINE: Merge the solutions of subproblems to produce the solution for the original problem.

GENERAL RECURRENCE: T(n) = a·T(n/b) + f(n)
  a = number of subproblems
  b = factor by which size reduces
  f(n) = cost of DIVIDING + COMBINING

KEY DIFFERENCE FROM DECREASE-AND-CONQUER:
  Divide & Conquer: multiple (≥2) subproblems → combine step needed.
  Decrease & Conquer: one subproblem → extend (no combine needed).

EXAMPLES:
  Mergesort: a=2, b=2, f(n)=n → T(n) = 2T(n/2)+n → Θ(n log n)
  Quicksort: a=2, b≈2, f(n)=n → average T(n) = 2T(n/2)+n → Θ(n log n)
  Strassen: a=7, b=2, f(n)=n² → T(n) = 7T(n/2)+n² → Θ(n^log₂7)
  Binary search*: a=1, b=2, f(n)=1 → T(n) = T(n/2)+1 → Θ(log n)
  (* Binary search is usually classified as Decrease & Conquer since only 1 subproblem)

The cost f(n) of the combine step is critical: if combine is expensive (large f), it may dominate; if cheap, the recursive structure dominates.`,
    keyPoints: [
      "Divide into a subproblems of size n/b. Conquer recursively. Combine.",
      "Recurrence: T(n) = a·T(n/b) + f(n)",
      "a = number of subproblems, b = size reduction factor, f(n) = divide+combine cost",
      "Key: requires a COMBINE step (unlike Decrease & Conquer)",
      "Solved by Master Theorem — compare f(n) with n^(log_b a)",
      "Examples: Mergesort (a=2,b=2), Strassen (a=7,b=2), Karatsuba (a=3,b=2)",
    ],
    formula: {
      code: `General D&C Template:
ALGORITHM DivideConquer(P)
if P is small enough: solve directly
else:
    Divide P into a subproblems of size n/b
    for each subproblem Pᵢ:
        solve Pᵢ recursively → solutionᵢ
    Combine solutions to get solution for P

Recurrence: T(n) = a·T(n/b) + f(n)

Parameter interpretation:
  a: number of recursive calls (subproblems)
  b: factor by which input size reduces
  f(n): time for divide + combine steps

Key algorithms:
  Mergesort:    a=2, b=2, f(n)=n    → Θ(n log n)
  Quicksort:    a=2, b≈2, f(n)=n   → Θ(n log n) avg
  Strassen:     a=7, b=2, f(n)=n²  → Θ(n^2.807)
  Karatsuba:    a=3, b=2, f(n)=n   → Θ(n^1.585)
  Naive D&C MM: a=8, b=2, f(n)=n²  → Θ(n³) [no improvement]
  Find max/min: a=2, b=2, f(n)=1   → Θ(n)`,
      explanation: "The choice of a and b (subproblem count and size factor) determines the recursive cost. f(n) adds the combine cost.",
    },
    examTips: [
      "Must identify a, b, and f(n) correctly before applying Master Theorem",
      "f(n) is the NON-RECURSIVE work (dividing + combining), NOT total work",
      "Mergesort combine = Θ(n) (merge step). Quicksort combine = Θ(n) (partition step).",
      "MCQ: 'Mergesort uses __ subproblems of size __' → 2 subproblems of size n/2",
    ],
    questions: [
      {
        q: "Compare Divide-and-Conquer with Decrease-and-Conquer. Give one algorithm example of each.",
        a: "Divide-and-Conquer: splits into MULTIPLE (≥2) independent subproblems, solves all, then COMBINES their solutions. Example: Mergesort — splits into 2 halves, sorts both, merges. Decrease-and-Conquer: reduces to EXACTLY ONE smaller subproblem and EXTENDS its solution (no combine needed). Example: Insertion Sort — sort A[0..n-2], then insert A[n-1]. The combine/extend distinction is key: Mergesort COMBINES two sorted arrays (non-trivial); Insertion Sort just INSERTS one element (simple extension).",
      },
    ],
  },

  "master-theorem-u2": {
    title: "Master Theorem (Full Coverage)",
    emoji: "👑",
    tldr: "T(n) = a·T(n/b) + f(n). Compute d = log_b(a). Case 1: f grows slower → Θ(nᵈ). Case 2: same → Θ(nᵈ log n). Case 3: f grows faster → Θ(f(n)).",
    explanation: `The Master Theorem gives a direct solution for divide-and-conquer recurrences T(n) = a·T(n/b) + f(n).

CRITICAL VALUE: d = log_b(a). This is the "watershed" exponent.
  d = log_b(a) = log(a)/log(b).
  Geometric interpretation: n^d = a^(log_b n) = number of leaves in the recursion tree.

THREE CASES — compare f(n) with nᵈ:

CASE 1: f(n) grows SLOWER than nᵈ (leaves dominate)
  Condition: f(n) ∈ O(n^(d-ε)) for some ε > 0
  Solution: T(n) ∈ Θ(nᵈ)
  Intuition: recursive work at leaves dominates the combining cost at each level.

CASE 2: f(n) grows at THE SAME RATE as nᵈ (balanced)
  Condition: f(n) ∈ Θ(nᵈ) (often f(n) = cⁿᵈ for some constant c)
  Solution: T(n) ∈ Θ(nᵈ · log n)
  Intuition: each of the log_b n levels contributes Θ(nᵈ) work → multiply by log n.

CASE 3: f(n) grows FASTER than nᵈ (root/combine dominates) + regularity condition
  Condition: f(n) ∈ Ω(n^(d+ε)) for ε>0 AND a·f(n/b) ≤ c·f(n) for c<1 (regularity)
  Solution: T(n) ∈ Θ(f(n))
  Intuition: the combining cost at the root dominates the total cost.

REGULARITY CONDITION (Case 3): Usually automatically satisfied for polynomial f(n). Must verify: a·f(n/b) ≤ c·f(n) for some c < 1 and large n.`,
    keyPoints: [
      "d = log_b(a) — compute this first. It's the key comparison value.",
      "Case 1: f(n) = O(n^(d-ε)) → Θ(nᵈ). Recursive work dominates.",
      "Case 2: f(n) = Θ(nᵈ) → Θ(nᵈ log n). Balanced — log factor added.",
      "Case 3: f(n) = Ω(n^(d+ε)) [+ regularity] → Θ(f(n)). Combining dominates.",
      "Regularity condition for Case 3: a·f(n/b) ≤ c·f(n) for some c<1.",
    ],
    formula: {
      code: `Master Theorem: T(n) = a·T(n/b) + f(n),  a≥1, b>1
Let d = log_b(a)

Case 1: f(n) ∈ O(n^(d-ε))  →  T(n) ∈ Θ(nᵈ)
Case 2: f(n) ∈ Θ(nᵈ)       →  T(n) ∈ Θ(nᵈ·log n)
Case 3: f(n) ∈ Ω(n^(d+ε)) + regularity  →  T(n) ∈ Θ(f(n))

Key examples table:
  Recurrence          │ a │ b │ d=log_b(a) │ f(n) │ Case │ Result
  ────────────────────┼───┼───┼────────────┼──────┼──────┼──────────────
  T=2T(n/2)+n         │ 2 │ 2 │ 1          │ n    │  2   │ Θ(n log n)
  T=2T(n/2)+1         │ 2 │ 2 │ 1          │ 1    │  1   │ Θ(n)
  T=T(n/2)+1          │ 1 │ 2 │ 0          │ 1    │  2   │ Θ(log n)
  T=T(n/2)+n²         │ 1 │ 2 │ 0          │ n²   │  3   │ Θ(n²)
  T=8T(n/2)+n         │ 8 │ 2 │ 3          │ n    │  1   │ Θ(n³)
  T=8T(n/2)+n²        │ 8 │ 2 │ 3          │ n²   │  1   │ Θ(n³)
  T=7T(n/2)+n²        │ 7 │ 2 │ 2.807      │ n²   │  1   │ Θ(n^2.807)
  T=3T(n/2)+n         │ 3 │ 2 │ 1.585      │ n    │  1   │ Θ(n^1.585)
  T=4T(n/2)+n²        │ 4 │ 2 │ 2          │ n²   │  2   │ Θ(n² log n)
  T=4T(n/2)+n³        │ 4 │ 2 │ 2          │ n³   │  3   │ Θ(n³)

DOES NOT APPLY when: a < 1, or f(n) is not a polynomial (e.g. f(n)=n log n
  for T(n)=2T(n/2)+n log n → use Akra-Bazzi or extended master theorem)`,
      explanation: "The trick: compute d=log_b(a), check if f(n) is polynomially smaller/equal/larger than nᵈ.",
    },
    examTips: [
      "ALWAYS compute d = log_b(a) first. Then compare f(n) with nᵈ.",
      "Case 2 is most common in practice (Mergesort, Binary Search both hit Case 2).",
      "Regularity for Case 3: verify a·f(n/b) ≤ cf(n). For polynomial f, this holds.",
      "f(n)=n log n when a=2, b=2 is a GAP — Master Theorem doesn't apply directly.",
    ],
    questions: [
      {
        q: "Apply the Master Theorem to T(n) = 4T(n/2) + n².",
        a: "a=4, b=2, d=log₂4=2. f(n)=n². Compare: nᵈ=n². f(n)=n²=Θ(n²)=Θ(nᵈ). This is Case 2. Solution: T(n) ∈ Θ(nᵈ log n) = Θ(n² log n).",
      },
      {
        q: "Apply the Master Theorem to T(n) = 3T(n/4) + n log n.",
        a: "a=3, b=4, d=log₄3=log3/log4≈0.792. f(n)=n log n. Compare with nᵈ=n^0.792. Is n log n = Ω(n^(0.792+ε))? n log n grows faster than n^0.792 (since n^1 > n^0.792 and n log n grows slightly faster than n). Actually n log n ∈ Ω(n) ⊃ Ω(n^0.792). Verify regularity: 3f(n/4)=3·(n/4)·log(n/4) ≤ (3/4)n log n for large n (since log(n/4)<log n). c=3/4 < 1. ✓ Case 3 → T(n) ∈ Θ(n log n).",
      },
      {
        q: "Why does the Master Theorem not apply to T(n) = 2T(n/2) + n log n?",
        a: "a=2, b=2, d=log₂2=1. nᵈ=n. f(n)=n log n. For Case 2, we need f(n)=Θ(nᵈ)=Θ(n). But n log n ∉ Θ(n): lim(n log n)/n = log n → ∞, so n log n ∉ O(n), and f is not in Θ(n). For Case 3, we need f(n)=Ω(n^(1+ε)). But n log n ∉ Ω(n^1.001) — log n grows much slower than n^0.001. So f falls in a GAP between Cases 2 and 3. The Master Theorem doesn't cover this case. Solution (by Akra-Bazzi): T(n) ∈ Θ(n log² n).",
      },
    ],
  },

  "mergesort": {
    title: "Mergesort",
    emoji: "🔀",
    tldr: "Split in half, sort each half, merge. Always Θ(n log n). Stable but NOT in-place — needs Θ(n) extra space.",
    explanation: `Mergesort is the classic divide-and-conquer sorting algorithm with guaranteed Θ(n log n) performance in all cases.

THREE STEPS:
1. DIVIDE: Split A[0..n-1] into two halves — A[0..⌊n/2⌋-1] and A[⌊n/2⌋..n-1].
2. CONQUER: Recursively sort each half.
3. COMBINE (MERGE): Merge the two sorted halves into one sorted array.

MERGE ALGORITHM:
Two sorted arrays B[0..p-1] and C[0..q-1] → merged into A[0..p+q-1].
Use two pointers i and j starting at 0. At each step, pick the smaller of B[i] and C[j], append to A.
When one array is exhausted, copy the remaining elements.

ANALYSIS:
Basic operation: comparison B[i] ≤ C[j] in the merge step.
Comparisons per merge of two arrays of sizes p and q: at most p+q-1 (at best p or q — when one array's elements are all smaller).
At each recursion level, total comparisons ≤ n-1 (all merge operations at each level together compare ≤ n-1 pairs).
Number of levels: log₂n.
Total: Θ(n log n) in all cases (best, average, worst).

RECURRENCE: C(n) = 2C(n/2) + (n-1), C(1) = 0.
  Master Theorem: a=2, b=2, d=log₂2=1, f(n)=n-1∈Θ(n)=Θ(nᵈ) → Case 2 → Θ(n log n).

PROPERTIES:
  Stable: Yes (B[i] ≤ C[j] keeps equal elements in order)
  In-place: No (needs Θ(n) extra space for temporary arrays)
  Optimal: Θ(n log n) is the lower bound for comparison-based sorting`,
    keyPoints: [
      "Divide: split in half. Conquer: sort both halves. Combine: merge the two sorted halves.",
      "Merge: compare heads of two sorted subarrays, pick smaller — O(n) per merge.",
      "Always Θ(n log n): best = average = worst (no input dependence).",
      "Stable ✓ — equal elements from B come before C in merge (B[i] ≤ C[j] condition).",
      "NOT in-place — needs Θ(n) auxiliary space for merging.",
      "Recurrence: C(n) = 2C(n/2) + n-1. Master Theorem Case 2 → Θ(n log n).",
    ],
    formula: {
      code: `ALGORITHM Mergesort(A[0..n-1])
if n > 1 then
    copy A[0..⌊n/2⌋-1] to B[0..⌊n/2⌋-1]
    copy A[⌊n/2⌋..n-1] to C[0..⌈n/2⌉-1]
    Mergesort(B)
    Mergesort(C)
    Merge(B, C, A)   ← combine step

ALGORITHM Merge(B[0..p-1], C[0..q-1], A[0..p+q-1])
i ← 0; j ← 0; k ← 0
while i < p and j < q do
    if B[i] ≤ C[j] then A[k] ← B[i]; i ← i+1
    else            A[k] ← C[j]; j ← j+1
    k ← k+1
// Copy remaining elements
if i = p then copy C[j..q-1] to A[k..p+q-1]
else         copy B[i..p-1] to A[k..p+q-1]

Recurrence: C(n) = 2C(n/2) + (n-1),  C(1) = 0
  a=2, b=2, d=log₂2=1, f(n)=n-1 ∈ Θ(n) → Case 2 → Θ(n log n)

Best, Average, Worst: ALL Θ(n log n)
Space: Θ(n) extra  (stable, not in-place)

Example — sort [A, L, G, O, R, I, T, H, M]:
  Split: [A,L,G,O] | [R,I,T,H,M]
  Split: [A,L]|[G,O] | [R,I]|[T,H,M]
  ...base cases...
  Merge up: [A,L]+[G,O]→[A,G,L,O]
            [R,I]→[I,R], [T,H,M]→[H,M,T]→[H,M,T]
            [I,R]+[H,M,T]→[H,I,M,R,T]
  Final: [A,G,L,O]+[H,I,M,R,T]→[A,G,H,I,L,M,O,R,T] ✓`,
      explanation: "The merge step uses B[i] ≤ C[j] (not <) — this ensures stability by preferring elements from the left array when equal.",
    },
    examTips: [
      "Always state: merge of p and q elements takes AT MOST p+q-1 comparisons",
      "Recurrence: C(n)=2C(n/2)+n-1, C(1)=0",
      "Stable: Yes (B[i]≤C[j] ensures equal left elements come before right)",
      "In-place: No — this is a common MCQ trap",
      "All cases: Θ(n log n) — no best/worst distinction unlike Quicksort",
    ],
    questions: [
      {
        q: "Trace Mergesort on [5, 3, 8, 1, 4, 2]. Show all split and merge steps.",
        a: "Split: [5,3,8] | [1,4,2]. Split: [5,3]|[8] | [1,4]|[2]. Split: [5]|[3] | [1]|[4]. Merge [5]+[3]→[3,5]. Merge [1]+[4]→[1,4]. Merge [3,5]+[8]→[3,5,8]. Merge [1,4]+[2]→[1,2,4]. Merge [3,5,8]+[1,2,4]→[1,2,3,4,5,8]. ✓ Comparisons in last merge: 3,5 vs 1→take 1; 3,5 vs 2→take 2; 3,5 vs 4→take 3; 5 vs 4→take 4; take 5; take 8. = 5 comparisons = p+q-1 = 3+3-1 = 5. ✓",
      },
      {
        q: "Why is Mergesort stable but not in-place? Are these properties in conflict?",
        a: "Stable because the merge condition B[i] ≤ C[j] ensures that when two elements are equal, the one from the LEFT subarray is always placed first — preserving original relative order. Not in-place because merging two sorted subarrays requires a temporary array (you can't merge in-place without shifting elements, which would degrade to O(n²)). These properties are not in conflict — they concern different resources. Stability is about element ordering; in-place is about memory use. In practice, Mergesort allocates O(n) total extra space (not O(n log n) because space is reused at different recursion levels).",
      },
    ],
  },

  "quicksort": {
    title: "Quicksort",
    emoji: "⚡",
    tldr: "Partition around pivot, sort both parts. Average Θ(n log n), worst Θ(n²) (sorted input). In-place, NOT stable.",
    explanation: `Quicksort is the most widely used sorting algorithm in practice, despite having a Θ(n²) worst case. It works by partitioning the array around a pivot element.

KEY IDEA: Instead of merging after recursion (Mergesort), Quicksort does its heavy lifting BEFORE recursion — the partition step.

HOARE PARTITION:
Choose pivot p = A[l]. Use two pointers i (scanning right) and j (scanning left).
  i scans right until finding A[i] ≥ p.
  j scans left until finding A[j] ≤ p.
  If i < j: swap A[i] ↔ A[j]. Continue.
  If i ≥ j: stop. Swap A[l] ↔ A[j]. Return j.
  Result: A[l..j-1] ≤ p (NOT strictly less), A[j] = p, A[j+1..r] ≥ p.

QUICKSORT ALGORITHM:
  Partition A[l..r] → pivot lands at s.
  Recursively sort A[l..s-1] and A[s+1..r].
  No combine step needed (pivot is already in final position)!

ANALYSIS:
  Best/Average case: pivot consistently lands near middle → T(n)=2T(n/2)+Θ(n) → Θ(n log n).
  Worst case: pivot always at one extreme → T(n)=T(n-1)+Θ(n) → Θ(n²).
    Occurs with: sorted input, reverse-sorted input, or many equal elements — all when using leftmost-element pivot.
  Expected case (random pivot): Θ(n log n).

PROPERTIES:
  In-place: Yes (only uses stack space O(log n) average, O(n) worst).
  Stable: NO (partition swaps non-adjacent elements).
  Cache-efficient: Yes (good locality of reference).`,
    keyPoints: [
      "Partition around pivot first (heavy work before recursion). Then recurse on both parts.",
      "Hoare partition: two-pointer scan inward. Swap when A[i]≥p and A[j]≤p and i<j.",
      "Best/Average: Θ(n log n). Worst: Θ(n²) (sorted input with leftmost pivot).",
      "In-place ✓. NOT stable ✗.",
      "Worst case on BOTH sorted AND reverse-sorted input with leftmost pivot.",
      "Fix for worst case: use random pivot, or median-of-three pivot.",
    ],
    formula: {
      code: `ALGORITHM Quicksort(A[l..r])
if l < r then
    s ← Partition(A[l..r])
    Quicksort(A[l..s-1])
    Quicksort(A[s+1..r])

ALGORITHM Partition(A[l..r])  [Hoare partition]
p ← A[l]             // pivot
i ← l; j ← r + 1
repeat
    repeat i ← i+1 until A[i] ≥ p    // scan right
    repeat j ← j-1 until A[j] ≤ p    // scan left
    if i < j then swap A[i] ↔ A[j]
until i ≥ j
swap A[l] ↔ A[j]      // place pivot at final position
return j               // pivot's index

Analysis:
  Best: T(n)=2T(n/2)+n → Θ(n log n)  [pivot always middle]
  Avg:  Same as best in expectation → Θ(n log n)
  Worst: T(n)=T(n-1)+n → Θ(n²)       [pivot always min or max]

Worst case inputs (with leftmost pivot):
  Already sorted: [1,2,3,...,n] → pivot always minimum
  Reverse sorted: [n,...,2,1] → pivot always maximum

Example: Partition [51,95,66,72,42,38,39,41,15] with pivot=51:
  i→95, j→15: swap → [51,15,66,72,42,38,39,41,95]
  i→66, j→41: swap → [51,15,41,72,42,38,39,66,95]
  i→72, j→39: swap → [51,15,41,39,42,38,72,66,95]
  i→72, j→38: i≥j stop → swap A[0]↔A[5] → [38,15,41,39,42,51,72,66,95]
  Pivot 51 at index 5. ✓`,
      explanation: "Partition invariant: after Hoare partition, A[l..j] ≤ p and A[j+1..r] ≥ p. The pivot is at j.",
    },
    examTips: [
      "Worst case: BOTH sorted AND reverse-sorted (leftmost pivot). Not just sorted.",
      "Quicksort is NOT stable — non-adjacent swaps change relative order of equals",
      "Partition returns the PIVOT'S FINAL INDEX, not just any split point",
      "Best case recurrence: T(n)=2T(n/2)+n → same as Mergesort → Θ(n log n)",
      "Worst case recurrence: T(n)=T(n-1)+n → T(n)=n(n+1)/2 → Θ(n²)",
    ],
    questions: [
      {
        q: "Trace Quicksort partition on [3, 1, 4, 1, 5, 9, 2, 6]. Show i, j movements.",
        a: "pivot=3, i=0, j=8(initially r+1). Inner loops: i→1(A[1]=1<3, skip), i→2(A[2]=4≥3 stop at i=2). j→7(A[7]=6>3 skip), j→6(A[6]=2≤3 stop at j=6). i<j: swap A[2]↔A[6] → [3,1,2,1,5,9,4,6]. i→3(A[3]=1<3), i→4(A[4]=5≥3 stop). j→5(9>3), j→4(5>3), j→3(A[3]=1≤3 stop at j=3). i=4≥j=3: stop. Swap A[0]↔A[3]: [1,1,2,3,5,9,4,6]. Pivot 3 at index 3. ✓",
      },
      {
        q: "Compare Quicksort and Mergesort on: complexity, in-place, stable, and practical performance.",
        a: "Complexity: Mergesort is always Θ(n log n). Quicksort is Θ(n log n) average but Θ(n²) worst. In-place: Quicksort is in-place (O(log n) stack average). Mergesort needs Θ(n) extra space. Stable: Mergesort is stable. Quicksort is not. Practical performance: Quicksort is typically faster in practice despite equal asymptotics — better cache performance (sequential access pattern), smaller constants, in-place nature. Quicksort is the preferred choice for general-purpose sorting; Mergesort is preferred when stability is required or for external sorting.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // TREE ALGORITHMS
  // ─────────────────────────────────────────────

  "tree-height": {
    title: "Binary Tree Algorithms — Height and Leaf Count",
    emoji: "🌲",
    tldr: "Height = max(Height(left), Height(right)) + 1. Height(empty) = -1. Comparisons = 2n+1 (extended tree). All tree algorithms: Θ(n).",
    explanation: `Binary tree algorithms are natural examples of divide-and-conquer: the left and right subtrees are independent subproblems.

HEIGHT OF A BINARY TREE:
Height = length of the longest path from root to a leaf (in edges).
  Height(empty tree) = -1
  Height(single node) = 0
  Height(T) = max(Height(T.left), Height(T.right)) + 1

EXTENDED BINARY TREE: Add "null" external nodes at every empty child pointer.
  n internal nodes → n+1 external nodes → 2n+1 total nodes.
  This is useful for analysis: every recursive call is exactly one of these 2n+1 nodes.

ANALYSIS OF HEIGHT ALGORITHM:
Basic operation: comparison (T = null).
The algorithm checks (T = null) once per node (both internal and external).
  C(n) = 2n + 1 (checks for all 2n+1 nodes in extended tree).
  Number of additions (for +1): A(n) = n (one per internal node).
  Time complexity: Θ(n).

LEAF COUNTING:
Count all nodes with no children.
  LeafCount(null) = 0
  LeafCount(T) = 1 if T has no children (leaf)
  LeafCount(T) = LeafCount(T.left) + LeafCount(T.right) otherwise
  Time: Θ(n).`,
    keyPoints: [
      "Height(empty) = -1. Height(T) = max(Height(left), Height(right)) + 1.",
      "Extended binary tree: n internal nodes + (n+1) external nodes = 2n+1 total.",
      "Comparisons for Height: C(n) = 2n+1 (one per node in extended tree).",
      "Additions for Height: A(n) = n (one per internal node).",
      "All: Θ(n) — must visit every node.",
    ],
    formula: {
      code: `ALGORITHM Height(T)
// T is root of binary tree (or null)
if T = null return -1
return max(Height(T.left), Height(T.right)) + 1

ALGORITHM LeafCount(T)
if T = null return 0
if T.left = null and T.right = null return 1  // leaf
return LeafCount(T.left) + LeafCount(T.right)

Analysis of Height:
  For extended tree with n internal nodes:
  C(n) = 2C(n_left) + 2C(n_right) + 2  (two null checks for T.left, T.right)
  → Wait, actually C counts calls: T=null check per call.
  Each of the 2n+1 nodes generates exactly one call → C(n) = 2n+1 checks.
  Additions A(n) = n (only non-null nodes do the +1).

  For a complete binary tree of height h: n = 2^(h+1) - 1 internal nodes.
  Height algorithm: 2(2^(h+1)-1) + 1 = 2^(h+2) - 1 checks.

Recurrence: A(n) = A(n_left) + A(n_right) + 1,  A(0) = 0
  For balanced tree: A(n) = 2A(n/2) + 1 → a=2,b=2,d=1,f=1 → Case 1 → Θ(n). ✓`,
      explanation: "Height(empty)=-1 is the key convention — it makes Height(single leaf)=max(-1,-1)+1=0 correct.",
    },
    examTips: [
      "Height(empty/null) = -1. Height(leaf) = 0. This convention is STANDARD.",
      "Extended binary tree: n internal + n+1 external = 2n+1 total nodes",
      "C(n) = 2n+1 comparisons (T=null check). A(n) = n additions (+1).",
      "MCQ: 'What is the height of a tree with 1 node?' → 0 (not 1)",
    ],
    questions: [
      {
        q: "Compute the height of a complete binary tree with 7 nodes. Verify using the formula.",
        a: "A complete binary tree with 7 nodes has 3 levels (root at level 0, leaves at level 2). Height = 2. Formula: 7 = 2^3 - 1 = 2^(h+1) - 1 → h+1 = 3 → h = 2. ✓ Number of comparisons = 2×7+1 = 15. Number of additions = 7.",
      },
      {
        q: "Write the recurrence for the Height algorithm and solve it for a balanced tree.",
        a: "Recurrence: A(n) = A(n_left) + A(n_right) + 1, A(0) = 0. For a balanced tree, n_left = n_right = (n-1)/2 ≈ n/2. So A(n) = 2A(n/2) + 1. By Master Theorem: a=2, b=2, d=log₂2=1, f(n)=1 ∈ O(n^(1-1))=O(1). Case 1 → A(n) ∈ Θ(nᵈ) = Θ(n). ✓",
      },
    ],
  },

  "tree-traversals": {
    title: "Tree Traversals and Reconstruction",
    emoji: "🔁",
    tldr: "Preorder (Root-Left-Right), Inorder (Left-Root-Right), Postorder (Left-Right-Root). Each Θ(n). Reconstruct tree from inorder+preorder or inorder+postorder.",
    explanation: `Tree traversals visit every node in a specific order. All three traversals are divide-and-conquer on left and right subtrees.

PREORDER (Root → Left → Right):
  Visit root first, then traverse left subtree, then right subtree.
  Gives root before its children. Used to: copy tree, serialize tree.

INORDER (Left → Root → Right):
  Traverse left subtree, then visit root, then right subtree.
  For Binary Search Trees: gives elements in SORTED ORDER.

POSTORDER (Left → Right → Root):
  Traverse both subtrees first, then visit root.
  Used to: delete tree, compute size/height (process subtrees before root).

ALL THREE: Each visits every node exactly once → Θ(n).

RECONSTRUCTING A TREE:
Given two traversals, reconstruct the tree. Key insight: the ROOT is always identifiable in at least one traversal.

Inorder + Postorder:
  Last element of POSTORDER = root.
  Find root in inorder — left part = left subtree, right part = right subtree.
  Recurse.

Inorder + Preorder:
  First element of PREORDER = root.
  Find root in inorder — divide and recurse.

Note: Preorder + Postorder ALONE is not always sufficient to uniquely reconstruct (ambiguity when a node has only one child).`,
    keyPoints: [
      "Preorder: Root, Left, Right. Postorder: Left, Right, Root. Inorder: Left, Root, Right.",
      "All three: Θ(n) — visit every node exactly once.",
      "Inorder of BST → sorted sequence.",
      "Inorder + Postorder: root = last of postorder. Find in inorder to split subtrees.",
      "Inorder + Preorder: root = first of preorder. Same split logic.",
      "Preorder + Postorder alone: may be ambiguous.",
    ],
    formula: {
      code: `ALGORITHM Preorder(T)
if T ≠ null
    print T.key
    Preorder(T.left)
    Preorder(T.right)

ALGORITHM Inorder(T)
if T ≠ null
    Inorder(T.left)
    print T.key
    Inorder(T.right)

ALGORITHM Postorder(T)
if T ≠ null
    Postorder(T.left)
    Postorder(T.right)
    print T.key

Example tree:      4
                  / \
                 2   6
                / \ / \
               1  3 5  7

Preorder:  4, 2, 1, 3, 6, 5, 7
Inorder:   1, 2, 3, 4, 5, 6, 7  ← sorted for BST ✓
Postorder: 1, 3, 2, 5, 7, 6, 4

Reconstruction from Inorder + Postorder:
  Inorder:   [D, B, E, A, F, C, G]
  Postorder: [D, E, B, F, G, C, A]
  
  Root = last of Postorder = A
  Find A in Inorder: left=[D,B,E], right=[F,C,G]
  Left subtree: Inorder=[D,B,E], Postorder=[D,E,B] → root=B
    Find B in [D,B,E]: left=[D], right=[E]
  Right subtree: Inorder=[F,C,G], Postorder=[F,G,C] → root=C
    Find C in [F,C,G]: left=[F], right=[G]
  
  Tree:    A
          / \
         B   C
        / \ / \
       D  E F  G`,
      explanation: "The root splits inorder into left and right subtrees. Sizes tell you how many elements belong to each subtree in the postorder.",
    },
    examTips: [
      "Postorder reconstruction: root = LAST element. Preorder reconstruction: root = FIRST.",
      "Inorder always needed for unique reconstruction (with at least one other traversal).",
      "Inorder of BST = sorted — classic MCQ.",
      "Count left subtree size from inorder split to locate left/right in postorder.",
    ],
    questions: [
      {
        q: "Reconstruct the tree from Inorder=[4,2,5,1,6,3,7] and Preorder=[1,2,4,5,3,6,7].",
        a: "Root = first of Preorder = 1. Find 1 in Inorder: position 3. Left inorder=[4,2,5] (3 nodes), Right inorder=[6,3,7] (3 nodes). Left preorder = next 3 of preorder=[2,4,5]. Right preorder=[3,6,7]. Left subtree: root=2, inorder=[4,2,5], preorder=[2,4,5]. Find 2: left=[4], right=[5]. Right subtree: root=3, inorder=[6,3,7], find 3: left=[6], right=[7]. Tree: 1(root), 2(left of 1), 3(right of 1), 4(left of 2), 5(right of 2), 6(left of 3), 7(right of 3).",
      },
      {
        q: "What is the time complexity of tree traversal? Why is it Θ(n) and not more?",
        a: "Θ(n) — each of the n nodes in the tree is visited exactly once. At each visit, a constant amount of work is done (print/process the node). The recursion visits the left subtree (n_left nodes) and right subtree (n_right nodes), with n_left + n_right = n-1. Recurrence: T(n) = T(n_left) + T(n_right) + 1, T(0) = 0. Summing over all nodes: T(n) = n (each node contributes exactly 1 unit). This holds regardless of tree shape (balanced or degenerate).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // ADVANCED MULTIPLY
  // ─────────────────────────────────────────────

  "strassen": {
    title: "Strassen's Matrix Multiplication",
    emoji: "🔢",
    tldr: "Multiply two n×n matrices in Θ(n^log₂7) ≈ Θ(n^2.807). Uses 7 sub-matrix multiplications instead of 8. Trade 1 multiplication for 18 additions.",
    explanation: `Standard matrix multiplication of two n×n matrices takes Θ(n³). Strassen's algorithm does it in Θ(n^2.807) by reducing the number of recursive multiplications from 8 to 7.

STANDARD D&C APPROACH:
Divide each n×n matrix into four (n/2)×(n/2) blocks.
C = A×B → C₁₁=A₁₁B₁₁+A₁₂B₂₁, C₁₂=A₁₁B₁₂+A₁₂B₂₂, C₂₁=A₂₁B₁₁+A₂₂B₂₁, C₂₂=A₂₁B₁₂+A₂₂B₂₂.
This requires 8 sub-matrix multiplications and 4 additions.
Recurrence: M(n) = 8M(n/2) → d=log₂8=3 → Θ(n³). No improvement!

STRASSEN'S KEY INSIGHT:
Use 7 multiplications and 18 additions/subtractions to compute the same result.
The 7 intermediate products M₁..M₇:
  M₁ = (A₁₁ + A₂₂)(B₁₁ + B₂₂)
  M₂ = (A₂₁ + A₂₂)·B₁₁
  M₃ = A₁₁·(B₁₂ - B₂₂)
  M₄ = A₂₂·(B₂₁ - B₁₁)
  M₅ = (A₁₁ + A₁₂)·B₂₂
  M₆ = (A₂₁ - A₁₁)(B₁₁ + B₁₂)
  M₇ = (A₁₂ - A₂₂)(B₂₁ + B₂₂)

Result:
  C₁₁ = M₁ + M₄ - M₅ + M₇
  C₁₂ = M₃ + M₅
  C₂₁ = M₂ + M₄
  C₂₂ = M₁ - M₂ + M₃ + M₆

Recurrence: M(n) = 7M(n/2) + 18(n/2)²
Master Theorem: a=7, b=2, d=log₂7≈2.807, f(n)=n²=O(n^(2.807-ε)) → Case 1 → Θ(n^log₂7) ≈ Θ(n^2.807).

PRACTICAL NOTE: Strassen wins only for large n (roughly n ≥ 50-100) because the constant for the 18 additions overwhelms the asymptotic gain for small n.`,
    keyPoints: [
      "Standard 8-multiplication D&C → Θ(n³) (no improvement).",
      "Strassen: 7 multiplications + 18 additions → Θ(n^log₂7) ≈ Θ(n^2.807).",
      "The 7 Mᵢ formulas: memorise them — examiners look for them.",
      "Trade: 1 multiplication replaced by 14 extra additions.",
      "For 2×2: 7 multiplications (vs 8 naive) and 18 additions (vs 4 naive).",
      "Practical threshold: n ≥ ~50-100 before Strassen actually beats naive.",
    ],
    formula: {
      code: `Strassen's 7 Products (MUST MEMORIZE):
  M₁ = (A₁₁ + A₂₂)(B₁₁ + B₂₂)
  M₂ = (A₂₁ + A₂₂)·B₁₁
  M₃ = A₁₁·(B₁₂ - B₂₂)
  M₄ = A₂₂·(B₂₁ - B₁₁)
  M₅ = (A₁₁ + A₁₂)·B₂₂
  M₆ = (A₂₁ - A₁₁)(B₁₁ + B₁₂)
  M₇ = (A₁₂ - A₂₂)(B₂₁ + B₂₂)

Result formulas:
  C₁₁ = M₁ + M₄ - M₅ + M₇
  C₁₂ = M₃ + M₅
  C₂₁ = M₂ + M₄
  C₂₂ = M₁ - M₂ + M₃ + M₆

Recurrences:
  Multiplications: M(n) = 7M(n/2), M(1)=1 → M(n) = 7^(log₂n) = n^(log₂7)
  Additions: A(n) = 7A(n/2) + 18(n/2)², A(1)=0

Master Theorem: a=7, b=2, d=log₂7≈2.807
  f(n)=n²: 2 < 2.807 → f(n)=O(n^(2.807-ε)) → Case 1 → Θ(n^2.807)

Example — A=[[2,4],[3,2]], B=[[1,2],[3,2]]:
  M₁=(2+2)(1+2)=12, M₂=(3+2)·1=5, M₃=2·(2-2)=0,
  M₄=2·(3-1)=4, M₅=(2+4)·2=12, M₆=(3-2)(1+2)=3, M₇=(4-2)(3+2)=10
  C₁₁=12+4-12+10=14, C₁₂=0+12=12, C₂₁=5+4=9, C₂₂=12-5+0+3=10 ✓`,
      explanation: "The M₁...M₇ formulas are designed so that each Cᵢⱼ can be computed with additions/subtractions of the Mᵢ only.",
    },
    examTips: [
      "Memorize all 7 Mᵢ formulas — partial credit for getting some right",
      "Memorize all 4 Cᵢⱼ formulas in terms of Mᵢ",
      "Recurrence: 7M(n/2), Master Theorem Case 1, answer Θ(n^log₂7)",
      "log₂7 ≈ 2.807 — memorise this value",
      "Both multiplications and additions recurrences may be asked",
    ],
    questions: [
      {
        q: "Apply Strassen's algorithm to multiply A=[[1,2],[3,4]] and B=[[5,6],[7,8]]. Verify.",
        a: "M₁=(1+4)(5+8)=5×13=65. M₂=(3+4)×5=35. M₃=1×(6-8)=-2. M₄=4×(7-5)=8. M₅=(1+2)×8=24. M₆=(3-1)(5+6)=2×11=22. M₇=(2-4)(7+8)=(-2)×15=-30. C₁₁=65+8-24+(-30)=19. C₁₂=-2+24=22. C₂₁=35+8=43. C₂₂=65-35+(-2)+22=50. Result: [[19,22],[43,50]]. Verify: 1×5+2×7=19✓, 1×6+2×8=22✓, 3×5+4×7=43✓, 3×6+4×8=50✓.",
      },
      {
        q: "Why does standard D&C matrix multiplication not improve over Θ(n³), but Strassen's does?",
        a: "Standard D&C: Divide into 4 blocks of size n/2, compute 8 products → M(n)=8M(n/2). Master Theorem: a=8, b=2, d=log₂8=3, f(n)=n² ∈ O(n^(3-1)) → Case 1 → Θ(n³). Same as naive! Strassen: only 7 multiplications → M(n)=7M(n/2). d=log₂7≈2.807. f(n)=n² ∈ O(n^(2.807-ε)) → Case 1 → Θ(n^2.807). Improvement! The key: d=log_b(a) decreases when a decreases from 8 to 7, even though b stays at 2.",
      },
    ],
  },

  "karatsuba": {
    title: "Karatsuba's Algorithm (Large Integer Multiplication)",
    emoji: "🧮",
    tldr: "Multiply two n-digit numbers in Θ(n^log₂3) ≈ Θ(n^1.585). Uses 3 sub-multiplications instead of 4. The key identity: c₁=(a₁+a₀)(b₁+b₀)-c₂-c₀.",
    explanation: `Multiplying two n-digit numbers naively requires O(n²) digit operations. Karatsuba's algorithm reduces this to Θ(n^1.585) using only 3 recursive multiplications.

SPLITTING:
Write n-digit numbers a and b split at the midpoint (n/2 digits each):
  a = a₁ · 10^(n/2) + a₀    (a₁ = high half, a₀ = low half)
  b = b₁ · 10^(n/2) + b₀

NAIVE D&C (4 multiplications):
a·b = a₁b₁·10ⁿ + (a₁b₀ + a₀b₁)·10^(n/2) + a₀b₀
  = c₂·10ⁿ + (a₁b₀+a₀b₁)·10^(n/2) + c₀
Requires: 4 multiplications (a₁b₁, a₁b₀, a₀b₁, a₀b₀).
Recurrence: T(n) = 4T(n/2) + n → d=log₂4=2 → Θ(n²). No improvement!

KARATSUBA'S INSIGHT — 3 MULTIPLICATIONS:
Compute:
  c₂ = a₁ · b₁
  c₀ = a₀ · b₀
  c₁ = (a₁ + a₀)(b₁ + b₀) - c₂ - c₀  ← this equals a₁b₀ + a₀b₁!

Then: a·b = c₂·10ⁿ + c₁·10^(n/2) + c₀

Only 3 multiplications instead of 4!
Recurrence: T(n) = 3T(n/2) + n → d=log₂3≈1.585, f(n)=n=O(n^(1.585-ε)) → Case 1 → Θ(n^log₂3) ≈ Θ(n^1.585).`,
    keyPoints: [
      "Split n-digit numbers at midpoint: a = a₁·10^(n/2) + a₀, b = b₁·10^(n/2) + b₀",
      "3 multiplications: c₂=a₁b₁, c₀=a₀b₀, c₁=(a₁+a₀)(b₁+b₀)-c₂-c₀",
      "Result: a·b = c₂·10ⁿ + c₁·10^(n/2) + c₀",
      "Recurrence: T(n) = 3T(n/2) + n → Θ(n^log₂3) ≈ Θ(n^1.585)",
      "Naive 4-multiplication D&C gives T(n)=4T(n/2)+n → Θ(n²) — no improvement",
      "log₂3 ≈ 1.585 < 2 — significant improvement for large numbers",
    ],
    formula: {
      code: `Karatsuba's Algorithm:
  Input: n-digit numbers a and b
  Split: a = a₁·10^(n/2) + a₀,  b = b₁·10^(n/2) + b₀

  1. c₂ ← a₁ × b₁           (recursive multiplication)
  2. c₀ ← a₀ × b₀           (recursive multiplication)
  3. c₁ ← (a₁+a₀)×(b₁+b₀) - c₂ - c₀  (recursive mult + 2 subtractions)
  4. Return c₂·10ⁿ + c₁·10^(n/2) + c₀

Recurrence: T(n) = 3T(n/2) + n
  a=3, b=2, d=log₂3≈1.585, f(n)=n=O(n^(1.585-ε)) → Case 1 → Θ(n^1.585)

Example — 2101 × 1130 (n=4, split at 2):
  a₁=21, a₀=01=1, b₁=11, b₀=30
  c₂ = 21×11 = 231
  c₀ = 1×30 = 30
  (a₁+a₀)=22, (b₁+b₀)=41, 22×41=902
  c₁ = 902 - 231 - 30 = 641
  
  Result = 231×10000 + 641×100 + 30
         = 2,310,000 + 64,100 + 30
         = 2,374,130 ✓  (check: 2101×1130 = 2,374,130)

Naive 4-mult D&C:
  T(n) = 4T(n/2) + n → a=4,b=2,d=2,f=n=O(n) → Case 1 → Θ(n²)
  No improvement over schoolbook algorithm!`,
      explanation: "The trick: (a₁+a₀)(b₁+b₀) = a₁b₁ + a₁b₀ + a₀b₁ + a₀b₀ = c₂ + c₁_needed + c₀. So c₁_needed = (a₁+a₀)(b₁+b₀) - c₂ - c₀.",
    },
    examTips: [
      "c₁ = (a₁+a₀)(b₁+b₀) - c₂ - c₀ — this is the KEY formula",
      "3 multiplications: c₂, c₀, and (a₁+a₀)(b₁+b₀). The subtractions are free (Θ(n)).",
      "Recurrence: T(n)=3T(n/2)+n → Case 1 → Θ(n^log₂3) ≈ Θ(n^1.585)",
      "log₂3 ≈ 1.585 — memorise. Contrast with naive Θ(n²).",
    ],
    questions: [
      {
        q: "Use Karatsuba's algorithm to multiply 1234 × 5678.",
        a: "n=4, split at 2: a₁=12, a₀=34, b₁=56, b₀=78. c₂=12×56=672. c₀=34×78=2652. (a₁+a₀)=46, (b₁+b₀)=134. 46×134=6164. c₁=6164-672-2652=2840. Result=672×10⁴+2840×10²+2652=6720000+284000+2652=7,006,652. Check: 1234×5678=7,006,652 ✓",
      },
      {
        q: "Why does Karatsuba beat the standard O(n²) multiplication but the naive D&C does not?",
        a: "Naive D&C: 4 subproblems of size n/2 → T(n)=4T(n/2)+n. d=log₂4=2, f=n∈O(n^(2-1)) → Case 1 → Θ(n²). Same as schoolbook! The recursion tree has n^(log₂4)=n² leaves — as many as the naive algorithm. Karatsuba: 3 subproblems → T(n)=3T(n/2)+n. d=log₂3≈1.585, f=n∈O(n^(1.585-ε)) → Case 1 → Θ(n^1.585). The recursion tree has n^(log₂3)≈n^1.585 leaves. By saving one multiplication per level, the leaf count (total work) drops dramatically.",
      },
    ],
  },

  "exponentiation": {
    title: "Exponentiation by Squaring",
    emoji: "🔋",
    tldr: "Compute aⁿ using Θ(log n) multiplications. aⁿ = (a^(n/2))² if n even; = a·(a^((n-1)/2))² if n odd. Decrease-by-factor-2.",
    explanation: `Computing aⁿ naively requires n-1 multiplications. Exponentiation by squaring does it in Θ(log n).

KEY INSIGHT:
  aⁿ = (a^(n/2))²           if n is even
  aⁿ = a · (a^((n-1)/2))²  if n is odd

This is decrease-by-factor-2: n halves each step.

EFFICIENT ALGORITHM (Decrease-and-Conquer):
  ALGORITHM Power(a, n):
    if n = 1: return a
    p ← Power(a, ⌊n/2⌋)   ← ONE recursive call (decrease-and-conquer)
    p ← p × p              ← one squaring
    if n is odd: p ← p × a ← one extra multiplication
    return p

ANALYSIS:
  Each call: 1 or 2 multiplications. Recursive call on ⌊n/2⌋.
  Recurrence: M(n) = M(n/2) + 1 (even) or M(n/2) + 2 (odd).
  At worst (all odd): M(n) ≤ 2·⌊log₂n⌋ ∈ Θ(log n). Huge improvement over Θ(n).

WRONG VERSION — Divide-and-Conquer (worse!):
  ALGORITHM PowerDC(a, n):
    if n = 1: return a
    return PowerDC(a, ⌊n/2⌋) × PowerDC(a, ⌈n/2⌉)  ← TWO recursive calls!
  
  This computes Power(a, n/2) TWICE unnecessarily.
  Recurrence: M(n) = 2M(n/2) + 1 → Θ(n). Same as brute force! Bad.
  The key: compute Power(a, n/2) ONCE, then square — don't recurse twice.`,
    keyPoints: [
      "aⁿ = (a^(n/2))² (even) or a·(a^(n/2))² (odd) — reduce n by half each step",
      "Decrease-and-Conquer (ONE recursive call) → Θ(log n) multiplications",
      "Wrong D&C version (TWO calls) → Θ(n) — same as brute force!",
      "Compute p=Power(a, ⌊n/2⌋) once, then p×p (and p×a if n odd)",
      "At most 2⌊log₂n⌋ multiplications total",
    ],
    formula: {
      code: `ALGORITHM Power(a, n)  [Decrease-and-Conquer — CORRECT]
if n = 0 return 1
if n = 1 return a
p ← Power(a, ⌊n/2⌋)    ← ONE recursive call
p ← p * p               ← squaring
if n is odd then p ← p * a   ← extra mult for odd n
return p

WRONG D&C version [two calls = Θ(n) — BAD]:
Power(a,n) = Power(a, ⌊n/2⌋) * Power(a, ⌈n/2⌉)
  Recurrence: M(n) = 2M(n/2) + 1 → Θ(n) — no improvement!

Correct recurrence:
  M(n) ≤ M(⌊n/2⌋) + 2    [1 squaring + 1 extra if odd]
  M(1) = 0
  Solution: M(n) ≤ 2⌊log₂n⌋ ∈ Θ(log n)

Example: a^13
  Power(a, 13): n=13 odd, p=Power(a,6), then p*p*a
  Power(a, 6): n=6 even, p=Power(a,3), then p*p
  Power(a, 3): n=3 odd, p=Power(a,1)=a, then a*a*a=a³
  Back: Power(6)=a³*a³=a⁶. Power(13)=a⁶*a⁶*a=a¹³ ✓
  Multiplications: a²→a³(2), a⁶(1), a¹²(1), a¹³(1) = 5 mults
  vs brute force: 12 multiplications (a*a*...*a 13 times)`,
      explanation: "The trick: compute Power(a, n/2) EXACTLY ONCE and reuse it. This is why it's decrease-and-conquer, not divide-and-conquer.",
    },
    examTips: [
      "ONE recursive call (decrease) → Θ(log n). TWO calls (divide) → Θ(n) — bad.",
      "At most 2⌊log₂n⌋ total multiplications",
      "Compute ⌊n/2⌋ once and square it — don't compute both n/2 and ⌈n/2⌉ separately",
      "This is classified as Decrease-by-Factor (not Divide & Conquer)",
    ],
    questions: [
      {
        q: "Compute a²⁵ using exponentiation by squaring. Trace all recursive calls.",
        a: "Power(a,25): 25 odd, p=Power(a,12), result=p*p*a. Power(a,12): 12 even, p=Power(a,6), result=p*p. Power(a,6): 6 even, p=Power(a,3), result=p*p. Power(a,3): 3 odd, p=Power(a,1)=a, result=a*a*a=a³. Back: Power(a,6)=a³*a³=a⁶ (1 mult). Power(a,12)=a⁶*a⁶=a¹² (1 mult). Power(a,25)=a¹²*a¹²*a=a²⁵ (2 mults). Total: 2+1+1+2=6 multiplications. Brute force: 24 multiplications.",
      },
      {
        q: "Why does the two-call D&C version of exponentiation give Θ(n), not Θ(log n)?",
        a: "The two-call version: Power(a,n) = Power(a,⌊n/2⌋) × Power(a,⌈n/2⌉) makes TWO independent recursive calls each of size ~n/2. Recurrence: M(n)=2M(n/2)+1. Master Theorem: a=2, b=2, d=log₂2=1, f(n)=1∈O(n^(1-1))=O(1) → Case 1 → Θ(n). This is the SAME as computing a^n by repeated multiplication! The recursion tree has n leaves — it recomputes Power(a,⌊n/2⌋) independently in both halves instead of reusing the result.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PYQ BANK & REFERENCE
  // ─────────────────────────────────────────────

  "u2-cheat-sheet": {
    title: "Unit 2 Formula Cheat Sheet",
    emoji: "📄",
    tldr: "All Unit 2 key formulas, recurrences, complexities, and algorithm properties in one place.",
    explanation: `Complete formula reference for DAA Unit 2 — Decrease & Conquer and Divide & Conquer.`,
    keyPoints: [
      "Master Theorem, all key recurrences, Strassen's 7 products in one place",
      "Algorithm comparison table for all sorting/searching algorithms",
      "Binary tree formulas",
    ],
    formula: {
      code: `════════════════════════════════════════════
DECREASE & CONQUER — KEY FORMULAS
════════════════════════════════════════════
Insertion Sort:   Best Θ(n), Avg/Worst Θ(n²), In-place✓, Stable✓
Binary Search:    Worst ⌊log₂n⌋+1 ∈ Θ(log n), C(n)=C(n/2)+1
Fake Coin (÷2):   ⌈log₂n⌉ weighings
Fake Coin (÷3):   ⌈log₃n⌉ weighings  [speedup ≈ 1.585×, OPTIMAL]
Russian Peasant:  Θ(log n) steps
Josephus:         J(2k)=2J(k)-1, J(2k+1)=2J(k)+1, J(1)=1
                  Binary shortcut: cyclic left shift of leading 1 bit
Quickselect:      Best/Avg Θ(n), Worst Θ(n²)

════════════════════════════════════════════
MASTER THEOREM: T(n) = aT(n/b) + f(n)
Let d = log_b(a)
════════════════════════════════════════════
Case 1: f(n) ∈ O(nᵈ⁻ᵉ)  →  T(n) ∈ Θ(nᵈ)         [recursive dominates]
Case 2: f(n) ∈ Θ(nᵈ)    →  T(n) ∈ Θ(nᵈ·log n)    [balanced]
Case 3: f(n) ∈ Ω(nᵈ⁺ᵉ) + regularity → T(n) ∈ Θ(f(n)) [combine dominates]

═══════════════════════════════════════════
RECURRENCE QUICK REFERENCE
════════════════════════════════════════════
T(n) = 2T(n/2) + n   → Θ(n log n)   [Mergesort, Quicksort avg]
T(n) = T(n/2) + 1    → Θ(log n)     [Binary Search]
T(n) = 2T(n/2) + 1   → Θ(n)         [find max in tree]
T(n) = T(n/2) + n²   → Θ(n²)        [Case 3]
T(n) = 7T(n/2) + n²  → Θ(n^2.807)   [Strassen]
T(n) = 3T(n/2) + n   → Θ(n^1.585)   [Karatsuba]
T(n) = 8T(n/2) + n²  → Θ(n³)        [naive D&C matrix mult]
T(n) = 4T(n/2) + n²  → Θ(n² log n)  [Case 2, d=2]
T(n) = T(n-1) + n    → Θ(n²)
T(n) = 2T(n-1) + 1   → Θ(2ⁿ)        [Tower of Hanoi]

════════════════════════════════════════════
ALGORITHM COMPARISON TABLE
════════════════════════════════════════════
Algorithm    │ Best      │ Average   │ Worst    │ Space  │ Stable │ In-place
─────────────┼───────────┼───────────┼──────────┼────────┼────────┼─────────
InsSort      │ Θ(n)      │ Θ(n²)     │ Θ(n²)    │ O(1)   │ Yes    │ Yes
Mergesort    │ Θ(nlogn)  │ Θ(nlogn)  │ Θ(nlogn) │ O(n)   │ Yes    │ No
Quicksort    │ Θ(nlogn)  │ Θ(nlogn)  │ Θ(n²)    │ O(logn)│ No     │ Yes
BinSearch    │ O(1)      │ Θ(logn)   │ Θ(logn)  │ O(1)   │ n/a    │ —
Quickselect  │ Θ(n)      │ Θ(n)      │ Θ(n²)    │ O(1)   │ No     │ Yes
Strassen     │ —         │ —         │ Θ(n^2.81)│ O(n²)  │ —      │ No
Karatsuba    │ —         │ —         │ Θ(n^1.58)│ O(n)   │ —      │ —
DFS/BFS      │ Θ(V+E)    │ Θ(V+E)    │ Θ(V+E)   │ O(V)   │ —      │ —
Topol. Sort  │ Θ(V+E)    │ Θ(V+E)    │ Θ(V+E)   │ O(V)   │ —      │ —

════════════════════════════════════════════
STRASSEN'S 7 PRODUCTS
════════════════════════════════════════════
M₁=(A₁₁+A₂₂)(B₁₁+B₂₂)  M₅=(A₁₁+A₁₂)B₂₂
M₂=(A₂₁+A₂₂)B₁₁         M₆=(A₂₁-A₁₁)(B₁₁+B₁₂)
M₃=A₁₁(B₁₂-B₂₂)         M₇=(A₁₂-A₂₂)(B₂₁+B₂₂)
M₄=A₂₂(B₂₁-B₁₁)

C₁₁=M₁+M₄-M₅+M₇  C₁₂=M₃+M₅
C₂₁=M₂+M₄         C₂₂=M₁-M₂+M₃+M₆

════════════════════════════════════════════
BINARY TREE FORMULAS
════════════════════════════════════════════
Height(null) = -1
Height(T) = max(H(left), H(right)) + 1
Extended tree: n internal + (n+1) external = 2n+1 nodes
Height algorithm: C(n)=2n+1 checks, A(n)=n additions  [Θ(n)]`,
      explanation: "Print this page. Strassen's 7 products and the Master Theorem table are the highest-yield memorisation items.",
    },
    examTips: [
      "Strassen: 7 multiplications, log₂7≈2.807, memorise all 7 Mᵢ and 4 Cᵢⱼ",
      "Worst case for Quicksort: BOTH sorted AND reverse-sorted input",
      "Mergesort: always Θ(n log n), stable, needs Θ(n) space",
      "Binary Search worst: ⌊log₂n⌋+1. For n=10⁶: 20 comparisons.",
    ],
    questions: [],
  },

  "u2-complexity-table": {
    title: "Unit 2 Master Theorem Examples",
    emoji: "📊",
    tldr: "All Unit 2 recurrences solved by Master Theorem with worked case identification.",
    explanation: `Complete worked-out Master Theorem table for all Unit 2 algorithms.`,
    keyPoints: [
      "All recurrences from Unit 2 identified and solved",
      "d = log_b(a) computed for each",
      "Case identification shown",
    ],
    formula: {
      code: `All recurrences: T(n) = aT(n/b) + f(n). d = log_b(a).

Recurrence             │ a │ b │ d=log_b(a) │ f(n) │ vs nᵈ   │ Case │ Solution
───────────────────────┼───┼───┼────────────┼──────┼─────────┼──────┼──────────────
T=2T(n/2)+n-1          │ 2 │ 2 │ 1          │ n-1  │ Θ(n)   │  2   │ Θ(n log n)
T=2T(n/2)+1            │ 2 │ 2 │ 1          │ 1    │ O(n⁰)  │  1   │ Θ(n)
T=T(n/2)+1             │ 1 │ 2 │ 0          │ 1    │ Θ(1)   │  2   │ Θ(log n)
T=T(n/2)+n²            │ 1 │ 2 │ 0          │ n²   │ Ω(n⁰⁺ᵉ)│  3   │ Θ(n²)
T=8T(n/2)+n            │ 8 │ 2 │ 3          │ n    │ O(n²)  │  1   │ Θ(n³)
T=8T(n/2)+n²           │ 8 │ 2 │ 3          │ n²   │ O(n²)  │  1   │ Θ(n³)
T=7T(n/2)+n²           │ 7 │ 2 │ ≈2.807     │ n²   │ O(n²⁻ᵉ)│  1   │ Θ(n^2.807)
T=3T(n/2)+n            │ 3 │ 2 │ ≈1.585     │ n    │ O(n¹⁻ᵉ)│  1   │ Θ(n^1.585)
T=4T(n/2)+n            │ 4 │ 2 │ 2          │ n    │ O(n)   │  1   │ Θ(n²)
T=4T(n/2)+n²           │ 4 │ 2 │ 2          │ n²   │ Θ(n²)  │  2   │ Θ(n²log n)
T=4T(n/2)+n³           │ 4 │ 2 │ 2          │ n³   │ Ω(n²⁺ᵉ)│  3   │ Θ(n³)
T=2T(n/3)+1            │ 2 │ 3 │ log₃2≈0.63 │ 1    │ O(n⁻ᵉ) │  1   │ Θ(n^0.63)
T=3T(n/3)+n            │ 3 │ 3 │ 1          │ n    │ Θ(n)   │  2   │ Θ(n log n)

Key values to memorise:
  log₂7 ≈ 2.807   (Strassen)
  log₂3 ≈ 1.585   (Karatsuba)
  log₂2 = 1       (Mergesort, Quicksort)
  log₂1 = 0       (Binary Search)`,
      explanation: "For Case 1: d > degree of f. Case 2: d = degree of f. Case 3: d < degree of f (roughly).",
    },
    examTips: [
      "Always compute d=log_b(a) first — it's the threshold",
      "If f(n)=nᵈ exactly → Case 2 → multiply by log n",
      "If f(n)=nᵈ⁻¹ (one degree lower) → Case 1 → answer is nᵈ",
      "If f(n)=nᵈ⁺¹ (one degree higher) → Case 3 → answer is f(n)",
    ],
    questions: [],
  },

  "u2-pyq-bank": {
    title: "PYQ Bank — Unit 2 Common Exam Questions",
    emoji: "📝",
    tldr: "High-frequency exam questions for DAA Unit 2 — organized by category and difficulty.",
    explanation: `Compiled list of high-probability exam questions for DAA Unit 2.`,
    keyPoints: [
      "Trace questions: Mergesort, Quicksort, Insertion Sort, Binary Search",
      "Recurrence/Master Theorem: identify a, b, d, apply correct case",
      "Strassen: compute M₁..M₇ for given 2×2 matrices",
      "Topological sort: DFS and source-removal methods",
    ],
    formula: {
      code: `CATEGORY 1: ALGORITHM TRACES (5–8 marks each)
─────────────────────────────────────────────────────────────
Q: Trace Insertion Sort on [8, 5, 3, 7, 1, 4].
Q: Trace Mergesort on [5, 3, 8, 1, 4, 2, 7, 6].
Q: Trace Quicksort partition (Hoare) on [51,95,66,72,42,38,39,41,15].
Q: Trace Binary Search for K=17 in sorted array of 15 elements.
Q: Trace Topological Sort (DFS + Source Removal) on a given DAG.
Q: Trace Josephus for n=10. Find J(10).
Q: Trace Russian Peasant Multiplication for 45 × 37.
Q: Apply Strassen to 2×2 matrices A and B.
Q: Apply Karatsuba to two 4-digit numbers.

CATEGORY 2: MASTER THEOREM (4–6 marks each)
─────────────────────────────────────────────────────────────
Q: Solve T(n) = 4T(n/2) + n using Master Theorem.
   a=4,b=2,d=2,f=n<n² → Case 1 → Θ(n²)

Q: Solve T(n) = 2T(n/2) + n log n using Master Theorem.
   GAP — does not apply. Answer: Θ(n log² n) by extended theorem.

Q: Identify which case of Master Theorem applies to Mergesort.
   a=2,b=2,d=1,f=n=Θ(n¹)=Θ(nᵈ) → Case 2 → Θ(n log n)

Q: Solve T(n) = 3T(n/4) + n. Verify regularity condition.
   d=log₄3≈0.79, f=n=Ω(n^0.79+ε), 3f(n/4)=(3n/4)≤(3/4)n → c=3/4 → Case 3 → Θ(n)

CATEGORY 3: ALGORITHM PROPERTIES (3–5 marks each)
─────────────────────────────────────────────────────────────
Q: Compare Mergesort and Quicksort on: stability, in-place, worst case.
Q: Is Insertion Sort stable? Why? Is it in-place? Online?
Q: What are the worst case inputs for Quicksort with leftmost pivot?
Q: Why is Quickselect O(n) average but O(n²) worst?
Q: What is a k-sorted array? What is Insertion Sort's complexity on it?
Q: Why is 3-way Fake Coin optimal? State the information-theoretic argument.

CATEGORY 4: RECURRENCE DERIVATION (4–6 marks each)
─────────────────────────────────────────────────────────────
Q: Write and solve the recurrence for Binary Search.
   C(n) = C(⌊n/2⌋) + 1, C(1) = 1 → ⌊log₂n⌋+1 ∈ Θ(log n)

Q: Write and solve the recurrence for Mergesort.
   C(n) = 2C(n/2) + (n-1), C(1) = 0 → Θ(n log n)

Q: Write and solve the recurrence for Fake Coin (3-way).
   W(n) = W(⌈n/3⌉) + 1, W(1) = 0 → ⌈log₃n⌉

Q: Write and solve the recurrence for Strassen's multiplications.
   M(n) = 7M(n/2), M(1) = 1 → n^(log₂7)

CATEGORY 5: SHORT ANSWER / MCQ (2–3 marks each)
─────────────────────────────────────────────────────────────
Q: What is the worst case for Quicksort? → Sorted or reverse-sorted input
Q: Is Mergesort stable? → YES
Q: Is Quicksort in-place? → YES (with O(log n) stack)
Q: Strassen: how many multiplications for n×n? → 7^(log₂n) = n^(log₂7)
Q: J(16) = ? → 1 (binary: 10000 → 00001 = 1)
Q: Topological sort exists iff G is a ___? → DAG (Directed Acyclic Graph)
Q: DFS generates what kind of edges in directed graphs? → Tree, back, cross, forward
Q: BFS gives what kind of paths? → Shortest paths (minimum edges)
Q: Johnson-Trotter: each consecutive permutation differs by how many swaps? → 1
Q: For Karatsuba with n=4 digits, how many sub-multiplications? → 3 (not 4)`,
      explanation: "Focus on algorithm traces and Master Theorem application — these are the most frequently tested.",
    },
    examTips: [
      "Mergesort trace: always show the merge step explicitly with comparisons counted",
      "Quicksort: show i and j scanning and swapping in Hoare partition",
      "Topological sort: show BOTH methods (DFS popping order + source removal)",
      "Master Theorem: compute d first, then classify f(n) vs nᵈ",
    ],
    questions: [
      {
        q: "State and explain the three cases of the Master Theorem with one example each.",
        a: "T(n)=aT(n/b)+f(n), d=log_b(a). Case 1: f(n)=O(n^(d-ε)) → T(n)=Θ(nᵈ). Recursive leaves dominate. Example: T(n)=8T(n/2)+n, d=3, f=n<n³ → Θ(n³). Case 2: f(n)=Θ(nᵈ) → T(n)=Θ(nᵈ log n). Balanced cost at each level. Example: T(n)=2T(n/2)+n, d=1, f=n=Θ(n) → Θ(n log n). Case 3: f(n)=Ω(n^(d+ε)) + regularity → T(n)=Θ(f(n)). Combine/root cost dominates. Example: T(n)=T(n/2)+n², d=0, f=n²>n⁰ → Θ(n²).",
      },
      {
        q: "Why is Mergesort preferred for linked lists while Quicksort is preferred for arrays?",
        a: "Mergesort: The merge step accesses elements sequentially, which is efficient for linked lists (no random access needed). For arrays, merging requires Θ(n) extra space. For linked lists, merging can be done in-place by relinking pointers. Quicksort: The partition step requires random access (jumping between indices i and j), which is O(n) for linked lists but O(1) for arrays. Also, Quicksort has good cache performance for arrays (sequential scan in partition). Summary: Mergesort is natural for linked lists (merge = pointer manipulation). Quicksort is natural for arrays (partition = index arithmetic).",
      },
    ],
  },

  "u2-common-mistakes": {
    title: "Common Exam Mistakes — Unit 2",
    emoji: "⚠️",
    tldr: "The most frequent errors in DAA Unit 2 exams and how to avoid them.",
    explanation: `Learn from the most common errors before your exam.`,
    keyPoints: [
      "Classifying Insertion Sort as Divide-and-Conquer",
      "Wrong Master Theorem case identification",
      "Mergesort recursion details (merge comparisons, space)",
      "Quicksort worst case (forgetting it applies to BOTH sorted and reverse-sorted)",
    ],
    formula: {
      code: `MISTAKE 1: Calling Insertion Sort "Divide and Conquer"
  ✗ Wrong: "Insertion Sort divides the array into two halves"
  ✓ Right: Insertion Sort is DECREASE and Conquer. It sorts A[0..n-2] first
           (one smaller subproblem), then inserts A[n-1]. ONE sub-problem,
           no combine step. Mergesort is Divide-and-Conquer (two sub-problems, merge step).

MISTAKE 2: Wrong Master Theorem case
  ✗ Wrong: T(n)=2T(n/2)+n → "Case 1 because f=n is simple"
  ✓ Right: d=log₂2=1, nᵈ=n, f(n)=n=Θ(n)=Θ(nᵈ) → CASE 2 → Θ(n log n)
  Rule: f=nᵈ exactly → Case 2. f smaller → Case 1. f larger → Case 3.

MISTAKE 3: Mergesort merge comparison count
  ✗ Wrong: "Merge step does n comparisons"
  ✓ Right: Merging B[0..p-1] and C[0..q-1] does at MOST p+q-1 comparisons.
           The -1 because the last element added requires no comparison.
           Total per level ≤ n-1 comparisons.

MISTAKE 4: Quicksort worst case
  ✗ Wrong: "Quicksort's worst case is only for sorted input"
  ✓ Right: BOTH sorted AND reverse-sorted input are worst cases with leftmost pivot.
           In both cases, the pivot is always at one extreme.

MISTAKE 5: Mergesort is NOT in-place
  ✗ Wrong: "Mergesort uses O(1) extra space"
  ✓ Right: Mergesort needs Θ(n) extra space for the temporary arrays during merge.
           Quicksort IS in-place (uses only O(log n) stack space on average).

MISTAKE 6: Binary search worst case formula
  ✗ Wrong: "Binary search worst case = log₂n"
  ✓ Right: C_worst(n) = ⌊log₂n⌋ + 1 (the +1 matters for exact count).
           For n=8: ⌊log₂8⌋+1 = 3+1 = 4 comparisons, not 3.

MISTAKE 7: Josephus formula confusion
  ✗ Wrong: J(2k) = 2J(k) + 1 (confusing odd and even formulas)
  ✓ Right: J(2k) = 2J(k) - 1 (EVEN → subtract 1)
           J(2k+1) = 2J(k) + 1 (ODD → add 1)
  Mnemonic: Even eliminates = subtract. Odd stays = add.

MISTAKE 8: Strassen Cᵢⱼ formulas
  ✗ Wrong: C₁₁ = M₁ + M₂ + M₃ (random guesses)
  ✓ Right: MEMORISE exactly:
    C₁₁ = M₁ + M₄ - M₅ + M₇
    C₁₂ = M₃ + M₅
    C₂₁ = M₂ + M₄
    C₂₂ = M₁ - M₂ + M₃ + M₆

MISTAKE 9: Fake coin speedup
  ✗ Wrong: "3-way is 3/2 = 1.5× faster"
  ✓ Right: Speedup = log₂n/log₃n = log₃2 ≈ 1.585 (not 1.5)
           This comes from change of base: log₃2 = ln2/ln3 ≈ 0.693/1.099 ≈ 1.585 ÷ 1 = ratio.
           Wait: speedup is W₂/W₃ = log₂n/log₃n = log₂n/(log₂n/log₂3) = log₂3 ≈ 1.585.

MISTAKE 10: Russian Peasant — which column to add
  ✗ Wrong: "Add n (left column) to result when n is odd"
  ✓ Right: Add M (right column = doubled value) to result when N (left column) is odd.
           You halve N, double M, add M when N is odd.`,
      explanation: "The Josephus even/odd formulas are the most commonly confused. Write them on scrap paper at the start of your exam.",
    },
    examTips: [
      "Insertion Sort = Decrease & Conquer (NOT Divide & Conquer) — worth 2+ marks",
      "Master Theorem: f=nᵈ → Case 2, NOT Case 1. The equal case is Case 2.",
      "Quicksort worst = sorted OR reverse-sorted (mention BOTH)",
      "Mergesort: Θ(n) space (NOT in-place). Quicksort: in-place.",
    ],
    questions: [
      {
        q: "A student says: 'Quicksort is always better than Mergesort because Quicksort is in-place.' Evaluate this claim.",
        a: "PARTIALLY correct, mostly wrong. Correct part: Quicksort IS in-place (O(log n) stack space) while Mergesort needs Θ(n) extra space — advantage for memory-constrained systems. But 'always better' is wrong for multiple reasons: (1) Quicksort worst case is Θ(n²) on sorted/reverse-sorted input; Mergesort is always Θ(n log n). (2) Mergesort is stable; Quicksort is not — matters when maintaining order of equal elements. (3) Mergesort is better for external sorting (disk-based) and linked lists. (4) In practice, Quicksort with random pivot is usually faster, but for guaranteed performance, Mergesort or Heapsort is preferred.",
      },
      {
        q: "Why does the Master Theorem fail for T(n) = 2T(n/2) + n log n, and what is the answer?",
        a: "a=2, b=2, d=log₂2=1, nᵈ=n. f(n)=n log n. For Case 2: f(n)=Θ(nᵈ)=Θ(n)? No, n log n ∉ O(n) (limit n log n/n = log n → ∞). For Case 3: f(n)=Ω(n^(1+ε))? n log n ∉ Ω(n^1.001) (log n << n^0.001 is false... actually log n grows slower than any polynomial n^ε). So f falls in a GAP between Cases 2 and 3. The Master Theorem does NOT apply. The correct answer (by extended/Akra-Bazzi): T(n) ∈ Θ(n log² n). This appears in analysis of bottom-up Mergesort variants.",
      },
    ],
  },
};