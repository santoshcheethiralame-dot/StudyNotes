// CN Unit 2 — Application Layer + Transport Layer
// Data file: exports { groups, topics }
// Covers: App Principles, HTTP (full), DNS, Video/CDN, P2P, Sockets, Email, UDP, RDT
// Updated: Added HTTP §2.2 (all), App Principles §2.1, DASH, CDN, HTTPS/TLS,
//          IMAP/email depth, PYQ worked calculations, PYQ frequency table,
//          DNS zone/domain distinction, and PYQ browser-tab demux scenario.

export const groups = [
  { name: "🏗️ Application Layer Principles", ids: ["app-principles"] },
  { name: "🌍 HTTP — World Wide Web", ids: ["http-overview", "http-connections", "http-messages", "http-cookies", "http-caching", "http2", "https-tls"] },
  { name: "🌐 DNS: Domain Name System", ids: ["dns-services", "dns-hierarchy", "dns-records", "dns-wireshark"] },
  { name: "📺 Video Streaming & CDNs", ids: ["video-streaming", "cdn"] },
  { name: "🔄 Peer-to-Peer Applications", ids: ["p2p-architecture", "p2p-bittorrent"] },
  { name: "🔌 Socket Programming", ids: ["socket-intro", "socket-udp", "socket-tcp"] },
  { name: "📧 Email Protocols", ids: ["proto-smtp", "email-depth"] },
  { name: "📡 Other App Layer Protocols", ids: ["proto-ftp", "proto-snmp-dhcp", "proto-telnet-ssh", "proto-summary"] },
  { name: "🚀 Transport Layer Intro", ids: ["transport-intro", "mux-demux"] },
  { name: "📦 UDP — Connectionless Transport", ids: ["udp-overview", "udp-segment"] },
  { name: "🔁 Reliable Data Transfer (RDT)", ids: ["rdt-overview", "rdt20", "rdt21-22", "rdt30", "pipelining"] },
  { name: "📊 PYQ Study Cards", ids: ["pyq-calculations", "pyq-frequency"] },
];

export const topics = {

  // ─── GROUP 0: Application Layer Principles ────────────────────────────────

  "app-principles": {
    title: "Application Layer Principles", emoji: "🏗️",
    tldr: "Client-server vs P2P architecture. TCP = reliable but slow; UDP = fast but unreliable. App-to-transport mapping: HTTP→TCP, DNS→UDP, SMTP→TCP. Know all 9 well-known ports.",
    explanation: `Network applications exist on end-systems (hosts) — not on routers or switches in the core. You write code that runs on end systems only.

Two Architectural Paradigms:

CLIENT-SERVER:
- Always-on server with permanent IP address
- Clients communicate with the server (not directly with each other)
- Server can be scaled via data centers (farms of servers)
- Single point of failure; server is the bottleneck
- Examples: HTTP (web), SMTP (email), FTP

PEER-TO-PEER (P2P):
- No always-on server; peers communicate directly
- Peers are intermittently connected; change IP addresses
- Self-scalable: each new peer adds capacity AND demand
- Management is complex; no central coordination
- Examples: BitTorrent, Skype, some streaming

Transport Services Available to Applications:
Applications choose between TCP and UDP based on what they need.

TCP services (what your app gets for free):
- Reliable data transfer — no data loss
- Flow control — sender won't overwhelm receiver
- Congestion control — sender slows when network is congested
- Connection-oriented — setup required before data flows
TCP does NOT provide: timing guarantees, throughput guarantees, security

UDP services:
- Unreliable data transfer — best-effort only
- No connection setup overhead
- No flow or congestion control
UDP does NOT provide: reliability, ordering, timing, throughput, security

Why would anyone use UDP?
Speed-sensitive apps (DNS, video streaming, VoIP) prefer UDP because TCP's overhead is too costly for their use case. An occasional dropped frame in video is better than buffering.`,
    keyPoints: [
      "Client-server: always-on server with permanent IP; clients don't talk directly",
      "P2P: no always-on server; peers communicate directly; self-scalable",
      "Client-server = single point of failure. P2P = decentralized, resilient.",
      "TCP: reliable, in-order, flow-controlled, congestion-controlled — costs setup RTT",
      "UDP: unreliable, connectionless, no flow/congestion control — immediate delivery",
      "Neither TCP nor UDP provides: delay guarantees, bandwidth guarantees, or security",
      "HTTP, FTP, SMTP, Telnet/SSH use TCP — data must arrive correctly",
      "DNS, DHCP, SNMP use UDP — tiny queries, speed matters more than reliability",
      "Streaming and VoIP can use UDP — loss-tolerant, rate-sensitive",
      "TLS/SSL adds security ON TOP of TCP at the application layer",
    ],
    formula: {
      code: `Client-Server vs P2P — 7-feature comparison:

  Feature              Client-Server       P2P
  ──────────────────────────────────────────────────
  Server always-on     YES                 NO
  Server IP            Permanent           N/A (no server)
  Scalability          Limited (server)    Self-scaling
  Cost at scale        High (data center)  Low (peers pay)
  Single point fail    YES                 NO
  Peer IP              Dynamic OK          Dynamic (complex)
  Example              HTTP, FTP, SMTP     BitTorrent, Skype

Transport Protocol — App Layer Mapping:

  Application          Protocol  Transport
  ──────────────────────────────────────────
  Web (HTTP/HTTPS)     HTTP      TCP
  File transfer        FTP       TCP
  Email (send)         SMTP      TCP
  Email (read)         IMAP/POP3 TCP
  Remote shell         SSH       TCP
  Name resolution      DNS       UDP (TCP for large)
  IP assignment        DHCP      UDP
  Network mgmt         SNMP      UDP (mostly)
  Streaming video      DASH/HLS  TCP (adaptive)
  Internet telephony   RTP/QUIC  UDP
  HTTP/3               QUIC      UDP

Well-Known Port Table (MUST MEMORIZE):
  20  FTP data        53  DNS         143 IMAP
  21  FTP control     67  DHCP srv    161 SNMP
  22  SSH             68  DHCP client 162 SNMP trap
  23  Telnet          80  HTTP        443 HTTPS
  25  SMTP            110 POP3`,
      explanation: "The port table and TCP vs UDP mapping are exam staples. Client-server vs P2P is tested via scenario questions — 'which architecture suits X and why?'",
    },
    examTips: [
      "TCP provides 4 things: reliability, in-order delivery, flow control, congestion control",
      "TCP does NOT provide: delay/bandwidth guarantees or security — add TLS for security",
      "P2P self-scalability = each peer adds BOTH demand and capacity — net growth manageable",
      "Client-server single point of failure = if server dies, ALL clients affected",
      "DNS uses UDP for queries but TCP for zone transfers (large data) — both use port 53",
      "Know which apps use TCP vs UDP cold — this appears in nearly every exam",
    ],
    questions: [
      { q: "Compare client-server and P2P architectures across 5 dimensions.", a: "1. Always-on server: client-server YES (must be running); P2P NO (no dedicated server). 2. Scalability: client-server limited by server capacity; P2P self-scales (each new peer adds capacity). 3. Cost: client-server requires expensive data centers; P2P distributes cost to peers. 4. Single point of failure: client-server YES; P2P NO (decentralized). 5. IP permanence: client-server has permanent IP; P2P peers can change IPs making management complex." },
      { q: "An app developer is building a live video streaming app. Should they use TCP or UDP? Justify.", a: "UDP is typically preferred for live video streaming. The reasons: (1) No setup delay — UDP has no 3-way handshake, so streaming starts immediately. (2) No congestion throttling — TCP slows down when the network is congested, causing buffering; UDP keeps sending, and the app can drop frames instead of buffering. (3) Real-time constraint — a lost frame is better than a delayed one; UDP fits this model. (4) No head-of-line blocking — TCP must wait for retransmitted packets which would stall the live feed. That said, many modern platforms (Netflix, YouTube) use adaptive TCP-based streaming (DASH/HLS) which handles congestion by switching quality — so UDP is not the only answer." },
    ],
  },

  // ─── GROUP 1: HTTP ────────────────────────────────────────────────────────

  "http-overview": {
    title: "HTTP Overview", emoji: "🌐",
    tldr: "HTTP = application-layer protocol for the web. Stateless, runs over TCP port 80. Request-response model. RFC 1945 (1.0), 2616 (1.1), 7540 (2.0). Client sends request; server sends response.",
    explanation: `HTTP — HyperText Transfer Protocol

HTTP is the foundation of the World Wide Web. It is an application-layer protocol that defines how web clients (browsers) request web content and how web servers respond.

Key Characteristics:

1. TCP-based: HTTP uses TCP (not UDP). Before any HTTP message is exchanged, the browser establishes a TCP connection to the server. This ensures reliable delivery of web content.

2. Port 80 (HTTP) / Port 443 (HTTPS): By convention, web servers listen on port 80 for HTTP and 443 for HTTPS.

3. Stateless: HTTP servers maintain NO information about past client requests. If a client requests the same page twice, the server treats them as completely independent requests. It has no memory of the first request.
   Why stateless? Simpler to implement at scale. (State is added back via cookies when needed.)

4. Request-Response model: Client sends an HTTP request; server sends an HTTP response. Classic pull protocol.

5. RFCs: HTTP/1.0 (RFC 1945, 1996), HTTP/1.1 (RFC 2616, 1999 — most widely deployed), HTTP/2 (RFC 7540, 2015), HTTP/3 (QUIC-based, 2022).

Web Objects:
- A web page consists of a base HTML file and referenced objects (images, JavaScript, CSS, video clips)
- Each object is a file addressable by a URL
- URL structure: protocol://hostname/path, e.g. http://www.example.com/index.html

The HTTP Request-Response Cycle:
1. User types URL in browser
2. Browser initiates TCP connection to server (port 80)
3. Browser sends HTTP request message (GET, POST, etc.)
4. Server receives request, processes it, sends HTTP response
5. TCP connection may be closed or kept alive (persistent)
6. Browser renders received HTML; finds referenced objects → repeats for each`,
    keyPoints: [
      "HTTP = application-layer web protocol; runs over TCP (reliable transport)",
      "Port 80 for HTTP, Port 443 for HTTPS — both well-known/reserved",
      "STATELESS: server keeps NO information about past requests — each request is fresh",
      "Stateless → simpler at scale; cookies add state back when needed",
      "Request-response: client pulls content from server (PULL protocol, unlike SMTP PUSH)",
      "URL = protocol + hostname + path (e.g. http://www.cs.pes.edu/courses.html)",
      "Web page = base HTML + referenced objects (images, scripts, CSS, video)",
      "Each referenced object requires a separate HTTP request",
      "RFC 1945 = HTTP/1.0, RFC 2616 = HTTP/1.1, RFC 7540 = HTTP/2",
      "TCP connection must be established before first HTTP request can be sent",
    ],
    formula: {
      code: `HTTP in the Stack:

  Browser (Chrome/Firefox)
      |
  HTTP Request/Response Messages
      |
  TCP (port 80) — reliable delivery
      |
  IP — routing to server
      |
  Physical network

URL Structure:
  http:// www.example.com / somepath / page.html
  ──────  ──────────────── ───────────────────────
  protocol   hostname           pathname

Web Page = Base HTML + N referenced objects
  index.html   ← base HTML (1 HTTP request)
    ├── logo.png    ← image (1 HTTP request)
    ├── style.css   ← stylesheet (1 HTTP request)
    └── script.js   ← JS file (1 HTTP request)
  Total: 4 HTTP requests to load this page

HTTP is a PULL protocol:
  Client → server: "I want /index.html"
  Server → client: "Here it is" (pushes content)
  (Unlike SMTP where server pushes email to another server)`,
      explanation: "HTTP's statelessness is what makes it scalable — the server doesn't track sessions. The base HTML file contains references (URLs) to other objects; the browser fetches each one separately.",
    },
    examTips: [
      "HTTP runs over TCP — ALWAYS. It is NOT directly over UDP.",
      "HTTP is STATELESS — 'stateless protocol' is the term to use in exam answers",
      "HTTP is a PULL protocol (client requests). SMTP is a PUSH protocol.",
      "Port 80 = HTTP. Port 443 = HTTPS. Both well-known, standardized.",
      "Each object (image, script, CSS) = one HTTP request — know this for RTT calculations",
      "RFCs: 1945 (1.0), 2616 (1.1), 7540 (2.0) — exam sometimes asks specific RFC numbers",
    ],
    questions: [
      { q: "What does it mean that HTTP is 'stateless' and why is this useful?", a: "Stateless means the HTTP server maintains no information about past client requests. If client sends the same request twice in a row, the server treats them as two completely independent, unrelated requests — it has no memory of the first. This is useful because: (1) Implementation is simpler at scale — no need to manage session state for millions of concurrent users. (2) Any server in a data center can handle any request — no need to route returning clients to the same server. Cookies are the mechanism used to ADD state back when applications need it (shopping carts, login sessions)." },
    ],
  },

  "http-connections": {
    title: "Non-Persistent vs Persistent HTTP", emoji: "🔗",
    tldr: "Non-persistent: new TCP connection per object → 2 RTTs per object. Persistent: reuse TCP connection → ~1 RTT per object. Pipelining sends multiple requests without waiting for responses.",
    explanation: `A key design choice in HTTP: should the TCP connection be reused across multiple objects?

NON-PERSISTENT HTTP (HTTP/1.0 default):
- Each HTTP request/response pair uses a NEW TCP connection
- TCP connection is closed after ONE object is transferred
- Cost: 2 RTTs + file transmission time per object
  - RTT 1: TCP SYN → SYN-ACK (connection setup)
  - RTT 2: HTTP request → first byte of response
  - Then: wait for full file to arrive

Time per object = 2 RTT + L/R  (L = object size, R = link speed)
For a page with 1 base HTML + 10 images: 11 × (2 RTT + L/R)

Problem: OS overhead for each TCP connection (create, maintain, teardown); parallel TCP connections partially help but still wasteful.

PERSISTENT HTTP (HTTP/1.1 default):
- Server leaves TCP connection open after sending response
- Subsequent requests/responses use the SAME connection
- Objects are pipelined: client sends next request as soon as previous is received
- With pipelining: ~1 RTT for multiple objects (after the initial connection setup)

Without pipelining (persistent, serial):
  - 1 RTT to set up TCP
  - 1 RTT per object request
  Total: 1 setup RTT + N×(1 RTT + L/R)

With pipelining (persistent + pipelined):
  - 1 RTT to set up TCP
  - 1 RTT to request ALL objects (fired back-to-back, no waiting)
  - Transmission time for all objects
  Total ≈ 2 RTT + N × L/R

HTTP/1.1 uses persistent connections with pipelining by default.

The connection times out and closes after a configurable idle period.`,
    keyPoints: [
      "Non-persistent: one TCP connection per object — maximum overhead",
      "Non-persistent time per object: 2 RTT + L/R (1 RTT TCP setup + 1 RTT HTTP request)",
      "Persistent (no pipelining): reuse connection, still 1 RTT per request after setup",
      "Persistent + pipelining: pipeline multiple requests — approximately 1 RTT for ALL objects",
      "Pipelining: send next request without waiting for current response",
      "HTTP/1.0 = non-persistent by default; HTTP/1.1 = persistent with pipelining by default",
      "Non-persistent creates OS overhead: N connections for N objects",
      "Parallel TCP connections = browsers open multiple non-persistent connections simultaneously",
      "Persistent connections time out after idle period — server closes them",
      "RTT (Round Trip Time) = time from client sending request to receiving first response byte",
    ],
    formula: {
      code: `Time to load a web page with 1 base HTML + 10 images:

NON-PERSISTENT HTTP:
  Per object: 2 RTT + L/R
  Total (11 objects, serial): 11 × (2 RTT + L/R) = 22 RTT + 11L/R

  Breakdown of one object:
  ──────────────── t=0
       │ TCP SYN sent
  RTT₁ │           ← SYN-ACK arrives
       │ HTTP GET
  RTT₂ │           ← first response byte
       │ .... rest of object arrives
       │ TCP FIN
  ──────────────── done  (cost: 2 RTT + L/R)
  (Repeat from scratch for next object)

PERSISTENT + NO PIPELINING:
  1 RTT: TCP setup
  Per object: 1 RTT + L/R
  Total: 1 RTT + 11 × (1 RTT + L/R) = 12 RTT + 11L/R

PERSISTENT + PIPELINING (HTTP/1.1 default):
  1 RTT: TCP setup
  1 RTT: HTTP GET for all 11 objects simultaneously
  + transmission time for all objects
  Total ≈ 2 RTT + 11L/R  (dramatically faster!)

RTT Comparison (10 objects, equal size):
  Non-persistent (serial): 20 RTT
  Non-persistent (parallel, 6 connections): ~4-5 RTT overhead
  Persistent (no pipeline):  11 RTT
  Persistent + pipelined:     2 RTT  ← winner`,
      explanation: "The 2 RTT cost in non-persistent comes from TCP handshake (1 RTT) then HTTP request (1 RTT). Persistent eliminates the repeated TCP handshake. Pipelining collapses N object requests into ~1 RTT.",
    },
    examTips: [
      "Non-persistent formula: 2 RTT + L/R per object. Write this on every exam.",
      "The two RTTs are: (1) TCP SYN/SYN-ACK, (2) HTTP GET/first-byte-of-response",
      "Persistent + pipelined ≈ 2 RTT + N×(L/R) — only 2 RTTs total regardless of N objects",
      "HTTP/1.0 = non-persistent. HTTP/1.1 = persistent + pipelining. Know this.",
      "Parallel connections = browser opens multiple TCP connections to speed up non-persistent",
      "Be careful about whether the question asks for 'per object' or 'total page load time'",
    ],
    questions: [
      { q: "A web page has 1 base HTML file + 8 images. RTT = 10ms. Each object = 1ms transmission time. Calculate total load time for non-persistent vs persistent pipelined HTTP.", a: "Non-persistent (serial): per object = 2 RTT + L/R = 2×10 + 1 = 21ms. Total = 9 × 21ms = 189ms. Persistent + pipelined: TCP setup = 1 RTT = 10ms. Then HTTP GET for all 9 objects = 1 RTT = 10ms. Transmission for 9 objects = 9 × 1ms = 9ms. Total = 10 + 10 + 9 = 29ms. Persistent pipelining is ~6.5× faster in this case." },
      { q: "Why does non-persistent HTTP cost 2 RTTs per object (not 1)?", a: "The first RTT is consumed by the TCP three-way handshake: client sends SYN, server replies SYN-ACK, client sends ACK. Only AFTER this handshake is complete can the HTTP request be sent. The second RTT is for the HTTP request itself: client sends GET, and server responds with the first byte of the file. So even before any file data arrives, 2 full RTTs have been spent — 1 for TCP setup and 1 for the actual HTTP exchange. This overhead is repeated for every single object in non-persistent HTTP." },
    ],
  },

  "http-messages": {
    title: "HTTP Request Methods & Status Codes", emoji: "📨",
    tldr: "Request: GET (fetch), POST (send body), HEAD (no response body), PUT (upload), DELETE. Response status: 200 OK, 301 redirect, 304 not modified, 400 bad request, 404 not found, 505 version unsupported.",
    explanation: `HTTP Messages come in two types: Requests (client → server) and Responses (server → client).

HTTP REQUEST MESSAGE FORMAT:
  request line: [method] [URL] [HTTP version] CRLF
  header lines: [header-field-name: value] CRLF (one per line)
  blank line:   CRLF (mandatory — marks end of headers)
  body:         only for POST/PUT

Key REQUEST METHODS:

GET: Retrieves the object at the specified URL.
  - Parameters sent IN THE URL (query string after ?)
  - Example: GET /search?q=HTTP HTTP/1.1
  - No request body

POST: Sends data to the server for processing.
  - Parameters sent IN THE REQUEST BODY (not in URL)
  - Used for form submissions, API calls, file uploads
  - Body contains the submitted data

HEAD: Like GET but server returns ONLY the headers — no object body.
  - Used to check if a URL exists, get Content-Type, or check Last-Modified
  - Useful for web caching to check if content has changed

PUT: Uploads an object to the server at the specified URL.
  - Places the object in the URL path — replaces if exists
  - Used in REST APIs to update resources

DELETE: Removes the specified object from the server.
  - Deletes the resource at the given URL

HTTP RESPONSE MESSAGE FORMAT:
  status line:  [HTTP version] [status code] [phrase] CRLF
  header lines: [header-field-name: value] CRLF
  blank line:   CRLF
  body:         the requested object (for successful GET)

KEY STATUS CODES:

200 OK — request succeeded; object follows in body
301 Moved Permanently — object moved to new URL; new URL in Location: header; client auto-redirects
304 Not Modified — used with conditional GET; object NOT sent (browser uses cached copy)
400 Bad Request — server couldn't understand the request (malformed)
404 Not Found — requested object doesn't exist on this server
505 HTTP Version Not Supported — server doesn't support the HTTP version the client used`,
    keyPoints: [
      "GET: retrieves object; params in URL query string; no body",
      "POST: sends data to server; params in REQUEST BODY; has body",
      "HEAD: like GET but NO object in response — headers only",
      "PUT: uploads/replaces object at specified URL",
      "DELETE: removes object at specified URL",
      "200 OK: success; object in response body",
      "301 Moved Permanently: redirect to new URL in Location: header",
      "304 Not Modified: conditional GET hit; no body, use cache",
      "400 Bad Request: server couldn't parse the request",
      "404 Not Found: object doesn't exist on server",
      "505 HTTP Version Not Supported: client used version server doesn't know",
    ],
    formula: {
      code: `HTTP REQUEST FORMAT:

  GET /somedir/page.html HTTP/1.1\r\n     ← request line
  Host: www.someschool.edu\r\n            ← header
  Connection: close\r\n                   ← header
  User-Agent: Mozilla/5.0\r\n            ← header
  Accept-Language: en\r\n                ← header
  \r\n                                   ← blank line (end of headers)
  (no body for GET)

POST REQUEST (with body):
  POST /form.php HTTP/1.1\r\n
  Host: www.example.com\r\n
  Content-Type: application/x-www-form-urlencoded\r\n
  Content-Length: 26\r\n
  \r\n
  name=Santosh&course=CN       ← request body (params here, not URL)

HTTP RESPONSE FORMAT:

  HTTP/1.1 200 OK\r\n                    ← status line
  Connection: close\r\n
  Date: Tue, 09 Aug 2011 15:44:04 GMT\r\n
  Server: Apache/2.2.3 (CentOS)\r\n
  Last-Modified: Tue, 09 Aug 2011 15:11:03 GMT\r\n
  Content-Length: 6821\r\n
  Content-Type: text/html\r\n
  \r\n
  <html>...</html>                       ← body (the object)

Status Codes Quick Reference:
  2xx = Success     200 OK
  3xx = Redirect    301 Moved Permanently, 304 Not Modified
  4xx = Client err  400 Bad Request, 404 Not Found
  5xx = Server err  505 HTTP Version Not Supported`,
      explanation: "The blank line (CRLF) between headers and body is mandatory — it marks where headers end. POST puts params in the body (not visible in URL). HEAD is used by caches to check freshness without downloading the full object.",
    },
    examTips: [
      "GET params in URL. POST params in body. HEAD = GET with no response body. Know all three cold.",
      "301 = redirect — browser AUTOMATICALLY follows Location: header to new URL",
      "304 = not modified — server sends NO object; client uses its cached copy (saves bandwidth)",
      "400 = YOUR FAULT (bad request). 404 = object MISSING on server. 505 = version mismatch.",
      "HTTP request line has 3 parts: METHOD + URL + HTTP-VERSION",
      "Blank line between headers and body is MANDATORY in both request and response",
    ],
    questions: [
      { q: "What is the difference between GET and POST in terms of where request parameters are placed?", a: "GET: parameters are appended to the URL as a query string after the ? character (e.g., /search?q=HTTP&lang=en). The URL is visible in the browser address bar and in server logs. GET has no request body. POST: parameters are placed in the request body. The URL itself doesn't contain the parameters. POST is used for forms, login credentials, and API calls where you don't want data in the URL or when sending large amounts of data." },
      { q: "A client sends a GET request for an image. The server responds with 304. What does this mean and what does the client do?", a: "Status 304 = 'Not Modified'. This happens in a conditional GET where the client already has a cached copy and asked the server 'has this changed since [date]?' (using If-Modified-Since header). The 304 response means the object has NOT changed since that date. The server sends ONLY headers — no body, no object data. The client uses its locally cached copy to render the image. This saves bandwidth: no need to re-download an object that hasn't changed." },
    ],
  },

  "http-cookies": {
    title: "HTTP Cookies", emoji: "🍪",
    tldr: "Cookies add state to stateless HTTP. 4-component architecture: Set-Cookie response header, Cookie request header, browser cookie file, server-side database. Used for sessions, auth, personalization.",
    explanation: `HTTP is stateless — servers remember nothing between requests. But many web applications NEED state: who is logged in, what's in your cart, your language preference. Cookies solve this.

The 4-Component Cookie Architecture:

1. Set-Cookie RESPONSE HEADER:
   Server sends: Set-Cookie: id=1678 in an HTTP response.
   This instructs the browser to store this cookie.

2. Cookie RESPONSE HEADER in subsequent requests:
   Browser sends: Cookie: id=1678 in every future request to this site.
   Server reads this to identify the user.

3. Cookie FILE on the client:
   Browser stores cookies in a file on your disk.
   The browser automatically includes the right cookie in each request.

4. Back-end DATABASE on the server:
   Server maps cookie ID to user's stored information.
   When the server sees Cookie: id=1678, it looks up user data for ID 1678.

How a First Visit Works:
1. Client sends HTTP request (no cookie — first visit)
2. Server creates a user ID (e.g., 1678) in its database
3. Server response includes: Set-Cookie: id=1678
4. Browser stores 1678 in cookie file for this site
5. Next request: browser sends Cookie: id=1678
6. Server looks up ID 1678 → knows it's you!

What Cookies Are Used For:
- Authorization (login sessions): stores session token
- Shopping carts: links cart to user without login
- Personalization: language, theme preferences
- Tracking: ad networks track you across websites (third-party cookies)

Privacy Concern:
A single company (like Google) can track you across thousands of websites that all include their tracking script, because your browser sends the same cookie ID to their servers from every site.`,
    keyPoints: [
      "Cookies = the mechanism to add state to stateless HTTP",
      "4 components: Set-Cookie header (server→client), Cookie header (client→server), cookie file (browser disk), server-side database",
      "Server sends Set-Cookie: id=1678 in response → browser saves it",
      "Browser sends Cookie: id=1678 in every subsequent request to this domain",
      "Server looks up cookie ID in its database to retrieve user state",
      "Used for: authentication, shopping carts, personalization, ad tracking",
      "Third-party cookies = tracking cookies from domains other than the page you're visiting",
      "Cookie has optional attributes: expiry date, domain, path, Secure (HTTPS only), HttpOnly",
      "Incognito/private mode doesn't persist cookies after the session closes",
    ],
    formula: {
      code: `Cookie Lifecycle:

FIRST VISIT (no cookie):
  Client → Server: GET /index.html HTTP/1.1
  Server → Client: HTTP/1.1 200 OK
                   Set-Cookie: id=1678
                   Content-Type: text/html
                   (body: welcome page)
  [Browser stores: site=amazon.com, id=1678 in cookie file]

SUBSEQUENT VISITS (with cookie):
  Client → Server: GET /products HTTP/1.1
                   Cookie: id=1678       ← browser attaches automatically
  Server: looks up DB[1678] → "Santosh, cart=[laptop, book]"
  Server → Client: HTTP/1.1 200 OK
                   (body: personalized product page for Santosh)

4-Component Architecture Diagram:

  [Browser]──── Cookie: id=1678 ────►[Server]
     │                                  │
  cookie                             look up
  file                             DB[1678]
  id=1678                           → user info

  [Browser]◄── Set-Cookie: id=1678 ─[Server]

Cookie Attributes:
  Set-Cookie: id=1678; Expires=Sat, 09 Jun 2025; Domain=amazon.com;
              Path=/; Secure; HttpOnly`,
      explanation: "The cookie ID is just a key — the actual user data lives in the server's database. The browser just stores and echoes the ID. This is how Amazon remembers your cart, and how ad networks track you.",
    },
    examTips: [
      "4 components = must know all four: Set-Cookie response header, Cookie request header, client cookie file, server DB",
      "Cookies add state to stateless HTTP — this is the exam framing",
      "Set-Cookie is in the SERVER'S RESPONSE. Cookie is in the CLIENT'S REQUEST.",
      "The cookie file persists on disk — it survives browser restarts (unless session cookie)",
      "HttpOnly attribute = cookie cannot be read by JavaScript (prevents XSS theft)",
      "Secure attribute = cookie only sent over HTTPS connections",
    ],
    questions: [
      { q: "A user visits Amazon for the first time. Trace the cookie exchange step by step.", a: "1. User opens browser and navigates to amazon.com. Browser sends HTTP GET with no Cookie header (first visit, no cookie stored). 2. Amazon's server generates a unique user ID (e.g., id=7892) and creates an entry in its database for this ID. 3. Server's HTTP response includes 'Set-Cookie: id=7892' in the headers. 4. Browser stores the cookie: domain=amazon.com, id=7892, in the cookie file on disk. 5. User clicks to view products. Browser sees it has a cookie for amazon.com, so it adds 'Cookie: id=7892' to the HTTP GET request header. 6. Amazon server reads id=7892, looks it up in its database, retrieves any stored preferences or cart items, and sends a personalized response." },
    ],
  },

  "http-caching": {
    title: "Web Caching & Conditional GET", emoji: "💾",
    tldr: "Web cache (proxy) serves requests on behalf of origin server — reduces latency and traffic. Conditional GET uses If-Modified-Since header → server returns 304 (no body) if object unchanged.",
    explanation: `Web Caching (Proxy Server):

A web cache (also called proxy server) sits between clients and origin servers. It stores copies of recently requested objects. When a client requests an object, the proxy checks if it has a fresh copy — if yes, it responds immediately without contacting the origin server.

Why Caching Matters:
- Reduces response time for clients (cached copy is nearby)
- Reduces traffic on the institution's access link to the internet
- Reduces load on origin servers
- ISPs and institutions deploy caches to lower costs

How It Works:
1. Browser sends HTTP request to proxy
2. Proxy checks its cache:
   a. Cache HIT: proxy returns the cached object immediately (fast!)
   b. Cache MISS: proxy requests the object from origin server, caches it, returns to browser
3. Cache stores the object with its Last-Modified date

Problem: Cached objects can become stale — the origin server may have updated the object.

Solution: CONDITIONAL GET

The Conditional GET:
1. Cache has a copy of the object dated (e.g.) Sep 24, 2011
2. Client requests the object again
3. Proxy sends conditional GET to origin server:
     GET /fruit/kiwi.gif HTTP/1.1
     Host: www.exotiqua.com
     If-Modified-Since: Wed, 9 Sep 2015 09:23:24
4. Origin server checks: has the object changed since that date?
   - If NOT changed: response is "304 Not Modified" with NO body
   - If changed: response is "200 OK" with the new object

304 Not Modified:
- Server sends only headers — no object body
- Saves bandwidth: client (or proxy) reuses its cached copy
- The cache's copy is confirmed fresh and valid

This is why HTTP HEAD method exists — you can check freshness without downloading the object.`,
    keyPoints: [
      "Web cache / proxy sits between clients and origin server; stores copies of objects",
      "Cache HIT: proxy serves from cache immediately — no origin server contact",
      "Cache MISS: proxy fetches from origin, caches it, then serves to client",
      "Caching reduces: response latency, access link traffic, origin server load",
      "Conditional GET: request includes If-Modified-Since: [date] header",
      "304 Not Modified: object unchanged; server sends headers only — NO body",
      "200 OK: object changed; server sends new object in body",
      "Cache stores Last-Modified date from origin server to use in conditional GETs",
      "Browser also has its own cache; proxies are shared caches for institutions/ISPs",
      "Reducing access link traffic = key economic motivation for ISP-level caching",
    ],
    formula: {
      code: `Web Cache Operation:

                [Internet]
                    │
              [Origin Server]
                    │
            (access link — expensive)
                    │
┌─────────────[Web Cache/Proxy]─────────────┐
│  stores: object + last-modified date       │
│  Cache HIT: object in cache, fresh         │
│    → serve immediately, no internet access │
│  Cache MISS: object not in cache           │
│    → fetch from origin, store, serve       │
└────────────────────────────────────────────┘
           (LAN — fast, cheap)
   [Client] [Client] [Client] [Client]

Conditional GET Message Exchange:

  Proxy → Origin: GET /object.jpg HTTP/1.1
                  Host: www.example.com
                  If-Modified-Since: Wed, 9 Sep 2015 09:23:24

  Scenario A (object NOT changed):
  Origin → Proxy: HTTP/1.1 304 Not Modified
                  Date: Sat, 10 Oct 2015 15:39:29
                  (NO body — proxy uses cached copy)

  Scenario B (object HAS changed):
  Origin → Proxy: HTTP/1.1 200 OK
                  Date: Sat, 10 Oct 2015 15:39:29
                  Last-Modified: Mon, 15 Sep 2015 08:00:00
                  Content-Type: image/jpeg
                  (new object in body)`,
      explanation: "304 saves bandwidth: only headers travel across the access link, not the full object. If-Modified-Since is how the cache tells the server what version it has. The server compares Last-Modified timestamp to decide.",
    },
    examTips: [
      "Conditional GET = GET request + If-Modified-Since header",
      "304 Not Modified = object unchanged; NO body in response → use cached copy",
      "Web cache reduces ACCESS LINK traffic — the expensive bottleneck between ISP and internet",
      "Caching benefit: reduces latency (nearby copy) + reduces origin server load",
      "If-Modified-Since value comes from the Last-Modified header in the original response",
      "Web cache = proxy server — clients may not even know they're talking to a proxy",
    ],
    questions: [
      { q: "A web cache has a copy of an image with Last-Modified date Sep 9 2015. A client requests the image again. Trace the complete conditional GET exchange.", a: "1. Client sends GET /image.jpg to web cache. 2. Cache has a copy but needs to verify freshness. Cache sends a conditional GET to origin server: 'GET /image.jpg HTTP/1.1, Host: www.example.com, If-Modified-Since: Wed, 9 Sep 2015 09:23:24'. 3a. If image unchanged: origin responds '304 Not Modified' with NO body. Cache serves its stored copy to client. No full object data traverses the internet — only headers. 3b. If image changed: origin responds '200 OK' with the new image in the body. Cache updates its copy, updates the Last-Modified date, serves new image to client." },
    ],
  },

  "http2": {
    title: "HTTP/2 & HOL Blocking", emoji: "🚀",
    tldr: "HTTP/1.1 suffers HOL blocking: one large object blocks smaller ones on a single TCP connection. HTTP/2 fixes this via request framing + multiplexing over a single TCP connection. Also adds server push and binary encoding.",
    explanation: `The Problem: Head-of-Line (HOL) Blocking in HTTP/1.1

HTTP/1.1 uses persistent pipelining — multiple requests on one TCP connection. But there's a critical problem:

If a large object (e.g., a 5MB video) is being transferred, it occupies the TCP connection. Smaller objects (CSS, tiny icons) behind it in the queue must WAIT — they're "blocked" behind the large object's head.

Browser workaround: open multiple parallel TCP connections (typically 6-8). But this wastes resources and adds connection overhead.

HOL (Head-of-Line) Blocking = the first large object in a pipeline blocks all subsequent objects, even small ones that could have been sent quickly.

HTTP/2 Solution — Framing and Multiplexing:

1. Binary Encoding:
   HTTP/1.1 headers and data are ASCII text. HTTP/2 uses binary encoding — more compact, faster to parse.

2. Request Framing:
   Large objects are broken into small FRAMES. These frames from different requests can be interleaved.

3. Multiplexing:
   Multiple request/response pairs are multiplexed over a SINGLE TCP connection.
   - Frame from Request A, Frame from Request B, Frame from Request C... all interleaved
   - A large object's frames don't block a small object's frames
   - HOL blocking eliminated at the HTTP layer

4. Request Prioritization:
   Client can set priority for different objects (e.g., "send CSS before images")

5. Server Push:
   Server can PUSH resources to the client before the client even requests them.
   Example: client requests index.html → server ALSO pushes style.css and logo.png that it knows will be needed.

HTTP/2 Limitation:
TCP still has its own HOL blocking. If a TCP segment is lost, all HTTP/2 streams wait. HTTP/3 (QUIC) solves this by running over UDP with per-stream loss recovery.`,
    keyPoints: [
      "HOL (Head-of-Line) blocking: large object in pipeline blocks all smaller objects behind it",
      "HTTP/1.1 workaround: browsers open 6-8 parallel TCP connections — wastes resources",
      "HTTP/2 uses binary encoding (not ASCII text) — compact and fast to parse",
      "HTTP/2 framing: large objects broken into small frames, interleaved with other requests",
      "HTTP/2 multiplexing: multiple HTTP exchanges over ONE TCP connection — no HOL at HTTP layer",
      "HTTP/2 server push: server sends resources before client requests them",
      "HTTP/2 request prioritization: client specifies which objects matter most",
      "HTTP/2 still vulnerable to TCP-level HOL blocking (packet loss stalls all streams)",
      "HTTP/3 (QUIC) solves TCP HOL by using UDP with per-stream reliability",
    ],
    formula: {
      code: `HOL Blocking in HTTP/1.1:

Single TCP connection, pipelined:
  ─────────────────────────────────────────
  [Big Object (5MB video)]
  [Small CSS (10KB)] ← WAITING — blocked by video!
  [Tiny icon (2KB)]  ← WAITING
  [Script (50KB)]    ← WAITING
  ─────────────────────────────────────────
  HOL = first object in line blocks everything behind it

HTTP/1.1 workaround (parallel connections):
  TCP conn 1: [Big video]
  TCP conn 2: [CSS][icon]
  TCP conn 3: [Script][image]
  ...up to 6-8 parallel connections
  Problem: resource overhead, complexity

HTTP/2 Multiplexing over 1 TCP connection:
  ─────────────────────────────────────────
  Stream 1 (video): frame1 ─────────────────── frame2 ─ frame3
  Stream 2 (CSS):          frame1 ─ frame2
  Stream 3 (icon):                    frame1
  Stream 4 (script):             frame1 ─ frame2
  ─────────────────────────────────────────
  All interleaved on ONE TCP connection!
  Small objects complete even while video is mid-transfer.

HTTP/2 vs HTTP/1.1:
  Feature          HTTP/1.1        HTTP/2
  ───────────────────────────────────────────
  Encoding         ASCII text      Binary
  HOL blocking     Yes             No (at HTTP layer)
  TCP connections  6-8 parallel    1 single
  Server push      No              Yes
  Prioritization   No              Yes
  Head compression No              HPACK (efficient)`,
      explanation: "Framing is the key insight: by breaking objects into small frames that can be interleaved, no one request monopolizes the connection. The client reassembles frames by stream ID.",
    },
    examTips: [
      "HOL blocking = one LARGE object blocks all smaller objects waiting in queue — this is HTTP/1.1's fatal flaw",
      "HTTP/2 fix = FRAMING + MULTIPLEXING over a single TCP connection",
      "HTTP/2 uses BINARY encoding — not ASCII. Much more efficient parsing.",
      "Server push = server proactively sends resources before client requests them",
      "HTTP/2 does NOT fix TCP-level HOL blocking — that's HTTP/3's job (QUIC over UDP)",
      "Browsers opened 6-8 TCP connections as HTTP/1.1 workaround — HTTP/2 makes this unnecessary",
    ],
    questions: [
      { q: "Explain head-of-line (HOL) blocking in HTTP/1.1 and how HTTP/2 solves it.", a: "HOL blocking in HTTP/1.1: HTTP/1.1 uses a single pipelined TCP connection. Requests are processed in order — if a large object (e.g., a 5MB video) is at the front of the pipeline, all subsequent smaller objects (CSS file, icons) must wait until the large object finishes transferring. These small objects could have been sent in milliseconds but are blocked behind the 'head of the line.' HTTP/2 solution: HTTP/2 breaks all objects into small frames. Frames from different requests are interleaved on a single TCP connection (multiplexing). A video frame, then a CSS frame, then an icon frame, then another video frame — small objects complete quickly regardless of large objects. This eliminates HOL blocking at the HTTP layer." },
    ],
  },

  "https-tls": {
    title: "HTTPS & TLS Handshake", emoji: "🔒",
    tldr: "HTTPS = HTTP + TLS (Transport Layer Security). TLS operates at application layer, wraps TCP. Port 443. Provides: encryption, server authentication (certificate), data integrity. Appeared 3 papers for 6-7 marks.",
    explanation: `HTTPS = HTTP over TLS (Transport Layer Security).

TLS replaced SSL (Secure Sockets Layer). You'll see both terms — SSL is the older name; TLS is the current protocol. They refer to the same concept.

Where TLS Operates:
TLS is technically an application-layer protocol — it sits ABOVE TCP and BELOW HTTP. This is why you still need TCP (TLS uses TCP's reliable delivery), but TLS is implemented in application libraries, not in the OS kernel's TCP stack.

What TLS Provides:
1. Encryption: All HTTP data is encrypted. Even if someone captures the packets, they see ciphertext — useless without the key.
2. Server Authentication: The server presents a digital CERTIFICATE signed by a trusted Certificate Authority (CA). The client verifies the certificate to confirm it's talking to the real server (not an impostor). Prevents man-in-the-middle attacks.
3. Data Integrity: Message Authentication Codes (MACs) ensure data wasn't tampered with in transit.

The TLS Handshake (simplified):
1. TCP Setup: Client → SYN → SYN-ACK → ACK (1 RTT) — normal TCP 3-way handshake
2. TLS ClientHello: Client sends: supported cipher suites, TLS version, random nonce
3. ServerHello + Certificate: Server replies: chosen cipher suite, server's certificate (contains server's public key, signed by CA)
4. Client Verification: Client verifies certificate is valid and signed by a trusted CA
5. Key Exchange: Client and server use Diffie-Hellman key exchange to agree on a shared secret session key — without sending the key over the network
6. Session Key Derived: Both sides derive identical symmetric session keys from the shared secret
7. Finished: Both sides send "Finished" message (encrypted with session key) to confirm handshake is complete
8. Encrypted HTTP: All subsequent HTTP data encrypted with the symmetric session key

Port 443 = HTTPS. The web server listens on port 443 for TLS-secured connections.

Modern TLS 1.3 reduces handshake to 1 RTT (from 2 RTTs in TLS 1.2).`,
    keyPoints: [
      "HTTPS = HTTP + TLS (Transport Layer Security — replaced SSL)",
      "TLS operates at the APPLICATION LAYER — above TCP, below HTTP",
      "Port 443 for HTTPS (vs port 80 for HTTP)",
      "TLS provides 3 things: encryption, server authentication (certificate), data integrity",
      "Certificate: server's identity, its public key, signed by a Certificate Authority (CA)",
      "Diffie-Hellman key exchange: both sides compute shared secret without sending it over network",
      "Symmetric session key: derived from shared secret — used to encrypt/decrypt HTTP data",
      "TLS handshake: TCP setup → ClientHello → ServerHello+cert → key exchange → Finished → encrypted HTTP",
      "Man-in-the-middle attack prevented by certificate verification",
      "TLS 1.3 reduces handshake to 1 RTT; TLS 1.2 took 2 RTTs after TCP",
    ],
    formula: {
      code: `TLS Handshake (TLS 1.2 — 4-step simplified):

  Client                          Server
    │                               │
    │──── TCP SYN ─────────────────►│
    │◄─── TCP SYN-ACK ──────────────│   1 RTT: TCP setup
    │──── TCP ACK ─────────────────►│
    │                               │
    │──── ClientHello ─────────────►│   TLS begins
    │   (cipher suites, TLS ver,    │
    │    client random nonce)        │
    │                               │
    │◄─── ServerHello ──────────────│
    │◄─── Certificate ──────────────│   Server's identity + public key
    │◄─── ServerHelloDone ──────────│
    │                               │
    │  [Client verifies certificate against trusted CAs]
    │                               │
    │──── Key Exchange (DH) ───────►│   Both derive shared secret
    │──── ChangeCipherSpec ─────────►│   "I'll use encryption now"
    │──── Finished (encrypted) ─────►│
    │                               │
    │◄─── ChangeCipherSpec ─────────│
    │◄─── Finished (encrypted) ─────│
    │                               │
    │══ All HTTP data encrypted ════│   Symmetric session key used

TLS = TCP Layer:
  [HTTP]                   ← app layer protocol
  [TLS]                    ← app layer security
  [TCP port 443]           ← transport layer
  [IP]                     ← network layer

What TLS provides:
  Encryption        → eavesdroppers see ciphertext
  Authentication    → certificate proves server identity
  Integrity         → MAC detects tampering`,
      explanation: "The certificate solves the identity problem: how do you know you're really talking to google.com and not an impersonator? The CA hierarchy (Verisign, Let's Encrypt, etc.) is trusted by browsers. Diffie-Hellman is beautiful: two parties compute the same secret without ever sending it.",
    },
    examTips: [
      "TLS is at the APPLICATION LAYER — not transport layer. This is a common trap.",
      "TLS provides 3 things: ENCRYPTION + SERVER AUTHENTICATION + DATA INTEGRITY",
      "Certificate Authority (CA) = trusted third party that signs server certificates",
      "Diffie-Hellman = key exchange where shared secret is computed, never transmitted",
      "Port 443 = HTTPS = HTTP over TLS. Port 80 = plain HTTP.",
      "Man-in-the-middle attack = impersonator intercepts connection — certificate verification prevents this",
    ],
    questions: [
      { q: "Describe the TLS handshake step by step and explain what each step achieves.", a: "1. TCP Setup (1 RTT): Normal TCP 3-way handshake. TLS requires TCP's reliability. 2. ClientHello: Client sends supported TLS versions, cipher suites it can use, and a random nonce. Begins TLS negotiation. 3. ServerHello + Certificate: Server chooses cipher suite, sends its certificate (contains server's public key, signed by CA). Client can verify the server's identity by checking the certificate against trusted CAs — prevents impersonation. 4. Key Exchange (Diffie-Hellman): Both parties exchange public values; each independently computes the same shared secret. The session key is derived from this secret — it was never transmitted, so can't be intercepted. 5. Finished: Both sides send encrypted Finished messages using the new session key to confirm handshake success. 6. Encrypted HTTP: All HTTP traffic is now encrypted with the symmetric session key. Encryption prevents eavesdropping; MACs ensure integrity." },
      { q: "Why does TLS operate at the application layer rather than the transport layer?", a: "TLS sits above TCP and below HTTP in the stack, making it an application-layer protocol even though it provides transport-security services. The reason: TLS is implemented in application libraries (OpenSSL, BoringSSL) rather than in the OS kernel's TCP/IP stack. This design means TLS can be used by any application regardless of OS, updated without kernel changes, and configured per-application. TCP still provides the reliable delivery that TLS depends on — TLS just encrypts the byte stream that TCP delivers. If TLS were in the OS kernel, every OS would need updates for every TLS change — the current design is more flexible." },
    ],
  },

  // ─── GROUP 2: DNS ─────────────────────────────────────────────────────────

  "dns-services": {
    title: "DNS Services & Why Not Centralize", emoji: "📖",
    tldr: "DNS = Internet's phonebook. Translates hostnames to IPs. Distributed + hierarchical because centralization would fail at Internet scale.",
    explanation: `Computers use 32-bit IP addresses (like 142.250.77.46) to identify each other. Humans use hostnames (like google.com). DNS (Domain Name System) bridges this gap — it is a distributed database implemented in a hierarchy of name servers, running as an application-layer protocol.

DNS is like the Internet's phonebook — you look up a name, it gives you the number (IP address).

DNS Services:

1. Hostname-to-IP Translation (most important)
When you type www.google.com, DNS resolves it to an IP address like 142.250.77.46. Your browser then uses that IP to connect.

2. Host Aliasing
A server may have a complex canonical name like servereast.backup2.ibm.com but present a simple alias www.ibm.com. DNS maps the alias to the real name.
- Canonical name = the real, official hostname
- Alias name = a simpler, human-friendly name

3. Mail Server Aliasing
Email like bob@example.com uses DNS MX records to find the actual mail server. The same domain (example.com) can point to different servers for web vs email.

4. Load Distribution
Popular sites like Google run hundreds of servers. One hostname maps to multiple IP addresses. DNS rotates which IP it returns, distributing traffic.

Why NOT Centralize DNS?
- Single point of failure: if one server dies, entire Internet breaks
- Traffic volume: Comcast's DNS servers alone handle 600 BILLION queries per day
- Distant centralized database: slow for users far away
- Maintenance: updating one giant database for the whole world

Answer: DNS simply does NOT scale if centralized.`,
    keyPoints: [
      "DNS = distributed database + application-layer protocol for name resolution",
      "Translates human-readable hostnames to IP addresses and vice versa",
      "Service 1: Hostname-to-IP translation (most common)",
      "Service 2: Host aliasing — alias name maps to canonical (real) name",
      "Service 3: Mail server aliasing — MX records for email routing",
      "Service 4: Load distribution — one name, multiple IP addresses",
      "Centralized DNS fails: single point of failure, too much traffic, no scalability",
      "Comcast's DNS alone handles 600 billion queries/day — centralization impossible",
      "DNS is complex but runs as a simple application-layer protocol (like HTTP)",
    ],
    formula: {
      code: `DNS Service Examples:

Hostname → IP (Type A):
  www.google.com  →  142.250.77.46

Alias → Canonical (Type CNAME):
  www.ibm.com  →  servereast.backup2.ibm.com
                  (then resolve canonical to get IP)

Mail Aliasing (Type MX):
  bob@example.com
    └─ MX lookup: example.com → mail.example.com
    └─ A lookup:  mail.example.com → 93.184.216.34

Load Distribution (multiple A records):
  www.google.com → 142.250.77.46
  www.google.com → 142.250.77.47   ← returned in rotation
  www.google.com → 142.250.77.48

Why Not Centralize:
  600B queries/day ÷ 1 server = impossible
  1 failure × all of Internet = catastrophic`,
      explanation: "DNS resolves names to IPs using a distributed hierarchy. Load distribution rotates multiple IPs for one hostname — round-robin DNS balances traffic.",
    },
    examTips: [
      "DNS runs at the APPLICATION LAYER — this is a common trap question",
      "Canonical name = real name. Alias = friendly shortcut. CNAME record maps alias→canonical.",
      "MX record = Mail eXchanger — points a domain to its mail server",
      "Load distribution = one hostname, MULTIPLE IPs — DNS rotates which it returns",
      "Centralization fails for 4 reasons: single point of failure, traffic, distance, maintenance",
      "DNS is both a distributed database AND an application-layer protocol",
    ],
    questions: [
      { q: "What are the four services provided by DNS?", a: "1. Hostname-to-IP translation — resolves www.google.com to an IP address. 2. Host aliasing — maps a simple alias name to the real canonical hostname (e.g., www.ibm.com → servereast.backup2.ibm.com). 3. Mail server aliasing — MX records point a domain to its mail server. 4. Load distribution — one hostname maps to multiple IP addresses; DNS rotates which IP it returns to distribute traffic across servers." },
      { q: "Why can't DNS be centralized? Give all four reasons.", a: "1. Single point of failure — if the one DNS server crashes, the entire Internet breaks. 2. Traffic volume — Comcast's DNS alone handles 600 billion queries/day; one server can't handle global volume. 3. Distant centralized database — users far from the server suffer high latency for every DNS lookup. 4. Maintenance — impossible to update one giant database for all domains globally. Conclusion: DNS doesn't scale if centralized." },
    ],
  },

  "dns-hierarchy": {
    title: "DNS Hierarchy, Resolution & Caching", emoji: "🗂️",
    tldr: "3-level hierarchy: Root → TLD → Authoritative. Local DNS server is your proxy. Iterated query = local server does all the work. Caching = store results with TTL. Zone ≠ Domain.",
    explanation: `DNS is organized as a 3-level hierarchy of servers:

Level 1 — Root Name Servers:
- There are 13 logical root name servers (labeled a through m)
- Each is replicated ~200+ times worldwide for reliability and speed
- They are the "last resort" — if no one else can resolve a name, ask root
- Managed by ICANN (Internet Corporation for Assigned Names and Numbers)
- Supports DNSSEC for authentication and message integrity

Level 2 — TLD (Top-Level Domain) Servers:
- Responsible for .com, .org, .net, .edu, .gov, and country codes (.in, .uk, .cn, etc.)
- Network Solutions manages .com and .net; Educause manages .edu

Level 3 — Authoritative DNS Servers:
- Each organization maintains their own DNS server(s)
- Has the definitive mappings for all hosts in that organization (e.g., dns.cs.umass.edu)
- Can be maintained by the org or a third-party provider

Local DNS Name Server (your "default name server"):
- Not formally part of the hierarchy — but critically important
- Every ISP, university, and company has one
- When your device makes a DNS query, it first goes to the local DNS server
- Caches recent results; acts as a proxy forwarding queries up the hierarchy

DNS Name Resolution Methods:

ITERATED QUERY (preferred):
1. Client → Local DNS: "What is gaia.cs.umass.edu?"
2. Local DNS → Root: "What is gaia.cs.umass.edu?"
3. Root → Local DNS: "I don't know, ask .edu TLD"
4. Local DNS → .edu TLD: "What is gaia.cs.umass.edu?"
5. .edu TLD → Local DNS: "I don't know, ask dns.cs.umass.edu"
6. Local DNS → Authoritative: "What is gaia.cs.umass.edu?"
7. Authoritative → Local DNS: "It's 128.119.245.12"
8. Local DNS → Client: "It's 128.119.245.12"
Each contacted server says: "Ask this other server."

RECURSIVE QUERY:
Each server takes full responsibility for resolving and passes it up. Creates heavy load at upper hierarchy levels — less preferred.

DNS Caching:
- Once any name server learns a mapping, it caches it
- Cache entries have TTL (Time-To-Live) — expire after some time
- TLD records are often cached in local DNS servers → root servers rarely contacted
- Problem: if a host changes IP, old cached entries remain until TTL expires
- Update/notify mechanisms: RFC 2136

DNS Zones vs Domains:
- A DOMAIN is a subtree of the DNS namespace (e.g., cs.umass.edu)
- A ZONE is an administrative unit — a contiguous portion of the DNS tree managed by one entity
- A domain can span MULTIPLE zones (e.g., umass.edu and cs.umass.edu are separate zones even though cs.umass.edu is within the umass.edu domain)
- Each zone has its own authoritative DNS servers and its own zone file
- A zone boundary exists wherever management responsibility is delegated to a sub-entity`,
    keyPoints: [
      "3-level hierarchy: Root → TLD → Authoritative DNS servers",
      "13 logical root servers — each replicated ~200 times worldwide",
      "Root servers managed by ICANN; support DNSSEC",
      "TLD servers: .com (Network Solutions), .edu (Educause), country codes",
      "Authoritative server = organization's own DNS with official mappings",
      "Local DNS server = your ISP's server = default name server (not in hierarchy)",
      "Iterated query: local DNS contacts each level. 8 messages total for 3-level hierarchy.",
      "Recursive query: each server resolves fully — heavy load on upper levels",
      "Caching: DNS mappings stored with TTL to reduce repeated lookups",
      "Stale cache problem: IP changes may not propagate until TTL expires",
      "ZONE = administrative unit of management. DOMAIN = naming subtree. A domain can span multiple zones.",
    ],
    formula: {
      code: `DNS Hierarchy:

          [Root DNS Servers]  ← "last resort"
         /        |          \\
   [.com TLD] [.edu TLD] [.org TLD]
   /    \\        |          |
yahoo  amazon  umass.edu  pbs.org
(Auth) (Auth)   (Auth)    (Auth)

Iterated Query for gaia.cs.umass.edu:

Client → [1] → LocalDNS (dns.nyu.edu)
              → [2] → Root Server
              ← [3] ← "Ask .edu TLD"
              → [4] → .edu TLD
              ← [5] ← "Ask dns.cs.umass.edu"
              → [6] → Authoritative (dns.cs.umass.edu)
              ← [7] ← "128.119.245.12"
Client ← [8] ← LocalDNS: "128.119.245.12"
(Total: 8 messages for iterated query)

Caching:
  Mapping cached with TTL (e.g., 86400 seconds = 1 day)
  Same query within TTL → answered from cache, no hierarchy needed

Zone vs Domain:
  Domain: cs.umass.edu (naming scope)
  Zone A: umass.edu zone (managed by umass admin team)
  Zone B: cs.umass.edu zone (managed by CS dept — separate zone!)
  Both zones fall within the umass.edu DOMAIN.
  Zone B is delegated via NS record from Zone A.`,
      explanation: "Iterated = local server makes all the trips. Recursive = each server passes the whole job up. Zone is about WHO manages — a domain can be split into multiple zones with different authorities.",
    },
    examTips: [
      "13 logical root servers — but physically replicated ~200 times. Know BOTH numbers.",
      "ICANN manages root DNS. IETF writes protocols. Don't mix these up.",
      "Iterated query = local DNS contacts each level. 8 messages total for 3-level hierarchy.",
      "Recursive puts heavy load on UPPER hierarchy levels — that's why iterated is preferred",
      "TTL = Time to Live for cached entries. Expired TTL = must re-query the hierarchy.",
      "Local DNS server is NOT formally part of the hierarchy — it's a proxy",
      "Zone vs domain: a ZONE is an administrative grouping; a domain can span multiple zones",
    ],
    questions: [
      { q: "Describe an iterated DNS query step by step for resolving gaia.cs.umass.edu from a host at nyu.edu.", a: "1. Client queries its local DNS server (dns.nyu.edu). 2. Local DNS queries a root server. 3. Root server returns reference to .edu TLD server (doesn't know the answer). 4. Local DNS queries .edu TLD server. 5. .edu TLD returns reference to dns.cs.umass.edu (authoritative). 6. Local DNS queries dns.cs.umass.edu (authoritative for cs.umass.edu). 7. Authoritative server returns IP 128.119.245.12. 8. Local DNS returns IP to client. 8 messages total." },
      { q: "What is the difference between a DNS zone and a DNS domain?", a: "A domain is a subtree of the DNS namespace — a naming scope (e.g., cs.umass.edu includes all hostnames ending in cs.umass.edu). A zone is an administrative unit — a contiguous portion of the domain tree managed by a single entity with its own authoritative DNS servers and zone file. A domain can span multiple zones: for example, umass.edu is one zone managed by the university IT team, while cs.umass.edu is a separate zone delegated to the CS department. Both zones are within the umass.edu domain, but they have separate administrative authority and separate authoritative DNS servers." },
    ],
  },

  "dns-records": {
    title: "DNS Records (RR) & Protocol Messages", emoji: "📋",
    tldr: "4 record types: A (name→IP), NS (domain→authoritative server), CNAME (alias→canonical), MX (domain→mail server). Messages: 12-byte header + 4 sections.",
    explanation: `DNS stores information as Resource Records (RRs). Each RR has the format: (name, value, type, ttl).

Type A — Address Record:
- name = hostname
- value = IPv4 address
- Example: relay1.bar.foo.com, 145.37.93.126, A
- This is the most fundamental DNS record — direct hostname to IP mapping

Type NS — Name Server Record:
- name = domain name (e.g., foo.com)
- value = hostname of the authoritative DNS server for this domain
- Example: foo.com, dns.foo.com, NS
- Used to delegate: "to find info about foo.com, ask dns.foo.com"

Type CNAME — Canonical Name Record:
- name = alias hostname
- value = canonical (real) hostname
- Example: ibm.com, servereast.backup2.ibm.com, CNAME
- After getting CNAME, resolver must look up the canonical name to get IP

Type MX — Mail Exchanger Record:
- name = domain/alias name
- value = canonical name of the mail server for that domain
- Example: example.com, mail.example.com, MX
- Email delivery uses MX to find where to deliver messages

Inserting DNS Records (new startup example):
To register networkutopia.com at a registrar:
1. Provide names + IPs of your authoritative name servers
2. Registrar inserts into .com TLD: NS record and A record for your DNS server
3. You create on your authoritative server: Type A for www, Type MX for email

DNS Message Format (same for both queries and replies):
- Identification (16-bit): query ID; reply uses same ID so client can match them
- Flags (16-bit): query/reply bit, recursion desired, recursion available, authoritative answer
- # Questions, # Answer RRs, # Authority RRs, # Additional RRs
- Questions section: the name and type being queried
- Answers section: RRs answering the query
- Authority section: NS records pointing to authoritative servers
- Additional section: pre-fetched helpful info (e.g., IPs of the NS servers in Authority)`,
    keyPoints: [
      "RR format: (name, value, type, ttl) — all four fields always present",
      "Type A: hostname → IPv4 address (most basic)",
      "Type NS: domain → hostname of authoritative DNS server (delegation)",
      "Type CNAME: alias hostname → canonical (real) hostname",
      "Type MX: domain → mail server name (for email routing)",
      "After CNAME, must still resolve the canonical name to get an IP",
      "DNS message format is same for queries and replies",
      "16-bit Identification links a query to its reply",
      "Flags include: query/reply, recursion desired, recursion available, authoritative",
      "4 sections: Questions, Answers, Authority, Additional",
    ],
    formula: {
      code: `Resource Record Summary:

  (name,              value,                      type)
  relay1.bar.foo.com, 145.37.93.126,              A
  foo.com,            dns.foo.com,                NS
  ibm.com,            servereast.backup2.ibm.com, CNAME
  example.com,        mail.example.com,           MX

DNS Message Structure (both Query & Reply):
  ┌──────────────────┬──────────────────┐
  │  Identification  │      Flags       │  ← 12-byte header
  ├──────────────────┼──────────────────┤
  │  # Questions     │  # Answer RRs    │
  ├──────────────────┼──────────────────┤
  │  # Authority RRs │  # Additional RRs│
  ├─────────────────────────────────────┤
  │  Questions  (name + type to query)  │
  ├─────────────────────────────────────┤
  │  Answers    (RRs answering query)   │
  ├─────────────────────────────────────┤
  │  Authority  (NS records)            │
  ├─────────────────────────────────────┤
  │  Additional (helpful pre-fetched)   │
  └─────────────────────────────────────┘

Registering networkutopia.com:
  Registrar adds to .com TLD:
    (networkutopia.com, dns1.networkutopia.com, NS)
    (dns1.networkutopia.com, 212.212.212.1, A)
  You add to your authoritative server:
    (www.networkutopia.com, <web server IP>, A)
    (networkutopia.com, mail.networkutopia.com, MX)`,
      explanation: "The 4 RR types are the building blocks of all DNS. NS + A records work together: NS says 'ask this server', A gives that server's IP. The message format is identical for query and reply — only the sections are filled differently.",
    },
    examTips: [
      "RR format = (name, value, type, ttl) — write all four in exams",
      "Type A: answer is an IP address. Type NS: answer is a hostname (of the authoritative server).",
      "CNAME resolution requires TWO lookups: first CNAME to get canonical name, then A to get IP",
      "MX vs A: MX finds the MAIL server. A finds the WEB server. Same domain can have both.",
      "Identification field = links query to reply — if IDs don't match, reply is discarded",
      "Additional section = pre-fetched A records for the NS servers in Authority section",
    ],
    questions: [
      { q: "What does a Type NS record tell you, and how is it used with Type A?", a: "A Type NS record says: 'To find authoritative information about domain X, contact the name server at hostname Y.' For example: (foo.com, dns.foo.com, NS) means 'ask dns.foo.com for info about foo.com.' But dns.foo.com is itself a hostname — we need its IP too. So there's also an A record: (dns.foo.com, 1.2.3.4, A). The NS record delegates, and the A record provides the IP of the delegated server. DNS typically includes both NS and A records for the delegated server." },
      { q: "A new company registers example.net. What DNS records need to be created and where?", a: "1. At the registrar (inserted into .net TLD server): NS record (example.net, dns1.example.net, NS) and A record for the DNS server (dns1.example.net, <IP>, A). 2. On your own authoritative DNS server at dns1.example.net: A record for the website (www.example.net, <web server IP>, A) and MX record for email (example.net, mail.example.net, MX). Optionally, A record for the mail server (mail.example.net, <mail IP>, A)." },
    ],
  },

  "dns-wireshark": {
    title: "Wireshark DNS Packet Analysis", emoji: "🔬",
    tldr: "DNS runs on UDP port 53. Query and reply share same Transaction ID. Reply has Answers + Authority + Additional sections. Wireshark filter: udp.port==53.",
    explanation: `DNS typically uses UDP port 53 for queries and responses (uses TCP for zone transfers or large responses).

From the Wireshark capture in the slides (filter: ip.addr == 10.36.41.43):

DNS REQUEST (Packet 16 — the query):
- Time: 13:51:27.041610
- Source: 10.36.41.43 → Destination: 10.40.4.44 (DNS server)
- Protocol: DNS, Length: 72 bytes, Info: "Standard query 0x9f7d A www.ietf.org"
- Packet detail breakdown:
  * Transaction ID: 0x9f7d — unique ID for this query
  * Flags: 0x0100 Standard query (this is a query, not a reply)
  * Questions: 1 (asking one name)
  * Answer RRs: 0, Authority RRs: 0, Additional RRs: 0 (empty — it's a query)
  * Query: www.ietf.org type A, class IN — asking for the IPv4 address

DNS RESPONSE (Packet 17 — the answer):
- Time: 13:51:27.160178
- Source: 10.40.4.44 → Destination: 10.36.41.43 (RTT ≈ 119ms)
- Protocol: DNS, Length: 473 bytes (much larger — carries lots of info)
- Info: "Standard query response 0x9f7d A 64.170.98.30"
  * Same Transaction ID: 0x9f7d ← this is how the client matches reply to query
  * Flags: 0x8180 Standard query response, No error
  * Questions: 1, Answer RRs: 1, Authority RRs: 6, Additional RRs: 11
  * Answer section: www.ietf.org type A, class IN, addr 64.170.98.30 ← the IP!
  * Authority section: 6 NS records (authoritative name servers for ietf.org)
  * Additional section: 11 pre-fetched A/AAAA records for those NS servers

What else you see in the capture:
- Packets 18–19: Another DNS query for tunnel.cfw.trustedsource.org — even loading one website triggers multiple DNS lookups
- Packets 20–21: TCP SYN / SYN-ACK — after DNS resolves the IP, the browser starts a TCP connection to 8.21.161.7 for HTTPS
- This shows the complete flow: DNS lookup → TCP connect → TLS handshake

Emulating a local DNS server manually:
Step 1: Send query directly to a root server → gets NS records for .net TLD (no answer yet)
Step 2: Query the .net TLD server → gets NS record for example.net
Step 3: Query example.net authoritative → finally gets the answer A record`,
    keyPoints: [
      "DNS uses UDP port 53 for most queries (TCP for zone transfers / large responses)",
      "Transaction ID links query to reply — same ID in both packets",
      "DNS query: Flags=0x0100, Questions=1, all RR counts=0",
      "DNS response: Flags=0x8180, Answer RRs has the IP, plus Authority + Additional",
      "Response is much larger than query (473 vs 72 bytes) due to Authority + Additional",
      "Authority section = NS records of authoritative servers for the domain",
      "Additional section = pre-fetched A records for the NS servers (avoids extra lookups)",
      "One website load → multiple DNS queries (one per hostname referenced)",
      "After DNS → TCP SYN starts (browser connects to resolved IP)",
      "Wireshark filter: ip.addr == 10.36.41.43 or udp.port == 53",
    ],
    formula: {
      code: `Wireshark DNS Capture — Key Packets:

Packet 16 (QUERY):
  Src: 10.36.41.43  →  Dst: 10.40.4.44 (DNS server)
  Protocol: DNS     |  Length: 72 bytes
  Transaction ID:   0x9f7d
  Flags:            0x0100  (Standard query)
  Questions: 1      |  Answers: 0  |  Auth: 0  |  Add: 0
  Query: www.ietf.org  type A  class IN

Packet 17 (RESPONSE):
  Src: 10.40.4.44   →  Dst: 10.36.41.43
  Protocol: DNS     |  Length: 473 bytes
  Transaction ID:   0x9f7d  ← MATCHES query
  Flags:            0x8180  (Standard query response, No error)
  Questions: 1  |  Answers: 1  |  Auth: 6  |  Additional: 11
  ANSWER: www.ietf.org  A  64.170.98.30  ← the IP address!
  AUTHORITY: 6 NS records for ietf.org
  ADDITIONAL: A records for those NS servers (pre-fetched)

Complete Flow Visible in Capture:
  Pkt 16  DNS query for www.ietf.org
  Pkt 17  DNS response → IP = 64.170.98.30
  Pkt 18  DNS query for tunnel.cfw.trustedsource.org
  Pkt 19  DNS response for that query
  Pkt 20  TCP SYN → 8.21.161.7 (HTTP/HTTPS connection starts)
  Pkt 21  TCP SYN-ACK ← server responds`,
      explanation: "Transaction ID is the key: it must match between query and response. The response carries Authority + Additional to help you find the authoritative server without needing extra queries.",
    },
    examTips: [
      "Transaction ID purpose = allows client to MATCH a reply to the query that triggered it",
      "DNS uses UDP by default — low overhead, fast, single round-trip for most queries",
      "Flags field: bit 0 = 0 for query, 1 for reply. Recursion Desired = client wants recursive resolution.",
      "Why is the response bigger? Answers + 6 Authority NS records + 11 Additional A/AAAA records",
      "Additional section = pre-fetched — avoids you needing to make MORE queries for the NS servers",
      "After DNS resolves, TCP SYN happens IMMEDIATELY — DNS lookup must complete first",
    ],
    questions: [
      { q: "In a Wireshark capture, how do you identify which DNS reply corresponds to which query?", a: "By the Transaction ID (16-bit field in the DNS header). Both the query and its corresponding reply carry the same Transaction ID. In the capture, query Packet 16 has ID 0x9f7d and response Packet 17 also has ID 0x9f7d — they are matched. If the IDs don't match, the reply is discarded by the client." },
      { q: "The DNS response in the capture has Authority RRs: 6 and Additional RRs: 11. What are these?", a: "Authority section (6 records): NS records identifying the authoritative name servers for ietf.org (e.g., ns1.yyz1.afilias-nst.info, ns0.ietf.org). These tell you which servers are the definitive source for ietf.org records. Additional section (11 records): Pre-fetched A/AAAA records providing the IP addresses of those NS servers from the Authority section. This is a helpful optimization — without it, you'd need to make extra DNS queries just to resolve the NS server names." },
    ],
  },

  // ─── GROUP 3: Video Streaming & CDNs ─────────────────────────────────────

  "video-streaming": {
    title: "Video Streaming & DASH", emoji: "📺",
    tldr: "Video = sequence of images (frames). CBR = fixed bitrate; VBR = variable. DASH: client fetches chunks from server, measures bandwidth, selects quality per chunk dynamically. Manifest file lists all versions.",
    explanation: `Internet Video Basics:

Video is a sequence of images (frames) displayed at a fixed rate (e.g., 24 fps). Each image is an array of pixels — each pixel encoded with bits.

Encoding types:
- CBR (Constant Bit Rate): encoding bitrate is fixed throughout the video. Simpler to deliver but wasteful for low-motion scenes.
- VBR (Variable Bit Rate): encoding bitrate varies with scene complexity. More efficient — complex scenes get more bits, static scenes fewer. Most modern streaming uses VBR.

Bandwidth requirements: video needs sustained, consistent bandwidth. A 1080p video might need 5-10 Mbps. 4K may need 15-25 Mbps.

HTTP Streaming (the naive approach):
- Video stored as a single file on an HTTP server
- Client requests the file with a GET
- Client buffers as it plays
- Problem: ALL clients get the SAME encoding/bitrate regardless of their bandwidth or screen size. A mobile user on 2G gets the same 1080p stream as a fiber user — wasteful or impossible.

DASH — Dynamic Adaptive Streaming over HTTP:

DASH solves the one-size-fits-all problem.

How DASH Works:
1. The video is encoded at MULTIPLE quality levels (bitrates): e.g., 240p, 480p, 720p, 1080p, 4K
2. Each quality version is divided into small chunks (typically 2-10 seconds each)
3. A MANIFEST FILE (MPD) on the server lists all available versions, their URLs, and bitrates
4. The CLIENT:
   a. First fetches the manifest file to learn available qualities
   b. Before each chunk, measures its available bandwidth to the server
   c. Selects which quality chunk to request based on current bandwidth
   d. If bandwidth drops → requests lower quality chunk next time
   e. If bandwidth improves → requests higher quality chunk next time

Client is in control — the server just serves whatever the client requests.

Key DASH principle: "client intelligence, server simplicity"

HTTP Basic Streaming vs DASH:

Feature              | HTTP Streaming    | DASH
---------------------|-------------------|--------------------------
Quality control      | Server decides    | Client decides
Encodings served     | One (same for all)| Multiple (client picks)
Adaptation           | None              | Per-chunk adaptation
URLs per video       | One URL           | One URL per chunk per quality
Who sees bandwidth?  | Neither side acts | Client measures and adapts`,
    keyPoints: [
      "Video = sequence of frames at fixed fps. Each frame = array of pixels.",
      "CBR = constant bitrate throughout. VBR = bitrate varies by scene complexity.",
      "HTTP streaming: one encoding, all clients get same quality — wasteful",
      "DASH = Dynamic Adaptive Streaming over HTTP — client-controlled quality adaptation",
      "Multiple encodings stored on server (240p, 480p, 720p, 1080p, 4K)",
      "Each encoding divided into small chunks (2-10 seconds each)",
      "Manifest file (MPD): lists all available qualities, their chunk URLs, and bitrates",
      "Client fetches manifest → measures bandwidth → picks best quality chunk → repeat",
      "DASH adapts per chunk — quality can change every few seconds",
      "DASH motto: client intelligence, dumb server",
    ],
    formula: {
      code: `Video Encoding vs Quality:

  Quality   Bitrate (approx)    Usage
  ──────────────────────────────────────────────
  240p      0.3 Mbps            Very slow mobile
  480p      1.5 Mbps            Standard mobile
  720p      3.0 Mbps            WiFi/broadband
  1080p     8.0 Mbps            Fast broadband
  4K        25.0 Mbps           Fiber

DASH Architecture:

  [Origin Server]
     ├── video_240p/ chunk1.mp4, chunk2.mp4, ...
     ├── video_480p/ chunk1.mp4, chunk2.mp4, ...
     ├── video_720p/ chunk1.mp4, chunk2.mp4, ...
     ├── video_1080p/ chunk1.mp4, chunk2.mp4, ...
     └── manifest.mpd   ← lists all versions + URLs

DASH Client Algorithm:
  1. Fetch manifest.mpd → know available qualities
  2. while video playing:
       measure bandwidth B (e.g., by timing last chunk download)
       if B > 1080p threshold → request 1080p chunk
       elif B > 720p threshold → request 720p chunk
       elif B > 480p threshold → request 480p chunk
       else request 240p chunk
       fetch next chunk at selected quality
       update playback buffer

HTTP Streaming vs DASH:
  HTTP: GET /movie.mp4 → server sends ONE file, ONE quality, no adaptation
  DASH: GET /manifest.mpd → client chooses quality per 2-second chunk`,
      explanation: "DASH puts the adaptation logic on the CLIENT. The server is just a file server. This is why YouTube can show the quality options (360p, 720p, 1080p) in real-time — each is a separately encoded set of chunks.",
    },
    examTips: [
      "DASH = client selects quality. HTTP streaming = fixed quality for all clients.",
      "Manifest file = the directory of all available encodings and their chunk URLs — client fetches this first",
      "DASH adapts PER CHUNK — quality can change every few seconds based on bandwidth",
      "CBR vs VBR: CBR = fixed bitrate throughout; VBR = varies with content complexity",
      "DASH uses standard HTTP — works through existing web proxies and CDNs",
      "Key exam point: WHO controls quality? DASH → CLIENT. HTTP streaming → server/provider.",
    ],
    questions: [
      { q: "How does DASH enable a client to adapt video quality based on network conditions?", a: "DASH works as follows: (1) The server stores the video encoded at multiple bitrates (e.g., 240p at 0.3 Mbps, 720p at 3 Mbps, 1080p at 8 Mbps), each divided into small chunks of 2-10 seconds. (2) A manifest file (MPD) on the server lists all available quality levels, their bitrates, and the URL for each chunk at each quality. (3) The client first fetches the manifest file. (4) Before requesting each chunk, the client measures its current available bandwidth (e.g., by timing how fast the previous chunk downloaded). (5) The client selects the highest quality whose bitrate fits within the measured bandwidth, and requests that specific chunk. (6) If bandwidth drops next measurement, the client steps down to a lower quality; if bandwidth improves, it steps up. This happens seamlessly per chunk — viewers see smooth quality changes rather than buffering." },
    ],
  },

  "cdn": {
    title: "Content Distribution Networks (CDNs)", emoji: "🌍",
    tldr: "CDNs distribute content close to users. Two strategies: Enter Deep (Akamai, thousands of ISP-level nodes) vs Bring Home (Limelight, fewer large IXP clusters). DNS redirects users to nearest CDN node.",
    explanation: `Why CDNs Exist:

When millions of users request the same Netflix movie simultaneously, having a single origin server would:
- Be overwhelmed by traffic (single server can't serve millions)
- Create high latency for users far from the server
- Create bottlenecks on the network paths to the server

CDNs (Content Distribution Networks) solve this by storing copies of content on servers distributed geographically close to users.

CDN Benefits:
- Reduced latency: user fetches content from nearby CDN node, not distant origin
- Reduced origin server load: CDN handles most requests; origin only handles misses
- Reduced access link congestion: content fetched from local/regional CDN, not across intercontinental links

The Two CDN Placement Philosophies:

1. ENTER DEEP (Akamai strategy):
- Deploy thousands of small CDN servers DEEP inside access ISPs worldwide
- Servers are placed in cable companies, cellular networks, regional ISPs
- Thousands of locations globally
- Goal: be as close to end users as possible (within 1-2 hops)
- Pro: very low latency. Con: many small servers to manage.

2. BRING HOME (Limelight/Netflix strategy):
- Deploy fewer large clusters at Internet Exchange Points (IXPs)
- IXPs are locations where many ISPs connect — hub of the internet
- Dozens of large locations globally (vs thousands for Enter Deep)
- Goal: bring content to the "doorstep" of ISPs (not inside them)
- Pro: fewer servers to manage. Con: slightly higher latency than Enter Deep.

How CDN Redirection Works (DNS-based):
1. User types www.netflix.com
2. DNS resolution: netflix.com DNS server intercepts and returns CNAME pointing to CDN
   e.g., www.netflix.com → a4376.netflixcdnserver.com
3. CDN's DNS responds with IP of the NEAREST CDN server
4. User connects to that nearby CDN server
5. Cache HIT: CDN serves content directly
6. Cache MISS: CDN fetches from Netflix origin, caches, serves to user

The magic is in step 3: CDN's DNS uses the client's IP to determine geographic proximity and returns the IP of the closest CDN node.`,
    keyPoints: [
      "CDN = geographically distributed servers storing copies of popular content",
      "CDN reduces: user latency, origin server load, access link congestion",
      "Enter Deep (Akamai): thousands of servers inside access ISPs — very close to users",
      "Bring Home (Limelight/Netflix): fewer large clusters at IXPs — at ISP doorstep",
      "DNS-based redirection: CDN DNS returns IP of NEAREST CDN server to user",
      "Cache HIT: CDN serves from local copy (fast). Cache MISS: CDN fetches from origin (slow).",
      "IXP = Internet Exchange Point — where many ISPs interconnect",
      "Netflix uses AWS CloudFront + Open Connect (their own CDN) for Bring Home strategy",
      "Akamai is the largest CDN with Enter Deep strategy — inside ISP networks globally",
    ],
    formula: {
      code: `CDN Architecture:

Enter Deep (Akamai):
  [Origin Server]
       ↓ (content pushed to CDN)
  [ISP A] → Akamai server      ← inside ISP access network
  [ISP B] → Akamai server
  [ISP C] → Akamai server
  ...thousands of locations globally

Bring Home (Netflix Open Connect):
  [Origin Server]
       ↓
  [IXP East]  ←→  ISP A, ISP B, ISP C  (IXP = interconnection hub)
  [IXP West]  ←→  ISP D, ISP E, ISP F
  ~dozens of large clusters

CDN DNS Redirection Flow:
  User: "www.netflix.com"
    1. → Local DNS → netflix.com authoritative DNS
    2. Netflix DNS → "CNAME: a4376.netflixcdnserver.com"
    3. → CDN DNS server
    4. CDN DNS sees user's IP → picks nearest CDN node
    5. → IP of nearest CDN server (e.g., 203.17.8.4)
    6. User → CDN server at 203.17.8.4
    7a. Cache HIT: CDN serves video directly ← fast path
    7b. Cache MISS: CDN fetches from Netflix origin → caches → serves

CDN Economics:
  Without CDN: user ← transoceanic link ← origin server (slow, expensive)
  With CDN:    user ← local CDN ← origin (fast, cheap for the user's ISP)`,
      explanation: "The DNS trick is elegant: the CDN's authoritative DNS server sees WHERE the query comes from (the local DNS server's IP is a rough geographic indicator) and returns the IP of the nearest CDN PoP (Point of Presence). No app changes needed.",
    },
    examTips: [
      "Two strategies: Enter Deep = inside ISPs (Akamai). Bring Home = at IXPs (Limelight, Netflix).",
      "CDN redirection uses DNS — CNAME in response points client to CDN's DNS, then gets nearest CDN IP",
      "IXP = Internet Exchange Point — CDN clusters placed HERE in Bring Home strategy",
      "Cache HIT = CDN serves locally. Cache MISS = CDN fetches from origin, then caches.",
      "CDN reduces BOTH latency (nearby) AND origin server load (fewer requests reach origin)",
      "Akamai = Enter Deep. Limelight, Netflix Open Connect = Bring Home. Know these examples.",
    ],
    questions: [
      { q: "Compare the 'Enter Deep' and 'Bring Home' CDN strategies. When would each be preferred?", a: "Enter Deep (Akamai): Deploys thousands of small servers INSIDE access ISPs worldwide — in cable companies, cellular networks, regional ISPs. Content is within 1-2 hops of end users. Provides very low latency. Con: many servers to manage, harder to maintain. Bring Home (Limelight/Netflix): Deploys fewer large clusters at Internet Exchange Points (IXPs) — where many ISPs interconnect. Content is at the doorstep of ISPs, not inside them. Fewer locations to manage. Con: slightly higher latency than Enter Deep. Enter Deep is preferred when latency is the top priority and management scale is acceptable. Bring Home is preferred when operational simplicity matters and IXP proximity is sufficient for performance." },
    ],
  },

  // ─── GROUP 4: P2P ─────────────────────────────────────────────────────────

  "p2p-architecture": {
    title: "P2P Architecture & File Distribution", emoji: "🔄",
    tldr: "P2P = no always-on server; peers talk directly. Self-scalable: each new peer adds capacity AND demand. P2P distribution time grows much slower than client-server.",
    explanation: `In a client-server architecture, a fixed server always serves clients — it bears all the load. In Peer-to-Peer (P2P), there is no always-on server — end systems (peers) communicate directly with each other.

P2P Key Properties:
- No always-on server
- Arbitrary end systems communicate directly
- Peers request service from other peers AND provide service to other peers
- Self-scalability: each new peer brings new service capacity AND new demand
- Peers are intermittently connected and change IP addresses → complex management
- Examples: BitTorrent (file sharing), Spotify (streaming), Skype (VoIP)

File Distribution: Client-Server vs P2P

Setup: Distribute a file of size F from 1 server to N peers. Server upload rate = us. Each peer i has upload rate ui and download rate di.

Client-Server Distribution Time:
- Server must send N copies sequentially: takes NF/us
- Each client must download: slowest takes F/dmin
D(c-s) ≥ max{ NF/us, F/dmin }
→ Increases LINEARLY with N (double the clients = double the time)

P2P Distribution Time:
- Server sends at least one copy: F/us
- Slowest client downloads: F/dmin
- Total bits needed: NF bits; total upload capacity = us + Σui
D(P2P) ≥ max{ F/us, F/dmin, NF/(us + Σui) }
→ NF in numerator grows with N BUT (us + Σui) in denominator ALSO grows with N (each new peer adds upload capacity)
→ P2P scales much better — the curve flattens out!

This is the fundamental advantage of P2P: self-scalability.`,
    keyPoints: [
      "P2P: no always-on server; peers directly communicate",
      "Self-scalability: each new peer brings capacity AND demand — net effect positive",
      "Examples: BitTorrent, Spotify, Skype",
      "Peers intermittently connected; change IPs → management complexity",
      "Client-server: D(c-s) ≥ max{NF/us, F/dmin} — grows linearly with N",
      "P2P: D(P2P) ≥ max{F/us, F/dmin, NF/(us + Σui)} — flattens with N",
      "P2P denominator (us + Σui) grows with N — more peers = more total bandwidth",
      "At large N, P2P time approaches constant; client-server grows forever",
      "dmin = minimum download rate among all peers (bottleneck client)",
    ],
    formula: {
      code: `File Distribution Time Formulas:

Client-Server:
  D(c-s) ≥ max{ NF/us,  F/dmin }
                ↑          ↑
          server must    slowest client
          send N copies  download time
  → GROWS LINEARLY with N

P2P:
  D(P2P) ≥ max{ F/us,  F/dmin,  NF/(us + Σui) }
              ↑         ↑           ↑
         1 copy     slowest    total bits / total
         from       client     upload bandwidth
         server
  → FLATTENS as N increases
    (denominator us + Σui grows with N)

Numeric Example:
  F = 1 Gbit, us = 10 Mbps, u(each peer) = 1 Mbps
  dmin = 100 Mbps (not the bottleneck)

  N=10: c-s = max{10G/10M, ...} = 1000s
         P2P = max{100s, ..., 10G/(10M+10M)} = 500s

  N=100: c-s = max{100G/10M, ...} = 10000s
          P2P = max{100s, ..., 100G/(10M+100M)} = ~909s

  N=1000: c-s keeps growing
           P2P ≈ constant (barely increases)`,
      explanation: "P2P wins at scale because total upload capacity grows with N. Client-server bottleneck is always at the server (fixed us). Memorize both formulas for exam.",
    },
    examTips: [
      "Client-server time has NF/us — factor of N means it scales LINEARLY with peers",
      "P2P formula has NF/(us + Σui) — as N grows, both numerator and denominator grow → time flattens",
      "dmin = minimum client download rate = bottleneck download; F/dmin is in BOTH formulas",
      "Self-scalability = each new peer ADDS TO total upload capacity, not just demand",
      "us = SERVER upload rate. ui = individual PEER i upload rate. These are different.",
    ],
    questions: [
      { q: "Derive why P2P scales better than client-server for large N.", a: "Client-server: D(c-s) ≥ NF/us. Server must upload N copies, and it has fixed upload capacity us. As N doubles, time doubles — linear growth. P2P: D(P2P) ≥ NF/(us + Σui). The numerator NF grows linearly with N. But the denominator also grows linearly — each new peer i adds its upload capacity ui. For large N: Σui ≈ N·u(average), so D(P2P) ≈ NF/(N·u) = F/u — constant! P2P approaches a constant as N grows, while client-server grows without bound." },
      { q: "In a P2P system with 100 peers, server upload us = 2 Mbps, each peer upload u = 0.5 Mbps, file F = 100 Mb, dmin = 1 Mbps. Calculate the minimum distribution time.", a: "D(P2P) ≥ max{ F/us, F/dmin, NF/(us + Σui) }. F/us = 100/2 = 50 seconds. F/dmin = 100/1 = 100 seconds. NF/(us+Σui) = (100×100)/(2 + 100×0.5) = 10000/52 ≈ 192 seconds. D(P2P) ≥ max{50, 100, 192} = 192 seconds." },
    ],
  },

  "p2p-bittorrent": {
    title: "BitTorrent Protocol", emoji: "🧩",
    tldr: "File split into 256KB chunks. Tracker tracks peers. Request rarest-first. Send tit-for-tat: give chunks to top 4 who give you most. Optimistic unchoke: random peer every 30s.",
    explanation: `BitTorrent is the most popular P2P file-sharing protocol.

Key Concepts:
- File is divided into 256 KB chunks
- A torrent = the group of peers exchanging chunks of a file
- A tracker server = tracks which peers are currently participating in the torrent (not the file itself)

Joining a Torrent:
1. New peer Alice contacts the tracker → gets a list of current peers
2. Alice connects to a subset of peers ("neighbors")
3. Initially has no chunks — accumulates them over time from neighbors
4. While downloading, Alice also uploads chunks to others (give-and-take)
5. Once Alice has the entire file, she can: selfishly leave OR altruistically remain and seed

Requesting Chunks — "Rarest First":
- At any time, different peers have different subsets of chunks
- Alice periodically asks each neighbor: "what chunks do you have?"
- Alice requests the RAREST chunk first (the chunk fewest peers have)
- Why? Ensures rare chunks spread quickly through the torrent; prevents bottleneck

Sending Chunks — Tit-for-Tat:
- Alice sends chunks to the top 4 peers who are currently sending her chunks at the highest rate
- Other peers are "choked" (receive nothing from Alice)
- Alice re-evaluates her top 4 every 10 seconds
- Every 30 seconds: Alice "optimistically unchokes" one randomly chosen peer — sends it free chunks

Tit-for-Tat Incentive Logic:
1. Alice optimistically unchokes Bob (free chunks for Bob)
2. Bob sees good upload rate from Alice → starts uploading to Alice → Alice reciprocates
3. Bob becomes one of Alice's top 4; Alice becomes one of Bob's top 4
Result: Higher upload rate → better trading partners → get file faster!`,
    keyPoints: [
      "BitTorrent: file divided into 256 KB chunks",
      "Torrent = group of peers exchanging a file's chunks",
      "Tracker = server tracking participating peers (NOT the file)",
      "New peer: register with tracker → get peer list → connect to neighbors",
      "Initially has no chunks; accumulates over time while also uploading",
      "Request strategy: rarest first — request chunk fewest others have",
      "Send strategy: tit-for-tat — upload to top 4 who upload most to you",
      "Choked = peer that doesn't make your top 4 gets nothing from you",
      "Optimistic unchoke = randomly give one peer free chunks every 30 seconds",
      "Tit-for-tat ensures: those who contribute get rewarded; free-riders get nothing",
    ],
    formula: {
      code: `BitTorrent Flow:

Alice joins torrent:
  Alice → tracker: "I want to join"
  Tracker → Alice: [list of 50 current peers]
  Alice → 10 neighbors: TCP connection

Requesting (Rarest First):
  Alice asks all neighbors: "what chunks do you have?"
  Alice builds a map: chunk_id → how_many_peers_have_it
  Alice requests chunk with LOWEST count first

Sending (Tit-for-Tat):
  Every 10 seconds:
    Measure upload rate FROM each neighbor to Alice
    Top 4 uploaders → Alice sends them chunks (UNCHOKED)
    Everyone else   → Alice sends nothing (CHOKED)

  Every 30 seconds:
    Pick 1 RANDOM peer → OPTIMISTICALLY UNCHOKE it

Tit-for-tat outcome:
  High uploader → in Alice's top 4 → gets chunks → reciprocates
  Low uploader  → choked → gets nothing → forced to give more

Peer life cycle in a torrent:
  Join → Get peer list → Download chunks (rarest first)
       → Upload to top 4 (tit-for-tat)
       → Complete file → Leave (selfish) OR Stay (altruistic/seed)`,
      explanation: "Rarest first = prevents chunk monopolies. Tit-for-tat = economic incentive to upload. Optimistic unchoke = lets newcomers bootstrap into the system.",
    },
    examTips: [
      "Chunk size = 256 KB — specific value may be asked",
      "Tracker tracks PEERS, not the file — it's just a directory service",
      "Rarest first solves the 'last chunk' problem — ensures no chunk disappears",
      "Tit-for-tat: top 4 unchoked + 1 random optimistically unchoked every 30 secs",
      "Re-evaluate top 4 every 10 seconds. Optimistic unchoke every 30 seconds.",
    ],
    questions: [
      { q: "Explain the tit-for-tat mechanism including optimistic unchoking.", a: "Tit-for-tat: Alice sends chunks to the top 4 peers who are currently uploading to her at the highest rate (re-evaluated every 10 seconds). All other peers are 'choked' — they receive nothing. This incentivizes peers to upload generously: those who contribute get chunks in return. Optimistic unchoking: every 30 seconds, Alice randomly selects ONE additional peer (not in her top 4) and sends it chunks for free. This allows new/unknown peers to prove their upload quality and potentially join the top 4, preventing stagnation." },
    ],
  },

  // ─── GROUP 5: Socket Programming ─────────────────────────────────────────

  "socket-intro": {
    title: "Socket Programming — Introduction", emoji: "🔌",
    tldr: "Socket = door between your app and the transport layer. Two types: SOCK_DGRAM (UDP) and SOCK_STREAM (TCP). Goal: build client-server apps that communicate over sockets.",
    explanation: `Goal of socket programming: learn how to build client/server applications that communicate using sockets.

What is a Socket?
A socket is the interface (like a door or API) between your application process and the end-to-end transport protocol. Your application writes data to the socket; the OS handles actually sending it over the network.

Socket ownership:
- The socket interface is controlled by the APP DEVELOPER
- The transport layer and below (TCP/UDP, IP, link layer) is controlled by the OS

Two Types of Sockets:

1. UDP Socket (SOCK_DGRAM):
- Unreliable datagram service
- No connection established before sending
- Sender must attach destination IP and port to each packet
- Packets may be lost or arrive out of order
- Think of it like sending postcards — each one goes independently

2. TCP Socket (SOCK_STREAM):
- Reliable, byte-stream service
- Must establish connection before sending (3-way handshake)
- Once connected, data flows as a continuous stream in order
- Think of it like a phone call — must dial first, then talk

Application Example (used in both UDP and TCP versions):
1. Client reads a line of text from keyboard
2. Sends it to server
3. Server receives the text and converts to UPPERCASE
4. Server sends modified data back to client
5. Client receives and displays the uppercase result

Python socket function: socket(AF_INET, SOCK_DGRAM) or socket(AF_INET, SOCK_STREAM)
- AF_INET = IPv4 addressing family
- SOCK_DGRAM = UDP
- SOCK_STREAM = TCP`,
    keyPoints: [
      "Socket = door/interface between application and transport layer",
      "App developer controls the socket; OS controls transport/network/link",
      "Two socket types: SOCK_DGRAM (UDP) and SOCK_STREAM (TCP)",
      "UDP: unreliable, no connection, each packet needs destination address",
      "TCP: reliable, connection-oriented, byte-stream",
      "AF_INET = IPv4 address family (use for most Internet apps)",
      "socket(AF_INET, SOCK_DGRAM) creates a UDP socket",
      "socket(AF_INET, SOCK_STREAM) creates a TCP socket",
    ],
    formula: {
      code: `Socket Abstraction:

  Application Process
        |
      SOCKET ← app developer controls this boundary
        |
  Transport (TCP or UDP)  ← OS controls
        |
  Network (IP)
        |
  Link + Physical

Python socket creation:
  from socket import *

  # UDP socket
  s = socket(AF_INET, SOCK_DGRAM)

  # TCP socket
  s = socket(AF_INET, SOCK_STREAM)

Parameters:
  AF_INET      = IPv4 (use this always for IPv4)
  AF_INET6     = IPv6
  SOCK_DGRAM   = UDP (datagrams)
  SOCK_STREAM  = TCP (byte stream)

Port number ranges:
  0    – 1023  : Well-known/reserved (HTTP=80, DNS=53, SSH=22)
  1024 – 49151 : Registered ports
  49152– 65535 : Dynamic/ephemeral (used for client-side sockets)`,
      explanation: "The socket API is the same across languages. AF_INET + SOCK_DGRAM = UDP. AF_INET + SOCK_STREAM = TCP. The OS manages everything below the socket — the developer only calls send/receive.",
    },
    examTips: [
      "Socket = interface between APP LAYER and TRANSPORT LAYER — draw this in diagrams",
      "AF_INET = address family for IPv4. Always use this for IPv4 internet apps.",
      "SOCK_DGRAM = datagram = UDP. SOCK_STREAM = stream = TCP. Memorize both.",
      "App developer controls ABOVE the socket. OS controls BELOW the socket.",
    ],
    questions: [
      { q: "What is a socket and what does it separate?", a: "A socket is the interface between the application process and the transport layer — it is the 'door' through which the application sends and receives data. It separates the app developer's control (above the socket: what data to send, when) from the OS's control (below the socket: TCP/UDP, IP, physical delivery). The developer calls socket API functions (send, recv); the OS handles the actual network communication." },
    ],
  },

  "socket-udp": {
    title: "Socket Programming: UDP Client & Server", emoji: "📤",
    tldr: "UDP: no connection, no handshake. sendto() attaches dest IP+port each time. recvfrom() returns data AND sender address. One server socket handles ALL clients.",
    explanation: `UDP Socket Programming — Key Points:

1. No connection setup: Unlike TCP, UDP requires NO handshake. You can start sending immediately after creating the socket.

2. Explicit addressing: Every sendto() call must explicitly include the destination IP address and port number.

3. recvfrom() returns address: When receiving, recvfrom() gives you both the data AND the sender's IP + port. This is how the server knows who to reply to.

4. One server socket for all clients: The UDP server uses a SINGLE socket for ALL clients.

5. Data may be lost or reordered: Application must handle this if reliability matters.

Client flow:
1. Create UDP socket: socket(AF_INET, SOCK_DGRAM)
2. Get user input
3. Send to server: sendto(message, (serverName, serverPort))
4. Wait for reply: recvfrom(2048) → returns (data, serverAddress)
5. Print result, close socket

Server flow:
1. Create UDP socket: socket(AF_INET, SOCK_DGRAM)
2. Bind to a port: bind(('', serverPort))
3. Loop forever:
   - Receive: recvfrom(2048) → returns (message, clientAddress)
   - Process (convert to uppercase)
   - Reply: sendto(modifiedMessage, clientAddress)

Note: The server MUST bind to a port so clients know where to send. Clients don't need to bind — the OS assigns them a temporary (ephemeral) port automatically.`,
    keyPoints: [
      "UDP: no connection, no handshake — send immediately after socket creation",
      "sendto(data, (destIP, destPort)) — must specify destination EVERY time",
      "recvfrom(bufsize) — returns (data, (senderIP, senderPort)) — both needed",
      "Server uses bind() to assign a known port — clients send to this port",
      "Clients don't need to bind — OS assigns ephemeral port automatically",
      "One server socket handles ALL UDP clients (no accept, no new socket per client)",
      "Server loops forever with while True — processes one client request at a time",
      "Data may be lost — application layer must handle reliability if needed",
    ],
    formula: {
      code: `UDP Client (Python):
─────────────────────────────────────────────
from socket import *
serverName = 'hostname'
serverPort = 12000

clientSocket = socket(AF_INET, SOCK_DGRAM)
message = raw_input('Input lowercase sentence:')
clientSocket.sendto(message.encode(), (serverName, serverPort))
modifiedMessage, serverAddress = clientSocket.recvfrom(2048)
print(modifiedMessage.decode())
clientSocket.close()

─────────────────────────────────────────────
UDP Server (Python):
─────────────────────────────────────────────
from socket import *
serverPort = 12000

serverSocket = socket(AF_INET, SOCK_DGRAM)
serverSocket.bind(('', serverPort))

print("The server is ready to receive")

while True:
    message, clientAddress = serverSocket.recvfrom(2048)
    modifiedMessage = message.decode().upper()
    serverSocket.sendto(modifiedMessage.encode(), clientAddress)
─────────────────────────────────────────────
  Client side              Server side
  ─────────────────────────────────────
  sendto(msg, (IP,port)) → recvfrom()
                         ← sendto(reply, clientAddress)
  recvfrom()`,
      explanation: "Key: UDP server recvfrom() gives back the clientAddress — this is how the server knows where to reply. The same serverSocket is reused for EVERY client — UDP is connectionless.",
    },
    examTips: [
      "UDP: sendto() needs destination EVERY time. TCP: send() does NOT (connection is established).",
      "recvfrom() returns a TUPLE: (data, address). Address = (IP, port) of sender.",
      "bind() is MANDATORY for server (so clients know where to send). Optional for client.",
      "Compare UDP server vs TCP server: UDP = 1 socket. TCP = 1 welcoming + N connection sockets.",
    ],
    questions: [
      { q: "Why does the UDP server use recvfrom() instead of recv(), and why does the server need clientAddress?", a: "recvfrom() returns both the data AND the sender's address (IP + port). The UDP server uses a single socket for all clients — it has no pre-established connection, so it doesn't know where each message came from. clientAddress returned by recvfrom() gives the sender's (IP, port). The server needs this to call sendto(reply, clientAddress) — to know WHERE to send the reply back. With TCP, the connection socket already knows the client's address, so recv() without address info is sufficient." },
    ],
  },

  "socket-tcp": {
    title: "Socket Programming: TCP Client & Server", emoji: "🔗",
    tldr: "TCP: connect() triggers 3-way handshake. Server has 2 sockets: welcoming (for new clients) and connection socket (per client). accept() blocks until client connects.",
    explanation: `TCP Socket Programming — Key Points:

Two Sockets on the Server Side:
1. Welcoming Socket (serverSocket): Created once at startup. Listens for incoming connection requests. Never used for actual data exchange.
2. Connection Socket (connectionSocket): Created fresh for EACH new client. All data transfer happens through this. Closed when the client disconnects.

Client flow:
1. Create TCP socket: socket(AF_INET, SOCK_STREAM)
2. connect() to server — triggers the TCP 3-WAY HANDSHAKE
3. Send data: send(message) — no need to specify address
4. Receive reply: recv(1024)
5. Close socket

Server flow:
1. Create welcoming socket: socket(AF_INET, SOCK_STREAM)
2. bind() to a known port
3. listen(1) — start listening for incoming requests
4. Loop forever:
   a. accept() — BLOCKS until a client connects; returns a new connectionSocket
   b. recv() from connectionSocket — read client's data
   c. send() reply on connectionSocket
   d. close(connectionSocket) — done with THIS client

Key differences from UDP:
- connect() explicitly triggers the TCP handshake
- send() in TCP doesn't need an address — connection remembers who we're talking to
- Each client gets its own connectionSocket — parallel handling possible`,
    keyPoints: [
      "TCP server has TWO socket types: welcoming socket + connection socket",
      "Welcoming socket = always-open, listens for new clients, never sends data",
      "Connection socket = created per client by accept(), used for all data exchange",
      "connect() on client side → triggers TCP 3-way handshake automatically",
      "accept() on server side BLOCKS until a client connects, then returns new socket",
      "send() in TCP: no destination needed — connection already established",
      "recv() in TCP: returns only data, not sender address (unlike UDP's recvfrom)",
      "close(connectionSocket) after each client; welcoming socket stays open",
    ],
    formula: {
      code: `TCP Client (Python):
──────────────────────────────────────────────
from socket import *
serverName = 'servername'
serverPort = 12000

clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverName, serverPort))  # triggers 3-way handshake

sentence = raw_input('Input lowercase sentence:')
clientSocket.send(sentence.encode())           # NO address needed
modifiedSentence = clientSocket.recv(1024)
print('From Server:', modifiedSentence.decode())
clientSocket.close()

──────────────────────────────────────────────
TCP Server (Python):
──────────────────────────────────────────────
from socket import *
serverPort = 12000

serverSocket = socket(AF_INET, SOCK_STREAM)    # welcoming socket
serverSocket.bind(('', serverPort))
serverSocket.listen(1)
print('The server is ready to receive')

while True:
    connectionSocket, addr = serverSocket.accept()   # BLOCKS until client connects
                                                      # returns NEW socket for this client
    sentence = connectionSocket.recv(1024).decode()
    capitalizedSentence = sentence.upper()
    connectionSocket.send(capitalizedSentence.encode())
    connectionSocket.close()   # close THIS client's socket
    # serverSocket stays open → next client

──────────────────────────────────────────────
  serverSocket (welcoming)    ← never closes
       ↑
  accept() → connectionSocket_1  (Client A)
  accept() → connectionSocket_2  (Client B)`,
      explanation: "The welcoming socket is like a receptionist: always available, just takes the initial call. The connection socket is like a private line opened just for that call.",
    },
    examTips: [
      "TCP server has 2 sockets: welcoming socket (serverSocket) + connection socket (connectionSocket)",
      "accept() returns a NEW socket object — this is the connection socket, not serverSocket",
      "close(connectionSocket) after each client — but NEVER close serverSocket in the loop",
      "connect() on client = 3-way handshake. This takes 1 RTT before any data flows.",
      "send() vs sendto(): TCP uses send() (no addr). UDP uses sendto() (needs addr).",
    ],
    questions: [
      { q: "A TCP server has two types of sockets. Name them and explain the role of each.", a: "1. Welcoming socket (serverSocket): Created once at startup. Bound to a known port. Used only to listen for and accept incoming connection requests. Never used to exchange application data. 2. Connection socket (connectionSocket): Created automatically by the OS when accept() returns for each new client. Identified by the 4-tuple (src IP, src port, dst IP, dst port). Used for all data exchange with that specific client. Closed after the client disconnects. The welcoming socket remains open to accept the next client." },
      { q: "A web server on Host C listens on port 80. Hosts A and B both maintain persistent HTTP connections to C. Are all requests handled through the same socket on the server? Do both connection sockets have port 80? (ESA July 2023, 7 marks)", a: "No, requests are NOT handled through the same socket. Each persistent connection has its own unique connection socket. When A connects, accept() creates connectionSocket_A with 4-tuple (A, portA, C, 80). When B connects, accept() creates connectionSocket_B with 4-tuple (B, portB, C, 80). These are two distinct sockets even though both use server port 80. Yes — both connection sockets have destination port 80 (server side), because that's the well-known port the web server listens on. But they are distinguished by the 4-tuple: different source IPs and source ports make each connection unique. The welcoming socket on port 80 remains open to accept further connections." },
    ],
  },

  // ─── GROUP 6: Email Protocols ─────────────────────────────────────────────

  "proto-smtp": {
    title: "SMTP — Simple Mail Transfer Protocol", emoji: "📧",
    tldr: "SMTP = email sending protocol, TCP port 25. Store-and-forward relay model. Push protocol. Separate protocols (POP3 port 110 / IMAP port 143) used for reading mail.",
    explanation: `SMTP (Simple Mail Transfer Protocol) is the internet standard for sending email over TCP.

Key Characteristics:
- Port 25 (TCP). Modern implementations also use port 587 (submission) and 465 (SSL)
- Connections secured with SSL (Secure Sockets Layer) or TLS
- Store-and-forward model: if the destination mail server is temporarily down, the message is queued and retried later
- Push protocol: sender pushes mail to receiver's mail server

How Email Works (Full Picture):
1. Alice composes email in her mail client (Outlook, Gmail web app)
2. Client connects to Alice's mail server (smtp.gmail.com) using SMTP
3. Alice's mail server stores the message and connects to Bob's mail server using SMTP
4. Bob's mail client retrieves email from his mail server using POP3 or IMAP

SMTP Phases:
1. Handshaking: EHLO (extended greeting)
2. Message transfer: MAIL FROM, RCPT TO, DATA, body, . (period on its own line = end)
3. Closure: QUIT

SMTP uses persistent connections: multiple messages can be sent in one connection.

SMTP vs HTTP:
- Both are ASCII command/response protocols
- HTTP: PULL (client requests data from server)
- SMTP: PUSH (sender pushes mail to receiver's server)
- SMTP: message body must be 7-bit ASCII (originally); HTTP has no such restriction
- SMTP uses MIME extensions for binary attachments, non-ASCII characters`,
    keyPoints: [
      "SMTP: email transmission protocol, TCP port 25",
      "SSL/TLS secures connections — modern SMTP uses port 587 (TLS) or 465 (SSL)",
      "Store-and-forward: message queued if recipient server temporarily down",
      "Push protocol: sender pushes to recipient's mail server",
      "Email full path: Alice's client → Alice's SMTP server → Bob's SMTP server → Bob's client",
      "Bob retrieves mail using POP3 (port 110) or IMAP (port 143) — NOT SMTP",
      "SMTP commands: EHLO, MAIL FROM, RCPT TO, DATA, QUIT",
      "Message body must be 7-bit ASCII; MIME handles attachments/non-ASCII",
      "Persistent connections: multiple emails in one SMTP session",
    ],
    formula: {
      code: `SMTP Message Flow:

  [Alice's Client] ──SMTP:25──> [Alice's Mail Server]
                                        │
                                   SMTP:25 (relay)
                                        │
                                        v
                                [Bob's Mail Server]
                                        │
                                   POP3/IMAP
                                        │
                                        v
                                 [Bob's Client]

SMTP Commands and Response Codes:
  S: 220 smtp.example.com ESMTP ready
  C: EHLO alice.example.com
  S: 250 Hello alice.example.com
  C: MAIL FROM: <alice@example.com>
  S: 250 OK
  C: RCPT TO: <bob@example.com>
  S: 250 OK
  C: DATA
  S: 354 Start input, end with <CRLF>.<CRLF>
  C: Subject: Test message
  C: Hello Bob!
  C: .                    ← single period = end of message
  S: 250 OK Message accepted
  C: QUIT
  S: 221 Bye

SMTP vs HTTP:
  Feature     SMTP          HTTP
  Port        25            80
  Direction   PUSH          PULL
  Content     ASCII body    Any (binary OK)
  Protocol    Text commands Text commands`,
      explanation: "SMTP is a push protocol — sender initiates transfer to receiver's server. POP3/IMAP are pull protocols — client pulls mail from its server. They're complementary, not competing.",
    },
    examTips: [
      "SMTP port = 25 (TCP). Don't confuse with IMAP (143) or POP3 (110).",
      "SMTP is PUSH. HTTP is PULL. Exam loves this comparison.",
      "Store-and-forward = message queued at SMTP server if destination server down",
      "End of SMTP message body = single period (.) on its own line",
      "MIME = Multipurpose Internet Mail Extensions — enables binary attachments over ASCII SMTP",
      "Alice's client → Alice's server (SMTP) → Bob's server (SMTP) → Bob's client (POP3/IMAP)",
    ],
    questions: [
      { q: "Describe the full path an email takes from Alice's browser to Bob's inbox.", a: "1. Alice composes email in her client (e.g., Gmail). 2. Her client sends the email to Alice's mail server (smtp.gmail.com) using SMTP on port 25/587. 3. Alice's mail server stores the message temporarily. It then opens an SMTP connection to Bob's mail server (say smtp.yahoo.com) and pushes the message. 4. Bob's mail server stores the message in Bob's mailbox. 5. When Bob opens his mail client, it retrieves the email from his mail server using POP3 (port 110, downloads and deletes) or IMAP (port 143, syncs and keeps on server)." },
    ],
  },

  "email-depth": {
    title: "Email Depth: IMAP, POP3 & Email Format", emoji: "📬",
    tldr: "POP3 (port 110): downloads and deletes — single device. IMAP (port 143): keeps on server, folder sync — multi-device. Email format: RFC 822 headers + MIME for attachments. Alice→SMTP→SMTP→IMAP→Bob.",
    explanation: `Mail Access Protocols — Comparing POP3 and IMAP:

Both POP3 and IMAP are used by the RECIPIENT's mail client to retrieve email from their mail server.

POP3 — Post Office Protocol version 3 (TCP port 110):
- Very simple protocol — 3 phases: authorization, transaction, update
- Authorization: USER <username>, PASS <password>
- Transaction: LIST (list messages), RETR <n> (download message n), DELE <n> (mark for delete)
- Update: changes take effect when QUIT is issued (deletions happen at QUIT)
- "Download and delete" mode: messages deleted from server after download
- "Download and keep" mode: can configure to keep on server (extension)
- STATELESS between sessions — server doesn't track what you've read across sessions
- Works well for single-device use (one machine downloads all mail)

IMAP — Internet Mail Access Protocol (TCP port 143):
- More complex and feature-rich than POP3
- All messages kept on the server — client only downloads what you open
- Folders are maintained ON THE SERVER — synchronized across all devices
- Stateful across sessions: server tracks which messages are read, flagged, etc.
- Client can search the server's mailbox without downloading all messages
- Works across multiple devices — read on phone, see same inbox on laptop
- Slower than POP3 for single device (server is always authoritative)

When to use each:
- POP3: single device, low bandwidth, want local backup
- IMAP: multiple devices, want server-side folders, synchronization important

Email Message Format (RFC 822):

Every email has two parts: HEADER and BODY, separated by a blank line.

Headers:
  From: alice@example.com
  To: bob@example.com
  Subject: Meeting tomorrow
  Date: Mon, 01 Jan 2024 10:00:00 +0530
  MIME-Version: 1.0
  Content-Type: text/plain; charset=utf-8

MIME — Multipurpose Internet Mail Extensions:
SMTP originally only allowed 7-bit ASCII text bodies. MIME extends this:
- MIME-Version: 1.0 — required in all MIME messages
- Content-Type: text/plain, text/html, image/jpeg, application/pdf, multipart/mixed
- Content-Transfer-Encoding: base64 (for binary), quoted-printable (for near-ASCII)
- multipart/mixed allows a message to contain both text AND attachments`,
    keyPoints: [
      "POP3: port 110, download-and-delete, stateless between sessions, single device",
      "IMAP: port 143, keeps messages on server, server-side folders, multi-device sync",
      "POP3 phases: authorization (USER/PASS), transaction (LIST/RETR/DELE), update (QUIT)",
      "IMAP: stateful — server tracks read/unread/flagged status across sessions",
      "IMAP allows searching server mailbox without downloading all messages",
      "Email = RFC 822 headers + blank line + body",
      "Required headers: From, To, Subject, Date",
      "MIME-Version: 1.0 — enables non-ASCII content and attachments",
      "Content-Type header: text/plain, text/html, image/jpeg, multipart/mixed (attachments)",
      "Content-Transfer-Encoding: base64 for binary (images, PDFs) over ASCII SMTP",
    ],
    formula: {
      code: `POP3 Session Example:
  C: USER bob
  S: +OK
  C: PASS secret
  S: +OK 2 messages (320 octets)
  C: LIST
  S: 1 120
  S: 2 200
  S: .
  C: RETR 1
  S: (message 1 content)
  S: .
  C: DELE 1
  S: +OK message 1 deleted
  C: QUIT
  S: +OK POP3 server signing off (deletions happen NOW)

IMAP vs POP3:
  Feature           POP3            IMAP
  ──────────────────────────────────────────────
  Port              110             143
  Messages on server  Deleted after   Always kept
  Folder management   No              Yes (server-side)
  Multi-device sync   No              Yes
  State tracking      None            Read/flagged/etc.
  Search on server    No              Yes
  Use case          Single device   Multi-device

Email Format (RFC 822 + MIME):
  From: alice@gmail.com
  To: bob@yahoo.com
  Subject: Project update
  Date: Fri, 15 Mar 2024 14:00:00 +0530
  MIME-Version: 1.0
  Content-Type: multipart/mixed; boundary="boundary42"

  --boundary42
  Content-Type: text/plain; charset=utf-8

  Hi Bob, please find the report attached.

  --boundary42
  Content-Type: application/pdf
  Content-Transfer-Encoding: base64
  Content-Disposition: attachment; filename="report.pdf"

  JVBERi0xLjUK...  (base64 encoded PDF)
  --boundary42--`,
      explanation: "IMAP is the modern standard for multi-device email (used by Gmail, Outlook 365). POP3 is simple and fast but doesn't support sync. MIME is why you can send a PDF — base64 encodes binary as ASCII text, which SMTP can carry.",
    },
    examTips: [
      "POP3 = port 110 = download and delete (typically). IMAP = port 143 = keep on server.",
      "IMAP is stateful between sessions. POP3 is stateless between sessions.",
      "IMAP supports SERVER-SIDE FOLDERS — synchronized across all your devices",
      "MIME-Version: 1.0 is REQUIRED in all MIME messages — not optional",
      "Content-Type: multipart/mixed = email with both text body AND attachments",
      "base64 encoding = binary file → ASCII characters → fits in SMTP (which requires ASCII)",
    ],
    questions: [
      { q: "Compare POP3 and IMAP for a user who reads email on both a smartphone and a laptop.", a: "IMAP is far better for multi-device use. With IMAP: all messages remain on the server. When you read an email on your phone, the server marks it as read. When you open the same inbox on your laptop, it shows the same read/unread status — synchronized. Folders created on one device appear on all devices. With POP3: messages are downloaded to the first device that fetches them (typically deleted from server). If you read email on your phone, the messages may not be available on your laptop at all. POP3 was designed for single-device use — it has no concept of synchronization. For multi-device use, IMAP (port 143) is the correct choice." },
    ],
  },

  // ─── GROUP 7: Other App Layer Protocols ──────────────────────────────────

  "proto-ftp": {
    title: "FTP — File Transfer Protocol", emoji: "📁",
    tldr: "FTP uses TWO TCP connections: port 21 for control commands and port 20 for actual data. Out-of-band control. Allows upload, download, rename, delete on remote server.",
    explanation: `FTP (File Transfer Protocol) is used to transfer files between a client and a remote server over TCP.

Key Characteristics:
- Used to exchange/manage large files on the internet
- Allows: upload, download, delete, rename, move, copy files on a remote server

Two Separate TCP Connections:
1. Control Connection (Port 21): For commands and responses. FTP commands like LIST, RETR (retrieve/download), STOR (store/upload). Stays open for the entire session.
2. Data Connection (Port 20): For actual file content. Opened for each file transfer, then closed.

This separation of control and data is called OUT-OF-BAND control. Compare to HTTP which sends commands and data on the same connection (IN-BAND).

How it works:
1. Client connects to server on port 21 → control connection established
2. User authenticates (username + password sent over control connection)
3. For each file transfer: server/client opens data connection on port 20
4. File data flows over data connection
5. Data connection closes after transfer; control connection stays open
6. User types "quit" → control connection closes

FTP is stateful: the server maintains user state (current directory, authentication) across the session.

Security: FTP sends username/password as PLAIN TEXT — not secure. Use SFTP (FTP over SSH) or FTPS (FTP over SSL) for secure transfers.`,
    keyPoints: [
      "FTP: File Transfer Protocol, uses TCP",
      "Control connection: Port 21 — for commands (LIST, RETR, STOR) — stays open",
      "Data connection: Port 20 — for file content — opened/closed per transfer",
      "Out-of-band control: commands and data on SEPARATE connections",
      "HTTP uses in-band control (commands and data on same connection)",
      "FTP is stateful: server remembers user's directory and login across session",
      "Authentication: username + password — sent as plain text (not secure!)",
      "Use SFTP or FTPS for secure file transfers",
    ],
    formula: {
      code: `FTP Architecture:

  [Client]
     │
     ├──── Port 21 ────> [Server: Control Connection]
     │                   Commands: USER, PASS, LIST, RETR, STOR, QUIT
     │
     └──── Port 20 <──> [Server: Data Connection]
                        (opened for each file transfer, then closed)

Flow:
  Client → Server (port 21): USER santosh
  Server → Client: 331 Password required
  Client → Server: PASS mypassword
  Server → Client: 230 Logged in
  Client → Server: RETR file.txt
  Server → Client: (opens port 20) → sends file.txt → closes port 20
  Client → Server: QUIT
  Server → Client: 221 Goodbye (closes port 21)

vs HTTP:
  FTP:  command on port 21, data on port 20 (OUT-OF-BAND)
  HTTP: "GET /index.html" AND the HTML data both on port 80 (IN-BAND)`,
      explanation: "Out-of-band means control info travels on a SEPARATE channel from data. FTP can issue commands WHILE a transfer is happening. In-band (HTTP) means everything on one connection.",
    },
    examTips: [
      "Port 20 = FTP data. Port 21 = FTP control. Both are TCP. Don't swap them.",
      "Out-of-band control = control and data on SEPARATE connections. HTTP is in-band.",
      "FTP is STATEFUL — server remembers login and current directory",
      "FTP sends password in plain text — security weakness. SFTP/FTPS are secure alternatives.",
      "Data connection is opened PER TRANSFER and CLOSED after — control stays open",
    ],
    questions: [
      { q: "What are the two TCP connections FTP uses and what is each used for?", a: "1. Control connection (port 21): Used for FTP commands and replies (USER, PASS, LIST, RETR, STOR, QUIT). Opened when the session starts and stays open for the entire session. 2. Data connection (port 20): Used for actual file content transfer. Opened fresh for each file transfer (download or upload) and closed immediately after. This separation is called out-of-band control — commands and data flow on separate connections." },
    ],
  },

  "proto-snmp-dhcp": {
    title: "SNMP & DHCP", emoji: "⚙️",
    tldr: "SNMP: network management protocol — manager queries agents on devices via MIB. DHCP: auto-assigns IP addresses via DORA (Discover-Offer-Request-ACK) on UDP ports 67/68.",
    explanation: `SNMP — Simple Network Management Protocol:

Used by network administrators to monitor and manage network devices (routers, switches, printers, servers). Ports 161 (queries) and 162 (traps).

Key Components:
1. SNMP Manager: The admin's management station — sends queries and receives reports
2. Managed Devices: The routers, switches, hosts being monitored
3. SNMP Agent: Software running ON each managed device — answers manager queries
4. MIB (Management Information Base): A structured database on each device. Contains variables describing the device's state — interface statistics, CPU usage, routing table, error counts, etc.

How it works:
- Manager sends GET to agent → agent returns MIB variable value
- Manager sends SET to agent → agent changes a configuration value
- Agent sends TRAP to manager → agent spontaneously notifies manager of an event (link down, threshold exceeded)

DHCP — Dynamic Host Configuration Protocol:

Automatically assigns IP addresses to computers joining a network. Uses UDP — ports 67 (server) and 68 (client).

DORA Process (4 messages):
1. DISCOVER: Client broadcasts "Is there a DHCP server? I need an IP!" (src: 0.0.0.0, dst: 255.255.255.255)
2. OFFER: DHCP server responds "I can offer you 192.168.1.10 for 24 hours"
3. REQUEST: Client broadcasts "I want to use 192.168.1.10 from that server"
4. ACK: Server confirms "OK, 192.168.1.10 is yours for 24 hours"

What DHCP provides (beyond just IP):
- IP address (and subnet mask)
- Default gateway address
- DNS server address
- IP lease duration (TTL for the address)`,
    keyPoints: [
      "SNMP: network management, ports 161/162 (TCP/UDP)",
      "SNMP Manager: admin station. Agent: runs on managed device. MIB: device's data.",
      "MIB = Management Information Base — structured database of network variables on each device",
      "SNMP operations: GET (read MIB), SET (change config), TRAP (agent notifies manager)",
      "DHCP: automatic IP assignment, uses UDP ports 67 (server) and 68 (client)",
      "DORA: Discover → Offer → Request → ACK (4 messages)",
      "DISCOVER and REQUEST are broadcast (dst=255.255.255.255)",
      "DHCP also provides: subnet mask, default gateway, DNS server address",
      "DHCP lease: IP is temporary — must be renewed or it expires",
    ],
    formula: {
      code: `SNMP Architecture:
  [SNMP Manager]
       │
  GET / SET / TRAP
       │
  ┌────┴────┐
  [Agent]  [Agent]  [Agent]
  [Router] [Switch] [Server]

DHCP — DORA Process:
  Client              DHCP Server
     │                    │
     │── DISCOVER ───────>│  "Anyone there? Need an IP!"
     │   src: 0.0.0.0     │  (broadcast: 255.255.255.255)
     │                    │
     │<── OFFER ──────────│  "You can have 192.168.1.10 for 24h"
     │                    │
     │── REQUEST ────────>│  "I'll take 192.168.1.10, please"
     │                    │
     │<── ACK ────────────│  "Confirmed! 192.168.1.10 is yours"
     │                    │  + subnet mask + default gateway + DNS`,
      explanation: "DORA is broadcast-based so the client doesn't need an IP to find the server. The lease system ensures IPs are recycled when devices leave the network.",
    },
    examTips: [
      "SNMP ports: 161 for queries/responses, 162 for TRAP messages",
      "MIB = Management Information Base — the database of device state",
      "DHCP uses UDP because the client has no IP yet and can't do TCP handshake!",
      "DORA = Discover, Offer, Request, ACK — memorize the full expansion",
      "First two DHCP messages (DISCOVER, REQUEST) are BROADCASTS — client has no IP yet",
      "DHCP provides MORE than just IP: subnet mask + gateway + DNS server",
    ],
    questions: [
      { q: "Why does DHCP use UDP instead of TCP?", a: "When a client first joins a network, it has no IP address. TCP requires a 3-way handshake which requires both sides to have IP addresses. UDP is connectionless and works with broadcast addressing (255.255.255.255). The DHCP DISCOVER message is a UDP broadcast from 0.0.0.0 (client has no IP yet) to 255.255.255.255 (all devices on LAN). This broadcast reaches the DHCP server without needing a pre-configured IP address. TCP simply cannot work in this scenario." },
    ],
  },

  "proto-telnet-ssh": {
    title: "Telnet & SSH", emoji: "💻",
    tldr: "Telnet (port 23): remote login but PLAIN TEXT — insecure. SSH (port 22): same function but fully encrypted with public-key crypto. SSH has replaced Telnet completely.",
    explanation: `Both Telnet and SSH provide remote terminal access — allowing a user to log into and control a remote device over the network.

TELNET:
- Port: TCP port 23
- CRITICAL PROBLEM: Telnet transmits EVERYTHING as plain text — including username, password, and all commands
- Any attacker sniffing the network can see your password and all your commands

SSH — Secure Shell:
- Port: TCP port 22
- Uses PUBLIC KEY CRYPTOGRAPHY for authentication
- Encrypts ALL data — username, password, commands, responses are all encrypted
- Also supports: SCP (secure file copy), SFTP (secure FTP), port forwarding/tunneling
- Has completely replaced Telnet in all modern systems

SSH Key-based auth:
- Generate a key pair: public key + private key
- Put public key on the server → server trusts anyone who has the matching private key
- Login without password — more secure than passwords`,
    keyPoints: [
      "Telnet: remote terminal access, TCP port 23, plain text — INSECURE",
      "SSH: remote terminal access, TCP port 22, fully encrypted — SECURE",
      "Telnet sends password as plain text — network sniffers can see it",
      "SSH uses public-key cryptography for authentication",
      "SSH encrypts all traffic: username, password, commands, output",
      "SSH features: remote shell, SCP (file copy), SFTP, port forwarding",
      "SSH has completely replaced Telnet in practice",
    ],
    formula: {
      code: `Telnet vs SSH Comparison:

  Feature          Telnet          SSH
  ─────────────────────────────────────────────
  Port             23 (TCP)        22 (TCP)
  Encryption       NONE            Full (all traffic)
  Authentication   Username+Pass   Password OR public key
  Password safety  Plain text ⚠️   Encrypted ✓
  Data safety      Plain text ⚠️   Encrypted ✓
  File transfer    No              SCP, SFTP
  Used today       Rarely          Universally

SSH Connection Flow:
  Client                     Server
     │── TCP SYN ──────────────>│
     │<── TCP SYN-ACK ──────────│
     │── SSH version exchange ──│
     │<── host public key ──────│  Client verifies server identity
     │── key exchange ─────────>│  (Diffie-Hellman)
     │    (session key negotiated — all further data encrypted)
     │── AUTH ─────────────────>│
     │<── shell ────────────────│  (all encrypted)`,
      explanation: "SSH does everything Telnet does but securely. The public key exchange ensures only the intended server can be connected to (prevents man-in-the-middle attacks).",
    },
    examTips: [
      "Telnet = port 23 = plain text = INSECURE. SSH = port 22 = encrypted = SECURE.",
      "SSH uses PUBLIC KEY cryptography — not symmetric encryption for authentication",
      "Both use TCP (not UDP) — remote terminal needs reliable delivery",
      "SSH can tunnel OTHER protocols through its encrypted connection — port forwarding",
    ],
    questions: [
      { q: "Why is Telnet considered insecure and how does SSH solve this?", a: "Telnet transmits all data including username, password, and commands as plain text over TCP. Anyone with network access using packet capture (Wireshark) can read the password and all commands directly. SSH solves this by encrypting all traffic. It uses public-key cryptography for authentication (the server's identity is verified, preventing MITM attacks) and encrypts the entire session using symmetric encryption after key exchange. The attacker sees only ciphertext — useless without the session key." },
    ],
  },

  "proto-summary": {
    title: "Application Protocol Port Summary", emoji: "📊",
    tldr: "Key port numbers you MUST memorize: FTP=20/21, SSH=22, Telnet=23, SMTP=25, DNS=53, DHCP=67/68, HTTP=80, POP3=110, IMAP=143, SNMP=161/162, HTTPS=443.",
    explanation: `Port numbers identify which application a packet is destined for. Ports 0-1023 are well-known/reserved.

Remember: port numbers below 1024 are "well-known" ports assigned by IANA.

Transport protocol matters too:
- TCP: connection-oriented, reliable, ordered — used for applications where data accuracy is critical (HTTP, FTP, SSH, SMTP)
- UDP: connectionless, fast, lightweight — used for time-sensitive applications or those with their own reliability (DNS, DHCP, SNMP, NTP)
- TCP/UDP: some protocols support both (DNS, SNMP, LDAP, HTTPS)

DNS uses port 53 with both TCP and UDP:
- UDP port 53: for most regular queries (fast, single round trip)
- TCP port 53: for zone transfers (large amounts of data)

The table below should be memorized cold for exams.`,
    keyPoints: [
      "Port 20: FTP data (TCP)", "Port 21: FTP control (TCP)",
      "Port 22: SSH — Secure Shell (TCP)", "Port 23: Telnet (TCP)",
      "Port 25: SMTP — email sending (TCP)", "Port 53: DNS (TCP/UDP)",
      "Ports 67/68: DHCP (UDP: 67=server, 68=client)", "Port 80: HTTP (TCP)",
      "Port 110: POP3 — email receive (TCP)", "Port 123: NTP (UDP)",
      "Port 143: IMAP — email access (TCP)", "Ports 161/162: SNMP (TCP/UDP)",
      "Port 443: HTTPS (TCP/UDP)",
    ],
    formula: {
      code: `Complete Application Protocol Summary Table:

  Port  | Protocol | Transport | Description
  ──────|──────────|──────────|────────────────────────────────
  20    | FTP      | TCP      | File Transfer Protocol — data
  21    | FTP      | TCP      | File Transfer Protocol — control
  22    | SSH      | TCP      | Secure Shell for encrypted login
  23    | Telnet   | TCP      | Unencrypted remote terminal login
  25    | SMTP     | TCP      | Simple Mail Transfer Protocol
  53    | DNS      | TCP/UDP  | Domain Name System
  67    | DHCP     | UDP      | DHCP Server (assigns IPs)
  68    | DHCP     | UDP      | DHCP Client (requests IPs)
  80    | HTTP     | TCP      | HyperText Transfer Protocol (web)
  110   | POP3     | TCP      | Post Office Protocol (email receive)
  123   | NTP      | UDP      | Network Time Protocol
  143   | IMAP     | TCP      | Internet Mail Access Protocol
  161   | SNMP     | TCP/UDP  | Simple Network Management Protocol
  162   | SNMP     | TCP/UDP  | SNMP Trap (agent → manager notify)
  443   | HTTPS    | TCP/UDP  | HTTP + SSL/TLS (secure web)

Common Internet Apps — Transport Protocol:
  Application         App Protocol  Transport
  Electronic mail     SMTP          TCP
  Remote terminal     Telnet/SSH    TCP
  Web browsing        HTTP/HTTPS    TCP
  File transfer       FTP           TCP
  Streaming media     DASH/HLS      TCP (usually)
  Internet telephony  RTP/QUIC      UDP
  Network mgmt        SNMP          Typically UDP
  Name translation    DNS           Typically UDP`,
      explanation: "Memorize the port table. FTP is special: TWO ports. DHCP is special: different ports for client vs server. DNS is special: both TCP and UDP.",
    },
    examTips: [
      "FTP = TWO ports (20 for data, 21 for control) — only protocol with this split",
      "DHCP = TWO different ports (67 server, 68 client) — both UDP",
      "DNS = both TCP AND UDP on port 53 — UDP for queries, TCP for zone transfers",
      "All TCP-only protocols: FTP, Telnet, SSH, SMTP, HTTP — need reliability",
      "All UDP-preferred: DNS, DHCP, SNMP, NTP — fast, low overhead needed",
      "HTTPS = HTTP + TLS. Port 443.",
      "POP3 = 110. IMAP = 143. Both TCP. Easy to confuse — remember: IMAP has more letters and higher port.",
    ],
    questions: [
      { q: "Why do DNS, DHCP, and SNMP use UDP while FTP, SMTP, and SSH use TCP?", a: "DNS, DHCP, and SNMP use UDP because their messages are small (single request-response pairs), latency matters more than reliability, and the application can implement its own simple retry logic if needed. DHCP specifically NEEDS broadcasting which UDP supports but TCP doesn't. FTP, SMTP, and SSH use TCP because they transfer large amounts of data that must arrive completely and in order — file corruption or missing email is unacceptable, so TCP's built-in reliability is essential." },
    ],
  },

  // ─── GROUP 8: Transport Layer Intro ──────────────────────────────────────

  "transport-intro": {
    title: "Transport Layer Introduction", emoji: "🚀",
    tldr: "Transport layer = logical process-to-process communication (adds ports on top of IP's host-to-host). Sender: breaks messages into segments. Receiver: reassembles into messages.",
    explanation: `The transport layer provides logical communication between application processes running on different hosts.

"Logical" means the two processes act as if there is a direct pipe between them — even though in reality packets travel through many routers, links, and networks. The network layer (IP) provides host-to-host communication. The transport layer EXTENDS this to process-to-process communication.

Transport Layer Actions:

Sender side:
1. Receives an application-layer message from the app
2. Determines segment header field values (ports, sequence numbers, etc.)
3. Creates a SEGMENT (header + application message)
4. Passes segment down to the network layer (IP)

Receiver side:
1. Receives a segment from IP
2. Checks header values
3. Extracts the application message
4. DEMULTIPLEXES the message up to the correct application via a socket

The Household Analogy:
Imagine Ann's house has 12 kids sending letters to 12 kids in Bill's house:
- Houses = hosts (identified by IP addresses)
- Kids = processes (identified by PORT numbers)
- Letters = application messages
- Postal service = network layer (delivers between houses)
- Kids sorting incoming mail = transport layer (delivers to right kid in the house)

Transport vs. Network Layer:
- Network layer (IP): logical communication between HOSTS (houses)
- Transport layer (TCP/UDP): logical communication between PROCESSES (kids)

Two protocols:
- TCP: reliable, in-order, connection-oriented, with congestion + flow control
- UDP: unreliable, connectionless, best-effort — "bare IP with port numbers"
- Neither provides delay or bandwidth guarantees`,
    keyPoints: [
      "Transport layer: process-to-process logical communication",
      "Network layer: host-to-host logical communication",
      "Transport layer EXTENDS network layer by adding ports (process addressing)",
      "Sender: breaks app messages into SEGMENTS, passes to IP",
      "Receiver: reassembles segments into messages, delivers to correct socket",
      "Segment = transport header + application message",
      "Analogy: hosts = houses, processes = kids, postal service = IP",
      "TCP: reliable, ordered, connection-oriented, congestion+flow control",
      "UDP: unreliable, connectionless, no frills",
      "Neither TCP nor UDP provides delay or bandwidth guarantees",
    ],
    formula: {
      code: `Transport Layer in the Stack:

  [App: Chrome]  [App: Zoom]  [App: WhatsApp]
       |              |              |
  [Port 54321]  [Port 8000]   [Port 12345]  ← Process addresses
       └──────────────┴──────────────┘
                      |
              [Transport Layer]
              (TCP/UDP + Port Numbers)
                      |
              [Network Layer (IP)]
              (IP Addresses — host-to-host)

What transport layer adds over IP:
  IP provides:        transport adds:
  Host addressing     + Process addressing (ports)
  Best-effort delivery + (TCP) Reliable delivery
                      + (TCP) Ordered delivery
                      + (TCP) Flow control
                      + (TCP) Congestion control`,
      explanation: "Key insight: IP gets the packet to the right MACHINE. TCP/UDP get the data to the right PROCESS on that machine via port numbers.",
    },
    examTips: [
      "Transport = process-to-process. Network = host-to-host. Don't swap these.",
      "Transport relies ON AND ENHANCES network layer — it doesn't replace it",
      "Segment = transport header + data. Datagram = IP header + segment. Frame = link header + datagram.",
      "TCP and UDP both provide process-to-process delivery. Only TCP adds reliability.",
      "Neither TCP nor UDP provides DELAY guarantees or BANDWIDTH guarantees.",
    ],
    questions: [
      { q: "What is the difference between transport layer services and network layer services?", a: "Network layer (IP) provides logical host-to-host communication: it delivers packets from one machine's IP address to another. Transport layer provides logical process-to-process communication: it delivers data from one specific application process (identified by port number) to another specific process on the destination host. The transport layer relies on the network layer for the host-to-host delivery, and enhances it with process addressing (ports) and optionally reliability (TCP)." },
    ],
  },

  "mux-demux": {
    title: "Multiplexing & Demultiplexing", emoji: "🔀",
    tldr: "Mux = gather data from multiple sockets, add transport headers. Demux = use header (ports + IPs) to deliver received segments to the right socket. UDP demux uses 2-tuple; TCP uses 4-tuple.",
    explanation: `The Problem:
Your computer runs many applications at once — browser, email, Zoom, Discord. All their data arrives through one network interface. How does the transport layer know which received segment belongs to which application?

Multiplexing (at sender):
Gathering data from multiple application sockets, wrapping each with transport headers (ports, etc.), and passing to the network layer. Going DOWN the stack.

Demultiplexing (at receiver):
Receiving segments from the network layer, examining headers, and directing each segment to the correct socket. Going UP the stack.

How Demultiplexing Works:
Each segment carries: Source Port # (16 bits) + Destination Port # (16 bits). The host uses IP addresses AND port numbers to direct the segment to the right socket.

CONNECTIONLESS Demultiplexing (UDP):
- UDP socket identified by: (destination IP, destination port) — 2-tuple
- ALL UDP segments with same destination port → SAME socket (regardless of source)
- Example: UDP server socket on port 12000 receives from Client A AND Client B → BOTH go to the same serverSocket

CONNECTION-ORIENTED Demultiplexing (TCP):
- TCP socket identified by: 4-TUPLE (source IP, source port, dest IP, dest port)
- Receiver uses ALL FOUR values to find the right socket
- Each TCP connection = unique 4-tuple = unique socket
- Non-persistent HTTP: new socket per request. Persistent HTTP: reuses socket.`,
    keyPoints: [
      "Multiplexing = gather from multiple sockets + add headers → send (at sender)",
      "Demultiplexing = receive segment + check headers → correct socket (at receiver)",
      "Transport header carries source port + dest port for mux/demux",
      "Port numbers: 0-65535. Well-known: 0-1023 (reserved).",
      "UDP demux: 2-tuple (dst IP, dst port) — source doesn't matter",
      "TCP demux: 4-tuple (src IP, src port, dst IP, dst port) — ALL four matter",
      "UDP: all segments to same dst port → same socket (one socket for ALL clients)",
      "TCP: each connection has unique 4-tuple → each gets its OWN socket",
      "Non-persistent HTTP = new socket per request; persistent = reuse socket",
    ],
    formula: {
      code: `Segment Header Structure:
         32 bits
  ┌──────────────┬─────────────────┐
  │ Source Port# │  Dest Port #    │  ← used for demux
  ├──────────────┴─────────────────┤
  │     other header fields        │
  ├────────────────────────────────┤
  │     Application Data           │
  └────────────────────────────────┘

UDP Demultiplexing (2-tuple):
  (dst IP = B, dst port = 80) → serverSocket

  Client A: src=A:9157, dst=B:80 ──→ serverSocket  ┐ SAME socket
  Client B: src=C:5775, dst=B:80 ──→ serverSocket  ┘

TCP Demultiplexing (4-tuple):
  (src IP, src port, dst IP, dst port) → unique socket

  Client A: src=A:9157, dst=B:80 ──→ connectionSocket_1  ┐ DIFFERENT
  Client B: src=C:5775, dst=B:80 ──→ connectionSocket_2  │ sockets
  Client C: src=C:9157, dst=B:80 ──→ connectionSocket_3  ┘

  Even though C:9157 and A:9157 have same port number,
  different source IPs → different sockets!`,
      explanation: "UDP: dest port is enough to find the socket. TCP: need all 4 values because one server port (like 80) can have thousands of active connections, each needing its own socket.",
    },
    examTips: [
      "UDP demux = 2-tuple. TCP demux = 4-TUPLE. This is the most exam-worthy difference.",
      "Web server on port 80: with UDP, one socket for all. With TCP, one socket PER connection.",
      "Non-persistent HTTP opens NEW socket per request — creates + destroys quickly",
      "TCP 4-tuple uniqueness: even same source port from different IPs = different sockets",
      "Source port in client: OS assigns an ephemeral port (49152-65535 range) automatically",
    ],
    questions: [
      { q: "Three clients (A:9157, C:5775, C:9157) all send segments to server B port 80. How many sockets does a UDP server have vs a TCP server?", a: "UDP server: 1 socket (serverSocket on port 80). All three segments have the same destination (B:80) and UDP demux only checks the destination port → all three go to the same socket. TCP server: 3 sockets (3 separate connection sockets). TCP demux checks the 4-tuple (src IP, src port, dst IP, dst port). Each client has a different 4-tuple: (A,9157,B,80), (C,5775,B,80), (C,9157,B,80) → three unique 4-tuples → three different sockets." },
      { q: "You open pesuacademy.com and medium.com in two separate browser tabs. How does the OS know which incoming TCP segment goes to which tab? (ESA Jan-May 2024, 6 marks)", a: "The OS uses TCP's 4-tuple demultiplexing. When Chrome opens a tab for pesuacademy.com, the OS creates a TCP connection with a unique 4-tuple — say (your IP, ephemeral port 54321, pesuacademy IP, port 80). For the Medium tab, another TCP connection with a different 4-tuple — (your IP, ephemeral port 54322, medium IP, port 443). These 4-tuples are completely different (different destination IPs and different source ephemeral ports). When a TCP segment arrives, the OS reads the 4-tuple (src IP, src port, dst IP, dst port) from the header and looks up which socket (and therefore which application process / browser tab) it matches. The correct segment is delivered to the correct tab's socket. This is why each browser tab gets data for the right website even though all TCP segments arrive through the same network interface." },
    ],
  },

  // ─── GROUP 9: UDP ─────────────────────────────────────────────────────────

  "udp-overview": {
    title: "UDP — Why It Exists & When to Use It", emoji: "📦",
    tldr: "UDP = 'no frills' transport. No connection, no reliability, no flow/congestion control. Advantages: no RTT delay, tiny header (8B), no congestion throttling. Used for DNS, streaming, SNMP, HTTP/3.",
    explanation: `UDP (User Datagram Protocol) — RFC 768

UDP is described as "no frills" and "bare bones" because it adds almost nothing on top of IP:
- Adds source/destination port numbers (for demultiplexing)
- Optional checksum for error detection
- That's it.

Advantages of UDP over TCP:

1. No connection establishment (no RTT delay):
TCP must complete a 3-way handshake before sending ANY data — this takes 1 full RTT. For DNS, which makes thousands of tiny queries, this 1 RTT overhead per query would be catastrophic. UDP starts sending immediately.

2. No connection state:
TCP must maintain send/receive buffers, sequence numbers, acknowledgment numbers, congestion window, flow control variables. UDP has zero per-connection state. A server can support more active clients with UDP.

3. Small header size:
UDP header = 8 bytes. TCP header = 20 bytes (minimum).

4. No congestion control:
TCP slows down when the network is congested. UDP can blast data at maximum speed regardless. For real-time apps like video streaming, slowing down is worse than losing a few frames.

UDP Use Cases:
- Streaming multimedia: loss-tolerant, rate-sensitive (video calls, live streams)
- DNS: tiny queries, fast response critical
- SNMP: management queries, small, simple
- HTTP/3: uses UDP (QUIC) but adds reliability + congestion control at application layer

If you need reliability over UDP: add it at the application layer yourself (like HTTP/3 does).`,
    keyPoints: [
      "UDP = connectionless, unreliable, no flow/congestion control",
      "UDP advantages: no handshake delay, no state, 8-byte header, no congestion throttling",
      "No connection establishment = no 1-RTT delay before first data (unlike TCP)",
      "No connection state = server can handle more clients (no per-connection memory)",
      "UDP header = 8 bytes. TCP header = 20+ bytes.",
      "No congestion control: UDP can send at max rate even in congested network",
      "UDP use cases: streaming multimedia, DNS, SNMP, HTTP/3",
      "HTTP/3 uses QUIC over UDP — adds reliability at application layer",
    ],
    formula: {
      code: `UDP vs TCP Trade-offs:

  Property            UDP             TCP
  ──────────────────────────────────────────────
  Connection          None            3-way handshake
  Setup delay         0 RTT           1 RTT minimum
  Reliability         None            Guaranteed
  Ordering            None            In-order
  Header size         8 bytes         20 bytes (min)
  State               None            Buffers, seq#, ack#, etc.
  Flow control        None            Yes
  Congestion control  None            Yes (slows down)
  Broadcast support   Yes             No
  Use cases           DNS,SNMP,video  HTTP,FTP,SSH,SMTP

When UDP wins:
  1 DNS query over TCP: SYN + SYN-ACK + ACK + GET + data = 5 messages
  1 DNS query over UDP: query + response = 2 messages ← 2.5x faster!

HTTP/3 over QUIC:
  QUIC runs on UDP port 443
  QUIC adds: reliability + congestion control + security
  But with FEWER round trips than TCP + TLS`,
      explanation: "The key question is: does your app care MORE about speed/responsiveness or data completeness? DNS cares about speed. FTP cares about completeness.",
    },
    examTips: [
      "UDP RFC = 768. TCP RFC = 793. Exams sometimes ask this.",
      "UDP is 'best-effort' — same level of reliability as IP itself",
      "No connection state means UDP server can support MORE active clients than TCP",
      "TCP congestion control can reduce speed to near zero in bad networks — UDP won't",
      "HTTP/3 = QUIC = UDP + app-layer reliability — modern web is moving to UDP-based!",
    ],
    questions: [
      { q: "Give four reasons why UDP is preferred over TCP for DNS queries.", a: "1. No connection establishment: DNS queries are tiny single request-response pairs. TCP's 3-way handshake adds 1 RTT before any DNS data flows — too slow for thousands of queries. 2. No connection state: DNS servers handle millions of queries per second; maintaining TCP state for each would require enormous memory. 3. Smaller header: UDP's 8-byte header vs TCP's 20 bytes adds up over billions of queries. 4. DNS queries fit in one UDP packet: no fragmentation needed. If UDP reply is lost, the DNS resolver simply resends the query — simple and effective." },
    ],
  },

  "udp-segment": {
    title: "UDP Segment Structure & Checksum", emoji: "🔢",
    tldr: "UDP header = exactly 4 fields × 16 bits = 8 bytes. Checksum = one's complement of the sum of all 16-bit words. Wrap carry back. Receiver checks by summing all words including checksum — should be all 1s.",
    explanation: `UDP Segment Structure:

The UDP header has exactly 4 fields, each 16 bits (2 bytes) wide:
1. Source Port Number (16 bits): ephemeral port of the sending process
2. Destination Port Number (16 bits): the port the receiving application listens on
3. Length (16 bits): total length of UDP segment = header (8 bytes) + payload
4. Checksum (16 bits): error detection field (optional in IPv4, required in IPv6)

Total header size: 4 × 16 bits = 64 bits = 8 bytes.

UDP Checksum — One's Complement Sum:

The checksum provides error detection — it lets the receiver check if the segment was corrupted in transit.

How to compute:
1. Treat the entire UDP segment (header + data + pseudo-header) as a sequence of 16-bit integers
2. Add all 16-bit integers together using one's complement addition
   - If the sum produces a carry out of the 16th bit, wrap it around (add the carry back to the LSB)
3. Take the ONE'S COMPLEMENT of the final sum (flip all bits)
4. This is the checksum. Put it in the Checksum field.

Receiver verification:
1. Receiver computes sum of all 16-bit words INCLUDING the checksum field
2. If result = all 1s (0xFFFF) → no error detected
3. If any bit is 0 → error detected

Weakness: complementary errors cancel out — if two bits flip in opposite directions their contribution to the sum cancels, and the checksum doesn't change. Checksum cannot detect all possible errors.`,
    keyPoints: [
      "UDP header = exactly 4 fields, each 16 bits = 8 bytes total",
      "4 fields: Source Port, Destination Port, Length, Checksum",
      "Length = total segment bytes (header + payload), NOT just payload",
      "Checksum is OPTIONAL in UDP (IPv4) — set to 0x0000 to disable",
      "Checksum = one's complement of one's complement sum of all 16-bit words",
      "Wrap-around: carry out of bit 16 is added back to result",
      "Receiver check: sum all words including checksum → should be all 1s (0xFFFF)",
      "Weak protection: complementary bit flips produce same checksum → undetected",
      "UDP checksum covers pseudo IP header too (src IP, dst IP, protocol, UDP length)",
    ],
    formula: {
      code: `UDP Segment Format:
         32 bits
  ┌─────────────────┬─────────────────┐
  │  Source Port #  │  Dest Port #    │
  ├─────────────────┼─────────────────┤
  │     Length      │   Checksum      │  ← 8 bytes total header
  ├─────────────────┴─────────────────┤
  │     Application Data (payload)    │
  └───────────────────────────────────┘

PYQ Checksum Calculation (ESA May 2023 Q3b):
  Word 1: 01111011 11010000
  Word 2: 11000011 11101011
  ─────────────────────────────────────────
  Sum:    1 0011111 10111011  ← 17 bits! carry=1
  Wraparound: add 1 to result:
  0011111110111011 + 1 = 0011111110111100
  Checksum = flip all bits:
             1100000001000011

Verification at receiver:
  Recompute sum of all words including checksum
  If result = 1111111111111111 → no error
  If any 0 → error detected

Weak protection example:
  Original:  5 + 6 = 11 → checksum = complement(11)
  Corrupted: 4 + 7 = 11 → SAME checksum!
  Error NOT detected (5→4 and 6→7 are complementary changes)`,
      explanation: "One's complement sum is used because its complement (flipping bits) is easy to compute. Wraparound ensures no information is lost when there's a carry. The weakness: any two complementary errors cancel out.",
    },
    examTips: [
      "UDP header = exactly 4 fields, each 16 bits = 8 bytes total. Memorize this.",
      "Length field = total UDP segment size (header + payload), NOT just payload",
      "Wrap-around: carry out of MSB is ADDED BACK to result — unique to one's complement",
      "Checksum = one's complement of one's complement SUM (add all words, flip the bits)",
      "Receiver check: sum of all words including checksum field should be all 1s (0xFFFF)",
    ],
    questions: [
      { q: "Calculate the UDP checksum for words: 01111011 11010000 and 11000011 11101011 (PYQ ESA May 2023 Q3b).", a: "Step 1: Add the two 16-bit words in binary. 01111011 11010000 + 11000011 11101011. Sum = 1 00111111 10111011 (17 bits — carry=1). Step 2: Wrap around — add the carry back: 00111111 10111011 + 00000000 00000001 = 00111111 10111100. Step 3: One's complement (flip all bits): 11000000 01000011. Checksum = 1100000001000011." },
    ],
  },

  // ─── GROUP 10: Reliable Data Transfer ────────────────────────────────────

  "rdt-overview": {
    title: "RDT Principles & rdt1.0", emoji: "🔁",
    tldr: "RDT = reliable data transfer built on top of an unreliable channel. Complexity depends on what the channel can do (lose? corrupt? reorder?). rdt1.0 = perfectly reliable channel — trivial.",
    explanation: `The Core Problem:
IP (the network layer) is unreliable — it can LOSE, CORRUPT, or REORDER packets. Applications like file transfer and email need reliable delivery. The transport layer must build reliability ON TOP of the unreliable channel.

Key Functions (notation used in FSMs):
- rdt_send(data): called by app to send data → triggers sender-side protocol
- udt_send(packet): send packet over the UNRELIABLE channel
- rdt_rcv(packet): called when packet arrives at receiver
- deliver_data(data): deliver data up to the receiving application
- make_pkt(data, checksum, seq): create a packet

Finite State Machine (FSM) Notation:
States are represented as circles. Transitions labeled: event / action
If no action: use Λ (lambda)

The complexity depends on what the unreliable channel can do:
- Can it flip bits? → Need checksum
- Can it lose packets? → Need timer + retransmit
- Can it reorder? → Need sequence numbers

rdt1.0 — Perfectly Reliable Channel:
Assumptions: NO bit errors, NO packet loss.
With a perfect channel, no error recovery is needed.

Sender FSM:
[Wait for call] → rdt_send(data) / make_pkt(data); udt_send(pkt) → [Wait for call]

Receiver FSM:
[Wait for call] → rdt_rcv(pkt) / extract(pkt,data); deliver_data(data) → [Wait for call]

Single state each — just send and receive. Nothing to go wrong.`,
    keyPoints: [
      "RDT = build reliability on top of an unreliable channel",
      "Underlying channel can: flip bits (corrupt), lose packets, reorder — each needs different fix",
      "rdt_send(): app calls this to send. udt_send(): actually sends over unreliable channel.",
      "deliver_data(): called to hand received data up to the application",
      "FSM: circles = states, labeled arrows = (event/action) on transition",
      "Λ (lambda) on transition = no action taken",
      "rdt1.0: perfect channel assumption → trivial, no error handling needed",
      "We build rdt incrementally: rdt1.0 → 2.0 → 2.1 → 2.2 → 3.0",
    ],
    formula: {
      code: `RDT Service Abstraction:

  App Layer (sender)         App Layer (receiver)
       |                           |
  rdt_send(data)            deliver_data(data)
       |                           |
  ┌────────────────────────────────────┐
  │   Reliable Data Transfer Protocol │
  └────────────────────────────────────┘
       |                           |
  udt_send(packet)          rdt_rcv(packet)
       |                           |
  ══════════ unreliable channel ══════════

rdt1.0 FSMs:

  SENDER                          RECEIVER
  ──────                          ────────
  [Wait]                          [Wait]
  rdt_send(data) /                rdt_rcv(pkt) /
  make_pkt(data);                 extract(pkt,data);
  udt_send(pkt)                   deliver_data(data)
  [Wait] ← loop back              [Wait] ← loop back

  (single state each — trivially simple)`,
      explanation: "rdt1.0 is trivial because we assumed a perfect channel. Every subsequent version (2.0, 2.1, 2.2, 3.0) removes one assumption and adds the protocol mechanism to handle that failure mode.",
    },
    examTips: [
      "FSM transition format: EVENT / ACTION. Lambda (Λ) = no action.",
      "rdt1.0: perfect channel → single state each → just send and receive",
      "Each rdt version adds one mechanism to handle one type of channel failure",
      "udt_send() = UNRELIABLE send. rdt_send() = interface to APPLICATION.",
    ],
    questions: [
      { q: "What are the three ways an underlying channel can be unreliable, and what mechanism does each require?", a: "1. Bit errors (corruption): the channel flips bits in the packet. Mechanism needed: CHECKSUM — detect errors by checking if received data is corrupted. 2. Packet loss: the channel loses entire packets. Mechanism needed: TIMER + RETRANSMIT — sender waits for acknowledgment; if timer expires, retransmit the packet. 3. Packet reordering: packets arrive out of order. Mechanism needed: SEQUENCE NUMBERS — number each packet so receiver can detect duplicates and reorder." },
    ],
  },

  "rdt20": {
    title: "rdt2.0 — Stop-and-Wait with Bit Errors", emoji: "🔍",
    tldr: "Channel can have bit errors. Solution: checksum + ACK/NAK feedback. Stop-and-wait: sender waits for ACK before sending next packet. Fatal flaw: what if ACK/NAK itself is corrupted?",
    explanation: `rdt2.0 — Channel with Bit Errors (No Loss):

New assumption: the channel CAN corrupt packets (flip bits), but does NOT lose packets.

New mechanisms added:
1. ERROR DETECTION: Checksum — receiver checks if received packet has bit errors
2. FEEDBACK: Receiver sends ACK (positive) or NAK (negative) back to sender
   - ACK = "I received it correctly, send the next one"
   - NAK = "I got it but it's corrupted, please resend"
3. RETRANSMISSION: Sender retransmits on receiving NAK

Stop-and-Wait behavior:
- Sender sends ONE packet and waits — does nothing until ACK or NAK arrives
- If ACK: move on, send next packet
- If NAK: retransmit the SAME packet

Sender FSM (2 states):
State 1 [Wait for call]: 
  Event: rdt_send(data)
  Action: make_pkt(data, checksum); udt_send(pkt); → go to State 2

State 2 [Wait for ACK or NAK]:
  Event: rcv(NAK) → Action: udt_send(pkt) [retransmit]; stay in State 2
  Event: rcv(ACK) → Action: Λ; go back to State 1

Receiver FSM (1 state):
  Event: rdt_rcv(pkt) AND corrupt → Action: udt_send(NAK)
  Event: rdt_rcv(pkt) AND NOT corrupt → Action: extract; deliver_data; udt_send(ACK)

The Fatal Flaw of rdt2.0:
What happens if the ACK or NAK is CORRUPTED?
- Sender receives a garbled feedback — can't tell if it's ACK or NAK
- Sender can't just ignore it (might have been NAK = must retransmit)
- Sender can't just retransmit (might have been ACK = receiver already moved on)
- If sender retransmits, receiver might get DUPLICATE packets

This flaw is why rdt2.0 is incomplete — fixed in rdt2.1 with sequence numbers.`,
    keyPoints: [
      "rdt2.0: channel has bit errors (no packet loss)",
      "New mechanisms: checksum (detect errors), ACK/NAK feedback, retransmission",
      "ACK = correctly received. NAK = corrupted, please resend.",
      "Stop-and-wait: sender waits for ACK/NAK before proceeding",
      "Sender FSM: 2 states — Wait-for-call and Wait-for-ACK/NAK",
      "Receiver: if corrupt → NAK. If ok → ACK + deliver data.",
      "Fatal flaw: if ACK or NAK is itself corrupted, sender is stuck",
      "rdt2.0 is incomplete — not usable in practice without fix (rdt2.1)",
    ],
    formula: {
      code: `rdt2.0 Sender FSM:

  [Wait for       ── rdt_send(data) ──>
   call from     make_pkt(data,cksum);
   above]        udt_send(pkt)
                       │
                       ▼
  [Wait for    ── rcv(NAK) ─── udt_send(pkt)  ← retransmit
   ACK/NAK]   └── rcv(ACK) ─── Λ  → back to Wait-for-call

rdt2.0 Receiver FSM:

  [Wait for call]
    if corrupt(pkt): udt_send(NAK)
    if not corrupt:  extract(data); deliver_data(data); udt_send(ACK)

Success scenario:
  Sender → [pkt] → Receiver: not corrupt → ACK → Sender: OK, done!

Failure scenario:
  Sender → [pkt] → Receiver: corrupt → NAK → Sender: retransmit!

FATAL FLAW scenario:
  Sender → [pkt] → Receiver: OK → ACK (but ACK is garbled in transit)
  Sender receives garbled signal → ???
  If treats as NAK: retransmit → Receiver gets DUPLICATE!
  If treats as ACK: moves on → correct data received, but unsafe assumption`,
      explanation: "rdt2.0 works great if feedback is perfect — but that's the same assumption as rdt1.0! The feedback channel is ALSO unreliable. This circularity is the fatal flaw.",
    },
    examTips: [
      "rdt2.0 assumes: channel has bit errors but NO packet loss",
      "3 new mechanisms: checksum, ACK/NAK, retransmit",
      "Stop-and-wait: sender STOPS after each packet and WAITS for feedback",
      "Fatal flaw = corrupted ACK/NAK causes ambiguity — sender can't proceed safely",
      "rdt2.1 fixes this with sequence numbers (0 and 1) to detect duplicates",
    ],
    questions: [
      { q: "What is the fatal flaw of rdt2.0 and why does it make the protocol unusable?", a: "The fatal flaw: rdt2.0 assumes that ACK and NAK messages arrive uncorrupted. But the feedback channel is ALSO unreliable — ACKs and NAKs can be corrupted too. When the sender receives a garbled feedback message, it can't determine whether to retransmit (it was a NAK) or advance to the next packet (it was an ACK). If the sender always retransmits on ambiguous feedback, the receiver may get duplicate packets and can't tell them apart from new packets (rdt2.0 has no sequence numbers). This ambiguity breaks the protocol — it cannot guarantee reliable delivery in all cases." },
    ],
  },

  "rdt21-22": {
    title: "rdt2.1 & rdt2.2 — Sequence Numbers, No NAK", emoji: "🔢",
    tldr: "rdt2.1 adds 1-bit sequence numbers (0, 1) to handle duplicate detection. rdt2.2 eliminates NAK by ACKing the last correctly received packet instead — reduces control overhead.",
    explanation: `rdt2.1 — Fix for Corrupted ACK/NAK:

The fix for rdt2.0's fatal flaw: add SEQUENCE NUMBERS to packets.

With a 1-bit sequence number (0 or 1), the receiver can detect duplicates:
- If the sender retransmits pkt0 (because ACK was garbled), receiver sees pkt0 again
- Receiver recognizes it's a duplicate (expected pkt1, got pkt0 again) → discard, resend ACK

Sender FSM (4 states — 2 per sequence number):
- State Wait0: waiting for data from app to send as packet 0
- State WaitACK0: waiting for ACK/NAK for packet 0
- State Wait1: waiting for data from app to send as packet 1
- State WaitACK1: waiting for ACK/NAK for packet 1

Receiver behavior:
- If receives pkt0 correctly AND expecting pkt0 → ACK0, deliver, now expect pkt1
- If receives pkt0 correctly AND expecting pkt1 → ACK0 (for duplicate), DO NOT deliver

Key insight: 1-bit sequence number is enough for stop-and-wait because only one packet is "in flight" at any time.

rdt2.2 — NAK-free Protocol:

rdt2.2 eliminates NAK messages entirely. Instead of sending NAK when a packet is corrupt, the receiver sends an ACK for the LAST CORRECTLY RECEIVED PACKET.

Changes:
- No NAK message type
- Sender: on receiving a DUPLICATE ACK → retransmit current packet
- Duplicate ACK = ACK for the wrong sequence number (e.g., sender sent pkt1, receiver sends ACK0 = means pkt1 was bad)

Why this matters: rdt2.2 is conceptually closer to TCP, which uses only ACKs (no NAKs). Duplicate ACKs serve the same role as NAKs.`,
    keyPoints: [
      "rdt2.1: adds 1-bit sequence numbers (0 and 1) to handle duplicate packets",
      "1-bit seq# sufficient because only 1 packet in-flight at a time (stop-and-wait)",
      "Receiver detects duplicate: got pkt0 but expecting pkt1 → discard, send ACK0",
      "Sender FSM: 4 states (2 for each sequence number)",
      "rdt2.2: eliminates NAK — receiver sends ACK for LAST CORRECTLY RECEIVED packet",
      "Duplicate ACK in rdt2.2 signals same thing as NAK in rdt2.1",
      "rdt2.2 is NAK-free — closer to TCP behavior",
      "Sender sees duplicate ACK → retransmit current packet",
    ],
    formula: {
      code: `rdt2.1 — Handling Duplicate Packets:

  Sender sends pkt(seq=0, data, cksum)
  Receiver: OK → ACK0
  ACK0 gets garbled
  Sender: can't tell → retransmits pkt(seq=0, data, cksum)
  Receiver: already got seq=0! Duplicate → discard + resend ACK0
  Sender: receives ACK0 → advances!

Without seq#: duplicate indistinguishable from new data
With seq#:   duplicate detected, safely discarded

rdt2.1 Receiver Logic:
  if corrupt(pkt):         → send NAK (or send ACK for other seq#)
  if not corrupt:
    if expected seq#:      → deliver, ACK, advance expected seq#
    if wrong seq# (dup):   → discard, resend ACK for that seq#

rdt2.2 — No NAK:

  Instead of: corrupt(pkt) → send NAK
  Do:         corrupt(pkt) → send ACK for PREVIOUS (last good) packet

  Example:
    Sender expects ACK1 (just sent pkt1)
    Receiver: pkt1 was corrupt → sends ACK0 (last good was pkt0)
    Sender sees ACK0 (duplicate) → retransmit pkt1

  Same information, fewer message types!
  This is exactly how TCP handles it.`,
      explanation: "1-bit sequence number alternates: 0, 1, 0, 1... This is the alternating bit protocol. rdt2.2 removing NAK makes the protocol simpler and closer to TCP's ACK-only design.",
    },
    examTips: [
      "rdt2.1 = rdt2.0 + 1-bit sequence numbers. That's the only difference.",
      "1-bit seq# = alternating bit protocol: 0,1,0,1,0,1...",
      "Receiver on duplicate: DO NOT DELIVER, just ACK to unblock sender",
      "rdt2.2: NO NAK. Corrupt packet → ACK the PREVIOUS successfully received packet.",
      "Duplicate ACK in rdt2.2 = NAK in rdt2.1 — same information, different encoding",
    ],
    questions: [
      { q: "How does adding a 1-bit sequence number to rdt2.1 fix the fatal flaw of rdt2.0?", a: "rdt2.0's flaw: if sender retransmits due to garbled feedback, receiver can't tell if the retransmission is a new packet or a duplicate. rdt2.1 fix: each packet carries a sequence number (0 or 1). When the sender retransmits pkt0 due to ambiguous feedback, the receiver sees pkt0 again. If the receiver is expecting pkt1, it knows pkt0 is a duplicate — it discards it and resends ACK0 to unblock the sender. The sender receives ACK0, confirms pkt0 was received, and advances to send pkt1. The 1-bit alternating sequence number uniquely identifies each packet in a stop-and-wait system." },
    ],
  },

  "rdt30": {
    title: "rdt3.0 — Handling Packet Loss (Countdown Timer)", emoji: "⏱️",
    tldr: "rdt3.0 adds loss handling: countdown timer. If ACK doesn't arrive in time → retransmit. Handles 4 scenarios: normal, lost packet, lost ACK, premature timeout. But terrible link utilization.",
    explanation: `rdt3.0 — Channel with Errors AND Loss:

New assumption: channel can BOTH corrupt packets AND LOSE packets entirely.

New mechanism: COUNTDOWN TIMER

If the sender sends a packet and the ACK doesn't arrive within a time limit, the sender ASSUMES the packet (or its ACK) was lost and retransmits.

Sequence numbers are still needed (from rdt2.1) to handle duplicates caused by premature timeouts.

Timer details:
- Sender starts timer every time it sends a packet
- If timer expires before ACK arrives → retransmit the packet
- If ACK arrives before timer expires → cancel timer, move on
- Timer duration = a "reasonable" amount of time (must be > expected RTT)

rdt3.0 handles 4 scenarios:
(a) Normal operation: send, receive, ACK, done.
(b) Lost packet: timer fires, retransmit. Works.
(c) Lost ACK: timer fires, retransmit (sender doesn't know if packet arrived or ACK was lost). Receiver gets duplicate → detects via seq# → discards, re-ACKs. Works.
(d) Premature timeout: ACK was delayed (not lost). Timer fires, sender retransmits. Receiver gets duplicate, discards, re-ACKs. Later, duplicate ACK arrives at sender → ignored. Works.

All 4 scenarios handled correctly! rdt3.0 is a correct protocol.

The BIG Problem — Link Utilization:
rdt3.0 uses stop-and-wait: sender is IDLE while waiting for ACK. 

For a 1 Gbps link with RTT = 30ms and packet size = 8000 bits:
- Transmission time: L/R = 8000/10^9 = 0.008ms
- Sender utilization: U = (L/R)/(RTT + L/R) = 0.008/(30 + 0.008) ≈ 0.027%
- The link is IDLE 99.97% of the time!

This terrible utilization motivates pipelining.`,
    keyPoints: [
      "rdt3.0: channel can lose AND corrupt packets",
      "New mechanism: countdown timer — retransmit if no ACK within timeout period",
      "Timer starts when packet is sent; cancelled when ACK arrives",
      "Still uses 1-bit sequence numbers (from rdt2.1) for duplicate detection",
      "4 scenarios all handled correctly: normal, lost pkt, lost ACK, premature timeout",
      "Premature timeout: retransmit causes duplicate → receiver detects (seq#) → re-ACKs",
      "Stop-and-wait utilization: U = (L/R)/(RTT + L/R) — extremely low on fast links",
      "Example: 1 Gbps, RTT=30ms, L=8000 bits → U = 0.027% (terrible!)",
      "Low utilization is why pipelining (GBN, SR) is needed",
    ],
    formula: {
      code: `rdt3.0 — 4 Scenarios:

(a) Normal:                (b) Lost packet:
  Sender → [pkt0] → OK      Sender → [pkt0] × lost
  Receiver → ACK0 → OK      Timer! → retransmit pkt0
  Done ✓                     Receiver → pkt0 → ACK0 ✓

(c) Lost ACK:              (d) Premature timeout:
  Sender → [pkt0] → OK      Sender → [pkt0] → OK
  Receiver → ACK0 × lost    Receiver → ACK0 (delayed)
  Timer! → retransmit pkt0  Timer fires too early!
  Receiver: dup pkt0         Retransmit pkt0
  → discard + re-ACK0       Receiver: dup → discard + ACK0
  → Sender: ACK received ✓  Both ACKs arrive at sender
                             Second ACK → ignored ✓

Utilization Formula:
  U_sender = (L/R) / (RTT + L/R)

  L = 8000 bits (packet size)
  R = 10^9 bps (1 Gbps link)
  L/R = 0.008 ms (transmission time)
  RTT = 30 ms (propagation delay × 2)

  U = 0.008 / (30 + 0.008) = 0.008 / 30.008 ≈ 0.000267 = 0.027%

  Link is IDLE 99.97% of the time!
  This is catastrophic on a 1 Gbps link → need PIPELINING`,
      explanation: "The timer is the key addition in rdt3.0. It handles loss by assuming 'if ACK hasn't arrived in time, something was lost.' Sequence numbers handle the duplicates this creates. But stop-and-wait is terribly inefficient.",
    },
    examTips: [
      "rdt3.0 adds timer to rdt2.1. That's the ONE change. Know what this handles: packet loss.",
      "Retransmit triggers: timer expiry. That's the only time we retransmit in rdt3.0.",
      "Premature timeout scenario MUST be walkable step by step in exams.",
      "Utilization formula: U = (L/R)/(RTT + L/R). Know it and know the 0.027% example.",
      "The 4 scenarios are classic exam questions — draw the timeline diagrams.",
    ],
    questions: [
      { q: "In rdt3.0, what happens in scenario (d) — premature timeout? Walk through step by step.", a: "1. Sender sends pkt0 and starts timer. 2. Receiver receives pkt0 correctly, sends ACK0. 3. Timer fires BEFORE ACK0 arrives (network delay was longer than timeout). 4. Sender retransmits pkt0 (assuming loss). 5. Receiver receives duplicate pkt0 — detects duplicate because seq# is 0 and it already received seq#0 — discards it. Sends ACK0 again. 6. Sender receives the first ACK0 → stops timer, advances to send pkt1. 7. Sender later receives the second ACK0 (from the re-ACK) — this is a duplicate ACK → ignores it. Protocol continues correctly." },
      { q: "Calculate the sender utilization for rdt3.0: link speed R = 1 Gbps, propagation delay = 15 ms, packet size L = 8000 bits.", a: "RTT = 2 × 15 ms = 30 ms. Transmission delay: L/R = 8000 bits / 10^9 bps = 8 × 10^-6 s = 0.008 ms. Utilization: U_sender = (L/R) / (RTT + L/R) = 0.008 ms / (30 ms + 0.008 ms) = 0.008 / 30.008 ≈ 0.000267 = 0.027%. The sender is busy only 0.027% of the time — the link is idle 99.973% of the time." },
    ],
  },

  "pipelining": {
    title: "Pipelining & Go-Back-N / Selective Repeat", emoji: "⚡",
    tldr: "Pipelining = multiple in-flight unACKed packets. Utilization scales with window size W: U = W×(L/R)/(RTT+L/R). GBN: retransmit ALL from lost. SR: retransmit ONLY lost packet.",
    explanation: `The Problem with Stop-and-Wait:
U_sender = 0.027% on a 1 Gbps link. The protocol is crippling the network — the link is idle 99.97% of the time.

Pipelining Solution:
Allow the sender to send MULTIPLE packets before waiting for ACKs.

Requirements for pipelining:
1. Larger sequence number space: need to identify multiple outstanding packets
2. Sender buffering: must buffer sent-but-unACKed packets for potential retransmission
3. Receiver buffering (sometimes): hold out-of-order packets

Pipelining utilization:
U_sender_pipelined = W × (L/R) / (RTT + L/R)
where W = window size (packets in flight simultaneously)

Two Pipelined Protocols:

GO-BACK-N (GBN):
- Sender: can have up to N (window size) unACKed packets in pipeline
- Receiver: CUMULATIVE ACK — ACK(n) means "received all up to and including n"
- Timeout: if packet n times out → retransmit n AND ALL subsequent packets
- Receiver: DISCARD out-of-order packets — only accepts in-order
- Window size ≤ 2^k - 1 (k = number of bits for seq#)

SELECTIVE REPEAT (SR):
- Sender: can have up to N unACKed packets
- Receiver: INDIVIDUAL ACKs — ACK(n) means "received packet n"
- Receiver BUFFERS out-of-order packets until gaps are filled
- Timeout: retransmit ONLY the specific timed-out packet
- Window size ≤ 2^(k-1) (k = bits for seq#)`,
    keyPoints: [
      "Pipelining: multiple in-flight packets → dramatically improves link utilization",
      "Utilization = W × (L/R) / (RTT + L/R) where W = window size",
      "Must fill the pipe: W ≥ RTT/(L/R) + 1 for full utilization",
      "GBN: cumulative ACKs, discard out-of-order, retransmit all from lost packet",
      "GBN window size ≤ 2^k - 1 (k = seq# bits)",
      "SR: individual ACKs, buffer out-of-order, retransmit ONLY lost packet",
      "SR window size ≤ 2^(k-1) (smaller than GBN — avoids ambiguity)",
      "GBN: simpler receiver. SR: more efficient (fewer retransmissions)",
      "TCP uses selective-repeat-like behavior with cumulative ACKs + fast retransmit",
    ],
    formula: {
      code: `Stop-and-Wait vs Pipelined Utilization:

Stop-and-Wait (W=1):
  U = (L/R) / (RTT + L/R) = 0.008/30.008 = 0.027%

Pipelined with W packets in flight:
  U = W × (L/R) / (RTT + L/R)

  W=3:    U = 3 × 0.008/30.008 = 0.08%
  W=30:   U = 30 × 0.008/30.008 = 0.8%
  W=3750: U = 3750 × 0.008/30.008 ≈ 100% (full pipe!)

Minimum W for 100% utilization:
  W = RTT/(L/R) + 1 = 30ms/0.008ms + 1 = 3751

Go-Back-N vs Selective Repeat:

  Feature           GBN              SR
  ─────────────────────────────────────────────
  ACK type          Cumulative       Individual
  Out-of-order pkts Discard          Buffer
  Retransmit on loss All from lost   ONLY lost pkt
  Receiver buffer   1 pkt            W packets
  Window size max   2^k - 1          2^(k-1)
  Complexity        Simple receiver  Complex receiver

GBN Example (k=3, window=7):
  Pkt 1 lost:
  Retransmit: [1][2][3] ← ALL from 1 onward

SR Example (k=3, window=4):
  Pkt 1 lost, [0][2][3] received (buffered):
  Retransmit: ONLY [1]`,
      explanation: "Pipelining is the key to high throughput. GBN is simpler to implement but wastes bandwidth on unnecessary retransmissions. SR is efficient but complex.",
    },
    examTips: [
      "Utilization formula: U = W×(L/R)/(RTT+L/R). Know this cold.",
      "To find minimum W for 100% utilization: W = RTT/(L/R) + 1 (round up)",
      "GBN window max = 2^k - 1. SR window max = 2^(k-1). SR has SMALLER max window.",
      "GBN: out-of-order = DISCARD. SR: out-of-order = BUFFER. Key difference.",
      "GBN retransmits n and ALL following. SR retransmits ONLY n.",
    ],
    questions: [
      { q: "For a 1 Gbps link with RTT = 30 ms and packet size 8000 bits, how many packets must be in flight to achieve 100% utilization?", a: "Transmission delay: L/R = 8000/10^9 = 8 μs = 0.008 ms. Number of packets to fill the pipe: W = RTT/(L/R) + 1 = 30ms/0.008ms + 1 = 3750 + 1 = 3751 packets. This means sender needs a window size of 3751 packets to keep the link fully busy." },
      { q: "Contrast Go-Back-N and Selective Repeat in terms of: (a) out-of-order packets, (b) retransmit on timeout, (c) maximum window size.", a: "(a) Out-of-order packets: GBN DISCARDS them (receiver only accepts in-order); SR BUFFERS them waiting for the missing packet. (b) On timeout for packet n: GBN retransmits packet n AND ALL subsequent packets. SR retransmits ONLY the specific timed-out packet n. (c) Maximum window size with k-bit seq#: GBN = 2^k - 1. SR = 2^(k-1). SR has a smaller max window to prevent ambiguity in distinguishing old vs new packets with the same sequence number." },
    ],
  },

  // ─── GROUP 11: PYQ Study Cards ───────────────────────────────────────────

  "pyq-calculations": {
    title: "PYQ Worked Numerical Calculations", emoji: "🧮",
    tldr: "Three fully worked PYQ calculations from ESA May 2023: (1) DNS+HTTP total time with multiple RTTs, (2) P2P vs client-server distribution time with real numbers, (3) UDP checksum binary calculation.",
    explanation: `These are the exact problems from ESA May 2023 that the JSX had formulas for but no worked examples. Master these numbers.

Problem 1 — DNS + HTTP Total Time (ESA May 2023 Q2b):
Given:
- RTT₀ = 5ms (client → local DNS)
- RTT₁ = 21ms (local DNS → root server)
- RTT₂ = 13ms (local DNS → TLD server)
- RTT₃ = 49ms (local DNS → authoritative server)

Part (a): DNS total time = RTT₀ + RTT₁ + RTT₂ + RTT₃ (iterated query, all sequential)
= 5 + 21 + 13 + 49 = 88ms

Then HTTP request to get the base HTML:
- HTTP uses non-persistent connection → 2 RTT needed
- RTT₀ = 5ms (client to web server)
- HTTP time = 2 × 5ms = 10ms... wait.

Actually: the HTTP RTT in this problem is given separately. Let's say RTT for HTTP = 1ms (client to server — server is nearby after DNS resolution).
HTTP for base HTML = 2 × 1ms = 2ms
Total for base HTML: DNS (88ms) + HTTP (2ms) = 90ms

Part (b): 3 additional objects (non-persistent):
3 objects × 2 RTT each = 3 × 2 × 1ms = 6ms
Total: 88 + 2 + 6 = 96ms

Problem 2 — P2P Distribution Time (ESA May 2023 Q2a):
F = 10 Gbits, N = 5 peers
Server upload: us = 84 Mbps
Peer upload rates: u₁=10, u₂=12, u₃=11, u₄=27, u₅=20 Mbps → Σui = 80 Mbps
Peer download rates: d₁=24, d₂=18, d₃=27, d₄=12, d₅=37 → dmin = 12 Mbps

Client-Server:
D(c-s) ≥ max{ NF/us, F/dmin }
= max{ 5×10Gb/84Mbps, 10Gb/12Mbps }
= max{ 595s, 833s } = 833 seconds

P2P:
D(P2P) ≥ max{ F/us, F/dmin, NF/(us+Σui) }
= max{ 10Gb/84Mbps, 10Gb/12Mbps, 5×10Gb/(84+80)Mbps }
= max{ 119s, 833s, 305s } = 833 seconds

Both are bounded by dmin here — the slowest peer's download rate dominates.

Problem 3 — UDP Checksum (ESA May 2023 Q3b):
Covered in udp-segment card with exact numbers.`,
    keyPoints: [
      "DNS iterated query time = sum of all RTTs (each hop is sequential)",
      "HTTP non-persistent for each object = 2 × RTT_to_server + transmission time",
      "For DNS+HTTP total: DNS time + 2RTT (base HTML) + N×2RTT (N additional objects)",
      "P2P distribution: compute all 3 terms of max{F/us, F/dmin, NF/(us+Σui)}",
      "Client-server: compute both NF/us and F/dmin — take the max",
      "dmin = minimum download rate among all peers — often the binding constraint",
      "UDP checksum: add 16-bit words, wrap carry, flip bits (one's complement)",
      "Verify checksum: sum all words including checksum → all 1s = no error",
    ],
    formula: {
      code: `PROBLEM 1 — DNS + HTTP Total Time (ESA May 2023 Q2b):

Given: RTT₀=5ms, RTT₁=21ms, RTT₂=13ms, RTT₃=49ms
       HTTP_RTT = 1ms (to web server), L/R = 0 (assume tiny objects)

DNS iterated query:
  RTT₀ + RTT₁ + RTT₂ + RTT₃ = 5 + 21 + 13 + 49 = 88ms

HTTP base HTML (non-persistent):
  2 × HTTP_RTT = 2 × 1 = 2ms

Total for base HTML: 88 + 2 = 90ms

3 additional objects:
  3 × 2 × HTTP_RTT = 3 × 2 = 6ms

TOTAL: 88 + 2 + 6 = 96ms

─────────────────────────────────────────────

PROBLEM 2 — P2P vs C-S (ESA May 2023 Q2a):

F = 10 Gbits = 10,000 Mbits
N = 5, us = 84 Mbps
Peer uploads: 10+12+11+27+20 = 80 Mbps (Σui)
dmin = 12 Mbps (peer 4 has lowest download)

CLIENT-SERVER:
  NF/us = (5 × 10,000)/84 = 50,000/84 ≈ 595 s
  F/dmin = 10,000/12 ≈ 833 s
  D(c-s) = max{595, 833} = 833 seconds

P2P:
  F/us = 10,000/84 ≈ 119 s
  F/dmin = 10,000/12 ≈ 833 s
  NF/(us+Σui) = 50,000/(84+80) = 50,000/164 ≈ 305 s
  D(P2P) = max{119, 833, 305} = 833 seconds

Both bounded by the slow downloader (dmin=12 Mbps peer)

─────────────────────────────────────────────

PROBLEM 3 — UDP Checksum (ESA May 2023 Q3b):

Word 1: 0111 1011 1101 0000
Word 2: 1100 0011 1110 1011
──────────────────────────────────────────────
Sum:  1 0011 1111 1011 1011  (17 bits, carry=1)
Wrap: 0011 1111 1011 1011
    + 0000 0000 0000 0001
    = 0011 1111 1011 1100
Flip: 1100 0000 0100 0011  ← CHECKSUM`,
      explanation: "Always compute all three terms of the P2P max formula and show your work. DNS time is the sum of all sequential RTTs in iterated query. For HTTP, count 2 RTTs per non-persistent object.",
    },
    examTips: [
      "Show all three max{} terms for P2P — don't just write the answer",
      "For DNS time: add ALL RTTs sequentially (root + TLD + authoritative + local)",
      "For HTTP: each non-persistent object costs 2 RTTs — be explicit",
      "UDP checksum: show the binary addition, carry, wraparound, and complement steps",
      "Units: convert Gbits/Gbps carefully — 10 Gb / 84 Mbps = 10,000 Mb / 84 Mb/s",
      "dmin = minimum DOWNLOAD rate. us = server UPLOAD rate. Don't confuse.",
    ],
    questions: [
      { q: "In the DNS+HTTP problem, why is DNS time calculated as a sum of RTTs rather than taking the maximum?", a: "In an iterated DNS query, each step is sequential — the local DNS server must receive a response from one level before it can query the next. First it contacts the root server (RTT₁), waits for response, then contacts the TLD server (RTT₂), waits, then contacts the authoritative server (RTT₃). Each step must complete before the next begins. So DNS time = RTT₀ + RTT₁ + RTT₂ + RTT₃ (sum, not max). By contrast, if queries were parallel (not the case in iterated DNS), you'd take the maximum. The sequential nature of iterated query means every RTT adds to the total." },
      { q: "In the P2P problem, both D(c-s) and D(P2P) give the same answer (833s). Explain why and what determines this bound.", a: "Both are 833 seconds because both are bounded by the same term: F/dmin = 10,000/12 ≈ 833s. This term appears in BOTH formulas. F/dmin represents the time needed by the slowest peer (dmin = 12 Mbps) to download the complete file. This slowest peer is the bottleneck — no matter how fast the server or other peers upload, the slowest peer cannot receive faster than its download rate. In this particular problem, the download bottleneck dominates both protocols. P2P's advantage shows when the server upload (NF/us) is the bottleneck in client-server but P2P's aggregate upload reduces that term." },
    ],
  },

  "pyq-frequency": {
    title: "PYQ Frequency Table & Exam Priority", emoji: "📊",
    tldr: "DNS: 6 papers, 4-10 marks. Multiplexing: 5 papers. HTTP: 4 papers. HTTPS/TLS: 3 papers, 6-7 marks each. Study in this priority order to maximize marks per hour.",
    explanation: `Based on the analysis of past PYQ papers (from Notion notes), here is the frequency of each topic appearing in exams, ranked by priority.

Priority Tier 1 — Must Master (Highest Frequency):

DNS (6 papers, 4-10 marks each):
- DNS hierarchy, iterative vs recursive
- DNS record types (A, NS, CNAME, MX)
- DNS resolution timing calculations
- DNS zone vs domain
- Wireshark DNS analysis

Multiplexing/Demultiplexing (5 papers, 5-7 marks each):
- UDP 2-tuple vs TCP 4-tuple
- How OS routes segments to correct socket
- Browser tab PYQ scenario

HTTP (4 papers, 4-6 marks each):
- Persistent vs non-persistent, RTT calculations
- HTTP/2 and HOL blocking
- Status codes: 200, 301, 304, 400, 404, 505

Priority Tier 2 — High Value:

HTTPS/TLS Handshake (3 papers, 6-7 marks each):
- The TLS handshake steps in order
- What TLS provides (encryption, auth, integrity)
- Port 443, TLS at app layer

UDP Checksum Calculation (3 papers, 5-6 marks):
- Binary addition with wraparound
- One's complement
- The exact ESA May 2023 Q3b problem

RDT protocols (3 papers, 5-8 marks):
- rdt3.0 scenarios (all 4)
- GBN vs SR comparison
- Pipelining utilization formula

Priority Tier 3 — Medium Priority:

P2P file distribution (2-3 papers):
- D(c-s) and D(P2P) formulas and calculations
- BitTorrent tit-for-tat mechanism

SMTP / Email (2 papers):
- SMTP push vs HTTP pull
- POP3 vs IMAP comparison

Socket Programming (2 papers):
- UDP vs TCP socket differences
- The persistent connection socket PYQ

DHCP / SNMP (2 papers):
- DORA process
- Why UDP for DHCP

Priority Tier 4 — Lower Priority:
- DASH/Video streaming (emerging topic, 1-2 papers)
- CDN concepts (1 paper)
- FTP dual connections`,
    keyPoints: [
      "DNS = #1 most tested topic — 6 papers, up to 10 marks each",
      "Multiplexing/demux = #2 — 5 papers — always includes a scenario question",
      "HTTP = #3 — persistent vs non-persistent timing, status codes",
      "HTTPS/TLS = high marks per appearance (6-7 marks) — 3 papers",
      "UDP checksum = calculation appears verbatim — memorize the ESA May 2023 problem",
      "RDT (rdt3.0 scenarios + pipelining) = consistent 5-8 marks",
      "P2P formulas = medium priority but numerical — practice the D(P2P) calculation",
      "Socket programming = 2 papers — focus on the persistent connection socket PYQ",
      "DASH/CDN = emerging, lower priority but growing",
    ],
    formula: {
      code: `PYQ Frequency Table (sorted by priority):

  Topic                    # Papers  Typical Marks  Priority
  ──────────────────────────────────────────────────────────
  DNS (hierarchy, records) 6         4-10            ★★★★★
  Multiplexing/Demux       5         5-7             ★★★★★
  HTTP (persistent/NPH)    4         4-6             ★★★★
  HTTPS/TLS handshake      3         6-7             ★★★★
  UDP checksum calc        3         5-6             ★★★★
  RDT 2.0/2.1/3.0          3         5-8             ★★★★
  Pipelining (GBN/SR)      3         5-7             ★★★
  P2P file distribution    2-3       5-7             ★★★
  BitTorrent (tit-for-tat) 2         4-5             ★★★
  Socket programming       2         5-7             ★★★
  SMTP/email               2         3-5             ★★
  DHCP DORA                2         4-5             ★★
  SNMP/FTP                 1-2       3-5             ★★
  DASH/Video streaming     1-2       4-5             ★★
  CDN (Enter Deep/Bring)   1         4-5             ★

High-value PYQ questions (must practice):
  • DNS+HTTP timing calculation (ESA May 2023 Q2b)
  • P2P vs C-S calculation (ESA May 2023 Q2a)
  • UDP checksum binary (ESA May 2023 Q3b)
  • Browser tab demux scenario (ESA Jan-May 2024)
  • Persistent socket PYQ (ESA July 2023)
  • rdt3.0 premature timeout walkthrough
  • TLS handshake step-by-step`,
      explanation: "Study in priority order. DNS and mux/demux are the highest-ROI topics. HTTPS/TLS gives the best marks-per-appearance ratio. Always practice the exact PYQ calculation problems.",
    },
    examTips: [
      "Spend 40% of revision time on DNS + mux/demux — they appear most and carry most marks",
      "TLS handshake is 6-7 marks when it appears — memorize all steps in order",
      "UDP checksum: practice the binary addition until you can do it in 3 minutes",
      "Every P2P calculation question: compute all 3 terms of max{} and show work",
      "RDT: draw the 4 scenarios (normal, lost pkt, lost ACK, premature timeout)",
      "DNS timing: always add RTTs sequentially, don't try to parallelize",
    ],
    questions: [
      { q: "If you had 2 hours to study, which 4 topics should you focus on to maximize expected marks?", a: "1. DNS (30 min): Hierarchy, iterated query 8-step walkthrough, record types (A/NS/CNAME/MX), timing calculation with RTTs, zone vs domain. This appears in 6 papers for up to 10 marks. 2. Multiplexing/Demux (20 min): UDP 2-tuple vs TCP 4-tuple, the browser tab scenario, the persistent socket PYQ. Appears 5 papers, 5-7 marks. 3. HTTPS/TLS handshake (25 min): The 6-step handshake in order, what TLS provides (3 things), why it's at app layer, port 443. Appears 3 papers at 6-7 marks each — best marks-per-appearance ratio. 4. HTTP + UDP checksum calculation (45 min): Persistent vs non-persistent timing formula, status codes, AND the binary checksum calculation. Both have direct numerical PYQ problems." },
    ],
  },

};
