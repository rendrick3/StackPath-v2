import { InterviewQuestion } from '@/types/features';

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 'int-1-browser-url',
    category: 'frontend',
    level: 'junior',
    question: 'What actually happens when you type a URL into a browser address bar and press Enter?',
    whyAsked:
      'Interviewers ask this classic question to gauge your mental model of the entire web stack: DNS, networking, server processing, and browser rendering.',
    simpleExplanation:
      'Imagine sending a letter to an address: first you look up the person\'s physical house number in a phone book (DNS), the postal service drives the letter along the highway (TCP/IP), the recipient opens the letter and writes a reply (Server processing), and finally you unpack the contents and arrange the items on your desk (Browser rendering the HTML, CSS, and JS).',
    structuredAnswer: {
      coreConcept:
        'The process spans four key stages: 1) URL parsing and DNS resolution, 2) TCP three-way handshake and TLS negotiation, 3) HTTP Request and Server Response, and 4) Browser Critical Rendering Path (DOM, CSSOM, Render Tree, Layout, Paint).',
      practicalExample:
        'When entering https://example.com: the browser checks local DNS cache, then queries recursive resolvers to obtain an IP. A TLS session is established over TCP port 443. The browser sends a GET request. The server returns HTML with a 200 OK status. The browser parser streams HTML into a DOM tree, fetches linked CSS and scripts, computes the layout geometry, and paints pixels to the screen.',
      tradeoffsOrEdgeCases:
        'Modern optimizations include HTTP/2 or HTTP/3 multiplexing, DNS prefetching, Content Delivery Networks (CDNs) serving cached assets from edge servers close to the user, and server-side rendering (SSR) to accelerate the First Contentful Paint (FCP).',
    },
    followUpQuestions: [
      'What is the difference between TCP and UDP?',
      'How does HTTP/2 multiplexing differ from HTTP/1.1 keep-alive?',
      'What happens if a <script> tag is placed in the <head> without async or defer?',
    ],
    proTips: [
      'Structure your response sequentially from network layer to rendering layer.',
      'Explicitly mention the Critical Rendering Path: DOM -> CSSOM -> Render Tree -> Layout -> Paint.',
    ],
  },
  {
    id: 'int-2-react-state-batching',
    category: 'frontend',
    level: 'junior',
    question: 'How does React handle state updates, and why should you avoid mutating state directly?',
    whyAsked:
      'To test whether you understand React’s reconciliation engine, immutability, and asynchronous automatic batching rather than treating React like imperative DOM scripting.',
    simpleExplanation:
      'Imagine writing an order on a restaurant notepad. If you secretly scribble over the old chef’s copy directly, the chef doesn’t notice you changed it and cooks the old meal. When you use the official setState function, you ring the order bell so the kitchen knows to cook a fresh plate.',
    structuredAnswer: {
      coreConcept:
        'React state is treated as immutable snapshot data. React schedules updates and compares old state references with new state references (Object.is) to decide if a re-render is necessary. Direct mutations do not change object references, leading to missed renders and unpredictable state synchronization.',
      practicalExample:
        'If you do items.push(newItem) and then setItems(items), React sees the same array memory address and may skip rendering. Instead, use setItems([...items, newItem]). In React 18+, updates inside event handlers, promises, and timeouts are automatically batched together into a single re-render.',
      tradeoffsOrEdgeCases:
        'When next state depends on current state (like a counter incrementing multiple times in a loop), always pass an updater function: setCount((prev) => prev + 1) to avoid stale closures.',
    },
    followUpQuestions: [
      'What is the Virtual DOM and does modern React still rely heavily on it?',
      'When should you use useReducer instead of useState?',
      'How does the new React Compiler change memoization practices?',
    ],
    proTips: [
      'Mention that immutability enables predictable time-travel debugging and performance optimizations like React.memo.',
    ],
  },
  {
    id: 'int-3-rest-vs-rpc',
    category: 'apis',
    level: 'junior',
    question: 'What are the core principles of a RESTful API, and how do you choose appropriate HTTP status codes?',
    whyAsked:
      'Demonstrates your understanding of standard API contracts, idempotency, and professional backend conventions.',
    simpleExplanation:
      'A REST API is like a standard filing cabinet where every folder has a clear label (URL) and you only use four standard actions: Read (GET), Create (POST), Replace (PUT), or Delete (DELETE). The status code is the stamped receipt telling the customer whether the filing succeeded (200), was created (201), had bad input (400), wasn\'t allowed (401/403), was missing (404), or if the server crashed (500).',
    structuredAnswer: {
      coreConcept:
        'REST relies on stateless communication, resource-oriented URIs using nouns (/api/projects, /api/projects/:id), standard HTTP methods, and conventional status codes grouped by hundreds: 2xx success, 3xx redirection, 4xx client errors, and 5xx server errors.',
      practicalExample:
        'Creating an issue: POST /api/issues -> returns 201 Created with the created object. Reading: GET /api/issues/42 -> returns 200 OK. Invalid title: returns 400 Bad Request with validation errors. Missing token: returns 401 Unauthorized. Accessing another tenant\'s data: returns 403 Forbidden.',
      tradeoffsOrEdgeCases:
        'PUT is idempotent and replaces the entire resource; PATCH updates a partial subset of fields. POST is not idempotent. Avoid returning 200 OK with an { error: true } payload; use real HTTP error status codes so reverse proxies, CDNs, and client libraries can react appropriately.',
    },
    followUpQuestions: [
      'What is the difference between 401 Unauthorized and 403 Forbidden?',
      'How do you design pagination for large collections (offset vs cursor)?',
    ],
    proTips: [
      'Remember: 401 means "Who are you? (Authentication missing/invalid)", whereas 403 means "I know who you are, but you are not allowed in (Authorization failed)".',
    ],
  },
  {
    id: 'int-4-sql-indexing',
    category: 'databases',
    level: 'junior',
    question: 'How do database indexes work, and what are the tradeoffs of adding them?',
    whyAsked:
      'Checks whether you understand relational database query performance beyond basic SQL syntax.',
    simpleExplanation:
      'Think of a thick textbook. If you want to find every mention of "closure", without an index you would have to read every single page from cover to cover (a full table scan). With the index at the back of the book, you look up "closure" in alphabetical order in 2 seconds. The catch? Printing the index takes up extra pages in the book, and every time the author edits a chapter, they must update the index too.',
    structuredAnswer: {
      coreConcept:
        'An index is an auxiliary data structure (typically a B-Tree) that maintains sorted pointers to table rows. It reduces lookup time from O(N) full table scans to O(log N) tree traversals for queries with WHERE, JOIN, and ORDER BY clauses.',
      practicalExample:
        'In an issues table with 1,000,000 rows, SELECT * FROM issues WHERE user_id = 42 without an index inspects 1,000,000 rows (~450ms). Adding CREATE INDEX idx_issues_user_id ON issues(user_id) allows PostgreSQL to seek directly to the matching rows in under 2ms.',
      tradeoffsOrEdgeCases:
        'Tradeoffs: Indexes consume disk memory and slow down INSERT, UPDATE, and DELETE operations because the database must update both the table and its associated B-Trees. Only index columns with high selectivity and frequent query usage.',
    },
    followUpQuestions: [
      'What is the difference between a clustered index and a non-clustered index?',
      'How does EXPLAIN ANALYZE help diagnose slow queries?',
    ],
    proTips: [
      'Always mention that foreign key columns should almost always be indexed in relational databases.',
    ],
  },
  {
    id: 'int-5-security-xss-csrf',
    category: 'debugging',
    level: 'junior',
    question: 'What is Cross-Site Scripting (XSS), and how do modern web applications prevent it?',
    whyAsked:
      'Tests whether you write code with security awareness and understand browser security boundaries.',
    simpleExplanation:
      'XSS is when a malicious user submits a comment containing <script>stealCookies()</script>. If your website displays that comment directly on screen without checking it, another visitor\'s browser runs that malicious script thinking it came from you. The attacker can then steal login tokens or hijack the account.',
    structuredAnswer: {
      coreConcept:
        'XSS happens when untrusted user input is injected into the DOM without proper escaping or sanitization, allowing arbitrary JavaScript execution in the victim\'s origin context.',
      practicalExample:
        'Prevention involves: 1) Context-aware output encoding (React automatically escapes strings inside JSX {userInput}), 2) Never using innerHTML or dangerouslySetInnerHTML with unsanitized data, 3) Storing session tokens in HttpOnly cookies so JavaScript cannot read them via document.cookie, and 4) Enforcing a strict Content Security Policy (CSP) header.',
      tradeoffsOrEdgeCases:
        'Stored XSS (saved in database) is the most dangerous; Reflected XSS is passed via URL query strings; DOM-based XSS occurs directly in client scripts via eval(), setTimeout(string), or location.href = untrustedUrl.',
    },
    followUpQuestions: [
      'How does CSRF (Cross-Site Request Forgery) differ from XSS?',
      'Why does the Same-Origin Policy (SOP) not prevent XSS?',
    ],
    proTips: [
      'Emphasize defense-in-depth: framework auto-escaping + HttpOnly cookies + Content Security Policy.',
    ],
  },
  {
    id: 'int-6-behavioral-debugging-incident',
    category: 'behavioral',
    level: 'junior',
    question: 'Tell me about a time when you encountered a difficult bug or production issue. How did you diagnose and solve it?',
    whyAsked:
      'Assesses your methodical problem-solving ability, resilience under pressure, and how you communicate technical challenges using the STAR method (Situation, Task, Action, Result).',
    simpleExplanation:
      'Instead of guessing or panic-clicking, a good engineer stays calm, reproduces the issue consistently, isolates variables one by one, verifies the root cause with evidence, applies a minimal fix, tests thoroughly, and documents the takeaway so it never happens again.',
    structuredAnswer: {
      coreConcept:
        'Structure your story using the STAR framework: Situation (the project and bug context), Task (your specific responsibility), Action (systematic debugging steps taken), and Result (the fix, metrics, and preventative post-mortem).',
      practicalExample:
        'Situation: During the issue tracker deployment, users reported that saving comments occasionally failed with a 500 error. Task: I was responsible for diagnosing the intermittent failure. Action: I reproduced the error by examining server logs, which showed a foreign-key constraint violation when issue IDs had trailing whitespace. I traced it to an un-trimmed query parameter. I added a Zod .trim() transformer, wrote an automated test case with trailing whitespace, and verified the fix. Result: Zero subsequent 500 errors, and I added a team guideline for input trimming.',
      tradeoffsOrEdgeCases:
        'Never blame teammates or third-party tools. Highlight your curiosity, methodical hypothesis testing, and focus on long-term preventative fixes.',
    },
    followUpQuestions: [
      'How do you handle disagreement with a senior engineer on the best solution?',
      'What do you do if you are blocked on a task for several hours?',
    ],
    proTips: [
      'Keep the story concise: 2 to 3 minutes. Focus 60% of the time on your Actions and Results.',
    ],
  },
  {
    id: 'int-7-system-design-tinyurl',
    category: 'system-design',
    level: 'junior',
    question: 'How would you design a basic URL Shortener service (like bit.ly)?',
    whyAsked:
      'Tests your ability to think about system requirements, API design, database schemas, and scalability tradeoffs.',
    simpleExplanation:
      'The service does two simple things: 1) Takes a long URL (https://verylongsite.com/deep/page), generates a short 7-letter code (e.g. 7k2x9m), and saves the pair in a database. 2) When someone visits https://short.io/7k2x9m, the server looks up the long URL and redirects them with an HTTP 301 or 302 redirect.',
    structuredAnswer: {
      coreConcept:
        'Break down the problem into: Functional requirements (shorten URL, redirect, custom alias), Non-functional requirements (high read-to-write ratio, low redirect latency, 99.99% availability), Data model, and Encoding strategy.',
      practicalExample:
        'Use Base62 encoding [a-zA-Z0-9]. A 7-character string in Base62 provides 62^7 = 3.5 trillion unique combinations. Database schema: id (bigint primary key), short_code (varchar(7) unique index), original_url (text), created_at (timestamp). Read requests are cached in Redis to achieve sub-10ms redirect latency.',
      tradeoffsOrEdgeCases:
        'Tradeoff between HTTP 301 Permanent Redirect (browser caches redirect, saving server load but preventing analytics tracking) vs HTTP 302 Found (browser asks server every time, allowing accurate click analytics at the cost of higher server traffic).',
    },
    followUpQuestions: [
      'How would you handle hash collisions if using an MD5 hash instead of auto-incrementing ID?',
      'What happens if the Redis cache runs out of memory (cache eviction policies)?',
    ],
    proTips: [
      'Always start by clarifying requirements and estimating scale before jumping into drawing diagrams.',
    ],
  },
  {
    id: 'int-8-deployment-ci-cd',
    category: 'deployment',
    level: 'junior',
    question: 'What is the role of CI/CD in modern software development, and what checks should run before deployment?',
    whyAsked:
      'Verifies that you know how software transitions reliably from local development to production without breaking live users.',
    simpleExplanation:
      'CI/CD is like an automated quality control inspector. Every time an engineer submits a code change (Pull Request), automated robots immediately run tests, check formatting, and verify that the app builds cleanly. If all checks pass, the robot can safely deploy the new version to the server automatically.',
    structuredAnswer: {
      coreConcept:
        'Continuous Integration (CI) merges developer code into a shared mainline frequently, running automated linting, type-checking, and tests. Continuous Deployment (CD) automatically releases validated code to production or staging environments.',
      practicalExample:
        'In GitHub Actions: 1) npm run lint (ESLint), 2) npm run type-check (tsc --noEmit), 3) npm run test (Vitest unit tests), 4) npm run build (Next.js production bundle verification), and 5) Playwright smoke tests against preview deployment. Only when all 5 pass is the PR merged to main and deployed to Vercel.',
      tradeoffsOrEdgeCases:
        'Preview deployments (like Vercel per-branch URLs) allow designers and product managers to test live features in isolation before merging. Database migrations must be backwards-compatible so older running instances do not crash during zero-downtime rollouts.',
    },
    followUpQuestions: [
      'What is blue-green deployment versus rolling deployment?',
      'How do you safely roll back a broken production deployment?',
    ],
    proTips: [
      'Explain that automated CI prevents the classic "It worked on my machine!" problem.',
    ],
  },
];
