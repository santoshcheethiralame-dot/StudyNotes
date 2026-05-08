
export const groups = [
  { name: "⚡ CISC vs RISC", ids: ["cisc-risc-overview", "cisc-detail", "risc-detail", "risc-vs-cisc-table"] },
  { name: "🧠 ARM Architecture", ids: ["arm-overview", "arm-rejected", "arm-internals", "arm-registers", "arm-modes", "arm-cpsr", "arm-memory"] },
  { name: "📋 Instruction Basics", ids: ["instruction-format", "arm-key-features", "assembly-directives"] },
  { name: "🔢 Data Processing", ids: ["mov-mvn", "arithmetic", "comparison", "logical", "opcode-table"] },
  { name: "🔀 Barrel Shifter", ids: ["barrel-shifter", "fast-multiply"] },
  { name: "🌿 Branch & Conditions", ids: ["branch-instructions", "condition-codes", "conditional-execution"] },
  { name: "📦 Memory & Addressing", ids: ["ldr-str", "addressing-modes"] },
  { name: "✖️ Multiply", ids: ["mul-32", "mul-64"] },
  { name: "📚 Multiple Load/Store", ids: ["ldm-stm-overview", "ldm-stm-modes", "stack-conventions"] },
  { name: "🔁 Procedures & SWI", ids: ["procedure-calls", "nested-calls", "swi", "exception-vectors"] },
  { name: "🔧 PSR & SWAP", ids: ["psr-instructions", "swap-instruction"] },
  { name: "🧮 Instruction Encoding", ids: ["encode-data-processing", "encode-branch", "encode-ldr-str", "encode-block", "encode-multiply", "encode-swap"] },
  { name: "💻 Complete Programs", ids: ["prog-sum", "prog-while", "prog-stack", "prog-reverse", "prog-factorial", "prog-strcopy", "prog-bubble", "prog-max", "prog-hex-ascii", "prog-nested", "prog-print-string"] },
  { name: "📝 Quick MCQ Revision", ids: ["mcq-revision"] },
];

export const topics = {
  "cisc-risc-overview": {
    title: "What is a Microprocessor / ISA", emoji: "🖥️",
    tldr: "Microprocessor = brain of computer. ISA = full instruction set CPU understands. Distinguishes CISC vs RISC.",
    explanation: `A microprocessor is the brain of a computer — a complete computing unit on a single chip. It accepts digital input, processes it, and gives output. It does NOT have RAM, ROM, or peripherals built in — those are external.

Three things differentiate microprocessors: instruction set, bandwidth (bits processed per instruction), and clock speed (in MHz).

Computer Architecture = what the programmer sees — instruction set, data types, addressing modes, I/O mechanisms.
Computer Organization = what the hardware does internally — control signals, memory tech, interfaces. Transparent to the programmer.

The ISA (Instruction Set Architecture) is the full set of instructions a CPU understands. It's the main criterion separating CISC and RISC. Compilers generate machine code based on the ISA.`,
    keyPoints: [
      "Microprocessor: NO built-in RAM/ROM/peripherals — those are external",
      "3 differentiators: instruction set, bandwidth, clock speed",
      "Computer Architecture = programmer's view (ISA, addressing modes, data types)",
      "Computer Organization = hardware's internal view (control signals, memory interfaces)",
      "ISA = full instruction set — what separates CISC from RISC",
      "Compilers generate machine code based on the ISA",
      "Microcontroller = CPU + RAM + ROM + I/O all on one chip (e.g., ESP32, 8051)",
      "Microprocessor = CPU only (e.g., Intel Pentium)",
    ],
    formula: {
      code: `Microprocessor vs Microcontroller:
  Feature        │ Microprocessor    │ Microcontroller
  ───────────────┼───────────────────┼──────────────────
  RAM/ROM        │ External          │ On-chip
  Peripherals    │ External          │ On-chip
  Cost           │ Higher            │ Lower
  Use case       │ General computing │ Specific/embedded
  Example        │ Intel Pentium     │ ESP32, 8051

Architecture vs Organization:
  Architecture = ISA, data types, addressing modes (what programmer sees)
  Organization = control signals, memory tech (transparent to programmer)`,
      explanation: "A microcontroller is literally a 'computer on a chip' — full system in one IC.",
    },
    examTips: [
      "Architecture = programmer's view. Organization = hardware's view.",
      "ISA is the key criterion separating CISC and RISC",
      "Microcontroller ≠ Microprocessor — micro has everything on chip",
    ],
    questions: [
      { q: "What are the three factors that differentiate microprocessors?", a: "1. Instruction set (ISA), 2. Bandwidth (bits processed per instruction), 3. Clock speed (MHz)." },
      { q: "What is the difference between Computer Architecture and Computer Organization?", a: "Architecture = what the programmer sees: ISA, data types, addressing modes, I/O. Organization = internal hardware implementation: control signals, memory technology, interfaces. Organization is transparent to programmers." },
    ],
  },
  "cisc-detail": {
    title: "CISC — Complex Instruction Set", emoji: "🏭",
    tldr: "1970s design. One instruction = many low-level ops. Variable-length, microprogrammed, small register set. Examples: x86, Pentium.",
    explanation: `CISC originated in the 1970s when memory was small and expensive. The goal was to reduce the number of instructions in a program — each instruction would do more work.

Key ideas: One instruction performs multiple low-level operations (like load + add + store in one step). Instructions are variable-length with many formats. Memory operands are allowed directly in data processing — no strict load/store separation. Uses a 2-operand instruction format.

CISC uses a small, specialized register set. The control unit is microprogrammed (easier to implement but slower to decode). Multiple clock cycles per instruction. No natural pipelining overlap between instructions. The compiler is simple — the processor does the heavy lifting.`,
    keyPoints: [
      "Origin: 1970s — memory was expensive, fewer instructions = good",
      "One instruction does multiple low-level operations",
      "Variable-length instructions with many different formats",
      "Memory operands allowed directly in data processing (no load-store requirement)",
      "2-operand instruction format",
      "Small, specialized register set",
      "Microprogrammed control unit (easier to implement, slower decode)",
      "Multiple clock cycles per instruction — no single-cycle execution",
      "No pipelining overlap between instructions",
      "Compiler is simple; processor does the heavy lifting",
      "Examples: Intel 8086, Motorola 68K, Pentium",
    ],
    formula: null,
    examTips: [
      "CISC = Complex = variable-length, many formats, microprogrammed",
      "CISC allows memory operands directly in arithmetic instructions",
      "CISC: small register set, multiple cycles per instruction, no pipeline",
      "2-operand format: ADD AX, BX (result goes into one of the sources)",
    ],
    questions: [
      { q: "Why was CISC designed the way it was?", a: "In the 1970s, memory was small and expensive. Fewer instructions in a program meant less memory usage. So CISC packed each instruction with more operations — each instruction did more work, reducing program size." },
    ],
  },
  "risc-detail": {
    title: "RISC — Reduced Instruction Set", emoji: "🚀",
    tldr: "1974, John Cocke. 20% of instructions do 80% of work. Fixed 32-bit, load-store, 32 registers, hard-wired, pipelined. Examples: ARM, MIPS.",
    explanation: `RISC originated from observations by John Cocke in 1974: approximately 20% of instructions do 80% of the work. The term "RISC" was coined by David Patterson at UC Berkeley.

Key ideas: Simplify each individual instruction. Fixed-length 32-bit instructions — no variable length. Load-store architecture: data processing only on registers, separate LDR/STR for memory access. Large register bank (32 registers typically). Hard-wired control unit (faster decode). Pipelined execution with single-cycle execution for most instructions. Smaller die size, shorter development cycle, higher performance.

Drawback: poor code density — more instructions needed for the same task compared to CISC. Cannot run x86 code natively. Examples: ARM, MIPS, SPARC.`,
    keyPoints: [
      "Origin: 1974, John Cocke's 20/80 observation. Term coined by David Patterson.",
      "Simplify instructions: each does exactly one thing, fast",
      "Fixed-length 32-bit instructions — all same size",
      "Load-store architecture: only LDR/STR touch memory; all arithmetic on registers",
      "Large register bank (32 general-purpose registers typically)",
      "Hard-wired control unit (faster decode than microprogrammed)",
      "Pipelined — most instructions execute in one cycle",
      "Smaller die, shorter dev cycle, higher performance per watt",
      "DRAWBACK: poor code density (more instructions for same task)",
      "Cannot run x86 code natively",
      "Examples: ARM, MIPS, SPARC",
    ],
    formula: null,
    examTips: [
      "John Cocke (1974) = 20/80 observation. David Patterson = coined 'RISC'.",
      "RISC = fixed 32-bit, load-store, 32 registers, hard-wired, pipelined",
      "RISC drawback = poor code density (needs more instructions for same task)",
      "Load-store = RISC ONLY. CISC allows memory operands in arithmetic.",
    ],
    questions: [
      { q: "Who observed the 20/80 rule and who coined the term RISC?", a: "John Cocke (IBM, 1974) observed that ~20% of instructions do ~80% of the work. David Patterson at UC Berkeley coined the term 'RISC'." },
      { q: "What is the main drawback of RISC?", a: "Poor code density. Because each instruction does less, more instructions are needed to accomplish the same task as a CISC program. This can hurt performance when instruction memory bandwidth is limited." },
    ],
  },
  "risc-vs-cisc-table": {
    title: "RISC vs CISC Comparison", emoji: "⚖️",
    tldr: "Fixed vs variable. Hard-wired vs microprogrammed. Load-store vs memory operands. Today: line blurred — x86 uses pipelining, ARM dominates mobile.",
    explanation: `The RISC vs CISC debate has shaped processor design for decades. Today, the line is significantly blurred — modern x86 processors (CISC) internally translate complex instructions into RISC-like micro-ops and use heavy pipelining.

ARM (RISC) vs Intel (CISC) is the main rivalry today. ARM focuses on energy efficiency and dominates mobile/embedded. Intel focuses on peak performance for desktops and servers.

The key insight: CISC was born from memory constraints of the 1970s. RISC was born from compiler technology improvements that made it possible to generate efficient code from simple instructions.`,
    keyPoints: [
      "Instruction size: CISC = variable; RISC = fixed 32-bit",
      "Instruction complexity: CISC = high; RISC = low",
      "Clock cycles/instruction: CISC = many; RISC = ~1",
      "Registers: CISC = few specialized; RISC = many general-purpose",
      "Memory operands: CISC = allowed; RISC = load/store only",
      "Control unit: CISC = microprogrammed; RISC = hard-wired",
      "Code density: CISC = good; RISC = poor",
      "Pipeline: CISC = difficult; RISC = natural fit",
      "Today: modern CISC (Pentium) uses pipelining internally",
      "ARM vs Intel = main rivalry; ARM dominates mobile",
    ],
    formula: {
      code: `Feature          │ CISC              │ RISC
─────────────────┼───────────────────┼───────────────────
Instruction size │ Variable          │ Fixed (32-bit)
Complexity       │ High              │ Low
Cycles/instr     │ Many              │ ~1 (most)
Registers        │ Few, specialized  │ Many, general purpose
Memory operands  │ Allowed           │ Load/store only
Control unit     │ Microprogrammed   │ Hard-wired
Code density     │ Good              │ Poor
Pipeline         │ Difficult         │ Natural
Examples         │ x86, Pentium      │ ARM, MIPS, SPARC`,
      explanation: "Today x86 chips decode CISC instructions into internal RISC micro-ops — the line is blurred.",
    },
    examTips: [
      "CISC: variable-length, microprogrammed, few regs, memory ops allowed",
      "RISC: fixed 32-bit, hard-wired, 32 regs, load-store only",
      "Both camps have converged — modern Intel uses pipelining like RISC",
      "ARM vs Intel: ARM = efficiency (mobile); Intel = peak performance (desktop)",
    ],
    questions: [
      { q: "Why is the RISC vs CISC distinction less meaningful today?", a: "Modern CISC processors (e.g., Intel x86) internally translate complex CISC instructions into RISC-like micro-operations and use deep pipelining. So the hardware is effectively RISC internally, with a CISC instruction decoder at the front end." },
    ],
  },
  "arm-overview": {
    title: "ARM Architecture Overview", emoji: "💪",
    tldr: "Acorn RISC Machine. British, dominates mobile/embedded. 3-stage pipeline: Fetch→Decode→Execute. Adopted load-store, fixed 32-bit, 3-address format.",
    explanation: `ARM = Acorn RISC Machine. British origin. ARM dominates mobile and embedded computing worldwide.

ARM is a RISC processor with a 3-stage pipeline: Fetch → Decode → Execute.

RISC features ARM adopted: Load-store architecture (no memory operands in arithmetic), fixed-length 32-bit instructions, 3-address instruction format (two independent sources + one destination, all independently specified).

ARM is known for extreme energy efficiency — this is why virtually all smartphones use ARM processors. The ARM instruction set is licensed to many chip manufacturers (Apple, Qualcomm, Samsung, etc.) who design their own ARM-based chips.`,
    keyPoints: [
      "ARM = Acorn RISC Machine — British origin",
      "Dominates mobile, embedded, and increasingly server/desktop markets",
      "3-stage pipeline: Fetch → Decode → Execute",
      "Adopted from RISC: load-store arch, fixed 32-bit, 3-address format",
      "3-address format: two independent source regs + one destination reg",
      "16 visible registers (R0–R15), all 32-bit wide",
      "ARM license model: Apple, Qualcomm, Samsung all make ARM-based chips",
      "Focus: energy efficiency over raw peak performance",
    ],
    formula: {
      code: `ARM 3-Stage Pipeline:
  ┌─────────┐    ┌─────────┐    ┌─────────┐
  │  FETCH  │ →  │ DECODE  │ →  │ EXECUTE │
  └─────────┘    └─────────┘    └─────────┘

  At any time, 3 different instructions are in the pipeline.
  
  3-address format:
  ADD R0, R1, R2    ; R0 = R1 + R2
       ↑    ↑   ↑
      Dest  Src1 Src2  (all independently specified)

  vs CISC 2-address:
  ADD AX, BX        ; AX = AX + BX  (src1 = dest)`,
      explanation: "3-address = Rd, Rn, Op2 all independent. CISC 2-address overrides src1 with result.",
    },
    examTips: [
      "ARM = RISC but selectively — it REJECTED some RISC features (see next topic)",
      "3-address = Rd, Rn, Op2 all independently specified (not CISC's 2-address)",
      "Pipeline has 3 stages → PC is always 8 bytes ahead at execution time",
    ],
    questions: [
      { q: "What RISC features did ARM adopt?", a: "1. Load-store architecture (no memory operands in arithmetic), 2. Fixed-length 32-bit instructions, 3. 3-address instruction format (two independent sources + one destination)." },
    ],
  },
  "arm-rejected": {
    title: "RISC Features ARM REJECTED ⚠️", emoji: "🚫",
    tldr: "ARM rejected: Register Windows (too much chip area), Delayed Branches (bad for superscalar), Single-cycle for ALL instructions (Harvard arch too costly).",
    explanation: `ARM deliberately rejected three standard RISC features. This is a favourite PYQ topic.

1. Register Windows: RISC processors gave each procedure its own private set of registers (a "window") to avoid saving/restoring to memory on procedure calls. ARM rejected this because large register banks consume too much chip area — too expensive.

2. Delayed Branches: A delayed branch executes the instruction immediately after the branch before the branch takes effect. ARM rejected this because it doesn't scale well to superscalar designs (multiple issue pipelines) and interacts badly with branch prediction hardware.

3. Single-Cycle Execution of ALL Instructions: ARM executes most data processing instructions in one cycle. But load/store requires at least 2 memory accesses (one for the instruction, one for data). True single-cycle for ALL instructions needs separate instruction and data memories (Harvard architecture) — too costly for most applications.`,
    keyPoints: [
      "Register Windows: rejected — too much chip area consumed",
      "Register windows gave each procedure its own private registers",
      "Delayed Branches: rejected — doesn't scale to superscalar, breaks branch prediction",
      "Delayed branch = next instruction after branch executes before branch takes effect",
      "Single-cycle ALL instructions: rejected — load/store needs ≥2 memory accesses",
      "True single-cycle for all needs Harvard architecture (separate I-cache and D-cache)",
      "Harvard arch = too costly for general embedded/mobile use cases",
    ],
    formula: {
      code: `1. Register Windows (rejected):
   Procedure A: uses registers [0-7]
   Procedure B: uses registers [8-15] (own "window")
   → No save/restore needed but needs HUGE register file
   ARM rejection: too expensive in silicon area

2. Delayed Branch (rejected):
   BL subroutine    ; branch to subroutine
   ADD R0, R1, R2   ; THIS executes BEFORE branch takes effect!
   ARM rejection: breaks superscalar execution and branch prediction

3. Single-cycle ALL (rejected):
   LDR R0, [R1]     ; needs fetch instruction + fetch data = 2 cycles minimum
   Harvard arch (separate memories) needed → too costly
   ARM solution: most instrs = 1 cycle; LDR/STR = 2+ cycles`,
      explanation: "These 3 rejections make ARM different from pure RISC designs like MIPS.",
    },
    examTips: [
      "⚡ PYQ FAVOURITE: Name 3 RISC features ARM rejected",
      "Register Windows → too much chip area",
      "Delayed Branches → bad for superscalar and branch prediction",
      "Single-cycle ALL → needs Harvard arch; too costly",
    ],
    questions: [
      { q: "Why did ARM reject register windows?", a: "Register windows require a large register bank (each procedure needs its own set of registers). This consumes too much chip area (silicon) — too expensive for ARM's cost/efficiency goals." },
      { q: "Why did ARM reject single-cycle execution of all instructions?", a: "Load/store instructions need at least 2 memory accesses: one for the instruction itself, one for the data. True single-cycle for all instructions requires a Harvard architecture (separate instruction and data memories) which is too costly for ARM's target markets." },
    ],
  },
  "arm-internals": {
    title: "ARM Internal Organization", emoji: "🔧",
    tldr: "Register bank (2 read, 1 write ports), Barrel Shifter, ALU, Address Register+Incrementer, Data Registers, Instruction Decoder. PC always 8 bytes ahead.",
    explanation: `The ARM processor contains several key hardware components that work together in the 3-stage pipeline.

Register Bank: Has 2 read ports + 1 write port for general use, plus an extra port for R15 (PC). This allows reading two source registers and writing one result simultaneously.

Barrel Shifter: Shifts or rotates one operand by any number of bits before it reaches the ALU — all in one cycle. Implemented as a 32×32 cross-bar switch matrix. This means a shift and an ALU operation can happen in a single instruction, single cycle.

ALU: Performs arithmetic and logic operations.

Address Register & Incrementer: Holds memory addresses and generates sequential addresses for the pipeline.

Data Registers: Hold data going to/from memory.

Instruction Decoder & Control Logic: Decodes the 32-bit instruction word and generates all control signals.

Pipeline PC offset: Because of the 3-stage pipeline, the PC always points 8 bytes ahead of the currently executing instruction during Execute stage. This matters for branch address calculations.`,
    keyPoints: [
      "Register Bank: 2 read ports + 1 write port + extra port for R15",
      "Barrel Shifter: shifts/rotates operand before ALU — one cycle, 32×32 crossbar",
      "ALU: arithmetic and logic",
      "Address Register + Incrementer: generates memory addresses",
      "Data Registers: buffer data to/from memory",
      "Instruction Decoder: generates control signals",
      "3-stage pipeline: PC = current instruction address + 8 during Execute",
      "Barrel Shifter enables shift + arithmetic in ONE instruction, ONE cycle",
    ],
    formula: {
      code: `ARM Internal Data Path:
  [Register Bank] → [Barrel Shifter] → [ALU] → [Result]
        ↓                                           ↓
  [Address Reg + Incrementer]              [Register Bank]
        ↓
  [Data Registers] ↔ Memory

Pipeline PC offset:
  Instruction at 0x1000:
  - During Fetch:   PC = 0x1000
  - During Decode:  PC = 0x1004 (next fetch)
  - During Execute: PC = 0x1008 (two instructions ahead)
  
  So at Execute: PC = instruction_address + 8`,
      explanation: "PC+8 rule is critical for branch encoding calculations in exam problems.",
    },
    examTips: [
      "Register Bank: 2 read + 1 write ports (can read 2 regs + write 1 simultaneously)",
      "Barrel Shifter is BEFORE the ALU — shift + ALU = one cycle",
      "PC = instruction_address + 8 at execute time (3-stage pipeline, 4 bytes/instr)",
    ],
    questions: [
      { q: "Why does the PC point 8 bytes ahead during instruction execution?", a: "Due to the 3-stage pipeline. When an instruction is in the Execute stage, the next instruction is in Decode (PC+4) and the one after is being Fetched (PC+8). The fetch stage always points to PC+8 relative to the executing instruction." },
    ],
  },
  "arm-registers": {
    title: "ARM Register Set", emoji: "📋",
    tldr: "16 visible regs (R0-R15), 32-bit. R13=SP, R14=LR (return address on BL), R15=PC. Total 37 with banked regs.",
    explanation: `ARM has 16 visible registers (R0–R15) at any point in time, all 32-bit wide. The total number of physical registers including banked registers across all modes is 37.

R0–R12: General purpose registers. Can be used for any data or address.

R13 (SP — Stack Pointer): By convention, tracks the top of the stack. ARM has no dedicated hardware stack — it's a software convention using R13.

R14 (LR — Link Register): Stores the return address when a Branch with Link (BL) instruction is executed. The processor automatically puts PC+4 (address of next instruction) into R14 when BL executes.

R15 (PC — Program Counter): Always points to the instruction being fetched, which is 8 bytes ahead of the instruction currently being executed (due to 3-stage pipeline).`,
    keyPoints: [
      "16 visible registers at any time: R0–R15, all 32-bit",
      "Total 37 physical registers (includes banked registers across modes)",
      "R0–R12: general purpose, any use",
      "R13 = SP (Stack Pointer): tracks top of stack (software convention)",
      "R14 = LR (Link Register): return address stored here on BL instruction",
      "R15 = PC (Program Counter): points to instruction being fetched (addr + 8 from exec)",
      "BL automatically: LR = PC of next instruction (return address)",
      "Return from subroutine: MOV PC, LR or BX LR",
    ],
    formula: {
      code: `Register Map:
  R0–R12  │ General Purpose
  R13     │ SP  (Stack Pointer)  — top of stack
  R14     │ LR  (Link Register)  — return address (set by BL)
  R15     │ PC  (Program Counter)— current fetch address (+8 from exec)

BL instruction behaviour:
  BL label → LR = address of instruction AFTER BL
             PC = label address
  
  MOV R0, #5          ; addr 0x1000
  BL  my_func         ; addr 0x1004 → LR = 0x1008
  ADD R1, R0, #1      ; addr 0x1008 ← LR points here
  
Return:
  MOV PC, LR  or  BX LR`,
      explanation: "LR = next instruction's address. After function returns (MOV PC, LR), execution continues at addr after BL.",
    },
    examTips: [
      "R13=SP, R14=LR, R15=PC — must know these",
      "BL sets LR = address of instruction AFTER BL (not at BL)",
      "Return from subroutine: MOV PC, LR (copies LR back into PC)",
    ],
    questions: [
      { q: "What does BL store in the Link Register?", a: "BL stores the address of the instruction immediately after the BL instruction itself (PC+4 relative to BL). This is the return address — where execution should continue after the subroutine finishes." },
    ],
  },
  "arm-modes": {
    title: "ARM Processor Modes", emoji: "🔐",
    tldr: "7 modes: User, FIQ, IRQ, Supervisor, Abort, Undefined, System. Each privileged mode has banked R13, R14, SPSR. FIQ also banks R8-R12.",
    explanation: `ARM has 7 operating modes. Each mode has its own banked (private) copies of certain registers to allow fast mode switching without saving/restoring registers.

User mode: normal program execution. All other modes are privileged.

FIQ (Fast Interrupt Request): fastest interrupt response. Banks R8–R12, R13, R14, SPSR. Banking R8–R12 means the interrupt handler can use these without saving them first — maximum speed.

IRQ: normal interrupt. Banks R13, R14, SPSR only.

Supervisor (SVC): entered when software executes SWI instruction. OS system calls. Banks R13, R14, SPSR.

Abort: entered on memory access failures (bad address, protection violation). Banks R13, R14, SPSR.

Undefined: entered on unknown/undefined instructions. Banks R13, R14, SPSR.

System: privileged mode that shares the User mode register set (no banked registers). Used for OS tasks that need privilege but don't need separate registers.`,
    keyPoints: [
      "7 modes: User, FIQ, IRQ, Supervisor(SVC), Abort, Undefined, System",
      "Each privileged mode (except System) has banked R13, R14, SPSR",
      "FIQ also banks R8–R12 (for fastest interrupt handler — no register saves needed)",
      "System mode: privileged but uses User registers (no banking)",
      "Mode bits in CPSR: User=10000, FIQ=10001, IRQ=10010, SVC=10011",
      "SVC mode: entered via SWI instruction",
      "Abort: memory access failure (bad address or protection violation)",
      "Undefined: unknown instruction encountered",
    ],
    formula: {
      code: `Mode bits in CPSR [4:0]:
  10000 = User
  10001 = FIQ
  10010 = IRQ
  10011 = Supervisor (SVC)
  10111 = Abort
  11011 = Undefined
  11111 = System

Banked registers per mode:
  User/System │ R0–R15 (no banking)
  IRQ         │ R13_irq, R14_irq, SPSR_irq
  SVC         │ R13_svc, R14_svc, SPSR_svc
  Abort       │ R13_abt, R14_abt, SPSR_abt
  Undefined   │ R13_und, R14_und, SPSR_und
  FIQ         │ R8–R12 + R13_fiq, R14_fiq, SPSR_fiq  ← most banking`,
      explanation: "FIQ banks R8-R12 so the handler can execute without any register saves — fastest possible response.",
    },
    examTips: [
      "FIQ banks R8–R12 in addition to R13, R14, SPSR — this is what makes it FAST",
      "SVC mode entered via SWI instruction",
      "System mode = privileged but NO banked registers (shares User registers)",
      "SPSR = Saved Program Status Register — saves CPSR when mode switches",
    ],
    questions: [
      { q: "Why does FIQ bank R8-R12 in addition to R13 and R14?", a: "Banking R8-R12 means the FIQ handler can use these registers without first saving them to memory. The handler can start executing immediately without any save operations — giving the fastest possible interrupt response time." },
    ],
  },
  "arm-cpsr": {
    title: "CPSR & SPSR (Status Registers)", emoji: "🚦",
    tldr: "CPSR = 4 fields: Flags(N,Z,C,V), Status, Extension, Control(I,F,T,mode). SPSR saves CPSR on mode switch.",
    explanation: `CPSR = Current Program Status Register. Contains condition flags, interrupt enables, instruction state, and mode bits.

CPSR is divided into 4 × 8-bit fields:
- [31:24] Flags (f): N, Z, C, V condition flags
- [23:16] Status (s): Reserved
- [15:8] Extension (x): Reserved
- [7:0] Control (c): I, F, T bits + mode bits

Condition Flags [31:28]: N (Negative — result is negative), Z (Zero — result is zero), C (Carry — carry-out from shift or arithmetic), V (Overflow — overflow into sign bit).

Control bits: I=1 disables IRQ, F=1 disables FIQ, T=0 means ARM state (32-bit instructions), T=1 means Thumb state (16-bit instructions).

SPSR = Saved Program Status Register. Each privileged mode has one. When switching modes, CPSR is automatically saved to the new mode's SPSR. Returning restores SPSR back to CPSR.`,
    keyPoints: [
      "CPSR [31:24] = Flags field: N, Z, C, V",
      "N = Negative (result is negative)",
      "Z = Zero (result is zero)",
      "C = Carry (arithmetic carry-out or shift carry)",
      "V = Overflow (overflow into sign bit)",
      "CPSR [7:0] = Control: I, F, T bits + mode bits [4:0]",
      "I=1 → IRQ disabled; F=1 → FIQ disabled",
      "T=0 → ARM state (32-bit); T=1 → Thumb state (16-bit)",
      "SPSR: saves CPSR when switching modes; restored on return",
      "MOVS PC, LR restores SPSR → CPSR (return from exception)",
    ],
    formula: {
      code: `CPSR bit layout:
  [31][30][29][28][27:8 reserved][7][6][5][4:0]
   N   Z   C   V                  I  F  T  mode

Flags:
  N = 1 if result negative (bit 31 of result = 1)
  Z = 1 if result = 0
  C = 1 if carry out (add) or borrow not needed (sub) or shift carry
  V = 1 if signed overflow

Interrupt control:
  I = 1 → IRQ disabled (masked)
  F = 1 → FIQ disabled (masked)

State bit:
  T = 0 → ARM state (32-bit instructions)
  T = 1 → Thumb state (16-bit instructions)

Safe CPSR modification:
  MRS R0, CPSR       ; read CPSR
  ORR R0, R0, #0x80  ; set I bit (disable IRQ)
  MSR CPSR_c, R0     ; write back control field`,
      explanation: "Can't write CPSR directly — must use MRS (read) then MSR (write).",
    },
    examTips: [
      "N, Z, C, V — know what each flag means and when it's set",
      "C flag = carry out for ADD, borrow NOT needed for SUB, last bit shifted out for shifts",
      "T bit: 0=ARM (32-bit), 1=Thumb (16-bit) — BX changes this bit",
      "SPSR purpose: preserve CPSR when entering exception/interrupt mode",
    ],
    questions: [
      { q: "What does the C (Carry) flag represent in different contexts?", a: "For addition: carry out from bit 31. For subtraction: borrow NOT needed (i.e., result is ≥ 0 unsigned). For shifts: the last bit shifted out of the register. Different operations set C differently." },
      { q: "How do you safely modify the CPSR?", a: "Use the MRS-ORR-MSR pattern: 1. MRS R0, CPSR (read CPSR into register), 2. Modify R0 with ORR/BIC/AND, 3. MSR CPSR_c, R0 (write back the control field). Cannot write CPSR directly." },
    ],
  },
  "arm-memory": {
    title: "ARM Memory & Thumb State", emoji: "💾",
    tldr: "Supports Little-Endian and Big-Endian. Data types: byte(8), halfword(16, 2-byte aligned), word(32, 4-byte aligned). Thumb: 16-bit subset, ~65% code density.",
    explanation: `ARM supports both Little-Endian and Big-Endian byte ordering, configurable at boot or compile time.

Supported data types: 8-bit signed/unsigned bytes (LDRB/STRB), 16-bit signed/unsigned half-words — must be aligned on 2-byte boundaries (LDRH/STRH), 32-bit signed/unsigned words — must be aligned on 4-byte boundaries (LDR/STR).

Thumb State: Thumb is a 16-bit instruction subset of the ARM architecture, optimized for code density. Thumb code is approximately 65% of the size of equivalent ARM code. This makes it useful when memory bus width is narrow (8-bit or 16-bit bus) or memory is limited.

Thumb constraints: Only R0–R7 are freely accessible (high registers R8–R15 have restricted access), limited immediate constants, no inline barrel shifter operations.

Switch between ARM and Thumb: use the BX instruction, which sets the T bit in CPSR based on the LSB of the branch address.`,
    keyPoints: [
      "Supports both Little-Endian and Big-Endian",
      "Byte (8-bit): LDRB/STRB — no alignment requirement",
      "Half-word (16-bit): LDRH/STRH — must be 2-byte aligned",
      "Word (32-bit): LDR/STR — must be 4-byte aligned",
      "Thumb: 16-bit instruction subset of ARM",
      "Thumb code density: ~65% of equivalent ARM code size",
      "Thumb limits: only R0–R7 freely accessible, limited constants, no barrel shifter inline",
      "BX instruction switches between ARM and Thumb state (T bit in CPSR)",
    ],
    formula: {
      code: `Data Type Alignment Requirements:
  Type      │ Size  │ Alignment   │ Instruction
  ──────────┼───────┼─────────────┼────────────
  Byte      │ 8-bit │ Any address │ LDRB, STRB
  Half-word │ 16-bit│ Multiple of 2│ LDRH, STRH
  Word      │ 32-bit│ Multiple of 4│ LDR,  STR

Thumb vs ARM:
  ADD R0, R1, R2    ; ARM: 32-bit instruction  = 4 bytes
  ADD R0, R1        ; Thumb: 16-bit instruction = 2 bytes
  
  ARM code:   100 bytes → Thumb equivalent: ~65 bytes
  
BX Rm:
  if Rm[0] == 1: switch to Thumb (T=1), branch to Rm & ~1
  if Rm[0] == 0: stay/switch to ARM (T=0), branch to Rm`,
      explanation: "Thumb = better code density at cost of instruction flexibility.",
    },
    examTips: [
      "Half-word = 2-byte aligned; Word = 4-byte aligned — alignment matters!",
      "Thumb ~65% code density of ARM — useful for narrow memory buses",
      "Thumb: only R0-R7 directly accessible (unlike ARM's R0-R15)",
      "BX Rm: if Rm bit 0 = 1 → Thumb mode; if 0 → ARM mode",
    ],
    questions: [
      { q: "What are the constraints of Thumb state compared to ARM state?", a: "1. Only R0-R7 directly accessible (R8-R15 have restricted access), 2. Limited immediate constant ranges, 3. No inline barrel shifter operations. Trade-off: ~65% code size savings for these restrictions." },
    ],
  },
  "instruction-format": {
    title: "ARM Instruction Format", emoji: "📐",
    tldr: "MNEMONIC{cond}{S} Rd, Rn, Op2. Condition suffix on every instruction. S updates flags. Op2 is flexible.",
    explanation: `Every ARM instruction follows the general format: MNEMONIC{condition}{S} Rd, Operand1, Operand2.

MNEMONIC: instruction name (MOV, ADD, SUB, etc.)
{condition}: optional 2-letter condition code (EQ, NE, GT, etc.) — makes the instruction conditional
{S}: if present, the instruction updates the CPSR condition flags after execution
Rd: destination register (where result goes)
Operand1 (Rn): first source register
Operand2: second operand — flexible, can be a register, a register with shift, or an 8-bit immediate rotated

Operand2 flexibility: immediate values must be an 8-bit value that can be produced by rotating any 8-bit pattern by an even number of bits within a 32-bit field. Not all 32-bit constants can be encoded as immediates.`,
    keyPoints: [
      "Format: MNEMONIC{cond}{S} Rd, Rn, Op2",
      "MNEMONIC: instruction name (MOV, ADD, CMP, etc.)",
      "{condition}: optional 2-letter suffix makes instruction conditional",
      "{S}: optional — if present, updates CPSR N, Z, C, V flags",
      "Rd: destination register",
      "Rn: first source register (Operand1)",
      "Op2: flexible — register, shifted register, or 8-bit immediate rotated",
      "Immediate constraint: 8-bit value rotated by even amount in 32-bit field",
    ],
    formula: {
      code: `General format:
  MNEMONIC{cond}{S}  Rd,  Rn,  Op2
  
  Examples:
  ADD   R0, R1, R2          ; R0 = R1 + R2 (no flags update)
  ADDS  R0, R1, R2          ; R0 = R1 + R2 (updates N,Z,C,V)
  ADDEQ R0, R1, R2          ; R0 = R1+R2 only if Z flag = 1
  ADDEQS R0, R1, R2         ; conditional + flag update
  
Op2 forms:
  ADD R0, R1, R2            ; Op2 = register
  ADD R0, R1, R2, LSL #2    ; Op2 = R2 shifted left 2
  ADD R0, R1, #16           ; Op2 = immediate #16
  ADD R0, R1, R2, LSL R3    ; Op2 = R2 shifted by R3`,
      explanation: "S and condition can be combined: ADDEQS means 'if Equal, add and set flags'.",
    },
    examTips: [
      "S suffix → updates flags. No S → flags unchanged (even after arithmetic)",
      "CMP/CMN/TST/TEQ always update flags — implicit S bit always 1",
      "Op2 immediate: 8-bit value rotated right by even amount — not all values fit!",
    ],
    questions: [
      { q: "What does the S suffix do in an ARM instruction like ADDS?", a: "The S suffix causes the instruction to update the CPSR condition flags (N, Z, C, V) based on the result. Without S, the flags are not changed — even if you do arithmetic. CMP/CMN/TST/TEQ always set flags regardless." },
    ],
  },
  "arm-key-features": {
    title: "Key Features of ARM Instructions ⚠️", emoji: "⭐",
    tldr: "All 32-bit wide. Load-store arch. 3-address format. EVERY instruction conditionally executable. LDM/STM. Barrel shifter+ALU in one cycle.",
    explanation: `Six key features of ARM instructions — PYQ favourite.

1. All instructions are 32 bits wide: fixed length enables fast decode and pipelining.

2. Load-store architecture: no memory-to-memory operations. Data must be loaded into registers before processing, then stored back.

3. 3-address data processing: two sources and one destination all independently specified (unlike CISC where one source doubles as destination).

4. Conditional execution of EVERY instruction: any instruction can have a 2-letter condition code appended, making it execute only when that condition is true. Eliminates many short branches.

5. Powerful LDM/STM: Load Multiple and Store Multiple can transfer up to 16 registers to/from memory in a single instruction.

6. Barrel Shifter + ALU in one instruction, one cycle: an operand can be shifted by any amount while simultaneously being used in an ALU operation — no extra instruction or cycle needed.`,
    keyPoints: [
      "1. ALL instructions 32 bits wide (fixed-length → fast pipeline decode)",
      "2. Load-store: no memory operands in arithmetic — must LDR first",
      "3. 3-address: Rd, Rn, Op2 all independent (not CISC's 2-address)",
      "4. Every instruction conditionally executable (unique to ARM!)",
      "5. LDM/STM: up to 16 registers in one instruction",
      "6. Barrel Shifter + ALU: shift + arithmetic in ONE instruction, ONE cycle",
    ],
    formula: {
      code: `Feature 4 — Conditional execution example:
  ; if (R0 != 5) { R1 = R1 + R0 - R2; }
  CMP  R0, #5      ; flags = R0 - 5
  ADDNE R1, R1, R0 ; if NE: R1 = R1 + R0
  SUBNE R1, R1, R2 ; if NE: R1 = R1 - R2
  ; (2 conditional instructions instead of a branch)

Feature 6 — Barrel shifter in ALU instruction:
  ADD R0, R1, R2, LSL #3  ; R0 = R1 + (R2 × 8) — ONE cycle!
  ; Compare without barrel shifter (2 instructions):
  MOV R3, R2, LSL #3       ; R3 = R2 × 8
  ADD R0, R1, R3           ; R0 = R1 + R3`,
      explanation: "Feature 4 and 6 are the most ARM-unique features not found in other RISC designs.",
    },
    examTips: [
      "⚡ PYQ FAVOURITE: List 6 key features of ARM instruction set",
      "Conditional execution of EVERY instruction is ARM's most unique feature",
      "Barrel shifter + ALU in ONE cycle (not two) — key efficiency gain",
      "LDM/STM: transfer multiple registers in one instruction (efficient block moves)",
    ],
    questions: [
      { q: "Name all 6 key features of the ARM instruction set.", a: "1. All instructions 32-bit wide, 2. Load-store architecture, 3. 3-address data processing format, 4. Conditional execution of every instruction, 5. Powerful LDM/STM for block transfers, 6. Barrel shifter + ALU operation in one instruction/cycle." },
    ],
  },
  "assembly-directives": {
    title: "Assembly Directives", emoji: "🏷️",
    tldr: ".text (code), .data (variables), .WORD/.HWORD/.BYTE, .SPACE, .ASCIZ, .EQU, .END",
    explanation: `Assembly directives are assembler commands that control how the assembler processes the program. They are NOT ARM instructions — they don't generate machine code directly.

Program structure: .text section contains executable instructions. .data section contains variable declarations and initialized data.

Data allocation: .WORD reserves 4 bytes, .HWORD reserves 2 bytes, .BYTE reserves 1 byte, .SPACE n reserves n uninitialized bytes.

String: .ASCIZ creates a null-terminated ASCII string (automatically appends \\0).

Constant definition: .EQU name, value defines a compile-time constant (like #define in C).`,
    keyPoints: [
      ".text → start of code section (executable instructions)",
      ".data → start of data section (variables and constants)",
      ".WORD n → reserve 4 bytes, initialize to n",
      ".HWORD n → reserve 2 bytes, initialize to n",
      ".BYTE n → reserve 1 byte, initialize to n",
      ".SPACE n → reserve n bytes, uninitialized",
      ".ASCIZ \"str\" → null-terminated ASCII string (auto appends \\0)",
      ".EQU name, val → define a constant (like C's #define)",
      ".END → end of program",
    ],
    formula: {
      code: `Program structure template:
  .DATA
  A:    .WORD   42, 10, 30    ; 3 words (12 bytes)
  MSG:  .ASCIZ  "Hello"       ; 6 bytes (5 + null)
  BUF:  .SPACE  20            ; 20 bytes uninitialized
  
  .EQU MAX_SIZE, 100          ; constant (no memory allocated)
  
  .TEXT
  LDR R0, =A       ; load address of A into R0
  LDR R1, [R0]     ; R1 = A[0] = 42
  LDR R2, =MSG     ; load address of MSG

.WORD example with multiple values:
  ARR: .WORD 10, 20, 30, 40, 50
  ; ARR[0]=10 at base addr, ARR[1]=20 at base+4, etc.`,
      explanation: ".WORD reserves 4 bytes. An array of 5 words = 5 × 4 = 20 bytes total.",
    },
    examTips: [
      ".WORD = 4 bytes, .HWORD = 2 bytes, .BYTE = 1 byte",
      ".ASCIZ automatically adds null terminator — .ASCII does NOT",
      "LDR R0, =LABEL loads the address of LABEL (pseudo-instruction)",
      ".EQU creates a constant — no memory allocated, just a name for a value",
    ],
    questions: [
      { q: "How many bytes does .ASCIZ \"PES\" allocate?", a: "4 bytes. The string has 3 characters (P, E, S) plus the automatic null terminator (\\0) = 4 bytes total." },
    ],
  },
  "mov-mvn": {
    title: "MOV / MVN Instructions", emoji: "📥",
    tldr: "MOV: Rd = Op2. MVN: Rd = NOT(Op2) (bitwise complement). MVN useful for loading 0xFFFFFFFF.",
    explanation: `MOV copies a value into a destination register. The value can be a register, a shifted register, or an immediate.

MVN (Move Negative/Not) loads the bitwise complement (NOT) of Op2 into Rd.

MVN is particularly useful for loading the value 0xFFFFFFFF (all ones) which cannot be expressed as a valid immediate in MOV (an 8-bit rotated immediate can't make 0xFFFFFFFF). MVN R0, #0 loads NOT(0) = 0xFFFFFFFF.

Both MOV and MVN use the one-register format: only one source operand (no Rn field — bits [19:16] are ignored/zero).`,
    keyPoints: [
      "MOV Rd, Op2 → Rd = Op2",
      "MVN Rd, Op2 → Rd = NOT(Op2) (bitwise complement, all bits flipped)",
      "MVN R0, #0 → R0 = 0xFFFFFFFF (most common use)",
      "Useful: load constants that MOV can't encode as immediate",
      "Both have no Rn field (Rn bits ignored)",
      "Can use with S bit: MOVS Rd, Op2 updates N and Z flags",
    ],
    formula: {
      code: `MOV:
  MOV R0, #5          ; R0 = 5
  MOV R0, R1          ; R0 = R1
  MOV R0, R1, LSL #2  ; R0 = R1 × 4
  MOVS R0, R1         ; R0 = R1, update N and Z flags

MVN:
  MVN R0, #0          ; R0 = NOT(0) = 0xFFFFFFFF
  MVN R0, R1          ; R0 = NOT(R1) — all bits flipped
  MVN R0, #0xFF       ; R0 = NOT(0xFF) = 0xFFFFFF00

Common use case:
  ; Can't do: MOV R0, #0xFFFFFFFF (not encodable as immediate)
  ; Solution:
  MVN R0, #0           ; R0 = 0xFFFFFFFF ✓`,
      explanation: "MVN is how you load the -1 / all-ones constant when MOV with immediate won't fit.",
    },
    examTips: [
      "MVN = bitwise NOT of operand (all bits flipped)",
      "MVN R0, #0 = 0xFFFFFFFF — PYQ exam uses this for multiply 0xFFFFFFFF by itself",
      "Neither MOV nor MVN has an Rn (no first source register)",
    ],
    questions: [
      { q: "Why use MVN R0, #0 instead of MOV R0, #0xFFFFFFFF?", a: "ARM immediates are 8-bit values rotated right by an even amount. 0xFFFFFFFF cannot be expressed this way. MVN R0, #0 gives NOT(0) = 0xFFFFFFFF and is valid since #0 is a valid immediate." },
    ],
  },
  "arithmetic": {
    title: "Arithmetic Instructions", emoji: "➕",
    tldr: "ADD, ADC(+carry), SUB, SBC(-carry), RSB(reverse sub), RSC. 64-bit: ADDS then ADC.",
    explanation: `ARM provides a complete set of arithmetic instructions for both normal and carry-propagating operations.

ADD: basic addition. ADC: add with carry (adds the C flag too — used for multi-word addition). SUB: subtraction. SBC: subtract with carry (Rd = Rn - Op2 + C - 1 — used for multi-word subtraction). RSB: Reverse Subtract — subtracts Rn FROM Op2 (not Op2 from Rn). RSC: Reverse Subtract with Carry.

64-bit addition technique: use ADDS for the lower 32 bits (sets Carry flag if there's overflow), then ADC for the upper 32 bits (automatically adds the carry).`,
    keyPoints: [
      "ADD Rd, Rn, Op2 → Rd = Rn + Op2",
      "ADC Rd, Rn, Op2 → Rd = Rn + Op2 + C (carry flag)",
      "SUB Rd, Rn, Op2 → Rd = Rn - Op2",
      "SBC Rd, Rn, Op2 → Rd = Rn - Op2 + C - 1",
      "RSB Rd, Rn, Op2 → Rd = Op2 - Rn (Reverse Subtract)",
      "RSC Rd, Rn, Op2 → Rd = Op2 - Rn + C - 1",
      "64-bit addition: ADDS lower → ADC upper (carry propagation)",
    ],
    formula: {
      code: `64-bit addition ([R3:R2] + [R1:R0] → [R3:R2]):
  ADDS R2, R2, R0    ; lower 32 bits — S bit sets Carry if overflow
  ADC  R3, R3, R1    ; upper 32 bits — automatically adds the Carry

RSB example (negate a register):
  RSB R0, R0, #0     ; R0 = 0 - R0 = -R0 (two's complement negate)

Arithmetic instruction table:
  ADD  Rd, Rn, Op2  │ Rd = Rn + Op2
  ADC  Rd, Rn, Op2  │ Rd = Rn + Op2 + C
  SUB  Rd, Rn, Op2  │ Rd = Rn − Op2
  SBC  Rd, Rn, Op2  │ Rd = Rn − Op2 + C − 1
  RSB  Rd, Rn, Op2  │ Rd = Op2 − Rn
  RSC  Rd, Rn, Op2  │ Rd = Op2 − Rn + C − 1`,
      explanation: "RSB R0, R0, #0 negates R0 — classic ARM trick since NEG doesn't exist.",
    },
    examTips: [
      "ADC adds carry — always use ADDS first, then ADC for 64-bit addition",
      "RSB = Reverse Subtract. RSB R0, R1, #10 → R0 = 10 - R1",
      "SBC: Rd = Rn - Op2 + C - 1 (the -1 accounts for borrow convention)",
    ],
    questions: [
      { q: "How do you add two 64-bit numbers stored in register pairs R1:R0 and R3:R2, putting the result in R3:R2?", a: "ADDS R2, R2, R0 (add lower 32 bits, S bit sets Carry on overflow), then ADC R3, R3, R1 (add upper 32 bits plus carry from lower). The S in ADDS is essential — it updates the C flag." },
    ],
  },
  "comparison": {
    title: "Comparison Instructions", emoji: "🔍",
    tldr: "CMP, CMN, TST, TEQ — update flags only, no result stored. Always have implicit S bit.",
    explanation: `Comparison instructions set the CPSR condition flags but do NOT write any result to a register. They always behave as if the S bit is set.

CMP (Compare): performs subtraction (Rn - Op2) and sets flags. No result written.
CMN (Compare Negated): performs addition (Rn + Op2) and sets flags. Useful for comparing with negative values.
TST (Test bits): performs AND and sets flags. Used to test if specific bits are set.
TEQ (Test Equivalence): performs XOR and sets flags. Z=1 if operands are equal (like CMP but sets only Z without changing C).

These are typically used just before a conditional branch or conditional instruction.`,
    keyPoints: [
      "CMP, CMN, TST, TEQ all update flags — NO result written to register",
      "CMP Rn, Op2 → flags = Rn - Op2",
      "CMN Rn, Op2 → flags = Rn + Op2 (compare negated — tests against negative value)",
      "TST Rn, Op2 → flags = Rn AND Op2 (bit test)",
      "TEQ Rn, Op2 → flags = Rn XOR Op2 (equality test)",
      "All comparison instructions have implicit S=1 always",
    ],
    formula: {
      code: `CMP R0, #5      ; sets Z if R0==5, N if R0<5, C if R0>=5 (unsigned)
CMN R0, R1      ; sets flags based on R0+R1 (test if R0 == -R1)
TST R0, #0xF0   ; sets Z if upper nibble of R0 is 0
TEQ R0, R1      ; sets Z if R0 == R1 (like CMP but Z-only semantics)

Typical usage:
  CMP  R0, #10
  BGT  greater_label   ; branch if R0 > 10
  
  TST  R5, #1          ; test bit 0
  BNE  odd_number      ; branch if bit 0 was set (odd)

CMPEQ chain:
  CMP   R0, R1         ; compare R0 with R1
  CMPEQ R2, R3         ; if R0==R1, also compare R2 with R3
  ; Z=1 only if BOTH comparisons showed equal`,
      explanation: "CMPEQ chaining: second CMP only executes if first comparison was equal. Implements && logic.",
    },
    examTips: [
      "TST = bit test. TST R0, #1 checks if bit 0 is set (result in Z flag: Z=0 means bit was set)",
      "CMP sets C flag differently from subtract — C=1 if borrow NOT needed (Rn >= Op2 unsigned)",
      "CMPEQ chaining is efficient && implementation without extra branches",
    ],
    questions: [
      { q: "What is the difference between CMP and TEQ?", a: "CMP performs subtraction and sets N, Z, C, V. TEQ performs XOR and sets N, Z (not C and V as usefully). TEQ is specifically for testing equality — if Z=1 after TEQ, the operands are bitwise equal. TEQ is cleaner when you only care about equality." },
    ],
  },
  "logical": {
    title: "Logical Instructions", emoji: "🔢",
    tldr: "AND, ORR, EOR, BIC (bit clear = AND NOT). Used for masking, setting, clearing, and toggling bits.",
    explanation: `ARM provides four logical operations: AND, OR, XOR, and BIC (Bit Clear).

AND: bitwise AND — used for masking (clearing specific bits, extracting bit fields).
ORR: bitwise OR — used for setting specific bits.
EOR: bitwise XOR (Exclusive OR) — used for toggling bits, comparing bits.
BIC (Bit Clear): Rd = Rn AND (NOT Op2) — clears bits in Rn wherever Op2 has a 1. Equivalent to AND with complement, but cleaner.

Common patterns: mask out lower 4 bits (AND R0, R0, #0xFFFFFFF0), set bit 3 (ORR R0, R0, #0x8), toggle bit 5 (EOR R0, R0, #0x20), clear bit 7 (BIC R0, R0, #0x80).`,
    keyPoints: [
      "AND Rd, Rn, Op2 → Rd = Rn AND Op2 (bit masking / clearing)",
      "ORR Rd, Rn, Op2 → Rd = Rn OR Op2 (bit setting)",
      "EOR Rd, Rn, Op2 → Rd = Rn XOR Op2 (bit toggling)",
      "BIC Rd, Rn, Op2 → Rd = Rn AND (NOT Op2) (bit clear)",
      "AND: mask = keep bits where mask=1, clear where mask=0",
      "ORR: set bits where mask=1, leave others unchanged",
      "EOR: toggle bits where mask=1, leave others unchanged",
      "BIC: clear bits where mask=1, leave others unchanged",
    ],
    formula: {
      code: `AND  R0, R1, R2   ; R0 = R1 AND R2
ORR  R0, R1, R2   ; R0 = R1 OR  R2
EOR  R0, R1, R2   ; R0 = R1 XOR R2
BIC  R0, R1, R2   ; R0 = R1 AND (NOT R2) — bit clear

Practical examples:
  AND R0, R0, #0x0F     ; keep lower 4 bits (mask upper 4)
  ORR R0, R0, #0x80     ; set bit 7
  EOR R0, R0, #0xFF     ; toggle all 8 bits (= MVN for byte)
  BIC R0, R0, #0x80     ; clear bit 7
  
Hex to ASCII (extract nibble):
  AND R0, R1, #0xF0     ; isolate upper nibble
  MOV R0, R0, LSR #4    ; shift right 4
  ORR R0, R0, #0x30     ; add 0x30 → ASCII digit`,
      explanation: "BIC R0, R1, #mask = clear specific bits. ORR R0, R1, #mask = set specific bits.",
    },
    examTips: [
      "BIC = AND with NOT of mask. BIC R0, R0, #0x80 clears bit 7",
      "ORR sets bits; BIC clears bits; EOR toggles bits",
      "AND for extracting fields: AND R0, R1, #0x0F gives lower nibble",
    ],
    questions: [
      { q: "How do you clear bit 5 of R0 without affecting other bits?", a: "BIC R0, R0, #0x20. This computes R0 AND (NOT 0x20) = R0 AND 0xFFFFFFDF, which clears bit 5 and leaves all other bits unchanged." },
    ],
  },
  "opcode-table": {
    title: "Opcode Table (Encoding Reference)", emoji: "📊",
    tldr: "Opcode bits [24:21] in instruction encoding. AND=0000, ADD=0100, MOV=1101, MVN=1111, CMP=1010, etc.",
    explanation: `Each ARM data processing instruction has a 4-bit opcode in bits [24:21] of the instruction word. Knowing these is essential for instruction encoding problems in exams.

The opcodes define what the ALU does. Instructions like CMP, CMN, TST, TEQ have the S bit forced to 1 (they always update flags). Instructions like MOV and MVN have no Rn field (it's ignored or zero).`,
    keyPoints: [
      "Opcode field: bits [24:21] of instruction encoding",
      "AND=0000, EOR=0001, SUB=0010, RSB=0011",
      "ADD=0100, ADC=0101, SBC=0110, RSC=0111",
      "TST=1000 (S always 1), TEQ=1001 (S always 1)",
      "CMP=1010 (S always 1), CMN=1011 (S always 1)",
      "ORR=1100, MOV=1101, BIC=1110, MVN=1111",
    ],
    formula: {
      code: `Opcode [24:21]:
  0000 = AND    0001 = EOR    0010 = SUB    0011 = RSB
  0100 = ADD    0101 = ADC    0110 = SBC    0111 = RSC
  1000 = TST*   1001 = TEQ*   1010 = CMP*   1011 = CMN*
  1100 = ORR    1101 = MOV    1110 = BIC    1111 = MVN
  
  (* S bit forced = 1 for TST, TEQ, CMP, CMN)
  
Memory aid: arithmetic in order SUB=0010, then ADD=0100
  AND=0000 → EOR=0001 → SUB=0010 → RSB=0011
  ADD=0100 → ADC=0101 → SBC=0110 → RSC=0111
  TST=1000 → TEQ=1001 → CMP=1010 → CMN=1011
  ORR=1100 → MOV=1101 → BIC=1110 → MVN=1111`,
      explanation: "CMP, CMN, TST, TEQ have S=1 forced because they only exist to update flags.",
    },
    examTips: [
      "MOV opcode = 1101. MVN opcode = 1111. ADD opcode = 0100.",
      "CMP = 1010, CMN = 1011 — both always force S=1",
      "For encoding problems: look up opcode from this table",
    ],
    questions: [
      { q: "What is the binary opcode for the ADD instruction?", a: "0100 (decimal 4). Bits [24:21] of the data processing instruction encoding." },
    ],
  },
  "barrel-shifter": {
    title: "The Barrel Shifter", emoji: "🌀",
    tldr: "Shifts one operand BEFORE the ALU — shift + ALU = one cycle. 32×32 crossbar. LSL, LSR, ASR, ROR, RRX.",
    explanation: `The barrel shifter is a key hardware component that sits between the register bank and the ALU. It can shift or rotate any operand by any number of bits in a single clock cycle, using a 32×32 cross-bar switch matrix.

The result of the shift feeds directly into the ALU — so a shift + arithmetic operation happens as one instruction in one cycle.

Five shift types: LSL (Logical Shift Left — fills zeros from right, equivalent to multiplication by 2^n), LSR (Logical Shift Right — fills zeros from left), ASR (Arithmetic Shift Right — preserves the sign bit by replicating MSB — for signed division), ROR (Rotate Right — bits that fall off the right appear on the left), RRX (Rotate Right Extended — 33-bit rotate through the Carry flag, shifts in C at MSB, last bit becomes new C).`,
    keyPoints: [
      "Barrel shifter: between register bank and ALU — shift is free (no extra cycle)",
      "Implemented as 32×32 cross-bar switch matrix",
      "LSL #n: shift left, fill 0s from right → multiply by 2^n",
      "LSR #n: shift right, fill 0s from left (logical, for unsigned)",
      "ASR #n: arithmetic shift right, replicate MSB (sign-preserving, signed division)",
      "ROR #n: rotate right, bits wrap from right to left",
      "RRX: rotate right 1 bit through Carry (33-bit rotate)",
      "Shift amount can be immediate (#n) or register (Rx)",
    ],
    formula: {
      code: `Five shift types:
  LSL #n   : ← shift left  by n, fill 0s        : ×2^n
  LSR #n   : → shift right by n, fill 0s        : unsigned ÷2^n
  ASR #n   : → shift right by n, MSB replicated : signed ÷2^n
  ROR #n   : → rotate right, bits wrap left     : rotation
  RRX      : → rotate right 1 through Carry     : 33-bit rotate

Examples:
  MOV R0, R2, LSL #2       ; R0 = R2 × 4
  ADD R0, R1, R2, LSL #3   ; R0 = R1 + R2 × 8  (1 cycle!)
  ADD R0, R1, R2, LSL R3   ; R0 = R1 + R2 × 2^R3 (register shift)
  MOV R0, R0, ASR #1       ; R0 = R0 / 2 (signed, preserves sign)

RRX (33-bit rotate through carry):
  [C] → [bit31←bit30←...←bit1←bit0] → [new C = old bit0]`,
      explanation: "ASR preserves sign bit — use for signed right-shift. LSR fills zeros — use for unsigned.",
    },
    examTips: [
      "ASR preserves sign bit (MSB replicated). Use for signed division by 2^n.",
      "RRX: 33-bit rotation through carry — shifts C into MSB, bit 0 out to C",
      "Barrel shifter is FREE — adding a shift to an instruction costs ZERO extra cycles",
    ],
    questions: [
      { q: "What is the difference between LSR and ASR?", a: "LSR (Logical Shift Right): fills 0s from the MSB side — for unsigned numbers. ASR (Arithmetic Shift Right): replicates the MSB (sign bit) — for signed numbers, preserving the sign. -8 ASR #1 = -4 (correct division). -8 LSR #1 = large positive number (wrong for signed)." },
    ],
  },
  "fast-multiply": {
    title: "Fast Multiplication via Barrel Shifter", emoji: "✖️",
    tldr: "Multiply by 2^n: LSL. By 2^n+1: ADD Ra,Ra,Ra,LSL#n. By 2^n-1: RSB Ra,Ra,Ra,LSL#n.",
    explanation: `The barrel shifter enables fast multiplication by constants that can be expressed as powers of 2 or sums/differences of powers of 2 — all without using the MUL instruction (which takes 2-5 cycles).

Multiply by 2^n: use LSL (one instruction).
Multiply by 2^n + 1 (e.g., ×3, ×5, ×9): ADD Ra, Rb, Rb, LSL #n → Rb + Rb×2^n = Rb×(2^n+1).
Multiply by 2^n - 1 (e.g., ×3, ×7, ×15): RSB Ra, Rb, Rb, LSL #n → Rb×2^n - Rb = Rb×(2^n-1).
Compound: multiply by 35 (= 5 × 7) by applying two shifts.`,
    keyPoints: [
      "×2^n: MOV Ra, Rb, LSL #n (single shift)",
      "×(2^n+1): ADD Ra, Rb, Rb, LSL #n → Rb×2^n + Rb",
      "×(2^n−1): RSB Ra, Rb, Rb, LSL #n → Rb×2^n − Rb",
      "×3 = ADD Ra, Ra, Ra, LSL #1 (Ra + Ra×2 = 3Ra)",
      "×5 = ADD Ra, Ra, Ra, LSL #2 (Ra + Ra×4 = 5Ra)",
      "×7 = RSB Ra, Ra, Ra, LSL #3 (Ra×8 − Ra = 7Ra)",
      "×35 = ×5 then ×7 (two barrel shifter operations)",
    ],
    formula: {
      code: `Multiply by constant examples:
  × 2    : MOV R0, R0, LSL #1         ; R0 × 2
  × 4    : MOV R0, R0, LSL #2         ; R0 × 4
  × 3    : ADD R0, R0, R0, LSL #1     ; R0 + R0×2 = 3R0
  × 5    : ADD R0, R0, R0, LSL #2     ; R0 + R0×4 = 5R0
  × 9    : ADD R0, R0, R0, LSL #3     ; R0 + R0×8 = 9R0
  × 7    : RSB R0, R0, R0, LSL #3     ; R0×8 - R0 = 7R0
  × 15   : RSB R0, R0, R0, LSL #4     ; R0×16 - R0 = 15R0

  × 35 (= 5 × 7):
    ADD R0, R0, R0, LSL #2   ; R0 = R0×5 (step 1)
    RSB R2, R0, R0, LSL #3   ; R2 = R0×8 - R0 = R0×7 (step 2)`,
      explanation: "2^n+1 patterns use ADD; 2^n-1 patterns use RSB. Faster than MUL for fixed constants.",
    },
    examTips: [
      "×3: ADD Ra, Ra, Ra, LSL #1. ×5: ADD Ra, Ra, Ra, LSL #2. ×7: RSB Ra, Ra, Ra, LSL #3",
      "These are all single-cycle vs MUL's 2-5 cycles",
      "Only works for constants expressible as 2^n ± 1 or products thereof",
    ],
    questions: [
      { q: "Write ARM code to multiply R0 by 7 using the barrel shifter (no MUL).", a: "RSB R0, R0, R0, LSL #3. This computes R0×8 - R0 = R0×7. One instruction, one cycle." },
    ],
  },
  "branch-instructions": {
    title: "Branch Instructions", emoji: "↩️",
    tldr: "B (unconditional), BL (branch+link, LR=return addr), BX (branch+exchange ARM↔Thumb).",
    explanation: `ARM has three main branch instructions.

B (Branch): unconditional branch. PC = branch target. Range: ±32MB (24-bit signed offset × 4 bytes).

BL (Branch with Link): saves the return address in LR (R14), then branches to the target. LR = address of instruction after BL. Used for procedure/subroutine calls. The subroutine returns by MOV PC, LR or BX LR.

BX (Branch and Exchange): branches to the address in register Rm, AND switches between ARM and Thumb state based on bit 0 of Rm. If Rm[0]=1, switches to Thumb; if Rm[0]=0, stays/switches to ARM.

All branches can have condition codes appended: BEQ, BNE, BGT, BLT, etc.`,
    keyPoints: [
      "B label → unconditional branch, range ±32MB",
      "BL label → LR = return address; PC = label (subroutine call)",
      "BX Rm → PC = Rm & ~1; T bit = Rm[0] (ARM↔Thumb exchange)",
      "All branches support condition codes: BEQ, BNE, BGT, etc.",
      "BL: LR = address of instruction immediately after BL",
      "Return: MOV PC, LR or BX LR (BX also can switch state)",
      "Branch range: ±32MB from branch instruction",
    ],
    formula: {
      code: `B  label     ; unconditional branch to label
BL label     ; LR = PC+4(next instr), then PC = label
BX Rm        ; PC = Rm (with T bit from Rm[0])

With conditions:
  BEQ label   ; branch if Z=1
  BNE label   ; branch if Z=0
  BGT label   ; branch if Z=0 and N=V
  BLT label   ; branch if N≠V
  BLE label   ; branch if Z=1 or N≠V
  BCS label   ; branch if C=1 (carry set)

Procedure call/return:
  ; Caller:
  BL my_function    ; LR = address after BL
  
  ; Function entry (save LR if making nested calls)
  STMFD SP!, {R4-R7, LR}
  
  ; Function exit
  LDMFD SP!, {R4-R7, PC}  ; pops saved LR directly into PC`,
      explanation: "BL → branch to function. LDMFD with PC = pop LR into PC = return.",
    },
    examTips: [
      "BL sets LR = instruction after BL, then branches (not during — after return)",
      "BX Rm: T bit set from Rm[0] — used to switch to Thumb code",
      "For nested calls: save LR on stack before second BL (or LR gets overwritten!)",
    ],
    questions: [
      { q: "Why must LR be saved before a nested subroutine call?", a: "When BL executes, it overwrites LR with the new return address. If you're already inside a subroutine (LR already has the return address to the original caller), the inner BL destroys it. Save LR to the stack first: STMFD SP!, {LR}." },
    ],
  },
  "condition-codes": {
    title: "ARM Condition Codes", emoji: "🏁",
    tldr: "16 condition codes. EQ(Z=1), NE(Z=0), GT(Z=0,N=V), LT(N≠V), CS/HS, CC/LO, HI, LS, GE, LE, AL(1110).",
    explanation: `ARM has 16 condition codes that can be appended to any instruction. The condition is checked against the CPSR flags, and the instruction only executes if the condition is true.

The condition is encoded in bits [31:28] of every instruction. AL (Always) = 1110 is the default when no condition is written.

Signed conditions use N and V flags: GE (N=V), LT (N≠V), GT (Z=0 and N=V), LE (Z=1 or N≠V).
Unsigned conditions use C and Z flags: HI (C=1 and Z=0), LS (C=0 or Z=1), CS/HS (C=1), CC/LO (C=0).`,
    keyPoints: [
      "EQ: Z=1 (equal after CMP)", "NE: Z=0 (not equal)",
      "CS/HS: C=1 (carry set / unsigned ≥)", "CC/LO: C=0 (carry clear / unsigned <)",
      "MI: N=1 (negative)", "PL: N=0 (non-negative)",
      "VS: V=1 (overflow)", "VC: V=0 (no overflow)",
      "HI: C=1 AND Z=0 (unsigned higher)", "LS: C=0 OR Z=1 (unsigned lower or same)",
      "GE: N=V (signed ≥)", "LT: N≠V (signed <)",
      "GT: Z=0 AND N=V (signed >)", "LE: Z=1 OR N≠V (signed ≤)",
      "AL: always (default, binary 1110)", "NV: never (reserved, avoid)",
    ],
    formula: {
      code: `Suffix │ Meaning                │ Flag condition
───────┼────────────────────────┼───────────────
EQ     │ Equal                  │ Z = 1
NE     │ Not Equal              │ Z = 0
CS/HS  │ Carry Set / U. Higher  │ C = 1
CC/LO  │ Carry Clear / U. Lower │ C = 0
MI     │ Minus (negative)       │ N = 1
PL     │ Plus (non-negative)    │ N = 0
VS     │ Overflow Set           │ V = 1
VC     │ Overflow Clear         │ V = 0
HI     │ Unsigned Higher        │ C=1 AND Z=0
LS     │ Unsigned Lower/Same    │ C=0 OR Z=1
GE     │ Signed Greater/Equal   │ N = V
LT     │ Signed Less Than       │ N ≠ V
GT     │ Signed Greater Than    │ Z=0 AND N=V
LE     │ Signed Less/Equal      │ Z=1 OR N≠V
AL     │ Always (default)       │ — (binary 1110)`,
      explanation: "Signed: GE/LT/GT/LE use N and V. Unsigned: HI/LS/CS/CC use C and Z.",
    },
    examTips: [
      "AL = 1110 binary (always condition, default when no suffix written)",
      "GT: Z=0 AND N=V — 'greater than' (not equal AND N agrees with V)",
      "HI vs GT: HI = unsigned higher (C=1,Z=0). GT = signed greater than.",
      "CMP sets flags via subtraction — then choose EQ/NE/GT/LT based on need",
    ],
    questions: [
      { q: "What is the flag condition for GT (signed greater than)?", a: "Z=0 AND N=V. Z=0 means the values aren't equal. N=V means no signed overflow confused the sign — the result sign is genuine. Combined: result is positive and non-zero = Rn > Op2 signed." },
    ],
  },
  "conditional-execution": {
    title: "Conditional Execution", emoji: "🔀",
    tldr: "Every ARM instruction can be conditional. ≤3 instructions: conditional exec is faster/smaller than branching.",
    explanation: `Conditional execution is ARM's most distinctive feature. Every single instruction can be conditionally executed by appending a 2-letter condition code. The instruction only executes if the condition is true, otherwise it's treated as a NOP.

Benefit vs branching: When you need to conditionally execute 1-3 instructions, conditional execution avoids pipeline flushes from branches. Shorter code, no branch penalty.

Rule of thumb: For ≤3 instructions, use conditional execution. For longer blocks, use a branch.

The condition codes come from the CPSR flags, which were set by a previous CMP, ADDS, SUBS, TST, etc.`,
    keyPoints: [
      "EVERY ARM instruction can be conditionally executed",
      "Condition suffix: append EQ, NE, GT, LT, etc. to any instruction",
      "Instruction is NOP if condition is false (no registers modified)",
      "≤3 conditional instructions: faster and smaller than branching",
      "Eliminates branch penalty in pipeline for short conditional blocks",
    ],
    formula: {
      code: `; C if-else: if (R0 != 5) { R1 = R1 + R0 - R2; }
  CMP  R0, #5
  ADDNE R1, R1, R0    ; executes only if Z=0 (R0 ≠ 5)
  SUBNE R1, R1, R2    ; executes only if Z=0

; AND condition: if ((R0 == R1) && (R2 == R3)) R4++
  CMP   R0, R1        ; sets Z if R0 == R1
  CMPEQ R2, R3        ; runs only if Z=1; re-tests Z
  ADDEQ R4, R4, #1    ; runs only if BOTH comparisons equal

; Find larger of R0, R1 without branch:
  CMP  R0, R1
  MOVLT R0, R1         ; if R0 < R1, R0 = R1 (R0 = max)

; Absolute value of R0:
  CMP   R0, #0
  RSBLT R0, R0, #0     ; if R0 < 0: R0 = 0 - R0 = |R0|`,
      explanation: "Conditional execution = zero-overhead if statements for short blocks.",
    },
    examTips: [
      "≤3 conditional instructions beats branching in speed AND code size",
      "CMPEQ chain: second CMP only executes if first was equal → implements &&",
      "MOVHI, MOVLT, MOVGE etc. are conditional moves — super clean code",
    ],
    questions: [
      { q: "When is conditional execution better than branching?", a: "When the conditional block is 3 instructions or fewer. Branching flushes the pipeline (penalty cycles). Conditional execution has zero pipeline cost — the instruction either executes normally or is a NOP. For 1-3 instructions, this is always faster." },
    ],
  },
  "ldr-str": {
    title: "Load / Store Instructions", emoji: "📤",
    tldr: "LDR/STR (word), LDRB/STRB (byte), LDRH/STRH (halfword). Offset: immediate, register, scaled register.",
    explanation: `ARM is a load-store architecture. All data processing must happen in registers. LDR and STR are the only instructions that access memory.

LDR loads from memory into a register. STR stores from a register into memory.

Variants: LDR/STR (32-bit word), LDRB/STRB (8-bit byte, zero-extended on load), LDRH/STRH (16-bit halfword, zero-extended), LDRSB/LDRSH (signed byte/halfword, sign-extended).

Offset addressing: base register + offset, where offset can be: immediate (#4), register (R2), or scaled register (R2, LSL #2 → R2×4).`,
    keyPoints: [
      "LDR Rd, [Rn] → Rd = mem[Rn] (32-bit word load)",
      "STR Rd, [Rn] → mem[Rn] = Rd (32-bit word store)",
      "LDRB/STRB → 8-bit byte (zero-extended on load)",
      "LDRH/STRH → 16-bit halfword (zero-extended on load)",
      "LDRSB/LDRSH → signed byte/halfword (sign-extended on load)",
      "Immediate offset: LDR R0, [R1, #4] → EA = R1 + 4",
      "Register offset: LDR R0, [R1, R2] → EA = R1 + R2",
      "Scaled register: LDR R0, [R1, R2, LSL #2] → EA = R1 + R2×4",
    ],
    formula: {
      code: `Load variants:
  LDR  Rd, [Rn]        ; 32-bit word load
  LDRB Rd, [Rn]        ; 8-bit unsigned byte (0-extended)
  LDRH Rd, [Rn]        ; 16-bit unsigned halfword (0-extended)
  LDRSB Rd, [Rn]       ; 8-bit SIGNED byte (sign-extended)
  LDRSH Rd, [Rn]       ; 16-bit SIGNED halfword (sign-extended)

Store variants:
  STR  Rd, [Rn]        ; 32-bit word store
  STRB Rd, [Rn]        ; 8-bit byte store
  STRH Rd, [Rn]        ; 16-bit halfword store

Offset types:
  LDR R0, [R1, #4]          ; immediate: EA = R1 + 4
  LDR R0, [R1, R2]          ; register:  EA = R1 + R2
  LDR R0, [R1, R2, LSL #2]  ; scaled:    EA = R1 + R2×4`,
      explanation: "Scaled register is useful for array indexing: R1=base, R2=index, LSL#2=×4 (word size).",
    },
    examTips: [
      "LDRB = zero-extended. LDRSB = sign-extended. Know the difference.",
      "Alignment: LDR needs 4-byte aligned, LDRH needs 2-byte aligned",
      "LDR R0, =LABEL is a pseudo-instruction (assembler converts to PC-relative load)",
    ],
    questions: [
      { q: "How do you access array element A[i] where each element is a 32-bit word?", a: "LDR R0, [Rbase, Ri, LSL #2]. Rbase holds the address of A[0]. Ri holds i. LSL #2 multiplies i by 4 (each word = 4 bytes). EA = A + i×4 = address of A[i]." },
    ],
  },
  "addressing-modes": {
    title: "Three Addressing Modes ⚠️", emoji: "📍",
    tldr: "Pre-index (no wb): EA=Rn+offset, Rn unchanged. Pre-index with !: Rn updated. Post-index: EA=Rn, Rn updated after.",
    explanation: `ARM load/store instructions have three addressing modes that differ in when the base register is updated.

1. Pre-indexed (no writeback): LDR Rd, [Rn, #offset] — effective address = Rn + offset. Access memory at EA. Base register Rn is NOT updated.

2. Pre-indexed with writeback: LDR Rd, [Rn, #offset]! — effective address = Rn + offset. Access memory at EA. Base register Rn IS updated to Rn + offset (the ! forces writeback).

3. Post-indexed: LDR Rd, [Rn], #offset — effective address = Rn (current value). Access memory at Rn. THEN base register updated to Rn + offset. Useful for stepping through arrays.`,
    keyPoints: [
      "Pre-index no writeback: [Rn, #off] → EA=Rn+off; Rn unchanged",
      "Pre-index with writeback: [Rn, #off]! → EA=Rn+off; Rn updated to Rn+off",
      "Post-index: [Rn], #off → EA=Rn; Rn updated to Rn+off AFTER access",
      "! = writeback marker. Post-index always writes back (no ! needed).",
      "Post-index: access first, then update — useful for array traversal",
      "Negative offsets allowed: [Rn, #-4] → EA = Rn - 4",
    ],
    formula: {
      code: `Mode            │ Syntax             │ EA        │ Rn after
────────────────┼────────────────────┼───────────┼──────────
Pre (no wb)     │ [Rn, #4]           │ Rn + 4    │ unchanged
Pre with wb     │ [Rn, #4]!          │ Rn + 4    │ Rn + 4
Post            │ [Rn], #4           │ Rn        │ Rn + 4

Array traversal example (post-index):
  LDR R0, =ARRAY         ; R0 = base address of array
  MOV R2, #5             ; loop counter
loop:
  LDR R1, [R0], #4       ; R1 = mem[R0], then R0 += 4
  ; process R1 here
  SUBS R2, R2, #1
  BNE loop               ; repeat for all 5 elements

Stack push (pre-index with writeback):
  STR R0, [R13, #-4]!    ; R13 -= 4, then store R0 at new R13`,
      explanation: "Post-index: read/write at base, then advance. Perfect for sequential array processing.",
    },
    examTips: [
      "! after bracket = writeback. No ! = no writeback to base register.",
      "Post-index: access at CURRENT Rn value, update AFTER. No bracket nesting.",
      "⚡ PYQ FAVOURITE: trace addressing mode instructions step by step",
    ],
    questions: [
      { q: "What is the difference between LDR R0, [R1, #4]! and LDR R0, [R1], #4?", a: "Both access the same address (R1+4 vs R1 first?). Actually different: [R1,#4]! → EA=R1+4, then R1=R1+4. [R1],#4 → EA=R1 (no offset added first), then R1=R1+4. First accesses R1+4, second accesses R1. Both update R1 to R1+4 after." },
    ],
  },
  "mul-32": {
    title: "32-bit Multiply Instructions", emoji: "✖️",
    tldr: "MUL Rd, Rm, Rs → lower 32 bits only. MLA: multiply+accumulate. Rd≠Rm constraint. 2-5 cycles.",
    explanation: `ARM has dedicated multiply instructions distinct from data processing.

MUL (Multiply): Rd = Rm × Rs (lower 32 bits only — upper bits discarded). Only register operands — no immediates.

MLA (Multiply-Accumulate): Rd = Rm × Rs + Rn. Multiplies two registers and adds a third accumulation register — one instruction.

Constraints: Rd must be DIFFERENT from Rm (hardware limitation). Rs cannot be an immediate value (always a register). If the S bit is set (MULS), the C flag becomes meaningless/unpredictable.

ARM7TDMI takes 2–5 cycles for 32-bit multiply depending on the value of Rs.`,
    keyPoints: [
      "MUL Rd, Rm, Rs → Rd = Rm × Rs (lower 32 bits only!)",
      "MLA Rd, Rm, Rs, Rn → Rd = Rm × Rs + Rn (multiply-accumulate)",
      "CONSTRAINT: Rd ≠ Rm (different registers required)",
      "Rs cannot be an immediate — must be a register",
      "If S bit set (MULS), C flag is unpredictable after",
      "ARM7TDMI: 2-5 cycles depending on Rs value",
      "Lower 32 bits only — for 64-bit result use UMULL/SMULL",
    ],
    formula: {
      code: `MUL:
  MUL  R0, R1, R2      ; R0 = R1 × R2 (lower 32 bits)
  MULS R0, R1, R2      ; same but updates N, Z flags (C unpredictable)

MLA (Multiply-Accumulate):
  MLA R0, R1, R2, R3   ; R0 = R1 × R2 + R3

CONSTRAINT — Rd ≠ Rm:
  MUL R0, R0, R2       ; ILLEGAL! Rd=R0, Rm=R0 → same register
  MUL R0, R1, R2       ; LEGAL (Rd=R0 ≠ Rm=R1)
  MUL R1, R0, R1       ; LEGAL (Rd=R1 ≠ Rm=R0, Rs=R1 OK)

Encoding:
  [27:24] = 0000
  [23]    = 0 (for 32-bit)
  [22]    = 0
  [21] A  = 0 for MUL, 1 for MLA
  [20] S  = S bit
  [19:16] Rd, [15:12] Rn(MLA), [11:8] Rs
  [7:4] = 1001 (multiply signature)
  [3:0] Rm`,
      explanation: "Encoding signature [7:4]=1001 distinguishes multiply from data processing instructions.",
    },
    examTips: [
      "Rd ≠ Rm constraint — ALWAYS check in exam code",
      "MUL gives lower 32 bits ONLY. For 64-bit: use UMULL or SMULL",
      "No immediate for Rs — both operands must be registers",
    ],
    questions: [
      { q: "Why can't Rd equal Rm in the MUL instruction?", a: "Hardware implementation constraint in early ARM designs. During the multiply algorithm, Rm is read and Rd is written in a way that would create a hazard if they were the same register. The assembler will flag this as an error." },
    ],
  },
  "mul-64": {
    title: "64-bit Multiply Instructions", emoji: "🔢",
    tldr: "UMULL/SMULL (unsigned/signed 64-bit). UMLAL/SMLAL (with accumulate). Result split: RdLo (lower 32), RdHi (upper 32).",
    explanation: `For 64-bit products (which easily overflow 32 bits), ARM provides four 64-bit multiply instructions.

UMULL (Unsigned Multiply Long): RdHi:RdLo = Rm × Rs (unsigned). 64-bit result split across two registers.
SMULL (Signed Multiply Long): same but signed multiplication.
UMLAL (Unsigned Multiply-Accumulate Long): RdHi:RdLo = Rm × Rs + RdHi:RdLo (accumulate into existing 64-bit value).
SMLAL (Signed Multiply-Accumulate Long): signed version of UMLAL.

Result registers: RdLo holds the lower 32 bits, RdHi holds the upper 32 bits of the 64-bit result.

Example: 0xFFFFFFFF × 0xFFFFFFFF = 0xFFFFFFFE00000001 (64-bit result, needs UMULL).`,
    keyPoints: [
      "UMULL RdLo, RdHi, Rm, Rs → unsigned 64-bit: RdHi:RdLo = Rm × Rs",
      "SMULL RdLo, RdHi, Rm, Rs → signed 64-bit",
      "UMLAL RdLo, RdHi, Rm, Rs → unsigned 64-bit + accumulate",
      "SMLAL RdLo, RdHi, Rm, Rs → signed 64-bit + accumulate",
      "RdLo = lower 32 bits of result",
      "RdHi = upper 32 bits of result",
      "Encoding: bits [27:21] = 0000 1UAS where U=unsigned flag, A=accumulate",
    ],
    formula: {
      code: `UMULL R0, R1, R2, R3    ; R1:R0 = R2 × R3 (unsigned 64-bit)
SMULL R0, R1, R2, R3    ; R1:R0 = R2 × R3 (signed 64-bit)
UMLAL R0, R1, R2, R3    ; R1:R0 += R2 × R3 (unsigned accumulate)
SMLAL R0, R1, R2, R3    ; R1:R0 += R2 × R3 (signed accumulate)

PYQ Example: 0xFFFFFFFF × 0xFFFFFFFF
  MVN   R0, #0           ; R0 = 0xFFFFFFFF (can't use MOV!)
  UMULL R1, R2, R0, R0   ; R2:R1 = 0xFFFFFFFE00000001
  SWI   0x11

Result = 0xFFFFFFFE 00000001:
  R1 (RdLo) = 0x00000001
  R2 (RdHi) = 0xFFFFFFFE

Encoding bits [27:21]:
  UMULL: 0000 100 (U=0→unsigned? no: actually U=1 for signed)
  SMULL: 0000 110
  UMLAL: 0000 101
  SMLAL: 0000 111`,
      explanation: "RdLo and RdHi must both be different from Rm, and different from each other.",
    },
    examTips: [
      "⚡ PYQ FAVOURITE: Multiply 0xFFFFFFFF by itself — use MVN R0, #0 then UMULL",
      "RdLo = lower half, RdHi = upper half of 64-bit result",
      "UMULL = unsigned (both operands treated as unsigned)",
      "SMULL = signed (operands treated as two's complement signed)",
    ],
    questions: [
      { q: "What is 0xFFFFFFFF × 0xFFFFFFFF and how do you compute it in ARM?", a: "0xFFFFFFFF × 0xFFFFFFFF = 0xFFFFFFFE00000001. Code: MVN R0, #0 (loads 0xFFFFFFFF), UMULL R1, R2, R0, R0 (R2:R1 = result). R1 = 0x00000001, R2 = 0xFFFFFFFE." },
    ],
  },
  "ldm-stm-overview": {
    title: "LDM/STM — Multiple Load/Store", emoji: "📚",
    tldr: "Transfer multiple registers in ONE instruction. Registers always in ascending order. Time: 2+N×t cycles. Increases interrupt latency.",
    explanation: `LDM (Load Multiple) and STM (Store Multiple) transfer up to 16 registers to/from memory in a single instruction. They are far more efficient than individual LDR/STR instructions for bulk transfers.

Key behaviour: Registers are always transferred in ascending register number order, regardless of the order listed in the instruction. R0 is always at the lowest memory address.

Execution time: 2 + N×t cycles, where N is the number of registers and t is the memory access time.

Side effect: LDM/STM cannot be interrupted mid-execution. This increases interrupt latency — a concern for real-time systems. The processor must complete all transfers before handling an interrupt.`,
    keyPoints: [
      "LDM: load multiple registers from memory in one instruction",
      "STM: store multiple registers to memory in one instruction",
      "Registers always transferred in ASCENDING register number order",
      "R0 = lowest memory address; R15 (if present) = highest",
      "Execution time: 2 + N × t cycles (N = number of registers)",
      "CANNOT be interrupted mid-transfer → increases interrupt latency",
      "More efficient than N individual LDR/STR instructions",
    ],
    formula: {
      code: `Syntax:
  LDM<mode> Rn{!}, {register_list}
  STM<mode> Rn{!}, {register_list}

Examples:
  LDMIA R0, {R1, R2, R3}    ; load R1,R2,R3 from [R0], [R0+4], [R0+8]
  STMIA R0!, {R4-R7}        ; store R4,R5,R6,R7; R0 advances by 16

Register list notation:
  {R0, R5-R8, R11}  = R0, R5, R6, R7, R8, R11 (6 registers)
  
Always ascending: {R5, R1} stores R1 first (lower addr), then R5
  STMIA R0!, {R5, R1}  → mem[R0] = R1, mem[R0+4] = R5

Execution time (N=8 registers, t=1 cycle):
  2 + 8 × 1 = 10 cycles vs 8 individual LDRs at ~3 cycles each = 24 cycles`,
      explanation: "Register ordering is always ascending regardless of how you write them in the list.",
    },
    examTips: [
      "Registers always stored/loaded in ASCENDING order (R0 at lowest address)",
      "2+N×t cycles — faster than N individual LDR/STR instructions",
      "Interrupt latency increases — LDM/STM can't be interrupted mid-way",
    ],
    questions: [
      { q: "If STMIA R0!, {R5, R1, R3} is executed, in what order are registers stored to memory?", a: "R1 first (at [R0]), then R3 (at [R0+4]), then R5 (at [R0+8]). ARM always stores in ascending register number order, regardless of the order written in the instruction list." },
    ],
  },
  "ldm-stm-modes": {
    title: "LDM/STM Addressing Modes", emoji: "⬆️",
    tldr: "IA (increment after), IB (increment before), DA (decrement after), DB (decrement before). 4 modes.",
    explanation: `LDM/STM have four addressing modes that control how the base register (Rn) moves relative to the memory accesses.

IA (Increment After): Access memory at Rn, then Rn += 4. Start at Rn.
IB (Increment Before): Rn += 4, then access. Start at Rn+4.
DA (Decrement After): Access at Rn, then Rn -= 4. Counts down from Rn.
DB (Decrement Before): Rn -= 4, then access. Counts down starting below Rn.

The P (pre/post) and U (up/down) bits in encoding: P=0=post/after, P=1=pre/before. U=0=decrement, U=1=increment.

FD (Full Descending) is the standard stack convention: push = STMDB (or STMFD), pop = LDMIA (or LDMFD).`,
    keyPoints: [
      "IA: access at Rn THEN increment Rn by 4 (Increment After)",
      "IB: increment Rn by 4 THEN access (Increment Before)",
      "DA: access at Rn THEN decrement Rn by 4 (Decrement After)",
      "DB: decrement Rn by 4 THEN access (Decrement Before)",
      "Encoding: P bit = pre/post; U bit = up(increment)/down(decrement)",
      "IA: P=0, U=1. IB: P=1, U=1. DA: P=0, U=0. DB: P=1, U=0",
    ],
    formula: {
      code: `Suffix │ P bit │ U bit │ Action
───────┼───────┼───────┼─────────────────────────────
IA     │  0    │  1    │ Access, then Rn += 4
IB     │  1    │  1    │ Rn += 4, then Access
DA     │  0    │  0    │ Access, then Rn -= 4
DB     │  1    │  0    │ Rn -= 4, then Access

LDMDB R0!, {R1, R2, R3} with R0 = 0x1000:
  First:  R0 = 0x1000 - 4 = 0x0FFC → load R3 from 0x0FFC
  Second: R0 = 0x0FFC - 4 = 0x0FF8 → load R2 from 0x0FF8
  Third:  R0 = 0x0FF8 - 4 = 0x0FF4 → load R1 from 0x0FF4
  Writeback: R0 = 0x0FF4

(Registers always in ascending order: R1 at lowest, R3 at highest)`,
      explanation: "DB = Decrement Before = standard push for FD stack (SP points to last stored value).",
    },
    examTips: [
      "IA = most common for LDM (load forward through array). DB = push on FD stack.",
      "STMDB and STMFD are aliases — both mean Store Multiple Decrement Before",
      "PYQ: Given R0=0x1000, trace LDMDB R0!, {R1,R2,R3} → R0=0x0FF4",
    ],
    questions: [
      { q: "What is the final value of R0 after LDMDB R0!, {R1, R2, R3} with R0 initially = 0x1000?", a: "R0 = 0x0FF4. Three registers × 4 bytes = 12 bytes. DB decrements before each access: R0 goes 0x1000→0x0FFC→0x0FF8→0x0FF4. With writeback (!), R0 ends at 0x0FF4." },
    ],
  },
  "stack-conventions": {
    title: "Stack Conventions & Block Copy", emoji: "📦",
    tldr: "FD (Full Descending) = standard. Push=STMDB(STMFD), Pop=LDMIA(LDMFD). Block copy 512 bytes: LDMIA+STMIA ×16.",
    explanation: `ARM supports four stack types. The standard is FD (Full Descending): SP points to the last filled slot, stack grows downward in memory.

FD Push (STMFD / STMDB): decrement SP before storing — SP ends up pointing to the newly pushed data.
FD Pop (LDMFD / LDMIA): load data that SP points to, then increment SP — SP advances past the popped data.

Other conventions: FA (Full Ascending), ED (Empty Descending), EA (Empty Ascending). "Full" = SP points to last filled slot. "Empty" = SP points to next empty slot.

Block copy example: to copy 512 bytes, use 8-register LDM/STM pairs in a loop (8 words × 4 bytes = 32 bytes per iteration × 16 iterations = 512 bytes).`,
    keyPoints: [
      "FD (Full Descending) = standard ARM stack convention",
      "FD Push: STMDB (or STMFD) — SP decrements BEFORE store",
      "FD Pop: LDMIA (or LDMFD) — SP increments AFTER load",
      "Full: SP points to last filled slot. Empty: SP points to next empty slot.",
      "Descending: stack grows downward. Ascending: stack grows upward.",
      "STMFD/STMDB and LDMFD/LDMIA are aliases",
    ],
    formula: {
      code: `FD Stack (standard):
  Push R1, R2:  STMFD R13!, {R1, R2}  (= STMDB R13!, {R1, R2})
  Pop  R4, R5:  LDMFD R13!, {R4, R5}  (= LDMIA R13!, {R4, R5})

Stack type → Push instruction → Pop instruction:
  FD  → STMDB (STMFD)  → LDMIA (LDMFD)
  FA  → STMIA          → LDMDA
  ED  → STMDA          → LDMIB
  EA  → STMIA (STMEA)  → LDMDA (LDMEA)

Block Copy 512 bytes (using R9=src, R10=dst, R11=counter):
  MOV  R11, #0
loop:
  LDMIA R9!, {R0-R7}    ; load 8 words = 32 bytes, advance R9
  STMIA R10!, {R0-R7}   ; store 32 bytes, advance R10
  ADD  R11, R11, #1
  CMP  R11, #16
  BNE  loop             ; 16 iterations × 32 bytes = 512 bytes`,
      explanation: "Block copy with 8 registers is 8× faster than single LDR/STR loop.",
    },
    examTips: [
      "FD push = STMDB. FD pop = LDMIA. MEMORIZE this pair.",
      "STMFD is alias for STMDB. LDMFD is alias for LDMIA.",
      "Block copy: 8 regs × 4 bytes = 32 bytes/iteration. 512/32 = 16 iterations.",
    ],
    questions: [
      { q: "Write the push and pop instructions for saving R4-R7 and LR on an FD stack.", a: "Push: STMFD R13!, {R4-R7, LR} — saves all 5 registers, SP decrements by 20. Pop: LDMFD R13!, {R4-R7, PC} — restores registers and branches back by loading old LR into PC." },
    ],
  },
  "procedure-calls": {
    title: "Procedure Calls & ARM Calling Convention", emoji: "📞",
    tldr: "BL: LR=return addr, PC=target. Return: MOV PC,LR. No hardware stack — R13 by convention. Advantage: leaf functions return instantly.",
    explanation: `ARM procedure calls use the BL instruction. BL saves the return address in LR (R14) and branches to the subroutine. The subroutine returns by copying LR back to PC (MOV PC, LR or BX LR).

ARM has no dedicated hardware stack for procedure calls — it's entirely software-managed using R13 (SP) by convention. This is a key design choice.

Advantage: subroutines that don't call any further functions (leaf functions) can return immediately via MOV PC, LR without touching the stack at all — zero overhead.

Disadvantage: nested calls require explicit save/restore of LR and other registers to/from the stack.`,
    keyPoints: [
      "BL subroutine: LR = return address (instr after BL), PC = subroutine",
      "Return: MOV PC, LR (or BX LR)",
      "No hardware call stack — R13 used as stack pointer by convention",
      "Leaf functions: return immediately (MOV PC, LR) — no stack overhead",
      "Nested calls: must save/restore LR and registers on stack",
      "ARM calling convention: R0-R3 = arguments/results, R4-R11 = saved vars",
    ],
    formula: {
      code: `; Basic procedure call
main:
  MOV  R0, #10            ; argument
  BL   my_func            ; call: LR = address after BL
  ; execution resumes here after return
  SWI  0x11

my_func:
  ; R0 has the argument
  ADD  R0, R0, #5         ; result in R0
  MOV  PC, LR             ; return: PC = LR (back to caller)

; ARM calling convention summary:
;   R0-R3:  function arguments / return values
;   R4-R11: callee-saved (must preserve)
;   R13:    stack pointer (SP)
;   R14:    link register (LR)
;   R15:    program counter (PC)`,
      explanation: "MOV PC, LR is the ARM return instruction. No RET opcode like x86.",
    },
    examTips: [
      "MOV PC, LR = ARM's return from subroutine (no RET instruction)",
      "BX LR = return + possible state switch (ARM↔Thumb)",
      "Leaf function = no calls to other functions → no stack needed → fast return",
    ],
    questions: [
      { q: "What is the advantage of ARM's software-managed stack over a hardware call stack?", a: "Leaf functions (functions that don't call others) can return immediately via MOV PC, LR without any stack operations. No push/pop overhead. Only non-leaf functions need to use the stack. This is faster for the very common case of short helper functions." },
    ],
  },
  "nested-calls": {
    title: "Nested Procedure Calls", emoji: "🔁",
    tldr: "Nested BL overwrites LR. Save LR on stack before calling. Restore with LDMFD R13!, {R0-R3, PC} — pops LR directly into PC.",
    explanation: `When a subroutine calls another subroutine, BL overwrites LR with the new return address — destroying the original return address.

Solution: before executing the inner BL, save LR (and any registers you need to preserve) to the stack using STMFD. On return, restore registers and load the saved LR directly into PC using LDMFD.

The pattern LDMFD R13!, {..., PC} is an elegant ARM idiom — it pops the old LR value directly into PC, returning in one instruction.

The same approach applies if a function needs to preserve R4-R11 (callee-saved registers).`,
    keyPoints: [
      "BL overwrites LR — nested calls destroy the previous return address",
      "Solution: save LR on stack before inner BL",
      "Pattern: STMFD R13!, {R4-R7, LR} before inner call",
      "Return: LDMFD R13!, {R4-R7, PC} — pops old LR directly into PC!",
      "LDMFD with PC in register list = one-instruction return + register restore",
    ],
    formula: {
      code: `; Nested call problem:
func_a:
  ; LR = return address to caller of func_a
  BL func_b              ; LR OVERWRITTEN with return-to-func_a+4!
  ; func_a's return address is LOST
  MOV PC, LR             ; BUG: returns to wrong place

; Correct nested call:
func_a:
  STMFD R13!, {R0-R3, LR}   ; save registers AND LR on stack
  BL    func_b               ; LR = return point after this BL
  ; do more work ...
  LDMFD R13!, {R0-R3, PC}    ; restore regs + pop old LR → PC (return!)

func_b:
  ; This is a leaf function — no nested calls
  ADD R0, R0, #1
  MOV PC, LR                 ; simple return, LR not overwritten`,
      explanation: "LDMFD R13!, {..., PC} = restore registers + return. Old LR goes directly into PC.",
    },
    examTips: [
      "⚡ Key exam idiom: LDMFD R13!, {R4-R7, PC} — pops saved LR into PC = return",
      "Any function with a BL inside it MUST save LR first",
      "Leaf functions (no BL inside): just MOV PC, LR at end",
    ],
    questions: [
      { q: "Why does LDMFD R13!, {R4-R7, PC} serve as a return instruction?", a: "When entering the function, we did STMFD R13!, {R4-R7, LR} which saved LR on the stack. Now LDMFD pops that saved LR value directly into PC. Setting PC = old LR = return address in caller. It restores R4-R7 AND returns in one single instruction." },
    ],
  },
  "swi": {
    title: "Software Interrupts (SWI)", emoji: "📡",
    tldr: "SWI: switches to SVC mode, CPSR→SPSR, jumps to 0x00000008. Return: MOVS PC, LR. Common: SWI 0x11=exit, SWI 0x00=print char.",
    explanation: `SWI (Software Interrupt) is used to request OS services. It causes a software exception.

When SWI executes: 1. ARM completes the current instruction. 2. Processor switches to Supervisor (SVC) mode. 3. CPSR is saved to SPSR_svc. 4. LR_svc = address of instruction after SWI (return address). 5. PC jumps to exception vector 0x00000008 (SWI handler). 6. The OS SWI handler runs and dispatches based on the SWI number. 7. Return via MOVS PC, LR (which also restores CPSR from SPSR).

Common SWI calls in ARMSim simulator: SWI 0x11 = exit program, SWI 0x00 = print character in R0, SWI 0x02 = print string at address in R0.`,
    keyPoints: [
      "SWI triggers software exception → switches to SVC mode",
      "CPSR saved to SPSR_svc on SWI entry",
      "LR_svc = return address (instruction after SWI)",
      "PC → 0x00000008 (SWI exception vector)",
      "Return: MOVS PC, LR (restores SPSR → CPSR automatically)",
      "SWI 0x11 = exit, SWI 0x00 = print char in R0, SWI 0x02 = print string at R0",
    ],
    formula: {
      code: `SWI execution sequence:
  1. SWI #n instruction executes
  2. Mode → Supervisor (SVC)
  3. CPSR → SPSR_svc
  4. LR_svc = PC (return address = instruction after SWI)
  5. PC = 0x00000008 (SWI exception vector)
  6. Handler reads SWI number from instruction encoding
  7. Return: MOVS PC, LR_svc (restores CPSR from SPSR)

ARMSim SWI calls:
  SWI 0x11       ; Exit program (equivalent to return from main)
  SWI 0x00       ; Print ASCII character stored in R0
  SWI 0x02       ; Print null-terminated string at address in R0

Print string example:
  LDR R0, =MSG   ; R0 = address of string
  SWI 0x02       ; print the string
  SWI 0x11       ; exit
MSG: .ASCIZ "Hello, ARM!"`,
      explanation: "MOVS PC, LR is the exception return — the S suffix copies SPSR back to CPSR.",
    },
    examTips: [
      "SWI switches to SVC mode and jumps to 0x00000008",
      "MOVS PC, LR = return from exception (restores CPSR from SPSR due to S bit)",
      "SWI 0x11 = exit. SWI 0x00 = print char. SWI 0x02 = print string.",
    ],
    questions: [
      { q: "What happens to the CPSR when SWI executes?", a: "CPSR is automatically saved to SPSR_svc (the SVC mode's saved program status register). This preserves the caller's mode, flags, and state. On return (MOVS PC, LR), SPSR_svc is automatically copied back to CPSR." },
    ],
  },
  "exception-vectors": {
    title: "Exception Vectors", emoji: "🗺️",
    tldr: "Fixed addresses: Reset=0x0, Undefined=0x4, SWI=0x8, Prefetch Abort=0xC, Data Abort=0x10, IRQ=0x18, FIQ=0x1C.",
    explanation: `When exceptions occur, the ARM processor jumps to fixed exception vector addresses. The handler at each address services the exception. Usually, the vector contains a branch instruction to the actual handler elsewhere in memory.

Reset (0x00000000): power-on or reset. Highest priority.
Undefined Instruction (0x00000004): unknown/unsupported instruction.
SWI (0x00000008): software interrupt instruction executed.
Prefetch Abort (0x0000000C): failed instruction fetch (bad address).
Data Abort (0x00000010): failed data access (load/store to bad address).
IRQ (0x00000018): normal interrupt request.
FIQ (0x0000001C): fast interrupt request. Highest priority interrupt.

Note: there's no entry at 0x00000014 — that address is reserved.`,
    keyPoints: [
      "Reset:            0x00000000 (power-on, highest priority)",
      "Undefined Instr:  0x00000004",
      "SWI:              0x00000008",
      "Prefetch Abort:   0x0000000C",
      "Data Abort:       0x00000010",
      "IRQ:              0x00000018 (note: skips 0x14!)",
      "FIQ:              0x0000001C (highest priority interrupt)",
    ],
    formula: {
      code: `Exception Vector Table (at address 0x00000000):
  0x00000000: B reset_handler       ; Reset
  0x00000004: B undef_handler       ; Undefined instruction
  0x00000008: B swi_handler         ; Software interrupt (SWI)
  0x0000000C: B prefetch_handler    ; Prefetch abort
  0x00000010: B data_abort_handler  ; Data abort
  0x00000014: (reserved)            ; Not used!
  0x00000018: B irq_handler         ; IRQ
  0x0000001C: B fiq_handler         ; FIQ

Priority order (highest to lowest):
  Reset > Data Abort > FIQ > IRQ > Prefetch Abort > SWI > Undefined`,
      explanation: "Note 0x14 is RESERVED — no exception vector there. IRQ is at 0x18, FIQ at 0x1C.",
    },
    examTips: [
      "SWI vector = 0x00000008 — exam favourite",
      "IRQ = 0x18, FIQ = 0x1C — note the gap at 0x14 (reserved!)",
      "Reset = 0x00000000 (always highest priority exception)",
    ],
    questions: [
      { q: "What is the exception vector address for SWI and FIQ?", a: "SWI = 0x00000008. FIQ = 0x0000001C. Note that IRQ = 0x00000018 and address 0x00000014 is reserved (no vector there)." },
    ],
  },
  "psr-instructions": {
    title: "PSR Transfer Instructions (MRS/MSR)", emoji: "🔄",
    tldr: "Can't directly write CPSR. MRS reads CPSR→register. MSR writes register→CPSR field. Safe pattern: MRS→modify→MSR.",
    explanation: `CPSR (and SPSR) cannot be accessed directly as data — you must use special instructions.

MRS (Move from Status Register to Register): copies CPSR or SPSR into a general-purpose register. Used to read the current status.

MSR (Move from Register to Status Register): writes a general-purpose register (or immediate) to a specific field of CPSR or SPSR. You specify which field: _c (control [7:0]), _x (extension [15:8]), _s (status [23:16]), _f (flags [31:24]).

Safe read-modify-write: MRS R0, CPSR → ORR/BIC R0 to modify → MSR CPSR_c, R0. This prevents accidentally trashing fields you don't intend to change.`,
    keyPoints: [
      "MRS Rd, CPSR → read CPSR into Rd",
      "MRS Rd, SPSR → read SPSR into Rd",
      "MSR CPSR_f, Rn → write Rn to flags field [31:24]",
      "MSR CPSR_c, Rn → write Rn to control field [7:0]",
      "MSR SPSR_f, Rn → write Rn to SPSR flags field",
      "Fields: _c=[7:0] control, _x=[15:8] extension, _s=[23:16] status, _f=[31:24] flags",
      "Safe pattern: MRS read → modify → MSR write back",
    ],
    formula: {
      code: `MRS Rd, CPSR        ; Rd = CPSR (read status register)
MRS Rd, SPSR        ; Rd = SPSR (read saved status)

MSR CPSR_f, Rn      ; CPSR[31:24] = Rn[31:24] (flags only)
MSR CPSR_c, Rn      ; CPSR[7:0]   = Rn[7:0]   (control only)
MSR SPSR_f, Rn      ; SPSR[31:24] = Rn[31:24]

Safe Read-Modify-Write:
  MRS  R0, CPSR        ; 1. Read entire CPSR
  ORR  R0, R0, #0x80   ; 2. Set bit 7 (disable IRQ: I=1)
  MSR  CPSR_c, R0      ; 3. Write back ONLY the control field

Disable both IRQ and FIQ:
  MRS  R0, CPSR
  ORR  R0, R0, #0xC0   ; bits 7 and 6 (I and F)
  MSR  CPSR_c, R0`,
      explanation: "Always use MRS+MSR pair. Never write CPSR with a direct data instruction.",
    },
    examTips: [
      "MRS = Move from Status Register (reads CPSR/SPSR into GP register)",
      "MSR = Move to Status Register (writes GP register into CPSR/SPSR field)",
      "Must use MRS→modify→MSR pattern — no direct CPSR writes",
    ],
    questions: [
      { q: "How do you disable IRQ while preserving all other CPSR bits?", a: "MRS R0, CPSR (read CPSR), ORR R0, R0, #0x80 (set bit 7 = I flag), MSR CPSR_c, R0 (write back control field). The _c field selector ensures only [7:0] is modified." },
    ],
  },
  "swap-instruction": {
    title: "SWAP Instruction (SWP/SWPB)", emoji: "🔃",
    tldr: "SWP Rd, Rm, [Rn]: atomically swap register with memory. Used for semaphores/mutual exclusion.",
    explanation: `SWP (Swap) atomically swaps the contents of a register with a memory location. It is an atomic read-modify-write operation — it cannot be interrupted between the read and write phases.

Operation: temp = mem[Rn], mem[Rn] = Rm, Rd = temp. All in one indivisible operation.

SWPB: same but operates on a byte instead of a 32-bit word.

Use case: implementing semaphores and mutual exclusion locks in shared memory multiprocessor systems. The atomic nature ensures no other processor can access the memory location between the read and write.

SWP R1, R1, [R2]: when Rd = Rm = R1, this atomically swaps R1 with mem[R2].`,
    keyPoints: [
      "SWP Rd, Rm, [Rn]: temp=mem[Rn]; mem[Rn]=Rm; Rd=temp (atomic!)",
      "SWPB: same operation but byte-sized",
      "Atomic: cannot be interrupted between the read and write",
      "Used for semaphores and mutual exclusion locks",
      "SWP R1, R1, [R2]: atomically swaps R1 with mem[R2]",
      "Encoding: bits [27:24]=0001, B bit [22]=0/1 for word/byte",
    ],
    formula: {
      code: `SWP Rd, Rm, [Rn]:
  temp    = mem[Rn]    ; read memory
  mem[Rn] = Rm         ; write Rm to memory
  Rd      = temp       ; Rd gets old memory value
  ; All THREE steps are ATOMIC (uninterruptible)

SWPB: same but byte-sized

Semaphore example:
  ; Try to acquire lock (lock=0 means free, 1 means held)
  MOV  R1, #1          ; value to write (lock it)
  SWP  R0, R1, [R2]    ; R0 = old mem[R2]; mem[R2] = 1
  CMP  R0, #0          ; was lock free?
  BNE  try_again       ; if R0 != 0, lock was held, retry
  ; Critical section here
  ; Release: STR R4, [R2] (R4=0, unlock)

SWP R1, R1, [R2]:
  ; Rd = Rm = R1: swap R1 with mem[R2]`,
      explanation: "The atomic guarantee prevents race conditions in multiprocessor systems.",
    },
    examTips: [
      "SWP = atomic swap — cannot be interrupted between read and write",
      "Used for semaphores — ensures only one processor can grab the lock",
      "Encoding: [27:24]=0001, [7:4]=1001 (signature bytes)",
    ],
    questions: [
      { q: "Why must a swap instruction be atomic?", a: "Without atomicity, in a multiprocessor system, two processors could both read the lock value (0 = free), both decide it's free, and both set it to 1 — creating a race condition. Atomic swap prevents this: between the read and write, no other access can occur." },
    ],
  },
  "encode-data-processing": {
    title: "Data Processing Encoding ⚠️", emoji: "🧮",
    tldr: "[31:28]Cond|[27:26]00|[25]I|[24:21]Opcode|[20]S|[19:16]Rn|[15:12]Rd|[11:0]Op2. ADD R1,R0,R2=0xE0801002.",
    explanation: `Every ARM data processing instruction is 32 bits encoded as:
[31:28] Cond | [27:26] 00 | [25] I | [24:21] Opcode | [20] S | [19:16] Rn | [15:12] Rd | [11:0] Operand2

Cond: condition code (1110=AL always).
I bit [25]: 0=Op2 is register; 1=Op2 is immediate.
Opcode [24:21]: see opcode table.
S bit [20]: 0=no flag update; 1=update CPSR.
Rn [19:16]: first source register.
Rd [15:12]: destination register.
Operand2 [11:0]: for immediate shift, [11:7]=shift amount, [6:5]=shift type, [4]=0, [3:0]=Rm.`,
    keyPoints: [
      "Bits [31:28] = Condition code (1110 = AL always)",
      "Bits [27:26] = 00 (identifies data processing)",
      "Bit [25] I = 0 (register Op2) or 1 (immediate Op2)",
      "Bits [24:21] = Opcode (ADD=0100, MOV=1101, etc.)",
      "Bit [20] S = flag update (0=no, 1=yes)",
      "Bits [19:16] = Rn (first source register)",
      "Bits [15:12] = Rd (destination register)",
      "Bits [11:0] = Operand2 (shift info + Rm, or rotated immediate)",
    ],
    formula: {
      code: `Encoding: [31:28]|[27:26]|[25]|[24:21]|[20]|[19:16]|[15:12]|[11:0]
         Cond  | 00   |  I |Opcode | S  |  Rn   |  Rd   |  Op2

ADD R1, R0, R2 (AL, no flags, register):
  Cond=1110, 00, I=0, Opcode=0100(ADD), S=0, Rn=0000, Rd=0001, Op2=000000000010
  Binary: 1110 0000 1000 0000 0001 0000 0000 0010
  Hex: 0xE0801002

ADDS R1, R0, R2 LSR #2:
  S=1, shift_imm=00010, shift_type=01(LSR), Rm=R2=0010
  Op2 = 00010 01 0 0010 = 000100 10 0010 = 0x122 (wait, let's redo)
  Op2[11:7]=00010, [6:5]=01, [4]=0, [3:0]=0010 → 0001 0010 0010 = 0x122
  Hex: 0xE0901122

EORNES R0, R1, R2 (PYQ):
  Cond=NE=0001, 00, I=0, Opcode=EOR=0001, S=1, Rn=R1=0001, Rd=R0=0000, Rm=R2=0010
  Binary: 0001 0000 0011 0001 0000 0000 0000 0010
  Hex: 0x00310002

Op2 sub-fields (immediate shift):
  [11:7] shift amount (5 bits)
  [6:5]  shift type: 00=LSL, 01=LSR, 10=ASR, 11=ROR
  [4]    0 (immediate shift)
  [3:0]  Rm`,
      explanation: "For exam: identify each field, fill in bits, convert to hex. Always double-check Rn vs Rd positions.",
    },
    examTips: [
      "⚡ PYQ FAVOURITE: Encode EORNES R0, R1, R2 → 0x00310002",
      "Cond field: NE=0001, EQ=0000, AL=1110",
      "S=1 for instructions that update flags (ADDS, SUBS, EORS, etc.)",
      "I=0 means Op2 is register. I=1 means Op2 is 8-bit rotated immediate.",
    ],
    questions: [
      { q: "Encode ADD R1, R0, R2 in hex.", a: "0xE0801002. Breakdown: Cond=1110(AL), 00, I=0, Opcode=0100(ADD), S=0, Rn=0000(R0), Rd=0001(R1), Op2=000000000010(R2 no shift). Binary: 1110 0000 1000 0000 0001 0000 0000 0010." },
    ],
  },
  "encode-branch": {
    title: "Branch Instruction Encoding ⚠️", emoji: "↗️",
    tldr: "[31:28]Cond|[27:25]101|[24]L|[23:0]imm24. Target=(PC+8)+(imm24<<2). Backward offset = 2's complement 24-bit.",
    explanation: `Branch instruction format: [31:28] Cond | [27:25] 101 | [24] L | [23:0] imm24.

101 identifies it as a branch. L=0 is B (branch only), L=1 is BL (branch with link).

The 24-bit immediate is a signed offset in WORDS (not bytes). To calculate:
offset = (Target_Address - (Instruction_Address + 8)) / 4

The +8 is because PC is 8 bytes ahead at execution time (3-stage pipeline).

For backward branches, the offset is negative — encode as 24-bit two's complement.`,
    keyPoints: [
      "Bits [27:25] = 101 (branch identifier)",
      "Bit [24] L = 0 (B) or 1 (BL)",
      "Bits [23:0] = signed 24-bit word offset",
      "Target = (PC + 8) + (imm24 × 4)",
      "Offset = (Target - (instruction_addr + 8)) / 4",
      "Backward offset: negative, encode as 24-bit two's complement",
      "Range: ±32MB from branch instruction",
    ],
    formula: {
      code: `Branch format:
  [31:28][27:25][24][23:0]
  Cond   101    L   imm24

Forward branch: BL at 0x1004, target = 0x1018
  PC at execute = 0x1004 + 8 = 0x100C
  offset = (0x1018 - 0x100C) / 4 = 0xC / 4 = 3
  Cond=AL=1110, 101, L=1, imm24 = 0x000003
  Binary: 1110 1011 0000 0000 0000 0000 0000 0011
  Hex: 0xEB000003

Backward branch: BL at 0x100C, target = 0x1000
  PC at execute = 0x100C + 8 = 0x1014
  offset = (0x1000 - 0x1014) / 4 = -0x14 / 4 = -5
  -5 in 24-bit two's complement:
    +5 = 000...0101 → invert → 111...1010 → +1 → 111...1011
    24-bit: 1111 1111 1111 1111 1111 1011 = 0xFFFFFB
  Binary: 1110 1011 1111 1111 1111 1111 1111 1011
  Hex: 0xEBFFFFFB`,
      explanation: "Always use PC+8 for branch calculations. Backward = negative 24-bit two's complement.",
    },
    examTips: [
      "⚡ PYQ FAVOURITE: encode forward and backward branches",
      "PC+8 rule: always add 8 to instruction address for branch offset calculation",
      "Divide by 4: offset is in WORDS, not bytes",
      "Backward: compute negative offset in 24-bit two's complement",
    ],
    questions: [
      { q: "BL instruction is at address 0x100C and branches to 0x1000. What is the hex encoding?", a: "PC+8 = 0x1014. Offset = (0x1000-0x1014)/4 = -20/4 = -5. -5 in 24-bit 2's complement = 0xFFFFFB. Cond=1110, 101, L=1, imm24=0xFFFFFB. Result: 0xEBFFFFFB." },
    ],
  },
  "encode-ldr-str": {
    title: "LDR/STR Instruction Encoding", emoji: "📝",
    tldr: "[31:28]Cond|[27:26]01|[25]I|[24]P|[23]U|[22]B|[21]W|[20]L|[19:16]Rn|[15:12]Rd|[11:0]Offset.",
    explanation: `Single data transfer (LDR/STR) instruction format: [31:28] Cond | [27:26] 01 | [25] I | [24] P | [23] U | [22] B | [21] W | [20] L | [19:16] Rn | [15:12] Rd | [11:0] Offset.

01 at [27:26] identifies this as a data transfer instruction.
I [25]: 0=immediate offset; 1=register offset.
P [24]: 0=post-indexed; 1=pre-indexed.
U [23]: 0=subtract offset from base; 1=add offset.
B [22]: 0=word (32-bit); 1=byte transfer.
W [21]: 0=no writeback; 1=writeback (update base register).
L [20]: 0=store (STR); 1=load (LDR).`,
    keyPoints: [
      "Bits [27:26] = 01 (data transfer identifier)",
      "I [25]: 0=immediate offset; 1=register offset",
      "P [24]: 0=post-indexed; 1=pre-indexed",
      "U [23]: 0=subtract; 1=add offset",
      "B [22]: 0=word; 1=byte",
      "W [21]: 0=no writeback; 1=writeback",
      "L [20]: 0=STR (store); 1=LDR (load)",
    ],
    formula: {
      code: `Format: [31:28][27:26][25][24][23][22][21][20][19:16][15:12][11:0]
         Cond   01    I   P   U   B   W   L   Rn    Rd    Offset

STR R0, [R1]  (pre-indexed, no writeback, word, add offset=0):
  Cond=1110, 01, I=0, P=1, U=1, B=0, W=0, L=0
  Rn=R1=0001, Rd=R0=0000, Offset=000000000000
  Binary: 1110 0101 1000 0001 0000 0000 0000 0000
  Hex: 0xE5810000

LDR R0, [R1], R2  (post-indexed by register):
  Cond=1110, 01, I=1, P=0, U=1, B=0, W=0, L=1
  Rn=R1=0001, Rd=R0=0000, Offset=000000000010 (R2)
  Binary: 1110 0110 1001 0001 0000 0000 0000 0010
  Hex: 0xE6910002`,
      explanation: "Pre-indexed = P=1. Post-indexed = P=0. Store=L=0. Load=L=1. Word=B=0. Byte=B=1.",
    },
    examTips: [
      "L=0 = STR (store). L=1 = LDR (load). Easy mnemonic: L = Load",
      "P=1 = pre-indexed. P=0 = post-indexed.",
      "B=1 = byte (LDRB/STRB). B=0 = word (LDR/STR).",
    ],
    questions: [
      { q: "In LDR/STR encoding, what do the P and W bits control?", a: "P (bit 24): Pre/Post indexed. P=1 = pre-indexed (offset applied before access); P=0 = post-indexed (offset applied after). W (bit 21): Writeback. W=1 = update the base register Rn with the effective address; W=0 = no update." },
    ],
  },
  "encode-block": {
    title: "Block Transfer (LDM/STM) Encoding", emoji: "📋",
    tldr: "[31:28]Cond|[27:25]100|[24]P|[23]U|[22]S|[21]W|[20]L|[19:16]Rn|[15:0]RegList. STMDB R5!,{R6-R11}=0xE9250FC0.",
    explanation: `Block transfer (LDM/STM) instruction format: [31:28] Cond | [27:25] 100 | [24] P | [23] U | [22] S | [21] W | [20] L | [19:16] Rn | [15:0] Register_list.

100 at [27:25] identifies this as a block transfer.
P [24]: 0=post (after); 1=pre (before).
U [23]: 0=decrement; 1=increment.
S [22]: 0=normal registers; 1=load PSR or force user mode (special use).
W [21]: 0=no writeback; 1=writeback.
L [20]: 0=store (STM); 1=load (LDM).
Register list [15:0]: one bit per register. Bit 0=R0, bit 15=R15. Multiple bits set = multiple registers.`,
    keyPoints: [
      "Bits [27:25] = 100 (block transfer identifier)",
      "P [24]: 0=post; 1=pre",
      "U [23]: 0=decrement; 1=increment",
      "S [22]: PSR load or user mode force",
      "W [21]: writeback bit",
      "L [20]: 0=STM; 1=LDM",
      "Register list [15:0]: bit n = 1 means register Rn included",
    ],
    formula: {
      code: `STMDB R5!, {R6-R11}  (PYQ — know this encoding):
  Cond=AL=1110, 100, P=1(before), U=0(decrement), S=0, W=1, L=0
  Rn=R5=0101
  Register list: R6,R7,R8,R9,R10,R11 → bits 6-11 set
  Bits: 0000 1111 1100 0000 = 0x0FC0
  Binary: 1110 1001 0010 0101 0000 1111 1100 0000
  Hex: 0xE9250FC0

LDMIA R13!, {R0, R5-R8, R11}:
  Cond=1110, 100, P=0(after), U=1(increment), S=0, W=1, L=1
  Rn=R13=1101
  Reg list: R0=bit0, R5-R8=bits5-8, R11=bit11
  Bits: 0000 1001 1110 0001 = 0x09E1
  Binary: 1110 1000 1011 1101 0000 1001 1110 0001
  Hex: 0xE8BD09E1`,
      explanation: "Register list: set bit n for each register Rn to include. Bit 6=R6, bit 11=R11, etc.",
    },
    examTips: [
      "⚡ PYQ FAVOURITE: Encode STMDB R5!, {R6-R11} → 0xE9250FC0",
      "DB = Decrement Before = P=1, U=0",
      "Register list: R6-R11 = bits 6,7,8,9,10,11 set = 0b111111_000000 = 0x0FC0",
    ],
    questions: [
      { q: "Encode STMDB R5!, {R6-R11} in hexadecimal.", a: "0xE9250FC0. P=1(before), U=0(decrement), S=0, W=1(!), L=0(store), Rn=R5=0101. Register list R6-R11: bits 6-11 set = 0000111111000000 = 0x0FC0." },
    ],
  },
  "encode-multiply": {
    title: "Multiply Instruction Encoding", emoji: "✖️",
    tldr: "[31:28]Cond|[27:21]0000 0 A S|Rd|Rn|Rs|[7:4]1001|Rm. Signature bits [7:4]=1001 distinguish from data processing.",
    explanation: `Multiply instruction encoding: [31:28] Cond | [27:21] 0000 0 A S | [19:16] Rd | [15:12] Rn | [11:8] Rs | [7:4] 1001 | [3:0] Rm.

The signature bits [7:4]=1001 distinguish multiply from data processing instructions.
A=0: MUL (Rd = Rm × Rs). A=1: MLA (Rd = Rm × Rs + Rn).
For 64-bit: bits [27:21] = 0000 1 U A S where U=0 unsigned (UMULL), U=1 signed (SMULL). A=0 for non-accumulate, A=1 for accumulate.`,
    keyPoints: [
      "Bits [27:21] = 0000 0 A S for 32-bit multiply",
      "A=0: MUL. A=1: MLA (add Rn accumulate register)",
      "S=1: update flags. S=0: no flag update",
      "Bits [7:4] = 1001 (mandatory signature identifying as multiply)",
      "Rn [15:12] = accumulate register for MLA only",
      "For 64-bit: bits [27:21] = 0000 1 U A S",
    ],
    formula: {
      code: `Format: [31:28][27:21][19:16][15:12][11:8][7:4][3:0]
         Cond  0000 0AS  Rd     Rn     Rs   1001   Rm

MUL R0, R1, R2:
  Cond=1110, 0000000, Rd=0000, Rn=0000, Rs=0010, 1001, Rm=0001
  Binary: 1110 0000 0000 0000 0000 0010 1001 0001
  Hex: 0xE0000291

MLA R0, R1, R2, R3:
  A=1, Rn=R3=0011
  Hex: 0xE0203291

SMULL R0, R1, R2, R3 (signed 64-bit):
  [27:21] = 0000 110 (U=1 signed, A=0)
  RdLo=R0=0000, RdHi=R1=0001, Rs=R3=0011, Rm=R2=0010
  Hex: 0xE0C10392

UMLAL R0, R1, R2, R3 (unsigned accumulate):
  [27:21] = 0000 101 (U=0 unsigned, A=1 accumulate)
  Hex: 0xE0A10392`,
      explanation: "Signature [7:4]=1001 is mandatory in all multiply instructions — it's how the decoder identifies them.",
    },
    examTips: [
      "Multiply signature: bits [7:4] = 1001 (always in multiply encoding)",
      "MUL R0,R1,R2: Rd=R0, Rn=0000(unused), Rs=R2, Rm=R1",
      "64-bit: U=0=unsigned (UMULL), U=1=signed (SMULL). A=0=no accum, A=1=accumulate",
    ],
    questions: [
      { q: "What is the hex encoding of MUL R0, R1, R2?", a: "0xE0000291. Cond=1110(AL), 0000000, Rd=0000(R0), Rn=0000(unused), Rs=0010(R2), 1001(signature), Rm=0001(R1)." },
    ],
  },
  "encode-swap": {
    title: "SWAP Instruction Encoding", emoji: "🔃",
    tldr: "[31:28]Cond|[27:24]0001|[23]0|[22]B|[21:20]00|Rn|Rd|[11:8]0000|[7:4]1001|Rm. SWP R1,R2,[R3]=0xE1031092.",
    explanation: `SWAP instruction encoding: [31:28] Cond | [27:24] 0001 | [23] 0 | [22] B | [21:20] 00 | [19:16] Rn | [15:12] Rd | [11:8] 0000 | [7:4] 1001 | [3:0] Rm.

Fixed bits [27:24]=0001 and [7:4]=1001 identify it as a swap instruction.
B [22]: 0=word swap (SWP), 1=byte swap (SWPB).
Rn [19:16]: base register (memory address).
Rd [15:12]: destination register (receives old memory value).
Rm [3:0]: source register (value to write to memory).`,
    keyPoints: [
      "Bits [27:24] = 0001 (swap identifier)",
      "Bit [22] B = 0 for SWP (word), 1 for SWPB (byte)",
      "Rn [19:16] = base address register",
      "Rd [15:12] = destination (receives old mem value)",
      "Bits [11:8] = 0000 (always)",
      "Bits [7:4] = 1001 (signature, same as multiply)",
      "Rm [3:0] = source (value written to memory)",
    ],
    formula: {
      code: `Format: [31:28][27:24][23][22][21:20][19:16][15:12][11:8][7:4][3:0]
         Cond  0001   0   B   00    Rn    Rd    0000  1001   Rm

SWP R1, R2, [R3]:
  Cond=AL=1110, 0001, 0, B=0, 00, Rn=R3=0011, Rd=R1=0001, 0000, 1001, Rm=R2=0010
  Binary: 1110 0001 0000 0011 0001 0000 1001 0010
  Hex: 0xE1031092

SWPB R1, R2, [R3]:
  Same but B=1:
  Binary: 1110 0001 0100 0011 0001 0000 1001 0010
  Hex: 0xE1431092`,
      explanation: "SWP and MUL share [7:4]=1001 signature — [27:24] differentiates them: 0001=SWP vs 0000=MUL.",
    },
    examTips: [
      "SWP: [27:24]=0001, [7:4]=1001. Rn=address, Rd=destination, Rm=source to write.",
      "B=0 = word SWP. B=1 = byte SWPB.",
      "SWP R1, R2, [R3]: R1 gets old mem[R3]; mem[R3] gets R2",
    ],
    questions: [
      { q: "Encode SWP R1, R2, [R3] in hexadecimal.", a: "0xE1031092. Cond=1110, 0001, 0, B=0, 00, Rn=0011(R3), Rd=0001(R1), 0000, 1001, Rm=0010(R2)." },
    ],
  },
  "prog-sum": {
    title: "Program: Sum of N Numbers", emoji: "📟",
    tldr: "Array sum using post-indexed LDR. Word/halfword/byte variants. Counter-controlled loop.",
    explanation: `Classic array sum program. Uses post-indexed LDR to traverse the array efficiently — each load automatically advances the pointer.`,
    keyPoints: [
      "LDR with post-index: LDR R3, [R1], #4 — loads and advances",
      "For halfwords: LDRH + advance by #2",
      "For bytes: LDRB + advance by #1",
      "Loop termination: counter from 1 to 11 (10 elements)",
    ],
    formula: {
      code: `.DATA
A:   .WORD 10,20,30,40,50,60,70,80,90,100
SUM: .WORD 0

.TEXT
LDR R1, =A
LDR R2, =SUM
MOV R4, #0     ; accumulator
MOV R5, #1     ; count

L1:
    LDR R3, [R1], #4    ; load word, advance R1 by 4
    ADD R4, R4, R3      ; accumulate
    ADD R5, R5, #1
    CMP R5, #11
    BNE L1

STR R4, [R2]   ; store result
SWI 0x11

; Halfword version: LDRH R3, [R1], #2
; Byte version:     LDRB R3, [R1], #1`,
      explanation: "Sum = 550. Post-index LDR advances pointer automatically — cleaner than separate ADD.",
    },
    examTips: [
      "Post-index LDR: loads THEN advances. Perfect for sequential array traversal.",
      "Halfword: advance by 2. Byte: advance by 1. Word: advance by 4.",
    ],
    questions: [
      { q: "Why use post-indexed addressing for array traversal?", a: "LDR R3, [R1], #4 loads the value AND advances R1 in one instruction. Without post-index, you'd need separate ADD R1, R1, #4. Post-index saves one instruction per loop iteration." },
    ],
  },
  "prog-while": {
    title: "Program: C While-Loop Translation", emoji: "🔄",
    tldr: "while(save[i]==k) i++. Array index via scaled register: ADD R5, R2, R3, LSL #2.",
    explanation: `Translating a C while loop that accesses array elements. Key: computing array element address using scaled register addressing.`,
    keyPoints: [
      "Array indexing: address = base + index × element_size",
      "Scaled: ADD R5, R2, R3, LSL #2 → R5 = SAVE + i×4",
      "Loop exit condition checked at top (while)",
      "BNE EXIT: exit when save[i] ≠ k",
    ],
    formula: {
      code: `/* C: while(save[i] == k) { i += 1; } */

.DATA
K:    .WORD 5
SAVE: .WORD 5, 5, 5, 50, 35, 40

.TEXT
LDR R1, =K
LDR R0, [R1]      ; R0 = value of K = 5
LDR R2, =SAVE
MOV R3, #0        ; i = 0

LOOP:
    ADD R5, R2, R3, LSL #2   ; R5 = &SAVE[i] = SAVE + i×4
    LDR R6, [R5]              ; R6 = SAVE[i]
    CMP R0, R6                ; compare K with SAVE[i]
    BNE EXIT                  ; if SAVE[i] != K, exit
    ADD R3, R3, #1            ; i++
    CMP R3, #5
    BNE LOOP
EXIT:
    SWI 0x011`,
      explanation: "i×4 via LSL#2 since each WORD is 4 bytes. R3 ends at 3 (SAVE[3]=50≠5).",
    },
    examTips: [
      "Array index: R2 + R3, LSL #2 = base + index × 4 (for word arrays)",
      "while-loop: check condition at top, branch to exit if false",
    ],
    questions: [
      { q: "What is the value of i (R3) after this loop executes?", a: "i = 3. SAVE[0]=5=K ✓, SAVE[1]=5=K ✓, SAVE[2]=5=K ✓, SAVE[3]=50≠K → exit. Loop terminates with R3=3." },
    ],
  },
  "prog-stack": {
    title: "Program: (G+H)-(I+J) via Stack", emoji: "📚",
    tldr: "Push 4 args on stack, call function. Function reads from stack offsets. Result in R0.",
    explanation: `Function call passing arguments via stack. Push parameters, BL function, function reads from fixed SP offsets.`,
    keyPoints: [
      "Allocate stack space: SUB R13, R13, #16",
      "Store args at specific offsets from SP",
      "Function loads from same offsets",
      "Deallocate: ADD R13, R13, #16",
    ],
    formula: {
      code: `.DATA
F: .WORD 0

.TEXT
LDR R4, =F
MOV R0, #5   ; G
MOV R1, #10  ; H
MOV R2, #1   ; I
MOV R3, #4   ; J

SUB R13, R13, #16        ; allocate 4 words on stack
STR R0, [R13, #12]       ; G at SP+12
STR R1, [R13, #8]        ; H at SP+8
STR R2, [R13, #4]        ; I at SP+4
STR R3, [R13, #0]        ; J at SP+0
BL  example

STR R0, [R4]             ; store result to F
SWI 0x11

example:
    LDR R5, [R13, #0]    ; J = 4
    LDR R6, [R13, #4]    ; I = 1
    LDR R7, [R13, #8]    ; H = 10
    LDR R8, [R13, #12]   ; G = 5
    ADD R9,  R8, R7      ; G+H = 15
    ADD R10, R6, R5      ; I+J = 5
    SUB R11, R9, R10     ; (G+H)-(I+J) = 10
    MOV R0, R11          ; return value
    ADD R13, R13, #16    ; deallocate
    MOV PC, LR`,
      explanation: "Result: F = R0 = 10. Stack args at fixed offsets from SP.",
    },
    examTips: [
      "Manual stack allocation: SUB SP, SP, #n to allocate n bytes",
      "Read args from fixed SP offsets inside function",
      "Always deallocate: ADD SP, SP, #n before returning",
    ],
    questions: [
      { q: "What is the value of F after the program runs?", a: "F = 10. (G+H)-(I+J) = (5+10)-(1+4) = 15-5 = 10." },
    ],
  },
  "prog-reverse": {
    title: "Program: Reverse Array In-Place", emoji: "↔️",
    tldr: "Two pointers: left (R0=start) and right (R2=end). Swap elements, advance inward. BGE stops loop.",
    explanation: `In-place array reversal using two pointers. Classic two-pointer technique: one starts at beginning, one at end, swap and move inward until they meet.`,
    keyPoints: [
      "Left pointer R0 = base address",
      "Right pointer R2 = base + (N-1)×4",
      "Loop: swap [R0] and [R2], R0+=4, R2-=4",
      "Terminate: BGE done (left >= right)",
    ],
    formula: {
      code: `.DATA
A: .WORD 10,20,30,40,50,60
N: .WORD 6

.TEXT
LDR R0, =A           ; R0 = left pointer
LDR R1, =N
LDR R1, [R1]
SUB R1, R1, #1
MOV R1, R1, LSL #2   ; R1 = (N-1)×4
LDR R2, =A
ADD R2, R2, R1       ; R2 = right pointer (last element)

swap_loop:
    CMP  R0, R2
    BGE  done          ; if left >= right, done
    LDR  R3, [R0]      ; temp = left element
    LDR  R4, [R2]      ; load right element
    STR  R4, [R0]      ; [left] = right
    STR  R3, [R2]      ; [right] = temp
    ADD  R0, R0, #4    ; advance left pointer
    SUB  R2, R2, #4    ; retreat right pointer
    B    swap_loop
done:
    SWI  0x11
; Result: 60,50,40,30,20,10`,
      explanation: "BGE (unsigned greater or equal) stops when pointers cross. Left pointer advances, right retreats.",
    },
    examTips: [
      "Right pointer init: base + (N-1)×4. Use LSL #2 for ×4.",
      "BGE for unsigned pointer comparison (BGE = C=1 or Z=1).",
      "Swap uses 2 temps (R3, R4) and 2 STRs.",
    ],
    questions: [
      { q: "What is the final array state after reversing {10,20,30,40,50,60}?", a: "{60,50,40,30,20,10}. Two pointers swap from outside in: (10,60), (20,50), (30,40)." },
    ],
  },
  "prog-factorial": {
    title: "Program: Factorial (Recursive)", emoji: "🔁",
    tldr: "Recursive: save R0 and LR, decrement R0, BL self, restore R1 (=n), MUL R0,R1,R0. Trace: 6!=720.",
    explanation: `Recursive factorial implementation. Each recursive call saves n and LR on stack. On return, retrieves n, multiplies with factorial(n-1).`,
    keyPoints: [
      "Base case: N ≤ 1 → return 1",
      "Recursive: save R0 (=n) and LR, call factorial(n-1)",
      "On return: restore R1=n (old R0), MUL R0, R1, R0",
      "STMFD with R0 and LR; LDMFD with R1 and LR (note: R0→R1!)",
    ],
    formula: {
      code: `.DATA
N:      .WORD 6
RESULT: .WORD 0

.TEXT
LDR R1, =N
LDR R0, [R1]     ; R0 = 6
BL  factorial
LDR R1, =RESULT
STR R0, [R1]
SWI 0x11

factorial:
    CMP  R0, #1
    BLE  base_case          ; if R0 <= 1, return 1
    STMFD R13!, {R0, LR}    ; save n and return address
    SUB  R0, R0, #1
    BL   factorial           ; factorial(n-1)
    LDMFD R13!, {R1, LR}    ; R1 = n (old R0), LR = return addr
    MUL  R0, R1, R0          ; R0 = n × factorial(n-1)
    MOV  PC, LR
base_case:
    MOV  R0, #1
    MOV  PC, LR

; Stack trace for n=3:
; factorial(3): push [3, LR], call factorial(2)
;   factorial(2): push [2, LR], call factorial(1)
;     factorial(1): BLE base → return 1
;   factorial(2): pop [2, LR], R0 = 2×1 = 2, return
; factorial(3): pop [3, LR], R0 = 3×2 = 6, return
; Result: 6! = 720`,
      explanation: "Pop R0 into R1 (not R0) to preserve factorial(n-1) result in R0. Then MUL R0, R1, R0.",
    },
    examTips: [
      "Pop old R0 into R1 (not R0!) to keep factorial(n-1) in R0",
      "MUL R0, R1, R0: R0 = R1 × R0 = n × factorial(n-1)",
      "6! = 720. Stack depth = n-1 levels deep.",
    ],
    questions: [
      { q: "Why do we pop R0 into R1 (not R0) when restoring in the factorial function?", a: "After the recursive BL returns, R0 already contains factorial(n-1). If we popped into R0, we'd overwrite that result. By popping into R1, we preserve factorial(n-1) in R0 and put n in R1, then MUL R0, R1, R0 computes n×factorial(n-1)." },
    ],
  },
  "prog-strcopy": {
    title: "Program: String Copy (null-terminated)", emoji: "📋",
    tldr: "LDRB R3, [R4], #1 then STRB R3, [R5], #1. Copy until null byte (CMP R3, #0).",
    explanation: `Null-terminated string copy. Load byte, store byte, advance both pointers, loop until null is copied.`,
    keyPoints: [
      "LDRB/STRB for byte-by-byte copy",
      "Post-index advances both source and destination",
      "Loop until null byte (0x00) is copied",
      ".ASCIZ automatically appends null",
    ],
    formula: {
      code: `.DATA
STR1: .ASCIZ "PES University"
STR2: .SPACE 20

.TEXT
LDR R4, =STR1
LDR R5, =STR2

copy_loop:
    LDRB R3, [R4], #1   ; load byte from source, advance
    STRB R3, [R5], #1   ; store to dest, advance
    CMP  R3, #0
    BNE  copy_loop       ; loop until null copied

SWI 0x11
; STR2 = "PES University\0"`,
      explanation: "Copies the null terminator too — so the copy is properly null-terminated.",
    },
    examTips: [
      "Copy includes the null terminator (loop copies it, then exits)",
      "LDRB/STRB with post-index advances both pointers cleanly",
      ".SPACE n allocates uninitialized buffer for destination",
    ],
    questions: [],
  },
  "prog-bubble": {
    title: "Program: Bubble Sort", emoji: "🔢",
    tldr: "Outer loop: N-1 passes. Inner loop: compare adjacent pairs, swap if out of order. Result: ascending order.",
    explanation: `Bubble sort implementation. Outer loop counts passes, inner loop does pairwise comparisons and swaps.`,
    keyPoints: [
      "Outer loop: R8 = N-1 to 0 (number of passes)",
      "Inner loop: R1 = j counter, compare ARR[j] with ARR[j+1]",
      "Swap: if ARR[j] > ARR[j+1], exchange them",
      "BLE no_swap: skip swap if already in order",
    ],
    formula: {
      code: `.DATA
ARR: .WORD 50,10,40,20,30
N:   .WORD 5

.TEXT
LDR R8, =N
LDR R8, [R8]
SUB R8, R8, #1       ; outer loop limit = N-1

outer:
    CMP  R8, #0
    BLE  sorted
    LDR  R0, =ARR
    MOV  R1, #0       ; inner counter j

inner:
    CMP  R1, R8
    BGE  next_pass
    LDR  R2, [R0]          ; ARR[j]
    LDR  R3, [R0, #4]      ; ARR[j+1]
    CMP  R2, R3
    BLE  no_swap            ; skip if ARR[j] <= ARR[j+1]
    STR  R3, [R0]           ; swap
    STR  R2, [R0, #4]
no_swap:
    ADD  R0, R0, #4        ; advance pointer
    ADD  R1, R1, #1        ; j++
    B    inner

next_pass:
    SUB  R8, R8, #1
    B    outer

sorted:
    SWI  0x11
; Result: 10,20,30,40,50`,
      explanation: "Outer loop: N-1 passes. Inner: N-1-pass comparisons. Total: O(N²) swaps worst case.",
    },
    examTips: [
      "Outer: pass count decrements. Inner: j goes 0 to outer_limit.",
      "BLE no_swap: skip swap if already sorted (ascending bubble sort).",
    ],
    questions: [],
  },
  "prog-max": {
    title: "Program: Find Largest Element ⚠️", emoji: "🏆",
    tldr: "CMP then MOVHI R0, R4 — conditional execution instead of branch! Exam favourite.",
    explanation: `Find maximum element using conditional execution (MOVHI) instead of a branch — a key ARM exam technique.`,
    keyPoints: [
      "MOVHI R0, R4: update max only if R4 > current max (unsigned higher)",
      "No branch instruction needed — one conditional MOVHI per element",
      "R0 starts as first element (initial max)",
      "Loop through remaining N-1 elements",
    ],
    formula: {
      code: `.DATA
A: .WORD 45,12,78,34,99,23,67
N: .WORD 7

.TEXT
LDR R1, =A
LDR R2, =N
LDR R2, [R2]
LDR R0, [R1], #4    ; R0 = A[0] = initial max
SUB R3, R2, #1      ; remaining = N-1

find_loop:
    CMP   R3, #0
    BEQ   found
    LDR   R4, [R1], #4    ; next element
    CMP   R4, R0           ; compare with current max
    MOVHI R0, R4            ; if R4 > R0 (unsigned): update max
    SUB   R3, R3, #1
    B     find_loop
found:
    SWI 0x11
; R0 = 99 (maximum element)`,
      explanation: "MOVHI = conditional execute ONLY if unsigned Higher (C=1 and Z=0). Eliminates branch for max update.",
    },
    examTips: [
      "⚡ PYQ FAVOURITE: MOVHI for conditional max — know this pattern!",
      "MOVHI: unsigned higher (C=1 AND Z=0). For signed, use MOVGT.",
      "No branch = no pipeline flush = faster than branching over a MOV",
    ],
    questions: [
      { q: "Why is MOVHI used instead of a branch to update the maximum?", a: "MOVHI is a conditional instruction: it only executes if C=1 AND Z=0 (unsigned higher). This avoids a branch instruction and pipeline flush. If R4 is larger, MOVHI updates R0 = R4. If not, MOVHI is a NOP. One instruction instead of branch+MOV." },
    ],
  },
  "prog-hex-ascii": {
    title: "Program: Hex to ASCII Conversion", emoji: "🔡",
    tldr: "Extract high nibble (AND+LSR), extract low nibble (AND), add 0x30 to each → ASCII digit.",
    explanation: `Convert a hex byte to two ASCII digit characters. Upper nibble and lower nibble separately. Add 0x30 to get ASCII '0'-'9'.`,
    keyPoints: [
      "High nibble: AND with 0xF0, LSR #4",
      "Low nibble: AND with 0x0F",
      "Both nibbles: ORR with 0x30 → ASCII digit",
      "Assumes nibble values 0-9 (no A-F handling here)",
    ],
    formula: {
      code: `; Convert 0x54 → ASCII '5' (0x35) and '4' (0x34)

.DATA
X: .WORD 0, 0

.TEXT
LDR R3, =X
MOV R1, #0x54

; Extract HIGH nibble (upper 4 bits)
AND R0, R1, #0xF0     ; R0 = 0x50 (mask lower)
MOV R0, R0, LSR #4    ; R0 = 0x05 (shift right 4)
ORR R0, R0, #0x30     ; R0 = 0x35 = ASCII '5'
STR R0, [R3]

; Extract LOW nibble (lower 4 bits)
AND R2, R1, #0x0F     ; R2 = 0x04
ORR R2, R2, #0x30     ; R2 = 0x34 = ASCII '4'
ADD R3, R3, #4
STR R2, [R3]

SWI 0x11`,
      explanation: "0x30 is ASCII '0'. Adding 0x30 to digit 4 gives ASCII '4' = 0x34. Simple digit→ASCII conversion.",
    },
    examTips: [
      "ASCII digit n = 0x30 + n. ASCII '0'=0x30, '1'=0x31, ..., '9'=0x39.",
      "High nibble: AND 0xF0, then LSR #4. Low nibble: AND 0x0F directly.",
    ],
    questions: [],
  },
  "prog-nested": {
    title: "Program: Nested Procedure (ADDFun+MULFun)", emoji: "🔗",
    tldr: "Push 3 args, call ADDFun. ADDFun pops, adds two, saves result+arg+LR, calls MULFun. Stack management critical.",
    explanation: `Nested procedure call example. Outer function (ADDFun) calls inner function (MULFun). Must carefully save/restore LR at each level.`,
    keyPoints: [
      "Push 3 args: R1=11, R2=10, R3=2 onto stack",
      "ADDFun: pop 3 args, add R4+R5=21, push result+R6+LR",
      "Call MULFun: pop 2 values, multiply",
      "Careful LR management at each level",
    ],
    formula: {
      code: `.DATA
A: .WORD 0

.TEXT
LDR  R4, =A
MOV  R1, #11
MOV  R2, #10
MOV  R3, #2
STMFD R13!, {R1,R2,R3}   ; push args
BL   ADDFun
STR  R0, [R4]
SWI  0x11

ADDFun:
    LDMFD R13!, {R4,R5,R6}       ; pop: R4=11, R5=10, R6=2
    ADD   R0, R4, R5              ; R0 = 11+10 = 21
    STMFD R13!, {R0,R6,LR}       ; save result, R6, LR for nested call
    BL    MULFun
    LDMFD R13!, {LR}              ; restore LR (result already in R0)
    MOV   PC, LR

MULFun:
    LDMFD R13!, {R4,R5}
    MUL   R0, R4, R5              ; R0 = 21 × 2 = 42
    MOV   PC, LR`,
      explanation: "Result: A = 42 = (11+10) × 2. Note the careful LR save/restore in ADDFun.",
    },
    examTips: [
      "ADDFun must save LR before calling MULFun (BL will overwrite LR)",
      "LDMFD R13!, {LR} restores LR after MULFun returns",
      "Order matters: STMFD pushes in reverse register-number order",
    ],
    questions: [],
  },
  "prog-print-string": {
    title: "Program: Print String via SWI", emoji: "🖨️",
    tldr: "Loop: LDRB R0,[R1],#1. SWINE 0x00 prints each char. CMP R0,#0 detects null. Or: LDR R0,=MSG; SWI 0x02.",
    explanation: `Two methods to print a null-terminated string: character-by-character loop using SWI 0x00, or single-call using SWI 0x02.`,
    keyPoints: [
      "Method 1: LDRB then SWINE 0x00 per character",
      "Method 2: LDR R0, =MSG then SWI 0x02 (entire string)",
      "SWINE: conditional SWI — only executes if Z=0 (not null)",
      "Loop exits when CMP R0, #0 is true (Z=1)",
    ],
    formula: {
      code: `.DATA
A: .ASCIZ "HELLO WORLD"

.TEXT

; Method 1: character-by-character
LDR R1, =A
LOOP:
    LDRB R0, [R1], #1    ; load char, advance
    CMP  R0, #0           ; check for null
    SWINE 0x00            ; if not null, print char in R0
    BNE  LOOP             ; loop back if not null
SWI 0x11

; Method 2: print entire string at once
LDR R0, =A
SWI 0x02   ; print string at address R0
SWI 0x11`,
      explanation: "Method 2 is cleaner. Method 1 gives control over each character (e.g., could modify before printing).",
    },
    examTips: [
      "SWINE = conditional SWI. Only runs if Z=0 (previous CMP found non-null).",
      "SWI 0x02: R0 must hold ADDRESS of string (not the string itself).",
      "SWI 0x00: R0 must hold ASCII VALUE of character to print.",
    ],
    questions: [],
  },
  "mcq-revision": {
    title: "Quick MCQ Revision", emoji: "⚡",
    tldr: "All key facts for MCQ/short-answer questions — pipeline, registers, encodings, modes, conventions.",
    explanation: `Fast-revision reference for all frequently-tested facts in MPCA Unit 1.`,
    keyPoints: [
      "ARM pipeline stages: Fetch → Decode → Execute",
      "PC at execute time: instruction_address + 8",
      "Load-store architecture: no memory operands in arithmetic",
      "SPSR purpose: preserve CPSR during mode switch",
      "Which shift preserves sign bit? ASR",
      "Post-indexing: base register updated AFTER access",
      "MOV PC, LR purpose: return from subroutine",
      ".WORD reserves: 4 bytes",
      "FD push instruction: STMDB",
      "FD pop instruction: LDMIA",
      "SWI switches to: Supervisor (SVC) mode",
      "SWI vector address: 0x00000008",
      "UMULL outputs to: 2 registers (RdLo, RdHi)",
      "Conditional exec vs branch: better for ≤3 instructions",
      "Block transfer side effect: increases interrupt latency",
      "S bit (bit 20) does: updates CPSR condition codes",
      "MOV opcode: 1101",
      "AL condition binary: 1110",
      "Read CPSR into register: MRS Rd, CPSR",
      "Safely modify CPSR: MRS → Modify → MSR",
      "John Cocke (1974): 20/80 rule. David Patterson: coined 'RISC'",
      "Thumb state instruction size: 16-bit",
      "FIQ banks extra: R8-R12 + R13, R14, SPSR",
      "MUL Rd, Rm, Rs: Rd must differ from Rm",
      "3 RISC features ARM rejected: Register Windows, Delayed Branches, Single-cycle ALL",
      "ARM 3-address format: Rd, Rn, Op2 all independently specified",
      "CISC control unit: microprogrammed. RISC control unit: hard-wired",
    ],
    formula: {
      code: `Key Encodings (memorise these):
  ADD R1, R0, R2      → 0xE0801002
  EORNES R0, R1, R2   → 0x00310002
  STMDB R5!,{R6-R11}  → 0xE9250FC0
  BL fwd (offset=3)   → 0xEB000003
  BL bwd (offset=-5)  → 0xEBFFFFFB
  MUL R0, R1, R2      → 0xE0000291
  SWP R1, R2, [R3]    → 0xE1031092
  STR R0, [R1]        → 0xE5810000

Exception vectors:
  Reset=0x00, Undef=0x04, SWI=0x08
  Prefetch=0x0C, DataAbort=0x10
  IRQ=0x18, FIQ=0x1C (note: 0x14 reserved!)`,
      explanation: "All PYQ encodings in one place. Practice deriving these from scratch.",
    },
    examTips: [
      "⚡ 3 RISC features ARM rejected: Register Windows, Delayed Branches, Single-cycle ALL",
      "⚡ 6 key ARM features: 32-bit, load-store, 3-address, conditional exec, LDM/STM, barrel shifter",
      "⚡ MOVHI for conditional max — no branch needed",
      "⚡ PC+8 rule for all branch encoding calculations",
    ],
    questions: [
      { q: "What are the 3 RISC features ARM rejected and why?", a: "1. Register Windows — too much chip area. 2. Delayed Branches — bad for superscalar and branch prediction. 3. Single-cycle for ALL instructions — load/store needs ≥2 cycles; Harvard arch too costly." },
      { q: "What are the 6 key features of the ARM instruction set?", a: "1. All instructions 32-bit wide. 2. Load-store architecture. 3. 3-address data processing format. 4. Conditional execution of every instruction. 5. LDM/STM block transfer. 6. Barrel shifter + ALU in one cycle." },
    ],
  },
};

