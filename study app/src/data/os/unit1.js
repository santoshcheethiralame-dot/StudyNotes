// Auto-extracted from unit1.jsx — COMPREHENSIVE UPDATE with all PYQs, solved problems, IPC, deeper explanations
export const groups = [
  { name: "🖥️ OS Fundamentals", ids: ["os-overview", "os-goals", "os-definition"] },
  { name: "🔌 Computer Organization", ids: ["bootstrap-interrupts", "storage-struct", "io-dma"] },
  { name: "🏗️ System Architecture", ids: ["multiprocessor", "multicore-cluster", "dual-mode-timer"] },
  { name: "⚙️ OS Structure", ids: ["multiprog-multitask", "os-services", "syscalls", "policy-mechanism"] },
  { name: "📊 Kernel Data Structures", ids: ["arrays-lists", "stacks-queues-trees", "hash-bitmap"] },
  { name: "🌐 Computing Environments", ids: ["trad-mobile", "client-server-p2p", "virt-cloud"] },
  { name: "🔄 Process Concept", ids: ["process-concept", "pcb-states", "schedulers-types", "context-switch"] },
  { name: "🛠️ Process Operations", ids: ["process-creation", "process-termination", "ipc-models", "io-lifecycle"] },
  { name: "📅 CPU Scheduling Basics", ids: ["sched-criteria", "preemptive-dispatcher"] },
  { name: "🗓️ Scheduling Algorithms", ids: ["fcfs-sched", "sjf-srtf", "priority-sched", "round-robin", "multilevel-q"] },
  { name: "🖧 Advanced Scheduling", ids: ["multiproc-sched", "affinity-loadbal", "linux-cfs", "windows-sched"] },
  { name: "🐚 Shell & Cron", ids: ["shell-intro", "env-vars", "shell-basics", "cron"] },
];

export const topics = {
  "os-overview": {
    title: "Need for OS & Overview", emoji: "🖥️",
    tldr: "OS = intermediary between user and hardware. Without it, programmers would need hardware knowledge to run any program.",
    explanation: `Without an OS, every application developer would need to directly program hardware — writing low-level code to control the CPU, memory, disk, and I/O devices manually. That's impractical and dangerous.

The OS solves this by acting as an intermediary — sitting between the user/application and the raw hardware, providing a clean, safe, and convenient interface.

4 Components of a Computer System (layered from bottom to top):
1. Hardware — provides basic computing resources (CPU, memory, I/O devices)
2. Operating System — controls and coordinates hardware use among applications/users
3. Application Programs — use system resources to solve user problems (word processors, browsers, games)
4. Users — people, machines, or other computers

Two Perspectives:
• User view: convenience, ease of use, performance. Don't care how resources are managed.
• System view: resource allocator + control program. Manages CPU time, memory space, I/O devices. Prevents errors and improper use.

Think of the OS like a mall manager — users are shoppers, applications are stores, and the OS makes sure everyone gets their fair share of the space (resources) without stepping on each other's feet.`,
    keyPoints: [
      "OS = intermediary between user and hardware",
      "Without OS: hardware knowledge mandatory for any programming",
      "4 components (bottom to top): Hardware → OS → Application Programs → Users",
      "User view: convenience, ease of use, performance",
      "System view: OS is a resource allocator AND a control program",
      "Resource allocator: manages CPU, memory, I/O; decides conflicting requests",
      "Control program: controls execution to prevent errors and improper use",
      "Mainframe/shared systems: maximize resource utilization",
      "Embedded systems: little or no user interface, optimized for specific task",
    ],
    formula: null,
    examTips: [
      "OS = intermediary — this exact phrase comes up in exams",
      "Two roles: Resource Allocator + Control Program (know both)",
      "4 components: Hardware, OS, Application Programs, Users — memorize the order",
      "Shared system goal = maximize utilization. Personal system goal = maximize convenience",
    ],
    questions: [
      { q: "What are the three main purposes of an OS? (PYQ)", a: "1. Convenience — Provides an environment that makes the computer convenient to use. Abstracts hardware complexity away from users and applications. 2. Efficiency — Manages and allocates hardware resources (CPU, memory, I/O) fairly and efficiently among competing users/processes. 3. Ability to Evolve — The OS must be structured so new system functions can be introduced without disrupting existing services." },
      { q: "What are the two main roles of an OS from the system's perspective?", a: "1. Resource Allocator: manages all hardware resources (CPU, memory, I/O), decides between conflicting requests for efficient and fair use. 2. Control Program: controls execution of programs to prevent errors and improper/unauthorized use of the computer." },
      { q: "Why do we need an OS at all?", a: "Without an OS, every programmer would need direct hardware knowledge to write programs. The OS abstracts hardware complexity, provides a convenient interface, ensures security, and manages resources so applications can run without worrying about hardware details." },
    ],
  },

  "os-goals": {
    title: "OS Goals & Types of OS", emoji: "🎯",
    tldr: "OS goals: execute programs, convenient to use, efficient hardware use. 5 types: Batch, Time-sharing, Real-time, Distributed, Embedded.",
    explanation: `Operating System Goals:
1. Execute user programs and make solving user problems easier
2. Make the computer system convenient to use
3. Use the computer hardware in an efficient manner
4. Manage resources: Memory, Processor(s), I/O Devices

Need for Different Types of OS — each exists because different environments have different priorities:

1. Batch OS: No user interaction during execution. Jobs collected, submitted in batches. Example: payroll processing, scientific computation. Goal: maximize throughput.

2. Time-sharing OS (Multitasking): CPU switches so fast between users that each feels they have dedicated machine. Response time < 1 second. Example: Unix, Linux. Goal: quick response time.

3. Real-time OS: Strict timing constraints — must respond within a guaranteed deadline. Two types: Hard real-time (miss deadline = disaster, e.g., missile guidance), Soft real-time (miss deadline = degraded but OK, e.g., video streaming).

4. Distributed OS: Multiple computers networked together, appearing as one system to the user. Resources shared across machines. Example: Google's cluster OS.

5. Embedded OS: Designed for devices with limited resources and fixed purpose. Little or no UI. Example: washing machine controller, car ECU, microwave.`,
    keyPoints: [
      "Goal 1: Execute user programs, make problem-solving easier",
      "Goal 2: Make the computer convenient to use",
      "Goal 3: Use hardware efficiently",
      "Goal 4: Manage resources (Memory, CPU, I/O)",
      "Batch OS: no interaction, maximize throughput (payroll, science)",
      "Time-sharing OS: interactive, response < 1 sec (Unix, Linux)",
      "Real-time OS: guaranteed deadlines (missile guidance, medical)",
      "Hard real-time: missing deadline = system failure",
      "Soft real-time: missing deadline = degraded performance",
      "Distributed OS: multiple computers as one system",
      "Embedded OS: minimal resources, fixed function (microwaves, cars)",
    ],
    formula: null,
    examTips: [
      "OS Goals: Execute programs, Convenience, Efficiency, Resource management — all 4",
      "Know all 5 types of OS with examples — PYQ standard question",
      "Hard real-time vs Soft real-time: hard = deadline miss = failure",
      "Embedded OS: most prevalent form of computing today",
    ],
    questions: [
      { q: "What is privileged mode of operation? What is the need for different types of OS? (PYQ)", a: "Privileged mode (kernel mode) is a CPU execution mode where all instructions can execute, including privileged ones (I/O, setting timer, modifying interrupt vectors, halting CPU). User programs run in user mode where these are blocked. Dual-mode protects the OS from errant/malicious user code.\n\nNeed for different types: 1. Batch OS: No interaction needed (payroll, scientific). Maximizes throughput. 2. Time-sharing OS: Interactive multi-user (Unix). Quick response. 3. Real-time OS: Strict timing (industrial control, medical). Guaranteed deadline. 4. Distributed OS: Networks as one system. Resource sharing. 5. Embedded OS: Specialized devices (microwaves, cars). Minimal resources, fixed functions." },
      { q: "List the 4 main goals of an Operating System.", a: "1. Execute user programs and make solving user problems easier. 2. Make the computer system convenient to use. 3. Use computer hardware in an efficient manner. 4. Manage resources: Memory, Processor(s), I/O Devices." },
    ],
  },

  "os-definition": {
    title: "Defining OS — Kernel, System Programs", emoji: "🧠",
    tldr: "Kernel = the ONE program always running. System programs ship WITH the OS. Everything else = application programs.",
    explanation: `The OS is hard to define precisely because it does so many things. The common thread: controlling and allocating resources.

The KERNEL is the core of the OS — it is the ONE program running at ALL times. Everything else is either:
• System program: ships with the OS (shells, compilers, ls, cp, grep, gcc)
• Application program: installed by the user (Chrome, VS Code, games)

Analogy: kernel = the engine of a car. System programs = the dashboard, wheels, steering (come with the car). Applications = what you choose to load in the trunk.

Key OS Principle: Policy vs Mechanism
• Policy: WHAT will be done (e.g., "user gets at most 30 minutes of CPU")
• Mechanism: HOW to do it (e.g., the timer hardware + counter)

Separating them = maximum flexibility. You can change the policy without changing the mechanism. Example: the timer (mechanism) works the same whether the policy is "10ms quantum" or "100ms quantum". You just change the setting, not the hardware.`,
    keyPoints: [
      "Kernel = 'the one program running at all times' — heart of the OS",
      "System programs: ship with OS (ls, cp, shells, compilers)",
      "Application programs: installed separately (browsers, games)",
      "OS common functions = controlling + allocating resources",
      "Policy: WHAT to do. Mechanism: HOW to do it.",
      "Separation of Policy and Mechanism = maximum flexibility",
      "Example: timer is a mechanism. 'Limit user to 30 min' is a policy.",
    ],
    formula: {
      code: `Software Layer Model:
  ┌─────────────────────────────┐
  │      User Applications      │  ← MS Word, Chrome, Games
  ├─────────────────────────────┤
  │      System Programs        │  ← ls, cp, bash, gcc (ship with OS)
  ├─────────────────────────────┤
  │         KERNEL              │  ← THE one always-running program
  ├─────────────────────────────┤
  │         Hardware            │  ← CPU, RAM, Disk, I/O
  └─────────────────────────────┘

Policy vs Mechanism Example:
  Timer mechanism: hardware that generates interrupt after N ms
  Policy A: "Interrupt every 10ms" (interactive system)
  Policy B: "Interrupt every 1000ms" (batch system)
  Changing policy does NOT require changing the timer hardware.`,
      explanation: "Kernel is always running. Changing policy ≠ changing mechanism — they're independent.",
    },
    examTips: [
      "Kernel = the ONE program always running (not the whole OS, just the kernel)",
      "Policy = WHAT. Mechanism = HOW. They are SEPARATE by design.",
      "System programs ship WITH the OS. Application programs are separate.",
      "'Separation of policy from mechanism allows maximum flexibility' — quote this in exams",
    ],
    questions: [
      { q: "What is the kernel?", a: "The kernel is the one program running at all times on the computer. It is the core of the OS. Everything else is either a system program (ships with OS) or an application program (installed separately)." },
      { q: "Give an example of Policy vs Mechanism.", a: "Mechanism: a timer that can be set to any interval. Policy: 'interrupt every 10ms for interactive users' or 'interrupt every 100ms for batch jobs'. The timer (mechanism) is the same — only the setting (policy) changes." },
    ],
  },

  "bootstrap-interrupts": {
    title: "Bootstrap, Interrupts & I/O Operation", emoji: "🔌",
    tldr: "Bootstrap = first program at boot, stored in ROM. Interrupts = OS is event-driven. Interrupt vector = lookup table for ISRs. DMA = block transfer without per-byte CPU.",
    explanation: `Bootstrap Program:
When the system is powered on or rebooted, the very first program that runs is the Bootstrap (also called firmware). It lives in ROM (Read-Only Memory) or EEPROM — non-volatile memory that survives power-off. It initializes all system components (CPU registers, device controllers, memory) and then loads the OS kernel from disk into RAM. After loading, the OS starts the first process: init (PID 1 on Linux).

Think of it like: your phone's bootloader. Before Android or iOS, a small program wakes the phone up and loads the main OS.

Interrupts — How devices talk to the CPU:
The OS is interrupt-driven — it reacts to events rather than constantly polling. When a device finishes its job (e.g., disk read complete), it raises an interrupt signal on the system bus. The CPU:
1. Completes its current instruction
2. Saves current state (registers + PC)
3. Looks up the interrupt number in the interrupt vector (a table mapping interrupt numbers → ISR addresses)
4. Jumps to the ISR (Interrupt Service Routine) — the handler code
5. After ISR completes, restores state and resumes the original program

Hardware interrupt: device sends signal via system bus (e.g., disk done, key pressed)
Software interrupt (trap/exception): triggered by a system call OR an error (divide by zero, invalid memory access)

I/O Structure:
Each device has a controller with a local buffer. CPU moves data between main memory and these local buffers. The controller signals completion via interrupt.

DMA (Direct Memory Access): For high-speed I/O (disks, network), making the CPU transfer data byte-by-byte is wasteful. Instead, the DMA controller transfers entire blocks between the device buffer and main memory directly — the CPU only gets ONE interrupt per block (not one per byte). This frees the CPU to do real work while data is being transferred.`,
    keyPoints: [
      "Bootstrap: first program at boot, stored in ROM/EEPROM (firmware)",
      "Bootstrap: initializes CPU registers, device controllers, memory",
      "Bootstrap: locates and loads OS kernel into memory",
      "First process after OS boot: init (PID 1 on Linux)",
      "OS is interrupt-driven (reacts to events, doesn't poll)",
      "Interrupt vector: table containing addresses of all ISRs",
      "ISR (Interrupt Service Routine): the code that handles each interrupt type",
      "OS must save CPU state (registers + PC) before handling interrupt",
      "Trap/Exception: software-generated interrupt (error or system call)",
      "Device controller notifies CPU via interrupt when I/O completes",
      "DMA: block transfer from device to RAM, ONE interrupt per block (not per byte)",
    ],
    formula: {
      code: `Boot Sequence:
  Power ON
    → ROM Bootstrap program executes
    → Initializes CPU registers, memory, device controllers
    → Loads OS Kernel from disk into RAM
    → OS starts; creates 'init' process (PID=1)
    → System ready for use

Interrupt Flow:
  Device finishes I/O
    → Device controller raises interrupt signal on bus
    → CPU completes current instruction
    → CPU saves state (registers + PC)
    → CPU reads interrupt vector → gets ISR address
    → Jumps to ISR → handles interrupt
    → Restores CPU state → resumes original program

Interrupt Vector (conceptual):
  [0] → ISR for timer interrupt
  [1] → ISR for keyboard interrupt
  [2] → ISR for disk completion
  [14] → ISR for page fault (x86)

DMA vs Programmed I/O:
  Programmed I/O: CPU reads 1 byte → stores → reads next byte... (1 interrupt per byte)
  DMA:            Controller transfers entire block → CPU gets 1 interrupt per block ✓`,
      explanation: "Interrupt vector = lookup table. Interrupt number → ISR address. DMA frees CPU for useful work during large transfers.",
    },
    examTips: [
      "Bootstrap stored in ROM/EEPROM — NOT on hard disk (survives power-off)",
      "Interrupt vector = table of ISR addresses (NOT the ISR itself)",
      "Trap = software interrupt. Hardware interrupt = from device.",
      "OS saves state BEFORE handling interrupt (otherwise current process is corrupted)",
      "'The OS is interrupt-driven' — this exact phrase is exam material",
      "DMA = ONE interrupt per BLOCK (not per byte) — huge efficiency gain",
    ],
    questions: [
      { q: "Why is the bootstrap program stored in ROM/EEPROM?", a: "ROM/EEPROM is non-volatile — it retains its contents even when power is off. The bootstrap must be available immediately at power-on before any disk I/O can occur, so it can't be on the hard drive. It must be in a location the CPU can read instantly after reset." },
      { q: "What is the difference between an interrupt and a trap?", a: "An interrupt is a hardware signal from a device (e.g., I/O completion, timer expiry). A trap (or exception) is a software-generated interrupt caused by a program error (divide by zero, invalid memory access) or an explicit system call request. Both are handled similarly — CPU saves state, consults interrupt vector, jumps to ISR." },
      { q: "What is DMA and why is it needed?", a: "DMA (Direct Memory Access) allows a device controller to transfer entire blocks of data directly between the device buffer and main memory WITHOUT the CPU being involved for each byte. The CPU only receives ONE interrupt per block (not per byte). This is critical for high-speed devices like disks — without DMA, the CPU would waste nearly all its time moving individual bytes." },
    ],
  },

  "storage-struct": {
    title: "Storage Structure & Hierarchy", emoji: "💾",
    tldr: "Storage hierarchy: Registers → Cache → RAM → SSD → HDD → Tape. Faster = smaller + costlier. Caching = copy data to faster storage temporarily.",
    explanation: `Main Memory: The only large storage the CPU can directly access. Implemented with DRAM — volatile (loses content on power off). ROM and EEPROM are non-volatile but small (used for firmware).

Von Neumann Model: Fetch instruction from memory → Decode → Execute → repeat. This fetch-decode-execute cycle is the fundamental operation of all modern computers.

Storage Hierarchy (from fastest/smallest/most expensive to slowest/largest/cheapest):
Registers → Cache (L1/L2/L3) → Main Memory (RAM) → SSD → Hard Disk → Optical Disk → Magnetic Tape

The Rule: higher up = faster, smaller, costlier, and more volatile.

Real-world analogy: it's like how you work. What you're actively thinking about = registers (instant access). Sticky notes on your desk = cache (fast, small). Your desk drawer = RAM. Filing cabinet = SSD/HDD. Offsite storage = tape.

Caching: Copy frequently used data from slower storage to faster storage. Check cache first:
• Cache hit: data found → use it directly (fast!)
• Cache miss: fetch from slower storage → put in cache → use it

Cache management (size + replacement policy like LRU) is a critical OS design problem. Cache coherence is also a challenge in multiprocessor systems — if two CPUs cache the same data and one modifies it, the other's cache is now stale.`,
    keyPoints: [
      "Main memory = only storage CPU accesses directly. DRAM = volatile.",
      "Von Neumann: Fetch → Decode → Execute → repeat (instruction cycle)",
      "Storage hierarchy: Registers > Cache > RAM > SSD > HDD > Optical > Tape",
      "Hierarchy tradeoff: faster = smaller, more expensive, more volatile",
      "Cache: copy of data from slower storage in faster storage",
      "Cache hit: data found in cache → fast. Cache miss: go to slower storage.",
      "Secondary storage: non-volatile, large capacity (HDD/SSD)",
      "Cache coherence: multiprocessor challenge — stale cache after write by other CPU",
    ],
    formula: {
      code: `Storage Hierarchy (fastest → slowest):
  ┌────────────────────────────────────────────────┐
  │ Registers    │ < 1ns    │ KBs      │ Volatile  │
  │ Cache L1     │ ~1ns     │ 32KB     │ Volatile  │
  │ Cache L2/L3  │ ~10ns    │ MBs      │ Volatile  │
  │ Main Memory  │ ~100ns   │ GBs      │ Volatile  │
  │ SSD          │ ~0.1ms   │ GBs-TBs  │ Non-vol   │
  │ Hard Disk    │ ~10ms    │ TBs      │ Non-vol   │
  │ Magnetic Tape│ minutes  │ PBs      │ Non-vol   │
  └────────────────────────────────────────────────┘

Caching Strategy:
  1. Check cache for data X
  2. Hit? → Use it directly (fast!)
  3. Miss? → Load from RAM/disk into cache → use it

Cache Coherence Problem (multiprocessor):
  CPU1 caches value A = 5
  CPU2 caches value A = 5
  CPU1 writes A = 10 (to its cache)
  CPU2 still reads A = 5 (STALE! Wrong!)
  Solution: cache coherence protocol (e.g., MESI)`,
      explanation: "Main memory is cached by CPU cache. Cache is a smaller, faster copy of what's in RAM. Coherence is tricky in multi-CPU systems.",
    },
    examTips: [
      "DRAM = main memory = volatile. ROM/EEPROM = non-volatile (firmware)",
      "Registers → Cache → RAM → SSD → HDD → Tape: know this order cold",
      "Von Neumann: Fetch, Decode, Execute — the instruction cycle",
      "Cache hit = data found in fast storage. Cache miss = must go to slow storage.",
      "Cache coherence = major challenge in multiprocessor systems",
    ],
    questions: [
      { q: "Why is main memory described as volatile?", a: "Main memory (DRAM) loses all its contents when power is removed. Data must be saved to non-volatile secondary storage (HDD/SSD) to persist across power cycles." },
      { q: "What is the Von Neumann model?", a: "The fundamental instruction execution cycle: the processor fetches an instruction from memory, decodes it, executes it, then repeats. This Fetch-Decode-Execute cycle continues until the program terminates. It is the basis of modern computer operation." },
      { q: "What is cache coherence and why is it challenging?", a: "Cache coherence means ensuring that when multiple CPUs each have their own cache of shared data, all caches see the same (consistent) value. It's challenging because one CPU can modify its cache copy without the other CPU knowing. Solutions like the MESI protocol use messages between CPUs to invalidate stale copies when data is modified." },
    ],
  },

  "io-dma": {
    title: "I/O Structure & DMA", emoji: "📡",
    tldr: "Each device has a controller with local buffer. DMA: controller transfers full blocks to RAM without CPU. One interrupt per block (not per byte).",
    explanation: `I/O Structure:
A large portion of OS code manages I/O. A computer has CPUs + multiple device controllers connected via a common bus. Each device controller manages a specific device type (disk, keyboard, printer) and has local buffer storage + registers. A device driver provides a uniform interface between the controller and the OS kernel.

Two modes of I/O:
Synchronous I/O: after I/O starts, control returns to user only after I/O completes. CPU waits (idles) — only one I/O at a time. Simple but wasteful.

Asynchronous I/O: after I/O starts, control returns to user program immediately without waiting for I/O to complete. The user program can do other work. When I/O completes, the device notifies the OS via interrupt.

DMA (Direct Memory Access):
Without DMA (programmed I/O): CPU reads one byte at a time from device, stores in memory. For a 1MB file → 1 million CPU cycles wasted just moving data!

With DMA: the DMA controller takes over. CPU tells DMA: "Transfer this block from disk to memory address X". DMA does it while CPU does other useful work. ONE interrupt at the end signals completion. Critical for high-speed devices like disks and network cards.`,
    keyPoints: [
      "Each device has a controller with a local buffer",
      "Device driver = software interface between OS and controller",
      "Synchronous I/O: CPU waits until I/O done → simple but wastes CPU",
      "Asynchronous I/O: I/O starts, CPU continues → interrupt when done",
      "DMA: controller transfers entire blocks between device and memory",
      "DMA benefit: CPU is freed during transfer — ONE interrupt per block",
      "Without DMA: one interrupt (or CPU stall) per byte — terrible for large transfers",
      "System bus: common pathway connecting CPUs, memory, and device controllers",
    ],
    formula: {
      code: `System Architecture:
  ┌──────┐   ┌──────┐   ┌──────┐
  │ CPU  │   │ CPU  │   │ DMA  │
  └──┬───┘   └──┬───┘   └──┬───┘
     │           │           │
  ═══╪═══════════╪═══════════╪══ System Bus
     │           │           │
  ┌──┴───┐   ┌──┴──┐   ┌────┴────────┐
  │Memory│   │ I/O │   │Device Ctrl  │
  │      │   │Ctrl │   │(disk, net)  │
  └──────┘   └─────┘   └─────────────┘

DMA Transfer:
  CPU: "DMA, copy 1MB from disk to memory[0x8000]"
  DMA: *silently transfers 1MB while CPU runs other things*
  DMA: [interrupt] "Done!"
  CPU: 1 interrupt handled. Back to work.

Programmed I/O (no DMA):
  for each byte: CPU reads → stores → reads → stores...
  1MB = 1,048,576 interrupts or stalls. Terrible!`,
      explanation: "DMA = 'fire and forget' for large data transfers. CPU gets back just 1 interrupt per block.",
    },
    examTips: [
      "DMA = ONE interrupt per BLOCK (key fact for exam)",
      "Without DMA: CPU involved per byte = terrible efficiency",
      "Device controller has LOCAL BUFFER (not same as main memory)",
      "Synchronous = wait. Asynchronous = continue, interrupt when done.",
    ],
    questions: [
      { q: "What is the difference between synchronous and asynchronous I/O?", a: "Synchronous I/O: the process is blocked until the I/O operation completes. Control only returns to the user program after I/O is done. Simple, but CPU is idle. Asynchronous I/O: the I/O operation is started and control immediately returns to the user program. The process can continue doing other work. When I/O completes, the OS is notified via an interrupt." },
      { q: "Why is DMA important for system performance?", a: "Without DMA, the CPU must be involved in every byte transfer between device and memory, wasting enormous processing time on data movement. With DMA, the DMA controller handles entire block transfers autonomously while the CPU runs other processes. Only one interrupt per block is generated, drastically reducing CPU overhead for large I/O operations like disk reads." },
    ],
  },

  "multiprocessor": {
    title: "Computer System Architecture", emoji: "🏗️",
    tldr: "Single processor: one CPU. Multiprocessor: multiple CPUs sharing memory. AMP = boss-worker. SMP = all peers. Multi-core = multiple cores per chip.",
    explanation: `Single-Processor Systems: One general-purpose CPU. May also have special-purpose processors (disk, keyboard, graphics controllers) but these are managed by the OS and are not general-purpose.

Multiprocessor Systems (Parallel / Tightly-coupled):
Multiple CPUs sharing the same physical memory and system bus. Also called parallel systems or tightly-coupled systems.

Advantages:
1. Increased throughput: more work in less time
2. Economy of scale: shared resources (memory, I/O) → cheaper than multiple single-processor systems
3. Increased reliability: if one CPU fails, others continue (fault tolerance / graceful degradation)

Two types of multiprocessing:
1. Asymmetric Multiprocessing (AMP): Boss-worker model. One master processor controls the system and assigns work to slave processors. Each slave does specific tasks. Simple but master is a bottleneck.

2. Symmetric Multiprocessing (SMP): All processors are peers. Each processor has its own registers and private cache, but all share physical memory. Each processor runs its own copy of the OS kernel. ALL modern OSes (Linux, Windows, macOS) use SMP. More complex but no bottleneck.

Multi-Core Design:
Multiple cores on a single chip. On-chip communication (between cores) is much faster than between separate chips (uses the same bus). Significantly less power than multiple single-core chips. A 4-core CPU is NOT the same as 4 separate CPUs.

Blade Servers: Multiple processor/IO/networking boards in one chassis. Each blade boots independently with its own OS. Used in data centers.`,
    keyPoints: [
      "Single-processor: one general-purpose CPU + special-purpose processors",
      "Multiprocessor advantages: throughput, economy of scale, reliability",
      "AMP: boss-worker. Master assigns, slaves execute. Master is bottleneck.",
      "SMP: all processors are peers, share memory. All modern OSes use SMP.",
      "Multi-core: multiple cores on ONE chip. On-chip comm faster than between chips.",
      "Clustered systems: multiple machines connected via SAN (Storage Area Network)",
      "Asymmetric clustering: one machine in hot-standby",
      "Symmetric clustering: multiple nodes running apps, monitoring each other",
      "DLM (Distributed Lock Manager): prevents conflicting operations on shared storage",
    ],
    formula: {
      code: `AMP vs SMP:
  AMP:
    [Master CPU] ──→ [Slave CPU 1] (handles disk I/O)
              ──→ [Slave CPU 2] (handles network)
              ──→ [Slave CPU 3] (handles user tasks)
    Problem: Master is a bottleneck!

  SMP:
    [CPU 0] ← → [CPU 1] ← → [CPU 2] ← → [CPU 3]
    All connected to shared memory
    All run same OS kernel
    All pick from same ready queue
    More efficient, no bottleneck!

Multi-core vs Multi-chip:
  4-core chip: cores share L3 cache, communicate via fast on-chip bus
  4 single-core chips: communicate via slower system bus
  Multi-core wins on speed AND power consumption!

Check your machine:
  cat /proc/cpuinfo | more  (Linux)`,
      explanation: "SMP = modern standard. All CPUs are equal peers with shared memory access.",
    },
    examTips: [
      "AMP = boss-worker (master+slaves). SMP = all peers. Modern OSes use SMP.",
      "Multiprocessor advantages: throughput, economy of scale, reliability",
      "Multi-core ≠ multiple CPUs — same chip, shared cache, faster interconnect",
      "Clustered systems use SAN (Storage Area Network) for shared storage",
      "DLM = Distributed Lock Manager (prevents concurrent conflicting disk ops)",
    ],
    questions: [
      { q: "What is the difference between AMP and SMP?", a: "AMP (Asymmetric Multiprocessing): boss-worker model. One master processor assigns tasks to slave processors. Simple but master becomes a bottleneck. SMP (Symmetric Multiprocessing): all processors are peers. Each has its own registers and cache, all share physical memory and run the OS kernel. No bottleneck. All modern operating systems use SMP." },
      { q: "What are the advantages of multiprocessor systems?", a: "1. Increased throughput: more work gets done per unit time with multiple CPUs. 2. Economy of scale: multiple CPUs sharing memory/I/O is cheaper than multiple complete single-CPU systems. 3. Increased reliability: if one processor fails, others continue working (graceful degradation/fault tolerance)." },
    ],
  },

  "multicore-cluster": {
    title: "Multi-Core & Clustered Systems", emoji: "🔗",
    tldr: "Multi-core: multiple cores per chip, faster than multi-chip. Clustered: multiple full systems sharing storage, high availability.",
    explanation: `Multi-Core Systems:
A single chip with multiple processing cores. Each core has its own registers and L1/L2 cache, but all share L3 cache and the memory bus. On-chip communication is orders of magnitude faster than off-chip (system bus) communication. Also more power-efficient than multiple separate chips.

Example: An Intel Core i7 with 8 cores is NOT the same as 8 separate Intel CPUs. The cores communicate via shared L3 cache — no slow system bus needed.

Clustered Systems:
Multiple complete computer systems (nodes) working together, connected via high-speed network, and sharing storage via a SAN (Storage Area Network). Provides:
• High availability: if one node fails, others take over
• High performance computing (HPC): apps distributed across nodes (must use parallelization)
• Scalability: add more nodes to increase capacity

Two clustering types:
Asymmetric clustering: One machine in hot-standby mode, monitoring the active server. If active server fails, standby takes over.
Symmetric clustering: Multiple nodes all running applications AND monitoring each other. More efficient — no idle standby machines.

DLM (Distributed Lock Manager): Prevents conflicting concurrent operations when multiple nodes access shared storage. Without DLM, Node A and Node B could both write to the same file simultaneously, corrupting it.`,
    keyPoints: [
      "Multi-core: multiple cores on one chip. On-chip comm faster than bus.",
      "Cores share L3 cache and memory bus, have private L1/L2",
      "Clustered systems: multiple complete computers sharing storage via SAN",
      "High availability: node failure → other nodes take over",
      "HPC clusters: apps must use parallelization to exploit multiple nodes",
      "Asymmetric clustering: one machine in hot-standby",
      "Symmetric clustering: all nodes active, monitoring each other",
      "DLM: prevents conflicting operations on shared cluster storage",
    ],
    formula: {
      code: `Multi-core chip:
  ┌─────────────────────────────────┐
  │  Core 0  │  Core 1  │  Core 2  │
  │ [L1][L2] │ [L1][L2] │ [L1][L2] │
  ├─────────────────────────────────┤
  │          Shared L3 Cache        │
  ├─────────────────────────────────┤
  │       Memory Controller         │
  └─────────────────────────────────┘

Clustered System:
  [Node 1] ──┐
  [Node 2] ──┼── High-speed Network
  [Node 3] ──┘        │
                 ┌─────┴──────┐
                 │    SAN     │ ← shared storage
                 └────────────┘`,
      explanation: "Multi-core = one chip, multiple CPUs. Cluster = multiple computers as one system.",
    },
    examTips: [
      "Multi-core: cores share L3 cache, on-chip comm much faster than system bus",
      "SAN = Storage Area Network (used in clustered systems for shared disk)",
      "DLM = Distributed Lock Manager — prevents concurrent conflicting writes in cluster",
      "Asymmetric cluster = hot-standby. Symmetric cluster = all nodes active.",
    ],
    questions: [
      { q: "Why are multi-core systems more efficient than multiple single-core chips?", a: "In a multi-core chip, cores communicate via the on-chip bus (L3 cache) which is orders of magnitude faster than the system bus between separate chips. They also share L3 cache, reducing memory traffic. Additionally, a single multi-core chip consumes significantly less power than multiple single-core chips doing the same work." },
    ],
  },

  "dual-mode-timer": {
    title: "Dual-Mode Operation & Timer", emoji: "🛡️",
    tldr: "User mode vs Kernel mode (mode bit). Privileged instructions only in kernel mode. System call → kernel mode. Timer prevents infinite loops.",
    explanation: `Dual-Mode Operation — the fundamental OS protection mechanism:
Hardware provides two CPU execution modes, tracked by a mode bit:
• Kernel mode (mode bit = 0): OS runs here. ALL instructions allowed, including privileged ones.
• User mode (mode bit = 1): User programs run here. Privileged instructions are BLOCKED.

Why dual mode? Without it, any user program could execute harmful instructions (like halting the CPU, overwriting OS memory, or disabling all interrupts) that would crash the entire system. Dual mode prevents this.

Privileged instructions — only allowed in kernel mode:
• I/O instructions (talk directly to devices)
• Setting/modifying interrupt vectors
• Setting the timer
• Clearing memory
• Halting the CPU
• Switching to kernel mode (but trap instruction does this safely)

Mode transitions:
• User program → OS service: execute a TRAP (software interrupt). Hardware automatically switches mode bit 1→0.
• System call completes: kernel executes return instruction. Mode bit 0→1.
• Hardware interrupt: hardware switches mode bit 1→0.
• Interrupt handled: mode bit 0→1.

Timer:
Prevents infinite loops or process hogging the CPU. Implemented as a variable timer = fixed-rate clock + counter. OS sets the counter (privileged instruction). Each clock tick decrements counter. Counter hits 0 → timer interrupt fires → kernel takes control → can terminate or preempt the process.

Think of it like a parking meter — the OS sets how long a process can run. When time's up, the OS takes the CPU back.`,
    keyPoints: [
      "Mode bit: 0 = kernel mode, 1 = user mode",
      "Kernel mode: all instructions allowed (privileged + normal)",
      "User mode: privileged instructions BLOCKED — causes trap/error",
      "Privileged: I/O, set timer, modify interrupt vectors, halt CPU",
      "System call → TRAP → mode switches 1→0 (user→kernel)",
      "Return from syscall → mode switches 0→1 (kernel→user)",
      "Timer: prevents infinite loops / resource hogging",
      "Variable timer = fixed-rate clock + counter (OS sets counter)",
      "Counter hits 0 → timer interrupt → OS takes control",
      "Modern CPUs: multi-mode (e.g., VMM mode for virtual machines)",
    ],
    formula: {
      code: `Mode Bit Transitions:
  
  [User Program running]   mode bit = 1
        │
        │  executes TRAP (system call request)
        ▼
  [Kernel mode]            mode bit = 0
  OS handles system call
        │
        │  system call return instruction
        ▼
  [User Program resumes]   mode bit = 1

  Hardware interrupt:
  [User running] → interrupt signal → [Kernel handles ISR] → [User resumes]
  mode bit: 1   →      auto 1→0    →     mode bit = 0     →   mode bit = 1

Timer Operation:
  OS (privileged): set counter = 1000
  Clock tick: counter = 999
  Clock tick: counter = 998
  ... 
  Clock tick: counter = 0 → INTERRUPT!
  → OS checks: should process continue?
  → If yes: reset counter and let it run
  → If no: preempt and schedule another process`,
      explanation: "Mode bit = hardware enforced security. Timer = hardware enforced fairness.",
    },
    examTips: [
      "Kernel mode = mode bit 0. User mode = mode bit 1. (Counterintuitive — 0 = more power)",
      "Privileged instruction in user mode → trap/protection fault (OS handles it)",
      "TRAP = mechanism for user to request kernel service SAFELY",
      "Timer is SET by OS (privileged). User cannot modify the timer.",
      "VMM mode: modern CPUs support a 3rd mode for hypervisors (virtual machines)",
    ],
    questions: [
      { q: "What is privileged mode of operation? (PYQ)", a: "Privileged mode (kernel mode) is a CPU execution mode where ALL instructions can execute, including privileged ones: I/O instructions, setting the timer, modifying interrupt vectors, clearing memory, and halting the CPU. User programs run in user mode where these privileged instructions are blocked — attempting them causes a trap/fault. This dual-mode operation protects the OS from errant or malicious user code. The hardware mode bit (0=kernel, 1=user) enforces this distinction." },
      { q: "How does the timer prevent a process from running forever?", a: "The OS sets a hardware counter (privileged operation). Each clock tick decrements the counter. When it reaches 0, a timer interrupt fires and the OS regains control. The OS can then decide to preempt the process (if its quantum expired) or reset the counter (if it should continue). The process cannot modify the timer — that's a privileged instruction only the OS can execute." },
      { q: "When does the CPU switch from user mode to kernel mode?", a: "Three events cause the switch: 1. System call: user program executes a TRAP instruction requesting an OS service. 2. Hardware interrupt: a device sends an interrupt signal (e.g., disk done, key pressed). 3. Software exception/trap: an error occurs (divide by zero, invalid memory access). In all cases, hardware automatically clears the mode bit (1→0) and jumps to the appropriate handler." },
    ],
  },

  "multiprog-multitask": {
    title: "Multiprogramming & Multitasking", emoji: "🔄",
    tldr: "Multiprogramming: keep CPU busy by switching when one process waits. Multitasking: CPU switches so fast users feel they're running simultaneously.",
    explanation: `The core problem: A single user can't keep the CPU AND I/O devices busy at the same time. When the user's process does I/O, the CPU is idle — wasteful!

Multiprogramming (Batch systems):
The OS keeps SEVERAL jobs in memory simultaneously. When the currently running job needs I/O (and must wait), the OS switches the CPU to another job. The CPU is never idle as long as there's a job ready. Job selection = job scheduling.

Think of it like a chef cooking multiple dishes simultaneously — while the pasta water boils (I/O wait), the chef chops vegetables for another dish (another process gets CPU).

Multitasking (Time-sharing / Interactive):
An extension of multiprogramming for interactive use. The CPU switches jobs so RAPIDLY (every few milliseconds) that each user feels they have a dedicated machine. Response time is typically < 1 second.

Key mechanisms enabled by multitasking:
• Swapping: If all processes don't fit in memory, OS moves some to disk and back (swapping).
• Virtual Memory: Allows execution of processes not COMPLETELY in memory. A process can be larger than physical RAM. Only the needed parts are loaded.

Multiprogramming: focuses on CPU utilization (don't let CPU idle)
Multitasking: focuses on response time (interactive feel)`,
    keyPoints: [
      "Problem: single user can't keep CPU + I/O devices busy simultaneously",
      "Multiprogramming: several jobs in memory; switch when one waits",
      "CPU never idle as long as there's a ready job",
      "Multitasking (time-sharing): CPU switches fast enough to feel simultaneous",
      "Response time in time-sharing: < 1 second",
      "Swapping: process moved between memory and disk when memory is tight",
      "Virtual memory: execute processes not completely in RAM",
      "Multiprogramming goal: CPU utilization. Time-sharing goal: response time.",
    ],
    formula: {
      code: `Without Multiprogramming:
  [Job A runs] → [Job A waits for I/O] → CPU IDLE → [Job A runs]
  CPU utilization: ~20-30% (wasteful!)

With Multiprogramming:
  [Job A runs] → [Job A: I/O wait] → [Job B runs] → [Job C runs]
                                          ↑ CPU never idle!
  CPU utilization: 60-90%!

Time-sharing (Multitasking) Timeline:
  |User1:4ms|User2:4ms|User3:4ms|User1:4ms|...
  
  Each user feels they're always running.
  Switch is so fast (4ms) humans can't notice!`,
      explanation: "Multiprogramming = utilization. Multitasking = responsiveness. Multitasking is multiprogramming for interactive use.",
    },
    examTips: [
      "Multiprogramming: CPU utilization goal. Multitasking/time-sharing: response time goal.",
      "Virtual memory = allows process larger than physical RAM",
      "Swapping = process moved to disk when memory is tight (medium-term scheduler)",
      "Response time < 1 second = definition of time-sharing",
    ],
    questions: [
      { q: "What is the difference between multiprogramming and multitasking?", a: "Multiprogramming: keeps multiple processes in memory and switches the CPU to another when the current one waits for I/O. Goal: maximize CPU utilization. Used in batch systems. Multitasking (time-sharing): extends multiprogramming to interactive systems. Switches CPU between processes so rapidly (every few ms) that each user perceives dedicated machine access. Goal: minimize response time (< 1 second). Both keep the CPU busy, but multitasking adds the constraint of fast response." },
    ],
  },

  "os-services": {
    title: "OS Services", emoji: "🛎️",
    tldr: "9 OS services: 6 for users (UI, Program exec, I/O, File-system, Communications, Error detection) + 3 for efficiency (Resource alloc, Accounting, Protection).",
    explanation: `The OS provides services in two categories:

Services helpful to users:
1. User Interface (UI): CLI (command-line shells like bash), GUI (windows/icons/mouse), Batch (job scripts). The interface between human and OS.
2. Program Execution: Load program code into memory, run it, end it normally or with error indication.
3. I/O Operations: Running programs need file or device I/O (read/write file, talk to printer, etc.). OS provides safe, uniform I/O interface.
4. File-System Manipulation: Create/delete/read/write files and directories. Search for files, list info, manage permissions.
5. Communications: Between processes on the SAME computer (shared memory or message passing) or different computers (network).
6. Error Detection: Detect and handle hardware errors (memory failure, power failure, I/O errors) and software errors (invalid memory access, arithmetic overflow). OS takes appropriate corrective action.

Services for efficient operation:
7. Resource Allocation: Allocate CPU cycles, main memory, file storage, I/O devices among concurrent processes fairly and efficiently.
8. Accounting: Track which users use how much of what resources. Used for billing and/or performance tuning.
9. Protection & Security: Control access so concurrent processes don't interfere. Authenticate users. Defend against external threats.`,
    keyPoints: [
      "UI: CLI (bash), GUI (desktop), Batch (scripts)",
      "Program execution: load into memory, run, end (normal or error)",
      "I/O operations: OS provides safe uniform access to devices",
      "File-system manipulation: CRUD operations on files/directories + permissions",
      "Communications: shared memory OR message passing (same/different computers)",
      "Error detection: handle hardware + software errors; take appropriate action",
      "Resource allocation: CPU, memory, I/O fairly assigned to concurrent processes",
      "Accounting: track who uses what (billing + tuning)",
      "Protection & security: access control + authentication + external defense",
    ],
    formula: null,
    examTips: [
      "9 services total: 6 user-facing + 3 efficiency-focused",
      "Communications: shared memory vs message passing — know both",
      "Error detection is DIFFERENT from protection (detection = reactive; protection = preventive)",
      "Resource allocation falls under 'efficiency' not 'user convenience'",
    ],
    questions: [
      { q: "List the 9 main OS services and categorize them.", a: "User-facing: (1) User Interface, (2) Program execution, (3) I/O operations, (4) File-system manipulation, (5) Communications, (6) Error detection. Efficiency-focused: (7) Resource allocation, (8) Accounting, (9) Protection and security." },
    ],
  },

  "syscalls": {
    title: "System Calls", emoji: "📞",
    tldr: "System calls = interface to OS services. 6 categories: Process control, File, Device, Information, Communications, Protection. printf() calls write() syscall.",
    explanation: `System calls provide the programmatic interface between user programs and the OS kernel. Think of them as the "menu" a user program can order from — the OS is the kitchen that actually does the work.

They're generally implemented as C library functions. When you write code in C, Java, or Python, you don't call system calls directly — you call library functions (like printf) that internally call the appropriate system call (like write).

The complete flow of printf("Hello"):
1. User program calls printf()
2. C library formats the string, calls write() system call
3. write() issues a TRAP instruction
4. Hardware: mode bit switches 1→0 (user → kernel)
5. Kernel: looks up system call number in the system call table
6. Dispatches to the write handler
7. Handler validates parameters, identifies stdout (fd=1)
8. Sends data to terminal device driver
9. Return value placed in register
10. Mode bit switches 0→1 (kernel → user)
11. Control returns to printf() in C library → returns to user program

6 Categories of System Calls:
1. Process Control: fork(), exec(), exit(), wait(), getpid()
2. File Manipulation: open(), read(), write(), close(), unlink()
3. Device Manipulation: ioctl(), read(), write() for devices
4. Information Maintenance: getpid(), alarm(), sleep(), time()
5. Communications: socket(), send(), recv(), pipe()
6. Protection: chmod(), chown(), setuid()`,
    keyPoints: [
      "System call = programmatic interface between user program and OS kernel",
      "Written in C/C++ (or assembly for low-level access)",
      "6 categories: Process, File, Device, Information, Communications, Protection",
      "printf() → C library → write() system call → OS kernel",
      "System call causes mode switch: user mode → kernel mode",
      "System call table: maps system call number → handler function",
      "Return from system call: kernel mode → user mode",
      "fork(): creates new process. exec(): replaces process image. exit(): terminates.",
      "open(), read(), write(), close() — file manipulation system calls",
    ],
    formula: {
      code: `System Call Flow (printf example):
  User program calls printf("Hello")
    → C Library: formats string, calls write()
    → write() issues TRAP instruction
    → Hardware: mode bit 1→0 (user→kernel)
    → Kernel: indexes system call table with call number
    → Dispatches to write() handler
    → Handler writes to terminal
    → Returns bytes written in register
    → Mode bit 0→1 (kernel→user)
    → C library returns to user program

6 Categories:
  1. Process Control:  fork, exit, wait, exec, getpid
  2. File Manipulation: open, read, write, close, unlink
  3. Device Manipulation: ioctl, read, write (device)
  4. Information: getpid, alarm, sleep, time
  5. Communications: socket, send, recv, pipe
  6. Protection: chmod, chown, setuid`,
      explanation: "Every system call crosses the user→kernel boundary via a software trap (INT instruction on x86).",
    },
    examTips: [
      "6 categories — memorize: Process, File, Device, Information, Communications, Protection",
      "printf() is NOT a system call — it's a C library function that CALLS write()",
      "System call = software trap = mode switch from user to kernel",
      "fork() return: child gets 0, parent gets child's PID, error gets -1",
    ],
    questions: [
      { q: "What is a system call? What actions does the OS perform while executing one? (PYQ)", a: "A system call is a programmatic request by a user-mode process to the OS kernel for a service it cannot perform itself (I/O, memory allocation, process creation).\n\nActions during a system call:\n1. User program invokes library function (e.g., printf() which internally calls write()).\n2. Library places system call number + parameters in registers or on the stack.\n3. A trap instruction (software interrupt) switches CPU from user mode → kernel mode.\n4. Kernel looks up the system call number in the system call table and dispatches to the handler.\n5. Handler validates parameters and performs the service.\n6. Return value placed in a register.\n7. CPU switches back to user mode. Control returns to user program." },
      { q: "What are the 6 categories of system calls? Give one example each.", a: "1. Process Control: fork(). 2. File Manipulation: open(). 3. Device Manipulation: ioctl(). 4. Information Maintenance: getpid(). 5. Communications: socket(). 6. Protection: chmod()." },
      { q: "Is printf() a system call?", a: "No. printf() is a C standard library function. It formats the string and then internally calls the write() system call to actually send data to the output device. The system call is write(), not printf()." },
    ],
  },

  "policy-mechanism": {
    title: "Policy vs Mechanism & OS Design", emoji: "⚙️",
    tldr: "Policy = WHAT to do. Mechanism = HOW to do it. Separate them for flexibility. OS mostly in C, lowest level in assembly.",
    explanation: `Policy vs Mechanism — the most important design principle in OS:
• Policy: What will be done? (decision-making) Example: "Allow user program to run for at most 30 minutes"
• Mechanism: How to do it? (implementation) Example: The timer hardware + counter system

Separation = maximum flexibility. When someone wants a different policy (e.g., "limit to 1 hour instead"), you don't need to change the timer hardware (mechanism) — just change the time limit (policy).

Real analogy: A car's speedometer is the mechanism (measures speed). "Don't exceed 60 km/h" is a policy. To change the speed limit law, you don't redesign the speedometer.

OS Design Goals:
• User perspective: Convenient, easy to learn, reliable, safe, fast.
• System perspective: Easy to design/implement/maintain, flexible, reliable, efficient.

OS Implementation:
Early OSes: written entirely in assembly language (fast but hard to port).
Now: mostly C/C++ (small lowest-level parts still in assembly).
Higher-level language = easier to port to other hardware architectures (ARM, x86, RISC-V) but potentially slightly slower. For modern CPUs, the performance difference is negligible.`,
    keyPoints: [
      "Policy = WHAT to do. Mechanism = HOW to do it. They must be SEPARATE.",
      "Separation allows: change policy without changing mechanism",
      "Example: timer mechanism stays same; time limit policy can change",
      "OS implementation: mostly C/C++",
      "Lowest levels: assembly. Main body: C. System programs: C/C++/scripts",
      "High-level language → easier portability, potentially slightly slower",
    ],
    formula: null,
    examTips: [
      "Policy = WHAT. Mechanism = HOW. This distinction = always examinable",
      "'Separation of policy from mechanism = maximum flexibility' — quote this",
      "Timer: policy = time limit value. Mechanism = the counter + clock hardware.",
      "OS written in C = easier to PORT (compile for ARM, x86, etc.)",
    ],
    questions: [
      { q: "Why is separating policy from mechanism important?", a: "Separation allows the policy to change without modifying the underlying mechanism. For example, the timer mechanism (hardware counter + clock) stays the same whether the policy is '10ms timeslice' or '100ms timeslice'. This flexibility allows OS designers to tune behavior without rebuilding core components. It also allows different policies for different environments (interactive vs batch) using the same mechanisms." },
    ],
  },

  "arrays-lists": {
    title: "Kernel Data Structures — Arrays & Lists", emoji: "📋",
    tldr: "Array: O(1) direct access, fixed size. Linked list: O(n) traversal, dynamic size, easy insert/delete.",
    explanation: `The OS kernel uses standard data structures extensively to manage resources. These aren't just academic — they're actively used in Linux and Windows kernels right now.

Array: simplest data structure. Each element accessed directly by index (address = base + item_number × item_size). Main memory is fundamentally modeled as an array — each byte has an index (its address). Problem: fixed size, can't store variable-size items, removing while preserving order requires shifting all subsequent elements = O(n).

Linked Lists: items connected by pointers. Three variants:
• Singly linked: each node has data + pointer to next. One direction.
• Doubly linked: each node has data + pointer to next AND pointer to previous. Can traverse both ways.
• Circularly linked: last node points back to first (not null). No "end" — useful for round-robin scheduling.

Analogy: Array = numbered seats in a stadium (you can go directly to seat 47). Linked list = a treasure hunt (you go to node 1, it tells you where node 2 is, and so on).

Linux kernel uses doubly-linked lists extensively for: process lists, file descriptors, module lists, I/O request queues.

Advantages: variable-sized items, O(1) insertion/deletion at known position.
Disadvantage: O(n) search — must traverse up to n elements.`,
    keyPoints: [
      "Array: O(1) direct access by index. Fixed size. Main memory uses array model.",
      "Array problem: fixed size, deletion requires shifting elements O(n)",
      "Singly linked: each item → successor. One direction.",
      "Doubly linked: each item ← → predecessor AND successor. Two directions.",
      "Circular linked: last → first (not null). Used in round-robin schedulers.",
      "Linked list advantages: variable sizes, O(1) insert/delete at known position",
      "Linked list disadvantage: O(n) search (no direct access by index)",
      "Linux kernel uses doubly-linked lists for process lists, file descriptors",
    ],
    formula: {
      code: `Array: address of element[i] = base_address + i × element_size
  e.g., int arr[5] at base 0x1000, element size = 4 bytes
  arr[3] is at address 0x1000 + 3×4 = 0x100C  ← O(1) direct!

Singly Linked List:
  [data|next] → [data|next] → [data|next] → NULL
  Traversal: start at head, follow next pointers

Doubly Linked List (used in Linux kernel):
  NULL ← [prev|data|next] ↔ [prev|data|next] ↔ [prev|data|next] → NULL
  Can go forward OR backward

Circular Linked List:
  [data|next] → [data|next] → [data|next] ─┐
       ↑___________________________________|
  Used for: round-robin process scheduling`,
      explanation: "Array = direct address. Linked list = follow the chain. Both have their place in the kernel.",
    },
    examTips: [
      "Array: O(1) access. Linked list: O(n) search but O(1) insert/delete.",
      "Main memory is fundamentally an array (byte addresses = indices)",
      "Linux uses doubly-linked lists for its process table (task_struct list)",
      "Circular linked list is natural for round-robin scheduling",
    ],
    questions: [
      { q: "Compare arrays and linked lists for OS kernel use.", a: "Arrays: O(1) direct access by index, fixed size, cache-friendly. Good for: main memory addressing, interrupt vector table. Linked lists: O(n) search, but dynamic size and O(1) insert/delete at known position. Good for: process queues, file descriptor lists, I/O queues. The kernel uses both — arrays for fixed structures, linked lists for dynamic ones." },
    ],
  },

  "stacks-queues-trees": {
    title: "Stacks, Queues & Trees in Kernel", emoji: "🌳",
    tldr: "Stack (LIFO): used for function calls. Queue (FIFO): used for process/print queues. BST: O(log n) search. Linux CFS uses red-black tree.",
    explanation: `Stacks (LIFO — Last In First Out):
Used for function calls. When you call a function: parameters, return address, and local variables are PUSHED onto the stack. When the function returns, they're POPPED. This is why stack overflow happens when you have infinite recursion — too many frames pushed!

Queues (FIFO — First In First Out):
Tasks waiting for CPU organized in queues. Print jobs served in submission order. The ready queue in CPU scheduling is typically a queue. Device I/O queues are also FIFO per device.

Trees:
Hierarchical structure. Parent–child relationships. Used when you need sorted order AND fast access.

Binary Search Tree (BST): left child ≤ parent ≤ right child. Search O(n) worst case (if unbalanced — can degrade to a linked list).

Balanced BST (like AVL or Red-Black Tree): at most log(n) levels. Search always O(log n). Self-balancing — automatically rebalances after insert/delete.

CRITICAL EXAM FACT — Linux CFS Scheduler:
The Linux Completely Fair Scheduler uses a Red-Black Tree (balanced BST) keyed by each process's virtual runtime (vruntime). The process with the LOWEST vruntime (leftmost node in the tree) gets the CPU next. Finding the next process = finding the leftmost node = O(log n) time. After running, the process's vruntime increases and it's repositioned in the tree.`,
    keyPoints: [
      "Stack (LIFO): function call frames — push on call, pop on return",
      "Queue (FIFO): tasks waiting for CPU/printer served in order of arrival",
      "BST: left ≤ parent ≤ right. Search O(n) worst case (unbalanced).",
      "Balanced BST (Red-Black Tree): max log(n) levels. Search O(log n).",
      "Linux CFS uses Red-Black Tree keyed by vruntime",
      "Leftmost node in CFS tree = process with lowest vruntime = next to run",
      "After running, process's vruntime increases → repositioned in tree",
      "Stack overflow: too many nested function calls exceed stack size limit",
    ],
    formula: {
      code: `Stack (function call):
  main() calls foo() calls bar()
  Stack (grows downward):
  ┌──────────────┐ ← top of stack
  │ bar's frame  │ (local vars, return addr)
  │ foo's frame  │
  │ main's frame │
  └──────────────┘ ← bottom

Queue (FIFO):
  [P1] ← [P2] ← [P3] ← [P4] (new arrivals join back)
    ↑ CPU picks from front

Linux CFS Red-Black Tree (keyed by vruntime):
        [vrt=50]
       /         \
  [vrt=20]    [vrt=80]
  /      \
[vrt=10] [vrt=30]
   ↑
leftmost = vrt=10 → THIS process runs next!`,
      explanation: "CFS always picks leftmost node (minimum vruntime). After running, vruntime increases and process is reinserted.",
    },
    examTips: [
      "Stack = LIFO. Queue = FIFO. OS uses both extensively.",
      "Linux CFS = Red-Black Tree (balanced BST). O(log n) to find next process.",
      "Leftmost node in CFS tree = process with minimum vruntime = runs next",
      "Balanced BST guarantees O(log n) even in worst case (unlike plain BST)",
    ],
    questions: [
      { q: "Why does the Linux CFS scheduler use a red-black tree?", a: "The CFS scheduler must efficiently find the process with the minimum vruntime (virtual runtime) to run next. A red-black tree (balanced BST) keyed by vruntime lets it find the minimum in O(log n) time (leftmost node). After a process runs, its vruntime increases and it's reinserted in O(log n) time. A plain BST could degrade to O(n) if unbalanced, making the scheduler too slow for systems with many processes." },
    ],
  },

  "hash-bitmap": {
    title: "Hash Functions, Hash Maps & Bitmaps", emoji: "#️⃣",
    tldr: "Hash map: O(1) average lookup. Bitmap: track resource availability with 1 bit per resource — extremely space-efficient.",
    explanation: `Hash Functions and Maps:
A hash function takes an input (like a process name or file path) and produces a fixed-size output (hash value). Think of it as a "fingerprint" function. The same input always gives the same output. Different inputs may give the same output — this is a collision.

A hash map (hash table) stores key:value pairs. To look up a value:
1. Compute hash(key) → get an index
2. Go directly to that index in the array
3. Retrieve the value

Average case: O(1) lookup! (Compare to linked list: O(n), BST: O(log n))
Worst case: O(n) if many collisions hash to same slot.

The Linux kernel uses hash tables for: process ID lookup, inode lookup, network routing tables.

Bitmaps — The most space-efficient data structure:
A string of n binary digits where each bit represents the status of one resource.
Convention: 0 = available (free), 1 = unavailable (allocated)

Why bitmaps? To track 1 MILLION disk blocks' availability, you'd need:
• Integer array: 4,000,000 bytes = 4 MB
• Bitmap: 1,000,000 bits = 125,000 bytes = only 125 KB!

Bitmaps used in OS for: disk block tracking, memory page availability, inode availability in filesystems (ext4, NTFS).

Finding a free resource = find the first 0 bit. Using bitwise operations (like checking 8/16/32 bits at a time), this is very fast even for millions of bits.`,
    keyPoints: [
      "Hash function: input → fixed-size output. Same input = same output.",
      "Collision: different inputs → same hash. Must be handled!",
      "Hash map: key:value pairs. Average O(1) lookup. Worst O(n).",
      "Linux uses hash tables for PID lookup, inode lookup",
      "Bitmap: 1 bit per resource. 0=free, 1=allocated.",
      "Space efficiency: 1M disk blocks = 125 KB bitmap vs 4 MB integer array",
      "Bitmaps used for: disk blocks, memory pages, inodes",
      "Finding free resource: scan bitmap for first 0 bit, using bitwise ops for speed",
    ],
    formula: {
      code: `Hash Map Lookup:
  key: "process_name"
  hash("process_name") → index 42
  table[42] → {pid: 1234, state: running}
  O(1) average!

Bitmap — Disk Block Example:
  Bit index: 0 1 2 3 4 5 6 7
  Bitmap:    0 0 1 0 1 1 1 0
  
  0 = FREE:   blocks 0, 1, 3, 7 are available
  1 = IN USE: blocks 2, 4, 5, 6 are allocated

  When a file needs a new block:
  Scan bitmap for first '0' bit:
  → Find bit 0 (value=0) → allocate block 0
  → Set bit 0 = 1 → bitmap: 1 0 1 0 1 1 1 0

Space Comparison (1 million disk blocks):
  Array of ints:  1,000,000 × 4 bytes = 4,000,000 bytes (4 MB)
  Bitmap:         1,000,000 bits       =   125,000 bytes (125 KB) ✓`,
      explanation: "Bitmap: 1 bit per item. Extraordinarily space-efficient. Used everywhere resources need tracking.",
    },
    examTips: [
      "Bitmap: 0 = free, 1 = allocated (know this convention)",
      "Space efficiency: 1M blocks → only 125 KB as bitmap (vs 4 MB for int array)",
      "Hash map: O(1) average. Collision = performance degrades.",
      "Linux kernel uses bitmaps for free disk block and free memory page tracking",
    ],
    questions: [
      { q: "What is the significance of the bitmap data structure in the kernel? Give an example. (PYQ)", a: "Bitmaps track availability of large numbers of resources extremely space-efficiently. Each bit corresponds to a resource — 0 = available, 1 = allocated. Tracking 1 million disk blocks requires only 125 KB (vs 4 MB for an integer array).\n\nExample — Disk block management: A disk has 8 blocks, bitmap = 00101110.\n• Blocks 0, 1, 3, 7 are FREE (bit = 0).\n• Blocks 2, 4, 5, 6 are ALLOCATED (bit = 1).\n\nWhen a file needs a new block, the OS scans the bitmap for the first 0 bit using bitwise operations — O(n/word_size) time, extremely fast even for millions of blocks." },
      { q: "What is a hash collision and how is it handled?", a: "A collision occurs when two different keys produce the same hash value, causing them to map to the same array slot. Handled by: (1) Chaining: each slot holds a linked list of all colliding entries — lookup traverses the list. (2) Open addressing: if slot is taken, probe neighboring slots (linear probing, quadratic probing). Well-designed hash functions minimize collisions, keeping average lookup close to O(1)." },
    ],
  },

  "trad-mobile": {
    title: "Traditional & Mobile Computing Environments", emoji: "📱",
    tldr: "Traditional: standalone → networked. Mobile: smartphones with extra sensors (GPS, gyroscope). iOS and Android dominate.",
    explanation: `Traditional Computing: Originally, standalone machines. Now interconnected via Internet. Portals allow thin clients (web browsers) to access heavy computing. Mobile computing extends to anywhere. Firewalls protect networked computing.

Mobile Computing: Smartphones and tablets. Extra hardware compared to traditional: GPS, gyroscope, accelerometer, camera, fingerprint sensor, NFC. iOS (Apple) and Android (Google/open-source) dominate. Challenges: limited battery, smaller screen, cellular network variability.

Real-Time Embedded: The MOST PREVALENT form of computers. They're everywhere: washing machines, cars (ECUs), medical devices, industrial controllers, traffic lights, ATMs. Strict fixed timing constraints — the response must happen within a guaranteed deadline.

Difference from general-purpose OS: Embedded OS has a very specific purpose, minimal UI, limited resources (RAM, storage), and often cannot be updated easily. Real-time embedded systems must meet timing deadlines without exception.`,
    keyPoints: [
      "Traditional: standalone → networked → Internet-connected",
      "Thin clients: web browser does all UI, server does heavy computation",
      "Mobile: smartphones/tablets with extra sensors (GPS, gyro, camera, NFC)",
      "iOS and Android dominate mobile OS market",
      "Mobile challenges: battery life, limited screen, variable network",
      "Real-time embedded: MOST prevalent form of computing",
      "Embedded examples: washing machines, cars, medical devices, traffic lights",
      "Embedded: fixed purpose, limited resources, strict timing constraints",
    ],
    formula: null,
    examTips: [
      "Real-time embedded = most prevalent form of computing (not PCs/phones!)",
      "Mobile OS extras: GPS, gyroscope, accelerometer — beyond traditional HW",
      "iOS = closed source (Apple). Android = open source (Google/AOSP).",
      "Thin client = browser-based, server does work — reduces client requirements",
    ],
    questions: [
      { q: "What extra hardware features do mobile devices have compared to traditional computers?", a: "Mobile devices have additional sensors and hardware: GPS (location), gyroscope (orientation/rotation), accelerometer (motion), proximity sensor, fingerprint reader, NFC (near-field communication), front AND rear cameras, cellular modem (3G/4G/5G), and sometimes barometer. These require the OS to manage more diverse hardware with strict power constraints." },
    ],
  },

  "client-server-p2p": {
    title: "Client-Server & Peer-to-Peer Computing", emoji: "🌐",
    tldr: "Client-server: dedicated server responds to client requests. Peer-to-Peer: all nodes are equal peers. Distributed: heterogeneous systems networked together.",
    explanation: `Distributed Computing: Heterogeneous systems (different hardware, different OS) networked together via LAN, WAN, MAN, or PAN. A Network Operating System (NOS) provides cross-network services (file sharing, printing). Users are aware of the multiple machines but interact with them transparently.

Client-Server Model: The classic internet model. Two types:
• Compute-server: clients send computation requests (e.g., database queries), server executes and returns results. Example: SQL database server.
• File-server: clients read/write files stored on the server. Example: NFS, SMB/CIFS.

Peer-to-Peer (P2P): No distinction between clients and servers. All nodes are peers — any node can be both a client AND a server simultaneously. Examples: BitTorrent (file sharing), Bitcoin blockchain, early Skype (VoIP), Napster-era music sharing. Advantages: no central bottleneck, more resilient (no single point of failure).

Key difference: In client-server, removing the server kills the service. In P2P, the network continues even if many nodes leave.`,
    keyPoints: [
      "Distributed: heterogeneous systems on LAN/WAN/MAN/PAN",
      "NOS (Network OS): provides file sharing, printing across network",
      "Client-server: dedicated server responds to client requests",
      "Compute-server: client requests computation (e.g., database)",
      "File-server: client reads/writes files stored on server (NFS, SMB)",
      "P2P: no client/server distinction. All nodes are peers.",
      "P2P examples: BitTorrent, Bitcoin, VoIP",
      "P2P advantage: no central bottleneck, no single point of failure",
    ],
    formula: {
      code: `Client-Server:
  [Client] ──request──→ [SERVER] ←─request── [Client]
                           │
                      processes request
                           │
  [Client] ←─response── [SERVER] ──response──→ [Client]

Peer-to-Peer:
  [Node A] ↔ [Node B] ↔ [Node C]
      ↕            ↕
  [Node D] ↔ [Node E]
  
  Any node can ask OR answer. No central server needed.
  BitTorrent: you download from AND upload to peers simultaneously.`,
      explanation: "P2P: every node is both client and server. More resilient, no bottleneck.",
    },
    examTips: [
      "Client-server: server does the work, client requests. Central bottleneck.",
      "P2P: all nodes equal. No single point of failure. Examples: BitTorrent, Bitcoin.",
      "File-server vs Compute-server: file = stores files, compute = runs computation",
    ],
    questions: [
      { q: "What is the key advantage of P2P over client-server architecture?", a: "P2P has no central server — no single point of failure and no bottleneck. If any node leaves the network, the service continues because other nodes take over. In client-server, if the server goes down, all clients lose service. P2P also scales better — as more nodes join, the network gets stronger (more resources to share)." },
    ],
  },

  "virt-cloud": {
    title: "Virtualization & Cloud Computing", emoji: "☁️",
    tldr: "Virtualization: multiple OSes on one physical machine via VMM/hypervisor. Cloud: SaaS, PaaS, IaaS. Logical extension of virtualization.",
    explanation: `Virtualization:
Allows running multiple operating systems concurrently on a single physical machine. A Virtual Machine Manager (VMM) or hypervisor creates virtual machines (VMs) — each VM believes it has its own dedicated hardware.

Two key terms:
• Emulation: simulating a completely DIFFERENT CPU architecture (e.g., running ARM code on an Intel x86 machine). Slow because every instruction must be translated.
• Virtualization: running an OS for the SAME CPU architecture. The guest OS is natively compiled for the real CPU, so no instruction translation needed. Much faster than emulation.

Types of hypervisors:
• Type 1 (bare metal): hypervisor runs directly on hardware. Guest OSes run on top. Examples: VMware ESXi, Microsoft Hyper-V, Xen. Used in data centers.
• Type 2 (hosted): hypervisor runs as an application on a host OS. Examples: VMware Workstation, VirtualBox, Parallels. Used by developers.

Use cases: multi-OS development, QA testing (multiple environments), data center consolidation (run 20 VMs on one server instead of 20 servers).

Cloud Computing: delivering computing/storage/apps as a service over a network. The logical extension of virtualization.
• SaaS (Software as a Service): application over Internet. Example: Google Docs, Gmail, Salesforce. You use software, someone else manages everything.
• PaaS (Platform as a Service): platform/runtime ready for your apps. Example: Google App Engine, Heroku. You manage your app; cloud manages OS, runtime.
• IaaS (Infrastructure as a Service): raw servers/storage/network over Internet. Example: AWS EC2, Azure VMs. You manage everything above the hardware.

Cloud types: Public (Amazon, Google, Azure), Private (your own data center), Hybrid (combination).`,
    keyPoints: [
      "VMM (hypervisor): creates virtual machines, each thinks it has dedicated hardware",
      "Emulation: different CPU arch → slow (instruction translation needed)",
      "Virtualization: same CPU arch → fast (native execution)",
      "Type 1 hypervisor: bare metal (data centers). Type 2: hosted (developers).",
      "Use cases: multi-OS dev, QA testing, data center consolidation",
      "SaaS: app over internet (Google Docs). User manages nothing.",
      "PaaS: platform + runtime (Heroku). User manages app only.",
      "IaaS: raw VMs (AWS EC2). User manages everything above hardware.",
      "Cloud types: Public, Private, Hybrid",
    ],
    formula: {
      code: `Type 1 Hypervisor (bare metal):
  ┌──────────────┬──────────────┐
  │ Windows VM   │ Linux VM     │
  │ (guest OS)   │ (guest OS)   │
  ├──────────────┴──────────────┤
  │         VMM (Hypervisor)    │
  ├─────────────────────────────┤
  │         Hardware            │
  └─────────────────────────────┘

Type 2 Hypervisor (hosted):
  ┌─────────┬─────────┐
  │ Win VM  │ Linux VM│
  ├─────────┴─────────┤
  │    VMware         │ ← runs as an app
  ├───────────────────┤
  │   Host OS (macOS) │
  ├───────────────────┤
  │   Hardware        │
  └───────────────────┘

Cloud Service Models:
  SaaS: You use the app   (Gmail, Google Docs)
  PaaS: You write the app (Heroku, App Engine)
  IaaS: You manage the VM (AWS EC2, Azure)`,
      explanation: "Virtualization = multiple OSes on one machine. Cloud = virtualization as a service.",
    },
    examTips: [
      "Emulation = different CPU (slow). Virtualization = same CPU (fast).",
      "VMM = Virtual Machine Manager = hypervisor",
      "Type 1 = bare metal (data centers). Type 2 = hosted app (developers).",
      "SaaS/PaaS/IaaS: know which layer YOU manage in each",
    ],
    questions: [
      { q: "What is operating system virtualization? Give an example. (PYQ)", a: "OS virtualization allows multiple operating systems to run concurrently on a single physical machine. A Virtual Machine Manager (VMM) or hypervisor creates virtual machines — each believes it has its own dedicated hardware. The guest OS is natively compiled for the real CPU, avoiding the slowness of emulation.\n\nExample 1: VMware running Windows 10 as a guest on a Linux host. Linux manages real hardware; Windows runs in a VM, unaware it's sharing resources.\nExample 2: macOS + Ubuntu running simultaneously on an Apple laptop via Parallels. Both are fully functional, isolated operating systems." },
      { q: "What is the difference between emulation and virtualization?", a: "Emulation: simulates a completely different CPU architecture. Every instruction must be translated in software. Very slow. Example: running old Game Boy games on a modern PC — the x86 CPU emulates the Game Boy Z80 CPU. Virtualization: the guest OS runs on the SAME CPU architecture as the host. Instructions execute natively with minimal overhead. Much faster than emulation. Example: Linux guest VM on a Linux host, both x86-64." },
      { q: "Explain SaaS, PaaS, and IaaS with examples.", a: "SaaS (Software as a Service): Complete application delivered over Internet. User only manages their data. Example: Google Docs, Gmail, Salesforce. PaaS (Platform as a Service): Platform and runtime environment for your application. User manages the app; cloud manages OS and runtime. Example: Heroku, Google App Engine. IaaS (Infrastructure as a Service): Raw compute, storage, and networking. User manages everything above the hardware (OS, runtime, app). Example: AWS EC2, Microsoft Azure VMs." },
    ],
  },

  "process-concept": {
    title: "Process Concept & Memory Layout", emoji: "💻",
    tldr: "Process = program in execution (active). Program = file on disk (passive). Memory layout: Text → Data → BSS → Heap↑ ↓Stack.",
    explanation: `A process is a program IN EXECUTION. Distinction:
• Program: passive entity — a file on disk containing instructions (e.g., /bin/ls)
• Process: active entity — a program loaded into memory with its own execution context (PC, registers, stack)

One program → multiple processes (e.g., 5 users all running the same text editor = 5 separate processes, each with their own memory)

Process Memory Layout (from low to high address):
┌─────────────┐ High address
│    Stack    │ ← grows DOWNWARD. Holds: function params, return addresses, local variables
│  free space │
│    Heap     │ ← grows UPWARD. Dynamic memory (malloc/new)
│    BSS      │ Uninitialized global variables (zeroed at startup)
│    Data     │ Initialized global and static variables
│    Text     │ ← Low address. Program code (machine instructions, read-only)
└─────────────┘

Remember: "Stack grows DOWN, heap grows UP" — they grow toward each other.

Stack and heap meet = stack overflow (or heap exhaustion).

The OS gives each process its OWN address space — process A cannot read process B's memory (memory protection).

Process states: New → Ready → Running → Waiting → Terminated (covered in next topic)`,
    keyPoints: [
      "Process = program in execution (active). Program = file on disk (passive).",
      "One program can spawn multiple processes (e.g., multiple terminal tabs)",
      "Text segment: program code (machine instructions, read-only)",
      "Data segment: initialized global + static variables",
      "BSS: uninitialized global variables (zeroed at start)",
      "Heap: dynamic memory via malloc/new. Grows UPWARD.",
      "Stack: function params, return addresses, local vars. Grows DOWNWARD.",
      "Stack and heap grow TOWARD each other (free space between them)",
      "Each process has its own isolated address space (memory protection)",
    ],
    formula: {
      code: `Process Memory Layout:
  High address
  ┌───────────────────┐
  │      STACK        │ ← local vars, params, return addr
  │  (grows ↓)        │   grows downward
  │  ─────────────    │
  │    free space     │
  │  ─────────────    │
  │      HEAP         │ ← malloc(), new(), etc.
  │  (grows ↑)        │   grows upward
  ├───────────────────┤
  │  BSS segment      │ ← uninitialized globals: int g;
  ├───────────────────┤
  │  Data segment     │ ← initialized globals: int g = 5;
  ├───────────────────┤
  │  Text segment     │ ← machine code (read-only)
  └───────────────────┘
  Low address

Example mapping for this code:
#include <stdio.h>
#include <stdlib.h>
int g = 0;          // → Data segment (initialized global)
int main(int argc, char *argv[]) {
    int i = 0;              // → Stack (local variable)
    char *p = malloc(100);  // → Heap (100 bytes allocated)
    // ... 
    free(p);
    return 0;
}

Memory layout:
  Stack:      argc, argv, i, p (pointer variable), return addr
  Heap:       100 bytes from malloc()
  Data:       g = 0
  Text:       compiled code of main(), printf, scanf`,
      explanation: "Text = code. Data/BSS = globals. Heap = dynamic (malloc). Stack = function frames.",
    },
    examTips: [
      "Stack grows DOWN, Heap grows UP — toward each other",
      "BSS = uninitialized globals (auto-zeroed). Data = initialized globals.",
      "malloc() allocates from HEAP. Local variables are on STACK.",
      "Stack overflow = stack and heap meet (or too many recursive calls)",
    ],
    questions: [
      { q: "Draw the memory map of a process executing this program (PYQ):\nint g = 0;\nint main() { int i = 0; char *p = malloc(100); ... free(p); return 0; }", a: "Memory layout (high to low address):\n• Stack: argc, argv[] pointer, i (local var), p (the pointer variable itself), main()'s return address — Stack grows downward\n• [free space between stack and heap]\n• Heap: 100 bytes allocated by malloc(100), freed by free(p) — Heap grows upward\n• BSS: g = 0 (initialized global goes in DATA, but if uninitialized would be BSS)\n• Data: g = 0 (initialized global variable)\n• Text: compiled machine code of main(), printf, scanf (read-only)" },
      { q: "What is the difference between a program and a process?", a: "A program is a passive entity — a file stored on disk containing instructions (e.g., /bin/ls). A process is an active entity — a program that has been loaded into memory and is currently executing, with its own: program counter, CPU registers, stack, heap, and address space. One program can give rise to many processes (e.g., 5 users each running vim = 5 separate processes)." },
    ],
  },

  "pcb-states": {
    title: "Process States, PCB & Queues", emoji: "📊",
    tldr: "5 states: New → Ready → Running → Waiting → Terminated. PCB = OS data structure for each process. Short/long/medium-term schedulers.",
    explanation: `Process States — the lifecycle of a process:

1. New: Process is being created (fork() called, PCB being set up)
2. Ready: Process is in memory, waiting to be assigned to a processor (in the ready queue)
3. Running: Instructions are being executed on the CPU (only ONE process per core at a time)
4. Waiting / Blocked: Process is waiting for an EVENT to complete (I/O, signal, timer) — NOT on CPU
5. Terminated: Process has finished execution (exit() called, all resources being freed)

Key transitions:
• New → Ready: process admitted to memory
• Ready → Running: CPU scheduler dispatches (picks) it
• Running → Ready: PREEMPTED (timer expired or higher-priority process arrived)
• Running → Waiting: process requests I/O or event
• Waiting → Ready: I/O complete or event occurred (process re-enters ready queue)
• Running → Terminated: process exits or is killed

IMPORTANT: Waiting → Ready does NOT preempt the running process. The process goes to the READY QUEUE, not directly to the CPU.

Process Control Block (PCB):
The OS represents each process with a PCB. Contains:
1. Process state (running, waiting, ready, etc.)
2. Program counter — address of next instruction
3. CPU registers — all register values (saved on context switch)
4. CPU scheduling info — priority, queue pointers
5. Memory management info — base/limit registers, page tables
6. Accounting info — CPU time used, elapsed time
7. I/O status info — list of open files, allocated I/O devices

Think of PCB as a process's "passport" — everything the OS needs to know about it.`,
    keyPoints: [
      "5 states: New, Ready, Running, Waiting/Blocked, Terminated",
      "Only ONE process per CPU core can be RUNNING at a time",
      "Ready: in memory, waiting for CPU. Waiting: blocked for I/O/event.",
      "Ready → Running: scheduler dispatches (chooses)",
      "Running → Ready: preempted (timer or higher priority)",
      "Running → Waiting: I/O request. Waiting → Ready: I/O done.",
      "PCB = OS data structure representing one process. 7 fields.",
      "Context switch: save old PCB → load new PCB",
      "Job queue: ALL processes. Ready queue: waiting for CPU. Device queues: waiting for I/O.",
    ],
    formula: {
      code: `Process State Diagram:

         ┌──────────────────────────────────┐
         │              ADMITTED            │
  [NEW] ─┤───────────────────────────────→ [READY]
         │                                  ↑  │
         │                           I/O done  │ Scheduler dispatches
         │                                  │  ↓
         │                              [RUNNING] ──→ [TERMINATED]
         │                                  │
         │                         I/O request
         │                                  ↓
         │                              [WAITING]
         └──────────────────────────────────┘

A-F Transitions (PYQ standard labeling):
  A: New → Ready         (process admitted)
  B: Ready → Running     (scheduler dispatches to CPU)
  C: Running → Waiting   (process requests I/O)
  D: Running → Terminated(process exits)
  E: Running → Ready     (preempted — quantum expired/higher priority)
  F: Waiting → Ready     (I/O complete / event occurs)

PCB Contents:
  ┌─────────────────────────────┐
  │ Process State  (RUNNING)    │
  │ Program Counter (0x401234)  │
  │ CPU Registers  (all regs)   │
  │ Scheduling Info (priority)  │
  │ Memory Info    (page table) │
  │ Accounting     (CPU used)   │
  │ I/O Status     (open files) │
  └─────────────────────────────┘`,
      explanation: "Ready ≠ Running. A process can be Ready (has everything, waiting for CPU) or Running (actively on CPU). Only one per core runs at a time.",
    },
    examTips: [
      "Waiting → Ready does NOT give the process the CPU immediately — joins ready QUEUE",
      "Only 1 process per CPU core can be RUNNING. Many can be READY or WAITING.",
      "PCB = identity card of process. 7 fields — state, PC, registers, scheduling, memory, accounting, I/O",
      "A-F transitions: memorize which letter = which transition for PYQ diagrams",
    ],
    questions: [
      { q: "Identify process states and transitions with labels A, B, C, D, E, F (PYQ)", a: "A: New → Ready (process admitted to memory)\nB: Ready → Running (scheduler dispatches to CPU)\nC: Running → Waiting (process requests I/O or event)\nD: Running → Terminated (process exits or is killed)\nE: Running → Ready (preempted — quantum expired or higher priority arrived)\nF: Waiting → Ready (I/O complete or event occurred — joins ready queue, doesn't immediately run)\n\nStatement I: 'A process can move to ready state when I/O completes irrespective of other process being in running state.' → TRUE. Waiting→Ready (F) happens independently of what's running. The process joins the ready queue.\nStatement II: 'Transition D (Running→Terminated) immediately causes Transition A (New→Ready).' → FALSE. D causes B (ready process gets CPU), not A (new process admitted). These are independent events." },
      { q: "What information does a PCB store?", a: "7 categories: 1. Process state (running/waiting/ready/etc.). 2. Program counter (address of next instruction). 3. CPU registers (all register values — accumulators, index, stack pointer, general-purpose). 4. CPU scheduling info (priority, queue pointers). 5. Memory management info (base/limit registers, page tables). 6. Accounting info (CPU time used, elapsed time, time limits). 7. I/O status info (list of open files, allocated I/O devices)." },
    ],
  },

  "schedulers-types": {
    title: "Schedulers & CPU-I/O Burst Cycle", emoji: "⚖️",
    tldr: "3 schedulers: Short-term (CPU, fast), Long-term (job, slow), Medium-term (swapper). I/O-bound = short bursts, CPU-bound = long bursts.",
    explanation: `CPU-I/O Burst Cycle:
Every process alternates between: CPU burst (actively computing) → I/O burst (waiting for device) → CPU burst → ... until it terminates.

I/O-bound process: spends more time doing I/O than computing. Has MANY SHORT CPU bursts. Example: text editor (you type → CPU processes → waits for next keystroke), database server.

CPU-bound process: spends more time computing. Has FEW VERY LONG CPU bursts. Example: video encoder, scientific simulation, matrix multiplication.

Three Types of Schedulers:

1. Long-term Scheduler (Job Scheduler):
Selects from job pool on disk → loads into memory (ready queue). Controls DEGREE OF MULTIPROGRAMMING (how many processes are in memory). Invoked infrequently (seconds/minutes). Strategy: maintain good MIX of I/O-bound and CPU-bound. If all CPU-bound → ready queue overloads, I/O devices idle. If all I/O-bound → CPU idles, I/O devices overloaded.

2. Short-term Scheduler (CPU Scheduler):
Selects from ready queue → allocates CPU. Invoked VERY FREQUENTLY (every millisecond). Must be EXTREMELY FAST. Directly determines system response time. Even a 10ms scheduling decision for 100ms quantum = 10% overhead.

3. Medium-term Scheduler (Swapper):
When degree of multiprogramming must decrease (memory pressure), removes processes from memory → disk (swapping out). Later, brings them back (swapping in). Reduces multiprogramming temporarily to relieve memory pressure.`,
    keyPoints: [
      "CPU-I/O burst cycle: alternates CPU burst and I/O wait until termination",
      "I/O-bound: many SHORT CPU bursts. Example: word processor, database",
      "CPU-bound: few LONG CPU bursts. Example: scientific computation, encoder",
      "Long-term: infrequent (seconds/min), selects jobs from disk, controls multiprogramming degree",
      "Short-term: very frequent (ms), selects from ready queue, must be fast",
      "Medium-term: swapping — removes processes from memory to disk and back",
      "Long-term strategy: mix I/O-bound + CPU-bound for maximum utilization",
    ],
    formula: {
      code: `CPU-I/O Burst Cycle:
  [CPU burst 5ms] → [I/O wait 100ms] → [CPU burst 3ms] → [I/O wait 50ms] → exit
  (I/O-bound: short CPU, long I/O)

  [CPU burst 500ms] → [I/O wait 2ms] → [CPU burst 800ms] → exit
  (CPU-bound: long CPU, short I/O)

Scheduler Comparison:
  ┌──────────────┬──────────────┬──────────────────────────┐
  │ Scheduler    │ Frequency    │ Function                 │
  ├──────────────┼──────────────┼──────────────────────────┤
  │ Long-term    │ seconds/min  │ disk → memory (job pool) │
  │ Short-term   │ milliseconds │ ready queue → CPU        │
  │ Medium-term  │ as needed    │ memory ↔ disk (swapping) │
  └──────────────┴──────────────┴──────────────────────────┘

Good Mix (long-term strategy):
  I/O-bound: ████░░░░░░████░░░░  (CPU short, I/O long)
  CPU-bound: ░░░░████████░░░████  (CPU long, I/O short)
  Combined:  ALL resources always busy!`,
      explanation: "Long-term controls HOW MANY processes in memory. Short-term decides WHO runs NOW. Medium-term manages OVERFLOW.",
    },
    examTips: [
      "Short-term: FREQUENT (ms), FAST. Long-term: INFREQUENT (s/min), can be slow.",
      "Long-term controls DEGREE OF MULTIPROGRAMMING",
      "I/O-bound vs CPU-bound: long-term scheduler aims to MIX them",
      "Medium-term = swapping (process to disk and back). Reduces multiprogramming.",
    ],
    questions: [
      { q: "Explain the three types of schedulers in OS. (PYQ)", a: "1. Long-term (Job) Scheduler: Selects from the job pool on disk and loads into memory (ready queue). Controls degree of multiprogramming. Invoked infrequently (seconds/minutes). Tries to maintain a good mix of I/O-bound and CPU-bound processes for maximum utilization.\n\n2. Short-term (CPU) Scheduler: Selects a process from the ready queue and allocates the CPU. Invoked very frequently (every milliseconds). Must be extremely fast. Directly affects system response time.\n\n3. Medium-term Scheduler (Swapper): Temporarily removes processes from memory (swapping out to disk) to reduce degree of multiprogramming when memory is overloaded. Later swaps them back in." },
    ],
  },

  "context-switch": {
    title: "Context Switch", emoji: "🔁",
    tldr: "Context switch: save old PCB + load new PCB. PURE OVERHEAD — no useful work done. Faster with hardware support (multiple register sets).",
    explanation: `When the CPU switches from one process to another, the OS must:
1. Save the complete state of the current process to its PCB (all registers, PC, memory pointers)
2. Select the next process to run (done by the scheduler)
3. Load the saved state from the new process's PCB
4. Resume execution of the new process

Context switch time = PURE OVERHEAD. No useful computation happens while switching. If context switch takes 1ms and time quantum is 10ms, that's 10% overhead — just for switching!

Factors affecting context switch time:
• OS complexity (more info to save = longer switch)
• Hardware support: some CPUs have multiple register sets (hardware contexts) — can switch almost instantly
• Memory speed (loading page tables takes time)

How does the OS switch from P0 to P1 when P0 makes a system call?
1. P0 executes a system call (e.g., I/O). Trap instruction → CPU to kernel mode.
2. Kernel saves P0's context (ALL CPU registers, PC, stack pointer) → P0's PCB. P0 state: Running → Waiting.
3. CPU scheduler selects next process → selects P1.
4. Kernel loads P1's context from P1's PCB (restores registers, PC, stack pointer). P1 state: Ready → Running.
5. CPU switches to user mode and jumps to P1's saved program counter.
6. P1 resumes exactly where it left off.`,
    keyPoints: [
      "Context switch: save old PCB → select next → load new PCB",
      "Context = all process state: registers, PC, memory info, etc.",
      "Context switch = PURE OVERHEAD. No useful work during switch.",
      "More complex OS/PCB = longer switch time",
      "Hardware with multiple register sets → faster context switches",
      "System call → saves P0's PCB → loads P1's PCB → P1 runs",
      "Dispatch latency = time taken by dispatcher to switch processes",
    ],
    formula: {
      code: `Context Switch Timeline:

  P0 running  │ save P0 ctx  │ P1 running
  ────────────────────────────────────────
              │← dispatch   →│
              │  latency     │
              │(pure overhead│
              │ no useful    │
              │   work!)     │

P0 → P1 switch (system call scenario):
  1. P0 makes system call → TRAP → kernel mode
  2. Save P0's: PC, SP, registers → P0's PCB
  3. P0 state: Running → Waiting
  4. Scheduler picks P1
  5. Load P1's: PC, SP, registers ← P1's PCB
  6. P1 state: Ready → Running
  7. Jump to P1's saved PC in user mode
  → P1 continues from where it left off!`,
      explanation: "Every context switch = overhead. Minimizing it is critical. Hardware support (multiple register sets) can eliminate most of the cost.",
    },
    examTips: [
      "Context switch = PURE OVERHEAD — examiners love asking 'what useful work is done during context switch?' (Answer: NONE)",
      "Hardware multiple register sets → near-zero context switch time",
      "Context switch required for: preemption, system calls that block, I/O waits",
    ],
    questions: [
      { q: "How does the OS switch between P0 and P1 when P0 makes a system call? (PYQ)", a: "This is a context switch:\n1. P0 executes a system call (e.g., I/O request). Trap instruction switches CPU to kernel mode.\n2. Kernel saves P0's context (all CPU registers, PC, stack pointer) → P0's PCB. P0 state: Running → Waiting.\n3. CPU scheduler selects next process from ready queue → selects P1.\n4. Kernel loads P1's context from P1's PCB (restores registers, PC, stack pointer). P1 state: Ready → Running.\n5. CPU switches to user mode and jumps to P1's saved program counter.\n6. P1 resumes exactly where it left off.\n\nThe entire context switch is pure overhead — no useful work is done during the switch itself." },
    ],
  },

  "process-creation": {
    title: "Process Creation — fork, exec, vfork", emoji: "🌱",
    tldr: "fork() = duplicate process. exec() = replace process image. vfork() = share memory, child runs first. fork() returns: 0 to child, PID to parent.",
    explanation: `Process Creation:
Parent process creates child processes → forms a process tree. Each process has a unique PID (Process Identifier). UNIX/Linux: PID 1 = init (or systemd) = root of ALL processes.

Resource sharing options for child:
• Child gets copy of all parent resources
• Child shares a subset of parent resources  
• Child gets no shared resources (independent)

Execution options:
• Parent and child run concurrently (most common with fork())
• Parent waits for child to finish (parent calls wait())

fork() — creates a new child process:
• Child is an exact COPY of parent (data, heap, stack — copy-on-write)
• Both continue from the same instruction after fork()
• Returns: 0 to child, child's PID to parent, -1 on error
• Modern Linux uses Copy-On-Write (COW) — pages only actually copied when modified

exec() — replaces current process image:
• Does NOT create a new process (PID stays the same!)
• Replaces: text, data, heap, stack with a new program
• Typical pattern: fork() + exec() in child = child runs a different program
• Returns: -1 on failure, NO RETURN on success (process is replaced!)

vfork() — optimized fork for exec:
• Does NOT copy parent's address space (shares memory temporarily)
• Child runs FIRST until it calls exec() or exit()
• More efficient when child immediately calls exec()

Orphan process: Parent exits WITHOUT calling wait(). Child is re-parented to init (PID 1).
Zombie process: Child exits but parent hasn't called wait() yet. Entry stays in process table.`,
    keyPoints: [
      "Parent creates children → process tree. Root = init (PID 1).",
      "fork(): creates exact copy of parent. Child has new PID.",
      "fork() returns: 0 to child, child PID to parent, -1 on error",
      "exec(): replaces process image with new program. PID unchanged.",
      "exec() does NOT return on success. Returns -1 on failure.",
      "fork() + exec() = create child running a different program",
      "vfork(): NO address space copy. Child runs first until exec/exit.",
      "Copy-On-Write (COW): pages only copied when actually modified",
    ],
    formula: {
      code: `Classic fork() + exec() pattern:
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();
    
    if (pid < 0) {
        perror("Fork failed"); return 1;     // error
    } else if (pid == 0) {
        // CHILD: runs here
        printf("Child PID=%d\\n", getpid());
        execlp("/bin/ls", "ls", "-l", NULL); // replace with ls
        perror("exec failed");               // only if exec fails
    } else {
        // PARENT: runs here  
        printf("Parent: child is PID %d\\n", pid);
        wait(NULL);   // wait for child to finish
        printf("Child done!\\n");
    }
    return 0;
}

Orphan Process Program:
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();
    if (pid > 0) {
        // Parent exits IMMEDIATELY without wait()
        printf("Parent PID: %d, exiting now...\\n", getpid());
        exit(0);  ← parent exits here!
    } else if (pid == 0) {
        sleep(2); // give parent time to die
        // getppid() now returns 1 (init) since parent is gone
        printf("Orphan child PID: %d, new parent: %d\\n",
               getpid(), getppid());
    }
    return 0;
}`,
      explanation: "fork() = duplicate. exec() = transform. vfork() = share + child first. These 3 are the foundation of Unix process creation.",
    },
    examTips: [
      "fork() child returns 0. Parent returns child PID. Error returns -1. MEMORIZE.",
      "exec() does NOT change PID. Replaces text+data+heap+stack.",
      "vfork(): NO address space copy. Child runs FIRST until exec/exit.",
      "Process tree root in Linux: init (PID 1) or systemd",
    ],
    questions: [
      { q: "Write a C program to create an orphan process. (PYQ)", a: "#include <stdio.h>\n#include <stdlib.h>\n#include <unistd.h>\n\nint main() {\n    pid_t pid = fork();\n    if (pid > 0) {\n        // Parent exits immediately WITHOUT wait()\n        printf(\"Parent PID: %d, exiting now...\\n\", getpid());\n        exit(0);\n    } else if (pid == 0) {\n        sleep(2); // give parent time to die\n        // getppid() now returns 1 (init) since parent is gone\n        printf(\"Orphan child PID: %d, new parent PID: %d\\n\",\n               getpid(), getppid());\n    }\n    return 0;\n}\n\nExplanation: Parent exits before the child (no wait()). OS re-parents the child to init (PID 1). After sleep(2), getppid() returns 1." },
      { q: "Identify and fix the serious issue in this fork/exec code. (PYQ)\nparent: exit(0) without wait(). child: execl('/bin/ls', '/home', '-l', NULL)", a: "Two bugs:\n1. Parent calls exit(0) without wait() → child becomes an orphan (or zombie if child finishes first).\n2. execl argument order is wrong — first arg after path should be argv[0] (program name 'ls'), not the path '/home'.\n\nFixed code:\nif (pid > 0) {\n    wait(NULL);  // FIX: wait for child\n    printf(\"Child completed.\\n\");\n} else if (pid == 0) {\n    execl(\"/bin/ls\", \"ls\", \"-l\", \"/home\", NULL); // FIX: argv[0]='ls'\n    perror(\"execl failed\");\n    exit(1);\n}" },
      { q: "Write a C program where child executes another program. (PYQ)", a: "#include <stdio.h>\n#include <stdlib.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main() {\n    pid_t pid = fork();\n    if (pid < 0) {\n        perror(\"Fork failed\"); exit(1);\n    } else if (pid == 0) {\n        // Child: replace itself with ls program\n        printf(\"Child PID: %d\\n\", getpid());\n        execlp(\"/bin/ls\", \"ls\", \"-l\", \"/home\", NULL);\n        perror(\"exec failed\"); exit(1);\n    } else {\n        // Parent: wait for child\n        int status;\n        wait(&status);\n        printf(\"Child exited with status: %d\\n\", WEXITSTATUS(status));\n    }\n    return 0;\n}\n\nfork() creates child. Child calls execlp() to replace itself with /bin/ls. Parent calls wait() to avoid zombie." },
      { q: "What is the difference between fork() and exec()?", a: "fork() creates a new process by duplicating the calling process — both parent and child then run the same code from the same point, with separate memory copies. exec() does NOT create a new process — it replaces the calling process's memory (text, data, heap, stack) with a completely new program. PID stays the same after exec(). The typical pattern is fork() followed by exec() in the child to create a child running a different program." },
    ],
  },

  "process-termination": {
    title: "Process Termination — exit, wait, zombie, orphan", emoji: "💀",
    tldr: "exit(): normal termination. Zombie: child terminated, parent hasn't waited. Orphan: parent terminated first, child re-parented to init.",
    explanation: `Process Termination:
Normal exit: process executes last statement → calls exit(). Returns status to parent via wait(). OS deallocates all resources.

5 normal ways to terminate:
1. Return from main() 
2. Call exit()
3. Call _exit() or _Exit()
4. Last thread returns from start routine
5. pthread_exit() from last thread

3 abnormal ways:
1. Call abort() — abnormal termination signal
2. Receive a signal (SIGKILL, SIGSEGV, etc.)
3. Last thread responds to cancellation

Cascading termination: some OSes (like Windows) automatically terminate all children when parent terminates.

Zombie process: Child has terminated (called exit()) but parent has NOT yet called wait() to collect its exit status. The OS keeps a minimal entry in the process table (just enough to hold the exit status). This entry is the "zombie" — dead but not cleaned up. If the parent never calls wait() → zombies accumulate → process table fills up (resource leak!).

Orphan process: Parent terminated WITHOUT calling wait(). The orphaned child is re-parented to init (PID 1). init periodically calls wait() for all its children, cleaning up properly.

How to avoid zombies: always call wait() or waitpid() in the parent after forking.`,
    keyPoints: [
      "exit(): normal termination. Returns exit status to parent via wait().",
      "5 normal + 3 abnormal ways to terminate",
      "Zombie: child exited, parent NOT yet called wait(). Still in process table.",
      "Zombie risk: process table fills up if zombies accumulate (resource leak)",
      "Orphan: parent exited without wait(). Child re-parented to init (PID 1).",
      "init (PID 1) always calls wait() for orphaned children — prevents zombies",
      "Cascading termination: parent exits → OS kills all descendants (some OSes)",
      "wait(): parent gets child's exit status + PID. Blocks if child still running.",
    ],
    formula: {
      code: `Zombie Creation (BAD - bug):
  Child:  exit(0)           → state = zombie (waiting for parent)
  Parent: [never calls wait()]  → zombie stays forever!
  → Process table fills up → system cannot create new processes!

Zombie Prevention (GOOD):
  Child:  exit(0)
  Parent: wait(&status)     → collects exit status
                            → zombie REMOVED from process table ✓

Orphan Creation:
  fork() → Parent: exit(0) [no wait!]
         → Child still running
  OS: re-parents child to init (PID 1)
  init: periodically calls wait() → cleans up ✓

Check zombies on your Linux system:
  ps aux | grep 'Z'   ← Z = zombie state`,
      explanation: "Zombie = dead but not collected. Orphan = parent died, adopted by init. Both need wait() to be properly handled.",
    },
    examTips: [
      "Zombie: child DONE, parent NOT called wait() yet. Still in process table.",
      "Orphan: parent DONE first. Child re-parented to init (PID 1).",
      "Cascading termination: some OSes kill ALL children when parent exits.",
      "wait() removes zombie. If parent never calls wait() → zombie accumulates (memory leak).",
    ],
    questions: [
      { q: "What is a zombie process? How does it differ from an orphan?", a: "Zombie: a child that has terminated (called exit()) but whose parent has not yet called wait() to collect its exit status. The OS keeps a minimal process table entry to preserve the exit status. If the parent never calls wait(), zombies accumulate and eventually fill the process table.\n\nOrphan: a child whose parent has terminated without calling wait(). The OS re-parents it to init (PID 1), which periodically calls wait() for all its children, preventing zombie accumulation." },
    ],
  },

  "ipc-models": {
    title: "IPC — Inter-Process Communication", emoji: "🔗",
    tldr: "Two IPC models: Shared Memory (fast, no kernel per exchange) and Message Passing (slower, kernel involved). Pipes = unidirectional byte streams.",
    explanation: `Inter-Process Communication (IPC):
Processes need to communicate and cooperate. Two fundamental models:

1. Shared Memory:
A region of memory is shared between cooperating processes. After initial setup (which requires OS help to create the shared region), processes read/write directly to this shared memory WITHOUT kernel involvement per exchange. FAST.

Example: Producer-Consumer problem — producer writes to shared buffer, consumer reads from it.

Must use synchronization (semaphores/mutexes) to prevent race conditions — if two processes write simultaneously, data gets corrupted.

Best for: large data exchange, high-frequency communication between processes on the same machine.

2. Message Passing:
Processes communicate by sending and receiving messages. The KERNEL manages every transfer — it's involved in each send/receive. SLOWER than shared memory but simpler.

Can be:
• Direct (name the recipient): send(P2, message)
• Indirect (use mailbox/port): send(mailbox_A, message)
• Blocking (synchronous): sender blocks until receiver gets message
• Non-blocking (asynchronous): sender sends and continues immediately

Best for: distributed systems (across network), when processes are on different machines, simpler synchronization needs.

Pipes — Classic Unix IPC:
A pipe is a unidirectional byte stream between two related processes.
• Created via pipe() system call → returns fd[0] (read end) and fd[1] (write end)
• Unnamed pipes: ONLY between parent and child (created after fork())
• Named pipes (FIFOs): have a filesystem name, any process can open them (mkfifo())`,
    keyPoints: [
      "Two IPC models: Shared Memory (fast) and Message Passing (simpler)",
      "Shared memory: processes map same region into their address space",
      "Shared memory: NO kernel per exchange after setup. Very fast.",
      "Shared memory: REQUIRES synchronization (semaphores/mutexes)",
      "Message passing: kernel mediates every send/receive. Slower.",
      "Message passing: easier to use across distributed systems",
      "Direct vs Indirect: name the process vs use a mailbox/port",
      "Blocking (synchronous) vs Non-blocking (asynchronous)",
      "Pipe: unidirectional byte stream. fd[0]=read, fd[1]=write.",
      "Named pipe (FIFO): persistent, any process can open it",
    ],
    formula: {
      code: `Shared Memory:
  Process A │ Process B
  ──────────┼──────────
     writes │ reads
            │
  ┌─────────┴──────────┐
  │   Shared Memory    │ ← mapped into BOTH address spaces
  │   (kernel created) │
  └────────────────────┘
  Fast! No kernel per exchange. But needs semaphores for sync.

Message Passing:
  Process A   ──send(msg)──→   KERNEL   ──recv(msg)──→   Process B
  Slower (kernel every time), but simpler + works across network.

Pipe Example (Unix):
#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main() {
    int fd[2];
    pipe(fd);      // fd[0]=read, fd[1]=write
    pid_t pid = fork();
    
    if (pid > 0) {           // PARENT writes
        close(fd[0]);        // close read end
        char msg[] = "Hello from parent!";
        write(fd[1], msg, strlen(msg) + 1);
        close(fd[1]);
    } else {                 // CHILD reads
        close(fd[1]);        // close write end
        char buf[100];
        read(fd[0], buf, sizeof(buf));
        printf("Child got: %s\\n", buf);
        close(fd[0]);
    }
    return 0;
}`,
      explanation: "Shared memory: fast but needs sync. Message passing: simple but kernel overhead. Pipes: simplest for parent-child.",
    },
    examTips: [
      "Shared memory: fast (no kernel per exchange). Needs synchronization.",
      "Message passing: slower (kernel per exchange). Simpler. Works across network.",
      "Pipe: unidirectional. fd[0]=read end, fd[1]=write end.",
      "Named pipe (FIFO): any process, not just parent-child. Created with mkfifo().",
    ],
    questions: [
      { q: "Explain the two models of IPC. (PYQ)", a: "1. Shared Memory: A region of memory is shared between cooperating processes. After OS creates the shared region, processes read/write directly — NO kernel involvement per exchange. Fast. Requires synchronization (semaphores/mutexes) to prevent race conditions. Good for large, frequent data exchange between processes on the same machine. Example: producer-consumer with shared buffer.\n\n2. Message Passing: Processes communicate via send(message) and receive(message) system calls. The KERNEL manages every transfer. Slower (kernel overhead per exchange). Easier to implement and works across distributed systems (different machines). Can be direct (named recipient) or indirect (mailbox/port). Can be blocking or non-blocking." },
      { q: "How does a pipe work in IPC? (PYQ)", a: "A pipe is a simple, unidirectional byte-stream IPC mechanism.\n\nCreated via pipe() system call → returns fd[0] (read end) and fd[1] (write end).\n\nUnnamed (ordinary) pipes: only between related processes (parent-child). Created before fork(). Parent closes one end, child closes the other — communication is one-directional.\n\nNamed pipes (FIFOs): have a filesystem name (created with mkfifo()). Any process can open them. Persist beyond the lifetime of processes.\n\nLimitation: pipes are UNIDIRECTIONAL (one end reads, other writes). For bidirectional communication, two pipes are needed." },
    ],
  },

  "io-lifecycle": {
    title: "Life Cycle of an I/O Request", emoji: "📤",
    tldr: "Process → syscall → kernel validates → device driver → controller → BLOCKED → context switch → interrupt → ISR → READY → resume.",
    explanation: `The I/O Life Cycle defines the complete sequence from a process requesting I/O to resuming execution. This is also the answer to the classic PYQ about what happens when printf("Hello world\\n") executes.

Phase 1 — Initiation:
Process calls a library function (e.g., printf). Library calls the appropriate system call (write). TRAP instruction → CPU switches to kernel mode. Kernel validates parameters and file descriptors. Identifies target device and device driver.

Phase 2 — Kernel Processing:
Creates I/O request data structure. Places request in device's I/O queue. The requesting process is BLOCKED — state changes from Running → Waiting. OS performs a context switch → another process gets the CPU. CPU and I/O work in PARALLEL — this is the efficiency gain!

Phase 3 — Device Execution:
Device driver converts the request to hardware-specific commands. Programs the device controller to start the operation. DMA (if applicable) transfers data autonomously.

Phase 4 — Completion:
Device generates an interrupt when done. CPU executes the ISR. ISR verifies completion, handles any errors. Blocked process moved from Waiting → Ready state. Scheduler eventually picks process → execution resumes. System call returns to user mode.`,
    keyPoints: [
      "I/O starts with system call (read/write/open) → mode switch to kernel",
      "Kernel validates request, identifies device driver, queues request",
      "Process goes BLOCKED (waiting state) while I/O executes",
      "Context switch: another process uses CPU while I/O runs — key efficiency!",
      "Device finishes → interrupt → ISR handles completion",
      "ISR moves process from waiting → ready state",
      "Scheduler eventually runs the process again → execution resumes",
      "System call returns → back to user mode",
    ],
    formula: {
      code: `What happens when printf("Hello world\\n") executes? (PYQ)

  1. User program calls printf() — a C library function
  2. printf() formats the string
  3. printf() calls write() system call with fd=1 (stdout) and buffer
  4. TRAP instruction executes → CPU: user mode → kernel mode
  5. Kernel: validates fd=1 (stdout), checks permissions
  6. Kernel: identifies output device (terminal) and its driver
  7. Device driver: sends characters to terminal controller's buffer
  8. Controller: outputs characters to the screen
  9. On completion: device generates an interrupt
  10. ISR processes completion → write() returns bytes written
  11. CPU: kernel mode → user mode
  12. printf() returns to the user program

I/O Request Lifecycle (general):
  Process: read(fd, buf, 1024)
   ↓ [1] System call → user→kernel mode
   ↓ [2] Kernel validates params, identifies driver
   ↓ [3] Creates I/O request, queues it
   ↓ [4] Process → BLOCKED (Running→Waiting)
   ↓ [5] Context switch → Process B runs on CPU
  
  [I/O executes in parallel!]
  
   ↓ [6] Device done → raises INTERRUPT
   ↓ [7] ISR runs → data in buffer
   ↓ [8] Process → READY (Waiting→Ready)
   ↓ [9] Eventually scheduled → resumes`,
      explanation: "Steps 5-6: CPU runs other processes while I/O executes = true parallelism = efficiency.",
    },
    examTips: [
      "printf() is NOT a system call — it calls write(). Know the chain.",
      "Process is BLOCKED during I/O — NOT running, NOT ready",
      "Context switch during I/O: another process gets CPU (key efficiency gain)",
      "The printf PYQ has 10 steps — kernel validates, driver sends, interrupt, ISR, return",
    ],
    questions: [
      { q: "What actions does the OS perform while executing printf('Hello world\\n')? (PYQ)", a: "1. User program calls printf() — a C library function.\n2. printf() formats the string, then calls the write() system call with fd=1 (stdout) and the buffer.\n3. Trap instruction executes → CPU switches from user mode to kernel mode.\n4. Kernel validates fd=1 (stdout), checks permissions.\n5. Kernel identifies output device (terminal) and its driver.\n6. Device driver sends characters to the terminal controller's buffer.\n7. Controller outputs characters to the screen.\n8. On completion, device generates an interrupt.\n9. ISR processes completion. write() returns number of bytes written.\n10. CPU switches back to user mode. printf() returns to the user program." },
      { q: "What happens to a process that initiates a blocking I/O request?", a: "The process moves from running → waiting state (blocked). The OS performs a context switch, allowing another process to use the CPU. When the I/O completes, the device generates an interrupt. The ISR handles it and moves the blocked process from waiting → ready state. The scheduler eventually assigns the CPU back to the process." },
    ],
  },

  "sched-criteria": {
    title: "Scheduling Criteria & Goals", emoji: "📊",
    tldr: "5 criteria: CPU utilization, Throughput, Turnaround time, Waiting time, Response time. Maximize first 2, minimize last 3.",
    explanation: `CPU Scheduling goals: decide which process in the ready queue gets the CPU next.

5 Scheduling Criteria:
1. CPU Utilization: keep CPU as busy as possible. Range: 40% (light load) to 90% (heavy load). MAXIMIZE.
2. Throughput: number of processes completing execution per time unit. MAXIMIZE.
3. Turnaround Time: total time from submission to completion. MINIMIZE. Good for batch systems.
4. Waiting Time: total time a process spends waiting in the READY QUEUE only. MINIMIZE. This is what scheduling algorithms directly control.
5. Response Time: time from request until first response. MINIMIZE. Critical for interactive systems.

Key insight: Waiting time only counts time in the ready queue, NOT time doing I/O or time actually executing. Scheduling can only directly affect waiting time.

Key formulas:
• Turnaround Time (TAT) = Completion Time − Arrival Time
• Waiting Time (WT) = Turnaround Time − Burst Time = TAT − Burst
• Alternatively: WT = Start Time − Arrival Time (for non-preemptive, simpler)
• Response Time = Time of First CPU Assignment − Arrival Time
• Average = sum / number of processes`,
    keyPoints: [
      "CPU Utilization: MAXIMIZE (keep CPU busy, target 40-90%)",
      "Throughput: processes/second — MAXIMIZE",
      "Turnaround time: submission → completion — MINIMIZE",
      "Waiting time: time in READY QUEUE only — MINIMIZE",
      "Response time: first response — MINIMIZE (for interactive)",
      "WT = TAT − Burst. TAT = Completion − Arrival.",
      "Scheduling ONLY directly affects waiting time",
      "Response time matters for interactive, TAT matters for batch",
    ],
    formula: {
      code: `Key Formulas:
  TAT (Turnaround Time) = Completion − Arrival
  WT  (Waiting Time)    = TAT − Burst
                        = Completion − Arrival − Burst
  Response Time         = First CPU Time − Arrival

Example: P1 arrives at 0, burst=8, starts at 5, finishes at 13
  TAT = 13 − 0 = 13ms
  WT  = 13 − 8 = 5ms  (waited 5ms in ready queue)
  Response = 5 − 0 = 5ms

Average example (3 processes):
  P1: WT=0, P2: WT=24, P3: WT=27
  Avg WT = (0 + 24 + 27) / 3 = 17ms

MAXIMIZE: CPU utilization, Throughput
MINIMIZE: Turnaround Time, Waiting Time, Response Time`,
      explanation: "WT = TAT − Burst. It measures only time spent IDLE in queue, not running or doing I/O.",
    },
    examTips: [
      "Maximize: CPU utilization + throughput. Minimize: turnaround + waiting + response.",
      "WT = TAT − Burst. TAT = Completion − Arrival. Know these cold.",
      "Scheduling ONLY affects waiting time (not I/O wait time or execution time)",
      "Response time: for interactive. TAT: for batch. Different priorities.",
    ],
    questions: [
      { q: "Calculate TAT and WT: P1 arrives t=0, burst=8, starts at t=5, finishes at t=13.", a: "TAT = Completion − Arrival = 13 − 0 = 13ms. WT = TAT − Burst = 13 − 8 = 5ms. (Alternatively: WT = Start − Arrival = 5 − 0 = 5ms — same answer for non-preemptive.)" },
      { q: "What is the difference between waiting time and response time?", a: "Waiting time = TOTAL time spent waiting in the ready queue across ALL time slices (for the entire execution). Response time = time from submission until the FIRST response (first time process gets CPU). For batch systems, minimize turnaround/waiting. For interactive systems, minimize response time. In non-preemptive scheduling, these are equal (only one time slice). In preemptive (like RR), waiting time > response time." },
    ],
  },

  "preemptive-dispatcher": {
    title: "Preemptive Scheduling & Dispatcher", emoji: "🚦",
    tldr: "Preemptive: OS can forcibly take CPU. Non-preemptive: process keeps CPU until done/blocked. Dispatcher performs context switch.",
    explanation: `CPU scheduling decisions occur at 4 points:
1. Process switches from Running → Waiting (e.g., I/O request) — NON-preemptive
2. Process switches from Running → Ready (e.g., timer interrupt) — PREEMPTIVE
3. Process switches from Waiting → Ready (e.g., I/O completion) — PREEMPTIVE
4. Process terminates — NON-preemptive

Non-preemptive scheduling: once CPU allocated, process keeps it until it terminates or blocks. Simple, no race conditions. Problem: long processes block short ones (convoy effect).

Preemptive scheduling: OS can forcibly take CPU at any time. Required for modern interactive systems. Risk: race conditions if shared data is being modified when preempted. Solution: mutex locks to protect shared kernel data.

Dispatcher: the module that ACTUALLY gives CPU to the selected process. Three actions:
1. Context switch (save old state, load new state)
2. Switch to user mode (mode bit 0→1)
3. Jump to correct location in user program

Dispatch latency = time dispatcher takes to stop one process and start another. Must be minimized — it's pure overhead.

Scheduler vs Dispatcher: Scheduler DECIDES who runs next. Dispatcher EXECUTES the switch.`,
    keyPoints: [
      "Non-preemptive (conditions 1+4): process gives up CPU voluntarily",
      "Preemptive (conditions 2+3): OS forcibly reclaims CPU",
      "Non-preemptive: simpler, no race conditions. Problem: convoy effect",
      "Preemptive: requires mutex locks for shared data. Used in modern OSes.",
      "Dispatcher: does context switch + mode switch + jump to user program",
      "Dispatch latency: time to switch processes. PURE overhead. Minimize it.",
      "Scheduler = DECIDES. Dispatcher = EXECUTES the switch.",
    ],
    formula: {
      code: `4 Scheduling Decision Points:
  1. Running → Waiting   (I/O request)     → NON-PREEMPTIVE
  2. Running → Ready     (timer interrupt) → PREEMPTIVE
  3. Waiting → Ready     (I/O complete)   → PREEMPTIVE
  4. Terminates                            → NON-PREEMPTIVE

Preemption Risk:
  P1: reading shared_counter = ... (halfway)
  Timer fires → P1 preempted!
  P2: reads shared_counter → CORRUPT/STALE value!
  Fix: mutex lock BEFORE reading shared data

Dispatch Latency:
  [P1 running] → [save P1 ctx] → [load P2 ctx] → [P2 running]
                 ←────────── dispatch latency ──────────→
                 (pure overhead — no useful work!)`,
      explanation: "Preemptive = OS can interrupt. Non-preemptive = process decides when to yield. Modern OSes = preemptive.",
    },
    examTips: [
      "Non-preemptive: running→waiting (I/O) and terminate. These 2 ONLY.",
      "Preemptive: running→ready (timer) and waiting→ready (I/O done).",
      "Dispatcher ≠ scheduler. Scheduler picks. Dispatcher does the switch.",
      "Dispatch latency = overhead. Must minimize.",
    ],
    questions: [
      { q: "What are the 4 conditions for scheduling? Which are preemptive?", a: "1. Running→Waiting: I/O request (NON-preemptive — process voluntarily blocks). 2. Running→Ready: timer interrupt (PREEMPTIVE — OS forcibly takes CPU). 3. Waiting→Ready: I/O completion (PREEMPTIVE — can displace current process). 4. Terminates (NON-preemptive — process done voluntarily). Cases 1 and 4 are non-preemptive. Cases 2 and 3 are preemptive." },
    ],
  },

  "fcfs-sched": {
    title: "FCFS — First Come First Served", emoji: "🚶",
    tldr: "FCFS: non-preemptive FIFO. Simple but suffers convoy effect. Short processes stuck behind long ones.",
    explanation: `FCFS (First Come, First Served): The simplest scheduling algorithm. Processes are served in the order they arrive. Implemented with a basic FIFO queue.

Non-preemptive: once a process starts, it runs until completion (or I/O block). No time quantum.

Convoy Effect (major problem): If a long process arrives first, all shorter processes must wait behind it. This dramatically increases average waiting time.

Example: P1 arrives first with burst=24. P2 and P3 have burst=3 each.
• In order P1→P2→P3: P2 waits 24ms, P3 waits 27ms. Avg WT = 17ms.
• In order P2→P3→P1: P2 waits 0, P3 waits 3. Avg WT = 3ms!

The same processes, different arrival order → huge difference in wait time.

Not suitable for time-sharing systems (terrible response time for short processes). Works OK for batch systems where all jobs arrive at once and order doesn't matter much.`,
    keyPoints: [
      "FCFS: non-preemptive FIFO. Process served in arrival order.",
      "Convoy effect: short processes stuck behind long ones",
      "Average WT can be dramatically reduced by reordering",
      "Not suitable for time-sharing (poor response time)",
      "Simple to implement. No starvation (every process eventually runs).",
    ],
    formula: {
      code: `FCFS Solved Problem:
  P1 (burst=24), P2 (burst=3), P3 (burst=3). All arrive t=0.

  Gantt: | P1 (0────24) | P2 (24──27) | P3 (27──30) |

  Process │ Burst │ Arrival │ Completion │ TAT (C-A) │ WT (TAT-Burst)
  ──────────────────────────────────────────────────────────────────
    P1    │  24   │    0    │     24     │    24     │      0
    P2    │   3   │    0    │     27     │    27     │     24
    P3    │   3   │    0    │     30     │    30     │     27

  Avg TAT = (24+27+30)/3 = 27ms
  Avg WT  = (0+24+27)/3  = 17ms

  ⚠ CONVOY EFFECT: P2 and P3 (tiny jobs) wait 24ms and 27ms
    behind P1 (huge job).

  If order were P2→P3→P1:
  | P2 (0─3) | P3 (3─6) | P1 (6─30) |
  WT: P2=0, P3=3, P1=6 → Avg WT = (0+3+6)/3 = 3ms ← MUCH BETTER!`,
      explanation: "FCFS: simple but convoy effect kills performance. Same processes, different order = 17ms vs 3ms average wait.",
    },
    examTips: [
      "FCFS: non-preemptive FIFO. Convoy effect = main problem.",
      "Convoy effect: long process blocks all shorter processes behind it",
      "No preemption means once P1 starts, P2 and P3 MUST wait",
    ],
    questions: [
      { q: "What is the convoy effect in FCFS scheduling?", a: "The convoy effect occurs when a long CPU-bound process arrives first and all shorter processes must queue behind it. Example: P1 (burst=24) arrives at t=0, then P2 (burst=3) and P3 (burst=3). P2 and P3 wait 24ms and 27ms respectively — causing avg WT=17ms. If the order were reversed (P2→P3→P1), avg WT = 3ms. The 'convoy' of short processes follows the 'slow truck' (long process) and can't pass. FCFS is non-preemptive, so there's no way to skip ahead." },
    ],
  },

  "sjf-srtf": {
    title: "SJF & SRTF Scheduling", emoji: "⚡",
    tldr: "SJF: non-preemptive, run shortest burst first = optimal avg WT. SRTF: preemptive SJF, preempt if new arrival has shorter remaining time.",
    explanation: `SJF (Shortest Job First) — Non-preemptive:
Schedules the process with the shortest NEXT CPU burst first. OPTIMAL — provably minimizes average waiting time among all non-preemptive algorithms. Problem: burst length must be ESTIMATED (can't know future). Solution: exponential averaging.

Exponential Averaging: τ(n+1) = α × t(n) + (1−α) × τ(n)
• t(n) = actual nth burst length (measured after it runs)
• τ(n) = predicted nth burst length
• α = 0.5 is common (equal weight to recent and history)
• As α→1: recent history dominates. As α→0: all history equally weighted.

SRTF (Shortest Remaining Time First) — Preemptive SJF:
At EVERY scheduling event (new arrival or process completion), compare the remaining time of the running process vs the new process's burst. If new is shorter → PREEMPT the current process and run the new one.

Key formula for SRTF: WT = Completion − Arrival − Burst
(Because the process may run in multiple disconnected intervals)

Starvation is possible in both SJF and SRTF: long processes may never run if short ones keep arriving. Solution: Aging (increase priority over time).`,
    keyPoints: [
      "SJF: non-preemptive. Shortest burst runs first. Optimal avg WT.",
      "SRTF: preemptive SJF. Preempt if new arrival has shorter REMAINING time.",
      "Exponential averaging: τ(n+1) = α×t(n) + (1-α)×τ(n) — predicts next burst",
      "α=0.5: equal weight to recent burst and historical average",
      "SRTF key formula: WT = Completion − Arrival − Burst",
      "Both SJF/SRTF: starvation possible for long processes",
      "Aging solves starvation: gradually increase priority of waiting processes",
    ],
    formula: {
      code: `SJF Solved Problem (all arrive t=0):
  P1(b=6), P2(b=8), P3(b=7), P4(b=3)
  SJF order: P4(3) → P1(6) → P3(7) → P2(8)

  Gantt: | P4(0──3) | P1(3──9) | P3(9──16) | P2(16──24) |

  P4: WT=0-0=0   P1: WT=3-0=3   P3: WT=9-0=9   P2: WT=16-0=16
  Avg WT = (0+3+9+16)/4 = 7ms  (FCFS gives 10.25ms!)

─────────────────────────────────────────────
SRTF Solved Problem #1:
  P1(a=0,b=8), P2(a=1,b=4), P3(a=2,b=9), P4(a=3,b=5)

  t=0: Only P1 → run P1. rem=8.
  t=1: P2(4) arrives. P1 rem=7. 4<7 → PREEMPT P1, run P2.
  t=2: P3(9) arrives. P2 rem=3. 9>3 → P2 continues.
  t=3: P4(5) arrives. P2 rem=2. 5>2 → P2 continues.
  t=5: P2 done. Ready: P1(7), P3(9), P4(5). Min=P4 → run P4.
  t=10: P4 done. Ready: P1(7), P3(9). Run P1.
  t=17: P1 done. Run P3. Finishes t=26.

  Gantt: |P1(0-1)|P2(1-5)|P4(5-10)|P1(10-17)|P3(17-26)|

  P1: WT = 17-0-8 = 9    P2: WT = 5-1-4 = 0
  P3: WT = 26-2-9 = 15   P4: WT = 10-3-5 = 2
  Avg WT = (9+0+15+2)/4 = 6.5ms

─────────────────────────────────────────────
SRTF Solved Problem #2:
  A(a=0,b=9), B(a=1,b=8), C(a=2,b=6), D(a=4,b=4)

  t=0: A starts. rem=9.
  t=1: B(8) arrives. A rem=8. Tie → A continues.
  t=2: C(6) arrives. A rem=7. 6<7 → PREEMPT A, run C.
  t=4: D(4) arrives. C rem=4. Tie → C continues.
  t=8: C done. Ready: A(7), B(8), D(4). Min=D → run D.
  t=12: D done. Ready: A(7), B(8). Run A.
  t=19: A done. Run B. Finishes t=27.

  Gantt: |A(0-2)|C(2-8)|D(8-12)|A(12-19)|B(19-27)|

  A: TAT=19, WT=10   B: TAT=26, WT=18
  C: TAT=6,  WT=0    D: TAT=8,  WT=4
  Avg TAT = (19+26+6+8)/4 = 14.75ms
  Avg WT  = (10+18+0+4)/4 = 8ms

─────────────────────────────────────────────
SRTF Solved Problem #3:
  P1(a=3,b=4), P2(a=5,b=2), P3(a=0,b=2), P4(a=5,b=4), P5(a=4,b=2)

  t=0: P3(2) starts. Finishes t=2. CPU IDLE t=2-3 (no process).
  t=3: P1(4) arrives. Starts.
  t=4: P5(2) arrives. P1 rem=3. 2<3 → PREEMPT P1, run P5.
  t=5: P2(2), P4(4) arrive. P5 rem=1. Both>1 → P5 continues.
  t=6: P5 done. Ready: P1(3), P2(2), P4(4). Min=P2 → run P2.
  t=8: P2 done. Ready: P1(3), P4(4). Run P1.
  t=11: P1 done. Run P4. Finishes t=15.

  Gantt: |P3(0-2)|idle(2-3)|P1(3-4)|P5(4-6)|P2(6-8)|P1(8-11)|P4(11-15)|

  P1: WT=4   P2: WT=1   P3: WT=0   P4: WT=6   P5: WT=0
  Avg WT = (4+1+0+6+0)/5 = 2.2ms

─────────────────────────────────────────────
SRTF Solved Problem #4:
  P1(a=2,b=6), P2(a=5,b=2), P3(a=1,b=8), P4(a=0,b=3), P5(a=4,b=4)

  t=0: P4(3) starts.
  t=1: P3(8) arrives. P4 rem=2. 8>2 → P4 continues.
  t=2: P1(6) arrives. P4 rem=1. 6>1 → P4 continues.
  t=3: P4 done. Ready: P3(8), P1(6). Min=P1 → run P1.
  t=4: P5(4) arrives. P1 rem=5. 4<5 → PREEMPT P1, run P5.
  t=5: P2(2) arrives. P5 rem=3. 2<3 → PREEMPT P5, run P2.
  t=7: P2 done. Ready: P1(5), P3(8), P5(3). Min=P5 → run P5.
  t=10: P5 done. Ready: P1(5), P3(8). Run P1.
  t=15: P1 done. Run P3. Finishes t=23.

  Gantt: |P4(0-3)|P1(3-4)|P5(4-5)|P2(5-7)|P5(7-10)|P1(10-15)|P3(15-23)|

  P1: WT=7   P2: WT=0   P3: WT=14   P4: WT=0   P5: WT=2
  Avg WT = (7+0+14+0+2)/5 = 4.6ms

─────────────────────────────────────────────
SRTF Solved Problem #5:
  P1(a=0,b=20), P2(a=15,b=25), P3(a=30,b=10), P4(a=45,b=15)

  t=0: P1 starts.
  t=15: P2(25) arrives. P1 rem=5. 25>5 → P1 continues.
  t=20: P1 done. Run P2(25).
  t=30: P3(10) arrives. P2 rem=15. 10<15 → PREEMPT P2, run P3.
  t=40: P3 done. P2 resumes (rem=15).
  t=45: P4(15) arrives. P2 rem=10. 15>10 → P2 continues.
  t=55: P2 done. Run P4. Finishes t=70.

  Gantt: |P1(0-20)|P2(20-30)|P3(30-40)|P2(40-55)|P4(55-70)|

  P1: WT=0    P2: WT=15 (preempted at t=30, resumed at t=40)
  P3: WT=0    P4: WT=10
  P2 waiting time = 15ms
  Avg WT = (0+15+0+10)/4 = 6.25ms

─────────────────────────────────────────────
SJF Varying Arrivals:
  P1(b=6,a=2), P2(b=2,a=5), P3(b=8,a=1), P4(b=3,a=0), P5(b=4,a=4)

  t=0: Only P4 → run P4. Finishes t=3.
  t=3: Available: P3(a=1,b=8), P1(a=2,b=6). Shortest=P1 → run P1. Fin t=9.
  t=9: Available: P3(8), P2(a=5,b=2), P5(a=4,b=4). Shortest=P2 → run P2. Fin t=11.
  t=11: Available: P3(8), P5(4). Shortest=P5 → run P5. Fin t=15.
  t=15: Only P3 → run P3. Finishes t=23.

  Gantt: |P4(0-3)|P1(3-9)|P2(9-11)|P5(11-15)|P3(15-23)|

  P4: WT=0   P1: WT=1   P2: WT=4   P5: WT=7   P3: WT=14
  Avg WT = (0+1+4+7+14)/5 = 5.2ms`,
      explanation: "SRTF: at every arrival/completion, compare new burst with remaining time. Preempt if new is shorter. WT = Completion - Arrival - Burst.",
    },
    examTips: [
      "SJF: optimal avg WT for non-preemptive. But needs burst prediction.",
      "SRTF: preemptive SJF. Compare REMAINING time vs NEW arrival's burst.",
      "SRTF WT formula: WT = Completion − Arrival − Burst",
      "α=0.5 in exponential averaging = equal weight to recent and past history",
      "SJF/SRTF: starvation possible. Aging = solution.",
    ],
    questions: [
      { q: "Why is SJF considered optimal?", a: "SJF gives the minimum average waiting time for any given set of processes. This can be proven mathematically: moving a shorter burst before a longer one always reduces or maintains the average waiting time. No other non-preemptive scheduling algorithm achieves a lower average WT for the same workload." },
      { q: "Predict next CPU burst: τ(n)=10, t(n)=6, α=0.5.", a: "τ(n+1) = α × t(n) + (1-α) × τ(n) = 0.5 × 6 + 0.5 × 10 = 3 + 5 = 8ms." },
    ],
  },

  "priority-sched": {
    title: "Priority Scheduling", emoji: "👑",
    tldr: "Lower number = higher priority. Problem: starvation (low-priority never runs). Solution: aging (increase priority over time).",
    explanation: `Priority Scheduling: each process gets a priority integer. CPU allocated to the highest priority process. Convention: LOWER number = HIGHER priority (P=1 is higher than P=5).

Can be preemptive or non-preemptive:
• Preemptive: if a higher-priority process arrives, immediately preempt the current
• Non-preemptive: higher-priority process waits until current finishes or blocks

SJF is a special case: priority = 1 / burst_time (shortest burst → highest priority).

Starvation (Indefinite Blocking): low-priority processes may NEVER execute if high-priority processes keep arriving. They can wait indefinitely in the ready queue.

Solution — Aging: Gradually increase the priority of waiting processes as a function of their waiting time. Example: increase priority by 1 every 15 minutes of waiting. Eventually even a very low-priority process gets high enough priority to run.`,
    keyPoints: [
      "Lower priority NUMBER = higher priority (P=1 > P=5)",
      "Preemptive: higher-priority arrival immediately preempts current",
      "Non-preemptive: higher-priority process joins queue, waits for current to finish",
      "SJF = priority scheduling with priority = 1/burst_time",
      "Starvation: low-priority processes may NEVER execute",
      "Aging: increase priority with waiting time → prevents starvation",
    ],
    formula: {
      code: `Priority Scheduling Example (all arrive t=0):
  P1(b=10,pri=3), P2(b=1,pri=1), P3(b=2,pri=4), P4(b=1,pri=5), P5(b=5,pri=2)

  Order (lowest number = highest priority): P2(1) → P5(2) → P1(3) → P3(4) → P4(5)

  Gantt: |P2(0-1)|P5(1-6)|P1(6-16)|P3(16-18)|P4(18-19)|

  P2: WT=0   P5: WT=1   P1: WT=6   P3: WT=16   P4: WT=18
  Avg WT = (0+1+6+16+18)/5 = 41/5 = 8.2ms

Aging Example (starvation fix):
  t=0:    P_low arrives at priority 40
  t=15min: bumped to priority 39
  t=30min: bumped to priority 38
  ...
  t=600min (10hrs): priority = 0 (highest!) → FINALLY runs
  → No process waits forever!`,
      explanation: "Lower number = higher priority. Aging prevents indefinite starvation by slowly promoting waiting processes.",
    },
    examTips: [
      "Lower number = higher priority. Priority 1 > priority 5.",
      "SJF is a special case of priority scheduling (priority = 1/burst)",
      "Starvation problem + aging solution — both always examinable together",
      "Aging: increase priority as waiting time increases (prevent indefinite blocking)",
    ],
    questions: [
      { q: "What is starvation in priority scheduling and how is it solved?", a: "Starvation: low-priority processes may wait indefinitely if high-priority processes keep arriving continuously. They never get CPU time, potentially waiting forever. Solution: Aging — as time passes, gradually increase the priority of waiting processes (e.g., boost priority by 1 every 15 minutes). Eventually, even a very low-priority process becomes the highest priority process and gets to run. No process waits indefinitely." },
    ],
  },

  "round-robin": {
    title: "Round Robin Scheduling", emoji: "🔃",
    tldr: "Preemptive FCFS with time quantum q. Each process gets ≤q time. Max wait = (n-1)×q. q too small → too many switches. q too large → like FCFS.",
    explanation: `Round Robin (RR): designed for timesharing. Each process gets a small time quantum q (typically 10-100ms). Ready queue is circular. After using q time, process goes to the BACK of the queue. If it finishes before q expires, it releases CPU voluntarily.

Max wait time formula: (n-1) × q — each process waits at most (n-1) full quanta before it gets another turn.

Effect of q size:
• q very large → same as FCFS (nobody gets preempted, all run to completion)
• q very small → too many context switches (overhead dominates useful work!)
• Rule of thumb: 80% of CPU bursts should be shorter than q

RR has better response time than SJF but often worse turnaround time. No starvation — every process gets CPU in at most (n-1)×q time.

Modern systems: q = 10-100ms. Context switch ≈ 10μs (< 1% overhead if q ≥ 10ms).`,
    keyPoints: [
      "RR: preemptive FCFS with time quantum q. Circular ready queue.",
      "Each process gets ≤ q time. If not done, goes to END of queue.",
      "Max wait before getting CPU: (n-1) × q",
      "q too large = FCFS. q too small = too many context switches.",
      "80% of CPU bursts should be shorter than q (rule of thumb)",
      "Modern systems: q = 10-100ms. Context switch ≈ 10μs.",
      "RR: no starvation. Good response time. Often worse TAT than SJF.",
    ],
    formula: {
      code: `RR Example: P1=24ms, P2=3ms, P3=3ms. q=4ms. All arrive t=0.

  t=0: P1 gets 4ms. rem=20. Queue: [P2, P3, P1]
  t=4: P2 gets 3ms (DONE! < q). Queue: [P3, P1]
  t=7: P3 gets 3ms (DONE! < q). Queue: [P1]
  t=10: P1 gets 4ms. rem=16. Queue: [P1]
  t=14: P1 gets 4ms. rem=12. ... (continues alone)
  t=30: P1 finishes.

  Gantt: |P1(4)|P2(3)|P3(3)|P1(4)|P1(4)|P1(4)|P1(4)|P1(4)|
          0    4    7   10   14   18   22   26   30

  P1: completion=30, WT = 30-24 = 6ms (ran from 0-4, then 10-30)
  P2: completion=7,  WT = 7-3 = 4ms  (waited 0-4 = 4ms)
  P3: completion=10, WT = 10-3 = 7ms (waited 0-7 = 7ms)
  Avg WT = (6+4+7)/3 = 5.67ms

Max wait formula:
  n=5 processes, q=20ms → Max wait = (5-1)×20 = 80ms

q size effect:
  q = ∞:    FCFS (no preemption ever)
  q = 1ms:  near-continuous switching = huge overhead
  q = 10-100ms: practical sweet spot ✓`,
      explanation: "RR: fairness guaranteed. Good response time. Turnaround may be worse than SJF but better than FCFS in interactive feel.",
    },
    examTips: [
      "Max wait = (n-1) × q — MEMORIZE this formula",
      "RR turnaround: often worse than SJF but response time much better",
      "q → ∞: behaves like FCFS. q → 0: processor sharing (overhead explosion).",
      "80% of bursts should be shorter than q (practical rule)",
      "RR = no starvation (every process gets CPU in at most (n-1)×q time)",
    ],
    questions: [
      { q: "With n=4 processes and time quantum q=10ms, what is the maximum wait time before a process gets the CPU again?", a: "Max wait = (n-1) × q = (4-1) × 10 = 30ms. After using its quantum, a process must wait for at most 3 other processes to each use their full quantum before it gets another turn." },
      { q: "What happens when the time quantum is set too small in Round Robin?", a: "Too many context switches occur. If q=1ms and context switch takes 1ms, then 50% of time is spent on context switching (overhead) and only 50% on actual computation. The system overhead dominates useful work. Response time appears fast but actual throughput drops dramatically." },
    ],
  },

  "multilevel-q": {
    title: "Multilevel Queue & Feedback Queue", emoji: "📚",
    tldr: "Multilevel Queue: permanent queues for different process types. MLFQ: processes CAN move between queues — allows aging and adaptation.",
    explanation: `Multilevel Queue: Ready queue partitioned into multiple permanent sub-queues, each with its own scheduling algorithm.

Typical setup:
• Foreground (interactive) processes → RR (good response time)
• Background (batch) processes → FCFS (maximize throughput)

Scheduling between queues:
• Fixed priority: foreground always runs first (can starve background!)
• Time slice: allocate fixed percentages (e.g., 80% foreground, 20% background)

Multilevel Feedback Queue (MLFQ) — the most flexible and general:
Processes CAN MOVE BETWEEN QUEUES based on behavior. Allows aging (prevents starvation).

Classic 3-queue example:
• Q0: RR with q=8ms (highest priority)
• Q1: RR with q=16ms (medium priority)
• Q2: FCFS (lowest priority)

Rules:
1. New job enters Q0
2. If job uses full quantum in Q0 without finishing → demoted to Q1
3. If job uses full quantum in Q1 without finishing → demoted to Q2
4. Q0 has ABSOLUTE PRIORITY over Q1 and Q2. A Q0 arrival preempts even a running Q2 process.

This naturally classifies processes: I/O-bound (short bursts → stays in Q0, good response), CPU-bound (long bursts → sinks to Q2 where FCFS is fine since they rarely interact).`,
    keyPoints: [
      "Multilevel Queue: PERMANENT queues. Process assigned to one queue forever.",
      "Different queues can have different scheduling algorithms",
      "Between-queue scheduling: fixed priority OR time slice",
      "Fixed priority multilevel queue: foreground can starve background",
      "MLFQ: processes MOVE BETWEEN queues based on behavior",
      "MLFQ Q0 (highest) → Q1 → Q2 (lowest). Demotion for using full quantum.",
      "Q0 has absolute priority. Q0 arrival preempts any Q1/Q2 process.",
      "MLFQ naturally adapts: I/O-bound stays high, CPU-bound sinks low",
    ],
    formula: {
      code: `MLFQ 3-Queue Example:
  Q0: RR q=8ms  → Q1: RR q=16ms  → Q2: FCFS

  New process enters Q0 (highest priority)
  If uses full 8ms without finishing → moves to Q1
  If uses full 16ms without finishing → moves to Q2
  If Q0 arrivals: preempts EVERYTHING in Q1 and Q2

MLFQ Solved Problem:
  A process has burst=40ms. MLFQ: q=2 at Q0, incremented by 5 at each level.
  Queue quanta: Q0(q=2), Q1(q=7), Q2(q=12), Q3(q=17), Q4(q=22)

  Queue │ Quantum │ Burst Used │ Remaining │ Outcome
  ──────────────────────────────────────────────────────
    Q0  │    2   │      2     │    38     │ Interrupted → Q1
    Q1  │    7   │      7     │    31     │ Interrupted → Q2
    Q2  │   12   │     12     │    19     │ Interrupted → Q3
    Q3  │   17   │     17     │     2     │ Interrupted → Q4
    Q4  │   22   │      2     │     0     │ FINISHES in Q4!

  Terminates in Q4. Interrupted 4 times (at end of Q0, Q1, Q2, Q3).

RR Characteristics (used in Q0-Q3):
  ✓ Fair time-sharing (preemptive, uses time quantum)
  ✓ No starvation (every process gets CPU eventually)
  ✓ Good response time for short CPU-burst processes
  ✓ Higher overhead due to frequent context switches`,
      explanation: "MLFQ naturally sorts: I/O-bound (short bursts) stays in high-priority queues. CPU-bound sinks to low-priority FCFS.",
    },
    examTips: [
      "Multilevel Queue: permanent assignment. MLFQ: can move between queues.",
      "MLFQ Q0 has absolute priority over all lower queues.",
      "Process demoted if it uses full quantum (CPU-bound behavior).",
      "I/O-bound process: often finishes early → stays in Q0 → good response time.",
    ],
    questions: [
      { q: "What is the difference between Multilevel Queue and Multilevel Feedback Queue?", a: "Multilevel Queue: processes are permanently assigned to one queue based on their type (foreground vs background). They NEVER move between queues. Different queues use different algorithms. Risk: starvation of low-priority queues with fixed-priority scheduling.\n\nMultilevel Feedback Queue (MLFQ): processes CAN MOVE BETWEEN QUEUES based on their behavior. CPU-bound processes (use full quantum) are demoted to lower-priority queues. I/O-bound processes (short CPU bursts, release before quantum) stay in high-priority queues. Naturally adapts to process behavior and prevents starvation through aging." },
      { q: "MLFQ solved problem: burst=40ms, Q0 starts at q=2, each level adds 5ms. In which queue does it terminate? How many interruptions?", a: "Queue quanta: Q0(2), Q1(7), Q2(12), Q3(17), Q4(22).\nQ0: uses 2ms, remaining 38ms → interrupted → goes to Q1\nQ1: uses 7ms, remaining 31ms → interrupted → goes to Q2\nQ2: uses 12ms, remaining 19ms → interrupted → goes to Q3\nQ3: uses 17ms, remaining 2ms → interrupted → goes to Q4\nQ4: uses 2ms, remaining 0ms → FINISHES in Q4!\n\nTerminates in Q4. Interrupted 4 times (once per queue Q0-Q3)." },
    ],
  },

  "multiproc-sched": {
    title: "Multiprocessor Scheduling", emoji: "🖧",
    tldr: "SMP: each CPU self-schedules from common or private ready queues. Asymmetric MP: master handles all scheduling (bottleneck).",
    explanation: `Multiprocessor scheduling is more complex than single-CPU scheduling because multiple CPUs must be efficiently utilized.

Asymmetric Multiprocessing (AMP): One master CPU handles all scheduling decisions and system activities. Other CPUs only execute user code. Simple but master becomes a bottleneck — doesn't scale well.

Symmetric Multiprocessing (SMP): Each processor self-schedules. All modern OSes. Two options:
• Common ready queue: all CPUs share one queue. Requires locking (potential bottleneck but balanced load).
• Private ready queues: each CPU has its own queue. No locking overhead but load imbalance possible.

Key challenges in SMP scheduling:
1. Processor affinity (cache efficiency)
2. Load balancing (fairness)
3. NUMA (Non-Uniform Memory Access) awareness`,
    keyPoints: [
      "Asymmetric MP: master handles all scheduling. Simple but bottleneck.",
      "SMP: each processor self-scheduling. All modern OSes use SMP.",
      "Common ready queue: all CPUs share. Balanced but needs locking.",
      "Private ready queues: no lock contention but possible imbalance.",
      "Processor affinity: process prefers same CPU (cache still warm).",
      "Load balancing: keep all CPUs equally busy.",
    ],
    formula: null,
    examTips: [
      "SMP = modern standard. AMP = outdated, master bottleneck.",
      "Common queue = balanced load, lock overhead. Private = no lock, possible imbalance.",
      "Processor affinity: cache stays warm = faster than migration.",
    ],
    questions: [
      { q: "Why is processor affinity important in SMP scheduling?", a: "When a process runs on CPU 0, it populates CPU 0's cache with its data. If the process migrates to CPU 1, it must rebuild the cache from scratch (cache miss overhead). Processor affinity keeps the process on the same CPU so its warm cache improves performance significantly. Soft affinity = OS tries to maintain but may migrate. Hard affinity = system call to force specific CPU." },
    ],
  },

  "affinity-loadbal": {
    title: "Processor Affinity & Load Balancing", emoji: "⚖️",
    tldr: "Affinity: keep process on same CPU for cache warmth. Load balancing: spread work evenly — push migration (overloaded pushes) or pull migration (idle pulls).",
    explanation: `Processor Affinity: Keep a process running on the same processor to avoid the cost of cache invalidation.

When a process migrates from CPU A to CPU B:
1. CPU B's cache has no data from this process
2. Every memory access = cache miss (slow!)
3. Must fetch all data from main memory

Soft affinity: OS attempts to keep process on same CPU but can migrate if needed (Linux default).
Hard affinity: Process specifies which CPUs it's allowed to run on via a system call (sched_setaffinity() in Linux). OS MUST respect this.

Load Balancing: Keep workload evenly distributed across all processors to maximize utilization.

Two migration strategies:
• Push migration: a periodic task checks load on all processors. If one is overloaded, it PUSHES processes from the overloaded CPU to idle/lighter ones.
• Pull migration: an idle processor actively PULLS processes from another CPU's ready queue.

Both can be used simultaneously (Linux does both).

NUMA (Non-Uniform Memory Access): In systems with multiple memory banks, some CPUs have faster access to certain memory regions. NUMA-aware scheduling allocates both memory AND the CPU close to it for even better performance.`,
    keyPoints: [
      "Processor affinity: keep process on same CPU for cache efficiency",
      "Soft affinity: OS tries, but may migrate. Hard affinity: must obey.",
      "Load balancing: keep all CPUs equally busy",
      "Push migration: overloaded CPU pushes excess to idle CPUs",
      "Pull migration: idle CPU pulls processes from busy CPUs",
      "Linux uses both push and pull migration",
      "NUMA: CPU has faster access to 'nearby' memory banks",
    ],
    formula: null,
    examTips: [
      "Processor affinity = cache warmth = performance. Migration = cache miss = slowdown.",
      "Push vs pull migration: push = overloaded CPU acts. Pull = idle CPU acts.",
      "Hard affinity: sched_setaffinity() in Linux — process controls which CPUs it runs on.",
    ],
    questions: [
      { q: "What is the difference between push and pull migration in load balancing?", a: "Push migration: a periodic kernel task examines load on all processors. When it finds an imbalance, it pushes processes from the overloaded CPU to idle or less loaded ones. The overloaded CPU is the initiator. Pull migration: when a CPU becomes idle, it looks at other CPUs' ready queues and pulls a process from the busiest one. The idle CPU is the initiator. Linux uses both strategies simultaneously for effective load balancing." },
    ],
  },

  "linux-cfs": {
    title: "Linux CFS & Windows Scheduling", emoji: "🐧",
    tldr: "Linux CFS: uses red-black tree keyed by vruntime. Process with lowest vruntime runs next. Windows: 32-level priority, preemptive, foreground gets 3× boost.",
    explanation: `Linux Scheduling — History:
• Pre-2.5: original Unix scheduling. No SMP support, poor scalability.
• 2.5: O(1) scheduler. SMP support. Poor interactive response.
• 2.6.23+: CFS (Completely Fair Scheduler). Default today.

CFS Key Concepts:
• Based on scheduling classes with different priorities
• Allocates CPU proportionally based on nice value (−20 to +19; lower = higher priority)
• Target latency: the interval in which every runnable task should run at least once
• Virtual runtime (vruntime): tracks how much CPU time each task has received. Lower priority → vruntime grows FASTER (penalized for running). Scheduler always picks task with LOWEST vruntime.
• Tasks stored in red-black tree keyed by vruntime. O(log N) to find next task.
• I/O-bound tasks: sleep often → accumulate low vruntime → higher effective priority → better interactivity!
• Real-time tasks: static priorities 0-99 (always above normal tasks)

Windows Scheduling:
• Priority-based preemptive. The dispatcher is the scheduling kernel component.
• 32-level priority scheme: Variable class (1-15), Real-time class (16-31), Level 0 = memory management thread.
• Thread runs until: preempted by higher priority, terminates, quantum ends, or blocking call.
• Quantum expires → priority lowered (never below base priority).
• Wait completes → priority boosted.
• Foreground window process gets 3× priority boost (longer before preemption) — responsive UI!`,
    keyPoints: [
      "Linux CFS: Completely Fair Scheduler. Default since kernel 2.6.23.",
      "CFS: red-black tree keyed by vruntime. O(log N) to find next task.",
      "vruntime: tracks CPU usage. Lowest vruntime process runs next.",
      "Lower priority → vruntime grows FASTER. Natural fairness.",
      "I/O-bound: sleeps often → low vruntime → naturally higher priority → responsive!",
      "Nice value: -20 (highest) to +19 (lowest). Default = 0.",
      "Windows: 32-level priority. Preemptive. Variable + real-time classes.",
      "Windows: quantum expire → priority lowered. Wait complete → priority boosted.",
      "Windows foreground process: 3× priority boost for UI responsiveness.",
    ],
    formula: {
      code: `Linux CFS vruntime:
  All processes start with vruntime = 0
  After running for t ms:
    normal priority: vruntime += t
    higher priority (lower nice): vruntime += t × 0.8  (grows slower)
    lower priority (higher nice):  vruntime += t × 1.2  (grows faster)

  Red-Black Tree by vruntime:
        [vrt=50]
       /         \\
  [vrt=20]    [vrt=80]
  /
[vrt=10]    ← LEFTMOST = runs next!

CFS Target Latency:
  If target_latency = 20ms and 5 processes:
  Each process runs every 20ms
  Each gets 4ms per round = 20% CPU share

Windows Priority Classes (highest to lowest):
  REALTIME → HIGH → ABOVE_NORMAL → NORMAL → BELOW_NORMAL → IDLE
  Within each class: TIME_CRITICAL → HIGHEST → ... → LOWEST → IDLE
  Effective priority = class × class_offset
  
  Foreground app: gets 3× longer quantum → snappy UI!`,
      explanation: "CFS: always run the process with the lowest vruntime. Fairness guaranteed mathematically.",
    },
    examTips: [
      "CFS uses RED-BLACK TREE keyed by vruntime. Leftmost node = next to run.",
      "I/O-bound in CFS: sleeps often → low vruntime → naturally prioritized!",
      "Windows foreground: 3× priority boost (key exam fact)",
      "Nice value: -20 = highest priority. +19 = lowest priority.",
    ],
    questions: [
      { q: "How does Linux CFS ensure fairness?", a: "CFS tracks each process's virtual runtime (vruntime) — how much CPU time it has received. It always schedules the process with the LOWEST vruntime (implemented as the leftmost node in a red-black tree). This ensures no process gets more CPU than its fair share. Higher-priority processes have their vruntime grow slower (they get more CPU before their vruntime catches up). I/O-bound processes that sleep frequently accumulate low vruntime and naturally receive higher effective priority, giving them excellent responsiveness." },
    ],
  },

  "windows-sched": {
    title: "Windows Thread Scheduling", emoji: "🪟",
    tldr: "Windows: 32-level priority, preemptive. Quantum expires → priority lowered. Wait completes → priority boosted. Foreground gets 3× boost.",
    explanation: `Windows Scheduling Details:

Priority Scheme (32 levels):
• Level 0: memory management thread (zero page thread)
• Levels 1-15: Variable class (user processes)
• Levels 16-31: Real-time class (real-time processes)

Priority Classes (in decreasing order): REALTIME, HIGH, ABOVE_NORMAL, NORMAL, BELOW_NORMAL, IDLE.
Relative priorities within a class: TIME_CRITICAL, HIGHEST, ABOVE_NORMAL, NORMAL, BELOW_NORMAL, LOWEST, IDLE.

Priority Dynamics:
• Quantum expires → priority lowered (never below base priority). This prevents CPU-bound threads from monopolizing.
• I/O wait completes → priority BOOSTED above base. This gives I/O-bound threads better responsiveness.
• Foreground window → thread gets 3× longer quantum (or 2× priority boost in some versions). Makes UI feel snappy.

If no runnable thread → CPU runs the idle thread (busy loop or halt instruction).`,
    keyPoints: [
      "32-level priority: 0=mem management, 1-15=variable, 16-31=real-time",
      "Thread runs until: higher priority preempts, terminates, quantum ends, blocks",
      "Quantum expire → priority lowered (never below base priority)",
      "Wait completion → priority boosted (rewards I/O-bound behavior)",
      "Foreground window → 3× quantum / priority boost for UI responsiveness",
      "No runnable thread → idle thread runs",
    ],
    formula: null,
    examTips: [
      "Windows: 32 levels. 1-15 variable. 16-31 real-time.",
      "Quantum expire = priority goes DOWN. I/O wait complete = priority goes UP.",
      "Foreground app = 3× boost. Makes Windows UI feel responsive.",
    ],
    questions: [
      { q: "How does Windows handle priority in its scheduling?", a: "Windows uses a 32-level priority scheme. When a thread's quantum expires, its priority is lowered (but never below its base priority) — this prevents CPU-bound threads from hogging the CPU forever. When a thread completes an I/O wait, its priority is boosted above base — this rewards I/O-bound (interactive) behavior with better responsiveness. The foreground window's threads get a 3× longer quantum or priority boost, making the active window feel more responsive to the user." },
    ],
  },

  "shell-intro": {
    title: "Shell Basics & Environment", emoji: "🐚",
    tldr: "Shell = command interpreter between user and kernel. bash = most popular. Commands search via $PATH. Environment variables inherited by children.",
    explanation: `Shell = Linux command-line interpreter. The shell is a program that acts as an interface between the user and the kernel. It reads commands, interprets them, and asks the kernel to execute them.

When you type "ls -la", the shell:
1. Reads the input
2. Parses tokens (command = "ls", argument = "-la")
3. Searches for "ls" in directories listed in $PATH
4. Asks the kernel to create a new process and execute /bin/ls

Popular shells:
• sh (Bourne shell): original Unix shell
• csh/tcsh: C Shell — C-like syntax
• ksh (Korn shell): extended Bourne shell
• bash (Bourne Again Shell): most popular on Linux, combines best of sh and csh
• zsh: popular alternative with many features (macOS default since Catalina)

Check current shell: echo $SHELL

Environment variables: variables inherited by ALL child processes. When you start a terminal, the shell sets up these variables for you.
Key ones: PATH (where to find executables), HOME (your home dir), USER (your username), SHELL (which shell you're using), PWD (current directory).

Shell variables vs Environment variables:
• Shell variables: local to current shell only. Set with: NAME="value"
• Environment variables: inherited by child processes. Promote with: export NAME`,
    keyPoints: [
      "Shell = interpreter between user and kernel. Reads + executes commands.",
      "Commands found via $PATH (list of directories to search)",
      "bash = most popular Linux shell (Bourne Again Shell)",
      "Environment variables: inherited by child processes",
      "Shell variables: local to current shell only",
      "export NAME: promotes shell variable to environment variable",
      "Key env vars: PATH, HOME, USER, SHELL, PWD, TERM",
      "echo $SHELL: shows current shell. env or printenv: shows all env vars.",
    ],
    formula: {
      code: `Shell variable vs Environment variable:
  # Shell variable (local only):
  MYVAR="hello"
  echo $MYVAR        # works in THIS shell
  bash               # start child shell
  echo $MYVAR        # EMPTY — not inherited!

  # Environment variable (inherited):
  export MYVAR="hello"
  bash               # start child shell  
  echo $MYVAR        # "hello" — inherited! ✓

  # Remove variable:
  unset MYVAR

  # Persistent (add to ~/.profile or ~/.bashrc):
  export MYVAR="hello"

Key environment variables:
  PATH=/usr/bin:/bin:/usr/local/bin  ← where to find commands
  HOME=/home/santosh                 ← home directory
  USER=santosh                       ← username
  SHELL=/bin/bash                    ← current shell
  PWD=/home/santosh/projects         ← present working directory`,
      explanation: "export = promote to environment variable. Without export, variable dies when shell exits.",
    },
    examTips: [
      "Shell variable: local only. export = makes it available to child processes.",
      "$PATH: colon-separated list of directories where shell looks for commands.",
      "bash = Bourne Again SHell. sh = original Bourne shell.",
      "env or printenv: list all environment variables.",
    ],
    questions: [
      { q: "What is the difference between a shell variable and an environment variable?", a: "Shell variable: local to the current shell session only. Created with NAME=value. Child processes do NOT inherit it. Environment variable: inherited by all child processes spawned from the current shell. Created with export NAME=value (or by exporting an existing shell variable with export NAME). Environment variables pass configuration down to programs you run, like PATH (where to find executables) or JAVA_HOME (where Java is installed)." },
    ],
  },

  "env-vars": {
    title: "Environment Variables & Shell Scripting", emoji: "📝",
    tldr: "env vars: inherited by children. Shell scripting: automate tasks, combine commands, add logic. Shebang (#!) tells kernel which interpreter to use.",
    explanation: `Shell scripting = writing files containing sequences of shell commands to automate tasks.

Shebang (#!): The first line of a shell script tells the kernel which interpreter to use.
#!/bin/bash → uses bash
#!/bin/sh → uses sh (POSIX-compatible, more portable)
#!/usr/bin/env python3 → uses Python 3

Key purposes of shell scripting (PYQ):
1. Automation: automate repetitive tasks (backups, log rotation, deployment pipelines)
2. System Administration: manage users, monitor disk space, check services, install packages
3. Batch Processing: process multiple files sequentially (resize images, convert formats)
4. Task Scheduling: combine with cron for periodic execution (daily reports, weekly backups)
5. Environment Setup: configure development environments, set library paths, version management

Special variables:
• $0: script name
• $1, $2, ...: positional arguments
• $#: number of arguments
• $@: all arguments
• $?: exit status of last command (0 = success, non-zero = error)
• $$: PID of current shell

Exit codes: convention — 0 = success, 1+ = various errors. Always check $? after critical commands.`,
    keyPoints: [
      "Shebang (#!/bin/bash): tells kernel which interpreter to use",
      "$0=script name, $1-$N=arguments, $#=arg count, $@=all args, $?=last exit code",
      "$?=0 means success. Non-zero means error.",
      "5 purposes: Automation, Sysadmin, Batch processing, Scheduling, Environment setup",
      "Shell scripts make repetitive operations consistent and error-free",
      "export: make variable available to child processes",
      "Scripts must be executable: chmod +x script.sh",
    ],
    formula: {
      code: `Daily Backup Script (PYQ example):
#!/bin/bash
# backup.sh — Back up home directory daily

DATE=$(date +%Y%m%d)           # e.g., 20240315
TARGET="/backup/home_\${DATE}.tar.gz"

tar -czf "$TARGET" "/home/$USER"

if [ $? -eq 0 ]; then
    echo "Backup successful: $TARGET"
else
    echo "Backup FAILED!" >&2   # >&2 = send to stderr
    exit 1
fi

# Schedule with cron (run at 2 AM daily):
# 0 2 * * * /home/user/backup.sh

Special variables demo:
#!/bin/bash
echo "Script name: $0"
echo "First arg: $1"
echo "All args: $@"
echo "Arg count: $#"
ls /nonexistent
echo "ls exit code: $?"  # will print 2 (non-zero = error)`,
      explanation: "$? is the exit code of the last command. 0=success. Always check after critical operations.",
    },
    examTips: [
      "Shell scripting purposes (PYQ): Automation, Sysadmin, Batch, Scheduling, Environment setup",
      "$? = exit code. 0 = success. Non-zero = failure.",
      "#!/bin/bash = shebang. Required as first line for the kernel to know interpreter.",
      "Scripts need execute permission: chmod +x script.sh",
    ],
    questions: [
      { q: "What are the key purposes of shell scripting? Give an example script. (PYQ)", a: "5 key purposes:\n1. Automation — automate repetitive tasks (backups, log rotation)\n2. System Administration — manage users, monitor disk, check services\n3. Batch Processing — process multiple files sequentially\n4. Task Scheduling — combine with cron for periodic execution\n5. Environment Setup — configure development environments, set paths\n\nExample backup script:\n#!/bin/bash\nDATE=$(date +%Y%m%d)\nTARGET=\"/backup/home_${DATE}.tar.gz\"\ntar -czf \"$TARGET\" \"/home/$USER\"\nif [ $? -eq 0 ]; then echo 'Backup OK'; else echo 'FAILED' >&2; exit 1; fi\n\nSchedule with cron: 0 2 * * * /home/user/backup.sh" },
    ],
  },

  "shell-basics": {
    title: "Shell Control Flow — if, for, while", emoji: "🔀",
    tldr: "if [ condition ]; fi. for i in list; do done. while [ condition ]; do done. break = exit loop. continue = skip iteration.",
    explanation: `Shell scripts support full programming constructs: conditionals, loops, functions.

if statement:
Tests a condition. [ ] is actually the test command. Spaces inside brackets are MANDATORY.
Common test operators:
• -f file: file exists (and is regular file)
• -d dir: directory exists
• -z string: string is empty
• -eq, -ne, -lt, -gt, -le, -ge: numeric comparisons
• =, !=: string comparisons

for loop:
Iterates over a list of values. List can be: explicit "1 2 3", a command $(ls), or a glob *.txt.

while loop:
Repeats while condition is true. Most commonly used with counters or until a condition changes.

break: exits the CURRENT loop entirely (no more iterations).
continue: skips the REST of the current iteration, goes to next.

In nested loops: break and continue affect only the INNERMOST loop they're in.

Note: Shell scripts use backticks \`\` or $() for command substitution (embed command output in a string).`,
    keyPoints: [
      "if [ condition ]; then ... elif ... else ... fi",
      "for i in list; do ... done",
      "while [ condition ]; do ... done",
      "break: exit current loop. continue: skip to next iteration.",
      "-f: file exists. -d: dir exists. -z: string empty. -eq: numeric equal.",
      "$?: exit status of last command (0 = success, non-zero = error)",
      "$#: number of arguments. $@: all arguments. $1,$2,...: positional params.",
      "Spaces INSIDE [ ] are mandatory! [ -f file ] not [-f file]",
    ],
    formula: {
      code: `if statement:
  if [ -f "myfile.txt" ]; then
      echo "File exists!"
  elif [ -d "mydir" ]; then
      echo "It's a directory"
  else
      echo "Not found"
  fi

for loop:
  # Iterate over explicit list:
  for i in 1 2 3 4 5; do
      echo "Count: $i"
  done

  # Iterate over files:
  for file in *.txt; do
      echo "Processing: $file"
  done

while loop:
  count=1
  while [ $count -le 5 ]; do
      echo "Count: $count"
      count=$((count + 1))   # arithmetic expression
  done

break and continue:
  for i in 1 2 3 4 5; do
      if [ $i -eq 3 ]; then
          continue   # skip 3, keep going
      fi
      if [ $i -eq 5 ]; then
          break      # stop at 5
      fi
      echo $i
  done
  # Output: 1 2 4

Test operators:
  -f file  → file exists (regular file)
  -d dir   → directory exists
  -z str   → string is empty
  -n str   → string is NOT empty
  -eq      → numeric equal
  -ne      → not equal
  -lt      → less than
  -gt      → greater than`,
      explanation: "break exits the INNER loop. continue skips the REST of the current iteration in the inner loop.",
    },
    examTips: [
      "if uses [ ] (square brackets = test command). Spaces inside brackets are MANDATORY.",
      "fi = end of if. done = end of loop. These are REVERSED keywords.",
      "break: exits loop. continue: skips to next iteration.",
      "$? = exit code of last command. 0 = success.",
    ],
    questions: [
      { q: "What is the difference between break and continue in shell loops?", a: "break: immediately exits the current loop entirely — no more iterations run at all. The program continues with the first statement after the loop's 'done' keyword.\n\ncontinue: skips the remaining commands in the CURRENT iteration only, then jumps to the NEXT iteration of the same loop. The loop itself continues.\n\nIn nested loops, both affect only the INNERMOST loop they appear in. To break out of an outer loop, you need additional logic (like a flag variable) or bash's 'break N' syntax where N specifies how many levels to break." },
    ],
  },

  "cron": {
    title: "cron — Job Scheduling", emoji: "⏰",
    tldr: "cron = daemon that runs scheduled jobs. 5 time fields: min hour day month weekday. crontab -e to edit. crontab -l to list.",
    explanation: `cron is a daemon (background process started at boot) that executes scheduled tasks automatically. The crond daemon reads crontab (cron tables) — each user can have their own crontab file defining their scheduled jobs.

Commands:
• crontab -l: list your scheduled jobs
• crontab -e: edit your crontab (opens in nano or vim)
• crontab -r: REMOVE your entire crontab (be careful!)
• systemctl status cron: check if cron service is running

Crontab syntax — 5 time fields + command:
MIN HOUR DOM MON DOW COMMAND

Special characters:
• *: any value (every minute/hour/day/etc.)
• */n: every n units (*/5 = every 5 minutes)
• n: specific value (0 = midnight, 1 = 1am, etc.)
• n-m: range (9-17 = hours 9 to 5pm)
• n,m,p: list (1,3,5 = Mon, Wed, Fri)

Common use cases: daily backups, weekly reports, hourly monitoring, nightly database maintenance.

Output: by default, cron emails output to the user. Redirect to file or /dev/null:
0 * * * * /path/to/script.sh >> /var/log/script.log 2>&1`,
    keyPoints: [
      "cron = daemon, starts at boot, runs in background",
      "crond = the cron daemon process",
      "crontab = file containing scheduled jobs (one per user)",
      "crontab -e: edit. crontab -l: list. crontab -r: remove.",
      "Syntax: minute hour day-of-month month day-of-week command",
      "* = every value. */n = every n units. Range with -, list with comma.",
      "Ranges: 0-59 minutes, 0-23 hours, 1-31 days, 1-12 months, 0-7 weekday.",
    ],
    formula: {
      code: `crontab syntax:
  MIN HOUR DOM MON DOW COMMAND
   │    │   │   │   │
   │    │   │   │   └── Day of week: 0=Sun,1=Mon,...,6=Sat,7=Sun
   │    │   │   └────── Month: 1-12
   │    │   └────────── Day of month: 1-31
   │    └─────────────── Hour: 0-23
   └──────────────────── Minute: 0-59

cron examples:
  * * * * * /script.sh          # every minute
  0 * * * * /script.sh          # every hour (at :00)
  0 0 * * * /backup.sh          # every day at midnight
  30 2 * * * /backup.sh         # every day at 2:30am
  0 17 * * 1-5 /report.sh       # every weekday at 5pm
  0 0 * * 1 /weekly.sh          # every Monday at midnight
  */5 * * * * /monitor.sh       # every 5 minutes
  0 9-17 * * 1-5 /work.sh       # every hour 9am-5pm Mon-Fri
  0 0 1 * * /monthly.sh         # 1st of every month at midnight

Shell scripting PYQ example (backup + cron):
  #!/bin/bash
  # backup.sh
  DATE=$(date +%Y%m%d)
  TARGET="/backup/home_\${DATE}.tar.gz"
  tar -czf "$TARGET" "/home/$USER"
  if [ $? -eq 0 ]; then
      echo "Backup successful: $TARGET"
  else
      echo "Backup FAILED!" >&2
      exit 1
  fi

  # Add to crontab for daily 2am execution:
  # 0 2 * * * /home/user/backup.sh >> /var/log/backup.log 2>&1`,
      explanation: "5 fields: min(0-59), hour(0-23), day(1-31), month(1-12), weekday(0-7). * = any. */n = every n.",
    },
    examTips: [
      "5 cron time fields: minute, hour, day-of-month, month, day-of-week — in that order",
      "* = every. */5 = every 5. 0 = at zero (hour 0 = midnight).",
      "crontab -e to edit. crontab -l to list. crontab -r to REMOVE (dangerous!).",
      "crond = the daemon. crontab = the file/command. cron = the concept.",
      "0 * * * * = every hour at minute 0 (top of the hour)",
    ],
    questions: [
      { q: "Write a crontab entry to run /scripts/backup.sh every day at 2:30am.", a: "30 2 * * * /scripts/backup.sh\n(minute=30, hour=2, day-of-month=any, month=any, weekday=any)" },
      { q: "What does this crontab entry do: */10 9-17 * * 1-5 /scripts/check.sh", a: "Runs /scripts/check.sh every 10 minutes (*/10), between 9am and 5pm (9-17), on any day of month (*), any month (*), Monday through Friday (1-5). So it runs 5 times per hour during business hours on weekdays." },
    ],
  },
};   