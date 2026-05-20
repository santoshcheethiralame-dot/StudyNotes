// Auto-extracted from unit2.jsx — UPDATED: deeper explanations, PYQs, examples, new topics
export const groups = [
  { name: "🔗 IPC Basics", ids: ["ipc-intro", "bounded-buffer", "shared-memory", "message-passing"] },
  { name: "📨 MP Details", ids: ["direct-indirect", "mp-sync", "buffering"] },
  { name: "🪈 System Calls", ids: ["pipes", "fifos", "msg-queues", "ipc-semaphores"] },
  { name: "🧵 Threads", ids: ["threads-intro", "threads-vs-proc", "threading-models", "pthreads-api"] },
  { name: "⚡ Concurrency", ids: ["amdahls", "concurrency-parallelism", "thread-scheduling"] },
  { name: "🔒 Synchronization", ids: ["race-condition", "critical-section", "petersons", "hw-sync"] },
  { name: "🔑 Locks & Mutex", ids: ["tsl-cas", "mutex-locks", "semaphore", "semaphore-impl"] },
  { name: "🏛️ Classic Problems", ids: ["bounded-buffer-sem", "readers-writers", "dining-philosophers"] },
  { name: "💀 Deadlocks", ids: ["deadlock-intro", "deadlock-4conditions", "rag", "deadlock-handling"] },
  { name: "🛡️ DL Prevention/Avoidance", ids: ["deadlock-prevention", "safe-state", "bankers"] },
  { name: "🔎 Detection & Signals", ids: ["deadlock-detection", "signals"] },
  { name: "📅 CPU Scheduling PYQ", ids: ["srtf-scheduling", "sjf-nonpreemptive", "deadlock-free-analysis"] },
];

export const topics = {

  // ─────────────────────────────────────────────────────────────
  //  IPC BASICS
  // ─────────────────────────────────────────────────────────────

  "ipc-intro": {
    title: "IPC — Overview", emoji: "🔗",
    tldr: "Independent vs cooperating processes. Two IPC models: Shared Memory (fast) and Message Passing (safe). 4 reasons to cooperate.",
    explanation: `Processes can be:
• Independent — can't affect or be affected by other processes (e.g., calculator app)
• Cooperating — can share data and affect each other (e.g., browser + download manager)

ANALOGY: Two students working on the same project.
  - Shared Memory = they share a single Google Doc (both edit directly, very fast)
  - Message Passing = they email drafts to each other through a teacher (OS is the teacher, slower but organized)

4 Reasons for Process Cooperation:
1. Information Sharing — multiple apps access same file (e.g., clipboard)
2. Computation Speedup — split a big task across multiple processes (parallel processing)
3. Modularity — divide a big system into smaller pieces (microservices)
4. Convenience — user runs editor + compiler + debugger simultaneously

Two IPC Models:
  Shared Memory → OS allocates a region of RAM both processes can access directly
  Message Passing → OS provides send(msg) and receive(msg); data goes through kernel

Shared Memory is FASTEST because after setup, there's zero kernel involvement.
Message Passing is SAFER because the OS controls all data movement.`,
    keyPoints: [
      "Independent: no effect on other processes. Cooperating: can share/affect data.",
      "4 reasons: Information sharing, Computation speedup, Modularity, Convenience",
      "Two IPC models: Shared Memory vs Message Passing",
      "Shared Memory: fastest IPC (no copying), but needs synchronization",
      "Message Passing: safer, no shared variables, OS manages it",
    ],
    formula: null,
    examTips: [
      "PYQ: 'Explain the two models of IPC' — May 2023, May 2024",
      "Shared Memory = FASTEST form of IPC (no copy between processes)",
      "Message Passing = no shared variables, uses send()/receive()",
      "4 reasons for cooperation: Info sharing, Speed, Modularity, Convenience — all 4",
    ],
    questions: [
      { q: "Why is shared memory the fastest form of IPC?", a: "After setup, both processes directly read/write the same physical RAM with zero kernel involvement. Message passing copies data: sender → kernel buffer → receiver. Shared memory skips all copying." },
      { q: "What are the 4 reasons for process cooperation?", a: "Information sharing, Computation speedup, Modularity, Convenience. Remember: I Can Make Code." },
      { q: "PYQ: What are the two models of IPC? Explain each.", a: "1. Shared Memory: OS allocates a common region; user processes control communication; fastest IPC; needs programmer-managed synchronization. 2. Message Passing: OS provides send()/receive() primitives; all data passes through kernel; safer; has overhead per message." },
    ],
  },

  "bounded-buffer": {
    title: "Producer-Consumer & Bounded Buffer", emoji: "🔄",
    tldr: "Circular array. in=next free, out=first full. Full: ((in+1)%N)==out. Empty: in==out. Only N-1 usable slots.",
    explanation: `Think of a sushi conveyor belt: the chef (producer) adds plates, customers (consumer) take plates. The belt has fixed length (bounded buffer).

Two variables track state:
  in = index of the NEXT FREE slot (where producer will put next item)
  out = index of the FIRST FULL slot (where consumer will take next item)

Imagine a circular array of size 5: [_, _, _, _, _]  indices 0,1,2,3,4

If in=2, out=0: buffer has items at [0] and [1], next free slot is [2]

WHY only N-1 usable slots?
  If we allowed N items: full would also make in==out (same as empty condition!)
  We can't distinguish full from empty with the same condition.
  Solution: sacrifice one slot. Full = in is ONE STEP BEHIND out.

FULL check: ((in + 1) % BUFFER_SIZE) == out
  Example: size=5, in=4, out=0 → (4+1)%5 = 0 == out(0) → FULL ✓

EMPTY check: in == out
  Example: in=2, out=2 → both same → EMPTY ✓

The producer busy-waits (spins) when full. Consumer busy-waits when empty.
NOTE: This version has a race condition — 'in' and 'out' are unprotected. Fixed later with semaphores.`,
    keyPoints: [
      "in = next free position, out = first full position",
      "Empty condition: in == out",
      "Full condition: ((in + 1) % BUFFER_SIZE) == out",
      "Only BUFFER_SIZE - 1 elements usable (one slot wasted to distinguish full/empty)",
      "Producer busy-waits when full. Consumer busy-waits when empty.",
      "Circular buffer: modulo arithmetic for wrap-around",
    ],
    formula: {
      code: `#define BUFFER_SIZE 10
item buffer[BUFFER_SIZE];
int in = 0, out = 0;

PRODUCER:
  while (((in + 1) % BUFFER_SIZE) == out)
    ; /* busy wait — buffer full */
  buffer[in] = next_produced;
  in = (in + 1) % BUFFER_SIZE;

CONSUMER:
  while (in == out)
    ; /* busy wait — buffer empty */
  next_consumed = buffer[out];
  out = (out + 1) % BUFFER_SIZE;

BUFFER_SIZE=10 → max 9 items at a time (1 slot wasted)

Visual (size=5):
  [P0][P1][ ][ ][ ]
   ^out    ^in
  out=0, in=2 → 2 items in buffer`,
      explanation: "One slot wasted to distinguish full (N-1 items) from empty (0 items).",
    },
    examTips: [
      "PYQ: 'What is the Bounded-Buffer Problem?' — appears in EVERY paper (May 2023, July 2023, Dec 2023, May 2024)",
      "Full: ((in+1) % N) == out. Empty: in == out. MEMORIZE both.",
      "Only N-1 slots usable out of N total — exam favourite!",
      "in points to NEXT FREE. out points to FIRST FULL.",
      "This version has a race condition on 'in' and 'out' — fixed with semaphores",
    ],
    questions: [
      { q: "BUFFER_SIZE=5. in=3, out=3. Is buffer full or empty?", a: "Empty. in == out → buffer is empty." },
      { q: "BUFFER_SIZE=5. in=2, out=3. Is buffer full?", a: "Full check: (2+1)%5 = 3 == out(3). YES — buffer is full." },
      { q: "Why does the bounded buffer waste one slot?", a: "To distinguish full from empty. If all N slots were used, in would wrap around to equal out — same as the empty condition. By stopping at N-1 items (in one step behind out = full), we have two distinct conditions." },
    ],
  },

  "shared-memory": {
    title: "Shared Memory IPC", emoji: "🧠",
    tldr: "Shared region allocated by OS, controlled by USER processes. Fastest IPC. Synchronization is programmer's responsibility.",
    explanation: `ANALOGY: Shared whiteboard in a room.
  OS sets up the whiteboard (allocates shared memory region).
  After that, the OS leaves the room — user processes communicate by reading/writing the board directly.
  Problem: if two people write at the same time, the message is garbled. That's a race condition.
  Solution: use semaphores (like a "turn" token) to take turns.

Steps of shared memory IPC:
  1. shmget() — create or get shared memory segment (OS does this)
  2. shmat() — attach segment to your process's address space
  3. Use it like normal memory (no system calls needed during data transfer!)
  4. shmdt() — detach when done
  5. shmctl() — control/destroy the segment

Why fastest? Normal memory access = 1 CPU cycle. Message passing = system call (100s of cycles) + copy to kernel + copy to receiver. Shared memory skips ALL of that.

The price: you must synchronize manually. Use semaphores:
  Writer: sem_wait(&empty) → write → sem_post(&full)
  Reader: sem_wait(&full)  → read  → sem_post(&empty)`,
    keyPoints: [
      "OS allocates shared region → then user processes control it",
      "Fastest IPC: zero copying, no kernel involvement after setup",
      "Synchronization is programmer's responsibility (not OS)",
      "Semaphores typically used to synchronize access",
      "Two+ processes map same physical memory to their virtual address spaces",
      "Major issue: preventing concurrent access (race conditions)",
    ],
    formula: {
      code: `Typical shared memory usage:
  1. shmget() — create/get shared memory segment
  2. shmat() — attach segment to process address space
  3. [use the shared memory directly via pointer]
  4. shmdt() — detach segment
  5. shmctl() — control/destroy segment

Server (writer):            Client (reader):
  sem_wait(&empty)            sem_wait(&full)
  write to shared_buf         read from shared_buf
  sem_post(&full)             sem_post(&empty)

Speed comparison:
  Shared Memory: 0 system calls during transfer ← fastest
  Message Passing: 2+ system calls + kernel copies`,
      explanation: "After setup, shared memory is accessed like regular memory — no system calls needed.",
    },
    examTips: [
      "Shared memory: OS sets it up, then USER controls it (not OS)",
      "Fastest IPC because NO copying — processes directly access same physical pages",
      "Synchronization NOT handled by OS — programmer must use semaphores/locks",
    ],
    questions: [
      { q: "Why must shared memory access be synchronized?", a: "Without synchronization, two processes could access simultaneously. For example, client reads while server is mid-write → client gets corrupted/partial data. Like two people editing the same file simultaneously." },
      { q: "What is the role of the OS in shared memory IPC?", a: "The OS only sets up the shared region (allocates memory, handles mapping). After that, it steps aside. All communication is directly between user processes with zero OS involvement." },
    ],
  },

  "message-passing": {
    title: "Message Passing IPC", emoji: "📨",
    tldr: "No shared variables. OS provides send(msg) and receive(msg). Fixed or variable message sizes.",
    explanation: `ANALOGY: Email through a mail server.
  - You don't hand a letter directly to your friend (no shared memory).
  - You give it to the OS (mail server) which delivers it.
  - The OS provides exactly two operations: send() and receive().

To communicate, two processes P and Q must:
  1. Establish a communication link
  2. Exchange messages via send()/receive()

Message size can be:
  Fixed → simple OS implementation, harder for programmer (what if message too big?)
  Variable → complex OS, flexible for programmer

Physical implementations: shared memory, hardware bus, network
Logical implementations: direct vs indirect, blocking vs non-blocking

Compared to shared memory:
  Message Passing: simpler to use, safer (no race conditions), but each send/receive = system call overhead
  Shared Memory: faster, but programmer must handle all sync

PRODUCER:
  send(next_produced)   ← just send, OS handles everything

CONSUMER:
  receive(next_consumed) ← just receive, no buffer management

Notice: no in/out pointers, no synchronization code — OS handles all of it!`,
    keyPoints: [
      "No shared variables — all through OS kernel",
      "Two primitives: send(message) and receive(message)",
      "Message size: fixed (simple implementation) or variable (flexible)",
      "Physical implementation: shared mem, hardware bus, network",
      "Logical: direct vs indirect, synchronous vs asynchronous",
      "Link properties: unidirectional or bidirectional",
    ],
    formula: {
      code: `// Message passing producer-consumer:
Producer:
  while (true) {
    /* produce item */
    send(next_produced);    // OS handles delivery
  }

Consumer:
  while (true) {
    receive(next_consumed); // blocks until message arrives
    /* consume item */
  }

// Compare: no in/out pointers, no busy waiting, no race condition!
// The OS manages the buffer automatically.

Implementation questions to know:
  1. How are links established? (automatic vs manual)
  2. Can a link have > 2 processes?
  3. How many links between a pair?
  4. What is the link capacity (buffer size)?
  5. Fixed or variable message size?
  6. Unidirectional or bidirectional?`,
      explanation: "Message passing hides buffer management from programmer.",
    },
    examTips: [
      "PYQ: 'What are the implementation issues of message passing?' — Dec 2024",
      "PYQ: 'Explain the two models of IPC' — May 2023, May 2024",
      "Message passing = NO shared variables (everything through OS)",
      "Two operations ONLY: send() and receive()",
      "Direct: name each other explicitly. Indirect: use mailboxes/ports.",
    ],
    questions: [
      { q: "What are the two operations provided by a message-passing IPC facility?", a: "send(message) and receive(message). All IPC is through these two primitives — no shared variables." },
      { q: "What are the 6 implementation questions for message passing?", a: "1. How links established? 2. Can link have >2 processes? 3. How many links per pair? 4. Link capacity? 5. Fixed or variable message size? 6. Unidirectional or bidirectional?" },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  MP DETAILS
  // ─────────────────────────────────────────────────────────────

  "direct-indirect": {
    title: "Direct vs Indirect Communication", emoji: "🎯",
    tldr: "Direct: name each other explicitly, 1 link per pair. Indirect: mailboxes/ports with unique IDs, many processes can share.",
    explanation: `DIRECT COMMUNICATION — processes name each other explicitly:
  send(P, message)    → "Hey P, this message is for you"
  receive(Q, message) → "I'll only accept messages from Q"

  Properties:
  • Links established AUTOMATICALLY (both sides name each other)
  • Exactly 1 link per pair (P↔Q have exactly one channel)
  • Usually bidirectional
  • TIGHT COUPLING: if P's name changes, Q's code breaks

INDIRECT COMMUNICATION — through mailboxes (ports):
  send(mailbox_A, message)    → "Drop this in mailbox A"
  receive(mailbox_A, message) → "Pick up from mailbox A"

  Any process that knows mailbox A's ID can send/receive through it.
  Properties:
  • Link exists ONLY IF both processes share a mailbox
  • One link can have MANY processes
  • One pair can have MULTIPLE links (different mailboxes)
  • LOOSE COUPLING: processes don't need to know each other

MAILBOX SHARING PROBLEM:
  P1 sends to mailbox A. P2 and P3 both try to receive. Who gets it?
  Three solutions:
  1. Allow at most 2 processes per link
  2. Only one process at a time can execute receive()
  3. OS picks arbitrarily, notifies sender who received it`,
    keyPoints: [
      "Direct: send(P, msg) / receive(Q, msg) — name each other explicitly",
      "Direct: 1 link per pair, auto-established, usually bidirectional",
      "Indirect: send(A, msg) / receive(A, msg) — through mailbox A",
      "Indirect: link exists only if processes share a mailbox",
      "Indirect: 1 link can involve MANY processes",
      "Indirect: 1 pair can have MULTIPLE links (different mailboxes)",
      "Mailbox sharing ambiguity: who receives when multiple processes share?",
    ],
    formula: {
      code: `Direct Communication:
  send(P, "hello")    → directly to process P
  receive(Q, &buf)    → directly from process Q

  Properties:
  - Exactly 1 link per pair (P↔Q)
  - Auto-established when both sides name each other
  - Symmetric: both sides MUST name each other

Indirect Communication (Mailboxes/Ports):
  send(mailbox_A, "hello")   → to mailbox A
  receive(mailbox_A, &buf)   → from mailbox A

  Mailbox operations:
  - create_mailbox(id)
  - send(mailbox, message)
  - receive(mailbox, message)
  - destroy_mailbox(id)

Comparison:
  Direct:   P1 ←——→ P2        (tight coupling)
  Indirect: P1 → [Mailbox A] ← P2 ← P3   (loose coupling)`,
      explanation: "Direct: tight coupling (both know each other). Indirect: loose coupling (share mailbox).",
    },
    examTips: [
      "Direct: exactly 1 link per pair. Indirect: multiple links possible per pair.",
      "Indirect: link only exists if processes SHARE a mailbox",
      "Direct is simpler but harder coupling (naming both sides)",
      "Mailbox ambiguity exam Q: 3 processes share mailbox, who gets the message?",
    ],
    questions: [
      { q: "P1, P2, P3 share mailbox A. P1 sends. P2 and P3 both try to receive. Who gets it?", a: "Ambiguous. Solutions: (1) allow only 2 processes per link, (2) only 1 can receive at a time, (3) OS picks arbitrarily and notifies sender." },
      { q: "What is the main disadvantage of direct communication?", a: "Tight coupling — both processes must know each other's identity explicitly. If a process is replaced or renamed, all code that references it must change." },
    ],
  },

  "mp-sync": {
    title: "Message Passing Synchronization", emoji: "⏱️",
    tldr: "Blocking=synchronous. Non-blocking=asynchronous. Both blocking = rendezvous.",
    explanation: `Message passing can be blocking (synchronous) or non-blocking (asynchronous).

BLOCKING SEND: sender waits until receiver has received the message.
  Like calling someone on the phone — you wait until they pick up.

BLOCKING RECEIVE: receiver waits until a message is available.
  Like waiting by the mailbox until the postman arrives.

NON-BLOCKING SEND: sender fires and forgets, continues immediately.
  Like sending an email — you don't wait for a reply.

NON-BLOCKING RECEIVE: receiver checks for a message and gets either a message OR null. Never blocks.
  Like checking your mailbox — you either find mail or you don't, then move on.

RENDEZVOUS (Both blocking):
  Both sender AND receiver block until they "meet" at the communication point.
  Like two people agreeing to meet at a specific time — both wait until the other arrives.
  Used in Ada programming language. Very strict synchronization.

Combinations:
  Blocking send    + Blocking receive   = RENDEZVOUS
  Non-blocking send + Blocking receive  = most common in practice
  Non-blocking send + Non-blocking recv = fully async (fire-and-forget both ways)`,
    keyPoints: [
      "Blocking send: sender WAITS until message is received",
      "Blocking receive: receiver WAITS until a message is available",
      "Non-blocking send: sender fires and continues immediately",
      "Non-blocking receive: gets message OR null (never blocks)",
      "Both blocking = RENDEZVOUS (processes synchronize at send/receive point)",
      "Blocking = synchronous. Non-blocking = asynchronous.",
    ],
    formula: {
      code: `Combinations:
  Blocking send    + Blocking receive   = RENDEZVOUS (sync point)
  Blocking send    + Non-blocking recv  = possible
  Non-blocking send + Blocking receive  = most common
  Non-blocking send + Non-blocking recv = fully async

Rendezvous example:
  Sender:   send(P, msg)    ← BLOCKS until P receives
  Receiver: receive(Q, msg) ← BLOCKS until Q sends
  → Both must reach their operation before either proceeds
  → Like a handshake — both hands must extend

Memory trick:
  Blocking = Synchronous = they SYNC up (wait for each other)
  Non-blocking = Asynchronous = they DON'T wait`,
      explanation: "Rendezvous = both blocking. Like a handshake — both parties must be ready.",
    },
    examTips: [
      "Rendezvous = BOTH send AND receive are blocking",
      "Blocking = synchronous. Non-blocking = asynchronous.",
      "Non-blocking receive: returns valid message OR null (never waits)",
      "Blocking send: sender cannot proceed until receiver gets message",
    ],
    questions: [
      { q: "What is a rendezvous in message passing?", a: "When BOTH send and receive are blocking. The sender blocks until the message is received, and the receiver blocks until a message is available — they 'meet' at the communication point. Used in Ada language." },
      { q: "What does a non-blocking receive return if no message is available?", a: "null (or equivalent). It never blocks — it always returns immediately, with either a valid message or null." },
    ],
  },

  "buffering": {
    title: "Message Buffering", emoji: "📦",
    tldr: "Zero capacity: rendezvous (sender waits). Bounded: sender waits if full. Unbounded: sender never waits.",
    explanation: `Every communication link has a queue (buffer) for messages. The capacity of this queue determines when the sender must wait.

ZERO CAPACITY (no buffering):
  Queue length = 0. Sender MUST wait until receiver is ready to receive.
  Think of passing a ball directly — you hold it until the other person reaches out.
  This forces a RENDEZVOUS. Also called "message system with no buffering."

BOUNDED CAPACITY (n messages):
  Queue holds up to n messages.
  Think of a inbox with limited slots.
  Sender waits ONLY if queue is full, otherwise drops message and continues.
  Most real systems use bounded capacity.

UNBOUNDED CAPACITY (infinite queue):
  Sender NEVER waits, regardless of how many messages are pending.
  Think of an infinitely large inbox.
  Ideal but impractical (infinite memory doesn't exist).

Memory trick:
  Zero → Zero freedom for sender (always waits)
  Bounded → Sometimes waits (only when full)
  Unbounded → Unlimited freedom (never waits)`,
    keyPoints: [
      "Zero capacity: queue=0 → sender must wait (rendezvous forced)",
      "Bounded capacity: queue of n → sender waits only when full",
      "Unbounded capacity: infinite queue → sender NEVER waits",
      "Zero capacity = no buffering. Bounded/Unbounded = automatic buffering",
      "Buffer = temporary queue attached to communication link",
    ],
    formula: {
      code: `Buffer Capacity Summary:
  ┌──────────────┬──────────────────────────────────┐
  │ Capacity     │ Sender behavior                  │
  ├──────────────┼──────────────────────────────────┤
  │ Zero (0)     │ Always waits → RENDEZVOUS        │
  │ Bounded (n)  │ Waits only if queue is FULL      │
  │ Unbounded    │ Never waits                      │
  └──────────────┴──────────────────────────────────┘

Zero capacity example:
  send(P, msg) → MUST wait until P calls receive()

Bounded (n=3):
  Queue: [msg1][msg2][msg3] → FULL → sender blocks
  Queue: [msg1][msg2]       → sender can proceed

Automatic buffering = Bounded OR Unbounded (not Zero)`,
      explanation: "Zero capacity requires receiver ready before sender can send.",
    },
    examTips: [
      "Zero capacity → rendezvous (sender always waits)",
      "Unbounded capacity → sender NEVER waits",
      "Zero = no buffering. Bounded/Unbounded = automatic buffering.",
    ],
    questions: [
      { q: "When does a sender block in bounded-capacity buffering?", a: "Only when the queue is full (all n slots occupied). If there's at least one free slot, sender deposits the message and continues." },
      { q: "What is automatic buffering?", a: "Buffering done by the OS without programmer involvement. Bounded and Unbounded capacity both use automatic buffering. Zero capacity does NOT — sender must manually synchronize (rendezvous)." },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  SYSTEM CALLS
  // ─────────────────────────────────────────────────────────────

  "pipes": {
    title: "Pipes", emoji: "🪈",
    tldr: "Oldest Unix IPC. Half-duplex (one direction). Only between related processes (parent-child). fd[0]=read, fd[1]=write.",
    explanation: `A pipe is literally a pipe between two processes — data flows one way through a kernel buffer.

Two key limitations:
  1. Half-duplex: data flows in ONE direction only (like a one-way street)
     Need TWO pipes for two-way communication.
  2. Only between RELATED processes that share a common ancestor (usually parent-child).

pipe() returns TWO file descriptors:
  fd[0] = READ end (what comes OUT of the pipe)
  fd[1] = WRITE end (what goes IN to the pipe)
  Memory trick: fd[1] writes IN → fd[0] reads OUT
  Like a water pipe: water enters one end, exits the other.

Setting up parent→child pipe (after fork):
  Parent writes, child reads:
    Parent closes fd[0] (parent doesn't need to read)
    Child closes fd[1]  (child doesn't need to write)

  Child writes, parent reads:
    Parent closes fd[1] (parent doesn't need to write)
    Child closes fd[0]  (child doesn't need to read)

ALWAYS close unused ends! If write end is open, read() never returns EOF.

popen()/pclose(): higher-level wrapper:
  popen("ls -la", "r") → creates pipe + forks + execs "ls -la" + returns FILE*
  You read the command's output from the FILE* just like fread()`,
    keyPoints: [
      "Oldest Unix IPC mechanism",
      "Limitation 1: half-duplex (one direction only)",
      "Limitation 2: only between related processes (parent-child via fork)",
      "fd[0] = read end. fd[1] = write end.",
      "Parent→child: parent closes fd[0], child closes fd[1]",
      "Child→parent: parent closes fd[1], child closes fd[0]",
      "popen('cmd','r'): read from command. popen('cmd','w'): write to command.",
      "pclose(): close pipe, wait for command, return exit status",
    ],
    formula: {
      code: `int fd[2];
pipe(fd);   // creates pipe: fd[1]→[KERNEL]→fd[0]

if (fork() == 0) {
  // CHILD: receive data (parent→child direction)
  close(fd[1]);          // child doesn't write
  read(fd[0], buf, N);   // child reads from pipe
  close(fd[0]);
} else {
  // PARENT: send data
  close(fd[0]);          // parent doesn't read
  write(fd[1], msg, N);  // parent writes to pipe
  close(fd[1]);
}

fd[1]→[KERNEL BUFFER]→fd[0]
         ↑
       the "pipe"

Rule: Always close the end you don't use!
  Unclosed write end → reader never sees EOF → read() blocks forever`,
      explanation: "Always close the unused end. Both write and read ends of an unused pipe must be closed.",
    },
    examTips: [
      "PYQ: 'How does a pipe work in IPC?' — July 2023",
      "PYQ: 'Write a program to send a string between two unrelated processes using named pipes' — May 2024",
      "fd[0]=read, fd[1]=write — NEVER confuse these",
      "Parent→child: parent closes fd[0] (read), child closes fd[1] (write)",
      "Pipes only work between related processes — FIFOs fix this",
      "Half-duplex: need TWO pipes for bidirectional communication",
    ],
    questions: [
      { q: "Why does the parent close fd[0] when creating a parent-to-child pipe?", a: "fd[0] is the read end. If the parent is sending (writing), it has no use for the read end. Closing unused ends is essential — otherwise EOF is never signaled on the read end, causing read() to block forever." },
      { q: "What happens if you forget to close fd[1] in the child process (parent→child pipe)?", a: "The read end (fd[0]) will never see EOF even when the parent finishes writing, because the kernel sees the write end (fd[1]) is still open (in the child). The child's read() will block forever." },
    ],
  },

  "fifos": {
    title: "FIFOs (Named Pipes)", emoji: "📋",
    tldr: "Named pipes. Appear as files in filesystem. Unrelated processes can communicate (unlike anonymous pipes).",
    explanation: `FIFOs solve the #1 limitation of pipes: unrelated processes can communicate!

A FIFO appears as a real FILE in the filesystem. Any process that knows the filename can open it and communicate — they don't need to be related.

ANALOGY: A drop box at a post office.
  Pipe = hand a note directly to a family member (only works with relatives)
  FIFO = put a note in a public drop box (anyone who knows the box can use it)

Creating and using a FIFO:
  1. mkfifo("/tmp/myfifo", 0644) — creates the FIFO file
  2. Writer: open("/tmp/myfifo", O_WRONLY) → write() → close()
  3. Reader: open("/tmp/myfifo", O_RDONLY) → read() → close()
  4. cleanup: unlink("/tmp/myfifo") — removes the FIFO file

IMPORTANT: open() on a FIFO BLOCKS until BOTH sides are connected!
  If writer opens first, it blocks until reader opens (and vice versa).
  This gives you a FREE rendezvous at connection time.

Two uses:
  1. Shell pipelines: pass data between commands without temp files
     mkfifo /tmp/data; compress < /tmp/data & generate_data > /tmp/data
  2. Client-server: server and clients use a well-known FIFO path to exchange requests/responses

Still half-duplex like pipes — one direction only.`,
    keyPoints: [
      "Named pipe — appears as a file in the filesystem",
      "Unrelated processes can communicate (unlike anonymous pipes)",
      "mkfifo() creates a FIFO file",
      "Once created: use open(), read(), write(), close(), unlink()",
      "Use 1: shell pipelines without intermediate temp files",
      "Use 2: client-server rendezvous point",
      "open() BLOCKS until both ends (reader + writer) are connected",
    ],
    formula: {
      code: `// Create a FIFO:
mkfifo("/tmp/myfifo", 0644);

// Writer process (can be unrelated to reader):
int fd = open("/tmp/myfifo", O_WRONLY);  // blocks until reader opens
write(fd, "hello", 5);
close(fd);

// Reader process (totally unrelated process!):
int fd = open("/tmp/myfifo", O_RDONLY);  // blocks until writer opens
read(fd, buf, 5);
close(fd);

// Remove when done:
unlink("/tmp/myfifo");

Pipe vs FIFO comparison:
  Feature          Pipe (Anonymous)    FIFO (Named)
  Related only?    YES                 NO (any process)
  Has filename?    NO                  YES (filesystem path)
  Persistent?      NO (dies with proc) YES (until unlink)
  API              pipe() + fd[2]      mkfifo() + open()`,
      explanation: "FIFO open() blocks until BOTH sides (reader+writer) have opened — natural rendezvous.",
    },
    examTips: [
      "FIFO = named pipe. Anonymous pipe = unnamed pipe.",
      "FIFOs solve: unrelated processes can communicate (pipes can't do this)",
      "mkfifo() creates it. Then use normal file I/O (open, read, write, unlink).",
      "open() on a FIFO blocks until BOTH sides are open (built-in rendezvous).",
    ],
    questions: [
      { q: "What advantage do FIFOs have over pipes?", a: "FIFOs allow unrelated processes to communicate. Pipes require a common ancestor (parent-child). FIFOs have a filesystem name, so any process that knows the name can open and use it." },
      { q: "What happens when a writer opens a FIFO but no reader has opened it yet?", a: "The writer's open() call BLOCKS until a reader also opens the FIFO. This is the built-in rendezvous mechanism of FIFOs. Both sides must be ready before either proceeds." },
    ],
  },

  "msg-queues": {
    title: "Message Queues", emoji: "📬",
    tldr: "Kernel-maintained linked list of messages. Not necessarily FIFO — can fetch by TYPE. msgget/msgsnd/msgrcv.",
    explanation: `A message queue is a linked list of typed messages stored in the kernel. Unlike pipes (byte stream), it preserves message BOUNDARIES and allows SELECTIVE RETRIEVAL.

ANALOGY: A sorted inbox where emails have labels (types).
  You can say "give me the next email with label=URGENT" even if it's not the oldest.
  Pipes can't do this — they're just a byte stream, no labels, strict FIFO.

The key advantage: the TYPE FIELD.
  Each message has a long integer type. When reading, you can specify:
    type=0 → get the FIRST message (FIFO order)
    type>0 → get first message of that specific type
    type<0 → get first message with type ≤ |type| (priority-like)

Example use: server handles 3 message types: 1=login, 2=data, 3=logout
  A thread dedicated to logins does: msgrcv(qid, &buf, size, 1, 0)
  It only picks up type=1 messages, regardless of what else is in the queue.

Persistence: message queues survive even after the sending process exits!
  Unlike pipes that disappear, queues exist until explicitly deleted.

API:
  msgget(key, flags) → get or create queue, returns queue ID
  msgsnd(qid, &msg, size, flags) → send message
  msgrcv(qid, &msg, size, type, flags) → receive message
  msgctl(qid, IPC_RMID, NULL) → delete queue`,
    keyPoints: [
      "Kernel-maintained linked list of typed messages",
      "msgget(): create/open queue → returns ID",
      "msgsnd(): add message (type + length + data) to end of queue",
      "msgrcv(): fetch message — CAN be by type (not necessarily FIFO!)",
      "Type field: positive long integer per message",
      "Persistent: survives process exits (unlike pipes/FIFOs)",
      "Key advantage: selective fetch by message type",
    ],
    formula: {
      code: `Message structure:
  struct msgbuf {
    long mtype;      // type > 0 (e.g., 1=command, 2=data, 3=error)
    char mtext[100]; // actual message data
  };

// Create/open queue:
int qid = msgget(IPC_PRIVATE, 0666 | IPC_CREAT);

// Send message of type 1:
struct msgbuf buf = {1, "hello"};
msgsnd(qid, &buf, strlen("hello")+1, 0);

// Receive specific type:
// type=0  → get first message (FIFO)
// type>0  → get first message of that type
// type<0  → get first msg with lowest type ≤ |type|
msgrcv(qid, &buf, sizeof(buf.mtext), 2, 0); // get type 2

// Delete queue:
msgctl(qid, IPC_RMID, NULL);

Pipes vs Message Queues:
  Pipes:   byte stream, strict FIFO, disappears when closed
  MsgQ:    typed messages, selective retrieval, persistent`,
      explanation: "msgtype in msgrcv controls selective retrieval — key feature vs pipes.",
    },
    examTips: [
      "Message queues: NOT necessarily FIFO (can fetch by type)",
      "Each message has a TYPE field — enables priority/categorized delivery",
      "Persistent: survives after sender exits (unlike pipes)",
      "msgget → msgsnd → msgrcv → msgctl (to destroy)",
    ],
    questions: [
      { q: "How do message queues differ from pipes in terms of message retrieval?", a: "Pipes are strict byte-stream FIFO. Message queues allow selective retrieval by type field — you can skip messages and get a specific type without removing earlier messages." },
      { q: "What does msgrcv with type=-5 do?", a: "Gets the first message in the queue whose type is ≤ |5| = 5. Among all messages with type 1, 2, 3, 4, or 5, it returns the one with the lowest type number. This enables priority-based retrieval." },
    ],
  },

  "ipc-semaphores": {
    title: "IPC Semaphores (System V + POSIX)", emoji: "🚦",
    tldr: "Counter for shared resource access. System V: semget/semctl/semop. POSIX: sem_init/sem_wait/sem_post.",
    explanation: `A semaphore is a counter that controls access to shared resources.

ANALOGY: A parking lot counter sign showing "14 spaces available".
  When a car enters: counter decrements (take a space).
  When a car exits: counter increments (free a space).
  If counter=0: new cars must wait outside.

Semaphore Logic:
  To acquire resource:
    If value > 0: decrement value and proceed
    If value = 0: sleep until someone increments

  To release resource:
    Increment value + wake up one sleeping process

System V API (older, complex):
  semget() → obtain a semaphore set ID
  semctl() → initialize/control semaphore
  semop()  → atomically perform operations on semaphore set
  semop is ATOMIC — entire array of operations at once (important!)

POSIX API (simpler, more common):
  sem_init(&s, pshared, value) → initialize
    pshared=0: shared between threads of same process
    pshared=1: shared between processes (needs shared memory)
  sem_wait(&s)  → P / down / decrement (blocks if 0)
  sem_post(&s)  → V / up  / increment (wakes one waiter)

Naming: sem_wait = P = down = decrement = "wait for resource"
        sem_post = V = up  = increment = "release resource"
  (P = Dutch "probeer" = try; V = Dutch "verhoog" = increment)`,
    keyPoints: [
      "Counter controlling access to shared resources",
      "To acquire: if > 0 → decrement and use; if = 0 → sleep",
      "To release: increment + wake waiting processes",
      "semget(): obtain semaphore ID (System V)",
      "semctl(): control operations (get/set value, remove) (System V)",
      "semop(): atomically perform array of operations on semaphore set (System V)",
      "POSIX: sem_init, sem_wait (P/down), sem_post (V/up)",
      "pshared=0: between threads; pshared=1: between processes",
    ],
    formula: {
      code: `System V Semaphore:
  semget() → get semaphore ID
  semctl() → initialize/control
  semop()  → atomic P/V operations

POSIX Semaphore (simpler — exam favorite):
  sem_t s;
  sem_init(&s, 0, 1);   // pshared=0 (threads), initial value=1
  
  sem_wait(&s);          // P / down / decrement
    // critical section
  sem_post(&s);          // V / up / increment

Parking lot analogy:
  sem_init(&spaces, 0, 10);  // 10 spaces available
  
  car_enters: sem_wait(&spaces);  // space count: 10→9→...→0
  car_exits:  sem_post(&spaces);  // space count: 0→1→...→10

All names mean the same thing:
  sem_wait = P = down = decrement = probeer (Dutch: try)
  sem_post = V = up   = increment = verhoog (Dutch: raise)`,
      explanation: "sem_wait = P = down = decrement. sem_post = V = up = increment.",
    },
    examTips: [
      "sem_wait = P = down = decrement. sem_post = V = up = increment — know ALL names",
      "semop is ATOMIC — entire array of operations at once",
      "POSIX sem_init(sem, pshared, value): pshared=0 for threads, 1 for processes",
      "Semaphore value > 0: resource available. = 0: all processes blocked.",
    ],
    questions: [
      { q: "What happens when a process calls sem_wait() on a semaphore with value 0?", a: "The process blocks (goes to sleep) and is placed in the waiting queue. It stays there until another process calls sem_post(), which increments the semaphore and wakes one waiting process." },
      { q: "What does pshared=1 mean in sem_init?", a: "The semaphore is shared between PROCESSES (not just threads). It must be placed in shared memory (e.g., via mmap or shmget) so all processes can access it." },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  THREADS
  // ─────────────────────────────────────────────────────────────

  "threads-intro": {
    title: "Threads — Introduction & Benefits", emoji: "🧵",
    tldr: "Thread = CPU unit. Has: ID, PC, registers, stack. Shares: code, data, files, signals. 4 benefits.",
    explanation: `A THREAD is the fundamental unit of CPU utilization. Think of a process as a factory, and threads as the workers inside it.

All workers (threads) share the same building (address space), tools (file descriptors), and blueprints (code). But each worker has their own desk (stack) and their own position tracker (program counter + registers).

What each thread OWNS privately:
  • Thread ID
  • Program Counter (where it is in the code)
  • Register set (CPU registers for its computation)
  • Stack (its own local variables and function call history)

What threads SHARE with siblings:
  • Code segment (same executable)
  • Data segment (global variables)
  • Heap (dynamically allocated memory)
  • Open file descriptors
  • Signal handlers

4 Benefits of Multithreading:
1. RESPONSIVENESS: Even if one thread blocks (waiting for disk), others keep running.
   Example: browser — one thread loads image, another keeps UI responsive.

2. RESOURCE SHARING: Threads share process memory — no IPC overhead needed.
   Much easier than setting up shared memory or message passing.

3. ECONOMY: Creating a thread is MUCH cheaper than creating a process.
   Solaris: process creation ~30× slower than thread creation.
   Context switch: ~5× slower for process vs thread.

4. SCALABILITY: Threads can run truly in parallel on multiple CPU cores.
   A single-threaded process can only use 1 core. Multi-threaded uses all cores.`,
    keyPoints: [
      "Thread = CPU utilization unit. Contains: ID, PC, registers, stack",
      "Shares with other threads: code, data, file descriptors, signals",
      "Benefit 1: Responsiveness (one thread blocks, others continue)",
      "Benefit 2: Resource Sharing (easier than IPC)",
      "Benefit 3: Economy (cheaper than process creation/switching)",
      "Benefit 4: Scalability (parallel on multiple cores)",
      "Solaris: process creation ~30× slower than thread creation",
      "Solaris: context switch ~5× slower for process vs thread",
    ],
    formula: null,
    examTips: [
      "PYQ: 'What is a Thread?' — appears in almost every paper",
      "PYQ: 'What are the benefits of threads?' — July 2023, Dec 2023",
      "PYQ: 'Advantages of threads over processes?' — July 2023",
      "4 benefits: Responsiveness, Resource Sharing, Economy, Scalability — all 4",
      "Thread private: ID, PC, registers, stack. Thread shared: code, data, files, signals",
      "Economy: Solaris numbers (30× and 5×) — popular exam data points",
    ],
    questions: [
      { q: "What data does a thread own privately vs share with sibling threads?", a: "Private: thread ID, program counter, register set, stack. Shared with other threads in same process: code segment, data segment, heap, open file descriptors, signals." },
      { q: "How much cheaper is thread creation vs process creation in Solaris?", a: "~30× faster to create a thread than a process. Context switching is ~5× faster for threads than processes." },
    ],
  },

  "threads-vs-proc": {
    title: "Threads vs Processes", emoji: "⚖️",
    tldr: "Process: isolated memory, file descriptors, signals. Thread: shares all of these. Thread = lighter weight.",
    explanation: `Processes are isolated by DEFAULT. Threads share everything by DEFAULT.

Think of it like apartments vs rooms in a house:
  Process = separate apartment (own kitchen, bathroom, entrance — fully isolated)
  Thread  = rooms in the same house (shared kitchen, bathroom — open access)

Sharing table:
  Resource          Process     Thread
  Memory            NOT shared  SHARED (globals + heap)
  File descriptors  NOT shared  SHARED
  Filesystem ctx    NOT shared  SHARED (cwd, umask)
  Signal handling   NOT shared  SHARED

Thread-private state (stored in TCB = Thread Control Block):
  CPU registers, program counter, stack
  (TCB is like a bookmark — records where the thread was when it was paused)

Why does each thread need its OWN stack?
  The stack holds: local variables, function parameters, return addresses.
  If threads shared a stack, thread A calling foo() would overwrite thread B's foo() locals — disaster!

Cost of sharing:
  + Easy communication (no IPC needed)
  + Cheap creation (no new address space)
  - Bug in one thread can corrupt EVERYONE (no isolation)
  - Race conditions if shared data is not protected`,
    keyPoints: [
      "Process: isolated memory, FDs, filesystem context, signals",
      "Thread: shares memory, FDs, filesystem context, signal handling",
      "Thread-private (in TCB): registers, PC, stack",
      "Shared: globals, heap, I/O state, network connections",
      "TCB = Thread Control Block (analogous to PCB for processes)",
      "Bug in one thread can corrupt shared memory and crash all threads",
    ],
    formula: {
      code: `Process Address Space:
  ┌─────────────────────────┐
  │ Stack (Thread 1) ↓      │ ← thread-private
  │ Stack (Thread 2) ↓      │ ← thread-private
  │ Stack (Thread 3) ↓      │ ← thread-private
  ├─────────────────────────┤
  │ Heap ↑ (shared)         │ ← all threads share
  ├─────────────────────────┤
  │ BSS/Data (shared)       │ ← global variables shared
  ├─────────────────────────┤
  │ Text/Code (shared)      │ ← same executable
  └─────────────────────────┘

TCB (Thread Control Block):
  thread_id, registers, PC, stack_pointer, state, priority`,
      explanation: "Each thread gets its own stack but shares everything else with siblings.",
    },
    examTips: [
      "Thread-private: registers, PC, stack. Everything else = shared.",
      "TCB = Thread Control Block. Stores per-thread state.",
      "One bug in shared memory affects ALL threads in process",
      "Thread creation: no new address space needed → much cheaper than fork()",
    ],
    questions: [
      { q: "Why does each thread need its own stack?", a: "The stack holds local variables, function parameters, and return addresses — specific to each thread's execution context. Sharing a stack would corrupt each thread's function call chain." },
      { q: "What is a TCB and what does it store?", a: "Thread Control Block — the OS data structure that stores per-thread state. Contains: thread ID, CPU registers, program counter, stack pointer, thread state (running/blocked/ready), scheduling priority." },
    ],
  },

  "threading-models": {
    title: "Multithreading Models", emoji: "🗺️",
    tldr: "Many-to-One: fast but 1 block=all block. One-to-One: most common (Linux/Windows). Many-to-Many: best of both.",
    explanation: `User threads (library-managed) must be mapped to Kernel threads (OS-managed).

MANY-TO-ONE (M:1):
  All user threads → one kernel thread
  OS only sees 1 thread. Very fast thread operations (no kernel calls).
  FATAL FLAW: if any user thread makes a blocking system call (e.g., read from disk),
  the ONE kernel thread blocks → ALL user threads block. Zero parallelism.
  Example: Solaris Green Threads (legacy), GNU Portable Threads
  Status: OBSOLETE — nobody uses it today.

ONE-TO-ONE (1:1):
  Each user thread → its own kernel thread
  True parallelism on multicore! One thread blocks → others keep running.
  Cost: creating a user thread creates a kernel thread (OS overhead).
  Example: Linux, Windows (most modern OS)
  Status: STANDARD — what you're using on your laptop right now.

MANY-TO-MANY (M:M):
  N user threads → M kernel threads (M ≤ N)
  Best of both worlds: create as many user threads as you want,
  OS decides how many kernel threads to actually schedule.
  No parallelism loss AND no 1:1 overhead.
  Problem: complex to implement. Requires "upcalls" (scheduler activation).
  Example: Solaris < v9, Windows ThreadFiber (optional)

TWO-LEVEL MODEL: M:M but lets you BIND a specific user thread to a kernel thread.
  Used when a user thread needs real-time guarantees.`,
    keyPoints: [
      "Many-to-One: fast, no parallelism, one block = all block",
      "One-to-One: true parallelism, one block doesn't affect others, overhead",
      "Many-to-Many: flexible, OS creates enough kernel threads, complex",
      "Two-level: M:M with optional pinning (binding user→kernel thread)",
      "Linux and Windows: One-to-One",
      "Solaris Green Threads: Many-to-One (legacy)",
    ],
    formula: {
      code: `Many-to-One:
  [UT1][UT2][UT3][UT4] → [KT1]
  UT1 makes blocking syscall → ALL blocked (OS sees only 1 thread)
  ❌ No parallelism. Obsolete.

One-to-One (Linux/Windows):
  [UT1] → [KT1]  (Core 1)
  [UT2] → [KT2]  (Core 2)
  [UT3] → [KT3]  (Core 3)
  UT1 blocks → UT2, UT3 still running
  ✅ True parallelism. Standard.

Many-to-Many:
  [UT1][UT2] → [KT1]
  [UT3][UT4] → [KT2]
  OS adjusts M based on load
  ✅ Flexible. Complex implementation.

Model Comparison:
  Model │ OS Example       │ Parallelism │ 1 Block=All?
  ──────┼──────────────────┼─────────────┼─────────────
  M:1   │ Solaris Green    │ NO          │ YES
  1:1   │ Linux, Windows   │ YES         │ NO
  M:M   │ Solaris < v9     │ YES         │ NO`,
      explanation: "Linux/Windows use 1:1. M:1 is obsolete. M:M is complex but flexible.",
    },
    examTips: [
      "PYQ: 'Explain the different threading models' — July 2023, Dec 2023, May 2024, Dec 2024 — APPEARS IN EVERY EXAM",
      "Linux = One-to-One. Windows = One-to-One. Solaris old = Many-to-Many.",
      "M:1 problem: one thread blocking blocks ALL (OS sees only 1 thread)",
      "1:1 advantage: true parallelism on multicore. Cost: kernel thread per user thread.",
      "M:M advantage: best of both, but complex implementation",
    ],
    questions: [
      { q: "Why can't Many-to-One model achieve true parallelism on multicore?", a: "All user threads map to ONE kernel thread. The OS only sees and schedules one kernel thread at a time, so only one can run on one CPU core — even if multiple cores are available." },
      { q: "What is the main drawback of One-to-One model?", a: "Creating a user thread requires creating a corresponding kernel thread. This has OS overhead. On some systems, there's also a limit on the number of kernel threads (system resource limit)." },
    ],
  },

  "pthreads-api": {
    title: "Pthreads API", emoji: "🔧",
    tldr: "pthread_create, pthread_join, pthread_exit. Zombie thread if not joined or detached. Don't pass stack variable to create.",
    explanation: `Pthreads = POSIX Threads standard (IEEE 1003.1c). The C API for thread creation on Unix/Linux.

CREATING A THREAD:
  pthread_create(&tid, &attr, function, arg)
    tid  = output: thread's ID (like a handle to the thread)
    attr = thread attributes (NULL = defaults)
    function = the function the thread will run (must return void*)
    arg = argument to pass to function (cast to void*)

  COMMON MISTAKE: passing &local_variable as arg.
  If the creating function returns before the thread uses the variable,
  the variable is gone from the stack → dangling pointer → crash!
  Solution: pass global, heap-allocated (malloc), or main's long-lived variable.

WAITING FOR A THREAD:
  pthread_join(tid, &retval)
  Blocks until thread 'tid' finishes.
  Also cleans up the thread's resources (like wait() for child processes).

ZOMBIE THREAD: if a thread finishes but is never joined or detached,
  it stays as a zombie consuming kernel resources indefinitely.
  Fix: always join, or call pthread_detach() if you don't need the return value.

pthread_exit(value): terminates the calling thread.
  Called from main(): the PROCESS stays alive until ALL other threads finish.
  return from main() or exit(): immediately kills ALL threads.

FORK-JOIN PATTERN (most common pattern):
  1. Launch N threads (fork phase)
  2. Wait for all N to complete (join phase)
  3. Process results`,
    keyPoints: [
      "pthread_create(): create thread — needs function pointer and argument",
      "pthread_join(): block until thread finishes — also cleans up resources",
      "pthread_exit(): terminate thread (from main: keeps process alive until others done)",
      "Zombie thread: finished but not joined/detached → resource leak",
      "Common mistake: passing local variable address to pthread_create",
      "Solution: pass global, heap-allocated, or main-stack data",
    ],
    formula: {
      code: `// Create thread:
pthread_t tid;
pthread_attr_t attr;
pthread_attr_init(&attr);
pthread_create(&tid, &attr, runner_function, (void*)arg);

// runner function signature (MUST match this):
void* runner(void* param) {
  int *n = (int*)param;    // cast back to real type
  // do work with *n
  pthread_exit(0);          // or: return NULL;
}

// Wait for thread to finish:
void *retval;
pthread_join(tid, &retval);

// Fork-Join Pattern (N threads):
pthread_t tids[N];
for (int i = 0; i < N; i++)
  pthread_create(&tids[i], NULL, worker, &args[i]);
for (int i = 0; i < N; i++)    // join IN ORDER, but threads EXIT in ANY ORDER
  pthread_join(tids[i], NULL);
// All N threads done here

// Mutex:
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_lock(&lock);
  counter++;               // critical section
pthread_mutex_unlock(&lock);`,
      explanation: "Fork-Join: create all threads, then join all — classic parallel pattern.",
    },
    examTips: [
      "pthread_join: joins in ORDER of loop, but threads may EXIT in any order",
      "Zombie thread: never joined/detached → resource leak forever",
      "pthread_exit from main(): process alive until ALL threads done",
      "exit() or return from main(): kills ALL threads immediately",
    ],
    questions: [
      { q: "What is a Zombie Thread?", a: "A thread that has finished execution but was never joined (pthread_join) or detached. It consumes kernel resources (TCB, stack) indefinitely because no one claimed its exit status." },
      { q: "What happens if you call exit() from main() while other threads are running?", a: "exit() (or return from main) immediately terminates the entire process along with all other threads, even if they haven't finished their work. Use pthread_exit() from main() to let other threads finish first." },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  CONCURRENCY
  // ─────────────────────────────────────────────────────────────

  "amdahls": {
    title: "Amdahl's Law", emoji: "📈",
    tldr: "Speedup = 1 / (S + (1-S)/N). S=serial fraction. As N→∞, speedup → 1/S. Serial part limits gains.",
    explanation: `Amdahl's Law answers: "How much faster will my program get if I add more cores?"

KEY INSIGHT: The serial (non-parallelizable) part of your program creates a CEILING on speedup. No matter how many cores you add, you can never exceed 1/S speedup.

ANALOGY: Making a sandwich.
  Parallel: multiple people spreading ingredients simultaneously.
  Serial: assembling the sandwich (only one person can do it at the end).
  Even with 100 workers, the assembling step still takes the same time.

Formula: Speedup = 1 / (S + (1-S)/N)
  S = fraction that MUST be serial (0 to 1)
  N = number of cores
  (1-S) = parallel fraction

WORKED EXAMPLES:

Example 1: S=0.25 (25% serial), N=4 cores
  Speedup = 1 / (0.25 + 0.75/4)
           = 1 / (0.25 + 0.1875)
           = 1 / 0.4375 = 2.29×

Example 2: S=0.30, N=4 cores (given in textbook):
  Speedup = 1 / (0.30 + 0.70/4)
           = 1 / (0.30 + 0.175) = 1/0.475 ≈ 2.10×

Maximum speedup (N→∞):
  S=0.25 → max = 1/0.25 = 4×
  S=0.10 → max = 1/0.10 = 10×
  S=0.05 → max = 1/0.05 = 20×

Lesson: reduce the serial fraction more than adding cores!`,
    keyPoints: [
      "Speedup = 1 / (S + (1-S)/N)",
      "S = serial fraction (0 to 1). N = number of cores.",
      "As N → ∞: Speedup → 1/S (hard ceiling!)",
      "Serial portion S limits maximum possible speedup",
      "25% serial (S=0.25): max speedup = 4× (even with ∞ cores)",
    ],
    formula: {
      code: `Amdahl's Law:
  Speedup = 1 / (S + (1-S)/N)
  
  S = serial fraction, N = number of cores
  (1-S) = parallel fraction

Example 1: S=0.25, N=4 cores
  Speedup = 1/(0.25 + 0.75/4) = 1/(0.25+0.1875) = 1/0.4375 = 2.29×

Example 2: S=0.30, N=4 cores (textbook example)
  Speedup = 1/(0.30 + 0.70/4) = 1/(0.30+0.175) = 1/0.475 ≈ 2.10×

Example 3: S=0.20, N=8 cores
  Speedup = 1/(0.20 + 0.80/8) = 1/(0.20+0.10) = 1/0.30 = 3.33×

Maximum speedup (N→∞):
  S=0.05 → max = 20×   S=0.10 → max = 10×
  S=0.25 → max = 4×    S=0.50 → max = 2×

Diminishing returns: going 1→2 cores gives huge gain,
going 99→100 cores gives tiny gain.`,
      explanation: "Even with infinite cores, serial fraction S creates an unbeatable ceiling.",
    },
    examTips: [
      "Speedup = 1/(S + (1-S)/N) — MEMORIZE",
      "Max speedup = 1/S (as N→∞). S=0.25 → max 4×.",
      "S=0.30, N=4 cores → speedup ≈ 2.10× (given in textbook)",
      "Adding cores has diminishing returns — serial part always limits you",
    ],
    questions: [
      { q: "S=0.20 (20% serial), N=8 cores. Calculate speedup.", a: "Speedup = 1/(0.20 + 0.80/8) = 1/(0.20 + 0.10) = 1/0.30 ≈ 3.33×." },
      { q: "Program is 90% parallel. What is the maximum possible speedup?", a: "S=0.10. Max speedup = 1/S = 1/0.10 = 10× (with infinite cores)." },
      { q: "S=0.25, N=2 cores. Calculate speedup.", a: "Speedup = 1/(0.25 + 0.75/2) = 1/(0.25 + 0.375) = 1/0.625 = 1.6×." },
    ],
  },

  "concurrency-parallelism": {
    title: "Concurrency vs Parallelism", emoji: "🔀",
    tldr: "Concurrent: multiple tasks in progress (interleaved on 1 core). Parallel: multiple tasks literally simultaneously (multiple cores).",
    explanation: `CONCURRENCY = about STRUCTURE (tasks CAN overlap in time)
PARALLELISM = about EXECUTION (tasks DO overlap in time simultaneously)

ANALOGY:
  One cook with 4 burners — CONCURRENT.
    They're stirring pot 1, then pot 2, then pot 1... (switching attention)
    Only ONE pot is being stirred at any instant, but all 4 are "in progress."
  
  Four cooks, four pots — PARALLEL.
    All 4 pots being stirred at the SAME INSTANT.

On a SINGLE-CORE CPU:
  Only concurrency is possible (rapid context switching creates the illusion of simultaneity).
  Thread 1: [T1][T1]    [T1][T1]
  Thread 2:         [T2]       [T2]
  (They take turns using the ONE core)

On a MULTI-CORE CPU:
  True parallelism IS possible.
  Core 1: [T1][T1][T1][T1]
  Core 2: [T2][T2][T2][T2]
  (Both run at the EXACT same time)

DATA PARALLELISM: split the DATA, apply same operation on each piece.
  Example: Sort a 1 million element array.
  Core 1: sort first 250K, Core 2: sort next 250K... then merge.

TASK PARALLELISM: split the WORK, each core does a different job.
  Example: Web server.
  Core 1: handles UI thread, Core 2: handles network I/O thread, Core 3: handles file writes.

All parallelism is concurrent, but not all concurrency is parallelism.`,
    keyPoints: [
      "Concurrency: tasks progress simultaneously (may interleave, 1 core OK)",
      "Parallelism: tasks run literally at the same time (needs multiple cores)",
      "Single-core: only concurrency possible (rapid context switching)",
      "Multi-core: both concurrency and true parallelism",
      "Data parallelism: same op, different data subsets on different cores",
      "Task parallelism: different ops, different cores",
    ],
    formula: {
      code: `Single core — CONCURRENT (not parallel):
  Time→ [T1][T2][T1][T2][T1][T2]
        (rapid switching — only 1 runs at a time)

Multi core — PARALLEL:
  Core 1: [T1][T1][T1][T1]
  Core 2: [T2][T2][T2][T2]
  (truly simultaneous execution)

Data Parallelism (sum of array[0..N]):
  Core 1: sum array[0..N/4]
  Core 2: sum array[N/4..N/2]
  Core 3: sum array[N/2..3N/4]
  Core 4: sum array[3N/4..N]
  Final: merge all partial sums

Task Parallelism:
  Core 1: UI thread (handling user input)
  Core 2: Network I/O thread (fetching data)
  Core 3: Rendering thread (drawing screen)

Multicore challenges:
  1. Dividing activities (what can be parallelized?)
  2. Balance (ensure equal work per core)
  3. Data splitting (how to partition data?)
  4. Data dependency (thread A needs thread B's output)
  5. Testing and debugging (non-deterministic execution)`,
      explanation: "Concurrency = structural. Parallelism = execution. Parallelism requires hardware.",
    },
    examTips: [
      "Concurrency: structure (tasks CAN overlap). Parallelism: execution (tasks DO overlap).",
      "Concurrency without parallelism: single-core multitasking",
      "Data parallelism: same operation on data subsets. Task: different operations.",
      "5 multicore challenges: dividing activities, balance, data splitting, dependencies, testing",
    ],
    questions: [
      { q: "What is the difference between data parallelism and task parallelism?", a: "Data parallelism: same operation applied to different subsets of data across cores (e.g., parallel array sum). Task parallelism: different operations on different cores simultaneously (e.g., UI thread + network thread + file I/O thread)." },
      { q: "Can parallelism exist without concurrency?", a: "No. Parallelism implies multiple things happen at the same time, which is a form of concurrency. But concurrency can exist without parallelism (single-core rapid switching)." },
    ],
  },

  "thread-scheduling": {
    title: "Thread Scheduling (PCS vs SCS)", emoji: "🗓️",
    tldr: "PCS: user-level, within process. SCS: kernel-level, system-wide. Linux/macOS: only PTHREAD_SCOPE_SYSTEM.",
    explanation: `Two scopes for how threads compete for CPU time:

PCS (Process-Contention Scope):
  Threads compete for CPU WITHIN the process.
  Used in M:M and M:1 models — the thread library schedules user threads onto kernel threads.
  The kernel doesn't see individual user threads; it just sees the process's kernel thread(s).
  Priority-based: within the process, highest priority user thread runs first.
  ANALOGY: A company's internal meeting scheduler — decides which employee attends the company's one meeting room.

SCS (System-Contention Scope):
  Threads compete for CPU system-wide, against ALL threads on the system.
  Used in 1:1 model — each user thread IS a kernel thread, scheduled by the OS.
  Linux and macOS ONLY support PTHREAD_SCOPE_SYSTEM (SCS).
  ANALOGY: All employees from ALL companies compete for government-allocated office space.

In Pthreads:
  PTHREAD_SCOPE_PROCESS → PCS scheduling
  PTHREAD_SCOPE_SYSTEM  → SCS scheduling

THREAD POOLS:
  Creating a new thread for every incoming request is expensive.
  Solution: pre-create a pool of N threads at startup.
  When a request comes, assign it to an idle thread from the pool.
  When done, thread returns to pool (not destroyed).
  Benefits: no creation overhead, bounded resource usage.

THREAD CANCELLATION:
  Async: terminate immediately (dangerous — might hold a mutex!)
  Deferred: thread checks a flag periodically and terminates safely (preferred)`,
    keyPoints: [
      "PCS: competition within the process (user-level scheduling)",
      "SCS: competition system-wide (kernel-level scheduling)",
      "PCS: used in M:M and M:1 models",
      "SCS: used in 1:1 model",
      "PTHREAD_SCOPE_PROCESS = PCS. PTHREAD_SCOPE_SYSTEM = SCS.",
      "Linux and macOS: ONLY allow PTHREAD_SCOPE_SYSTEM",
      "Thread pool: pre-create fixed threads waiting for work → avoid creation overhead",
    ],
    formula: null,
    examTips: [
      "Linux/macOS: only PTHREAD_SCOPE_SYSTEM (SCS) allowed",
      "PCS = within process. SCS = across entire system.",
      "Thread pool: create N threads at startup, reuse them → avoids creation cost",
      "Async cancellation: dangerous (may leave mutex locked). Deferred: safe.",
    ],
    questions: [
      { q: "Why is asynchronous thread cancellation dangerous?", a: "The thread is terminated immediately, potentially while holding a mutex or in the middle of updating shared data, leaving resources locked and data in an inconsistent state. Deferred cancellation is safer — thread checks a flag and cancels only at safe points." },
      { q: "What is the advantage of a thread pool over creating new threads per request?", a: "Avoids the overhead of thread creation for every request. Pool threads are pre-created and reused. Also bounds the maximum number of concurrent threads, preventing resource exhaustion." },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  SYNCHRONIZATION
  // ─────────────────────────────────────────────────────────────

  "race-condition": {
    title: "Race Condition", emoji: "🏁",
    tldr: "Outcome depends on execution order. counter++ is 3 instructions — can interleave. Result: unexpected value.",
    explanation: `A RACE CONDITION occurs when multiple threads/processes access shared data concurrently AND the final result depends on the ORDER of execution.

WHY counter++ IS NOT ATOMIC:
  It looks like one operation but compiles to THREE machine instructions:
    1. LOAD:  register = counter     (read current value)
    2. ADD:   register = register + 1 (increment in CPU)
    3. STORE: counter = register     (write back to memory)
  Any context switch between these 3 steps causes a race!

CLASSIC RACE CONDITION:
  counter = 5 initially.
  Producer does counter++ and Consumer does counter-- simultaneously.
  Expected result: counter = 5 (they cancel out).
  But due to interleaving:

  Step | Thread    | Operation              | counter | reg1 | reg2
  S0   | Producer  | reg1 = counter         |    5    |  5   |  ?
  S1   | Producer  | reg1 = reg1 + 1        |    5    |  6   |  ?
  S2   | Consumer  | reg2 = counter         |    5    |  6   |  5   ← reads STALE value!
  S3   | Consumer  | reg2 = reg2 - 1        |    5    |  6   |  4
  S4   | Producer  | counter = reg1         |    6    |  6   |  4
  S5   | Consumer  | counter = reg2         |    4    |  6   |  4   ← WRONG! Expected 5

Result: counter=4 or counter=6, not 5. Non-deterministic!

OTHER EXAMPLES:
  • Two processes calling fork() simultaneously → same PID for two children
  • Bank: two threads deduct from same account → negative balance
  • Airline booking: two agents book the same last seat`,
    keyPoints: [
      "Race condition: outcome depends on thread/process execution order",
      "counter++ = 3 instructions: load, increment, store — can interleave",
      "Expected counter=5 after ++ and --, but can get 4 or 6",
      "Solution: critical section / mutual exclusion",
      "Non-atomic compound operations are vulnerable to races",
    ],
    formula: {
      code: `counter++ compiles to:
  LOAD   R1, counter    (R1 = counter)
  ADD    R1, R1, #1     (R1 = R1 + 1)
  STORE  counter, R1    (counter = R1)

Race scenario (counter=5, Producer does ++, Consumer does --):
  S0: Producer  R1 = counter    → R1 = 5
  S1: Producer  R1 = R1+1       → R1 = 6
  S2: Consumer  R2 = counter    → R2 = 5  ← STALE READ (before store)
  S3: Consumer  R2 = R2-1       → R2 = 4
  S4: Producer  counter = R1    → counter = 6
  S5: Consumer  counter = R2    → counter = 4  ← OVERWRITES!

Expected: counter = 5 (++ and -- cancel)
Actual:   counter = 4 (Consumer overwrote Producer's update)

Another interleaving gives counter=6:
  If Consumer completes fully before Producer stores: 6 is stored last.

The fix: make the 3-step sequence ATOMIC → use Critical Section`,
      explanation: "Interleaving makes one thread's read of 'counter' get an old/stale value.",
    },
    examTips: [
      "PYQ: Race condition explanation frequently appears",
      "counter++ is NOT atomic — it's 3 instructions (load, add, store)",
      "Race condition: multiple threads, shared mutable data, no synchronization",
      "Result is unpredictable and non-deterministic (depends on scheduling)",
      "Solution: make the 3-instruction sequence atomic → critical section",
    ],
    questions: [
      { q: "Why is counter++ not atomic even on modern hardware?", a: "It compiles to three separate machine instructions: LOAD (read from memory), ADD (increment in CPU register), STORE (write back to memory). Any thread switch between these three steps causes a race condition." },
      { q: "Can a race condition occur with only reads (no writes)?", a: "No. Race conditions require at least one WRITE to shared data. If all accesses are read-only, the data never changes, so order doesn't matter and the result is always consistent." },
    ],
  },

  "critical-section": {
    title: "Critical Section Problem", emoji: "🚧",
    tldr: "3 requirements: Mutual Exclusion, Progress, Bounded Waiting. Structure: entry→CS→exit→remainder.",
    explanation: `A CRITICAL SECTION (CS) is a segment of code where a process accesses shared resources.
The CS problem: design a protocol ensuring only ONE process is in its CS at any time.

PROCESS STRUCTURE:
  do {
    [ENTRY SECTION]   ← request permission to enter
    [CRITICAL SECTION] ← shared resource access
    [EXIT SECTION]    ← signal departure
    [REMAINDER SECTION] ← rest of code (non-shared)
  } while (true);

3 REQUIREMENTS (ALL must be satisfied — think MBP):

1. MUTUAL EXCLUSION (the basic rule):
   If Pi is in its CS → NO other Pj can be in ITS CS.
   Like a bathroom lock — only one person inside at a time.

2. PROGRESS (no deadlock among candidates):
   If NO process is in CS and SOME want to enter → selection CANNOT be delayed indefinitely.
   Only processes NOT in their remainder section can participate in this decision.
   "If the bathroom is empty and people are waiting, one of them MUST be allowed in."

3. BOUNDED WAITING (no starvation):
   After a process requests entry, there's a FINITE BOUND on how many times OTHERS can enter before this process gets in.
   "You can't be skipped forever. Maximum K others can enter before you."

KERNEL CS HANDLING:
  Preemptive kernel: allows preemption even in kernel mode → better responsiveness, suitable for real-time.
  Non-preemptive kernel: runs until process exits kernel mode → simpler, no kernel race conditions.`,
    keyPoints: [
      "Critical section: code accessing shared resources (only 1 process at a time)",
      "Structure: entry section → critical section → exit section → remainder",
      "Requirement 1: Mutual Exclusion — only 1 in CS at a time",
      "Requirement 2: Progress — selection can't be postponed indefinitely",
      "Requirement 3: Bounded Waiting — bounded delay before entry guaranteed",
      "Preemptive kernel: can preempt during kernel mode (better responsiveness)",
      "Non-preemptive kernel: no preemption in kernel mode → safer, less responsive",
    ],
    formula: {
      code: `General process structure:
  do {
    [entry section]      ← acquire lock / request permission
    [critical section]   ← ONLY ONE PROCESS HERE AT A TIME
    [exit section]       ← release lock / signal departure
    [remainder section]  ← everything else (no shared access)
  } while (true);

3 Requirements (MBP — Mutual exclusion, Bounded waiting, Progress):

1. Mutual Exclusion:
   Pi in CS → Pj NOT in CS (for all j ≠ i)

2. Progress:
   No process in CS + some want in → must pick one
   CANNOT delay forever
   Only processes NOT in remainder can decide

3. Bounded Waiting:
   After Pi requests → at most K other processes enter CS
   before Pi is granted entry (K is some finite number)

NOTE: Bounded Waiting prevents STARVATION.
      Progress prevents DEADLOCK.`,
      explanation: "All 3 requirements must hold simultaneously for a correct CS solution.",
    },
    examTips: [
      "PYQ: 'What are the conditions for critical section?' — appears in ALMOST EVERY PAPER (July 2023, Dec 2023, May 2024, Dec 2024)",
      "3 requirements: Mutual Exclusion, Progress, Bounded Waiting — know all 3",
      "Progress ≠ no deadlock. Bounded Waiting ≠ no starvation. Related but distinct.",
      "Preemptive kernel = real-time suitable. Non-preemptive = simpler, safer.",
    ],
    questions: [
      { q: "What is the Bounded Waiting requirement?", a: "After a process requests to enter its critical section, there's a limit (bound) on how many times other processes can enter their critical sections before the requesting process is granted entry. Prevents indefinite postponement (starvation)." },
      { q: "What is the difference between Progress and Bounded Waiting?", a: "Progress: ensures that if no process is in CS and some want to enter, a decision is made without indefinite delay (prevents deadlock among candidates). Bounded Waiting: ensures each waiting process eventually gets in (prevents starvation of individual processes)." },
    ],
  },

  "petersons": {
    title: "Peterson's Solution", emoji: "📐",
    tldr: "Software solution for 2 processes. Uses: int turn + bool flag[2]. flag[i]=true means Pi wants to enter.",
    explanation: `Peterson's solution is a SOFTWARE-ONLY solution to the 2-process critical section problem. No special hardware needed — just two shared variables.

TWO SHARED VARIABLES:
  int turn;           → whose TURN to enter (0 or 1)
  bool flag[2];       → flag[i]=true means "Pi WANTS to enter"

ENTRY PROTOCOL for Pi (where j = 1-i):
  flag[i] = true;              // "I want to enter"
  turn = j;                    // "But you can go first (I'm being polite)"
  while (flag[j] && turn == j) // spin until: Pj doesn't want in, OR it's my turn
    ; // busy wait

EXIT: flag[i] = false;         // "I'm done, others can enter now"

WHY Pi sets turn=j (NOT turn=i):
  By setting turn=j, Pi says "if we BOTH want in at the same time, YOU go first."
  If BOTH Pi and Pj set turn simultaneously:
    Pi sets turn=j, then Pj sets turn=i (overwrites Pi's setting).
    turn ends up as i (the last writer). That means Pj gave way → Pi enters first.
    The LAST one to set turn LOSES (gives the other process priority).
    This prevents deadlock — exactly one of them will be able to enter.

Pi ENTERS CS when either:
  flag[j] == false (Pj doesn't want to enter), OR
  turn == i (it's Pi's turn, not Pj's)

PROVES all 3 requirements:
  Mutual Exclusion: turn can only be i OR j, not both → only one enters
  Progress: if Pj is not interested (flag[j]=false), Pi enters immediately
  Bounded Waiting: after Pi requests, Pj can enter at most once before Pi's turn

MODERN LIMITATION: Assumes atomic load/store. Modern CPUs reorder instructions → may fail without memory barriers (mfence, etc.).`,
    keyPoints: [
      "2-process software solution to critical section",
      "Shared vars: int turn + bool flag[2]",
      "flag[i] = true: Pi wants to enter CS",
      "turn: whose turn it is (setting turn=j means 'you go first')",
      "Entry: flag[i]=true; turn=j; while(flag[j] && turn==j) spin;",
      "Last writer to turn LOSES (gives way) → prevents deadlock",
      "Modern CPUs may reorder instructions → may not work without memory barriers",
    ],
    formula: {
      code: `Shared: int turn;  bool flag[2] = {false, false};

Process Pi (j = 1 - i):
  do {
    flag[i] = true;           // "I want to enter"
    turn = j;                 // "But you go first"
    while (flag[j] && turn == j)
      ; // busy wait: "wait while Pj wants in AND it's Pj's turn"
    
    // === CRITICAL SECTION ===
    
    flag[i] = false;          // "I'm leaving"
    // remainder section
  } while (true);

Process Pj (i = 1 - j): [same structure with i and j swapped]

Why it avoids deadlock:
  If BOTH want in simultaneously:
    Pi sets turn=j, then Pj sets turn=i
    turn = i (last write wins — Pj gave way)
    Pi's while: flag[j]=true but turn=i (≠j) → Pi EXITS loop → Pi enters!
    Pj's while: flag[i]=true AND turn=i → Pj STAYS in loop → waits

Key: "turn=j" = "I'll let you go first"
     Last to write turn = first to give way = other gets in`,
      explanation: "Setting turn=j means 'if we both want in, YOU go first.' Last writer to turn loses (gives way).",
    },
    examTips: [
      "PYQ: 'What is Peterson's solution?' — July 2023, Dec 2023, May 2024, Dec 2024 — know code for BOTH processes",
      "Pi sets turn=j (other process), not turn=i (self)",
      "Wait condition: while(flag[j] AND turn==j) — both conditions must hold",
      "Pi enters when: flag[j]=false OR turn=i (either condition breaks the while loop)",
      "Modern CPUs may violate Peterson's due to instruction reordering",
    ],
    questions: [
      { q: "In Peterson's solution for Pi, why does Pi set turn=j instead of turn=i?", a: "By setting turn=j, Pi says 'I'll give the other process a chance to go first.' If Pj also wants in, it sets turn=i, overwriting Pi's setting. turn ends up as i — meaning Pj gave way last, so Pi enters first. The last to write turn gives up priority." },
      { q: "Prove Mutual Exclusion in Peterson's solution.", a: "Pi is in CS only when: flag[j]=false OR turn=i. Pj is in CS only when: flag[i]=false OR turn=j. For BOTH to be in CS simultaneously: turn must equal BOTH i and j. Impossible — turn is a single integer. Contradiction. So only one can be in CS." },
    ],
  },

  "hw-sync": {
    title: "Hardware Synchronization", emoji: "💻",
    tldr: "Atomic instructions: test_and_set (returns old, sets true) and compare_and_swap (swap if equal). Spinlocks.",
    explanation: `Software solutions (Peterson's) are fragile on modern hardware due to instruction reordering. Modern CPUs provide special ATOMIC HARDWARE INSTRUCTIONS that cannot be interrupted.

TEST_AND_SET (TSL):
  Reads old value + sets to TRUE in ONE uninterruptible step.
  ANALOGY: Grabbing a "BUSY" sign — in one motion you pick it up (read "available") AND put up the sign ("true"). No one can interrupt in between.

  Returns: old value (was it available?)
  Sets: always sets target to TRUE

COMPARE_AND_SWAP (CAS):
  Only sets if current value EQUALS expected. Returns old value.
  ANALOGY: Changing a price tag only if the current price is what you expected (no one changed it between your read and your write).

  Returns: old value
  Sets: only if old == expected

SPINLOCK: both TSL and CAS are used to implement spinlocks.
  Thread "spins" in a loop testing the lock until it becomes free.
  
  SPINLOCK ADVANTAGE:
    No context switch needed when waiting.
    Context switches are expensive (~microseconds).
    If the lock is held for only nanoseconds, spinning is faster than switching!
    Best for: short critical sections on multi-core systems (one core spins while another holds the lock).

  SPINLOCK DISADVANTAGE:
    Wastes CPU cycles while spinning.
    Bad for long critical sections or single-core systems.

TSL alone doesn't satisfy Bounded Waiting — need a waiting[] array addition.`,
    keyPoints: [
      "test_and_set: reads old value + sets to TRUE atomically",
      "compare_and_swap: if *val==expected → set to new_val, return old (atomic)",
      "Spinlock: busy wait in loop — wastes CPU but avoids context switch",
      "Spinlock good for: short critical sections on multicore systems",
      "TSL doesn't satisfy bounded waiting alone (need waiting[] array)",
      "CAS is the basis of lock-free data structures",
    ],
    formula: {
      code: `test_and_set (atomic — cannot be interrupted):
  bool test_and_set(bool *target) {
    bool rv = *target;   // save old value
    *target = true;      // ALWAYS set to true
    return rv;           // return OLD value
  }

Spinlock with TSL:
  bool lock = false;  // shared lock (false=free, true=held)
  do {
    while (test_and_set(&lock)) ;  // spin until TAS returns false (was free)
    // CRITICAL SECTION
    lock = false;                  // release
    // remainder
  } while (true);

compare_and_swap (atomic):
  int compare_and_swap(int *val, int expected, int new_val) {
    int temp = *val;
    if (*val == expected)   // only swap if unchanged
      *val = new_val;
    return temp;            // return OLD value
  }

Spinlock with CAS:
  int lock = 0;  // 0=free, 1=held
  while (compare_and_swap(&lock, 0, 1) != 0) ; // spin
  // CRITICAL SECTION
  lock = 0;

Key difference:
  TSL: always sets TRUE, returns old
  CAS: conditionally swaps, returns old`,
      explanation: "TSL always sets TRUE. CAS conditionally swaps. Both atomic — no interruption possible.",
    },
    examTips: [
      "PYQ: 'Name two hardware instructions and write their code' — July 2023",
      "TSL: always sets to TRUE, returns OLD value",
      "CAS: sets new_val only if current==expected, returns old",
      "Both: executed ATOMICALLY (indivisible, cannot be interrupted)",
      "Spinlock advantage: no context switch (fast for short critical sections)",
    ],
    questions: [
      { q: "lock=false. Thread A calls test_and_set(&lock). What is returned and what is lock after?", a: "Returns false (old value). lock is now set to true. Thread A successfully acquires the lock (because it got false = lock was free)." },
      { q: "lock=1. Thread calls compare_and_swap(&lock, 0, 1). What happens?", a: "CAS checks: *lock(1) == expected(0)? NO → no swap. Returns 1 (old value). Since 1 ≠ 0, the while condition is true → thread keeps spinning. Lock stays held by someone else." },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  LOCKS & MUTEX
  // ─────────────────────────────────────────────────────────────

  "tsl-cas": {
    title: "Mutex Locks Implementation", emoji: "🔐",
    tldr: "Mutex = simplest OS tool for CS. acquire()/release() using atomic ops. Spinlock = busy-wait mutex.",
    explanation: `Mutex (MUTual EXclusion) lock: the programmer-friendly tool built on top of TSL/CAS.
Instead of writing TSL code everywhere, you call acquire() and release().

BOOLEAN variable: available
  available = true  → lock is FREE
  available = false → lock is HELD

acquire():
  Busy-wait (spin) until available is true.
  Atomically set available to false.
  (Implementation uses TSL/CAS internally)

release():
  Set available to true.
  (Wakes up any threads waiting for the lock)

Both MUST be atomic — OS implements them with hardware TSL/CAS.

SPINLOCK vs BLOCKING MUTEX:
  Spinlock: thread burns CPU cycles checking the lock ("busy wait")
    PRO: No context switch overhead (saves ~1000-100000 cycles)
    CON: Wastes CPU while spinning
    USE: Short critical sections, multi-core systems
    
  Blocking mutex (e.g., pthread_mutex): thread goes to sleep
    PRO: CPU free for other work while waiting
    CON: Context switch overhead
    USE: Long critical sections, single-core systems

RULE OF THUMB: if the critical section executes in less time than a context switch,
use a spinlock. Otherwise, use a blocking mutex.

Pthreads:
  pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
  pthread_mutex_lock(&lock);    // acquire
  pthread_mutex_unlock(&lock);  // release`,
    keyPoints: [
      "Mutex = boolean: true=free, false=held",
      "acquire(): busy-wait until free, then mark busy",
      "release(): mark free",
      "Both must be atomic (use hardware TSL/CAS internally)",
      "Spinlock = mutex with busy waiting",
      "Spinlock advantage: no context switch (saves time when lock held briefly)",
    ],
    formula: {
      code: `Mutex implementation:
  bool available = true;  // true=free, false=held

  acquire() {
    while (!available)
      ; // busy wait (spinlock!)
    available = false;   // mark as held
  }
  
  release() {
    available = true;    // mark as free
  }

Pthread Mutex (real-world):
  pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
  // OR: pthread_mutex_init(&lock, NULL);
  
  pthread_mutex_lock(&lock);     // acquire
    counter++;                   // critical section
  pthread_mutex_unlock(&lock);   // release

When to use spinlock vs blocking mutex:
  CS duration < context switch time → SPINLOCK (spin is cheaper)
  CS duration > context switch time → BLOCKING MUTEX (sleep is cheaper)
  Single core system → BLOCKING MUTEX (spinning wastes the only core)
  Multi-core, short CS → SPINLOCK (one core spins while other holds)`,
      explanation: "acquire() blocks until available. release() wakes waiting threads.",
    },
    examTips: [
      "PYQ: 'What are the advantages of spin locks?' — July 2023",
      "PYQ: 'Explain Critical Section solution using Mutex locks' — May 2024",
      "Mutex = MUTual EXclusion. Boolean: true=available, false=locked.",
      "Spinlock wastes CPU but avoids context switch overhead",
      "Context switch is expensive — spinlock better when CS is very short",
    ],
    questions: [
      { q: "When is a spinlock preferable to a blocking mutex?", a: "When the critical section is very short (less than the time of a context switch). On multicore, one CPU spins while another CPU holds and quickly releases the lock. Spinning for nanoseconds beats doing a full context switch (microseconds)." },
      { q: "PYQ: What are the advantages of spinlocks?", a: "1. No context switch required when waiting — saves significant time. 2. Context switch may take considerable time (thousands of cycles). 3. When locks are held for short durations, spinning is faster than sleeping. 4. On multicore: one processor spins while another holds the lock and quickly releases it." },
    ],
  },

  "semaphore": {
    title: "Semaphores", emoji: "🚦",
    tldr: "Integer variable. wait()=P=decrement. signal()=V=increment. Binary=mutex. Counting=resource pool.",
    explanation: `A SEMAPHORE is more powerful than a mutex — it's a counting tool, not just a binary lock.

ANALOGY: Restaurant token system.
  Binary semaphore: a toilet with one key (mutex — 0 or 1).
  Counting semaphore: a restaurant with 5 tables. Token counter = 5.
    Customer arrives: takes a token (wait → 5→4→3→2→1→0)
    Customer leaves: returns token (signal → 0→1→2→3→4→5)
    When counter=0 and a new customer arrives → they wait outside.

Two operations (BOTH ATOMIC):
  wait(S)   = P = down = decrement:
    if S > 0: S-- then proceed
    if S = 0: block (sleep)
  
  signal(S) = V = up = increment:
    S++
    if any process is sleeping: wake one up

BINARY SEMAPHORE (0 or 1): same as mutex lock.
  Initialize to 1: first wait() succeeds, subsequent ones block.
  
COUNTING SEMAPHORE (0..N): controls access to N resource instances.
  Initialize to N: up to N processes can hold the resource simultaneously.
  When 0, no more can enter.

PRIORITY INVERSION:
  A scheduling problem. Low-priority process L holds a lock needed by high-priority H.
  Medium-priority M preempts L (because M > L). M runs a long time.
  H can't run because it's waiting for L to release the lock.
  But L can't run because M is preempting it. M indirectly blocks H!
  
  FIX: Priority Inheritance Protocol — L temporarily inherits H's priority
  so no medium-priority process can preempt it, allowing L to finish quickly.`,
    keyPoints: [
      "Integer variable accessed ONLY via wait() and signal()",
      "wait(S): S>0 → S-- → proceed. S=0 → block.",
      "signal(S): S++ → wake any waiting process",
      "wait = P = down = decrement. signal = V = up = increment.",
      "Binary semaphore (0/1): same as mutex",
      "Counting semaphore (0..n): controls access to n resource instances",
      "Initialize to n: n concurrent accesses allowed",
      "Deadlock possible: wait(S);wait(Q) vs wait(Q);wait(S) simultaneously",
    ],
    formula: {
      code: `wait(S) {           // P / down / decrement
  while (S <= 0)
    ; // busy wait
  S--;
}

signal(S) {         // V / up / increment
  S++;
}

Binary semaphore = mutex:
  semaphore mutex = 1;  // init to 1 (not 0!)

  wait(mutex);          // acquire (1→0)
    // critical section
  signal(mutex);        // release (0→1)

Counting semaphore (5 printers available):
  semaphore printers = 5;

  wait(printers);    // take a printer (5→4→3→2→1→0)
    // use printer
  signal(printers);  // return printer (0→1→2→3→4→5)
  // 6th process calling wait() when printers=0 → BLOCKS

Deadlock with semaphores (DON'T do this):
  P0: wait(S); wait(Q);   |  P1: wait(Q); wait(S);
  P0 holds S, P1 holds Q, both waiting → DEADLOCK`,
      explanation: "Counting semaphore init value = number of concurrent accesses allowed.",
    },
    examTips: [
      "PYQ: 'Write wait() and signal() implementation' — July 2023",
      "PYQ: 'What is a counting semaphore?' — July 2023",
      "wait()=P=down=decrement. signal()=V=up=increment — know ALL names.",
      "Binary semaphore initialized to 1 (not 0!). Counting: initialized to N.",
      "Starvation: process may NEVER be removed from semaphore queue",
      "Priority Inversion: low-priority holds lock needed by high-priority → fix with priority inheritance",
    ],
    questions: [
      { q: "What is Priority Inversion?", a: "A scheduling problem where a low-priority process L holds a lock needed by high-priority H. A medium-priority process M preempts L (M > L in priority), preventing L from releasing the lock, which indirectly blocks H. Solved by Priority Inheritance Protocol — L temporarily runs at H's priority." },
      { q: "Semaphore initialized to 3. How many processes can be in the critical section?", a: "3 processes simultaneously. Each wait() decrements: 3→2→1→0. The 4th process that calls wait() when S=0 will block." },
    ],
  },

  "semaphore-impl": {
    title: "Semaphore without Busy Waiting", emoji: "💤",
    tldr: "Block instead of spin. Semaphore has value + waiting list. wait: decrement → if<0 block(). signal: increment → if≤0 wakeup().",
    explanation: `The basic semaphore (busy-wait) wastes CPU cycles by spinning. A better implementation BLOCKS the thread instead.

STRUCTURE: each semaphore has two parts:
  int value      → the counter (can go NEGATIVE!)
  list<process*> → queue of blocked processes

MODIFIED wait(S):
  Decrement FIRST, then check.
  If value < 0 after decrementing: add to waiting list, block().
  "Subtract first, then decide if you should wait."

MODIFIED signal(S):
  Increment FIRST, then check.
  If value ≤ 0 after incrementing (there are waiters): remove one from list, wakeup().
  "Add back first, then wake someone up."

WHAT NEGATIVE VALUE MEANS:
  S = -3 → 3 processes are currently blocked waiting on this semaphore.
  |S| = number of blocked processes when S < 0.
  This is elegant: the value tells you both resource count AND waiter count!

ANALOGY: Restaurant with counter display:
  "+5" means 5 tables free.
  "0" means no tables, but nobody waiting (you're about to be the first to wait).
  "-3" means 3 groups are waiting outside.

block(): OS operation that suspends the calling process (moves to waiting state).
wakeup(P): OS operation that moves process P from waiting to ready queue.

NOTE: wait() and signal() THEMSELVES must be protected from race conditions!
  On uniprocessors: disable interrupts during wait/signal.
  On multiprocessors: use TSL/CAS spinlock around the critical part of wait/signal.`,
    keyPoints: [
      "No busy waiting — process blocks (sleeps) instead of spinning",
      "Semaphore struct: int value + process *list (waiting queue)",
      "wait(): value-- → if value < 0: add to list, block()",
      "signal(): value++ → if value <= 0: remove from list, wakeup()",
      "Negative value = number of blocked processes",
      "block() = OS operation to suspend process",
      "wakeup(P) = OS operation to move P to ready queue",
    ],
    formula: {
      code: `struct semaphore {
  int value;            // can be negative!
  struct process *list; // waiting queue
};

wait(semaphore *S) {
  S->value--;             // decrement FIRST
  if (S->value < 0) {     // if negative: too many waiting
    add this process to S->list;
    block();              // sleep
  }
  // if value >= 0: resource was available, proceed
}

signal(semaphore *S) {
  S->value++;             // increment FIRST
  if (S->value <= 0) {    // if still ≤ 0: someone was waiting
    remove process P from S->list;
    wakeup(P);            // wake one sleeper
  }
}

Value interpretation:
  S = +3 → 3 resources available, 0 processes waiting
  S =  0 → no resources available, 0 processes waiting
  S = -3 → 0 resources available, 3 processes BLOCKED

Example timeline (init S=2, 4 processes arrive):
  P1 calls wait: S=2→1, S≥0, P1 proceeds ✓
  P2 calls wait: S=1→0, S≥0, P2 proceeds ✓
  P3 calls wait: S=0→-1, S<0, P3 BLOCKS
  P4 calls wait: S=-1→-2, S<0, P4 BLOCKS
  P1 calls signal: S=-2→-1, S≤0, wakeup P3 → P3 proceeds
  P2 calls signal: S=-1→0, S≤0, wakeup P4 → P4 proceeds`,
      explanation: "Negative semaphore value = number of processes sleeping on this semaphore.",
    },
    examTips: [
      "PYQ: 'Explain Critical Section solution using Semaphores with no busy waiting' — May 2023",
      "Negative value = |value| processes are blocked/waiting",
      "signal() wakes ONE process (not all)",
      "block() and wakeup() are OS primitives, not busy-wait",
    ],
    questions: [
      { q: "Semaphore value is -3. How many processes are waiting?", a: "3 processes. Negative value means |value| processes are blocked on the semaphore's waiting list." },
      { q: "Why must wait() and signal() themselves be atomic?", a: "They modify the semaphore value and list — shared data accessed by multiple threads. A race condition within wait() itself (e.g., between the check and the block) could cause two processes to both think the resource is available, violating mutual exclusion." },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  CLASSIC PROBLEMS
  // ─────────────────────────────────────────────────────────────

  "bounded-buffer-sem": {
    title: "Classic: Bounded Buffer Problem", emoji: "📦",
    tldr: "3 semaphores: mutex=1 (exclusive access), full=0 (count full), empty=n (count empty).",
    explanation: `The bounded buffer problem PROPERLY solved with semaphores (fixes the race condition in the naive version).

THREE SEMAPHORES:
  mutex = 1  → Binary semaphore for mutual exclusion on buffer operations
  full  = 0  → Counting semaphore: number of FULL slots (consumer waits when 0)
  empty = n  → Counting semaphore: number of EMPTY slots (producer waits when 0)

PRODUCER does: wait(empty) → wait(mutex) → add item → signal(mutex) → signal(full)
CONSUMER does: wait(full)  → wait(mutex) → remove item → signal(mutex) → signal(empty)

CRITICAL ORDER: wait(mutex) MUST come AFTER wait(empty)/wait(full)!

WHY ORDER MATTERS (deadlock scenario if wrong):
  Suppose producer does wait(mutex) FIRST, then wait(empty).
  Buffer is FULL (empty=0).
  Producer holds mutex and blocks on wait(empty).
  Consumer needs mutex to remove an item (to signal empty).
  Consumer blocks on wait(mutex).
  DEADLOCK: Producer holds mutex, waiting for empty. Consumer waiting for mutex.
  Neither can proceed!

MEMORY TRICK:
  Think of it as "check availability BEFORE grabbing the lock."
  Like checking if a restaurant has tables BEFORE going to the host stand.
  Don't grab the host's attention (mutex) if there's no table anyway.`,
    keyPoints: [
      "mutex=1: mutual exclusion on buffer operations",
      "full=0: counts full slots (consumer waits when 0)",
      "empty=n: counts empty slots (producer waits when 0)",
      "Producer: wait(empty) → wait(mutex) → add → signal(mutex) → signal(full)",
      "Consumer: wait(full) → wait(mutex) → remove → signal(mutex) → signal(empty)",
      "ORDER MATTERS: wait(mutex) always INSIDE wait(empty/full) — NOT before!",
    ],
    formula: {
      code: `Initialization:
  semaphore mutex = 1;   // mutual exclusion (binary)
  semaphore full  = 0;   // # full buffer slots
  semaphore empty = n;   // # empty buffer slots

Producer:
  do {
    /* produce item next_produced */
    wait(empty);     // wait for an empty slot
    wait(mutex);     // lock the buffer
    /* add next_produced to buffer */
    signal(mutex);   // unlock the buffer
    signal(full);    // one more full slot
  } while (true);

Consumer:
  do {
    wait(full);      // wait for a full slot
    wait(mutex);     // lock the buffer
    /* remove item to next_consumed */
    signal(mutex);   // unlock the buffer
    signal(empty);   // one more empty slot
    /* consume item */
  } while (true);

❌ WRONG (deadlock risk):
  wait(mutex);
  wait(empty);    // buffer full, blocks HERE while holding mutex!
  // Consumer can't get mutex to free a slot → DEADLOCK

✅ CORRECT:
  wait(empty);    // check availability FIRST
  wait(mutex);    // THEN lock`,
      explanation: "wait(mutex) must come AFTER wait(empty/full) to avoid deadlock.",
    },
    examTips: [
      "PYQ: 'Explain the Bounded-Buffer Problem' — Dec 2024, Dec 2023",
      "PYQ: 'Write the algorithm for producer consumer problem' — Dec 2023",
      "3 semaphores: mutex(1), full(0), empty(n) — memorize init values",
      "Producer: wait(empty) THEN wait(mutex). Consumer: wait(full) THEN wait(mutex).",
      "NEVER: wait(mutex) before wait(empty/full) — deadlock!",
      "signal(mutex) always comes BEFORE signal(full/empty)",
    ],
    questions: [
      { q: "Why must wait(mutex) come AFTER wait(empty) in the producer?", a: "If producer does wait(mutex) first and then blocks on wait(empty) (buffer full), it holds the mutex while sleeping. A consumer can never acquire mutex to free a slot, so empty stays at 0 forever → deadlock." },
      { q: "What are the initial values of the three semaphores and why?", a: "mutex=1: starts free (no one is in CS yet). full=0: no full slots initially (empty buffer). empty=n: all n slots are empty initially. The values track the actual state of the buffer." },
    ],
  },

  "readers-writers": {
    title: "Classic: Readers-Writers Problem", emoji: "📖",
    tldr: "Multiple readers OK simultaneously. Writer = exclusive. rw_mutex + mutex + read_count. First reader locks writer out, last unlocks.",
    explanation: `SCENARIO: A shared database.
  Readers: can read simultaneously (reads don't conflict with each other).
  Writers: need EXCLUSIVE access (no readers OR writers during write).

THREE SHARED VARIABLES:
  semaphore rw_mutex = 1  → controls writer access (acts as the write lock)
  semaphore mutex = 1     → protects read_count (meta-lock)
  int read_count = 0      → number of currently ACTIVE readers

WRITER: simple — just wait(rw_mutex) → write → signal(rw_mutex).

READER LOGIC (the clever part):
  First reader: must acquire rw_mutex (to lock out writers).
  Last reader: must release rw_mutex (to allow writers).
  Middle readers: don't touch rw_mutex at all (just increment/decrement count).

  wait(mutex);         // protect read_count
  read_count++;
  if (read_count == 1) // FIRST reader?
    wait(rw_mutex);    // lock out writers
  signal(mutex);
  /* READ DATA */
  wait(mutex);
  read_count--;
  if (read_count == 0) // LAST reader?
    signal(rw_mutex);  // allow writers
  signal(mutex);

TWO VARIATIONS:
  1st: Readers priority — no reader waits unless writer ALREADY writing. Risk: writer STARVATION.
  2nd: Writers priority — once writer ready, writers get preference. Risk: reader STARVATION.

LINUX: rwlock_t biased toward readers (writer starvation possible).
Linux 3.16: replaced with Queued RW lock (fair for both).
RCU (Read-Copy-Update): readers NEVER block, writers make a copy then swap pointer.`,
    keyPoints: [
      "Multiple readers simultaneously OK. Writer = exclusive.",
      "rw_mutex=1: reader/writer mutual exclusion",
      "mutex=1: protects read_count",
      "read_count: number of active readers",
      "First reader: wait(rw_mutex) → blocks writers",
      "Last reader: signal(rw_mutex) → lets writers in",
      "Writer starvation in variation 1 (readers have priority)",
    ],
    formula: {
      code: `Initialization:
  semaphore rw_mutex = 1;  // write lock
  semaphore mutex   = 1;   // protects read_count
  int read_count    = 0;   // # active readers

Writer: (simple — just lock/unlock write lock)
  do {
    wait(rw_mutex);
      /* writing */
    signal(rw_mutex);
  } while (true);

Reader: (first/last reader logic)
  do {
    wait(mutex);           // protect read_count
    read_count++;
    if (read_count == 1)   // FIRST reader
      wait(rw_mutex);      // block writers
    signal(mutex);
    
      /* reading */
    
    wait(mutex);
    read_count--;
    if (read_count == 0)   // LAST reader
      signal(rw_mutex);    // allow writers
    signal(mutex);
  } while (true);

Readers: R1 enters (count=1, locks rw_mutex)
         R2 enters (count=2, doesn't touch rw_mutex)
         R3 enters (count=3)
Writer: blocks on wait(rw_mutex) — waiting
         R3 exits (count=2)
         R2 exits (count=1)
         R1 exits (count=0, signals rw_mutex) — Writer UNBLOCKS`,
      explanation: "First reader acquires rw_mutex. Last reader releases it. All others just increment/decrement count.",
    },
    examTips: [
      "PYQ: 'Discuss the trade-off between fairness and throughput in readers-writers' — Dec 2023",
      "First reader: wait(rw_mutex). Last reader: signal(rw_mutex). Others: neither.",
      "read_count protected by its own mutex (meta-level mutual exclusion)",
      "1st variation: writer starvation. 2nd variation: reader starvation.",
      "Linux kernel: rwlock_t biased toward readers → writer starvation problem",
    ],
    questions: [
      { q: "Why does only the FIRST reader call wait(rw_mutex)?", a: "rw_mutex blocks writers. Once the first reader acquires it, all subsequent readers can read freely without re-acquiring it. Only the last reader needs to release it (when read_count drops to 0) to let a writer in." },
      { q: "PYQ: Discuss the trade-off in Readers-Writers.", a: "1st variation (readers priority): readers never wait unless a writer is already writing. High read throughput but writers may starve if readers arrive continuously. 2nd variation (writers priority): once a writer is ready, new readers wait. Fair to writers but readers may starve. RCU (Linux): zero reader overhead (readers never block), but write overhead (copy + swap pointer)." },
    ],
  },

  "dining-philosophers": {
    title: "Classic: Dining Philosophers", emoji: "🍜",
    tldr: "5 philosophers, 5 chopsticks. Naive: all grab left → deadlock. 3 solutions: max 4, both-or-none, asymmetric.",
    explanation: `SETUP: 5 philosophers sit at a round table. Between each pair is ONE chopstick. Eating requires BOTH adjacent chopsticks. They alternate thinking and eating.

SHARED DATA: semaphore chopstick[5] = {1,1,1,1,1}
  (each chopstick is either available or held)

NAIVE SOLUTION:
  Philosopher i: wait(chopstick[i]) → wait(chopstick[(i+1)%5]) → eat → signal both

DEADLOCK SCENARIO:
  ALL 5 philosophers decide to eat simultaneously.
  P0 picks up chopstick[0] (left).
  P1 picks up chopstick[1] (left).
  P2 picks up chopstick[2] (left).
  P3 picks up chopstick[3] (left).
  P4 picks up chopstick[4] (left).
  Now EVERYONE is waiting for their RIGHT chopstick.
  P0 wants [1] (P1 has it). P1 wants [2] (P2 has it). ... P4 wants [0] (P0 has it).
  CIRCULAR WAIT → DEADLOCK.

THREE DEADLOCK SOLUTIONS:

Solution 1: MAX 4 AT TABLE (allow at most 4 philosophers sitting simultaneously)
  At least one philosopher always gets both chopsticks.
  Implemented with a counting semaphore initialized to 4.

Solution 2: ATOMIC PICKUP (both chopsticks at once, in CS)
  wait(mutex); pick up both; signal(mutex);
  Eliminates partial allocation.

Solution 3: ASYMMETRIC (break circular wait)
  ODD philosophers:  pick LEFT first, then RIGHT
  EVEN philosophers: pick RIGHT first, then LEFT
  P4 (even) picks chopstick[(4+1)%5=0] FIRST → breaks the circular chain.

STARVATION NOTE: even with deadlock-free solutions, a philosopher could still starve
if their neighbors are always eating. Deadlock and starvation are SEPARATE problems.`,
    keyPoints: [
      "Shared: semaphore chopstick[5] initialized to 1 each",
      "Philosopher i: wait(chopstick[i]) → wait(chopstick[(i+1)%5]) → eat → signal both",
      "Deadlock: all pick up left simultaneously → circular wait",
      "Solution 1: max 4 philosophers at table simultaneously",
      "Solution 2: pick up BOTH chopsticks atomically (critical section)",
      "Solution 3: asymmetric (odd: left first; even: right first)",
      "Starvation: even with deadlock-free solution, a philosopher may starve",
    ],
    formula: {
      code: `Naive (DEADLOCKS if all pick up left simultaneously):
  Philosopher i:
  do {
    wait(chopstick[i]);            // pick up LEFT chopstick
    wait(chopstick[(i + 1) % 5]); // pick up RIGHT chopstick
    /* eat */
    signal(chopstick[i]);
    signal(chopstick[(i + 1) % 5]);
    /* think */
  } while (true);

Solution 1: semaphore table = 4;  (at most 4 sit simultaneously)
  do {
    wait(table);                    // must get a "seat"
    wait(chopstick[i]);
    wait(chopstick[(i + 1) % 5]);
    /* eat */
    signal(chopstick[(i + 1) % 5]);
    signal(chopstick[i]);
    signal(table);                  // free the "seat"
  } while (true);

Solution 3: Asymmetric
  Odd  i → pick LEFT  then RIGHT
  Even i → pick RIGHT then LEFT

  Why? P4 (even) picks chopstick[0] first (breaking the circle!)
  Before: P0→[0], P1→[1], P2→[2], P3→[3], P4→[4] → cycle
  After:  P4→[0] first → P0 can't get [0] → P0 must wait → cycle broken`,
      explanation: "Asymmetric: P4 (even) picks chopstick[(4+1)%5=0] first, breaking the cycle.",
    },
    examTips: [
      "PYQ: 'Explain the Dining-Philosophers Problem in detail' — Dec 2024",
      "Naive solution has DEADLOCK — all 5 pick up left simultaneously",
      "Asymmetric solution: odd picks LEFT first, even picks RIGHT first",
      "Max 4 rule: simplest fix — at least one philosopher always gets both",
      "Deadlock-free ≠ starvation-free (separate issues!)",
    ],
    questions: [
      { q: "Why does the naive Dining Philosophers solution deadlock?", a: "All 5 philosophers simultaneously pick up their left chopstick (chopstick[i]). All 5 then wait for their right chopstick (chopstick[(i+1)%5]), which is held by their neighbor. This creates a circular wait — one of the 4 deadlock conditions." },
      { q: "How does the asymmetric solution prevent deadlock?", a: "By having even-numbered philosophers pick up the RIGHT chopstick first (instead of left), the circular dependency is broken. P4 (even) tries to pick chopstick[0] first — the same chopstick P0 wants as its left. One of them must wait, breaking the circular chain." },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  DEADLOCKS
  // ─────────────────────────────────────────────────────────────

  "deadlock-intro": {
    title: "Deadlock — Introduction", emoji: "💀",
    tldr: "P holds R1, waits for R2. R2 held by Q, which waits for R1. Neither proceeds. Circular wait. Starvation ≠ Deadlock.",
    explanation: `DEADLOCK: a set of processes where EACH is waiting for a resource held by ANOTHER in the set. Nobody can proceed. Needs EXTERNAL intervention.

ANALOGY: Two cars on a one-lane bridge from opposite ends.
  Car A holds the north half, needs the south half (Car B has it).
  Car B holds the south half, needs the north half (Car A has it).
  Neither can move forward. Neither will back up voluntarily.
  Someone (external) must force one car to reverse.

Classic code deadlock:
  Thread A: x.acquire(); y.acquire(); // holds x, wants y
  Thread B: y.acquire(); x.acquire(); // holds y, wants x
  → A holds x waiting for y. B holds y waiting for x. DEADLOCK.

Resource lifecycle (every resource must follow this):
  1. REQUEST  → ask OS (wait if not available)
  2. USE      → use the resource
  3. RELEASE  → give back to OS

Resource types:
  Physical: CPU, memory, disk, printer, network adapter
  Logical: semaphore, mutex lock, file handle

DEADLOCK vs STARVATION:
  Starvation: a process waits a VERY LONG time but CAN eventually run.
    (e.g., lowest priority process in SJF — new short jobs always preempt it, but it will eventually get scheduled if the load decreases)
    CAN end on its own.
  
  Deadlock: circular wait — NO process can EVER proceed without external help.
    CANNOT end on its own.

  Deadlock → always starvation. But starvation → NOT necessarily deadlock.`,
    keyPoints: [
      "Deadlock: each process waiting for resource held by another in the set",
      "Cannot resolve on its own — needs external intervention",
      "Resources: physical (CPU, memory, printer) + logical (semaphores, files)",
      "Resource lifecycle: Request → Use → Release",
      "Starvation: can end on its own. Deadlock: cannot end without intervention.",
      "Deadlock → always starvation (but not vice versa)",
    ],
    formula: {
      code: `Classic deadlock:
  Thread A: x.acquire(); y.acquire();
  Thread B: y.acquire(); x.acquire();

  If A holds x AND B holds y:
    A waits for y (B has it)
    B waits for x (A has it)
    → DEADLOCK

3 processes, 3 tape drives (1 drive each):
  P0 holds 1, requests 1 more
  P1 holds 1, requests 1 more
  P2 holds 1, requests 1 more
  Available = 0. All blocked. → DEADLOCK.

Deadlock vs Starvation:
  East traffic never stops → west car waiting forever = STARVATION
    (could end if east traffic stops — no intervention required)
  Two cars nose-to-nose on bridge = DEADLOCK
    (cannot end without one backing up — external intervention required)

Non-deterministic: the Thread A/B code pattern SOMETIMES deadlocks.
It depends on scheduling — race to acquire both locks.`,
      explanation: "Deadlock: circular dependency where NO process can voluntarily break the cycle.",
    },
    examTips: [
      "Deadlock needs EXTERNAL intervention. Starvation CAN end on its own.",
      "Deadlock → always starvation. Starvation → NOT necessarily deadlock.",
      "Resource lifecycle: Request → Use → Release (3-step)",
      "Deadlock is non-deterministic: the same code may deadlock sometimes and not others",
    ],
    questions: [
      { q: "Can a deadlock occur if all resources are shareable (like read-only files)?", a: "No. Deadlock requires Mutual Exclusion — at least one resource must be non-shareable. Shareable resources don't block others, so no circular wait can form." },
      { q: "What is the key difference between starvation and deadlock?", a: "Starvation can end on its own (if scheduling changes, e.g., load decreases). Deadlock cannot end without external intervention (must terminate a process or preempt a resource). All deadlocks cause starvation, but not all starvation is deadlock." },
    ],
  },

  "deadlock-4conditions": {
    title: "Deadlock — 4 Necessary Conditions", emoji: "4️⃣",
    tldr: "ALL 4 must hold: Mutual Exclusion + Hold & Wait + No Preemption + Circular Wait. Remove any one → no deadlock.",
    explanation: `Deadlock can arise IF AND ONLY IF all 4 conditions hold simultaneously.
Think: MHNC (Mutual exclusion, Hold and wait, No preemption, Circular wait)

1. MUTUAL EXCLUSION:
   At least one resource is held in non-shareable mode.
   Only ONE process can use it at a time; others must wait.
   Example: a printer — two jobs can't print simultaneously.
   Counterexample: read-only files CAN be shared → they can't cause deadlock.

2. HOLD AND WAIT:
   A process holds at least ONE resource AND is waiting for MORE resources held by others.
   "Greedy resource holder — won't let go of what it has while asking for more."
   Example: Thread A holds mutex_x and is waiting for mutex_y.
   If threads released everything before requesting new resources → no HoldAndWait.

3. NO PREEMPTION:
   Resources CANNOT be forcibly taken away.
   A resource can only be released VOLUNTARILY by the holding process.
   Example: you can't forcibly take a mutex from a thread; it must release it itself.
   If OS could forcibly take resources: no deadlock (preempt to break the cycle).

4. CIRCULAR WAIT:
   There exists a SET of processes {P0, P1, ..., Pn} where:
   P0 is waiting for a resource held by P1,
   P1 is waiting for a resource held by P2,
   ...
   Pn is waiting for a resource held by P0.
   A circular chain of "I'm waiting for YOU."

IMPORTANT: ALL 4 must hold SIMULTANEOUSLY. If any ONE is absent → no deadlock.
Deadlock PREVENTION works by attacking one of these conditions.`,
    keyPoints: [
      "All 4 must hold simultaneously for deadlock to occur",
      "1. Mutual Exclusion: resource held in non-shareable mode",
      "2. Hold and Wait: holding ≥1 resource + waiting for more",
      "3. No Preemption: resources only released voluntarily",
      "4. Circular Wait: P0→P1→...→Pn→P0 (cyclic waiting chain)",
      "Deadlock prevention: eliminate at least ONE of these conditions",
    ],
    formula: {
      code: `4 Necessary Conditions (must ALL hold for deadlock):

1. MUTUAL EXCLUSION
   Resource R can be used by only ONE process at a time
   (read-only files → shareable → cannot cause deadlock)

2. HOLD AND WAIT
   Process holds ≥1 resource AND is waiting to acquire more
   Thread A: {holds mutex_x, waiting for mutex_y}

3. NO PREEMPTION
   Process P can only release resource voluntarily
   OS cannot forcibly take mutex from P
   (if it could, deadlock could be broken by preemption)

4. CIRCULAR WAIT (the most detectable condition)
   P0 → R1 (held by P1)
   P1 → R2 (held by P2)
   P2 → R0 (held by P0)  ← cycle! DEADLOCK

Removing each condition (prevention strategy):
  Remove Mutex Exclusion → make resources shareable (not always possible)
  Remove Hold & Wait     → release all before requesting new ones
  Add Preemption         → OS forcibly takes resources when needed
  Remove Circular Wait   → total ordering of resources (always request in order)`,
      explanation: "Deadlock prevention attacks one condition. Avoidance detects unsafe states dynamically.",
    },
    examTips: [
      "PYQ: 'What are the 4 necessary conditions for deadlock?' — Dec 2023 — MUST KNOW",
      "ALL 4 must hold simultaneously — missing even one = no deadlock",
      "Circular wait is the most targeted condition for prevention (resource ordering)",
      "Mutual exclusion can't always be eliminated (printers can't be shared mid-job)",
    ],
    questions: [
      { q: "What is the 'Hold and Wait' condition for deadlock?", a: "A process is holding at least one resource AND is waiting to acquire additional resources that are currently held by other processes." },
      { q: "Can deadlock occur with only 1 process?", a: "No. Deadlock requires a SET of processes in circular waiting. A single process can't be waiting for something it itself holds AND that it's waiting for simultaneously (unless it's waiting for itself, which OS prevents by failing the same-lock-acquire)." },
    ],
  },

  "rag": {
    title: "Resource Allocation Graph (RAG)", emoji: "📊",
    tldr: "Request edge: Pi→Rj. Assignment edge: Rj→Pi. Cycle + single instance = deadlock. Multiple instances = maybe deadlock.",
    explanation: `The RAG is a directed graph that precisely describes the resource allocation state.

NOTATION:
  Process nodes: circles ○ (P1, P2, P3...)
  Resource nodes: rectangles □ with dots inside (each dot = one instance)
  Request edge: Pi → Rj  (Pi is REQUESTING resource Rj)
  Assignment edge: Rj → Pi (Rj is ASSIGNED to Pi — Pi holds it)

DEADLOCK DETECTION RULES:
  No cycle in graph → NO deadlock (100% safe)
  Cycle exists + ALL resource types have EXACTLY 1 instance → DEADLOCK (100% certain)
  Cycle exists + SOME resource types have MULTIPLE instances → MAYBE deadlock

WHY does multiple instances change things?
  Example: R has 2 instances, both held by P1 and P2.
  P3 requests R (cycle formed). But when P1 finishes, it releases its instance of R.
  Now P3 can get R → P3 is NOT deadlocked!
  So cycle doesn't guarantee deadlock when there are multiple instances.

WAIT-FOR GRAPH (simplified RAG for single-instance resources):
  Derived from RAG by removing resource nodes and collapsing edges.
  If Pi→Rj and Rj→Pk in RAG, then Pi→Pk in wait-for graph.
  Meaning: "Pi is waiting for Pk to release a resource."
  Cycle in wait-for graph = DEADLOCK.
  Cycle detection: O(n²) algorithm.`,
    keyPoints: [
      "Request edge: Pi→Rj (process requests resource)",
      "Assignment edge: Rj→Pi (resource assigned to process)",
      "No cycle → NO deadlock (guaranteed)",
      "Cycle + single instance per resource → DEADLOCK (certain)",
      "Cycle + multiple instances → MIGHT be deadlock (uncertain)",
      "Wait-for graph: remove resource nodes, collapse edges",
      "Wait-for graph cycle → deadlock (only for single instance)",
    ],
    formula: {
      code: `RAG Notation:
  ○ = Process node
  □ = Resource node (dots inside = instances)
  Pi ──→ Rj  = Request edge (Pi wants Rj)
  Rj ──→ Pi  = Assignment edge (Rj held by Pi)

Example 1: Cycle → DEADLOCK (single instance):
  P1 → R1 (P1 requests R1)
  R1 → P2 (R1 held by P2)
  P2 → R2 (P2 requests R2)
  R2 → P1 (R2 held by P1)
  → Cycle P1→R1→P2→R2→P1 → DEADLOCK ✓

Example 2: Cycle but NO deadlock (multiple instances):
  R1 has 2 instances: one held by P1, one by P2
  P3 requests R1 (forms cycle with P1 or P2)
  But P2 can finish without requesting anything else
  → P2 releases R1 → P3 gets it → NO DEADLOCK

Wait-for graph (single instance only):
  RAG:  P1→R1→P2, P2→R2→P1
  WFG:  P1→P2, P2→P1  ← cycle → DEADLOCK

Decision table:
  No cycle         → NO deadlock (definite)
  Cycle, 1-instance → DEADLOCK (definite)
  Cycle, n-instance → MAYBE deadlock (run detection algorithm)`,
      explanation: "Cycle is necessary but not sufficient for deadlock when resources have multiple instances.",
    },
    examTips: [
      "PYQ: 'Given a RAG, check for deadlock' — Dec 2024, Dec 2023",
      "Request edge: Process→Resource. Assignment edge: Resource→Process.",
      "No cycle = definitely NO deadlock. Cycle = maybe deadlock.",
      "Single instance + cycle = DEFINITE deadlock.",
      "Wait-for graph: only for single-instance. Cycle = deadlock.",
    ],
    questions: [
      { q: "Does every cycle in a RAG indicate a deadlock?", a: "No. Only if each resource type in the cycle has exactly one instance. If any resource has multiple instances, the cycle may exist without deadlock (another instance may become available when a non-deadlocked process finishes)." },
      { q: "How do you derive a wait-for graph from a RAG?", a: "Remove all resource nodes. For every path Pi→Rj→Pk in the RAG (Pi requests Rj, Rj held by Pk), add a direct edge Pi→Pk in the wait-for graph (Pi is waiting for Pk). If the resulting graph has a cycle → deadlock." },
    ],
  },

  "deadlock-handling": {
    title: "Deadlock Handling Methods", emoji: "🛠️",
    tldr: "Prevention: eliminate condition. Avoidance: safe state. Detection: allow+recover. Denial: Ostrich algorithm (Linux).",
    explanation: `Four strategies for handling deadlocks:

1. PREVENTION (proactive, structural):
   Design the system so deadlock is IMPOSSIBLE.
   Eliminate at least one of the 4 conditions at design time.
   Cost: low resource utilization (e.g., releasing everything to avoid Hold&Wait).

2. AVOIDANCE (proactive, dynamic):
   Don't prevent deadlock statically, but dynamically check each resource request.
   Only grant a request if the resulting state is SAFE.
   Requires advance knowledge of max resource needs.
   Better utilization than prevention.

3. DETECTION + RECOVERY (reactive):
   Let deadlock happen! Periodically run detection algorithm.
   When detected, recover (terminate a process or preempt a resource).
   Cost: overhead of detection + potential for data loss during recovery.

4. DENIAL / OSTRICH ALGORITHM:
   IGNORE deadlocks entirely.
   Named after the ostrich that buries its head in the sand.
   Used by LINUX and WINDOWS!
   Reasoning: deadlocks are rare in practice. The overhead of prevention/avoidance outweighs the benefit. Users just reboot or restart the hung program.
   Many real systems (databases) handle their own deadlocks at application level.

REAL-WORLD: Linux and Windows use the ostrich approach for most deadlocks.
Database systems (MySQL, PostgreSQL) implement their own detection and recovery.`,
    keyPoints: [
      "Prevention: attack one of the 4 conditions (structural guarantee)",
      "Avoidance: dynamically ensure system stays in safe state",
      "Detection: let deadlock happen, find it, recover from it",
      "Denial (Ostrich): ignore deadlock entirely (Linux, Windows default!)",
      "Prevention: low resource utilization and possible starvation",
      "Avoidance: requires knowing max resource demands in advance",
      "Recovery: terminate processes OR preempt resources",
    ],
    formula: {
      code: `Method Comparison:
  Method      │ When?       │ Approach           │ Cost/Trade-off
  ────────────┼─────────────┼────────────────────┼──────────────────
  Prevention  │ Design time │ Restrict requests  │ Low utilization
  Avoidance   │ Runtime     │ Safe-state check   │ Needs advance info
  Detection   │ After occur │ Find + recover     │ Recovery overhead
  Ostrich     │ Never       │ IGNORE it          │ Simple; rare risk

Modern OS approach (Linux/Windows):
  "Ostrich Algorithm"
  - Deadlocks are rare in well-written applications
  - Detection/prevention overhead > expected cost of deadlock
  - User just kills the hung process or reboots
  - Applications (DBs, etc.) handle their own deadlock detection

Avoidance grant rule:
  Only grant request if resulting state is still SAFE`,
      explanation: "Linux ignores deadlock — applications (databases, etc.) handle it themselves.",
    },
    examTips: [
      "Modern OSes (Linux, Windows) use the OSTRICH algorithm (ignore it)",
      "Prevention: attack one of the 4 conditions structurally",
      "Avoidance: needs max demand info in advance (proactive)",
      "Detection: reactive — fix after it happens",
    ],
    questions: [
      { q: "Why do most modern OS like Linux ignore deadlocks (Ostrich Algorithm)?", a: "Deadlocks are rare in well-written applications. Implementing detection/prevention/avoidance has significant overhead (memory, CPU) and complexity. The expected cost of handling deadlock exceeds the expected cost of the deadlock itself. Applications that need it (databases) implement their own handling." },
      { q: "Which deadlock method is best overall?", a: "No single best method. Prevention: safe but wastes resources. Avoidance: good utilization but needs advance info (hard in practice). Detection: allows maximum utilization but recovery may lose work. Ostrich: simplest, works when deadlocks are rare. Most OS use Ostrich + expect applications to handle their own." },
    ],
  },

  "deadlock-prevention": {
    title: "Deadlock Prevention", emoji: "🔒",
    tldr: "Attack one of the 4 conditions. Circular Wait: total resource ordering. Hold&Wait: release before requesting.",
    explanation: `Eliminate at least one of the four necessary conditions:

1. ATTACK MUTUAL EXCLUSION:
   Make resources shareable where possible.
   Read-only files can be shared → no mutual exclusion needed.
   PROBLEM: Some resources are inherently non-shareable (printers, tape drives, mutexes).
   Can't always eliminate this condition.

2. ATTACK HOLD AND WAIT:
   Option A: Request ALL resources before execution begins.
     Process declares entire resource needs upfront. Gets all or waits.
     Problem: may not know all needs upfront; low utilization (resources held idle).
   Option B: Release ALL held resources before requesting more.
     If can't get what you need, release what you have, request everything together.
     Problem: may cause starvation if popular resources always grabbed by others.

3. ATTACK NO PREEMPTION (add preemption):
   If a process requests a resource and must wait:
     ALL its currently held resources are PREEMPTED (forcibly taken).
     Process restarts only when it can get ALL old resources PLUS new ones.
   Works for resources whose state can be saved (CPU registers, memory pages).
   DOESN'T work for resources like printers (mid-print → garbled output).

4. ATTACK CIRCULAR WAIT (most practical!):
   Assign a TOTAL ORDERING to all resource types (R1 < R2 < R3 < ... < Rm).
   Processes must request resources in STRICTLY INCREASING order.
   If holding Ri, can only request Rj where j > i.
   PROOF: impossible to form a cycle if everyone follows increasing order.
   
   Example: disk=1, memory=2, printer=3.
   All processes must request: disk → (then maybe) memory → (then maybe) printer.
   A process can't hold printer and then request disk → breaks circular wait.`,
    keyPoints: [
      "Mutual Exclusion: make shareable (hard — printers can't be shared)",
      "Hold & Wait: request ALL at start OR release all before requesting more",
      "No Preemption: force release when blocked; restart when all available",
      "Circular Wait: total resource ordering — all processes follow same order",
      "Circular Wait most practical prevention technique",
      "Hold & Wait problems: low utilization, starvation possible",
    ],
    formula: {
      code: `Circular Wait Prevention (MOST COMMON):
  Assign ordering: R1 < R2 < R3 < ... < Rm
  
  Rule: can only request Rj if Rj > all currently held resources
  
  Example: disk=1, memory=2, printer=3
    MUST request: disk → memory → printer (in increasing order)
    CANNOT: hold printer (3), then request disk (1) → BLOCKED by ordering rule

  Why it works:
    For a cycle to exist: Pi waits for Pi+1 which waits for Pi+2 ... which waits for Pi
    But that requires some process to hold a higher-numbered resource
    and request a lower-numbered one → violates the ordering rule → impossible!

Mutex-lock ordering (prevents the x/y deadlock):
  // Thread A and Thread B BOTH acquire x before y:
  Thread A:    Thread B:
  x.acquire(); x.acquire();  // both try x first
  y.acquire(); y.acquire();  // then both try y
  // No deadlock: one gets x, the other waits. Then it gets y. Then releases both.

Hold & Wait Prevention:
  Option A: Request ALL resources at start (all-or-nothing):
    wait(all_needed_resources);  // system allocates ALL or waits
    // ... execute using all resources
    signal(all_needed_resources);
  
  Option B: Release before requesting:
    if (need_new_resource) {
      release(all_current_resources);  // give up what you have
      request(all_needed_including_new); // request everything at once
    }`,
      explanation: "Circular wait prevention via ordering is the most commonly used technique.",
    },
    examTips: [
      "Circular Wait prevention: total ordering → request in ORDER (most practical)",
      "Hold & Wait: two options: request ALL upfront OR release all before re-requesting",
      "No Preemption: released resources go to 'waiting list', process restarts when all available",
      "Hold & Wait prevents deadlock but causes low utilization and possible starvation",
    ],
    questions: [
      { q: "How does total resource ordering prevent the Circular Wait condition?", a: "If all processes must request resources in increasing order, it's structurally impossible to form a cycle. A cycle would require some process to hold a higher-numbered resource and request a lower-numbered one — but that violates the ordering rule." },
      { q: "What are the two approaches to preventing Hold and Wait?", a: "1. Request ALL resources before execution begins — get everything at once or wait. 2. Release ALL held resources before requesting new resources — can't hold anything while requesting. Both prevent partial allocation that creates hold-and-wait. Both have drawbacks: low utilization and potential starvation." },
    ],
  },

  "safe-state": {
    title: "Safe State & Deadlock Avoidance", emoji: "🟢",
    tldr: "Safe state: safe sequence exists. Safe → no deadlock. Unsafe → possible deadlock. Grant only if stays safe.",
    explanation: `DEADLOCK AVOIDANCE: the OS dynamically checks every resource request to ensure the system never enters an unsafe state. Requires processes to declare their MAXIMUM resource needs upfront.

SAFE STATE:
  A state where there exists a SAFE SEQUENCE <P1, P2, ..., Pn> such that for each Pi:
  The resources Pi STILL NEEDS can be satisfied by:
    Currently AVAILABLE resources +
    Resources that will be released by all Pj where j < i (processes before Pi in the sequence)
  
  In other words: if we let processes run in this order, each one can eventually get all it needs and finish. No deadlock.

ANALOGY: Bank loan management.
  Bank has $10M. Three customers:
  C1 needs max $9M total, currently borrowed $3M, needs up to $6M more.
  C2 needs max $4M total, currently borrowed $2M, needs up to $2M more.
  C3 needs max $7M total, currently borrowed $1M, needs up to $6M more.
  Available: $10M - $6M = $4M.
  Safe sequence: C2 first (needs $2M ≤ $4M available → lends $2M, C2 finishes, returns $4M total).
  Now $6M available. C1 (needs $6M ≤ $6M) → C1 finishes. C3 (needs $6M ≤ available) → C3 finishes. SAFE!

KEY RELATIONSHIPS:
  Safe state → NO deadlock (guaranteed, always)
  Deadlock state → UNSAFE (always, deadlock is a subset of unsafe)
  Unsafe state → MAYBE deadlock (possible but not guaranteed yet)

The GOAL of avoidance: keep the system in a safe state AT ALL TIMES.
Even if a resource is AVAILABLE, the request may be DENIED if granting it leads to an unsafe state.`,
    keyPoints: [
      "Safe state: safe sequence <P1...Pn> exists where all can complete",
      "Safe state → guaranteed no deadlock",
      "Deadlock state → unsafe (always)",
      "Unsafe state → NOT necessarily deadlock (just a possibility)",
      "Avoidance goal: never leave safe state",
      "Avoidance requires: max demand info in advance for each process",
    ],
    formula: {
      code: `Safe Sequence <P1, P2, ..., Pn> is SAFE if:
  For each Pi: Resources Pi needs ≤ Available + Σ(Resources held by Pj, j < i)
  (Pi can finish using available resources + what earlier processes will release)

Example (single resource type, 12 instances total):
  Process  Max   Allocated  Still Needs
  P0       10       5          5
  P1        4       2          2
  P2        9       3          6
  Available = 12 - (5+2+3) = 2

  Try <P1, P0, P2>:
    P1: needs 2 ≤ available(2) ✓ → P1 finishes, releases 2 → avail=4
    P0: needs 5 ≤ available(4)? NO ✗ → can't go P0 next

  Try <P1, P2, P0>:
    P1: needs 2 ≤ 2 ✓ → avail = 2+2 = 4
    P2: needs 6 ≤ 4? NO ✗

  Try <P0, ...>:
    P0: needs 5 ≤ 2? NO ✗

  Hmm, what if: P1 goes, avail=4, then no one else can go → UNSAFE!

State diagram:
  safe ──────────────────────────────→ safe  (avoidance maintains this)
  safe ──[risky request denied]──────→ safe
  safe ──[would-become-unsafe denied] → safe (avoidance prevents this cross)`,
      explanation: "Avoidance only grants request if the resulting state is still SAFE.",
    },
    examTips: [
      "Safe → no deadlock. Deadlock → unsafe. Unsafe → MAYBE deadlock (not always).",
      "Process Pi in safe sequence: check available + all Pj (j<i) releases",
      "Avoidance: only grant if resulting state remains safe",
      "Resource may be AVAILABLE but request still DENIED if it leads to unsafe state",
    ],
    questions: [
      { q: "A system is in an unsafe state. Does deadlock necessarily occur?", a: "No. An unsafe state means the OS can no longer guarantee deadlock-free completion. Processes might make requests that lead to deadlock. But if they happen to NOT make those requests, deadlock may not occur. Unsafe = risk of deadlock, not certainty." },
      { q: "A resource is available. Can the OS still deny a request? Why?", a: "Yes! In deadlock avoidance, even available resources can be denied. If granting the request would move the system from a safe state to an unsafe state, the OS denies it and makes the process wait until granting becomes safe." },
    ],
  },

  "bankers": {
    title: "Banker's Algorithm", emoji: "🏦",
    tldr: "Max, Allocation, Need = Max-Allocation, Available. Safety algorithm: find process whose Need ≤ Available, simulate completion, repeat.",
    explanation: `Named after a bank that only lends money if it can guarantee all customers can eventually be satisfied (even in the worst case).

FOUR DATA STRUCTURES (n processes, m resource types):
  Available[m]     = currently free instances of each resource type
  Max[n][m]        = maximum resources each process may EVER need
  Allocation[n][m] = resources currently ALLOCATED to each process
  Need[n][m]       = Max - Allocation (resources each process STILL needs)

STEP 1 — ALWAYS compute Need first:
  Need[i][j] = Max[i][j] - Allocation[i][j]

SAFETY ALGORITHM (is the current state safe?):
  work = copy of Available   (simulate available resources)
  finish[n] = {false, ..., false}  (all processes unfinished)
  
  Loop:
    Find i where: finish[i] == false AND Need[i] ≤ work
    If found: work += Allocation[i]; finish[i] = true; repeat loop
    If not found: break
  
  If all finish[i] == true → SAFE
  Else → UNSAFE

RESOURCE REQUEST ALGORITHM (can Pi's request be granted?):
  1. If Request[i] > Need[i]: ERROR (process exceeded declared max)
  2. If Request[i] > Available: Pi must WAIT (resources not available)
  3. TENTATIVELY allocate:
     Available -= Request[i]
     Allocation[i] += Request[i]
     Need[i] -= Request[i]
  4. Run safety algorithm:
     Safe → GRANT request (allocation stands)
     Unsafe → ROLLBACK to original state, Pi waits

The algorithm is O(n² × m) time.`,
    keyPoints: [
      "Need = Max - Allocation (compute this first!)",
      "Available: what's currently free",
      "Safety: iterate until no progress. All finish → safe; else → unsafe.",
      "Request algorithm: ALWAYS check Request ≤ Need first (error if not)",
      "Tentative allocation + safety check → grant if safe, rollback if not",
      "O(n² × m) time complexity",
    ],
    formula: {
      code: `Data structures (n=5 processes, m=3 resource types A,B,C):

         Allocation  Max      Need=Max-Alloc  Available
         A  B  C     A  B  C  A  B  C         A  B  C
  P0     0  1  0     7  5  3  7  4  3         3  3  2
  P1     2  0  0     3  2  2  1  2  2
  P2     3  0  2     9  0  2  6  0  0
  P3     2  1  1     2  2  2  0  1  1
  P4     0  0  2     4  3  3  4  3  1

Safety Algorithm execution:
  work = [3,3,2], finish = [F,F,F,F,F]
  
  Step 1: Find Need[i] ≤ work=[3,3,2]
    P0: Need=[7,4,3] ≤ [3,3,2]? 7>3 NO
    P1: Need=[1,2,2] ≤ [3,3,2]? YES → work=[3,3,2]+[2,0,0]=[5,3,2], finish[1]=T
  
  Step 2: work=[5,3,2]
    P0: [7,4,3] ≤ [5,3,2]? 7>5 NO
    P2: [6,0,0] ≤ [5,3,2]? 6>5 NO
    P3: [0,1,1] ≤ [5,3,2]? YES → work=[5,3,2]+[2,1,1]=[7,4,3], finish[3]=T
  
  Step 3: work=[7,4,3]
    P0: [7,4,3] ≤ [7,4,3]? YES → work=[7,4,3]+[0,1,0]=[7,5,3], finish[0]=T
  
  Step 4: work=[7,5,3]
    P2: [6,0,0] ≤ [7,5,3]? YES → work=[7,5,3]+[3,0,2]=[10,5,5], finish[2]=T
  
  Step 5: work=[10,5,5]
    P4: [4,3,1] ≤ [10,5,5]? YES → finish[4]=T
  
  All finish = TRUE → SAFE sequence: <P1, P3, P0, P2, P4>`,
      explanation: "Work starts at Available. Add Allocation of each process as it 'finishes'. If all finish → safe.",
    },
    examTips: [
      "PYQ: Banker's algorithm appears in EVERY exam — MUST practice step-by-step",
      "Need = Max - Allocation. Compute this FIRST before anything else.",
      "Safety: iterate until no progress. All finish → safe; else → unsafe.",
      "Request algorithm: ALWAYS check Request ≤ Need first (error if not)",
      "Rollback if unsafe: Available += Request, Allocation[i] -= Request, Need[i] += Request",
    ],
    questions: [
      { q: "Available=[2,1,0], P0:Need=[7,4,3],Alloc=[0,1,0]. P1:Need=[1,2,2],Alloc=[2,0,0]. P2:Need=[6,0,0],Alloc=[3,0,2]. P3:Need=[0,1,1],Alloc=[2,1,1]. Is it safe?", a: "work=[2,1,0]. P3:Need=[0,1,1]≤[2,1,0]? YES → work=[2,1,0]+[2,1,1]=[4,2,1]. P1:Need=[1,2,2]≤[4,2,1]? 2≤1? NO. P2:Need=[6,0,0]≤[4,2,1]? 6>4 NO. P0:Need=[7,4,3]≤[4,2,1]? NO. No more progress. P0,P1,P2 not finished → UNSAFE." },
      { q: "What is the key difference between the safety algorithm and the resource-request algorithm in Banker's?", a: "Safety algorithm: checks if the CURRENT state has a safe sequence (run anytime to check). Resource-request algorithm: checks whether GRANTING a specific request would keep the state safe — it tentatively grants the request, runs safety, then either confirms or rolls back." },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  DETECTION & SIGNALS
  // ─────────────────────────────────────────────────────────────

  "deadlock-detection": {
    title: "Deadlock Detection & Recovery", emoji: "🔍",
    tldr: "Single instance: wait-for graph, cycle=deadlock. Multiple: banker-like with Request matrix. Recovery: kill or preempt.",
    explanation: `DETECTION approach: allow deadlock to happen, then detect and recover.
No advance info needed (unlike Banker's). More flexible, more overhead to recover.

SINGLE INSTANCE per resource type:
  Use a WAIT-FOR GRAPH (derived from RAG).
  Remove resource nodes, collapse edges.
  Pi→Pj means: Pi is waiting for Pj to release a resource.
  CYCLE in wait-for graph = DEADLOCK.
  Run cycle detection algorithm: O(n²).

MULTIPLE INSTANCES per resource type:
  Similar to Banker's SAFETY algorithm, but use REQUEST (not Max/Need).
  REQUEST[i][j] = how many instances of Rj process Pi is CURRENTLY requesting.
  (This is actual outstanding requests NOW, not maximum future needs.)
  
  Algorithm:
    work = Available
    finish[i] = (Allocation[i] == all zeros)  ← already done if holds nothing
    
    Find i: finish[i]==false AND Request[i] ≤ work
    work += Allocation[i]; finish[i] = true; repeat
    
    Any finish[i] == false → Pi is DEADLOCKED

RECOVERY:
  Option 1 — Process Termination:
    A: Abort ALL deadlocked processes (simple but expensive — lost work).
    B: Abort ONE at a time, re-run detection after each.
    Which to kill? Minimize cost: consider priority, CPU time used, resources held, how many others depend on it.
  
  Option 2 — Resource Preemption:
    Select a VICTIM process. Preempt its resources. Give to another process.
    Must ROLLBACK victim to a safe state (checkpoint/restart).
    Risk: STARVATION — same process always selected as victim. Fix: add age counter.`,
    keyPoints: [
      "Single instance: wait-for graph, O(n²) cycle detection",
      "Multiple instances: Request matrix (not Max like Banker's) + similar algorithm",
      "Detection frequency: every resource request (expensive) or periodically",
      "Recovery 1: terminate one or all deadlocked processes",
      "Recovery 2: preempt resources (rollback process to before acquisition)",
      "Selective kill: consider priority, work done, resources held, starvation risk",
    ],
    formula: {
      code: `Wait-For Graph (single instance):
  RAG: P1→R1→P2, P2→R2→P1
  WFG: P1→P2, P2→P1   ← CYCLE → DEADLOCK

Multiple instance detection:
  Data: Available[m], Allocation[n][m], Request[n][m]
  (REQUEST = current outstanding requests, NOT max demand!)
  
  work = Available
  finish[i] = (Allocation[i] == all zeros)  // true if process holds nothing
  
  LOOP: Find i where finish[i]==false AND Request[i] ≤ work
        work += Allocation[i]; finish[i] = true; REPEAT
  
  finish[i]==false for any i → Pi is DEADLOCKED

Key difference from Banker's:
  Banker's uses: Need = Max - Allocation (future maximum need)
  Detection uses: Request (what process is requesting RIGHT NOW)

Recovery strategies:
  Termination:
    Kill all deadlocked: fast but expensive (loses work)
    Kill one at a time: rerun detection after each kill (more careful)
  
  Preemption:
    victim selection criteria:
      - Minimum cost (priority, work done, resources held)
      - Starvation prevention (don't always pick same victim)
    rollback victim to some safe prior state`,
      explanation: "Detection uses REQUEST (current requests), not MAX demand (like Banker's does).",
    },
    examTips: [
      "Detection uses REQUEST (current), not MAX demand (like Banker's)",
      "finish[i] initialized to TRUE if Allocation[i] is all zeros (process holds nothing)",
      "After detecting deadlock: terminate or preempt (two recovery approaches)",
      "Starvation in recovery: always picking same victim → add age/count limit",
    ],
    questions: [
      { q: "How does deadlock detection differ from Banker's avoidance in terms of data used?", a: "Banker's uses Max demand (declared upfront, future maximum). Detection uses actual current Request (the requests being made right now). Detection has no advance knowledge requirement — it works reactively." },
      { q: "Why might process termination during recovery be expensive?", a: "The terminated process may have been running for a long time, completed significant computation, and modified files or databases. Killing it wastes that work and may require cleanup. Also, partial file writes may leave data corrupted." },
    ],
  },

  "signals": {
    title: "Signals", emoji: "📡",
    tldr: "Software interrupts. Generated→Delivered→Handled. Sync: illegal mem access, div/0. Async: Ctrl+C, timer. kill() and pthread_kill().",
    explanation: `A SIGNAL is a software interrupt in Unix/Linux. It's the OS's way of notifying a process that something happened.

THINK: like a doorbell. Someone rings (generates signal), your house receives it (delivered), you open the door (handle it).

THREE-STEP PATTERN:
  1. GENERATED: by the occurrence of an event
  2. DELIVERED: to a process (or specific thread)
  3. HANDLED: by a signal handler

SYNCHRONOUS signals (caused by the process ITSELF):
  SIGSEGV (11) — segmentation fault (illegal memory access, null pointer deref)
  SIGFPE  (8)  — floating point exception (divide by zero)
  SIGILL  (4)  — illegal instruction
  Delivered to the SAME PROCESS/THREAD that caused it.

ASYNCHRONOUS signals (caused by EXTERNAL events):
  SIGINT  (2)  — Ctrl+C (user interrupt)
  SIGKILL (9)  — force kill (cannot be caught or ignored — always works)
  SIGSTOP (19) — pause process (cannot be caught or ignored)
  SIGCONT (18) — resume paused process
  SIGALRM (14) — alarm() timer expired
  SIGABRT (6)  — abort() called

SIGNAL HANDLERS:
  Default handler: kernel-defined (usually terminate, core dump, or ignore)
  User-defined: you can override with signal() or sigaction()
  SIGKILL and SIGSTOP: CANNOT be overridden — always kernel-handled.

MULTITHREADED signal delivery:
  Sync signal → to the thread that caused it
  Async signal → options: all threads, specific thread, or one designated receiver thread

SENDING SIGNALS:
  kill(pid, SIGTERM)       → send to entire process
  pthread_kill(tid, sig)   → send to specific thread`,
    keyPoints: [
      "Signal = software interrupt. Pattern: Generate → Deliver → Handle.",
      "Synchronous: caused by same process (illegal mem access, div/0)",
      "Asynchronous: external event (Ctrl+C, timer, kill command)",
      "Two handlers: default (kernel) or user-defined (can override default)",
      "kill(pid, signal): send signal to process",
      "pthread_kill(tid, signal): send signal to specific thread",
      "SIGKILL and SIGSTOP cannot be caught or ignored — always delivered",
    ],
    formula: {
      code: `Key Linux Signals:
  Signal    #   Cause                    Default action
  SIGINT    2   Ctrl+C                   Terminate
  SIGKILL   9   Force kill (cannot catch) Terminate (always)
  SIGSEGV   11  Segfault                 Core dump + terminate
  SIGSTOP   19  Pause (cannot catch)     Stop process
  SIGCONT   18  Resume stopped process   Continue
  SIGALRM   14  alarm() timer expired    Terminate
  SIGABRT   6   abort() called           Core dump + terminate

Signal handlers:
  signal(SIGINT, my_handler);   // override Ctrl+C handler
  // OR modern way:
  struct sigaction sa;
  sa.sa_handler = my_handler;
  sigaction(SIGINT, &sa, NULL);

Sending signals:
  kill(pid, SIGTERM);             // to process (all threads)
  pthread_kill(tid, SIGTERM);     // to specific thread

Multithreaded delivery:
  1. Deliver to thread that triggered it (sync signals)
  2. Deliver to every thread (broadcast async signals like SIGINT)
  3. Deliver to specific threads only
  4. One designated "signal thread" receives all signals

Windows equivalent: APC (Asynchronous Procedure Call)
  - User thread specifies a callback function
  - Delivered to a specific thread (not whole process)
  - Triggered on specific events`,
      explanation: "SIGKILL and SIGSTOP cannot be caught or ignored — guaranteed delivery.",
    },
    examTips: [
      "SIGSEGV = segmentation fault (illegal memory access, null pointer dereference)",
      "SIGKILL (9) and SIGSTOP (19): CANNOT be caught or ignored",
      "Sync signals → to CAUSING thread. Async signals → flexible delivery options.",
      "Windows APC = rough equivalent of Unix async signals",
    ],
    questions: [
      { q: "What is the difference between synchronous and asynchronous signals?", a: "Synchronous: caused by the process itself (e.g., segfault from null pointer dereference, divide by zero) — delivered to the same process that caused it. Asynchronous: caused by external events (Ctrl+C from user, timer expiry, another process sending kill) — delivered from outside." },
      { q: "Which Linux signals cannot be caught or ignored?", a: "SIGKILL (signal 9) and SIGSTOP (signal 19). These are always delivered and handled by the kernel directly — user programs cannot override their behavior. This ensures system administrators can always kill or pause any process." },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  CPU SCHEDULING PYQ (NEW SECTION)
  // ─────────────────────────────────────────────────────────────

  "srtf-scheduling": {
    title: "SRTF Scheduling (Preemptive SJF)", emoji: "📅",
    tldr: "Shortest Remaining Time First. Preemptive — new arrival can preempt if shorter. Gantt → WT = (Finish - Arrival - Burst).",
    explanation: `SRTF = Shortest Remaining Time First = Preemptive SJF (Shortest Job First).
At every moment, the CPU runs the process with the SHORTEST REMAINING BURST TIME.
When a new process arrives, if its burst time < current running process's REMAINING time → PREEMPT!

STEP-BY-STEP METHOD:
  1. Draw a timeline. At each event (arrival or completion), compare all ready processes.
  2. Run whichever has the shortest REMAINING time.
  3. Track remaining time for each process as it runs.
  4. When a process finishes, record Completion Time (CT).

CALCULATING METRICS:
  Turnaround Time (TAT) = Completion Time - Arrival Time
  Waiting Time (WT)     = TAT - Burst Time  =  CT - AT - BT

PYQ WORKED EXAMPLE (Dec 2023, Dec 2024):
  P1: BT=20, AT=0
  P2: BT=25, AT=15
  P3: BT=10, AT=30
  P4: BT=15, AT=45

  t=0: Only P1 ready → P1 runs.
  t=15: P2 arrives. P1 remaining=5. P2 remaining=25. 5 < 25 → P1 CONTINUES.
  t=20: P1 finishes (CT=20). P2 ready (remaining=25).
  t=30: P3 arrives. P2 remaining=15. P3 remaining=10. 10 < 15 → P3 PREEMPTS P2.
  t=40: P3 finishes (CT=40). P2 resumes (remaining=15).
  t=45: P4 arrives. P2 remaining=10. P4 remaining=15. 10 < 15 → P2 CONTINUES.
  t=55: P2 finishes (CT=55). P4 runs (remaining=15).
  t=70: P4 finishes (CT=70).

  Gantt: |P1(0-20)|P2(20-30)|P3(30-40)|P2(40-55)|P4(55-70)|

  WT: P1=(20-0-20)=0, P2=(55-15-25)=15, P3=(40-30-10)=0, P4=(70-45-15)=10
  Avg WT = (0+15+0+10)/4 = 25/4 = 6.25

IMPORTANT: P2 waiting time = 15 (specific PYQ question asked this).`,
    keyPoints: [
      "SRTF = Preemptive SJF. Always runs shortest REMAINING burst time.",
      "New arrival CAN preempt current if arrival's burst < current's remaining",
      "Turnaround Time (TAT) = Completion Time - Arrival Time",
      "Waiting Time (WT) = TAT - Burst Time = CT - AT - BT",
      "Gantt chart: track remaining times at each event",
    ],
    formula: {
      code: `PYQ 1 (Dec 2023, Dec 2024):
  P1: BT=20,AT=0  P2: BT=25,AT=15  P3: BT=10,AT=30  P4: BT=15,AT=45

  t=0 : P1(rem=20) runs
  t=15: P2 arrives. P1 rem=5 < P2 rem=25 → P1 CONTINUES
  t=20: P1 done. P2(rem=25) runs
  t=30: P3 arrives. P3 rem=10 < P2 rem=15 → P3 PREEMPTS P2
  t=40: P3 done. P2(rem=15) resumes
  t=45: P4 arrives. P2 rem=10 < P4 rem=15 → P2 CONTINUES
  t=55: P2 done. P4(rem=15) runs
  t=70: P4 done.

  Gantt: |P1(0-20)|P2(20-30)|P3(30-40)|P2(40-55)|P4(55-70)|
  
  Process  CT   AT   BT   TAT=CT-AT  WT=TAT-BT
  P1       20    0   20      20          0
  P2       55   15   25      40         15  ← PYQ answer: WT(P2)=15
  P3       40   30   10      10          0
  P4       70   45   15      25         10
  
  Avg WT = (0+15+0+10)/4 = 25/4 = 6.25

PYQ 2 (May 2024) — 5 processes:
  P1:BT=6,AT=2  P2:BT=2,AT=5  P3:BT=8,AT=1  P4:BT=3,AT=0  P5:BT=4,AT=4

  Gantt: |P4(0-3)|P1(3-4)|P5(4-5)|P2(5-7)|P5(7-10)|P1(10-15)|P3(15-23)|
  WT:  P4=0, P1=7, P2=0, P3=14, P5=2  →  Avg WT = 23/5 = 4.6ms
  TAT: P4=3, P1=13, P2=2, P3=22, P5=6 →  Avg TAT = 46/5 = 9.2ms`,
      explanation: "At each event, compare all REMAINING burst times. Run shortest. Preempt if needed.",
    },
    examTips: [
      "PYQ: SRTF appears in EVERY exam — Dec 2023, May 2024, Dec 2024, July 2023",
      "WT = CT - AT - BT (most reliable formula — avoids tracking start times)",
      "Always track REMAINING burst time, not original burst time",
      "When P2's WT is asked: P2 WT = 55-15-25 = 15 (common exam Q)",
      "Draw Gantt chart first, THEN calculate metrics from completion times",
    ],
    questions: [
      { q: "P1:BT=20,AT=0. P2:BT=25,AT=15. P3:BT=10,AT=30. P4:BT=15,AT=45. What is P2's waiting time under SRTF?", a: "P2 completes at t=55. WT(P2) = CT - AT - BT = 55 - 15 - 25 = 15. (P2 runs from 20-30, then preempted by P3 at 30, resumes at 40, finishes at 55.)" },
      { q: "Under SRTF, when does a new arrival cause preemption?", a: "When the new process's burst time is STRICTLY LESS THAN the currently running process's REMAINING burst time. If new burst ≥ remaining, no preemption occurs." },
      { q: "P1:BT=6,AT=2. P2:BT=2,AT=5. P3:BT=8,AT=1. P4:BT=3,AT=0. P5:BT=4,AT=4. Calculate average WT under SRTF.", a: "Gantt: |P4(0-3)|P1(3-4)|P5(4-5)|P2(5-7)|P5(7-10)|P1(10-15)|P3(15-23)|. CT: P4=3,P1=15,P2=7,P3=23,P5=10. WT: P4=0,P1=7,P2=0,P3=14,P5=2. Avg WT=(0+7+0+14+2)/5=23/5=4.6ms" },
    ],
  },

  "sjf-nonpreemptive": {
    title: "SJF Non-Preemptive Scheduling", emoji: "📋",
    tldr: "Shortest Job First — once started, runs to completion. At each decision point, pick shortest burst among ALL arrived processes.",
    explanation: `SJF Non-Preemptive = once a process starts, it RUNS TO COMPLETION regardless of any shorter process arriving.
Only makes a new scheduling decision when the current process FINISHES.

KEY DIFFERENCE from SRTF:
  SRTF: can preempt mid-execution if shorter job arrives.
  SJF:  NO preemption — shorter arrivals must wait until current finishes.

STEP-BY-STEP:
  1. At each COMPLETION POINT, look at all ARRIVED and READY processes.
  2. Pick the one with the SHORTEST burst time.
  3. Run it to COMPLETION (no interruptions).
  4. Repeat.

NOTE: SJF can cause STARVATION if short jobs keep arriving before a long job runs.

PYQ WORKED EXAMPLE (Dec 2023):
  P1:BT=6,AT=2. P2:BT=2,AT=5. P3:BT=8,AT=1. P4:BT=3,AT=0. P5:BT=4,AT=4.

  t=0: Only P4 arrived (BT=3). P4 runs (0-3).
  t=3: P3(BT=8) and P1(BT=6) arrived. Available: {P3,P1}. Pick P1(shorter). P1 runs (3-9).
  t=9: P3(BT=8), P2(BT=2), P5(BT=4) arrived. Available: {P3,P2,P5}. Pick P2(shortest). P2 runs (9-11).
  t=11: {P3,P5} available. Pick P5(BT=4). P5 runs (11-15).
  t=15: {P3} only. P3 runs (15-23).

  Gantt: |P4(0-3)|P1(3-9)|P2(9-11)|P5(11-15)|P3(15-23)|
  
  WT: P4=0-0=0, P1=3-2=1, P2=9-5=4, P5=11-4=7, P3=15-1=14
  Avg WT = (0+1+4+7+14)/5 = 26/5 = 5.2ms`,
    keyPoints: [
      "Non-preemptive: once started, runs to COMPLETION",
      "Decision point: ONLY when current process finishes",
      "At decision point: pick shortest burst among ALL arrived processes",
      "SJF is optimal for minimizing average waiting time (non-preemptive)",
      "Risk: STARVATION of long processes if short ones keep arriving",
      "WT = start_time - arrival_time (easier for non-preemptive since no gaps)",
    ],
    formula: {
      code: `PYQ (Dec 2023):
  P1:BT=6,AT=2  P2:BT=2,AT=5  P3:BT=8,AT=1  P4:BT=3,AT=0  P5:BT=4,AT=4

  At t=0: Available={P4}. Run P4(3). Done at t=3.
  At t=3: Available={P3(AT=1),P1(AT=2)}. Pick P1(BT=6 < P3's 8). Run P1. Done at t=9.
  At t=9: Available={P3(AT=1),P2(AT=5),P5(AT=4)}. Pick P2(BT=2). Done at t=11.
  At t=11: Available={P3,P5}. Pick P5(BT=4). Done at t=15.
  At t=15: Available={P3}. Run P3. Done at t=23.

  Gantt: |P4(0-3)|P1(3-9)|P2(9-11)|P5(11-15)|P3(15-23)|

  Process  Start  AT  BT   WT=Start-AT   CT  TAT=CT-AT
  P4         0     0   3       0           3      3
  P1         3     2   6       1           9      7
  P2         9     5   2       4          11      6
  P5        11     4   4       7          15     11
  P3        15     1   8      14          23     22

  Avg WT  = (0+1+4+7+14)/5 = 26/5 = 5.2ms
  Avg TAT = (3+7+6+11+22)/5 = 49/5 = 9.8ms

Comparison: SRTF vs SJF (same processes):
  SJF Avg WT  = 5.2ms  (non-preemptive)
  SRTF Avg WT = 4.6ms  (preemptive — always better or equal)`,
      explanation: "At each completion, pick shortest burst among all ALREADY ARRIVED processes.",
    },
    examTips: [
      "For non-preemptive: WT = start_time - arrival_time (no need for CT-AT-BT formula)",
      "Only make scheduling decisions at COMPLETION events",
      "Check which processes have arrived by the current time",
      "SRTF always gives ≤ avg WT compared to SJF (preemptive ≤ non-preemptive)",
    ],
    questions: [
      { q: "P1:BT=6,AT=2. P2:BT=2,AT=5. P3:BT=8,AT=1. P4:BT=3,AT=0. P5:BT=4,AT=4. What is the average waiting time under SJF (non-preemptive)?", a: "Gantt: P4(0-3), P1(3-9), P2(9-11), P5(11-15), P3(15-23). WT: P4=0, P1=1, P2=4, P5=7, P3=14. Avg WT = 26/5 = 5.2ms." },
      { q: "Why is SRTF always at least as good as SJF in terms of average waiting time?", a: "SRTF is the preemptive version of SJF. By allowing preemption, a new short job immediately gets CPU instead of waiting. This further reduces waiting times. The preemptive version is always ≤ non-preemptive for the same scheduling criterion." },
    ],
  },

  "deadlock-free-analysis": {
    title: "Deadlock-Free System Analysis", emoji: "🔐",
    tldr: "Formula: Resources ≥ (max_per_process × num_processes) - num_processes + 1. Or: if worst case can't deadlock, it's safe.",
    explanation: `Sometimes you need to PROVE a system is deadlock-free without running Banker's algorithm.

CLASSIC PROBLEM TYPE:
  "N processes, each needing at most K resources of the same type. R resources total. Is deadlock possible?"

WORST-CASE ANALYSIS:
  The worst case for deadlock: EVERY process holds (K-1) resources and waits for 1 more.
  Total resources held in worst case = N × (K-1).
  If Total resources > N × (K-1), there's at least 1 free resource.
  That free resource can go to ONE of the processes, allowing it to finish.
  When it finishes, it releases its K-1 resources + gets 1 more → releases K total.
  Now (K-1+1) = K resources free → enough for another process. Chain reaction → NO DEADLOCK.

FORMULA:
  Deadlock-free if: R ≥ N × (K-1) + 1 = N×K - N + 1

EXAMPLE (PYQ Dec 2023):
  4 resources (R=4), 3 processes (N=3), each needs max 2 (K=2).
  Formula: 4 ≥ 3×(2-1)+1 = 3+1 = 4. YES! 4 ≥ 4. DEADLOCK-FREE.
  
  Intuition: Worst case = each holds 1 resource (3 held, 1 free).
  1 free resource → give to one process → it gets both (has 2), finishes, releases 2.
  Now 3 free. Next process gets both, finishes. Last process gets both, finishes.
  
ANOTHER EXAMPLE:
  5 resources, 5 processes, each needs max 2.
  Formula: 5 ≥ 5×(2-1)+1 = 6? 5 < 6 → NOT guaranteed deadlock-free.
  Worst case: each holds 1 (5 held, 0 free). Nobody can get the 2nd resource. DEADLOCK.

KEY: if there's always at least 1 free resource in the worst case → deadlock-free.`,
    keyPoints: [
      "Deadlock-free if: R ≥ N×(K-1) + 1 (R=resources, N=processes, K=max each needs)",
      "Worst case: every process holds (K-1) resources and waits for 1 more",
      "If ≥1 resource free in worst case → at least one process can complete",
      "Chain reaction: one completes → releases resources → another completes → ...",
      "4 resources, 3 processes, max 2 each → deadlock-free (4 ≥ 3+1=4)",
    ],
    formula: {
      code: `Deadlock-free condition:
  R ≥ N × (K-1) + 1
  
  R = total number of resources
  N = number of processes
  K = maximum resources any single process can need

Example 1 (PYQ Dec 2023):
  R=4, N=3, K=2
  Check: 4 ≥ 3×(2-1)+1 = 3×1+1 = 4 ✓ → DEADLOCK-FREE
  
  Why: worst case = each holds 1 (total held=3, free=1)
  1 free resource → any process can get it → that process completes (has 2)
  Releases 2. Now 3 free. → All others can complete.

Example 2:
  R=5, N=5, K=2
  Check: 5 ≥ 5×(2-1)+1 = 5+1 = 6? 5 < 6 → NOT guaranteed deadlock-free
  Worst case: all 5 hold 1 (total held=5, free=0) → ALL BLOCKED → DEADLOCK ✓

Example 3:
  R=10, N=4, K=3
  Check: 10 ≥ 4×(3-1)+1 = 8+1 = 9? 10 ≥ 9 ✓ → DEADLOCK-FREE
  Worst case: each holds 2 (8 held, 2 free)
  2 free → one process gets both remaining → has 3 → completes → etc.

General rule: To guarantee no deadlock, you need at least:
  (N processes × (K-1) resources each) + 1 extra resource`,
      explanation: "If worst case still leaves ≥1 free resource, someone can always make progress.",
    },
    examTips: [
      "PYQ: '4 resources, 3 processes, max 2 each — is it deadlock-free?' — Dec 2023",
      "Formula: R ≥ N(K-1)+1 for deadlock-free guarantee",
      "Worst case argument: every process holds max-1 resources",
      "Enough resources → at least one can always complete → chain reaction",
    ],
    questions: [
      { q: "PYQ: System has 4 resources, 3 processes each needing at most 2. Is it deadlock-free?", a: "Yes. Worst case: each process holds 1 resource (3 of 4 held, 1 free). The 1 free resource can go to any process → it gets 2, finishes, releases 2. Now 3 free → remaining processes can complete. R=4 ≥ N(K-1)+1 = 3(1)+1 = 4 ✓ Deadlock-free." },
      { q: "How many resources do you need minimum for 5 processes each needing at most 3, to guarantee no deadlock?", a: "R ≥ N(K-1)+1 = 5(3-1)+1 = 5×2+1 = 11. You need at least 11 resources to guarantee the system is deadlock-free." },
    ],
  },

};