
export const groups = [
  { name: "🚀 Intro to Pipelining", ids: ["pipeline-intro", "brick-analogy", "latency-throughput", "speedup-formula", "non-vs-pipeline-exec"] },
  { name: "🏗️ Pipeline Architecture", ids: ["pipeline-generations", "five-stage-diagram", "pipeline-formula", "unequal-stages", "register-overhead"] },
  { name: "🔬 ARM 5-Stage Detail", ids: ["arm5-overview", "stage-fetch", "stage-decode", "stage-execute", "stage-memory", "stage-writeback"] },
  { name: "⚠️ Hazards Overview", ids: ["hazards-intro", "cpi-stalls"] },
  { name: "🏛️ Structural Hazards", ids: ["structural-if-mem", "structural-wb-wb", "structural-id-wb", "structural-perf"] },
  { name: "📊 Data Hazards", ids: ["data-hazard-scenario", "hazard-depth", "raw-war-waw", "register-renaming"] },
  { name: "🛠️ Data Hazard Solutions", ids: ["raw-solutions", "instruction-reorder", "insert-nops", "stall-bubbles", "data-forwarding", "forwarding-mux", "load-use-hazard"] },
  { name: "🔀 Control Hazards", ids: ["control-hazard-intro", "reduce-branch-stall", "cpi-control-hazard", "delayed-branching", "delay-slot-strategies"] },
  { name: "🔮 Branch Prediction", ids: ["branch-pred-overview", "static-prediction", "dynamic-prediction", "one-bit-predictor", "aliasing-problem", "two-bit-predictor", "two-bit-examples"] },
  { name: "🧮 Performance Exercises", ids: ["perf-formulas", "ex-equal-stages", "ex-unequal-stages", "ex-with-overhead", "ex-structural-speedup", "ex-loop-nonpipeline", "ex-loop-pipeline"] },
  { name: "📋 Quick Reference", ids: ["qref-formulas", "qref-hazards", "qref-branch-pred", "mcq-revision"] },
];

export const topics = {
  // ─────────────────────────────────────────────
  // INTRO TO PIPELINING
  // ─────────────────────────────────────────────
  "pipeline-intro": {
    title: "What Is Pipelining?", emoji: "🚀",
    tldr: "Pipelining = executing multiple instructions simultaneously by overlapping their stages. Like an assembly line. Improves THROUGHPUT, not latency.",
    explanation: `A programmer writes instructions that execute one by one. But what if we could execute multiple instructions at the same time?

Pipelining is the technique where the CPU splits instruction execution into multiple stages and overlaps the execution of different instructions across those stages — just like an assembly line in a factory.

When instruction 1 is in the Decode stage, instruction 2 is simultaneously in the Fetch stage. When instruction 1 moves to Execute, instruction 2 moves to Decode and instruction 3 enters Fetch.

Key insight: Pipelining does NOT make a single instruction finish faster (latency stays the same). It makes the CPU finish many instructions faster by keeping all stages busy all the time (throughput improves).`,
    keyPoints: [
      "Pipelining = overlapping execution of multiple instructions across different stages",
      "Like a factory assembly line: each worker handles one stage, all workers active simultaneously",
      "Latency (time for 1 instruction) stays the SAME with pipelining",
      "Throughput (instructions completed per second) IMPROVES dramatically",
      "The pipeline is most useful for long instruction streams (large n)",
      "Example motivation: ADD R0,R0,R1 then SUB R2,R0,R1 — can we overlap them?",
      "More pipeline stages = higher potential throughput, but also more hazard risk",
    ],
    formula: {
      code: `Non-Pipelined: One instruction completes all stages before next starts
  I1: [IF][ID][EX][MEM][WB]
  I2:                     [IF][ID][EX][MEM][WB]

Pipelined: Instructions overlap — next starts as soon as previous moves to next stage
  I1: [IF][ID][EX][MEM][WB]
  I2:     [IF][ID][EX ][MEM][WB]
  I3:         [IF][ID ][EX ][MEM][WB]`,
      explanation: "In pipelining, by the time I1 is in ID, I2 is already in IF — all stages are always busy.",
    },
    examTips: [
      "Pipelining improves THROUGHPUT, NOT latency — this is a favourite MCQ trap",
      "Latency of one instruction is SAME in pipelined and non-pipelined",
      "Pipeline stages: IF → ID → EX → MEM → WB (5-stage ARM)",
      "More stages = more overlap = higher throughput (in theory)",
    ],
    questions: [
      { q: "Why does pipelining improve throughput but not latency?", a: "Latency = time for 1 instruction from start to finish. Pipelining doesn't speed up any single stage, so 1 instruction still takes the same total time (same latency). But throughput improves because multiple instructions are in different stages simultaneously — the pipeline produces results every 1 cycle (in ideal case) instead of every 5." },
      { q: "What is the main idea of pipelining?", a: "Divide instruction execution into multiple stages (e.g., IF, ID, EX, MEM, WB). While instruction 1 is in stage 2, instruction 2 enters stage 1. Each stage works on a different instruction simultaneously. Like an assembly line — efficiency comes from overlapping." },
    ],
  },

  "brick-analogy": {
    title: "Brick-Shifting Analogy", emoji: "🧱",
    tldr: "Move 3 bricks: non-pipelined = 30 min, pipelined = 20 min. Pipelined = 1.5× faster. Same idea applies to CPU instructions.",
    explanation: `To understand pipelining visually, the course uses a brick-shifting analogy.

Setup: 3 bricks must be moved from source to destination. Moving 1 brick fully takes 10 minutes (5 min carry-out + 5 min place).

TECHNIQUE 1 — Non-Pipelined (Sequential): One person does everything. They pick up brick 1, carry it, place it (10 min), then go back for brick 2 (10 min), then brick 3 (10 min). Total = 30 min for 3 bricks. For 2 sets of 3 bricks = 60 min.

TECHNIQUE 2 — Pipelined (Overlapped): Two workers share the task. Worker A does the carry-out (first 5 min). Worker B does the placing (second 5 min). While B places brick 1, A is already carrying brick 2. So after the initial 10 min for brick 1, each subsequent brick takes only 5 more min. Total for 3 bricks = 10 + 2×5 = 20 min. For 6 bricks = 10 + 5×5 = 35 min.

Speedup = 60 / 35 = 1.714× for 2 sets of 3 bricks.`,
    keyPoints: [
      "1 brick = 1 instruction. Moving it = executing it through all stages",
      "Non-pipelined: finish one completely before starting next",
      "Pipelined: split into 2 half-stages, both workers active simultaneously",
      "First brick still takes full 10 min (no latency improvement)",
      "Every subsequent brick only takes 5 more min (throughput improvement)",
      "For 3 bricks: non-pipeline = 30 min, pipeline = 20 min",
      "For 6 bricks: non-pipeline = 60 min, pipeline = 35 min",
      "Speedup = 60/35 = 1.714× for 6 bricks",
    ],
    formula: {
      code: `Non-Pipelined:
  Brick 1: 0–10 min
  Brick 2: 10–20 min
  Brick 3: 20–30 min
  Total (3 bricks) = 30 min | Total (6 bricks) = 60 min

Pipelined (2-stage: carry-out 5 min + place 5 min):
  Total = (1 × 10) + (remaining × 5)
  3 bricks: 10 + (2 × 5) = 20 min
  6 bricks: 10 + (5 × 5) = 35 min

Speedup = Time_non-pipelined / Time_pipelined = 60 / 35 = 1.714×`,
      explanation: "Formula generalizes: first brick = full time, each subsequent brick = 1 stage time more.",
    },
    examTips: [
      "Brick analogy = direct real-world model for pipeline throughput calculation",
      "Always: Pipelined time = (1st item full time) + (remaining items × 1 stage time)",
      "Speedup = Technique1_time / Technique2_time",
      "MCQ: 8 jobs, 2 stages of 6 min each: = (1×12) + (7×6) = 12+42 = 54 min",
    ],
    questions: [
      { q: "8 jobs, 2 pipeline stages each taking 6 min. Total pipelined time?", a: "First job takes full 2×6 = 12 min. Remaining 7 jobs each take 6 more min = 7×6 = 42 min. Total = 12 + 42 = 54 minutes." },
    ],
  },

  "latency-throughput": {
    title: "Latency vs Throughput", emoji: "⚖️",
    tldr: "Latency = time for 1 task. Throughput = rate of completing many tasks. Pipelining does NOT reduce latency. It improves throughput.",
    explanation: `These two metrics are critical for understanding why pipelining is useful and what it doesn't help with.

LATENCY: The time it takes to completely finish ONE task (one brick, one instruction) from start to finish. In the brick analogy, latency for 1 brick = 10 min in BOTH techniques. Pipelining doesn't make any single instruction run faster.

THROUGHPUT: The rate at which tasks are completed — how many instructions finish per second, or the total time to complete a large batch of tasks. Pipelining dramatically improves throughput because the pipeline produces one result every clock cycle (in the ideal case) instead of every 5 cycles.

The key insight: even though latency is unchanged, throughput improves because the pipeline is always busy — every stage is working on a different instruction at every clock cycle. The more instructions you run, the closer throughput approaches the theoretical maximum of 1 instruction per cycle.`,
    keyPoints: [
      "Latency = time to complete ONE task (1 brick or 1 instruction) — SAME in both techniques",
      "Throughput = rate of completing MANY tasks — IMPROVED by pipelining",
      "Non-pipeline technique: Latency=10 min, 2 sets throughput=60 min",
      "Pipeline technique: Latency=10 min, 2 sets throughput=35 min",
      "This is the #1 exam trap: students confuse latency with throughput",
      "As number of instructions grows (n→∞), throughput approaches pipeline_depth × throughput_unpipelined",
    ],
    formula: {
      code: `Metric        | Definition                          | Technique 1 | Technique 2
──────────────┼─────────────────────────────────────┼─────────────┼────────────
Latency       | Time for 1 task                     | 10 min      | 10 min (SAME!)
Throughput    | Total time for multiple tasks (2×3) | 60 min      | 35 min (BETTER)

KEY RULE:
  Pipelining = NO improvement in latency
  Pipelining = SIGNIFICANT improvement in throughput`,
      explanation: "Remember: pipelining is about keeping all stages busy — it's a throughput optimization.",
    },
    examTips: [
      "MCQ TRAP: 'Pipelining reduces execution time of a single instruction' — FALSE",
      "Latency is UNCHANGED. Throughput IMPROVES.",
      "Performance metric most improved by pipelining = C) Throughput",
    ],
    questions: [
      { q: "Does pipelining reduce the time to execute a single instruction?", a: "No! Pipelining does NOT reduce latency (time for 1 instruction). It reduces throughput time — total time to execute many instructions. A single instruction still passes through all 5 stages and takes the same total time. The benefit appears only when many instructions are running." },
    ],
  },

  "speedup-formula": {
    title: "Speedup Formula & Computer X vs Y", emoji: "📐",
    tldr: "Speedup n = Time_slow / Time_fast = Perf_fast / Perf_slow. Performance = 1 / ExecutionTime.",
    explanation: `Speedup is how we quantify how much faster one system is compared to another.

If Computer X is n times faster than Computer Y:
  n = Execution Time of Y / Execution Time of X

If Computer Y is n times faster than Computer X:
  n = Execution Time of X / Execution Time of Y

OR equivalently using performance (since Performance = 1 / Execution Time):
  n = Performance of X / Performance of Y (when X is faster)

In the brick analogy: Speedup = 60/35 = 1.714×, meaning Technique 2 (pipelined) is 1.714 times faster.

For CPU performance specifically: CPU Time = Instruction Count × CPI × Clock Cycle Time
Reducing ANY of: instruction count, CPI, or clock cycle time will improve performance.`,
    keyPoints: [
      "Speedup = Time_slower / Time_faster = Perf_faster / Perf_slower",
      "Performance = 1 / Execution Time (inverse relationship)",
      "Faster execution = lower execution time = higher performance",
      "CPU Time = IC × CPI × Clock Cycle",
      "To improve performance: reduce IC, reduce CPI, or reduce clock cycle time",
      "Example: Computer Y=100 ns, Computer X=25 ns → X is 100/25 = 4× faster",
      "Example: Brick analogy → Speedup = 60/35 = 1.714×",
    ],
    formula: {
      code: `Speedup(X over Y) = ExecutionTime_Y / ExecutionTime_X
               OR = Performance_X / Performance_Y

Performance = 1 / Execution Time

CPU Time = IC × CPI × Tc
  IC  = Instruction Count
  CPI = Cycles Per Instruction
  Tc  = Clock Cycle duration

Example:
  Computer Y = 100 ns, Computer X = 25 ns
  X is faster by: 100 / 25 = 4× (Computer Y is 4 times slower than X)`,
      explanation: "Always put the SLOWER machine's time in the numerator when calculating speedup.",
    },
    examTips: [
      "Speedup numerator = slower machine (bigger time). Denominator = faster machine.",
      "Performance = 1/Time — they are INVERSES. Higher performance = lower time.",
      "CPU Time = IC × CPI × Tc — reducing any one of these improves performance",
      "MCQ: Y=100ns, X=25ns → X is D) 4× faster",
    ],
    questions: [
      { q: "Computer Y takes 100 ns, Computer X takes 25 ns. How much faster is X?", a: "Speedup = Time_Y / Time_X = 100 / 25 = 4. Computer X is 4 times faster than Computer Y." },
      { q: "What are the three ways to improve CPU performance?", a: "1. Reduce Instruction Count (IC) — fewer instructions to run. 2. Reduce CPI (Cycles Per Instruction) — pipelining helps. 3. Reduce Clock Cycle time (Tc) — faster clock. CPU Time = IC × CPI × Tc, so reducing any factor improves it." },
    ],
  },

  "non-vs-pipeline-exec": {
    title: "Non-Pipeline vs Pipeline Execution", emoji: "📊",
    tldr: "4 instructions, 5-stage: non-pipeline=200ns, pipelined=80ns. Speedup=2.5×. Each stage=10ns.",
    explanation: `Let's see concretely how pipelining saves time for real instructions.

Given 4 instructions (sub, and, orr, add), each with 5 stages, each stage = 10 ns.

NON-PIPELINED (Computer Y): Each instruction completes all 5 stages before the next begins.
  sub: stages 1–5 = 50 ns. Then and: 51–100 ns. orr: 101–150 ns. add: 151–200 ns.
  Total throughput = 4 × 50 = 200 ns.

PIPELINED (Computer X): Instructions overlap.
  sub completes at T5 = 50 ns (5 stages × 10 ns)
  and completes at T6 = 60 ns (1 extra cycle after sub)
  orr completes at T7 = 70 ns
  add completes at T8 = 80 ns

Total pipelined throughput = 80 ns instead of 200 ns.
Speedup = 200 / 80 = 2.5×

Latency for sub (first instruction) is still 50 ns in both cases.`,
    keyPoints: [
      "5 stages × 10 ns/stage = 50 ns latency per instruction (same in both)",
      "Non-pipeline throughput for 4 instructions: 4 × 50 = 200 ns",
      "Pipelined throughput for 4 instructions: 80 ns (5 + 3 extra cycles = 8 cycles total)",
      "Speedup = 200 / 80 = 2.5×",
      "After the pipeline is full, each instruction completes every 10 ns (1 cycle)",
      "Pipelined Computer X = Computer with a Pipelined Processor",
    ],
    formula: {
      code: `Stage    | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8
─────────┼────┼────┼────┼────┼────┼────┼────┼────
IF       | I1 | I2 | I3 | I4 |    |    |    |
ID       |    | I1 | I2 | I3 | I4 |    |    |
EXE      |    |    | I1 | I2 | I3 | I4 |    |
MEM      |    |    |    | I1 | I2 | I3 | I4 |
WB       |    |    |    |    | I1 | I2 | I3 | I4

I1 finishes at T5=50ns, I2 at T6=60ns, I3 at T7=70ns, I4 at T8=80ns

Non-Pipeline: 4 × 5 × 10ns = 200 ns
Pipeline:     (5 + 3) × 10ns = 80 ns
Speedup:      200 / 80 = 2.5×`,
      explanation: "The diagonal in the table = one instruction flowing through all 5 stages.",
    },
    examTips: [
      "Pipeline total cycles for n instructions with k stages = k + (n-1)",
      "4 instructions, 5 stages: 5 + 3 = 8 cycles total",
      "Non-pipeline: n × k = 4 × 5 = 20 cycles",
      "Speedup = 20/8 = 2.5× (consistent with 200/80)",
    ],
    questions: [
      { q: "4 instructions, 5-stage pipeline, 10 ns/stage. What is the total pipelined execution time and speedup?", a: "Pipelined time = [k + (n-1)] × Tc = [5 + (4-1)] × 10 = 8 × 10 = 80 ns. Non-pipelined = 4 × 5 × 10 = 200 ns. Speedup = 200/80 = 2.5×." },
    ],
  },

  // ─────────────────────────────────────────────
  // PIPELINE ARCHITECTURE
  // ─────────────────────────────────────────────
  "pipeline-generations": {
    title: "ARM Pipeline Generations (3/5/6-Stage)", emoji: "🏗️",
    tldr: "ARM7=3-stage, ARM9=5-stage, ARM10=6-stage. More stages = more throughput. ARM9 is the main 5-stage pipeline taught in this course.",
    explanation: `ARM processors evolved through progressively deeper pipelines:

ARM7TDMI — 3-Stage Pipeline (older, simpler):
  Stage 1 FETCH: Instruction fetched from memory, placed in pipeline.
  Stage 2 DECODE: Instruction decoded; control signals prepared; register identified.
  Stage 3 EXECUTE: Register bank read, operand shifted, ALU runs, result written back.

ARM9TDMI — 5-Stage Pipeline (main focus of this unit):
  FETCH → DECODE (inst decode, reg decode, reg read) → EXECUTE (shift + ALU) → MEMORY (access) → WRITE BACK (reg write)

ARM10 — 6-Stage Pipeline (deepest):
  FETCH (with branch prediction) → ISSUE (ARM/Thumb decode) → DECODE (reg read) → EXECUTE (shift+ALU, multiply) → MEMORY (access, multiply-add) → WRITE BACK (reg write)

More pipeline stages = more instructions in flight simultaneously = higher throughput. But it also means more hazard complexity and longer branch penalties.`,
    keyPoints: [
      "ARM7TDMI = 3-stage: Fetch, Decode, Execute",
      "ARM9TDMI = 5-stage: IF, ID, EX, MEM, WB (main one studied in this course)",
      "ARM10 = 6-stage: adds ISSUE stage and includes branch prediction at FETCH",
      "More stages = higher throughput, higher IPC potential",
      "More stages = longer branch misprediction penalty",
      "ARM9 requires separate I-cache and D-cache (Harvard Architecture) to avoid structural hazard",
      "3-stage ARM7: Execute stage does EVERYTHING (read, shift, ALU, write) — very busy stage",
    ],
    formula: {
      code: `ARM7TDMI (3-Stage):
  [FETCH] → [DECODE: Thumb→ARM decompress, Reg Select] → [EXECUTE: Reg Read, Shift, ALU, Reg Write]

ARM9TDMI (5-Stage):
  [FETCH] → [DECODE: Inst Decode, Reg Decode, Reg Read]
           → [EXECUTE: Shift+ALU] → [MEMORY: Access] → [WRITE: Reg Write]

ARM10 (6-Stage):
  [FETCH: Branch Prediction] → [ISSUE: ARM/Thumb Decode]
  → [DECODE: Reg Read] → [EXECUTE: Shift+ALU, Multiply]
  → [MEMORY: Access, Multiply-Add] → [WRITE: Reg Write]`,
      explanation: "Each generation adds more stages to allow higher clock frequencies and throughput.",
    },
    examTips: [
      "ARM7=3 stages, ARM9=5 stages, ARM10=6 stages — know all three",
      "More stages ≠ always faster for single instruction (latency increases too)",
      "ARM9 requires Harvard Architecture (split I-cache and D-cache) — know why",
      "ARM10 adds branch prediction at the Fetch stage itself",
    ],
    questions: [
      { q: "What are the 3 stages of the ARM7TDMI pipeline and what happens in each?", a: "FETCH: Instruction fetched from memory and placed in pipeline. DECODE: Instruction decoded; control signals and register selections prepared for next cycle. EXECUTE: Register bank read, operand shifted, ALU operation performed, result written back to destination register — all in one busy stage." },
    ],
  },

  "five-stage-diagram": {
    title: "5-Stage Pipeline Execution Diagram", emoji: "📈",
    tldr: "5 instructions, 5 stages = 9 clock cycles total (not 25). The pipeline table shows each instruction's diagonal flow.",
    explanation: `The 5-stage pipeline execution table is one of the most important diagrams in this unit. You MUST be able to draw and read it.

For 5 instructions (I1–I5) running in a 5-stage pipeline:

The table has stages as rows and clock cycles as columns. Each instruction follows a diagonal path through the table — it moves one column right and one row down each cycle.

Key observations:
- I1 is in IF at T1, ID at T2, EX at T3, MEM at T4, WB at T5.
- I2 is in IF at T2 (one cycle after I1), ID at T3, ..., WB at T6.
- The pipeline is "full" at T5 when all 5 stages are occupied simultaneously.
- Total cycles for 5 instructions = 5 stages + 4 extra cycles = 9 cycles.

Formula: Total cycles (pipelined) = k + (n-1), where k = stages, n = instructions.`,
    keyPoints: [
      "5 instructions, 5 stages, ideal pipeline → 9 clock cycles total",
      "Formula: Total pipelined time = [k + (n-1)] × Tc",
      "Formula: Total non-pipelined time = n × k × Tc",
      "First instruction takes k=5 cycles. Each subsequent: +1 cycle",
      "Pipeline is 'full' when all k stages are simultaneously occupied",
      "Diagonal in the table = path of one instruction through all stages",
      "As n→∞, speedup approaches k (the number of pipeline stages)",
    ],
    formula: {
      code: `Stage | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9
──────┼────┼────┼────┼────┼────┼────┼────┼────┼────
IF    | I1 | I2 | I3 | I4 | I5 |    |    |    |
ID    |    | I1 | I2 | I3 | I4 | I5 |    |    |
EX    |    |    | I1 | I2 | I3 | I4 | I5 |    |
MEM   |    |    |    | I1 | I2 | I3 | I4 | I5 |
WB    |    |    |    |    | I1 | I2 | I3 | I4 | I5

Total pipelined = [5 + (5-1)] × Tc = 9 × Tc
Total non-pipelined = 5 × 5 × Tc = 25 × Tc
Speedup = 25 / 9 = 2.78×

As n→∞: Speedup → k = 5 (number of stages)`,
      explanation: "Draw this table in every pipeline timing question — it makes analysis visual and error-free.",
    },
    examTips: [
      "Formula: [k + (n-1)] × Tc for pipelined, n×k×Tc for non-pipelined",
      "5 stages, 100 instr, 60ns: pipeline = (5+99)×60=6240ns; non-pipeline=5×60×100=30000ns",
      "Speedup approaches k (pipeline depth) as n becomes large",
      "The DIAGONAL in the timing table = one instruction's journey through all 5 stages",
    ],
    questions: [
      { q: "5-stage pipeline, 100 instructions, Tc=60 ns. Calculate pipelined and non-pipelined times and speedup.", a: "Non-pipelined: 5 × 60 × 100 = 30,000 ns. Pipelined: [5 + (100-1)] × 60 = 104 × 60 = 6,240 ns. Speedup = 30,000 / 6,240 = 4.8 ≈ 5." },
    ],
  },

  "pipeline-formula": {
    title: "Pipeline Execution Formulas", emoji: "🧮",
    tldr: "Pipelined = [k+(n-1)]×Tc. Non-pipelined = n×k×Tc. Speedup = non/pipelined. As n→∞, speedup→k.",
    explanation: `These are the core formulas you must memorise and apply for every pipeline calculation.

k = number of pipeline stages
n = number of instructions
Tc = clock cycle time (= slowest stage delay + any register overhead)

PIPELINED execution time = [k + (n-1)] × Tc
  Explanation: The first instruction takes k cycles to fill the pipeline. Each subsequent instruction adds 1 more cycle. So (n-1) more cycles for the remaining n-1 instructions.

NON-PIPELINED execution time = n × k × Tc
  Explanation: Each instruction takes k cycles. n instructions = n×k cycles total.

SPEEDUP = Non-pipelined time / Pipelined time = (n × k × Tc) / ([k + (n-1)] × Tc)

As n becomes very large (n >> k): Speedup → k
This means for long programs, the speedup equals the number of pipeline stages.`,
    keyPoints: [
      "Pipelined time = [k + (n-1)] × Tc",
      "Non-pipelined time = n × k × Tc",
      "Speedup(S) = (n × k × Tc) / ([k + (n-1)] × Tc)",
      "As n→∞: Speedup → k (pipeline depth is the theoretical max speedup)",
      "For long programs, pipelining gives speedup close to the number of stages",
      "For short programs (small n), speedup is lower (pipeline not fully utilized)",
    ],
    formula: {
      code: `k = stages, n = instructions, Tc = clock cycle time

Pipelined:     [k + (n-1)] × Tc
Non-Pipelined: n × k × Tc

Speedup = (n × k × Tc) / ([k + (n-1)] × Tc)

As n → ∞:
  Speedup → (n × k) / (k + n - 1) → k
  (because n dominates and n/n = 1)

Example: k=5, n=100, Tc=60ns
  Non-pipeline:  5 × 60 × 100 = 30,000 ns
  Pipeline:      (5 + 99) × 60 = 6,240 ns
  Speedup:       30,000 / 6,240 = 4.8 ≈ 5`,
      explanation: "The closer n is to infinity (large programs), the closer speedup gets to k.",
    },
    examTips: [
      "Pipelined = [k + (n-1)] × Tc — memorise this exactly",
      "Non-pipelined = n × k × Tc — straightforward multiplication",
      "Speedup → k as n→∞ — pipeline depth = theoretical max speedup",
      "Pipeline most useful for long instruction streams (large programs)",
    ],
    questions: [],
  },

  "unequal-stages": {
    title: "Design Issue 1 — Unequal Stage Delays", emoji: "⚡",
    tldr: "Real pipelines have unequal stage delays. Clock cycle = slowest stage. Tc = max(all stage delays).",
    explanation: `In theory, we'd like all pipeline stages to take the same amount of time. In practice, different stages have different hardware complexities and thus different delays.

For example, a 5-stage pipeline might have delays of: IF=150ps, ID=120ps, EX=160ps, MEM=140ps, WB=130ps.

Problem: The pipeline can only run as fast as its slowest stage. We cannot have the clock run faster than the slowest stage allows, because that stage won't finish in time.

Solution: Set the clock cycle time (Tc) equal to the slowest stage delay.
  Tc = max(all stage delays)

This means faster stages are waiting (wasted time within a cycle) while the slowest stage finishes. This is why minimizing the slowest stage is crucial for pipeline performance.

Example: Stages = 150, 120, 160, 140, 130 ns. Slowest = 160 ns. Tc = 160 ns.`,
    keyPoints: [
      "Real pipelines have unequal stage delays — different hardware complexity",
      "Pipeline clock rate limited by the SLOWEST stage",
      "Tc = max(stage delays) — set clock to fit slowest stage",
      "Faster stages must wait (waste time) within each clock cycle",
      "Solution to balance: subdivide the slow stage into two stages (increase k)",
      "Example: IF=300, ID=400, EX=350, MEM=550, WB=100 → Tc=550ps",
    ],
    formula: {
      code: `Given stage delays: IF=150, ID=120, EX=160, MEM=140, WB=130 ns

Tc = max(150, 120, 160, 140, 130) = 160 ns

Non-pipelined time (100 instr) = (150+120+160+140+130) × 100 = 700 × 100 = 70,000 ns
Pipelined time = (k + n - 1) × Tc = (5 + 99) × 160 = 104 × 160 = 16,640 ns
Speedup = 70,000 / 16,640 = 4.2

(Ideal speedup for balanced stages: 70,000 / (104 × 140) = 70,000 / 14,560 = 4.8)
Imbalance costs us: 4.8 - 4.2 = 0.6 speedup units`,
      explanation: "Imbalanced stages reduce actual speedup below the theoretical maximum.",
    },
    examTips: [
      "Tc = max(stage delays) — always the SLOWEST stage determines clock speed",
      "Non-pipelined: sum ALL stage delays (they all execute, no waiting for slowest)",
      "Pipelined: use Tc = max stage only",
      "MCQ: stages 150, 120, 160, 140, 180 → Tc=180ns. Pipelined 100 instr = (5+99)×180 = 18,720ns",
    ],
    questions: [
      { q: "5 stages: 150, 120, 160, 140, 130 ns. 100 instructions. Find pipelined time and speedup.", a: "Non-pipelined = (150+120+160+140+130) × 100 = 700 × 100 = 70,000 ns. Tc = max = 160 ns. Pipelined = (5+99) × 160 = 104 × 160 = 16,640 ns. Speedup = 70,000 / 16,640 = 4.2." },
    ],
  },

  "register-overhead": {
    title: "Design Issue 2 — Pipeline Register Overhead", emoji: "🔩",
    tldr: "Pipeline registers between stages add overhead. Effective Tc = max_stage_delay + register_overhead. Reduces speedup slightly.",
    explanation: `Between each pair of pipeline stages, we place pipeline registers (also called inter-stage registers or latch registers). These hold all the data that needs to pass from one stage to the next.

For example, between IF and ID: the IF/ID register holds the fetched instruction. Between ID and EX: the ID/EX register holds decoded instruction, register values, and control signals.

These registers have their own delay: Setup time + propagation delay = pipeline register delay. Additionally, clock skew (the delay between when the clock signal arrives at different registers) also adds overhead.

Pipeline Overhead = Pipeline Register Delay + Clock Skew
Effective Tc = Slowest stage delay + Pipeline Overhead

This overhead slightly increases the clock period and thus slightly reduces the speedup compared to the ideal case.`,
    keyPoints: [
      "Pipeline registers = inter-stage latches that hold data between stages",
      "Located between: IF/ID, ID/EX, EX/MEM, MEM/WB",
      "They must be large enough to store everything passing between stages",
      "Pipeline register delay = setup time + propagation delay",
      "Clock skew = delay difference in clock signal arrival at different registers",
      "Pipeline Overhead = register delay + clock skew",
      "Effective Tc = max(stage delays) + register overhead",
      "Overhead reduces speedup (from 4.2 to 4.07 in the worked example)",
    ],
    formula: {
      code: `Pipeline structure with registers:
  [IF] → [IF/ID reg] → [ID] → [ID/EX reg] → [EX] → [EX/MEM reg] → [MEM] → [MEM/WB reg] → [WB]

Pipeline Overhead = Register delay + Clock skew
Effective Tc = max(stage delays) + overhead

Example (stages: 150, 120, 160, 140, 130 ns; overhead = 5 ns):
  Non-pipelined = 70,000 ns (same, overhead not applicable here)
  Tc = 160 + 5 = 165 ns
  Pipelined = (5 + 99) × 165 = 104 × 165 = 17,160 ns
  Speedup = 70,000 / 17,160 = 4.07

Without overhead: Speedup = 4.2. With overhead: Speedup = 4.07
Overhead reduced speedup by 0.13`,
      explanation: "Register overhead always reduces pipelined speedup. The more stages, the more total overhead.",
    },
    examTips: [
      "Effective Tc = max_stage_delay + register_overhead",
      "Register overhead is NOT added to non-pipelined time (stages run sequentially, no registers needed)",
      "Clock skew = max delay between clock signals reaching different flip-flops",
      "More stages → more pipeline registers → more total overhead",
    ],
    questions: [
      { q: "Same 5-stage pipeline (150, 120, 160, 140, 130 ns), register overhead = 5 ns. 100 instructions. Find pipelined time and speedup.", a: "Non-pipelined = 70,000 ns (unchanged). Effective Tc = 160 + 5 = 165 ns. Pipelined = (5+99) × 165 = 17,160 ns. Speedup = 70,000 / 17,160 = 4.07. (Down from 4.2 without overhead.)" },
    ],
  },

  // ─────────────────────────────────────────────
  // ARM 5-STAGE DETAIL
  // ─────────────────────────────────────────────
  "arm5-overview": {
    title: "ARM9 5-Stage Pipeline Overview", emoji: "🔭",
    tldr: "IF → ID → EX → MEM → WB. ARM requires Harvard Architecture (split I-cache and D-cache) to avoid structural hazards.",
    explanation: `The ARM9TDMI 5-stage pipeline is the main architecture studied in this unit. Understanding each stage in detail is essential.

The 5 stages:
  1. IF (Fetch): Get the instruction from memory
  2. ID (Decode): Figure out what the instruction does; read registers
  3. EX (Execute): ALU performs the operation; effective address calculated
  4. MEM (Memory): Access data memory if needed (load/store)
  5. WB (Write Back): Write result to the register file

Critical requirement: The ARM architecture requires SEPARATE instruction and data memories. This is called the Harvard Architecture. If you used one unified memory, the Fetch stage (needing instruction memory) and the Memory stage (needing data memory) would conflict in the same cycle — a structural hazard.

In ARM: Instruction Cache (I-cache) → used by IF stage. Data Cache (D-cache) → used by MEM stage.`,
    keyPoints: [
      "5 stages: IF → ID → EX → MEM → WB",
      "ARM requires Harvard Architecture: separate I-cache (for IF) and D-cache (for MEM)",
      "Unified memory would cause structural hazard between IF and MEM stages",
      "ARM has 3 operand read ports in register file → most instructions can read all operands in 1 cycle",
      "Branch decision made at end of ID stage → only 1 wasted fetch cycle (branch penalty = 1)",
      "Pipeline registers hold data between stages: IF/ID, ID/EX, EX/MEM, MEM/WB",
    ],
    formula: {
      code: `ARM9 5-Stage Pipeline:
  IF  →  ID  →  EX  →  MEM  →  WB
(Fetch) (Decode) (Execute) (Memory) (Write Back)

Harvard Architecture:
  I-cache ← accessed by IF stage (instructions)
  D-cache ← accessed by MEM stage (data)
  → No conflict between IF and MEM stages

Pipeline registers:
  IF/ID → ID/EX → EX/MEM → MEM/WB`,
      explanation: "Separating I-cache and D-cache is the hardware solution to the structural IF-MEM hazard.",
    },
    examTips: [
      "Harvard Architecture = split memory = solution to IF vs MEM structural hazard",
      "ARM9 has 3 register read ports → all operands readable in 1 cycle at ID",
      "Branch penalty in ARM9 = 1 cycle (decision made at end of ID)",
      "Effective address for LOAD/STORE calculated at: C) Execute (EX) stage",
    ],
    questions: [
      { q: "Why does ARM require separate instruction and data memories?", a: "In a 5-stage pipeline, the IF stage fetches instructions from memory while the MEM stage accesses data memory simultaneously. If there's only one unified memory, both accesses cannot happen in the same cycle — a structural hazard. Separate I-cache (for instructions, used by IF) and D-cache (for data, used by MEM) eliminates this conflict. This is called the Harvard Architecture." },
    ],
  },

  "stage-fetch": {
    title: "Stage 1 — Fetch [IF]", emoji: "📥",
    tldr: "Fetches instruction from I-cache. PC updated: PC ← PC+4. Fetched instruction placed in IF/ID register.",
    explanation: `The Fetch stage is the entry point of the pipeline. It has exactly one job: get the next instruction.

What happens in the IF stage:
1. The current Program Counter (PC) value is used to access the Instruction Cache (I-cache).
2. The instruction at address PC is fetched and placed into the IF/ID pipeline register.
3. The PC is incremented: PC ← PC + 4 (since ARM instructions are 4 bytes = 32 bits, the next instruction is 4 bytes ahead).
4. The incremented PC value is passed along to the Decode stage (needed for branch target calculation).

The I-cache provides instruction data with low latency. The IF stage is kept simple so it can be done quickly and the pipeline can run at high clock speed.`,
    keyPoints: [
      "Fetches instruction from Instruction Cache (I-cache)",
      "PC updated: PC ← PC + 4 (next sequential instruction)",
      "Fetched instruction placed in IF/ID pipeline register",
      "Incremented PC also passed to ID stage (needed for branch offset calculation)",
      "Simple stage by design — must be fast to not limit pipeline speed",
      "Cannot be done from unified memory (would clash with MEM stage → structural hazard)",
    ],
    formula: {
      code: `IF Stage operations:
  1. Access I-cache using current PC
  2. Fetch instruction at Mem[PC]
  3. PC ← PC + 4
  4. Store fetched instruction in IF/ID register
  5. Pass PC+4 to next stage (for branch address calculation)

Datapath view:
  next PC ──► [+4] ──► PC for next cycle
         └──► [I-cache] ──► instruction ──► IF/ID register`,
      explanation: "PC+4 is needed in the Decode stage to calculate possible branch target addresses.",
    },
    examTips: [
      "Fetch accesses: I-cache (instruction cache), NOT data cache",
      "PC incremented by 4 (not 1) because ARM instructions are 4 bytes wide",
      "Fetched instruction goes into IF/ID pipeline register for the next stage",
    ],
    questions: [],
  },

  "stage-decode": {
    title: "Stage 2 — Decode [ID]", emoji: "🔍",
    tldr: "Decodes instruction, reads registers, sign-extends offset, computes branch target, tests equality. Branch resolved HERE (1 cycle penalty only).",
    explanation: `The Decode stage is more complex than it looks — many things happen simultaneously.

1. INSTRUCTION DECODE: The instruction bits are decoded to identify: the opcode, the destination register, and the source register specifiers. In RISC architectures (like ARM), register fields are always at fixed bit positions, so decoding and register reading can happen in parallel.

2. REGISTER READ: All source register operands are read from the register file. ARM's register file has 3 read ports, so most instructions can read all their operands in one cycle.

3. EQUALITY TEST: Source registers are compared for equality — this is needed to evaluate branch conditions (e.g., BEQ checks if R1 == R2).

4. SIGN EXTENSION: The offset field from the instruction is sign-extended (from, say, 12 bits to 32 bits) in case it's needed as a memory offset or branch offset.

5. BRANCH TARGET COMPUTATION: Branch target address = sign-extended offset × 4 + PC+8 (incremented PC from IF stage). This is computed speculatively.

6. BRANCH COMPLETION: If the branch condition is true (equality check passed), the branch target is stored into the PC at the END of the ID stage. This reduces branch penalty to only 1 wasted cycle.`,
    keyPoints: [
      "Instruction decoded → opcode, register specifiers identified",
      "Register file READ happens here (3 read ports in ARM → all operands in 1 cycle)",
      "Decoding and register read happen SIMULTANEOUSLY (RISC: fixed-position register fields)",
      "Equality test: registers compared (needed for branch evaluation)",
      "Sign extension: offset field extended to 32 bits",
      "Branch target computed: sign_extended_offset + PC+4 (incremented PC)",
      "Branch resolved at END of ID → only 1 fetch cycle wasted (branch penalty = 1)",
    ],
    formula: {
      code: `ID Stage parallel operations:
  Instruction Decode → opcode, Rd, Rn, Rm identified
  Register Read     → values of source registers fetched (3 ports)
  Equality Test     → Rn == Rm? (for branch condition)
  Sign Extension    → offset field → 32-bit signed value
  Branch Target     → sign_extended_offset + incremented_PC
  Branch Decision   → if condition met, PC ← branch target (at end of ID)

Why simultaneous decode + register read?
  RISC: Register fields always at same bit positions
  → No need to finish full decode before reading registers`,
      explanation: "Moving branch decision from EX to ID reduces branch penalty from 2 wasted cycles to 1.",
    },
    examTips: [
      "Decode + register read happen SIMULTANEOUSLY in RISC (register fields at fixed positions)",
      "Branch decision made at end of ID (not EX) → branch penalty = 1 cycle only",
      "3 read ports in ARM register file → all operands in 1 cycle",
      "Sign extension happens here for immediate offsets",
    ],
    questions: [
      { q: "Why can decoding and register reading happen simultaneously in the ID stage?", a: "In RISC architectures like ARM, the register specifier fields are always at the same fixed bit positions in every instruction. This means we can start reading the register file before the full decode is complete — we don't need to know the opcode to know which registers to read. This parallelism saves a cycle." },
    ],
  },

  "stage-execute": {
    title: "Stage 3 — Execute [EX]", emoji: "⚙️",
    tldr: "ALU does the actual computation. For memory: computes effective address. For arithmetic: does ADD/SUB/etc. Barrel shifter runs before ALU.",
    explanation: `The Execute stage is where the actual computation happens. The ALU (Arithmetic Logic Unit) operates here. Depending on the instruction type, it does one of three things:

1. MEMORY REFERENCE (LDR/STR): The ALU calculates the effective memory address. It adds the base register value to the offset: Effective_Address = Base_Register + Offset. This address is then used in the MEM stage to actually access memory.

2. REGISTER-REGISTER ALU (e.g., ADD R1, R2, R3): The ALU performs the arithmetic or logic operation (addition, subtraction, AND, OR, etc.) on two register values.

3. REGISTER-IMMEDIATE ALU (e.g., ADD R1, R2, #5): The ALU performs the operation on one register value and the sign-extended immediate constant.

The Execute stage also contains the BARREL SHIFTER, which shifts or rotates one operand before feeding it into the ALU. In ARM, this means you can do shift + ALU operation in one clock cycle. Data FORWARDING paths also connect here from later stages to avoid stalls.`,
    keyPoints: [
      "ALU performs the main operation of the instruction",
      "Memory instructions (LDR/STR): ALU computes effective address = Base + Offset",
      "Register-Register ALU: performs opcode operation on two register values",
      "Register-Immediate ALU: performs opcode operation on register + sign-extended immediate",
      "Barrel Shifter runs BEFORE ALU: shifts/rotates one operand first",
      "Forwarding paths connect here: results from later stages can be fed back to EX input",
      "Effective address for load/store is computed in EX (not MEM!)",
    ],
    formula: {
      code: `EX Stage for different instruction types:
  Memory (LDR/STR): EA = Rbase + sign_extended_offset
  Reg-Reg ALU:      Result = Rn OP Rm  (e.g., ADD R1,R2,R3 → R2+R3)
  Reg-Imm ALU:      Result = Rn OP Imm (e.g., ADD R1,R2,#5 → R2+5)

EX Stage hardware:
  [LDM/STM mux] → [Barrel Shifter] → [ALU] → EX/MEM register
                                       ↑
                           Forwarding from MEM/WB or EX/MEM`,
      explanation: "Barrel Shifter shifts one operand, then ALU gets: shifted_operand OP other_operand.",
    },
    examTips: [
      "Effective address for LOAD/STORE computed in EX stage (MCQ favourite!)",
      "Barrel shifter is in EX stage, before the ALU",
      "Forwarding paths connect to EX stage ALU inputs",
      "3 functions of EX: (1) EA for memory, (2) Reg-Reg ALU, (3) Reg-Imm ALU",
    ],
    questions: [],
  },

  "stage-memory": {
    title: "Stage 4 — Memory [MEM]", emoji: "💾",
    tldr: "For LDR: reads data from D-cache. For STR: writes data to D-cache. For ALU instructions: just buffers the result for 1 cycle.",
    explanation: `The Memory stage accesses the data cache (D-cache) if the instruction needs it.

FOR LOAD (LDR): The effective address computed in EX is used to read from the data cache. The loaded data is stored in the MEM/WB pipeline register and will be written to a register in the WB stage.

FOR STORE (STR): The effective address computed in EX is used to write to the data cache. The data to be stored comes from the second register that was read during the ID stage.

FOR ALU INSTRUCTIONS (e.g., ADD, SUB): No memory access is needed. The ALU result from EX is simply buffered (held) in the EX/MEM pipeline register for one cycle. It passes through MEM without doing anything special and then gets written to the register file in WB.

This is why ALU instructions and LDR instructions both go through 5 stages — even if ALU instructions don't use the MEM stage for memory access, they still pass through it (this solves the WB structural hazard).`,
    keyPoints: [
      "LDR: reads data from D-cache using effective address from EX",
      "STR: writes data to D-cache; data came from register read in ID",
      "ALU instructions: no memory access; result simply buffered for 1 cycle",
      "ALL instructions pass through MEM (even ALU ones) — prevents WB collision",
      "D-cache is separate from I-cache (Harvard Architecture requirement)",
      "The MEM stage result goes into MEM/WB pipeline register",
    ],
    formula: {
      code: `MEM Stage behavior by instruction type:
  LDR R1, [R2, #8]:  Read D-cache[EA]  → store in MEM/WB register
  STR R1, [R2, #8]:  Write D-cache[EA] ← value of R1 (from ID register read)
  ADD R1, R2, R3:     Pass-through → buffer ALU result in EX/MEM for 1 cycle

Data path:
  [EX/MEM register] ──► [D-cache access or bypass] ──► [MEM/WB register]`,
      explanation: "ALU instructions 'waste' the MEM stage but this is intentional — prevents WB collisions.",
    },
    examTips: [
      "MEM stage accesses: D-cache (data cache), not I-cache",
      "STR data source: second register read in ID stage (not EX output)",
      "ALU instructions still pass through MEM — buffers result, no cache access",
      "Load data available AFTER MEM → explains why load-use hazard needs 1 stall",
    ],
    questions: [],
  },

  "stage-writeback": {
    title: "Stage 5 — Write Back [WB]", emoji: "✍️",
    tldr: "Writes result to register file. Source: ALU result (for arithmetic) or memory data (for LDR). The register file is updated here.",
    explanation: `The Write Back stage is the final stage of the pipeline. Its sole job is to write the instruction's result back to the destination register in the register file.

The data written back comes from one of two sources:
1. FROM MEMORY (for LDR instructions): The data that was loaded from D-cache in the MEM stage is written to the destination register Rd.
2. FROM ALU (for ALU instructions): The arithmetic/logic result computed in EX (and buffered in MEM) is written to the destination register Rd.

A MUX selects which source to write based on the instruction type.

Important timing consideration: The WB stage writes to the register file in the FIRST HALF of the clock cycle. The ID stage reads from the register file in the SECOND HALF of the same cycle. This "partitioning" means both can happen in the same clock cycle without conflict — solving the structural hazard between WB and ID.`,
    keyPoints: [
      "Writes result to destination register Rd in the register file",
      "Two data sources: memory (for LDR) or ALU result (for ALU instructions)",
      "MUX selects between memory data and ALU data",
      "WB writes in FIRST HALF of clock cycle; ID reads in SECOND HALF — no conflict",
      "This partitioning is the solution to the structural hazard (Type 3: ID vs WB)",
      "After WB completes, the instruction is retired (fully finished)",
    ],
    formula: {
      code: `WB Stage:
  if (LDR instruction):
    Reg[Rd] ← D-cache_result  (data from memory)
  else:
    Reg[Rd] ← ALU_result      (arithmetic/logic result from EX)

Partitioning (solves ID vs WB structural hazard):
  1st half of clock cycle → WB writes to register file
  2nd half of clock cycle → ID reads from register file
  → Both can happen in the SAME clock cycle without conflict`,
      explanation: "Partitioning is an elegant hardware solution — no stall needed for the ID vs WB hazard.",
    },
    examTips: [
      "WB writes in 1st half, ID reads in 2nd half of SAME cycle → no conflict (partitioning)",
      "Partitioning solves Structural Hazard Type 3: ID vs WB",
      "WB data source: memory (LDR) or ALU result (arithmetic) — selected by MUX",
    ],
    questions: [],
  },

  // ─────────────────────────────────────────────
  // HAZARDS OVERVIEW
  // ─────────────────────────────────────────────
  "hazards-intro": {
    title: "What Are Pipeline Hazards?", emoji: "⚠️",
    tldr: "A hazard = any situation that prevents the next instruction from starting in its designated cycle. 3 types: Structural, Data, Control.",
    explanation: `Pipelining assumes that the next instruction can start every single clock cycle. But certain situations prevent this — these are called pipeline hazards.

A pipeline hazard is any condition that prevents the next instruction from executing in its designated pipeline cycle.

THREE TYPES OF HAZARDS:

1. STRUCTURAL HAZARD: Two instructions try to use the same hardware resource at the same time.
   Example: Both IF and MEM stages need memory access simultaneously (if unified memory).

2. DATA HAZARD: An instruction needs a value that hasn't been computed yet by a previous instruction.
   Example: ADD writes R2, then the very next instruction tries to read R2 before ADD finishes.

3. CONTROL HAZARD (Branch Hazard): A branch instruction changes the PC, making the instructions already fetched wrong.
   Example: After a BEQ, the pipeline has fetched 2 wrong instructions that must be thrown away.

All three types waste cycles (reduce throughput) and must be handled through hardware or software techniques.`,
    keyPoints: [
      "Hazard = prevents next instruction from executing in its designated cycle",
      "Hazards cause pipeline stalls or require special handling",
      "Type 1 — Structural: hardware resource conflict (same resource needed by 2 instructions)",
      "Type 2 — Data: value not ready when needed (dependency between instructions)",
      "Type 3 — Control: branch changes PC; already-fetched instructions become wrong",
      "All hazards reduce throughput by either stalling or flushing the pipeline",
      "Most common general solution: stall (insert bubble/NOP until hazard resolves)",
    ],
    formula: {
      code: `Three Types of Hazards:

1. STRUCTURAL — Resource conflict
   Example: IF and MEM both need unified memory at the same cycle

2. DATA — Value not ready
   ADD R2, R3, R4    ← writes R2 (completes at WB)
   SUB R5, R2, R1    ← reads R2 (needs at ID, but ADD's WB is later)

3. CONTROL — Branch disrupts sequential flow
   BEQ R1, R2, target ← if taken, instructions already in IF/ID are WRONG

Solutions summary:
  Structural → Split resources, force all stages, stall
  Data       → Reorder, NOP, stall, forwarding
  Control    → Stall, flush, delayed branch, branch prediction`,
      explanation: "Know the 3 types cold — exam questions often ask you to identify which type a scenario is.",
    },
    examTips: [
      "Definition of hazard: C) Prevents the next instruction from executing in its designated cycle",
      "3 types: Structural (hardware conflict), Data (value not ready), Control (branch)",
      "Most common solution for ANY hazard: stalling (inserting bubbles)",
      "Structural hazard is the only one that can be fully eliminated through hardware design",
    ],
    questions: [
      { q: "What is a pipeline hazard? List all three types with one example each.", a: "A pipeline hazard is any condition that prevents the next instruction from executing in its designated pipeline cycle. (1) Structural: IF and MEM both access unified memory same cycle. (2) Data: ADD writes R2, then next instruction reads R2 before ADD's WB completes. (3) Control: Branch changes PC; 2 instructions already fetched in pipeline become wrong." },
    ],
  },

  "cpi-stalls": {
    title: "CPI with Pipeline Stalls", emoji: "📉",
    tldr: "CPI_pipelined = 1 + stall_cycles_per_instruction. Speedup = pipeline_depth / (1 + stall_cycles). Ideal = 1 CPI.",
    explanation: `The ideal pipelined processor completes one instruction per cycle — ideal CPI = 1. But stalls increase the effective CPI.

Every time a hazard forces the pipeline to stall for one cycle, that's one extra clock cycle where no useful instruction completes. These are sometimes called "bubbles" — empty slots inserted into the pipeline.

CPI_pipelined = Ideal_CPI + pipeline_stall_cycles_per_instruction = 1 + stall_cycles_per_instruction

The speedup compared to the non-pipelined processor:
Speedup = Average_instruction_time (unpipelined) / Average_instruction_time (pipelined)
        = CPI_unpipelined / CPI_pipelined (if Tc is the same for both)

If all unpipelined instructions take k cycles:
Speedup = k / (1 + stall_cycles_per_instruction)

This formula shows: more stalls = lower speedup. Eliminating stalls directly improves performance.`,
    keyPoints: [
      "Ideal pipelined CPI = 1 (one instruction completes every cycle)",
      "Each stall cycle adds 1 to the effective CPI",
      "CPI_pipelined = 1 + stall_cycles_per_instruction",
      "Speedup = pipeline_depth / (1 + stall_cycles_per_instruction)",
      "No stalls → Speedup = pipeline depth (e.g., 5× for 5-stage pipeline)",
      "Stalls are also called 'bubbles' — empty instruction slots in the pipeline",
      "Example: 30% load/store, 1 stall each → CPI = 1 + 0.3×1 = 1.3 → Speedup = 5/1.3 = 3.85",
    ],
    formula: {
      code: `CPI_pipelined = Ideal CPI + stall cycles per instruction
             = 1 + stall_cycles_per_instruction

Speedup = Avg_instr_time_unpipelined / Avg_instr_time_pipelined
        = CPI_unpipelined / CPI_pipelined  (if Tc is equal for both)

If all unpipelined instructions = pipeline depth k:
  Speedup = k / (1 + stall_cycles_per_instruction)

Example: 5-stage pipeline, ideal CPI=1, 0.4 stall cycles per instruction:
  CPI_pipelined = 1 + 0.4 = 1.4
  Speedup = 5 / 1.4 = 3.57

Example: 30% are loads, 1 stall each (no forwarding):
  CPI = 1 + (0.30 × 1) = 1.3
  Speedup = 5 / 1.3 = 3.85`,
      explanation: "Every stall reduces throughput. The goal of forwarding and branch prediction is to minimize stall cycles.",
    },
    examTips: [
      "CPI = 1 + stall_cycles_per_instruction — memorise this",
      "Speedup = pipeline_depth / CPI_pipelined (when Tc is same)",
      "5-stage, 0.4 stalls/instr: Speedup = 5/(1+0.4) = 5/1.4 = 3.57 → B)",
      "0 stalls: Speedup = pipeline depth. This is the ideal.",
    ],
    questions: [
      { q: "5-stage pipeline, ideal CPI=1, 0.4 stall cycles per instruction. What is the speedup?", a: "CPI_pipelined = 1 + 0.4 = 1.4. Speedup = pipeline_depth / CPI_pipelined = 5 / 1.4 = 3.57." },
    ],
  },

  // ─────────────────────────────────────────────
  // STRUCTURAL HAZARDS
  // ─────────────────────────────────────────────
  "structural-if-mem": {
    title: "Structural Hazard Type 1 — IF vs MEM", emoji: "🏛️",
    tldr: "IF and MEM both try to access unified memory in the same clock cycle. Solution: Split into Harvard Architecture (separate I-cache + D-cache).",
    explanation: `This is the first type of structural hazard — when two different pipeline stages need the same hardware resource simultaneously.

The problem: In a 5-stage pipeline, the IF stage (stage 1) needs to fetch an instruction from memory. At the same time, if a LOAD or STORE instruction is in the MEM stage (stage 4), it also needs to access memory. If there is only ONE unified memory, both accesses can't happen simultaneously.

Example timing conflict:
- At cycle 4: Load is in MEM stage (needs memory), and Instruction 4 is in IF stage (also needs memory). CONFLICT!

The solution is Harvard Architecture: use SEPARATE instruction and data memories.
- Instruction Cache (I-cache): used exclusively by the IF stage
- Data Cache (D-cache): used exclusively by the MEM stage
- Since they're different physical memories, no conflict occurs

ARM9's datapath explicitly shows I-cache connected to the Fetch stage and D-cache connected to the Buffer/Data stage.`,
    keyPoints: [
      "Problem: IF needs memory + MEM stage also needs memory at the SAME clock cycle",
      "This only happens when a LOAD or STORE is in the MEM stage",
      "Unified memory = only one bus = two requests = conflict",
      "Solution: Harvard Architecture = separate I-cache (instructions) + D-cache (data)",
      "I-cache connected to IF stage; D-cache connected to MEM stage",
      "Now IF and MEM can both access memory simultaneously without conflict",
      "ARM architecture requires this separation by design",
    ],
    formula: {
      code: `Problem timeline (unified memory):
  Cycle:   1    2    3    4    5    6    7
  Load:    IF   ID  EXE [MEM] WB
  Instr1:      IF   ID   EXE  MEM  WB
  Instr2:           IF   ID   EXE  MEM   WB
  Instr3:               [IF] ← CONFLICT with Load's MEM at cycle 4!

Solution: Split Memory (Harvard Architecture)
  IF stage → accesses I-cache (instruction memory only)
  MEM stage → accesses D-cache (data memory only)
  → No conflict: they're different physical memories`,
      explanation: "Harvard Architecture is the standard solution and is used in virtually all modern processors.",
    },
    examTips: [
      "Solution to IF vs MEM structural hazard = D) Split unified memory (Harvard Architecture)",
      "Harvard Architecture: I-cache for instructions, D-cache for data — always separate",
      "This hazard ONLY occurs for LOAD/STORE instructions (others don't use MEM stage for memory)",
      "ARM requires this separation — it's part of the ARM9 architecture by design",
    ],
    questions: [
      { q: "What causes the IF vs MEM structural hazard and how is it solved?", a: "Cause: The IF stage needs to read the instruction cache while a LOAD/STORE in the MEM stage needs to read/write the data cache, simultaneously. With a unified single memory, both accesses cannot happen in the same cycle — structural conflict. Solution: Harvard Architecture — separate the memory into Instruction Cache (I-cache, for IF) and Data Cache (D-cache, for MEM). Both can now operate simultaneously with no conflict." },
    ],
  },

  "structural-wb-wb": {
    title: "Structural Hazard Type 2 — WB vs WB", emoji: "⚡",
    tldr: "Two instructions reach WB simultaneously but only one write port exists. Solution: (1) Stall, or (2) Force all instructions through all 5 stages.",
    explanation: `This hazard occurs when two instructions try to write to the register file in the same clock cycle, but the register file only has ONE write port.

How can two instructions be in WB at the same time? ALU instructions (like AND, ORR) don't use the MEM stage — they skip it. So an ALU instruction that started right after a LOAD instruction might reach WB at the same cycle as the LOAD (which had to go through all 5 stages including MEM).

Example: LDR R2,[R1] takes stages: IF, ID, EX, MEM, WB. AND R4,R4,R5 takes: IF, ID, EX, WB (skips MEM). If AND starts one cycle after LDR, both finish WB at the same time!

SOLUTION 1: STALL — Insert a bubble after AND/ORR to delay their WB by one cycle. This wastes a cycle.

SOLUTION 2: FORCE ALL INSTRUCTIONS THROUGH ALL 5 STAGES — Even if AND doesn't need MEM, it still passes through an MEM "idle" stage. This ensures WB happens at predictable times without collision.`,
    keyPoints: [
      "Problem: register file has only 1 write port, but 2 instructions reach WB simultaneously",
      "Happens because ALU instructions skip the MEM stage (shorter path through pipeline)",
      "LDR completes 5 stages; AND completes 4 stages → can finish at same cycle if staggered right",
      "Solution 1: Stall — insert bubble to delay shorter-path instruction's WB",
      "Solution 2: Force all instructions to go through all 5 stages — predictable WB timing",
      "Solution 2 preferred: no stalls, uniform stage count, clean pipeline behavior",
    ],
    formula: {
      code: `Problem (AND skips MEM → WB collision):
  Cycle:      1   2   3   4   5
  LDR R2,[R1]: IF  ID  EXE MEM [WB]
  AND R4,R4,R5:   IF  ID  EXE  [WB]  ← COLLISION at cycle 5!

Solution 1: Stall (insert bubble):
  LDR R2,[R1]: IF  ID  EXE  MEM  WB
  AND R4,R4,R5:   IF  ID   EXE  Bubble WB  ← bubble inserted, WB shifts to cycle 6

Solution 2: Force all through 5 stages (AND passes through MEM even though it doesn't use it):
  LDR R2,[R1]: IF  ID  EXE  MEM  WB
  AND R4,R4,R5:   IF  ID   EXE  MEM  WB  ← forced through MEM, no collision`,
      explanation: "Solution 2 is cleaner: all instructions take exactly 5 cycles, WB never collides.",
    },
    examTips: [
      "WB vs WB hazard: ALU instructions skip MEM → catch up to LDR at WB stage",
      "Two solutions: (1) stall/bubble, (2) force all 5 stages for all instructions",
      "Solution 2 is preferred — uniform pipeline behavior, no wasted cycles",
      "This is a STRUCTURAL hazard (single write port to register file)",
    ],
    questions: [],
  },

  "structural-id-wb": {
    title: "Structural Hazard Type 3 — ID vs WB (Partitioning)", emoji: "🔄",
    tldr: "ID reads register file while WB writes to it in the same cycle. Solution: Partitioning — WB writes in 1st half, ID reads in 2nd half. No stall needed!",
    explanation: `This hazard is subtle but important. The Decode stage (ID) reads registers from the register file. The Write Back stage (WB) writes to the register file. These two operations can happen in the same clock cycle when different instructions are in ID and WB simultaneously.

If the WB instruction is writing to the same register that the ID instruction is trying to read, we have a conflict — which value does ID read, old or new?

The elegant solution is PARTITIONING: divide the clock cycle into two halves.
- First half of the clock cycle → WB writes to the register file
- Second half of the clock cycle → ID reads from the register file

Since WB completes its write in the first half, when ID reads in the second half, it sees the freshly-written value. No stall is needed! Both can happen in the same clock cycle without any conflict.

This works because register reads and writes are separate operations on the register file's read and write ports.`,
    keyPoints: [
      "Problem: WB stage writes to register file; ID stage reads from register file — same cycle",
      "Conflict if WB is writing to the same register that ID needs to read",
      "Solution: Partitioning — divide clock cycle into halves",
      "1st half of clock cycle → WB performs the write",
      "2nd half of clock cycle → ID performs the read (gets the fresh value!)",
      "No stall needed — both happen in ONE clock cycle without conflict",
      "This is the most elegant of the three structural hazard solutions",
    ],
    formula: {
      code: `Problem:
  Cycle:   1   2   3   4    5    6    7
  Load:    IF  ID  EXE MEM  WB
  Instr3:              IF  [ID] ← reads register file
                            ↑
                     Load's WB also writes at cycle 5!

Solution: Partitioning (divide clock cycle in half):
  Cycle 5, 1st half → Load's WB writes the register
  Cycle 5, 2nd half → Instr3's ID reads the register (gets fresh value!)

No collision. No stall. Both happen in same clock cycle.

Physical implementation:
  Register file: write port active in 1st half (falling edge)
                 read port active in 2nd half (rising edge of next)`,
      explanation: "Partitioning is a free solution — it only requires careful timing of the register file, no extra cycles.",
    },
    examTips: [
      "Partitioning = WB writes 1st half, ID reads 2nd half of SAME cycle",
      "This is the solution to structural hazard TYPE 3 (ID vs WB register file conflict)",
      "No stall needed — elegant and free in terms of performance",
      "This is also called 'register file with overlapping read/write' or 'first-half write'",
    ],
    questions: [
      { q: "What is the partitioning solution to the ID vs WB structural hazard?", a: "The clock cycle is divided into two halves. In the first half, the WB stage writes its result to the register file. In the second half, the ID stage reads the register file. Since the write completes before the read begins (within the same cycle), the ID stage always reads the correct (freshly-written) value. No stall is needed." },
    ],
  },

  "structural-perf": {
    title: "Structural Hazard Performance Impact", emoji: "📊",
    tldr: "Speedup = pipeline_depth / (1 + stall_cycles). 30% load/store, 1 stall each → CPI=1.3 → Speedup=3.85 (vs ideal 5).",
    explanation: `Structural hazards reduce pipeline throughput by forcing stall cycles. We can quantify this performance impact.

For a 5-stage pipeline where 30% of instructions are LOAD/STORE and each causes 1 stall cycle (e.g., due to unified memory conflict):
  CPI_pipelined = 1 + (fraction × stalls per instruction)
               = 1 + (0.30 × 1) = 1.3
  Speedup = 5 / 1.3 = 3.85 (vs ideal 5×)

In the worst case from slides: CPI = 1 + (3 × 0.3) = 1.9 → Speedup = 5 / 1.9 = 2.63

From the slides' structural hazard speedup exercise:
  Ideal machine speedup = k
  Real machine speedup (with hazard stalls) = (1.25 × k) / (1.25 + 0.42)
  Required speedup = Ideal/Real = 1.67/1.25 = 1.34×`,
    keyPoints: [
      "Structural hazard stalls reduce effective CPI",
      "CPI = 1 + (fraction_causing_hazard × stalls_per_hazard)",
      "30% load/store, 1 stall → CPI = 1.3 → Speedup = 5/1.3 = 3.85",
      "The further from ideal CPI=1, the more the hazard is hurting performance",
      "Harvard Architecture eliminates IF vs MEM structural hazard COMPLETELY",
      "More types of structural hazards = more stalls = lower speedup",
    ],
    formula: {
      code: `Speedup formula with stalls:
  Speedup = Pipeline depth / (1 + stall_cycles_per_instruction)

Example 1: 30% load/store, 1 stall each
  CPI = 1 + (0.30 × 1) = 1.3
  Speedup = 5 / 1.3 = 3.85

Example 2 (worst case): 30% load/store, 3 stalls each
  CPI = 1 + (3 × 0.30) = 1.9
  Speedup = 5 / 1.9 = 2.63

Exercise: MIPS32, data refs = 42%, ideal CPI = 1.25, 1 stall per data ref:
  Real speedup = (1.25 × k) / (1.25 + 0.42) = (1.25k) / 1.67
  Ideal speedup = (1.25 × k) / (1.25 + 0) = k
  Required speedup (how much faster ideal is) = k / (1.25k/1.67) = 1.67/1.25 = 1.34×`,
      explanation: "More stalls = higher CPI = lower speedup. Eliminating hazards directly improves performance.",
    },
    examTips: [
      "5-stage, 0.4 stalls/instr: Speedup = 5/(1+0.4) = 3.57",
      "30% loads, 1 stall: CPI = 1.3, Speedup = 3.85",
      "Worst case: more stalls per hazard type = much lower speedup",
    ],
    questions: [],
  },

  // ─────────────────────────────────────────────
  // DATA HAZARDS
  // ─────────────────────────────────────────────
  "data-hazard-scenario": {
    title: "Data Hazard Scenario", emoji: "🔴",
    tldr: "ADD writes R3, but LDR immediately tries to use R3 before ADD's WB completes. R3 still holds old stale value at ID time.",
    explanation: `Let's see exactly how a data hazard causes a wrong result.

Suppose registers hold R3=6, R10=20, R11=22. Then:

  ADD R3, R10, R11   → should write R3 = 20+22 = 42
  LDR R8, [R3, #50]  → should load from address 42+50 = 92
  SUB R11, R8, R7    → should subtract

The problem: When LDR is in its ID stage (reading R3's value from the register file), ADD hasn't completed its WB stage yet. ADD's result (42) is sitting in the pipeline but not yet written to R3 in the register file. So when LDR reads R3, it gets the OLD value 6, not 42!

LDR then computes address 6+50=56 instead of 92. Wrong result!

This is called a Read After Write (RAW) hazard — LDR reads before ADD has written.`,
    keyPoints: [
      "Data hazard = instruction reads a register before the writing instruction has finished",
      "Pipeline stages: ADD writes R3 at WB; LDR reads R3 at ID — ID comes BEFORE WB",
      "Wrong value read: register file still has stale data from before ADD ran",
      "R3=6 (stale) read instead of R3=42 (correct) → wrong memory address",
      "This is called RAW (Read After Write) — the most critical data hazard type",
      "Hazard depth = 3: instructions 1, 2, or 3 positions after the writer are affected",
    ],
    formula: {
      code: `Registers: R3=6, R10=20, R11=22

ADD R3, R10, R11:  IF  ID  EX  MEM  WB ← writes R3=42 at WB (cycle 5)
LDR R8, [R3, #50]:     IF  ID ← reads R3 at ID (cycle 3) — but ADD's WB is at cycle 5!

At cycle 3 (LDR's ID): R3 in register file still = 6 (old value)
LDR computes address: 6 + 50 = 56 ← WRONG! (should be 42+50=92)

Correct R3 (=42) not available until cycle 5 (ADD's WB)
But LDR needs it at cycle 3 — 2 cycles too early!`,
      explanation: "The pipeline moves faster than the register file gets updated — this is the core of data hazards.",
    },
    examTips: [
      "MCQ: 'ADD R3, R10, R11 followed by LDR R8,[R3]' → hazard cause = C) LDR reads R3 before ADD has written the updated value",
      "Data hazard = instruction needs value not yet written to register file",
      "Depth of hazard = 3 (affects instructions 1, 2, 3 positions after the writer)",
    ],
    questions: [
      { q: "Why does 'ADD R3, R10, R11' followed by 'LDR R8, [R3, #50]' cause a data hazard?", a: "ADD writes the result (42) to R3 only at its WB stage (cycle 5). But LDR needs to read R3 at its ID stage (cycle 3) — 2 cycles before ADD's WB. At cycle 3, R3 in the register file still holds the old stale value (e.g., 6). LDR computes the wrong address (6+50=56 instead of 42+50=92), producing an incorrect result." },
    ],
  },

  "hazard-depth": {
    title: "Depth of Hazard", emoji: "📏",
    tldr: "Depth = 3. Instructions 1, 2, or 3 positions after the writer are affected. Instructions 4+ are safe. 2 NOPs needed to resolve.",
    explanation: `The "depth of hazard" tells us how many consecutive instructions after the writer instruction are affected by the data hazard.

In a 5-stage pipeline, a writing instruction completes WB at cycle 5. Reading instructions need the value at their ID stage (cycle 2 of their own execution).

For the sequence starting with: sub R2, R1, R3 (writes R2):
- And R4, R2, R5: reads R2 at cycle 3 (its ID). But sub's WB is cycle 5. Gap = 2 cycles short → HAZARD
- Orr R10, R6, R2: reads R2 at cycle 4 (its ID). Sub's WB still cycle 5. Gap = 1 cycle short → HAZARD  
- Add R4, R2, R2: reads R2 at cycle 5 (its ID). Sub's WB is also cycle 5. HAZARD (tie — same cycle)
- Str R5, [R2, #100]: reads R2 at cycle 6. Sub's WB at cycle 5. Gap = WB completes before ID → SAFE!

So instructions at positions 1, 2, 3 after the writer are affected. The instruction at position 4 is just barely safe. Depth of hazard = 3.`,
    keyPoints: [
      "Depth of hazard = 3 in a standard 5-stage pipeline",
      "Instructions 1, 2, 3 positions after the writer are affected (RAW hazard)",
      "Instruction 4 positions after the writer is safe (WB completes before its ID)",
      "Without forwarding: need 2 NOPs between writer and first reader to be safe",
      "With forwarding: depth reduced (EX→EX forwarding handles 1-apart instructions)",
      "This 'depth=3' motivates needing 3 independent instructions or 2 NOPs between writer and reader",
    ],
    formula: {
      code: `sub R2, R1, R3:        IF  ID  EX  MEM  WB    ← writes R2 at WB (cycle 5)
and R4, R2, R5:            IF  ID  EX   MEM  WB  ← reads R2 at ID (cycle 3)  HAZARD! (3 vs 5)
orr R10, R6, R2:               IF  ID   EX   MEM  WB ← reads R2 at ID (cycle 4)  HAZARD! (4 vs 5)
add R4, R2, R2:                    IF   ID   EX  MEM WB ← reads R2 at ID (cycle 5)  HAZARD! (same cycle)
str R5, [R2, #100]:                     IF   ID  EX MEM WB ← reads R2 at ID (cycle 6)  SAFE! (after WB)

DEPTH OF HAZARD = 3 (first 3 instructions after writer are affected)`,
      explanation: "At depth=3, the reader's ID happens at the SAME cycle as the writer's WB — still a hazard unless partitioning is used.",
    },
    examTips: [
      "Depth of hazard = 3 in standard 5-stage, no forwarding",
      "Need 2 NOPs (or 2 independent instructions) between writer and reader to be safe",
      "Instructions at positions 1, 2, 3 after writer → HAZARD. Position 4 → SAFE",
      "With forwarding, can reduce to 0 NOPs for define-use, 1 stall for load-use",
    ],
    questions: [],
  },

  "raw-war-waw": {
    title: "RAW, WAR, WAW — Three Data Dependency Types", emoji: "🔗",
    tldr: "RAW = true dependency (real hazard). WAR and WAW = false dependencies (register name reuse). WAR/WAW don't occur in standard 5-stage in-order pipeline.",
    explanation: `There are exactly three types of data dependencies that can cause hazards:

RAW — READ AFTER WRITE (True Dependency / Flow Dependency):
Instruction J reads a register BEFORE Instruction I has written to it. This is the ONLY true dependency — J genuinely needs I's result. Cannot be eliminated by renaming.
  I: ADD R1, R2, R3   ← writes R1
  J: SUB R4, R1, R3   ← reads R1 (before ADD completes) → HAZARD

WAR — WRITE AFTER READ (Anti-Dependency):
Instruction J writes a register BEFORE Instruction I has read it. Called "anti-dependence" because it results from reuse of the register name, not a genuine data need. In standard 5-stage in-order pipeline: reads always happen in stage 2 (ID), writes always in stage 5 (WB), so writes always come AFTER reads in order → WAR cannot happen.

WAW — WRITE AFTER WRITE (Output Dependency):
Both I and J write to the same register. Again, results from register name reuse, not real data need. In standard 5-stage in-order pipeline: writes happen in the same order as instruction issue → WAW cannot happen.

WAR and WAW only become problems in out-of-order execution, where instructions can execute in different order than they were issued.`,
    keyPoints: [
      "RAW = Read After Write = TRUE DEPENDENCY — cannot be eliminated by renaming",
      "WAR = Write After Read = Anti-Dependency — false dependency from register reuse",
      "WAW = Write After Write = Output Dependency — false dependency from register reuse",
      "In standard 5-stage in-order pipeline: only RAW causes actual hazards",
      "WAR doesn't happen: reads at stage 2, writes at stage 5 → writes always after reads in order",
      "WAW doesn't happen: write order preserved in in-order execution",
      "WAR and WAW can cause problems in out-of-order execution → solved by register renaming",
    ],
    formula: {
      code: `RAW (True Dependency) — THE REAL HAZARD:
  I: add r1, r2, r3      ← writes r1
  J: sub r4, r1, r3      ← reads r1 before ADD completes → HAZARD

WAR (Anti-Dependency) — FALSE (only dangerous out-of-order):
  I: sub r4, r1, r3      ← reads r1
  J: add r1, r2, r3      ← writes r1 (does J write before I reads? Only out-of-order)
  K: mul r6, r1, r7

WAW (Output Dependency) — FALSE (only dangerous out-of-order):
  I: sub r1, r4, r3      ← writes r1
  J: add r1, r2, r3      ← also writes r1 (which value does K see?)
  K: mul r6, r1, r7

5-Stage In-Order Pipeline: reads at stage 2, writes at stage 5 → order preserved
  → WAR and WAW CANNOT HAPPEN in standard 5-stage in-order pipeline`,
      explanation: "Remember: RAW=real problem, WAR/WAW=false problems fixed by renaming or in-order execution.",
    },
    examTips: [
      "RAW = only TRUE dependency = only real hazard in 5-stage in-order pipeline",
      "WAR and WAW = false dependencies = don't occur in standard 5-stage in-order pipeline",
      "'True Dependency' = RAW = B) Read After Write",
      "WAR/WAW prevented by: all instructions take 5 stages, reads at stage 2, writes at stage 5",
    ],
    questions: [
      { q: "Why don't WAR and WAW hazards occur in the standard 5-stage in-order pipeline?", a: "In the standard 5-stage pipeline, all instructions take exactly 5 stages in order. Reads always happen at stage 2 (ID), and writes always happen at stage 5 (WB). Since stages are processed in order, writes always come after reads — WAR cannot happen. And since all writes happen at stage 5 in issue order — WAW cannot happen either. Both are false dependencies only dangerous in out-of-order execution." },
    ],
  },

  "register-renaming": {
    title: "Register Renaming (WAR/WAW Solution)", emoji: "🔄",
    tldr: "WAR/WAW caused by register name reuse. Fix: rename register to a free one so the two instructions no longer share a name. Dependency disappears.",
    explanation: `WAR and WAW are called "false dependencies" because they don't represent a genuine data need — they only arise because two instructions happen to use the same register name.

WAR example: i1 multiplies using r2. Then i2 adds and wants to write result to r2. If i2 executes before i1 reads r2 (out-of-order), i2's write would overwrite r2 before i1 reads it — wrong!
  FIX: Rename r2 in i2 to a free register r6. Now i1 reads original r2, i2 writes r6 — no conflict.

WAW example: i1 writes r1. i2 also writes r1. If i2 finishes before i1 (out-of-order), r1 has i2's value and then i1 overwrites it — but i3 needed i2's value!
  FIX: Rename r1 in i2 to a different register. Both write different registers, no conflict.

Register renaming is handled automatically by the compiler during register allocation. Modern hardware also does it dynamically using a physical register file much larger than the logical register file.`,
    keyPoints: [
      "WAR/WAW are 'false dependencies' — result from register name reuse, not real data needs",
      "Fix: rename the conflicting register to a free (unused) register",
      "After renaming, the two instructions use different registers — dependency disappears",
      "Compiler handles this during register allocation phase",
      "Modern CPUs do it in hardware using a large physical register file (register renaming engine)",
      "WAR: rename destination of later instruction to different register",
      "WAW: rename one of the writers to a different register",
    ],
    formula: {
      code: `WAR Example (Anti-Dependency):
  Before:                   After (rename r2 → r6 in i2):
  i1: mul r1, r2, r3       i1: mul r1, r2, r3   ← unchanged
  i2: add r2, r4, r5       i2: add r6, r4, r5   ← r2 renamed to r6
  → No more conflict! i1 still reads original r2; i2 writes r6.

WAW Example (Output Dependency):
  Before:                   After (rename r1 → r6 in i2):
  i1: mul r1, r2, r3       i1: mul r1, r2, r3   ← unchanged
  i2: add r1, r4, r5       i2: add r6, r4, r5   ← r1 renamed to r6
  → No more conflict! i1 writes r1; i2 writes r6.`,
      explanation: "Renaming eliminates false dependencies by giving each 'conceptual value' its own unique register name.",
    },
    examTips: [
      "Register renaming = solution to WAR and WAW dependencies",
      "Done by compiler (register allocation) or hardware (physical register file)",
      "'i1: MUL r1, r2, r3 and i2: ADD r1, r4, r5' → type = C) WAW — Write After Write",
    ],
    questions: [],
  },

  // ─────────────────────────────────────────────
  // DATA HAZARD SOLUTIONS
  // ─────────────────────────────────────────────
  "raw-solutions": {
    title: "4 Solutions to RAW Data Hazards", emoji: "🛠️",
    tldr: "2 SW: (1) reorder instructions, (2) insert NOPs. 2 HW: (1) stall/bubble, (2) data forwarding. Forwarding is best — no wasted cycles.",
    explanation: `RAW (Read After Write) is the only real data hazard in a 5-stage pipeline. There are 4 ways to handle it:

SOFTWARE SOLUTIONS (compiler does this before the program runs):
1. Instruction Re-ordering: Rearrange instructions so independent ones fill the gap between writer and reader. Best option — no wasted cycles, no code size increase.
2. Insert NOPs: If no independent instructions available, insert NOP (No Operation) instructions to create the needed delay. Wastes cycles and increases code size.

HARDWARE SOLUTIONS (CPU does this at runtime):
1. Stalls (Bubbles): The hardware hazard detection unit detects the conflict and freezes the pipeline, inserting bubble cycles. Safe but wastes cycles.
2. Data Forwarding (Short-Circuiting / Register Bypassing): Instead of waiting for the result to be written to the register file, forward it directly from where it was computed (EX stage output) to where it's needed (EX stage input of the next instruction). Zero extra cycles for most cases.`,
    keyPoints: [
      "4 solutions: 2 software, 2 hardware",
      "SW 1: Reorder — move independent instructions to fill the hazard gap",
      "SW 2: Insert NOPs — create delay artificially; wastes cycles, increases code size",
      "HW 1: Stalls — hardware detects and freezes pipeline; safe but wastes cycles",
      "HW 2: Data Forwarding — pass result directly from EX output to next EX input; best solution",
      "Forwarding (short-circuiting / register bypassing) eliminates most RAW stalls",
      "Even with forwarding, load-use hazard still needs 1 stall cycle",
    ],
    formula: {
      code: `Solution Summary:
  Domain    │ Solution             │ Pros              │ Cons
  ──────────┼──────────────────────┼───────────────────┼──────────────────
  Software  │ Instruction reorder  │ No waste          │ Compiler must find gap
  Software  │ Insert NOPs          │ Always works       │ Wastes cycles, bigger code
  Hardware  │ Stalls/Bubbles       │ Always correct     │ Wastes cycles
  Hardware  │ Data Forwarding      │ Zero stalls (usually) │ Extra hardware (MUXes)

Forwarding is the preferred HW solution:
  ALU result available after EX → feed directly to next instruction's EX input
  No need to wait for MEM and WB stages to complete`,
      explanation: "Best practice: compile with reordering enabled + hardware forwarding → fewest stalls.",
    },
    examTips: [
      "4 solutions: reorder, NOP, stall, forwarding — know all four",
      "Forwarding = short-circuiting = register bypassing (all same thing, different names)",
      "How can compiler resolve hazard without code size increase? → A/B) Instruction Re-ordering",
      "NOPs needed between producer and consumer without forwarding? → B) 2 NOPs",
    ],
    questions: [],
  },

  "instruction-reorder": {
    title: "SW Solution 1 — Instruction Re-ordering", emoji: "🔀",
    tldr: "Compiler moves independent instructions to fill the gap between writer and reader. No extra cycles, no extra instructions. Best software solution.",
    explanation: `The compiler can look ahead and rearrange instructions to separate dependent ones by enough cycles that the hazard disappears.

Requirement: Need at least 3 independent instructions between the writer and reader (or 2 with forwarding). These instructions must not depend on each other or on the writer/reader.

Example: ADD R0, R0, R1 writes R0. ADD R5, R0, R4 reads R0 — they're 1 instruction apart (not safe, need 3 apart). The compiler can look for independent instructions elsewhere in the program and move them in between.

Before reordering: ADD R0, R0, R1; ADD R2, R3, R4; ADD R5, R0, R4; SUB R6, R4, R7; XOR R8, R4, R7
After reordering: ADD R0, R0, R1; ADD R2, R3, R4; SUB R6, R4, R7; XOR R8, R4, R7; ADD R5, R0, R4

Now ADD R5 is 4 instructions after ADD R0 — safe! And we didn't add any instructions, didn't waste any cycles.`,
    keyPoints: [
      "Compiler analyzes program for dependencies and reorders independent instructions",
      "Goal: separate writer and reader by ≥3 independent instructions",
      "Independent instructions = those not depending on writer/reader result",
      "Reduces program execution time without increasing code size",
      "Best software solution: zero performance cost",
      "Compiler may not always find enough independent instructions to fill all slots",
      "If not enough independent instructions exist, must fall back to NOPs",
    ],
    formula: {
      code: `Before reordering (hazard — only 1 instruction gap):
  ADD R0, R0, R1     ← writes R0
  ADD R2, R3, R4     ← independent
  ADD R5, R0, R4     ← reads R0 (only 1 apart — HAZARD!)
  SUB R6, R4, R7     ← independent
  XOR R8, R4, R7     ← independent

After reordering (compiler-scheduled — 3 instructions gap):
  ADD R0, R0, R1     ← writes R0
  ADD R2, R3, R4     ← moved: independent, fills slot 1
  SUB R6, R4, R7     ← moved: independent, fills slot 2
  XOR R8, R4, R7     ← moved: independent, fills slot 3
  ADD R5, R0, R4     ← reads R0 (now 4 apart — SAFE!)`,
      explanation: "No extra cycles, no code size increase — the same instructions just in a better order.",
    },
    examTips: [
      "Instruction reordering = compiler moves independent instructions to fill hazard slots",
      "Need 3-instruction gap (no forwarding) or 1-instruction gap (with forwarding)",
      "No code size increase, no wasted cycles — best compiler solution",
      "Contrast with NOP: NOP wastes cycles AND increases code size",
    ],
    questions: [],
  },

  "insert-nops": {
    title: "SW Solution 2 — Insert NOPs", emoji: "🚫",
    tldr: "When no independent instruction fills the gap, insert NOP (No Operation). Without forwarding: need 2 NOPs. With forwarding and load-use: need 1 NOP.",
    explanation: `When the compiler cannot find independent instructions to fill the hazard slots, it inserts NOP (No Operation) instructions. A NOP does nothing — it just occupies a cycle to create the required delay.

In ARM assembly, NOP can be coded as MOV R0, R0 (move R0 to itself — no effect).

Without forwarding: The reader instruction needs the writer's result, which is available after WB (cycle 5 of writer). The reader reads at ID (cycle 2 of reader). Gap needed = 5 - 2 = 3 cycles. So 2 NOPs are needed (gap = 3 instructions total: the 2 NOPs + the writer itself count as 3 before the reader).

With forwarding: The result is forwarded from EX to EX, so reader can get result 1 cycle after writer's EX. Only 0 extra NOPs for register-register. But for load-use (LDR result only available after MEM), 1 stall/NOP is still needed.

NOPs waste cycles and increase code size — used only when reordering is impossible.`,
    keyPoints: [
      "NOP = No Operation = does nothing, just occupies one pipeline cycle",
      "In ARM: NOP coded as MOV R0, R0",
      "Without forwarding: 2 NOPs needed between writer and reader",
      "With forwarding: 0 NOPs for define-use, 1 NOP for load-use",
      "NOPs waste cycles (throughput decreases) and increase code size",
      "Used only when no independent instruction can fill the slot",
    ],
    formula: {
      code: `Without forwarding (need 2 NOPs = 3-cycle gap):
  sub   R2, R1, R3     ← writes R2
  NOP                  ← 1 (gap 1)
  NOP                  ← 2 (gap 2)
  and   R4, R2, R5     ← reads R2 (3 instructions after write → safe)

With forwarding, for load-use (need 1 NOP):
  ldr   R6, [R2, #4]   ← writes R6 (available after MEM stage)
  NOP                  ← 1 stall cycle
  add   R4, R5, R6     ← reads R6 (safe with forwarding after 1 stall)

Why 2 NOPs without forwarding?
  Writer WB = cycle 5. Reader ID = cycle 2. Gap needed = 3.
  2 NOPs make reader's position 4 after writer (cycle 2+3=5 = WB cycle → just safe).`,
      explanation: "2 NOPs without forwarding. 1 NOP for load-use with forwarding. 0 NOPs for ALU-to-ALU with forwarding.",
    },
    examTips: [
      "NOPs needed without forwarding: B) 2 NOPs between producer and consumer",
      "1 NOP needed for load-use even with forwarding",
      "MOV R0, R0 = NOP in ARM (copies R0 to R0, no effect)",
      "NOPs are bad: waste cycles AND increase code size — only use if no other option",
    ],
    questions: [],
  },

  "stall-bubbles": {
    title: "HW Solution 1 — Stalls (Bubbles)", emoji: "🫧",
    tldr: "Hazard Detection Unit detects the conflict, freezes the pipeline, and inserts bubble (empty) cycles. Automatic, always correct, but wastes cycles.",
    explanation: `Hardware stalls are the automatic, always-correct solution. The CPU's Hazard Detection Unit continuously monitors the pipeline for data dependencies.

How it works:
1. The Hazard Detection Unit compares the destination register of instructions in the EX, MEM, and WB stages with the source registers of the instruction currently in the ID stage.
2. If a match is found (i.e., an instruction in ID is trying to read a register that hasn't been written yet), the unit:
   - Stalls the IF and ID stages (keeps the same instruction in ID for one more cycle)
   - Inserts a "bubble" (NOP) into the EX stage
   - The pipeline resumes normally after the required delay

The "bubble" is an empty instruction slot that propagates through the pipeline without doing anything useful. It's called a bubble because like an air bubble, it has no content.

Disadvantage: wastes cycles — throughput drops during stall cycles. But it's automatic and requires no compiler intervention.`,
    keyPoints: [
      "Hardware automatically detects RAW hazards using a Hazard Detection Unit",
      "Detection: compare destination register (EX/MEM/WB stages) with source registers (ID stage)",
      "On hazard: freeze IF and ID stages; insert bubble (NOP) into EX",
      "Pipeline resumes normally after required stall cycles",
      "Bubble = empty slot with no instruction = propagates harmlessly through pipeline",
      "Automatically correct — no compiler needed. But wastes cycles.",
      "Example: 2 stall cycles for 3-instruction RAW gap without forwarding",
    ],
    formula: {
      code: `sub R2, R1, R3:   IF  ID  EX  MEM  WB
and R4, R2, R5:       IF  ID [stall] [stall]  EX  MEM  WB
                              ↑       ↑
                           bubble1  bubble2 inserted by hardware

Hazard Detection Unit:
  At cycle 3: ID stage decoding AND needs R2
              EX stage has SUB still writing R2 → MATCH → stall!
  Stalls ID for 2 cycles, inserts 2 bubbles into EX
  At cycle 5: SUB's WB completes → AND can proceed with correct R2 value`,
      explanation: "Hardware stalls are invisible to the programmer — the CPU handles everything automatically.",
    },
    examTips: [
      "Stalls = bubbles = empty pipeline slots = automatic hardware detection",
      "Most common solution for ANY hazard type: C) Stalling the pipeline by inserting bubbles",
      "Stalls waste cycles but are always correct",
      "Forwarding is BETTER than stalls (no wasted cycles for most cases)",
    ],
    questions: [],
  },

  "data-forwarding": {
    title: "HW Solution 2 — Data Forwarding", emoji: "⚡",
    tldr: "Pass ALU result directly from EX output to next instruction's EX input. No register file write needed. Eliminates most RAW stalls. Also called short-circuiting or register bypassing.",
    explanation: `Data forwarding is the clever hardware trick that eliminates most RAW stalls.

Key insight: After an instruction finishes the EX stage, its result (the ALU output) is sitting in the EX/MEM pipeline register. Why wait for WB to write it to the register file, then ID to read it from there? We can just feed it directly to the next instruction's EX stage input using a forwarding path.

This is also called:
- SHORT-CIRCUITING: because it creates a shortcut path from EX output to EX input
- REGISTER BYPASSING: because it bypasses the register file

Forwarding handles multiple cases:
- EX→EX forwarding: Result from EX goes directly to next instruction's EX input (1-cycle gap)
- MEM→EX forwarding: Result from MEM stage (still in MEM/WB register) goes to EX input (2-cycle gap)
- EX→MEM forwarding: For STR after LDR (store needs value that load produced)

Multiple forwarding paths exist in the datapath (shown as colored arrows in slides: red=EX→EX, blue/yellow=MEM→EX, green=EX→MEM, purple=MEM→MEM).`,
    keyPoints: [
      "Forward result from EX stage output directly to next instruction's EX input",
      "Eliminates wait for WB→register file→ID chain",
      "Also called: short-circuiting, register bypassing",
      "EX→EX forwarding: handles 1-instruction gap (most common case)",
      "MEM→EX forwarding: handles 2-instruction gap",
      "Still needs MUXes at ALU input to select: normal register value OR forwarded value",
      "Hazard Detection Unit selects which forwarding path (if any) to use",
      "DOES NOT fix load-use hazard — LDR result not ready until after MEM stage",
    ],
    formula: {
      code: `Without forwarding:
  add R2, R3, R4:  IF  ID  EX  MEM  WB
  orr R5, R3, R2:      IF  ID  stall stall  EX  MEM  WB  ← 2 stalls

With forwarding (EX→EX):
  add R2, R3, R4:  IF  ID  EX  MEM  WB
                              ↓ (forward R2 from EX/MEM register)
  orr R5, R3, R2:      IF  ID  EX  MEM  WB  ← no stalls!

Multi-level forwarding paths (from slides):
  Red arrows:   EX→EX forwarding  (1-instruction gap)
  Blue/Yellow:  MEM→EX forwarding (2-instruction gap)
  Green:        EX→MEM forwarding (STR needs LDR's value)
  Purple:       MEM→MEM forwarding`,
      explanation: "Forwarding adds MUXes and a Hazard Detection Unit but saves many stall cycles — always worth it.",
    },
    examTips: [
      "Data Forwarding = Short-Circuiting = Register Bypassing (same thing!)",
      "'ALU output fed directly to ALU input of next instruction' = C) Data Forwarding",
      "Forwarding uses MUXes at ALU input + Hazard Detection Unit",
      "Forwarding does NOT eliminate load-use hazard (LDR result needs 1 extra stall)",
    ],
    questions: [
      { q: "What is data forwarding and what types of forwarding paths exist?", a: "Data forwarding (also called short-circuiting or register bypassing) passes the ALU result directly from the EX stage output to the next instruction's EX stage input, bypassing the register file write-then-read path. Types: (1) EX→EX: result from one instruction's EX directly to next instruction's EX input. (2) MEM→EX: result from MEM stage to EX input of instruction 2 positions later. (3) EX→MEM: for STR after LDR. (4) MEM→MEM. Implemented using MUXes and a Hazard Detection Unit." },
    ],
  },

  "forwarding-mux": {
    title: "Forwarding MUX Circuit", emoji: "🔌",
    tldr: "MUXes added before ALU inputs. Select between: (1) normal register value, (2) EX/MEM forwarded value, (3) MEM/WB forwarded value. Hazard Detection Unit controls MUX select lines.",
    explanation: `Implementing data forwarding requires adding hardware to the datapath: multiplexers (MUXes) at the ALU input ports, plus a Hazard Detection Unit.

DATAPATH WITH FORWARDING:
Each ALU input now goes through a 3-way MUX instead of directly from the register file. The MUX selects from:
1. Normal value: from the register file (read in ID, passed through ID/EX register) — no hazard
2. EX/MEM forwarded value: result from the previous instruction's EX stage (currently in EX/MEM register)
3. MEM/WB forwarded value: result from the instruction 2 ago (currently in MEM/WB register, either ALU result or loaded data)

The HAZARD DETECTION UNIT:
- Continuously monitors: which register is being written by which instruction in which stage
- Compares write destinations with source registers of current ID instruction
- If match found: selects appropriate forwarding path by setting MUX select lines
- If load-use hazard: also stalls the pipeline for 1 cycle

This hardware is transparent to the programmer — forwarding happens automatically every cycle.`,
    keyPoints: [
      "MUX added at each ALU input (3 choices: register, EX/MEM forward, MEM/WB forward)",
      "Hazard Detection Unit controls MUX select lines",
      "HDU compares: destination register of EX/MEM or MEM/WB stage with source register of ID stage",
      "If match: select forwarding path; if no match: use normal register value",
      "For load-use: HDU also inserts stall (even forwarding can't fix this one)",
      "This hardware is transparent to programmer and compiler",
    ],
    formula: {
      code: `Forwarding datapath:
           [Registers] ─────────────────────────────┐ (normal path)
               │                                     │
           [ID/EX reg] ──► [MUX] ──► [ALU Input A]  │
                            ↑  ↑                     │
              EX/MEM reg ───┘  └── MEM/WB reg ───────┘
              (forward1)         (forward2)

Hazard Detection Logic:
  if (EX/MEM.RegWrite AND EX/MEM.Rd == ID/EX.Rs):
      ForwardA = EX/MEM forward
  elif (MEM/WB.RegWrite AND MEM/WB.Rd == ID/EX.Rs):
      ForwardA = MEM/WB forward
  else:
      ForwardA = normal register value`,
      explanation: "Same logic applies to ForwardB (second ALU input). Load-use additionally triggers a 1-cycle stall.",
    },
    examTips: [
      "MUXes at ALU inputs = key hardware change for forwarding",
      "Hazard Detection Unit sets the MUX select lines",
      "3 options: normal, EX/MEM forwarded, MEM/WB forwarded",
      "Load-use: HDU both forwards AND stalls (1 cycle stall still needed)",
    ],
    questions: [],
  },

  "load-use-hazard": {
    title: "Load-Use Hazard — 1 Stall Always Needed", emoji: "🚧",
    tldr: "LDR result only available after MEM stage. Even with forwarding, ADD needs it at EX — 1 cycle too early. Always 1 stall cycle for LDR→ALU dependency.",
    explanation: `Data forwarding eliminates most RAW stalls, but there is one case it CANNOT help: when a LDR is immediately followed by an instruction that uses the loaded value.

Why forwarding fails here: After LDR's EX stage, we don't have the loaded data yet — we've only computed the memory address. The actual data is only available after the MEM stage (after reading from the data cache). If the next instruction is ADD and it's in EX the same cycle as LDR's MEM, we can forward from MEM→EX. But the next instruction (1 position after LDR) reaches EX at the SAME time LDR reaches MEM — too late by exactly 1 cycle!

Solution: Insert 1 stall cycle after the LDR. This delays the consumer instruction by 1 cycle. Now when the consumer is in EX, LDR has completed MEM — the loaded value is available and can be forwarded from MEM/WB register to EX.

With reordering: the compiler can try to put an independent instruction between LDR and the consumer — it fills the 1 stall slot naturally.`,
    keyPoints: [
      "Load-Use hazard: LDR immediately followed by instruction using loaded value",
      "LDR result available ONLY after MEM stage (not after EX like ALU instructions)",
      "Consumer in EX same cycle as LDR in MEM → value not ready in time → 1 cycle too early",
      "Even with forwarding: 1 stall cycle is ALWAYS required for load-use",
      "After 1 stall: consumer's EX aligns with LDR's MEM → MEM→EX forwarding works",
      "Compiler fix: put independent instruction between LDR and consumer (fills stall slot)",
    ],
    formula: {
      code: `WITHOUT stall (WRONG):
  LDR R0, [R1, #60]: IF  ID  EX  MEM  WB
  ADD R2, R0, R4:        IF  ID   EX ← needs R0 here, but LDR's MEM gives it next cycle!

WITH 1 stall (CORRECT):
  LDR R0, [R1, #60]: IF  ID  EX  MEM  WB
  (stall/bubble):             stall
  ADD R2, R0, R4:        IF  ID  stall  EX  MEM  WB
                                         ↑
                              MEM→EX forwarding works here!

With compiler reordering (best solution):
  LDR R6, [R2, #4]:  IF  ID  EX  MEM  WB
  LDR R7, [R2]:          IF  ID  EX   MEM  WB   ← independent, fills stall slot
  ADD R4, R5, R6:            IF  ID   EX   MEM  WB ← R6 ready (MEM→EX forward)`,
      explanation: "Key rule: LDR → immediately use = always 1 stall. Swap with independent instruction to avoid it.",
    },
    examTips: [
      "Load-use hazard ALWAYS needs 1 stall cycle, even with forwarding",
      "This is because LDR data comes from MEM stage, not EX stage",
      "Two subtypes of RAW: (1) Define-Use (ALU writes) = solved by forwarding. (2) Load-Use (LDR writes) = 1 stall always needed",
      "Compiler fix: swap/reorder to put independent instruction between LDR and consumer",
    ],
    questions: [
      { q: "Why does a load-use hazard always require 1 stall cycle even with forwarding?", a: "For ALU instructions, the result is ready after the EX stage and can be forwarded EX→EX. For LDR, the loaded data comes from memory and is only available after the MEM stage. When the consumer instruction is in EX (where it needs the value), LDR is simultaneously in MEM (where the value is just becoming available). The value arrives exactly 1 cycle too late. So 1 stall must be inserted. After the stall, the consumer's EX aligns with LDR's completion of MEM, and MEM→EX forwarding can deliver the value." },
    ],
  },

  // ─────────────────────────────────────────────
  // CONTROL HAZARDS
  // ─────────────────────────────────────────────
  "control-hazard-intro": {
    title: "Control Hazard — What and Why", emoji: "🔀",
    tldr: "Branch changes PC. By the time branch decision is made (at EX), 2 wrong instructions already fetched. Must stall or flush them.",
    explanation: `A control hazard (also called a branch hazard) occurs when a branch instruction changes the program counter, making the instructions already fetched into the pipeline incorrect.

The problem: The pipeline assumes sequential execution and keeps fetching the next instruction every cycle. When it encounters a branch, it doesn't know until the EX stage (when the branch condition is evaluated) whether the branch will be taken.

By the time the branch decides at EX (cycle 3 of the branch), the pipeline has already fetched and started processing 2 more instructions (at IF and ID stages). If the branch is taken, those 2 instructions were fetched from the wrong addresses — they must be thrown away (FLUSHED).

Example:
  BEQ R1, R2, target:  IF  ID  EX ← decision made here (cycle 3)
  sub R1, R4, R5:           IF  ID ← wrong if taken → FLUSH!
  orr R2, R7, R8:               IF ← wrong if taken → FLUSH!
  target: add R1, R4, R5:         IF ← correct next instruction (if taken)

This 2-cycle penalty (2 flushed instructions) makes branches expensive.`,
    keyPoints: [
      "Branch changes PC → instructions already in pipeline may be WRONG",
      "In original 5-stage design: branch decision at EX (stage 3)",
      "By EX stage: 2 instructions already fetched (in IF and ID) — potentially wrong",
      "If branch taken: must FLUSH those 2 wrong instructions → 2 cycle penalty",
      "If branch not taken: those 2 instructions are correct, no penalty",
      "Flushing = setting those pipeline registers to NOP/bubble",
      "With 20% branches, each causing 2 stalls → significant throughput loss",
    ],
    formula: {
      code: `Control hazard timeline (branch decision at EX):
  Cycle:     1    2    3    4    5    6    7
  BEQ:       IF   ID  [EX] MEM  WB   ← decides to branch at cycle 3
  sub (inst+4):  IF   ID  [EX] ← WRONG! → FLUSH (if taken)
  orr (inst+8):       IF  [ID] ← WRONG! → FLUSH (if taken)
  target instruction:     [IF] ← correct → fetch starts here

2-cycle penalty: 2 instructions wasted = 2 stall cycles for every taken branch

CPI impact: 20% branches, 45% taken → stalls = 0.20 × 0.45 × 2 = 0.18
CPI_pipelined = 1 + 0.18 = 1.18`,
      explanation: "Every taken branch in the original design flushes 2 instructions — very expensive!",
    },
    examTips: [
      "Control hazard trigger = C) When flow of instruction addresses is not sequential (branch/jump)",
      "Branch decision at EX → 2 instructions already fetched → 2-cycle penalty",
      "Only taken branches cause penalty — if not taken, fetched instructions are correct",
    ],
    questions: [],
  },

  "reduce-branch-stall": {
    title: "Reducing Branch Penalty — Move Decision to ID", emoji: "⬆️",
    tldr: "Move branch comparison logic from EX to ID stage. Penalty drops from 2 wasted cycles to 1. Can't go further (0 cycles) because IF can't know it's a branch before decode.",
    explanation: `The branch penalty in the original design is 2 cycles (branch evaluated at EX, 2 instructions already fetched). We can reduce this by moving the branch comparison logic earlier in the pipeline.

MOVE TO ID STAGE: Put the branch condition evaluation (register comparison) into the Decode stage instead of Execute. Now the branch decision is known by the end of cycle 2 (ID). By then, only 1 instruction has been incorrectly fetched (the instruction at IF when the branch was in ID). This reduces the penalty to 1 wasted cycle.

ARM9 specifically: the branch target address is computed in ID (using sign-extended offset + PC), and if the condition is met (equality check done in ID), the PC is updated by end of ID. So ARM9 has a 1-cycle branch penalty by design.

CAN WE REDUCE TO 0? Theoretically yes, by moving to IF, but the pipeline doesn't know an instruction is a branch until it's been decoded — and decoding happens in ID, not IF. That's why some processors use branch prediction at the IF stage with specialized hardware (BHT).`,
    keyPoints: [
      "Original: branch decision at EX → 2 wasted cycles (2 instructions already fetched)",
      "After moving to ID: branch decision at end of ID → 1 wasted cycle (1 instruction fetched)",
      "ARM9: branch evaluated in ID → 1-cycle branch penalty",
      "Cannot reduce to 0 by moving to IF: cannot know instruction is branch before decoding",
      "Alternative to reduce to 0: predict branch at IF using Branch History Table (BHT)",
      "Moving to ID requires extra comparator hardware in the ID stage",
    ],
    formula: {
      code: `Branch decision at EX (original):
  BEQ:   IF  ID [EX] MEM WB  ← decides at cycle 3
  inst1:     IF [ID] EX  ← WRONG → flush (if taken) — 2-cycle penalty
  inst2:         IF  ← WRONG → flush (if taken)

Branch decision moved to ID (improved):
  BEQ:   IF [ID] EX MEM WB   ← decides at END of cycle 2
  inst1:     IF ← WRONG → flush only 1 instruction — 1-cycle penalty

Penalty reduction: 2 cycles → 1 cycle
CPI with 1-cycle penalty: 1 + (fraction_branches × fraction_taken × 1)`,
      explanation: "Moving branch logic to ID halves the branch penalty — significant improvement.",
    },
    examTips: [
      "2-cycle branch penalty → 1-cycle by: B) Moving branch decision logic to ID stage",
      "ARM9: branch resolved at end of ID → 1-cycle penalty",
      "0-cycle penalty requires branch prediction (predict at IF before knowing it's a branch)",
    ],
    questions: [],
  },

  "cpi-control-hazard": {
    title: "CPI Calculation with Control Hazards", emoji: "🧮",
    tldr: "CPI = 1 + (load_fraction × load_use_stall_fraction × 1) + (branch_fraction × taken_fraction × branch_penalty). Total stalls = load stalls + branch stalls.",
    explanation: `To calculate the actual CPI of a pipelined processor with both data hazards and control hazards, we add the stall contributions from each source.

Given (from slides example):
- 40% arithmetic/logic instructions
- 30% load instructions (25% of these cause load-use hazard = 1 stall each)
- 10% store instructions
- 20% branch instructions (45% of these are taken, with 1-cycle penalty from ID-stage branch evaluation)

CPI = Ideal CPI + stalls from loads + stalls from branches
    = 1 + (0.30 × 0.25 × 1) + (0.20 × 0.45 × 1)
    = 1 + 0.075 + 0.09
    = 1.165

This means on average, each instruction takes 1.165 cycles instead of the ideal 1.0.`,
    keyPoints: [
      "CPI = 1 + Σ(fraction × hazard_rate × stall_cycles) for each hazard type",
      "Load stalls: fraction_loads × fraction_causing_load_use × 1 stall",
      "Branch stalls: fraction_branches × fraction_taken × branch_penalty",
      "1-cycle branch penalty (when decision at ID stage)",
      "All stall contributions add independently",
    ],
    formula: {
      code: `Given:
  40% arithmetic/logic, 30% load, 10% store, 20% branch
  25% of loads cause load-use hazard (1 stall each)
  45% of branches are taken (1-cycle penalty from ID-stage)

CPI = 1 + load_stalls + branch_stalls
    = 1 + (0.30 × 0.25 × 1) + (0.20 × 0.45 × 1)
    = 1 + 0.075 + 0.09
    = 1.165

Simplified formula:
  CPI = 1 + (f_load × f_load-use × penalty_load) + (f_branch × f_taken × penalty_branch)

MCQ: 20% branches, each causing 1-cycle stall (all taken):
  CPI = 1 + (0.20 × 1) = 1.2 → B)`,
      explanation: "Each hazard type contributes independently to the total CPI. Sum them all up.",
    },
    examTips: [
      "CPI = 1 + (all stall contributions added together)",
      "20% branches, all taken, 1-cycle penalty: CPI = 1 + 0.20×1 = 1.2 → B)",
      "Don't forget to multiply by fraction of instructions AND fraction causing hazard",
    ],
    questions: [
      { q: "40% arithmetic, 30% load (25% cause load-use), 10% store, 20% branch (45% taken, 1-cycle penalty). Find CPI.", a: "CPI = 1 + (0.30 × 0.25 × 1) + (0.20 × 0.45 × 1) = 1 + 0.075 + 0.09 = 1.165." },
    ],
  },

  "delayed-branching": {
    title: "Delayed Branching", emoji: "⏳",
    tldr: "The Branch Delay Slot is the instruction AFTER a branch. It ALWAYS executes regardless of branch outcome. Compiler fills it with useful work to avoid waste.",
    explanation: `Delayed branching is a software technique to avoid the 1-cycle branch penalty. Instead of inserting a stall or flushing the instruction after a branch, we DEFINE it as a "delay slot" that always executes.

The Branch Delay Slot is the instruction immediately after the branch instruction. By design, this instruction ALWAYS executes — regardless of whether the branch is taken or not. The processor doesn't know (or doesn't care) whether the branch is taken until AFTER the delay slot instruction has already started executing.

Goal: Fill the delay slot with a useful instruction, so the 1 "wasted" cycle actually does useful work.

If the compiler cannot find a useful instruction to put in the delay slot, it inserts a NOP (wasting the cycle anyway, but at least it's explicit and correct).

Key example:
  10: BEQ R1, R3, 36  ← branch
  14: AND R2, R3, R5  ← DELAY SLOT — ALWAYS executes (instruction at address 14 always runs)
  18: OR R6, R1, R7   ← only if branch NOT taken
  36: XOR R10, R1, R11 ← only if branch TAKEN`,
    keyPoints: [
      "Branch Delay Slot = instruction immediately after the branch instruction",
      "Delay slot ALWAYS executes — regardless of whether branch is taken or not",
      "Goal: fill delay slot with useful work, not NOP",
      "If branch not taken: delay slot + sequential instructions execute",
      "If branch taken: delay slot + target instructions execute",
      "If compiler can't find useful instruction → inserts NOP in delay slot",
    ],
    formula: {
      code: `Delayed Branch Execution:
  10: BEQ R1, R3, 36      ← branch instruction
  14: AND R2, R3, R5       ← DELAY SLOT (ALWAYS executes regardless of branch)
  18: OR R6, R1, R7        ← executes only if branch NOT taken (sequential)
  36: XOR R10, R1, R11     ← executes only if branch TAKEN (target)

Timeline:
  Branch:         IF  ID  EX  MEM  WB   ← decision at end of ID
  AND (delay):        IF  ID  EX  MEM  WB  ← always executes (delay slot)
  if taken  → XOR:        IF  ID  EX...   ← next after AND
  if not taken → OR:      IF  ID  EX...  ← next after AND`,
      explanation: "The delay slot is the 'price' of moving branch decision to ID — we always execute 1 more instruction.",
    },
    examTips: [
      "Delay slot = instruction AFTER branch = ALWAYS executes",
      "Defining characteristic of delay slot: D) Always executed, regardless of branch taken/not taken",
      "Purpose: fill 1-cycle branch penalty slot with useful work",
      "If compiler can't fill it → NOP inserted",
    ],
    questions: [
      { q: "What is a branch delay slot and what happens to the instruction in it?", a: "The branch delay slot is the instruction immediately after a branch instruction. It ALWAYS executes, regardless of whether the branch is taken or not. The processor is designed to execute it before the branch takes effect. The compiler tries to fill the delay slot with a useful instruction (independent of the branch) to avoid wasting the cycle. If no useful instruction is available, a NOP is inserted." },
    ],
  },

  "delay-slot-strategies": {
    title: "3 Strategies for Filling the Delay Slot", emoji: "🎯",
    tldr: "Strategy A (from before branch): best — no extra code. Strategy B (from target): works if branch usually taken. Strategy C (from fall-through): works if branch usually NOT taken.",
    explanation: `The compiler has three strategies for finding a useful instruction to fill the branch delay slot:

STRATEGY A — FROM BEFORE THE BRANCH (BEST):
Move an independent instruction that was previously before the branch into the delay slot. This is the best choice because: no code duplication, instruction count stays the same or decreases, and the instruction always executes (which is fine, since it was going to execute anyway).

STRATEGY B — FROM BRANCH TARGET (PREDICT TAKEN):
Copy the first instruction at the branch target into the delay slot. Useful when the branch is taken ~80% of the time. If branch is taken: instruction was correct (it was from target, it runs twice — once as delay slot, once at target). If branch NOT taken: the copied instruction still runs but should not cause harm (be careful!). Instruction Count increases (instruction duplicated). Must flush if branch not taken.

STRATEGY C — FROM FALL-THROUGH (PREDICT NOT TAKEN):
Copy the first instruction from the fall-through path (sequential instruction after delay slot) into the delay slot. Useful when branch is NOT taken ~80% of the time. If branch not taken: correct. If branch taken: flush. IC increases.`,
    keyPoints: [
      "Strategy A (from before): BEST — no duplication, no flush, IC decreases or same",
      "Strategy B (from target): copy target's first instruction into delay slot; useful when usually taken",
      "Strategy C (from fall-through): copy next sequential instruction; useful when usually not taken",
      "B and C both increase instruction count (duplication) and may need flush",
      "If compiler cannot find ANY suitable instruction → inserts NOP (delay slot wasted)",
      "Strategy A should always be tried first",
    ],
    formula: {
      code: `Strategy A — From Before Branch (BEST):
  Before:                       After:
  MUL R3, R4, R5               (removed)
  ADD R1, R2, R2               ADD R1, R2, R2
  BEQZ R1, R7, there     →     BEQZ R1, R7, there
  SUB R2, R1, R0               ADD R1, R2, R2  ← delay slot (from before)
  there: ...                   SUB R2, R1, R0
                               there: ...
  IC = same. No flush needed.

Strategy B — From Target (Predict Taken):
  Delay slot = copy of first instruction at target
  If taken: target instr executes in delay slot (correct, also still at target)
  If NOT taken: must FLUSH delay slot. IC increases.

Strategy C — From Fall-Through (Predict Not Taken):
  Delay slot = copy of first instruction after branch
  If not taken: delay slot executes (correct, also still in fall-through)
  If TAKEN: must FLUSH delay slot. IC increases.`,
      explanation: "Try A first. If A fails, use B (if usually taken) or C (if usually not taken). Last resort: NOP.",
    },
    examTips: [
      "Strategy A = from before = best (no IC increase, no flush needed)",
      "Strategy B = from target = predict taken; Strategy C = from fall-through = predict NOT taken",
      "B and C both increase IC (instruction count) because of duplication",
      "If no good instruction found → NOP in delay slot",
    ],
    questions: [
      { q: "What are the three strategies for filling a branch delay slot? Which is best and why?", a: "Strategy A (From Before): Move an independent instruction that was before the branch into the delay slot. BEST: no IC increase, no flush, instruction always correct. Strategy B (From Target): Copy first instruction at branch target. Good when branch usually taken; IC increases, need flush if not taken. Strategy C (From Fall-Through): Copy next sequential instruction. Good when branch usually not taken; IC increases, need flush if taken. A is best because no code duplication and no flush needed." },
    ],
  },

  // ─────────────────────────────────────────────
  // BRANCH PREDICTION
  // ─────────────────────────────────────────────
  "branch-pred-overview": {
    title: "Branch Prediction — Why It's Needed", emoji: "🔮",
    tldr: "Deeper pipelines → bigger branch penalty. Instead of stalling, PREDICT and fetch speculatively. Wrong? Flush and correct. Two types: Static (compile-time) and Dynamic (runtime).",
    explanation: `Delayed branching works well for 1-cycle branch penalties, but modern pipelines are much deeper (10–20 stages). The branch penalty would be enormous if we stalled every time.

Solution: BRANCH PREDICTION — guess whether the branch will be taken or not, and speculatively fetch instructions from the predicted path. If the prediction is right: no penalty, execution continues normally. If the prediction is wrong: flush the wrong instructions and fetch from the correct path (misprediction penalty).

Two main categories:

STATIC PREDICTION: The prediction is decided at compile time and doesn't change during execution. Examples: Always Predict Not Taken, Always Predict Taken, Direction-based (backward→Taken, forward→Not Taken).

DYNAMIC PREDICTION: The prediction changes at runtime based on the execution history of each branch. Examples: 1-bit predictor (remember last outcome), 2-bit saturating counter (need 2 consecutive mispredictions to flip prediction).

Dynamic prediction is more powerful and is used in modern CPUs.`,
    keyPoints: [
      "Branch prediction: guess branch outcome and fetch speculatively",
      "Correct prediction: no penalty, continue normally",
      "Incorrect prediction: FLUSH wrong instructions, fetch from correct path",
      "Static: prediction fixed at compile time; doesn't change during execution",
      "Dynamic: prediction changes at runtime based on branch history",
      "Dynamic prediction uses Branch History Table (BHT) indexed by PC bits",
      "Dynamic prediction done at FETCH stage (before decode) — more powerful than static",
    ],
    formula: {
      code: `Branch Prediction Types:
  Static (compile-time):
    Always Taken     → fetch from target every time
    Always Not Taken → fetch sequentially every time
    Direction-based  → backward=Taken, forward=Not Taken

  Dynamic (runtime):
    1-Bit Predictor  → remember last outcome; flip on misprediction
    2-Bit Counter    → need 2 consecutive misses to flip; 4 states
    (many more in practice: tournament predictors, neural predictors, etc.)

Misprediction cost = pipeline_depth - stages_before_branch_resolution
  → Modern deep pipelines: 10-20 cycle misprediction penalty!`,
      explanation: "The deeper the pipeline, the more critical branch prediction accuracy becomes.",
    },
    examTips: [
      "Static = compile-time, fixed. Dynamic = runtime, changes based on history.",
      "Dynamic prediction starts at IF stage (before decode) using BHT indexed by PC",
      "Misprediction penalty grows with pipeline depth — key motivation for better predictors",
    ],
    questions: [],
  },

  "static-prediction": {
    title: "Static Branch Prediction", emoji: "📌",
    tldr: "Always Taken, Always Not Taken, or Direction-based (backward→Taken, forward→Not Taken). No implementation cost. Fixed accuracy — doesn't learn from runtime behavior.",
    explanation: `Static prediction doesn't use runtime history — the prediction is fixed before the program runs.

ALWAYS NOT TAKEN: Predict all branches as not taken; continue fetching sequentially. If indeed not taken: correct, no penalty. If taken: flush and restart from target. Simple, no extra hardware needed, but accuracy depends on how often branches are actually taken.

ALWAYS TAKEN: Predict all branches as taken; immediately fetch from target. Early studies showed ~2/3 of branches are taken (but many of those were unconditional). For conditional branches, accuracy is lower.

ALTERNATIVE STATIC PREDICTION (Direction-Based): A smarter approach:
- Backward branches (branch target is at LOWER address than branch) → predict TAKEN. Reasoning: loops branch backward to repeat; they're usually taken.
- Forward branches (branch target at HIGHER address) → predict NOT TAKEN. Reasoning: forward branches are usually exit conditions (if-statement else branch), and most if-statements fall through.

Accuracy of static predictors is limited because they don't adapt to actual runtime behavior.

For the trace T T NT T NT T T T NT T T T T T NT T T T T NT:
  Always Taken: 5 mispredictions (only the NT outcomes are wrong)
  Always Not Taken: 15 mispredictions (all T outcomes are wrong)`,
    keyPoints: [
      "Always Not Taken: fetch sequentially; fast if branches rarely taken",
      "Always Taken: fetch from target; better for loops (usually backward, usually taken)",
      "Direction-Based: Backward → predict Taken (loops); Forward → predict Not Taken (exits)",
      "No adaptation to runtime behavior — accuracy is fixed",
      "For trace T T NT T NT...: Always Taken = 5 misses, Always Not Taken = 15 misses",
      "Static prediction is used when no profile data is available",
    ],
    formula: {
      code: `Trace: T T NT T NT T T T NT T T T T T NT T T T T NT
                                (T=Taken, NT=Not Taken)

Strategy         | Mispredictions | Explanation
─────────────────┼────────────────┼────────────────────────────
Always Taken     |  5             | Each NT = 1 miss (5 NTs total)
Always Not Taken | 15             | Each T = 1 miss (15 Ts total)

Direction-based:
  Backward branch (loop): predict TAKEN  → good for loops
  Forward branch (exit):  predict NOT TAKEN → good for if-exits`,
      explanation: "Always Not Taken is surprising — 15 misses because this trace has 15 T branches out of 20.",
    },
    examTips: [
      "Alternative static prediction: B) Backward→Taken, Forward→Not Taken",
      "Always Taken: 5 misses. Always Not Taken: 15 misses (for this specific trace)",
      "Static predictors don't adapt — dynamic is always better for repeated patterns",
    ],
    questions: [],
  },

  "dynamic-prediction": {
    title: "Dynamic Branch Prediction — Overview", emoji: "🧠",
    tldr: "Hardware maintains a Branch History Table (BHT). Each entry stores prediction bit(s) for one branch. Indexed by low-order PC bits at FETCH time.",
    explanation: `Dynamic prediction changes based on what branches have actually done at runtime. The hardware keeps history and uses it to predict future behavior.

The Branch History Table (BHT), also called the Branch Prediction Buffer, is a small hardware table with one entry per recently-seen branch:
- Each entry is indexed by the LOW-ORDER BITS of the branch instruction's address
- Each entry stores a prediction bit (or bits)
- When a branch is FETCHED (at the IF stage), the BHT is looked up using the PC
- The stored prediction is used to immediately fetch from the predicted path
- After the branch resolves, the BHT entry is updated

Key advantage: prediction happens at FETCH (IF) stage — before we even know it's a branch! This is much earlier than static prediction (which requires at least the ID stage to identify a branch). This allows deeper pipelines to operate without penalty on correct predictions.

Aliasing problem: If two different branches have the same low-order address bits, they share a BHT entry → one branch's history interferes with the other's prediction.`,
    keyPoints: [
      "Branch History Table (BHT) = hardware table indexed by branch PC's low-order bits",
      "Each entry: prediction bit(s) for that branch",
      "Prediction made at FETCH (IF) stage — before even decoding the instruction",
      "After branch resolves: BHT entry updated based on actual outcome",
      "Aliasing: two branches with same low-order PC bits share one BHT entry (interference)",
      "Dynamic is more powerful than static because it adapts to runtime behavior",
    ],
    formula: {
      code: `BHT (8-entry example, indexed by 3 low-order PC bits):
  Address bits │ Branch address │ Target address │ Prediction bit
  ─────────────┼────────────────┼────────────────┼───────────────
  000          │ 432            │ 456            │ 1 (T)
  001          │ 97             │ 123            │ 0 (NT)
  ...
  100          │ 84             │ 244            │ 1 (T)

Example: Branch at address 0x0084
  Low-order 3 bits of 84 = 100 → look up entry 100 → prediction = 1 (Taken)
  → Fetch from 0x0244 (the target address)
  After branch resolves:
    If actually Taken  → keep prediction = 1
    If actually Not Taken → flip prediction to 0`,
      explanation: "The BHT is checked at fetch time — prediction is made before the instruction is even decoded.",
    },
    examTips: [
      "BHT indexed by: C) Using low-order address bits of the branch instruction",
      "Prediction made at: FETCH (IF) stage — earlier than static prediction",
      "Aliasing = two branches sharing same BHT entry → interference",
    ],
    questions: [],
  },

  "one-bit-predictor": {
    title: "1-Bit Predictor", emoji: "1️⃣",
    tldr: "1 bit per entry: 0=predict NT, 1=predict T. Flip on every misprediction. Problem: always 2 mispredictions per loop (entry + exit). 80% accuracy for nested loops.",
    explanation: `The 1-bit predictor is the simplest dynamic predictor.

Mechanism: Each BHT entry has 1 bit.
- 1 = branch was recently Taken → predict Taken next time
- 0 = branch was recently Not Taken → predict Not Taken next time
- On correct prediction: keep the bit same
- On misprediction: flip the bit

This works well for very consistent branches. But for loops, it always makes 2 mispredictions per loop execution:
1. Entry misprediction: The first iteration of the loop, the branch was NT in the previous exit. Bit=0 (predict NT), but branch IS taken → MISS → flip to 1.
2. Exit misprediction: The last iteration, the loop exits (NT). Bit=1 (predict T), but branch is NOT taken → MISS → flip to 0.
Middle iterations: predict T, outcome T → all correct.

For nested loops (for i=0..m for j=0..n): 2 mispredictions per inner loop execution × m outer loop iterations = 2×m mispredictions. For m=100, n=10: 200 mispredictions out of 1000 iterations = 80% accuracy.`,
    keyPoints: [
      "1 bit: 0=predict NT, 1=predict T. Flip on every misprediction.",
      "State machine: 2 states (NT, T). Transition on misprediction.",
      "For loops: ALWAYS 2 mispredictions per loop execution (entry and exit)",
      "Nested loops for(i=0..m) for(j=0..n): 2×m mispredictions total",
      "m=100, n=10: 200 mispredictions out of 1000 = 80% accuracy",
      "Problem: one wrong prediction immediately flips the bit — overreacts",
    ],
    formula: {
      code: `1-Bit Predictor FSM:
  State 0 (Predict NT): outcome T  → go to State 1 (MISS)
                         outcome NT → stay State 0 (correct)
  State 1 (Predict T):  outcome NT → go to State 0 (MISS)
                         outcome T  → stay State 1 (correct)

Loop behavior (10 iterations, entry state = NT):
  Iter 1: predict NT, outcome T → MISS → flip to T
  Iter 2-9: predict T, outcome T → correct (8 iterations)
  Iter 10: predict T, outcome NT → MISS → flip to NT
  → 2 misses per loop execution, regardless of loop length!

Nested loop for(i=0; i<100; i++) for(j=0; j<10; j++):
  Inner loop runs 100 times → 2 × 100 = 200 total mispredictions
  Total inner loop iterations = 1000 → accuracy = 800/1000 = 80%`,
      explanation: "The 1-bit predictor works perfectly for consistent branches but poorly for loops (always misses twice).",
    },
    examTips: [
      "1-bit predictor shortcoming for loops: B) Always mispredicts twice per loop (entry and exit)",
      "Nested loops m=100, n=10 → 1-bit: 2×100 = 200 mispredictions → 80% accuracy",
      "Solution to loop problem: 2-bit predictor",
    ],
    questions: [],
  },

  "aliasing-problem": {
    title: "Aliasing Problem in BHT", emoji: "🔀",
    tldr: "Two branches with same low-order PC bits share one BHT entry. One branch's history corrupts the other's prediction. This interference reduces accuracy.",
    explanation: `The Branch History Table is indexed by the low-order bits of the branch instruction's address. If two different branch instructions have the same low-order address bits, they will map to the same BHT entry and share that entry's prediction bit.

This is called ALIASING.

Example: A branch at address 432 and another branch at address 944 might both have the same low-order 3 bits (say 000), mapping to the same BHT entry 000.

When branch A updates the BHT entry (because A was taken or not taken), it changes the prediction that branch B will see next time. And vice versa. This mutual interference reduces prediction accuracy for both branches.

Solutions to aliasing:
1. Use more bits for the BHT index (larger BHT → fewer collisions)
2. Use the full branch address XOR'd with other bits (better distribution)
3. Use more sophisticated predictors (global history, gselect, etc.)

Aliasing is the main reason why 1-bit predictors underperform in practice — even a short program can have many aliasing branches.`,
    keyPoints: [
      "Aliasing: two branches with same low-order PC bits share one BHT entry",
      "One branch's update corrupts the other branch's prediction",
      "Results in incorrect predictions for both branches",
      "Reduces overall predictor accuracy",
      "Solutions: larger BHT, XOR hashing, more sophisticated indexing",
      "Aliasing is less severe with 2-bit predictors (1 interfering update doesn't flip prediction)",
    ],
    formula: {
      code: `BHT with 3-bit index (8 entries):

  Branch at address 432: low-3-bits = 432 mod 8 = 0 → maps to entry 0
  Branch at address 944: low-3-bits = 944 mod 8 = 0 → also maps to entry 0!

  ALIASING: both branches share BHT[0]

  Timeline:
    Branch A (432) executes: Taken → sets BHT[0] = 1
    Branch B (944) is predicted: sees BHT[0] = 1 → predicts Taken
    But Branch B is actually Not Taken → MISPREDICTION (caused by A's history)

Solutions:
  1. Larger BHT (more bits for index) → fewer collisions
  2. XOR of PC bits with other bits → better distribution
  3. 2-level global history predictor (uses separate path history)`,
      explanation: "Aliasing is unavoidable with a finite BHT but can be minimized with good design.",
    },
    examTips: [
      "Aliasing = two branches sharing same BHT entry → interference",
      "Low-order PC bits used for BHT index → branches close in address might alias",
      "Aliasing reduces prediction accuracy — a fundamental limitation of simple BHTs",
    ],
    questions: [],
  },

  "two-bit-predictor": {
    title: "2-Bit Saturating Counter Predictor", emoji: "2️⃣",
    tldr: "4 states: SNT(00), WNT(01), WT(10), ST(11). Need 2 consecutive mispredictions to change prediction. 'Think twice before mispredicting.' ~90% accuracy for loops.",
    explanation: `The 2-bit predictor fixes the main weakness of the 1-bit predictor: it doesn't flip its prediction after just one wrong outcome.

Philosophy: "Think Twice Before Mispredicting" — you need to be wrong TWICE in a row before the prediction flips.

Four states:
- 00 = Strong Not Taken (SNT): very confident branch is NOT taken
- 01 = Weak Not Taken (WNT): thinks branch is NOT taken but less confident
- 10 = Weak Taken (WT): thinks branch is TAKEN but less confident
- 11 = Strong Taken (ST): very confident branch IS taken

State transitions:
- On Taken outcome: move up (toward ST). If already ST: stay at ST (saturate).
- On Not Taken outcome: move down (toward SNT). If already SNT: stay (saturate).
- 1st bit = prediction bit (0=predict NT, 1=predict T)
- 2nd bit = conviction/confidence bit

Prediction changes only after TWO consecutive mispredictions.

For nested loops: 1 entry misprediction + 1 exit misprediction per outer loop = m+2 total (vs 2×m for 1-bit).`,
    keyPoints: [
      "4 states: 00(SNT), 01(WNT), 10(WT), 11(ST)",
      "Prediction changes only after 2 consecutive wrong outcomes",
      "1st bit = prediction (0=NT, 1=T); 2nd bit = conviction (how confident)",
      "Saturates at extremes: ST stays ST on T; SNT stays SNT on NT",
      "For nested loops: m+2 total mispredictions (vs 2×m for 1-bit)",
      "m=100, n=10: 102 mispredictions out of 1000 = ~90% accuracy",
    ],
    formula: {
      code: `2-Bit States and Transitions:
  State  │ Name            │ Prediction │ On T  │ On NT
  ───────┼─────────────────┼────────────┼───────┼───────
  11     │ Strong Taken    │ T          │ 11    │ 10
  10     │ Weak Taken      │ T          │ 11    │ 00  (jumps over WNT!)
  01     │ Weak Not Taken  │ NT         │ 11    │ 00  (jumps over WT!)
  00     │ Strong Not Taken│ NT         │ 01    │ 00

NOTE: 10→NT goes to 00, and 01→T goes to 11 (skip the middle state)

For nested loop for(i=0..m) for(j=0..n):
  1-bit: 2×m mispredictions (80% accuracy for m=100)
  2-bit: ~m+2 mispredictions (~90% accuracy for m=100)
    Entry of inner loop: 1 miss (WNT→T on first T, or similar)
    Middle iterations: all correct (stays in ST)
    Exit of inner loop: 1 miss (goes from ST to WT; WT→NT gives 2nd miss eventually)
    After m outer iterations: m+2 total misses`,
      explanation: "The 2-bit predictor's 'strong' states are resilient to single anomalous branch outcomes.",
    },
    examTips: [
      "4 states: 00=SNT, 01=WNT, 10=WT, 11=ST — memorise all four",
      "2-bit: m+2 mispredictions for nested loop vs 2×m for 1-bit → about half!",
      "10→NT goes to 00 (not 01!); 01→T goes to 11 (not 10!) — common mistake",
      "2-bit: about half the mispredictions of 1-bit for loops: ~m vs ~2m",
    ],
    questions: [
      { q: "What are the 4 states of the 2-bit predictor and how does it reduce mispredictions for loops?", a: "States: 11=Strong Taken (ST), 10=Weak Taken (WT), 01=Weak Not Taken (WNT), 00=Strong Not Taken (SNT). Transitions: on Taken→move up; on Not Taken→move down. For a loop, after the initial miss on loop entry (going from NT states to T states), the predictor stays in ST for all middle iterations. The exit miss takes it from ST to WT, but WT still predicts T — it takes one more exit to fully flip. Result: only ~1-2 misses per inner loop execution vs always 2 for 1-bit predictor." },
    ],
  },

  "two-bit-examples": {
    title: "2-Bit Predictor Worked Examples", emoji: "📝",
    tldr: "Given trace T T NT T NT..., trace through 4 starting states. Best initial state = ST(11) or WT(10) with 5 mispredictions. Worst = SNT(00) with 7 mispredictions.",
    explanation: `Let's work through the classic example from the slides.

Given branch outcome sequence: T T NT T NT T T T NT T T T T T NT T T T T NT

Starting from different initial states, count mispredictions:

State 01 (WNT): 6 mispredictions
State 11 (ST): 5 mispredictions (best among 11 and 01 starting states shown)
State 10 (WT): 5 mispredictions
State 00 (SNT): 7 mispredictions (worst)

Best starting states for this trace: 11 (ST) or 10 (WT) → only 5 mispredictions.

To trace through: start at given state, apply each outcome T or NT, follow the transition table, and mark each step where the prediction was WRONG (prediction ≠ outcome) as a misprediction.

The transition table (review!):
  11(ST): T→11, NT→10
  10(WT): T→11, NT→00
  01(WNT): T→11, NT→00
  00(SNT): T→01, NT→00`,
    keyPoints: [
      "Given trace T T NT T NT T T T NT T T T T T NT T T T T NT",
      "Starting at 01(WNT): 6 mispredictions",
      "Starting at 11(ST): 5 mispredictions",
      "Starting at 10(WT): 5 mispredictions",
      "Starting at 00(SNT): 7 mispredictions (worst)",
      "Best starting state for this trace: ST(11) or WT(10) with 5 misses",
      "Practice: trace through each starting state step by step — exam favourite!",
    ],
    formula: {
      code: `Transition rules (quick reference):
  11(ST):  T→11, NT→10
  10(WT):  T→11, NT→00
  01(WNT): T→11, NT→00
  00(SNT): T→01, NT→00

Trace: T T NT T NT T T T NT T T T T T NT T T T T NT
Starting at 11 (ST):
  T →11(correct), T→11(correct), NT→10(incorrect!),
  T →11(correct), NT→00(incorrect!),
  T →01(incorrect!), T→11(correct), T→11(correct),
  NT→10(incorrect!), T→11(correct), T→11(correct),
  T→11(correct), T→11(correct), T→11(correct),
  NT→10(incorrect!), T→11(correct), T→11(correct),
  T→11(correct), T→11(correct), NT→10(correct)
  → 5 mispredictions (marked with !)

Results:
  Initial 01 (WNT) → 6 mispredictions
  Initial 11 (ST)  → 5 mispredictions ← best
  Initial 10 (WT)  → 5 mispredictions ← best
  Initial 00 (SNT) → 7 mispredictions ← worst`,
      explanation: "Practice tracing through the state machine — this is a common exam problem.",
    },
    examTips: [
      "Best starting state for 'mostly Taken' trace = 11(ST) or 10(WT)",
      "Worst starting state for 'mostly Taken' trace = 00(SNT)",
      "Always draw state transitions on paper and mark each miss explicitly",
      "1-bit vs 2-bit for loops: 2-bit ≈ half the mispredictions of 1-bit",
    ],
    questions: [],
  },

  // ─────────────────────────────────────────────
  // PERFORMANCE EXERCISES
  // ─────────────────────────────────────────────
  "perf-formulas": {
    title: "All Key Performance Formulas — Quick Recap", emoji: "📐",
    tldr: "All the formulas in one place for pipeline performance calculation. Memorise these before the exam.",
    explanation: `These are ALL the formulas you need for Unit 2 numerical problems. Keep them handy.`,
    keyPoints: [
      "Pipelined time = [k + (n-1)] × Tc",
      "Non-pipelined time = n × k × Tc (or n × Σ(stage_delays) for unequal stages)",
      "Tc (with overhead) = max(stage_delays) + register_overhead",
      "Speedup = Non-pipelined / Pipelined",
      "CPI_pipelined = 1 + stall_cycles_per_instruction",
      "Speedup with stalls = pipeline_depth / CPI_pipelined",
      "Performance = 1 / Execution_Time",
      "CPU Time = IC × CPI × Tc",
    ],
    formula: {
      code: `FORMULA SHEET — UNIT 2 PIPELINE:

  Pipelined execution time    = [k + (n-1)] × Tc
  Non-pipelined execution time = n × k × Tc  (equal stages)
                               = n × Σ(stage_delays)  (unequal stages)
  Effective Tc (with overhead) = max(stage_delays) + register_overhead
  Speedup(S)                  = Time_non-pipelined / Time_pipelined

  CPI_pipelined = 1 + stall_cycles_per_instruction
  Speedup with stalls = Pipeline depth / (1 + stall_cycles_per_instruction)
  Speedup = Perf_X / Perf_Y  (when X is faster)
           = Time_Y / Time_X

  Performance = 1 / Execution_Time
  CPU Time = IC × CPI × Tc

  As n → ∞: Speedup → k (pipeline depth)`,
      explanation: "Have these formulas memorised. Every numerical question in Unit 2 uses at least one of these.",
    },
    examTips: [
      "Pipelined = [k+(n-1)]×Tc. Non-pipelined = n×k×Tc. Speedup = non/pipeline.",
      "With overhead: Tc = max_stage + overhead (add ONLY for pipelined, not non-pipelined)",
      "Speedup with stalls = depth / (1 + stalls_per_instr)",
      "Performance = 1/Time — inversely proportional!",
    ],
    questions: [],
  },

  "ex-equal-stages": {
    title: "Exercise 1 — Equal Stages, No Overhead", emoji: "🧮",
    tldr: "4-stage pipeline, all stages=8ns, 100 instructions. Non-pipeline=3200ns, Pipeline=824ns, Speedup=3.88.",
    explanation: `This is the basic pipeline calculation with equal stage delays and no register overhead.`,
    keyPoints: [
      "4-stage pipeline, each stage = 8 ns, 100 instructions",
      "Non-pipelined: 4 × 8 × 100 = 3,200 ns",
      "Pipelined: (4 + 100 - 1) × 8 = 103 × 8 = 824 ns",
      "Speedup: 3,200 / 824 = 3.88 ≈ 3.9",
      "Speedup approaches 4 (pipeline depth) as n gets larger",
    ],
    formula: {
      code: `Given: k=4 stages, Tc=8ns, n=100 instructions, no overhead

Non-pipelined: n × k × Tc = 100 × 4 × 8 = 3,200 ns

Pipelined:     [k + (n-1)] × Tc = [4 + (100-1)] × 8
                                = [4 + 99] × 8 = 103 × 8 = 824 ns

Speedup:       3,200 / 824 = 3.88 ≈ 3.9

Theoretical max speedup = k = 4 (approaches as n → ∞)
At n=100: achieved 3.88 out of max 4 (very close!)`,
      explanation: "With n=100 and k=4, we achieve 97% of the theoretical maximum speedup.",
    },
    examTips: ["Standard formula: [k+(n-1)]×Tc for pipelined. n×k×Tc for non-pipelined."],
    questions: [
      { q: "4-stage pipeline, 8 ns/stage, 100 instructions. Pipelined time and speedup?", a: "Non-pipelined = 4×8×100 = 3,200 ns. Pipelined = (4+99)×8 = 103×8 = 824 ns. Speedup = 3,200/824 = 3.88." },
    ],
  },

  "ex-unequal-stages": {
    title: "Exercise 2 — Unequal Stages, No Overhead", emoji: "🧮",
    tldr: "4 stages: 5,6,11,8 ns. 100 instructions. Non-pipeline=3000ns (sum all stages). Tc=11ns (slowest). Pipeline=1133ns. Speedup=2.6.",
    explanation: `Now the stages have different delays. The key difference: non-pipelined uses SUM of all stage delays; pipelined uses only the MAX stage delay.`,
    keyPoints: [
      "4 stages: 5, 6, 11, 8 ns (unequal)",
      "Non-pipelined: sum all stages × n = (5+6+11+8) × 100 = 30 × 100 = 3,000 ns",
      "Tc = max(5,6,11,8) = 11 ns (slowest stage bottlenecks the pipeline)",
      "Pipelined: (4 + 99) × 11 = 103 × 11 = 1,133 ns",
      "Speedup: 3,000 / 1,133 = 2.6 (lower than equal-stage case due to imbalance)",
    ],
    formula: {
      code: `Given: k=4, stages=[5,6,11,8] ns, n=100, no overhead

Non-pipelined: Σ(stage_delays) × n = (5+6+11+8) × 100 = 30 × 100 = 3,000 ns

Tc = max(5, 6, 11, 8) = 11 ns

Pipelined:     [k + (n-1)] × Tc = [4 + 99] × 11 = 103 × 11 = 1,133 ns

Speedup:       3,000 / 1,133 = 2.6

(If balanced at avg=7.5ns: pipelined = 103×7.5 = 772ns, speedup = 3.9)
Imbalance cost: speedup drops from ~3.9 to 2.6`,
      explanation: "Unequal stages hurt badly: the slowest stage forces all stages to slow down.",
    },
    examTips: [
      "NON-pipelined: sum ALL stage delays. PIPELINED: only slowest stage (Tc=max).",
      "This is the #1 mistake: using max for non-pipelined — WRONG!",
    ],
    questions: [
      { q: "4-stage pipeline, delays: 5,6,11,8 ns. 100 instructions, no overhead. Find pipelined time and speedup.", a: "Non-pipelined = (5+6+11+8) × 100 = 3,000 ns. Tc = max = 11 ns. Pipelined = (4+99) × 11 = 1,133 ns. Speedup = 3,000/1,133 = 2.6." },
    ],
  },

  "ex-with-overhead": {
    title: "Exercise 3 — Unequal Stages + Register Overhead", emoji: "🧮",
    tldr: "Same as Exercise 2 but add 2ns overhead to Tc. Tc=11+2=13ns. Pipelined=1339ns. Speedup drops from 2.6 to 2.2.",
    explanation: `Same pipeline as Exercise 2, but now we add register overhead. The non-pipelined time stays the same (overhead only matters for pipelined), but the pipelined time increases.`,
    keyPoints: [
      "Same 4 stages: 5, 6, 11, 8 ns. Register overhead = 2 ns each.",
      "Non-pipelined: still 3,000 ns (overhead doesn't apply to non-pipelined)",
      "Effective Tc = max(stages) + overhead = 11 + 2 = 13 ns",
      "Pipelined: (4 + 99) × 13 = 103 × 13 = 1,339 ns",
      "Speedup: 3,000 / 1,339 = 2.2 (down from 2.6 due to overhead)",
    ],
    formula: {
      code: `Given: same pipeline (5,6,11,8 ns), register overhead = 2 ns

Non-pipelined: 3,000 ns (SAME — overhead not added here)

Effective Tc = max(5,6,11,8) + 2 = 11 + 2 = 13 ns

Pipelined:     [4 + 99] × 13 = 103 × 13 = 1,339 ns

Speedup:       3,000 / 1,339 = 2.2

Compare:
  No overhead → Speedup = 2.6
  With 2ns overhead → Speedup = 2.2
  Overhead cost = 0.4 speedup units`,
      explanation: "Register overhead always adds to Tc, reducing pipelined speedup. Minimize overhead for best performance.",
    },
    examTips: [
      "Overhead added ONLY to pipelined Tc. Non-pipelined is unchanged.",
      "Effective Tc = max_stage + overhead. Then use [k+(n-1)] × Effective_Tc.",
    ],
    questions: [
      { q: "Same 4-stage pipeline (5,6,11,8 ns), now with 2 ns register overhead. 100 instructions. Speedup?", a: "Non-pipelined = 3,000 ns (unchanged). Effective Tc = 11+2 = 13 ns. Pipelined = 103×13 = 1,339 ns. Speedup = 3,000/1,339 = 2.2." },
    ],
  },

  "ex-structural-speedup": {
    title: "Exercise 4 — Structural Hazard Speedup", emoji: "🧮",
    tldr: "MIPS32, data refs=42%, ideal CPI=1.25. How much faster is ideal machine (no structural hazard) vs real machine (with 1 stall per data ref)? Answer: 1.34×.",
    explanation: `This exercise compares an ideal pipeline (no structural hazard) vs a real pipeline (with structural hazard stalls).`,
    keyPoints: [
      "Data references = 42% of instructions, ideal CPI = 1.25",
      "Structural hazard: each data reference causes 1 stall cycle",
      "Ideal speedup (no hazard): k (pipeline depth)",
      "Real speedup (with hazard): (1.25 × k) / (1.25 + 0.42)",
      "Required speedup = ideal/real = 1.67/1.25 = 1.34×",
      "Ideal machine is 1.34× faster than the real machine with structural hazard",
    ],
    formula: {
      code: `Given: data_refs = 42%, ideal_CPI = 1.25, stall_per_data_ref = 1

Speedup_ideal = (ideal_CPI × k) / (ideal_CPI + 0) = k
  (no stalls in ideal machine)

Speedup_real  = (ideal_CPI × k) / (ideal_CPI + fraction × stalls)
              = (1.25 × k) / (1.25 + 0.42 × 1)
              = (1.25 × k) / 1.67

How much faster is ideal than real?
  Required speedup = Speedup_ideal / Speedup_real
                   = k / ((1.25 × k) / 1.67)
                   = 1.67 / 1.25
                   = 1.34×

Answer: Ideal machine is 1.34× faster`,
      explanation: "The k cancels out — the answer is independent of pipeline depth.",
    },
    examTips: [
      "Required speedup = (ideal_CPI + fraction×stalls) / ideal_CPI",
      "Answer = 1.67 / 1.25 = 1.34×. The k values cancel.",
    ],
    questions: [],
  },

  "ex-loop-nonpipeline": {
    title: "Exercise 5 — Loop Non-Pipelined Execution", emoji: "🧮",
    tldr: "Loop with 6 instructions, 100 iterations + 1 initial MOV. Non-pipelined = 601 instructions × 5 cc = 3,005 clock cycles.",
    explanation: `This exercise calculates non-pipelined execution time for a real assembly loop.

The assembly loop:
  MOV R4, #400      (1 instruction, executes once)
  L1: LDR R1, [R4]     (loop body: 6 instructions)
      LDR R2, [R4, #400]
      ADD R3, R1, R2
      STR R3, [R4]
      SUB R4, R4, #4
      BNEZ R4, L1

Loop runs for 400/4 = 100 iterations.

Non-pipelined: each instruction takes 5 clock cycles (5-stage pipeline × 1 cc each stage).
Total instructions = 1 (MOV) + 6 × 100 (loop) = 601 instructions
Total clock cycles = 601 × 5 = 3,005 cc`,
    keyPoints: [
      "1 initial instruction (MOV) + 6 loop instructions × 100 iterations = 601 total",
      "Non-pipelined: each instruction takes 5 cycles (one per stage, sequential)",
      "Total non-pipelined = 601 × 5 = 3,005 clock cycles",
      "Loop executes 400/4 = 100 times (R4 counts down from 400 by 4 each iteration)",
    ],
    formula: {
      code: `Loop: MOV R4, #400
  L1: LDR R1, [R4]          ← load 1
      LDR R2, [R4, #400]    ← load 2
      ADD R3, R1, R2         ← add
      STR R3, [R4]           ← store
      SUB R4, R4, #4         ← decrement
      BNEZ R4, L1            ← branch

Iterations: 400 / 4 = 100

Total instructions = 1 (MOV) + 6 × 100 = 1 + 600 = 601

Non-pipelined clock cycles = 601 × 5 = 3,005 cc`,
      explanation: "Non-pipelined: every instruction runs all 5 stages sequentially before next starts.",
    },
    examTips: [
      "Count loop iterations: 400/4 = 100. Count instructions per loop body = 6.",
      "Non-pipelined = total_instructions × pipeline_stages (each stage = 1 cc)",
    ],
    questions: [],
  },

  "ex-loop-pipeline": {
    title: "Exercise 6 — Loop Pipelined with Stalls", emoji: "🧮",
    tldr: "Same loop pipelined with stalls (no forwarding, branch at WB). One loop = 16 cc. Total = 1 + 16×100 = 1,601 cc. Speedup ≈ 2× (3005/1601).",
    explanation: `Now we pipeline the same loop but with stalls. Assumptions: no forwarding, branch result available after WB (overlap of WB and ID used — partitioning).

Analyzing one loop iteration timing:
For each of the 6 instructions, trace through which ones cause stalls (load-use hazards, branch stalls, etc.). Without forwarding, many pairs of instructions will cause stalls. The slides show this analysis results in 16 clock cycles per loop iteration.

Total pipelined clock cycles = 1 cc (IF of first instruction MOV) + 16 cc per loop × 100 loops
= 1 + 1,600 = 1,601 cc

Speedup = 3,005 / 1,601 ≈ 1.88 ≈ 2×

This shows that even with stalls reducing the speedup, pipelining still provides a significant improvement.`,
    keyPoints: [
      "5-stage pipeline, no forwarding, branch result at WB, partitioning used for ID/WB",
      "One loop iteration = 16 clock cycles (accounting for all stalls)",
      "Total pipelined = 1 (initial MOV fetch) + 16 × 100 = 1,601 cc",
      "Speedup = 3,005 / 1,601 ≈ 1.88 ≈ 2×",
      "Even with stalls, pipelining provides ~2× speedup over non-pipelined",
    ],
    formula: {
      code: `Loop iteration timing (with stalls, no forwarding):
  16 clock cycles per loop iteration (stalls due to:
    - LDR→ADD data hazard: 2 stalls
    - LDR→STR data hazard: 2 stalls
    - branch stalls: etc.)

Total pipelined execution:
  = 1 cc (IF of MOV) + (16 cc/loop × 100 loops)
  = 1 + 1600 = 1,601 clock cycles

Speedup = Non-pipelined / Pipelined = 3,005 / 1,601 ≈ 1.88 ≈ 2×

Compare: ideal speedup = 5 (no stalls). Actual = ~2× (many stalls).
Stalls hurt! But still 2× better than non-pipelined.`,
      explanation: "Stalls reduce speedup from ideal 5× down to ~2×, but pipelining still wins.",
    },
    examTips: [
      "Pipelined loop with stalls: need to count stall cycles for each instruction pair carefully",
      "Total pipelined = 1 (first IF) + (cc_per_loop × iterations)",
      "Speedup = non-pipelined / pipelined ≈ 2× in this case",
    ],
    questions: [],
  },

  // ─────────────────────────────────────────────
  // QUICK REFERENCE
  // ─────────────────────────────────────────────
  "qref-formulas": {
    title: "Quick Reference — All Formulas", emoji: "📋",
    tldr: "All pipeline performance formulas in one place. Print this before the exam.",
    explanation: `Complete formula sheet for Unit 2 pipeline calculations.`,
    keyPoints: [
      "Pipelined time = [k + (n-1)] × Tc",
      "Non-pipelined time (equal stages) = n × k × Tc",
      "Non-pipelined time (unequal) = n × Σ(stage_delays)",
      "Effective Tc (with overhead) = max(stage_delays) + register_overhead",
      "Speedup(S) = Time_non-pipelined / Time_pipelined",
      "CPI_pipelined = 1 + stall_cycles_per_instruction",
      "Speedup (with stalls) = pipeline_depth / (1 + stall_cycles_per_instruction)",
      "Performance = 1 / Execution_Time",
      "CPU Time = IC × CPI × Tc",
      "As n→∞: Speedup → k (pipeline depth)",
    ],
    formula: {
      code: `UNIT 2 FORMULA SHEET:
Formula                               Expression
────────────────────────────────────────────────────────────
Pipelined execution time              [k + (n-1)] × Tc
Non-pipelined (equal stages)         n × k × Tc
Non-pipelined (unequal stages)       n × Σ(stage_delays)
Effective Tc (with overhead)         max(stage_delays) + overhead
Speedup (ideal)                       n×k×Tc / [k+(n-1)]×Tc → k as n→∞
CPI pipelined                         1 + stall_cycles_per_instruction
Speedup with stalls                   pipeline_depth / CPI_pipelined
Speedup formula                       Time_Y / Time_X (X is faster)
Performance                           1 / Execution_Time
CPU Time                              IC × CPI × Tc`,
      explanation: "These are ALL the formulas tested in Unit 2 numericals.",
    },
    examTips: [
      "Pipelined = [k+(n-1)]×Tc — not n×k!",
      "Overhead added to Tc for pipelined ONLY — non-pipelined is unchanged",
      "Speedup approaches k as n→∞ — pipeline depth is theoretical max speedup",
    ],
    questions: [],
  },

  "qref-hazards": {
    title: "Quick Reference — All Hazard Types", emoji: "⚠️",
    tldr: "3 structural hazards, 3 data hazards, 1 control hazard — with causes and solutions for each.",
    explanation: `Complete hazard summary for quick revision.`,
    keyPoints: [
      "Structural: IF vs MEM → split memory (Harvard Architecture)",
      "Structural: WB vs WB → stall OR force all 5 stages for all instructions",
      "Structural: ID vs WB → partitioning (WB writes 1st half, ID reads 2nd half)",
      "Data RAW → reorder, NOP, stall, forwarding (cannot eliminate load-use fully)",
      "Data WAR → not in 5-stage in-order; register renaming for out-of-order",
      "Data WAW → not in 5-stage in-order; register renaming for out-of-order",
      "Load-Use → 1 stall always needed even with forwarding",
      "Control → stall/flush, delayed branch slot, branch prediction",
    ],
    formula: {
      code: `Hazard Type           │ Cause                    │ Solutions
──────────────────────┼──────────────────────────┼─────────────────────────────────
Structural: IF vs MEM │ Unified memory            │ Harvard Architecture (split mem)
Structural: WB vs WB  │ Single write port         │ Stall OR force all 5 stages
Structural: ID vs WB  │ Register file read+write  │ Partitioning (WB 1st half, ID 2nd)
Data: RAW             │ Value not yet written     │ Reorder, NOP, stall, forwarding
Data: WAR             │ Register name reuse       │ Register renaming (not in-order)
Data: WAW             │ Register name reuse       │ Register renaming (not in-order)
Load-Use RAW          │ LDR result after MEM      │ 1 stall always (+ forwarding)
Control Hazard        │ Branch changes PC          │ Stall, flush, delay slot, prediction`,
      explanation: "Know cause AND solution for each. Exams often ask for a specific solution.",
    },
    examTips: [
      "Structural hazards: 3 types, 3 different solutions",
      "Only RAW is a real data hazard in 5-stage in-order pipeline",
      "Load-use: 1 stall always required, even with forwarding",
    ],
    questions: [],
  },

  "qref-branch-pred": {
    title: "Quick Reference — Branch Prediction Summary", emoji: "🔮",
    tldr: "Static: Always T (5 misses) vs Always NT (15 misses). 1-bit: 2×m misses (80%). 2-bit: m+2 misses (~90%). Know the 4 states of 2-bit.",
    explanation: `Complete branch prediction summary for quick revision.`,
    keyPoints: [
      "Static Always Taken: 5 mispredictions for given trace",
      "Static Always Not Taken: 15 mispredictions for given trace",
      "Alternative static: backward→Taken, forward→Not Taken",
      "1-bit: 2 states (T/NT), 2×m mispredictions for nested loops, 80% accuracy",
      "2-bit: 4 states (SNT/WNT/WT/ST), m+2 mispredictions, ~90% accuracy",
      "BHT indexed by low-order PC bits at FETCH stage",
      "Aliasing: two branches with same index bits share BHT entry",
    ],
    formula: {
      code: `Branch Prediction Comparison:
Predictor      │ States │ Mispredictions (m=100,n=10) │ Accuracy
───────────────┼────────┼─────────────────────────────┼─────────
Static: Always T│  —     │ ~NT count                   │ varies
Static: Always NT│ —     │ ~T count                    │ varies
1-Bit Dynamic  │  2     │ 2 × m = 200                 │ ~80%
2-Bit Saturating│ 4     │ m + 2 = 102                 │ ~90%

2-Bit States:
  00 = Strong Not Taken (SNT) ─ predict NT
  01 = Weak Not Taken (WNT)   ─ predict NT
  10 = Weak Taken (WT)         ─ predict T
  11 = Strong Taken (ST)       ─ predict T

State transitions:
  11: T→11, NT→10
  10: T→11, NT→00
  01: T→11, NT→00
  00: T→01, NT→00`,
      explanation: "2-bit roughly halves the mispredictions of 1-bit for loop-heavy code.",
    },
    examTips: [
      "2-bit: 4 states 00/01/10/11. Prediction: 0x=predict NT, 1x=predict T.",
      "10→NT goes to 00 (not 01). 01→T goes to 11 (not 10). Common error!",
      "1-bit: 2m mispredictions. 2-bit: m+2 mispredictions (for nested loops, m outer, n inner).",
    ],
    questions: [],
  },

  "mcq-revision": {
    title: "Quick MCQ Revision — All Sessions", emoji: "📝",
    tldr: "All MCQ answers from sessions 2.1–2.8 in one place. Last-minute revision for S grade.",
    explanation: `All the MCQ answers from the slides, organized by session.`,
    keyPoints: [
      "Session 2.1: Pipelining = dividing and overlapping. Best metric = throughput. 8 jobs, 2×6 min = 54 min. Y=100ns, X=25ns → 4×.",
      "Session 2.2: Clock = slowest stage. Pipeline fill latency (first instr unchanged). Stages 150-180 = 18720ns. EA computed at EX.",
      "Session 2.3: 0.4 stalls/instr → Speedup = 3.57. Most common = stalling. IF vs MEM = split memory. Hazard = prevents next from designated cycle.",
      "Session 2.4: LDR reads before ADD writes → RAW. True dependency = RAW. WAR/WAW: reads at stage 2, writes at stage 5. MUL+ADD same reg = WAW.",
      "Session 2.5: 2 NOPs without forwarding. Data forwarding = short-circuiting. Reordering = no code size increase.",
      "Session 2.6: Control hazard = non-sequential flow. 2→1 cycle by moving to ID. Delay slot = always executes. 20% branches, 1 stall → CPI=1.2.",
      "Session 2.7: Alt static = backward T, forward NT. 1-bit shortcoming = 2 misses per loop. BHT indexed by low-order PC bits. 2-bit ≈ half mispredictions.",
      "Session 2.8: 6-stage 5ns 60instr → Speedup=5.53. 4-stage (3,7,5,6) +1ns overhead 80instr → Speedup=2.5. 5-stage 0.4 stalls → 3.6. CPI 1.65/1.3=1.27.",
    ],
    formula: {
      code: `KEY NUMERICAL ANSWERS:

Session 2.1 MCQ:
  8 jobs, 2 stages of 6 min: 12 + 7×6 = 54 min → C
  Y=100ns, X=25ns → X is 4× faster → D

Session 2.2 MCQ:
  Stages 150,120,160,140,180 ns, 100 instr:
    Tc=180, Pipelined = (5+99)×180 = 18,720 ns → A

Session 2.3 MCQ:
  5-stage, 0.4 stalls/instr: Speedup = 5/1.4 = 3.57 → B

Session 2.6 MCQ:
  20% branches, 1-cycle stall: CPI = 1 + 0.20×1 = 1.2 → B

Session 2.8 MCQ:
  6-stage, 5ns, 60 instr:
    Non-pipeline: 6×5×60 = 1800ns
    Pipeline: (6+59)×5 = 325ns → Speedup = 5.54 → C
  4-stage (3,7,5,6) +1ns overhead, 80 instr:
    Non-pipeline: (3+7+5+6)×80 = 1680ns
    Tc = 7+1 = 8ns; Pipeline = (4+79)×8 = 664ns → Speedup = 2.53 → B
  5-stage, ideal CPI=1, 0.4 stalls: Speedup = 5/1.4 = 3.57 → A (≈3.6)
  Ideal CPI=1.3, 35% memory, 1 stall: 1.3+0.35=1.65; 1.65/1.3=1.27 → D`,
      explanation: "Know these answers cold. Practice deriving each one from scratch in under 60 seconds.",
    },
    examTips: [
      "8 jobs, 2 stages of 6 min = (1×12) + (7×6) = 54 min",
      "For unequal stages: non-pipeline uses sum, pipeline uses max (Tc)",
      "Speedup = depth / (1+stalls). Always divide depth by CPI.",
      "2-bit: 10→NT goes to 00 (NOT 01). Check transitions carefully.",
    ],
    questions: [
      { q: "6-stage pipeline, 5 ns/stage, 60 instructions. Speedup?", a: "Non-pipelined: 6×5×60 = 1800 ns. Pipelined: (6+59)×5 = 65×5 = 325 ns. Speedup = 1800/325 = 5.54." },
      { q: "4-stage pipeline (3,7,5,6 ns), overhead=1ns, 80 instructions. Speedup?", a: "Non-pipelined: (3+7+5+6)×80 = 21×80 = 1680 ns. Effective Tc = 7+1 = 8 ns. Pipelined: (4+79)×8 = 83×8 = 664 ns. Speedup = 1680/664 = 2.53." },
      { q: "5-stage, ideal CPI=1, 0.4 stall cycles/instr. Speedup?", a: "CPI_pipelined = 1 + 0.4 = 1.4. Speedup = 5 / 1.4 = 3.57." },
      { q: "Ideal CPI=1.3, 35% memory refs, 1 stall each. How much faster is ideal machine?", a: "Real = (1.3+0.35)/1.3 = 1.65/1.3 = 1.27×. Ideal machine is 1.27× faster." },
    ],
  },
};

