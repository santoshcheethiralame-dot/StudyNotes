// cn/unit1.js — Computer Networks Unit 1: Introduction & Application Layer
// Kurose & Ross, 8th Edition | ESA PYQs: May 2023, Jan-May 2024, Dec 2023, Dec 2024
//
// Exports: { groups, topics }
// groups → Array<{ name: string, ids: string[] }>
// topics → Record<id, { title, emoji, tldr, explanation, keyPoints, formula?, examTips, questions }>

// ─────────────────────────────────────────────
// GROUPS
// ─────────────────────────────────────────────

export const groups = [
  {
    name: "🌐 Internet & Network Edge",
    ids: ["internet-overview", "network-edge", "internet-structure"],
  },
  {
    name: "🔁 Network Core & Switching",
    ids: ["packet-switching", "circuit-switching", "ps-vs-cs"],
  },
  {
    name: "⏱️ Delay, Loss & Throughput",
    ids: ["delay-types", "queuing-loss", "throughput", "bandwidth-delay-product"],
  },
  {
    name: "📚 Protocol Layers & Devices",
    ids: ["tcpip-osi", "transport-services", "network-devices"],
  },
  {
    name: "🌍 Application Layer & HTTP",
    ids: [
      "app-layer-principles",
      "http-persistent",
      "http-messages",
      "https-tls",
      "web-caching",
      "cookies",
    ],
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
  // 🌐 INTERNET & NETWORK EDGE
  // ══════════════════════════════════════════

  "internet-overview": {
    title: "What is the Internet?",
    emoji: "🌐",
    tldr:
      "The Internet is a network of networks — billions of hosts connected by routers and links, governed by protocols. Two views: nuts-and-bolts (hardware) and services (infrastructure for apps).",
    explanation: `The Internet can be viewed two ways:

NUTS-AND-BOLTS VIEW:
The Internet is a massive network of networks interconnecting billions of computing devices worldwide.

Key components:
• Hosts (End Systems): Devices at the "edge" — PCs, servers, smartphones, IoT devices. ~41 billion IoT devices expected by 2027.
• Packet Switches: Devices that forward packets — primarily routers (network layer) and link-layer switches.
• Communication Links: Physical media connecting devices — fiber optic, copper, radio, satellite. Each link has a transmission rate (bandwidth) in bits/sec.
• Networks: Collections of devices, routers, and links managed by an organization.

SERVICES VIEW:
The Internet is infrastructure that provides services to applications — web browsing, streaming, email, gaming, social media. It provides a programming interface (sockets) — "hooks" that allow distributed apps to connect and use Internet transport services.

WHAT IS A PROTOCOL?
A protocol defines the format, order of messages exchanged among network entities, and the actions taken on message transmission or receipt. Protocols govern ALL communication activity on the Internet.

Human analogy: saying "Hi" → getting "Hi" back → asking a question → getting an answer. If someone ignores the protocol, communication fails.

Network example: TCP connection request → TCP connection response → GET request → file received.`,
    keyPoints: [
      "Internet = network of networks, interconnecting billions of devices",
      "~41 billion IoT devices expected by 2027",
      "Hosts = end systems at the edge; packet switches forward packets",
      "Communication links have a transmission rate (bandwidth) in bps",
      "Protocols define format, order, and actions for ALL network communication",
      "Two views: nuts-and-bolts (hardware) and services (infrastructure for apps)",
      "Socket = programming interface between app and transport layer",
    ],
    formula: {
      code: `Packet transmission delay = L (bits) / R (bits/sec)

Example:
  L = 10,000 bits (10 Kbits)
  R = 100 Mbps = 100,000,000 bps
  d_trans = 10,000 / 100,000,000 = 0.0001 sec = 0.1 ms`,
      explanation:
        "The time to push all bits of a packet onto a link. Function of packet size and link rate — nothing to do with distance.",
    },
    examTips: [
      "Protocols are tested frequently — know the human analogy and network example",
      "IoT stat: ~41 billion by 2027 (8th edition figure)",
      "Two views of the Internet are often asked as a short-answer question",
      "Socket is the API between application and transport — not a physical thing",
    ],
    questions: [
      {
        q: "What are the two ways to describe the Internet? Give key components of each.",
        a: "Nuts-and-bolts: hosts, packet switches (routers + link-layer switches), communication links, networks. Services: infrastructure providing services to apps via sockets (programming interface).",
      },
      {
        q: "What does a protocol define?",
        a: "Format, order of messages sent and received among network entities, and the actions taken on message transmission or receipt. Protocols govern ALL network communication.",
      },
      {
        q: "What is a socket?",
        a: "The programming interface (API) between the application layer and the transport layer — the 'door' through which an application sends and receives messages.",
      },
    ],
  },

  "network-edge": {
    title: "Network Edge & Access Networks",
    emoji: "🏠",
    tldr:
      "The network edge is where end systems live. Access networks connect hosts to the first router (edge router). Types: DSL, Cable/HFC, WiFi, Cellular. Physical media: twisted pair, coax, fiber, radio.",
    explanation: `The network edge consists of hosts (end systems) — divided into clients (PCs, smartphones) and servers (in data centers).

ACCESS NETWORKS connect end systems to the first router (edge router) on the path to another end system. Two key metrics: (1) transmission rate in bps, (2) shared or dedicated.

DSL (Digital Subscriber Line):
• Uses existing telephone line to central office DSLAM
• Asymmetric: downstream 24–52 Mbps, upstream 3.5–16 Mbps
• FREQUENCY BANDS: 0–4 kHz (voice), 4–50 kHz (upstream), 50 kHz–1 MHz (downstream)
• Dedicated line to central office (not shared)

Cable-Based Access (HFC — Hybrid Fiber Coax):
• Frequency Division Multiplexing (FDM) — different channels at different frequencies
• Asymmetric: downstream up to 40 Mbps–1.2 Gbps, upstream 30–100 Mbps
• SHARED — all homes share access network to cable headend (CMTS)

Enterprise Access (Ethernet):
• Wired: 100 Mbps, 1 Gbps, 10 Gbps
• WiFi: 11, 54, 450 Mbps (802.11b/g/n)

Wireless:
• WLANs (WiFi 802.11): within/around building (~30m), up to 450 Mbps
• Wide-area cellular (4G/5G): 10s km range, 10s Mbps

PHYSICAL MEDIA (Guided — solid medium):
• Twisted Pair (TP): Cat5 = 100 Mbps–1 Gbps; Cat6 = 10 Gbps
• Coaxial Cable: bidirectional, broadband (100s Mbps per channel)
• Fiber Optic: glass + light pulses; 10s–100s Gbps; immune to EM noise; low error rate

PHYSICAL MEDIA (Unguided — free propagation):
• Terrestrial microwave: 45 Mbps per channel
• WiFi: 100s Mbps
• 4G cellular: ~10s Mbps
• Satellite (geostationary): 45 Mbps per channel, ~270ms propagation delay`,
    keyPoints: [
      "DSL freq bands: 0–4 kHz voice | 4–50 kHz upload | 50 kHz–1 MHz download",
      "DSL = dedicated; Cable/HFC = SHARED among neighborhood",
      "HFC uses FDM (Frequency Division Multiplexing)",
      "Physical media speed (slowest to fastest): Twisted Pair → Coaxial → Fiber Optic",
      "Fiber: 10s–100s Gbps, immune to EM noise, very low error rate",
      "Satellite (geostationary): ~270ms propagation delay — huge BDP",
      "WiFi (802.11): ~30m range; 4G: 10s km range",
    ],
    formula: {
      code: `DSL Frequency Bands (VUD mnemonic):
  Voice    :   0 –   4 kHz   (traditional telephone)
  Upload   :   4 –  50 kHz   (upstream data)
  Download :  50 kHz – 1 MHz  (downstream data — largest band)

Speed order (slowest → fastest):
  Twisted Pair (Cat5) : 100 Mbps – 1 Gbps
  Coaxial             : 100s Mbps per channel
  Fiber Optic         : 10 – 100+ Gbps`,
      explanation:
        "Download gets the most bandwidth in DSL (asymmetric design). Fiber is fastest and immune to electromagnetic interference.",
    },
    examTips: [
      "DSL freq band boundary: 4 kHz (voice/upload) and 50 kHz (upload/download) — memorize these numbers",
      "DSL is dedicated; cable HFC is SHARED — common exam distinction",
      "Satellite propagation delay ≈ 270ms (geostationary) — relevant for BDP problems",
      "Fiber = immune to electromagnetic noise (unlike copper)",
      "HFC headend device = CMTS; DSL central office device = DSLAM",
    ],
    questions: [
      {
        q: "What are the three frequency bands in DSL, and which gets the most bandwidth?",
        a: "0–4 kHz (voice), 4–50 kHz (upstream), 50 kHz–1 MHz (downstream). Downstream gets the most bandwidth — that's why DSL is asymmetric (faster download than upload).",
      },
      {
        q: "What is the key difference between DSL and Cable/HFC in terms of sharing?",
        a: "DSL is a dedicated line from each home to the central office — you don't share bandwidth with neighbors. Cable HFC is a shared medium — all homes in a neighborhood share the coaxial cable to the headend (CMTS).",
      },
      {
        q: "Why does fiber optic have very low error rates?",
        a: "Fiber uses light pulses through glass, not electrical signals through copper. It is completely immune to electromagnetic interference, which is the main source of bit errors in copper media.",
      },
    ],
  },

  "internet-structure": {
    title: "Internet Structure: Network of Networks",
    emoji: "🗺️",
    tldr:
      "End systems connect to access ISPs → regional ISPs → Tier-1 ISPs. Key concepts: PoPs, IXPs, multi-homing, peering. Today's Internet is hierarchical with content provider networks (Google, Akamai) running private backbones.",
    explanation: `End systems connect to the Internet via access ISPs. Every ISP must be interconnected so any two hosts can communicate.

EVOLUTION OF INTERNET STRUCTURE:
1. Option 1: Each access ISP connects to every other → O(N²) connections — doesn't scale.
2. Network Structure 1: All connect to one global transit ISP (customer-provider relationship).
3. Network Structure 2: Multiple competing global ISPs.
4. Network Structure 3: Global ISPs interconnect via peering links and IXPs.
5. Network Structure 4: Regional ISPs connect access ISPs to global ISPs.
6. Network Structure 5: Content provider networks (Google, Akamai) run private networks.

TODAY'S INTERNET (hierarchical structure):
• Center: small number of well-connected Tier-1 ISPs (Level 3, Sprint, AT&T, NTT) — national/international coverage
• Content provider networks: Google, Facebook — private networks connecting data centers, often bypassing Tier-1/regional ISPs
• Regional ISPs connect access ISPs to higher tiers
• IXPs allow ISPs to peer directly (reducing transit costs)

KEY DEFINITIONS (PYQ Q1c May 2023):
1. Points of Presence (PoPs): A group of routers in the provider's network where customer ISPs can connect. Exists at every level except the bottom (access ISPs).
2. Internet Exchange Points (IXPs): A meeting point (standalone building with its own switches) where multiple ISPs can peer together — allows direct traffic exchange.
3. Multi-homing: An access ISP connects to two or more provider ISPs for redundancy. If one fails, traffic routes through the other.
4. Peering: Two nearby ISPs at the same level agree to directly connect their networks and exchange traffic without paying each other (settlement-free). Reduces costs by avoiding upstream transit fees.`,
    keyPoints: [
      "PoP = group of provider routers where customer ISPs connect",
      "IXP = standalone meeting point where ISPs peer directly (own building + switches)",
      "Multi-homing = ISP connects to 2+ providers for redundancy",
      "Peering = settlement-free direct exchange between ISPs at same level",
      "Tier-1 ISPs are at the center (national/international, e.g. AT&T, NTT)",
      "Content providers (Google, Akamai) bypass Tier-1 ISPs with private networks",
      "O(N²) connections needed if every ISP directly connected to every other",
    ],
    examTips: [
      "PoP vs IXP: PoP is provider routers; IXP is neutral meeting point for peering",
      "Peering is settlement-FREE (no payment between peers)",
      "Multi-homing = redundancy (connects to multiple upstream providers)",
      "ESA May 2023 Q1c tested PoP, IXP, multi-homing, peering definitions",
      "Content provider networks often BYPASS Tier-1 — reduces costs and latency",
    ],
    questions: [
      {
        q: "Define PoP and IXP. How are they different?",
        a: "PoP (Points of Presence): A group of routers in a provider ISP's network where customer ISPs can connect — it's part of the provider's infrastructure. IXP (Internet Exchange Point): A neutral meeting point (standalone building with its own switches) where multiple ISPs can peer directly with each other — not owned by any one ISP.",
      },
      {
        q: "What is peering and why do ISPs do it?",
        a: "Peering is a settlement-free agreement between two ISPs at the same hierarchy level to directly connect and exchange traffic without paying each other. ISPs peer to reduce costs — instead of routing through an expensive upstream Tier-1 ISP, they exchange local traffic directly.",
      },
      {
        q: "What is multi-homing and why is it used?",
        a: "Multi-homing is when an access ISP connects to two or more upstream provider ISPs. The main benefit is redundancy: if one provider's link fails, traffic can still reach the Internet through the other provider.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 🔁 NETWORK CORE & SWITCHING
  // ══════════════════════════════════════════

  "packet-switching": {
    title: "Packet Switching & Store-and-Forward",
    emoji: "📦",
    tldr:
      "Hosts break messages into packets; routers forward each packet independently at full link capacity. Store-and-forward: entire packet must arrive before forwarding. End-to-end delay (no queuing) = N × L/R.",
    explanation: `The network core is a mesh of interconnected routers. The fundamental question: how is data transferred through the network?

PACKET SWITCHING:
Hosts break application-layer messages into packets. The network forwards packets from one router to the next, across links on the path from source to destination. Each packet is transmitted at full link capacity.

STORE-AND-FORWARD:
The ENTIRE packet must arrive at a router before it can be transmitted on the next link.

Why? The router must receive all bits to check for errors and determine the output link before it can forward.

End-to-end delay for one packet over N links (no propagation delay, no queuing):
  d_e2e = N × (L/R)

Example: L = 10 Kbits, R = 100 Mbps → one-hop delay = 10,000 / 100,000,000 = 0.1 ms

FORWARDING vs ROUTING:
• Forwarding (local): Move arriving packets from router's input link to appropriate output link using a forwarding table (lookup by destination address in header). This is the DATA PLANE.
• Routing (global): Determine source-destination paths using routing algorithms (OSPF, BGP). This is the CONTROL PLANE.

QUEUING DELAY AND LOSS:
If arrival rate exceeds transmission rate for some period:
• Packets queue (wait) in the output buffer
• Packets are dropped (lost) if the buffer fills up
  
This is the key limitation of packet switching — bursty traffic can cause congestion.`,
    keyPoints: [
      "Store-and-forward: entire packet must arrive at router before forwarding",
      "End-to-end delay (no prop/queuing) = N × L/R for one packet over N links",
      "Forwarding = local action (forwarding table, data plane)",
      "Routing = global action (routing algorithms like OSPF/BGP, control plane)",
      "Packets are forwarded at full link capacity (not divided)",
      "Buffer overflow → packet loss (drop)",
      "Each packet routed independently — may take different paths",
    ],
    formula: {
      code: `Store-and-forward end-to-end delay (1 packet, N links, no queuing):
  d_e2e = N × (L / R)

Example: L = 8000 bits, R = 2 Mbps, N = 3 links
  d_e2e = 3 × (8000 / 2,000,000) = 3 × 0.004 = 0.012 sec = 12 ms

With propagation delay added per link:
  d_e2e = N × (L/R + d_prop_per_link)

For multiple packets (P packets, N links, ignoring propagation):
  d_e2e = (N + P - 1) × (L/R)
  [pipeline effect — last packet exits after N hops but first (P-1) already used (N-1) hops]`,
      explanation:
        "Store-and-forward means each router adds one full L/R delay. With N links, that's N × L/R. Pipelining means additional packets only add one more L/R each.",
    },
    examTips: [
      "Store-and-forward: must receive entire packet — common exam question",
      "d_e2e = N × L/R assumes no propagation delay and no queuing",
      "Forwarding = data plane (local, fast). Routing = control plane (global, slow).",
      "Forwarding table is looked up using destination IP address in header",
      "Packet loss = buffer overflow (no room in queue)",
    ],
    questions: [
      {
        q: "A packet of 1500 bytes is sent over 3 links, each at 1 Mbps. What is the end-to-end transmission delay? (Ignore propagation.)",
        a: "L = 1500 × 8 = 12,000 bits. L/R = 12,000 / 1,000,000 = 0.012 sec = 12 ms per hop. Total = 3 × 12 ms = 36 ms.",
      },
      {
        q: "Why must a router wait for the entire packet before forwarding? (Store-and-forward principle)",
        a: "The router needs all bits to: (1) perform error checking (CRC), and (2) look up the forwarding table based on the complete header. You can't route based on a partial header.",
      },
      {
        q: "What is the difference between forwarding and routing?",
        a: "Forwarding is local (data plane): move packet from input link to correct output link using a pre-built forwarding table. Routing is global (control plane): run algorithms (like OSPF, BGP) to determine the paths and build those forwarding tables.",
      },
    ],
  },

  "circuit-switching": {
    title: "Circuit Switching (FDM & TDM)",
    emoji: "📞",
    tldr:
      "End-to-end resources are reserved for a call. No sharing — guaranteed performance but wasteful if idle. Used in traditional telephone networks. Two types: FDM (frequency slices) and TDM (time slots).",
    explanation: `Circuit switching reserves dedicated end-to-end resources for a call between source and destination before data transmission begins.

KEY PROPERTIES:
• Dedicated resources: no sharing — guaranteed performance (like a reserved lane on a highway)
• Circuit segment idle if not used — wasteful for bursty data traffic
• Requires call setup before data can flow (setup delay)
• Traditionally used in telephone networks (PSTN)

FDM (Frequency Division Multiplexing):
• The frequency spectrum of the link is divided into narrow bands
• Each call gets its own frequency band for the duration of the call
• All users transmit simultaneously but at different frequencies
• Example: AM/FM radio, cable TV

TDM (Time Division Multiplexing):
• Time is divided into frames; each frame is divided into fixed slots
• Each call is allocated periodic time slots in every frame
• During its slot, a user can transmit at the full link frequency band
• The circuit rate per user = link_rate / number_of_slots

Example: 1.536 Mbps link, TDM with 24 slots → each circuit gets 64 kbps

CIRCUIT vs PACKET comparison:
• Circuit: resource reserved → no queuing delay once connected
• Packet: resources shared dynamically → possible queuing/loss`,
    keyPoints: [
      "Circuit switching reserves dedicated end-to-end resources for a call",
      "No sharing → guaranteed rate, but wasteful if circuit is idle",
      "Requires call setup before data can flow",
      "FDM: each user gets a dedicated frequency band simultaneously",
      "TDM: each user gets periodic time slots; rate = link_rate / num_slots",
      "Circuit rate (TDM) = link_rate / number_of_slots",
      "Total time = file_size / circuit_rate + call_setup_time",
    ],
    formula: {
      code: `TDM circuit rate:
  R_circuit = R_link / num_slots

Total transfer time (circuit switching):
  T_total = (file_size / R_circuit) + setup_time

ESA May 2023 Worked Example:
  File = 640,000 bits
  Link rate = 1.536 Mbps = 1,536,000 bps
  TDM with 24 slots
  Setup time = 500 ms

  Step 1: R_circuit = 1,536,000 / 24 = 64,000 bps = 64 kbps
  Step 2: Transfer time = 640,000 / 64,000 = 10 seconds
  Step 3: Total = 10 + 0.5 = 10.5 seconds`,
      explanation:
        "In TDM, divide the link rate by the number of slots to get each circuit's rate. Then divide file size by that rate. Add setup time at the end.",
    },
    examTips: [
      "TDM circuit rate = link_rate / num_slots — do this FIRST in any circuit switching problem",
      "Always add setup time at the end (it's separate from transfer time)",
      "FDM = frequency slices (simultaneous). TDM = time slices (one at a time per slot).",
      "Circuit = wasteful if idle. Packet = wasteful only when congested.",
      "TDM circuit rate = link_rate / num_slots. Divide first, then compute time.",
    ],
    questions: [
      {
        q: "ESA May 2023: How long to send a 640,000-bit file over a circuit-switched network? All links are 1.536 Mbps, TDM with 24 slots, circuit setup = 500ms.",
        a: "Each circuit gets: 1,536,000 / 24 = 64,000 bps = 64 kbps. Transfer time: 640,000 / 64,000 = 10 seconds. Total = 10 + 0.5 = 10.5 seconds.",
      },
      {
        q: "A link is 100 Mbps using FDM with 10 users. Each user gets what rate? What if it used TDM with 10 slots instead?",
        a: "FDM: each user gets 100/10 = 10 Mbps of dedicated frequency bandwidth — always. TDM: each user gets one slot per frame → also 100/10 = 10 Mbps during their slot, but they transmit at full 100 Mbps only during their slot (1/10 of the time). In both cases the effective rate per user is 10 Mbps.",
      },
      {
        q: "Why is circuit switching considered 'wasteful' for bursty data?",
        a: "In circuit switching, the reserved bandwidth is idle whenever the user isn't transmitting. For bursty data (like web browsing), the user transmits in short bursts with long idle periods. The reserved circuit sits unused — wasting expensive network capacity. Packet switching uses dynamic sharing, so idle capacity is available to others.",
      },
    ],
  },

  "ps-vs-cs": {
    title: "Packet vs Circuit Switching",
    emoji: "⚖️",
    tldr:
      "Packet switching supports more users and is better for bursty data. Circuit switching guarantees performance but wastes bandwidth when idle. Key: PS uses statistical multiplexing; CS reserves dedicated resources.",
    explanation: `Packet switching allows more users to share a link because it uses statistical multiplexing — resources are shared dynamically and only used when needed.

CLASSIC EXAMPLE (from textbook):
• 1 Gbps link, each user needs 100 Mbps when active, active 10% of time
• Circuit switching: 1,000 / 100 = 10 users maximum
• Packet switching: with 35 users, P(>10 active simultaneously) < 0.0004

WHY PACKET SWITCHING WINS FOR BURSTY DATA:
• Great for bursty data (web, email, file transfer — not always active)
• No resource reservation → more users can share
• Simpler — no call setup required
• Dynamic resource allocation → higher overall efficiency

WHY CIRCUIT SWITCHING WINS FOR VOICE:
• Guaranteed bandwidth → no queuing, predictable delay
• Consistent performance for real-time voice/video
• Traditional telephone networks use it

STATISTICAL MULTIPLEXING:
Packet switching doesn't guarantee any specific rate — it serves demand as it arrives. When multiple users happen to be active simultaneously → congestion → queuing delay or loss.`,
    keyPoints: [
      "Packet switching: connectionless, store-and-forward, dynamic resource sharing",
      "Circuit switching: connection-oriented, dedicated resources, no sharing",
      "PS advantages: more users, bursty data, no call setup, simpler",
      "CS advantages: guaranteed rate, no queuing delay, predictable delay",
      "Statistical multiplexing = PS uses capacity only when users are active",
      "PS bottleneck: congestion possible when many users active simultaneously",
      "CS designed for voice; PS designed for data",
    ],
    formula: {
      code: `Packet Switching vs Circuit Switching — Comparison Table:

Feature          | Packet Switching      | Circuit Switching
Type             | Connectionless        | Connection-oriented
Designed for     | Data (bursty)         | Voice (steady)
Flexibility      | Flexible              | Inflexible
Message order    | Out of order possible | Always same order
Technique        | Store & Forward       | FDM & TDM
Layer            | Network (L3)          | Physical (L1)
Bandwidth        | Dynamic (shared)      | Fixed (wasted if idle)
Delay type       | Queuing delay         | Call setup delay
Resources        | Shared (statistical)  | Reserved (dedicated)
Loss possible?   | Yes (buffer overflow) | No (if circuit up)`,
      explanation:
        "The fundamental trade-off: PS is efficient but non-deterministic. CS is deterministic but inefficient. Modern networks prefer PS for data; telephony historically used CS.",
    },
    examTips: [
      "CS = connection-oriented; PS = connectionless — this distinction is always asked",
      "CS is at Physical layer; PS is at Network layer",
      "With 2 Mbps link and 1 Mbps/user users: CS supports exactly 2 users; PS can support many more",
      "Congestion (delay + loss) is a disadvantage of PS that CS doesn't have",
    ],
    questions: [
      {
        q: "ESA May 2023 Q1b: Users share a 2 Mbps link. Each user transmits at 1 Mbps when active, active only 20% of time. (i) How many users with circuit switching? (ii) Why no queuing with ≤2 users in packet switching? (iii) Probability a given user is transmitting? (iv) With 3 users, probability all transmit simultaneously? Fraction of time queue grows?",
        a: "(i) 2 Mbps / 1 Mbps = 2 users (each needs full 1 Mbps when active). (ii) ≤2 users transmitting → aggregate ≤ 2 Mbps = link capacity → no queue. 3 users → 3 Mbps > 2 Mbps → queue builds. (iii) p = 0.2 (given: active 20% of time). (iv) P(all 3 active) = 0.2³ = 0.008 = 0.8%. Queue grows when all 3 active → 0.8% of the time.",
      },
      {
        q: "Why is packet switching 'better' for bursty data?",
        a: "Bursty data means users are only occasionally active. In circuit switching, you'd reserve bandwidth even during idle periods — pure waste. In packet switching, the idle user's capacity is available to active users, so the overall throughput of the shared link is much higher. PS efficiency comes from statistical multiplexing.",
      },
      {
        q: "What is a key disadvantage of packet switching that circuit switching doesn't have?",
        a: "Congestion: if many users happen to be active simultaneously, packets queue at routers. If buffers overflow, packets are dropped (lost). Circuit switching guarantees rate and has no queuing delay (once connected). PS also requires congestion control protocols (TCP), adding complexity.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // ⏱️ DELAY, LOSS & THROUGHPUT
  // ══════════════════════════════════════════

  "delay-types": {
    title: "The 4 Sources of Packet Delay",
    emoji: "⏱️",
    tldr:
      "d_nodal = d_proc + d_queue + d_trans + d_prop. CRITICAL: transmission delay depends on L and R (not distance). Propagation delay depends on distance and speed of light (not packet size or rate).",
    explanation: `Every packet at a router experiences four sources of delay. In order:

d_nodal = d_proc + d_queue + d_trans + d_prop

1. PROCESSING DELAY (d_proc):
   • Check bit errors (CRC), determine output link
   • Typically < 1 ms
   • Usually negligible in problems (assume 0 unless given)

2. QUEUING DELAY (d_queue):
   • Time waiting at output link buffer for transmission
   • Depends on congestion (arrival rate vs service rate)
   • Highly variable: microseconds to milliseconds
   • The most interesting/unpredictable of the four

3. TRANSMISSION DELAY (d_trans):
   • d_trans = L / R  (L = packet length in bits, R = link rate in bps)
   • Time to push ALL bits of the packet onto the link
   • Depends ONLY on packet length and link rate — NOT on distance

4. PROPAGATION DELAY (d_prop):
   • d_prop = d / s  (d = distance in meters, s = propagation speed ~2×10⁸ m/s)
   • Time for one bit to travel from one end of the link to the other
   • Depends ONLY on distance and medium — NOT on packet length or link rate

CRITICAL EXAM DISTINCTION:
   d_trans ≠ d_prop
   Transmission: function of L and R. "How long to get ALL bits on the wire."
   Propagation: function of d and s. "How long for the FIRST bit to reach the end."

CARAVAN ANALOGY:
   Cars = bits, Caravan = packet, Toll booth = router
   10 cars, 12 sec/car service → Transmission = 10 × 12 = 120 sec
   100 km apart, cars travel 100 km/hr → Propagation = 100/100 = 1 hour = 3600 sec
   Total = 120 + 3600 = 3720 sec = 62 minutes`,
    keyPoints: [
      "d_nodal = d_proc + d_queue + d_trans + d_prop",
      "d_trans = L/R → depends on PACKET LENGTH and LINK RATE (not distance!)",
      "d_prop = d/s → depends on DISTANCE and MEDIUM (not packet size or rate!)",
      "Propagation speed in copper/fiber ≈ 2×10⁸ m/s; in vacuum ≈ 3×10⁸ m/s",
      "Queuing delay is most variable (depends on congestion)",
      "Processing delay is typically < 1ms and often ignored",
      "Caravan analogy: cars=bits, toll service=transmission, road travel=propagation",
    ],
    formula: {
      code: `Total nodal delay:
  d_nodal = d_proc + d_queue + d_trans + d_prop

Transmission delay:
  d_trans = L / R
  (L in bits, R in bps, result in seconds)

Propagation delay:
  d_prop = d / s
  (d in meters, s in m/s, result in seconds)

End-to-end delay (N links, 1 packet, ignore proc/queuing):
  d_e2e = N × (d_trans + d_prop)
        = N × (L/R + d/s)

PYQ Example (ESA May 2023 Q1a):
  Packet = 1000 bytes = 8000 bits
  Distance = 2500 km = 2,500,000 m
  Speed = 2.5 × 10⁸ m/s
  Rate = 2 Mbps

  d_prop = 2,500,000 / (2.5×10⁸) = 0.01 sec = 10 ms
  d_trans = 8000 / 2,000,000 = 0.004 sec = 4 ms

PYQ Example (Jan-May 2024 Q1a):
  R = 20 Mbps, L = 1000 bits
  d_trans = 1000 / (20×10⁶) = 50 μs = 0.05 ms

Three-Link Example (from slides):
  Link 1: 100 Mbps, 3 km    → d_trans=80μs,   d_prop=10μs   → 90μs
  Link 2: 1000 Mbps, 500 km → d_trans=8μs,    d_prop=1670μs → 1678μs
  Link 3: 10 Mbps, 3 km     → d_trans=800μs,  d_prop=10μs   → 810μs
  Total = 90 + 1678 + 810 = 2578 μs ≈ 2.578 ms`,
      explanation:
        "The two most confused delays: d_trans = L/R (function of packet size and rate), d_prop = d/s (function of distance and medium speed). They are completely independent.",
    },
    examTips: [
      "MOST COMMON EXAM TRAP: confusing transmission delay with propagation delay",
      "d_trans = L/R — nothing to do with distance",
      "d_prop = d/s — nothing to do with packet length or link rate",
      "Convert km to m and bytes to bits BEFORE plugging into formulas",
      "Propagation speed in copper/fiber ≈ 2×10⁸ m/s (2/3 speed of light)",
      "The caravan analogy: toll booth service = d_trans; road travel = d_prop",
      "When question says 'propagate' → use d_prop formula only",
    ],
    questions: [
      {
        q: "Explain why propagation delay does NOT depend on packet length or transmission rate.",
        a: "Propagation delay is the time for a single bit to physically travel from one end of the link to the other. It's purely a function of distance and the physics of the medium (speed of light in that medium). The packet length doesn't matter because we're talking about one bit, and the transmission rate doesn't matter because the bit travels at the speed of the medium regardless of how fast the sender can push bits.",
      },
      {
        q: "ESA May 2023 Q1a: Packet = 1000 bytes, link distance = 2500 km, propagation speed = 2.5×10⁸ m/s, rate = 2 Mbps. (i) Propagation delay? (ii) Formula? (iii) Does it depend on packet length? (iv) On transmission rate?",
        a: "(i) d_prop = 2,500,000 / (2.5×10⁸) = 0.01 sec = 10 ms. (ii) d_prop = d/s. (iii) No — propagation depends only on distance and medium speed. (iv) No — propagation is independent of transmission rate.",
      },
      {
        q: "Caravan problem: 10 cars, service = 12 sec/car, 100 km between toll booths, cars travel 100 km/hr. What is total time from first car entering booth 1 to last car arriving at booth 2?",
        a: "Transmission (service) time = 10 × 12 = 120 sec = 2 min. Propagation time = 100 km / 100 km/hr = 1 hour = 60 min. Total = 2 + 60 = 62 minutes.",
      },
    ],
  },

  "queuing-loss": {
    title: "Queuing Delay & Packet Loss",
    emoji: "📉",
    tldr:
      "Traffic intensity I = La/R. When I < 1: queue manageable. I → 1: delay grows large. I > 1: queue grows without bound, average delay = ∞. Finite buffer → packet loss when full.",
    explanation: `TRAFFIC INTENSITY (I = La/R):
The ratio of the arrival rate to the service rate. The most important parameter for predicting queuing behavior.

Let:
  R = link bandwidth (bps)
  L = packet length (bits)
  a = average packet arrival rate (packets/sec)
  Traffic intensity I = La / R

BEHAVIOR:
• I ≈ 0  → very small queuing delay (almost always idle)
• I < 1  → some queuing, manageable
• I → 1  → queuing delay grows rapidly (approaches infinity)
• I > 1  → average delay = INFINITE — queue grows without bound
           (More bits arriving per second than can be served!)

DESIGN RULE: Always keep traffic intensity I < 1. In practice, keep it well below 1.

QUEUING DELAY FORMULA (for I < 1):
  d_queue = I × L / (R × (1 - I))

PACKET LOSS:
• Router buffers have finite capacity
• When a packet arrives at a FULL buffer → packet is DROPPED (lost)
• Lost packets may be retransmitted by source (TCP) or not at all (UDP)
• Loss rate = fraction of packets that are lost

PACKETIZATION DELAY (for real-time voice):
When voice is encoded and packetized, the first bit must wait for the ENTIRE packet to be assembled before transmission can begin. This is the packetization delay:
  d_packetize = L_bits / encoding_rate  (NOT link rate!)`,
    keyPoints: [
      "Traffic intensity I = La/R — MUST be < 1 for stable queue",
      "I > 1 → average delay = ∞ (queue grows unboundedly)",
      "d_queue = IL / (R(1-I)) — only valid when I < 1",
      "Packet loss = buffer overflow when queue is full",
      "Packetization delay = packet_bits / encoding_rate (not link rate)",
      "Packetization delay is counted BEFORE transmission delay for voice",
      "In practice, keep I well below 1 (not just < 1)",
    ],
    formula: {
      code: `Traffic intensity:
  I = La / R   (must be < 1!)

Queuing delay (when I < 1):
  d_queue = (I × L) / (R × (1 - I))

Queuing Delay Example (from slides):
  R = 1,800,000 bps, L = 7300 bits, a = 30 packets/sec
  I = (7300 × 30) / 1,800,000 = 219,000 / 1,800,000 = 0.1217
  d_queue = (0.1217 × 7300) / (1,800,000 × (1 - 0.1217))
          = 888.41 / 1,581,060
          ≈ 0.000561 sec ≈ 0.561 ms

Packetization delay (voice):
  d_packetize = L_bits / encoding_rate

ESA Jan-May 2024 Q1b (Packetization PYQ):
  Voice encoding: 64 kbps
  Packet size: 56 bytes = 56 × 8 = 448 bits
  Link rate: 2 Mbps
  Propagation: 10 ms

  Packetization delay = 448 / 64,000 = 0.007 sec = 7 ms
  Transmission delay  = 448 / 2,000,000 = 0.000224 sec = 0.224 ms
  Propagation delay   = 10 ms
  Total = 7 + 0.224 + 10 = 17.224 ms`,
      explanation:
        "Packetization delay uses ENCODING rate (64 kbps), not link rate (2 Mbps). The first bit must wait while the whole packet fills. This is added BEFORE transmission delay.",
    },
    examTips: [
      "Traffic intensity I = La/R — if I > 1, queue grows without bound (infinite delay)",
      "d_queue formula only valid for I < 1",
      "Packetization delay = L_bits / encoding_rate — uses CODEC rate, NOT link rate",
      "Add packetization delay BEFORE transmission delay for voice problems",
      "Packet loss occurs at FULL buffer — finite buffer is the cause",
      "304 Not Modified has NO body — bandwidth saved",
    ],
    questions: [
      {
        q: "ESA Jan-May 2024 Q1b: A phone encodes voice at 64 kbps into 56-byte packets. Link rate = 2 Mbps, propagation delay = 10 ms. Find total delay from when the first bit is generated to when decoding begins at the receiver.",
        a: "Packet size = 56 × 8 = 448 bits. Packetization delay (time to gather one packet): 448/64,000 = 7 ms. Transmission delay: 448/2,000,000 = 0.224 ms. Propagation delay: 10 ms. Total = 7 + 0.224 + 10 = 17.224 ms. NOTE: The first bit generated must wait for the entire 7ms packet to fill before transmission starts — this is the packetization delay.",
      },
      {
        q: "What happens to queuing delay as traffic intensity I approaches 1?",
        a: "Queuing delay grows dramatically and approaches infinity as I → 1. The formula d_queue = IL/(R(1-I)) shows this: as I→1, the denominator (1-I)→0, making d_queue→∞. If I > 1, arrival rate exceeds service rate and the queue grows without bound — packets will be dropped.",
      },
      {
        q: "R = 1 Mbps, L = 1000 bits, a = 900 packets/sec. What is I? Is the queue stable?",
        a: "I = La/R = (1000 × 900) / 1,000,000 = 900,000/1,000,000 = 0.9. I < 1, so queue is stable. d_queue = (0.9 × 1000) / (1,000,000 × 0.1) = 900/100,000 = 0.009 ms. But it's close to 1 so delay will be significant.",
      },
    ],
  },

  "throughput": {
    title: "Throughput & Bottleneck Links",
    emoji: "🚰",
    tldr:
      "Throughput = rate at which bits are delivered to receiver. End-to-end throughput = min(Rs, Rc) — the bottleneck. With N flows sharing link R, each gets min(Rs, Rc, R/N).",
    explanation: `THROUGHPUT:
The rate (bits/time) at which bits are transferred between sender and receiver.
• Instantaneous throughput: rate at a given point in time
• Average throughput: rate over a longer period

END-TO-END THROUGHPUT:
For a path from server (rate Rs) through the network to client (rate Rc):
  Throughput = min(Rs, Rc)

The BOTTLENECK LINK is the link on the end-to-end path that constrains throughput — the link with the lowest transmission rate.

SHARED BACKBONE LINK:
If N connections share a backbone link of R bps, each connection gets R/N:
  Throughput per connection = min(Rs, Rc, R/N)

In practice, Rs or Rc is usually the bottleneck (the shared backbone is often much wider).

KEY INSIGHT:
Even if a router has a 10 Gbps link, your throughput is limited by the slowest link on your path (often the last mile — your ISP connection to your home).`,
    keyPoints: [
      "Throughput = rate bits actually delivered (not link capacity)",
      "Bottleneck link = the link with the minimum rate on the path",
      "Throughput = min(Rs, Rc) for simple server-client path",
      "With N flows on shared R: throughput = min(Rs, Rc, R/N)",
      "In practice, core backbone is rarely the bottleneck; access links usually are",
      "Average throughput < link rate when there's queuing or other flows",
    ],
    formula: {
      code: `Simple path (server → client):
  Throughput = min(R_s, R_c)

With shared backbone (N flows):
  Throughput = min(R_s, R/N, R_c)

Utilization:
  Server utilization = Throughput / R_s
  Client utilization = Throughput / R_c
  Shared link util.  = (N × Throughput) / R

4-Server Shared Link PYQ (ESA May 2023 exercise):
  R_s = 50 Mbps, R = 300 Mbps (shared, 4 flows), R_c = 60 Mbps
  Each flow gets R/4 = 300/4 = 75 Mbps from shared link
  Throughput = min(50, 75, 60) = 50 Mbps  ← bottleneck is R_s
  Server util.      = 50/50   = 1.0   (100%)
  Client util.      = 50/60   ≈ 0.833 (83.3%)
  Shared link util. = (4×50)/300 = 200/300 ≈ 0.667 (66.7%)

PYQ (Dec 2024 Q1b):
  A→B via R1=1Mbps, R2=5Mbps, R3=500kbps
  Throughput = min(1, 5, 0.5) = 500 kbps
  File = 6 million bytes = 48×10⁶ bits
  Transfer time = 48,000,000 / 500,000 = 96 seconds
  If R2 → 2 Mbps: bottleneck still R3=500kbps → time still 96s

Shared Link PYQ (Jan-May 2024 Q1d):
  R_s=70Mbps, R=200Mbps shared (4 flows), R_c=90Mbps
  Each gets R/4 = 50 Mbps from shared link
  Throughput = min(70, 50, 90) = 50 Mbps (bottleneck = shared R)
  Shared link util. = (4×50)/200 = 200/200 = 100%`,
      explanation:
        "Always find the minimum rate across all links on the path. That minimum is the throughput. Changing a non-bottleneck link rate has no effect.",
    },
    examTips: [
      "Bottleneck = the link with the MINIMUM rate — changing other links won't help",
      "Divide R/N before comparing with Rs and Rc",
      "Utilization = actual_rate / capacity (server, client, shared link separately)",
      "If file size given, transfer time = file_size_bits / throughput_bps",
      "4-server scenario: each server connection gets R/N from the shared link",
    ],
    questions: [
      {
        q: "Exercise: 4 servers connected to 4 clients through a shared R=300 Mbps backbone. Rs=50 Mbps (server links), Rc=60 Mbps (client links). Find: (1) throughput per connection, (2) bottleneck, (3) server utilization, (4) client utilization, (5) shared link utilization.",
        a: "(1) Each connection gets R/4 = 75 Mbps from shared link. Throughput = min(Rs, R/4, Rc) = min(50, 75, 60) = 50 Mbps. (2) Bottleneck = Rs (50 Mbps is smallest). (3) Server utilization = 50/50 = 1.0 (100%). (4) Client utilization = 50/60 = 0.833 (83.3%). (5) Shared link utilization = (4×50)/300 = 200/300 = 0.667 (66.7%).",
      },
      {
        q: "L=8000 bits, R=1 Mbps. Find (1) transmission delay and (2) max packets per second.",
        a: "(1) d_trans = 8000/1,000,000 = 0.008 sec = 8 ms. (2) Max packets/sec = R/L = 1,000,000/8,000 = 125 packets/sec.",
      },
      {
        q: "A path has links of 1 Gbps, 10 Mbps, and 100 Mbps. What is the throughput? If we upgrade the 100 Mbps link to 1 Gbps, does throughput change?",
        a: "Throughput = min(1 Gbps, 10 Mbps, 100 Mbps) = 10 Mbps. The 10 Mbps link is the bottleneck. Upgrading the 100 Mbps link to 1 Gbps: throughput = min(1 Gbps, 10 Mbps, 1 Gbps) = 10 Mbps — unchanged. You must upgrade the BOTTLENECK link (10 Mbps) to improve throughput.",
      },
    ],
  },

  "bandwidth-delay-product": {
    title: "Bandwidth-Delay Product (BDP)",
    emoji: "📡",
    tldr:
      "BDP = R × d_prop = max number of bits 'in flight' on a link at once. Big pipe × long delay = lots of bits in transit.",
    explanation: `The Bandwidth-Delay Product (BDP) tells us the maximum amount of data that can be 'in flight' (transmitted but not yet received) at any moment.

BDP = Transmission Rate (R) × Propagation Delay (d_prop)

Physical meaning: If R = 1 Gbps and d_prop = 20 ms, then:
  BDP = 1×10⁹ × 0.020 = 20,000,000 bits = 20 Mb = 2.5 MB
  This means at any moment, up to 2.5 MB of data is traveling on the link before the first bit even arrives.

Why it matters:
• Tells you the 'window size' needed for a protocol to keep the pipe full
• If your TCP window is smaller than BDP, the link is under-utilized
• High BDP links = 'long fat pipes' = challenging for TCP

Example: A geostationary satellite link has huge propagation delay (~270ms). Even at 45 Mbps:
  BDP = 45×10⁶ × 0.270 = 12.15 Mb
  You need 12+ Mb of data in flight to fully utilize the link.

PYQ EXAMPLE (Jan-May 2024 Q1b):
  Two hosts A and B, 5000 km apart, direct link R = 4 Mbps, s = 2×10⁸ m/s
  d_prop = 5,000,000 / (2×10⁸) = 0.025 sec
  BDP = 4,000,000 × 0.025 = 100,000 bits
  This is the max bits "in flight" on the link at any instant.`,
    keyPoints: [
      "BDP = R × d_prop (bits in transit at max utilization)",
      "Units: bits (R in bps × d_prop in seconds)",
      "Large BDP = 'long fat pipe' — high bandwidth AND high delay",
      "BDP determines the buffer/window size needed to fully utilize a link",
      "Satellite links have huge BDP due to large propagation delay",
      "Formula appears in Key Formulas table — always on exam formula sheet",
      "BDP represents the 'volume' of the pipe (not just width or length alone)",
    ],
    formula: {
      code: `BDP = R × d_prop

Example 1: Fast LAN
  R = 1 Gbps = 10⁹ bps
  d_prop = 1 ms = 0.001 s
  BDP = 10⁹ × 0.001 = 10⁶ bits = 1 Mb

Example 2: Satellite link
  R = 45 Mbps = 45×10⁶ bps
  d_prop = 270 ms = 0.270 s (geostationary)
  BDP = 45×10⁶ × 0.270 = 12.15×10⁶ bits = 12.15 Mb

Example 3: PYQ Jan-May 2024
  R = 4 Mbps, d = 5000 km, s = 2×10⁸ m/s
  d_prop = 5,000,000 / (2×10⁸) = 0.025 s
  BDP = 4×10⁶ × 0.025 = 100,000 bits

Analogy: A pipe with water
  BDP = diameter (bandwidth) × length (delay)
      = volume of water in the pipe at any moment
  Big pipe + long pipe = lots of water in transit at once`,
      explanation:
        "BDP = volume of the 'pipe'. To keep it full, you must have that many bits in transit at all times. If your window < BDP, the sender runs out of things to send before the ACK returns.",
    },
    examTips: [
      "BDP = R × d_prop — the only formula needed. Know both variables.",
      "Units must match: R in bps × d_prop in seconds = BDP in bits",
      "Large BDP → need large TCP window to avoid wasting bandwidth",
      "Appears in formula table in almost every exam — don't confuse with throughput",
      "If asked 'max bits in flight' → that is the BDP",
    ],
    questions: [
      {
        q: "R=100 Mbps, d_prop=50ms. Find BDP.",
        a: "BDP = 100×10⁶ × 0.050 = 5×10⁶ bits = 5 Mb. This means at any time, up to 5 Mb of data is in transit on this link before the sender hears back.",
      },
      {
        q: "Why does BDP matter for TCP window sizing?",
        a: "TCP uses a window to limit unacknowledged data in flight. If the window size < BDP, the sender runs out of data to send before getting an ACK, leaving the link idle. For max throughput: window size should equal the BDP. This is why high-BDP 'long fat pipe' links need large TCP windows (TCP window scaling).",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 📚 PROTOCOL LAYERS & DEVICES
  // ══════════════════════════════════════════

  "tcpip-osi": {
    title: "TCP/IP Stack & OSI Model",
    emoji: "🧅",
    tldr:
      "TCP/IP has 5 layers: Physical, Link, Network, Transport, Application. OSI has 7 (adds Presentation and Session). Encapsulation: each layer adds a header going DOWN the stack. Headers removed going UP.",
    explanation: `INTERNET PROTOCOL STACK (TCP/IP — 5 layers):

Layer 5: Application — Supporting network applications (HTTP, SMTP, FTP, DNS). PDU: Message.
Layer 4: Transport — Process-to-process data transfer, segmentation, flow/error control (TCP, UDP). PDU: Segment.
Layer 3: Network — Routing datagrams from source to destination (IP, OSPF, BGP). PDU: Datagram.
Layer 2: Link — Data transfer between neighboring network elements, framing (Ethernet, WiFi). PDU: Frame.
Layer 1: Physical — Bits "on the wire" — signal encoding (fiber, copper, radio). PDU: Bit.

OSI REFERENCE MODEL (7 layers):
The ISO OSI model adds two layers between Application and Transport:
L7 Application: Network process to application (HTTP, SMTP, FTP, DNS)
L6 Presentation: Data translation, encryption (SSL), compression (JPEG, MPEG)
L5 Session: Dialog control, synchronization, checkpointing (NetBIOS, RPC)
L4 Transport: End-to-end delivery, segmentation (TCP, UDP)
L3 Network: Logical addressing, routing (IP, OSPF, BGP)
L2 Data Link: Physical addressing (MAC), framing, error detection (Ethernet, WiFi)
L1 Physical: Bit transmission, signal encoding (fiber, copper, radio)

The Internet stack is "missing" Presentation and Session — if needed, implemented in the application itself.

ENCAPSULATION:
As data passes DOWN the stack, each layer adds its own header:
  Application:  Message (M)
  Transport:    Segment   = [H_t | M]
  Network:      Datagram  = [H_n | H_t | M]
  Link:         Frame     = [H_l | H_n | H_t | M]
  Physical:     Bits

DECAPSULATION: headers removed as data passes UP the stack.

INTERMEDIATE DEVICES:
• Switch: processes up to Layer 2 (reads MAC address in frame header)
• Router: processes up to Layer 3 (reads IP address in datagram header)`,
    keyPoints: [
      "TCP/IP has 5 layers; OSI has 7 (adds Presentation L6 and Session L5)",
      "PDUs: Application=Message, Transport=Segment, Network=Datagram, Link=Frame, Physical=Bit",
      "Encapsulation: each layer ADDS a header going DOWN; removed going UP",
      "Switch processes up to L2 (MAC). Router processes up to L3 (IP).",
      "Presentation layer: encryption, compression, data format conversion",
      "Session layer: dialog control, synchronization, checkpointing",
      "Internet layers 'missing' Presentation and Session — app must handle if needed",
    ],
    formula: {
      code: `TCP/IP Stack (top → bottom):
  Layer 5: Application  | Message    | HTTP, SMTP, FTP, DNS
  Layer 4: Transport    | Segment    | TCP, UDP
  Layer 3: Network      | Datagram   | IP, OSPF, BGP
  Layer 2: Link         | Frame      | Ethernet, WiFi (802.11), PPP
  Layer 1: Physical     | Bit        | (fiber, copper, radio)

OSI Model (top → bottom):
  Layer 7: Application    | HTTP, SMTP, FTP, DNS
  Layer 6: Presentation   | SSL/TLS, JPEG, MPEG, ASCII
  Layer 5: Session        | NetBIOS, RPC, checkpointing
  Layer 4: Transport      | TCP, UDP
  Layer 3: Network        | IP, OSPF, BGP
  Layer 2: Data Link      | Ethernet, WiFi, PPP
  Layer 1: Physical       | Fiber, copper, radio waves

Encapsulation (Matryoshka dolls):
  App sends M
  Transport adds H_t  →  [Ht | M]
  Network adds H_n    →  [Hn | Ht | M]
  Link adds H_l       →  [Hl | Hn | Ht | M]
  Physical sends bits`,
      explanation:
        "Think of headers like Russian nesting dolls — each outer layer wraps the inner content. The address used at each layer is different: L2=MAC, L3=IP, L4=port number.",
    },
    examTips: [
      "OSI LAYER MNEMONIC (top→bottom): 'All People Seem To Need Data Processing' (Application, Presentation, Session, Transport, Network, Data Link, Physical)",
      "Bottom→top: 'Please Do Not Throw Sausage Pizza Away'",
      "OSI trick: count layers from bottom — Physical=1, Application=7",
      "TCP/IP has 5 layers; OSI has 7 — the difference is Presentation (L6) and Session (L5)",
      "Switch = L2 (reads MAC). Router = L3 (reads IP). Hub = L1 (no address).",
      "Encapsulation = going DOWN (headers added). Decapsulation = going UP.",
    ],
    questions: [
      {
        q: "What are the 5 TCP/IP layers, their PDU names, and key protocols at each?",
        a: "Physical=Bit (fiber/copper/radio), Link=Frame (Ethernet/WiFi), Network=Datagram (IP/OSPF/BGP), Transport=Segment (TCP/UDP), Application=Message (HTTP/SMTP/FTP/DNS). Mnemonic bottom→top: 'Please Listen, Nerds Try Apps'.",
      },
      {
        q: "What two layers does the OSI model have that the TCP/IP model doesn't? What do they do?",
        a: "Presentation (L6): data format translation, encryption (SSL), compression (JPEG/MPEG). Session (L5): dialog control, synchronization, checkpointing (NetBIOS, RPC). In the TCP/IP model, these functions are handled within the Application layer if needed.",
      },
      {
        q: "A frame arrives at a router. What layers does the router process, and what does it look at?",
        a: "A router processes up to Layer 3. It removes the L2 frame header (reads MAC address), then examines the L3 datagram header (reads destination IP address), consults its routing/forwarding table, then re-encapsulates with a new L2 frame header for the next hop. The transport and application headers remain untouched.",
      },
    ],
  },

  "transport-services": {
    title: "Transport Services: TCP vs UDP",
    emoji: "🚚",
    tldr:
      "TCP: reliable, ordered, flow control, congestion control, connection-oriented. UDP: fast, connectionless, no guarantees. App chooses protocol based on need for reliability vs speed.",
    explanation: `Applications choose between TCP and UDP based on their requirements.

TCP (Transmission Control Protocol):
• Reliable transport — guarantees all data arrives correctly
• Flow control — sender won't overwhelm receiver
• Congestion control — backs off when network is congested
• Connection-oriented — requires 3-way handshake before data flows
• DOES NOT provide: timing guarantees, minimum throughput, security
• Slower and more overhead than UDP

UDP (User Datagram Protocol):
• Unreliable — no guarantee of delivery, ordering, or error correction
• Connectionless — no handshake, just send
• No flow control, no congestion control
• Fast and lightweight — minimal overhead
• Good for real-time apps where speed > reliability

Note: QUIC (HTTP/3) adds reliability features on top of UDP, getting speed without TCP's head-of-line blocking.

WHY UDP FOR VOICE/VIDEO?
Real-time apps (phone calls, gaming) prefer a slightly degraded signal NOW over a perfect signal 2 seconds later. TCP's retransmission would cause annoying delays. A dropped UDP packet is simply lost — no retry.

SECURING TRANSPORT: SSL/TLS
Neither TCP nor UDP provides security. Applications use SSL/TLS (on top of TCP) to add encryption, data integrity, and authentication.`,
    keyPoints: [
      "TCP: reliable, ordered, flow control, congestion control, connection-oriented",
      "UDP: unreliable, connectionless, no guarantees — but fast and lightweight",
      "TCP does NOT provide timing or throughput guarantees",
      "Real-time apps (voice, gaming) prefer UDP over TCP",
      "SSL/TLS runs on top of TCP to add security (neither TCP nor UDP is secure)",
      "QUIC (HTTP/3) provides reliability over UDP",
    ],
    formula: {
      code: `Application needs vs protocol choice:

App             | Data Loss? | Throughput  | Time sensitive? | Protocol
File transfer   | No loss    | Elastic     | No              | TCP
Email           | No loss    | Elastic     | No              | TCP
Web (HTTP)      | No loss    | Elastic     | No              | TCP
Streaming video | Tolerant   | >x Mbps min | Yes (100s ms)   | TCP or UDP
Internet phone  | Tolerant   | >x kbps min | Yes (100ms)     | UDP preferred
Games           | Tolerant   | >x kbps min | Yes (100ms)     | UDP preferred
DNS             | No loss    | Elastic     | No              | UDP (speed)

TCP vs UDP summary:
Feature          | TCP             | UDP
Connection       | Oriented        | Connectionless
Reliability      | Guaranteed      | Not guaranteed
Order            | In-order        | Not guaranteed
Flow control     | Yes             | No
Congestion ctrl  | Yes             | No
Speed            | Slower          | Faster
Header size      | 20 bytes        | 8 bytes
Use case         | File, web, email| Voice, gaming, DNS`,
      explanation:
        "The choice of TCP vs UDP reflects a fundamental trade-off: correctness vs speed. For data that must be complete (files, web pages), use TCP. For real-time data where latency matters more than completeness, use UDP.",
    },
    examTips: [
      "DNS uses UDP (speed priority, small messages, self-sufficient retry)",
      "HTTP uses TCP (must receive all data correctly to render page)",
      "Internet telephony uses UDP (latency >> lost packet)",
      "TCP provides: reliability, flow control, congestion control. NOT: timing, throughput guarantee, security",
      "UDP provides: nothing extra — pure best-effort delivery",
    ],
    questions: [
      {
        q: "Why does DNS use UDP instead of TCP?",
        a: "DNS queries and responses are small (easily fit in one packet) and speed is critical (every web page load starts with DNS). UDP has no handshake overhead, so the round trip is just one query and one response. If a UDP DNS query is lost, the resolver simply retries — a simpler and faster mechanism than TCP's 3-way handshake for such a short transaction.",
      },
      {
        q: "What services does TCP provide that UDP does NOT? What does neither provide?",
        a: "TCP provides: reliable delivery (no loss), in-order delivery, flow control, congestion control, connection setup. UDP provides none of these. Neither TCP nor UDP provides: timing guarantees, minimum throughput guarantees, or security/encryption (need SSL/TLS on top).",
      },
      {
        q: "Why do real-time voice apps prefer UDP over TCP?",
        a: "In a voice call, if a packet is lost, TCP would request retransmission — but by the time the retransmitted packet arrives, it's too late (the conversation has moved on). The gap it fills is already several hundred milliseconds old, causing a noticeable disruption. UDP just drops the lost packet and continues — the result is a tiny glitch (often unnoticeable) rather than a buffering delay.",
      },
    ],
  },

  "network-devices": {
    title: "Network Devices & Their Layers",
    emoji: "🔌",
    tldr:
      "Hub=L1 (broadcasts all). Switch=L2 (forwards by MAC). Router=L3 (routes by IP). Rule: 1-2-3 = Hub, Switch, Router. Repeaters amplify; bridges join segments; modems convert digital↔analog.",
    explanation: `Network devices operate at specific layers of the protocol stack. Understanding which layer they operate at determines their capabilities.

LAYER-BY-LAYER DEVICE BREAKDOWN:

Physical Layer (L1):
• Repeater: Regenerates/amplifies signals to extend range. No address awareness.
• Hub: Broadcasts data to ALL connected devices, half-duplex, no intelligence. Single collision domain.
• Modem: Converts digital ↔ analog signals (modulation/demodulation). Used for DSL/cable.

Data Link Layer (L2):
• Bridge: 2-port device, routes between segments using MAC addresses. Learns MAC-to-port mapping.
• Switch: Multiport bridge. Forwards to specific port using MAC address table. Full-duplex. One collision domain per port.
• NIC (Network Interface Card): Has MAC address, connects device to network.

Network Layer (L3):
• Router: Routes packets using IP addresses. Maintains routing table. Supports NAT. Separates broadcast domains.

Higher Layers:
• Gateway: Protocol converter connecting different network configurations. Can operate at any layer.
• Firewall: Monitors and filters traffic based on security rules. Operates at Transport/Application layer.

HUB vs SWITCH:
Hub: L1, broadcasts to ALL, single shared collision domain, half-duplex, no intelligence.
Switch: L2, forwards to specific destination (MAC table), one collision domain per port, full-duplex.

SWITCH vs ROUTER:
Switch: L2, uses MAC addresses, within a LAN, single broadcast domain.
Router: L3, uses IP addresses, connects LANs/to Internet, separate broadcast domain per interface.`,
    keyPoints: [
      "Hub=L1 (shouts to ALL). Switch=L2 (whispers to ONE). Router=L3 (navigates between networks).",
      "Switch uses MAC address table; Router uses IP routing table",
      "Hub: half-duplex, single collision domain. Switch: full-duplex, one collision domain per port.",
      "Router separates broadcast domains; Switch does not",
      "Modem: digital↔analog conversion (for DSL/cable to telephone/cable lines)",
      "NIC has the MAC address — the L2 hardware address",
      "Gateway = protocol converter (works at any layer)",
    ],
    formula: {
      code: `Layer-Device-Address mapping:
  L1 Physical : Hub, Repeater, Modem  → No address
  L2 Data Link: Switch, Bridge, NIC   → MAC address (48-bit)
  L3 Network  : Router                → IP address (32-bit IPv4)
  L4+         : Firewall, Gateway     → Port numbers / any

Hub vs Switch:
Feature          | Hub         | Switch
Layer            | Physical(1) | Data Link(2)
Data handling    | Broadcast all| Forward to dest (MAC)
Collision domain | 1 (shared)  | 1 per port
Bandwidth        | Shared      | Dedicated per port
Intelligence     | None        | MAC address table
Duplex           | Half        | Full

Switch vs Router:
Feature          | Switch        | Router
Addressing       | MAC (L2)      | IP (L3)
Layer            | Data Link     | Network
Broadcast domain | One (shared)  | Separate per interface
Usage            | Within LAN    | Between LANs / Internet
Speed            | Faster        | Slower (complex routing)`,
      explanation:
        "The key rule: the layer a device operates at determines what address it reads. L1=no address, L2=MAC, L3=IP. A switch never looks at IP; a router processes both L2 and L3 headers.",
    },
    examTips: [
      "1-2-3 = Hub (L1), Switch (L2), Router (L3) — the easiest device/layer mnemonic",
      "Hub SHOUTS to all ports. Switch WHISPERS to the right port. Router NAVIGATES between networks.",
      "Switch uses MAC table (learned dynamically). Router uses routing table (static/dynamic).",
      "A switch does NOT separate broadcast domains — only a Router does",
      "A hub creates one large collision domain — very inefficient",
    ],
    questions: [
      {
        q: "At what layer does a switch operate? What address does it use? What is one collision domain per port mean?",
        a: "Switch operates at Layer 2 (Data Link). It uses MAC addresses — it reads the destination MAC in each frame and forwards only to the port mapped to that MAC address. One collision domain per port means each port has its own dedicated bandwidth — no collisions between ports (unlike a hub where all devices share one collision domain).",
      },
      {
        q: "Why can't a switch separate broadcast domains?",
        a: "A switch operates at Layer 2 and forwards frames based on MAC addresses. Broadcast frames (destination MAC = FF:FF:FF:FF:FF:FF) are flooded to ALL ports — the switch doesn't know how to selectively block them. Only a Router (Layer 3) can block broadcasts because it processes IP-layer packets and doesn't forward L2 broadcasts across interfaces.",
      },
      {
        q: "What is the difference between a hub and a switch in terms of collision domains?",
        a: "A hub has a SINGLE collision domain for all ports — if two devices transmit simultaneously, they collide. A switch gives EACH port its own collision domain — devices on different ports can transmit simultaneously without collision. This is why a 100-port switch gives each device dedicated 100 Mbps, while a 100-port hub means 100 devices share one collision domain.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 🌍 APPLICATION LAYER & HTTP
  // ══════════════════════════════════════════

  "app-layer-principles": {
    title: "Application Layer Principles",
    emoji: "📱",
    tldr:
      "Apps run on end systems (not routers). Two architectures: client-server (always-on server, permanent IP) and P2P (no always-on server, self-scalable). Process communication via sockets. Identified by IP + port number.",
    explanation: `APPLICATION ARCHITECTURES:

Client-Server:
• Server: Always-on, permanent/static IP address, often in large data centers
• Clients: Intermittently connected, may have dynamic IPs, don't communicate directly with each other
• Examples: HTTP (web), IMAP (email), FTP (file transfer)
• Scales by adding more servers (not self-scaling)

Peer-to-Peer (P2P):
• No always-on server — arbitrary end systems communicate directly
• Self-scalability: each new peer brings new capacity AND new demand
• Peers are intermittent with changing IPs → complex management
• Example: BitTorrent
• Advantage: scales without central infrastructure

PROCESSES AND SOCKETS:
• A process is a program running within a host
• Processes on different hosts communicate by exchanging messages
• Client process: initiates communication
• Server process: waits to be contacted
• A socket is the interface between the application layer and the transport layer — the "door" through which messages are sent and received
• Applications use the socket API — can choose TCP or UDP below

ADDRESSING:
• To identify a specific process on a specific host, need:
  1. IP address: identifies the HOST (32-bit in IPv4)
  2. Port number: identifies the PROCESS on that host
• Well-known ports: HTTP = 80, HTTPS = 443, SMTP = 25, DNS = 53
• Client uses an ephemeral (temporary) port assigned by OS`,
    keyPoints: [
      "Network apps run on end systems (hosts), NOT on core routers",
      "Client-server: server always-on with permanent IP; clients intermittent",
      "P2P: no always-on server; self-scalable; peers intermittent with changing IPs",
      "Process identification = IP address + port number",
      "Socket = API between application and transport layer ('door' for messages)",
      "HTTP=80, HTTPS=443, SMTP=25, DNS=53 — know these port numbers",
      "Client process initiates; server process waits",
    ],
    examTips: [
      "Socket = API between app and transport — it's NOT a hardware component",
      "IP address identifies HOST. Port number identifies PROCESS within the host.",
      "P2P advantage = self-scalability (new peer adds both demand AND capacity)",
      "Apps run on end systems only — routers run network-layer software only",
    ],
    questions: [
      {
        q: "What two pieces of information uniquely identify a process on the Internet? Why aren't IP addresses alone sufficient?",
        a: "An IP address + a port number. IP addresses alone only identify the host (a machine running many processes simultaneously). The port number identifies which specific process on that host should receive the message. E.g., IP 93.184.216.34:80 = the web server process; 93.184.216.34:25 = the mail server process — same host, different processes.",
      },
      {
        q: "What makes P2P self-scalable? What is the trade-off?",
        a: "In P2P, each new peer (user) simultaneously downloads AND uploads — adding both demand and capacity. As more users join, the system's total upload capacity grows proportionally. The trade-off: no centralized control makes P2P complex — peers have changing IPs, intermittent connectivity, and security/coordination is difficult.",
      },
    ],
  },

  "http-persistent": {
    title: "HTTP: Persistent vs Non-Persistent",
    emoji: "🔗",
    tldr:
      "Non-persistent (HTTP/1.0): each object needs its own TCP connection → 2 RTT per object. Persistent (HTTP/1.1): one connection for all objects → as little as 1 RTT per object. HTTP is stateless.",
    explanation: `HTTP (HyperText Transfer Protocol) is the Web's application-layer protocol. It uses TCP (port 80) and is STATELESS — the server maintains no information about past client requests.

A web page typically consists of multiple objects: a base HTML file + embedded objects (images, CSS, JS).

NON-PERSISTENT HTTP (HTTP/1.0):
• At most one object sent per TCP connection
• Downloading N objects requires N separate TCP connections (or N/2 if parallel)
• Per object: TCP SYN → SYN-ACK (1 RTT) → GET request + response header (1 RTT) + file transfer
• Response time per object = 2 × RTT + file transmission time
• Total for 1 base + N embedded = (1 + N) × 2RTT + transmission times

PERSISTENT HTTP (HTTP/1.1 — default):
• Multiple objects sent over a single TCP connection
• Server leaves connection open after sending response
• Client sends requests as soon as it encounters a referenced object
• As little as 1 RTT for all referenced objects (after initial connection)
• With pipelining: client sends requests back-to-back without waiting for responses

HTTP/2 (RFC 7540):
• Binary framing layer (not text like HTTP/1.x)
• Request multiplexing: multiple objects in ONE TCP connection simultaneously
• Server push: proactively send objects client will likely need
• Header compression
• Still over TCP — suffers from TCP head-of-line blocking

HTTP/3:
• Runs over QUIC (UDP-based protocol)
• Eliminates TCP head-of-line blocking
• Multiplexing without blocking
• Connection migration support`,
    keyPoints: [
      "Non-persistent (HTTP/1.0): 2 RTT per object. Persistent (HTTP/1.1): ~1 RTT.",
      "HTTP/1.0 is non-persistent by DEFAULT. HTTP/1.1 is persistent by DEFAULT.",
      "HTTP is stateless — server keeps no info about past requests (cookies add state)",
      "HTTP runs over TCP port 80; HTTPS over TCP port 443",
      "Non-persistent: N objects = N TCP connections = 2N × RTT (ignoring file time)",
      "HTTP/2: binary framing, multiplexing, server push, header compression (over TCP)",
      "HTTP/3: runs over QUIC (UDP-based), eliminates head-of-line blocking",
    ],
    formula: {
      code: `Response time per object (non-persistent HTTP):
  T_object = 2 × RTT + file_transmission_time

  Why 2 RTT?
  RTT 1: TCP handshake (SYN → SYN-ACK)
  RTT 2: HTTP request + first bytes of response
  Then: remaining bytes stream in

Total time for 1 HTML + K embedded objects (non-persistent, no parallelism):
  T_total = (K+1) × 2 × RTT  +  sum of transmission times

With persistent HTTP (pipelining):
  T_total ≈ 2RTT (initial TCP) + RTT (HTML) + 1RTT (all K objects together)
           = 2RTT + (K+1)×RTT  [with pipelining]
           (much less than non-persistent!)

ESA May 2023 Q2b (DNS + HTTP PYQ):
  DNS RTTs: 5+21+13+49 = 88 ms
  RTT_HTTP = 1 ms
  (1) Base object only: DNS=88ms + 2×1ms = 90ms
  (2) Base + 3 objects, non-persistent HTTP:
      DNS=88ms + 2ms (base) + 3×2ms (objects) = 96ms
  KEY: DNS time paid once; each object needs 2 RTTs in non-persistent`,
      explanation:
        "Non-persistent HTTP's 2-RTT cost per object is a major inefficiency for pages with many objects. Persistent HTTP largely solves this. DNS time is always paid first.",
    },
    examTips: [
      "HTTP/1.0 = non-persistent by DEFAULT. HTTP/1.1 = persistent by DEFAULT.",
      "Non-persistent = 2RTT per object (plus file transmission time)",
      "DNS time is ALWAYS paid first — then start counting HTTP RTTs",
      "HTTP/3 uses QUIC (UDP) — not TCP — eliminates head-of-line blocking",
      "HTTP is STATELESS — 'stateless' means server forgets after each response",
    ],
    questions: [
      {
        q: "ESA May 2023 Q2b: DNS resolution uses 4 servers with RTTs: 5ms, 21ms, 13ms, 49ms. RTT_HTTP = 1ms. Page has 1 base HTML + 3 embedded objects. Non-persistent HTTP. (1) Time for just the base object? (2) Time for all 4 objects total?",
        a: "(1) DNS time = 5+21+13+49 = 88ms. Base object = 2×RTT_HTTP = 2ms. Total = 90ms. (2) Each of 3 additional objects = 2×1 = 2ms each = 6ms. Grand total = 88 + 2 + 6 = 96ms. KEY: Non-persistent = each object needs its own 2-RTT. DNS time is paid once.",
      },
      {
        q: "A page has 10 embedded objects. Non-persistent HTTP, RTT=50ms, negligible file transmission. What is total load time?",
        a: "Each of the 11 objects (1 HTML + 10 embedded) needs 2 RTTs = 2 × 50 = 100ms. Total = 11 × 100ms = 1100ms = 1.1 seconds. With persistent HTTP (pipelining): 2 RTTs (TCP setup + HTML) + 1 RTT (all 10 embedded) ≈ 3 × 50 = 150ms. Persistent HTTP is about 7× faster here.",
      },
      {
        q: "What is the key difference between HTTP/2 and HTTP/3?",
        a: "HTTP/2: binary framing, multiplexing (multiple objects in one TCP connection), server push — but still runs over TCP. If one TCP packet is lost, all streams stall (head-of-line blocking). HTTP/3: runs over QUIC (a UDP-based protocol). QUIC has its own reliability and multiplexing built in — a lost packet only stalls the specific stream it belongs to, not all streams. HTTP/3 also has faster connection establishment (0-RTT in some cases).",
      },
    ],
  },

  "http-messages": {
    title: "HTTP Messages & Status Codes",
    emoji: "📨",
    tldr:
      "HTTP request: method + URL + version + headers + body. HTTP response: status code + headers + body. Key status codes: 200 OK, 301 Moved, 304 Not Modified, 400 Bad Request, 404 Not Found, 505 Version Error.",
    explanation: `HTTP REQUEST MESSAGE:
  Request line: method + URL + HTTP version
  Header lines: Host, User-Agent, Accept, Connection, etc.
  Blank line (CRLF)
  Body: (only for POST — contains form data)

HTTP METHODS:
  GET    — Retrieve a resource (most common; no body)
  POST   — Submit data in the body (form submissions)
  HEAD   — Request headers ONLY — no object body sent (used to check if file changed)
  PUT    — Upload/replace a file on the server (HTTP/1.1+)
  DELETE — Delete a resource (HTTP/1.1+)

HTTP RESPONSE MESSAGE:
  Status line: HTTP version + status code + phrase
  Header lines: Date, Server, Content-Length, Content-Type, Connection, etc.
  Blank line
  Data: the requested object (body)

KEY STATUS CODES:
  200 OK                    — Request succeeded, object in body
  301 Moved Permanently     — Object moved; new URL in Location header
  304 Not Modified          — Cached copy is fresh; NO body sent (saves bandwidth!)
  400 Bad Request           — Server couldn't understand request
  404 Not Found             — Requested object not found on server
  505 HTTP Version Not Supported — Server doesn't support request's HTTP version

KEY HEADERS:
  Content-Length: size in BYTES
  Content-Type: MIME type (text/html, image/jpeg, application/json)
  Connection: Close (non-persistent), Keep-Alive (persistent)
  If-Modified-Since: used in conditional GET
  Set-Cookie / Cookie: for maintaining state`,
    keyPoints: [
      "Request line: METHOD + URL + VERSION (e.g., GET /index.html HTTP/1.1)",
      "Status codes: 2xx=success, 3xx=redirect, 4xx=client error, 5xx=server error",
      "304 Not Modified: cached copy valid, NO body sent — saves bandwidth",
      "Content-Length is in BYTES (not bits!) — watch out in calculations",
      "HEAD method: returns headers ONLY, no object — used to check modification",
      "POST: data in body. GET: data in URL. HEAD: response headers only.",
      "HTTP/1.0 = non-persistent by default. HTTP/1.1 = persistent by default.",
    ],
    formula: {
      code: `HTTP Request format:
  [Method] [URL] [HTTP-version]        ← Request line
  [Header-field-name]: [value]         ← Header lines
  [Header-field-name]: [value]
  (blank line)
  [body]                               ← only for POST

HTTP Response format:
  [HTTP-version] [Status-code] [Phrase]  ← Status line
  [Header-field-name]: [value]            ← Header lines
  (blank line)
  [requested object data]                 ← body

Status Code Reference:
  200 OK              → Request worked. Object in body.
  301 Moved           → Go to URL in Location header.
  304 Not Modified    → Cache is fresh. NO BODY.
  400 Bad Request     → Server can't parse the request.
  404 Not Found       → Object doesn't exist.
  505 Version Error   → HTTP version not supported.
  Mnemonic: 2=yay, 3=moved away, 4=your bad day, 5=server's bad day`,
      explanation:
        "304 Not Modified is special: the response has headers but NO body — the browser uses its cached copy. This saves the bandwidth of downloading the full object again.",
    },
    examTips: [
      "HTTP/1.0 → non-persistent by DEFAULT. HTTP/1.1 → persistent by DEFAULT.",
      "304 Not Modified has NO message body — this is a common exam trick",
      "Content-Length is in BYTES — multiply by 8 for bits",
      "Connection: Close → non-persistent. Connection: Keep-Alive → persistent.",
      "HEAD method returns ONLY headers — useful for caching/validation checks",
      "Status 404 = client error (you asked for something that doesn't exist)",
    ],
    questions: [
      {
        q: "ESA May 2023 Q2c: Given HTTP response header: 'HTTP/1.0 404 Not Found | Date: Thu, 04 May 2023 | Server: Apache/2.2.3 | Content-Length: 923 | Connection: Close | Content-type: image/html'. Answer: (1) Was the request successful? (2) Document size? (3) Persistent or non-persistent? (4) File type?",
        a: "(1) NO — status 404 means 'Not Found'. Request failed. (2) 923 bytes (from Content-Length: 923). (3) Non-persistent — 'Connection: Close' header. Also HTTP/1.0 defaults to non-persistent. (4) image/html (from Content-type header). TRICK: HTTP/1.0 = non-persistent by default. HTTP/1.1 = persistent by default.",
      },
      {
        q: "What is the HEAD method and why is it used?",
        a: "HEAD sends the same request as GET but the server responds with ONLY the headers — no object body. Used for cache validation: a browser can check if a cached object is still fresh (via Last-Modified or ETag headers) without downloading the entire object. Saves bandwidth for large objects that haven't changed.",
      },
      {
        q: "What is special about a 304 Not Modified response?",
        a: "304 Not Modified has NO message body — only headers are sent. It's the server's response to a conditional GET (If-Modified-Since header). The server is saying 'your cached copy is still valid, use it.' The browser then uses its cached version, saving the bandwidth of re-downloading the object.",
      },
    ],
  },

  "https-tls": {
    title: "HTTPS & TLS/SSL",
    emoji: "🔒",
    tldr:
      "HTTPS = HTTP + TLS/SSL. Port 443. TLS uses asymmetric encryption to establish a shared symmetric key, then switches to symmetric for speed. Provides: confidentiality, data integrity, server authentication.",
    explanation: `HTTPS = HTTP + TLS (Transport Layer Security, formerly SSL). Uses port 443.

HOW TLS HANDSHAKE WORKS:
1. Browser requests secure page (HTTPS URL)
2. Server sends its PUBLIC KEY with SSL certificate (signed by a Certificate Authority — CA)
3. Browser verifies the certificate using CA's digital signature (is this really the real server?)
4. Browser creates a symmetric session key, encrypts it with server's PUBLIC key, sends it
5. Server decrypts with its PRIVATE key → both sides now share the same symmetric key
6. All subsequent communication encrypted with the symmetric key (much faster than asymmetric)

KEY INSIGHT: 
• Asymmetric encryption (public/private keys) — used to establish trust and securely exchange the symmetric key
• Symmetric encryption — used for actual data transfer (faster, less CPU)

WHY HTTPS MATTERS:
• Confidentiality: data is encrypted in transit — ISPs and middlemen can't read it
• Data integrity: MAC (Message Authentication Code) ensures data wasn't tampered with
• Authentication: certificate proves you're talking to the real server, not an imposter
• Better Google ranking: Google prefers HTTPS sites
• Customer trust: padlock icon in browser`,
    keyPoints: [
      "HTTPS = HTTP + TLS/SSL. Port 443 (HTTP = port 80).",
      "TLS uses asymmetric (public/private key) to exchange a symmetric session key",
      "Then switches to symmetric encryption for actual data (faster)",
      "CA = Certificate Authority — trusted third party that signs certificates",
      "HTTPS provides: confidentiality, integrity (MAC), authentication",
      "Neither TCP nor UDP provide security — TLS is added ON TOP of TCP",
      "3 benefits: encrypt data, verify server identity, protect data integrity",
    ],
    formula: {
      code: `TLS Handshake steps:
  1. Client → Server: "Hello, I want HTTPS"
  2. Server → Client: Certificate (public key + CA signature)
  3. Client: Verify certificate with CA's public key
  4. Client → Server: Symmetric key, encrypted with server's public key
  5. Server: Decrypt with private key → both have symmetric key
  6. All data: encrypted with symmetric key

HTTP vs HTTPS Comparison:
Feature         | HTTP           | HTTPS
Port            | 80             | 443
Encryption      | None           | TLS/SSL
Certificate     | Not needed     | Required (CA-signed)
URL prefix      | http://        | https://
Data integrity  | Not guaranteed | Guaranteed (MAC)
Authentication  | None           | Server verified
SEO ranking     | Lower          | Higher (Google prefers)
Speed           | Faster         | Slightly slower (handshake overhead)`,
      explanation:
        "The TLS handshake adds latency (extra RTTs before data flows), but is only done once per session. The overhead is justified by the security gained. Modern TLS 1.3 reduces handshake to 1 RTT.",
    },
    examTips: [
      "HTTP = port 80. HTTPS = port 443. Know these.",
      "Asymmetric (slow, secure) for KEY EXCHANGE only. Symmetric (fast) for DATA.",
      "Certificate Authority (CA) = the trusted third party that vouches for the server's identity",
      "HTTPS provides: confidentiality, integrity, authentication — never 'anonymity'",
      "TLS runs on top of TCP — TCP must be established first, then TLS handshake",
    ],
    questions: [
      {
        q: "Why does TLS use asymmetric encryption first, then switch to symmetric encryption?",
        a: "Asymmetric (public/private key) encryption is used to solve the key distribution problem: how do two strangers securely agree on a shared key without ever meeting? Asymmetric cryptography lets them do this over an insecure channel. However, asymmetric encryption is computationally expensive (10-100× slower than symmetric). Once both sides agree on a symmetric session key, they switch to symmetric encryption for all actual data — getting security without the performance penalty.",
      },
      {
        q: "What three security properties does HTTPS provide?",
        a: "1. Confidentiality: data is encrypted — third parties (ISPs, hackers) can't read the content. 2. Data integrity: MAC (Message Authentication Code) ensures data wasn't modified in transit. 3. Authentication: the certificate (signed by a CA) proves you're communicating with the real server, not an impersonator (man-in-the-middle).",
      },
      {
        q: "What role does a Certificate Authority (CA) play in HTTPS?",
        a: "A CA is a trusted third party (e.g., DigiCert, Let's Encrypt) that signs the server's certificate with its own private key. Browsers come pre-installed with CA public keys. When a browser sees a server certificate signed by a trusted CA, it verifies the signature (using the CA's pre-installed public key) and trusts that the certificate is legitimate — confirming the server's identity.",
      },
    ],
  },

  "web-caching": {
    title: "Web Caching & Conditional GET",
    emoji: "💾",
    tldr:
      "A proxy cache stores copies of objects. If cached and fresh → serve client directly. If not → fetch from origin. Reduces response time AND access link traffic. Conditional GET (304) avoids re-downloading unchanged objects.",
    explanation: `A web cache (proxy server) satisfies client requests without involving the origin server.

HOW WEB CACHING WORKS:
1. Browser configured to point to web cache (proxy)
2. Request arrives at cache
3. If object in cache AND fresh → return to client (cache HIT)
4. If not → cache requests from origin server, stores copy, returns to client (cache MISS)

BENEFITS:
• Reduces response time: cache is physically closer to client (lower RTT)
• Reduces traffic on institution's access link (less congestion, cheaper)
• Enables poor content providers to deliver content effectively (CDN concept)

CACHING PROBLEM EXAMPLE (from textbook):
  Access link = 1.54 Mbps, RTT to server = 2 sec, object = 100K bits, 15 requests/sec
  Total data rate = 15 × 100K = 1.5 Mbps
  Without cache: access link util. = 1.5/1.54 = 0.97 → HUGE queueing delay!
  
  With cache (40% hit rate):
  Traffic to origin = 0.6 × 1.5 = 0.9 Mbps
  Access link util. = 0.9/1.54 = 0.58 → much better!
  Average delay = 0.6 × (2.01 sec from origin) + 0.4 × (~ms from cache) ≈ 1.2 sec
  
  Alternative: upgrade access link to 154 Mbps → expensive!
  Cache achieves similar improvement for a fraction of the cost.

CONDITIONAL GET:
Cache sends request with If-Modified-Since: [date] header.
• If object UNCHANGED: server responds 304 Not Modified — NO BODY sent. Cache uses stored copy.
• If object CHANGED: server responds 200 OK with new object. Cache updates.
This saves bandwidth when the object hasn't changed.`,
    keyPoints: [
      "Web cache = proxy server that stores copies of objects for faster delivery",
      "Cache HIT: object in cache and fresh → serve immediately (low RTT)",
      "Cache MISS: fetch from origin server → slower but result cached for future",
      "Conditional GET: If-Modified-Since header → 304 Not Modified (no body) if fresh",
      "304 Not Modified saves bandwidth — no body downloaded",
      "Cache reduces both response time AND access link utilization",
      "Cache hit rate p → effective access link utilization = (1-p) × avg_data_rate / link_rate",
    ],
    formula: {
      code: `Access link utilization:
  U = avg_data_rate / link_capacity
  U_no_cache = (requests/sec × object_size) / link_rate

With cache (hit rate p):
  Requests reaching origin = (1-p) fraction
  U_with_cache = (1-p) × avg_data_rate / link_rate

Cache hit rate needed to reduce U to 50%:
  (1-p) × old_U = 0.5 → solve for p

Example:
  15 req/sec, 100Kbits/obj, 1.54 Mbps link
  U_no_cache = (15 × 100K) / 1,540K = 1.5/1.54 = 0.974  ← saturated!
  With 40% hit rate:
  U_with_cache = 0.6 × 1.5 / 1.54 = 0.9/1.54 = 0.584  ← much better

Conditional GET:
  Cache → Server:  GET /img.jpg HTTP/1.1
                   If-Modified-Since: Wed, 09 Sep 2020 09:23:24
  
  Server → Cache (if unchanged):
                   HTTP/1.1 304 Not Modified
                   (no body!)
  
  Server → Cache (if changed):
                   HTTP/1.1 200 OK
                   [new object in body]`,
      explanation:
        "The conditional GET mechanism prevents downloading objects that haven't changed — the 304 response has headers only (no body). Critical bandwidth saver for large objects.",
    },
    examTips: [
      "304 Not Modified = cache is fresh = NO BODY in response (saves bandwidth)",
      "Cache reduces BOTH response time AND access link utilization",
      "If-Modified-Since header triggers conditional GET",
      "Hit rate p → only (1-p) fraction of requests go to origin server",
      "Upgrading the access link vs. installing a cache: cache is usually cheaper",
    ],
    questions: [
      {
        q: "An institution has a 1 Mbps access link, 15 requests/sec, each object 50K bits. What is access link utilization? What hit rate would halve the link utilization?",
        a: "Data rate = 15 × 50K = 750Kbps. U = 750K/1M = 0.75 (75%). To halve: (1-p) × 0.75 = 0.375 → (1-p) = 0.5 → p = 0.5. Need 50% cache hit rate to halve access link utilization.",
      },
      {
        q: "What happens in a conditional GET, and why does it save bandwidth?",
        a: "Cache sends a GET request with the If-Modified-Since header containing the date the cached copy was last retrieved. If the origin server's copy hasn't changed since that date, it sends 304 Not Modified — ONLY headers, no body. The cache continues serving its stored copy. This saves downloading the full object again when it hasn't changed — critical for large files that are frequently checked but rarely updated.",
      },
    ],
  },

  "cookies": {
    title: "HTTP Cookies",
    emoji: "🍪",
    tldr:
      "HTTP is stateless, but cookies let servers maintain state. 4 components: Set-Cookie header (server→client), Cookie header (client→server), cookie file (browser), back-end database (server). Used for login, cart, recommendations. Privacy concern: cross-site tracking.",
    explanation: `HTTP IS STATELESS — the server maintains no information about past client requests. Each request is independent.

BUT most web applications need STATE: login sessions, shopping carts, user preferences.

COOKIES add state to HTTP:

4 COMPONENTS OF THE COOKIE MECHANISM:
1. Set-Cookie header in HTTP response (server → client): Set-Cookie: 1678
2. Cookie header in subsequent HTTP requests (client → server): Cookie: 1678
3. Cookie file on user's host, managed by the browser
4. Back-end database at the web site (maps cookie ID to user data)

HOW IT WORKS:
• First visit: server creates a unique cookie ID (e.g., 1678), stores it in database, sends Set-Cookie: 1678 in response header
• Subsequent visits: browser automatically sends Cookie: 1678 in request header
• Server looks up 1678 in database → retrieves your user data

USES OF COOKIES:
• Login sessions: you don't have to log in on every page
• Shopping carts: remembers items as you browse
• Recommendations: "users who bought X also bought Y"
• Tracking browsing history across sessions
• Language/preference settings

PRIVACY CONCERNS:
• Third-party tracking cookies: a single advertiser (e.g., DoubleClick/Google Ads) can embed content across many websites, setting the same cookie
• This allows tracking a user's browsing history across multiple unrelated websites
• "Cookies can tell what you've been up to!"`,
    keyPoints: [
      "HTTP is stateless; cookies add state to stateless HTTP",
      "4 cookie components: Set-Cookie (response header), Cookie (request header), cookie file (browser), back-end DB (server)",
      "Server sends Set-Cookie in response; browser echoes Cookie ID in future requests",
      "Used for: login sessions, shopping carts, recommendations, user preferences",
      "Privacy: third-party tracking cookies can track users across multiple websites",
      "Cookie = just an ID number; server's database holds the actual user data",
    ],
    examTips: [
      "HTTP is STATELESS — cookies are the mechanism that adds state",
      "Know all 4 components: Set-Cookie header, Cookie header, cookie file, server DB",
      "Privacy concern: third-party cookies track users ACROSS different websites",
      "Cookie itself just stores an ID — the user data lives in the server's database",
    ],
    questions: [
      {
        q: "List the 4 components of the cookie mechanism and the role of each.",
        a: "1. Set-Cookie header in HTTP response: server sends a unique cookie ID to the browser. 2. Cookie header in subsequent HTTP requests: browser automatically includes the cookie ID in all future requests to that domain. 3. Cookie file on user's host: browser stores cookie IDs persistently. 4. Back-end database at the web site: maps each cookie ID to user-specific data (shopping cart, login status, preferences).",
      },
      {
        q: "Why are third-party tracking cookies a privacy concern?",
        a: "A third-party advertiser (e.g., Google Ads) embeds content (ads, trackers) on many different websites. Each time you visit a site with embedded Google Ads, Google's server sets or reads the same cookie. By correlating requests from the same cookie ID across hundreds of websites, Google can build a detailed profile of your browsing habits — tracking you across unrelated sites without your explicit consent.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // 🧠 MNEMONICS & TRICKS
  // ══════════════════════════════════════════

  "mnemonics-tricks": {
    title: "Mnemonics & Memory Tricks",
    emoji: "🧠",
    tldr:
      "Quick memory tricks for OSI layers, delays, HTTP codes, device layers, and formulas. Use these to never blank out in an exam.",
    explanation: `A collection of memory tricks covering all the high-frequency exam topics in Unit 1.

OSI LAYERS (7 layers, top to bottom):
'All People Seem To Need Data Processing'
Application → Presentation → Session → Transport → Network → Data Link → Physical

OSI LAYERS (bottom to top):
'Please Do Not Throw Sausage Pizza Away'
Physical → Data Link → Network → Transport → Session → Presentation → Application

THE 4 DELAYS:
'Pretty Queens Travel Peacefully' OR just 'PQTP'
Processing → Queuing → Transmission → Propagation
Hint: d_trans = L/R (packet Length / Rate). d_prop = d/s (Distance / Speed).
Trick: Trans has L and R. Prop has d and s. They rhyme: Trans=Length/Rate, Prop=Distance/Speed.

TCP vs UDP:
'TCP = Trusty Careful Postman' — delivers everything, checks receipts, slows for traffic
'UDP = Uncle Drops Packages' — fast, careless, no confirmation

HTTP STATUS CODES:
2xx = Success (200 OK — it worked!)
3xx = Redirect (301 Moved Permanently — gone somewhere else)
4xx = Client error (404 Not Found — YOU asked for something wrong)
5xx = Server error (505 Version — SERVER messed up)
Special: 304 = Not Modified (cache is fresh — no body sent)
Trick: '2=yay, 3=moved away, 4=your bad day, 5=server's bad day'

DSL FREQUENCY BANDS (remember VUD on a line):
Voice (0-4 kHz) | Upload (4-50 kHz) | Download (50kHz-1MHz)
Mnemonic: 'VUD' — Voice, Upload, Download. Download gets the MOST bandwidth.

PHYSICAL MEDIA SPEED ORDER (slowest to fastest):
'Twisted Wire Coils For Fiber Optics Gain'
Twisted Pair → Coaxial → Fiber Optic
Actual speeds: TP Cat5=100Mbps-1Gbps, Coax=100s Mbps, Fiber=10s-100s Gbps

HUB vs SWITCH vs ROUTER (layer trick):
'1-2-3 = Hub, Switch, Router'
Hub = L1 (no address), Switch = L2 (MAC), Router = L3 (IP)
'Hub SHOUTS to all, Switch WHISPERS to one, Router NAVIGATES between networks'

CIRCUIT vs PACKET (for comparison table):
Circuit = 'CALL': Connection-oriented, All resources reserved, Lossless, Layered at Physical
Packet = 'DATA': Dynamic resources, Asynchronous, Tolerates loss, App-layer assembly

THROUGHPUT BOTTLENECK:
'The WEAKEST link determines the chain' — throughput = min(R1, R2, ..., RN)

ENCAPSULATION headers (going DOWN the stack):
'Matryoshka dolls' — each layer wraps the previous.
App message → +Transport header → +Network header → +Link header → bits
Layer headers are added OUTSIDE (like Russian nesting dolls)

PERSISTENT vs NON-PERSISTENT HTTP:
'1.0 = One object, One connection' (non-persistent)
'1.1 = One connection, Many objects' (persistent, default)
'1.0 = Non = Needs more connections'

HTTP METHODS:
'G.P.H.P.D.' — GET, POST, HEAD, PUT, DELETE
GET = Get a resource
POST = Post data (in body)
HEAD = Headers only (no body — used to check if file changed)
PUT = Put/Upload a file
DELETE = Delete a resource (HTTP/1.1+)`,
    keyPoints: [
      "OSI top→bottom: 'All People Seem To Need Data Processing'",
      "4 delays: PQTP — Processing, Queuing, Transmission, Propagation",
      "d_trans = L/R (Length/Rate). d_prop = d/s (Distance/Speed). Trans≠Prop!",
      "HTTP 2xx=success, 3xx=redirect, 4xx=client error, 5xx=server error",
      "DSL bands: VUD — Voice(0-4kHz), Upload(4-50kHz), Download(50kHz-1MHz)",
      "Hub=L1 shouts all. Switch=L2 whispers one. Router=L3 navigates.",
      "HTTP/1.0=non-persistent default. HTTP/1.1=persistent default.",
      "Throughput = min of all link rates = bottleneck link",
      "TCP = Trusty Careful Postman. UDP = Uncle Drops Packages.",
      "Encapsulation: DOWN the stack. Decapsulation: UP the stack.",
    ],
    formula: {
      code: `MASTER FORMULA SHEET FOR UNIT 1:

Transmission delay:    d_trans = L / R        (L=bits, R=bps)
Propagation delay:     d_prop  = d / s        (d=meters, s=~2×10⁸ m/s)
Total nodal delay:     d_node  = d_proc + d_queue + d_trans + d_prop
Traffic intensity:     I       = La / R       (must be < 1!)
Queuing delay:         d_queue = IL / R(1-I)  (only valid when I < 1)
Throughput:            T       = min{R_s, R_c, R/N}
BDP:                   BDP     = R × d_prop   (bits in flight)
End-to-end delay:      d_e2e   = N × (d_proc + d_trans + d_prop)
Circuit TDM rate:      R_ckt   = R_link / num_slots
Non-persistent HTTP:   Time    = 2×RTT + file_transmission_time (per object)
Access link util.:     U       = avg_data_rate / link_rate  (keep < 1)
With cache:            New U   = (1-p) × avg_rate / link_rate  (p = hit rate)
Packetization delay:   d_pkt   = L_bits / encoding_rate

UNIT CONVERSIONS (trap for exam):
  1 KB = 8 Kbits (multiply by 8!)
  1 MB = 8 Mbits
  1 ms = 0.001 s
  When mixing: ALWAYS convert to same units first`,
      explanation:
        "Print this. Memorize it. Every exam uses at least 3-4 of these.",
    },
    examTips: [
      "ALWAYS convert bytes to bits (×8) before using L/R formula",
      "ALWAYS check units: R in bps, d in meters, s in m/s — don't mix km and m/s",
      "Traffic intensity I = La/R must be < 1 for queuing formula to work",
      "304 Not Modified has NO body — bandwidth saved",
      "OSI trick: count layers from bottom — Physical=1, not 7",
      "'Non-persistent HTTP = 2RTT per object' is the most-tested HTTP formula",
    ],
    questions: [
      {
        q: "Quick recall: what are the 5 TCP/IP layers and their PDU names?",
        a: "Physical=Bit, Link=Frame, Network=Datagram, Transport=Segment, Application=Message. Mnemonic for layers: 'Please Listen, Nerds Try Apps' (bottom→top).",
      },
      {
        q: "Which HTTP status code means 'cached copy is still valid'? What's special about its response?",
        a: "304 Not Modified. Special: it has NO MESSAGE BODY — only headers are sent. This saves bandwidth because the cache already has the object; server just confirms it's fresh.",
      },
      {
        q: "What does traffic intensity I>1 mean for a queue?",
        a: "Arrival rate exceeds service rate. Queue grows without bound. Average delay → infinity. This is why designing for I≤1 is mandatory. Never let I exceed 1.",
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
      "All previous year questions with full solutions. Organized by topic. ESA May 2023 and Jan-May 2024 covered.",
    explanation: `All PYQs from recent ESA papers with complete worked solutions.

══════════════════════════════════
ESA MAY 2023
══════════════════════════════════

Q1a: [Propagation Delay]
Packet = 1000 bytes, distance = 2500 km, speed = 2.5×10⁸ m/s, rate = 2 Mbps.
(i) d_prop = 2,500,000 / (2.5×10⁸) = 0.01 s = 10 ms
(ii) Formula: d_prop = d/s
(iii) No — propagation delay is independent of packet length.
(iv) No — propagation delay is independent of transmission rate.

Q1b: [Circuit Switching Numerical]
640,000-bit file, all links 1.536 Mbps, TDM 24 slots, setup = 500ms.
Each circuit = 1,536,000/24 = 64,000 bps = 64 kbps.
Transfer time = 640,000/64,000 = 10s.
Total = 10 + 0.5 = 10.5 seconds.

Q1b: [Packet vs Circuit — Users + Probability]
2 Mbps link. Each user: 1 Mbps when active, active 20% of time.
(i) CS supports 2 users (2 Mbps / 1 Mbps = 2).
(ii) ≤2 active → aggregate ≤ 2 Mbps = link capacity → no queue.
     3 active → 3 Mbps > 2 Mbps → queue builds.
(iii) p = 0.2
(iv) P(all 3 active) = 0.2³ = 0.008. Queue grows 0.8% of time.

Q1c: [Internet Structure Definitions]
Define: PoP, IXP, Multi-homing, Peering.
PoP = group of routers in provider's network where customer ISPs connect.
IXP = neutral meeting point (own building + switches) where ISPs peer directly.
Multi-homing = connecting to 2+ providers for redundancy.
Peering = settlement-free direct traffic exchange between same-level ISPs.

Q2b: [DNS + HTTP Response Time]
4 DNS servers: RTT₀=5ms, RTT₁=21ms, RTT₂=13ms, RTT₃=49ms. RTT_HTTP=1ms.
(1) Base object only: DNS = 5+21+13+49 = 88ms. HTTP = 2×1ms = 2ms. Total = 90ms.
(2) Base + 3 objects, non-persistent HTTP:
    DNS = 88ms. Base = 2ms. Each of 3 objects = 2ms × 3 = 6ms.
    Grand total = 88 + 2 + 6 = 96ms.

Q2c: [HTTP Response Header Reading]
Given: HTTP/1.0 404 Not Found, Content-Length:923, Connection:Close, Content-type:image/html
(1) NOT successful — status 404 = "Not Found".
(2) 923 bytes (from Content-Length).
(3) Non-persistent — Connection: Close header + HTTP/1.0 defaults to non-persistent.
(4) image/html (from Content-type header).

══════════════════════════════════
ESA JAN-MAY 2024 (UE22CS252B)
══════════════════════════════════

Q1a: [Transmission Delay]
Bandwidth = 20 Mbps, packet = 1000 bits.
d_trans = L/R = 1000 / (20×10⁶) = 50 μs = 0.05 ms.

Q1b: [BDP — Max Bits in Flight]
Two hosts, 5000 km apart, R = 4 Mbps, s = 2×10⁸ m/s.
d_prop = 5,000,000 / (2×10⁸) = 0.025 sec.
BDP = 4×10⁶ × 0.025 = 100,000 bits = max bits "in flight" on the link.

Q1b: [Real-time Voice Packetization Delay]
64 kbps voice → 56-byte packets. Link: 2 Mbps, propagation: 10ms.
Packetization delay: 448 bits / 64,000 bps = 7 ms.
Transmission delay: 448 bits / 2,000,000 bps = 0.224 ms.
Propagation delay: 10 ms.
Total = 7 + 0.224 + 10 = 17.224 ms.

Q1d: [Throughput with Shared Link]
R_S=70 Mbps, R=200 Mbps shared (4 flows), R_C=90 Mbps.
Each gets R/4 = 200/4 = 50 Mbps from shared link.
Throughput per pair = min(70, 50, 90) = 50 Mbps (bottleneck = shared link).
Shared link utilization = (4×50)/200 = 200/200 = 100%.

══════════════════════════════════
ESA DEC 2023
══════════════════════════════════

Q1b: [Caravan Analogy]
10 cars, 100 km/hr, toll booth = 12 sec/car, 100 km between booths.
(a) Time to push caravan through toll booth 1 = 10 × 12 = 120 sec.
(b) Time for last car from booth 1 to booth 2 = 100/100 = 1 hour = 3600 sec.
(c) Total = 120 + 3600 = 3720 sec = 62 min.

══════════════════════════════════
ESA DEC 2024
══════════════════════════════════

Q1b: [Throughput — Series Links]
A→B via R1=1 Mbps, R2=5 Mbps, R3=500 kbps.
(a) Throughput = min(1, 5, 0.5) = 500 kbps (bottleneck = R3).
(b) File = 6 million bytes = 48 Mbits. Time = 48,000,000/500,000 = 96 seconds.
(c) If R2→2 Mbps: bottleneck still R3 → throughput still 500 kbps → time still 96s.`,
    keyPoints: [
      "Circuit TDM: rate per circuit = link_rate / slots. Time = file_size / circuit_rate + setup_time",
      "Packet switching probability: P(n users active) = C(N,n) × p^n × (1-p)^(N-n)",
      "DNS time = sum of all RTTs in resolution chain (sequential lookups)",
      "Non-persistent HTTP per object = 2×RTT + file_trans_time",
      "HTTP/1.0 = non-persistent default. HTTP/1.1 = persistent default.",
      "Status 404 = Not Found. 304 = Not Modified. 200 = OK.",
      "Packetization delay = bits_in_packet / encoding_rate (NOT link rate!)",
    ],
    formula: {
      code: `ALL PYQ FORMULAS IN ONE PLACE:

Circuit switching (TDM):
  R_ckt = R_link / slots
  T = file_size / R_ckt + setup_time
  Example: 640Kbit / 64kbps + 0.5s = 10 + 0.5 = 10.5s

Probability (packet switching):
  p = activity fraction (e.g., 0.2 for 20% active)
  P(all N active) = p^N
  P(>2 of 3 active) = P(3) = p^3

DNS + HTTP time:
  T_base = sum_of_DNS_RTTs + 2×RTT_HTTP
  T_each_embedded = 2×RTT_HTTP (non-persistent)
  T_total = T_base + K × 2×RTT_HTTP (for K embedded objects)

Packetization + trans + prop:
  d_pkt   = L_bits / encoding_rate    ← uses CODEC rate
  d_trans = L_bits / link_rate        ← uses LINK rate
  d_prop  = distance / speed
  Total   = d_pkt + d_trans + d_prop

BDP:
  d_prop = d / s
  BDP = R × d_prop

Throughput (series links):
  T = min(R1, R2, ..., RN)
  Transfer time = file_bits / T

Throughput (shared backbone, N flows):
  Each flow: T = min(R_s, R/N, R_c)`,
      explanation:
        "Use this as your formula reference during revision. Circle every formula that appeared in a PYQ.",
    },
    examTips: [
      "In circuit switching: FIRST calculate per-circuit rate, THEN divide file size",
      "Probability of n out of N users active: binomial distribution B(N, p)",
      "DNS RTTs are SEQUENTIAL (each server queried one after another), so sum them all",
      "HTTP with DNS: always pay DNS time FIRST, then HTTP RTTs",
      "Packetization delay uses CODEC rate (64kbps), NOT link rate (2Mbps)",
      "For Content-Length header: value is in BYTES, not bits",
      "Changing a non-bottleneck link rate has NO effect on throughput",
    ],
    questions: [
      {
        q: "Mega-revision: list all the formula categories in Unit 1 and give the formula for each.",
        a: "d_trans=L/R | d_prop=d/s | d_nodal=proc+queue+trans+prop | I=La/R (traffic intensity) | d_queue=IL/R(1-I) | Throughput=min(Rs,Rc,R/N) | BDP=R×d_prop | R_ckt=R_link/slots | T_circuit=size/R_ckt+setup | HTTP_obj=2RTT+file_time | U=rate/capacity | U_cache=(1-p)×rate/capacity | d_pkt=bits/encoding_rate",
      },
      {
        q: "ESA May 2023 full Q1: (a) propagation delay for 1000B packet, 2500km, 2.5×10⁸m/s, 2Mbps? (b) Circuit switching: 640Kbit file, 1.536Mbps, 24 TDM slots, 500ms setup?",
        a: "(a) d_prop = 2,500,000/(2.5×10⁸) = 10ms. It does NOT depend on packet length (8000 bits irrelevant) or link rate. (b) R_ckt = 1,536,000/24 = 64kbps. Transfer = 640,000/64,000 = 10s. Total = 10 + 0.5 = 10.5s.",
      },
      {
        q: "Why is it wrong to use the link rate (2 Mbps) for packetization delay? What rate should you use?",
        a: "Packetization delay is the time to FILL the packet with voice samples from the codec — this happens at the ENCODING rate (64 kbps), not the link rate. The link rate applies only once the packet is assembled and being pushed onto the wire (transmission delay). Using the link rate for packetization would dramatically underestimate the delay: 448/2,000,000 = 0.224ms vs 448/64,000 = 7ms — the codec fills the buffer 31× slower than the link can transmit.",
      },
    ],
  },
};
