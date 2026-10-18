import { Phase } from '@/types/curriculum';

export const phase0: Phase = {
  phase: 0,
  title: 'Start Here: Digital & Developer Foundations',
  subtitle: 'How the web works, the developer mindset, and your command center.',
  description:
    'Before writing a single line of code, learn how computers, browsers, servers, DNS, and networks collaborate to deliver modern web experiences.',
  modules: [
    {
      id: 'mod-01-web-anatomy',
      slug: 'foundations-web-architecture',
      title: 'How Websites & the Internet Work',
      phase: 0,
      phaseTitle: 'Phase 0 — Developer Foundations',
      description: 'Demystify the journey of a website: from pressing Enter in your browser to DNS lookups, TCP/IP packets, and server responses.',
      estimatedHours: 4,
      outcomes: [
        'Explain the client-server architecture in plain English',
        'Understand DNS, IP addresses, and HTTP request-response cycles',
        'Know the distinct roles of HTML, CSS, JavaScript, backend servers, and databases',
      ],
      prerequisites: ['No prior programming knowledge required'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-01',
        moduleId: 'mod-01-web-anatomy',
        title: 'Web Foundations Checkpoint',
        description: 'Test your understanding of the internet request-response cycle and full-stack architecture.',
        passingScore: 75,
        questions: [
          {
            id: 'q0-1',
            question: 'What is the primary role of the Domain Name System (DNS)?',
            options: [
              'To translate human-friendly domain names into computer IP addresses',
              'To store user passwords securely in a database',
              'To render CSS styles on mobile screens',
              'To compile JavaScript into machine code',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! DNS translates domain names like stackpath.academy into numeric IP addresses like 192.0.2.1.',
              1: 'Incorrect. Password storage is handled by application databases, not DNS.',
              2: 'Incorrect. Rendering CSS is done inside the browser rendering engine.',
              3: 'Incorrect. JavaScript compilation is done by the browser V8/SpiderMonkey engine.',
            },
          },
          {
            id: 'q0-2',
            question: 'In the client-server model, what is the role of the client?',
            options: [
              'The server that runs PostgreSQL database queries',
              'The user device and browser that requests and renders web pages',
              'The cable company providing fiber optic internet',
              'The domain registrar company selling website names',
            ],
            correctIndex: 1,
            explanations: {
              0: 'Incorrect. Running database queries is a server-side responsibility.',
              1: 'Correct! The client is the user-facing device and software (like Chrome or Safari on your phone or laptop) that requests information and displays it.',
              2: 'Incorrect. The cable company is the Internet Service Provider (ISP).',
              3: 'Incorrect. The domain registrar manages domain name ownership.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-01-fullstack-meaning',
          slug: 'what-full-stack-means',
          title: 'What Full-Stack Development Actually Means',
          moduleSlug: 'foundations-web-architecture',
          moduleTitle: 'How Websites & the Internet Work',
          phase: 0,
          phaseTitle: 'Phase 0 — Developer Foundations',
          readingTimeMinutes: 8,
          objective: 'Understand the big picture of web engineering: the Frontend, the Backend, the Database, and how they communicate.',
          whyItMatters:
            'Many beginners get overwhelmed because they try to learn tools in isolation. When you understand the three core layers of an application, every new language or framework will have a clear, logical place in your mental map.',
          prerequisites: ['Curiosity and an open mind'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Restaurant Analogy of Full-Stack Architecture',
              content:
                'Think of a full-stack web application like a bustling restaurant:\n\n1. **The Dining Room (The Frontend / Client)**: This is what the customer sees and touches. The table, the decor, the lighting, the printed menu, and the ordering interaction. In web terms, this is HTML (the menu text), CSS (the beautiful decor and colors), and JavaScript (the interactive order pad).\n\n2. **The Kitchen (The Backend / Server)**: Customers do not walk into the kitchen. The chef receives the order ticket, checks recipes, enforces safety standards (you can\'t order raw chicken), and prepares the meal. In code, the backend runs on a server (e.g. Node.js or Python) where confidential business logic lives.\n\n3. **The Pantry & Refrigerator (The Database)**: The kitchen doesn\'t invent ingredients out of thin air; it pulls fresh vegetables and meat from organized shelves. The database (like PostgreSQL) stores structured information permanently—user profiles, past orders, and product inventories.',
              diagramId: 'diagram-client-server-pantry',
            },
            {
              id: 'sec-2',
              title: 'The Three Building Blocks of Every Web Page',
              content:
                'Every single website you have ever visited—from YouTube to Wikipedia—is delivered to your browser as three text files:\n\n- **HTML (Structure)**: Gives raw meaning and content to the page: headings, paragraphs, images, and buttons.\n- **CSS (Presentation)**: Dictates how the structure looks: colors, spacing, typography, grid layouts, and dark mode.\n- **JavaScript (Behavior)**: Makes the page interactive and alive: dropdown menus, live form validation, fetching live data without refreshing the page.',
              codeExample: {
                language: 'html',
                filename: 'anatomy.html',
                code: `<!-- 1. HTML: Raw Structure -->
<button id="like-btn">❤️ Like (0)</button>

<!-- 2. CSS: Presentation -->
<style>
  #like-btn {
    background: #4f46e5;
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
</style>

<!-- 3. JavaScript: Behavior -->
<script>
  let count = 0;
  const btn = document.getElementById('like-btn');
  btn.addEventListener('click', () => {
    count++;
    btn.textContent = \`❤️ Like (\${count})\`;
  });
</script>`,
                annotations: [
                  { line: 2, comment: 'HTML creates the clickable button element' },
                  { line: 6, comment: 'CSS styles the button with an indigo background and rounded corners' },
                  { line: 19, comment: 'JavaScript listens for clicks and updates the counter dynamically' },
                ],
              },
              callout: {
                type: 'mistake',
                title: 'Beginner Trap: Memorizing Syntax Instead of Systems',
                text: 'Do not try to memorize every HTML tag or CSS property. Professional engineers reference documentation every single day. Your goal is to understand what layer handles what responsibility.',
              },
            },
          ],
          recap: [
            'Frontend is everything running in the user’s browser (HTML, CSS, JS).',
            'Backend is business logic and security running on a remote server.',
            'Database is the persistent storage layer holding structured records.',
            'Full-stack engineers know how to bridge all three layers together into a cohesive product.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-1',
              question: 'If a user clicks a button and a pop-up appears on screen without contacting the server, which layer handled it?',
              options: ['The Database', 'The Frontend (JavaScript)', 'The Server Operating System', 'The DNS Resolver'],
              correctIndex: 1,
              explanation: 'Interactive UI behavior on the user’s screen is handled directly by client-side JavaScript in the browser.',
            },
          ],
          practicalTask: {
            title: 'Explore the Three Layers in Your Browser',
            instruction: 'Right click anywhere on this web page and select "Inspect" (or press Ctrl+Shift+I / Cmd+Option+I) to open Chrome/Edge Developer Tools. Click the "Elements" tab to view the live HTML DOM tree.',
            hints: ['Look for tags like <header>, <main>, and <button>.', 'Click the small arrow next to an element to expand its children.'],
            expectedOutcome: 'You can see the raw HTML tags and CSS styles powering this live platform.',
          },
          glossaryTerms: ['dns', 'http', 'dom', 'rest-api'],
        },
        {
          id: 'les-02-how-browsers-work',
          slug: 'how-the-browser-gets-pages',
          title: 'How the Browser Fetches and Displays Web Pages',
          moduleSlug: 'foundations-web-architecture',
          moduleTitle: 'How Websites & the Internet Work',
          phase: 0,
          phaseTitle: 'Phase 0 — Developer Foundations',
          readingTimeMinutes: 10,
          objective: 'Trace the exact step-by-step lifecycle of an HTTP request from pressing Enter to rendering pixels.',
          whyItMatters:
            'Understanding the request-response cycle and the browser rendering path makes you 10x better at debugging slow pages, failed network calls, and caching issues.',
          prerequisites: ['What Full-Stack Development Actually Means'],
          sections: [
            {
              id: 'sec-1',
              title: 'Step 1: Finding the Server (DNS Lookup)',
              content:
                'When you type "https://developer.mozilla.org" into your browser:\n\n1. The browser checks its local cache: "Have I visited this site recently?"\n2. If not, it asks your router and your Internet Service Provider\'s recursive DNS server.\n3. The DNS server replies with an IP address, like 143.204.214.114. The IP address is the physical location of the server on the global internet network.',
            },
            {
              id: 'sec-2',
              title: 'Step 2: The HTTP Request and Response',
              content:
                'Once the browser has the IP address, it connects via TCP and TLS (encryption) and sends an HTTP GET request:\n\n```http\nGET /en-US/docs/Web HTTP/1.1\nHost: developer.mozilla.org\nUser-Agent: Chrome/120.0\nAccept: text/html\n```\n\nThe server receives the request, processes it, and responds with a status code and payload:\n\n```http\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\n\n<!DOCTYPE html>\n<html>...</html>\n```',
              callout: {
                type: 'tip',
                title: 'HTTP Status Code Cheat Sheet',
                text: '2xx means "Success!" (200 OK, 201 Created). 3xx means "Go look over there" (301 Moved). 4xx means "You made a mistake" (400 Bad Request, 404 Not Found). 5xx means "The server crashed" (500 Internal Error).',
              },
            },
          ],
          recap: [
            'DNS turns human domain names into machine IP addresses.',
            'HTTP requests specify an action (GET, POST) and path.',
            'Servers respond with status codes (e.g. 200 OK, 404 Not Found) and content.',
            'The browser translates HTML and CSS into pixel layouts on your screen.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-2',
              question: 'Which status code indicates that the server could not find the requested webpage file?',
              options: ['200 OK', '301 Moved Permanently', '404 Not Found', '500 Server Error'],
              correctIndex: 2,
              explanation: '404 Not Found is the universal HTTP code when the requested URL does not match any resource on the server.',
            },
          ],
          practicalTask: {
            title: 'Inspect a Real HTTP Request in DevTools',
            instruction: 'Open DevTools (F12 or Ctrl+Shift+I), click the "Network" tab, and refresh this page. Observe the files being downloaded (HTML document, CSS, JavaScript, icons) and their HTTP status codes.',
            hints: ['Filter by "Doc" to see the primary HTML request.', 'Click on the first request to inspect its Request and Response headers.'],
            expectedOutcome: 'You can inspect the Status 200, Content-Type, and size of the transfer.',
          },
          glossaryTerms: ['dns', 'http', 'rest-api'],
        },
      ],
    },
    {
      id: 'mod-02-developer-environment',
      slug: 'developer-environment-git',
      title: 'The Developer Environment, Terminal & Git',
      phase: 0,
      phaseTitle: 'Phase 0 — Developer Foundations',
      description: 'Master your developer toolbelt: the terminal command line, Node.js runtime, package managers (npm), and Git version control.',
      estimatedHours: 6,
      outcomes: [
        'Navigate files and directories using basic terminal commands',
        'Understand what Node.js is and how npm manages packages',
        'Track code revisions, branch, commit, and push to GitHub using Git',
      ],
      prerequisites: ['How Websites & the Internet Work'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-02',
        moduleId: 'mod-02-developer-environment',
        title: 'Terminal & Git Checkpoint',
        description: 'Verify your foundational command-line and version control knowledge.',
        passingScore: 75,
        questions: [
          {
            id: 'q0-3',
            question: 'What is the purpose of Git in software engineering?',
            options: [
              'To host live websites on the internet',
              'To track revisions to files over time and collaborate safely with teammates',
              'To automatically write JavaScript code for you',
              'To speed up your internet connection bandwidth',
            ],
            correctIndex: 1,
            explanations: {
              0: 'Incorrect. Hosting is handled by services like Vercel, Netlify, or AWS.',
              1: 'Correct! Git is a distributed version control system that acts like a time machine for your codebase, recording snapshots of every change.',
              2: 'Incorrect. Git is a version control tool, not an AI or code generator.',
              3: 'Incorrect. Git has nothing to do with internet bandwidth.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-03-terminal-npm',
          slug: 'terminal-and-package-managers',
          title: 'The Terminal and Package Managers (npm)',
          moduleSlug: 'developer-environment-git',
          moduleTitle: 'The Developer Environment, Terminal & Git',
          phase: 0,
          phaseTitle: 'Phase 0 — Developer Foundations',
          readingTimeMinutes: 10,
          objective: 'Feel comfortable opening and running commands in the terminal, navigating directories, and installing libraries with npm.',
          whyItMatters:
            'The terminal is the universal command center of professional engineering. You do not need to be a Linux wizard; knowing just five core commands unlocks modern web toolchains.',
          prerequisites: ['Basic computer comfort'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Five Essential Terminal Commands',
              content:
                'Instead of clicking folders with a mouse, the terminal lets you communicate with your operating system directly via text:\n\n- `pwd` (Print Working Directory): "Where am I right now?"\n- `ls` or `dir`: "Show me all files and folders here."\n- `cd <folder>`: "Change Directory — take me inside this folder."\n- `mkdir <name>`: "Make Directory — create a new folder."\n- `touch <file>` or `New-Item <file>`: "Create a new empty file."',
              callout: {
                type: 'tip',
                title: 'Pro Tip: Tab Autocompletion',
                text: 'Never type out long folder names! Type the first two letters and press the Tab key. The terminal will automatically fill in the rest.',
              },
            },
            {
              id: 'sec-2',
              title: 'What is Node.js and npm?',
              content:
                'Historically, JavaScript only ran inside web browsers. In 2009, Node.js was created, allowing JavaScript to run directly on your computer or backend servers.\n\n**npm (Node Package Manager)** is the world\'s largest registry of open-source software packages. Instead of writing date formatting or icon rendering from scratch, you run `npm install lucide-react` to safely bring vetted tools into your project.',
              codeExample: {
                language: 'bash',
                filename: 'terminal-session.sh',
                code: `# Check your Node version
node -v

# Initialize a new project with package.json
npm init -y

# Install a helpful utility
npm install date-fns`,
              },
            },
          ],
          recap: [
            'The terminal allows fast, scriptable control over your computer.',
            'Node.js runs JavaScript outside the browser.',
            'npm installs open-source libraries into a local `node_modules` folder.',
            'package.json is the manifest recording your project’s dependencies and scripts.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-3',
              question: 'Which file in a Node.js project records the list of installed third-party libraries?',
              options: ['index.html', 'package.json', 'README.md', '.gitignore'],
              correctIndex: 1,
              explanation: 'package.json lists your project dependencies under "dependencies" and "devDependencies".',
            },
          ],
          practicalTask: {
            title: 'Verify Your Node and npm Installation',
            instruction: 'Open your terminal (PowerShell or Bash) and run `node -v` and `npm -v`. Confirm that both output version numbers without errors.',
            hints: ['If command is not recognized, Node.js can be downloaded from nodejs.org.'],
            expectedOutcome: 'Terminal displays versions such as v20.x or v22.x and npm 10.x+.',
          },
          glossaryTerms: ['ci-cd', 'dns'],
        },
        {
          id: 'les-04-git-github-basics',
          slug: 'git-version-control-fundamentals',
          title: 'Git Version Control & The Debugging Mindset',
          moduleSlug: 'developer-environment-git',
          moduleTitle: 'The Developer Environment, Terminal & Git',
          phase: 0,
          phaseTitle: 'Phase 0 — Developer Foundations',
          readingTimeMinutes: 12,
          objective: 'Master Git commits, branches, and understand why debugging is a normal, daily professional skill.',
          whyItMatters:
            'Without Git, you end up with chaotic folders like "website_v2_final_FINAL_really.zip". With Git, every line of code has an audited history, and you can fearlessly experiment knowing you can undo any mistake in one second.',
          prerequisites: ['The Terminal and Package Managers'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Three Stages of Git',
              content:
                'Git organizes your work into three states:\n\n1. **Working Directory**: The active files you are editing in VS Code.\n2. **Staging Area (`git add`)**: Packing the moving box. You select exactly which file changes you want to include in this snapshot.\n3. **Repository Commit (`git commit`)**: Taping the box shut and labeling it with a clear message: "Add responsive header navigation". It is now permanently saved in the project history.',
            },
            {
              id: 'sec-2',
              title: 'Normalizing the Debugging Mindset',
              content:
                'A common misconception among beginners is: *"Senior engineers write code that works on the first try."*\n\nThis is completely false. Professional software development is 20% writing code and 80% reading, debugging, and testing. Errors are not signs of personal failure; they are the computer\'s precise, patient instructions telling you what went wrong. When an error appears:\n\n1. Take a breath: don\'t close the error window.\n2. Read the error message word for word.\n3. Note the file name and line number.\n4. Form a hypothesis: *"Did I misspell a variable name?"*\n5. Test the hypothesis with a minimal change.',
              callout: {
                type: 'tip',
                title: 'The Rule of Small Commits',
                text: 'Commit early and often! A commit should represent one small logical task. If something breaks, finding the bug across a 10-line commit is easy; finding it in a 1,000-line mega-commit is miserable.',
              },
            },
          ],
          recap: [
            'Git tracks line-by-line changes across your project.',
            'git add stages files; git commit permanently records them.',
            'GitHub is a remote cloud host for sharing and collaborating on Git repositories.',
            'Errors are feedback, not failures. Methodical debugging is the #1 skill of an engineer.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-4',
              question: 'What is the command to take staged changes and permanently record them with a description?',
              options: ['git push', 'git commit -m "Your message"', 'git checkout', 'git init'],
              correctIndex: 1,
              explanation: 'git commit -m "message" records your staged snapshot to the local repository history.',
            },
          ],
          practicalTask: {
            title: 'Simulate a Git Commit Lifecycle',
            instruction: 'In your terminal, navigate to any test directory and run `git init`, create a file `readme.txt`, stage it with `git add readme.txt`, and commit it with `git commit -m "Initial commit"`. Then run `git log` to see your commit history.',
            hints: ['git status will show you the exact state of your working directory at any moment.'],
            expectedOutcome: 'git log prints your commit hash, author name, timestamp, and message.',
          },
          glossaryTerms: ['ci-cd'],
        },
      ],
    },
  ],
};
