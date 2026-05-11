
export const groups = [
  { name: "⚡ Memory Intro", ids: ["mem-intro", "mem-spec", "mem-hierarchy", "cache-intro", "cache-mechanics", "locality"] },
  { name: "🔍 Cache Terminology", ids: ["cache-terms", "four-questions", "block-placement", "hit-miss-id", "read-write-hit-miss"] },
  { name: "✏️ Write Policies", ids: ["write-problem", "write-through", "write-back", "write-on-miss", "cache-friendly-code"] },
  { name: "🗺️ Mapping Techniques", ids: ["direct-mapping", "associative-mapping", "set-associative", "replacement-algos"] },
  { name: "📊 Replacement Exercises", ids: ["replacement-ex1", "replacement-ex2", "replacement-ex3", "replacement-ex4", "replacement-ex5", "replacement-compare"] },
  { name: "📈 Cache Performance", ids: ["perf-factors", "amat", "miss-penalty-steps", "perf-examples"] },
  { name: "🏗️ Cache Optimizations Overview", ids: ["opt-framework", "three-cs", "conflict-by-assoc"] },
  { name: "🔧 Optimizations 1–3 (Miss Rate)", ids: ["opt1-block-size", "opt2-cache-size", "opt3-associativity"] },
  { name: "⚡ Optimizations 4–5 (Miss Penalty)", ids: ["opt4-multilevel", "opt5-reads-priority"] },
  { name: "🎯 Optimization 6 (Hit Time / VIPT)", ids: ["opt6-vipt", "pipt", "vipt", "case-study-1", "case-study-2"] },
  { name: "📝 Quick Reference", ids: ["formula-sheet", "six-opt-summary", "three-cs-summary", "write-policy-summary"] },
  { name: "🎓 PYQ Problems (ESA Style)", ids: ["pyq1", "pyq2", "pyq3", "pyq4", "pyq5", "pyq6", "pyq7", "pyq8", "pyq9", "pyq10", "pyq11", "pyq12"] },
];

export const topics = {
  "mem-intro": {
    title: "The CPU vs. Memory Problem", emoji: "🖥️",
    tldr: "CPUs improve ~55%/year, memory only ~7%/year. This ever-widening gap is why cache exists.",
    explanation: `When a program runs, both the program itself and the data it uses live in memory. The CPU fetches instructions and data from memory to execute them. The core problem: the CPU is far faster than memory.

CPU performance improves by roughly 55% per year. Memory (DRAM) performance improves by only about 7% per year. This creates a widening performance gap — if you drew a log-scale graph from 1980 to 2010, the CPU line would shoot up to ~10,000× while the memory line barely reaches ~10×. The gap between them grows every single year.

Because of this gap, fast memory (SRAM) is much more expensive per bit than slow memory (DRAM). This creates a design challenge: if you make memory bigger, it gets slower; if you make it smaller and faster, it costs more. The designer's goal is to provide sufficiently large memory at a reasonable speed and affordable cost — and the answer is the memory hierarchy.`,
    keyPoints: [
      "CPU improves ~55%/year; DRAM improves only ~7%/year → ever-widening performance gap",
      "Fast memory (SRAM) = expensive per bit; Slow memory (DRAM) = cheap per bit",
      "If size ↑ → speed ↓; If size ↓ → cost ↑ per bit",
      "Designer's goal: large enough capacity + acceptable speed + affordable cost",
      "Solution: organize memory into a hierarchy with different speed/cost levels",
      "Memory Latency = time to transfer a single word to/from memory",
      "Memory Bandwidth = number of bits/bytes transferred per second",
      "MAR (Memory Address Register) connects CPU to memory via M-bit address bus",
      "MDR (Memory Data Register) connects CPU to memory via B-bit data bus",
      "2^M addressable memory locations, each S bits wide (typically S = 8, byte-addressable)",
    ],
    formula: {
      code: `Memory Specification:
  Address bus = M bits → 2^M addressable locations
  Data bus = B bits (typically 8 or 16)
  Each location = S bits (typically S = 8, byte-addressable)
  Word size = W = 32 bits (4 bytes)

Performance Gap (rough numbers):
  Year 1980:  CPU ~ 1×,  DRAM ~ 1×
  Year 2010:  CPU ~ 10,000×,  DRAM ~ 10×
  → Gap = ~1000× by 2010 (log scale graph)`,
      explanation: "The M-bit address bus gives 2^M possible memory locations. A typical modern system: M=32 (4 GB addressable), S=8 bits per byte, W=32 bits (one word = 4 bytes).",
    },
    examTips: [
      "Memory Latency ≠ Bandwidth — latency is delay per word; bandwidth is throughput per second",
      "The performance gap is WHY cache exists — it's the motivation for all of Unit 3",
      "MAR holds the address; MDR holds the data being transferred",
    ],
    questions: [
      { q: "Why is there a performance gap between CPU and memory?", a: "CPUs improve through better transistors, pipelining, and microarchitecture (~55%/year). DRAM memory is limited by physical access time and capacitor technology (~7%/year). These different improvement rates mean the gap widens every year." },
      { q: "What is the difference between memory latency and memory bandwidth?", a: "Memory Latency = the time delay to transfer one word of data to or from memory. Memory Bandwidth = the number of bits or bytes that can be transferred per second. Latency measures delay; bandwidth measures throughput." },
    ],
  },

  "mem-spec": {
    title: "Memory Hierarchy Levels", emoji: "🏔️",
    tldr: "5–6 levels from registers to tape/disk. Higher = faster, smaller, costlier. Lower = slower, bigger, cheaper.",
    explanation: `The memory hierarchy arranges storage into levels. The entire addressable memory space lives in the largest, slowest, cheapest level at the bottom. Smaller, faster, more expensive levels sit above it — each holding a subset of what's below.

Levels from top (fastest/smallest) to bottom (slowest/biggest): Registers → L1 Cache → L2 Cache → (L3 Cache on servers) → Main Memory (DRAM) → Disk Storage → Tape.

Server example: CPU Registers (1000 bytes, 300 ps) → L1 Cache (64 KB, 1 ns) → L2 Cache (256 KB, 3–10 ns) → L3 Cache (2–4 MB, 10–20 ns) → Main Memory (4–16 GB, 50–100 ns) → Disk (4–16 TB, 5–10 ms).

Mobile device example: CPU Registers (500 bytes, 500 ps) → L1 Cache (64 KB, 2 ns) → L2 Cache (256 KB, 10–20 ns) → Main Memory (256–512 MB, 50–100 ns) → FLASH Storage (4–8 GB, 25–50 μs).

The on-chip boundary (between L2/L1/Registers on one side and Main Memory/Disk/Tape on the other) is a critical design line — crossing it is slow.`,
    keyPoints: [
      "Each level holds a SUBSET of the level below it",
      "Going up: faster, smaller, more expensive per bit",
      "Going down: slower, bigger, cheaper per bit",
      "Transfer unit changes at each level: Tape=Files, Disk=Pages, Memory=Blocks (64-128B), L1/L2=Blocks (32-64B), Registers=Instructions",
      "Registers: ~100s bytes, 300–500 ps (fastest)",
      "L1 Cache: ~10s–100s KB, ~1 ns",
      "L2 Cache: ~10s–100s KB to MB range, ~10 ns",
      "Main Memory: GB range, 80–200 ns",
      "Disk: 10s of TB, ~10 ms (10,000,000 ns)",
      "Tape: essentially infinite, seconds to minutes",
      "On-chip (Registers, L1, L2) vs. off-chip (Main Memory, Disk) boundary is a critical line",
    ],
    formula: {
      code: `Memory Hierarchy Levels (Server):
  Level        │ Size        │ Access Time  │ Transfer Unit
  ─────────────┼─────────────┼──────────────┼───────────────
  Registers    │ ~1000 bytes │ 300–500 ps   │ Instructions
  L1 Cache     │ ~64 KB      │ ~1 ns        │ Blocks (32-64B)
  L2 Cache     │ ~256 KB     │ 3–10 ns      │ Blocks (32-64B)
  L3 Cache     │ 2–4 MB      │ 10–20 ns     │ Blocks (64B)
  Main Memory  │ 4–16 GB     │ 50–100 ns    │ Blocks (64-128B)
  Disk         │ 4–16 TB     │ 5–10 ms      │ Pages
  Tape         │ Infinite    │ seconds-min  │ Files`,
      explanation: "1 ns = 1,000 ps. 1 ms = 1,000,000 ns. The jump from main memory (100 ns) to disk (10 ms) is a 100,000× difference in speed — this is why virtual memory page faults are catastrophic for performance.",
    },
    examTips: [
      "Know the access times: Registers (~300ps), L1 (~1ns), L2 (~10ns), DRAM (~100ns), Disk (~10ms)",
      "Transfer unit at each level: Instructions (registers), Blocks (caches), Blocks (DRAM), Pages (disk)",
      "On-chip = fast; Off-chip = slow. The boundary matters.",
    ],
    questions: [
      { q: "What does it mean for one memory level to hold a 'subset' of the level below?", a: "Any data that is in a higher (faster) level must also exist in the level below. For example, whatever is in L1 cache is also in L2 cache and in main memory. The higher level is just a fast copy of part of the lower level." },
    ],
  },

  "mem-hierarchy": {
    title: "How the Hierarchy Works Together", emoji: "🔗",
    tldr: "CPU checks L1 first, then L2, then memory. Data always moves between adjacent levels. The hierarchy makes the system appear to have the speed of the fastest level and the size of the largest level.",
    explanation: `The memory hierarchy works as a chain. When the CPU needs data:

1. It first checks L1 cache (fastest). If found (HIT) → done, very fast.
2. If not in L1 (MISS), check L2 cache. If found → copy to L1, return to CPU.
3. If not in L2, check L3 (if it exists). If found → copy up through L2 to L1.
4. If nowhere in any cache → go to main memory. Fetch the block, copy it into L1 (and L2).
5. If the data is on disk (virtual memory) → extremely slow page fault.

Key principle: data always moves between adjacent levels — you never skip from disk directly into L1.

The illusion the hierarchy creates: the programmer sees what looks like a single, large, fast memory. But underneath, the hardware is managing multiple levels automatically so the common case (recently-used data) is served from the fastest level.`,
    keyPoints: [
      "CPU looks for data top-down: L1 → L2 → L3 → Main Memory → Disk",
      "On a miss at level N: fetch from level N+1, install into level N",
      "Data always moves between ADJACENT levels — no skipping",
      "The goal: give programmer the illusion of large + fast memory",
      "Cache is an architectural arrangement — transparent to the programmer",
      "Data transferred between levels in fixed-size block units",
      "Each level is a strict subset of the level below it (inclusion property)",
    ],
    formula: null,
    examTips: [
      "Adjacent levels rule: miss at L1 → fetch from L2. Miss at L2 → fetch from main memory.",
      "Cache is TRANSPARENT — the programmer does not manage it; hardware does.",
    ],
    questions: [],
  },

  "cache-intro": {
    title: "What is Cache Memory?", emoji: "⚡",
    tldr: "Cache makes main memory appear faster than it really is. It sits between CPU and RAM. Transparent to the programmer.",
    explanation: `Cache memory is an architectural arrangement that makes main memory appear faster to the processor than it actually is. It acts as a middleman: the CPU sends a request, the cache intercepts it. If the data is already in cache (a hit), it is returned immediately without touching slow main memory. If not (a miss), the cache fetches it from main memory and then returns it.

This whole process is completely transparent to the programmer — the programmer writes code that accesses memory addresses as normal, and the hardware handles the cache automatically.

The cache is much smaller than main memory but much faster. It works because of a property of real programs called locality of reference — programs tend to re-access the same data and code repeatedly, and they tend to access nearby memory locations together. This means a small cache can satisfy most memory requests.`,
    keyPoints: [
      "Cache sits between CPU and main memory — acts as a fast middleman",
      "HIT: data requested is in cache → returned immediately, no main memory access",
      "MISS: data not in cache → fetched from main memory, stored in cache, then returned",
      "Completely transparent to the programmer — programmer doesn't know or care about cache",
      "Cache is much smaller than main memory but much faster (SRAM vs DRAM)",
      "Cache works because real programs have locality of reference",
      "Cache is managed entirely by hardware — no programmer intervention needed",
    ],
    formula: null,
    examTips: [
      "Cache is TRANSPARENT — programmers access memory addresses; the hardware handles the rest",
      "HIT = data found in cache (fast). MISS = data not found (slow — must go to main memory)",
      "The purpose of cache: make main memory APPEAR faster to the processor",
    ],
    questions: [
      { q: "What does it mean that cache is 'transparent' to the programmer?", a: "The programmer writes code using normal memory addresses. They don't need to know whether data is in cache or not — the hardware automatically checks the cache, handles hits and misses, and fills the cache from main memory. From the program's perspective, there is just 'memory'." },
    ],
  },

  "cache-mechanics": {
    title: "Cache Mechanics & Block Transfer", emoji: "📦",
    tldr: "Main memory is split into fixed-size blocks. Cache holds copies of some blocks. Data always moves in whole blocks.",
    explanation: `Main memory is divided into fixed-size blocks (e.g., 4 words, 16 words, 64 bytes). The cache holds copies of a small subset of these blocks at any given time.

When a miss occurs, the cache doesn't fetch just the one word requested — it fetches the entire block containing that word. For example, if word 35 is needed and blocks are 4 words each, the entire block {32, 33, 34, 35} is copied into a cache line.

Why fetch the whole block? Because of spatial locality — if word 35 was needed, words 36, 37, 38 are likely to be needed soon. Fetching them all at once is efficient.

When the cache is full and a new block must be loaded, one of the existing blocks must be evicted (removed) to make room. Which block to evict is the replacement problem. The evicted block is discarded (or written back to memory if modified).`,
    keyPoints: [
      "Main memory is divided into equal-sized blocks (e.g., 16 words each)",
      "Cache holds a small number of these blocks at any time",
      "On a MISS: the entire block containing the requested word is fetched",
      "Data always moves in whole blocks — not word by word",
      "Block size = Line size (these terms are interchangeable)",
      "When cache is full: one block must be evicted to make room for the new block",
      "Number of cache lines << Number of blocks in main memory",
      "Example: 4096 memory blocks → 128 cache lines: 32 blocks compete for each cache line",
    ],
    formula: {
      code: `Cache Terminology Example:
  Main memory: 16-bit address → 2^16 = 65,536 (64K) words
  Block size: 16 words per block
  Number of memory blocks: 64K / 16 = 4,096 blocks
  Cache: 128 lines, each 16 words wide
  Cache total size: 128 × 16 = 2,048 (2K) words
  Blocks per cache line: 4096 / 128 = 32
  → 32 different memory blocks compete for each cache line`,
      explanation: "With 32 blocks competing per cache line, conflict misses are common. This is why associativity (letting blocks go to multiple lines) was invented.",
    },
    examTips: [
      "Block = fixed-size chunk of main memory. Line = slot in cache that holds one block.",
      "Block size = Line size — they're the same thing, just different names",
      "Always remember: a MISS fetches the whole block, not just the single word",
    ],
    questions: [
      { q: "Why is data always transferred in whole blocks instead of individual words?", a: "Because of spatial locality — if one word in a block was needed, neighboring words in that block are very likely to be needed soon. Fetching the whole block at once means future accesses to nearby words will be cache hits, reducing the total number of slow memory accesses." },
    ],
  },

  "locality": {
    title: "Locality of Reference", emoji: "🔁",
    tldr: "90/10 rule: 90% of execution time is spent in 10% of code. Temporal = reuse same data. Spatial = access nearby data.",
    explanation: `Why does the memory hierarchy work at all? Because of the 90/10 rule: real programs spend 90% of their execution time running just 10% of their code. This is called locality of reference.

Temporal Locality (locality in time): If a memory location is accessed, it will very likely be accessed again soon. Example: the variable 'sum' inside a for-loop is read and written every single iteration — it's reused over and over. This means once we load it into cache, it stays useful for many cycles.

Spatial Locality (locality in space): If a memory location is accessed, the nearby memory locations will very likely be accessed soon. Example: an array accessed element by element — a[0], a[1], a[2], ... These are stored consecutively in memory. Fetching a whole block brings in multiple array elements at once.

Together these two properties mean: we don't need to put all the program in fast memory (temporal locality means only the currently active part matters), and we don't need to fetch single words (spatial locality means fetching blocks is efficient). This is exactly why the hierarchy works.`,
    keyPoints: [
      "90/10 Rule: programs spend 90% of time in 10% of code — heavily used regions (loops, hot paths)",
      "Temporal Locality: recently accessed item will likely be accessed again soon",
      "Spatial Locality: if item X accessed, items near X in memory will likely be accessed soon",
      "Temporal → keep recently used data in cache (exploited by caching itself)",
      "Spatial → transfer whole blocks, not single words (exploited by block transfer)",
      "Loops → temporal locality (loop body executed repeatedly)",
      "Arrays accessed sequentially → spatial locality (adjacent elements in memory)",
      "Block transfer exploits spatial locality — fetching neighbors saves future misses",
      "Cache retention exploits temporal locality — keep recently used data in cache",
      "Most programs naturally exhibit both types — this makes caching work well",
    ],
    formula: {
      code: `// Code example showing both types of locality:
for (int i = 0; i < N; i++) {
    sum += a[i];  // sum = TEMPORAL locality (reused every iteration)
                  // a[i] = SPATIAL locality (sequential array access)
}

// Row-wise = GOOD (spatial locality: a[0][0], a[0][1], a[0][2]... are adjacent)
for (i = 0; i < M; i++)
    for (j = 0; j < N; j++)
        sum += a[i][j];   // Miss rate = 1/block_size (e.g., 25% for 4-word blocks)

// Column-wise = BAD (no spatial locality: a[0][0], a[1][0], a[2][0]... are far apart)
for (j = 0; j < N; j++)
    for (i = 0; i < M; i++)
        sum += a[i][j];   // Miss rate = 100% (every access is a new block)`,
      explanation: "In a 2D array stored in row-major order (C style), a[i][j] and a[i][j+1] are adjacent in memory. a[i][j] and a[i+1][j] are N words apart. Column-wise access skips over N-1 elements between accesses, thrashing the cache.",
    },
    examTips: [
      "Temporal = TIME (reuse same location). Spatial = SPACE (nearby locations).",
      "Loops → temporal. Arrays → spatial. Most real code has both.",
      "Row-wise traversal of 2D arrays = good cache behavior. Column-wise = terrible.",
    ],
    questions: [
      { q: "Why does row-wise traversal of a 2D array have better cache behavior than column-wise?", a: "In C, 2D arrays are stored in row-major order: a[i][0], a[i][1], a[i][2],... are consecutive in memory. Row-wise traversal accesses consecutive addresses, so loading one block brings in multiple useful elements (spatial locality). Column-wise traversal accesses a[0][j], a[1][j], a[2][j]... which are N words apart — each access falls in a different block, causing a miss every time." },
      { q: "Give one example of temporal locality and one example of spatial locality in a simple loop.", a: "Temporal: the loop counter variable 'i' is accessed and updated every single iteration — same memory location reused many times. Spatial: if iterating over array a[], each access a[i] is adjacent in memory to a[i+1], so loading one block brings in multiple consecutive elements that will be needed in the next iterations." },
    ],
  },

  "cache-terms": {
    title: "Cache vs. Main Memory Terminology", emoji: "📚",
    tldr: "Block = chunk in main memory. Line = slot in cache. Block size = Line size. Cache has far fewer lines than memory has blocks.",
    explanation: `Before going into cache design, it's critical to nail down the terminology.

A Block is a fixed-size unit of data in main memory. All blocks are the same size. For example, if blocks are 16 words each, then main memory is divided into consecutive 16-word chunks: block 0 (words 0–15), block 1 (words 16–31), block 2 (words 32–47), and so on.

A Line is a slot in the cache that can hold exactly one block of data. The cache has far fewer lines than main memory has blocks. When a block is loaded into a cache line, the line also stores a tag (to identify which block it holds) and a valid bit (to indicate the line contains meaningful data).

Block Size = Line Size — these two always match because a line holds one block.

Important numbers: if main memory has 4096 blocks and the cache has 128 lines, then on average 32 different blocks compete for each cache line. This competition causes conflict misses.

Valid Bit: each cache line has a 1-bit flag. When the system starts up, all valid bits = 0 (no meaningful data). When a block is loaded into a line, the valid bit is set to 1. A hit requires BOTH the tag to match AND the valid bit to be 1.

Dirty Bit (write-back caches only): a 1-bit flag indicating the cache line has been modified (written to) but the change has NOT yet been written back to main memory. Dirty = 1 means cache and memory are out of sync.`,
    keyPoints: [
      "Block: fixed-size chunk of main memory (e.g., 16 words). All blocks same size.",
      "Line: one slot in the cache that can hold exactly one block",
      "Block Size = Line Size (these terms are interchangeable)",
      "Cache has MUCH fewer lines than memory has blocks (# lines << # blocks)",
      "Every cache line also stores a TAG (which block is here) and a VALID BIT (is data valid?)",
      "Valid Bit = 0 → empty/invalid (e.g., at startup). Valid Bit = 1 → meaningful data present.",
      "Dirty Bit = 1 → cache modified, memory stale (write-back only). Dirty Bit = 0 → cache = memory (clean).",
      "Block Transfer: on a miss, entire block is fetched from memory into one cache line",
      "Hit Rate = Hits / Total Accesses. Miss Rate = 1 − Hit Rate = Misses / Total Accesses.",
      "Hit Time = time for a cache hit. Miss Penalty = extra time to fetch from memory on a miss.",
      "Example: 4K blocks / 128 lines = 32 blocks compete per line → high conflict miss risk",
    ],
    formula: {
      code: `Example Calculation:
  Main memory: 16-bit address → 64K words
  Block size: 16 words
  Number of memory blocks: 64K / 16 = 4096 blocks
  Cache lines: 128
  Cache capacity: 128 × 16 = 2K words
  Competition per line: 4096 / 128 = 32 blocks per line

Cache Line Structure (Write-Through):
  [ Valid Bit (1b) | Tag (n bits) | Data (block_size bits) ]

Cache Line Structure (Write-Back):
  [ Valid Bit (1b) | Dirty Bit (1b) | Tag (n bits) | Data (block_size bits) ]`,
      explanation: "The tag is needed to know WHICH of the 32 competing blocks is currently occupying a given line. The valid bit tells us if the data is meaningful. The dirty bit (write-back only) tells us if the cache is ahead of memory.",
    },
    examTips: [
      "Block is in main memory. Line is in cache. A line HOLDS a block.",
      "Block size = Line size — always equal.",
      "Valid bit = 1 means the line has real data. 0 = empty/invalid (e.g., at startup).",
      "Dirty bit is ONLY needed for write-back caches. Write-through does NOT need a dirty bit.",
    ],
    questions: [
      { q: "What is the dirty bit and when is it used?", a: "The dirty bit is a 1-bit flag in each cache line used only in write-back caches. When the CPU writes to a cache line, the dirty bit is set to 1, indicating the cached data has been modified but the corresponding main memory location has NOT yet been updated. When a dirty line is evicted, it must first be written back to memory. Write-through caches do not need a dirty bit because they always update memory immediately." },
    ],
  },

  "four-questions": {
    title: "The Four Core Cache Design Questions", emoji: "❓",
    tldr: "Every cache answers 4 questions: Where can a block go? How do we find it? Which block to replace? What happens on a write?",
    explanation: `Any cache design must answer exactly four fundamental questions. Every cache optimization, policy, and tradeoff in this unit is ultimately about one of these four questions.

Q1 — Block Placement (Where can a block go?): Can a block go anywhere in the cache, or only in specific lines? This determines the mapping technique (direct, associative, or set-associative).

Q2 — Block Identification (How do we find it?): When we need a piece of data, how do we quickly determine whether it's in the cache? This is done using tag comparison.

Q3 — Block Replacement (Which block to evict on a miss?): When the cache is full and a new block must be loaded, which existing block gets kicked out? This is the replacement algorithm (FIFO, LRU, Random).

Q4 — Write Strategy (What happens when we write?): When the CPU writes data, do we update only the cache, only memory, or both? This is the write policy (write-through vs write-back, write-allocate vs write-no-allocate).`,
    keyPoints: [
      "Q1 Block Placement: Direct, Fully Associative, or Set-Associative mapping",
      "Q2 Block Identification: Tag comparison — compare tag bits of address with stored tag in cache",
      "Q3 Block Replacement: FIFO, LRU, or Random (only matters for associative caches)",
      "Q4 Write Strategy: Write-Through or Write-Back (on hit); Write-Allocate or Write-No-Allocate (on miss)",
      "These 4 questions apply to EVERY cache level (L1, L2, L3)",
      "All six cache optimizations in this unit are improvements to one of these 4 areas",
    ],
    formula: null,
    examTips: [
      "These 4 questions frame the entire topic — whenever you see a cache design question, classify it into one of these four",
      "Q3 replacement only matters in associative caches — direct mapping has no choice",
      "Q4 write strategy has two separate sub-questions: one for hits and one for misses",
    ],
    questions: [
      { q: "What are the four core cache design questions?", a: "Q1: Block Placement — where can a block go? (Direct/Associative/Set-Associative). Q2: Block Identification — how is a block found? (Tag comparison). Q3: Block Replacement — which block to evict on a miss? (FIFO/LRU/Random). Q4: Write Strategy — what happens on a write? (Write-Through/Write-Back, Write-Allocate/No-Allocate)." },
    ],
  },

  "block-placement": {
    title: "Block Placement — Three Mapping Types", emoji: "🗺️",
    tldr: "Direct: each block → exactly 1 line. Fully Associative: block → any line. Set-Associative: block → any line within one specific set.",
    explanation: `Block placement answers: given a memory block, which cache line(s) can it occupy?

Direct Mapping: Each memory block maps to exactly one specific cache line. The mapping is: Line = Block number mod (Number of cache lines). Simple and fast, but two popular blocks that happen to map to the same line will constantly evict each other (conflict misses). Address split: [Tag | Block/Index | Word].

Fully Associative Mapping: A block can be placed in any cache line, whichever is free. Maximum flexibility — no conflict misses. But to find a block, you must search all cache lines simultaneously (parallel tag comparison needed). Very expensive hardware, slow. Address split: [Tag | Word].

Set-Associative Mapping (n-way): The cache is divided into sets, each containing n lines. A block maps to exactly one set (by address mod number of sets) but can go into any of the n lines within that set. Best of both worlds — some placement freedom (reduces conflict misses) without searching the whole cache. Address split: [Tag | Set | Word].

Note on terminology: the number of lines per set is called 'W' (ways) or 'n' interchangeably. "4-way set associative" means 4 lines per set.`,
    keyPoints: [
      "Direct Mapping: Block → exactly 1 line. Line = Block# mod #Lines. Fast but lots of conflict misses.",
      "Fully Associative: Block → any line. No conflict misses but requires searching ALL tags in parallel. Expensive.",
      "Set-Associative: Block → any line within a specific set. Set = Block# mod #Sets.",
      "n-way set associative = n lines per set. 2-way, 4-way, 8-way are common.",
      "Direct mapping = 1-way set associative (degenerate case: 1 line per set).",
      "Fully associative = n-way where n = total number of lines (all one big set).",
      "Direct: [Tag | Block Index | Word offset]. FA: [Tag | Word offset]. SA: [Tag | Set Index | Word offset].",
      "More associativity → fewer conflict misses but higher hardware cost and hit time",
      "Number of sets S = Total cache lines / W (where W = ways/associativity)",
    ],
    formula: {
      code: `Address Breakdown:
  Direct Mapped:       [ Tag (high bits) | Block Index | Word Offset ]
  Fully Associative:   [ Tag (high bits)              | Word Offset ]
  Set-Associative:     [ Tag (high bits) | Set Index  | Word Offset ]

  Word Offset bits  = log₂(block size in words/bytes)
  Block Index bits  = log₂(number of cache lines)       [direct mapped]
  Set Index bits    = log₂(number of sets)               [set associative]
  Tag bits          = Address bits − Index bits − Offset bits

Example (16-bit address, 128 lines, 16 words/block):
  Word Offset = log₂(16) = 4 bits
  Block Index = log₂(128) = 7 bits
  Tag = 16 − 7 − 4 = 5 bits`,
      explanation: "The Word Offset selects which word within the block. The Index selects which line/set to look in. The Tag identifies which block is currently in that line/set.",
    },
    examTips: [
      "Always start bit calculations from the right: Offset bits → Index bits → Tag bits (the remainder).",
      "Fully associative has NO index bits — tag spans the whole address minus the offset.",
      "Direct mapping is fast (one lookup) but has worst miss rate due to conflicts.",
    ],
    questions: [
      { q: "What is the difference between direct mapping and set-associative mapping?", a: "In direct mapping, each block can only go to one specific cache line (determined by block# mod #lines). No choice. In set-associative, the cache is divided into sets and each block maps to one set, but can occupy any line within that set. So a 4-way set-associative cache gives 4 possible placements instead of 1, drastically reducing conflict misses." },
    ],
  },

  "hit-miss-id": {
    title: "Block Identification — Hit vs. Miss", emoji: "🔍",
    tldr: "On each access: use index to find the line, compare incoming tag with stored tag. Match = HIT. No match = MISS.",
    explanation: `To find out whether a requested block is in the cache, the hardware uses tag comparison.

When the CPU generates a memory address, it is split into three fields: Tag, Index (or Set), and Offset. The Index bits select which cache line (or set) to examine. Then the Tag bits of the incoming address are compared with the Tag stored in that cache line.

If the tags match AND the Valid Bit is 1 → HIT. The word at the given Offset is returned directly.

If the tags don't match, or the Valid Bit is 0 → MISS. The block must be fetched from memory.

Example with 4-bit addresses, 4 cache lines (2-bit index), 2-bit tag:
- Address 1001 (decimal 9): Index = 01, Tag = 10. Look in line 01, stored tag = 01. 10 ≠ 01 → MISS.
- Address 1101 (decimal 13): Index = 01, Tag = 11. Look in line 01, stored tag = 11. 11 = 11 → HIT.`,
    keyPoints: [
      "Address is split into [Tag | Index | Offset] for tag comparison",
      "Index bits → select which cache line or set to look in",
      "Tag bits → compared with stored tag in the selected line",
      "Valid Bit must be 1 for a hit (if 0, it's always a miss regardless of tag)",
      "HIT: tag matches AND valid bit = 1 → data returned from cache immediately",
      "MISS: tag doesn't match OR valid bit = 0 → must fetch from main memory",
      "For fully associative: all tags compared simultaneously in parallel",
      "For set-associative: all n tags in the matched set compared simultaneously",
      "Cache hit detection = compare tag field of incoming address with tag stored in indexed cache line",
    ],
    formula: {
      code: `4-bit address example (4 cache lines, block = 1 word):
  Address format: [ Tag (2 bits) | Index (2 bits) ]

  Cache state:
  Line 00: tag=01, data=?   (Block 01 or 05 or 09 or 13)
  Line 01: tag=11, data=?   (Currently holding block 1101 = block 13)
  Line 10: tag=00, data=?
  Line 11: tag=10, data=?

  Query: address 1001 (block 9 = tag=10, index=01)
  → Look at line 01, stored tag = 11
  → 10 ≠ 11 → MISS ✗

  Query: address 1101 (block 13 = tag=11, index=01)
  → Look at line 01, stored tag = 11
  → 11 = 11 → HIT ✓`,
      explanation: "This tag-compare mechanism is how the cache hardware checks if data is present — it's all combinatorial logic, happening in one clock cycle.",
    },
    examTips: [
      "Index → selects the line. Tag → confirms which block is in that line.",
      "Valid bit is essential — at startup all lines are invalid (valid bit = 0).",
      "For fully associative, since there's no index, ALL lines' tags are compared simultaneously.",
    ],
    questions: [],
  },

  "read-write-hit-miss": {
    title: "Read & Write Hit/Miss Behavior", emoji: "📖",
    tldr: "Read hit: return data from cache. Read miss: fetch block from memory. Write policies determine what happens on write hits and misses.",
    explanation: `On a read hit: the data is returned directly from cache. Fast — no main memory access.

On a read miss: the entire block containing the requested word is transferred from main memory into a cache line. Then the word is given to the processor. This takes many cycles.

Load-Through (Early-Restart): Instead of waiting for the entire block to arrive before forwarding the word to the CPU, the desired word can be forwarded as soon as it arrives on the bus, while the rest of the block continues loading in the background. This reduces the effective read miss penalty.

On a write, two things can happen: we might write to an address that is in cache (write hit) or to an address not in cache (write miss). Each case has different policy options — covered in the Write Policies section.`,
    keyPoints: [
      "Read HIT: data returned from cache immediately — very fast",
      "Read MISS: entire block fetched from main memory — slow (many cycles)",
      "After a read miss: block is stored in cache line, THEN word is returned to CPU",
      "Load-Through / Early-Restart: forward requested word to CPU as soon as it arrives, don't wait for full block — reduces effective miss penalty",
      "Write behavior depends on policy: Write-Through or Write-Back (on hit); Write-Allocate or Write-No-Allocate (on miss)",
    ],
    formula: null,
    examTips: [
      "Load-through = early-restart = same thing. Word forwarded before full block arrives.",
      "Read miss always fetches a full block — remember the block transfer principle.",
    ],
    questions: [],
  },

  "write-problem": {
    title: "The Write Consistency Problem", emoji: "✏️",
    tldr: "When CPU writes to cache, main memory has the old (stale) value. Other devices reading memory directly will see wrong data.",
    explanation: `Consider the statement A = B + C. B and C are read from memory to compute A. Then A must be written (stored back). This is where the consistency problem appears.

If A is updated in the cache but NOT in main memory, the cache and main memory are now out of sync. Main memory has the old stale value of A. Any other component that reads directly from main memory — another CPU, a DMA controller, a peripheral device — will see the old incorrect value. This is a data consistency/coherence problem.

For example: after computing A = 11 (B=5 + C=6), the cache holds A=11 but main memory still holds A=0. If another device reads A from main memory, it sees 0 instead of 11. This is wrong.

There are two main strategies to handle write hits (when the written address IS in the cache), and two strategies for write misses (when it's NOT in the cache). Each has tradeoffs between simplicity, performance, and consistency.`,
    keyPoints: [
      "The problem: cache updated but main memory still holds old (stale) value",
      "Other CPUs, DMA controllers, peripherals read main memory directly → they see wrong data",
      "This inconsistency is the cache coherence / consistency problem",
      "Two strategies for write hits: Write-Through and Write-Back",
      "Two strategies for write misses: Write-Allocate and Write-No-Allocate",
      "Example: cache has A=11, main memory has A=0 → any direct memory reader sees A=0 (wrong!)",
    ],
    formula: null,
    examTips: [
      "The write problem = cache and memory can disagree. This is the core issue write policies solve.",
      "DMA (Direct Memory Access) devices bypass cache and read from main memory directly — they WILL see stale data with write-back.",
    ],
    questions: [],
  },

  "write-through": {
    title: "Write-Through Policy", emoji: "🔄",
    tldr: "Both cache AND main memory updated on every write. Always consistent. But every write hits slow memory.",
    explanation: `Write-Through: On every write (whether cache hit or miss), both the cache AND main memory are updated simultaneously.

Advantage: Main memory is always up to date. No stale values. Simple to implement. The Valid Bit is the only extra bit needed in each cache line — no dirty bit required.

Disadvantage: Every single write goes to slow main memory, which partially defeats the purpose of caching. Writing is as slow as if there were no cache.

To mitigate this, many designs use a Write Buffer: the processor writes to cache AND a small fast write buffer, then continues executing. The write buffer slowly drains into main memory in the background. This way the processor doesn't have to stall waiting for the slow DRAM write. The processor keeps running while the write buffer handles the memory update asynchronously.

Data flow: Processor → Cache + Write Buffer → DRAM (asynchronously).

Write-through is commonly paired with Write-No-Allocate on misses (since memory is always up to date, there's no need to load the block into cache before writing).`,
    keyPoints: [
      "On EVERY write: both cache and main memory updated simultaneously",
      "Main memory is ALWAYS consistent with cache — no stale values ever",
      "Advantage: simple, always correct, no dirty bit needed",
      "Disadvantage: every write goes to slow DRAM → performance penalty",
      "Write Buffer mitigation: CPU writes to cache + write buffer, continues; write buffer drains to DRAM asynchronously",
      "With write buffer: processor doesn't stall for DRAM; trades stall for write buffer occupancy",
      "Each cache line needs: Valid Bit + Data (no dirty bit needed)",
      "Write-through is commonly paired with Write-No-Allocate on misses",
    ],
    formula: {
      code: `Write-Through without write buffer:
  CPU → Cache → Main Memory (CPU stalls until memory write completes)
  Latency = Cache write time + Memory write time (SLOW)

Write-Through with write buffer:
  CPU → Cache   (fast, CPU continues)
  CPU → Write Buffer → Main Memory (asynchronous, background)
  Latency seen by CPU ≈ Cache write time only (FAST)

Cache line format (Write-Through):
  [ Valid Bit (1b) | Tag (n bits) | Data (block size) ]
  No dirty bit needed — memory is always current.`,
      explanation: "The write buffer acts like a queue between cache and DRAM. If the program writes faster than memory can absorb, the write buffer can fill up and stall the CPU. Write buffer must be checked on read misses to avoid reading stale data (see Optimization 5).",
    },
    examTips: [
      "Write-through: always consistent. Trade-off: slow writes unless you have a write buffer.",
      "With write-through, no dirty bit is needed — memory always has the latest value.",
      "Write buffer is the standard mitigation for write-through's performance cost.",
    ],
    questions: [
      { q: "What is the purpose of a write buffer in a write-through cache?", a: "A write buffer sits between the cache and main memory. Instead of the CPU waiting for the slow DRAM write to complete, the CPU writes to both the cache and the write buffer, then immediately continues executing. The write buffer drains into main memory asynchronously in the background, hiding the memory write latency from the CPU." },
    ],
  },

  "write-back": {
    title: "Write-Back Policy", emoji: "🔙",
    tldr: "Only cache updated on write. Memory updated ONLY when dirty block is evicted. Uses a 'Dirty Bit' to track modifications.",
    explanation: `Write-Back: When a write hit occurs, only the cache is updated. Main memory is NOT updated immediately. Instead, the cache line is marked with a Dirty Bit = 1 to indicate it has been modified and is ahead of main memory.

Main memory is updated only when the dirty cache line must be evicted — either because a miss brings in a new block that needs the same line, or when the cache is flushed.

Eviction of a dirty block (3 steps):
1. Write the dirty cache line back to main memory (flush it).
2. Load the new block from memory into the now-freed cache line.
3. Set the new line's Dirty Bit = 0.

Advantage: Much faster for write-heavy workloads — most writes stay in fast cache without touching slow DRAM. Fewer total memory write operations.

Disadvantage: More complex. Cache Coherence Problem — in multi-processor systems, other CPUs or DMA devices may read stale data from main memory since the cache hasn't written back yet. A dirty bit is REQUIRED.

Write-back is commonly paired with Write-Allocate on misses.`,
    keyPoints: [
      "On a write HIT: only cache updated. Memory NOT touched. Dirty Bit set to 1.",
      "Dirty Bit = 0 → cache line matches memory (clean). Dirty Bit = 1 → cache ahead of memory (dirty).",
      "Memory only updated when dirty line is EVICTED (written back on replacement)",
      "Eviction of dirty block: (1) write dirty line to memory (2) load new block (3) set dirty bit = 0",
      "Advantage: fewer writes to slow DRAM → better performance for write-heavy workloads",
      "Disadvantage: Cache Coherence Problem — multi-processor systems see stale memory values",
      "Cache line format: [ Valid Bit | Dirty Bit | Tag | Data ]",
      "Write-back is commonly paired with Write-Allocate on misses",
    ],
    formula: {
      code: `Write-Back timeline example:
  Initial state:
    Cache Line: [ Valid=1 | Dirty=0 | Tag=XXXX | A=0, B=5, C=6 ]
    Main Memory: A=0, B=5, C=6

  After: A = B + C (write A=11 to cache):
    Cache Line: [ Valid=1 | Dirty=1 | Tag=XXXX | A=11, B=5, C=6 ]
    Main Memory: A=0  ← STALE (not updated yet)

  On eviction (need to load block P):
    Step 1: Write A=11 back to main memory → Memory: A=11 ✓
    Step 2: Load P into cache line
    Step 3: Cache Line: [ Valid=1 | Dirty=0 | Tag=new | P=100, ... ]`,
      explanation: "Notice: between the write and the eviction, memory is stale. That window is when cache coherence issues can occur. The dirty bit tells the cache controller: 'this line has changes that memory doesn't have yet'.",
    },
    examTips: [
      "Dirty Bit = 1 means cache is AHEAD of memory — must write back on eviction.",
      "Write-back is FASTER than write-through for write-heavy workloads.",
      "Cache coherence problem: other processors/devices see old memory values when dirty bit = 1.",
    ],
    questions: [
      { q: "What is the purpose of the dirty bit in a write-back cache?", a: "The dirty bit tracks whether a cache line has been modified but not yet written back to main memory. Dirty Bit = 0 means the cache line matches memory (clean). Dirty Bit = 1 means the cache line was written to, and main memory still has the old stale value. On eviction, if dirty=1, the block must be written back to memory before it can be replaced." },
    ],
  },

  "write-on-miss": {
    title: "Write on Miss Policies", emoji: "📝",
    tldr: "Write Miss = writing to an address NOT in cache. Options: Write-Allocate (load block then update) or Write-No-Allocate (update memory directly).",
    explanation: `A write miss occurs when the CPU writes to an address that is not currently in the cache.

Write-Allocate (Fetch-on-Write): On a write miss, the block is first fetched from main memory into a cache line. Then the write is performed in the cache (same as a write hit). The dirty bit is set. Main memory updated only on eviction. This is used with Write-Back policy because it expects future reads/writes to the same block.

Write-No-Allocate (Write-Around): On a write miss, the write goes directly to main memory. The cache is NOT loaded with this block. The cache is unaffected. This is used with Write-Through policy because since write-through always updates memory anyway, there's no reason to clutter the cache with a block that might not be read soon.

When to use Write-No-Allocate: when data is written once but not immediately re-read. For example, initializing a large array — each location is written exactly once and won't be re-read, so loading it into cache just wastes cache space (pollutes the cache).

Standard pairings: Write-Back + Write-Allocate. Write-Through + Write-No-Allocate.`,
    keyPoints: [
      "Write-Allocate: on miss → load block into cache, then write to cache (dirty bit=1). Used with Write-Back.",
      "Write-No-Allocate: on miss → write directly to main memory, cache unchanged. Used with Write-Through.",
      "Write-Allocate is good when the written data will be read back soon (temporal locality)",
      "Write-No-Allocate avoids cache pollution when data is written but not re-read immediately",
      "Common pairing: Write-Back + Write-Allocate",
      "Common pairing: Write-Through + Write-No-Allocate",
    ],
    formula: {
      code: `// Write-No-Allocate is efficient for this pattern:
for (int i = 0; i < 10; i++)
    a[i] = i * 2;    // Written once, not immediately re-read
                     // No point loading into cache — just write to memory directly

// Write-Allocate is better for this pattern:
for (int i = 0; i < N; i++)
    a[i] = a[i] * 2;  // Read then write same address → allocating makes sense
                       // First access: miss → load block → read → modify → write in cache`,
      explanation: "Write-Allocate makes sense when the same location is both read and written (read-modify-write pattern). Write-No-Allocate makes sense for pure write streaming where data won't be read back.",
    },
    examTips: [
      "Write-Back → Write-Allocate. Write-Through → Write-No-Allocate. These pairings make sense together.",
      "Write-No-Allocate avoids 'cache pollution' — loading blocks we'll never read again.",
    ],
    questions: [],
  },

  "cache-friendly-code": {
    title: "Writing Cache-Friendly Code", emoji: "💻",
    tldr: "Two rules: (1) Repeated references to same variable = good (temporal). (2) Sequential/stride-1 access = good (spatial).",
    explanation: `Cache-friendly code is written to maximize hit rates by exploiting locality.

Rule 1 — Repeated references: accessing the same variable/array element many times in a tight loop is good. Example: 'sum' in a summation loop — it's in a register or L1 cache the whole time. One miss, then all hits.

Rule 2 — Stride-1 reference patterns: accessing memory in consecutive addresses is best because one block load brings in multiple useful elements.

Row-wise vs. Column-wise traversal of a 2D array:
- Row-wise (i outer, j inner): accesses a[0][0], a[0][1], a[0][2]... which are consecutive in memory. With 4-word blocks, 1 miss per 4 accesses = 25% miss rate.
- Column-wise (j outer, i inner): accesses a[0][0], a[1][0], a[2][0]... which are N words apart. Every access is a new block = 100% miss rate.

These two patterns perform identically from a computation perspective but have drastically different cache performance. Column-wise traversal on a large matrix can be 10–100× slower.`,
    keyPoints: [
      "Rule 1: Repeated references to same data = good (temporal locality)",
      "Rule 2: Stride-1 (sequential) access patterns = good (spatial locality)",
      "Row-wise 2D array traversal: miss rate ≈ 1/block_size (e.g., 25% for 4-word blocks)",
      "Column-wise 2D array traversal: miss rate ≈ 100% (every access hits a new block)",
      "Loop ordering matters enormously for cache behavior",
      "Keep the innermost loop accessing consecutive memory locations",
      "Restructure nested loops so the last (rightmost) index changes fastest (row-major order)",
    ],
    formula: {
      code: `// GOOD — Row-wise (stride-1), 4-word blocks, miss rate = 25%:
for (i = 0; i < M; i++)       // outer loop: row
    for (j = 0; j < N; j++)   // inner loop: column (consecutive in memory)
        sum += a[i][j];
// a[i][0], a[i][1], a[i][2], a[i][3] are consecutive → 1 miss, 3 hits per block

// BAD — Column-wise (stride-N), 4-word blocks, miss rate = 100%:
for (j = 0; j < N; j++)       // outer loop: column
    for (i = 0; i < M; i++)   // inner loop: row (N words apart in memory)
        sum += a[i][j];
// a[0][j], a[1][j], a[2][j] are N addresses apart → every access = new block = MISS`,
      explanation: "For an M×N matrix with N=1024 and 4-byte ints: column-wise accesses are 4096 bytes apart. With 64-byte blocks (16 ints per block), you'd get 1 useful int per 16 fetched — 94% waste.",
    },
    examTips: [
      "Row-wise = good. Column-wise = bad (for row-major languages like C).",
      "Miss rate for row-wise = 1 / (block size in words). Column-wise ≈ 100%.",
    ],
    questions: [],
  },

  "direct-mapping": {
    title: "Direct Mapping — Details & Address Split", emoji: "🎯",
    tldr: "Each memory block maps to exactly 1 cache line: Line = Block# mod #Lines. Address split: [Tag | Block Index | Word Offset].",
    explanation: `In direct mapping, every block in main memory has exactly one and only one cache line it can go into. The formula is: Cache Line = Block number mod (Number of cache lines).

Address partitioning for direct mapping (given an n-bit address):
- Word Offset = log₂(block size in words): selects which word within the block
- Block Index = log₂(number of cache lines): selects which cache line to look in
- Tag = remaining high-order bits: identifies which specific block is in that line

To check for a hit: use the Block Index bits to find the cache line, then compare the incoming Tag with the stored Tag. If match AND valid bit = 1 → HIT. Otherwise → MISS.

Advantage: Very simple and fast — only one tag comparison needed, one cache line to check. No replacement algorithm needed (only one possible slot per block).
Disadvantage: If two blocks map to the same line and are used alternately (ping-pong), they evict each other on every access even though the rest of the cache is completely empty. This is a conflict miss — avoidable with more associativity.`,
    keyPoints: [
      "Mapping rule: Cache Line = Block# mod #Lines (mod = remainder division)",
      "Address = [Tag | Block Index | Word Offset]",
      "Word Offset bits = log₂(block size). Block Index bits = log₂(#cache lines). Tag = rest.",
      "Only ONE tag comparison per access — very fast lookup",
      "Conflict misses: two popular blocks mapped to same line evict each other even if cache isn't full",
      "No replacement algorithm needed — only one possible location per block",
      "Example: blocks 0, 8, 16, 24... all map to Line 0 (if 8 lines). Heavy use of 2 of these = conflict thrashing.",
      "Advantage: simple, fast, cheap hardware",
    ],
    formula: {
      code: `Direct Mapping Address Split Example:
  Address: 16 bits. Cache: 128 lines. Block size: 16 words.

  Word Offset = log₂(16) = 4 bits   (select word within block)
  Block Index = log₂(128) = 7 bits  (select cache line)
  Tag         = 16 - 4 - 7 = 5 bits (identify which block)

  Address format: [ Tag(5) | Index(7) | Offset(4) ]

  Block 0  → Line 0   (0 mod 128 = 0)
  Block 1  → Line 1   (1 mod 128 = 1)
  Block 127→ Line 127 (127 mod 128 = 127)
  Block 128→ Line 0   (128 mod 128 = 0) ← CONFLICT with Block 0!
  Block 256→ Line 0   (256 mod 128 = 0) ← CONFLICT with Block 0!`,
      explanation: "Blocks 0, 128, 256, 384... all compete for Line 0. If a program alternates between blocks 0 and 128, every access is a miss — even with 127 other empty lines.",
    },
    examTips: [
      "Compute bits right to left: Offset first, then Index, then Tag = remainder.",
      "Conflict miss = two blocks at same line thrash each other. Solved by associativity.",
      "Direct mapping = 1-way set associative (1 line per set).",
    ],
    questions: [
      { q: "Why can direct mapping cause poor performance even when the cache isn't full?", a: "Because each block can only go to one specific line. If two heavily-used blocks happen to map to the same line (e.g., blocks 0 and 128 in an 128-line cache), they will continuously evict each other on every access — a conflict miss — even though 126 other cache lines are completely empty and could hold one of them." },
    ],
  },

  "associative-mapping": {
    title: "Fully Associative Mapping", emoji: "🌐",
    tldr: "Block can go into ANY cache line. Maximum flexibility, zero conflict misses. But requires searching ALL tags in parallel — expensive hardware.",
    explanation: `In fully associative mapping, a block from main memory can be placed in any cache line at all. There is no restriction — any line that is free (or chosen for replacement) can hold any block.

Address partitioning: Only two fields — Tag and Word Offset. There is no Index field because we're not pre-selecting which line to look in.

To find a block: the Tag portion of the incoming address must be compared against ALL tag entries in all cache lines simultaneously, in parallel. This requires a comparator for every single cache line — expensive hardware.

Advantage: Maximum placement flexibility. No conflict misses at all. Only compulsory and capacity misses.
Disadvantage: Very expensive hardware (many comparators). Slower clock rate because of the complex comparison logic. In practice, fully associative is only used for small caches like TLBs or victim caches. Real L1/L2 caches use set-associative mapping.`,
    keyPoints: [
      "Block can go into ANY cache line — maximum flexibility",
      "Address = [Tag | Word Offset] — NO index field",
      "To check for hit: compare incoming tag against ALL stored tags simultaneously (parallel search)",
      "Zero conflict misses — any block can always find a free line somewhere",
      "Only compulsory and capacity misses remain",
      "Hardware cost: one comparator per cache line → very expensive for large caches",
      "Practical use: small specialized caches (TLBs, victim caches) where full search is affordable",
      "Replacement: needs LRU or FIFO since any line can be evicted",
    ],
    formula: {
      code: `Fully Associative Address Split:
  Address: 16 bits. Block size: 16 words.

  Word Offset = log₂(16) = 4 bits
  Tag         = 16 - 4 = 12 bits  (NO index field)

  Tag bits for FA example (128 KB memory, 256-byte blocks):
    Physical address = 17 bits (128KB = 2^17)
    Block offset = log₂(256) = 8 bits
    Tag = 17 - 8 = 9 bits  (all remaining bits are tag)

  On lookup: compare incoming 12-bit tag with all 128 stored tags at once
  → requires 128 comparators working in parallel`,
      explanation: "For a 128-line fully associative cache, you need 128 comparators all operating simultaneously. For L1 caches with 512+ lines, this is impractical.",
    },
    examTips: [
      "Fully associative: NO index bits. Tag = Address bits − Offset bits.",
      "Used for small caches (TLB, victim cache). L1/L2 use set-associative.",
      "Eliminates conflict misses completely but costs much more hardware.",
    ],
    questions: [],
  },

  "set-associative": {
    title: "Set-Associative Mapping — Details & Examples", emoji: "🧩",
    tldr: "Cache divided into sets, each with n lines. Block → one specific set, any line within it. Best trade-off between direct and full associativity.",
    explanation: `Set-associative mapping divides the cache into sets, each containing n lines (n-way set associativity). A block maps to exactly one set (using Set = Block# mod #Sets) but can go into any of the n lines within that set.

Address partitioning: [Tag | Set Index | Word Offset]. Set Index selects which set. Within the set, all n tags are compared simultaneously (just like a tiny fully-associative sub-cache).

Number of sets = Total cache lines / n. Set Index bits = log₂(#sets).

Example — 2-way set associative (2 lines per set):
- 16 KB cache, 2-way, 64-byte blocks: 16KB/(64×2) = 128 sets
- Set Index = log₂(128) = 7 bits; Offset = log₂(64) = 6 bits; Tag = PA bits − 13

Compared to direct mapping: 2-way has half as many sets, so each block has 2 possible locations instead of 1. If two blocks compete for the same set, one can go in way 0 and the other in way 1 — no conflict. This eliminates most conflict misses.

Compared to fully associative: only n tags compared per lookup (not all), so hardware is much simpler. Scales well to large caches.`,
    keyPoints: [
      "n-way: cache divided into sets, each with n lines. Block → one set, any of n lines.",
      "Set = Block# mod #Sets. Within set: any line (n choices).",
      "Address = [Tag | Set Index | Word Offset]",
      "Set Index bits = log₂(#sets). #Sets = Total Lines / n.",
      "Lookup: select set using index, compare all n tags in that set in parallel",
      "2-way eliminates most conflict misses vs direct mapping; 4-way eliminates even more",
      "Rule of thumb: 2-way set associative of size N ≈ direct mapped of size 2N in miss rate",
      "Modern CPUs: L1 is typically 4-way or 8-way; L2/L3 is 8-way or 16-way",
    ],
    formula: {
      code: `2-Way Set Associative Tag Calculation:
  Given: Cache = 16 KB, 2-way, Block = 256 bytes, Memory = 128 KB = 2^17

  Physical address = 17 bits
  Block offset = log₂(256) = 8 bits
  Total blocks in cache = 16K/256 = 64 blocks
  Number of sets = 64 / 2 = 32 sets → Set Index = log₂(32) = 5 bits
  Tag = 17 - 8 - 5 = 4 bits

  Hit/Miss Trace (2-way, 16-bit addr, 2K cache, 64-byte blocks):
  Address 128 (0x0080): Tag=000000, Set=0010, Offset=000000 → MISS (cold)
  Address 144 (0x0090): Tag=000000, Set=0010, Offset=010000 → HIT (same block!)
  Address 2176 (0x0880): Tag=000010, Set=0010, Offset=000000 → MISS (different tag → 2nd way)
  Address 128 again:    Tag=000000, Set=0010, Offset=000000 → HIT (still in way 0)
  Hit rate (2-way) = 4/6 = 0.667 vs Direct = 2/6 = 0.333`,
      explanation: "The 2-way example shows how having 2 lines per set prevents the conflict: tag 000000 and tag 000010 both map to set 0010 but can coexist in way 0 and way 1. With direct mapping, the second access would evict the first.",
    },
    examTips: [
      "More ways = fewer conflict misses, but higher hit time (more comparators per set).",
      "2-way SA of size N ≈ direct of size 2N in miss rate (the '2-1 rule').",
      "Always: #Sets = Total Lines / n. Set Index bits = log₂(#Sets).",
    ],
    questions: [
      { q: "How do you calculate tag, set index, and offset bits for a 2-way set-associative cache?", a: "Step 1: Offset = log₂(block size in bytes). Step 2: Total lines = cache size / block size. Sets = total lines / ways (n). Set Index = log₂(sets). Step 3: Tag = physical address bits − set index bits − offset bits." },
    ],
  },

  "replacement-algos": {
    title: "Replacement Algorithms — FIFO, LRU, Random", emoji: "🔄",
    tldr: "When cache full and new block must load: FIFO evicts oldest-loaded, LRU evicts least-recently-used, Random picks any. LRU usually best.",
    explanation: `When a miss occurs and all lines in the target set (or in a fully associative cache, all lines) are full, one block must be evicted. Direct mapping has no choice (only one line per block). Associative caches need an algorithm.

FIFO (First In, First Out): Evict the block that has been in the cache the longest — the one that arrived first. Easy to implement (just maintain arrival order). Does not adapt to actual usage patterns.

LRU (Least Recently Used): Evict the block that was used (accessed) the least recently — the one that hasn't been touched for the longest time. Better than FIFO because it adapts to actual usage: blocks that are currently being used stay in cache, blocks that haven't been used for a while get evicted. Hardware cost increases with associativity.

Random: Evict a randomly chosen block. Surprisingly competitive with LRU on average. Simplest to implement in hardware (just a random number generator). No tracking overhead.

LFU (Least Frequently Used): Evict the block with fewest total accesses. Less common. Doesn't handle recency well (a heavily-used block from the past won't be evicted even if never needed again).`,
    keyPoints: [
      "Replacement only needed for associative caches. Direct mapping: no choice.",
      "FIFO: evict the block that arrived in cache first (oldest by load time)",
      "LRU: evict the block not accessed for the longest time (least recently used)",
      "Random: evict a randomly chosen block — simple hardware, competitive performance",
      "LFU: evict the block with fewest total access hits — rare in practice",
      "LRU generally ≥ FIFO because it exploits temporal locality (recently used = likely to be used again)",
      "LRU hardware cost grows with associativity (need to track access order among all n ways)",
      "For high-associativity (8+ way), pseudo-LRU or Random is used instead of true LRU",
    ],
    formula: null,
    examTips: [
      "LRU > FIFO > Random generally for miss rate, but the difference narrows with more cache.",
      "FIFO is simpler hardware than LRU. Random is simplest of all.",
      "For exam: FIFO evicts longest-in-cache. LRU evicts longest-not-accessed. Know the difference.",
    ],
    questions: [
      { q: "Why does LRU generally perform better than FIFO?", a: "FIFO evicts the block that was loaded longest ago, regardless of whether it was recently used. LRU evicts the block that was least recently accessed, which better predicts which block won't be needed soon. LRU exploits temporal locality — recently accessed blocks are likely to be accessed again, so LRU keeps them and discards blocks that haven't been touched in a while." },
    ],
  },

  "replacement-ex1": {
    title: "Exercise 1 — Direct Mapping Trace", emoji: "📊",
    tldr: "8 cache lines (0–7). Line = Block# mod 8. Trace 17 accesses. Misses=14, Hits=3.",
    explanation: `Direct mapping exercise: 8 cache lines (lines 0–7). Mapping rule: Block j → Line (j mod 8).

Request sequence: 4, 3, 25, 8, 19, 6, 25, 8, 16, 35, 45, 22, 8, 3, 16, 25, 7

First, classify each block by which line it maps to:
- Line 0: blocks 0, 8, 16, 24, 32... (mod 8 = 0)
- Line 1: blocks 1, 9, 17, 25, 33... (mod 8 = 1) → includes 25
- Line 3: blocks 3, 11, 19, 27, 35... (mod 8 = 3) → includes 3, 19, 35
- Line 4: blocks 4, 12, 20... (mod 8 = 4) → includes 4
- Line 5: blocks 5, 13, 21, 29, 37, 45... (mod 8 = 5) → includes 45
- Line 6: blocks 6, 14, 22, 30... (mod 8 = 6) → includes 6, 22

Key conflicts: blocks 8 and 16 both map to Line 0; blocks 3, 19, 35 all map to Line 3. This causes many evictions.

Final result: 14 misses, 3 hits out of 17 accesses. Miss ratio = 14/17.`,
    keyPoints: [
      "Direct mapping: Line = Block# mod 8",
      "Hit sequence positions: access 7 (block 25), access 8 (block 8), access 16 (block 25) — only 3 hits",
      "Blocks 8 and 16 both map to Line 0 → they evict each other repeatedly",
      "Blocks 3, 19, 35 all map to Line 3 → triple conflict for that line",
      "Direct mapping miss ratio = 14/17 (very poor due to conflicts)",
      "Final cache state: Line 0=16, Line 1=25, Line 3=3, Line 4=4, Line 5=45, Line 6=22, Line 7=7",
    ],
    formula: {
      code: `Mapping for key blocks:
  4 mod 8 = 4 → Line 4
  3 mod 8 = 3 → Line 3
  25 mod 8 = 1 → Line 1
  8 mod 8 = 0 → Line 0
  19 mod 8 = 3 → Line 3  ← conflicts with 3!
  6 mod 8 = 6 → Line 6
  16 mod 8 = 0 → Line 0  ← conflicts with 8!
  35 mod 8 = 3 → Line 3  ← conflicts with 3 and 19!
  45 mod 8 = 5 → Line 5
  22 mod 8 = 6 → Line 6  ← conflicts with 6!
  7 mod 8 = 7 → Line 7

Access trace (selective):
  25 (2nd time) → Line 1 still has 25 → HIT
  8 (2nd time)  → Line 0 still has 8  → HIT
  25 (3rd time) → Line 1 still has 25 → HIT
  All others are MISSES due to conflicts or cold misses.

  Miss ratio = 14/17`,
      explanation: "The poor performance comes from the conflict between 8 and 16 at Line 0, and 3/19/35 at Line 3. Even though lines 2, 7 are empty for most of the sequence, these two lines keep colliding.",
    },
    examTips: [
      "Always compute Block mod #Lines first to find the mapping before tracing.",
      "Identify conflict groups (blocks mapping to same line) — they're the source of most misses.",
    ],
    questions: [],
  },

  "replacement-ex2": {
    title: "Exercise 2 — FIFO, 2-Way Set Associative", emoji: "📊",
    tldr: "8 cache blocks = 4 sets × 2 ways. Set = Block# mod 4. FIFO replacement. Hits=5, Misses=12 out of 17.",
    explanation: `2-Way Set Associative with FIFO: 8 total cache blocks organized as 4 sets × 2 ways. Mapping: Set = Block# mod 4.

Sets:
- Set 0: blocks 4, 8, 16 (mod 4 = 0)
- Set 1: blocks 25, 45 (mod 4 = 1)
- Set 2: blocks 6, 22 (mod 4 = 2)
- Set 3: blocks 3, 7, 19, 35 (mod 4 = 3)

FIFO replacement: when a set has both ways full and a new block arrives, evict whichever block was loaded first (arrived earliest).

Result: 5 hits and 12 misses out of 17 accesses (hit ratio = 5/17 ≈ 29.4%). This is better than direct mapping (3 hits) because two blocks that previously conflicted (e.g., 3 and 19 both in Set 3) can now coexist in way 0 and way 1 simultaneously.`,
    keyPoints: [
      "2-way SA: Set = Block# mod 4. Each set holds 2 blocks (way 0 and way 1).",
      "FIFO replacement: when set full, evict the block that was loaded first",
      "Blocks 3 and 19 can now coexist in Set 3 (way 0 and way 1) — no conflict!",
      "Blocks 4, 8, 16 all map to Set 0 — 3rd arrival must evict earliest arrival",
      "5 hits vs 3 hits in direct mapping — improvement due to reduced conflicts",
      "Hit ratio = 5/17 ≈ 29.4%, Miss ratio = 12/17 ≈ 70.6%",
    ],
    formula: {
      code: `Set mapping:
  Block → Set (mod 4):
  4→S0, 8→S0, 16→S0  (3 blocks compete for 2 ways in Set 0)
  3→S3, 19→S3, 35→S3, 7→S3  (4 blocks compete for 2 ways in Set 3)
  25→S1, 45→S1
  6→S2, 22→S2

Key accesses:
  4 → Set 0 (way 0=4, way 1=empty) → MISS
  8 → Set 0 (way 0=4, way 1=8) → MISS
  25 → Set 1 → MISS; 25 (2nd time) → HIT ✓
  8 (2nd time) → Set 0 still has 8 → HIT ✓
  16 → Set 0 full (4,8 in it); FIFO: evict 4 (oldest) → way 0=16, way 1=8 → MISS
  8 (3rd time) → Set 0 has 8 still → HIT ✓
  Final: Hits=5, Misses=12`,
      explanation: "The 2-way SA FIFO gives 5/17 ≈ 29% hit rate vs 3/17 ≈ 18% for direct mapping. The improvement comes from Set 1 (25 and 45 can coexist) and Set 3 (3 and 19 can coexist without conflict).",
    },
    examTips: [
      "In FIFO: track when each block was LOADED, not when it was last accessed.",
      "More ways = more blocks can coexist per set = fewer conflicts.",
    ],
    questions: [],
  },

  "replacement-ex3": {
    title: "Exercise 3 — FIFO, Fully Associative", emoji: "📊",
    tldr: "8 cache lines, fully associative, FIFO. All lines fill up, then FIFO evictions begin. Hits=4, Misses=13.",
    explanation: `Fully Associative FIFO: 8 cache lines, any block can go anywhere. FIFO replacement when all 8 lines are full.

Using the same sequence: 4, 3, 25, 8, 19, 6, 25, 8, 16, 35, 45, 22, 8, 3, 16, 25, 7

Cold start: first 6 accesses are all misses (blocks 4, 3, 25, 8, 19, 6 loaded). On accesses 7 (25) and 8 (8) — both hit because the blocks are still in cache.

After loading block 6 (6th access), cache has {4, 3, 25, 8, 19, 6}. Accesses 7 and 8 are hits.

Access 9 (block 16): cache has room for 2 more (lines 7 and 8), so load 16. No eviction yet.
Access 10 (block 35): load 35. Cache now full: {4, 3, 25, 8, 19, 6, 16, 35}.

From here: FIFO evictions. Block 4 was loaded first → evict 4 to load 45. Block 3 loaded second → evict 3 to load 22. Etc.

Result: 4 hits, 13 misses, hit ratio = 4/17. Slightly worse than 2-way SA FIFO (5/17) because FIFO doesn't adapt to recency.`,
    keyPoints: [
      "Fully Associative: any block → any of 8 lines. FIFO replacement when full.",
      "First 6 accesses: cold misses (cache filling up)",
      "Accesses 7 and 8: hits (25 and 8 still in cache)",
      "Cache fills at access 10 (blocks 4,3,25,8,19,6,16,35 all loaded)",
      "After that: FIFO evicts 4 (loaded first), then 3 (loaded second), etc.",
      "Result: 4/17 hit ratio (slightly worse than 2-way SA FIFO because FIFO doesn't track recency)",
    ],
    formula: {
      code: `Cache state trace (FA, FIFO, 8 lines):
  Access  Block  Cache after (FIFO order, oldest→newest)    Result
  ──────────────────────────────────────────────────────────────
  1       4      [4]                                        MISS
  2       3      [4,3]                                      MISS
  3       25     [4,3,25]                                   MISS
  4       8      [4,3,25,8]                                 MISS
  5       19     [4,3,25,8,19]                              MISS
  6       6      [4,3,25,8,19,6]                            MISS
  7       25     [4,3,25,8,19,6] — 25 is present            HIT ✓
  8       8      [4,3,25,8,19,6] — 8 is present             HIT ✓
  9       16     [4,3,25,8,19,6,16]                         MISS
  10      35     [4,3,25,8,19,6,16,35] — FULL               MISS
  11      45     evict 4 (oldest) → [3,25,8,19,6,16,35,45] MISS
  12      22     evict 3          → [25,8,19,6,16,35,45,22] MISS
  13      8      8 still in cache → HIT ✓                   HIT ✓
  14      3      evict 25         → [8,19,6,16,35,45,22,3]  MISS
  ...     Result: 4 hits, 13 misses (hit ratio = 4/17)`,
      explanation: "FIFO doesn't know that 25 was recently accessed (accesses 3 and 7) — it still evicts it because it was loaded first. LRU would keep 25 longer since it was accessed more recently.",
    },
    examTips: [
      "FIFO cares about LOAD ORDER, not ACCESS ORDER. Track when blocks entered the cache.",
    ],
    questions: [],
  },

  "replacement-ex4": {
    title: "Exercise 4 — LRU, Fully Associative", emoji: "📊",
    tldr: "Same sequence, 8 lines FA, but LRU instead of FIFO. LRU gets 5 hits vs FIFO's 4 — because it keeps recently-used blocks longer.",
    explanation: `Fully Associative LRU: same cache (8 lines), same sequence, but LRU replaces the block that was LEAST RECENTLY ACCESSED.

The difference from FIFO: when a block is accessed (even a hit), it is moved to the "most recently used" position. So hitting on block 25 at access 7 means 25 is now the most recently used, and won't be evicted first.

Key difference from FIFO: when we reach access 14 (block 3), under FIFO block 25 was evicted (it was loaded 3rd). Under LRU, 25 was accessed at position 7 so it's been recently used. Instead, LRU evicts whichever block hasn't been accessed for the longest time.

Result: 5 hits, 12 misses, hit ratio = 5/17 — same as 2-way SA FIFO but slightly better than FA FIFO (4 hits). LRU ≥ FIFO in practice because it exploits temporal locality.`,
    keyPoints: [
      "LRU evicts the block not accessed for the LONGEST time (least recently used)",
      "Unlike FIFO: accessing a block (even a hit) resets its 'last used' time, making it harder to evict",
      "LRU result: 5/17 hits vs FIFO's 4/17 hits on the same sequence with same cache",
      "The extra hit comes from block 25 surviving longer because it was accessed at step 7",
      "LRU generally outperforms FIFO because it better matches temporal locality",
      "Hardware cost: LRU requires tracking access order among all n lines — expensive for large associativity",
    ],
    formula: {
      code: `LRU vs FIFO comparison on key accesses:
  Access 7: block 25 accessed → HIT in both
    FIFO: 25 still 3rd in load order (doesn't change order)
    LRU:  25 moved to MRU position (recently accessed)

  Access 14: block 3 needed
    FIFO: loads 3, evicts 25 (was loaded 3rd = 3rd oldest) → 25 gone
    LRU:  loads 3, evicts block that wasn't used in longest time
          25 was accessed at step 7 → not LRU → survives!

  Therefore access 16 (block 25):
    FIFO: 25 not in cache → MISS
    LRU:  25 still in cache → HIT ✓ (this is the extra hit)

  Summary:
    FA FIFO:  4/17 hits
    FA LRU:   5/17 hits
    Direct:   3/17 hits
    LRU > FIFO > Direct mapping`,
      explanation: "The takeaway: LRU retains recently-accessed blocks longer, which matches how real programs work (you tend to re-access recently used data). FIFO is oblivious to usage patterns.",
    },
    examTips: [
      "LRU: on every access (hit or miss), update recency. The least-recently-accessed gets evicted.",
      "For exam: know LRU ≥ FIFO in performance, both ≥ direct mapping generally.",
    ],
    questions: [],
  },

  "replacement-ex5": {
    title: "Exercise 5 — LRU, 4-Way Set Associative", emoji: "📊",
    tldr: "16 cache blocks = 4 sets × 4 ways. LRU replacement. Sequence: 0,255,1,4,3,8,133,159,216,129,63,8,48,32,73,92,155.",
    explanation: `4-Way Set Associative LRU: 16 total cache blocks, 4 sets, 4 ways per set. Mapping: Set = Block# mod 4.

Request sequence: 0, 255, 1, 4, 3, 8, 133, 159, 216, 129, 63, 8, 48, 32, 73, 92, 155

Set assignments:
- Set 0: blocks 0, 4, 8, 16, 32, 48, 92, 216 (mod 4 = 0) — many map here
- Set 1: blocks 1, 5, 9, 29, 33, 73, 129, 133 (mod 4 = 1)
- Set 2: (none from this sequence)
- Set 3: blocks 3, 7, 11, 63, 155, 159, 255 (mod 4 = 3)

All first 11 accesses are cold misses (first time seeing each block). Access 12 (block 8) hits because block 8 was loaded at access 6 and Set 0 has 4 ways — no eviction needed yet.

The 4-way design helps enormously: Set 0 can hold 4 different blocks simultaneously (0, 4, 8, 16 — or any 4), whereas direct mapping would have had severe conflicts among all these blocks mapping to one line.`,
    keyPoints: [
      "4-way SA: 16 blocks = 4 sets × 4 ways. Set = Block# mod 4.",
      "All first 11 accesses are cold misses (first visit to each block)",
      "Access 12: block 8 → HIT (still in Set 0, 4 ways haven't filled beyond capacity yet)",
      "4-way reduces conflicts dramatically: 4 simultaneous blocks per set",
      "LRU tracks access recency within each set",
      "Result: 1 hit, 16 misses (this is a short cold sequence — misses dominate)",
      "Final set state: Set 0 = {0, 48, 4, 32, 8, 92, 216} (only 4 survive based on LRU)",
    ],
    formula: {
      code: `Set mapping for this sequence:
  Block → Set (mod 4):
  0→S0, 255→S3, 1→S1, 4→S0, 3→S3, 8→S0, 133→S1,
  159→S3, 216→S0, 129→S1, 63→S3, 8→S0(HIT!), 48→S0,
  32→S0, 73→S1, 92→S0, 155→S3

  Set 0 accesses in order: 0, 4, 8, 216, (hit 8), 48, 32, 92
    → 4 ways fill at: 0, 4, 8, 216 (all cold)
    → 8 accessed again: HIT (still in set)
    → 48 needs space → evict LRU among {0,4,8,216} → evict 0 (oldest unaccessed)
    → 32, 92 similarly evict next LRU

  Total: 1 HIT (block 8 at access 12), rest are MISSES`,
      explanation: "This sequence has poor locality (16 distinct blocks, 4 sets = 4 per set on average). But without 4-way associativity, blocks mapping to Set 0 (0,4,8,16,32,48,216,92) would conflict on a single direct-mapped line — 0 hits instead of 1.",
    },
    examTips: [
      "For LRU traces: always update recency on EVERY access, including hits.",
      "4-way allows 4 blocks to coexist per set — crucial when many blocks map to same set.",
    ],
    questions: [],
  },

  "replacement-compare": {
    title: "All Four Mappings Compared", emoji: "🏆",
    tldr: "Practice sequence with 4-block cache: LRU FA = 6/15 hits (best). Direct = 1/15 (worst). LRU > FIFO > Direct.",
    explanation: `Compare all four methods on the same sequence with a 4-block cache:

Request sequence: 5, 12, 13, 17, 4, 12, 13, 17, 2, 13, 19, 13, 43, 61, 19

Results:
- Fully Associative FIFO: 5/15 hits
- Fully Associative LRU: 6/15 hits (best)
- Direct Mapping: 1/15 hits (worst!)
- 2-Way Set Associative LRU: 5/15 hits

Key takeaways:
1. LRU > FIFO on the same cache structure (FA LRU 6 > FA FIFO 5)
2. More associativity > less associativity (FA > 2-way > Direct for this sequence)
3. Direct mapping suffers heavily from conflict misses (1/15 is terrible)
4. The benefit of associativity diminishes — 2-way already captures most of the benefit vs direct mapping`,
    keyPoints: [
      "FA LRU = 6/15 (best): maximum flexibility + smartest eviction",
      "FA FIFO = 5/15: same flexibility as LRU but less smart eviction",
      "2-Way SA LRU = 5/15: good balance — less hardware than FA, much better than direct",
      "Direct Mapping = 1/15 (worst): all conflict misses destroyed performance",
      "General ranking: LRU > FIFO > Random (usually). FA > Set-Assoc > Direct (usually).",
      "The 2-1 rule: 2-way SA of size N ≈ Direct of size 2N in miss rate",
    ],
    formula: {
      code: `Hit ratio comparison (4-block cache, same 15-access sequence):
  Method              │ Hits │ Misses │ Hit Ratio
  ────────────────────┼──────┼────────┼──────────
  FA FIFO             │  5   │  10    │ 5/15 = 33%
  FA LRU              │  6   │   9    │ 6/15 = 40%
  Direct Mapping      │  1   │  14    │ 1/15 =  7%  ← terrible
  2-Way SA LRU        │  5   │  10    │ 5/15 = 33%

  Conclusion:
  LRU > FIFO (same structure)
  FA > 2-way SA > Direct mapping (same replacement algo)
  2-way SA often close to FA in practice (for larger caches)`,
      explanation: "Direct mapping is so bad here because with only 4 lines, many blocks in the sequence map to the same line and thrash each other. With 2-way or FA, those blocks can coexist and the much more reasonable 5-6/15 hit rate is achieved.",
    },
    examTips: [
      "For exam problems comparing mappings: FA LRU usually wins. Direct usually worst.",
      "The 2-1 rule: for similar miss rates, a 2-way SA of half the size can match a direct cache.",
    ],
    questions: [],
  },

  "perf-factors": {
    title: "What Affects Cache Performance?", emoji: "📈",
    tldr: "Three factors: Hit Time (how fast a hit is), Miss Rate (how often a miss occurs), Miss Penalty (how long a miss takes).",
    explanation: `Cache performance is determined by three quantities:

Hit Time: The time to send data from the cache to the CPU when a hit occurs. Includes the time to check the tag and return the data. Typically 1–4 clock cycles for L1 cache.

Miss Rate: The fraction of accesses that result in a miss. Miss Rate = Misses / Total Accesses. Hit Rate = 1 − Miss Rate. A 97% hit rate means 3% miss rate. Even a small miss rate can dominate performance if the miss penalty is large.

Miss Penalty: The additional time to copy the required block from main memory into the cache when a miss occurs. Typically 150–200 clock cycles for going to main memory. This is a very long stall.

The tradeoff: optimizing one often hurts another. For example, a larger cache reduces miss rate but increases hit time. Larger blocks reduce miss rate (spatial locality) but increase miss penalty (longer to fill). Higher associativity reduces miss rate but increases hit time.`,
    keyPoints: [
      "Hit Time = cycles to return data from cache on a hit (goal: minimize, typically 1-4 cycles for L1)",
      "Miss Rate = Misses / Total Accesses = 1 − Hit Rate (goal: minimize)",
      "Miss Penalty = additional cycles when a miss occurs to fetch from main memory (goal: minimize)",
      "Typical values: Hit Time 0.25–1 ns; Miss Penalty 150–200 clock cycles",
      "All three factors interact — improving one often worsens another",
      "AMAT = Hit Time + Miss Rate × Miss Penalty (the key formula combining all three)",
      "Even 3% miss rate × 200 cycle penalty = 6 extra cycles per access on average",
    ],
    formula: null,
    examTips: [
      "Three and only three performance factors: Hit Time, Miss Rate, Miss Penalty.",
      "Cache hit cycles = CPU execution cycles (NOT stall cycles). Miss cycles = memory stall cycles.",
    ],
    questions: [],
  },

  "amat": {
    title: "AMAT — Average Memory Access Time", emoji: "⏱️",
    tldr: "AMAT = Hit Time + Miss Rate × Miss Penalty. Lower AMAT = better. CPU Time = IC × (Base CPI + Mem Stall CPI) × Clock Cycle Time.",
    explanation: `Average Memory Access Time (AMAT) is the most important cache performance metric. It captures the average cost of every memory access.

AMAT = Hit Time + Miss Rate × Miss Penalty

Intuition: on a hit (fraction = Hit Rate), you pay Hit Time. On a miss (fraction = Miss Rate), you additionally pay the Miss Penalty. AMAT averages these out.

CPU Time formula (full form): CPU Time = IC × (CPU Execution Clock Cycles + Memory Stall Clock Cycles) × Clock Cycle Time

Where IC = Instruction Count. This is important — many textbooks write it per-instruction, but IC is the scaling factor for the whole program.

Memory Stall Clock Cycles (per instruction) = Memory Accesses per Instruction × Miss Rate × Miss Penalty

Important: Clock cycles for a cache HIT are counted as CPU execution clock cycles, NOT memory stall cycles. Only misses cause stall cycles.

For split (separate I-cache and D-cache): total stall per instruction = I-cache stall + D-cache stall.
- I-cache stall = 1 × I-miss rate × miss penalty (every instruction must be fetched)
- D-cache stall = data_access_fraction × D-miss rate × miss penalty

For unified cache (shared I+D): total stall = (1 + data_access_fraction) × miss rate × miss penalty`,
    keyPoints: [
      "AMAT = Hit Time + Miss Rate × Miss Penalty (master formula)",
      "Lower AMAT is better — closer to Hit Time means few misses",
      "CPU Time = IC × (Base CPI + Mem Stall CPI) × Clock Cycle Time",
      "Mem Stall CPI = (Mem Accesses/Instr) × Miss Rate × Miss Penalty",
      "Cache HIT cycles → CPU execution cycles (NOT stall cycles)",
      "Cache MISS cycles → memory stall cycles",
      "Split cache stall = I-cache stall + D-cache stall (computed separately, then added)",
      "Unified cache stall = (1 + data_fraction) × miss rate × miss penalty",
      "Miss penalty decomposed: Send address to RAM (1 cycle) + RAM access (e.g., 15 cycles) + Receive data (1 cycle) = 17 cycles",
    ],
    formula: {
      code: `Core formulas:
  AMAT = Hit Time + Miss Rate × Miss Penalty
  Miss Rate = 1 − Hit Rate
  Hit Rate = Hits / Total Accesses

  CPU Time = IC × (CPI_base + CPI_stall) × Clock Cycle Time
  CPI_stall = Mem_Accesses/Instr × Miss Rate × Miss Penalty

  Split cache stalls:
    I-cache stall/instr = 1 × I_miss_rate × penalty
    D-cache stall/instr = data_fraction × D_miss_rate × penalty
    Total stall = I-stall + D-stall

  Unified cache stall/instr = (1 + data_fraction) × miss_rate × penalty

  Miss Penalty (basic): Send addr (1) + RAM access (15) + Receive (1) = 17 cycles

Example AMAT:
  Hit Time = 1 cycle, Miss Rate = 5%, Miss Penalty = 20 cycles
  AMAT = 1 + 0.05 × 20 = 1 + 1.0 = 2.0 cycles`,
      explanation: "AMAT of 2.0 means every memory access takes 2× the ideal. If miss penalty were 200 cycles: AMAT = 1 + 0.05 × 200 = 11 cycles — more than 10× ideal! This shows why miss rate × penalty dominates performance.",
    },
    examTips: [
      "AMAT = HT + MR × MP — you will definitely need this formula in the exam.",
      "CPU stall cycles: don't confuse with hit cycles. Hits = execution CPI. Misses = stall CPI.",
      "Memory stall CPI = Accesses/Instr × Miss Rate × Penalty (could be separate for reads and writes).",
      "For unified cache: accesses per instruction = 1 (instruction) + fraction (data) = e.g. 1.5 if 50% data access.",
    ],
    questions: [
      { q: "Why are cache hit clock cycles counted as CPU execution cycles, not memory stall cycles?", a: "Cache hits return data in a predictable, fast time that the CPU pipeline is designed to handle. The CPU doesn't actually stall on a hit — it keeps executing. Only cache misses cause the CPU to stall while waiting for the slow main memory fetch. Stall cycles are extra cycles beyond the base CPI caused by waiting for memory." },
      { q: "How do you calculate memory stall CPI?", a: "Memory Stall CPI = (Memory Accesses per Instruction) × Miss Rate × Miss Penalty. For split I-cache and D-cache: total stall = I-cache stall + D-cache stall = (1 × I-miss rate × penalty) + (Fraction_loads_stores × D-miss rate × penalty)." },
      { q: "Why does the unified cache stall formula use (1 + data_fraction) instead of just 1?", a: "Because a unified cache must handle BOTH instruction fetches and data accesses. Every instruction causes one instruction fetch (the '1' part). If 50% of instructions also access data, that adds 0.5 more memory accesses per instruction. So total accesses per instruction = 1 + 0.5 = 1.5, and stall = 1.5 × miss_rate × penalty." },
    ],
  },

  "miss-penalty-steps": {
    title: "Miss Penalty — Three Steps, Sequential vs. Banking", emoji: "🏦",
    tldr: "Miss penalty = Send address + RAM access + Receive data. For multi-word blocks: Sequential (slow), Wide Bus (fast but costly), Banking/Interleaved (near-ideal, cheap).",
    explanation: `When a cache miss occurs, three steps happen to fetch the block from main memory:
1. Send address to RAM: 1 cycle
2. Access RAM (latency): e.g., 15 cycles
3. Receive data from RAM: 1 cycle (or multiple cycles for wide blocks)

For a 1-word block: total = 1 + 15 + 1 = 17 cycles.

Three approaches for multi-word blocks (e.g., block = B words, bus = 1 word wide):

Sequential (Naive): Send address, wait for RAM, receive one word; repeat for every word. Total = B × (1 + L + 1) cycles. Very slow — for 4-word block: 4 × 17 = 68 cycles.

Wide Bus (Widen the bus): Make the bus B words wide → transfer entire block in one go. Total = 1 + L + 1 = 17 cycles. Fast but expensive hardware — a wide bus is physically costly.

Interleaved / Memory Banking (Overlap latencies): Divide main memory into B banks. Send address to all banks simultaneously (or sequentially start), then receive one word from each bank every cycle. Timeline: 1 cycle (send addr) + L cycles (bank latency, all banks run in parallel) + B cycles (receive B words one at a time). Total = 1 + L + B cycles. For 4-word block: 1 + 15 + 4 = 20 cycles. Near-ideal, much cheaper than wide bus.

The formula for interleaved: Miss Penalty = 1 + mem_latency + (block_size_bytes / bus_width_bytes)`,
    keyPoints: [
      "3 steps: Send Address (1 cycle) + RAM Access Latency (e.g., 15 cycles) + Receive Data (1+ cycles)",
      "Single word block: Miss Penalty = 1 + 15 + 1 = 17 cycles",
      "Sequential / Naive (B words, 1-word bus): B × (1 + L + 1) cycles — e.g., 4 × 17 = 68 (terrible)",
      "Wide bus (B-word bus): 1 + L + 1 = 17 cycles — fast but expensive hardware",
      "Interleaved / Banking: 1 + L + B = 20 cycles — near-ideal, cheap (overlap bank latencies)",
      "Banking concept: all banks start accessing simultaneously, so you only pay the latency once",
      "Miss Penalty with banking: 1 + mem_latency + (block_size / bus_width) cycles",
      "Example (32B block, 8B bus, 15-cycle latency): 1 + 15 + 32/8 = 1 + 15 + 4 = 20 cycles",
    ],
    formula: {
      code: `Miss Penalty Calculation Examples:
  Single word block:
    1 (send addr) + 15 (RAM) + 1 (receive) = 17 cycles

  4-word block, 1-word bus, SEQUENTIAL (naive):
    B × (1 + L + 1) = 4 × 17 = 68 cycles ← TERRIBLE
    Each word costs a full send+latency+receive cycle

  4-word block, 4-word bus (WIDE BUS):
    1 + 15 + 1 = 17 cycles ← FAST but expensive hardware

  4-word block, INTERLEAVED BANKS (pipelined):
    1 + 15 + 4×1 = 1 + L + B = 20 cycles ← Near ideal, cheap

  General formula (banking):
    Miss Penalty = 1 + mem_latency + (block_size_bytes / bus_width_bytes)

  Examples:
    Cache 1: block=32B, bus=8B, latency=15 → 1 + 15 + 32/8 = 20 cycles
    Cache 2: block=64B, bus=8B, latency=15 → 1 + 15 + 64/8 = 24 cycles

  From exam problem (16 bytes delivered per 2 cycles, 100-cycle overhead):
    Miss penalty for 16B: 100 + (16/16)×2 = 102 CC
    Miss penalty for 64B: 100 + (64/16)×2 = 108 CC`,
      explanation: "Memory banking is the same concept as pipelining — overlap latencies rather than waiting sequentially. The key insight: all banks can start accessing simultaneously, so you only pay the latency once (for the first bank), then get each subsequent word every cycle.",
    },
    examTips: [
      "Sequential formula: B × (1 + L + 1). Interleaved/banking: 1 + L + B. Know both.",
      "Banking hides latency by overlapping multiple bank accesses in parallel.",
      "Always check: does the exam specify sequential transfer or interleaved? The answer changes drastically.",
    ],
    questions: [],
  },

  "perf-examples": {
    title: "Cache Performance — Worked Examples", emoji: "🔢",
    tldr: "Five worked examples: AMAT comparison, CPI with misses, unified vs split cache, and effects of doubling CPU speed.",
    explanation: `Several worked examples covering AMAT and CPI calculations.

Example 1 (AMAT comparison): Two caches with 8B bus, 15-cycle memory access. Cache 1: 32B blocks, 5% miss rate → AMAT = 1 + 0.05×20 = 2.0. Cache 2: 64B blocks, 4% miss rate → AMAT = 1 + 0.04×24 = 1.96. Cache 2 wins slightly despite larger blocks.

Example 2 (CPI with data accesses): 33% instructions are data accesses, 97% hit rate, 1-cycle hit, 20-cycle penalty. Stall = 0.33 × 0.03 × 20 = 0.2 per instruction. CPI = 1 + 0.2 = 1.2. Program is 1.2× slower than ideal. If CPU speed doubled (CPI → 0.5): effective CPI = 0.5 + 0.2 = 0.7, speedup = 1.2/0.7 = 1.71× — memory is the bottleneck!

Example 3 (Unified cache): CPI=1, unified cache, 50% instructions access data, 2% miss rate, 25-cycle penalty. Stall = (1+0.5) × 0.02 × 25 = 0.75. CPI = 1.75. No-miss machine is 1.75× faster.

Example 4 (Split cache): I-cache miss=2%, D-cache miss=4%, 100-cycle penalty, 2 base CPI, 36% loads/stores. Stall = 0.02×100 + 0.36×0.04×100 = 2 + 1.44 = 3.44. Actual CPI = 5.44. Ideal is 5.44/2 = 2.72× faster.

Example 5 (Pipelined with separate read/write penalties): See formula box.`,
    keyPoints: [
      "Example 1: Cache 2 (64B blocks, 4% miss) AMAT=1.96 beats Cache 1 (32B, 5%) AMAT=2.0",
      "Example 2: 3% miss rate × 20 cycles × 0.33 = 0.2 stall CPI. Small miss rate still hurts!",
      "Example 2 lesson: doubling CPU speed gives only 1.71× speedup (not 2×) because memory stall stays fixed",
      "Example 3: Unified cache — stall = (1 + data_access_fraction) × miss rate × penalty",
      "Example 4: Split caches — compute instruction stall and data stall separately, then add",
      "Example 5 (pipelined): I-miss + D-read miss + D-write miss computed separately for reads/writes with different penalties",
    ],
    formula: {
      code: `Example 5 — Pipelined Processor with Separate Read/Write Penalties:
  Base CPI = 1.8
  I-cache hit = 95% (miss rate = 5%), Read miss penalty = 20 cycles
  D-cache hit = 98% (miss rate = 2%)
  30% of instructions are memory references (80% loads, 20% stores)
  Write miss penalty = 5 cycles

  I-cache stall  = 1 × 0.05 × 20 = 1.0 cycle/instr
  D-read stall   = 0.30 × 0.80 × 0.02 × 20 = 0.096 cycles/instr
  D-write stall  = 0.30 × 0.20 × 0.02 × 5  = 0.006 cycles/instr
  ─────────────────────────────────────────────────────────────
  Effective CPI  = 1.8 + 1.0 + 0.096 + 0.006 = 2.902`,
      explanation: "Notice the instruction fetch miss (1.0 cycle/instr) completely dominates — even a 5% I-cache miss rate with 20 cycle penalty adds a full extra CPI. D-cache misses add much less because only 30% of instructions access data. Always check: instruction cache misses can be the biggest culprit.",
    },
    examTips: [
      "For split cache problems: compute I-stall and D-stall SEPARATELY, then add to base CPI.",
      "For unified cache: stall = (1 + data_access_fraction) × miss_rate × penalty.",
      "Doubling CPU speed doesn't double program speed if memory stalls are significant.",
    ],
    questions: [
      { q: "Why does doubling the CPU clock speed not result in a 2× speedup in Example 2?", a: "Because memory stall cycles are determined by the miss rate and miss penalty in real time, not by the CPU clock rate. If stall = 0.2 cycles/instruction and base CPI changes from 1.0 to 0.5, the stall stays at 0.2. New CPI = 0.5 + 0.2 = 0.7 vs old 1.0 + 0.2 = 1.2. Speedup = 1.2/0.7 = 1.71×, not 2×. Memory becomes the bottleneck." },
    ],
  },

  "opt-framework": {
    title: "Six Cache Optimizations Overview", emoji: "🏗️",
    tldr: "AMAT = Hit Time + Miss Rate × Miss Penalty. Six optimizations target three goals: reduce Miss Rate, reduce Miss Penalty, or reduce Hit Time.",
    explanation: `All cache optimizations target the AMAT formula:
AMAT = Hit Time + Miss Rate × Miss Penalty

There are six basic cache optimizations grouped into three goals:

Reduce Miss Rate (improve fraction of hits):
1. Larger Block Size — exploit spatial locality more aggressively
2. Larger Cache Size — hold more of the working set
3. Higher Associativity — fewer conflict misses

Reduce Miss Penalty (reduce cost of a miss):
4. Multilevel Caches — L1 fast for hits, L2 large to absorb misses
5. Prioritize Reads Over Writes — check write buffer on read miss; victim buffer for dirty eviction

Reduce Hit Time (make hits faster):
6. Avoid Address Translation During Indexing — VIPT: index cache with virtual address while TLB translates in parallel`,
    keyPoints: [
      "AMAT = HT + MR × MP is the central optimization target",
      "Optimization 1 (Larger Block): reduces compulsory miss rate via spatial locality",
      "Optimization 2 (Larger Cache): reduces capacity miss rate",
      "Optimization 3 (Higher Associativity): reduces conflict miss rate",
      "Optimization 4 (Multilevel Caches): reduces miss penalty with L2",
      "Optimization 5 (Reads Priority): reduces effective miss penalty with write buffering",
      "Optimization 6 (VIPT): reduces hit time by parallelizing translation and cache indexing",
      "Every optimization has a trade-off — none are free",
    ],
    formula: {
      code: `Six Optimizations Summary:
  #  │ Name                    │ Reduces    │ Trade-off
  ───┼─────────────────────────┼────────────┼──────────────────────────
  1  │ Larger Block Size       │ Miss Rate  │ ↑ Miss penalty, ↑ conflict
  2  │ Larger Cache            │ Miss Rate  │ ↑ Hit time, cost, power
  3  │ Higher Associativity    │ Miss Rate  │ ↑ Hit time, hardware cost
  4  │ Multilevel Caches       │ Miss Penalty│ More complex analysis
  5  │ Reads Priority/Writes   │ Miss Penalty│ Complex write buffer logic
  6  │ VIPT (VA indexing)      │ Hit Time   │ L1 size ≤ page×associativity`,
      explanation: "Notice that optimizations 1–3 all reduce miss rate but all have trade-offs that can increase AMAT if taken too far. There is a sweet spot for each.",
    },
    examTips: [
      "Know which optimization targets which part of AMAT (HT, MR, or MP).",
      "Optimization 1 (large blocks) actually increases miss penalty — it reduces miss rate but increases the cost per miss.",
    ],
    questions: [],
  },

  "three-cs": {
    title: "The Three C's of Cache Misses", emoji: "3️⃣",
    tldr: "Compulsory (cold/first access), Capacity (cache too small), Conflict (too many blocks map to same set). A 4th C: Coherence for multiprocessors.",
    explanation: `Every cache miss in a uniprocessor falls into exactly one of three categories:

Compulsory Misses (Cold Misses / First-Reference Misses): The very first access to any block will always be a miss — the block has never been in the cache before. These would occur even in an infinitely large cache. Reduced by prefetching or larger block sizes.

Capacity Misses: Occur because the cache is too small to hold all the blocks a program needs during execution. If a block is evicted and later re-accessed, that's a capacity miss — it was in the cache earlier but had to be kicked out to make room. These appear in a fully-associative cache (so you know it's not a conflict issue). Reduced by larger cache.

Conflict Misses (Collision Misses): Occur in direct-mapped or set-associative caches when too many blocks compete for the same set. A conflict miss is defined as a miss that would have been a hit in a fully-associative cache of the same size, but becomes a miss because more than n requests mapped to the same set. Reduced by higher associativity. NOTE: Conflict misses do NOT occur in fully associative caches.

4th C — Coherence Misses: In multiprocessor systems, a cache line may be invalidated (flushed) to maintain consistency across multiple processor caches. These misses don't exist in single-processor systems.`,
    keyPoints: [
      "Compulsory: first access to any block ever. Would occur in infinite cache. Unavoidable without prefetch.",
      "Capacity: cache too small for working set. Occur in fully-associative cache. Fix: larger cache.",
      "Conflict: too many blocks map to same set/line. Occur only in direct/set-assoc. Fix: higher associativity.",
      "Coherence (4th C): cache invalidated for cross-processor consistency. Multi-processor only — due to cache flushes to keep multiple caches consistent.",
      "Classification method: start with fully-associative → remaining misses = compulsory+capacity. Add direct mapping → extra misses = conflict.",
      "Larger block size reduces compulsory misses but can increase conflict and capacity misses.",
      "Fully associative eliminates ALL conflict misses — only compulsory and capacity remain.",
    ],
    formula: {
      code: `Miss Classification:
  Step 1: Model infinite fully-associative cache
    → Remaining misses = COMPULSORY only

  Step 2: Model finite fully-associative cache (same size as real cache)
    → Extra misses compared to step 1 = CAPACITY misses

  Step 3: Model direct-mapped or n-way set-associative cache
    → Extra misses compared to step 2 = CONFLICT misses

Three C's at a glance:
  Type        │ Appears in           │ Eliminated by
  ────────────┼──────────────────────┼───────────────────
  Compulsory  │ All caches (even ∞)  │ Prefetching, larger blocks
  Capacity    │ Fully assoc. cache   │ Larger cache
  Conflict    │ DM / n-way SA only   │ More associativity
  Coherence   │ Multi-processor only │ Coherence protocols (flush/invalidate)`,
      explanation: "The Three C's framework is a diagnostic tool. Once you identify which type of miss dominates, you know which optimization to apply.",
    },
    examTips: [
      "Compulsory = first access ever. Capacity = would be hit in ∞ cache. Conflict = would be hit in FA same-size cache.",
      "Fully associative cache has ZERO conflict misses — only compulsory and capacity.",
      "Direct-mapped cache has the most conflict misses of all mapping strategies.",
      "Coherence misses ONLY in multiprocessor systems — due to flushing caches to keep them in sync.",
    ],
    questions: [
      { q: "What is the difference between a capacity miss and a conflict miss?", a: "Capacity miss: occurs because the cache simply cannot hold all the blocks the program needs — not enough total space. Would be a miss even in a fully-associative cache. Fix: larger cache. Conflict miss: occurs because two (or more) blocks that both need to be in cache at the same time are forced into the same line/set, even though other lines are empty. Would be a hit in a fully-associative cache. Fix: more associativity." },
      { q: "Identify each miss type: (a) first access to a block, (b) cache cannot hold all needed blocks, (c) multiple blocks map to same set, (d) multiprocessor cache flush.", a: "(a) Compulsory / cold-start miss — first reference to a block, unavoidable. (b) Capacity miss — cache too small for the working set. (c) Conflict / collision miss — too many blocks compete for same cache line or set. (d) Coherence miss — cache line flushed/invalidated to keep multiple caches consistent in a multiprocessor system." },
    ],
  },

  "conflict-by-assoc": {
    title: "Conflict Misses by Associativity Level", emoji: "📉",
    tldr: "Conflict misses subdivided by associativity level: 8-way → 4-way → 2-way → 1-way (direct). Each reduction adds more conflict misses.",
    explanation: `Conflict misses can be further subdivided based on the level of associativity:

- Eight-way conflict misses: the misses that appear when going from fully associative → 8-way set associative
- Four-way conflict misses: the extra misses when going from 8-way → 4-way
- Two-way conflict misses: the extra misses when going from 4-way → 2-way
- One-way (Direct) conflict misses: the extra misses when going from 2-way → direct mapped

Fully associative has zero conflict misses by definition. Each step down in associativity adds some conflict misses.

In practice: going from 1-way to 2-way eliminates most conflict misses. Going from 2-way to 4-way helps a lot too. Beyond 8-way, the marginal benefit diminishes significantly. This is why 4-way and 8-way are the most common choices for L1 caches.

Fully associative has the theoretically best miss rate but is impractically expensive for large caches (requires hardware to search all lines simultaneously).`,
    keyPoints: [
      "Fully Associative → 0 conflict misses (baseline)",
      "8-way → gains 'eight-way' conflict misses (smallest increase)",
      "4-way → gains additional 'four-way' conflict misses",
      "2-way → gains additional 'two-way' conflict misses",
      "1-way (direct) → gains the most conflict misses (largest increase from 2-way)",
      "Most conflict misses are eliminated by going 1-way → 2-way (largest single improvement)",
      "Diminishing returns beyond 4–8 way for most workloads",
      "Practical choice: 4-way or 8-way SA for L1; 8-16 way for L2",
    ],
    formula: null,
    examTips: [
      "Going from 1-way to 2-way gives the biggest conflict miss reduction.",
      "FA caches: zero conflict misses. All other mapping strategies have some.",
    ],
    questions: [],
  },

  "opt1-block-size": {
    title: "Optimization 1 — Larger Block Size", emoji: "📏",
    tldr: "Larger blocks exploit spatial locality → fewer compulsory misses. But miss penalty increases and conflict misses can increase too. Sweet spot exists.",
    explanation: `Optimization 1 targets miss rate by using larger blocks.

Advantage: Larger blocks exploit spatial locality more aggressively. When any word in the block is needed, the entire block is loaded — bringing in many neighboring words that the program will likely need soon. This reduces compulsory misses (fewer cold misses per word accessed) and makes each cache miss more "efficient" by bringing in more useful data.

Disadvantage 1 — Increased Miss Penalty: With a fixed bus width, transferring a larger block takes more bus cycles. For example, with an 8-byte bus: 32B block needs 4 transfers; 64B block needs 8 transfers. The penalty per miss increases.

Disadvantage 2 — Increased Conflict Misses (for small caches): With a fixed total cache size, larger blocks mean fewer total lines. Fewer lines = more competition = more conflict misses. For a small cache, this effect can dominate.

Trade-off: Performance improves as block size increases up to a point, then degrades. The optimal block size depends on the cache size. Large caches benefit more from large blocks.`,
    keyPoints: [
      "Larger blocks → exploit spatial locality → fewer compulsory misses",
      "Disadvantage 1: larger block = more bus transfers per miss = higher miss penalty",
      "Disadvantage 2: fixed cache size → larger blocks = fewer total lines = more conflict misses",
      "Small cache + large block = worst combination (9.51% miss rate for 4K cache + 256B blocks)",
      "Large cache + large block = great (0.49% miss rate for 256K cache + 256B blocks)",
      "Performance curve: miss rate decreases then increases as block size grows (for fixed cache size)",
      "Example: 4K cache optimal block size ≈ 64B. 256K cache can use 256B blocks.",
    ],
    formula: {
      code: `Block Size vs. Cache Size (Miss Rate Table):
  Block Size  │ 4K cache │ 16K cache │ 64K cache │ 256K cache
  ────────────┼──────────┼───────────┼───────────┼───────────
  16 bytes    │  8.57%   │  3.94%    │  2.04%    │  1.09%
  32 bytes    │  7.24%   │  2.87%    │  1.35%    │  0.70%
  64 bytes    │  7.00%   │  2.64%    │  1.06%    │  0.51%
  128 bytes   │  7.78%   │  2.77%    │  1.02%    │  0.49%
  256 bytes   │  9.51%   │  3.29%    │  1.15%    │  0.49%

Observations:
  • Small cache + large block → WORSE (conflict misses dominate)
  • Large cache + large block → BETTER (spatial locality wins)
  • Best block size for 4K cache ≈ 64B (sweet spot)
  • Best block size for 256K cache = 128–256B`,
      explanation: "For 4K cache: 16B→8.57%, 64B→7.00% (improvement), 256B→9.51% (worse — conflicts). The sweet spot for small caches is moderate block size. Large caches don't see this degradation.",
    },
    examTips: [
      "Larger block → less miss rate (spatial) BUT larger miss penalty AND potentially more conflict misses.",
      "For small cache: medium block size is optimal. For large cache: can use large blocks.",
    ],
    questions: [],
  },

  "opt2-cache-size": {
    title: "Optimization 2 — Larger Cache Size", emoji: "📦",
    tldr: "Bigger cache holds more of the working set → fewer capacity misses. Trade-off: higher hit time, cost, and power.",
    explanation: `Optimization 2 reduces miss rate by simply making the cache bigger, so more of the program's working set fits in it.

Advantage: A larger cache holds more blocks, reducing capacity misses. With a 256-line cache instead of 128-line cache for 4096 blocks: 4096/256 = 16 blocks per line instead of 32. Less contention per line = fewer conflict misses too.

Disadvantage 1 — Increased Hit Time: A physically larger cache takes longer to search. The die area is larger, signal propagation distances are longer, and more hardware is needed for tag comparison. This can increase the clock cycle time if L1 cache is on the critical path.

Disadvantage 2 — Cost and Power: More SRAM = more cost and more power consumption. SRAM is expensive per bit. A very large L1 cache would be impractical in terms of chip area and heat.

AMAT example: AMAT = 1 + Miss Rate × 80 (memory latency). Larger cache reduces Miss Rate, so AMAT improves — but Hit Time might increase from 1 to 1.5 cycles. The net effect depends on the specific values.`,
    keyPoints: [
      "Larger cache → fewer capacity misses → lower miss rate",
      "With more lines: fewer blocks compete per line → also reduces some conflict misses",
      "Disadvantage: larger physical cache → longer hit time (larger area, more wires)",
      "Also: higher power and cost per cache level",
      "Used as L2 cache: large L2 captures what L1 misses → reduces L1 miss penalty",
      "The optimal cache size depends on the target application and power budget",
    ],
    formula: {
      code: `AMAT impact example:
  Miss Rate at different cache sizes:
    1K  cache → miss rate ~10%
    4K  cache → miss rate ~6%
    16K cache → miss rate ~4%
    64K cache → miss rate ~2%

  AMAT = Hit Time + Miss Rate × 80 cycles (memory latency)
    1K:  AMAT = 1 + 0.10 × 80 = 9.0
    4K:  AMAT = 1 + 0.06 × 80 = 5.8
    16K: AMAT = 1 + 0.04 × 80 = 4.2
    64K: AMAT = 1 + 0.02 × 80 = 2.6

  But if larger cache increases hit time:
    1K  → Hit Time = 1.0  AMAT = 9.0
    64K → Hit Time = 1.5  AMAT = 1.5 + 0.02×80 = 3.1
    ↑ Hit time increase partially offsets miss rate gain`,
      explanation: "This shows why there's a sweet spot for cache size. You want it large enough to reduce miss rate significantly, but not so large that hit time becomes the bottleneck.",
    },
    examTips: [
      "Larger cache reduces miss rate BUT increases hit time. Always consider the AMAT trade-off.",
      "L2 cache exploits this: L2 is large (low miss rate) and it's acceptable for L2 hit time to be higher.",
    ],
    questions: [],
  },

  "opt3-associativity": {
    title: "Optimization 3 — Higher Associativity", emoji: "🔀",
    tldr: "More ways per set → fewer conflict misses. Trade-off: more comparators needed → higher hit time. The '2-1 rule' helps predict when it's worth it.",
    explanation: `Optimization 3 reduces miss rate by increasing associativity — allowing more blocks to coexist per set.

Advantage: Each additional level of associativity reduces conflict misses. 2-way > direct; 4-way > 2-way; 8-way > 4-way. Blocks that previously competed for the same line can now coexist in different ways of the same set.

Disadvantage: Higher associativity means more tag comparators per set, which increases hardware complexity and hit time. Each additional way requires an additional tag comparison.

AMAT impact (with clock penalty from associativity): Assuming higher associativity increases clock cycle time:
- 1-way (direct): clock = 1.00×. AMAT = 1.00 + MissRate × 25
- 2-way: clock = 1.36×. AMAT = 1.36 + MissRate × 25
- 4-way: clock = 1.44×. AMAT = 1.44 + MissRate × 25
- 8-way: clock = 1.52×. AMAT = 1.52 + MissRate × 25

The 2-1 rule: A direct-mapped cache of size N has approximately the same miss rate as a 2-way set-associative cache of size N/2. So you can halve cache size and double associativity and roughly maintain miss rate — halving cost while maintaining performance.`,
    keyPoints: [
      "Higher associativity → fewer conflict misses → lower miss rate",
      "2-way > direct; 4-way > 2-way; 8-way > 4-way (diminishing returns)",
      "Disadvantage: more tag comparators → higher hit time → longer clock cycle",
      "2-1 Rule: Direct-mapped of size N ≈ 2-way SA of size N/2 in miss rate",
      "For small caches: associativity helps a lot. For large caches: less critical.",
      "Example: 4K direct (AMAT=3.45) vs 512K 8-way (AMAT=1.67) — huge AMAT improvement but also much larger cache",
      "Same size comparison: at same cache size, sometimes direct has better AMAT if clock penalty outweighs miss reduction",
    ],
    formula: {
      code: `AMAT with associativity overhead (Hit Time = 1 clock, Miss Penalty = 25 clocks):
  Associativity │ Clock Multiplier │ AMAT Formula
  ──────────────┼──────────────────┼───────────────────────
  1-way (DM)    │ 1.00×           │ 1.00 + MissRate × 25
  2-way         │ 1.36×           │ 1.36 + MissRate × 25
  4-way         │ 1.44×           │ 1.44 + MissRate × 25
  8-way         │ 1.52×           │ 1.52 + MissRate × 25

Numeric example:
  4K direct-mapped:     AMAT = 1.00 + 0.098×25 = 3.45
  512K 8-way:           AMAT = 1.52 + 0.006×25 = 1.67

The 2-1 Rule:
  Direct-mapped, 64K cache ≈ 2-way SA, 32K cache (same miss rate)
  So: 32K 2-way is roughly as effective as 64K direct-mapped
  → Same performance, half the cache size`,
      explanation: "The 2-1 rule is powerful: if you need to reduce cache size (for power or cost reasons), doubling associativity can compensate. Used in low-power mobile chip design.",
    },
    examTips: [
      "Higher associativity increases hit time — this can hurt AMAT even while improving miss rate.",
      "2-1 rule: DM of N ≈ 2-way SA of N/2 in miss rate.",
      "Most modern L1 caches are 4-way or 8-way — good balance of miss reduction vs hit time.",
    ],
    questions: [],
  },

  "opt4-multilevel": {
    title: "Optimization 4 — Multilevel Caches", emoji: "🏗️",
    tldr: "L1 = small and fast (match CPU). L2 = large and slow (catch misses). AMAT = HT_L1 + MR_L1 × (HT_L2 + MR_L2 × MP_L2). Warning: a bad L2 can actually worsen AMAT.",
    explanation: `Should the cache be fast (match CPU clock) or large (catch more misses)? The answer: add levels.

L1 Cache: Small enough to match the processor's clock cycle time — minimizes hit time for the common case.
L2 Cache: Large enough to capture accesses that would otherwise go to main memory — minimizes the effective miss penalty of L1.

AMAT formula for two-level cache:
AMAT = HitTime_L1 + MissRate_L1 × [HitTime_L2 + MissRate_L2 × MissPenalty_L2]

WARNING — A bad L2 can WORSEN AMAT: If an L2 cache has a very high local miss rate (e.g., 98%), the L2 hit time is always paid when there's an L1 miss, but L2 rarely helps. In that case, AMAT with L2 can be HIGHER than AMAT without any L2. Always verify that adding L2 actually improves AMAT.

Local vs. Global Miss Rates:
- Local Miss Rate of L2 = Misses_L2 / Accesses_to_L2 (misses per access L2 sees). This is high because L1 already filtered out easy hits.
- Global Miss Rate of L2 = Misses_L2 / Total_Processor_Accesses = MissRate_L1 × MissRate_L2. This is what matters for overall performance evaluation.

L2 design priorities: high associativity and large block size (emphasize low miss rate over fast hit time, since L2 hit time only affects L1 miss penalty, not the CPU clock).`,
    keyPoints: [
      "L1: small and fast — minimizes hit time for the common case",
      "L2: large and slow (relative to L1) — reduces miss penalty by catching L1 misses",
      "AMAT = HT_L1 + MR_L1 × (HT_L2 + MR_L2 × MP_L2)",
      "L1 miss penalty = HT_L2 + MR_L2 × MP_L2 (the whole L2 lookup cost)",
      "Local MR_L2 = L2 misses / L2 accesses (high — only sees what L1 missed)",
      "Global MR_L2 = L1 miss rate × L2 local miss rate = L2 misses / processor accesses",
      "Use GLOBAL miss rate for L2 evaluation — local is misleading",
      "L2 design: favor high associativity + large blocks (miss rate > hit time priority)",
      "Multi-level inclusion: everything in L1 should also be in L2",
      "CRITICAL: A poorly sized L2 with high local miss rate can make AMAT WORSE than no L2 at all!",
    ],
    formula: {
      code: `Two-Level Cache Example:
  1000 memory references: 40 L1 misses, 20 L2 misses
  L1 hit time = 1, L2 hit time = 10, L2 miss penalty = 200 cycles

  Miss rates:
    L1 local (= global) = 40/1000 = 4%
    L2 local  = 20/40  = 50%    ← very high (L1 already filtered easy hits)
    L2 global = 20/1000 = 2%    ← this is what matters

  AMAT = 1 + 0.04 × (10 + 0.50 × 200) = 1 + 0.04 × 110 = 5.4 cycles

BAD L2 EXAMPLE (from exam ESA May 2023):
  P1 alone:     AMAT = 0.96 + 0.043 × 70 = 3.97 ns
  P1 + 512KB L2 (local miss rate 98%, hit time 3.22 ns):
    AMAT = 0.96 + 0.043 × (3.22 + 0.98 × 70)
         = 0.96 + 0.043 × 71.82 = 4.05 ns  ← WORSE than no L2!
  P1 + 4MB L2 (local miss rate 73%, hit time 11.48 ns):
    AMAT = 0.96 + 0.043 × (11.48 + 0.73 × 70)
         = 0.96 + 0.043 × 62.58 = 3.65 ns  ← Better than no L2 ✓

L2 Associativity Comparison:
  L2 Direct-mapped:  HT=10, MR=25%, penalty=200 → L1 miss penalty = 60 cycles
  L2 2-way:          HT=10.1, MR=20%, penalty=200 → L1 miss penalty = 50.1 cycles
  → 0.1 cycle hit time increase saves ~10 cycle miss penalty → clearly worth it`,
      explanation: "The bad L2 example is critically important: the 512KB L2 with 98% miss rate actually increases AMAT from 3.97 to 4.05 ns. L2 must be large enough to have a meaningfully low miss rate. A tiny L2 that rarely helps is worse than no L2.",
    },
    examTips: [
      "Use GLOBAL miss rate for L2 (= L1 MR × L2 local MR). Don't use L2 local miss rate alone.",
      "L2 hit time only affects L1 miss penalty — doesn't change the CPU clock rate.",
      "Always verify that adding L2 actually REDUCES AMAT — a poorly configured L2 can worsen it.",
    ],
    questions: [
      { q: "Why is the L2 local miss rate not a good performance metric?", a: "Because L2 only sees the accesses that L1 missed. L1 already filters out all the easy hits. So L2's local miss rate is always high (e.g., 50%) regardless of how good L2 is. A small L1 would send more accesses to L2 and make L2's local miss rate look lower, even if L2 is worse. The global miss rate (L2 misses / total processor accesses = L1_MR × L2_MR) correctly captures L2's contribution to overall performance." },
      { q: "Can adding an L2 cache ever make performance worse? Why?", a: "Yes. If the L2 cache is too small (resulting in a very high local miss rate, e.g., 98%), the L2 hit time is always paid whenever L1 misses, but L2 rarely absorbs those misses. The extra hit time on every L1 miss outweighs the rare L2 hits. For example, if P1 alone has AMAT 3.97 ns but with a 512KB L2 at 98% miss rate it becomes 4.05 ns — the L2 made things worse. The L2 must be large enough to have a meaningfully low miss rate." },
    ],
  },

  "opt5-reads-priority": {
    title: "Optimization 5 — Prioritize Reads Over Writes", emoji: "📬",
    tldr: "Check write buffer on read misses to prevent RAW hazards. For write-back: use victim buffer when evicting dirty blocks.",
    explanation: `Write buffers (used with write-through) can create a Read-After-Write (RAW) hazard: the write buffer holds a newly written value that a subsequent read from the same address needs. If we don't check the write buffer on a read miss, we might read the old stale value from main memory.

Two options on a read miss when a write buffer exists:
1. Wait for the write buffer to completely drain before proceeding with the read — safe but slow (stalls CPU).
2. Check write buffer for address conflicts: if the read address isn't in the write buffer, proceed immediately. If it is, use the written value from the buffer. This is what virtually all modern processors do.

For write-back caches: when a read miss evicts a dirty block, the normal sequence is write dirty → then read new. Instead: copy dirty block to a victim buffer in parallel with reading the new block. This allows the read to proceed faster while the dirty block write happens in the background.

This optimization reduces effective miss penalty — both cases help avoid unnecessary stalls.`,
    keyPoints: [
      "RAW hazard: write buffer holds new value; subsequent read from same address gets old value from memory",
      "Solution: check write buffer on EVERY read miss. If match → use buffer value. If no match → read from memory immediately.",
      "This is what virtually all modern processors do — check write buffer, avoid stall unless actual conflict.",
      "For write-back: dirty block eviction + read new block can be parallelized using victim buffer",
      "Victim buffer: holds evicted dirty blocks temporarily while write-back happens asynchronously",
      "Both techniques reduce effective miss penalty by avoiding unnecessary sequential stalls",
    ],
    formula: {
      code: `RAW Hazard Example (ARM-style code):
  STR R3, 256(R0)    ; Write R3 to address 256 → into write buffer
  LDR R1, 2048(R0)   ; Read from 2048 — miss (maps to same cache line as 256)
                     ; Evicts cached copy of address 256
  LDR R2, 256(R0)    ; Read from 256 — miss → reads from MEMORY

  WITHOUT checking write buffer:
    STR R3=7, 256 → WB=[256:7];  Main mem: 256=0
    LDR R1, 2048  → cache miss → block {256,2048} loaded from memory (old value)
    LDR R2, 256   → HIT but cache has old value 0, not 7!
    Result: R2 = 0 ≠ R3 = 7 → WRONG (data corruption!)

  WITH checking write buffer:
    LDR R2, 256 miss → check WB → found 256:7 → return 7
    Result: R2 = 7 = R3 → CORRECT ✓`,
      explanation: "This is why the write buffer check is mandatory, not optional. Without it, write-through caches can silently corrupt computation. All modern processors check the write buffer before falling through to main memory.",
    },
    examTips: [
      "RAW = Read After Write. The read gets the OLD value from memory if write buffer not checked.",
      "Solution: check write buffer for every read miss. Match → use WB value. No match → proceed normally.",
      "Victim buffer: used with write-back to overlap dirty eviction with new block fetch.",
    ],
    questions: [
      { q: "What is a Read After Write (RAW) hazard in the context of cache write buffers?", a: "It occurs when a store instruction writes a value to the write buffer (not yet to main memory), and a subsequent load instruction reads from the same address (or same cache block). If the cache misses and fetches from main memory without checking the write buffer, it gets the OLD value, not the value just written. This causes incorrect results. Fix: always check the write buffer on read misses." },
    ],
  },

  "opt6-vipt": {
    title: "Optimization 6 — VIPT Overview & Address Translation", emoji: "🎯",
    tldr: "VA→PA translation delays every cache access. VIPT: use VA bits to index cache WHILE TLB translates — hides translation latency.",
    explanation: `Modern processors use virtual addresses (VA) in programs but physical addresses (PA) in hardware. The OS manages the mapping via page tables, and the CPU has a TLB (Translation Lookaside Buffer) to cache recent translations.

The problem: before you can index the cache using a physical address, you need to translate the virtual address to a physical address. This translation takes extra time (TLB lookup), adding latency to every single L1 cache access — even hits.

Solution — VIPT (Virtually Indexed, Physically Tagged): Use the page offset bits from the virtual address to index into the cache SIMULTANEOUSLY while the TLB is performing the VA → PA translation. Then use the Physical Address tag (from TLB output) to verify the hit. Since both happen in parallel, the TLB latency is hidden.

Physical address changes: the OS can remap physical memory pages to different virtual pages for different processes. So a virtual address 0x1000 in process A and virtual address 0x1000 in process B might refer to completely different physical locations. Physical addresses don't change mid-execution; virtual addresses can be remapped.`,
    keyPoints: [
      "Virtual Address (VA): what programs use. Physical Address (PA): what hardware uses.",
      "TLB: fast cache for VA → PA translations. TLB lookup takes time.",
      "PIPT problem: must wait for TLB before indexing cache → adds latency to every hit.",
      "VIPT solution: index cache with VA offset bits WHILE TLB translates in parallel",
      "Page Offset bits are identical in VA and PA for the same address → safe to use directly",
      "VIPT hides TLB latency by parallelizing translation and cache lookup",
      "VIPT constraint: L1 index bits must come from page offset (bits that are same in VA and PA)",
      "L1 max size with VIPT: Page Size × Associativity",
    ],
    formula: {
      code: `Address Translation Breakdown:
  Virtual Address = [ Virtual Page Number (VPN) | Page Offset ]
  Physical Address = [ Physical Frame Number (PFN) | Page Offset ]
  Note: Page Offset is IDENTICAL in VA and PA (same bits) ← key to VIPT

  TLB: maps VPN → PFN
  TLB lookup time adds to every cache access latency

  PIPT sequence (serial — slow):
    1. VA → TLB → PA          (wait for TLB)
    2. PA → index cache        (then look up cache)
    Total = TLB time + Cache time

  VIPT sequence (parallel — fast):
    1. VA page offset → cache index  (immediately, no waiting)
    2. VPN → TLB → PFN → PA tag     (simultaneously)
    3. Compare PA tag with stored tag
    Total = max(TLB time, Cache time) ≈ Cache time only`,
      explanation: "The page offset bits don't change through translation (same in VA and PA). So you can use them to index the cache right away without waiting for TLB. Then you just need the TLB's output (the physical tag) to confirm it's the right block.",
    },
    examTips: [
      "Page offset bits = identical in VA and PA → safe to use as cache index without translation",
      "VIPT parallelizes TLB lookup and cache indexing → hides TLB latency",
      "L1 size constraint with VIPT: must ensure index bits come only from page offset portion",
    ],
    questions: [],
  },

  "pipt": {
    title: "PIPT — Physically Indexed, Physically Tagged", emoji: "🔐",
    tldr: "CPU generates VA → TLB translates to PA → cache indexed and tagged with PA. Correct but slow: TLB is on the critical path.",
    explanation: `PIPT (Physically Indexed, Physically Tagged): the cache uses Physical Addresses for both the index and the tag.

Steps:
1. CPU generates a Virtual Address
2. TLB translates VA → Physical Address (PA)
3. Use the PA's index bits to select the cache set
4. Compare the PA's tag bits with the stored tag
5. HIT or MISS based on tag comparison

Correctness: Perfect. Physical addresses are unique — no ambiguity about which block is in the cache. No aliasing issues. Simple coherence.

Problem: Must wait for TLB translation before the cache can even be indexed. The TLB lookup is on the critical path for every single memory access, including L1 cache hits. This adds latency to every hit.

For high-performance L1 caches targeting 1–2 cycle hit time, adding TLB latency can push hit time to 3–4 cycles — unacceptable. PIPT is used for L2 and L3 (where hit time is already higher) or for correctness-critical designs.`,
    keyPoints: [
      "PIPT: cache indexed AND tagged using Physical Address",
      "Step sequence: VA → TLB → PA → index cache → compare tag",
      "Correctness: perfect. No aliasing. Simple cache coherence.",
      "Problem: TLB is on the critical path — adds latency to every cache access including hits",
      "Used for L2/L3 caches (where extra TLB latency is less painful relative to total hit time)",
      "PA bits: tag = high bits, index = middle bits, offset = low bits (all from physical address)",
    ],
    formula: {
      code: `PIPT Bit Calculation Example (Case Study 1):
  64-bit VA, 41-bit PA, Page Size = 8KB = 2^13
  TLB: Direct Mapped, 256 entries = 2^8
  L1 Cache: 8KB = 2^13, Direct Mapped, Block Size = 64B = 2^6
  L2 Cache: 4MB = 2^22, Direct Mapped, Block Size = 64B

  Page offset = 13 bits (from page size)
  VPN = 64 - 13 = 51 bits
  PPN = 41 - 13 = 28 bits

  TLB Index = 8 bits (256 entries)
  TLB Tag = 51 - 8 = 43 bits

  L1: Blocks = 2^13/2^6 = 2^7 = 128 → Index = 7 bits
      Offset = 6 bits
      Tag (from PA) = 41 - 7 - 6 = 28 bits

  L2: Blocks = 2^22/2^6 = 2^16 → Index = 16 bits
      Offset = 6 bits
      Tag (from PA) = 41 - 16 - 6 = 19 bits`,
      explanation: "In PIPT, ALL cache fields (tag, index) come from the Physical Address. The TLB must complete before the cache lookup begins. Block offset stays the same across all levels (determined by block size, which is constant).",
    },
    examTips: [
      "PIPT: everything from PA. Tag = PA bits − index − offset. Serial: TLB first, then cache.",
      "Block offset = log₂(block size) — same at every cache level (block size doesn't change).",
    ],
    questions: [],
  },

  "vipt": {
    title: "VIPT — Virtually Indexed, Physically Tagged", emoji: "⚡",
    tldr: "Index cache with VA offset bits (no TLB needed). Tag from PA (from TLB). Both happen in parallel → hides TLB latency. Constraint: L1 ≤ page size × associativity.",
    explanation: `VIPT (Virtually Indexed, Physically Tagged): the cache is indexed using part of the Virtual Address, but tagged using the Physical Address.

Key insight: The page offset bits in a virtual address are identical to the corresponding bits in the physical address. The OS's page translation only affects the page number portion, not the offset within a page. So if the L1 cache index uses only bits within the page offset, those index bits are the same whether you use the VA or PA.

Steps:
1. CPU generates Virtual Address (VA)
2. Simultaneously: (a) VA offset bits → index the cache set, AND (b) VPN → TLB → PFN (physical tag)
3. Cache returns candidate tag; compare with PA tag from TLB output
4. HIT or MISS based on tag comparison

Both operations happen in parallel → TLB latency is hidden → faster effective hit time.

VIPT correctness constraint: All L1 index bits must come from within the page offset portion. Maximum L1 size = Page Size × n-ways. Larger L1 would require index bits from the page number (VA ≠ PA for page number), causing aliasing bugs.`,
    keyPoints: [
      "VIPT: index from VA (offset bits), tag from PA (after TLB translation)",
      "VA offset bits = PA offset bits (page translation doesn't change offset within page)",
      "TLB lookup and cache indexing happen IN PARALLEL → hides TLB latency",
      "Tag comparison still uses Physical Address → correct, no ambiguity from aliasing",
      "Constraint: L1 index bits must come ONLY from page offset bits",
      "L1 maximum size = Page Size × Associativity (n-way)",
      "Example: 4KB page, 4-way SA → max L1 = 4KB × 4 = 16KB",
      "L2 and L3 typically use PIPT (larger and slower, TLB latency matters less)",
    ],
    formula: {
      code: `VIPT Correctness Constraint:
  Index bits must come from page offset → bits within offset are same in VA and PA
  Page Offset = log₂(Page Size) bits

  Maximum L1 size = Page Size × n-ways:
    4KB page, direct-mapped (n=1): max L1 = 4KB
    4KB page, 2-way SA (n=2):      max L1 = 8KB
    4KB page, 4-way SA (n=4):      max L1 = 16KB
    8KB page, 4-way SA (n=4):      max L1 = 32KB

VIPT Check for Case Study 2 (L1):
  Page Size = 16KB = 2^14 → Page offset = 14 bits
  L1 = 16KB, Direct Mapped → Blocks = 2^14/2^6 = 2^8 → Index = 8 bits
  Check: 8 index bits < 14 page offset bits → all index bits within offset ✓ VIPT safe

  L1 Tag (from PA) = 41 - 8 - 6 = 27 bits
  AMAT benefit: TLB lookup (say 5 cycles) is hidden inside cache access time`,
      explanation: "The correctness constraint is strict: if even ONE index bit comes from the page number (not offset), different processes with different page mappings could compute different cache indices for the same physical address — causing incorrect behavior. Always verify: index bits ≤ log₂(page size).",
    },
    examTips: [
      "VIPT correctness check: index bits ≤ page offset bits. If violated → aliasing bug.",
      "L1 max size = Page Size × Ways. This limits L1 cache size — a real design constraint.",
      "VIPT is used in virtually all modern high-performance L1 caches.",
    ],
    questions: [
      { q: "Why can VIPT use virtual address bits to index the cache without causing aliasing?", a: "The page offset bits (low bits within a page) are identical in both the virtual address and physical address for the same memory access. The OS's page translation only changes the page number (the high bits), never the offset within a page. So if the cache index uses only these offset bits, the same physical block always produces the same cache index — no aliasing. The constraint is: all index bits must come from within the page offset." },
    ],
  },

  "case-study-1": {
    title: "Case Study 1 — PIPT Bit Calculation", emoji: "🔢",
    tldr: "64-bit VA, 41-bit PA, 8KB pages. Calculate TLB, L1, L2 tag/index/offset fields step by step. Also compute total TLB storage size.",
    explanation: `Full PIPT case study: compute all bit fields for TLB, L1 cache, and L2 cache.

Specification:
- 64-bit Virtual Address, 41-bit Physical Address
- Page Size = 8 KB = 2^13 → Page Offset = 13 bits
- TLB: Direct Mapped, 256 entries = 2^8
- L1 Cache: 8 KB = 2^13, Direct Mapped
- L2 Cache: 4 MB = 2^22, Direct Mapped
- Block Size = 64 bytes = 2^6 (same for both caches)

Calculation methodology: start from the right (offset), then index, then tag.

Key insight: Block offset is determined by block size (64B → 6 bits) and stays the same across ALL levels. TLB works with virtual page numbers; caches work with physical addresses after TLB output.

TLB entry size: Each TLB entry stores a valid bit (1 bit) + TLB tag bits + PPN bits. The total storage for the TLB = number of entries × bits per entry.`,
    keyPoints: [
      "Page Offset = log₂(8KB) = 13 bits. VPN = 64 - 13 = 51 bits. PPN = 41 - 13 = 28 bits.",
      "TLB: 256 entries → Index = 8 bits. TLB Tag = VPN - TLB index = 51 - 8 = 43 bits.",
      "Block Offset = log₂(64) = 6 bits (same everywhere)",
      "L1: 8KB/64B = 128 blocks → Index = 7 bits. Tag (PA) = 41 - 7 - 6 = 28 bits.",
      "L2: 4MB/64B = 64K = 2^16 blocks → Index = 16 bits. Tag (PA) = 41 - 16 - 6 = 19 bits.",
      "TLB entry size = valid(1) + tag(43) + PPN(28) = 72 bits per entry.",
      "Total TLB storage = 256 entries × 72 bits = 18,432 bits.",
    ],
    formula: {
      code: `PIPT Case Study 1 — Full Bit Table:
  Component │ Field        │ Calculation                 │ Bits
  ──────────┼──────────────┼─────────────────────────────┼──────
  Page      │ Offset       │ log₂(8KB)                   │ 13
  Page      │ VPN          │ 64 - 13                     │ 51
  Page      │ PPN          │ 41 - 13                     │ 28
  ──────────┼──────────────┼─────────────────────────────┼──────
  TLB       │ Index        │ log₂(256) = 2^8             │ 8
  TLB       │ Tag          │ VPN - Index = 51 - 8        │ 43
  TLB       │ Entry size   │ valid(1) + tag(43) + PPN(28)│ 72 bits/entry
  TLB       │ Total size   │ 256 × 72                    │ 18,432 bits
  ──────────┼──────────────┼─────────────────────────────┼──────
  L1 Cache  │ Blocks       │ 2^13 / 2^6 = 2^7 = 128     │ —
  L1 Cache  │ Index        │ log₂(128) = 7               │ 7
  L1 Cache  │ Block Offset │ log₂(64)                    │ 6
  L1 Cache  │ Tag (PA)     │ 41 - 7 - 6                  │ 28
  ──────────┼──────────────┼─────────────────────────────┼──────
  L2 Cache  │ Blocks       │ 2^22 / 2^6 = 2^16 = 65536  │ —
  L2 Cache  │ Index        │ log₂(65536) = 16            │ 16
  L2 Cache  │ Block Offset │ log₂(64)                    │ 6
  L2 Cache  │ Tag (PA)     │ 41 - 16 - 6                 │ 19`,
      explanation: "Algorithm: (1) Page offset = log₂(page size). (2) VPN = VA - page offset. (3) PPN = PA - page offset. (4) TLB: index = log₂(entries), tag = VPN - index. TLB entry = valid + tag + PPN. (5) Cache: blocks = cache size/block size, index = log₂(blocks), tag = PA - index - offset.",
    },
    examTips: [
      "Block offset is ALWAYS log₂(block size) — same at every level, don't recalculate.",
      "TLB tag comes from VPN (virtual). Cache tag comes from PA (physical) — don't mix these up.",
      "For direct-mapped: number of sets = number of blocks = cache size / block size.",
      "TLB entry size = valid bit + tag bits + PPN bits. Total TLB = entries × entry size.",
    ],
    questions: [],
  },

  "case-study-2": {
    title: "Case Study 2 — VIPT with Larger Page Size", emoji: "🔢",
    tldr: "64-bit VA, 41-bit PA, 16KB pages, 2-way TLB, 16KB L1 direct, 4MB 4-way L2. Verify VIPT correctness for L1.",
    explanation: `Modified specification with larger page size and set-associative TLB/L2:

- 64-bit VA, 41-bit PA
- Page Size = 16 KB = 2^14 → Page Offset = 14 bits
- TLB: 2-way set associative, 256 total entries → 128 sets = 2^7
- L1 Cache: 16 KB = 2^14, Direct Mapped, Block Size = 64B = 2^6
- L2 Cache: 4 MB = 2^22, 4-way set associative, Block Size = 64B

VIPT correctness check for L1: L1 index uses 8 bits from the offset portion. Page Offset = 14 bits. Since 8 < 14, all L1 index bits are within the page offset — same in VA and PA. VIPT is correct here.

For set-associative TLB and L2: the number of sets = total entries / ways. Index = log₂(sets).`,
    keyPoints: [
      "Page Offset = 14 bits. VPN = 50 bits. PFN = 27 bits.",
      "TLB: 256 entries / 2 ways = 128 sets → Index = 7 bits. Tag = 50 - 7 = 43 bits.",
      "L1 (direct): 2^14/2^6 = 2^8 = 256 blocks → Index = 8 bits. Tag = 41 - 8 - 6 = 27 bits.",
      "L2 (4-way): Sets = 2^22 / (2^6 × 2^2) = 2^14 → Index = 14 bits. Tag = 41 - 14 - 6 = 21 bits.",
      "VIPT check: L1 index = 8 bits, page offset = 14 bits. 8 < 14 → index bits all within offset ✓",
    ],
    formula: {
      code: `VIPT Case Study 2 — Full Bit Table:
  Component │ Field    │ Calculation                         │ Bits
  ──────────┼──────────┼─────────────────────────────────────┼──────
  Page      │ Offset   │ log₂(16KB)                          │ 14
  Page      │ VPN      │ 64 - 14                             │ 50
  Page      │ PFN      │ 41 - 14                             │ 27
  ──────────┼──────────┼─────────────────────────────────────┼──────
  TLB (2-way)│ Sets    │ 256 / 2 = 128 = 2^7                 │ —
  TLB       │ Index    │ log₂(128) = 7                       │ 7
  TLB       │ Tag      │ VPN - Index = 50 - 7                │ 43
  ──────────┼──────────┼─────────────────────────────────────┼──────
  L1 Cache  │ Blocks   │ 2^14 / 2^6 = 2^8 = 256             │ —
  L1 Cache  │ Index    │ log₂(256) = 8                       │ 8
  L1 Cache  │ Offset   │ log₂(64) = 6                        │ 6
  L1 Cache  │ Tag (PA) │ 41 - 8 - 6                          │ 27
  ──────────┼──────────┼─────────────────────────────────────┼──────
  L2 Cache  │ Sets     │ 2^22 / (2^6 × 2^2) = 2^14          │ —
  L2 Cache  │ Index    │ log₂(2^14) = 14                     │ 14
  L2 Cache  │ Offset   │ log₂(64) = 6                        │ 6
  L2 Cache  │ Tag (PA) │ 41 - 14 - 6                         │ 21

VIPT Correctness Check for L1:
  L1 Index bits needed = 8
  Page Offset bits available = 14
  8 ≤ 14 → Index bits entirely within page offset → VIPT is CORRECT ✓`,
      explanation: "For set-associative caches: Sets = Total blocks / n-ways. For L2: blocks = 2^22/2^6 = 2^16 total blocks; sets = 2^16 / 4 = 2^14. Always divide total blocks by ways to get sets.",
    },
    examTips: [
      "For set-associative: Sets = (cache size / block size) / ways. Then index = log₂(sets).",
      "VIPT check: L1_index_bits ≤ page_offset_bits. Fails if L1 is too large for the page size.",
    ],
    questions: [],
  },

  "formula-sheet": {
    title: "Quick Reference — Formula Sheet", emoji: "📐",
    tldr: "All key formulas for exam: AMAT, CPU Time, stall CPI, miss rates, tag/index/offset bit calculations.",
    explanation: `Complete formula reference for Unit 3 exams.`,
    keyPoints: [
      "AMAT = Hit Time + Miss Rate × Miss Penalty",
      "AMAT (2-level) = HT_L1 + MR_L1 × [HT_L2 + MR_L2 × MP_L2]",
      "CPU Time = IC × (Base CPI + Mem Stall CPI) × Clock Cycle Time",
      "Mem Stall CPI = Mem Accesses/Instr × Miss Rate × Miss Penalty",
      "Split cache: stall = I-stall + D-stall (compute separately)",
      "Unified cache: stall = (1 + data_fraction) × miss_rate × penalty",
      "Global MR_L2 = MR_L1 × MR_L2_local",
      "Tag bits (DM) = PA bits − Index bits − Offset bits",
      "Tag bits (FA) = PA bits − Offset bits (no index)",
      "Index bits (SA) = log₂(#sets). #Sets = (cache size / block size) / ways",
      "Offset bits = log₂(block size in bytes)",
      "Hit ratio = Hits / Total Accesses",
      "Miss ratio = 1 − Hit ratio",
      "Miss Penalty (sequential): B × (1 + L + 1) cycles",
      "Miss Penalty (interleaved/banking): 1 + L + (block_size / bus_width) cycles",
      "TLB entry size = valid(1) + TLB_tag + PPN bits",
      "Total TLB storage = entries × entry_size",
    ],
    formula: {
      code: `MASTER FORMULA SET — Unit 3:

AMAT formulas:
  AMAT = HT + MR × MP
  AMAT (2-level) = HT_L1 + MR_L1 × (HT_L2 + MR_L2 × MP_L2)

CPU performance:
  CPU Time = IC × (CPI_base + CPI_stall) × Clock Cycle Time
  CPI_stall = Mem_Accesses/Instr × Miss Rate × Miss Penalty
  CPI_stall (split) = I-cache_stall + D-cache_stall
  Unified: CPI_stall = (1 + data_fraction) × miss_rate × penalty

Miss rate relationships:
  Miss Rate = 1 − Hit Rate = Misses / Total Accesses
  L2 Global MR = MR_L1 × MR_L2_local

Address field calculations:
  Offset bits = log₂(block size in bytes)
  Index bits (DM) = log₂(number of cache lines)
  Index bits (n-way SA) = log₂(cache_size / (block_size × n))
  Tag bits = PA bits − Index bits − Offset bits
  Tag bits (FA) = PA bits − Offset bits

TLB calculations:
  Page offset = log₂(page size in bytes)
  VPN = VA bits − page offset. PPN = PA bits − page offset.
  TLB sets = TLB entries / ways
  TLB index = log₂(TLB sets)
  TLB tag = VPN − TLB index
  TLB entry size = 1 (valid) + TLB_tag + PPN bits
  Total TLB size = entries × entry_size

Miss penalty:
  Sequential (B words, 1-word bus): B × (1 + L + 1) cycles
  Interleaved banks: 1 + L + (B × transfer_time) cycles
  Wide bus: 1 + L + 1 cycles

Hit/Miss rates:
  Hit Rate = Hits / Total Accesses
  Miss Rate = 1 − Hit Rate = Misses / Total`,
      explanation: "For any exam problem: identify what you're solving for (AMAT? CPI? tag bits?), find the matching formula, substitute known values. Most problems are straightforward substitutions.",
    },
    examTips: [
      "AMAT = HT + MR × MP — this single formula covers most cache performance questions.",
      "For split caches: add I-cache stall and D-cache stall separately.",
      "Block offset is ALWAYS the same across all cache levels for a given system.",
      "Don't forget: sequential miss penalty = B × (1+L+1), not just 1+L+B.",
    ],
    questions: [],
  },

  "six-opt-summary": {
    title: "Quick Reference — Six Optimizations", emoji: "⚡",
    tldr: "All six optimizations at a glance: what each reduces, how it works, and the trade-off.",
    explanation: `Summary of all six cache optimizations for quick exam review.`,
    keyPoints: [
      "Opt 1 (Larger Block): Reduces compulsory miss rate via spatial locality. Trade-off: ↑ miss penalty, ↑ conflict misses.",
      "Opt 2 (Larger Cache): Reduces capacity miss rate. Trade-off: ↑ hit time, ↑ cost, ↑ power.",
      "Opt 3 (Higher Assoc): Reduces conflict miss rate. Trade-off: ↑ hit time, more hardware.",
      "Opt 4 (Multilevel): Reduces miss penalty. L1=fast, L2=large. Trade-off: complex analysis. Bad L2 can worsen AMAT.",
      "Opt 5 (Reads Priority): Reduces miss penalty. Check write buffer, victim buffer. Trade-off: complex write buffer.",
      "Opt 6 (VIPT): Reduces hit time. Index from VA, tag from PA in parallel. Trade-off: L1 size limited by page size × assoc.",
    ],
    formula: {
      code: `Six Optimizations Summary Table:
  #  │ Name                  │ Reduces     │ How                              │ Trade-off
  ───┼───────────────────────┼─────────────┼──────────────────────────────────┼──────────────────────────────
  1  │ Larger Block Size     │ Miss Rate   │ More spatial locality per block  │ ↑ Miss penalty, ↑ conflict
  2  │ Larger Cache          │ Miss Rate   │ Fits more of working set         │ ↑ Hit time, cost, power
  3  │ Higher Associativity  │ Miss Rate   │ More placement flexibility       │ ↑ Hit time, hardware cost
  4  │ Multilevel Caches     │ Miss Penalty│ L1 fast, L2 large                │ Complex; bad L2 worsens AMAT
  5  │ Reads Priority/Writes │ Miss Penalty│ Check write buf on read miss     │ More complex write buffer
  6  │ VIPT                  │ Hit Time    │ Index from VA while TLB runs     │ L1 size ≤ Page×Assoc`,
      explanation: "Quick classification: Opts 1-3 = reduce miss rate. Opts 4-5 = reduce miss penalty. Opt 6 = reduce hit time. Each addresses a different part of AMAT = HT + MR × MP.",
    },
    examTips: [
      "For any optimization question: identify which AMAT term it targets (HT, MR, or MP).",
      "Opt 1 is unusual: reduces MR but INCREASES MP — the net effect depends on both.",
    ],
    questions: [],
  },

  "three-cs-summary": {
    title: "Quick Reference — Three C's of Misses", emoji: "3️⃣",
    tldr: "Compulsory (first access), Capacity (too small), Conflict (same set competition). Know which optimization fixes each.",
    explanation: `Quick reference for miss type classification.`,
    keyPoints: [
      "Compulsory: first access to block. Occurs in ALL caches including infinite. Prefetching or larger blocks help.",
      "Capacity: cache too small for working set. Occurs in FA cache (no conflicts). Larger cache helps.",
      "Conflict: too many blocks in same set. Occurs only in DM/n-way. Higher associativity helps.",
      "Coherence (4th C): multi-processor cache flush to keep multiple caches consistent. Cache coherence protocols help.",
    ],
    formula: {
      code: `Three C's Quick Reference:
  Miss Type   │ When             │ In Which Caches   │ Reduced By
  ────────────┼──────────────────┼───────────────────┼────────────────────────
  Compulsory  │ First access     │ All (even ∞ cache)│ Prefetching, larger blocks
  Capacity    │ Cache too small  │ FA and larger     │ Larger cache
  Conflict    │ Same set overload│ DM, n-way SA only │ Higher associativity
  Coherence   │ Multi-proc flush │ Multi-proc only   │ Coherence protocols

  Classification method:
  1. Use infinite FA cache → remaining misses = Compulsory
  2. Use finite FA cache → extra misses vs step 1 = Capacity
  3. Use DM/n-way cache → extra misses vs step 2 = Conflict`,
      explanation: "The 3C classification is both a diagnostic tool and a framework for choosing optimizations. Identify the dominant miss type, then apply the corresponding optimization.",
    },
    examTips: [
      "FA cache has ZERO conflict misses — all misses in FA cache = compulsory + capacity only.",
      "Direct-mapped has ALL three types. FA has only two. That difference = conflict misses.",
    ],
    questions: [],
  },

  "write-policy-summary": {
    title: "Quick Reference — Write Policy Summary", emoji: "✍️",
    tldr: "Write-Through + Write-No-Allocate vs Write-Back + Write-Allocate. Know when to use each and what bits are needed.",
    explanation: `Summary of all four write-related policies.`,
    keyPoints: [
      "Write-Through on HIT: update both cache AND memory simultaneously. Always consistent. Need: valid bit only.",
      "Write-Back on HIT: update cache only. Set dirty bit = 1. Memory updated only on eviction. Need: valid bit + dirty bit.",
      "Write-Allocate on MISS: load block into cache, then update cache. Use with Write-Back.",
      "Write-No-Allocate on MISS: write directly to memory. Cache unchanged. Use with Write-Through.",
      "Common pairings: Write-Back + Write-Allocate. Write-Through + Write-No-Allocate.",
      "Write-Back is faster (fewer DRAM writes). Write-Through is simpler and always consistent.",
    ],
    formula: {
      code: `Write Policy Quick Reference:
  Policy             │ On HIT              │ On MISS               │ When to use
  ───────────────────┼─────────────────────┼───────────────────────┼──────────────────────
  Write-Through      │ Cache + Memory      │ Write No-Allocate     │ Simple, always consistent
  Write-Back         │ Cache only + dirty=1│ Write Allocate        │ Better perf, complex
  Write Allocate     │ —                   │ Load block then write │ With Write-Back
  Write No-Allocate  │ —                   │ Write to memory only  │ With Write-Through

  Cache line bits needed:
    Write-Through: [ Valid Bit | Tag | Data ]
    Write-Back:    [ Valid Bit | Dirty Bit | Tag | Data ]

  Dirty Bit = 0 → cache = memory (clean)
  Dirty Bit = 1 → cache ≠ memory (must write back on eviction)`,
      explanation: "Think of it this way: Write-Through is like Dropbox auto-sync on every save (always consistent, always writing). Write-Back is like manually committing changes (faster day-to-day, but need to sync before closing).",
    },
    examTips: [
      "Write-Back needs a dirty bit. Write-Through doesn't. Remember this for exam questions.",
      "Standard pairings: Write-Back + Write-Allocate. Write-Through + Write-No-Allocate.",
      "Write-No-Allocate avoids cache pollution for write-once data patterns.",
    ],
    questions: [],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PYQ PROBLEMS (ESA STYLE)
  // ─────────────────────────────────────────────────────────────────────────────

  "pyq1": {
    title: "PYQ 1 — Direct Mapped: Tag/Line/Word + Miss Rate (ESA May 2023, Q3c, 8 Marks)", emoji: "🎓",
    tldr: "8-bit address, 4-byte blocks, 16 cache lines. Find TAG/Line/Word bits, then trace 11 accesses to compute miss rate.",
    explanation: `QUESTION: A system uses 8-bit addresses. The cache is organized in a direct-mapped manner. Each block holds 4 words (1 word = 1 byte). The cache has 16 lines.
(1) Identify the number of bits for TAG, Lines (Index), and Word (Offset).
(2) Compute the miss rate for the sequence: 106, 76, 107, 171, 106, 79, 107, 106, 170, 76, 107.

PART 1 — Bit Calculation:
Total address = 8 bits.
Block size = 4 bytes → Word/Offset = log₂(4) = 2 bits.
Cache lines = 16 → Line/Index = log₂(16) = 4 bits.
Tag = 8 − 4 − 2 = 2 bits.
Address format: [TAG(2) | LINE(4) | WORD(2)]

PART 2 — Miss Rate Trace:
For each address: Block number = address / block_size. Cache line = block_number mod 16. Tag = block_number / 16.

Step through: 106→block 26, line 10, tag 1 (MISS). 76→block 19, line 3, tag 1 (MISS). 107→block 26, line 10, tag 1 (HIT — same block as 106). 171→block 42, line 10, tag 2 (MISS — tag mismatch, evicts 106's block). 106→block 26, line 10, tag 1 (MISS — evicted). 79→block 19, line 3, tag 1 (HIT — 76's block still there). 107→block 26, line 10, tag 1 (HIT). 106→block 26, line 10, tag 1 (HIT). 170→block 42, line 10, tag 2 (MISS — evicts again). 76→block 19, line 3, tag 1 (HIT). 107→block 26, line 10, tag 1 (MISS — evicted by 170).

Hits = 5, Misses = 6. Miss Rate = 6/11 ≈ 54.5%.`,
    keyPoints: [
      "Step 1: Offset bits = log₂(block size). Index bits = log₂(cache lines). Tag = total - index - offset.",
      "Step 2: For each address, find block# = floor(address / block_size). Line = block# mod #lines. Tag = block# / #lines (or upper bits).",
      "Conflict at line 10: blocks 26 (tag=1) and 42 (tag=2) keep evicting each other → repeated misses.",
      "76's block (block 19) → line 3 — no conflict at this line, so those hits are preserved.",
      "Result: Hits=5, Misses=6, Miss Rate = 6/11 ≈ 54.5%.",
    ],
    formula: {
      code: `PART 1 — Bit fields:
  Total bits = 8
  Offset = log₂(4) = 2 bits   (4 bytes per block)
  Index  = log₂(16) = 4 bits  (16 cache lines)
  Tag    = 8 - 4 - 2 = 2 bits

  Address = [TAG(2) | INDEX(4) | OFFSET(2)]

PART 2 — Trace:
  Address │ Block# │ Line  │ Tag │ Result
  ────────┼────────┼───────┼─────┼───────────────────────────────
  106     │ 26     │ 10    │ 1   │ MISS (cold)
  76      │ 19     │ 3     │ 1   │ MISS (cold)
  107     │ 26     │ 10    │ 1   │ HIT  (same block as 106)
  171     │ 42     │ 10    │ 2   │ MISS (tag 2≠1, evicts block 26)
  106     │ 26     │ 10    │ 1   │ MISS (was evicted)
  79      │ 19     │ 3     │ 1   │ HIT  (block 19 still in line 3)
  107     │ 26     │ 10    │ 1   │ HIT  (block 26 back in line 10)
  106     │ 26     │ 10    │ 1   │ HIT  (still in line 10)
  170     │ 42     │ 10    │ 2   │ MISS (tag 2≠1, evicts again)
  76      │ 19     │ 3     │ 1   │ HIT  (block 19 untouched)
  107     │ 26     │ 10    │ 1   │ MISS (evicted by 170)
  ─────────────────────────────────────────────────────────
  Hits=5, Misses=6, Miss Rate = 6/11 ≈ 54.5%`,
      explanation: "Key insight: blocks 26 and 42 both map to line 10 (26 mod 16 = 10; 42 mod 16 = 10). Every time 171/170 is accessed, it evicts 107/106, and vice versa. This is a classic direct-mapping conflict miss scenario.",
    },
    examTips: [
      "Always compute block# = floor(address / block_size) FIRST, then line = block# mod lines.",
      "Tag is the upper bits — you can compute it as block# / #lines (integer division) or by taking upper tag bits of the address.",
      "Identify conflict pairs early (blocks that share a line) — they're responsible for most misses.",
    ],
    questions: [
      { q: "In this problem, what is the cache address format and why does miss rate reach 54.5%?", a: "Format: [TAG(2) | INDEX(4) | OFFSET(2)]. Miss rate is high (54.5%) because blocks 26 and 42 both map to line 10 (both have 10 as remainder when divided by 16). Every alternating access between addresses 106/107 (block 26) and 170/171 (block 42) causes a conflict miss — each evicts the other, even though the rest of the cache is mostly empty." },
    ],
  },

  "pyq2": {
    title: "PYQ 2 — 4-Way SA: Tag/Set/Word + Direct Mapped Storage (ESA May 2023 & 2024, Q3c/Q3a, 6 Marks)", emoji: "🎓",
    tldr: "4GB memory, 256KB 4-way SA cache, 8192B blocks. Find address 546888's block/set/tag. Then compute total direct-mapped cache storage.",
    explanation: `QUESTION: A computer system (word = 4 bytes) has 4GB byte-addressable main memory and a 256KB, 4-way set associative cache with block size 8192 bytes.
(i) Determine the block number of address (546888)₁₀, its set number, and tag bits.
(ii) Compute the total number of bits required for a direct-mapped version of this cache.

SOLUTION:

Main memory = 4GB = 2³² bytes → 32-bit address.
Block size = 8192 = 2¹³ bytes → Offset = 13 bits.
Cache = 256KB = 2¹⁸ bytes.
Total cache blocks = 2¹⁸ / 2¹³ = 2⁵ = 32 blocks.
Sets = 32 / 4 = 8 sets → Set Index = log₂(8) = 3 bits.
Tag = 32 − 3 − 13 = 16 bits.

PART (i): Address 546888
Block number = floor(546888 / 8192) = floor(66.77) = 66.
Set = 66 mod 8 = 2.
Tag = floor(66 / 8) = 8. (This is the upper portion of the block number.)

PART (ii): Direct Mapped storage
32 lines. Each line stores: tag(16) + valid(1) + data(8192 × 8 = 65536 bits).
Bits per line = 16 + 1 + 65536 = 65553 bits.
Total = 32 × 65553 = 2,097,696 bits.`,
    keyPoints: [
      "Block number = floor(address / block_size). Set = block# mod #sets. Tag = block# / #sets.",
      "For 4-way SA: sets = total_blocks / 4 = 32/4 = 8. Index bits = log₂(8) = 3.",
      "Tag bits = 32 − 3 − 13 = 16 bits.",
      "Direct-mapped total storage includes: tag bits + valid bit + data bits, multiplied by number of lines.",
      "Data bits per line = block_size_in_bytes × 8 (converting bytes to bits).",
    ],
    formula: {
      code: `Bit field calculation:
  Address = 32 bits (4GB = 2^32)
  Offset = 13 bits (block = 8192 = 2^13)
  Total cache blocks = 256KB / 8192B = 2^18 / 2^13 = 32
  Sets (4-way) = 32 / 4 = 8 → Index = 3 bits
  Tag = 32 - 13 - 3 = 16 bits

Part (i):
  Block# = 546888 / 8192 = 66 (floor)
  Set    = 66 mod 8 = 2
  Tag    = 66 / 8 = 8 (floor, i.e., 66 div 8)

Part (ii): Direct Mapped total storage:
  Lines = 32 (same as total blocks for DM)
  Per line = tag(16) + valid(1) + data(8192 × 8) = 65553 bits
  Total = 32 × 65553 = 2,097,696 bits`,
      explanation: "The data portion dominates: 8192 bytes × 8 bits/byte = 65536 bits per line. The tag and valid bit overhead (17 bits) is tiny in comparison. This shows why cache is so expensive in terms of storage — each line needs the full data block.",
    },
    examTips: [
      "Always verify: total_blocks × block_size = cache_size (sanity check).",
      "For the total storage question, data = block_size_in_bytes × 8. Don't forget to convert to bits.",
      "Tag here uses the block number directly. Tag = block# / #sets = upper bits of block number.",
    ],
    questions: [],
  },

  "pyq3": {
    title: "PYQ 3 — Block-Set Associative: Address Bits (ESA July 2023, Q3a, 6 Marks)", emoji: "🎓",
    tldr: "64 cache blocks in 4-block sets. Main memory has 4096 blocks of 128 words each. Find total address bits, TAG, SET, and WORD fields.",
    explanation: `QUESTION: A block-set-associative cache consists of a total of 64 blocks divided into 4-block sets. The main memory contains 4096 blocks, each consisting of 128 words.
(a) How many bits are there in a main memory address?
(b) How many bits are in each of the TAG, SET, and WORD fields?

NOTE: "Block-set associative" is the same as "set-associative." 4-block sets means 4-way (W=4).

SOLUTION:

Total words in main memory = number of blocks × words per block = 4096 × 128 = 524,288 = 2¹⁹ words.
Since each address points to one word, the address has 19 bits.

Bit fields:
Word offset = log₂(128) = 7 bits (selects word within a block).
Number of sets in cache = 64 blocks / 4 blocks per set = 16 sets → Set Index = log₂(16) = 4 bits.
Tag = 19 − 4 − 7 = 8 bits.`,
    keyPoints: [
      "Total addressable locations = total_blocks × words_per_block = 4096 × 128 = 2¹⁹ → 19-bit address.",
      "Word offset = log₂(words_per_block) = log₂(128) = 7 bits.",
      "Number of sets in cache = 64 blocks / 4 (ways) = 16 sets → Set index = 4 bits.",
      "Tag = 19 − 7 − 4 = 8 bits.",
      "'Block-set associative' = 'set-associative'. '4-block sets' = '4-way' (4 lines per set).",
    ],
    formula: {
      code: `Address bit calculation:
  Total words = 4096 blocks × 128 words/block = 524,288 = 2^19
  → Address = 19 bits

  WORD offset = log₂(128) = 7 bits
  Sets = 64 cache blocks / 4 ways = 16 → SET index = log₂(16) = 4 bits
  TAG = 19 - 7 - 4 = 8 bits

  Address format: [ TAG(8) | SET(4) | WORD(7) ]
  Verify: 8 + 4 + 7 = 19 ✓`,
      explanation: "When the problem says 'main memory contains 4096 blocks of 128 words', compute total words FIRST to get address bits. Total addressable space = 4096 × 128 = 2^19 words → 19-bit address.",
    },
    examTips: [
      "If memory is described as 'X blocks of Y words', total words = X × Y. Take log₂ for address size.",
      "'Block-set associative with W-block sets' = W-way set associative. Don't be confused by the terminology.",
      "Work from right to left: Word offset first, then set index, then tag = remainder.",
    ],
    questions: [],
  },

  "pyq4": {
    title: "PYQ 4 — AMAT with CPI: Speedup from Perfect Cache (ESA July 2023, Q3c, 6 Marks)", emoji: "🎓",
    tldr: "CPI=1.0, 50% data accesses, miss penalty=25 cycles, miss rate=2%. How much faster with a perfect (zero-miss) cache?",
    explanation: `QUESTION: Assume CPI = 1.0 when all memory accesses hit in cache. The only data accesses are loads and stores, totalling 50% of instructions. Miss penalty = 25 clock cycles. Miss rate = 2%. How much faster would the computer be if all instructions were cache hits?

SOLUTION:

Perfect cache CPU time = IC × 1.0 × Clock cycle (no stalls).

Real cache memory stalls: memory accesses per instruction = 1 (instruction fetch) + 0.5 (data load/store) = 1.5 total memory accesses per instruction.

Memory stall cycles per instruction = 1.5 × 0.02 × 25 = 0.75 cycles/instruction.

Actual CPI = 1.0 (base) + 0.75 (stall) = 1.75.

Speedup of perfect cache over real cache = 1.75 / 1.0 = 1.75×.

The computer with a perfect cache would be 1.75× faster.`,
    keyPoints: [
      "Memory accesses/instruction = 1 (instruction fetch) + 0.5 (50% data access) = 1.5.",
      "Memory stall CPI = 1.5 × 0.02 (miss rate) × 25 (penalty) = 0.75 cycles/instr.",
      "Actual CPI = base CPI + stall CPI = 1.0 + 0.75 = 1.75.",
      "Speedup = Actual_CPI / Perfect_CPI = 1.75 / 1.0 = 1.75×.",
      "Even with a small 2% miss rate, performance degrades by 75% — the miss penalty multiplier is key.",
    ],
    formula: {
      code: `Perfect cache CPI:
  CPI_perfect = 1.0 (given — no stalls)

Real cache stall:
  Memory accesses/instr = 1 (I-fetch) + 0.5 (50% data) = 1.5
  Stall CPI = 1.5 × 0.02 × 25 = 0.75 cycles/instr

Real CPI:
  CPI_real = 1.0 + 0.75 = 1.75

Speedup:
  Speedup = CPI_real / CPI_perfect = 1.75 / 1.0 = 1.75×

Answer: The computer would be 1.75× faster with a perfect cache.`,
      explanation: "The 2% miss rate sounds small, but 0.02 × 25 = 0.5 extra cycles per memory access. With 1.5 memory accesses per instruction, that's 0.75 extra cycles per instruction — 75% slowdown over ideal. This is why cache miss rate is so critical.",
    },
    examTips: [
      "When memory accesses per instruction is not stated, count: 1 (instruction fetch) + data_fraction.",
      "Speedup = old_CPI / new_CPI (where old = real, new = perfect).",
      "For 50% data accesses: accesses/instr = 1 + 0.5 = 1.5. For 36%: = 1 + 0.36 = 1.36.",
    ],
    questions: [],
  },

  "pyq5": {
    title: "PYQ 5 — 2-Way SA FIFO: Hit/Miss Trace (ESA July 2023 & May 2023, Q3c, 6 Marks)", emoji: "🎓",
    tldr: "2-way SA, 8 cache blocks, FIFO. Trace 17 accesses. Find final cache state, hit ratio, and miss ratio.",
    explanation: `QUESTION: Consider a 2-way set associative cache with 8 cache blocks (numbered 0–7) and the following sequence: 4, 3, 25, 8, 19, 6, 25, 8, 16, 35, 45, 22, 8, 3, 16, 25, 7. FIFO replacement. Find final cache state, hit ratio, and miss ratio.

SOLUTION:

8 cache blocks, 2-way → 4 sets. Set = Block# mod 4.

Set assignments: Set 0: {4,8,16,...}. Set 1: {25,45,...}. Set 2: {6,22,...}. Set 3: {3,7,19,35,...}.

Trace (FIFO, evict oldest in set when full):
4→MISS, 3→MISS, 25→MISS, 8→MISS, 19→MISS, 6→MISS, 25→HIT, 8→HIT, 16→MISS(set 0 full, evict 4 FIFO), 35→MISS(set 3 full, evict 3 FIFO), 45→MISS(set 1 full, evict 25 FIFO), 22→MISS(set 2 full, evict 6 FIFO), 8→HIT, 3→MISS(set 3: evict 19), 16→HIT, 25→HIT, 7→MISS(set 3: evict 35).

Hits=5, Misses=12. Hit ratio=5/17≈29.4%. Miss ratio=12/17≈70.6%.

Final cache state: Set0={16,8}, Set1={45,25}, Set2={22}, Set3={3,7}.`,
    keyPoints: [
      "8 blocks / 2 ways = 4 sets. Set = block# mod 4.",
      "FIFO: within each set, track load order. Evict the block that entered the set earliest.",
      "Hits: access 7 (block 25 is still in set 1), access 8 (block 8 in set 0), access 13 (block 8), access 15 (block 16 in set 0), access 16 (block 25 back in set 1).",
      "Result: Hits=5, Misses=12. Hit ratio = 5/17 ≈ 29.4%. Miss ratio = 12/17 ≈ 70.6%.",
    ],
    formula: {
      code: `Set mapping (mod 4):
  Block→Set: 4→S0, 3→S3, 25→S1, 8→S0, 19→S3, 6→S2,
             16→S0, 35→S3, 45→S1, 22→S2, 7→S3

Trace (2-way FIFO, 4 sets):
  #   Block  Set  Set state after           Result
  ──  ─────  ───  ─────────────────────     ──────
  1   4      S0   {4}                       MISS
  2   3      S3   {3}                       MISS
  3   25     S1   {25}                      MISS
  4   8      S0   {4,8}                     MISS
  5   19     S3   {3,19}                    MISS
  6   6      S2   {6}                       MISS
  7   25     S1   25 present → HIT          HIT ✓
  8   8      S0   8 present → HIT           HIT ✓
  9   16     S0   full{4,8}; FIFO evict 4   MISS → {16,8}
  10  35     S3   full{3,19}; FIFO evict 3  MISS → {35,19}
  11  45     S1   full{25}; load 45         MISS → {25,45} (only 1 was present)
             (wait — set 1 had only 25, so 45 fits as way 2 → {25,45})
  12  22     S2   full{6}; load 22 → {6,22} MISS
  13  8      S0   8 in {16,8} → HIT         HIT ✓
  14  3      S3   {35,19}: FIFO evict 35? wait, 35 loaded at step 10, 19 at step 5
             19 is older → evict 19: {35,3} MISS
  15  16     S0   {16,8}: 16 present → HIT  HIT ✓
  16  25     S1   {25,45}: 25 present → HIT HIT ✓
  17  7      S3   {35,3}: both full; evict 35 (loaded step 10 > 3 loaded step 14)
             Wait: 3 loaded at step 14, 35 loaded at step 10. 35 is older → evict 35.
             {3,7}                          MISS

  Hits=5, Misses=12. Hit ratio=5/17≈29.4%, Miss ratio=12/17≈70.6%`,
      explanation: "In FIFO, track WHEN each block was loaded into its set. The block with the earliest load time gets evicted when the set is full and a new block must enter.",
    },
    examTips: [
      "FIFO evicts by LOAD ORDER (oldest loaded), not access order. Keep a timestamp per way per set.",
      "Verify final state: Set0={16,8}, Set1={45,25}, Set2={22,6→{6,22}}, Set3={3,7}.",
    ],
    questions: [],
  },

  "pyq6": {
    title: "PYQ 6 — Multi-Level Cache AMAT (ESA May 2023 & 2024, Q4c/Q3c, 8 Marks)", emoji: "🎓",
    tldr: "P1 vs P2 comparison. Then add L2 to P1. Demonstrates that a bad L2 can WORSEN AMAT compared to no L2.",
    explanation: `QUESTION: Main memory = 70 ns. P1: 8KB L1, miss rate 4.3%, hit time 0.96 ns. P2: 16KB L1, miss rate 3.4%, hit time 1.08 ns.
(a) Which processor has better AMAT?
(b) Add L2 to P1: Option (a) 512KB L2, local miss rate 98%, hit time 3.22 ns. Option (b) 4MB L2, local miss rate 73%, hit time 11.48 ns. Evaluate each.

SOLUTION:

P1 AMAT = 0.96 + 0.043 × 70 = 0.96 + 3.01 = 3.97 ns.
P2 AMAT = 1.08 + 0.034 × 70 = 1.08 + 2.38 = 3.46 ns.
P2 is better (3.46 < 3.97).

P1 + L2(a): AMAT = 0.96 + 0.043 × (3.22 + 0.98 × 70) = 0.96 + 0.043 × (3.22 + 68.6) = 0.96 + 0.043 × 71.82 = 0.96 + 3.09 = 4.05 ns. WORSE than P1 alone (3.97 ns)!

P1 + L2(b): AMAT = 0.96 + 0.043 × (11.48 + 0.73 × 70) = 0.96 + 0.043 × (11.48 + 51.1) = 0.96 + 0.043 × 62.58 = 0.96 + 2.69 = 3.65 ns. Better than P1 alone, but still worse than P2 alone.

KEY INSIGHT: L2(a) with 98% local miss rate makes things WORSE because the L2 hit time (3.22 ns) is always paid on every L1 miss, but L2 only helps 2% of the time. A bad L2 is worse than no L2.`,
    keyPoints: [
      "P1 AMAT = 3.97 ns. P2 AMAT = 3.46 ns. P2 wins (larger L1, lower miss rate).",
      "P1 + L2(a) with 98% miss rate: AMAT = 4.05 ns — WORSE than P1 alone (3.97 ns)!",
      "P1 + L2(b) with 73% miss rate: AMAT = 3.65 ns — better than P1 alone, still worse than P2.",
      "Critical lesson: A poorly sized L2 cache can actually INCREASE AMAT. L2 must be large enough to have a meaningfully low miss rate.",
      "Use GLOBAL miss rate for performance analysis: L2 global MR = L1_MR × L2_local_MR.",
    ],
    formula: {
      code: `Single level AMAT:
  P1: AMAT = 0.96 + 0.043 × 70 = 3.97 ns
  P2: AMAT = 1.08 + 0.034 × 70 = 3.46 ns → P2 is BETTER

Two-level AMAT formula:
  AMAT = HT_L1 + MR_L1 × (HT_L2 + MR_L2_local × MP_main)

P1 + L2(a): 512KB, miss_rate=98%, HT=3.22ns
  AMAT = 0.96 + 0.043 × (3.22 + 0.98 × 70)
       = 0.96 + 0.043 × 71.82 = 4.05 ns  ← WORSE than P1 alone!

P1 + L2(b): 4MB, miss_rate=73%, HT=11.48ns
  AMAT = 0.96 + 0.043 × (11.48 + 0.73 × 70)
       = 0.96 + 0.043 × 62.58 = 3.65 ns  ← Better than P1 alone ✓

Summary:
  P1 alone:    3.97 ns
  P1 + L2(a): 4.05 ns  ← BAD (too small L2, 98% miss rate)
  P1 + L2(b): 3.65 ns  ← Good (large L2, 73% miss rate)
  P2 alone:    3.46 ns  ← BEST in this comparison`,
      explanation: "This is a classic exam trap. L2(a) with 98% miss rate means: every L1 miss pays 3.22 ns for L2 hit time, and 98% of those still have to go to main memory anyway. The L2 adds cost without adding much benefit. L2(b)'s larger size brings 73% absorption — much better.",
    },
    examTips: [
      "Always compute the two-level AMAT and COMPARE to single-level. Don't assume L2 always helps.",
      "If L2 local miss rate is very high (e.g., 98%), the L2 is too small — L2 hit time adds overhead.",
      "This problem type (compare processors, add L2) is a PYQ favourite.",
    ],
    questions: [
      { q: "Why does adding L2(a) make P1's AMAT worse in this problem?", a: "L2(a) has a 98% local miss rate, meaning 98% of the time it goes all the way to main memory anyway. On every L1 miss, the processor always pays L2's hit time (3.22 ns). But since L2 only actually helps 2% of the time (local hit rate = 2%), this overhead exceeds the benefit. AMAT increases from 3.97 to 4.05 ns. The lesson: L2 must be large enough to have a meaningfully low miss rate to be beneficial." },
    ],
  },

  "pyq7": {
    title: "PYQ 7 — Miss Penalty with Interleaved Memory (ESA July 2023 UE20CS252, Q4d, 6 Marks)", emoji: "🎓",
    tldr: "100-cycle overhead, 16 bytes delivered every 2 cycles. Calculate AMAT for two cache configurations using the interleaved miss penalty formula.",
    explanation: `QUESTION: Memory system: 100 clock cycle overhead, then delivers 16 bytes every 2 clock cycles (so 16B in 102 CC, 32B in 104 CC, etc.). Hit time = 1 CC.
(i) Cache 4K, block size 16 bytes, miss rate 8.57%.
(ii) Cache 256K, block size 64 bytes, miss rate 0.51%.

SOLUTION:

The memory delivers 16 bytes every 2 cycles — this means the effective transfer rate is 16B per 2 CC.

Miss Penalty formula: 100 (overhead) + (block_size / 16) × 2

(i) Block size = 16 bytes:
Miss penalty = 100 + (16/16) × 2 = 100 + 2 = 102 CC.
AMAT = 1 + 0.0857 × 102 = 1 + 8.74 = 9.74 CC.

(ii) Block size = 64 bytes:
Miss penalty = 100 + (64/16) × 2 = 100 + 8 = 108 CC.
AMAT = 1 + 0.0051 × 108 = 1 + 0.55 = 1.55 CC.

256K/64B has far better AMAT (1.55 vs 9.74) despite a slightly higher miss penalty, because the miss rate is dramatically lower (0.51% vs 8.57%).`,
    keyPoints: [
      "Miss penalty = overhead + (block_size / bytes_per_transfer) × cycles_per_transfer",
      "For this problem: Miss Penalty = 100 + (block_size / 16) × 2",
      "Case (i): Miss penalty = 102 CC. AMAT = 1 + 0.0857 × 102 = 9.74 CC.",
      "Case (ii): Miss penalty = 108 CC. AMAT = 1 + 0.0051 × 108 = 1.55 CC.",
      "256K cache wins overwhelmingly: 1.55 vs 9.74 CC. Lower miss rate dominates.",
    ],
    formula: {
      code: `Miss Penalty (interleaved transfer):
  Formula: overhead + (block_bytes / transfer_bytes) × cycles_per_transfer
  
  Here: 100 CC overhead, 16 bytes/transfer, 2 CC/transfer

(i) 4K cache, 16B block:
  Miss Penalty = 100 + (16/16) × 2 = 100 + 2 = 102 CC
  AMAT = 1 + 0.0857 × 102 = 1 + 8.74 = 9.74 CC

(ii) 256K cache, 64B block:
  Miss Penalty = 100 + (64/16) × 2 = 100 + 8 = 108 CC
  AMAT = 1 + 0.0051 × 108 = 1 + 0.55 = 1.55 CC

Comparison:
  Case (i): AMAT = 9.74 CC (terrible — high miss rate dominates)
  Case (ii): AMAT = 1.55 CC (excellent — very low miss rate)`,
      explanation: "Case (i) has a lower miss penalty (102 vs 108) but much higher miss rate (8.57% vs 0.51%). The miss rate × penalty product is what matters: (i) = 8.74 cycles; (ii) = 0.55 cycles. Miss rate is by far the dominant factor here.",
    },
    examTips: [
      "When memory delivers X bytes every Y cycles: miss penalty = overhead + (block_size/X) × Y.",
      "Always check: miss_rate × penalty. A slightly higher miss penalty with a much lower miss rate almost always wins.",
    ],
    questions: [],
  },

  "pyq8": {
    title: "PYQ 8 — Fully Associative Tag Bits (ESA Jan-May 2024 UE18CS253, Q3a, 5 Marks)", emoji: "🎓",
    tldr: "Fully associative cache, 16KB cache, 256B blocks, 128KB main memory. Find number of tag bits.",
    explanation: `QUESTION: Consider a fully associative mapped cache of size 16 KB with block size 256 bytes. The size of main memory is 128 KB. Find the number of tag bits.

SOLUTION:

Main memory = 128 KB = 2¹⁷ bytes → Physical address = 17 bits.
Block offset = log₂(256) = 8 bits.
Fully associative → no index bits.
Tag bits = 17 − 8 = 9 bits.

That's it — for fully associative, tag = address bits − offset bits. There is no index field.`,
    keyPoints: [
      "Main memory = 128KB = 2¹⁷ → 17-bit address.",
      "Block offset = log₂(256) = 8 bits.",
      "Fully associative: NO index field.",
      "Tag = 17 − 8 = 9 bits.",
      "Cache size (16KB) does not affect the address bit calculation for fully associative — the tag spans the entire block number.",
    ],
    formula: {
      code: `Fully Associative Tag Bits:
  Main memory = 128KB = 2^17 bytes → 17-bit address
  Block offset = log₂(256 bytes) = 8 bits
  Fully Associative: no index bits
  Tag = 17 - 8 = 9 bits

  Cache size = 16KB = 2^14 / 256 = 2^6 = 64 cache lines
  (64 lines, but tag is same 9 bits regardless of cache size)
  
  Number of blocks in main memory = 128K/256 = 512 = 2^9
  Each block needs a 9-bit tag to distinguish it ✓`,
      explanation: "For fully associative: tag = PA bits − offset. The cache size only affects how many lines exist (how many different blocks can be held simultaneously), but it doesn't change the tag width. The tag must distinguish among all possible main memory blocks.",
    },
    examTips: [
      "Fully associative: Tag = address_bits − offset_bits. No index to subtract.",
      "Main memory size → address bits. Block size → offset bits. Tag = address − offset.",
    ],
    questions: [],
  },

  "pyq9": {
    title: "PYQ 9 — Split vs Unified Cache Comparison (ESA May 2023 UE21CS251B, Q3b style, 6 Marks)", emoji: "🎓",
    tldr: "Split cache: I-miss=2%, D-miss=10%, 35% data access. Unified: miss=3%. Same 9-cycle penalty. Which is better?",
    explanation: `QUESTION: Compare memory stall time for:
Version 1 (Split cache): I-cache miss rate = 2%, D-cache miss rate = 10%, 35% instructions access data, miss penalty = 9 CC.
Version 2 (Unified cache): miss rate = 3%, miss penalty = 9 CC.

SOLUTION:

V1 (Split cache): compute I-stall and D-stall separately.
I-cache stall = 1 × 0.02 × 9 = 0.18 CC/instruction.
D-cache stall = 0.35 × 0.10 × 9 = 0.315 CC/instruction.
Total stall V1 = 0.18 + 0.315 = 0.495 CC/instruction.

V2 (Unified cache): total memory accesses per instruction = 1 (I-fetch) + 0.35 (data) = 1.35.
Total stall V2 = 1.35 × 0.03 × 9 = 0.3645 CC/instruction.

V2 (unified) is better: 0.3645 < 0.495 CC/instr. Unified is 0.495/0.3645 = 1.36× better.`,
    keyPoints: [
      "Split cache stall = I-cache_stall + D-cache_stall (compute separately and add).",
      "I-cache stall = 1 × I-miss_rate × penalty (every instruction is fetched).",
      "D-cache stall = data_fraction × D-miss_rate × penalty.",
      "Unified cache stall = (1 + data_fraction) × miss_rate × penalty.",
      "V1 stall = 0.495 CC/instr. V2 stall = 0.3645 CC/instr. Unified (V2) wins by 1.36×.",
      "Key: even though unified miss rate (3%) is higher than I-cache (2%), the D-cache in split has 10% miss rate — that's the killer.",
    ],
    formula: {
      code: `V1 (Split Cache):
  I-cache stall = 1 × 0.02 × 9 = 0.18 CC/instr
  D-cache stall = 0.35 × 0.10 × 9 = 0.315 CC/instr
  Total stall V1 = 0.18 + 0.315 = 0.495 CC/instr

V2 (Unified Cache):
  Accesses/instr = 1 (I) + 0.35 (D) = 1.35
  Total stall V2 = 1.35 × 0.03 × 9 = 0.3645 CC/instr

Comparison:
  V2 is better: 0.3645 < 0.495
  Speedup = 0.495 / 0.3645 = 1.36×
  → Unified cache is 1.36× less stall time`,
      explanation: "The split cache has a D-cache miss rate of 10%, which is much worse than the unified 3%. Even though the unified cache's slightly higher miss rate handles both I and D references, the combined effect is still better than the split cache's high D-cache miss rate.",
    },
    examTips: [
      "Unified formula: (1 + data_fraction) × miss_rate × penalty. The '1' represents instruction fetches.",
      "Split formula: I-stall + D-stall. I-stall uses fraction = 1 (all instructions are fetched).",
      "This is a PYQ favourite — know both formulas cold.",
    ],
    questions: [],
  },

  "pyq10": {
    title: "PYQ 10 — TLB and Cache Bit Calculations (ESA 2024, Q3b, 6 Marks)", emoji: "🎓",
    tldr: "64-bit LA, 256GB PA, 32KB pages, 2-way TLB 512 entries. Find tag bits for L1, L2, and TLB. Also compute TLB total size.",
    explanation: `QUESTION: System: 64-bit logical address, 256GB physical address, page size = 32KB. TLB: 2-way with 512 entries total. Find:
(i) L1 cache tag bits (64KB, block size = 256 words).
(ii) L2 cache tag bits (128MB, block size = 256 words).
(iii) TLB bits (index + tag). Also compute total TLB size.

SOLUTION:

Physical address size = log₂(256GB) = log₂(2³⁸) = 38 bits.
Page size = 32KB = 2¹⁵ → Page offset = 15 bits.
VPN = 64 − 15 = 49 bits. PPN = 38 − 15 = 23 bits.

Block size = 256 words × 4 bytes/word = 1024 bytes = 2¹⁰ → Block offset = 10 bits.

(i) L1 cache (64KB, direct-mapped):
Total blocks = 2¹⁶ / 2¹⁰ = 2⁶ = 64 → Index = 6 bits.
Tag = 38 − 6 − 10 = 22 bits.

(ii) L2 cache (128MB, direct-mapped):
Total blocks = 2²⁷ / 2¹⁰ = 2¹⁷ → Index = 17 bits.
Tag = 38 − 17 − 10 = 11 bits.

(iii) TLB (2-way, 512 entries):
Sets = 512 / 2 = 256 = 2⁸ → TLB Index = 8 bits.
TLB Tag = VPN − Index = 49 − 8 = 41 bits.
TLB entry size = valid(1) + tag(41) + PPN(23) = 65 bits/entry.
Total TLB size = 512 entries × 65 bits = 33,280 bits.`,
    keyPoints: [
      "Physical address = log₂(256GB) = 38 bits. Page offset = log₂(32KB) = 15 bits.",
      "Block size = 256 words × 4 bytes = 1024 = 2¹⁰ → offset = 10 bits.",
      "L1 (64KB DM): index = 6, tag = 38−6−10 = 22 bits.",
      "L2 (128MB DM): index = 17, tag = 38−17−10 = 11 bits.",
      "TLB (2-way, 512 entries): sets = 256, index = 8, tag = 49−8 = 41 bits.",
      "TLB entry = valid(1) + tag(41) + PPN(23) = 65 bits. Total TLB = 512 × 65 = 33,280 bits.",
    ],
    formula: {
      code: `System parameters:
  PA = log₂(256GB) = log₂(2^38) = 38 bits
  Page offset = log₂(32KB) = log₂(2^15) = 15 bits
  VPN = 64 - 15 = 49 bits
  PPN = 38 - 15 = 23 bits
  Block offset = log₂(256 words × 4 bytes) = log₂(1024) = 10 bits

(i) L1 Cache (64KB, Direct Mapped):
  Total blocks = 2^16 / 2^10 = 2^6 = 64 → Index = 6 bits
  Tag = 38 - 6 - 10 = 22 bits

(ii) L2 Cache (128MB, Direct Mapped):
  Total blocks = 2^27 / 2^10 = 2^17 → Index = 17 bits
  Tag = 38 - 17 - 10 = 11 bits

(iii) TLB (2-way, 512 entries):
  Sets = 512 / 2 = 256 = 2^8 → Index = 8 bits
  Tag = VPN - Index = 49 - 8 = 41 bits
  Entry = valid(1) + tag(41) + PPN(23) = 65 bits
  Total TLB storage = 512 × 65 = 33,280 bits`,
      explanation: "Note the key conversion: '256 words' → must convert to bytes first (256 × 4 = 1024 bytes). Also note 256GB = 2³⁸, not 2³²! 1GB = 2³⁰, so 256GB = 2⁸ × 2³⁰ = 2³⁸.",
    },
    examTips: [
      "When block size is in words, always convert to bytes: block_bytes = words × bytes_per_word.",
      "256GB = 2^38 bytes (since 1GB = 2^30, 256 = 2^8, so 256×1GB = 2^38). Don't confuse with 2^32.",
      "TLB entry size = valid + tag + PPN. Total TLB = entries × entry_size.",
    ],
    questions: [],
  },

  "pyq11": {
    title: "PYQ 11 — Write Buffer RAW Hazard (ESA May 2023, Q4a, 6 Marks)", emoji: "🎓",
    tldr: "STR R3 to 256, then LDR from 2048 (same cache line), then LDR from 256. Without write buffer check: R2 ≠ R3. This is a RAW data hazard.",
    explanation: `QUESTION: Consider the code sequence. Direct-mapped write-through cache. Addresses 256 and 2048 map to the same cache block. A 4-word write buffer is NOT checked on a read miss.

STR R3, 256(R0)   ; Store R3 to address 256
LDR R1, 2048(R0)  ; Load R1 from address 2048
LDR R2, 256(R0)   ; Load R2 from address 256

Will R2 always equal R3? Discuss.

ANSWER: No, R2 will NOT always equal R3. This is a Read-After-Write (RAW) data hazard.

Step-by-step:
1. STR R3, 256: Writes R3's value to the write buffer (write-through: will go to cache AND memory, but takes time via buffer). Write buffer = [256: R3's value].
2. LDR R1, 2048: 2048 maps to SAME cache line as 256 → cache MISS. Loading 2048's block evicts the cached version of address 256.
3. LDR R2, 256: Now 256 is not in cache (evicted). Another MISS → fetches from main memory. BUT if the write buffer hasn't finished draining, main memory still has the OLD value of 256. R2 gets the old (stale) value.
Result: R2 = old value ≠ R3.

FIX: Before servicing any read miss from main memory, check the write buffer. If the requested address is in the buffer, use the buffered value. Otherwise, proceed to memory.`,
    keyPoints: [
      "STR writes to write buffer (not immediately to memory). Memory still has old value.",
      "LDR 2048 causes a miss — loads 2048's block, evicting the cached copy of 256.",
      "LDR 256 causes another miss — fetches from main memory — gets OLD value if write buffer not yet drained.",
      "R2 gets stale value → R2 ≠ R3 → data corruption. This is a RAW hazard.",
      "Fix: check write buffer on every read miss. If address found in buffer, use buffer value.",
    ],
    formula: {
      code: `Code Sequence:
  STR R3, 256(R0)   // R3 = 7 (for example)
  LDR R1, 2048(R0)  // 2048 maps to same line as 256
  LDR R2, 256(R0)   // Read from 256

Without write buffer check:
  Step 1: STR R3=7, addr=256 → write buffer = [256:7]
          Main memory: mem[256] = 0 (old, not yet updated)
  Step 2: LDR R1, 2048 → MISS (same cache line as 256)
          Evicts cached block containing 256
          Loads block for 2048 from memory
  Step 3: LDR R2, 256 → MISS (256 was evicted)
          Fetches from main memory: mem[256] = 0 (stale!)
          R2 = 0

  But R3 = 7, so R2 (0) ≠ R3 (7) → INCORRECT!

With write buffer check:
  Step 3: LDR R2, 256 → MISS → CHECK write buffer
          Write buffer has [256:7] → use this value
          R2 = 7

  R2 = R3 = 7 → CORRECT ✓`,
      explanation: "The key insight: write-through caches send writes to a buffer first, and the buffer drains to memory asynchronously. If you read the same address before the buffer drains, you can get the old value from memory. This is a classic RAW (Read-After-Write) hazard.",
    },
    examTips: [
      "Direct-mapped: addresses 256 and 2048 that map to the same line means 2048 mod #lines = 256 mod #lines.",
      "Write buffer RAW hazard always involves: STR (store) followed by LDR (load) to same address (possibly after an eviction step).",
      "Fix = check write buffer on read misses. This question tests whether you understand WHY this check is mandatory.",
    ],
    questions: [
      { q: "In this RAW hazard scenario, why does LDR R2, 256 get the stale value even though STR R3, 256 happened before it?", a: "Because write-through uses a write buffer for performance. STR writes R3 to the write buffer, not immediately to main memory. LDR 2048 misses, evicting the cache block that contained 256. LDR 256 then also misses and fetches from main memory — but the write buffer hasn't drained yet, so memory still has the old value. Without checking the write buffer, R2 gets the stale value. Solution: always check write buffer on read misses." },
    ],
  },

  "pyq12": {
    title: "PYQ 12 — Identify Miss Types (ESA July 2023 UE20CS252, Q3d, 4 Marks)", emoji: "🎓",
    tldr: "Identify each of four described miss scenarios as Compulsory, Capacity, Conflict, or Coherence.",
    explanation: `QUESTION: Identify the type of cache miss:
(i) The cache cannot contain all the blocks needed during execution.
(ii) Misses due to flushes to keep multiple caches in sync in a multiprocessor system.
(iii) The very first access to a block cannot be in the cache.
(iv) A block may be discarded and later retrieved if too many blocks map to its set.

ANSWERS:
(i) Capacity miss — The cache is simply too small to hold the entire working set. These occur even in a fully-associative cache.
(ii) Coherence miss (4th C) — In multiprocessor systems, caches must be kept consistent. When one processor modifies data, other processors' caches may be invalidated (flushed), causing misses when they access that data again.
(iii) Compulsory miss (Cold-start miss) — The very first access to any block is always a miss because the block has never been loaded. Would occur even in an infinitely large cache.
(iv) Conflict miss (Collision miss) — Too many blocks compete for the same cache set or line in a direct-mapped or set-associative cache. Would be a hit in a fully-associative cache of the same size.`,
    keyPoints: [
      "(i) Cache cannot hold all needed blocks → CAPACITY MISS",
      "(ii) Multiprocessor cache flush/invalidation → COHERENCE MISS (4th C)",
      "(iii) Very first access to a block → COMPULSORY MISS (cold-start)",
      "(iv) Too many blocks map to same set → CONFLICT MISS (collision)",
    ],
    formula: {
      code: `Miss Type Identification:
  Scenario                              │ Type
  ──────────────────────────────────────┼──────────────────────────
  First ever access to a block          │ Compulsory (cold-start)
  Cache too small for working set       │ Capacity
  Too many blocks compete for same set  │ Conflict (collision)
  Multiprocessor cache flush/invalidate │ Coherence (4th C)

  Quick rules:
  • Would it miss in an INFINITE cache?    → Compulsory
  • Would it miss in a FULLY-ASSOC cache   → Capacity
    of the same size?
  • Would it HIT in a FA cache same size?  → Conflict
  • Only in MULTIPROCESSOR systems?        → Coherence`,
      explanation: "These four descriptions directly map to the Four C's. The key is matching the physical description to the underlying cause. 'Cannot contain all needed blocks' = too small = Capacity. 'Too many map to same set' = conflicts in placement = Conflict.",
    },
    examTips: [
      "This is a definition/recognition question — memorize the four descriptions and their miss types.",
      "Coherence is ONLY in multiprocessor systems. Single-processor = only 3 C's.",
      "Conflict: 'discarded and retrieved' is the clue — evicted due to mapping constraints, not size.",
    ],
    questions: [],
  },

};