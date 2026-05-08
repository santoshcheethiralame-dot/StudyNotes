
export const groups = [
  { name: "⚡ Intro to Parallel Computing", ids: ["seq-computing", "parallel-computing", "parallel-compiler", "requirements", "parallel-hw", "why-parallel", "applications", "hpc", "flops", "perf-growth"] },
  { name: "🧠 Memory Architecture & Flynn", ids: ["memory-arch", "gpu-arch-overview", "parallel-langs", "flynns-taxonomy", "sisd", "simd", "mimd", "misd", "systolic-arrays", "simd-array-proc"] },
  { name: "🔧 Concepts, Terminology & ILP", ids: ["terminology", "computing-models", "design-issues", "auto-parallel", "smt-threads", "smt-multicore", "ilp-scalar", "ilp-pipeline", "ilp-superscalar", "ilp-superpipeline", "ilp-vliw"] },
  { name: "📐 Amdahl's & Gustafson's Law", ids: ["amdahls-law", "amdahls-examples", "amdahls-limits", "gustafsons-law", "gustafsons-examples", "amdahl-vs-gustafson"] },
  { name: "🖥️ Multicore Processors", ids: ["three-walls", "multicore-resource", "homogeneous-mc", "heterogeneous-mc", "arm-heterogeneous", "multicore-os", "false-sharing"] },
  { name: "💻 OpenMP Programming", ids: ["openmp-intro", "openmp-setup", "openmp-hello", "openmp-matrix", "openmp-shared", "openmp-single"] },
  { name: "🔀 Heterogeneous Computing (CPU+GPU)", ids: ["het-evolution", "het-two-approaches", "cpu-vs-gpu-design", "het-analogy", "gpu-architecture-detail", "why-gpu-parallelism", "speedup-het", "challenges-parallel"] },
  { name: "🎮 GPU Computing Deep Dive", ids: ["multicore-limits", "gpu-origins", "gpu-speed-throughput", "gpu-two-components", "fermi-sm", "kepler-vs-fermi", "three-ways-accelerate", "gpu-libraries", "openacc", "cpu-strengths", "gpu-strengths", "accelerator-node", "cuda-unified", "final-summary"] },
  { name: "📝 Quick Reference", ids: ["formula-sheet", "flynns-summary", "mem-arch-summary", "ilp-summary", "openmp-directives", "cpu-gpu-summary"] },
];

export const topics = {
  "seq-computing": {
    title: "Sequential Computing", emoji: "🐌",
    tldr: "One CPU, one instruction at a time. Problem → series of instructions → single processor executes them in order.",
    explanation: `Traditional software is written for serial (sequential) computation. It runs on a single computer with a single CPU. The problem is broken into a discrete series of instructions that execute one after another — at any moment, only one instruction is running.

Think of the payroll example: a do_payroll() function generates instructions for employee 1 (emp1_hrs, emp1_deduc, emp1_rate, emp1_tax...), then employee 2, then employee 3. All instructions flow into a single processor and run one at a time, from instruction tN to instruction t1. Every employee's payroll is calculated one by one, in sequence.

This approach wastes the hardware — modern processors have multiple functional units (integer unit, FP unit, load/store unit, etc.) that could all be running simultaneously, but sequential code only ever uses one at a time.`,
    keyPoints: [
      "Runs on a single CPU — one processor, one execution context",
      "Problem → discrete series of instructions → executed one at a time",
      "Only ONE instruction runs at any given moment",
      "Most traditional software (pre-2005 era) is written this way",
      "Wastes modern hardware: multiple functional units sit idle",
      "Execution is deterministic — same input always gives same result in same order",
      "Sequential compiler only sees a narrow window of instructions at a time",
    ],
    formula: null,
    examTips: [
      "Sequential = one instruction at a time = single CPU = serial execution.",
      "The motivation for parallel computing is that sequential computing wastes the parallel hardware available.",
    ],
    questions: [
      { q: "What is the fundamental limitation of sequential computing?", a: "Sequential computing executes only one instruction at a time, regardless of how many functional units are available in the hardware. It wastes the parallelism built into modern processors — while one unit is busy, all others are idle. This bottleneck becomes more severe as programs grow larger and more complex." },
    ],
  },

  "parallel-computing": {
    title: "Parallel Computing", emoji: "⚡",
    tldr: "Multiple CPUs working simultaneously. Problem split into parts, each part runs on a different processor at the same time.",
    explanation: `Parallel computing is the simultaneous use of multiple compute resources to solve a computational problem. Instead of one CPU doing everything one step at a time, multiple CPUs work simultaneously on different parts of the problem.

The problem is broken into discrete parts that can be solved concurrently. Each part is further broken down into its own series of instructions, and each part's instructions execute simultaneously on different CPUs.

Using the payroll example again: instead of one processor computing all employees one by one, do_payroll(emp1) runs on processor 1, do_payroll(emp2) runs on processor 2, do_payroll(emp3) on processor 3, do_payroll(empN) on processor N — all at the same time. The time taken is approximately the same as computing one employee, but N employees are done simultaneously.

Compute resources used can be: a single computer with multiple processors/cores, or an arbitrary number of networked computers.`,
    keyPoints: [
      "Simultaneous use of multiple compute resources",
      "Problem broken into parts that can be solved concurrently",
      "Each part runs on a different CPU simultaneously",
      "Requires the problem to have independent sub-tasks (or at least partially independent)",
      "Resources: multi-core single machine OR networked cluster of machines",
      "Payroll example: N employees computed on N processors simultaneously",
      "Time ≈ time for 1 task, but N tasks completed — hence N× speedup (ideal)",
    ],
    formula: {
      code: `Ideal Speedup (no overhead, perfectly parallel):
  Time_parallel = Time_serial / N processors
  Speedup = N

Real-world: always less than N due to:
  - Serial sections that can't be parallelised
  - Communication overhead between processors
  - Synchronisation waits
  - Load imbalance (some processors finish earlier)`,
      explanation: "The ideal N× speedup is never achieved in practice. Amdahl's and Gustafson's laws quantify the actual achievable speedup.",
    },
    examTips: [
      "Parallel ≠ just faster. It requires the problem to be breakable into independent pieces.",
      "Key exam question: 'What distinguishes parallel from sequential?' → Multiple processors, simultaneous execution, problem partitioned into concurrent parts.",
    ],
    questions: [
      { q: "What are the three requirements for a problem to benefit from parallel computing?", a: "1. The problem must be breakable into discrete pieces of work that can be solved simultaneously. 2. The pieces must be executable as multiple program instructions at the same time. 3. The problem must be solvable in less time using multiple compute resources than with a single resource — i.e., parallelism must actually provide a speedup." },
    ],
  },

  "parallel-compiler": {
    title: "Sequential vs. Parallel Compiler (EPIC)", emoji: "🔨",
    tldr: "Sequential compiler sees a narrow instruction window → leaves functional units idle. EPIC compiler sees wider scope → packs instructions to fill all execution units.",
    explanation: `A compiler translates source code into machine code. How well it exploits parallelism depends on how wide a view it takes.

A sequential compiler translates one operation at a time into sequential machine code. When this code runs on a processor with many functional units (integer, FP, load/store, branch), most units sit idle — the code only uses one unit per cycle.

An EPIC (Explicitly Parallel Instruction Computing) compiler "views a wider scope" — it analyzes many instructions at once and finds independent operations that can run simultaneously. It then bundles these into parallel instruction streams that fill all available execution units every clock cycle. The result: much higher utilization of the processor's hardware.

EPIC compilation is the philosophy behind VLIW (Very Long Instruction Word) architectures — the compiler does the work of finding parallelism statically, so the hardware can be simpler (no runtime dependency checking needed).`,
    keyPoints: [
      "Sequential compiler: narrow view → sequential code → most functional units idle",
      "EPIC compiler: wider view → parallel instruction streams → fills all execution units",
      "EPIC = Explicitly Parallel Instruction Computing (compiler responsibility)",
      "More efficient use of execution resources = better performance per clock cycle",
      "EPIC is the philosophy behind VLIW architectures",
      "Sequential compiler leaves grid cells empty; EPIC fills them (visualise as a grid of clock×units)",
    ],
    formula: null,
    examTips: [
      "EPIC compiler = does what out-of-order hardware does, but statically (at compile time).",
      "More filled execution units = better IPC (Instructions Per Clock) = better performance.",
    ],
    questions: [],
  },

  "requirements": {
    title: "Requirements for Parallelisable Problems", emoji: "✅",
    tldr: "Problem must be splittable, independently executable, and faster with multiple resources than with one.",
    explanation: `Not every problem benefits from parallel computing. A problem is parallelisable if it satisfies three conditions:

1. It can be broken apart into discrete pieces of work that can be solved simultaneously — there must be some way to divide the work so pieces don't need each other's results immediately.

2. It can execute multiple program instructions at any moment in time — the independent pieces can truly run at the same time on different processors.

3. It can be solved in less time with multiple compute resources than with a single resource — there must actually be a net benefit after accounting for overhead.

Counter-examples of non-parallelisable problems: a recursive Fibonacci computation where each term depends on the previous two — inherently sequential. Or a program that is fundamentally serial in its logic flow.

Most real-world scientific, engineering, and data-processing problems have natural parallelism — simulating weather grids, rendering pixels, processing independent data records.`,
    keyPoints: [
      "Condition 1: Problem can be split into independent (or semi-independent) work pieces",
      "Condition 2: Those pieces can run simultaneously on different processors",
      "Condition 3: Using multiple resources actually saves time vs. using one",
      "Not all problems are parallelisable — e.g., sequential data dependencies block parallelism",
      "Embarrassingly parallel: many independent tasks, no coordination needed (ideal case)",
      "Examples of naturally parallel: image pixels, payroll per employee, weather grid cells",
      "Examples of hard to parallelise: Fibonacci recurrence, sequential sorting, some graph algorithms",
    ],
    formula: null,
    examTips: [
      "'It should execute only one instruction at a time' is NOT a requirement — that's sequential computing.",
      "Embarrassingly parallel = maximum parallelism, near-zero coordination.",
    ],
    questions: [],
  },

  "parallel-hw": {
    title: "Parallel Hardware — Modern Computers", emoji: "🔧",
    tldr: "Every modern computer is already parallel in hardware: multiple functional units, multiple cores, multiple hardware threads.",
    explanation: `Virtually all stand-alone computers today are parallel from a hardware perspective, whether or not the software takes advantage of this.

Multiple functional units on a single chip: L1 cache, L2 cache, branch predictor, prefetch unit, decode unit, floating-point unit (FPU), graphics processing unit (GPU), integer unit, load/store unit — all can operate simultaneously.

Multiple execution units/cores: modern CPUs have 4, 8, 16, or more complete execution cores on one chip, each capable of running a separate thread of execution.

Multiple hardware threads: each core may support SMT (Simultaneous Multi-Threading), running 2–4 hardware threads per core.

Example: IBM Blue Gene/Q chip has 18 cores (PU) and 16 L2 cache units (L2) — even a single chip is internally a parallel machine. A data center's compute cluster takes this further: racks of multi-processor servers connected by fast networks (e.g., Infiniband).`,
    keyPoints: [
      "Modern CPUs have multiple functional units: integer, FP, load/store, branch, cache, decode — all parallel",
      "Multi-core: 4, 8, 16, 64+ cores per chip, each an independent execution unit",
      "SMT (Hyper-Threading): 2–4 hardware threads per core",
      "IBM BG/Q: 18 cores + 16 L2 units on one chip",
      "Clusters: many multi-processor nodes connected by Infiniband network",
      "Sequential software wastes all this hardware — only 1 unit active at a time",
      "Special nodes in clusters handle storage/I/O separately from compute nodes",
    ],
    formula: null,
    examTips: [
      "Modern hardware IS parallel. The bottleneck is software that doesn't exploit it.",
      "Node → CPU (socket) → Cores → Threads. Know this hierarchy for multi-core questions.",
    ],
    questions: [],
  },

  "why-parallel": {
    title: "Why Use Parallel Computing?", emoji: "🚀",
    tldr: "Six reasons: save time/money, solve larger problems, concurrency, non-local resources, use modern hardware, science/industry needs.",
    explanation: `The real world is massively parallel — many complex events happen simultaneously. Parallel computing is better suited to model and simulate complex real-world phenomena.

1. Save Time and/or Money: Two workers cooperating on a task finish faster than one. Parallel computing shortens completion time and can reduce cost by finishing faster on fewer resources.

2. Solve Larger / More Complex Problems: Problems too large for a single machine can be distributed across many. A 10,000×10,000×10,000 grid = 32 TB of data — physically impossible on one machine.

3. Provide Concurrency: Multiple tasks run simultaneously, enabling interactive systems, multi-user services, and complex real-time applications.

4. Take Advantage of Non-Local Resources: Grid computing, cloud computing — use resources across a network globally. An institution can rent time on remote supercomputers.

5. Make Better Use of Underlying Parallel Hardware: Modern hardware has multiple cores. Serial programs waste them — parallel programs exploit all available cores.

6. Science, Engineering, Industry: Weather forecasting, drug design, CFD, machine learning training, financial modeling — all require massive computation that only parallelism can provide within reasonable time.`,
    keyPoints: [
      "Real world is parallel: many events happen simultaneously → simulation needs parallelism",
      "Save time: parallel reduces wall-clock time. Save money: same work done faster = cheaper",
      "Larger problems: problems that don't fit in one machine can be split across many",
      "Concurrency: enables real-time and multi-user systems",
      "Non-local resources: grid/cloud computing exploits networked resources worldwide",
      "Use hardware: modern multi-core CPUs are parallel — serial code wastes them",
      "Applications: weather forecast, drug design, CFD, ML training, financial modeling, game physics",
    ],
    formula: null,
    examTips: [
      "Primary motivation: save time AND/OR solve larger problems (the two usually go together).",
      "The 'real world is parallel' statement is a key justification — model phenomena simultaneously.",
    ],
    questions: [],
  },

  "applications": {
    title: "Applications of Parallel Computing", emoji: "🌍",
    tldr: "Grand challenge problems: big data, AI/ML, weather, drug design, finance, graphics, web services. All need massive computation.",
    explanation: `Parallel computing enables "Grand Challenge Problems" — computations too large or time-sensitive for any single processor.

Scientific and Engineering Applications: Computational Fluid Dynamics (CFD) — simulating airflow around a car or aircraft. Molecular dynamics — simulating drug molecules. Weather forecasting — modeling the entire atmosphere. Seismic imaging — mapping underground structures for oil exploration.

Why these are parallelisable: each region of space can be computed somewhat independently. The simulation domain is divided into grid cells or particles, and each processor handles its own region.

Big Data and AI: Training deep learning models (large matrix multiplications and gradient updates). Database queries on petabytes of data. Web search engines ranking billions of pages.

Commercial and Industrial: Financial modeling, real-time trading systems. Graphics rendering for movies and games. Video streaming and compression. Corporate resource planning.

The Top500 list of the world's fastest supercomputers tracks progress — India has several (SahasraT at IISc, Aaditya at IITM, etc.) and the global race is now toward exascale (10¹⁸ FLOP/s).`,
    keyPoints: [
      "CFD: simulate airflow, fluid dynamics — each spatial cell independent",
      "Molecular dynamics: simulate protein folding, drug interactions",
      "Weather/climate: global atmosphere modeled as 3D grid of cells",
      "AI/ML: matrix multiplications in neural network training — massively parallel",
      "Big Data: distributed processing of huge datasets (MapReduce, Spark pattern)",
      "Top500: IISc SahasraT (901 TFLOPS), IITM Aaditya (719 TFLOPS), TIFR, IIT Delhi",
      "Exascale: current goal = 10¹⁸ FLOP/s",
    ],
    formula: null,
    examTips: [
      "Know at least 3 real-world applications: CFD/weather, ML training, Big Data/databases.",
      "Grand Challenge = problem too large for sequential computing within useful time.",
    ],
    questions: [],
  },

  "hpc": {
    title: "High Performance Computing (HPC)", emoji: "🏆",
    tldr: "Three aspects: higher speed (faster), higher throughput (more problems), higher computational power (larger problems). Measured in FLOPS.",
    explanation: `HPC = using the most efficient algorithms on computers capable of the highest performance to solve the most demanding problems.

Three aspects of HPC performance:

1. Higher Speed: Solve problems faster. Critical for time-constrained applications — a weather forecast must be computed in less than 24 hours to be useful; it doesn't matter if it's accurate if it arrives after the weather has already passed ("hard deadline"). A stock trading algorithm that's too slow loses money ("soft deadline").

2. Higher Throughput: Solve more problems in a given time. Critical when there are many similar tasks — banking transaction processing, web server request handling, batch scientific simulations.

3. Higher Computational Power: Solve larger problems — a finer-resolution weather model gives more accurate forecasts, but requires far more computation. Larger simulations require more memory and more compute.

These three aspects often require different architectural approaches — throughput-oriented systems (like GPU clusters) may sacrifice per-task speed for total volume, while latency-critical systems (like real-time databases) optimise for speed.`,
    keyPoints: [
      "HPC = most efficient algorithms + highest-performance hardware + most demanding problems",
      "Higher Speed: solve ONE problem faster (latency). Example: 24-hour weather deadline.",
      "Higher Throughput: solve MORE problems per unit time. Example: transaction processing.",
      "Higher Computational Power: solve LARGER problems. Example: finer weather mesh = more accuracy.",
      "Hard deadline: must finish before a real-world event (weather forecast).",
      "Soft deadline: faster is better but missing it isn't catastrophic (trading algorithms).",
    ],
    formula: null,
    examTips: [
      "Know all 3 HPC aspects: speed (faster), throughput (more), power (larger).",
      "Hard vs. soft deadline: weather forecast is hard; stock trading is soft.",
    ],
    questions: [],
  },

  "flops": {
    title: "Measuring Performance: FLOPS", emoji: "📊",
    tldr: "FLOPS = Floating-Point Operations Per Second. Scale: kFLOPS (10³) → MFLOPS → GFLOPS → TFLOPS → PFLOPS → EFLOPS. Supercomputers measured in PFLOPS/EFLOPS.",
    explanation: `FLOPS (Floating-Point Operations Per Second) is the standard measure of a supercomputer's computational speed. It counts how many floating-point arithmetic operations (additions, multiplications, etc.) the system can perform per second.

The scale goes: kiloFLOPS (10³), megaFLOPS (10⁶), gigaFLOPS (10⁹), teraFLOPS (10¹²), petaFLOPS (10¹⁵), exaFLOPS (10¹⁸), zettaFLOPS (10²¹), yottaFLOPS (10²⁴).

Historical milestones: 1941: ~1 FLOP/s (early mechanical computers). 1964: ~1 MFlop/s (IBM 7090, CDC 6600). 1987: ~1 GFlop/s (Cray 1, early vector era). 1997: ~1 TFlop/s (ASCI Red). 2005: 131 TFlop/s (IBM BG/L). Today's top systems are in the PFLOPS range.

The graph of performance over time (log scale from 1950 to 2010) shows four eras: Scalar era (1950–70s), Vector/Superscalar era (1970–90s), Parallel era (1990–2000s), and the current GPU-accelerated era.

Why FLOPS? Most scientific computation involves floating-point arithmetic (real numbers). Counting FLOPS gives a hardware-independent measure of raw computational capability.`,
    keyPoints: [
      "FLOPS = Floating-Point Operations Per Second",
      "kFLOPS=10³, MFLOPS=10⁶, GFLOPS=10⁹, TFLOPS=10¹², PFLOPS=10¹⁵, EFLOPS=10¹⁸",
      "Milestones: 1MFLOPS (1964), 1GFLOPS (1987), 1TFLOPS (1997), 131TFLOPS (2005 IBM BG/L)",
      "Current top500 leaders: PFLOPS scale. Exascale goal: 10¹⁸ FLOP/s",
      "Four performance eras: Scalar → Vector/Superscalar → Parallel → GPU-accelerated",
      "Single-core clock speed plateaued ~2004 due to power/heat → shift to multi-core",
      "Growth factor of a billion: from 1 FLOP/s in 1941 to billions of TFLOPS today",
    ],
    formula: {
      code: `FLOPS Scale:
  kiloFLOPS  (kFLOPS) = 10³
  megaFLOPS  (MFLOPS) = 10⁶
  gigaFLOPS  (GFLOPS) = 10⁹
  teraFLOPS  (TFLOPS) = 10¹²
  petaFLOPS  (PFLOPS) = 10¹⁵
  exaFLOPS   (EFLOPS) = 10¹⁸
  zettaFLOPS (ZFLOPS) = 10²¹
  yottaFLOPS (YFLOPS) = 10²⁴

Historical Timeline:
  1941 → ~1 FLOP/s (mechanical calculators)
  1964 → ~1 MFlop/s (CDC 6600)
  1987 → ~1 GFlop/s (Cray 1)
  1997 → ~1 TFlop/s (ASCI Red)
  2005 → 131 TFlop/s (IBM Blue Gene/L)
  Today → PFLOPS range (Frontier, etc.)`,
      explanation: "Each decade, performance increases roughly 1000× — that's the power of compounding Moore's Law improvements plus architectural innovations like pipelining, superscalar, and GPU acceleration.",
    },
    examTips: [
      "Know all FLOPS prefixes and their powers of 10.",
      "Current supercomputers = PFLOPS. Exascale goal = EFLOPS = 10¹⁸.",
    ],
    questions: [],
  },

  "perf-growth": {
    title: "Performance Growth & The Multicore Shift", emoji: "📈",
    tldr: "Single-core clock speed plateaued ~2004 due to power/heat (power wall). Solution: add more cores. Moore's Law continues as transistor count grows, not clock speed.",
    explanation: `For decades, computing performance grew through Moore's Law: transistor count doubled every 18 months. This drove clock speed increases from MHz to GHz.

However, around 2004, single-core clock speeds hit a wall. Making transistors switch faster generates too much heat and consumes too much power — the power wall. You can't cool a chip that generates more heat than a small furnace.

The industry's response was to add more cores to the chip instead of speeding up a single core. Intel, AMD, and ARM all shifted to multi-core designs. Transistor count continues to grow (Moore's Law still holds for transistors), but the extra transistors go into additional cores, larger caches, and on-chip GPUs rather than faster single-core execution.

This shift fundamentally changed programming: a 4-core CPU won't run a sequential program faster than a 1-core CPU of the same generation — in fact it might be slightly slower! To benefit from 4 cores, the program must be explicitly parallelised. This is why parallel programming skills became mandatory.

Today's supercomputer performance growth continues at an incredible pace — over 500,000× increase in 20 years — and the trend shows no sign of stopping.`,
    keyPoints: [
      "Moore's Law: transistor count doubles every ~18 months (still roughly holds)",
      "Single-core clock frequency plateaued ~2004 — power/heat limits hit",
      "Power wall: faster clock = more heat = cooling becomes impossible",
      "Solution: more cores per chip, not faster clocks",
      "Consequence: programs must be parallelised to benefit from new hardware",
      "Sequential code on a 4-core chip ≠ 4× faster than sequential on 1-core",
      "Top500 performance: 500,000×+ increase in 20 years",
      "Future: exascale (10¹⁸ FLOP/s) is the current frontier goal",
    ],
    formula: null,
    examTips: [
      "Clock frequency plateaued ~2004. Cores per chip keep growing instead.",
      "Sequential programs DON'T automatically get faster on multi-core hardware.",
    ],
    questions: [],
  },

  "memory-arch": {
    title: "Parallel Memory Architectures", emoji: "🗄️",
    tldr: "Three types: Shared Memory (all CPUs share one pool), Distributed Memory (each node owns memory, communicates via messages), Hybrid (groups share locally, communicate across nodes).",
    explanation: `How parallel computers organize memory is one of the most fundamental design choices.

Shared Memory Architecture: All processors share a single pool of physical memory. Any CPU can directly read/write any memory location. Think of a shared whiteboard all workers can access. Simple to program, but doesn't scale beyond a single node — the memory bus becomes a bottleneck with too many CPUs. Also called SMP (Symmetric Multi-Processing).

Distributed Memory Architecture: Each node has its own CPU paired with its own private memory. Nodes are connected by a network. To access another node's memory, you send a message over the network. Scales to thousands of nodes, but communication overhead adds latency. Programming requires explicit message-passing (typically MPI).

Hybrid Architecture: Combines both. Within each node, CPUs share local memory (shared memory model). Across nodes, communication happens via network (distributed memory model). Each node might have 4–8 CPUs sharing node-local memory, and thousands of such nodes are networked together. This is the architecture of essentially all modern supercomputers.

GPU-Enhanced variation: Each node has CPUs + GPUs. CPU and GPU have separate memory spaces connected by PCIe. MPI handles node-to-node; CUDA handles CPU-to-GPU within a node.`,
    keyPoints: [
      "Shared Memory: All CPUs share one memory pool. Simple to program. Doesn't scale well (bus bottleneck).",
      "Distributed Memory: Each node owns its memory. Communication via message passing (MPI). Scalable.",
      "Hybrid: Groups of CPUs share local memory (SMP), groups communicate over network (distributed).",
      "SMP = Symmetric Multi-Processor: shared memory, equal access, same address space for all CPUs",
      "Distributed: each task sees only local memory; must explicitly communicate to access remote data",
      "GPU node: CPU RAM + GPU GDDR (separate spaces), PCIe bridge between them",
      "Modern HPC clusters = hybrid architecture (most common)",
    ],
    formula: null,
    examTips: [
      "Shared = single global memory = all CPUs access directly. Distributed = private memory + message passing.",
      "Most real HPC systems use hybrid: shared memory within a node, distributed across nodes.",
    ],
    questions: [
      { q: "What is the key difference between shared memory and distributed memory architectures?", a: "Shared Memory: all processors access a single physical memory pool directly via shared address space. No message passing needed — changes visible to all immediately. Doesn't scale well due to memory bus bottleneck. Distributed Memory: each node has its own private memory. To access another node's data, you must explicitly send a message (MPI). Scales to thousands of nodes but adds communication overhead." },
    ],
  },

  "gpu-arch-overview": {
    title: "GPU-Enhanced Architecture", emoji: "🎮",
    tldr: "Each node has CPUs + GPUs. CUDA handles CPU↔GPU on same node. MPI handles node↔node over network.",
    explanation: `Modern HPC clusters often add GPUs to each node, creating a GPU-enhanced architecture.

In the basic configuration: a cluster node has 2 GPUs + 2 CPUs sharing local memory, all connected by a network. GPUs accelerate massively parallel computation within each node.

In the CUDA-enhanced configuration: each node has 1 GPU connected to multiple CPUs via CUDA (the programming model). Inter-node communication uses MPI. So there are two levels of parallelism: within-node (CUDA/OpenMP for CPU-GPU and multi-core) and across-node (MPI for message passing between nodes).

This two-level hierarchy is how all modern top supercomputers work — the Frontier system at Oak Ridge (currently #1 in the world) uses AMD CPUs + AMD GPUs in exactly this pattern.

The key challenge: data must be explicitly copied between CPU memory and GPU memory via PCIe. This data transfer can become the bottleneck if not managed carefully.`,
    keyPoints: [
      "Node with GPU: CPU + GPU + separate memory spaces for each",
      "CUDA: programming model for CPU↔GPU communication within a node",
      "MPI: message passing for node↔node communication over network",
      "Two-level parallelism: CUDA/OpenMP (on-node) + MPI (across nodes)",
      "Data must be copied CPU RAM ↔ GPU GDDR via PCIe (potential bottleneck)",
      "Modern supercomputers all use this hybrid CPU+GPU architecture",
    ],
    formula: null,
    examTips: [
      "CUDA = within-node CPU↔GPU. MPI = across-node communication. Both layers needed.",
    ],
    questions: [],
  },

  "parallel-langs": {
    title: "Parallel Programming Languages & APIs", emoji: "💻",
    tldr: "OpenMP (shared memory, C/C++/Fortran), MPI (distributed, message passing), CUDA (NVIDIA GPUs), Pthreads (low-level C threads), CILK (custom C).",
    explanation: `Different parallel programming paradigms have different tools.

OpenMP (Open Multi-Processing): For shared-memory parallelism on multi-core CPUs. Uses pragma directives (#pragma omp ...) in C, C++, or Fortran. Easiest to add to existing code — just add pragmas around loops. Supports C, C++, Fortran, and (via third-party bindings) Python.

MPI (Message Passing Interface): The standard for distributed-memory parallelism across multiple nodes. Processes communicate by explicitly sending and receiving messages. Supports C, C++, Fortran, Java, Python, OCaml, R.

CUDA (Computer Unified Device Architecture): NVIDIA's proprietary framework for GPU programming. Allows writing kernels that run on thousands of GPU threads simultaneously.

Pthreads (POSIX Threads): Low-level C threading API. Maximum control but very verbose — programmers manage everything manually.

CILK: Custom C extension for task-parallel programming. Less common today.

In practice, large HPC applications use MPI + OpenMP (or MPI + CUDA) in combination — OpenMP/CUDA for on-node parallelism, MPI for across-node communication.`,
    keyPoints: [
      "OpenMP: shared memory, pragma directives, C/C++/Fortran — easiest for loops",
      "MPI: distributed memory, message passing, all major languages — scalable to 1000s of nodes",
      "CUDA: NVIDIA GPU programming, C-based — for massively parallel GPU kernels",
      "Pthreads: low-level POSIX threads in C — verbose but maximum control",
      "CILK: customized C for task parallelism",
      "Most HPC apps: MPI + OpenMP (or MPI + CUDA) hybrid approach",
      "Python wrappers exist for OpenMP and MPI but C/C++ is the primary language",
    ],
    formula: null,
    examTips: [
      "OpenMP = shared memory / same machine. MPI = distributed / multiple machines.",
      "CUDA = NVIDIA GPU only. OpenCL = vendor-neutral GPU/CPU framework.",
    ],
    questions: [],
  },

  "flynns-taxonomy": {
    title: "Flynn's Taxonomy", emoji: "📋",
    tldr: "Classifies computer architectures by instruction streams × data streams: SISD, SIMD, MISD, MIMD. In use since 1966.",
    explanation: `Flynn's Taxonomy (1966) is one of the most widely used frameworks for classifying computer architectures. It uses two independent dimensions: instruction stream (single or multiple) and data stream (single or multiple), giving four possible combinations.

SISD (Single Instruction, Single Data): Traditional sequential computers. One instruction stream operating on one data stream at a time. The Von Neumann model. Deterministic execution.

SIMD (Single Instruction, Multiple Data): One instruction stream but multiple data streams — the same instruction is applied to different data elements simultaneously. Perfect for regular, repetitive operations like vector addition, image processing, neural network matrix multiplications. GPUs are fundamentally SIMD.

MISD (Multiple Instruction, Single Data): Multiple instruction streams on a single data stream. Theoretically interesting, practically almost nonexistent. Only example: systolic arrays (Carnegie Mellon).

MIMD (Multiple Instruction, Multiple Data): Multiple independent instruction streams on multiple data streams. Most modern parallel computers. Each processor can execute completely different instructions on completely different data simultaneously.

Airport analogy: SISD = one desk, one customer. SIMD = many desks + supervisor with megaphone (same instruction to all). MIMD = many desks working at their own pace, synced via a central database.`,
    keyPoints: [
      "Flynn's Taxonomy classifies by instruction streams × data streams (2D classification)",
      "SISD: 1 instruction stream, 1 data stream — classic sequential Von Neumann computers",
      "SIMD: 1 instruction stream, multiple data streams — same op on many data simultaneously",
      "MISD: multiple instruction streams, 1 data stream — theoretical, almost no real examples",
      "MIMD: multiple instruction streams, multiple data streams — MOST COMMON today",
      "SIMD example: GPUs, Cray C90, Connection Machine CM-2",
      "MIMD example: supercomputers, modern multi-core CPUs, compute clusters",
      "Airport analogy: SISD=one desk, SIMD=megaphone supervisor, MIMD=independent desks",
    ],
    formula: null,
    examTips: [
      "MIMD = most common. MISD = almost never exists in practice.",
      "GPUs are SIMD (same instruction on all CUDA cores). Multi-core CPUs with different programs = MIMD.",
    ],
    questions: [
      { q: "What is Flynn's Taxonomy and what are its four categories?", a: "Flynn's Taxonomy (1966) classifies computer architectures along two dimensions: number of instruction streams and number of data streams. SISD (1 instruction, 1 data): sequential computers. SIMD (1 instruction, multiple data): same operation on many data elements — GPUs, vector processors. MISD (multiple instructions, 1 data): almost nonexistent theoretically. MIMD (multiple instructions, multiple data): most common today — supercomputers, multi-core CPUs, clusters." },
    ],
  },

  "sisd": {
    title: "SISD — Single Instruction Single Data", emoji: "1️⃣",
    tldr: "One instruction stream, one data stream. Classic sequential Von Neumann model. Deterministic. Rare today. Example: Intel Atom family.",
    explanation: `SISD is the classic sequential computer architecture — the Von Neumann model. At any clock cycle, only one instruction is active (one instruction stream) working on one piece of data (one data stream).

Execution is deterministic: given the same inputs, the same sequence of instructions always runs in the same order with the same results.

Instruction sequence example: load A → load B → C = A + B → store C → A = B * 2 → store A. Each instruction waits for the previous to complete before it begins.

Modern examples are rare: Intel Atom family (Silverthorne, Lincroft, Diamondville, Pineview) — ultra-low-power processors used in embedded systems where parallelism is not needed and power savings matter most.

In practice, even SISD processors now have pipelining, which is a form of ILP (instruction-level parallelism). Strictly speaking, a pipelined processor is not pure SISD, but it's often classified as SISD because there is still only one instruction stream (just overlapping stages).`,
    keyPoints: [
      "One instruction stream: only one instruction active at a time",
      "One data stream: only one piece of data processed per cycle",
      "Deterministic execution: same inputs → same outputs, every time",
      "Classic Von Neumann model: fetch → decode → execute → writeback, one at a time",
      "Very few pure SISD processors exist today — nearly all modern CPUs have some parallelism",
      "Representatives: Intel Atom family (embedded, low-power applications)",
    ],
    formula: null,
    examTips: [
      "SISD = sequential, deterministic, one instruction + one data per cycle.",
      "Rare today — even 'simple' processors like Atom have pipelining.",
    ],
    questions: [],
  },

  "simd": {
    title: "SIMD — Single Instruction Multiple Data", emoji: "📊",
    tldr: "Same instruction applied to many data elements simultaneously. Perfect for regular, high-regularity problems: image processing, vector math, neural networks.",
    explanation: `SIMD executes one instruction on multiple data elements simultaneously. Every processor in the array executes the same instruction at the same time, but each works on different data.

Example — Vector Addition: in scalar computing, X+Y is one addition. In SIMD, X[] = [x3, x2, x1, x0] and Y[] = [y3, y2, y1, y0]. A single ADD instruction does x3+y3, x2+y2, x1+y1, x0+y0 all simultaneously in one cycle.

Why it's powerful: if you need to add two 1000-element arrays, scalar needs 1000 cycles; SIMD with 1000 lanes needs 1 cycle. For image processing (apply a filter to every pixel), neural network matrix multiply (same multiply-accumulate on every element), or weather simulation (same physics equations on every grid cell) — SIMD is the ideal model.

Two varieties:
- Processor Arrays: Connection Machine CM-2, Maspar MP-1/MP-2 — massively parallel arrays of simple PEs.
- Vector Pipelines: Cray C90, Fujitsu VP, IBM 9000 — pipelined execution of vector operations.

Modern GPU cores execute in SIMD fashion: all 32 threads in a "warp" execute the same instruction simultaneously.`,
    keyPoints: [
      "Same instruction applied to ALL processing units simultaneously",
      "Each PU has its own data — different data elements, same operation",
      "Best suited for high-regularity problems: image processing, vector math, matrix ops",
      "Vector addition example: 4 additions in 1 cycle with 4-wide SIMD vs. 4 cycles scalar",
      "Processor Arrays: CM-2, Maspar (massively parallel simple processors)",
      "Vector Pipelines: Cray C90, Fujitsu VP (pipeline for vector arithmetic)",
      "Modern GPUs: 32-thread warps execute in SIMD fashion",
    ],
    formula: {
      code: `SIMD Vector Addition Example:
  Scalar: X + Y = one addition per cycle
  SIMD (4-wide):
    X[] = [x3, x2, x1, x0]
    Y[] = [y3, y2, y1, y0]
    X[]+Y[] = [x3+y3, x2+y2, x1+y1, x0+y0]  ← all 4 done in 1 instruction!

  For 1000-element arrays:
    Scalar: 1000 cycles
    SIMD (1000-wide): 1 cycle
    Speedup: 1000×`,
      explanation: "SIMD is ideal when you perform the same operation on a large amount of independent data (data-parallel workloads). The condition: all elements must follow the same control flow (no if-else branches on per-element conditions).",
    },
    examTips: [
      "SIMD = same instruction, different data, all simultaneously.",
      "GPUs are SIMD at the warp level (32 threads, same instruction, different memory addresses).",
    ],
    questions: [],
  },

  "mimd": {
    title: "MIMD — Multiple Instruction Multiple Data", emoji: "🌐",
    tldr: "Different instructions on different data simultaneously. Most common parallel architecture today. Supercomputers, multi-core CPUs, clusters.",
    explanation: `MIMD is the most common type of parallel computer today. Multiple processors each execute their own independent instruction stream on their own independent data simultaneously.

Execution can be synchronous (all processors at the same step — SPMD style) or asynchronous (each processor at its own pace). It can be deterministic or non-deterministic (parallel race conditions can make results order-dependent).

Example: three processors running simultaneously:
- P1: load A(1) → load B(1) → C(1) = A(1) × B(1) → store C(1)
- P2: call funcD → x = y×z → sum = x×2 → call sub1(i,j)
- Pn: do loop i=1 to N → alpha = w³ → zeta = C(i)

Each processor is doing completely different work. This is the architecture of virtually all modern supercomputers, multi-processor workstations, and CPU clusters.

Within a node, multiple cores execute different threads (MIMD). Across nodes, different nodes execute different MPI processes (MIMD). Modern CPUs are MIMD machines — each core runs a different process or thread.`,
    keyPoints: [
      "Multiple independent instruction streams on multiple independent data streams",
      "MOST COMMON parallel architecture today",
      "Execution can be synchronous OR asynchronous, deterministic OR non-deterministic",
      "Each processor does completely different work on completely different data",
      "Representatives: all supercomputers, modern multi-core CPUs, grid/cloud clusters",
      "Encompasses both shared-memory (multi-core CPU) and distributed-memory (cluster) systems",
    ],
    formula: null,
    examTips: [
      "MIMD = most modern parallel systems. If asked 'which is most common?' → MIMD.",
      "Non-deterministic: parallel execution can give different results depending on thread scheduling — race conditions.",
    ],
    questions: [],
  },

  "misd": {
    title: "MISD — Multiple Instruction Single Data", emoji: "🔬",
    tldr: "Multiple instruction streams on a single data stream. Almost nonexistent in practice. Mostly theoretical. Only example: systolic arrays.",
    explanation: `MISD is the rarest Flynn category — multiple independent processors each execute different instructions, but they all work on the same single data stream.

This is highly unusual because in most practical scenarios, different processors need different data. Passing the same data through multiple different operations simultaneously is a very specialized pattern.

Almost no real MISD computers have ever been built. The one notable experimental example was a systolic array at Carnegie-Mellon University.

Systolic arrays (covered separately) are sometimes classified as MISD — each cell in the array performs different accumulation operations on the same streaming data, though the modern definition of systolic arrays has evolved. Modern Google TPUs (Tensor Processing Units) use systolic-array-inspired designs.

For exam purposes: MISD = almost never exists. If a question asks which Flynn category "rarely exists," the answer is MISD.`,
    keyPoints: [
      "Multiple instruction streams, ONE data stream — rare in practice",
      "Almost no real MISD computers have ever been built",
      "Mostly a theoretical category in Flynn's classification",
      "Only known experimental example: systolic arrays at Carnegie-Mellon University",
      "Modern Google TPUs use systolic-array-inspired designs (loosely related)",
    ],
    formula: null,
    examTips: [
      "MISD = the answer to 'which Flynn category rarely exists in practice?' → MISD.",
      "Don't confuse MISD with MIMD. MISD = one data stream (very unusual). MIMD = multiple data.",
    ],
    questions: [],
  },

  "systolic-arrays": {
    title: "Systolic Arrays", emoji: "🧮",
    tldr: "Regular array of simple PEs. Data flows rhythmically through the array like a heartbeat. Used for matrix multiplication. Modern TPUs work this way.",
    explanation: `A systolic array is designed to be simple, regular, concurrent, and I/O-balanced — all properties that make hardware efficient.

The core idea: replace a single complex Processing Element (PE) with a regular 2D array of simple PEs. Data "flows" through this array rhythmically — like a heartbeat (hence "systolic"). Each PE performs a simple Multiply-Accumulate (MAC) operation as data passes through it.

Each PE contains: Register X + Register Y → Multiplier → Accumulate adder → Register Z. Inputs A enter from the left (rows), inputs B enter from the top (columns). Each cell multiplies one A and one B value and accumulates into its Z register. The outputs flow out on the other side.

For matrix multiplication (C = A × B): matrix A elements enter staggered from the left (rows), matrix B elements enter staggered from the top (columns). After the data flows through, each cell holds the corresponding element of output matrix C. This is highly efficient — each data element is reused multiple times as it flows through.

Modern Google TPUs (Tensor Processing Units) are essentially large systolic arrays — they accelerate neural network inference (matrix multiply + activation) using this exact principle.

Implementing CNNs with systolic arrays: convolution layers are recast as matrix multiplication (im2col + GEMM), then computed on the systolic array.`,
    keyPoints: [
      "Regular 2D array of identical simple PEs (Multiply-Accumulate units)",
      "Data flows rhythmically through the array (like a heartbeat — 'systolic')",
      "Each PE: Register X + Y → Multiply → Accumulate → Register Z",
      "A inputs from left (row-wise), B inputs from top (column-wise), C outputs accumulate in cells",
      "Perfect for matrix multiplication — each element reused multiple times",
      "Design goals: simple, regular, high concurrency, balanced computation/I/O",
      "Modern TPUs (Google Tensor Processing Units) are large systolic arrays",
      "CNNs can be accelerated: convolution → im2col → GEMM → systolic array",
    ],
    formula: null,
    examTips: [
      "Systolic array = rhythmic data flow through regular PE grid. Like an assembly line for matrix math.",
      "Google TPU = modern systolic array for neural network inference.",
    ],
    questions: [],
  },

  "simd-array-proc": {
    title: "SIMD Array Processor Organisation", emoji: "🔲",
    tldr: "Master Control Unit issues one instruction to all PEs simultaneously. Each PE has its own ALU, registers, and local memory.",
    explanation: `An Array Processor is a specific SIMD implementation: a single computer with multiple parallel processing elements (PEs), all under the control of a Master Control Unit (MCU).

Structure: The Master Control Unit issues one instruction to all PEs at the same time. The MCU decodes the instruction and broadcasts it. Each PE then executes that instruction on its own local data (stored in its own local memory). The MCU is connected to main memory and handles non-parallel operations.

Each PE has: its own ALU, registers, and local memory (Mi). PE 1 has memory M1, PE 2 has M2, ..., PE N has MN. All PEs execute the same instruction simultaneously but on their respective local data.

This gives a single instruction stream (from MCU) and multiple data streams (each PE's data) = SIMD.

This is essentially how a GPU's Streaming Multiprocessor (SM) works at a high level: one warp scheduler issues one instruction to 32 CUDA cores (the PEs), each with their own registers and local memory.`,
    keyPoints: [
      "Master Control Unit: decodes one instruction, broadcasts to all PEs",
      "Multiple PEs: each has its own ALU, registers, and local memory",
      "All PEs execute the same instruction simultaneously on different local data",
      "Single instruction stream (MCU) + multiple data streams (PEs) = SIMD",
      "MCU also connects to shared main memory for non-parallel operations",
      "Analogous to GPU SM: warp scheduler (MCU) → 32 CUDA cores (PEs)",
    ],
    formula: null,
    examTips: [
      "Array processor = SIMD structure: one control unit, many PEs, same instruction broadcast to all.",
    ],
    questions: [],
  },

  "terminology": {
    title: "Key Parallel Computing Terminology", emoji: "📖",
    tldr: "Node, CPU/Socket/Core, Task, Pipelining, SMP, Distributed Memory, Synchronisation, Granularity, Speedup, Embarrassingly Parallel, Scalability.",
    explanation: `Core terminology you must know for parallel computing.

Node: a standalone computer — usually has multiple CPUs, memory, and network interfaces. Nodes connect to form a supercomputer.

CPU/Socket/Core: historically CPU = single execution unit. Today: socket = physical CPU chip → contains multiple cores → each core = unique execution unit. A node with 2 sockets × 8 cores = 16 cores.

Task: a logically discrete section of computational work executed by a processor.

Synchronisation: coordination of parallel tasks — establishing a sync point where tasks wait for each other. Always causes at least one task to wait, increasing wall-clock time.

Granularity: ratio of computation to communication. Coarse granularity = long computations between short communications (good). Fine granularity = frequent short communications (overhead-heavy).

Observed Speedup = Wall-clock time of serial execution / Wall-clock time of parallel execution.

Parallel Overhead: time spent on coordination rather than useful work: task startup, synchronisation, communications, OS overhead, task termination.

Embarrassingly Parallel: solving many independent tasks simultaneously with essentially zero coordination. Example: rendering movie frames independently.

Scalability: ability to demonstrate proportionate speedup when adding resources. Affected by: hardware limits, algorithm structure, parallel overhead, application characteristics.`,
    keyPoints: [
      "Node = standalone computer (CPU + memory + network). Nodes connect to form clusters.",
      "Node → Socket (CPU chip) → Cores → Hardware Threads (SMT)",
      "Task = logically discrete unit of work executed by a processor",
      "Synchronisation: coordination point where tasks wait. Always increases wall-clock time.",
      "Granularity = computation/communication ratio. Coarse = good. Fine = overhead-heavy.",
      "Speedup = T_serial / T_parallel (simple, widely used metric)",
      "Embarrassingly Parallel = independent tasks, no coordination needed = ideal parallelism",
      "Parallel Overhead = task startup + sync + communication + OS overhead + termination",
      "Scalability = proportionate speedup with added resources",
    ],
    formula: {
      code: `Speedup = Wall-clock_Serial / Wall-clock_Parallel

Parallel Overhead components:
  - Task start-up time
  - Synchronisation waits
  - Data communications
  - Software overhead (language, libraries, OS)
  - Task termination time

Granularity:
  Coarse: [###COMPUTE###] [comm] [###COMPUTE###] [comm]
  Fine:   [##] [c] [##] [c] [##] [c] [##] [c]
  → Fine granularity = more overhead = less efficient`,
      explanation: "Coarse granularity is almost always better for performance: spend most time computing, rarely communicating. Fine granularity tasks lose significant time to communication overhead.",
    },
    examTips: [
      "Embarrassingly parallel = ideal. Embarrassingly = independently parallel with no coordination.",
      "Granularity = computation/communication. Higher is better (coarser = more compute per communication).",
    ],
    questions: [
      { q: "What is granularity in parallel computing, and why does coarse granularity generally give better performance?", a: "Granularity is the ratio of computation to communication in a parallel program. Coarse granularity means long periods of computation with infrequent communication. Fine granularity means frequent communication between short compute bursts. Coarse is better because communication has overhead: sending messages, synchronizing, and waiting all waste time. Coarse-grained tasks maximize the fraction of time spent on useful computation vs. overhead." },
    ],
  },

  "computing-models": {
    title: "Parallel Computing Models", emoji: "🏗️",
    tldr: "7 models: Shared Memory, Threads, Distributed/Message Passing, Data Parallel (PGAS), Hybrid, SPMD, MPMD.",
    explanation: `Parallel programs follow different programming models depending on how they coordinate work.

Model 1 — Shared Memory (no threads): Multiple processes all access a single shared memory space. No message passing needed — changes visible to all immediately. Simple but doesn't scale to multiple nodes.

Model 2 — Threads: A program spawns multiple threads that share the same address space but each has its own stack. OpenMP is the standard threading model for shared-memory parallelism.

Model 3 — Message Passing: Tasks have local memory. Data exchange by send/receive. For every send there must be a matching receive. MPI is the standard. Used for distributed-memory (multi-node) computation.

Model 4 — Data Parallel (PGAS — Partitioned Global Address Space): All tasks work on different partitions of the same large data structure. Each task does the same operation on its partition. Used in GPU computing (all CUDA threads work on different parts of an array).

Model 5 — Hybrid: Combines models. MPI + OpenMP (threads on-node, MPI cross-node) or MPI + CUDA (GPU acceleration + cluster communication).

Model 6 — SPMD (Single Program Multiple Data): All nodes run the same program but can branch to execute different parts based on rank/ID. Most common for multi-node clusters. Built on top of message passing.

Model 7 — MPMD (Multiple Program Multiple Data): Different nodes run entirely different programs. Less common. Better for functional decomposition (producer-consumer patterns).`,
    keyPoints: [
      "Shared Memory: processes share address space, no messages needed. Doesn't scale to multi-node.",
      "Threads (OpenMP): spawned threads share memory, each has own stack. For multi-core single node.",
      "Message Passing (MPI): local memory per task, explicit send/receive. Scalable to 1000s of nodes.",
      "Data Parallel (PGAS): same operation on different partitions of one data structure. GPU model.",
      "Hybrid: MPI + OpenMP or MPI + CUDA. Most modern HPC apps.",
      "SPMD: all run same program, different data/branch based on task ID. Most common cluster model.",
      "MPMD: different programs on different nodes. Functional decomposition use case.",
    ],
    formula: null,
    examTips: [
      "SPMD is the most common model for multi-node clusters (all nodes run same program, different data).",
      "Hybrid (MPI + OpenMP) is the dominant model for modern supercomputers.",
    ],
    questions: [],
  },

  "design-issues": {
    title: "Parallel Program Design Issues", emoji: "⚙️",
    tldr: "Four steps: Partition (split problem), Map (assign to processors), Communicate (exchange data), Consolidate (gather results). 'Too many cooks spoil the broth.'",
    explanation: `Designing a parallel program requires answering four fundamental questions:

1. Partitioning: How do you split the problem into smaller sub-problems? Should it be domain decomposition (split the data — each processor handles a spatial region) or functional decomposition (split the tasks — each processor handles a different phase)?

2. Mapping: How do you assign sub-problems to specific processors? Goal: maximize parallelism (minimize dependencies between mapped pieces) and balance load (all processors should have similar amounts of work — "load balancing").

3. Communication: What data must be exchanged between processors? When and how? Communication adds overhead. Goal: minimize communication. This determines the topology of the communication pattern.

4. Consolidation (Reduction): How do you gather and combine the final results? Sometimes this is trivial (each processor writes its results independently). Other times, results must be summed, compared, or otherwise combined (e.g., summing partial results from each processor to get a total).

The "too many cooks spoil the broth" metaphor: adding more processors can actually make things worse if coordination overhead exceeds the benefit of parallelism.`,
    keyPoints: [
      "Partitioning: split into sub-problems (domain decomposition vs. functional decomposition)",
      "Mapping: assign sub-problems to processors (goal: balance load, minimize dependencies)",
      "Communication: exchange data between processors (overhead! minimize it)",
      "Consolidation: gather and combine results at the end",
      "Load balancing: ensure all processors have similar work amounts",
      "Too many cooks: more processors + poor coordination = worse than fewer processors",
      "Automatic parallelisation (compiler-directed) can handle loops. Manual needed for complex cases.",
    ],
    formula: null,
    examTips: [
      "Four design steps: Partition → Map → Communicate → Consolidate. Know all four.",
      "Load imbalance: if some processors finish early and wait, you waste parallel resources.",
    ],
    questions: [],
  },

  "auto-parallel": {
    title: "Automatic vs. Manual Parallelisation", emoji: "🤖",
    tldr: "Manual parallelisation is complex and error-prone. Compilers can auto-parallelise loops, or programmers use directives (#pragma omp) to guide the compiler.",
    explanation: `Parallelising code was traditionally a complex, time-consuming, error-prone manual process. Two approaches exist:

Manual Parallelisation: The programmer explicitly identifies independent tasks, adds synchronization, manages communications. Needed for complex data dependencies and custom communication patterns.

Automatic Parallelisation — Fully Automatic: The compiler analyzes source code to identify parallel opportunities. It checks for dependencies between iterations, weighs the overhead, and parallelises automatically. Loops (for, do) are the primary target — iteration N can often run independently of iteration N-1. The compiler identifies "inhibitors to parallelism" (data dependencies) and only parallelises safe loops.

Automatic Parallelisation — Programmer Directed: The programmer uses compiler directives (e.g., #pragma omp parallel for in OpenMP) to explicitly tell the compiler which loops to parallelise and how. More reliable than fully automatic because the programmer knows which loops are safe.

Most compiler-generated parallelisation targets on-node shared memory using threads (OpenMP). For multi-node distributed memory, manual MPI code is still typically required.`,
    keyPoints: [
      "Manual: programmer explicitly codes parallelism. Complex, error-prone, but maximum control.",
      "Fully Automatic: compiler finds parallel loops, checks dependencies, parallelises safely.",
      "Loops (for/do) are the primary target of automatic parallelisation",
      "Compiler checks for 'inhibitors': data dependencies that prevent safe parallelism",
      "Programmer Directed: programmer guides compiler with directives (#pragma omp)",
      "Compiler-generated code uses shared memory threads (OpenMP) for on-node",
      "MPI for multi-node still typically requires manual coding",
    ],
    formula: null,
    examTips: [
      "Loops are the main target of automatic parallelisation — easy to check if iterations are independent.",
      "Data dependency = one iteration uses the result of another → cannot parallelise that loop.",
    ],
    questions: [],
  },

  "smt-threads": {
    title: "SMT — Simultaneous Multi-Threading", emoji: "🧵",
    tldr: "One physical core runs 2+ hardware threads simultaneously by filling idle functional units. Thread 1 uses FP unit, Thread 2 uses Integer unit — at the same time.",
    explanation: `A single CPU core has multiple functional units: integer unit, floating-point (FP) unit, load/store units, etc. A single thread rarely uses all of them simultaneously.

Single Thread scenario: Thread 1 is doing floating-point work — the FP unit is busy, but the Integer unit sits completely idle. Thread 2 doing integer work — Integer unit busy, FP unit idle. Resources are wasted.

Multi-Threading / SMT: Run TWO threads on the same physical core simultaneously. Thread 1 uses the FP unit; Thread 2 uses the Integer unit. Both run at the same time on one core, each using different functional units. The core's resources are now fully utilized.

Limitation: Two threads cannot use the SAME functional unit simultaneously. If both Thread 1 and Thread 2 need the integer unit at the same clock cycle, one must wait. This is the "impossible scenario" — SMT requires threads to have complementary resource usage patterns to work well.

Intel calls this Hyper-Threading (HT). Technically, SMT makes one physical core appear as two logical cores to the OS. The OS then schedules two threads on what looks like two separate CPUs.

SMT + Multi-Core: A dual-core SMT processor can run 4 threads simultaneously — 2 per core × 2 cores. All four run concurrently.`,
    keyPoints: [
      "SMT: one physical core appears as multiple logical cores via hardware thread duplication",
      "Exploits idle functional units: Thread 1 uses FP, Thread 2 uses Integer — simultaneously",
      "Limitation: can't use SAME functional unit from two threads simultaneously",
      "Intel's name for SMT: Hyper-Threading (HT)",
      "Benefit: fills otherwise idle execution resources → better IPC without adding hardware",
      "OS sees N physical cores × 2 SMT threads = 2N logical CPUs",
      "Dual-core SMT: 4 threads running simultaneously (2 per core × 2 cores)",
    ],
    formula: null,
    examTips: [
      "SMT ≠ two real cores. It's one physical core with shared functional units split among threads.",
      "Two threads can't use the same functional unit at the same clock cycle — that's impossible in SMT.",
    ],
    questions: [
      { q: "How does SMT (Hyper-Threading) achieve parallelism without adding more physical cores?", a: "SMT exploits the fact that a single thread rarely uses all functional units simultaneously. For example, a floating-point thread leaves the integer unit idle. SMT runs a second thread on the same core, assigning it to use the idle integer unit while the first thread uses the FP unit. Both threads advance simultaneously, doubling throughput. The only constraint: two threads cannot use the exact same functional unit at the same clock cycle." },
    ],
  },

  "smt-multicore": {
    title: "Multi-Core vs. SMT Architecture", emoji: "🖥️",
    tldr: "Multi-core: completely separate physical cores for each thread. SMT: two threads share one physical core's functional units. SMT Dual-Core: 4 threads on 2 cores.",
    explanation: `Understanding the difference between multi-core and SMT (and their combination) is important.

Multi-Core: Two (or more) completely independent physical processor cores on the same chip. Each core has its own full set of functional units, registers, caches (L1). Thread 3 runs on Core 1 using that core's FP unit. Thread 4 runs on Core 2 using its FP unit. Since the units are physically separate, there is no resource conflict — both can use their respective FP units simultaneously.

Difference from SMT: In SMT on a single core, threads MUST use different functional units (no two threads can use the same one at the same time). In multi-core, each core has its own independent set of units, so two cores can both use their FP units simultaneously — no conflict.

SMT Dual-Core (the optimal configuration): Two physical cores, each with SMT. Core 1: Thread 1 (FP) + Thread 3 (Integer) simultaneously. Core 2: Thread 2 (FP) + Thread 4 (Integer) simultaneously. Result: all four threads run concurrently — maximum hardware utilization.

This is the architecture of all modern desktop CPUs: Intel Core i7/i9 = 8–24 cores × 2 SMT threads = 16–48 logical processors. AMD Ryzen = 8–16 cores × 2 SMT threads = 16–32 logical processors.`,
    keyPoints: [
      "Multi-core: physically separate cores — each has own ALU, FP, registers, L1 cache",
      "Two cores can both use their own FP units simultaneously — no conflict (unlike SMT on one core)",
      "SMT on one core: threads must use DIFFERENT functional units",
      "Multi-core: threads on DIFFERENT cores can use the SAME type of unit simultaneously",
      "SMT Dual-Core: 2 cores × 2 SMT threads = 4 concurrent threads",
      "OS sees logical CPUs = physical cores × SMT threads per core",
    ],
    formula: null,
    examTips: [
      "Multi-core = physical separation. SMT = logical separation on shared hardware.",
      "SMT + Multi-Core = maximum parallelism: fill all units on all cores.",
    ],
    questions: [],
  },

  "ilp-scalar": {
    title: "Scalar / Sequential Computing (ILP Level 0)", emoji: "📏",
    tldr: "One instruction at a time per clock cycle. All other functional unit slots are empty. Baseline for ILP comparison.",
    explanation: `At the instruction level, scalar computing is the baseline: one instruction occupies one execution slot per clock cycle. All other available slots remain empty.

Visualize a grid: horizontal axis = clock cycles (1 through N), vertical axis = available functional unit "rows" (one row per functional unit or execution slot). In scalar computing, for each set of cycles, only the first row is filled with the current instruction. All other rows are completely empty.

For a simple loop: for(i=1; i<=6; i++) Out = i + i; — with 5 instructions per iteration and 6 iterations = 30 instruction executions total. Scalar: each instruction runs alone for 1 clock, then the next begins. Total time = 30 cycles, with most execution units idle throughout.

This is the reference point. Every ILP technique (pipelining, superscalar, VLIW) represents an improvement over this baseline by filling more grid cells per clock cycle.`,
    keyPoints: [
      "Scalar: one instruction executes per clock cycle, sequentially",
      "All other execution unit slots remain empty (wasted hardware)",
      "Baseline for comparing ILP techniques",
      "For N instructions: total time = N clock cycles",
      "No overlap between instructions — each instruction completes before next begins",
    ],
    formula: null,
    examTips: [
      "Scalar = baseline. All other ILP techniques improve over scalar by filling more execution slots.",
    ],
    questions: [],
  },

  "ilp-pipeline": {
    title: "Pipelining", emoji: "🔁",
    tldr: "Multiple instructions at different stages simultaneously — like an assembly line. Instructions overlap in a diagonal staircase pattern.",
    explanation: `Pipelining is an ILP technique where multiple instructions are simultaneously at different stages of execution — like an assembly line for instructions.

Classic pipeline: Fetch → Decode → Execute → Writeback (4 stages). In a non-pipelined processor, each instruction completes all 4 stages before the next instruction begins (scalar). In a pipelined processor, while Instruction 1 is in the Execute stage, Instruction 2 is in Decode, and Instruction 3 is in Fetch — all simultaneously.

Visualization on the timing grid: Instructions form a diagonal staircase. Instruction 1 starts at cycle 1, Instruction 2 starts at cycle 2, etc. At cycle 5, Instruction 5 is Fetching, Instruction 4 is Decoding, Instruction 3 is Executing, Instruction 2 is Writing Back, and Instruction 1 has just completed. More rows (stages) are active every cycle.

Throughput: once the pipeline is full, one instruction completes per clock cycle (same throughput as scalar per clock, but at a higher clock rate because stages are shorter).

Pipelining is already in essentially all modern CPUs. "Super Pipelining" subdivides stages further (finer granularity) to enable an even higher clock frequency.`,
    keyPoints: [
      "Multiple instructions at different pipeline stages simultaneously",
      "Like an assembly line: each stage handles a different instruction",
      "Timing diagram: diagonal staircase pattern (Instruction N offset by 1 stage from N-1)",
      "Classic stages: Fetch → Decode → Execute → Writeback",
      "Throughput: ~1 instruction per cycle when pipeline is full (CPI approaches 1)",
      "Enables higher clock frequency by shortening each stage",
      "Super Pipelining: even finer stages → even higher clock frequency",
      "Standard in all modern CPUs (ARM, x86, RISC-V all use pipelining)",
    ],
    formula: {
      code: `Pipeline timing (4-stage, 5 instructions):
  Cycle: 1    2    3    4    5    6    7    8
  I1:    [IF] [ID] [EX] [WB]
  I2:         [IF] [ID] [EX] [WB]
  I3:              [IF] [ID] [EX] [WB]
  I4:                   [IF] [ID] [EX] [WB]
  I5:                        [IF] [ID] [EX] [WB]

  Scalar: I1 takes 4 cycles, then I2 starts → total = 5×4 = 20 cycles
  Pipeline: all 5 complete by cycle 8 → total = 8 cycles
  Speedup ≈ N_stages × (when pipeline is full)`,
      explanation: "Pipeline speedup is approximately equal to the number of stages when the pipeline is full. Hazards (data dependencies, branch mispredictions) reduce this by causing stalls (pipeline bubbles).",
    },
    examTips: [
      "Pipelining: diagonal staircase. Different instructions at different stages simultaneously.",
      "Pipeline ≠ executing instruction in fewer cycles. It increases throughput by overlapping.",
    ],
    questions: [],
  },

  "ilp-superscalar": {
    title: "Super-Scalar", emoji: "⚡",
    tldr: "Multiple instructions at the SAME stage simultaneously. More than one instruction per clock cycle. Requires multiple execution units.",
    explanation: `Super-Scalar goes beyond pipelining by executing multiple instructions simultaneously at the SAME pipeline stage. Instead of one instruction per cycle completing, a 2-wide superscalar can complete 2 instructions per cycle (CPI = 0.5 ideally).

Pipelining = instructions at different stages simultaneously (diagonal pattern on timing grid).
Super-Scalar = instructions at the same stages simultaneously (pairs of rows filled at same time).

Hardware requirement: multiple functional units — two ALUs, two FPUs, two load/store units, etc. The processor must find instructions that can execute in parallel (no data dependency between them) and dispatch them to different units simultaneously.

Dynamic scheduling (out-of-order execution): the CPU scans ahead in the instruction stream to find independent instructions that can run simultaneously, even if they appear in different positions in the program. This is done in hardware at runtime.

Timing grid visual: instead of one row filled per cycle (pipelining), two rows are filled simultaneously. Instructions I1 and I2 start at cycle 1 together. I3 and I4 start at cycle 2 together. Completion rate doubles.

Modern CPUs: all high-performance CPUs are superscalar — Intel Core dispatches 5–6 instructions per cycle; AMD Zen dispatches 4–6 per cycle.`,
    keyPoints: [
      "Multiple instructions at the SAME pipeline stage simultaneously",
      "Requires multiple execution units (ALU, FPU, load/store all duplicated)",
      "2-wide superscalar: 2 instructions per cycle (CPI approaches 0.5)",
      "Dynamic scheduling: hardware finds independent instructions at runtime (out-of-order)",
      "Timing diagram: pairs of rows filled simultaneously (vs. one at a time for pipelining)",
      "Superscalar + Pipelining: both overlap stages AND issue multiple per stage",
      "All modern high-performance CPUs are superscalar (Intel: 5-6 IPC; AMD: 4-6 IPC)",
    ],
    formula: null,
    examTips: [
      "Pipelining = different stages, same time. Superscalar = same stage, same time (multiple per cycle).",
      "Superscalar requires complex hardware (dynamic scheduling, multiple units) vs. VLIW which uses compiler.",
    ],
    questions: [],
  },

  "ilp-superpipeline": {
    title: "Super Pipelining", emoji: "🔬",
    tldr: "Pipeline stages subdivided into finer micro-stages, enabling a higher clock frequency. Each stage is shorter, so the clock can be faster.",
    explanation: `Super Pipelining extends basic pipelining by subdividing each pipeline stage into even finer sub-stages.

Basic pipeline: 4 stages (Fetch, Decode, Execute, Writeback). Each stage takes 1 clock cycle. Clock period determined by the slowest stage.

Super Pipelining: subdivide each stage into 2 (or more) sub-stages. Now each sub-stage takes half the time of the original stage. The clock cycle is halved → the clock frequency doubles.

For example, if basic pipeline has 4 stages at 1 ns each (1 GHz), super pipeline with 8 stages has 8 sub-stages at 0.5 ns each → 2 GHz clock. More instructions are in-flight simultaneously (more stages = deeper pipeline).

Timing diagram: similar diagonal staircase as basic pipelining, but with finer granularity — more rows active at any cycle, each row representing a shorter stage.

Trade-off: deeper pipelines have a higher "branch misprediction penalty" — when the CPU takes a wrong branch prediction, it must flush more stages of work. This is why hyper-deep pipelines (like Intel's Pentium 4 with 31 stages) can actually perform worse than shallower pipelines on branch-heavy code.`,
    keyPoints: [
      "Subdivides pipeline stages into finer sub-stages → shorter clock cycle → higher frequency",
      "More stages in flight simultaneously than basic pipelining",
      "Enables higher GHz clock without changing fundamental logic",
      "More overlap between instructions than basic pipelining",
      "Trade-off: deeper pipeline → higher branch misprediction penalty → performance loss on branch-heavy code",
      "Intel Pentium 4: 31 stages (extreme super pipelining) — high clock but poor performance",
      "Modern balance: ~15–20 stages in most high-performance CPUs",
    ],
    formula: null,
    examTips: [
      "Super Pipelining = finer stages = higher clock frequency. NOT same as superscalar.",
      "Deeper pipeline = worse branch penalty. Tradeoff: frequency vs. branch efficiency.",
    ],
    questions: [],
  },

  "ilp-vliw": {
    title: "VLIW — Very Long Instruction Word", emoji: "📦",
    tldr: "Compiler packs multiple independent instructions into one long instruction word. Hardware is simple (no dynamic scheduling). Compiler does the work statically.",
    explanation: `VLIW (Very Long Instruction Word) achieves instruction-level parallelism by having the compiler pack multiple independent instructions into one very long instruction word that issues all sub-instructions simultaneously.

Structure: a VLIW instruction word contains multiple "slots," each for a different execution unit: [ADD | MUL | ADDF | MULF | LDR | MOV]. When this wide instruction is fetched and decoded, all six operations execute simultaneously on their respective units.

VLIW vs. Superscalar:
- Superscalar: hardware dynamically finds independent instructions at runtime. Complex hardware (out-of-order engines, hazard detection). Flexible.
- VLIW: compiler statically packs independent instructions at compile time. Simple hardware (just decode and dispatch). Inflexible — binary code is tied to a specific hardware configuration.

Drawback — NOPs: if the compiler cannot find enough independent instructions to fill all slots, it must insert NOP (No-Operation) placeholders. NOPs waste instruction bandwidth and memory. A degenerate case: if code is very sequential, a VLIW processor might issue mostly NOPs, performing no better than scalar.

EPIC (Explicitly Parallel Instruction Computing) is a modern evolution of VLIW — used in Intel Itanium. The compiler explicitly marks which instructions are independent and can issue together.`,
    keyPoints: [
      "Compiler packs multiple independent ops into one wide instruction word",
      "Hardware is simple — just decode once, dispatch all ops to their respective units",
      "No dynamic scheduling in hardware — all parallelism found statically by compiler",
      "VLIW word example: [ADD | MUL | ADDF | MULF | LDR | MOV] — 6 ops in 1 instruction",
      "Drawback: if compiler can't fill all slots → insert NOPs → waste bandwidth",
      "Superscalar = complex hardware + simple compiler. VLIW = simple hardware + smart compiler.",
      "EPIC (Intel Itanium) = modern VLIW with compiler-marked parallel groups",
    ],
    formula: {
      code: `VLIW Instruction Word Structure:
  [ ADD | MUL | ADDF | MULF | LDR | MOV ]
    ALU   ALU    FPU    FPU  Load  Move
    ↓     ↓      ↓      ↓     ↓     ↓
   PE1   PE2    PE3    PE4   PE5   PE6  ← all execute simultaneously

  With NOPs (compiler couldn't find 6 independent ops):
  [ ADD | NOP | MULF | NOP | LDR | NOP ]
    ↓            ↓           ↓
  only 3 real ops — 3 slots wasted

  Superscalar (comparison):
  Hardware finds independent instructions dynamically at runtime
  → complex hazard detection + out-of-order logic in silicon`,
      explanation: "VLIW shifts the complexity from hardware to the compiler. This makes hardware cheaper and simpler, but makes the compiler more complex and ties code to specific hardware configurations. A VLIW binary compiled for a 6-wide machine won't run on a 4-wide VLIW machine.",
    },
    examTips: [
      "VLIW: compiler finds parallelism (static). Superscalar: hardware finds parallelism (dynamic).",
      "VLIW disadvantage: NOPs if not enough independent instructions. Binary tied to hardware width.",
    ],
    questions: [],
  },

  "amdahls-law": {
    title: "Amdahl's Law", emoji: "⚖️",
    tldr: "Maximum speedup limited by the serial (non-parallelisable) fraction. Speedup = 1 / [(1-F) + F/N]. Max speedup = 1/(1-F) with infinite processors.",
    explanation: `Amdahl's Law, named after Gene Amdahl, gives the theoretical maximum speedup of parallelising a program.

Key insight: not all of a program can be parallelised. There is always a serial fraction (1-F) that must run sequentially — setup, teardown, reading input, writing output, etc.

Derivation: Let F = parallelisable fraction, (1-F) = serial fraction, N = number of processors.
- Serial time: TS
- Parallel execution time: TN = (1-F)×TS + (F/N)×TS
  - The serial part (1-F)×TS takes the same time regardless of N (can't speed it up).
  - The parallel part (F/N)×TS is divided among N processors.

Speedup = TS / TN = 1 / [(1-F) + F/N]

As N → ∞: Speedup_max = 1 / (1-F)

Example: if 5% of code is serial (1-F = 0.05), even with infinite processors: max speedup = 1/0.05 = 20×. No matter how many processors you add, you can never exceed 20× speedup.

Diminishing returns: going from 1→10 processors gives a huge speedup boost. Going from 100→1000 barely helps. The serial fraction becomes the sole bottleneck.`,
    keyPoints: [
      "F = parallelisable fraction. (1-F) = serial fraction. N = processors.",
      "Speedup = 1 / [(1-F) + F/N]",
      "Max speedup (N→∞) = 1/(1-F) — limited by serial fraction",
      "5% serial → max speedup = 20×. 10% serial → max speedup = 10×.",
      "Diminishing returns: each doubling of processors gives less and less improvement",
      "Serial section is the 'fatal limit' — it stays constant regardless of N",
      "Fixed problem size assumption — this is Amdahl's key constraint",
    ],
    formula: {
      code: `Amdahl's Law Formula:
  Speedup = 1 / [(1-F) + F/N]
  
  Where:
    F   = parallelisable fraction (0 to 1)
    N   = number of processors
    1-F = serial fraction

  Limit as N → ∞:
    Speedup_max = 1/(1-F)

  Examples of max speedup by serial fraction:
    1%  serial → max = 1/0.01 = 100×
    5%  serial → max = 1/0.05 = 20×
    10% serial → max = 1/0.10 = 10×
    50% serial → max = 1/0.50 = 2×
    
  ⚡ Even 1% serial limits you to 100× — no matter how many CPUs!`,
      explanation: "The formula shows that the serial fraction (1-F) is a hard ceiling. Even a tiny serial section can massively limit parallel efficiency. This is why reducing the serial fraction is so critical in parallel program optimization.",
    },
    examTips: [
      "Speedup = 1/[(1-F)+F/N]. Max speedup (infinite processors) = 1/(1-F).",
      "Amdahl assumes FIXED problem size. Gustafson assumes scalable problem size.",
    ],
    questions: [
      { q: "What is the maximum speedup achievable according to Amdahl's Law if 20% of the code is sequential?", a: "Serial fraction (1-F) = 0.20. Max speedup = 1/(1-F) = 1/0.20 = 5×. No matter how many processors you add, the 20% sequential portion is always a bottleneck, and the maximum achievable speedup is 5×." },
    ],
  },

  "amdahls-examples": {
    title: "Amdahl's Law — Worked Examples", emoji: "🔢",
    tldr: "Three examples: summation with 40% parallel (1.62×), 90% parallel (9.17×), matrix sum (5.5× and 10×).",
    explanation: `Three numerical examples of Amdahl's Law:

Example 1: Summation of 1000 numbers. Sequential fraction = 60%, parallel fraction F = 40%, N = 25 processors.
Speedup = 1 / (0.6 + 0.4/25) = 1 / (0.6 + 0.016) = 1/0.616 ≈ 1.623×

With only 40% parallelisable and 25 processors, we get barely 1.6× speedup. The 60% serial section dominates completely.

Example 2: Same problem but F = 90%, N = 100 processors.
Speedup = 1 / (0.1 + 0.9/100) = 1 / (0.1 + 0.009) = 1/0.109 ≈ 9.17×

With 90% parallel and 100 processors, still only ~9× speedup (not 100×!) because 10% is serial.

Example 3: Sum of 10 scalars + matrix sum of two 10×10 arrays = 110 total operations.
- Serial (scalar sum): 10/110 = 0.0909
- Parallelisable (matrix sum across 10 rows): 100/110 = 0.909

With 10 processors: Speedup = 1/(0.0909 + 0.909/10) = 1/(0.0909 + 0.0909) = 1/0.1819 ≈ 5.5×
With 100 processors: Speedup = 1/(0.0909 + 0.909/100) = 1/0.10009 ≈ 10×`,
    keyPoints: [
      "Example 1: F=0.4, N=25 → Speedup ≈ 1.62× (poor — only 40% parallel)",
      "Example 2: F=0.9, N=100 → Speedup ≈ 9.17× (10% serial limits to <10× despite 100 CPUs)",
      "Example 3: F=0.909 (matrix sum), serial=0.091 (scalar sum)",
      "N=10: Speedup ≈ 5.5×. N=100: Speedup ≈ 10×",
      "Increasing N from 10 to 100 (10×) only improves speedup from 5.5 to 10 (1.8×)",
      "Diminishing returns clearly shown: 10× more processors → not 10× more speedup",
    ],
    formula: {
      code: `Example 1: F=0.4, N=25
  Speedup = 1/(0.6 + 0.4/25) = 1/(0.6 + 0.016) = 1/0.616 ≈ 1.623

Example 2: F=0.9, N=100
  Speedup = 1/(0.1 + 0.9/100) = 1/(0.1 + 0.009) = 1/0.109 ≈ 9.174

Example 3: 10 scalars + 10×10 matrix = 110 total ops
  Serial fraction = 10/110 = 0.0909
  Parallel fraction F = 100/110 = 0.9091
  
  N=10:  Speedup = 1/(0.0909 + 0.9091/10) = 1/0.1818 ≈ 5.5
  N=100: Speedup = 1/(0.0909 + 0.9091/100) = 1/0.10000 ≈ 10.0`,
      explanation: "Notice in Example 1: 25 processors with 40% parallel gives only 1.62×. Going to 1000 processors with the same code would still only give ≈ 1/(0.6 + 0.0004) ≈ 1.665 — barely better! The serial 60% completely dominates.",
    },
    examTips: [
      "For Amdahl's problems: compute F and (1-F) carefully. Then plug into 1/[(1-F)+F/N].",
      "Identify what's serial and what's parallel first — often the key step in exam problems.",
    ],
    questions: [],
  },

  "amdahls-limits": {
    title: "Amdahl's Law — Limitations", emoji: "🚧",
    tldr: "Assumes fixed problem size. Ignores communication cost. Pessimistic for real-world scaling. Gustafson's law addresses these gaps.",
    explanation: `Amdahl's Law has significant limitations that make it overly pessimistic for many real-world scenarios.

Fixed Problem Size Assumption: Amdahl assumes the total amount of work is fixed. In practice, when you add more processors, you often tackle a larger problem — a weather model with finer resolution, a simulation with more particles, a neural network with more layers. The parallel fraction grows with problem size while the serial fraction stays roughly constant.

Ignores Communication Cost: Amdahl treats communication between processors as free. In reality, MPI communication, synchronisation waits, and memory bandwidth contention all add overhead that grows with processor count. More processors = more communication = diminishing returns beyond what Amdahl predicts.

No consideration of memory bandwidth: more processors sharing memory bandwidth can create contention that degrades performance — not modeled by Amdahl.

The "fatal limit" view: Amdahl is described as a "fatal limit" to parallelism — it says there is always a ceiling. But in real scientific computing, problem sizes grow with available resources, so Gustafson's Law (which assumes scalable problem size) is more realistic.

For exam: know that Amdahl's limitations are: fixed problem size, ignores communication, assumes serial section stays constant.`,
    keyPoints: [
      "Limitation 1: Assumes FIXED problem size — unrealistic when adding processors for larger problems",
      "Limitation 2: Ignores communication overhead — in practice, N processors ≠ N× faster",
      "Limitation 3: Serial section assumed constant — may actually shrink with larger problems",
      "Described as a 'fatal limit' — always a ceiling on speedup",
      "Gustafson's Law addresses the first limitation: problem grows with processor count",
      "In practice: more processors + larger problem = better speedup than Amdahl predicts",
    ],
    formula: null,
    examTips: [
      "Amdahl limitations: fixed problem size, no communication cost, serial section constant.",
      "Gustafson addresses: variable problem size — serial fraction shrinks as problem grows.",
    ],
    questions: [],
  },

  "gustafsons-law": {
    title: "Gustafson's Law", emoji: "📐",
    tldr: "As processors increase, solve bigger problems — serial fraction stays constant while parallel work grows. Scaled Speedup = N − (N−1)×S.",
    explanation: `Gustafson's Law shifts the thinking from Amdahl's fixed-problem-size model.

Key insight: in real workloads, when you add more processors, you use them to solve a bigger problem (finer resolution, more data, longer simulation). The serial fraction S stays roughly constant while the parallel portion scales linearly with N.

Formula: Scaled Speedup = N − (N − 1) × S
Where N = number of processors, S = serial fraction (between 0 and 1).

This gives a much more optimistic (and often more realistic) picture: with N processors, you can achieve nearly N× speedup on the larger problem, minus a small overhead term from the serial fraction.

Metaphor (floors and people):
- 1 person cleans 1 floor in reference time.
- 2 people + 2 floors (S=0.1): Scaled Speedup = 2 − (2-1)×0.1 = 1.9× speed of 1 person.
- 4 people + 4 floors (S=0.1): Scaled Speedup = 4 − 3×0.1 = 3.7× speed.
- Speedup grows nearly linearly with the number of processors.

Graph comparison: Amdahl gives a concave curve that plateaus quickly. Gustafson gives a nearly straight diagonal line from (0,1) to (1,N). Gustafson is much more optimistic for high parallel fractions.`,
    keyPoints: [
      "Gustafson's key shift: problem SIZE scales with processors, not fixed",
      "Serial fraction S stays constant as problem grows (more parallel work added, not more serial)",
      "Formula: Scaled Speedup = N − (N−1)×S",
      "Near-linear speedup possible: adding 10× processors → nearly 10× speedup",
      "More realistic for scientific computing where resolution grows with resources",
      "Metaphor: 2 people clean 2 floors in same time as 1 person cleans 1 floor",
      "Graph: Gustafson = diagonal line. Amdahl = concave curve. Gustafson more optimistic.",
    ],
    formula: {
      code: `Gustafson's Law:
  Scaled Speedup = N - (N-1) × S
  
  Where:
    N = number of processors
    S = serial fraction (same symbol as Amdahl's (1-F))

  Examples:
    N=10, S=0.1:  Speedup = 10 - 9×0.1 = 10 - 0.9 = 9.1
    N=10, S=0.01: Speedup = 10 - 9×0.01 = 10 - 0.09 = 9.91
    N=100, S=0.1: Speedup = 100 - 99×0.1 = 100 - 9.9 = 90.1

  Floor-cleaning analogy:
    S=0.1, N=4 people/floors:
    Scaled Speedup = 4 - (4-1)×0.1 = 4 - 0.3 = 3.7×`,
      explanation: "Gustafson's formula shows speedup grows almost linearly with N when S is small. The term (N-1)×S is the only 'drag' from the serial section. With S=0.1 and N=100: speedup = 90.1× vs. Amdahl's 1/(0.1+0.9/100) = 9.2×. Enormous difference for the same parameters!",
    },
    examTips: [
      "Gustafson formula: N - (N-1)×S. Simple to apply.",
      "Gustafson gives HIGHER speedup than Amdahl for same N and S because problem grows.",
    ],
    questions: [
      { q: "What is the key conceptual difference between Amdahl's Law and Gustafson's Law?", a: "Amdahl's Law assumes a FIXED problem size — parallelism has a ceiling because the serial section is a constant overhead. Gustafson's Law assumes the problem SIZE SCALES with the number of processors — as you add CPUs, you tackle a larger problem. The serial section stays constant but the parallel portion grows, giving near-linear speedup scaling. Gustafson is more optimistic and more realistic for scientific workloads." },
    ],
  },

  "gustafsons-examples": {
    title: "Gustafson's Law — Examples & Comparison", emoji: "🔢",
    tldr: "S=0.1, N=16: Scaled Speedup=14.5. Compare with Amdahl: Gustafson gives 19.05 vs Amdahl's 10.25 for 5% serial, 20 processors.",
    explanation: `Numerical examples for Gustafson's Law and comparison with Amdahl's.

Example 1: S = 0.1 (10% serial), N = 16 processors.
Scaled Speedup = 16 − (16-1) × 0.1 = 16 − 15 × 0.1 = 16 − 1.5 = 14.5×

Example 2 — Direct Comparison: Code with 5% serial section (S = 0.05), 20 processors (N = 20).
- Gustafson: Scaled Speedup = 20 − (20-1) × 0.05 = 20 − 0.95 = 19.05×
- Amdahl: Speedup = 1 / (0.05 + 0.95/20) = 1 / (0.05 + 0.0475) = 1/0.0975 ≈ 10.25×

Gustafson gives 19.05× vs. Amdahl's 10.25× for the same serial fraction and processor count. Huge difference! The reason: Gustafson allows the parallel work to scale up with N, while Amdahl keeps it fixed.

Driving metaphor — Amdahl: "A car can't average 90 mph if it already spent 1 hour going 30 mph for half the distance." Fixed distance = fixed code.
Driving metaphor — Gustafson: "If a car drives long enough, it can achieve any average speed — just drive faster for longer." Variable distance = scalable problem.`,
    keyPoints: [
      "Example 1: S=0.1, N=16 → Scaled Speedup = 16 - 15×0.1 = 14.5",
      "Comparison: S=0.05, N=20 → Gustafson = 19.05, Amdahl = 10.25",
      "Gustafson nearly doubles Amdahl's estimate for the same parameters",
      "Driving metaphor — Amdahl: fixed route, 1st half already done slow → can't fix average",
      "Driving metaphor — Gustafson: add more distance/road → can bring up average",
      "Graph: Gustafson = straight line (linear). Amdahl = concave curve (diminishing returns).",
    ],
    formula: {
      code: `Direct Comparison (S=0.05, N=20):
  Gustafson: 20 - (20-1)×0.05 = 20 - 0.95 = 19.05
  Amdahl:    1/(0.05 + 0.95/20) = 1/0.0975 = 10.26

  Ratio: Gustafson/Amdahl ≈ 1.86× difference!

Example 1: S=0.1, N=16
  Scaled Speedup = 16 - 15×0.1 = 16 - 1.5 = 14.5

Floor analogy (S=0.1):
  N=1: baseline
  N=2: 2 - 1×0.1 = 1.9 (near 2×)
  N=4: 4 - 3×0.1 = 3.7 (near 4×)
  N=10: 10 - 9×0.1 = 9.1 (near 10×)`,
      explanation: "The floor analogy shows near-linear scaling: 4 workers on 4 floors gets nearly 4× the throughput of 1 worker on 1 floor, despite 10% serial overhead. This is why real HPC applications scale well — the problem grows with the resources.",
    },
    examTips: [
      "Always know both formulas for exam. Amdahl: 1/[(1-F)+F/N]. Gustafson: N-(N-1)×S.",
      "For direct comparison: Gustafson always gives higher speedup for the same N and serial fraction.",
    ],
    questions: [],
  },

  "amdahl-vs-gustafson": {
    title: "Amdahl vs. Gustafson — Summary", emoji: "⚔️",
    tldr: "Amdahl: fixed problem, pessimistic ceiling. Gustafson: scalable problem, near-linear optimistic speedup. Both useful depending on context.",
    explanation: `The fundamental contrast between Amdahl's and Gustafson's laws:

Amdahl's Law: Assumes fixed problem size. Increasing processors helps diminishingly — you hit a ceiling. Speedup = 1/[(1-F)+F/N]. The serial section is a constant bottleneck that no amount of processors can overcome. Used for: analyzing fixed-size tasks where the problem doesn't grow.

Gustafson's Law: Assumes problem size grows with processors. Adding processors → tackle bigger problem → serial fraction stays constant → near-linear speedup. Speedup = N - (N-1)×S. More optimistic and more realistic for scientific computing. Used for: scalable scientific problems where finer resolution or more data is always useful.

Graph: plot Speedup vs. Parallel Fraction (0 to 1.0). Amdahl = concave curve, barely rises until close to 100% parallel, then shoots up. Gustafson = straight diagonal line from (0,1) to (1,30). At 90% parallel fraction: Amdahl ≈ 8×, Gustafson (N=30) ≈ 27×.

Neither law is "right" — they model different scenarios. Amdahl is appropriate for fixed-size tasks (e.g., a database query on a fixed dataset). Gustafson is appropriate for scientific simulations where you always want higher resolution given more resources.`,
    keyPoints: [
      "Amdahl: fixed problem size → ceiling. Formula: 1/[(1-F)+F/N]",
      "Gustafson: scalable problem size → near-linear. Formula: N-(N-1)×S",
      "Same serial fraction: Gustafson always gives higher speedup",
      "Amdahl: concave curve on speedup graph. Gustafson: straight diagonal line.",
      "Amdahl best for fixed-size analysis. Gustafson best for scalable scientific workloads.",
      "Both laws ignore communication overhead — real speedup is even lower than either predicts",
      "Gustafson is an 'observed phenomenon,' not a theorem",
    ],
    formula: null,
    examTips: [
      "Know BOTH formulas. Gustafson gives HIGHER speedup for same parameters.",
      "Amdahl = pessimistic but accurate for fixed size. Gustafson = optimistic but valid for scaling.",
    ],
    questions: [],
  },

  "three-walls": {
    title: "The Three Walls — Why Multi-Core?", emoji: "🧱",
    tldr: "Power Wall (heat limit), Memory Wall (latency gap), ILP Wall (data dependencies). Together forced the shift from single-core to multi-core.",
    explanation: `Single-core processor design hit three fundamental physical and architectural limits around 2003–2005, forcing the shift to multi-core.

The Power Wall: Clock speed increases require transistors to switch faster, which generates more heat. The ability to dissipate heat from a chip reached its physical limit around 4–5 GHz. Going higher would require cooling solutions too expensive or physically impossible for a consumer chip. The solution: multiple slower cores are more power-efficient than one ultra-fast core.

The Memory Wall: Memory (DRAM) access latency has not improved proportionally to CPU speed. The processor can execute billions of operations per second, but must wait hundreds of nanoseconds for each cache miss to be served from DRAM. Larger caches help but don't eliminate the problem. Cache misses become increasingly costly as CPU speeds rise.

The ILP Wall: Instruction-Level Parallelism is limited because instructions depend on each other (data dependencies). The hardware can look ahead in the instruction stream ("instruction window") to find independent instructions, but beyond a certain window size, the hardware cost is prohibitive. Data dependencies prevent most real programs from having more than ~4–6 independent instructions available at any moment.

These three walls together made it impossible to continue improving single-core performance at the historical rate. Adding more cores was the viable path forward.`,
    keyPoints: [
      "Power Wall: faster clock = more heat = cooling impossible beyond ~5 GHz. Physical limit.",
      "Memory Wall: memory latency doesn't scale with CPU speed. Cache misses dominate stall time.",
      "ILP Wall: data dependencies limit instruction-level parallelism. Instruction window size bounded.",
      "All three walls hit around 2003–2005 → transition to multi-core",
      "Multi-core solution: multiple slower (more power-efficient) cores instead of one fast hot core",
      "Consequence: programmers must write parallel code to benefit from modern hardware",
    ],
    formula: null,
    examTips: [
      "Three walls: Power (heat), Memory (latency), ILP (dependencies). All three together caused the shift.",
      "Primary reason for shift to multi-core: limitations due to power, memory, and ILP walls.",
    ],
    questions: [
      { q: "What are the three walls that forced the transition from single-core to multi-core processors?", a: "Power Wall: faster clocks generate too much heat — physical cooling limits capped clock speeds at ~5 GHz. Memory Wall: DRAM latency doesn't improve with CPU speed — cache misses stall the processor hundreds of cycles. ILP Wall: data dependencies in programs limit how many instructions can run in parallel — instruction windows can only be so large before hardware cost becomes prohibitive." },
    ],
  },

  "multicore-resource": {
    title: "Multi-Core Resource vs. Power Tradeoffs", emoji: "⚖️",
    tldr: "Fixed chip area (P=16): unicore (1 big), 4-core (4 medium), 16-core (16 tiny), or heterogeneous (1 big + 12 small). Heterogeneous is most efficient.",
    explanation: `Given a fixed total amount of chip resources (P = total transistors/area), how do you allocate them?

Unicore Processor: One large core using all P=16 resources. Maximum single-thread performance. But all resources or nothing — if the workload is parallel, all the extra power spent on the big core goes to waste.

Processor A (4 cores × R=4): Four medium-sized cores, each with R=4 resources. Good balance — handles both sequential (one core going fast) and parallel (4 cores simultaneously) workloads.

Processor B (16 cores × R=1): Sixteen tiny cores, each with R=1 resource. Maximum parallelism, minimum per-core performance. Like a GPU — great for embarrassingly parallel tasks, terrible for sequential logic.

Processor C (Heterogeneous: 1 large (R=4) + 12 small (R=1)): One core for demanding sequential tasks (R=4 for good single-thread performance) plus 12 small efficient cores for parallel tasks (R=1 each, total resources = 4 + 12 = 16). This is the most power-efficient and practical design — matches workload to core type.

Key variables: P = total processing resources. R = resources per core.

This is exactly the ARM big.LITTLE architecture and Intel's hybrid (Performance + Efficiency core) design.`,
    keyPoints: [
      "Fixed total resources P — how to allocate across cores?",
      "Unicore: max single-thread speed but wastes parallel capacity",
      "Many tiny cores: max parallelism, bad sequential performance (GPU-like)",
      "Heterogeneous (1 big + 12 small): most practical — big core for serial, small cores for parallel",
      "ARM big.LITTLE: exactly this pattern — big Cortex-A for demanding tasks, small Cortex-M for background",
      "Intel hybrid: Performance cores + Efficiency cores (same principle)",
      "Total resources = sum of all core resources (4×4 = 16, 1×4 + 12×1 = 16)",
    ],
    formula: {
      code: `Resource allocation for P=16 total resources:
  Unicore:          [ R=16 core ]
  4-core (A):       [ R=4 ] [ R=4 ] [ R=4 ] [ R=4 ]
  16-core (B):      16× [ R=1 ] (GPU-like)
  Heterogeneous (C): [ R=4 ] + 12× [ R=1 ] = 4 + 12 = 16

  C is best because:
    - Big core handles serial code fast
    - 12 small cores handle parallel bulk cheaply
    - Total power/area budget unchanged`,
      explanation: "This is why modern mobile chips (Apple M-series, Qualcomm Snapdragon, ARM Cortex) all use heterogeneous designs: different core types handle different task types efficiently.",
    },
    examTips: [
      "Heterogeneous = one big core for serial + many small cores for parallel = most efficient.",
      "Homogeneous = all identical cores. Heterogeneous = different core types with different ISA or resources.",
    ],
    questions: [],
  },

  "homogeneous-mc": {
    title: "Homogeneous vs. Heterogeneous Multi-Core", emoji: "🔲",
    tldr: "Homogeneous: all identical cores, same ISA. Heterogeneous: different core types, possibly different ISAs. Heterogeneous is more power-efficient.",
    explanation: `Homogeneous Multi-Core: all cores are identical and support the same Instruction Set Architecture (ISA). Every core is a complete copy. Simple to program — any thread can run on any core. Examples: early Intel Core Duo, AMD Phenom, MPC8641. OS scheduler can freely move threads between cores.

Heterogeneous Multi-Core: cores are not identical — they support different ISAs or have different capabilities and sizes. Why? Most efficient processors are heterogeneous because different task types benefit from different core designs. Power efficient (Green Computing): simple background tasks run on tiny low-power cores; demanding tasks run on powerful cores.

Intel Core M SoC example: chip die shows two distinct regions. Left: Intel Graphics Gen8 (GPU compute, 24 Execution Units). Right: 2 CPU cores + System Agent + Shared LLC. Different architectures on the same chip.

ARM heterogeneous (big.LITTLE): CPU side has 2× Cortex-A7 (application cores, full OS). Microcontroller side has Cortex-M4 (RTOS, real-time, power-efficient). The combination = AMP (Asymmetric Multi-Processing). Very common in smartphones.

Supercomputers today: virtually ALL use heterogeneous designs (CPU + GPU accelerators), as shown by the Top500 list where the top systems all combine CPUs with NVIDIA or AMD GPUs.`,
    keyPoints: [
      "Homogeneous: all cores identical, same ISA. Easy to schedule. Examples: Intel Core Duo, Phenom.",
      "Heterogeneous: different core types, possibly different ISAs. More complex scheduling.",
      "Heterogeneous advantage: each task type runs on the most efficient core for it",
      "Intel Core M: CPU cores + GPU Execution Units on same chip",
      "ARM big.LITTLE: Cortex-A (big, powerful) + Cortex-M (small, power-efficient) = AMP",
      "All modern supercomputers are heterogeneous (CPU + GPU nodes)",
      "AMP = Asymmetric Multi-Processing. SMP = Symmetric (homogeneous, shared OS).",
    ],
    formula: null,
    examTips: [
      "Homogeneous = identical cores. Heterogeneous = different core types. Heterogeneous = more power efficient.",
      "ARM big.LITTLE, Intel hybrid = heterogeneous. Old Intel Core Duo = homogeneous.",
    ],
    questions: [],
  },

  "arm-heterogeneous": {
    title: "Heterogeneous ARM & SoC Design", emoji: "📱",
    tldr: "ARM big.LITTLE: powerful Cortex-A cores + efficient Cortex-M cores on same chip. AMP = different OS/RTOS on different cores. Common in smartphones.",
    explanation: `ARM processors in smartphones are the most widespread heterogeneous multi-core design in the world.

ARM big.LITTLE architecture: two types of cores on one chip:
- Big cores (e.g., Cortex-A7, Cortex-A55, Cortex-A77): high performance, high power consumption. Run the main OS (Linux/Android), apps, browser rendering.
- Little cores (e.g., Cortex-M4, Cortex-M33): very low power, lower performance. Run RTOS for real-time tasks (sensor monitoring, always-on voice detection, notifications).

AMP (Asymmetric Multi-Processing): the big and little cores run different operating systems simultaneously. Big cores run Linux/Android; little cores run an RTOS. They communicate via shared memory regions.

Combined design: 2× Cortex-A7 running SMP (both share OS1) + 1× Cortex-M4 running RTOS. The A7 pair is homogeneous internally (SMP), but the A7 + M4 combination is heterogeneous overall (AMP).

Modern examples: Apple A-series (Firestorm + Icestorm cores), Qualcomm Snapdragon (Prime + Gold + Silver + Silver Efficiency clusters), MediaTek Dimensity — all use variants of this heterogeneous multi-core approach.`,
    keyPoints: [
      "ARM big.LITTLE: high-performance Cortex-A cores + low-power Cortex-M cores",
      "AMP (Asymmetric Multi-Processing): different cores run different operating systems simultaneously",
      "Big cores: full OS (Linux/Android), demanding apps, browser.",
      "Little cores: RTOS, sensor processing, always-on voice, low-power background tasks",
      "Combination achieves both high peak performance and excellent battery life",
      "Example: 2× Cortex-A7 (SMP for main OS) + 1× Cortex-M4 (RTOS for real-time)",
      "Apple M-series, Qualcomm Snapdragon = modern heterogeneous designs following same principle",
    ],
    formula: null,
    examTips: [
      "AMP = Asymmetric = different cores run different OS. SMP = Symmetric = same OS on identical cores.",
    ],
    questions: [],
  },

  "multicore-os": {
    title: "OS, Memory, and Multi-Core Roles", emoji: "🖥️",
    tldr: "OS sees each core as a separate processor. Programmer must create threads/processes. Memory on-chip (fast) vs. off-chip (slow). Cache coherence needed.",
    explanation: `Role of the OS: The OS perceives each core as an independent processor. The OS scheduler maps threads and processes to different cores — but only if the program creates multiple threads/processes. The OS will not automatically parallelize a single-threaded program.

Major OSes supporting multi-core: Linux, Windows, macOS — all recognize and schedule across multiple cores.

Role of the programmer: Must explicitly use threads or processes. Must design parallel algorithms and spread workload across cores. The OS maps them to cores, but the programmer must create the parallelism.

Memory in multi-core systems:
- On-chip cache: must be placed on-chip to provide low latency. Caches are fast but occupy chip area and consume power.
- Off-chip DRAM: slow (100+ ns access), but large. Shared bandwidth = contention when many cores access simultaneously.

Cache Coherence: when multiple cores each cache the same memory location, all copies must stay consistent. Hardware cache coherence protocols (like MESI protocol) ensure that when Core 1 writes to a value, Core 2's cached copy is invalidated or updated. This is the "coherence miss" from Unit 3's Three C's.

False Sharing: two cores write to different variables that happen to be in the same cache line. Core 1 writes to variable A, Core 2 writes to variable B. Even though they're not using each other's data, the cache line bounces between cores on every write — "cache line interference." Fix: pad variables to separate cache lines.`,
    keyPoints: [
      "OS treats each core as a separate processor — OS scheduler maps threads to cores",
      "Programmer must create threads/processes for OS to schedule across cores",
      "On-chip cache: must be on-chip for speed. Trade-off: area and power consumption.",
      "Memory bandwidth shared: high parallelism can cause memory contention",
      "Cache Coherence: when multiple cores cache same location, all copies must stay consistent",
      "False Sharing: two cores write different variables in same cache line → unnecessary invalidations",
      "Fix for false sharing: pad variables or align them to separate cache lines",
    ],
    formula: null,
    examTips: [
      "False sharing: independent variables in same cache line → unnecessary coherence traffic. Solution: pad to separate lines.",
      "Cache coherence: multi-core write invalidates other cores' copies of same cache line.",
    ],
    questions: [
      { q: "What is false sharing in multi-core systems and why is it a problem?", a: "False sharing occurs when two or more processor cores write to different variables that happen to reside in the same cache line. Although the cores are working on independent data, every time one core writes to its variable, the entire cache line is invalidated in all other caches (cache coherence protocol), even though the other cores' variables weren't changed. This causes constant cache-line bouncing between cores, creating unnecessary bus traffic and stalls — a performance penalty despite no logical data sharing." },
    ],
  },

  "false-sharing": {
    title: "False Sharing — Detailed", emoji: "🔴",
    tldr: "Core 1 writes variable A. Core 2 writes variable B. A and B are in the same 64-byte cache line → every write invalidates the other core's cache line unnecessarily.",
    explanation: `False sharing is a subtle but important performance issue in multi-core programming.

The scenario: Core 1 has variable A (at address 0x1000). Core 2 has variable B (at address 0x1004). These are completely different variables — no logical sharing. But modern processors use 64-byte cache lines. If A and B are within 64 bytes of each other (which they often are if they're declared adjacent in a struct or array), they share the same cache line.

What happens:
1. Core 1 loads the cache line containing A and B. Core 2 also loads the same cache line.
2. Core 1 writes to A → cache coherence protocol invalidates the cache line in Core 2's cache.
3. Core 2 needs to write to B → must reload the cache line from memory (or from Core 1's cache).
4. Core 2 writes to B → invalidates Core 1's cache line.
5. This bouncing repeats every time either core writes anything.

The problem: neither core is actually using the other's data, but the cache coherence hardware doesn't know that — it only sees that they're sharing a cache line. Result: performance similar to a single-core system, sometimes worse.

Fix: pad the struct so A and B are in different cache lines (pad to 64 bytes). Or use thread-local variables. Or restructure data to avoid the adjacency.`,
    keyPoints: [
      "False sharing: independent variables in same 64-byte cache line → coherence overhead",
      "Core 1 writes A → invalidates cache line in Core 2 (even though Core 2 only uses B)",
      "Cache line bounces between cores on every write by either core",
      "Result: massive coherence traffic, performance collapse on parallel workloads",
      "Fix: pad structs so each thread's data occupies its own cache line",
      "Also called 'CPU cache line interference'",
      "Example: int A; int B; declared adjacent in a struct — likely same cache line",
    ],
    formula: {
      code: `// FALSE SHARING (BAD):
struct {
    int counterA;  // Core 1 writes this
    int counterB;  // Core 2 writes this
} data;
// counterA and counterB are 4 bytes each → adjacent → same 64-byte cache line!

// FIX — PAD TO SEPARATE CACHE LINES:
struct {
    int counterA;
    char padding[60];  // pad to 64 bytes total
} dataA;

struct {
    int counterB;
    char padding[60];
} dataB;
// Now counterA and counterB are in different cache lines → no false sharing`,
      explanation: "The padding ensures each counter occupies a full 64-byte cache line by itself. Core 1 can write to dataA.counterA and Core 2 can write to dataB.counterB without affecting each other's cache lines.",
    },
    examTips: [
      "False sharing = different variables, same cache line → unnecessary invalidations.",
      "Solution: pad variables to align on 64-byte boundaries (typical cache line size).",
    ],
    questions: [],
  },

  "openmp-intro": {
    title: "OpenMP — Introduction", emoji: "🧵",
    tldr: "OpenMP = shared-memory multi-threading API for C/C++/Fortran. Uses #pragma omp directives. Fork-join model. Threads share global variables.",
    explanation: `OpenMP (Open Multi-Processing) is the standard API for parallel programming on shared-memory multi-core CPUs. It allows adding parallelism to C, C++, and Fortran programs using simple compiler directives.

Key features: Uses #pragma omp ... directives — just add a line before a parallel section and the compiler generates the threading code automatically. Supports shared-memory parallelism — all threads share global variables. Constructs available for loops, tasks, and synchronization. Works on any multicore CPU.

Fork-Join model: The main thread is the "master thread." When it hits a #pragma omp parallel region, it "forks" N worker threads. All N threads execute the parallel region simultaneously. When they're done, they all "join" back to the single master thread. Then the master continues alone until the next parallel region.

Thread communication: OpenMP threads communicate by sharing variables. Shared variables are visible to all threads. Private variables exist only within a single thread (each thread gets its own copy).

Race conditions: when two threads read and write the same shared variable simultaneously, the result depends on timing (non-deterministic). Fix: use synchronization (critical sections, atomic operations, reductions).`,
    keyPoints: [
      "OpenMP: API for shared-memory parallelism in C, C++, Fortran",
      "#pragma omp directives added to existing code — minimal code change needed",
      "Fork-Join model: master thread forks N workers at parallel region, joins after",
      "Threads share global/static variables. Local variables are private to each thread.",
      "Race condition: two threads read+write same variable simultaneously → wrong result",
      "Fix race conditions with: #pragma omp critical, atomic, reduction clause",
      "Compile with: gcc -fopenmp file.c. Set threads: export OMP_NUM_THREADS=4",
      "omp_get_thread_num() returns thread's ID (0 to N-1)",
    ],
    formula: null,
    examTips: [
      "OpenMP = shared memory, one machine, multi-core. For multi-node, use MPI.",
      "Race condition = shared variable + concurrent access + at least one write = wrong result.",
    ],
    questions: [],
  },

  "openmp-setup": {
    title: "Setting Up & Compiling OpenMP", emoji: "🔧",
    tldr: "Linux: gcc -fopenmp file.c then export OMP_NUM_THREADS=4. macOS: need LLVM from Homebrew (default clang doesn't support OpenMP).",
    explanation: `Getting OpenMP running depends on your platform.

Linux (Ubuntu): GCC includes OpenMP support by default. Just add -fopenmp flag when compiling. Set the number of threads as an environment variable before running.

Commands:
- gcc -fopenmp your_program.c → compiles with OpenMP enabled
- export OMP_NUM_THREADS=4 → tells OpenMP to use 4 threads
- ./a.out → run the compiled program

macOS: Apple's default Clang compiler does NOT support OpenMP. You need to install LLVM via Homebrew:
- brew install llvm
- /opt/homebrew/opt/llvm/bin/clang -fopenmp program.c → compile with LLVM Clang
- Note: Students on Windows should use Ubuntu/WSL for OpenMP.

Verification: compile and run the hello world program (#pragma omp parallel with omp_get_thread_num()) — you should see multiple thread IDs printed in non-deterministic order.`,
    keyPoints: [
      "Linux: gcc -fopenmp file.c → OMP_NUM_THREADS=N → ./a.out",
      "macOS: default Clang has no OpenMP → install LLVM via Homebrew",
      "OMP_NUM_THREADS environment variable controls number of threads",
      "omp_get_thread_num() returns 0 to N-1 thread IDs",
      "#include <omp.h> for the OpenMP runtime functions",
      "Output order of threads is non-deterministic — depends on scheduler",
    ],
    formula: {
      code: `// Verification Hello World:
#include <stdio.h>
#include <omp.h>

int main() {
    #pragma omp parallel
    {
        printf("Hello from thread %d\\n", omp_get_thread_num());
    }
    return 0;
}

// Compile and run:
// gcc -fopenmp hello.c
// export OMP_NUM_THREADS=4
// ./a.out
// Output (non-deterministic order):
// Hello from thread 2
// Hello from thread 0
// Hello from thread 3
// Hello from thread 1`,
      explanation: "The non-deterministic output order is expected and correct — threads run in parallel and print in whatever order the OS schedules them. This is a fundamental property of parallel programs.",
    },
    examTips: [
      "Compile flag: -fopenmp. Environment variable: OMP_NUM_THREADS.",
      "Output order is non-deterministic in parallel programs — this is correct behavior, not a bug.",
    ],
    questions: [],
  },

  "openmp-hello": {
    title: "OpenMP Hello World — Race Conditions", emoji: "👋",
    tldr: "Threads share variables. Unintended sharing → race conditions. Synchronisation prevents them but adds overhead.",
    explanation: `The OpenMP Hello World program demonstrates the fork-join model and introduces the key concept of race conditions.

The program: #pragma omp parallel creates a parallel region. Multiple threads enter the block simultaneously. Each calls omp_get_thread_num() to get its ID, then prints two messages. The ID returned is unique to each thread (0, 1, 2, ..., N-1).

Key concept — Race Condition: OpenMP uses a shared-address model — threads communicate by sharing variables. If two threads read AND write the same variable simultaneously without synchronization, the result depends on the execution order (non-deterministic). This is a race condition.

Example: if variable counter is shared and two threads both do counter += 1 simultaneously, both might read the same value of counter, both add 1, and both write back — final value is counter+1 instead of counter+2. One increment is lost.

Fix: use synchronization (critical sections, atomic operations) to ensure only one thread modifies the variable at a time. But: synchronization is expensive — serialize execution. Minimize synchronization by restructuring data access.

Best practice: minimize shared state. Use private variables wherever possible. Only synchronize what must be synchronized.`,
    keyPoints: [
      "Fork-join model: master forks at parallel region, all threads execute, join at end",
      "omp_get_thread_num() returns thread ID 0 to N-1",
      "Shared-address model: threads share global variables → potential race conditions",
      "Race condition: two threads read+write same variable simultaneously → wrong result",
      "Fix: #pragma omp critical (mutex), atomic, or reduction clause",
      "Synchronisation is expensive — minimise it",
      "Output order is non-deterministic — this is normal and expected",
    ],
    formula: {
      code: `// OpenMP Hello World:
#include <stdio.h>
#include <omp.h>

int main() {
    #pragma omp parallel   // Fork: create parallel region
    {
        int ID = omp_get_thread_num();  // Private to each thread
        printf("hello(%d)", ID);
        printf("world(%d)\\n", ID);
    }                      // Join: all threads return to master
}

// Race condition example (DON'T do this):
int counter = 0;
#pragma omp parallel
{
    counter += 1;  // Race! Two threads might both read counter=5,
                   // both compute 6, both write 6 → final = 6, not 7
}`,
      explanation: "The race condition happens because counter += 1 is three operations: read → modify → write. Another thread can interleave between any of these steps, producing wrong results.",
    },
    examTips: [
      "Race condition: shared variable + at least one write + concurrent access = non-deterministic result.",
      "Fix with: #pragma omp critical, #pragma omp atomic, or reduction(+:var) clause.",
    ],
    questions: [],
  },

  "openmp-matrix": {
    title: "OpenMP — Parallel Matrix Addition", emoji: "🔢",
    tldr: "collapse(2) combines nested i and j loops into one big parallel loop. Each thread handles different matrix elements simultaneously.",
    explanation: `Matrix addition is a perfect example for OpenMP loop parallelisation.

The operation: for each element (i,j), C[i][j] = A[i][j] + B[i][j]. Each element is completely independent — element (0,0) doesn't depend on (0,1) or (1,0). Perfect for parallelism.

Using #pragma omp parallel for collapse(2): the parallel for directive tells OpenMP to distribute the loop iterations among threads. Without collapse, only the outer loop (i) is parallelised — with N=3, at most 3 iterations. With collapse(2), both nested loops are merged into one loop of N×N = 9 iterations, giving more work to distribute.

collapse(2) effectively transforms:
for(i=0; i<3; i++) for(j=0; j<3; j++) into a single loop of 9 iterations, which OpenMP distributes among threads.

Result: if 4 threads and 9 iterations, threads get approximately 2-3 iterations each. All compute their elements simultaneously. The result matrix C is filled in parallel.

Expected output: all 10s because A+B = {1+9, 2+8, 3+7, ...} = {10, 10, 10, ...}.`,
    keyPoints: [
      "#pragma omp parallel for: parallelise a for loop across threads",
      "collapse(2): merge two nested loops into one bigger parallel loop",
      "Without collapse: only outer loop parallelised (N iterations max for N rows)",
      "With collapse(2): N×N iterations distributed — better load balancing for small N",
      "Each thread computes different C[i][j] elements independently",
      "No shared write conflicts: each thread writes to a different array element",
      "No critical section needed: each C[i][j] is written by exactly one thread",
    ],
    formula: {
      code: `#include <stdio.h>
#include <omp.h>
#define N 3

int main() {
    int A[N][N] = {{1,2,3},{4,5,6},{7,8,9}};
    int B[N][N] = {{9,8,7},{6,5,4},{3,2,1}};
    int C[N][N];

    #pragma omp parallel for collapse(2)  // Parallelise both loops
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }
    // Print C...  // Output: all 10s
}

// collapse(2) equivalent to:
// for k = 0 to N*N-1:  {i=k/N, j=k%N}
//   C[i][j] = A[i][j] + B[i][j]`,
      explanation: "Without collapse on a 3×3 matrix, only 3 iterations of the outer loop are parallelised. With collapse(2), there are 9 iterations, giving OpenMP more flexibility to assign work to all threads.",
    },
    examTips: [
      "collapse(n): merges n nested loops into one for better parallelism. collapse(2) = merge 2 loops.",
      "Parallel for: OK when iterations are independent (no data dependency between iterations).",
    ],
    questions: [],
  },

  "openmp-shared": {
    title: "OpenMP — Shared Variables & Critical Sections", emoji: "🔒",
    tldr: "shared(var): all threads see same variable. #pragma omp critical: only one thread enters this block at a time. Prevents race conditions on shared counters.",
    explanation: `Managing shared variables correctly is one of the most important aspects of OpenMP programming.

The problem: multiple threads incrementing a shared counter. Without protection:
- Thread 0 reads sharedVar = 0
- Thread 1 reads sharedVar = 0 (same time!)
- Thread 0 computes 0+1 = 1
- Thread 1 computes 0+1 = 1
- Thread 0 writes sharedVar = 1
- Thread 1 writes sharedVar = 1
- Final value: 1 instead of 2! One increment lost.

The fix — #pragma omp critical: creates a mutual exclusion zone. Only one thread can be inside a critical section at a time. Other threads wait outside until the current thread exits.

With critical: Thread 0 enters critical → increments sharedVar to 1 → exits. Thread 1 enters critical → increments sharedVar to 2 → exits. Correct result!

shared(sharedVar) clause: explicitly declares the variable as shared across all threads. Without this clause, OpenMP might make it private (a copy per thread). Being explicit is good practice.

Tradeoff: critical sections serialize that portion of code — all threads wait for turns. For a counter, this is necessary. For large computations, try to minimize what's in the critical section.`,
    keyPoints: [
      "shared(var): declares variable shared across all threads (all see same memory location)",
      "#pragma omp critical: at most one thread executes this block at a time (mutex)",
      "Without critical: race condition → lost updates → wrong final value",
      "With critical: increments are serialized → correct but slower (serialized that section)",
      "Final value of sharedVar = number of threads (each incremented once, correctly)",
      "Critical sections should be as small as possible — serialize only what's necessary",
    ],
    formula: {
      code: `#include <stdio.h>
#include <omp.h>

int main() {
    int sharedVar = 0;

    #pragma omp parallel shared(sharedVar)
    {
        #pragma omp critical    // Only 1 thread here at a time
        sharedVar += 1;         // Atomic increment (protected)
    }

    printf("Final sharedVar: %d\\n", sharedVar);  // = num threads
    return 0;
}

// WITHOUT critical (WRONG):
// All threads read 0 at same time → all write 1 → final = 1 (wrong!)

// WITH critical (CORRECT):
// Thread 0: read 0, +1=1, write 1. Thread 1: read 1, +1=2, write 2.
// Final = number of threads ✓`,
      explanation: "The critical section ensures atomic read-modify-write for the counter. For simple integer increments, #pragma omp atomic is slightly more efficient than critical. For complex multi-statement updates, critical is needed.",
    },
    examTips: [
      "#pragma omp critical = mutex. One thread at a time. Prevents race conditions.",
      "shared(x) = all threads share same variable x. private(x) = each thread gets its own copy.",
    ],
    questions: [],
  },

  "openmp-single": {
    title: "OpenMP — Private Variables & #pragma omp single", emoji: "1️⃣",
    tldr: "#pragma omp single: only the FIRST thread to arrive executes this block. Others wait. Function parameters are private by default in each thread.",
    explanation: `Two important OpenMP concepts: single directive and function parameter privateness.

Function parameters as private variables: when a function is called inside a parallel region (or called with #pragma omp parallel wrapping), each thread executes the function independently. Function parameters (like 'a' and 'b') are local to each thread's stack — they're automatically private. Each thread gets its own copy of a and b.

#pragma omp single: only the first thread to reach this directive executes the block. All other threads skip the block and wait at an implicit barrier at the end of the single region. This is useful for operations that must happen exactly once but are inside a parallel region — like initializing a shared result, printing a message, or making an assignment that all threads will then use.

Difference from critical: critical = all threads take turns executing the block (N executions). single = only one thread executes the block (exactly 1 execution), others skip.

In the example: multiple threads call add(). #pragma omp single ensures *result = a + b happens exactly once. result is a shared pointer so the main function's sum variable gets updated. Final output: Sum = 15 (5 + 10), computed by exactly one thread.`,
    keyPoints: [
      "Function parameters (a, b): private to each thread — each thread has its own copy on its stack",
      "#pragma omp single: only the first thread to arrive executes this block (exactly once)",
      "Other threads at single: skip the block and wait at the implicit barrier",
      "critical: all N threads execute (one at a time). single: exactly 1 thread executes.",
      "result pointer: shared — all threads can see and modify what it points to",
      "Useful for: printing once, initializing a shared value, exactly-once side effects",
    ],
    formula: {
      code: `#include <stdio.h>
#include <omp.h>

void add(int a, int b, int *result) {
    #pragma omp parallel
    {
        #pragma omp single           // Only first thread executes
        *result = a + b;             // a, b are private (func params)
                                     // *result is shared (via pointer)
    }
}

int main() {
    int x=5, y=10, sum=0;
    add(x, y, &sum);
    printf("Sum: %d\\n", sum);  // Output: Sum: 15
    return 0;
}

// Critical vs. Single:
// critical: all threads execute (serialized), N total executions
// single:   one thread executes, others wait, exactly 1 execution`,
      explanation: "The single directive is needed here because *result = a + b should only happen once. Without single, all N threads would write to *result simultaneously — no race condition (same value) but wasteful and potentially confusing.",
    },
    examTips: [
      "#pragma omp single: exactly 1 execution (first thread). #pragma omp critical: N executions (serialized).",
      "Function parameters = automatically private (each thread's stack copy).",
    ],
    questions: [],
  },

  "het-evolution": {
    title: "Evolution of Microprocessors & Heterogeneous Computing", emoji: "📈",
    tldr: "CPUs improved for 20+ years (GFLOPS→TFLOPS). Post-2003: heat/power limits stalled single-core. Multi-core + GPU = heterogeneous era.",
    explanation: `For 20+ years, CPU performance grew driven by: higher clock frequencies, better pipelines, smarter branch prediction, larger caches. Desktop CPUs reached GFLOPS; data centers reached TFLOPS.

Post-2003 power/heat crisis: continued clock frequency increases became thermally and electrically impractical. The Dennard Scaling that enabled frequency increases without power increases broke down. Single-core performance stagnation.

Shift to multi-core (2005–2010): Intel and AMD launched dual-core, quad-core CPUs. Performance now came from thread-level parallelism, not single-thread speed. The burden moved to software: programs must be explicitly parallel.

The concurrency revolution: every developer writing performance-critical code must now understand parallel programming. Serial code no longer automatically benefits from new hardware generations.

Heterogeneous computing (2007+): NVIDIA launched CUDA in 2007, enabling GPUs to be used for general-purpose computation (GPGPU). By combining CPUs (excellent for serial tasks, complex control flow, OS operations) with GPUs (excellent for massively parallel data processing), performance could be increased dramatically for suitable workloads.

Today: every top supercomputer uses CPU+GPU. Every smartphone has a heterogeneous SoC (CPU + GPU + NPU + DSP). Heterogeneous computing is the norm.`,
    keyPoints: [
      "Early CPUs: 20+ years of frequency scaling → GFLOPS at desktop, TFLOPS at datacenter",
      "Post-2003: heat/power limits ended frequency scaling (Dennard Scaling breakdown)",
      "Multi-core era: performance through more cores, not faster clock",
      "Concurrency revolution: software must be explicitly parallel to benefit from new hardware",
      "CUDA (2007): NVIDIA enables GPU for general-purpose computation (GPGPU)",
      "Heterogeneous: CPU handles serial + control; GPU handles massively parallel data ops",
      "Other frameworks: OpenCL (cross-vendor), OpenACC (directive-based), C++AMP",
    ],
    formula: null,
    examTips: [
      "CUDA launched 2007 (NVIDIA). This enabled CPU+GPU heterogeneous computing.",
      "GFLOPS = 10⁹ FLOP/s. TFLOPS = 10¹². Modern GPUs are TFLOPS range.",
    ],
    questions: [],
  },

  "het-two-approaches": {
    title: "Two Approaches: CPU (Latency) vs. GPU (Throughput)", emoji: "🏎️",
    tldr: "CPU: few powerful cores, big cache, low latency. GPU: thousands of simple cores, high bandwidth, latency-tolerant. CPU = Ferrari. GPU = many trucks.",
    explanation: `Two fundamentally different design philosophies for parallel computing:

Multicore Processors (Latency-Oriented, CPU approach):
- Optimised for sequential execution and low-latency single-task completion.
- Few, very powerful cores (4–64 today for high-end CPUs).
- Large on-chip caches to reduce memory latency.
- Complex out-of-order execution, branch prediction, speculative execution.
- Best for: single-threaded applications, OS operations, complex control flow, tasks where latency matters.
- Example: Intel Core i9, AMD Ryzen 9.

Many-Thread Processors (Throughput-Oriented, GPU approach):
- Optimised for parallel execution and total throughput.
- Thousands of simple cores (NVIDIA Tesla P100: 3584 CUDA cores).
- High memory bandwidth (~10× CPUs) — GDDR6/HBM instead of DDR5.
- Tolerant of high memory latency: while waiting for memory, switch to another thread.
- Best for: massively parallel tasks — matrix multiplication, rendering, simulation, ML training.
- Example: NVIDIA Tesla P100, A100, H100.

Analogy: CPU = one Ferrari (very fast, one trip at a time). GPU = a fleet of trucks (slower each, but moves enormous cargo in parallel). For transporting millions of packages, trucks win. For getting one urgent package delivered fast, the Ferrari wins.`,
    keyPoints: [
      "CPU (latency-oriented): few powerful cores, big cache, low latency, complex control",
      "GPU (throughput-oriented): thousands of simple cores, high bandwidth, latency-tolerant",
      "CPU: best for sequential logic, OS, control flow, branch-heavy code",
      "GPU: best for data-parallel workloads — matrix ops, rendering, simulation, ML",
      "GPU memory bandwidth ~10× CPU (HBM: 900+ GB/s vs. DDR5: ~100 GB/s)",
      "GPU hides latency: switch to another thread while waiting for memory access",
      "Ferrari vs. truck fleet analogy: speed for one vs. throughput for many",
    ],
    formula: null,
    examTips: [
      "Latency-oriented = CPU = low latency per task. Throughput-oriented = GPU = high total throughput.",
      "GPU doesn't reduce latency of a single operation — it runs thousands in parallel simultaneously.",
    ],
    questions: [],
  },

  "cpu-vs-gpu-design": {
    title: "CPU vs. GPU Architecture Philosophy", emoji: "⚔️",
    tldr: "CPU: control-heavy, large cache, out-of-order execution. GPU: more transistors for computation, latency-tolerant via parallelism.",
    explanation: `The fundamental architectural difference between CPU and GPU comes down to what they dedicate silicon to.

CPU design priorities: Complex control logic for out-of-order execution (finds independent instructions at runtime). Large L1/L2/L3 caches to hide memory latency. Branch prediction hardware to speculatively execute. Large register files. Result: a small fraction of transistors actually do arithmetic — most serve control and latency-hiding purposes.

GPU design priorities: Maximize computation (FLOPS). Most transistors go to arithmetic units (ALUs, FPUs, tensor cores). Small caches per core (shared memory matters more). Simple in-order execution — no complex out-of-order engine. Latency tolerance through parallelism: if 1000 threads are running and 100 are waiting for memory, the other 900 keep computing. Latency is "hidden" by thread-switching.

Key table:
- CPU: optimized for low-latency access to cached data. Control logic for OOO/speculative execution.
- GPU: optimized for data-parallel throughput. Architecture tolerant of memory latency. More transistors = more computation.

The GPU's "secret weapon": it doesn't need to hide latency per-thread because it has so many threads. While some threads stall waiting for global memory (100+ cycle latency), other warps run. The massive number of threads keeps the execution units busy.`,
    keyPoints: [
      "CPU: large fraction of die for control (OOO execution, branch prediction, large caches)",
      "GPU: large fraction of die for arithmetic units — maximize FLOPS",
      "CPU hides latency: large caches, OOO execution, prefetch — per-thread technique",
      "GPU hides latency: massive parallelism — while one warp waits, others run",
      "CPU cache: MB range per level. GPU shared memory: KB per SM.",
      "GPU in-order execution per warp. CPU out-of-order execution.",
      "GPU: more transistors → more ALUs → higher peak FLOPS",
    ],
    formula: null,
    examTips: [
      "CPU hides latency through caches and OOO. GPU hides latency through many parallel threads.",
      "More GPU transistors = more compute (not more cache/control).",
    ],
    questions: [],
  },

  "het-analogy": {
    title: "Heterogeneous Computing Analogies", emoji: "🍑",
    tldr: "Restaurant: head chef (CPU) does complex specialty work; line cooks (GPU cores) do repetitive bulk tasks. Peach: serial 'pit' on CPU; parallel 'meat' on GPU.",
    explanation: `Two excellent analogies for understanding heterogeneous CPU+GPU computing.

Restaurant Kitchen Analogy:
- Head Chef = CPU: highly skilled, handles one dish at a time with precision and creativity. Not built for mass production. Controls the kitchen workflow (OS, control flow, complex branching).
- Line Cooks = GPU Cores: each cook handles one repetitive task (chop vegetables, grill chicken, plate salads) simultaneously. Thousands of simple tasks at once — assembly line for food. High throughput but not for specialty dishes.
- Great kitchen: chef handles specialty dishes (serial CPU work) while cooks handle bulk prep (parallel GPU work). This is heterogeneous computing — CPUs handle complex sequential logic, GPUs accelerate parallel tasks.

Peach Analogy:
- Serial "Peach Pit": the inherently sequential portions of code — hard to parallelize, must run on CPU. Input/output, OS calls, complex control flow with data dependencies.
- Parallel "Peach Meat": the data-parallel portions — can be split and run on GPU cores. Matrix operations, pixel processing, physics simulation, neural network layers.
- Today's CUDA GPUs can handle much larger "peach meat" portions than early GPUs (which were limited to graphics only).

Both analogies convey the same message: use each processing type for what it does best.`,
    keyPoints: [
      "CPU = head chef: skilled, sequential, complex decisions, small volume",
      "GPU cores = line cooks: simple, repetitive, many simultaneous, high volume",
      "Peach pit = serial code (CPU). Peach meat = parallel code (GPU).",
      "Heterogeneous computing = using each device for its strength",
      "Not all code can move to GPU — serial sections (pit) must stay on CPU",
      "Early GPUs: only graphics (small meat). CUDA GPUs: general compute (much bigger meat)",
    ],
    formula: null,
    examTips: [
      "CPU = sequential excellence, complex control. GPU = parallel throughput, simple repetitive ops.",
    ],
    questions: [],
  },

  "gpu-architecture-detail": {
    title: "GPU Architecture — CUDA, SMs, and SPs", emoji: "🏗️",
    tldr: "GPU: Streaming Multiprocessors (SMs) contain many Streaming Processors (SPs = CUDA cores). Global GDDR memory. Thread Execution Manager distributes work.",
    explanation: `A CUDA-capable GPU has a hierarchical architecture.

Top-level: The Host (CPU) sends work to the GPU via PCIe. A Thread Execution Manager distributes work to multiple Streaming Multiprocessors (SMs). A Giga Thread engine manages global thread scheduling.

Streaming Multiprocessors (SMs): mini-processors inside the GPU. Each SM contains multiple Streaming Processors (SPs), also called CUDA cores. SMs share resources: instruction cache, control logic, shared memory. Each SM also has its own L1 cache and shared memory (configurable split). More SMs = more parallel processing power.

Streaming Processors (SPs / CUDA cores): the actual execution units that run individual threads. Each SP executes one thread at a time. Thousands of SPs allow GPUs to run thousands of threads simultaneously. More SPs = faster computation.

Memory hierarchy:
- Registers: per-thread, very fast
- Shared Memory: per-SM, shared by all threads in a block (programmer-managed L1)
- L2 Cache: shared across all SMs
- Global Memory (GDDR/HBM): off-chip, high bandwidth (~177 GB/s), accessible by CPU and GPU

Communication:
- CPU ↔ GPU: PCIe Gen3/4 (8–16 GB/s) or NVLink (40 GB/s multi-GPU)
- GPU supports 5000–12,000 threads running in parallel`,
    keyPoints: [
      "GPU = array of SMs. Each SM = array of CUDA cores (SPs).",
      "SM (Streaming Multiprocessor): mini-processor with own control, registers, cache, shared mem",
      "SP (Streaming Processor / CUDA Core): executes one thread; thousands per GPU",
      "Thread Execution Manager: distributes work (grids of blocks of threads) to SMs",
      "Global Memory: GDDR/HBM, off-chip, ~100–2000 GB/s bandwidth, 4–80 GB capacity",
      "Shared Memory: on-chip per SM, fast, programmer-controlled (like L1 cache you can manage)",
      "PCIe for CPU-GPU communication (bottleneck: must minimize data transfers)",
      "5000–12000 concurrent threads typical",
    ],
    formula: null,
    examTips: [
      "SM → SPs (CUDA cores). Many SMs on a chip. Many SPs per SM. Hierarchy: chip → SMs → SPs.",
      "Global memory = GPU's DRAM (GDDR/HBM). Shared memory = on-chip per SM (fast).",
    ],
    questions: [],
  },

  "why-gpu-parallelism": {
    title: "Why GPU Parallelism? Applications & Speedup", emoji: "🚀",
    tldr: "100× speedup for suitable workloads. Applications: biological simulation, media processing, gaming physics, big data, ML training.",
    explanation: `GPUs can provide extraordinary speedups for the right workloads:

Speedup potential: 100× speedup over CPUs for fully parallel workloads (e.g., matrix multiply, image processing). 10× speedup achievable with minimal effort (just offload the most parallel loops).

Applications driving GPU parallelism:
- Biological Simulations: protein folding, molecular dynamics — larger models, longer simulations. Running on GPU allows scientists to simulate in hours what would take weeks on CPU.
- Media Processing: HD/4K/8K video encoding, real-time upscaling (DLSS), image enhancement, computer vision. Pixel operations are embarrassingly parallel.
- Consumer Electronics & Gaming: realistic physics (car deformation, fluid simulation, cloth dynamics). Smartphones using GPU for image signal processing (ISP) on every photo.
- Big Data: parallelism speeds up processing of large datasets. Distributed processing with GPU nodes.
- Machine Learning: forward/backward passes in neural networks are matrix multiplications — embarrassingly parallel on GPU. Training GPT-4 required thousands of A100 GPUs.

CUDA's role: CUDA provides a practical programming model that hides much of the complexity, allowing developers to focus on algorithms rather than GPU-specific hardware management.`,
    keyPoints: [
      "100× speedup for fully parallel workloads. 10× with minimal effort.",
      "Biological: protein folding, molecular dynamics — massive speedup for science",
      "Media: pixel/frame processing — embarrassingly parallel",
      "Gaming: physics simulation — rigid body, fluid, cloth dynamics",
      "Big Data / ML: matrix ops in neural networks are ideal GPU workloads",
      "CUDA simplifies GPU programming significantly vs. raw hardware management",
      "Memory bandwidth is often the limiting factor — optimize data access patterns",
    ],
    formula: null,
    examTips: [
      "100× speedup requires fully parallel, memory-efficient code. Real-world: 10× is common.",
      "ML training = massive matrix multiplications → ideal GPU workload.",
    ],
    questions: [],
  },

  "speedup-het": {
    title: "Speedup in Heterogeneous Computing & Challenges", emoji: "⚡",
    tldr: "Amdahl limits: 30% parallel→1.43×. 99% parallel→50×. Challenges: algorithm design, memory bottlenecks, data recurrences.",
    explanation: `Applying Amdahl's Law to GPU speedup expectations:

If only 30% of code is parallelisable: max speedup = 1/0.7 = 1.43×. Barely worth the effort.
If 99% is parallelisable: max speedup ≈ 50× (with N=100). Still limited.
100× speedup requires aggressive optimization for parallel execution AND efficient memory access.

The practical bottleneck is often not compute speed but memory bandwidth. GPUs have high bandwidth (177 GB/s to 2 TB/s for H100), but algorithms that access memory randomly or with poor locality waste this bandwidth.

The CPU+GPU split: not everything should go to GPU. Tasks best on CPU: complex sequential control flow, OS interactions, small data (copying overhead to GPU isn't worth it), irregular algorithms (sparse graph traversal). Tasks best on GPU: dense matrix operations, pixel processing, Monte Carlo simulations, bulk data transformation.

Four key challenges:
1. Algorithm design: some parallel algorithms add overhead — parallel overhead can make them slower than sequential for small inputs.
2. Memory bottlenecks: memory-bound applications are limited by data access speed, not compute. Optimize memory access patterns.
3. Input sensitivity: performance can fluctuate with unpredictable data patterns and data rates.
4. Mathematical recurrences: when value at step N depends on step N-1, parallelisation requires prefix-sum tricks and is non-trivial.`,
    keyPoints: [
      "Amdahl reminder: 30% parallel → max 1.43×. 99% → ~50×. 100× needs near-100% parallel",
      "CPU handles: serial code, complex control, OS, irregular access (the 'pit')",
      "GPU handles: data-parallel bulk compute, high-bandwidth streaming (the 'meat')",
      "Memory bandwidth often the bottleneck — not compute",
      "Challenge 1: some parallel algorithms have overhead that hurts for small N",
      "Challenge 2: memory-bound apps limited by bandwidth, not FLOPS",
      "Challenge 3: input sensitivity — performance varies with data patterns",
      "Challenge 4: sequential dependencies (recurrences) are hard to parallelize",
    ],
    formula: {
      code: `Amdahl's Law applied to CPU+GPU:
  30% parallelisable: Speedup = 1/(0.7 + 0.3/N) → max = 1/0.7 = 1.43×
  50% parallelisable: Speedup = 1/(0.5 + 0.5/N) → max = 1/0.5 = 2×
  90% parallelisable: Speedup = 1/(0.1 + 0.9/N) → max = 1/0.1 = 10×
  99% parallelisable: Speedup = 1/(0.01 + 0.99/N) → max = 1/0.01 = 100×

  To get 100×: need ~99%+ parallelisable + efficient memory access
  
  Memory bandwidth example:
    GPU compute: 15 TFLOPS
    Memory bandwidth: 900 GB/s
    If each FLOP needs 8 bytes: 900 GB/s / 8 = 112 GFLOPS max
    → memory-bound, not compute-bound!`,
      explanation: "The arithmetic intensity (FLOPs per byte of memory accessed) determines whether an algorithm is compute-bound or memory-bound. Most naive algorithms are memory-bound on modern hardware.",
    },
    examTips: [
      "99% parallelisable = 100× max speedup (not 1/0.01 with infinite N, but close).",
      "Memory-bound: algorithm performance limited by bandwidth, not FLOPS. Very common on GPU.",
    ],
    questions: [],
  },

  "challenges-parallel": {
    title: "Challenges in Parallel Programming", emoji: "🚧",
    tldr: "Algorithm overhead, memory access bottlenecks, input sensitivity, and sequential recurrences all limit parallel speedup.",
    explanation: `Parallel programming is harder than sequential programming. Key challenges:

1. Algorithm Design Overhead: Not all parallel algorithms are faster. A parallel merge sort might have load-balancing issues for small arrays. A parallel prefix sum has logarithmic depth but O(n log n) work vs. O(n) sequential. For small inputs, the parallel overhead dominates. Rule of thumb: parallelism pays when the workload is large enough.

2. Memory Access Bottlenecks: Modern computation is often memory-bound, not compute-bound. A GPU running at 15 TFLOPS but with 900 GB/s bandwidth can only sustain computation if each floating-point operation involves <0.06 bytes of memory access. Matrix multiply is compute-bound (good). Random array access is memory-bound (bad). Optimizing GPU performance usually means optimizing memory access patterns — using shared memory, coalescing global memory accesses.

3. Input Sensitivity: Sorting algorithms have different performance characteristics for different data distributions (nearly sorted vs. random). Hash table performance degrades with collisions. Simulation accuracy requirements vary. Performance benchmarks on controlled inputs may not reflect real-world behavior.

4. Mathematical Recurrences: Some algorithms inherently depend on previous results. Fibonacci: F(n) = F(n-1) + F(n-2). Certain ODE solvers: value at step N depends on step N-1. These cannot be trivially parallelised. Workarounds exist (parallel prefix scan for some patterns) but add algorithmic complexity.`,
    keyPoints: [
      "Algorithm overhead: parallel code has setup/synchronization cost → not always faster for small N",
      "Memory bottleneck: memory bandwidth often limits performance more than FLOPS",
      "Coalesced access: GPU performs best when threads access consecutive memory addresses",
      "Input sensitivity: performance varies with data patterns, size, distribution",
      "Mathematical recurrences: F(N) depends on F(N-1) → hard to parallelize directly",
      "Irregular algorithms (graph traversal, sparse operations) are harder to parallelize efficiently",
    ],
    formula: null,
    examTips: [
      "Parallel ≠ always faster. Small inputs may be slower due to overhead.",
      "Memory bottleneck > compute bottleneck on modern GPUs for many workloads.",
    ],
    questions: [],
  },

  "multicore-limits": {
    title: "Limitations of Multi-Core Processors", emoji: "🚫",
    tldr: "Multi-core is better than single-core but still has limits: cost, non-linear speedup, power, heat, synchronization overhead. Enter the GPU.",
    explanation: `Multi-core processors solved the single-core walls, but introduced new limitations:

Cost: Multi-core processors are more expensive to design, manufacture, and test than single-core. Yield rates for complex dies are lower.

Non-linear speedup: Adding a second core doesn't double performance. Amdahl's Law, synchronization overhead, shared memory bus contention, and OS scheduling overhead all reduce the effective speedup. A 4-core processor might give 2.5× the performance of a single core for typical workloads.

Power consumption: More cores = more power. Multi-core under full load consumes significantly more power than single-core, requiring better cooling and power delivery.

Heat generation: More cores generating more heat under heavy load. Thermal management becomes critical — cores may need to throttle (slow down) to stay within thermal limits.

Decomposition and synchronization overhead: All tasks running on a multicore processor need to be decomposed and synchronized. This overhead is real and grows with the number of cores.

Performance depends on how the user utilises the PC: if the workload is not parallel, more cores don't help. A user running a single-threaded video game gets essentially the same performance on 16 cores as on 4 cores.

Conclusion: For the most demanding applications (training large neural networks, real-time rendering, scientific simulation), multi-core CPUs alone are insufficient → enter the GPU.`,
    keyPoints: [
      "Multi-core is more expensive than single-core (design, manufacturing, test)",
      "Non-linear speedup: 4 cores ≠ 4× faster due to Amdahl, overhead, bus contention",
      "Higher power consumption and heat generation than single-core",
      "Decomposition and synchronization overhead is real and grows with core count",
      "Performance depends on workload parallelism — serial apps don't benefit",
      "Conclusion: multi-core alone insufficient for most demanding HPC tasks → need GPU",
    ],
    formula: null,
    examTips: [
      "Multi-core limitations lead to GPU adoption. Know why multi-core alone isn't enough.",
    ],
    questions: [],
  },

  "gpu-origins": {
    title: "GPU Origins — From Gaming to Science", emoji: "🎮",
    tldr: "GPUs were designed for real-time 3D graphics in games. The same massive parallel computation also turned out perfect for scientific computing and ML.",
    explanation: `The GPU's origin is in the gaming industry. By the early 2000s, games demanded photorealistic graphics in real time — simulating millions of polygons, applying textures, computing lighting, running physics all at 60+ frames per second.

Every pixel on screen is essentially independent — applying a lighting calculation to pixel (100, 200) doesn't depend on pixel (101, 200). This is embarrassingly parallel. Graphics hardware evolved to exploit this massively parallel structure.

NVIDIA's early GPUs (circa 2006): The screenshots from games like Crysis, Hellgate London, and Full Spectrum Warrior showed stunning visual quality — requiring enormous parallel computation to render in real time. The same hardware needed for these visual effects turns out to be exactly what scientific computing needs.

The leap to scientific computing (2007): NVIDIA released CUDA, recognizing that GPU hardware could be programmed for general computation beyond graphics. The same matrix operations used in 3D rendering (vertex transformations, texture filtering) are the same operations used in CFD, molecular dynamics, and neural networks.

Today: "compute GPUs" (NVIDIA Tesla/A100/H100 series, AMD Instinct) are specifically designed for HPC and AI workloads, with features like double-precision FP and large VRAM — not present in gaming-focused GPUs.`,
    keyPoints: [
      "GPU originally designed for real-time 3D graphics in games — massively parallel pixel ops",
      "Each pixel is independent → embarrassingly parallel → ideal for GPU architecture",
      "NVIDIA's early gaming GPUs showed stunning visuals requiring enormous parallel FLOPS",
      "CUDA (2007): NVIDIA enables GPU for general-purpose computing (GPGPU)",
      "Same matrix operations in graphics = matrix operations in physics, ML, simulation",
      "Compute GPUs (Tesla/A100/H100): HPC-focused, double-precision, large VRAM",
      "Gaming GPUs: consumer-focused, single-precision, display outputs",
    ],
    formula: null,
    examTips: [
      "GPU origin = gaming graphics. Transition to science via CUDA (2007). Same hardware, new software model.",
    ],
    questions: [],
  },

  "gpu-speed-throughput": {
    title: "Speed vs. Throughput — Ferrari vs. Trucks", emoji: "🏎️",
    tldr: "CPU = Ferrari: one task, very fast (low latency). GPU = fleet of trucks: many tasks, high total load (high throughput). Which is better depends on the problem.",
    explanation: `One of the most memorable analogies in computer architecture:

CPU = Ferrari racing car: extremely fast, goes from A to B as quickly as possible. Optimized for minimizing the time of a single task (latency). If you need one result as fast as possible, the CPU wins.

GPU = fleet of slow trucks: each truck is much slower than the Ferrari, but you can send thousands of trucks simultaneously. Total cargo moved per hour (throughput) is enormous. If you need to process millions of items, the GPU wins.

"Which is better depends on your needs."

If the workload is: render one specific pixel → use GPU. But if you need a general-purpose computer program to run correctly and quickly → CPU.

In practice: the combination (heterogeneous computing) is almost always optimal. The Ferrari (CPU) handles the complex route planning, exceptions, and single critical tasks. The trucks (GPU cores) handle the bulk data processing.

The "application code structure" diagram: most application code is "serial logic" (fast, not bottleneck) with a small "compute-intensive" hotspot (slow, the bottleneck). Moving just that small compute-intensive kernel to the GPU eliminates the bottleneck — huge overall speedup from a small code change.`,
    keyPoints: [
      "CPU = Ferrari: one thing, very fast, low latency",
      "GPU = truck fleet: many things, high total throughput",
      "For one result fast: CPU wins. For millions of similar items: GPU wins.",
      "Real applications: mostly serial code with small compute hotspots",
      "Moving only the bottleneck hotspot to GPU gives dramatic overall speedup",
      "The rest of the serial code stays on CPU — heterogeneous is the right model",
    ],
    formula: null,
    examTips: [
      "CPU optimizes latency (time per task). GPU optimizes throughput (tasks per second).",
      "Even a small compute kernel moved to GPU can give huge overall speedup if it's the bottleneck.",
    ],
    questions: [],
  },

  "gpu-two-components": {
    title: "GPU Architecture: Global Memory & Streaming Multiprocessors", emoji: "🧱",
    tldr: "GPU chip: array of SMs (compute) + DRAM interfaces (memory). Global Memory up to GB range, 177+ GB/s bandwidth. SMs do the actual computation.",
    explanation: `A GPU chip at the highest level has two main regions:

1. Streaming Multiprocessors (SMs) — the left side of the die: dense blocks of computation units arranged vertically. Each SM is a complete computation unit. More SMs = more parallel processing power. A Giga Thread engine distributes work to SMs. An L2 cache (blue bar) connects SMs to memory.

2. Memory Interface — right/bottom: multiple DRAM Interface (DRAM I/F) blocks connecting to off-chip GDDR/HBM memory chips. A HOST I/F (Host Interface) connects to the CPU via PCIe.

Global Memory (analogous to CPU's RAM):
- Accessible by both CPU and GPU
- Capacity: originally ~6 GB, modern A100: 40/80 GB, H100: 80 GB
- Bandwidth: up to 177 GB/s (Quadro/Tesla era); modern H100: 3.35 TB/s (HBM3)
- ECC (Error Correcting Code) option for reliability in HPC

Streaming Multiprocessors (SMs):
- Each SM has: control units, registers, execution pipelines (CUDA cores), caches, shared memory
- Each SM runs up to 1024–2048 concurrent threads
- All SMs share the L2 cache and global memory interface`,
    keyPoints: [
      "Two main die regions: SMs (compute) + DRAM interfaces (memory)",
      "Global memory: analogous to CPU RAM. Accessible by GPU and CPU. High bandwidth.",
      "L2 cache: shared across all SMs. Sits between SMs and global memory.",
      "Giga Thread engine: distributes thread blocks to available SMs",
      "HOST I/F: connects GPU to CPU via PCIe for host-device communication",
      "SM: complete computation unit with control, registers, pipelines, caches",
      "More SMs = more parallelism. More DRAM interfaces = more bandwidth.",
    ],
    formula: null,
    examTips: [
      "Global memory = GPU's DRAM, large capacity, accessible by CPU and GPU.",
      "SMs do computation. DRAM I/F handles memory bandwidth. Both scale with GPU generation.",
    ],
    questions: [],
  },

  "fermi-sm": {
    title: "Fermi SM Architecture (Streaming Multiprocessor)", emoji: "🔬",
    tldr: "32 CUDA cores, 2 warp schedulers, 1536 max threads, 64KB shared mem/L1, 4 SFUs, 16 LD/ST units. Warp = 32 threads executing same instruction.",
    explanation: `The Fermi architecture (NVIDIA, 2010) was a landmark GPU design. Understanding its SM internals is fundamental to GPU computing.

Fermi SM Structure (from top to bottom):
- Instruction Cache: holds instructions for the SM
- 2 Warp Schedulers + 2 Dispatch Units: can issue up to 2 instructions per clock cycle (for two different warps simultaneously)
- Large Register File (32K × 32-bit registers): each thread gets its own registers
- 32 CUDA Cores (8×4 arrangement): FP32 ALUs for single-precision floating point
- 16 Load/Store Units: for reading/writing global memory
- 4 Special Function Units (SFUs): for transcendental math (sin, cos, sqrt, log, exp)
- 64KB Configurable Cache/Shared Memory: programmer can split between L1 cache and shared memory
- Interconnect Network: connects execution units to registers and memory

Warp concept: 32 threads executing the same instruction simultaneously (SIMD within the SM). Two warp schedulers can issue two warps' instructions per clock cycle (dual-issue). Up to 1536 threads can reside in one SM simultaneously (for latency hiding).

Fermi SM specs: 32 fp32 ops/clock, 16 fp64 ops/clock, 32 int32 ops/clock.`,
    keyPoints: [
      "32 CUDA cores per SM (Fermi). Each executes one FP32 operation per clock.",
      "2 warp schedulers: can issue 2 instructions per clock (for 2 different warps)",
      "Warp = 32 threads executing same instruction simultaneously (SIMD)",
      "Up to 1536 concurrent threads per SM (for latency hiding — if some stall, others run)",
      "64KB configurable: split between L1 cache and shared memory (programmable!)",
      "16 LD/ST units: for global memory reads/writes",
      "4 SFUs: sin, cos, sqrt, log, exp (transcendental functions)",
      "32K 32-bit registers: large register file enables many concurrent threads",
    ],
    formula: {
      code: `Fermi SM Specifications:
  CUDA Cores per SM:    32
  FP32 ops/clock:       32
  FP64 ops/clock:       16
  INT32 ops/clock:      32
  Warp schedulers:      2  (dual-issue)
  Max threads per SM:   1536
  Register file:        32K × 32-bit
  Shared mem + L1:      64KB (configurable split)
  Special Function Units: 4 (sin, cos, sqrt)
  Load/Store units:     16

  Warp = 32 threads executing same instruction
  Scheduling: 1 warp issues instruction per scheduler per clock
  With 2 schedulers: 2 instructions issued per clock cycle`,
      explanation: "Having 1536 threads resident per SM is key: when warps stall waiting for memory (100+ cycle latency), other warps are ready to execute immediately. This keeps the 32 CUDA cores busy despite high memory latency.",
    },
    examTips: [
      "Fermi: 32 CUDA cores/SM, 2 warp schedulers, 1536 max threads/SM, 64KB shared/L1.",
      "Warp = 32 threads, same instruction, different data (SIMD at thread level).",
    ],
    questions: [],
  },

  "kepler-vs-fermi": {
    title: "Kepler vs. Fermi SM Comparison", emoji: "🔄",
    tldr: "Kepler: 192 CUDA cores/SM (6× Fermi), 4 warp schedulers (2× Fermi), 65K registers (2× Fermi). Same 64KB shared/L1. Much higher throughput.",
    explanation: `The Kepler architecture (NVIDIA, 2012) massively upgraded the SM compared to Fermi.

Key upgrades from Fermi → Kepler:

CUDA Cores per SM: 32 (Fermi) → 192 (Kepler). 6× more CUDA cores per SM. The SM is now much larger.

Warp Schedulers: 2 (Fermi) → 4 (Kepler), with 8 dispatch units (double Fermi). Can issue 4 instructions per clock cycle from 4 different warps.

Register File: 32K (Fermi) → 65,536 × 32-bit registers (Kepler). Double the register file size → can run more threads concurrently per SM.

Shared Memory / L1 Cache: 64KB (same as Fermi). Still configurable split.

The result: dramatically higher throughput per SM. A full Kepler GPU (e.g., GTX 680) has 8 SMs × 192 cores = 1536 CUDA cores total. A full Fermi GPU has 32 cores × N SMs. The generational improvement is enormous.

Each generation of NVIDIA GPU has followed a similar pattern: more CUDA cores per SM, more SMs, higher bandwidth memory, better double-precision performance.`,
    keyPoints: [
      "Kepler vs. Fermi: 192 vs. 32 CUDA cores per SM (6× increase)",
      "Kepler: 4 warp schedulers + 8 dispatch units (vs. 2+2 in Fermi)",
      "Kepler register file: 65,536 × 32-bit registers (vs. 32K in Fermi)",
      "Shared memory + L1: 64KB (same as Fermi — unchanged in this area)",
      "More CUDA cores + more schedulers + more registers = much higher throughput",
      "Kepler represents a generation of 'scale up SIMD' approach",
    ],
    formula: {
      code: `Fermi vs. Kepler SM Comparison:
  Feature            │ Fermi   │ Kepler
  ───────────────────┼─────────┼──────────
  CUDA Cores/SM      │  32     │  192  (6×)
  Warp Schedulers    │   2     │    4  (2×)
  Dispatch Units     │   2     │    8  (4×)
  Register File      │  32K    │  65K  (2×)
  Shared Mem + L1    │  64KB   │  64KB (same)
  
  Impact on throughput (same clock frequency):
    Kepler throughput ≈ 6× Fermi throughput per SM
    For full GPU: Kepler GTX 680 = 1536 CUDA cores total`,
      explanation: "Each GPU generation multiplies CUDA cores, primarily by making SMs wider (more cores per SM). This is the GPU equivalent of widening the SIMD width — the same principle as going from 4-wide to 8-wide vector units in a CPU.",
    },
    examTips: [
      "Kepler: 192 CUDA cores/SM (6× Fermi's 32). More schedulers, more registers.",
      "GPU generations scale primarily by widening SMs (more CUDA cores per SM).",
    ],
    questions: [],
  },

  "three-ways-accelerate": {
    title: "Three Ways to Accelerate Applications with GPU", emoji: "🚀",
    tldr: "1. Libraries (drop-in, easiest). 2. OpenACC directives (pragma-based, like OpenMP). 3. CUDA programming (maximum control, hardest).",
    explanation: `There are three paths to accelerating applications on GPU, ordered from easiest to most complex:

1. Libraries (Drop-in Acceleration): Use pre-written, highly optimized GPU routines. Your code calls a library function that internally runs on the GPU. Requires almost no code change — just link the library. Examples: cuBLAS (linear algebra), cuFFT (Fourier transforms), cuRAND (random numbers), cuSPARSE (sparse matrices), NPP (image processing). If your bottleneck is a standard algorithm, this is by far the easiest approach.

2. OpenACC Directives (Easily Accelerate Applications): Add #pragma acc directives to existing C/C++/Fortran code, similar to how OpenMP works for CPU threading. The compiler generates GPU code automatically. Steps: insert directives → compile with -acc flag → run on GPU. Middle ground — more flexibility than libraries, less work than CUDA.

3. Programming Languages / CUDA (Maximum Flexibility): Write CUDA C/C++ kernels directly — complete control over thread hierarchy, memory management, and hardware utilization. Maximum performance possible, maximum developer effort required. Used when libraries don't cover your algorithm or when you need to squeeze out every last FLOP.

This three-path framework applies to essentially all GPU accelerator frameworks — CUDA for NVIDIA, ROCm/HIP for AMD, OpenCL for cross-vendor.`,
    keyPoints: [
      "Path 1 — Libraries: cuBLAS, cuFFT, cuRAND, NPP etc. Drop-in, no code change.",
      "Path 2 — OpenACC: pragma directives on existing code. Compiler generates GPU code.",
      "Path 3 — CUDA: write GPU kernels directly. Maximum control and performance.",
      "Tradeoff: ease ↔ flexibility. Libraries = easiest. CUDA = most control.",
      "OpenACC is to GPUs what OpenMP is to CPUs — directive-based parallel annotations",
      "Choose based on: does a library exist? If yes, use it. Otherwise OpenACC or CUDA.",
    ],
    formula: null,
    examTips: [
      "Three ways: Libraries (easiest) → OpenACC (middle) → CUDA (hardest/most flexible).",
      "OpenACC = GPU version of OpenMP. Directives for GPU parallelism.",
    ],
    questions: [],
  },

  "gpu-libraries": {
    title: "GPU-Accelerated Libraries", emoji: "📚",
    tldr: "cuBLAS, cuFFT, cuRAND, cuSPARSE, NPP, MAGMA, ArrayFire — drop-in replacements for standard algorithms, already GPU-optimized.",
    explanation: `GPU-accelerated libraries allow developers to get GPU speedup without writing any GPU code — just replace calls to CPU libraries with GPU library calls.

Key NVIDIA GPU libraries:

cuBLAS: NVIDIA's GPU-accelerated BLAS (Basic Linear Algebra Subprograms). Operations like matrix multiplication (SGEMM), vector dot products, matrix-vector multiply. This is the foundation of all ML training and scientific simulation.

cuFFT: Fast Fourier Transform on GPU. Critical for signal processing, audio analysis, PDE solvers using spectral methods.

cuRAND: GPU-accelerated random number generation. Essential for Monte Carlo simulations.

cuSPARSE: Sparse matrix operations on GPU. Used in graph algorithms, network analysis, compressed neural networks.

NPP (NVIDIA Performance Primitives): Image and signal processing primitives — convolution, filtering, color conversion.

MAGMA: Matrix Algebra on GPU and Multicore — hybrid CPU/GPU linear algebra.

ArrayFire: Matrix computation library.

For ML: most deep learning frameworks (PyTorch, TensorFlow, JAX) use cuBLAS and cuDNN internally — developers just call high-level Python functions while GPU libraries handle all the acceleration.`,
    keyPoints: [
      "cuBLAS: GPU linear algebra (GEMM, dot product, matrix-vector ops). Foundation of ML.",
      "cuFFT: Fourier transforms on GPU. Signal processing, PDE solvers.",
      "cuRAND: random number generation on GPU. Monte Carlo simulations.",
      "cuSPARSE: sparse matrix ops. Graph algorithms, compressed NNs.",
      "NPP: image/signal primitives. Convolution, filtering, color ops.",
      "MAGMA: hybrid CPU+GPU linear algebra.",
      "PyTorch/TensorFlow use these libraries internally — you call Python, GPU does the work.",
    ],
    formula: null,
    examTips: [
      "GPU libraries = drop-in acceleration. Know at least 3 names and what they do.",
      "cuBLAS = linear algebra. cuFFT = Fourier transforms. cuRAND = random numbers.",
    ],
    questions: [],
  },

  "openacc": {
    title: "OpenACC — Directive-Based GPU Acceleration", emoji: "🎯",
    tldr: "#pragma acc parallel generates parallel gangs on GPU. Similar to OpenMP but for GPUs. Three steps: insert directives → compile with -acc → run on GPU.",
    explanation: `OpenACC (Open Accelerators) is a directive-based programming model for GPU acceleration, analogous to OpenMP for CPUs.

Core directive: #pragma acc parallel creates a parallel region. The compiler generates GPU code for that region — creating "gangs" (groups of GPU threads) that execute it in parallel.

For loops: #pragma acc parallel loop distributes loop iterations across GPU threads, similar to #pragma omp parallel for.

Usage workflow:
1. Profile your code to find the bottleneck loop/function.
2. Insert #pragma acc parallel loop before the bottleneck.
3. Compile with the -acc flag.
4. Run on a GPU-enabled platform.

The compiler handles memory transfers between CPU and GPU automatically (or semi-automatically with hints).

When to use OpenACC over CUDA: when you have existing code and want to quickly add GPU acceleration without a full rewrite. OpenACC adds ~1 line of code per loop. CUDA requires restructuring code into kernel functions, managing memory manually, and understanding the thread hierarchy.

When CUDA is better: when you need fine-grained control over shared memory, custom memory access patterns, or maximum performance from a specific GPU architecture.`,
    keyPoints: [
      "#pragma acc parallel: generates GPU parallel region with 'gangs' of threads",
      "#pragma acc parallel loop: distribute loop iterations across GPU threads",
      "Three steps: add directives → compile with -acc → run on GPU",
      "Compiler generates GPU memory transfer code automatically",
      "Easier than CUDA for existing codebases. Less performance control.",
      "Similar relationship to GPU as OpenMP is to CPU (both directive-based)",
      "Compiler flags: -acc for OpenACC compilers (PGI, NVIDIA HPC SDK)",
    ],
    formula: {
      code: `OpenACC example:
#pragma acc parallel
{
    // Compiler generates N parallel gangs on GPU
    // Each gang executes this block independently
}

// With loop:
#pragma acc parallel loop
for (int i = 0; i < N; i++) {
    a[i] = b[i] + c[i];  // Each iteration on different GPU thread
}

// Steps:
// 1. Insert pragmas
// 2. pgcc -acc -Minfo=accel program.c
// 3. ./a.out  (runs on GPU if available, falls back to CPU otherwise)`,
      explanation: "OpenACC is particularly popular in scientific computing (Fortran users, existing CFD codes) where rewriting everything in CUDA would take too long. It provides 80% of the speedup for 20% of the effort.",
    },
    examTips: [
      "OpenACC for GPU = OpenMP for CPU. Both use pragma/directive approach.",
      "Three steps: directives → -acc compile flag → GPU execution.",
    ],
    questions: [],
  },

  "cpu-strengths": {
    title: "CPU Strengths & Weaknesses", emoji: "💪",
    tldr: "CPU strengths: fast per-thread, large memory, huge cache, low latency. Weaknesses: low memory bandwidth, costly cache misses, poor performance/watt for parallel tasks.",
    explanation: `Understanding CPU strengths and weaknesses helps identify when to use CPU vs. GPU.

CPU Strengths:
- Very large main memory (server CPUs: terabytes of DRAM addressable)
- Very fast clock speeds (3–5 GHz per core)
- Latency optimized via large multi-level caches (L1/L2/L3)
- Small number of threads can run very quickly (optimized for per-thread performance)
- Excellent for complex control flow, branches, and irregular memory access
- Handles OS operations, network I/O, and sequential logic efficiently

CPU Weaknesses:
- Relatively low memory bandwidth (~50–100 GB/s for modern desktop CPUs)
- Cache misses are very costly — a cache miss to DRAM stalls the core for 100–300 cycles
- Low performance-per-watt for highly parallel tasks — a CPU running 4 threads at 100W produces less parallel throughput than a GPU running 10,000 threads at the same power
- Few physical cores (4–64 in typical CPUs) limits parallelism

When CPU is the right choice: sequential algorithms, programs with complex branching, OS operations, network/storage I/O, tasks where latency matters more than throughput, tasks with irregular memory access patterns (graph traversal, tree search).`,
    keyPoints: [
      "CPU strength: large DRAM, fast clock, big caches, low latency per thread",
      "CPU strength: handles complex control flow, branches, irregular access well",
      "CPU weakness: low memory bandwidth (~50-100 GB/s vs. GPU's 500-2000 GB/s)",
      "CPU weakness: cache misses very costly (100-300 cycle stall)",
      "CPU weakness: low perf/watt for highly parallel workloads",
      "CPU best for: sequential code, OS operations, complex branching, low-latency needs",
    ],
    formula: null,
    examTips: [
      "CPU: low bandwidth, costly cache misses, low perf/watt for parallel tasks = weaknesses.",
      "CPU: large memory, fast per-thread, low latency = strengths.",
    ],
    questions: [],
  },

  "gpu-strengths": {
    title: "GPU Strengths & Weaknesses", emoji: "🎮",
    tldr: "GPU strengths: high bandwidth, thousands of cores, latency-tolerant, high throughput, high perf/watt. Weaknesses: low memory capacity, low per-thread performance.",
    explanation: `GPU strengths and weaknesses are essentially complementary to CPU's.

GPU Strengths:
- High bandwidth main memory: GDDR6X/HBM2e provides 500–2000+ GB/s bandwidth. An H100 GPU has 3.35 TB/s HBM3 bandwidth — 30× a CPU's bandwidth.
- Significantly more compute resources: thousands of CUDA cores (A100: 6912 CUDA cores; H100: 16,896). Massive SIMD width.
- Latency tolerant via parallelism: while waiting for a global memory access (hundreds of cycles), the warp scheduler switches to another ready warp. Memory latency is hidden by thread-level parallelism.
- High throughput: peak FLOPS is 50–100+ TFLOPS for modern compute GPUs (A100: 77.6 TFLOPS FP16; H100: 3958 TFLOPS FP8).
- High performance per watt for parallel tasks: a GPU does 100× the parallel work of a CPU at similar power consumption.

GPU Weaknesses:
- Relatively low memory capacity per GPU: typical A100 has 40/80 GB VRAM. A server can have TBs of CPU RAM. Large language models with 100B+ parameters barely fit even on multiple GPUs.
- Low per-thread performance: each individual GPU core is much slower (less than 1 GHz clock, no out-of-order execution) than a single CPU core. Sequential algorithms run faster on CPU.

Combined: CPU + GPU = 10× performance and 5× energy efficiency improvement vs. CPU-only for suitable parallel workloads.`,
    keyPoints: [
      "GPU strength: high memory bandwidth (500-3000+ GB/s) vs. CPU (~100 GB/s)",
      "GPU strength: thousands of CUDA cores (A100: 6912, H100: 16896)",
      "GPU strength: latency-tolerant via thread switching (warp scheduler hides latency)",
      "GPU strength: high TFLOPS peak, high performance/watt for parallel work",
      "GPU weakness: low memory capacity (GBs not TBs) — bottleneck for large models",
      "GPU weakness: low per-thread performance — sequential code runs faster on CPU",
      "Combined CPU+GPU: 10× performance, 5× energy efficiency vs. CPU-only",
    ],
    formula: null,
    examTips: [
      "GPU weakness: low memory CAPACITY (not bandwidth). GPU has high bandwidth, low GBs.",
      "GPU hides latency via parallelism (thread switching). CPU hides via caches (data proximity).",
    ],
    questions: [],
  },

  "accelerator-node": {
    title: "Accelerator Node & PCIe Architecture", emoji: "🖥️",
    tldr: "CPU RAM ↔ CPU ↔ PCIe bus ↔ GPU ↔ GPU RAM. PCIe is the bottleneck between CPU and GPU. Minimize data transfers over PCIe for best performance.",
    explanation: `In a GPU-accelerated server node, the data flow and memory hierarchy is:

CPU RAM → CPU → PCIe Bus → GPU → GPU RAM

The components:
- CPU memory (DRAM): large capacity, moderate bandwidth, accessible by CPU cores
- CPU: serial code, OS, control flow, data preparation
- PCIe (PCI Express): the interconnect between CPU and GPU. Gen3/4: 16 GB/s. Gen5: 32 GB/s (bidirectional). This is the BOTTLENECK.
- GPU: massively parallel compute
- GPU memory (GDDR6/HBM): small capacity, enormous bandwidth, accessible by GPU

Key facts about PCIe:
- Data must be EXPLICITLY COPIED between CPU memory and GPU memory
- cudaMemcpy() (or similar) handles this copy
- PCIe bandwidth (16 GB/s) is much lower than either CPU RAM bandwidth (100 GB/s) or GPU GDDR bandwidth (900+ GB/s)
- Every cudaMemcpy is a potential bottleneck — minimize data transfers
- Programming principle: if possible, keep data on the GPU and process it there rather than repeatedly copying back and forth

Optimization strategy: overlap computation with data transfer (use CUDA streams). Batch multiple small transfers into one large transfer. Avoid unnecessary round-trips between CPU and GPU.`,
    keyPoints: [
      "Data path: CPU RAM ↔ CPU ↔ PCIe ↔ GPU ↔ GPU RAM",
      "PCIe bandwidth (~16 GB/s) << GPU GDDR bandwidth (900+ GB/s)",
      "Data must be explicitly copied CPU↔GPU (no automatic sharing)",
      "cudaMemcpy(): copies data between CPU and GPU memory spaces",
      "PCIe is the bottleneck — minimize copies for best performance",
      "Strategy: keep data on GPU, batch copies, use CUDA streams for overlap",
      "NVLink (40 GB/s): NVIDIA's faster GPU-to-GPU interconnect (bypasses PCIe for multi-GPU)",
    ],
    formula: {
      code: `Accelerator Node Data Flow:
  CPU RAM ←───────── PCIe (16 GB/s) ─────────→ GPU RAM
  (Large, moderate BW)                           (Small, huge BW)
  100 GB/s bandwidth                             900–3350 GB/s bandwidth
  
  Without Unified Memory (manual):
    cudaMemcpy(d_data, h_data, size, cudaMemcpyHostToDevice);
    // GPU kernel runs on d_data
    cudaMemcpy(h_result, d_result, size, cudaMemcpyDeviceToHost);
  
  Performance bottleneck analysis:
    If computation takes 1ms but PCIe copy takes 10ms → 90% overhead!
    Strategy: amortize copy cost over large, infrequent transfers.`,
      explanation: "The PCIe bottleneck is why GPU programming best practices emphasize 'keep data on the GPU.' If you have a pipeline of GPU operations, don't copy back to CPU between steps — chain the GPU operations together.",
    },
    examTips: [
      "PCIe = bottleneck between CPU and GPU. Lower bandwidth than either CPU RAM or GPU GDDR.",
      "Minimize cudaMemcpy calls. Keep data on GPU when doing multiple operations.",
    ],
    questions: [],
  },

  "cuda-unified": {
    title: "CUDA Unified Memory", emoji: "🔗",
    tldr: "Single memory space shared by CPU and GPU. No explicit cudaMemcpy needed. System auto-migrates data as needed. Simplifies programming significantly.",
    explanation: `Unified Memory (also called "managed memory") simplifies GPU programming by presenting a single memory space accessible by both CPU and GPU.

Without Unified Memory (traditional): two separate memory spaces — System Memory (CPU side) and GPU Memory (GPU side). Developer must explicitly call cudaMemcpy() to copy data between them before each use. This requires knowing exactly when data needs to be on GPU vs. CPU, tracking which data is "dirty" (modified since last copy), and manually managing the two memory spaces.

With Unified Memory: a single "Unified Memory" address space. Both CPU and GPU code use the same pointer to access data. The system (hardware + driver + OS) automatically migrates data pages between CPU and GPU memory as needed — when the GPU needs a page, it's migrated to GPU memory; when CPU needs it, it's migrated back.

How to use: allocate with cudaMallocManaged() instead of cudaMalloc(). After that, the same pointer works in both CPU and GPU code — no cudaMemcpy needed.

Pascal architecture and later (2016+): Unified Memory is handled in hardware with GPU page faults — true on-demand migration without any driver involvement. Older GPUs used software-managed migration.

Benefit: greatly simplifies developer code. Write as if there's one shared memory space. Especially helpful for complex data structures (linked lists, trees) that are hard to manually copy.`,
    keyPoints: [
      "Unified Memory = single address space for CPU and GPU",
      "Without it: explicit cudaMemcpy for every CPU↔GPU transfer",
      "With it: cudaMallocManaged() + same pointer in both CPU and GPU code",
      "System auto-migrates data pages on demand (hardware page faults on Pascal+)",
      "Also called 'managed memory'",
      "Benefit: simplifies code, especially for complex/dynamic data structures",
      "Tradeoff: may be slightly less performant than manually-optimized explicit copies",
    ],
    formula: {
      code: `Without Unified Memory:
  float *h_data = malloc(size);             // CPU memory
  float *d_data;
  cudaMalloc(&d_data, size);                // GPU memory
  cudaMemcpy(d_data, h_data, size, H2D);   // Explicit copy to GPU
  kernel<<<grid,block>>>(d_data);           // GPU kernel
  cudaMemcpy(h_data, d_data, size, D2H);   // Copy back to CPU

With Unified Memory:
  float *data;
  cudaMallocManaged(&data, size);           // Single allocation
  // Fill data on CPU (no copy needed)
  kernel<<<grid,block>>>(data);             // GPU uses same pointer!
  cudaDeviceSynchronize();
  // Use data on CPU again (no copy needed)
  // System migrated pages automatically`,
      explanation: "Unified Memory eliminates ~50% of the boilerplate in many GPU programs. For simple data, it costs little performance. For production code, manual copies with careful overlap still give better performance.",
    },
    examTips: [
      "Unified Memory = no explicit cudaMemcpy. System auto-migrates data between CPU and GPU RAM.",
      "cudaMallocManaged() = unified memory allocation. cudaMalloc() = GPU-only memory.",
    ],
    questions: [],
  },

  "final-summary": {
    title: "Three Ways to Accelerate — Final Summary", emoji: "🏁",
    tldr: "Recap: Libraries (drop-in), OpenACC (directives), CUDA (full programming). CPU+GPU = 10× perf + 5× energy efficiency vs. CPU-only.",
    explanation: `Final summary of GPU acceleration approaches and overall unit takeaways.

Three paths to accelerate applications with GPU:
1. Libraries: Drop-in acceleration. cuBLAS, cuFFT, cuRAND, NPP. Use when your algorithm matches a library. Easiest, least flexible.
2. OpenACC Directives: Easily accelerate existing applications. #pragma acc annotations guide the compiler. Middle ground.
3. Programming Languages (CUDA): Maximum flexibility and control. Write kernels directly. Hardest, most performance.

Overall message: Combining CPU (serial excellence) + GPU (parallel excellence) provides dramatically better performance and energy efficiency than CPU-only computing for suitable workloads. 10× Performance & 5× Energy Efficiency vs. CPU-only HPC.

Modern computing landscape: every smartphone (heterogeneous SoC), every laptop (CPU + integrated GPU), every server (CPU + GPU accelerator), every supercomputer (CPU + GPU nodes). Heterogeneous computing is the universal answer to the power wall, memory wall, and ILP wall.

For Unit 4 exam: understand why parallel computing is necessary (three walls + performance gap), the Flynn taxonomy, Amdahl's and Gustafson's laws, multi-core design tradeoffs, OpenMP basics, CPU vs. GPU architectures, and the three acceleration paths.`,
    keyPoints: [
      "Three paths: Libraries (easiest) → OpenACC (middle) → CUDA (most control)",
      "CPU+GPU heterogeneous: 10× performance, 5× energy efficiency vs. CPU-only",
      "Universal architecture: smartphones, laptops, servers, supercomputers all use CPU+GPU",
      "Heterogeneous = universal answer to the three walls",
      "OpenACC : GPU :: OpenMP : CPU (directive-based parallel programming)",
      "CUDA (2007): enabled GPGPU — general-purpose GPU computing beyond graphics",
    ],
    formula: null,
    examTips: [
      "10× perf + 5× energy efficiency = heterogeneous CPU+GPU vs. CPU-only. Remember these numbers.",
      "Heterogeneous computing: right tool for right task — CPU serial, GPU parallel.",
    ],
    questions: [],
  },

  "formula-sheet": {
    title: "Quick Reference — Formula Sheet", emoji: "📐",
    tldr: "Amdahl: 1/[(1-F)+F/N]. Max speedup: 1/(1-F). Gustafson: N-(N-1)×S. Observed speedup: T_serial/T_parallel.",
    explanation: `Complete formula reference for Unit 4 exams.`,
    keyPoints: [
      "Observed Speedup = T_serial / T_parallel (wall-clock times)",
      "Amdahl's Speedup = 1 / [(1-F) + F/N]",
      "Amdahl's Max Speedup (N→∞) = 1 / (1-F)",
      "Gustafson's Scaled Speedup = N - (N-1) × S",
      "F = parallelisable fraction (0–1). (1-F) = S = serial fraction.",
      "N = number of processors",
      "Amdahl: fixed problem size. Gustafson: scaled problem size.",
    ],
    formula: {
      code: `MASTER FORMULA SET — Unit 4:

  Observed Speedup  = T_serial / T_parallel

  Amdahl's Law:
    Speedup = 1 / [(1-F) + F/N]
    Max Speedup (N→∞) = 1/(1-F)
    F = parallel fraction, N = processors

  Gustafson's Law:
    Scaled Speedup = N - (N-1) × S
    S = serial fraction (same as 1-F in Amdahl)

  Key limits (Amdahl):
    1% serial → max 100×
    5% serial → max 20×
    10% serial → max 10×
    50% serial → max 2×

  Comparison (F=0.95, N=20):
    Amdahl:    1/(0.05 + 0.95/20) = 10.25×
    Gustafson: 20 - 19×0.05 = 19.05×`,
      explanation: "For any exam problem: identify F and N, then apply the formula. For Gustafson, S = 1-F.",
    },
    examTips: [
      "Amdahl: 1/[(1-F)+F/N]. Gustafson: N-(N-1)×S. Know both by heart.",
      "Amdahl gives pessimistic ceiling. Gustafson gives optimistic scaled speedup.",
    ],
    questions: [],
  },

  "flynns-summary": {
    title: "Quick Reference — Flynn's Taxonomy", emoji: "📋",
    tldr: "SISD=sequential, SIMD=vector/GPU, MISD=theoretical, MIMD=most common. Know all four.",
    explanation: `Quick reference for Flynn's Taxonomy exam questions.`,
    keyPoints: [
      "SISD: 1 instruction stream, 1 data stream. Sequential. Deterministic. Example: Intel Atom.",
      "SIMD: 1 instruction, many data. Same op on many elements. GPU, vector processors. Cray C90, CM-2.",
      "MISD: many instructions, 1 data. Almost nonexistent. Theoretical. Systolic arrays.",
      "MIMD: many instructions, many data. MOST COMMON. Supercomputers, clusters, multi-core CPUs.",
    ],
    formula: {
      code: `Flynn's Taxonomy (1966):
  Category │ Instruction │ Data    │ Common?  │ Example
  ─────────┼─────────────┼─────────┼──────────┼──────────────────────
  SISD     │ Single      │ Single  │ Rare     │ Intel Atom, serial CPU
  SIMD     │ Single      │ Multiple│ Yes (GPU)│ NVIDIA GPU, Cray C90
  MISD     │ Multiple    │ Single  │ Never    │ Systolic arrays (CMU)
  MIMD     │ Multiple    │ Multiple│ MOST     │ All supercomputers, clusters

  Airport analogy:
    SISD = one desk, one customer at a time
    SIMD = megaphone supervisor giving same instruction to all desks
    MIMD = many desks working independently, synced via database`,
      explanation: "MIMD is correct for 'most modern parallel systems.' MISD is correct for 'rarely exists.' SIMD is correct for 'GPUs and vector processors.'",
    },
    examTips: [
      "MIMD = most common. MISD = almost never. GPUs = SIMD.",
    ],
    questions: [],
  },

  "mem-arch-summary": {
    title: "Quick Reference — Parallel Memory Architecture", emoji: "🗄️",
    tldr: "Shared (all CPUs, one pool), Distributed (private + message passing), Hybrid (both). GPU cluster = CPU RAM + GPU GDDR + PCIe.",
    explanation: `Quick reference for memory architecture questions.`,
    keyPoints: [
      "Shared Memory: single pool, all CPUs access directly. Simple, doesn't scale to many nodes.",
      "Distributed Memory: each node owns memory. Message passing (MPI). Scalable to thousands of nodes.",
      "Hybrid: groups share locally (SMP), communicate across groups (distributed/MPI). Most common HPC.",
      "GPU Cluster: CPU RAM + GPU GDDR (separate). CUDA for CPU↔GPU, MPI for node↔node.",
    ],
    formula: {
      code: `Memory Architecture Summary:
  Architecture  │ Memory            │ Communication     │ Key Feature
  ──────────────┼───────────────────┼───────────────────┼────────────────────
  Shared        │ Single pool       │ Shared variables  │ Simple, not scalable
  Distributed   │ Each node private │ Message passing   │ Scalable (MPI)
  Hybrid        │ Groups share local│ SMP + MPI         │ Most HPC clusters today
  GPU Cluster   │ CPU RAM + GPU GDDR│ CUDA + MPI        │ High throughput`,
      explanation: "Modern supercomputers are all hybrid: nodes use shared memory (multi-core CPUs sharing node-local DRAM), while nodes communicate via MPI over high-speed network (Infiniband, Cray Aries).",
    },
    examTips: [
      "Hybrid = shared within node + distributed across nodes = most common HPC architecture.",
    ],
    questions: [],
  },

  "ilp-summary": {
    title: "Quick Reference — ILP Techniques Comparison", emoji: "📊",
    tldr: "Scalar→Pipeline→Super-Pipeline→Superscalar→VLIW. Each fills more execution slots per clock.",
    explanation: `Quick reference for ILP technique comparison.`,
    keyPoints: [
      "Scalar: one instruction per cycle. All slots idle except one.",
      "Pipelining: different instructions at different stages simultaneously. Diagonal staircase.",
      "Super Pipelining: finer stages, higher clock frequency. More rows active per cycle.",
      "Superscalar: multiple instructions at SAME stage simultaneously. Multiple rows at same time.",
      "VLIW: compiler packs independent ops into one long word. Simple hardware, smart compiler.",
    ],
    formula: {
      code: `ILP Comparison:
  Technique      │ Definition                    │ Hardware      │ Software
  ───────────────┼───────────────────────────────┼───────────────┼──────────
  Scalar         │ One instruction per cycle     │ Simple        │ Simple
  Pipelining     │ Different stages overlap      │ Pipeline HW   │ No change
  Super Pipeline │ Finer stages, higher freq     │ Deep pipeline │ No change
  Super Scalar   │ Multiple at same stage        │ Complex OOO   │ No change
  VLIW           │ Compiler bundles into 1 word  │ Simple HW     │ Smart compiler

  Timing diagram pattern:
  Scalar:   [####][    ][    ][    ][    ]  (one row filled)
  Pipeline: [####][####][####][####]        (diagonal fill)
  Superscalar:[##][##][##][##][##][##]      (pairs per cycle)`,
      explanation: "Each technique fills more of the 'clock×functional_units' grid. Superscalar is complex hardware (OOO scheduling). VLIW shifts complexity to compiler.",
    },
    examTips: [
      "Superscalar: hardware finds parallelism dynamically. VLIW: compiler finds it statically.",
    ],
    questions: [],
  },

  "openmp-directives": {
    title: "Quick Reference — OpenMP Key Directives", emoji: "💻",
    tldr: "parallel, parallel for, collapse(n), shared/private, critical, single, omp_get_thread_num(), OMP_NUM_THREADS.",
    explanation: `Complete reference for OpenMP directives tested in exams.`,
    keyPoints: [
      "#pragma omp parallel: creates parallel region (multiple threads execute)",
      "#pragma omp parallel for: distribute loop iterations among threads",
      "collapse(n): merge n nested loops into one for parallel distribution",
      "shared(var): variable shared across all threads (all see same memory)",
      "private(var): each thread gets its own private copy of var",
      "#pragma omp critical: only ONE thread executes this block at a time",
      "#pragma omp single: only FIRST thread executes this block (others skip and wait)",
      "omp_get_thread_num(): returns thread ID (0 to N-1)",
      "OMP_NUM_THREADS=N: environment variable to set thread count",
    ],
    formula: {
      code: `OpenMP Quick Reference:
  Directive                    │ Purpose
  ─────────────────────────────┼────────────────────────────────────────
  #pragma omp parallel         │ Fork N threads, all run the block
  #pragma omp parallel for     │ Distribute loop iterations across threads
  collapse(n)                  │ Merge n nested loops (more iterations)
  shared(x)                    │ All threads share variable x
  private(x)                   │ Each thread has own copy of x
  #pragma omp critical         │ Mutual exclusion — 1 thread at a time
  #pragma omp single           │ Only 1 thread executes this (first to arrive)
  omp_get_thread_num()         │ Returns this thread's ID (0 to N-1)
  OMP_NUM_THREADS=4            │ Use 4 threads (env variable before ./a.out)
  gcc -fopenmp file.c          │ Compile with OpenMP enabled

  critical vs. single:
    critical: ALL N threads execute (serialized, N total executions)
    single:   EXACTLY 1 thread executes (1 execution, others skip+wait)`,
      explanation: "The critical vs. single distinction is commonly tested. Critical = serialized but executed by all. Single = one execution only.",
    },
    examTips: [
      "#pragma omp critical = all threads take turns (N executions). single = 1 thread executes.",
      "Compile: gcc -fopenmp. Set threads: OMP_NUM_THREADS=4 before running.",
    ],
    questions: [],
  },

  "cpu-gpu-summary": {
    title: "Quick Reference — CPU vs. GPU Summary", emoji: "⚔️",
    tldr: "CPU: few fast cores, low latency, large cache. GPU: thousands of slow cores, high bandwidth, latency-tolerant. Use both for best results.",
    explanation: `Complete CPU vs. GPU comparison for exam questions.`,
    keyPoints: [
      "CPU cores: few (4–64), very fast (3–5 GHz), complex OOO execution",
      "GPU cores: thousands (6912 A100 CUDA cores), slower, simple in-order",
      "CPU memory: large RAM (TBs), ~50-100 GB/s bandwidth, large L1-L3 cache",
      "GPU memory: smaller (GB), ~500-3350 GB/s bandwidth, small per-SM cache",
      "CPU: low latency, large cache, best for sequential/control-heavy code",
      "GPU: high throughput, latency-tolerant via threads, best for data-parallel code",
      "Programming: CPU = C/C++/Python/OpenMP. GPU = CUDA/OpenCL/OpenACC.",
    ],
    formula: {
      code: `CPU vs. GPU Comparison Table:
  Aspect          │ CPU              │ GPU
  ────────────────┼──────────────────┼───────────────────────
  Cores           │ 4–64             │ Thousands (6912 A100)
  Core speed      │ 3–5 GHz          │ ~1-2 GHz (slower)
  Memory capacity │ TB range         │ 40–80 GB (lower)
  Memory bandwidth│ ~50–100 GB/s     │ ~500–3350 GB/s (much higher)
  Latency         │ Low (optimized)  │ High (tolerates via parallelism)
  Cache           │ Large L1/L2/L3   │ Small per SM (shared mem better)
  Best for        │ Sequential logic │ Data-parallel workloads
  Programming     │ C++/OpenMP       │ CUDA/OpenCL/OpenACC
  Communication   │ PCIe to GPU      │ PCIe to CPU; NVLink to GPU

  Combined CPU+GPU:
    10× Performance + 5× Energy Efficiency vs. CPU-only`,
      explanation: "The key insight: CPU excels at latency-critical serial tasks; GPU excels at throughput-critical parallel tasks. Combining them gives the best of both worlds.",
    },
    examTips: [
      "CPU = few fast cores = low latency. GPU = many slow cores = high throughput.",
      "10× perf + 5× energy eff = combined CPU+GPU vs. CPU-only. Know these numbers.",
    ],
    questions: [],
  },
};

