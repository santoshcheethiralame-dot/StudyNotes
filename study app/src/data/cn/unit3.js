// cn/unit3.js — Computer Networks Unit 3: Transport Layer + Network Layer
// Kurose & Ross, 8th Edition | ESA PYQs: May 2023, Jul 2023, Dec 2023, Jan-May 2024, Dec 2024
//
// Exports: { groups, topics }
// groups → Array<{ name: string, ids: string[] }>
// topics → Record<id, { title, emoji, tldr, explanation, keyPoints, formula?, examTips, questions }>

// ─────────────────────────────────────────────
// GROUPS
// ─────────────────────────────────────────────

export const groups = [
  {
    name: "🔁 Reliable Data Transfer",
    ids: ["gbn", "selective-repeat", "gbn-vs-sr"],
  },
  {
    name: "🔗 TCP Protocol",
    ids: [
      "tcp-overview",
      "tcp-rtt",
      "tcp-flow-control",
      "tcp-connection",
      "tcp-rdt",
    ],
  },
  {
    name: "📈 TCP Congestion Control",
    ids: ["tcp-congestion", "tcp-reno-tahoe"],
  },
  {
    name: "🌐 Network Layer & Router",
    ids: ["network-layer-overview", "router-architecture"],
  },
  {
    name: "📦 IP Protocol",
    ids: ["ip-datagram", "ip-fragmentation", "ip-addressing"],
  },
  {
    name: "🏠 IP Services",
    ids: ["dhcp", "nat", "ipv6"],
  },
  {
    name: "🗺️ Routing Algorithms",
    ids: ["link-state", "distance-vector"],
  },
  {
    name: "🛡️ SDN & Error Detection",
    ids: ["sdn", "error-detection"],
  },
  {
    name: "🧠 Mnemonics & Tricks",
    ids: ["mnemonics-tricks"],
  },
  {
    name: "📝 PYQ Bank",
    ids: ["pyq-bank"],
  },
];

// ─────────────────────────────────────────────
// TOPICS
// ─────────────────────────────────────────────

export const topics = {

  // ══════════════════════════════════════════
  // 🔁 RELIABLE DATA TRANSFER
  // ══════════════════════════════════════════

  "gbn": {
    title: "Go-Back-N (GBN)",
    emoji: "🔁",
    tldr:
      "GBN lets the sender have up to N unACKed packets in flight (the window). If any packet is lost, sender retransmits ALL packets from the lost one onward. Receiver has NO buffer — it discards every out-of-order packet.",
    explanation: `Go-Back-N is a sliding-window protocol for reliable data transfer over an unreliable channel.

THE WINDOW (what the sender tracks):
At any moment, the sender has 4 zones:
• [0 .. base-1] — Already sent AND ACKed. Done.
• [base .. nextseqnum-1] — Sent but NOT yet ACKed (in-flight).
• [nextseqnum .. base+N-1] — Can be sent immediately (window has room).
• [base+N and above] — BLOCKED — must wait for ACKs to arrive.

The window slides forward as ACKs arrive.

SENDER RULES:
• If window has space (nextseqnum < base + N): send the packet, start timer if this is the only in-flight packet.
• If window is full: refuse new data from the application.
• On ACK(n) received (cumulative): set base = n + 1. If all ACKs caught up (base == nextseqnum), stop timer. Else restart timer for the oldest unACKed packet.
• On TIMEOUT: restart the timer and retransmit ALL packets from base to nextseqnum-1. This is the "go back" — you literally go back to the oldest unACKed packet and redo everything.

RECEIVER RULES (dead simple):
• Only accepts packets with exactly the expected sequence number.
• If packet arrives with wrong (out-of-order) seq#: DISCARD it. Re-send the last valid ACK.
• Only one variable needed: expectedseqnum.
• Sends CUMULATIVE ACKs only: ACK(n) means "I've correctly received everything up to and including n."

WHY GBN DISCARDS OUT-OF-ORDER PACKETS:
The receiver is kept intentionally simple — no buffering logic needed. The cost: if one packet is lost, the sender has to retransmit potentially a whole window of packets, even though the receiver already got some of them correctly. Those re-sent packets are just thrown away at the receiver again.

WORKED EXAMPLE (Window N=4, packet 2 is lost):
Sender sends 0,1,2,3. Packet 2 is lost en route.
→ Receiver gets 0 (ACK0), gets 1 (ACK1), skips 2, gets 3 (discards, re-sends ACK1).
→ Sender sends 4 and 5 (window slides on ACK0 and ACK1). Receiver discards both (re-sends ACK1 each time).
→ Timer for packet 2 expires → sender goes back and retransmits 2, 3, 4, 5 all over again.
→ Receiver now gets 2 (delivers, ACK2), 3 (ACK3), 4 (ACK4), 5 (ACK5). Done.

WINDOW SIZE LIMIT:
With a k-bit sequence number field, sequence numbers range from 0 to 2^k − 1.
Maximum GBN window size = 2^k − 1 (NOT 2^k).
Why not 2^k? If you use all 2^k sequence numbers as the window, and all ACKs for the first window get lost, the receiver can't tell if the next pkt0 it sees is a RETRANSMISSION of the old pkt0 or a brand NEW first packet of the next window. Keeping the window at 2^k − 1 prevents this ambiguity.

CLASSIC PYQ PROBLEM (GBN Window=3, every 5th transmission lost, send 10 packets):
Answer: 18 total transmissions. The key trick: count EVERY single transmission (originals + retransmissions) and mark the 5th, 10th, 15th, ... as lost. When a loss happens, GBN retransmits the lost packet AND everything else currently in the window.`,
    keyPoints: [
      "Window N = max in-flight (unACKed) packets at one time",
      "SENDER: one timer for the oldest unACKed packet; on timeout, retransmit ALL in-window",
      "RECEIVER: no buffer, discard all out-of-order packets, re-send last valid ACK",
      "ACKs are CUMULATIVE: ACK(n) = 'I got everything up to and including n'",
      "Window limit: max GBN window = 2^k − 1 (k-bit sequence number field)",
      "On timeout: 'go back' to base and retransmit all packets up to nextseqnum-1",
      "Classic PYQ: window=3, every 5th tx lost, send 10 pkts → 18 total transmissions",
    ],
    formula: {
      code: `GBN Window Constraint:
  k-bit sequence number → seq# range [0, 2^k − 1]
  Max window size N_max = 2^k − 1

  Example: k=3 bits → seq# 0–7 (8 values) → max N = 7

Sender constraint (can transmit while):
  nextseqnum < base + N

Receiver check:
  Accept packet only if seqnum == expectedseqnum

GBN PYQ: Window=3, every 5th tx lost, 10 packets → total tx?
  Tx# 1: P0  ✓   Tx# 2: P1  ✓   Tx# 3: P2  ✓
  Tx# 4: P3  ✓   Tx# 5: P4  ✗ LOST (5th tx)
    → window at loss: {P4, P5, P6}. Retransmit P4, P5, P6.
  Tx# 6: P4  ✓   Tx# 7: P5  ✓   Tx# 8: P6  ✓
  Tx# 9: P7  ✓   Tx#10: P8  ✗ LOST (10th tx)
    → window at loss: {P8, P9}. Retransmit P8, P9.
  Tx#11: P8  ✓   Tx#12: P9  ✓  ...continue...
  [Full trace gives 18 total] → Efficiency = 10/18 ≈ 0.556`,
      explanation:
        "Every loss in GBN cascades into retransmitting the whole window behind the lost packet. This is why the efficiency is lower than SR.",
    },
    examTips: [
      "GBN receiver = NO buffer. Out-of-order = DISCARD. This is tested every year.",
      "Max window = 2^k − 1, NOT 2^k. If they give k bits, subtract 1.",
      "GBN has ONE timer (for the oldest unACKed packet). SR has per-packet timers.",
      "On timeout: retransmit EVERYTHING from base to nextseqnum-1 (not just the lost one).",
      "Cumulative ACK: ACK(n) acknowledges 0 through n, not just n.",
      "PYQ every 5th tx lost pattern: count TOTAL transmissions (original + retransmit) for the 5th mark.",
      "Dec 2023 Q3.d and Jan-May 2024 Q3.c both asked the 'every 5th lost' GBN vs SR problem.",
    ],
    questions: [
      {
        q: "GBN, window size = 4, sequence numbers 0–7. Sender sends 0,1,2,3. Packet 2 is lost. What does the receiver do with packets 3, 4, 5?",
        a: "Receiver DISCARDS packets 3, 4, and 5 — they are out-of-order (arrived after the gap at 2). For each of them, the receiver re-sends ACK1 (the last in-order packet it received correctly). The receiver only has one variable (expectedseqnum=2) and waits for packet 2 to arrive.",
      },
      {
        q: "With a 3-bit sequence number field and GBN, what is the maximum window size? Why not 8?",
        a: "Max GBN window = 2^3 − 1 = 7. If window = 8 and the sender sends packets 0–7 and all 8 ACKs get lost, the receiver has advanced past packet 7 and is now waiting for packet 0 again. The sender retransmits packet 0, but the receiver can't tell if this is a retransmission of the old pkt0 or a brand new first packet. Using window=7 prevents this ambiguity.",
      },
      {
        q: "GBN, window N=4, seq#=0–7. Sender sends 0,1,2,3. Receives ACK1, then ACK3. Draw the window state at each step.",
        a: "Initial window: [0,1,2,3], sendbase=0, nextseqnum=4. After ACK1: window slides to [2,3,4,5], sendbase=2 (can now send pkts 4 and 5). After ACK3 (cumulative, covers 0–3): window slides to [4,5,6,7], sendbase=4 (can send pkts 6 and 7).",
      },
    ],
  },

  "selective-repeat": {
    title: "Selective Repeat (SR)",
    emoji: "🎯",
    tldr:
      "SR fixes GBN's waste: on timeout, retransmit ONLY the lost packet. The receiver has a buffer and individually ACKs every correct packet. Both sender and receiver maintain windows.",
    explanation: `Selective Repeat improves on GBN by not retransmitting packets the receiver already got correctly.

THE KEY DIFFERENCE FROM GBN:
• GBN retransmits: lost packet + everything that came after it in the window.
• SR retransmits: ONLY the lost packet.
• This requires the receiver to buffer out-of-order packets (unlike GBN which just discards them).

SENDER RULES:
• Window of N consecutive sequence numbers (same structure as GBN).
• SEPARATE TIMER per unACKed packet (not one shared timer like GBN).
• On timeout(n): retransmit only packet n. Start timer again.
• On ACK(n): mark packet n as received. If n == sendbase, advance sendbase forward to the next unACKed packet. If the window moves forward, send any new packets now in-window.
• On window full: refuse new data from application (same as GBN).

RECEIVER RULES (more complex than GBN):
• Accepts packets with sequence number in [rcvbase, rcvbase+N-1] (the receive window).
• If packet is in-order (seq == rcvbase): deliver to app, advance rcvbase, also deliver any consecutively buffered packets.
• If packet is out-of-order but within window: buffer it, send individual ACK(n).
• If packet's seq# is in [rcvbase-N, rcvbase-1] (already ACKed before): re-send ACK(n) anyway! (This is important — see below.)
• If outside both ranges: ignore.

WHY RE-ACK ALREADY-RECEIVED PACKETS?
Imagine the receiver already got and ACKed packet 0, but that ACK got lost. The sender's timer for packet 0 fires and it retransmits packet 0. The receiver must re-send ACK(0) so the sender's window can advance. Without re-ACKing, the sender is stuck forever.

WORKED EXAMPLE (N=4, packet 1 is lost, packets 0,2,3 received):
• Receiver: ACKs 0. Buffers 2, sends ACK2. Buffers 3, sends ACK3. rcvbase stays at 1 (waiting for 1).
• Sender: marks 0 as done. Marks 2 as done. Marks 3 as done. sendbase stays at 1. Timer for 1 runs independently.
• Timer for 1 fires → sender retransmits only pkt1.
• Receiver gets pkt1: now has 1,2,3. Delivers all three in order. rcvbase jumps to 4.
• Sender gets ACK1: all 0,1,2,3 are done. sendbase = 4.

WINDOW SIZE LIMIT (the SR dilemma):
Max SR window = 2^k / 2 (half the sequence number space).
Why? With k=2 bits (seq# 0–3), and SR window = 3:
• Sender sends pkts 0,1,2. All 3 ACKs get lost.
• Sender retransmits pkt0 (timeout).
• Receiver has moved its window to [3,0,1] — it's now waiting for pkt3 and new pkts 0,1.
• When the retransmitted pkt0 arrives, receiver THINKS it's a new pkt0 and accepts it — DUPLICATE DATA delivered to the application!
• This is the SR dilemma. Keeping window ≤ 2^k/2 prevents the receive and send windows from overlapping.

CLASSIC PYQ PROBLEM (SR Window=3, every 5th transmission lost, send 10 packets):
Answer: 12 total transmissions. Unlike GBN, only the lost packet gets retransmitted — not the entire window.
Efficiency = 10/12 = 5/6 ≈ 0.833 (much better than GBN's 10/18 ≈ 0.556).`,
    keyPoints: [
      "SR retransmits ONLY the lost packet (not the whole window like GBN)",
      "RECEIVER has a buffer — out-of-order packets are STORED, not discarded",
      "SENDER has per-packet timers (not one shared timer)",
      "Re-ACK packets already received (in case ACK was lost and sender retransmits)",
      "Window limit: max SR window = 2^k / 2 (half the sequence number space)",
      "SR dilemma: if window > 2^k/2, receiver may accept a duplicate as new data",
      "PYQ: SR window=3, every 5th lost, 10 pkts → 12 total tx. Efficiency = 5/6.",
    ],
    formula: {
      code: `SR Window Constraint:
  k-bit sequence number → seq# range [0, 2^k − 1]
  Max window size N_max = 2^k / 2

  Example: k=2 bits → seq# 0–3 (4 values) → max N = 4/2 = 2

SR Receiver window: [rcvbase, rcvbase + N - 1]
SR Sender window:   [sendbase, sendbase + N - 1]

SR PYQ: Window=3, every 5th tx lost, 10 packets → total tx?
  Tx# 1: P0  ✓   Tx# 2: P1  ✓   Tx# 3: P2  ✓
  Tx# 4: P3  ✓   Tx# 5: P4  ✗ LOST (5th tx)
    → SR: only P4 needs retransmit (P5,P6 continue normally!)
  Tx# 6: P5  ✓   Tx# 7: P6  ✓   Tx# 8: P7  ✓
  Tx# 9: P4  ✓ (P4's timer expired, retransmit only P4)
  Tx#10: P8  ✗ LOST (10th tx)
  Tx#11: P9  ✓   Tx#12: P8  ✓ (retransmit only P8)
  Total = 12 transmissions. Efficiency = 10/12 = 5/6 ≈ 0.833

4-bit seq#: GBN max = 2^4 − 1 = 15. SR max = 2^4 / 2 = 8.`,
      explanation:
        "SR is more efficient because it only retransmits what's needed. But it costs more memory at the receiver (needs buffering) and more complexity at the sender (per-packet timers).",
    },
    examTips: [
      "SR receiver BUFFERS out-of-order packets. GBN receiver DISCARDS them. This is the #1 tested difference.",
      "Max SR window = 2^k/2. Max GBN window = 2^k-1. Memorize both.",
      "SR has INDIVIDUAL ACKs per packet. GBN has CUMULATIVE ACKs.",
      "SR efficiency = 10/12. GBN efficiency = 10/18 (for the standard PYQ). SR > GBN always.",
      "Re-ACK rule: if a packet arrives that you already received before, re-send the ACK for it.",
      "Jan-May 2024 Q3.c and Dec 2023 Q3.d both tested GBN vs SR efficiency comparison.",
    ],
    questions: [
      {
        q: "SR, N=4. Sender sends 0,1,2,3. Pkt 1 is lost, 0,2,3 arrive. Describe what happens at the receiver.",
        a: "Receiver: gets pkt0 → delivers to app, ACKs 0, rcvbase=1. Gets pkt2 → out-of-order, buffers it, sends ACK2. Gets pkt3 → out-of-order, buffers it, sends ACK3. rcvbase stays at 1. When pkt1 finally arrives (after retransmit): receiver delivers 1, then delivers buffered 2 and 3, advances rcvbase to 4.",
      },
      {
        q: "Why must the SR receive window size be at most half the sequence number space?",
        a: "If SR window > 2^k/2, the send and receive windows can overlap in sequence number space. After one full window of packets with all ACKs lost, the sender retransmits pkt0. But the receiver's window has advanced — it's now waiting for a 'new' pkt0. It can't tell if the arriving pkt0 is a retransmission of the old one or a new packet, so it accepts the duplicate. SR dilemma. Using window ≤ 2^k/2 ensures no overlap.",
      },
      {
        q: "Jan-May 2024 Q3.c (6 marks): Window=3, 10 frames, every 5th transmission lost. Calculate total transmissions and efficiency ratio for GBN and SR.",
        a: "GBN: 18 total transmissions. Efficiency = 10/18 = 5/9 ≈ 0.556. SR: 12 total transmissions. Efficiency = 10/12 = 5/6 ≈ 0.833. SR is more efficient because it only retransmits the lost packet, not the entire window.",
      },
    ],
  },

  "gbn-vs-sr": {
    title: "GBN vs SR — Head to Head",
    emoji: "⚖️",
    tldr:
      "GBN is simpler (no receiver buffer) but wastes bandwidth on mass retransmissions. SR is smarter but needs receiver buffering and per-packet timers. Know the table cold — it's PYQ gold.",
    explanation: `Side-by-side comparison of the two pipelined reliable data transfer protocols.

THE CORE TRADE-OFF:
GBN: Simple receiver, complex (wasteful) retransmission. "Go back and redo everything."
SR: Smart receiver (with buffer), targeted retransmission. "Only fix what broke."

CONCEPTUAL ANALOGY:
GBN is like a teacher who, if one student didn't hear a sentence, repeats the entire lecture from that point.
SR is like a teacher who repeats only the specific sentence that was missed, and students buffer everything else.

WINDOW SIZE CONSTRAINT COMPARISON:
• GBN: max window = 2^k − 1 (one less than total sequence numbers)
  Why? Receiver can't tell new first packet from old retransmission if window = 2^k.
• SR: max window = 2^k / 2 (half the total sequence numbers)
  Why? Receive and send windows must not overlap in sequence number space.

WHEN DOES SR WIN?
When the network has high error rates. Retransmitting an entire window for each loss event (GBN) would fill the pipe with unwanted retransmissions. SR surgically fixes only what broke.

WHEN IS GBN ACCEPTABLE?
When error rates are low. The simplicity of the receiver (no buffering hardware/logic needed) is worth the occasional mass retransmission.

REAL TCP BEHAVIOUR:
TCP is somewhere in between. It uses cumulative ACKs (like GBN) but typically buffers out-of-order segments (like SR). It uses a combination of fast retransmit (similar to SR — retransmit only the missing segment) and cumulative ACK-driven recovery.`,
    keyPoints: [
      "GBN: cumulative ACKs, one timer, no receiver buffer, retransmit whole window",
      "SR: individual ACKs, per-packet timers, receiver buffer, retransmit only lost pkt",
      "GBN max window = 2^k − 1. SR max window = 2^k / 2",
      "SR is more bandwidth-efficient; GBN is simpler to implement",
      "Both are pipelined — multiple packets in flight simultaneously",
      "Real TCP: cumulative ACKs (like GBN) but buffers OOO segments (like SR)",
    ],
    formula: {
      code: `GBN vs SR Comparison Table:

Property              | Go-Back-N           | Selective Repeat
On timeout            | Retransmit window   | Retransmit only lost pkt
Receiver buffer       | No (discard OOO)    | Yes (buffer OOO)
ACK type              | Cumulative          | Individual per packet
Timer(s)              | One (oldest unACKed)| Per packet
Max window (k-bit)    | 2^k − 1             | 2^k / 2
Bandwidth efficiency  | Lower               | Higher
Receiver complexity   | Low                 | Higher
Sender complexity     | Moderate            | Higher

PYQ Quick Numbers (k=3 bits → 8 seq#s):
  GBN max window = 7
  SR  max window = 4

PYQ Quick Numbers (k=4 bits → 16 seq#s):
  GBN max window = 15
  SR  max window = 8`,
      explanation:
        "Memorize this table. Half the marks in sliding window PYQs come from correctly applying the window constraints and knowing which protocol retransmits what.",
    },
    examTips: [
      "Table-format questions appear in almost every exam — learn the 6-row comparison table.",
      "GBN: 'cumulative ACK' + 'discard OOO' are the two most-tested receiver facts.",
      "SR: 'individual ACK' + 'buffer OOO' + 'per-packet timer' are the three most-tested facts.",
      "Window constraint: k=3 → GBN=7, SR=4. k=4 → GBN=15, SR=8. Practice all k values.",
      "Efficiency ratio is always 10/18 vs 10/12 for the standard PYQ (window=3, every 5th lost).",
    ],
    questions: [
      {
        q: "A link uses a 4-bit sequence number. What are the maximum window sizes for GBN and SR?",
        a: "4-bit seq# → 2^4 = 16 values (0–15). GBN max window = 2^4 − 1 = 15. SR max window = 2^4 / 2 = 8.",
      },
      {
        q: "Why does SR need per-packet timers while GBN only needs one?",
        a: "In GBN, on any timeout, you retransmit ALL in-window packets starting from the lost one. A single timer for the oldest unACKed packet is enough — when it fires, you redo everything. In SR, you retransmit ONLY the specific packet whose timer fired. You need separate timers because different packets may time out at different times, and you must know which exact packet to retransmit.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 🔗 TCP PROTOCOL
  // ══════════════════════════════════════════

  "tcp-overview": {
    title: "TCP: Overview & Segment Structure",
    emoji: "🔗",
    tldr:
      "TCP = connection-oriented, reliable, full-duplex, byte-stream protocol. 20-byte header. Sequence numbers count BYTES, not segments. ACK = next byte expected (cumulative).",
    explanation: `TCP (Transmission Control Protocol) is THE transport layer protocol of the Internet.

KEY PROPERTIES:
• Connection-oriented: must do a 3-way handshake before any data is sent.
• Reliable: guarantees every byte arrives correctly and in order.
• Full-duplex: both sides can send and receive simultaneously in the same connection.
• Byte-stream: TCP sees data as a continuous stream of bytes, not as discrete messages. There are no message boundaries.
• Point-to-point: one sender, one receiver. No multicast in TCP.
• Pipelined: many segments can be in-flight at once (window = min(cwnd, rwnd)).

SEQUENCE NUMBERS — VERY IMPORTANT:
TCP numbers BYTES, not packets. If MSS=1000 bytes:
• Segment 1 has seq# 0 (carries bytes 0–999)
• Segment 2 has seq# 1000 (carries bytes 1000–1999)
• Segment 3 has seq# 2000 (carries bytes 2000–2999)
The sequence number of a segment = byte-stream number of its FIRST byte.

ACK NUMBERS:
ACK# = the next byte the receiver is EXPECTING. It's a cumulative ACK.
If receiver got bytes 0–535, it sends ACK=536 (expecting byte 536 next).
If a gap exists (e.g., bytes 0–89 received, 90–109 missing, 110+ received), ACK stays at 90.

MSS vs MTU:
• MTU (Maximum Transmission Unit) = largest frame the link layer can carry (typically 1500 bytes for Ethernet).
• MSS (Maximum Segment Size) = max APPLICATION DATA in a TCP segment = MTU − 40 bytes (20 IP header + 20 TCP header) = 1460 bytes typically.
• MSS is about the DATA field only — not including TCP/IP headers.

TCP SEGMENT STRUCTURE (20-byte fixed header):
• Source port (16 bits): sender's port
• Destination port (16 bits): receiver's port
• Sequence number (32 bits): byte-stream offset of first byte of this segment's data
• Acknowledgment number (32 bits): next byte expected from the other side
• Header length (4 bits): header size in 32-bit words (min=5 words = 20 bytes)
• Flags (6 bits): URG, ACK, PSH, RST, SYN, FIN
  - ACK: acknowledgment number is valid
  - SYN: connection setup (synchronize sequence numbers)
  - FIN: connection teardown (sender finished sending)
  - RST: reset connection (error — abort immediately)
  - PSH: push data to app immediately (don't buffer)
  - URG: urgent data (rarely used)
• Receive window (16 bits): how many bytes receiver can accept (flow control)
• Checksum (16 bits): error detection over header + data
• Urgent pointer (16 bits): used only if URG flag set

TCP CONNECTION: 4-TUPLE DEMULTIPLEXING
The OS identifies a TCP connection by 4 values: (source IP, source port, dest IP, dest port).
Two connections to the same web server (port 80) are distinguished by their different source IP+port. This allows one server to handle millions of simultaneous connections on port 80.`,
    keyPoints: [
      "TCP = connection-oriented, reliable, full-duplex, byte-stream, point-to-point",
      "Sequence numbers count BYTES, not segments — seq# = first byte of that segment",
      "ACK# = next byte expected (cumulative ACK)",
      "MSS = MTU − 40 = 1460 bytes for Ethernet (data field only, not headers)",
      "TCP header = 20 bytes fixed (source port, dest port, seq#, ACK#, flags, rwnd, checksum)",
      "SYN consumes 1 sequence number; FIN consumes 1 sequence number",
      "4-tuple (src IP, src port, dst IP, dst port) uniquely identifies a TCP connection",
    ],
    formula: {
      code: `TCP Segment Fields (20-byte fixed header):

Field               | Size    | Purpose
Source port         | 16 bits | Sender's port number
Destination port    | 16 bits | Receiver's port number
Sequence number     | 32 bits | First byte of this segment's data
Acknowledgment #    | 32 bits | Next byte expected (cumulative ACK)
Header length       | 4 bits  | In 32-bit words; min=5 → 20 bytes
Flags               | 6 bits  | URG,ACK,PSH,RST,SYN,FIN
Receive window      | 16 bits | Flow control (bytes receiver can accept)
Checksum            | 16 bits | Error detection
Urgent pointer      | 16 bits | Only if URG set

Sequence number logic:
  Seg 1: seq = ISN (initial) → carries bytes ISN .. ISN+MSS-1
  Seg 2: seq = ISN + MSS    → carries bytes ISN+MSS .. ISN+2MSS-1

ACK logic (cumulative):
  Received bytes 0–535 from B → A sends ACK = 536

MSS formula:
  MSS = MTU − IP_header − TCP_header
  MSS = 1500 − 20 − 20 = 1460 bytes (Ethernet)`,
      explanation:
        "Sequence and ACK numbers are the most tested TCP fields. Always think in terms of bytes, never packets.",
    },
    examTips: [
      "Sequence numbers count BYTES. MSS = 1000B → seg2 starts at seq 1000, not seq 2.",
      "ACK# = next byte expected, NOT the byte just received. Got byte 126 → send ACK=127.",
      "Ports are REVERSED: if A uses src=302, dst=80, then B replies with src=80, dst=302.",
      "SYN and FIN each consume exactly ONE sequence number (even though they carry no data).",
      "MSS is about the DATA ONLY. The 20-byte TCP header is NOT counted in MSS.",
      "May 2023 Q3.a (8 marks) tested segment 2 seq#, ACK from receiver, and timing diagram.",
      "4-tuple demultiplexing: TCP uses ALL FOUR fields (not just port) to identify a connection.",
    ],
    questions: [
      {
        q: "May 2023 Q3.a: Host A and B communicate over TCP. B received all bytes through 126. A sends Segment 1 (80 bytes, seq=127, src=302, dst=80). What are the seq#, src port, and dst port of Segment 2 (40 bytes)?",
        a: "Segment 2 starts at byte 127+80=207. So: seq# = 207. src port = 302 (same connection, same ports). dst port = 80. Port numbers are fixed for the lifetime of the connection.",
      },
      {
        q: "If Segment 1 (seq=127, 80 bytes) arrives at B first, what ACK does B send?",
        a: "B received bytes 127–206 (80 bytes starting at 127). ACK# = 127+80 = 207 (next byte expected). Source port of B's ACK = 80 (B's port). Destination port = 302 (A's port — reversed).",
      },
      {
        q: "Jul 2023 Q3.d: Segment 1 has seq=90, Segment 2 has seq=110. (a) How many bytes in Segment 1? (b) If Seg 1 is lost and Seg 2 arrives, what ACK does B send?",
        a: "(a) Segment 2 starts at byte 110, so Segment 1 contains bytes 90–109. That's 110−90 = 20 bytes. (b) B received bytes 110+ but there's a gap at 90–109. Cumulative ACK cannot advance past the gap. B sends ACK = 90 (still waiting for byte 90).",
      },
    ],
  },

  "tcp-rtt": {
    title: "TCP: RTT Estimation & Timeout",
    emoji: "⏱️",
    tldr:
      "Too short a timeout → unnecessary retransmissions. Too long → slow loss recovery. TCP uses EWMA (exponentially weighted moving average) for RTT and sets timeout = EstimatedRTT + 4×DevRTT.",
    explanation: `TCP needs to decide how long to wait before declaring a segment lost and retransmitting it. This is the timeout interval.

THE CHALLENGE:
• Too short: times out even when the segment is just slow → wasted bandwidth on unnecessary retransmissions.
• Too long: takes forever to react to a real loss → application sees huge delays.

The right timeout should be "just a little more than the actual RTT."

SAMPLERTTT:
The time from when a segment is sent to when its ACK is received. NOT measured for retransmitted segments (you can't tell if the ACK is for the original or the retransmit — this is Karn's ambiguity problem).

ESTIMATEDRTT (Exponential Weighted Moving Average — EWMA):
EstimatedRTT = (1 − α) × EstimatedRTT + α × SampleRTT
With α = 0.125 (= 1/8):
• 87.5% weight on the old estimate, 12.5% on the new sample.
• Smooths out fluctuations. Old samples decay exponentially — they matter less and less over time.
• "EWMA" = the current estimate is biased toward recent samples but not dominated by any one sample.

DEVRTT (RTT Variability):
DevRTT = (1 − β) × DevRTT + β × |SampleRTT − EstimatedRTT|
With β = 0.25 (= 1/4):
• Measures how much RTT fluctuates. A safety margin.
• When RTT is stable: DevRTT is small → tight timeout.
• When RTT is erratic: DevRTT is large → generous timeout.

TIMEOUTINTERVAL:
TimeoutInterval = EstimatedRTT + 4 × DevRTT
• The 4× factor: provides enough safety margin that a packet is almost never declared lost just because of natural RTT variation.
• If DevRTT = 0 (rock-stable RTT): timeout = EstimatedRTT.
• If DevRTT is large: timeout expands proportionally.

ON TIMEOUT EVENT (TCP):
• Double the TimeoutInterval (exponential backoff). This prevents a retransmission storm if the network is truly congested.
• After successful ACKs resume, EstimatedRTT takes over again.`,
    keyPoints: [
      "SampleRTT = actual measured time from send to ACK (not for retransmitted segs)",
      "EstimatedRTT = EWMA with α=0.125: 87.5% old + 12.5% new sample",
      "DevRTT = EWMA of |SampleRTT − EstimatedRTT| with β=0.25",
      "TimeoutInterval = EstimatedRTT + 4×DevRTT",
      "On timeout: double the TimeoutInterval (exponential backoff)",
      "Karn's rule: don't measure SampleRTT for retransmitted segments (ambiguity)",
      "DevRTT acts as the safety margin — scales with RTT variability",
    ],
    formula: {
      code: `RTT Estimation Formulas:

EstimatedRTT = (1 − 0.125) × EstimatedRTT + 0.125 × SampleRTT
             = 0.875 × EstimatedRTT + 0.125 × SampleRTT

DevRTT = (1 − 0.25) × DevRTT + 0.25 × |SampleRTT − EstimatedRTT|
       = 0.75 × DevRTT + 0.25 × |SampleRTT − EstimatedRTT|

TimeoutInterval = EstimatedRTT + 4 × DevRTT

Worked PYQ Example:
  Given: EstimatedRTT = 100ms, DevRTT = 20ms, new SampleRTT = 150ms.

  New EstimatedRTT = 0.875 × 100 + 0.125 × 150
                   = 87.5 + 18.75 = 106.25 ms

  New DevRTT = 0.75 × 20 + 0.25 × |150 − 100|
             = 15 + 0.25 × 50
             = 15 + 12.5 = 27.5 ms

  New TimeoutInterval = 106.25 + 4 × 27.5
                      = 106.25 + 110 = 216.25 ms`,
      explanation:
        "α=0.125 and β=0.25 are RFC values. You'll always be given these. Just plug in and compute step by step.",
    },
    examTips: [
      "α = 0.125 = 1/8. β = 0.25 = 1/4. Memorize these constants.",
      "EstimatedRTT = 0.875×old + 0.125×new. DevRTT = 0.75×old + 0.25×|diff|.",
      "Timeout = EstimatedRTT + 4×DevRTT. The 4× is always tested.",
      "SampleRTT is NOT measured for retransmitted segments — Karn's rule.",
      "On timeout: DOUBLE the timeout (exponential backoff) — don't recalculate from formula.",
      "This type of numerical is a common 3–5 mark question in all exam papers.",
    ],
    questions: [
      {
        q: "Why is SampleRTT not measured for retransmitted segments?",
        a: "Karn's ambiguity problem: if a segment is retransmitted and then an ACK arrives, you can't tell if the ACK is for the original transmission or the retransmission. Using this ambiguous RTT sample would corrupt EstimatedRTT. So TCP ignores SampleRTT for all retransmitted segments to avoid this problem.",
      },
      {
        q: "Why multiply DevRTT by 4 in the timeout formula?",
        a: "DevRTT is a measure of RTT variability — how unpredictable the RTT is. Multiplying by 4 provides a generous safety margin so that normal RTT fluctuations don't falsely trigger a timeout. If the RTT is stable (DevRTT ≈ 0), the timeout is tight (≈ EstimatedRTT). If the RTT is very variable, the timeout grows proportionally to avoid false timeouts.",
      },
    ],
  },

  "tcp-flow-control": {
    title: "TCP: Flow Control",
    emoji: "🚰",
    tldr:
      "Flow control prevents the sender from overwhelming the receiver's buffer. The receiver advertises rwnd (free space) in every ACK. Sender ensures unACKed data ≤ rwnd. If rwnd=0, sender sends 1-byte probes.",
    explanation: `Flow control solves a mismatch: the network can deliver data faster than the application reads it from the receive buffer. Without flow control, the buffer overflows and data is silently lost.

RECEIVE BUFFER:
The OS allocates a receive buffer (RcvBuffer) for each TCP connection. The application process reads from this buffer, but may read slowly (e.g., it's doing other work).

KEY VARIABLES AT RECEIVER:
• RcvBuffer: total buffer size (fixed, typically 4096 bytes or more).
• LastByteRcvd: last byte that arrived from the network and was stored in the buffer.
• LastByteRead: last byte that the APPLICATION actually read from the buffer.

OVERFLOW CONSTRAINT:
LastByteRcvd − LastByteRead ≤ RcvBuffer (buffer must not overflow)

RECEIVE WINDOW (rwnd):
rwnd = RcvBuffer − (LastByteRcvd − LastByteRead)
This is the FREE SPACE in the receive buffer.
The receiver puts this value in the "receive window" field of every TCP segment it sends back to the sender.

SENDER CONSTRAINT:
The sender must ensure:
LastByteSent − LastByteAcked ≤ rwnd
Unacknowledged data in the network ≤ free space at receiver.

THE ZERO WINDOW PROBLEM:
What if rwnd drops to 0? The sender STOPS sending data. Now the receiver has nothing coming in — so it has nothing to ACK — so it never tells the sender that buffer space freed up. DEADLOCK!

SOLUTION: When rwnd = 0, the sender MUST keep sending 1-byte probe segments periodically. The receiver ACKs these probes. When the buffer frees up, the ACK will contain a non-zero rwnd, and normal transmission resumes.

FLOW CONTROL vs CONGESTION CONTROL:
• Flow control: protects the RECEIVER's buffer. Controlled by rwnd.
• Congestion control: protects the NETWORK. Controlled by cwnd.
• TCP effective window = min(rwnd, cwnd).`,
    keyPoints: [
      "Flow control = don't overwhelm the receiver's buffer (different from congestion control)",
      "rwnd = RcvBuffer − (LastByteRcvd − LastByteRead) — free space in receive buffer",
      "Receiver puts rwnd in every segment header; sender must keep unACKed data ≤ rwnd",
      "Sender constraint: LastByteSent − LastByteAcked ≤ rwnd",
      "If rwnd = 0: sender sends 1-byte probes periodically (prevents deadlock)",
      "Flow control → rwnd. Congestion control → cwnd. Both together: min(rwnd, cwnd).",
    ],
    formula: {
      code: `Flow Control Formulas:

Receive window:
  rwnd = RcvBuffer − (LastByteRcvd − LastByteRead)

Sender constraint:
  LastByteSent − LastByteAcked ≤ rwnd

Overflow constraint:
  LastByteRcvd − LastByteRead ≤ RcvBuffer

Worked Example:
  RcvBuffer = 4096 bytes
  LastByteRcvd = 3000
  LastByteRead = 1500

  rwnd = 4096 − (3000 − 1500)
       = 4096 − 1500 = 2596 bytes

  Can sender send a 1200-byte segment?
  2596 ≥ 1200 → YES, the sender can send it.

Zero window scenario:
  rwnd = 0 → sender CANNOT send data
  Solution: sender sends 1-byte probe segments periodically
  → receiver ACKs with updated (non-zero) rwnd when buffer frees up`,
      explanation:
        "rwnd is advertised by the receiver in every TCP segment. The sender uses it as the upper bound on how much data it can have outstanding.",
    },
    examTips: [
      "rwnd = RcvBuffer − (LastByteRcvd − LastByteRead). Plug in and compute.",
      "Flow control = receiver concern. Congestion control = network concern. Know the difference.",
      "rwnd = 0 → sender probes with 1 byte. This prevents the silent deadlock.",
      "LastByteSent − LastByteAcked ≤ rwnd is the sender's constraint. Always check this.",
      "TCP effective window (for both) = min(cwnd, rwnd) — both must be satisfied.",
    ],
    questions: [
      {
        q: "RcvBuffer = 4096 bytes, LastByteRcvd = 3000, LastByteRead = 1500. What is rwnd? Can the sender transmit a 1200-byte segment?",
        a: "rwnd = 4096 − (3000 − 1500) = 4096 − 1500 = 2596 bytes. Yes, the sender can transmit 1200 bytes because 2596 > 1200. The receiver has enough free buffer space.",
      },
      {
        q: "What happens when rwnd = 0? Why doesn't the sender just wait silently?",
        a: "If the sender waits silently, it never learns when buffer space frees up. The receiver only sends ACKs in response to incoming data — with no incoming data, the receiver never sends a new rwnd update. The sender and receiver would deadlock forever. The fix: sender keeps sending 1-byte probe segments. The receiver ACKs these probes, and when the buffer empties, the ACK contains a non-zero rwnd and normal transmission resumes.",
      },
    ],
  },

  "tcp-connection": {
    title: "TCP: Connection Management (3-way Handshake & Teardown)",
    emoji: "🤝",
    tldr:
      "TCP needs 3 messages to open (SYN → SYNACK → ACK) and 4 to close (FIN → ACK → FIN → ACK). ISNs are exchanged during setup. TIME_WAIT state gives the final ACK time to be retransmitted if lost.",
    explanation: `TCP is connection-oriented — you must set up the connection before sending data and tear it down afterward.

THREE-WAY HANDSHAKE (Connection Setup):

Step 1 — SYN (Client → Server):
• Client picks a random Initial Sequence Number (ISN), call it x.
• Sends: SYN=1, seq=x. No data. This segment consumes ONE sequence number.
• Client enters state: SYN_SENT.
• Why random ISN? Security — prevents an attacker from injecting fake segments into the connection.

Step 2 — SYNACK (Server → Client):
• Server receives SYN. Allocates buffer and variables for the connection.
• Server picks its own random ISN, call it y.
• Sends: SYN=1, seq=y, ACK=1, ACKnum=x+1 (acknowledges client's x, expects x+1 next).
• This is the SYNACK segment. Server enters state: SYN_RCVD.

Step 3 — ACK (Client → Server):
• Client receives SYNACK. Allocates its buffers.
• Sends: ACK=1, ACKnum=y+1 (acknowledges server's y). SYN=0 (connection established).
• This segment CAN carry data (the first client data).
• Both sides enter state: ESTABLISHED.

Why 3 messages? A 2-way handshake (SYN+SYNACK) can't confirm that the client got the server's ISN (y). The third ACK (ACKnum=y+1) confirms it. Both sides know both ISNs are confirmed.

CONNECTION TEARDOWN (4 messages):

Step 1: Client sends FIN=1, seq=x. Client enters FIN_WAIT_1.
Step 2: Server sends ACK, ACKnum=x+1. Server enters CLOSE_WAIT (can still send data). Client enters FIN_WAIT_2.
Step 3: Server finishes its data, sends FIN=1, seq=y. Server enters LAST_ACK.
Step 4: Client sends ACK, ACKnum=y+1. Client enters TIME_WAIT.
  → After TIME_WAIT expires: CLOSED.
  → Server: receives final ACK → CLOSED.

Why 4 messages? TCP is full-duplex — each DIRECTION is closed independently. Client closes its direction first (FIN+ACK). Then server closes its direction (FIN+ACK). Four messages total.

TIME_WAIT STATE:
After the client sends the final ACK, it waits for 2×MSL (Maximum Segment Lifetime, typically 30s–2min) before truly closing. Why? If the client's final ACK to the server is lost, the server will retransmit its FIN. The client, still in TIME_WAIT, can re-send the ACK. Without TIME_WAIT, the client would have closed its socket and couldn't respond — the server would be stuck in LAST_ACK forever.

HANDLING RST (Reset Segment):
If a TCP segment arrives for a port with no open socket (e.g., port 80 but no web server running), the OS sends a TCP RST segment (RST=1) back to the sender. RST = "I don't have a socket for this. Stop sending." 
For UDP, the OS sends an ICMP Port Unreachable message instead.`,
    keyPoints: [
      "3-way handshake: SYN (client) → SYNACK (server) → ACK (client) = ESTABLISHED",
      "ISN is random to prevent security attacks; both sides exchange their ISN",
      "SYN consumes 1 seq# (even no data). FIN also consumes 1 seq#.",
      "4-way teardown: FIN → ACK → FIN → ACK (each direction closed independently)",
      "TIME_WAIT: client waits 2×MSL so it can re-send final ACK if lost",
      "RST flag: sent when segment arrives at a closed port (UDP uses ICMP instead)",
      "Client states: CLOSED→SYN_SENT→ESTABLISHED→FIN_WAIT_1→FIN_WAIT_2→TIME_WAIT→CLOSED",
    ],
    formula: {
      code: `Three-Way Handshake:

  Client              Server
  |── SYN, seq=x ──────────────────►|  Client: SYN_SENT
  |◄── SYNACK, seq=y, ACK=x+1 ──────|  Server: SYN_RCVD
  |── ACK, ACK=y+1 [+data?] ────────►|  Both: ESTABLISHED

Connection Teardown (4 messages):
  Client              Server
  |── FIN=1, seq=x ───────────────►|  Client: FIN_WAIT_1
  |◄── ACK, ACK=x+1 ────────────────|  Server: CLOSE_WAIT; Client: FIN_WAIT_2
  |◄── FIN=1, seq=y ────────────────|  Server: LAST_ACK
  |── ACK, ACK=y+1 ────────────────►|  Client: TIME_WAIT (2×MSL) → CLOSED
                                        Server: CLOSED

State sequences:
  Client: CLOSED→SYN_SENT→ESTABLISHED→FIN_WAIT_1→FIN_WAIT_2→TIME_WAIT→CLOSED
  Server: CLOSED→LISTEN→SYN_RCVD→ESTABLISHED→CLOSE_WAIT→LAST_ACK→CLOSED`,
      explanation:
        "Draw this diagram from memory for the exam. The state names are frequently tested.",
    },
    examTips: [
      "3-way handshake: SYN, SYNACK, ACK. Server also sets SYN=1 in SYNACK.",
      "ACKnum in SYNACK = client_ISN + 1. ACKnum in final ACK = server_ISN + 1.",
      "SYN consumes 1 seq# → first data byte from client has seq# = client_ISN + 1.",
      "TIME_WAIT is the client state, NOT the server. Duration = 2×MSL.",
      "May 2023 Q3.d and Dec 2023 Q3.c tested 3-way handshake explanation.",
      "RST for TCP mismatched port. ICMP for UDP mismatched port. Classic trick question.",
      "Why 3 and not 2? Because 2-way can't confirm both ISNs. Third ACK confirms server's ISN.",
    ],
    questions: [
      {
        q: "May 2023 Q3.d: Explain the three-way handshake. What is the role of SYN and FIN bits?",
        a: "SYN (Synchronize): set in the first two messages of the handshake. Used to initiate a connection and synchronize sequence numbers. A SYN segment consumes one sequence number — so the first DATA byte from the client has seq = client_ISN + 1. FIN (Finish): signals that the sender has no more data to send. Also consumes one sequence number. Two FINs are needed (one per direction) because TCP is full-duplex — each side must explicitly close its outgoing stream.",
      },
      {
        q: "Why is the client's final ACK sent in the TIME_WAIT state, not immediately in CLOSED?",
        a: "The client's final ACK (to the server's FIN) might get lost. If it does, the server retransmits its FIN. If the client had already moved to CLOSED, it would have no socket to receive this retransmitted FIN and couldn't re-send the ACK. The server would be stuck in LAST_ACK forever. TIME_WAIT keeps the client's socket alive long enough (2×MSL) to handle this retransmission.",
      },
      {
        q: "Jan-May 2024 Q2.a: You have two browser tabs open (one to pesuacademy, one to Medium). Both use TCP. How does the OS know which segment belongs to which tab?",
        a: "TCP uses 4-tuple demultiplexing: (source IP, source port, destination IP, destination port). Both tabs may use destination port 443 (HTTPS) on your machine, but they connect to different servers (different destination IPs and ports). The OS matches all 4 fields to find the exact socket. Even two connections to the same server are distinguished by the different source port numbers your OS assigned to each.",
      },
    ],
  },

  "tcp-rdt": {
    title: "TCP: Reliable Data Transfer & Fast Retransmit",
    emoji: "📬",
    tldr:
      "TCP uses ACKs, timers, and fast retransmit (3 duplicate ACKs) to recover from loss. Receiver uses delayed ACKs and immediately ACKs out-of-order segments. Fast retransmit doesn't wait for timeout.",
    explanation: `TCP's reliable data transfer is built on: sequence numbers, cumulative ACKs, timers, and fast retransmit.

ACK GENERATION RULES (AT THE RECEIVER):

| Receiver Event | Action |
|---|---|
| In-order segment, no pending ACK | Wait up to 500ms for next segment (delayed ACK) |
| In-order segment, one pending delayed ACK | Immediately send cumulative ACK for both |
| Out-of-order segment (gap detected) | Immediately send duplicate ACK for last in-order byte |
| Segment fills a gap | Immediately send ACK if segment starts at the low end of gap |

WHY DELAYED ACK?
If sender sends two back-to-back segments, the receiver can acknowledge both with one ACK. This halves ACK traffic. The 500ms wait gives time for the second segment to arrive.

WHY IMMEDIATE DUPLICATE ACK ON OUT-OF-ORDER?
Fast retransmit is triggered by 3 duplicate ACKs. If the receiver waits 500ms to send each duplicate ACK, the sender waits too long to notice the loss. Immediate duplicate ACKs speed up the detection.

FAST RETRANSMIT:
If the sender receives 3 DUPLICATE ACKs for sequence number n (same ACK# sent 3 extra times = 4 total ACKs for n), the sender immediately retransmits the segment starting at byte n WITHOUT waiting for the timer to expire.

Why 3 duplicate ACKs = loss?
• 1 duplicate ACK: maybe just a reordering.
• 2 duplicate ACKs: probably reordering, but concerning.
• 3 duplicate ACKs: almost certainly the segment is lost. The 3 later segments after it DID arrive (that's what generated 3 dup ACKs), so the network is working — just one segment was dropped.
• Fast retransmit avoids the timeout delay, which could be hundreds of milliseconds.

TIMING DIAGRAM ANALYSIS (Cumulative ACK):
If A sends seg1 (seq=127, 80 bytes) and seg2 (seq=207, 40 bytes), and ACK for seg1 is lost but ACK for seg2 (ACK=247) arrives:
• ACK=247 is a CUMULATIVE ACK — it covers everything up to byte 246.
• So even though A never got the individual ACK=207, the ACK=247 tells A that bytes 0–246 were all received.
• A can advance its window to byte 247. No retransmission needed.`,
    keyPoints: [
      "Delayed ACK: wait up to 500ms for next in-order segment before ACKing",
      "Out-of-order segment: IMMEDIATELY send duplicate ACK (no 500ms delay)",
      "Fast retransmit: 3 duplicate ACKs → immediately retransmit missing segment (no timeout)",
      "Cumulative ACK: ACK=247 means all bytes through 246 were received, even if intermediate ACKs were lost",
      "3 dup ACKs indicate 3 later segments arrived → network is working, just one packet dropped",
      "Fast retransmit much faster than timeout — timeout can take seconds in congested network",
    ],
    formula: {
      code: `ACK Generation at TCP Receiver:

Event                           | Action
In-order, no pending ACK        | Delayed ACK (up to 500ms)
In-order, one pending ACK       | Send cumulative ACK immediately
Out-of-order (gap detected)     | Immediate duplicate ACK
Segment fills gap (low end)     | Immediate ACK

Fast Retransmit Rule:
  3 duplicate ACKs for seq# n → retransmit segment at n immediately
  (Don't wait for timer — this is faster!)

Example — Fast Retransmit:
  Sender sends: seq=100(20B), seq=120(20B), seq=140(20B), seq=160(20B)
  Segment starting at 120 is LOST. Receiver gets 100, 140, 160.

  Receives seq=100 → ACK=120 (normal, next expected)
  Receives seq=140 → gap at 120! → duplicate ACK=120
  Receives seq=160 → gap still there → duplicate ACK=120
  Sender: has received 3 duplicate ACK=120 → fast retransmit seq=120!

Cumulative ACK — timing diagram:
  Host A sends seg1(seq=127,80B) and seg2(seq=207,40B)
  ACK=207 gets LOST. ACK=247 arrives.
  → ACK=247 covers bytes 0–246 cumulatively.
  → A doesn't need to retransmit anything — 247 confirms all of it.`,
      explanation:
        "Fast retransmit is the key optimization over pure timeout-based recovery. It can trigger retransmission hundreds of milliseconds before the timer would have fired.",
    },
    examTips: [
      "Delayed ACK only for IN-ORDER segments. Out-of-order → IMMEDIATE duplicate ACK.",
      "Fast retransmit = 3 duplicate ACKs (= 4 total ACKs for the same seq#).",
      "After fast retransmit in Reno: cwnd is halved, enter fast recovery (NOT slow start).",
      "Cumulative ACK: a later ACK implicitly covers all missing earlier ACKs.",
      "May 2023 Q3.a part 4 tested the timing diagram with a lost ACK — draw it for practice.",
    ],
    questions: [
      {
        q: "TCP sender sent segments at seq=100, 120, 140, 160 (20 bytes each). Segment 120 is lost. What ACKs does the receiver send for 100, 140, 160?",
        a: "Receives seq=100 → normal ACK=120 (next byte expected). Receives seq=140 → gap at 120–139, out-of-order! → immediate duplicate ACK=120. Receives seq=160 → gap still there → duplicate ACK=120. Sender now has 3 duplicate ACK=120 → fast retransmit: retransmits segment starting at 120 without waiting for timeout.",
      },
      {
        q: "Why does TCP have a delayed ACK mechanism? When is it NOT applied?",
        a: "Delayed ACK: if an in-order segment arrives and there's nothing pending, wait up to 500ms in case another segment arrives — then send one combined ACK for both. This halves ACK traffic. However, when an out-of-order segment arrives (gap detected), the receiver sends an immediate duplicate ACK — no waiting. Speed of loss detection matters more than reducing ACK traffic in the out-of-order case.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 📈 TCP CONGESTION CONTROL
  // ══════════════════════════════════════════

  "tcp-congestion": {
    title: "TCP Congestion Control: AIMD, Slow Start, Congestion Avoidance",
    emoji: "📈",
    tldr:
      "Congestion = too many sources sending too fast for the network. TCP uses AIMD: probe for bandwidth by adding 1 MSS/RTT, back off to cwnd/2 on loss. Three phases: Slow Start (exponential), Congestion Avoidance (linear), Fast Recovery.",
    explanation: `Congestion is when too much data floods the network faster than routers can handle it. The result: router buffers overflow → packet drops → massive retransmissions → even worse congestion (congestion collapse).

WHY CONGESTION IS BAD (three scenarios from Kurose):
1. Infinite buffers: delay → ∞ as load approaches capacity. Throughput saturates at R/2.
2. Finite buffers: retransmissions waste bandwidth. Premature timeouts create duplicates — waste even more.
3. Multi-hop: when a packet is dropped deep in the network, ALL upstream bandwidth used to carry it to that point is completely wasted.

HOW TCP LIMITS SEND RATE (CONGESTION WINDOW — cwnd):
TCP sender keeps a variable cwnd. The constraint is:
LastByteSent − LastByteAcked ≤ min(cwnd, rwnd)
Send rate ≈ cwnd / RTT (bytes per second).

HOW TCP DETECTS CONGESTION (loss events):
• Timeout: severe congestion — probably many buffers overflowed.
• Triple duplicate ACK (3 dup ACKs): milder event — network still working, just one packet dropped.

THE AIMD ALGORITHM:
• Additive Increase (AI): during congestion avoidance, add 1 MSS per RTT. Linear growth.
• Multiplicative Decrease (MD): on congestion, halve cwnd. Aggressive backoff.
• This produces the sawtooth pattern — TCP constantly probes upward, backs off on loss.

THREE PHASES OF TCP CONGESTION CONTROL:

PHASE 1 — SLOW START:
• Start: cwnd = 1 MSS.
• For every ACK received: cwnd += 1 MSS. This doubles cwnd every RTT (exponential growth).
• Despite the name "slow start," growth is actually very fast (exponential). It just STARTS at 1 MSS.
• Continues until: cwnd reaches ssthresh (slow start threshold), OR a loss event occurs.
• On timeout: ssthresh = cwnd/2, cwnd = 1 MSS → restart slow start.
• On 3 dup ACKs: ssthresh = cwnd/2, cwnd = ssthresh + 3 → enter fast recovery.

PHASE 2 — CONGESTION AVOIDANCE:
• Entered when cwnd ≥ ssthresh.
• For each ACK: cwnd += MSS × (MSS/cwnd). This gives approximately +1 MSS per RTT. Linear growth.
• The "probe carefully" phase — TCP knows it's been near capacity before.
• On timeout: ssthresh = cwnd/2, cwnd = 1 MSS → go back to slow start.
• On 3 dup ACKs: ssthresh = cwnd/2, cwnd = ssthresh + 3 → enter fast recovery.

PHASE 3 — FAST RECOVERY (TCP Reno only):
• Entered on 3 duplicate ACKs.
• cwnd = ssthresh + 3 (the +3 accounts for 3 dup ACKs that implicitly show 3 segments left the network).
• For each additional dup ACK: cwnd += 1 MSS (inflate the window).
• On new ACK: exit fast recovery, set cwnd = ssthresh → enter congestion avoidance.
• On timeout DURING fast recovery: ssthresh = cwnd/2, cwnd = 1 MSS → slow start.

ssthresh (slow start threshold):
• Initially very large (or set to receiver buffer size).
• Updated to cwnd/2 whenever congestion is detected.
• Acts as the "memory" of where congestion last happened — TCP is careful below ssthresh.`,
    keyPoints: [
      "AIMD: +1 MSS/RTT (additive increase) during congestion avoidance; ÷2 on loss (multiplicative decrease)",
      "Loss events: timeout (severe) and 3 dup ACKs (mild — different reactions!)",
      "Slow Start: starts at cwnd=1, doubles every RTT (exponential). NOT slow growth.",
      "Congestion Avoidance: +1 MSS per RTT (linear). Entered when cwnd ≥ ssthresh.",
      "Fast Recovery (Reno only): entered on 3 dup ACKs. cwnd = ssthresh+3.",
      "ssthresh: set to cwnd/2 on any loss event; acts as the historical congestion marker.",
      "Send rate ≈ cwnd / RTT (bytes/sec). Increasing cwnd increases the rate.",
    ],
    formula: {
      code: `TCP Congestion Control Phases:

Phase          | Trigger          | cwnd growth     | Exit condition
Slow Start     | Connection start | Double per RTT  | cwnd≥ssthresh OR loss
               | OR timeout       | (exponential)   |
Cong. Avoid.   | cwnd ≥ ssthresh  | +1 MSS per RTT  | Loss event
               |                  | (linear)        |
Fast Recovery  | 3 dup ACKs (Reno)| +1 MSS per dup  | New ACK → CA
               |                  | ACK (inflate)   |

On loss events:
  Timeout:      ssthresh = cwnd/2, cwnd = 1 MSS  → Slow Start
  3 dup ACKs (Tahoe): ssthresh = cwnd/2, cwnd = 1 MSS → Slow Start
  3 dup ACKs (Reno):  ssthresh = cwnd/2, cwnd = ssthresh+3 → Fast Recovery

cwnd trace (Reno, ssthresh=8):
  Round 1: cwnd=1 (SS)
  Round 2: cwnd=2 (SS)
  Round 3: cwnd=4 (SS)
  Round 4: cwnd=8=ssthresh → switch to CA
  Round 5: cwnd=9  (CA, +1/RTT)
  Round 6: cwnd=10 (CA)
  Round 7: cwnd=11 (CA)
  Round 8: 3 dup ACKs when cwnd=11
    → ssthresh=5 (floor(11/2)), cwnd=5+3=8 → Fast Recovery
  Round 9: new ACK → cwnd=5=ssthresh → Congestion Avoidance
  Round 10: cwnd=6, 7, 8... (linear from 5)

TCP throughput approximation:
  Rate ≈ cwnd / RTT bytes/sec
  Example: cwnd=10 MSS, MSS=1000B, RTT=50ms
  Rate = (10×1000) / 0.05 = 200,000 B/s = 1.6 Mbps`,
      explanation:
        "Trace cwnd round by round for exam questions. Mark every loss event and write the new ssthresh and cwnd immediately.",
    },
    examTips: [
      "Slow Start = EXPONENTIAL (doubles each RTT). Cong. Avoid. = LINEAR (+1/RTT). Don't confuse.",
      "ssthresh is ALWAYS updated to cwnd/2 at the moment of loss (before dropping cwnd).",
      "Reno: 3 dup ACKs → cwnd = ssthresh+3, NOT cwnd=1. This distinguishes Reno from Tahoe.",
      "Timeout ALWAYS → cwnd=1, slow start. Both Reno and Tahoe agree on this.",
      "TCP rate ≈ cwnd/RTT. Know how to calculate send rate from cwnd and RTT.",
      "May 2023 Q3.c: from the cwnd graph, identify slow start rounds, loss type (dup ACK vs timeout), new ssthresh.",
    ],
    questions: [
      {
        q: "A TCP sender has cwnd=18 MSS and ssthresh=12 MSS in congestion avoidance. A timeout occurs. What are the new values?",
        a: "On timeout (any TCP): ssthresh = cwnd/2 = 18/2 = 9 MSS. cwnd = 1 MSS. Enter slow start.",
      },
      {
        q: "TCP connection with RTT=50ms, cwnd=10 MSS, MSS=1000 bytes. What is the approximate sending rate?",
        a: "Rate ≈ cwnd / RTT = (10 × 1000 bytes) / 0.05 seconds = 200,000 bytes/sec = 200 KB/s = 1.6 Mbps.",
      },
      {
        q: "May 2023 Q3.c: On a cwnd graph, the window drops from ~32 to ~16 at round 15 (not to 1). What caused this? Is this slow start operating between rounds 1 and 6?",
        a: "Drop to half (not to 1) = triple duplicate ACK (TCP Reno). If it were a timeout, cwnd would drop to 1 MSS. Rounds 1–6: YES, slow start operates — you can see exponential doubling each round. Slow start also operates again if there's a timeout (cwnd dropped to 1) at some later point.",
      },
    ],
  },

  "tcp-reno-tahoe": {
    title: "TCP Reno vs TCP Tahoe",
    emoji: "🔀",
    tldr:
      "Tahoe treats ALL losses equally — always goes to cwnd=1. Reno is smarter — 3 dup ACKs → halve cwnd and enter fast recovery (not slow start). Both respond to timeout the same way.",
    explanation: `TCP has evolved. Tahoe is the older version; Reno added fast recovery and is now standard.

TCP TAHOE (the simple one):
• ANY loss event (timeout OR 3 dup ACKs) → ssthresh = cwnd/2, cwnd = 1 MSS → Slow Start.
• Tahoe does NOT have fast recovery.
• After any loss, Tahoe starts over from cwnd=1. Slow recovery.

TCP RENO (the smarter one):
• Timeout: ssthresh = cwnd/2, cwnd = 1 MSS → Slow Start. (Same as Tahoe)
• 3 dup ACKs: ssthresh = cwnd/2, cwnd = ssthresh+3 → Fast Recovery (NOT Slow Start!).
• Fast Recovery: for each additional dup ACK, cwnd += 1 MSS. On new ACK: cwnd = ssthresh → Congestion Avoidance.
• Reno recovers much faster from a single packet loss (3 dup ACK event) than Tahoe.

WHY DOES RENO SKIP SLOW START FOR 3 DUP ACKS?
The 3 duplicate ACKs are themselves proof that the network delivered 3 segments after the missing one. The network is NOT catastrophically congested — just one packet was dropped. Cutting to cwnd=1 and doing slow start would be way too conservative. Cutting to half and entering congestion avoidance is the right proportionate response.

WHY DO BOTH REACT HARSHLY TO TIMEOUT?
Timeout means we waited a long time and got nothing. The network is likely severely congested — many packets dropping. Cutting to 1 MSS is appropriate.

AIMD (Additive Increase, Multiplicative Decrease):
This is the high-level description of TCP Reno's congestion avoidance behavior:
• Additive Increase: +1 MSS per RTT during congestion avoidance (linear probe).
• Multiplicative Decrease: halve cwnd when triple dup ACKs hit.
• Produces the sawtooth pattern in cwnd over time.
• Provably fair among multiple flows (Kelly, 1997) — AIMD naturally equalizes bandwidth.

MACROSCOPIC TCP THROUGHPUT:
If W is the cwnd at loss event, average throughput ≈ (0.75 × W) / RTT.
This is because cwnd oscillates between W/2 and W (halved at loss, linearly grows back).`,
    keyPoints: [
      "Tahoe: ALL losses → cwnd=1, slow start. NO fast recovery.",
      "Reno: Timeout → cwnd=1, slow start. 3 dup ACKs → fast recovery (cwnd = ssthresh+3).",
      "Key difference: Reno distinguishes mild loss (3 dup ACKs) from severe loss (timeout).",
      "3 dup ACKs signal mild congestion (network still working). Timeout = severe.",
      "AIMD produces sawtooth: linear increase in CA, halve on 3 dup ACKs.",
      "Average TCP throughput ≈ 0.75 × W / RTT (W = cwnd at loss).",
    ],
    formula: {
      code: `TCP Tahoe vs TCP Reno — Comparison:

Event           | TCP Tahoe                    | TCP Reno
Timeout         | ssthresh=cwnd/2, cwnd=1, SS  | ssthresh=cwnd/2, cwnd=1, SS
3 dup ACKs      | ssthresh=cwnd/2, cwnd=1, SS  | ssthresh=cwnd/2, cwnd=ssthresh+3
                |                               | → Fast Recovery → CA
Key difference  | Always drops to 1            | Distinguishes mild vs severe loss

AIMD:
  AI: During CA, each ACK → cwnd += MSS²/cwnd ≈ +1MSS per RTT
  MD: On 3 dup ACKs → cwnd = cwnd/2 (Multiplicative Decrease)

Macroscopic throughput:
  avg_throughput ≈ (0.75 × W) / RTT
  where W = cwnd value when loss event occurred

Sawtooth behavior:
  cwnd cycles between W/2 (just after loss) and W (when next loss hits)
  Average ≈ 3W/4 → throughput = (3W/4) / RTT`,
      explanation:
        "In any cwnd graph question: if cwnd drops to 1 → Tahoe or timeout. If cwnd drops to ~half → Reno 3 dup ACKs. Read the graph carefully.",
    },
    examTips: [
      "Tahoe vs Reno: only difference is the 3 dup ACK response. Timeout is identical.",
      "Jan-May 2024 Q3.d: 'comment on congestion avoidance' — describe AIMD sawtooth, Reno recovers higher than Tahoe.",
      "On graph: Reno line stays higher than Tahoe line after same loss event.",
      "Fast recovery is RECOMMENDED but not required. Slow start and CA are MANDATORY.",
      "0.75×W/RTT formula: may appear in 2-mark throughput calculation questions.",
    ],
    questions: [
      {
        q: "Jan-May 2024 Q3.d: Compare Reno and Tahoe on the same congestion event (3 dup ACKs). Which recovers faster and why?",
        a: "Reno recovers faster. On 3 dup ACKs: Reno sets ssthresh=cwnd/2, cwnd=ssthresh+3, enters fast recovery, then transitions to congestion avoidance at ssthresh. It reaches its pre-loss cwnd level much sooner. Tahoe, on the same event, drops to cwnd=1 and does full slow start — takes many more RTTs to get back to the same throughput. Reno maintains higher average throughput.",
      },
      {
        q: "What is the AIMD sawtooth and why does it emerge?",
        a: "AIMD sawtooth: cwnd linearly increases by +1 MSS per RTT (Additive Increase) until a triple-dup-ACK loss event occurs, at which point cwnd is halved (Multiplicative Decrease). This creates a sawtooth waveform — rising linearly, dropping sharply. The pattern naturally emerges because TCP is always probing for more bandwidth (AI) and aggressively backing off when it finds the limit (MD). AIMD is provably fair: multiple competing flows converge to equal bandwidth sharing.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 🌐 NETWORK LAYER & ROUTER
  // ══════════════════════════════════════════

  "network-layer-overview": {
    title: "Network Layer: Overview & Functions",
    emoji: "🌐",
    tldr:
      "The network layer moves datagrams from source to destination. Two planes: Data plane (forwarding — per-router, hardware, nanoseconds) and Control plane (routing — network-wide, software, milliseconds). Internet service model: best-effort.",
    explanation: `The network layer is responsible for moving packets from source host all the way to destination host, possibly crossing many routers and networks.

TWO KEY FUNCTIONS:

1. FORWARDING (Data Plane):
• Per-router action: takes a packet arriving on input link and moves it to the correct output link.
• Uses the forwarding table (computed by routing algorithms) to make the decision.
• Done in hardware (ASICs, TCAM) at nanosecond timescales.
• "Table lookup and switch" — very fast, no intelligence needed.

2. ROUTING (Control Plane):
• Network-wide action: determines the path packets take from source to destination.
• Routing algorithms (Dijkstra's link-state, Bellman-Ford distance-vector) compute forwarding tables.
• Done in software at millisecond-to-second timescales.
• "Figure out the best path" — complex, slow, but done infrequently.

ANALOGY: forwarding is the junction signage (follow the sign, takes milliseconds), routing is the planning of which roads to build the signage for (takes months of planning).

TWO APPROACHES TO CONTROL PLANE:
• Traditional: each router runs distributed routing algorithms (OSPF, BGP) independently. Forwarding table = result.
• SDN (Software Defined Networking): centralized remote controller computes all forwarding tables and pushes them to "dumb" switches via a protocol (OpenFlow). Control is separated from data plane hardware.

INTERNET SERVICE MODEL — BEST-EFFORT:
The Internet's network layer makes NO guarantees:
• No guarantee of delivery (packets can be dropped).
• No guarantee of in-order delivery (packets can be reordered).
• No guarantee of timing (packets can be delayed).
• No guarantee of bandwidth.
This simplicity is intentional — complexity is pushed to the end systems (TCP). The routers stay simple and fast.

DATA PLANE vs CONTROL PLANE:
• Data plane: implemented in hardware, inside each router. Nanoseconds.
• Control plane: implemented in software. Either distributed (each router runs OSPF/BGP) or centralized (SDN controller). Milliseconds to seconds.`,
    keyPoints: [
      "Forwarding = data plane: per-router table lookup, hardware, nanoseconds",
      "Routing = control plane: network-wide path computation, software, milliseconds",
      "Forwarding table: computed by routing algorithms, stored at each router input port",
      "Internet service model: best-effort (no delivery/ordering/timing/bandwidth guarantees)",
      "Traditional: distributed routing (each router runs OSPF/BGP independently)",
      "SDN: centralized control plane (remote controller computes forwarding tables)",
    ],
    formula: {
      code: `Data Plane vs Control Plane:

Aspect          | Data Plane (Forwarding) | Control Plane (Routing)
Location        | Per-router              | Network-wide
Implementation  | Hardware (ASICs, TCAM)  | Software
Timescale       | Nanoseconds             | Milliseconds to seconds
Function        | Packet → output port    | Compute path/forwarding table
Protocols       | None (just lookup)      | OSPF, BGP, Dijkstra, DV

Internet Service Model (best-effort):
  ✗ No guaranteed delivery
  ✗ No guaranteed ordering
  ✗ No timing guarantees
  ✗ No bandwidth guarantees
  ✓ "We try our best" — simplicity keeps routers fast
  ✓ TCP handles reliability at the end systems`,
      explanation:
        "The separation of data plane and control plane is one of the most important architectural concepts in the network layer. SDN exploits this separation explicitly.",
    },
    examTips: [
      "Forwarding = local (per-router). Routing = global (network-wide). Never mix these up.",
      "Data plane = hardware, nanoseconds. Control plane = software, milliseconds.",
      "Internet service model = best-effort. TCP provides reliability on top of this.",
      "Forwarding table lookup uses destination IP address (traditional) or multiple fields (SDN).",
    ],
    questions: [
      {
        q: "What is the difference between forwarding and routing? At what timescale does each operate?",
        a: "Forwarding (data plane): moves a packet from input port to output port at a single router, using a forwarding table. Hardware, nanoseconds. Routing (control plane): determines the end-to-end path packets take across the network, using routing algorithms (OSPF, BGP, Dijkstra) to build the forwarding tables. Software, milliseconds to seconds.",
      },
      {
        q: "Why does the Internet use a best-effort service model at the network layer?",
        a: "Simplicity and speed. Routers only need to do a fast table lookup and forward — no need to track flow state, guarantee delivery, or reorder packets. This keeps routers fast (hardware-speed). Reliability, ordering, and flow control are handled by TCP at the end systems — where it's easier to implement and only incurred when needed.",
      },
    ],
  },

  "router-architecture": {
    title: "Router Architecture: Inside a Router",
    emoji: "⚙️",
    tldr:
      "A router has 4 parts: input ports (lookup), switching fabric (move packets), output ports (queue + transmit), and a routing processor (control plane). Switching can be via memory, bus, or crossbar (fastest). HOL blocking is a key problem.",
    explanation: `A router is not just a box that forwards packets — it's a complex system with distinct hardware components.

FOUR ROUTER COMPONENTS:

1. INPUT PORTS:
   Physical layer: receives bits from the incoming link.
   Link layer: handles the link-layer protocol (Ethernet frame, etc.).
   Forwarding table lookup: checks destination address against the forwarding table to determine output port. This is the "match" in match+action.
   Queuing: if switching fabric is busy, packets wait here (input queue).

2. SWITCHING FABRIC:
   The "core" of the router — physically moves packets from input ports to output ports.
   Three types:
   a) Switching via memory: oldest method. CPU receives packet, looks up table, copies to output port's memory. Bottleneck = memory bandwidth (2 bus crossings per packet). Speed limited by memory bus.
   b) Switching via bus: all input/output ports connected to a shared bus. One packet at a time. Bottleneck = bus bandwidth. Simpler than crossbar but doesn't scale well.
   c) Switching via interconnection network (crossbar switch): multiple inputs can transfer to multiple outputs simultaneously. Most scalable. Modern high-speed routers use this.

3. OUTPUT PORTS:
   Receives packets from switching fabric.
   Queues them if output link is busy.
   Performs link-layer and physical-layer functions for transmission.
   Scheduling discipline (who gets to go first?) matters here.

4. ROUTING PROCESSOR:
   The "brain" — runs the control plane.
   Executes routing protocols (OSPF, BGP).
   Maintains routing tables.
   Computes the forwarding table for input ports.
   In SDN routers: communicates with the remote controller.

HOL BLOCKING (Head-of-Line Blocking):
Occurs in input queues when the switching fabric is slower than the sum of input link rates.
The packet at the HEAD of an input queue is waiting for its output port. But behind it, another packet could go to a DIFFERENT, FREE output port — but it's blocked by the head packet.
HOL blocking can reduce throughput to as low as 58% of maximum even with a crossbar switch.

OUTPUT PORT QUEUING:
If packets from the switching fabric arrive faster than the output link rate, output queues build up. When the output queue is full, packets must be DROPPED. Which ones? Drop policy:
• Tail drop: drop the arriving packet.
• RED (Random Early Detection): randomly drop before the queue is completely full.`,
    keyPoints: [
      "4 components: input ports, switching fabric, output ports, routing processor",
      "Input port: lookup + queue. Output port: queue + transmit.",
      "Switching via memory: bottleneck = memory bus (2 crossings). Oldest, slowest.",
      "Switching via bus: shared bus, one at a time. Middle ground.",
      "Switching via crossbar: parallel simultaneous transfers. Most scalable. Modern routers use this.",
      "HOL blocking: front packet blocks packets behind it even if their output is free.",
      "Routing processor = control plane. Switching fabric = data plane hardware.",
    ],
    formula: {
      code: `Switching Fabric Types:

Type                  | Mechanism              | Bottleneck
Switching via memory  | CPU copy to/from mem   | Memory bandwidth (2 bus crossings)
Switching via bus     | Single shared bus      | Bus bandwidth (one at a time)
Switching via crossbar| Parallel interconnect  | Most scalable (simultaneous xfers)

Delay Calculations (PYQ Jan-May 2024 Q3.b):
  Packet = 1500 bytes
  Link rate = 10 Mbps
  Distance = 15 km, speed = 2×10⁸ m/s

  Transmission delay = (1500 × 8) / (10 × 10⁶) = 12000/10000000 = 1.2 ms
  Propagation delay = 15000 / (2×10⁸) = 0.000075 s = 0.075 ms
  Total = 1.2 + 0.075 = 1.275 ms

PYQ May 2023 Q1.a:
  Packet = 1000 bytes, Distance = 2500 km, Speed = 2.5×10⁸ m/s, Rate = 2 Mbps
  Propagation = 2,500,000 / (2.5×10⁸) = 10 ms
  Transmission = (1000×8) / (2×10⁶) = 4 ms
  Total ≈ 14 ms (assuming 1 hop, no queuing)`,
      explanation:
        "For delay calculation PYQs: always compute propagation (d/s) and transmission (L/R) separately, then add.",
    },
    examTips: [
      "Memory → Bus → Crossbar (slowest to fastest switching fabric). Crossbar = modern high-speed routers.",
      "HOL blocking = the head packet holds up everyone behind it, even for different output ports.",
      "Routing processor = control plane (slow software). Switching fabric = data plane (fast hardware).",
      "PYQ delay problems: L/R = transmission, d/s = propagation. Don't confuse them.",
      "Output port queuing = where packet loss actually happens (full output queue → drop).",
    ],
    questions: [
      {
        q: "What is Head-of-Line (HOL) blocking? Where does it occur in a router?",
        a: "HOL blocking occurs in INPUT port queues when the switching fabric is slower than the aggregate input rate. The packet at the front (head) of an input queue is waiting for its output port. Behind it is a packet destined for a different, currently free output port — but it can't get through because the head packet is blocking it. HOL blocking can reduce effective throughput to 58% of theoretical maximum.",
      },
      {
        q: "Compare the three types of switching fabric. Which is used in modern high-speed routers?",
        a: "Memory-based: CPU copies packet to shared memory then to output — bottleneck is memory bus bandwidth (2 crossings). Bus-based: shared bus connects all ports, one packet at a time — bottleneck is bus bandwidth. Crossbar (interconnection network): multiple packets can simultaneously transfer to different output ports in parallel — most scalable. Modern high-speed routers use crossbar switching.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 📦 IP PROTOCOL
  // ══════════════════════════════════════════

  "ip-datagram": {
    title: "IP Datagram Format & Longest Prefix Matching",
    emoji: "📦",
    tldr:
      "IPv4 header = 20 bytes. Key fields: identification (for fragments), flags (DF/MF), fragment offset (÷8), TTL (hop limit), protocol (TCP=6, UDP=17). Forwarding uses longest prefix match.",
    explanation: `The IP datagram is the packet of the network layer. Every piece of data on the Internet travels inside IP datagrams.

IP DATAGRAM HEADER (20 bytes minimum):

• Version (4 bits): IPv4 = 0100.
• IHL — Internet Header Length (4 bits): header length in 32-bit words. Minimum 5 (= 20 bytes).
• DSCP/ECN — Type of Service (8 bits): DiffServ bits for QoS; ECN bits for congestion signaling.
• Total Length (16 bits): entire datagram in bytes (header + data). Maximum = 65,535 bytes.
• Identification (16 bits): same value for all fragments of ONE original datagram. Used to group fragments.
• Flags (3 bits): Bit 0 = reserved (0). Bit 1 = DF (Don't Fragment — drop if fragmentation needed). Bit 2 = MF (More Fragments — 1 for all fragments except the last one).
• Fragment Offset (13 bits): where this fragment's data starts in the original datagram. Measured in units of 8 BYTES.
• TTL — Time to Live (8 bits): decremented by 1 at each router. Discarded if it reaches 0. Prevents routing loops from keeping packets alive forever.
• Protocol (8 bits): tells the receiver which transport protocol is inside. TCP=6, UDP=17, ICMP=1.
• Header Checksum (16 bits): covers only the IP header (NOT the payload). Recomputed at every router (because TTL changes).
• Source IP (32 bits): sender's IP address.
• Destination IP (32 bits): receiver's IP address.

LONGEST PREFIX MATCHING:
The forwarding table maps IP prefixes to output interfaces. When a packet arrives, the router checks which prefixes match the destination IP. If multiple match, use the LONGEST (most specific) prefix.

Example: Destination = 10.1.2.3
• Entry 1: 10.0.0.0/8 — matches (first 8 bits match)
• Entry 2: 10.1.0.0/16 — matches (first 16 bits match)
• Entry 3: 10.1.2.0/24 — matches (first 24 bits match)
→ Use entry 3 (longest prefix, most specific).

WHY LONGEST PREFIX? More specific routes should take priority. A /24 route to a specific organization overrides a /8 default route to the whole ISP.

TCAM (Ternary Content Addressable Memory):
Used in routers for O(1) forwarding table lookup — can search all entries simultaneously in hardware. Each bit can be 0, 1, or wildcard (x). Perfect for prefix matching.`,
    keyPoints: [
      "IP header = 20 bytes minimum (5 × 32-bit words when IHL=5)",
      "Identification: same for all fragments of one datagram (ties fragments together)",
      "Flags: DF (Don't Fragment), MF (More Fragments = 1 for all except last fragment)",
      "Fragment offset: measured in units of 8 bytes (divide byte offset by 8)",
      "TTL: hop counter, decremented at each router, packet dropped at 0 (prevents loops)",
      "Protocol: TCP=6, UDP=17, ICMP=1",
      "Longest prefix matching: use the most specific matching prefix in forwarding table",
    ],
    formula: {
      code: `IP Header Fields Summary:

Field               | Bits | Key Fact
Version             |  4   | IPv4 = 4 (binary 0100)
IHL                 |  4   | In 32-bit words; min=5 → 20 bytes
DSCP/ECN (ToS)      |  8   | DiffServ + ECN congestion bits
Total Length        | 16   | Header+data in bytes; max 65535
Identification      | 16   | Same for ALL fragments of one datagram
Flags               |  3   | b0=reserved, b1=DF, b2=MF
Fragment Offset     | 13   | Offset in units of 8 bytes
TTL                 |  8   | Hop limit (decremented each router)
Protocol            |  8   | TCP=6, UDP=17, ICMP=1
Header Checksum     | 16   | IP header only (not payload)
Source IP           | 32   | Sender IP
Destination IP      | 32   | Receiver IP

Longest Prefix Match PYQ (May 2023 Q4.a):
Forwarding table (8-bit host):
  Prefix 10  → Interface 1
  Prefix 00  → Interface 2
  Prefix 101 → Interface 3
  Prefix 001 → Interface 4
  Prefix 111 → Interface 5
  otherwise  → Interface 6

Q: Destination = 10110001
  Check "10"  (2 bits): 10... ✓ matches interface 1
  Check "101" (3 bits): 101.. ✓ matches interface 3 (longer!)
  Answer: Interface 3 (longest prefix = 101)

Q: Destination = 00110101
  Check "00"  ✓ → interface 2
  Check "001" ✓ → interface 4 (longer match!)
  Answer: Interface 4`,
      explanation:
        "Fragment offset in units of 8 bytes is the most common trap in IP fragmentation problems. Always divide data bytes by 8 for the offset.",
    },
    examTips: [
      "Fragment offset is always divided by 8 (units of 8 bytes). Last fragment has MF=0.",
      "TTL prevents loops — packets don't bounce forever if routing table has a cycle.",
      "Protocol field: TCP=6, UDP=17, ICMP=1. These numbers appear in PYQs.",
      "Header checksum recomputed at EVERY router (because TTL changes each hop).",
      "Longest prefix: check ALL entries, pick the ONE with the most matching bits.",
      "DF=1 means 'please don't fragment this datagram' — if too large for MTU, drop it.",
    ],
    questions: [
      {
        q: "Why is the IP header checksum recomputed at every router, but the TCP checksum is not?",
        a: "The IP header checksum covers only the IP header. The TTL field is decremented at every router — this changes the header, so the checksum must be recomputed. TCP checksum covers the entire TCP segment (including data) and is computed end-to-end — routers don't modify TCP headers, so no recomputation is needed.",
      },
      {
        q: "What is the purpose of the Identification field in the IP header? And the MF flag?",
        a: "Identification: all fragments of the same original datagram carry the same Identification value. The destination host uses this to group fragments together for reassembly. MF (More Fragments) flag: set to 1 for all fragments except the last one. When the receiver sees a fragment with MF=0, it knows it's the final piece and can start reassembly.",
      },
    ],
  },

  "ip-fragmentation": {
    title: "IP Fragmentation & Reassembly",
    emoji: "✂️",
    tldr:
      "When a datagram is bigger than the link's MTU, it's fragmented into smaller pieces. Reassembly happens ONLY at the destination host. Max data per fragment = MTU−20. Fragment offset = cumulative data bytes ÷ 8.",
    explanation: `Different links have different Maximum Transmission Units (MTUs). When a datagram is too large for a link, the router fragments it.

THE FRAGMENTATION RULES:
1. Each fragment gets the same IP header except: Total Length (updated), Flags (MF set), Fragment Offset (set).
2. Max data per fragment = MTU − 20 bytes (20 = minimum IP header).
3. Except for the last fragment, each fragment's data must be a multiple of 8 bytes (because offset is in 8-byte units).
4. Fragment offset of fragment i = (total data bytes in all previous fragments) / 8.
5. MF = 1 for all fragments except the last. MF = 0 for the last fragment.
6. All fragments carry the same Identification number.

WHERE DOES REASSEMBLY HAPPEN?
Only at the DESTINATION HOST — NOT at intermediate routers. This simplifies routers (they just forward fragments like regular packets) but means the destination must buffer partial datagrams.

CANONICAL EXAMPLE (PYQ):
Datagram: 4000 bytes total (20 header + 3980 data). MTU = 1500 bytes.
Max data per fragment = 1500 − 20 = 1480 bytes (= 185 × 8 — already multiple of 8).

Fragment 1: 20 header + 1480 data = 1500 bytes. MF=1. Offset = 0/8 = 0.
Fragment 2: 20 header + 1480 data = 1500 bytes. MF=1. Offset = 1480/8 = 185.
Fragment 3: 20 header + 1020 data = 1040 bytes. MF=0. Offset = 2960/8 = 370.
Check: 1480 + 1480 + 1020 = 3980 bytes. ✓

ICMP PACKET FRAGMENTATION (PYQ):
ICMP packet total = 4096 bytes. IP header = 20. ICMP header = 8. ICMP payload = 4068. IP payload = 4076 bytes.
MTU = 1500. Max data per fragment = 1480 bytes.

Fragment 1: IP header (20) + ICMP header (8) + 1472 bytes ICMP data = 1500. MF=1. Offset=0.
Fragment 2: IP header (20) + 1480 bytes ICMP data = 1500. MF=1. Offset=185.
Fragment 3: IP header (20) + remaining 1116 bytes = 1136. MF=0. Offset=370.`,
    keyPoints: [
      "Fragment when datagram size > link MTU. Reassemble ONLY at destination host.",
      "Max data per fragment = MTU − 20 (min IP header size)",
      "Data size must be multiple of 8 bytes (except last fragment)",
      "Fragment offset = cumulative prior data / 8 (in units of 8 bytes)",
      "MF=1 for all fragments except the last (MF=0). All share the same Identification.",
      "Lost fragment → entire datagram reassembly fails → entire datagram discarded",
    ],
    formula: {
      code: `IP Fragmentation Formulas:

Max data per fragment = MTU − 20   [assuming no IP options]
Fragment offset = (cumulative data bytes before this fragment) / 8

For non-last fragments: data must be a multiple of 8 bytes
Last fragment: any size ≤ (MTU-20), no multiple-of-8 constraint

Canonical PYQ (4000-byte datagram, MTU=1500):
  Total data = 4000 − 20 = 3980 bytes
  Max per fragment = 1500 − 20 = 1480 bytes (= 185 × 8 ✓)

  Frag | Total Len   | ID | MF | Offset
  1    | 1500 (20+1480)| x  | 1  | 0    (0/8)
  2    | 1500 (20+1480)| x  | 1  | 185  (1480/8)
  3    | 1040 (20+1020)| x  | 0  | 370  (2960/8)

  Verify: 1480+1480+1020 = 3980 ✓

PYQ: 520-byte datagram (20 header, 500 data), MTU=200:
  Max data = 200−20 = 180. But 180/8 = 22.5 → round down to 176 (=22×8)
  Frag 1: 20+176=196. MF=1. Offset=0.
  Frag 2: 20+176=196. MF=1. Offset=22.
  Frag 3: 20+148=168. MF=0. Offset=44.
  Verify: 176+176+148 = 500 ✓`,
      explanation:
        "Always check: is max data a multiple of 8? If not, round DOWN to nearest multiple of 8 (for non-last fragments). Last fragment can be any size.",
    },
    examTips: [
      "Max data = MTU−20. If MTU includes options, adjust IHL accordingly.",
      "Offset is ALWAYS cumulative bytes / 8 (not bytes from fragment start).",
      "Last fragment: MF=0. All others: MF=1. Common trap: forgetting to set MF=0 on last.",
      "Check divisibility by 8 for non-last fragments. MTU=200: 180/8=22.5 → use 176.",
      "All fragments: same Identification, same Source/Dest IP. Different: Length, MF, Offset.",
      "PYQ Dec 2024 Q3.d and Jan-May 2024 Q5.a both included fragmentation tables.",
    ],
    questions: [
      {
        q: "An IP datagram has 4000 bytes (20 header, 3980 data). Link MTU = 1500 bytes. Show all fragments with their total length, MF flag, and offset.",
        a: "Max data per fragment = 1500−20 = 1480 bytes. Fragment 1: Total=1500, ID=x, MF=1, Offset=0. Fragment 2: Total=1500, ID=x, MF=1, Offset=185 (1480/8). Fragment 3: Total=20+1020=1040, ID=x, MF=0, Offset=370 (2960/8). Verify: 1480+1480+1020=3980 ✓.",
      },
      {
        q: "Why is IP reassembly done at the destination host and NOT at intermediate routers?",
        a: "The textbook design decision: keeping routers simple. If routers had to reassemble fragments, they'd need to buffer partial datagrams, track timers for missing fragments, and allocate variable memory — all of which slow down forwarding. Putting reassembly at end hosts keeps routers fast. The cost: all fragments must reach the destination for reassembly. If even one fragment is lost, the whole datagram is discarded.",
      },
    ],
  },

  "ip-addressing": {
    title: "IP Addressing: Subnets, CIDR & Classful",
    emoji: "🏷️",
    tldr:
      "IP address = 32 bits = 4 dotted-decimal bytes. CIDR notation: a.b.c.d/x (x = network bits). Subnet hosts = 2^(32-x) − 2. Classful: A=/8, B=/16, C=/24. Identify class from first byte.",
    explanation: `Every interface (not just every device) on the Internet has an IP address. A router with 3 interfaces has 3 IP addresses.

IP ADDRESS BASICS:
• 32 bits long = 4 bytes in dotted-decimal: e.g., 193.32.216.9
• 193 = first byte, 32 = second byte, etc.
• 2^32 ≈ 4 billion possible addresses.
• IP address = technically associated with INTERFACE, not the device.

SUBNETS:
A subnet is a group of interfaces that can reach each other WITHOUT going through a router.
• Written as a.b.c.d/x in CIDR notation (slash notation / subnet mask).
• /x means the first x bits are the NETWORK prefix.
• Remaining (32−x) bits = host part.
• Total addresses in subnet = 2^(32−x).
• Usable host addresses = 2^(32−x) − 2 (subtract network address and broadcast address).
• Network address: all host bits = 0 (e.g., 192.168.1.0/24 → network = 192.168.1.0).
• Broadcast address: all host bits = 1 (e.g., 192.168.1.255 for /24).

CIDR (Classless Interdomain Routing):
• The modern standard. No fixed class boundaries.
• Any number of network bits (1 to 31) is valid.
• An organization gets a contiguous block: e.g., 200.23.16.0/20 (4096 addresses).
• Enables route aggregation (supernetting): 8 adjacent /23 blocks can be announced as one /20.

CLASSFUL ADDRESSING (legacy — mostly obsolete, but PYQ tested):
• Class A: first bit = 0, so first byte = 1–126. Prefix /8. ~16M hosts.
• Class B: first 2 bits = 10, so first byte = 128–191. Prefix /16. ~65K hosts.
• Class C: first 3 bits = 110, so first byte = 192–223. Prefix /24. ~254 hosts.
• Class D: first 4 bits = 1110, first byte = 224–239. Multicast.
• Class E: first 4 bits = 1111, first byte = 240–255. Experimental.

SPECIAL ADDRESSES:
• 255.255.255.255: limited broadcast (all hosts on current subnet).
• 127.0.0.1: loopback (localhost).
• Private ranges (RFC 1918, not routable on public Internet):
  - 10.0.0.0/8 (Class A private)
  - 172.16.0.0/12
  - 192.168.0.0/16 (home networks)

SUBNETTING EXAMPLE:
ISP has 128.119.40.64/26. Create 4 equal subnets.
/26 = 64 addresses (2^6). 4 subnets → 64/4 = 16 addresses each → need 4 host bits → /28.
Subnet 1: 128.119.40.64/28 (hosts .65–.78, broadcast .79)
Subnet 2: 128.119.40.80/28 (hosts .81–.94, broadcast .95)
Subnet 3: 128.119.40.96/28 (hosts .97–.110, broadcast .111)
Subnet 4: 128.119.40.112/28 (hosts .113–.126, broadcast .127)`,
    keyPoints: [
      "IP = 32 bits. CIDR: a.b.c.d/x (x network bits, 32-x host bits)",
      "Subnet total = 2^(32-x). Usable hosts = 2^(32-x) − 2.",
      "Classful: A=1–126(/8), B=128–191(/16), C=192–223(/24), D=224–239(multicast)",
      "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
      "Broadcast: all host bits = 1. Network: all host bits = 0.",
      "CIDR allows any prefix length. Enables route aggregation (one prefix covers many subnets).",
    ],
    formula: {
      code: `IP Addressing Formulas:

Total addresses in a /x subnet = 2^(32-x)
Usable hosts = 2^(32-x) − 2   [subtract network + broadcast]

Classful first-byte ranges:
  Class A: 1–126      → default mask 255.0.0.0      (/8)
  Class B: 128–191    → default mask 255.255.0.0    (/16)
  Class C: 192–223    → default mask 255.255.255.0  (/24)
  Class D: 224–239    → Multicast
  Class E: 240–255    → Experimental

Note: 127 = loopback (not Class A). 128 starts Class B.

Subnetting PYQ (May 2023 Q4.b):
  ISP has 128.119.40.64/26. Create 4 equal subnets.
  /26 → 2^6 = 64 addresses per block.
  4 subnets → 64/4 = 16 each → need 2^4=16 → /28.
  Subnet 1: 128.119.40.64/28 (hosts .65–.78, BC=.79)
  Subnet 2: 128.119.40.80/28 (hosts .81–.94, BC=.95)
  Subnet 3: 128.119.40.96/28 (hosts .97–.110, BC=.111)
  Subnet 4: 128.119.40.112/28 (hosts .113–.126, BC=.127)

Class detection from first byte:
  First byte 14 → 1–126 → Class A
  First byte 140 → 128–191 → Class B
  First byte 252 → 240–255 → Class E
  First 3 bits 110... → Class C`,
      explanation:
        "For subnetting: start from the given block, divide it equally, find the new prefix length by adding log2(num_subnets) to the original prefix.",
    },
    examTips: [
      "Class B: 128–191 (NOT 127 — that's loopback). Class B starts at 128.",
      "Usable hosts = 2^(32-x) − 2. The '-2' removes network address and broadcast.",
      "To create N subnets: new prefix = old prefix + log2(N). E.g., 4 subnets = +2 bits.",
      "Jul 2023 Q4.a: PES campus 131.20.0.0/24, 4 subnets with different sizes — VLSM problem.",
      "Dec 2023 Q4.a: 130.56.0.0/16, create 1024 subnets → need 10 bits → /26.",
      "IP address belongs to INTERFACE, not device — a router with 3 interfaces has 3 IPs.",
    ],
    questions: [
      {
        q: "May 2023 Q4.b: ISP owns 128.119.40.64/26. Create 4 equal subnets. Give their addresses.",
        a: "/26 = 64 addresses. 4 subnets → 16 each → new prefix /28 (255.255.255.240). Subnet 1: 128.119.40.64/28 (usable .65–.78, broadcast .79). Subnet 2: 128.119.40.80/28 (usable .81–.94, broadcast .95). Subnet 3: 128.119.40.96/28 (usable .97–.110, broadcast .111). Subnet 4: 128.119.40.112/28 (usable .113–.126, broadcast .127).",
      },
      {
        q: "Dec 2023 Q4.a: Organization has 130.56.0.0/16. Create 1024 subnets. What is the new prefix? How many usable hosts per subnet?",
        a: "Need 2^n ≥ 1024 → n=10 subnet bits. New prefix = 16+10 = /26. Mask = 255.255.255.192. Each subnet has 2^6 = 64 addresses, 62 usable hosts. First subnet: 130.56.0.0/26. Last subnet: 130.56.255.192/26.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 🏠 IP SERVICES
  // ══════════════════════════════════════════

  "dhcp": {
    title: "DHCP: Dynamic Host Configuration Protocol",
    emoji: "🏠",
    tldr:
      "DHCP lets a new host automatically get an IP address (and more) when joining a network. 4-step DORA: Discover → Offer → Request → ACK. All steps use broadcast. DHCP gives IP, mask, gateway, DNS, lease time.",
    explanation: `When a new device joins a network (connects to WiFi, plugs into Ethernet), it has no IP address. DHCP solves this.

DHCP IS A CLIENT-SERVER PROTOCOL:
• DHCP server: lives on the subnet (or accessible via relay agent).
• Client: broadcasts a request when it joins.
• DHCP assigns a TEMPORARY IP address with a LEASE TIME.

THE DORA PROCESS (4 steps):

Step 1 — DHCP DISCOVER:
Client has no IP. Broadcasts on the network: "Is there a DHCP server out there?"
• Source: 0.0.0.0 (client has no IP), Port 68 (DHCP client port)
• Destination: 255.255.255.255 (broadcast), Port 67 (DHCP server port)
• Message contains: transaction ID (random, to match replies to requests)

Step 2 — DHCP OFFER:
DHCP server sees the Discover. Offers an IP address.
• Source: server_IP:67
• Destination: 255.255.255.255:68 (still broadcast — client still has no IP)
• Message contains: offered IP (yiaddr), subnet mask, gateway IP, DNS server IP, lease time.
• Multiple servers might send offers.

Step 3 — DHCP REQUEST:
Client picks one offer (from the best/first server). Broadcasts acceptance.
• Source: 0.0.0.0:68 (still no IP! Must broadcast to inform ALL servers, including the unchosen ones, so they reclaim their offered addresses)
• Destination: 255.255.255.255:67
• Message: "I choose server X's offer. I'll use IP yiaddr."

Step 4 — DHCP ACK:
Chosen server confirms. Client can now use the IP.
• Contains: confirmed IP, mask, gateway, DNS, lease time.
• Client stores all this information and configures its interface.

WHY BROADCAST THE REQUEST? The client doesn't have an IP yet (can't unicast). Also, it broadcasts the Request so ALL servers that made offers see it — servers that weren't chosen can reclaim their offered addresses.

WHAT DHCP PROVIDES (more than just an IP!):
• IP address (yiaddr = your IP address)
• Subnet mask
• Default gateway (first-hop router IP)
• DNS server address
• IP address lease time`,
    keyPoints: [
      "DORA: Discover → Offer → Request → ACK (all 4 steps use broadcast)",
      "Discover: src=0.0.0.0:68, dst=255.255.255.255:67 (client has no IP yet)",
      "Offer: server responds with offered IP, mask, gateway, DNS, lease time",
      "Request: client still uses src=0.0.0.0 (broadcasts to inform ALL servers of choice)",
      "ACK: server confirms — client can NOW use the IP",
      "DHCP gives: IP, subnet mask, default gateway, DNS server IP, lease time",
      "Port 67 = DHCP server. Port 68 = DHCP client.",
    ],
    formula: {
      code: `DHCP DORA Interaction:

Client              Server (e.g., 223.1.2.5)
|── DHCP Discover ────────────────────────►|
|  src=0.0.0.0:68, dst=255.255.255.255:67  |
|  yiaddr=0.0.0.0, transaction ID=654      |
|                                           |
|◄── DHCP Offer ────────────────────────---|
|  src=223.1.2.5:67, dst=255.255.255.255   |
|  yiaddr=223.1.2.4 (offered IP)           |
|  transaction ID=654, lifetime=3600s      |
|                                           |
|── DHCP Request ──────────────────────────►|
|  src=0.0.0.0:68, dst=255.255.255.255     |
|  yiaddr=223.1.2.4, transaction ID=655    |
|                                           |
|◄── DHCP ACK ─────────────────────────────|
|  yiaddr=223.1.2.4 (confirmed)            |
|  transaction ID=655, lifetime=3600s      |
|  Client can now use 223.1.2.4!           |

DHCP delivers:
  yiaddr   = Your IP Address (e.g., 223.1.2.4)
  netmask  = e.g., 255.255.255.0 (/24)
  gateway  = first-hop router IP
  DNS      = DNS server IP
  lease    = time before IP expires (must renew)`,
      explanation:
        "All 4 steps use broadcast because the client doesn't have an IP until step 4 completes. The Request is broadcast (not unicast to the chosen server) to notify ALL servers.",
    },
    examTips: [
      "DORA = Discover, Offer, Request, ACK. This acronym is exam-friendly.",
      "Discover and Request are from client: src=0.0.0.0 (no IP yet).",
      "Dec 2023 Q4.b asked to explain DHCP and draw the client-server interaction.",
      "DHCP gives more than IP: also mask, gateway, DNS, lease time. List all 5.",
      "Port 67 = server. Port 68 = client. These specific ports appear in PYQs.",
      "Why Request is broadcast: client still has no IP AND must inform all servers.",
    ],
    questions: [
      {
        q: "Dec 2023 Q4.b: Explain how a new host gets its IP address via DHCP. What does DHCP return beyond just the IP address?",
        a: "DHCP DORA: (1) Discover — client broadcasts from 0.0.0.0:68 to 255.255.255.255:67. (2) Offer — server responds with offered IP, mask, gateway, DNS, lease time. (3) Request — client broadcasts acceptance (still 0.0.0.0, to inform all servers). (4) ACK — server confirms. Beyond IP address, DHCP also returns: subnet mask, default gateway IP (first-hop router), DNS server IP address, and lease time.",
      },
      {
        q: "Why does the client still use source IP 0.0.0.0 in the DHCP Request (step 3) when it already knows the IP it wants?",
        a: "Two reasons: (1) The client can't use the offered IP until it receives the ACK — it's not officially assigned yet. (2) The Request must be broadcast (not unicast to just the chosen server) because the client may have received multiple Offers from different servers. The broadcast Request tells all servers which one was chosen — the unchosen servers see the Request and reclaim their offered IP addresses.",
      },
    ],
  },

  "nat": {
    title: "NAT: Network Address Translation",
    emoji: "🔄",
    tldr:
      "NAT lets many private devices share ONE public IP. The NAT router replaces private (IP, port) with public (IP, new port) and keeps a translation table. Controversial but widely deployed. RFC 1918 private ranges.",
    explanation: `NAT solves the IPv4 address shortage: a home with 20 devices only needs ONE public IP address.

THE PROBLEM:
IPv4 has ~4 billion addresses. There are far more devices. Every home, office, and cellular network would need many public IPs — we ran out.

THE SOLUTION (NAT):
The NAT router sits between the private network and the public Internet.
• Private (internal) network: uses private IP ranges that aren't routable on the Internet.
• Public (external) interface: has ONE public IP address (shared by all internal devices).

RFC 1918 PRIVATE ADDRESS RANGES (not routable on public Internet):
• 10.0.0.0/8 (Class A private) — large home/enterprise networks
• 172.16.0.0/12 — medium networks
• 192.168.0.0/16 — home routers (e.g., 192.168.1.x is the most common home subnet)

HOW NAT WORKS (outgoing traffic):
1. Host 10.0.0.1 sends a packet to web server 128.119.40.186:80 from port 3345.
2. NAT router receives it. Sees src=10.0.0.1:3345, dst=128.119.40.186:80.
3. NAT replaces: src IP = NAT's WAN IP (e.g., 135.122.200.213), src port = new port (e.g., 5001).
4. Records in NAT table: (135.122.200.213:5001) ↔ (10.0.0.1:3345).
5. Sends to Internet: src=135.122.200.213:5001, dst=128.119.40.186:80.

HOW NAT WORKS (return traffic):
6. Web server replies: src=128.119.40.186:80, dst=135.122.200.213:5001.
7. NAT router receives it. Looks up 135.122.200.213:5001 in table.
8. Translates: dst IP = 10.0.0.1, dst port = 3345.
9. Delivers to internal host: src=128.119.40.186:80, dst=10.0.0.1:3345.

The web server never knew about 10.0.0.1 — it only ever saw 135.122.200.213.

NAT CONTROVERSIES (purists argue):
• Port numbers are for PROCESSES, not for HOSTS — NAT misuses ports for multiplexing.
• Routers should only process up to Layer 3 (IP). NAT touches Layer 4 (ports). Violation of layering.
• Violates end-to-end principle: hosts should communicate directly without middleboxes modifying headers.
• Breaks P2P applications: a device behind NAT can't easily act as a server (inbound connections are blocked unless NAT traversal/hole punching is used).
• Better fix = IPv6 (128-bit addresses, enough for every grain of sand to have one).

Despite all this, NAT is everywhere — home routers, cellular networks, corporate networks.`,
    keyPoints: [
      "NAT: many private devices share ONE public IP using port number multiplexing",
      "Outgoing: replace (private_IP, private_port) with (public_IP, new_port) — record in table",
      "Incoming: look up (public_IP, incoming_port) → translate back to (private_IP, private_port)",
      "Private ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
      "NAT table entry: maps WAN (IP:port) ↔ LAN (IP:port)",
      "Controversies: touches Layer 4, violates end-to-end, breaks P2P, misuses port numbers",
    ],
    formula: {
      code: `NAT Translation Example:

Three hosts behind NAT router (WAN: 135.122.200.213, LAN: 10.0.1.26):
  Host 10.0.1.13 → sends to 128.119.165.188:80 from port 3322

Step 1 (Host → NAT, before translation):
  src: 10.0.1.13:3322 → dst: 128.119.165.188:80

Step 2 (NAT → Internet, after translation):
  src: 135.122.200.213:5001 → dst: 128.119.165.188:80
  NAT table entry: 135.122.200.213:5001 ↔ 10.0.1.13:3322

Step 3 (Internet → NAT, return packet):
  src: 128.119.165.188:80 → dst: 135.122.200.213:5001

Step 4 (NAT → Host, after reverse translation):
  src: 128.119.165.188:80 → dst: 10.0.1.13:3322

Private address ranges (not routable on public Internet):
  10.0.0.0/8        (Class A private)
  172.16.0.0/12     (medium networks)
  192.168.0.0/16    (home networks — most common)

Special addresses:
  255.255.255.255   = limited broadcast
  127.0.0.1         = loopback`,
      explanation:
        "NAT is essentially a (IP,port) translator. It uses port numbers to distinguish which internal host should get each incoming reply.",
    },
    examTips: [
      "NAT uses port numbers to distinguish multiple internal hosts (port = de-facto host ID).",
      "May 2023 Q4.c: trace src/dst IP through all 4 NAT steps — draw the table.",
      "Before NAT: private src IP. After NAT: public src IP. Reply reverses this.",
      "Jan-May 2024 Q3.a: 'NAT doesn't work with UDP' is FALSE. NAT works with UDP too.",
      "NAT works with UDP: it stores (src_IP, src_port, dst_IP, dst_port) and times out on inactivity.",
      "Controversies: Layer violation, end-to-end violation, P2P breakage — know all four.",
    ],
    questions: [
      {
        q: "May 2023 Q4.c: Host 10.0.1.13 behind NAT (WAN=135.122.200.213) sends to 128.119.165.188:80 from port 3322. Trace the src/dst IP through all 4 steps.",
        a: "Step 1 (host→NAT): src=10.0.1.13:3322, dst=128.119.165.188:80. Step 2 (NAT→Internet): src=135.122.200.213:5001 (new NAT port), dst=128.119.165.188:80. Step 3 (Internet→NAT, reply): src=128.119.165.188:80, dst=135.122.200.213:5001. Step 4 (NAT→host): src=128.119.165.188:80, dst=10.0.1.13:3322 (NAT table lookup reverses the translation).",
      },
      {
        q: "Why does NAT violate the end-to-end principle? Why do purists dislike it?",
        a: "End-to-end principle: intelligent functionality should be at the end hosts, not in the network core. Middleboxes should just forward. NAT violates this: it modifies IP addresses AND port numbers in every packet, inserting middlebox intelligence into the core. Problems: (1) Port numbers are meant for processes, not host identification. (2) Routers should only process up to Layer 3 — NAT touches Layer 4. (3) Devices behind NAT can't be directly addressed by external hosts — breaks P2P models. (4) Some protocols embed IP addresses in payloads (FTP, SIP) — NAT breaks these.",
      },
    ],
  },

  "ipv6": {
    title: "IPv6 Addressing & Tunneling",
    emoji: "🌍",
    tldr:
      "IPv6 = 128-bit addresses (enough for ~340 undecillion devices). Written as 8 groups of 4 hex digits. Two abbreviation rules. Tunneling lets IPv6 packets cross IPv4-only regions by wrapping them in IPv4.",
    explanation: `IPv6 was created to solve the IPv4 address exhaustion problem. 128 bits vs 32 bits = astronomically more addresses.

IPv6 ADDRESS FORMAT:
• 128 bits = 16 bytes = 8 groups of 4 hex digits, separated by colons.
• Example: 2001:0DB8:0000:0000:0000:0000:0000:0001
• ~340 undecillion (3.4 × 10^38) possible addresses — enough for every grain of sand to have trillions.

IPv6 ABBREVIATION RULES:
Rule 1: Leading zeros within each group can be dropped.
  2001:0DB8:0000:0000:0000:0000:0000:0001 → 2001:DB8:0:0:0:0:0:1

Rule 2: ONE longest run of consecutive all-zero groups can be replaced with :: (double colon).
  2001:DB8:0:0:0:0:0:1 → 2001:DB8::1
  NOTE: :: can appear at most ONCE in an address.

EXPANDING ABBREVIATIONS (reverse):
• Count how many groups are present.
• :: fills in however many zero groups are needed to make 8 total.
  0:1:: → 0:0001:0:0:0:0:0:0 → 0000:0001:0000:0000:0000:0000:0000:0000

IPv6 IMPROVEMENTS OVER IPv4:
• Larger address space (128 vs 32 bits).
• Simplified header (fixed 40-byte header, no fragmentation at routers — only at source).
• No checksum in header (leaves error detection to upper layers — faster routers).
• Built-in security (IPsec mandatory in original design).
• No NAT needed (every device gets a globally unique address).

TUNNELING (IPv6 over IPv4):
The problem: the Internet has millions of IPv4-only routers. IPv6 regions can't connect directly through IPv4 clouds.

The solution: treat the IPv4 region as a "tunnel." Wrap the IPv6 packet inside an IPv4 datagram.

Example topology: A(IPv6) — B(IPv6+v4) — C(IPv4) — D(IPv4) — E(IPv6+v4) — F(IPv6).
Path: A sends IPv6 to B → B (tunnel entry) wraps in IPv4 (src=B's IPv4, dst=E's IPv4) → C and D only see IPv4 outer header → E (tunnel exit) strips IPv4 outer, recovers IPv6 packet → forwards to F natively.

The IPv4 routers C and D never know there's IPv6 inside — they just see a regular IPv4 datagram with protocol field = 41 (IPv6 encapsulated in IPv4).`,
    keyPoints: [
      "IPv6 = 128 bits = 8 groups of 4 hex digits: X:X:X:X:X:X:X:X",
      "Rule 1: drop leading zeros in each group (0DB8 → DB8, 0000 → 0)",
      "Rule 2: ONE run of consecutive all-zero groups → :: (only once per address)",
      "Tunneling: wrap IPv6 packet in IPv4 datagram to cross IPv4-only regions",
      "Tunnel entry: add IPv4 outer header (src=entry, dst=exit). Tunnel exit: strip it.",
      "IPv6 advantages: no NAT needed, no fragmentation at routers, no IP header checksum",
    ],
    formula: {
      code: `IPv6 Abbreviation Examples:

Full: 0000:0000:FFFF:0000:0000:0000:0000:0000
Rule 1 (drop leading zeros): 0:0:FFFF:0:0:0:0:0
Rule 2 (:: for longest run of zeros — the 5 trailing groups):
  Result: 0:0:FFFF::   [or equivalently ::FFFF:0:0:0:0:0 — only one :: allowed]

Expanding: 0:1::
  0:1 = 2 groups present. :: fills remaining 6 groups with zeros.
  0000:0001:0000:0000:0000:0000:0000:0000

PYQ Dec 2024 Q4.d:
(a) Abbreviate 0000:0000:FFFF:0000:0000:0000:0000:0000
    Drop leading zeros: 0:0:FFFF:0:0:0:0:0
    Longest zero run: 5 zeros at end → ::
    Answer: 0:0:FFFF::

(b) Expand 0:1::
    2 groups given + :: fills 6 groups.
    Answer: 0000:0001:0000:0000:0000:0000:0000:0000

IPv6 Tunneling (PYQ Dec 2023 Q4.d / Jan-May 2024 Q4.d):
  A(v6) — B(v6+v4) — C(v4) — D(v4) — E(v6+v4) — F(v6)

  A→B:  Native IPv6. src=A_v6, dst=F_v6
  B→C:  Tunnel entry: outer IPv4 src=B_v4, dst=E_v4
         Inner IPv6: src=A_v6, dst=F_v6 (unchanged inside)
  C→D:  IPv4 routers see only outer header. Forward normally.
  E→F:  Tunnel exit: E strips outer IPv4. Forwards native IPv6 to F.`,
      explanation:
        "The key for tunneling questions: outer IPv4 header has tunnel endpoints (B and E) as src/dst. Inner IPv6 header has original endpoints (A and F) throughout.",
    },
    examTips: [
      ":: can appear at most ONCE. 0:0:FFFF:: not ::FFFF:: (two ::'s would be ambiguous).",
      "Expanding: count given groups, fill remaining with 0000 to make 8 total.",
      "Tunneling: outer header = tunnel entry/exit IPs. Inner header = original A and F IPs.",
      "Dec 2023 Q4.d and Jan-May 2024 Q4.d both tested IPv6 address abbreviation AND tunneling.",
      "IPv6 has NO fragmentation at routers (only source can fragment) — key design difference from IPv4.",
    ],
    questions: [
      {
        q: "Dec 2024 Q4.d: Abbreviate 0000:0000:FFFF:0000:0000:0000:0000:0000. Expand 0:1::",
        a: "Abbreviate: Step 1 drop leading zeros → 0:0:FFFF:0:0:0:0:0. Step 2 replace longest zero run (5 trailing zeros) with :: → 0:0:FFFF:: Expand 0:1:: → 2 groups given, :: fills 6 → 0000:0001:0000:0000:0000:0000:0000:0000.",
      },
      {
        q: "Topology: A(IPv6)—B(IPv6+v4)—C(IPv4)—D(IPv4)—E(IPv6+v4)—F(IPv6). Source=A, Dest=F. What headers does the packet have at each hop?",
        a: "A→B: native IPv6 packet, src=A_v6, dst=F_v6. B→C (tunnel entry): B wraps in IPv4 outer — outer src=B_v4, outer dst=E_v4. Inner IPv6: src=A_v6, dst=F_v6 (unchanged). C→D: same wrapped packet, IPv4 routers see only outer header. D→E: same. E→F (tunnel exit): E removes outer IPv4 (dst=E_v4 = itself). Extracts inner IPv6 packet. Forwards native IPv6 to F: src=A_v6, dst=F_v6.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 🗺️ ROUTING ALGORITHMS
  // ══════════════════════════════════════════

  "link-state": {
    title: "Link-State Routing: Dijkstra's Algorithm",
    emoji: "🗺️",
    tldr:
      "In link-state routing, every router knows the FULL network topology. Each runs Dijkstra's algorithm locally to find shortest paths. Steps: always pick the unvisited node with minimum distance, update its neighbors, repeat.",
    explanation: `Link-state routing is used in OSPF (Open Shortest Path First), the dominant intra-domain routing protocol.

HOW ROUTERS LEARN THE TOPOLOGY:
Every router broadcasts link-state packets (LSPs) to ALL other routers (via flooding). An LSP contains: router's ID, list of directly connected neighbors, and cost to each neighbor. After flooding, every router has a complete map of the entire network.

DIJKSTRA'S ALGORITHM (runs locally at each router):
Given the complete topology, find the shortest path from one source node to all others.

ALGORITHM STEPS:
Initialize:
• Set dist(source) = 0.
• Set dist(all other nodes) = ∞.
• N' = visited set = {} initially.

At each step:
1. From unvisited nodes, pick node u with minimum dist(u).
2. Add u to N' (mark as visited/confirmed).
3. For each unvisited neighbor v of u:
   • If dist(u) + cost(u,v) < dist(v): update dist(v) = dist(u) + cost(u,v). Record predecessor = u.
4. Repeat until all nodes visited.

COMPLEXITY: O(n²) naively; O(n log n) with priority queue (min-heap).

OSCILLATION PROBLEM:
If link costs depend on traffic load, Dijkstra can cause oscillations. All routers shift traffic to the currently least-loaded path, which then becomes the most loaded → everyone shifts back → repeat. OSPF addresses this by randomizing when routers run Dijkstra.

WORKED EXAMPLE (PYQ May 2023 Q4.d):
Network nodes: t, u, v, w, x, y, z. Edge costs: t-u=2, t-v=4, t-y=7, u-v=3, u-w=3, v-x=8, v-y=8, w-x=6, w-y=4, x-z=12, y-z=8. Source = t.

Initial: N'={t}, D(u)=2,t; D(v)=4,t; D(w)=∞; D(x)=∞; D(y)=7,t; D(z)=∞
Step 1: Add u (min=2). Update: D(v)=min(4, 2+3=5)→ keep 4? No: 3<4 → D(v)=3,u. D(w)=min(∞,2+3=5)=5,u.
Step 2: Add v (min=3). Update: D(x)=min(∞,3+8=11)=11,v. D(y)=min(7,3+8=11)→keep 7,t.
Step 3: Add w (min=5). Update: D(x)=min(11,5+6=11)→tie keep 11,v. D(y)=min(7,5+4=9)→keep 7,t.
Step 4: Add y (min=7). Update: D(z)=min(∞,7+8=15)=15,y.
Step 5: Add x (min=11). Update: D(z)=min(15,11+12=23)→keep 15,y.
Step 6: Add z (min=15). Done.

Shortest paths from t: u=2(t-u), v=3(t-u-v), w=5(t-u-w), y=7(t-y), x=11(t-u-v-x), z=15(t-y-z).`,
    keyPoints: [
      "Link-state: every router floods its links to ALL others → complete topology known",
      "Dijkstra's: pick min-distance unvisited node, update neighbors, repeat",
      "N' = confirmed/visited set. D(v) = current best distance to v. p(v) = predecessor.",
      "Complexity: O(n²) naive, O(n log n) with heap",
      "OSPF uses link-state routing in practice",
      "Oscillation problem: load-dependent costs can cause routing loops/oscillations",
    ],
    formula: {
      code: `Dijkstra's Algorithm:

Initialize: D(source)=0, D(all others)=∞, N'={}
Each step:
  1. u = argmin{ D(v) : v ∉ N' }  [pick min-distance unvisited]
  2. N' = N' ∪ {u}                 [mark as done]
  3. For each neighbor v of u (v ∉ N'):
       if D(u) + c(u,v) < D(v):
           D(v) = D(u) + c(u,v)
           p(v) = u                 [update predecessor]

PYQ May 2023 Q4.d — Dijkstra from t:
  Edges: t-u=2, t-v=4, t-y=7, u-v=3, u-w=3,
         v-x=8, v-y=8, w-x=6, w-y=4, x-z=12, y-z=8

Step| N'      | D(u) | D(v) | D(w) | D(x)  | D(y) | D(z)
 0  | {t}     |  2,t |  4,t |  ∞   |  ∞    |  7,t |  ∞
 1  | +u      |  —   |  3,u |  5,u |  ∞    |  7,t |  ∞
 2  | +v      |      |  —   |  5,u | 11,v  |  7,t |  ∞
 3  | +w      |      |      |  —   | 11,v  |  7,t |  ∞
 4  | +y      |      |      |      | 11,v  |  —   | 15,y
 5  | +x      |      |      |      |  —    |      | 15,y
 6  | +z      |      |      |      |       |      |  —

Final shortest paths from t:
  t→u: 2  (direct: t-u)
  t→v: 3  (via u: t-u-v)
  t→w: 5  (via u: t-u-w)
  t→y: 7  (direct: t-y)
  t→x: 11 (via u,v: t-u-v-x)
  t→z: 15 (via y: t-y-z)`,
      explanation:
        "For exam table: fill one row per step. Mark '—' when a node enters N'. Update neighbors with better distances. Record predecessor after each update.",
    },
    examTips: [
      "Always build the full step-by-step table — 8-mark questions need it.",
      "Pick the MINIMUM distance unvisited node at each step. Break ties arbitrarily.",
      "When a distance is updated, also update the predecessor (needed to trace the path).",
      "After the algorithm, trace paths backward using predecessors: z→y→t gives path t-y-z.",
      "May 2023 Q4.d (8 marks) and Dec 2024 Q3.a (6 marks) both tested Dijkstra's algorithm.",
    ],
    questions: [
      {
        q: "Dec 2024 Q3.a: Dijkstra from node 0. Edges: 0-1=2, 0-2=6, 0-3=6, 1-3=5, 1-5=15, 3-5=10, 3-4=10, 3-6=6, 4-6=2, 5-6=6. Find shortest distance to all nodes.",
        a: "Initial: D(1)=2, D(2)=6, D(3)=6, D(4-6)=∞. Step 1: add node 1 (D=2). Via 1: D(3)=min(6,7)=6, D(5)=17. Step 2: add node 3 (D=6). Via 3: D(4)=16, D(5)=16, D(6)=12. Step 3: add node 2 (D=6). No better paths. Step 4: add node 6 (D=12). Via 6: D(4)=14. Step 5: add node 4 (D=14). No better. Step 6: add node 5 (D=16). Done. Final: D(1)=2, D(2)=6, D(3)=6, D(4)=14, D(5)=16, D(6)=12.",
      },
      {
        q: "Why do all routers in link-state routing run Dijkstra locally, even though the algorithm is the same for everyone?",
        a: "Every router is the SOURCE for its own routing computation — it needs to find the shortest paths from ITSELF to all other destinations. Router A runs Dijkstra with A as source; router B runs Dijkstra with B as source. They have the same topology map but compute different forwarding tables because they're at different points in the network. Each router uses its own Dijkstra result to fill its forwarding table with 'next hop' entries.",
      },
    ],
  },

  "distance-vector": {
    title: "Distance Vector Routing (Bellman-Ford)",
    emoji: "📡",
    tldr:
      "Each router only knows costs to direct neighbors. Shares its distance vector (guesses about all destinations) with neighbors. Iterates using Bellman-Ford equation until convergence. 'Good news travels fast, bad news travels slow' (count to infinity problem).",
    explanation: `Distance Vector (DV) routing is used in RIP (Routing Information Protocol). Each router knows only its own links.

HOW IT WORKS:
1. Each router starts with: distance to itself = 0, distance to all others = ∞.
2. Each router knows the cost to its DIRECTLY CONNECTED neighbors.
3. Each router shares its distance vector (its current best guesses for all destinations) with its direct neighbors.
4. Each router uses received distance vectors to update its own, using the Bellman-Ford equation.
5. Repeat until no more updates (convergence).

BELLMAN-FORD EQUATION:
dx(y) = min over all neighbors v { cost(x,v) + dv(y) }
"The cost from x to y is the minimum, over all neighbors v, of: cost to reach v + v's reported cost to y."

OPERATION (distributed + asynchronous):
• Routers don't synchronize. Each router updates whenever it gets a new distance vector from a neighbor.
• Updates propagate across the network iteratively.
• Eventually converges (when distances stop changing).

GOOD NEWS TRAVELS FAST:
If a link cost DECREASES (good news — shorter path found), the update propagates quickly. In one round, the neighbor knows; in two rounds, its neighbors know, etc. Fast convergence.

BAD NEWS TRAVELS SLOWLY (COUNT TO INFINITY PROBLEM):
If a link fails (cost → ∞), routers may take many rounds to figure out that the path is truly broken.
Example: A-B-C. B is between A and C. If B-C link breaks:
• B thinks it can reach C through A (but A was routing through B!). 
• B tells A "I can reach C at cost 3". A tells B "I can reach C at cost 4" (via B... which routes via A... loop!).
• This bouncing continues, incrementing by 1 each round until ∞ is finally accepted.
Mitigations: Split horizon (don't advertise a route back to where you learned it), Poison reverse (advertise ∞ for loops).

COMPARING LS AND DV:

| Property | Link-State (OSPF) | Distance Vector (RIP) |
|---|---|---|
| Knowledge | Full topology | Only direct neighbors |
| Message complexity | O(n²E) messages to flood | O(n) neighbor messages |
| Convergence | Faster | Slower (count to infinity) |
| Robustness | More robust | Can have loops |
| Algorithm | Dijkstra's | Bellman-Ford |`,
    keyPoints: [
      "Each router knows costs to DIRECT NEIGHBORS only (not full topology like LS)",
      "Shares distance vector with neighbors; updates using Bellman-Ford: dx(y) = min{ c(x,v) + dv(y) }",
      "Iterates asynchronously until convergence (no more distance changes)",
      "Good news = fast convergence. Bad news = slow (count to infinity problem).",
      "Count to infinity: routing loop bounces, cost increments until ∞ accepted",
      "Used in RIP (Routing Information Protocol). OSPF uses link-state instead.",
    ],
    formula: {
      code: `Bellman-Ford Equation:
  dx(y) = min over all neighbors v { c(x,v) + dv(y) }

  "Cost from x to y = min over neighbors v of (cost to reach v + v's cost to y)"

PYQ Jan-May 2024 Q4.c: Network A-B-C-D-E-F
Edges: A-B=2, A-C=2, A-D=4, B-C=8, B-E=10, B-F=4,
       C-D=1, C-E=4, D-E=4, E-F=2

Find: (b) Through which neighbor does C route to E?
      (c) Through which neighbor does E route to B?

(b) C's neighbors: A(cost 2), B(via A), D(cost 1), E(cost 4).
  Path to E via each neighbor:
    Via A: 2 + d_A(E) = 2 + 6 = 8
    Via D: 1 + d_D(E) = 1 + 4 = 5
    Via E: 4 + 0 = 4 (direct!)
  min = 4 → C routes to E DIRECTLY (next hop = E).

(c) E's neighbors: C(cost 4), D(cost 4), B(cost 10), F(cost 2).
  Path to B via each neighbor:
    Via C: 4 + d_C(B) = 4 + 4 = 8 (via C→A→B: 4+2+2=8)
    Via F: 2 + d_F(B) = 2 + 4 = 6
    Via B: direct 10
  min = 6 → E routes to B via F (next hop = F, total cost = 6).`,
      explanation:
        "For DV problems: compute all-pairs shortest paths first (by inspection or Dijkstra). Then for each 'through which neighbor' question, evaluate the Bellman-Ford equation at the specific node.",
    },
    examTips: [
      "BF equation: dx(y) = min_v { c(x,v) + dv(y) }. The 'v' is the immediate neighbor.",
      "Jan-May 2024 Q4.c: trace which neighbor each router uses (not just the cost).",
      "Count to infinity: 'bad news travels slowly' is the core intuition. Know why.",
      "DV disadvantages: slower convergence, routing loops, count to infinity problem.",
      "LS vs DV: LS has complete topology (flood LSPs), DV has only neighbor costs.",
      "RIP uses DV (max hop count=15, treats 16 as ∞). OSPF uses LS.",
    ],
    questions: [
      {
        q: "Jan-May 2024 Q4.c: E routes to B through which neighbor? Explain using the Bellman-Ford equation.",
        a: "E's neighbors: C(c=4), D(c=4), B(c=10), F(c=2). Bellman-Ford: d_E(B) = min{ c(E,C)+d_C(B), c(E,D)+d_D(B), c(E,B)+d_B(B), c(E,F)+d_F(B) } = min{ 4+4, 4+5, 10+0, 2+4 } = min{8, 9, 10, 6} = 6. Minimum is through F (cost 2+4=6). E routes to B via F as the next hop.",
      },
      {
        q: "What is the count-to-infinity problem? Give a simple example.",
        a: "Network A—B—C (A-B=1, B-C=1). Suppose the B-C link breaks. B should learn that C is unreachable (∞). But B sees A still advertising d_A(C)=2 (via B, which now routes via A — a loop!). B updates to d_B(C)=3 (via A). A updates to d_A(C)=4 (via B). This loop continues: costs increment by 1 each round — 3, 4, 5, ... — until infinity is finally reached. The network converges very slowly. This is why the count-to-infinity problem makes DV routing much slower to recover from link failures.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 🛡️ SDN & ERROR DETECTION
  // ══════════════════════════════════════════

  "sdn": {
    title: "SDN: Software Defined Networking",
    emoji: "🛡️",
    tldr:
      "SDN separates the control plane (what to do) from the data plane (actually doing it). A centralized controller computes forwarding tables for all switches. Switches use match+action rules (OpenFlow). One controller → any policy.",
    explanation: `Traditional networks: every router runs its own routing software and independently computes its forwarding table. This makes changes slow, error-prone, and hard to coordinate.

SDN MOTIVATION:
• Traditional routers are "closed boxes" — proprietary hardware + software. Hard to update.
• To change routing behavior, operators must configure each router individually.
• Complex behaviors (load balancing, firewalling, traffic engineering) require fragile per-device configuration.
• SDN: "make the network programmable like software."

FOUR KEY SDN CHARACTERISTICS:
1. Flow-based forwarding: Switches forward based on any header field from any layer (L2 MAC, L3 IP, L4 port). Not just destination IP. Specified via "match + action" rules in flow tables.
2. Separation of data and control planes: Data plane = fast hardware switches. Control plane = software on remote server (the SDN controller). Previously tightly coupled inside each router.
3. External control: The SDN controller is a separate entity. It has a global view of the network state and pushes forwarding rules to switches.
4. Programmable network: Any developer can write a network control app (routing, firewall, load balancer) using the controller's northbound API. Network behavior = software.

SDN ARCHITECTURE:
• SDN switches (data plane): fast, commodity hardware. Execute match+action rules. No routing protocols. Communicate with controller via southbound API (OpenFlow over TCP port 6653).
• SDN Controller (Network OS): three layers:
  - Communication layer: talks to switches via OpenFlow.
  - State management layer: maintains global network graph, host info, flow tables.
  - Northbound API (RESTful): exposes state to control applications.
• Network control apps: write routing logic, access control, load balancing as software apps.

OPENFLOW PROTOCOL:
Controller → Switch messages:
  features: query switch capabilities.
  configure: set parameters.
  modify-state: add/delete/modify flow table entries.
  packet-out: inject a packet from a specific port.

Switch → Controller messages:
  packet-in: send a packet (and control) to controller (when no matching rule found).
  flow-removed: a flow table entry was deleted at the switch.
  port-status: a port's status changed.

GENERALIZED FORWARDING (Match + Action):
One flow table entry = Match fields + Action + Stats (counters).

Equivalent to:
  Router  = match(dst IP prefix) → forward out link
  Switch  = match(dst MAC)       → forward or flood
  Firewall = match(src IP + port) → permit or deny
  NAT     = match(IP + port)     → rewrite address/port`,
    keyPoints: [
      "SDN = separate control plane (software, remote) from data plane (hardware, switches)",
      "Centralized SDN controller computes forwarding rules; pushes to 'dumb' switches",
      "Switches use match+action flow tables (not destination IP only — any header field)",
      "OpenFlow = protocol between controller and switches (TCP port 6653)",
      "Northbound API (REST) exposes state to apps. Southbound API (OpenFlow) talks to switches.",
      "One controller can implement routing, firewall, NAT, load balancer simultaneously",
    ],
    formula: {
      code: `SDN Architecture Layers:

  ┌────────────────────────────────────┐
  │   Network Control Applications    │  ← routing, firewall, LB, NAT apps
  │   (routing app, access control)   │
  ├────────────────────────────────────┤
  │   SDN Controller (Network OS)     │  ← northbound API (REST) above
  │   - Communication layer (OF)      │     southbound API (OpenFlow) below
  │   - State management layer        │
  │   - Network-wide state DB         │
  ├────────────────────────────────────┤
  │   SDN Switches (Data Plane)       │  ← match+action flow tables
  │   (commodity hardware + OpenFlow) │
  └────────────────────────────────────┘

Match + Action Examples:

Device type | Match            | Action
Router      | dst IP prefix    | forward(port)
Switch      | dst MAC address  | forward or flood
Firewall    | IP + TCP port    | permit or deny
NAT         | IP + port        | rewrite addr+port

Flow table design PYQ:
Policy: (a) Forward HTTP (port 80) to server 10.1.1.5.
        (b) Drop all traffic from 192.168.1.0/24.
        (c) Forward all else normally.

  Match                  | Action
  tcp_dst_port=80        | forward(server_port_of_10.1.1.5)
  src_IP=192.168.1.0/24  | drop
  *                      | normal IP forwarding

  (Priority: specific rules first, wildcard last)`,
      explanation:
        "SDN is the reason modern cloud data centers can instantly reprogram their networks. OpenFlow lets software define exactly how every packet is handled.",
    },
    examTips: [
      "4 SDN properties: flow-based forwarding, control/data separation, external control, programmability.",
      "OpenFlow controller-to-switch: features, configure, modify-state, packet-out.",
      "OpenFlow switch-to-controller: packet-in, flow-removed, port-status.",
      "Match+action table unifies router, switch, firewall, NAT into one abstraction.",
      "SDN controller: northbound (to apps) and southbound (to switches) APIs.",
      "SDN vs traditional: traditional has distributed per-router intelligence; SDN has centralized logic.",
    ],
    questions: [
      {
        q: "Why does SDN make network management easier than traditional distributed routing?",
        a: "In traditional routing, every router independently runs complex distributed algorithms (OSPF, BGP). An operator can't directly control routing — they tweak router parameters and hope the protocol converges to the desired state. With SDN, the operator writes a control application that directly computes and installs flow table entries on every switch. The change is programmatic, global, immediate, and verifiable. New behaviors (load balancing, fine-grained access control) are software updates, not firmware upgrades on thousands of routers.",
      },
      {
        q: "Design OpenFlow flow table rules: (a) Forward HTTP traffic to server 10.1.1.5. (b) Drop traffic from 192.168.1.0/24. (c) Normal forwarding otherwise.",
        a: "(Priority order matters — specific before general). Rule 1: Match tcp_dst_port=80 → Action forward(port_to_10.1.1.5). Rule 2: Match src_IP=192.168.1.0/24 → Action drop. Rule 3: Match * (wildcard) → Action forward based on normal IP forwarding. Rules are checked in priority order: HTTP traffic hits Rule 1 first; blocked-subnet traffic hits Rule 2; everything else falls through to Rule 3.",
      },
    ],
  },

  "error-detection": {
    title: "Error Detection: CRC & UDP Checksum",
    emoji: "🔍",
    tldr:
      "CRC (Cyclic Redundancy Check): append r zeros to data, divide by generator using XOR, remainder = CRC bits. Checksum: add all 16-bit words, wrap carry, take 1's complement. CRC is more powerful than checksum.",
    explanation: `Error detection lets the receiver check if the received data was corrupted during transmission.

UDP CHECKSUM (used in transport layer):
Process:
1. Split the segment (including a pseudo-header) into 16-bit words.
2. Add all 16-bit words together using binary addition.
3. If there's a carry out of the 16-bit result, wrap it (add carry bit to result). This is one's complement arithmetic.
4. Checksum = one's complement of the final sum (flip all bits).

Receiver verification:
• Add all received 16-bit words including the checksum field.
• Result should be all 1s (0xFFFF) if no errors.
• If not all 1s → error detected (but not corrected — just drop the segment).

One's Complement: flip 0→1 and 1→0 in every bit.

CRC (CYCLIC REDUNDANCY CHECK — used in link layer):
More powerful than checksum — can detect all single-bit errors, all double-bit errors, and all burst errors up to r bits.

Process:
1. Treat data D as a binary polynomial (bit string = coefficients).
2. Generator G has r+1 bits (degree r), agreed by sender and receiver.
3. Append r zeros to D: gives D·2^r.
4. Divide D·2^r by G using XOR (polynomial) division.
5. Remainder R = the CRC bits (r bits long).
6. Transmitted frame = D followed by R (= D·2^r XOR R).

At receiver: divide received bits by G. If remainder = 0 → no error. If remainder ≠ 0 → error detected.

CRC EXAMPLE (PYQ Jan-May 2024 Q5.a):
D = 1011010, G = x^4+x+1 = 10011 (r=4).
Append 4 zeros: 10110100000.
XOR divide 10110100000 by 10011:
Step 1: 10110 XOR 10011 = 00101. Bring down 1 → 01011.
Step 2: 01011 (MSB=0, so skip). Bring down 0 → 10110.
Step 3: 10110 XOR 10011 = 00101. Bring down 0 → 01010.
Step 4: 01010 (skip). Bring down 0 → 10100.
Step 5: 10100 XOR 10011 = 00111. Bring down 0 → 01110.
Step 6: 01110 (skip). Bring down 0 → 11100.
Step 7: 11100 XOR 10011 = 01111. Remainder = 1110 (last 4 bits).
Transmitted = D + R = 1011010 + 1110 = 10110101110.`,
    keyPoints: [
      "CRC: append r zeros, XOR-divide by generator G (r+1 bits), remainder = CRC",
      "Transmitted = data + CRC (appended). Receiver divides received bits by G; remainder 0 = no error.",
      "UDP Checksum: add all 16-bit words, wrap carry, 1's complement = checksum",
      "Checksum receiver: add all words including checksum → result should be 0xFFFF",
      "CRC detects all single-bit errors, all double-bit errors, all burst errors ≤ r bits",
      "XOR division: 1 XOR 1 = 0, 1 XOR 0 = 1, 0 XOR 0 = 0 (no carries in XOR)",
    ],
    formula: {
      code: `CRC Computation:

  r = degree of generator G
  Append r zeros to D → get D·2^r
  R = (D·2^r) mod G  [using XOR arithmetic, no carries]
  Transmitted T = D·2^r XOR R  [= D concatenated with R]

  At receiver: T mod G = 0 → no error detected.

PYQ Jan-May 2024 Q5.a (also Dec 2024 Q3.d):
  D = 1011010, G = x^4+x+1 = 10011, r=4
  D·2^4 = 10110100000

  XOR Division:
  10110100000
  10011         XOR → 00101, bring down 1
  _01011        (MSB=0, skip)
  _10110        bring down 0
  _10011        XOR → 00101, bring down 0
  __01010       (MSB=0, skip)
  __10100       bring down 0
  __10011       XOR → 00111, bring down 0
  ___01110      (MSB=0, skip)
  ___11100      bring down 0 (carry last bit)
  ___10011      XOR → 01111 → Remainder = 1110

  CRC R = 1110 (4 bits)
  Transmitted T = 1011010 1110 = 10110101110

UDP Checksum Example (PYQ May 2023 Q3.b):
  Word 1: 0111101111010000 = 0x7BD0
  Word 2: 1100001111101011 = 0xC3EB

  Sum: 0x7BD0 + 0xC3EB = 0x13FBB
  Carry out (5th hex nibble=1): wrap → 0x3FBB + 0x0001 = 0x3FBC
  Checksum = 1's complement of 0x3FBC = 0xC043
             = 1100000001000011`,
      explanation:
        "For CRC: the XOR division is just like binary long division, but without carries. Every subtraction step is replaced by XOR. Always divide until you have r bits of remainder.",
    },
    examTips: [
      "CRC: append r ZEROS (not r-1). r = degree of generator = number of CRC bits.",
      "In XOR division: if MSB of current remainder = 0, DON'T XOR — just shift (bring down next bit).",
      "The final remainder has exactly r bits — that's your CRC.",
      "Checksum: wrap the carry (add it to the low 16 bits). Then 1's complement.",
      "May 2023 Q3.b tested checksum calculation. Jan-May 2024 Q5.a tested CRC.",
      "Verify: transmitted frame (D+R) divided by G should give remainder 0.",
    ],
    questions: [
      {
        q: "May 2023 Q3.b: Two 16-bit words: 0111101111010000 and 1100001111101011. Find their checksum.",
        a: "Convert to hex: 0x7BD0 and 0xC3EB. Add: 0x7BD0 + 0xC3EB = 0x13FBB. There's a carry (17-bit result), so wrap: 0x3FBB + 0x0001 = 0x3FBC. Checksum = 1's complement of 0x3FBC = 0xC043 = 1100000001000011 in binary.",
      },
      {
        q: "CRC: D=1011010, G=10011 (x^4+x+1). What are the transmitted bits?",
        a: "r=4 (degree of G). Append 4 zeros: D·2^4 = 10110100000. XOR divide by 10011. After the division (worked above), remainder R=1110. Transmitted frame = D + R = 1011010 concatenated with 1110 = 10110101110. At receiver: 10110101110 divided by 10011 should give remainder 0 (verify this to confirm).",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 🧠 MNEMONICS & TRICKS
  // ══════════════════════════════════════════

  "mnemonics-tricks": {
    title: "Mnemonics, Tricks & Quick Reference",
    emoji: "🧠",
    tldr:
      "Everything you need to memorize for Unit 3 in one place. Window constraints, TCP formulas, IP classes, DHCP, CRC steps, Dijkstra checklist — all as mnemonics and shortcuts.",
    explanation: `WINDOW SIZE CONSTRAINTS (most PYQ-tested):
  GBN max window = 2^k − 1  → "GBN Gets one Less" (subtract 1)
  SR max window  = 2^k / 2  → "SR Shares equally" (divide by 2)

  Mnemonic to remember which is bigger: GBN > SR
  (GBN = 2^k−1 is always bigger than SR = 2^k/2 for k≥2)

TCP FORMULAS (all in one place):
  EstimatedRTT = 0.875 × EstRTT + 0.125 × SampleRTT   [α = 1/8]
  DevRTT       = 0.75  × DevRTT + 0.25 × |Sample−Est| [β = 1/4]
  TimeoutInterval = EstimatedRTT + 4 × DevRTT
  rwnd = RcvBuffer − (LastByteRcvd − LastByteRead)
  TCP rate ≈ cwnd / RTT

CONGESTION CONTROL CHEAT SHEET:
  State          | Growth        | Exit trigger
  Slow Start     | ×2 per RTT    | cwnd≥ssthresh OR loss
  Cong Avoidance | +1 MSS/RTT    | loss event
  Fast Recovery  | +1/dup ACK    | new ACK (→CA) or timeout (→SS)

  Reno mnemonic: "3 Dup ACKs → Don't Slow Start!" (enter FR instead)
  Tahoe mnemonic: "Always Slow Start" (on ANY loss)

IP CLASS RANGES (from first byte):
  "All Big Cats Devour Everyone"
  A: 1–126   → /8    (~16M hosts)
  B: 128–191 → /16   (~65K hosts)
  C: 192–223 → /24   (~254 hosts)
  D: 224–239 → Multicast
  E: 240–255 → Experimental
  127 = loopback (not really Class A; excluded from usable)

FRAGMENTATION CHECKLIST:
  1. Max data = MTU − 20
  2. Check: is max data multiple of 8? Round DOWN if not.
  3. Fragment 1: offset=0, MF=1
  4. Fragment 2: offset=prev/8, MF=1
  5. Last: offset=total_prev/8, MF=0
  6. Verify: sum of all data = total data ✓

DHCP DORA:
  D: Discover (src=0.0.0.0, dst=255.255.255.255, port 68→67)
  O: Offer (server sends offered IP + mask + gateway + DNS)
  R: Request (src=0.0.0.0 STILL, dst=255.255.255.255)
  A: ACK (client now has the IP — done!)

NAT TRANSLATION STEPS:
  Out: (private_IP:private_port) → (public_IP:new_port) + add to table
  In:  (public_IP:new_port) → look up table → (private_IP:private_port)

CRC STEPS:
  1. Count r = degree of G (G = r+1 bits)
  2. Append r zeros to D
  3. XOR-divide (D·2^r) by G
  4. Remainder R = CRC (r bits)
  5. Transmit: D + R (concatenate)
  6. Verify: (D+R) ÷ G should give remainder 0

DIJKSTRA'S MNEMONIC "PUPA":
  P: Pick minimum-distance unvisited node
  U: Update its neighbors (if shorter path found)
  P: Put it in N' (visited set)
  A: Again — repeat until all visited

IPV6 ABBREVIATION RULES (in order):
  Rule 1: Drop LEADING zeros (not all zeros, just leading ones in each group)
  Rule 2: Replace LONGEST consecutive all-zero group run with :: (only ONCE)
  Trap: if two equal-length zero runs exist, choose the FIRST one by convention

BELLMAN-FORD:
  dx(y) = min_v { c(x,v) + dv(y) }
  "Your distance to y = min (your cost to a neighbor v + that neighbor's distance to y)"`,
    keyPoints: [
      "GBN max = 2^k−1. SR max = 2^k/2. GBN window > SR window always.",
      "TCP timeout: ERTT + 4×DevRTT. α=0.125 (=1/8). β=0.25 (=1/4).",
      "IP classes by first byte: A=1-126, B=128-191, C=192-223, D=224-239, E=240-255.",
      "DHCP DORA. CRC: append r zeros, XOR divide, remainder = R, transmit D+R.",
      "Congestion phases: Slow Start (exponential), CA (linear +1/RTT), Fast Recovery (Reno only).",
      "Dijkstra PUPA: Pick min, Update neighbors, Put in N', Again.",
    ],
    formula: {
      code: `ALL UNIT 3 FORMULAS IN ONE PLACE:

=== SLIDING WINDOW ===
GBN max window  = 2^k − 1
SR  max window  = 2^k / 2

=== TCP FORMULAS ===
EstimatedRTT  = (1−α)×EstRTT + α×SampleRTT    [α=0.125]
DevRTT        = (1−β)×DevRTT + β×|Sample−Est|  [β=0.25]
TimeoutInterval = EstimatedRTT + 4×DevRTT
rwnd          = RcvBuffer − (LastByteRcvd − LastByteRead)
Sender limit  : LastByteSent − LastByteACKed ≤ min(cwnd, rwnd)
TCP rate      ≈ cwnd / RTT  (bytes/sec)

=== CONGESTION CONTROL ===
Slow Start    : cwnd × 2 per RTT (start at 1 MSS)
Cong Avoid    : cwnd + 1 MSS per RTT
ssthresh      : set to cwnd/2 on any loss event
Reno 3 dup    : cwnd = ssthresh+3, enter Fast Recovery
Reno timeout  : cwnd = 1, ssthresh = prev_cwnd/2, Slow Start
Tahoe any loss: cwnd = 1, ssthresh = prev_cwnd/2, Slow Start

=== IP ADDRESSING ===
Total hosts   = 2^(32−x)
Usable hosts  = 2^(32−x) − 2
To create N subnets: add log2(N) bits to prefix

=== IP FRAGMENTATION ===
Max data/frag = MTU − 20
Frag offset   = cumulative_data_bytes / 8
MF=1 all frags except last; MF=0 on last

=== DELAYS (from Unit 1, still relevant) ===
d_prop = distance / propagation_speed
d_trans = L_bits / R_bps

=== CRC ===
r = degree(G). Append r zeros to D.
R = (D·2^r) XOR-mod G
Transmit T = D concatenated with R`,
      explanation:
        "Print this. Circle every formula that appears in at least one PYQ. That's your exam sheet.",
    },
    examTips: [
      "UNIT CONVERSIONS: 1 byte = 8 bits. Always convert before using L/R formulas.",
      "Fragment offset: ALWAYS divide by 8. NEVER forget this step.",
      "Reno: 3 dup ACKs → half, NOT to 1. Timeout → 1. Tahoe: ALL losses → 1.",
      "DHCP ports: 67 (server), 68 (client). Always broadcast for Discover and Request.",
      "CRC: r = degree of G = number of CRC bits appended. G has r+1 bits total.",
      "Dijkstra: fill the table row by row. Mark '—' when node is added to N'. Never update a visited node.",
    ],
    questions: [
      {
        q: "Quick recall: what is the Bellman-Ford equation and in English what does it say?",
        a: "dx(y) = min over all neighbors v { c(x,v) + dv(y) }. In English: 'The best distance from x to destination y is the minimum, over all of x's direct neighbors v, of the cost to reach v directly plus v's current best-known distance to y.' This is the update equation for Distance Vector routing.",
      },
      {
        q: "Quick recall: what are the 4 steps of DHCP, including source/dest addresses for each?",
        a: "1. Discover: client→broadcast. src=0.0.0.0:68, dst=255.255.255.255:67. 2. Offer: server→client. src=server_IP:67, dst=255.255.255.255:68. Includes offered IP, mask, gateway, DNS, lease. 3. Request: client→broadcast. src=0.0.0.0:68, dst=255.255.255.255:67. Client still has no IP. 4. ACK: server→client. Confirms the IP. Client can now configure its interface.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 📝 PYQ BANK
  // ══════════════════════════════════════════

  "pyq-bank": {
    title: "PYQ Bank — All Worked Problems",
    emoji: "📝",
    tldr:
      "All Unit 3 previous year questions with full solutions. Covers ESA May 2023, Jul 2023, Dec 2023, Jan-May 2024, Dec 2024.",
    explanation: `All PYQs from recent ESA papers with complete worked solutions.

══════════════════════════════════
ESA MAY 2023
══════════════════════════════════

Q3.a [TCP Segments — 8 marks]:
Host B received bytes through 126. A sends Seg1(seq=127, 80B) and Seg2(40B).
(1) Seg2 seq#=127+80=207; src=302; dst=80.
(2) B's ACK after Seg1: ACK#=207, src=80, dst=302.
(3) Seg2 arrives first: B has gap at 127. Sends duplicate ACK=127 (still waiting for byte 127).
(4) Timing: Seg1+Seg2 sent, ACK=207 lost, ACK=247 arrives after timeout.
    Cumulative ACK=247 covers bytes 0–246. A retransmits Seg1 after timeout. B sends ACK=247.

Q3.b [UDP Checksum — 5 marks]:
Words: 0x7BD0 + 0xC3EB = 0x13FBB → wrap carry → 0x3FBC → checksum = 0xC043.

Q3.c [Congestion Control — 4 marks]:
From graph: exponential growth rounds 1–6 = Slow Start.
cwnd drops from ~32 to ~16 at round 15 → triple dup ACK (Reno halves). Not timeout (would drop to 1).

Q3.d [Handshake — 3 marks]:
3-way handshake: SYN, SYNACK, ACK. SYN/FIN each consume 1 seq#. FIN needed from both sides (full-duplex).

Q4.a [Longest Prefix — 3 marks]:
Dest=10110001: matches "10"(int 1) AND "101"(int 3). Longest = 101 → Interface 3.
Dest=10000110: only "10" matches → Interface 1.
Dest=01001011: nothing matches → Interface 6 (otherwise).

Q4.b [Subnetting — 4 marks]:
128.119.40.64/26 → 64 addresses. 4 subnets → /28. Each has 16 addresses.
Subnet 1: .64/28, Subnet 2: .80/28, Subnet 3: .96/28, Subnet 4: .112/28.

Q4.c [NAT — 5 marks]:
Host 10.0.1.13 → server 128.119.165.188:80 from port 3322.
Before NAT: src=10.0.1.13:3322. After NAT: src=135.122.200.213:5001.
Reply before NAT: dst=135.122.200.213:5001. Reply after NAT: dst=10.0.1.13:3322.

Q4.d [Dijkstra — 8 marks]:
Source=t. Shortest paths: u=2, v=3(via u), w=5(via u), y=7, x=11(via u-v), z=15(via y).

══════════════════════════════════
ESA JUL 2023
══════════════════════════════════

Q3.a [TCP Ports]:
If A uses src=x, dst=y, then B's reply: src=y, dst=x (ports reversed).

Q3.d [TCP Segments]:
Seg1 seq=90, Seg2 seq=110.
(a) Seg1 data = 110−90 = 20 bytes.
(b) Seg1 lost, Seg2 arrives: cumulative ACK can't advance past 90. B sends ACK=90.

Q4.a [Subnetting]:
131.20.0.0/24 PES campus, 4 subnets.
Sub1: 131.20.0.0/26 (62 hosts), Sub2: 131.20.0.64/27 (30 hosts).
Sub3: 131.20.0.96/27 (30 hosts), Sub4: 131.20.0.128/25 (126 hosts).

══════════════════════════════════
ESA DEC 2023
══════════════════════════════════

Q3.c [Handshake — 5 marks]:
Same as May 2023 Q3.d. Explain 3-way handshake. SYN+FIN consume seq#s.

Q3.d [GBN vs SR — PYQ]:
Window=3, every 5th tx lost, 10 packets.
GBN: 18 total. Efficiency=10/18=5/9≈0.556.
SR: 12 total. Efficiency=10/12=5/6≈0.833.

Q4.a [Subnetting]:
130.56.0.0/16, 1024 subnets → need 10 subnet bits → /26.
Each subnet: 64 addresses (62 usable hosts).

Q4.b [DHCP — 5 marks]:
DORA process. Discover: src=0.0.0.0:68, dst=255.255.255.255:67.
DHCP provides: IP, subnet mask, gateway, DNS, lease time.

Q4.d [IPv6 Tunneling]:
A(v6)—B(v6+v4)—C(v4)—D(v4)—E(v6+v4)—F(v6).
Tunnel entry at B: wrap IPv6 in IPv4 (outer: src=B_v4, dst=E_v4).
IPv4 routers see only outer. Tunnel exit at E: strip outer. Forward IPv6 to F.

══════════════════════════════════
ESA JAN-MAY 2024 (UE22CS252B)
══════════════════════════════════

Q2.a [Demultiplexing]:
Two browser tabs open. TCP uses 4-tuple (src_IP, src_port, dst_IP, dst_port).
Same dst port 443 is fine — different connections distinguished by different src_port and server addresses.

Q3.a [NAT Misconception]:
"UDP doesn't work with NAT" is FALSE. NAT maps (IP,port) tuples, works for both TCP and UDP.

Q3.b [Router Delays]:
Packet=1500B, rate=10Mbps, dist=15km, speed=2×10^8.
d_trans=1.2ms, d_prop=0.075ms, total=1.275ms.

Q3.c [GBN vs SR]:
Same as Dec 2023 Q3.d. Answer: GBN=18 total (5/9). SR=12 total (5/6).

Q3.d [Congestion Control]:
Reno vs Tahoe. Reno: 3 dup ACKs → fast recovery (cwnd=half+3). Tahoe: goes to 1.
Reno recovers faster, maintains higher throughput.

Q4.c [Distance Vector]:
Network A-F. C routes to E directly (cost 4 < via others). E routes to B via F (cost 2+4=6).

Q4.d [IPv6]:
Abbreviation rules. Same as Dec 2023 Q4.d.

Q5.a [CRC]:
D=1011010, G=10011. Append 4 zeros. XOR divide. R=1110. Transmitted=10110101110.

══════════════════════════════════
ESA DEC 2024
══════════════════════════════════

Q3.a [Dijkstra]:
Nodes 0-6. Edges given. Source=0.
Final: D(1)=2, D(2)=6, D(3)=6, D(4)=14, D(5)=16, D(6)=12.

Q3.d [CRC]:
G=10011, D=1010101010. Append 4 zeros: 10101010100000.
After XOR division: R=0100. Transmitted: 10101010100100.

Q4.d [IPv6]:
Abbreviate and expand addresses (same style as Jan-May 2024).`,
    keyPoints: [
      "GBN vs SR efficiency: GBN=10/18≈0.556, SR=10/12≈0.833 (window=3, every 5th lost)",
      "TCP segment: seq2 = seq1 + length(seg1). ACK = last received byte + 1.",
      "NAT 4-step trace: before outgoing, after outgoing, before return, after return.",
      "Dijkstra: 8-mark question — always draw full step table.",
      "CRC: append r zeros, XOR divide, R = remainder, transmit D+R.",
      "Subnetting: total = 2^(32−x), usable = 2^(32−x)−2, new prefix = old + log2(N_subnets).",
    ],
    formula: {
      code: `ALL PYQ FORMULAS IN ONE PLACE:

=== SLIDING WINDOW ===
GBN max window = 2^k − 1
SR  max window = 2^k / 2

Efficiency PYQ: window=3, every 5th transmission lost
  GBN: 18 total, efficiency = 10/18 = 5/9 ≈ 0.556
  SR:  12 total, efficiency = 10/12 = 5/6 ≈ 0.833

=== TCP SEGMENTS ===
Seq# of seg2 = seq#_of_seg1 + length(seg1)
ACK# = last byte received + 1
ACK# of reply = seq# of arriving segment + its length
Ports reversed: if A uses (src=x, dst=y) → B uses (src=y, dst=x)

=== TCP CONGESTION CONTROL ===
Timeout any TCP:       ssthresh = cwnd/2, cwnd = 1, SS
3 dup ACKs Tahoe:      ssthresh = cwnd/2, cwnd = 1, SS
3 dup ACKs Reno:       ssthresh = cwnd/2, cwnd = ssthresh+3, FR

=== IP FRAGMENTATION ===
Max data = MTU − 20
Offset = cumulative_bytes / 8
MF: all=1 except last=0

=== SUBNETTING ===
N subnets from /x → new prefix = x + log2(N)
Hosts = 2^(32−new_prefix) − 2

=== CRC (PYQ numbers) ===
D=1011010, G=10011 → R=1110 → T=10110101110
D=1010101010, G=10011 → R=0100 → T=10101010100100

=== ROUTING ===
Dijkstra: pick min, update neighbors, mark done, repeat
BF: dx(y) = min_v { c(x,v) + dv(y) }`,
      explanation:
        "Use this section as your final revision checklist. Every formula here has appeared in at least one ESA paper.",
    },
    examTips: [
      "GBN vs SR efficiency: answer is always 10/18 and 10/12 for the standard PYQ — memorize these.",
      "Dijkstra table: draw it in the exam. Rows = steps. Columns = nodes. '—' when node is confirmed.",
      "NAT: always trace all 4 steps. src IP changes at step 2 (outgoing NAT). dst IP changes at step 4 (return NAT).",
      "TCP: ACK# = last byte received + 1. Ports always reversed in reply (src↔dst).",
      "CRC: verify your answer by dividing T by G — should get remainder 0.",
      "DHCP: draw the 4-step diagram with actual src/dst addresses — that's what Dec 2023 Q4.b wanted.",
    ],
    questions: [
      {
        q: "Mega-revision: list all the formula categories in Unit 3 and give one key formula for each.",
        a: "GBN window = 2^k−1 | SR window = 2^k/2 | EstimatedRTT = 0.875×old + 0.125×new | DevRTT = 0.75×old + 0.25×|diff| | Timeout = EstRTT + 4×DevRTT | rwnd = RcvBuffer − (LastByteRcvd−LastByteRead) | TCP rate ≈ cwnd/RTT | ssthresh on loss = cwnd/2 | Usable hosts = 2^(32−x)−2 | Frag offset = bytes/8 | Dijkstra: dx(y) = pick min, update | BF: dx(y) = min{c(x,v)+dv(y)} | CRC: append r zeros, XOR divide, R=remainder | Checksum: sum all 16-bit words + wrap carry + 1's complement",
      },
      {
        q: "Unit 3 most important distinctions: list 5 pairs of things that are easy to confuse.",
        a: "(1) GBN vs SR: GBN discards OOO, SR buffers OOO. (2) Slow Start vs Congestion Avoidance: exponential vs linear cwnd growth. (3) Timeout vs 3 dup ACKs in Reno: timeout→cwnd=1 (severe), 3 dup ACKs→cwnd=half (mild). (4) Flow control (rwnd, receiver buffer) vs Congestion control (cwnd, network capacity). (5) Forwarding (data plane, hardware, ns) vs Routing (control plane, software, ms). Bonus: GBN max=2^k−1 vs SR max=2^k/2.",
      },
    ],
  },
};
