import { CapstoneProject } from '@/types/features';

export const capstoneProjects: CapstoneProject[] = [
  {
    id: 'capstone-1-portfolio',
    number: 1,
    title: 'Responsive Developer Portfolio',
    badge: 'Phase 1 Milestone',
    tagline: 'An accessible, high-performance personal developer website built with modern semantic HTML and CSS.',
    phaseRequired: 1,
    estimatedHours: 12,
    description:
      'Your developer portfolio is your digital handshake with recruiters, clients, and fellow engineers. In this project, you will build a clean, responsive, and fully accessible portfolio featuring your bio, featured projects, skill tags, responsive navigation, and an accessible contact form with custom validation styling.',
    features: [
      'Semantic document outline with header, main, nav, section, article, and footer',
      'Mobile-first responsive layout with custom CSS Grid and Flexbox',
      'Accessible mobile navigation drawer with keyboard trap and ESC key closing',
      'Light and Dark mode toggle using CSS custom properties',
      'Project showcase grid with live preview links, GitHub badges, and tech tags',
      'Accessible contact form with inline focus states and aria-describedby error messaging',
      '100/100 Lighthouse performance and accessibility scores',
    ],
    architectureDiagramId: 'diagram-portfolio-architecture',
    architectureDescription:
      'Client-side static delivery architecture: HTML5 Semantic Tree -> CSS Token Design System (Custom Properties) -> Responsive Media Breakpoints (320px, 768px, 1024px) -> Accessible Navigation Controller.',
    suggestedFolderStructure: `portfolio/
├── index.html          # Semantic HTML structure
├── css/
│   ├── variables.css   # Color tokens, spacing scale, font stacks
│   ├── base.css        # Reset, typography, accessibility helpers
│   ├── components.css  # Buttons, cards, drawer, badges
│   └── responsive.css  # Mobile, tablet, and desktop media queries
├── js/
│   └── app.js          # Theme switcher, mobile drawer, form validation
└── assets/
    └── images/         # Optimized WebP project previews`,
    milestones: [
      {
        id: 'm1-semantic-scaffold',
        title: 'Milestone 1: Semantic Structure & Accessibility Tree',
        description: 'Scaffold all HTML elements using strict HTML5 semantics with proper heading hierarchy (h1 through h3) and descriptive alt attributes on all media.',
        deliverable: 'Valid HTML5 document verified with the W3C validator with zero warnings.',
      },
      {
        id: 'm2-css-design-system',
        title: 'Milestone 2: Design Tokens & Typography Scale',
        description: 'Establish a custom CSS variables palette meeting WCAG AA 4.5:1 contrast ratios. Implement modular type scale and responsive fluid typography with clamp().',
        deliverable: 'variables.css with light and dark theme variables and base typography styles.',
      },
      {
        id: 'm3-responsive-layout',
        title: 'Milestone 3: Responsive Flexbox & Grid Layouts',
        description: 'Build the project showcase grid and about layout. Verify seamless rendering at 320px mobile width with zero horizontal scrollbar.',
        deliverable: 'Clean mobile, tablet, and desktop layouts with smooth responsive transitions.',
      },
      {
        id: 'm4-interactive-features',
        title: 'Milestone 4: Theme Persistence & Accessible Contact Form',
        description: 'Implement dark/light toggle using localStorage and CSS classes. Add client-side form validation with accessible error aria attributes.',
        deliverable: 'Functional theme toggle with zero flash of unstyled theme (FOUT) and working form.',
      },
      {
        id: 'm5-audit-and-deploy',
        title: 'Milestone 5: Lighthouse Audit & Deployment',
        description: 'Run Chrome Lighthouse audit, optimize image formats (convert PNG/JPEG to WebP), and deploy to GitHub Pages or Vercel.',
        deliverable: 'Live HTTPS URL with 95+ score on Performance, Accessibility, Best Practices, and SEO.',
      },
    ],
    definitionOfDone: [
      'Passes W3C HTML validator without errors',
      'No horizontal overflow at 320px viewport width',
      'Touch targets for buttons and navigation links are at least 44x44px',
      'Keyboard navigable: Tab, Shift+Tab, and Enter/Space work predictably with visible focus rings',
      'Lighthouse score >= 95 across all 4 categories',
      'Deployed on a public HTTPS URL with a clean README on GitHub',
    ],
    commonPitfalls: [
      'Using <div> for buttons instead of native <button> tags, which breaks keyboard accessibility',
      'Setting fixed pixel widths on parent containers, causing horizontal scrolling on mobile screens',
      'Hardcoding colors instead of CSS variables, making dark mode difficult to maintain',
      'Relying on color alone to indicate form validation errors',
    ],
    stretchGoals: [
      'Add a client-side filter button bar to sort projects by tag (e.g. JavaScript, CSS, Full-Stack)',
      'Add subtle page transitions respecting prefers-reduced-motion',
      'Add a downloadable PDF resume viewer modal',
    ],
  },
  {
    id: 'capstone-2-task-manager',
    number: 2,
    title: 'JavaScript Task & Habit Engine',
    badge: 'Phase 2 Milestone',
    tagline: 'An interactive, event-driven web application with browser persistence, filtering, and data export.',
    phaseRequired: 2,
    estimatedHours: 16,
    description:
      'Vanilla JavaScript is the foundation of modern web engineering. In this capstone, you will construct a full-featured productivity task and habit tracker from scratch without frameworks. You will master DOM manipulation, event delegation, custom event dispatching, localStorage persistence, state mutation safety, and CSV/JSON data export.',
    features: [
      'Task creation with title, priority badge (low, medium, high), due date, and category tags',
      'Inline task editing, completion checkbox toggling, and confirmation modal for deletion',
      'Filter tasks by status (All, Active, Completed) and search by keyword in real time',
      'Sort by due date, priority, or creation date',
      'LocalStorage persistence with JSON serialization and versioned migrations',
      'Data export to JSON and CSV formats, and file-upload data import with schema validation',
      'Keyboard shortcuts (e.g., Ctrl+N to open new task modal, Esc to close)',
    ],
    architectureDiagramId: 'diagram-task-manager-architecture',
    architectureDescription:
      'Model-View-Controller (MVC) Pattern: State Store (Immutable Updates & LocalStorage) <-> Controller (Event Handlers & Business Logic) <-> View Renderer (DOM Fragment Builders & Event Delegation).',
    suggestedFolderStructure: `task-manager/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── app.js          # Entry point & controller
    ├── state.js        # State store, localStorage sync, actions
    ├── render.js       # Pure DOM generation functions
    ├── storage.js      # Safe storage wrapper with fallback
    └── utils.js        # Date formatting, debounce, ID generator`,
    milestones: [
      {
        id: 'm1-state-architecture',
        title: 'Milestone 1: State Store & Storage Wrapper',
        description: 'Design the Task object schema. Create a central store with subscribe() pattern and safe localStorage parsing.',
        deliverable: 'Tested state module capable of adding, updating, and removing tasks in memory and localStorage.',
      },
      {
        id: 'm2-dom-rendering',
        title: 'Milestone 2: High-Performance DOM Rendering',
        description: 'Implement efficient DOM rendering using DocumentFragments to avoid layout thrashing. Set up event delegation on the task list container.',
        deliverable: 'Task list view that renders smoothly even with hundreds of tasks.',
      },
      {
        id: 'm3-filters-and-search',
        title: 'Milestone 3: Real-Time Search, Filtering & Sorting',
        description: 'Implement debounced search input and multi-criteria filtering (status, priority, tag) without reloading or mutating original state.',
        deliverable: 'Interactive search bar with instant query results.',
      },
      {
        id: 'm4-export-import',
        title: 'Milestone 4: JSON & CSV Data Portability',
        description: 'Build browser-native Blob downloads for exporting user tasks to JSON and CSV. Add file input reader for importing backups.',
        deliverable: 'Working export/import modal with error handling for malformed files.',
      },
    ],
    definitionOfDone: [
      'Zero console errors during all user interactions',
      'Page reload preserves all created tasks, active filters, and custom preferences',
      'XSS safe: task titles with HTML tags are safely escaped via textContent',
      'Event delegation used for dynamic list item clicks',
      'Comprehensive error handling for full localStorage quotas',
    ],
    commonPitfalls: [
      'Using innerHTML with untrusted user input, creating dangerous XSS vulnerabilities',
      'Attaching separate event listeners to every single list item instead of using event delegation on the parent',
      'Mutating state directly instead of creating copies, leading to subtle filter bugs',
    ],
    stretchGoals: [
      'Add a drag-and-drop reordering interface using the HTML5 Drag and Drop API',
      'Add recurring habit streaks that calculate consecutive active days',
    ],
  },
  {
    id: 'capstone-3-react-dashboard',
    number: 3,
    title: 'React Modular Productivity Studio',
    badge: 'Phase 4 Milestone',
    tagline: 'A component-driven React application with custom hooks, client-side routing, and external API integrations.',
    phaseRequired: 4,
    estimatedHours: 24,
    description:
      'Transition from imperative JavaScript to declarative component-driven development. In this capstone, you will architect a modular productivity dashboard featuring customizable widgets (weather, pomodoro timer, notes, markdown previewer, and daily quotes). You will master React state lifting, useReducer, custom hooks, context providers, and clean component composition.',
    features: [
      'Modular widget dashboard with toggleable visibility and draggable grid positioning',
      'Live Weather Widget consuming public weather API with geolocation and search',
      'Interactive Pomodoro Timer with audio notifications and progress ring',
      'Rich Markdown Scratchpad with live split-screen preview and word count',
      'Context-driven theme system with system preference synchronization',
      'Custom hooks for localStorage sync, API fetching with caching, and media query detection',
      'Accessible modals, dropdown menus, and toast notifications built with Radix-style primitives',
    ],
    architectureDiagramId: 'diagram-react-dashboard-architecture',
    architectureDescription:
      'Component Tree: App Root -> ThemeProvider & DashboardContext -> Grid Layout -> Independent Widget Containers (Stateful Hooks) -> Presentational UI Primitives.',
    suggestedFolderStructure: `react-dashboard/
├── src/
│   ├── components/
│   │   ├── common/       # Button, Card, Modal, Input, Badge
│   │   ├── layout/       # Sidebar, Header, WidgetGrid
│   │   └── widgets/      # WeatherWidget, TimerWidget, NotesWidget
│   ├── context/
│   │   └── DashboardContext.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useFetch.ts
│   │   └── usePomodoro.ts
│   ├── types/
│   │   └── dashboard.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── tsconfig.json`,
    milestones: [
      {
        id: 'm1-component-design-system',
        title: 'Milestone 1: UI Primitives & TypeScript Interfaces',
        description: 'Build accessible reusable UI building blocks (Button, Card, Modal, Toggle, Badge) with strict TypeScript prop types.',
        deliverable: 'Self-contained component library with zero type errors.',
      },
      {
        id: 'm2-custom-hooks',
        title: 'Milestone 2: Reusable Custom Hook Architecture',
        description: 'Implement useLocalStorage, useFetch with abort controller, and useTimer. Write unit tests to verify hook lifecycle and cleanup.',
        deliverable: 'Documented custom hooks with loading, error, and data states.',
      },
      {
        id: 'm3-widgets-and-apis',
        title: 'Milestone 3: Live Widgets & External API Integration',
        description: 'Construct the Weather, Pomodoro, and Markdown widgets. Handle network errors gracefully with retry buttons and offline notices.',
        deliverable: 'All widgets functional with informative loading skeletons and error states.',
      },
      {
        id: 'm4-performance-audit',
        title: 'Milestone 4: React Performance & Accessibility Polish',
        description: 'Use React DevTools Profiler to identify and eliminate unnecessary re-renders with React.memo and useCallback where appropriate. Verify full keyboard accessibility.',
        deliverable: 'Smooth 60fps interaction with verified keyboard focus flow throughout the dashboard.',
      },
    ],
    definitionOfDone: [
      'All widgets handle offline state and network failures gracefully',
      'No component re-renders unmounted state (zero memory leak warnings)',
      'TypeScript compiles with strict: true and zero any types',
      'Keyboard navigation works smoothly across all modals and widget controls',
    ],
    commonPitfalls: [
      'Missing cleanup functions in useEffect, causing memory leaks and interval stackups',
      'Placing all state into a single global context, causing every component to re-render on every keystroke',
      'Not aborting in-flight fetch requests when components unmount or search terms change',
    ],
    stretchGoals: [
      'Integrate Web Workers for heavy markdown parsing or timer precision in background tabs',
      'Add sound synthesis using the Web Audio API for timer alerts',
    ],
  },
  {
    id: 'capstone-4-issue-tracker',
    number: 4,
    title: 'Full-Stack Issue & Ticket Tracker',
    badge: 'Phase 7 Milestone',
    tagline: 'A multi-user full-stack issue management system with PostgreSQL, Drizzle ORM, Zod validation, and automated testing.',
    phaseRequired: 7,
    estimatedHours: 35,
    description:
      'Build a robust full-stack engineering tool: an issue and ticket tracker modeled after GitHub Issues and Linear. You will engineer a relational database schema in PostgreSQL with Drizzle ORM, implement secure Next.js Server Actions and Route Handlers, write Zod schemas for request validation, handle file attachments, and write automated Vitest tests.',
    features: [
      'Full CRUD operations for Issues, Projects, Labels, and Comments',
      'Relational data modeling with foreign keys, cascaded deletes, and database indexes',
      'Server-side pagination, multi-tag filtering, search, and sorting by priority/status',
      'Kanban board view with drag-and-drop status updates (Backlog, In Progress, Review, Done)',
      'Optimistic UI updates for instant feedback with automatic rollback on server errors',
      'Comprehensive validation pipeline using Zod on both client and server boundaries',
      'Automated integration tests verifying database queries and API route handlers',
    ],
    architectureDiagramId: 'diagram-issue-tracker-architecture',
    architectureDescription:
      'Next.js Full-Stack Architecture: Next.js Client Views <-> Server Actions / Route Handlers (Zod Validator) <-> Service Layer (Domain Logic) <-> Drizzle ORM <-> PostgreSQL (Neon Database).',
    suggestedFolderStructure: `issue-tracker/
├── src/
│   ├── app/
│   │   ├── api/issues/route.ts
│   │   ├── issues/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── board/page.tsx
│   ├── components/
│   │   ├── issues/
│   │   └── kanban/
│   ├── lib/
│   │   ├── db/
│   │   │   ├── schema.ts
│   │   │   └── index.ts
│   │   └── validation/
│   │       └── issueSchemas.ts
│   └── tests/
│       └── issues.test.ts
├── drizzle/
└── drizzle.config.ts`,
    milestones: [
      {
        id: 'm1-db-schema-and-migrations',
        title: 'Milestone 1: Relational Schema & Drizzle Setup',
        description: 'Design PostgreSQL schema for users, projects, issues, labels, and issue_comments. Run Drizzle Kit migrations.',
        deliverable: 'Tested Drizzle schema with relations, foreign keys, and indexes.',
      },
      {
        id: 'm2-api-and-validation',
        title: 'Milestone 2: Server Actions & Zod API Routes',
        description: 'Implement CRUD operations with strict Zod validation. Write unit tests for schema parsing and error messages.',
        deliverable: 'Robust backend endpoints returning standardized JSON responses and HTTP status codes.',
      },
      {
        id: 'm3-kanban-board',
        title: 'Milestone 3: Interactive Kanban & Issue Details',
        description: 'Build responsive Kanban board view with status columns. Implement issue detail page with comment threads and activity history.',
        deliverable: 'Working board with smooth status transitions and optimistic UI updates.',
      },
      {
        id: 'm4-automated-tests',
        title: 'Milestone 4: Automated Testing & CI Pipeline',
        description: 'Write integration tests covering issue creation, filter queries, and comment posting. Set up GitHub Actions CI workflow.',
        deliverable: 'Passing Vitest test suite and clean CI pipeline.',
      },
    ],
    definitionOfDone: [
      'All database mutations run inside transactions where multiple tables are affected',
      'Database indexes applied to frequently filtered columns (status, project_id, created_at)',
      'Zero unhandled server errors (every failure returns a structured JSON error response)',
      '100% test pass rate for backend route handlers and validation schemas',
    ],
    commonPitfalls: [
      'Forgetting database indexes on foreign keys, leading to full table scans as dataset grows',
      'Trusting client-submitted IDs without verifying existence or permissions on the server',
      'Not handling race conditions during simultaneous status updates',
    ],
    stretchGoals: [
      'Implement real-time updates using WebSockets or Server-Sent Events (SSE)',
      'Add Markdown rendering and @mention autocompletion in issue comment threads',
    ],
  },
  {
    id: 'capstone-5-production-saas',
    number: 5,
    title: 'Production SaaS Platform Capstone',
    badge: 'Phase 10 Capstone',
    tagline: 'An enterprise-grade, production-deployed SaaS web application with documented architecture, security auditing, and monitoring.',
    phaseRequired: 10,
    estimatedHours: 50,
    description:
      'The ultimate capstone of StackPath Academy. You will architect, build, audit, and deploy a complete production-grade SaaS application (such as an API monitoring dashboard, a developer bookmarking engine, or an automated uptime alert service). This project demonstrates mastery of every layer of the full stack: zero-trust security, resilient database architecture, caching, automated CI/CD, production observability, and complete technical documentation suitable for senior engineering interviews.',
    features: [
      'Secure authentication flow with HTTP-only cookies, session revocation, and CSRF protection',
      'Multi-tenant workspace organization with role-based access control (Owner, Editor, Viewer)',
      'Dynamic dashboard with real-time analytics charts and exportable PDF/CSV reports',
      'Stripe/LemonSqueezy webhook integration with signature verification and idempotent processing',
      'Background task execution pattern for email dispatch and scheduled metric aggregation',
      'Zero-trust security: rate limiting, content security policies (CSP), and automated SQL injection tests',
      'Production deployment on Vercel with custom domain, automated database backups, and Sentry observability',
      'Full architectural RFC document and interactive API specification',
    ],
    architectureDiagramId: 'diagram-saas-architecture',
    architectureDescription:
      'Production System Architecture: Cloudflare DNS & Edge Caching -> Vercel Serverless Edge -> Next.js App Router -> Zod Guard -> Service Layer & RBAC Validator -> Neon Postgres Serverless & Redis Cache -> External Webhook Providers.',
    suggestedFolderStructure: `production-saas/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── api/
│   │   │   ├── webhooks/stripe/
│   │   │   └── v1/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── analytics/
│   │   └── billing/
│   ├── lib/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── email/
│   │   ├── security/
│   │   └── telemetry/
│   └── types/
├── docs/
│   ├── ARCHITECTURE.md
│   └── SECURITY_AUDIT.md
└── vitest.config.ts`,
    milestones: [
      {
        id: 'm1-architecture-rfc',
        title: 'Milestone 1: Architecture RFC & System Design Document',
        description: 'Write a comprehensive Request for Comments (RFC) specifying data flow, database entity relationships, API contracts, threat models, and latency budgets.',
        deliverable: 'Complete ARCHITECTURE.md with system diagrams and threat model.',
      },
      {
        id: 'm2-core-engine',
        title: 'Milestone 2: Core Domain Logic & Secure Data Flow',
        description: 'Build backend domain services with Drizzle ORM, strict transaction isolation, and cryptographic webhook signature verification.',
        deliverable: 'Verified backend services with 100% test coverage for critical financial/access logic.',
      },
      {
        id: 'm3-frontend-studio',
        title: 'Milestone 3: Responsive Dashboard & Data Visualizations',
        description: 'Construct the client dashboard with responsive charts, data tables with virtualized scrolling, and instant search.',
        deliverable: 'Polished, responsive UI with zero layout shifts (CLS < 0.05).',
      },
      {
        id: 'm4-security-audit',
        title: 'Milestone 4: Security Audit & Penetration Testing',
        description: 'Perform automated and manual security audits: verify HTTP security headers, CORS origin validation, SQLi immunity, and rate limiting.',
        deliverable: 'SECURITY_AUDIT.md detailing test cases, mitigations, and clean scan results.',
      },
      {
        id: 'm5-production-launch',
        title: 'Milestone 5: Production Deployment & Observability',
        description: 'Deploy to Vercel with production environment variables, custom domain, SSL, Sentry error monitoring, and uptime health check route.',
        deliverable: 'Live production URL with monitoring dashboard and 99.9% uptime track record.',
      },
    ],
    definitionOfDone: [
      'Live in production on a custom domain with automated SSL/TLS',
      'All webhook endpoints verify cryptographic HMAC signatures before processing',
      'Database connection pooling configured for serverless scalability',
      'Automated CI/CD runs unit tests, type checks, and linting on every pull request',
      'Documented in a comprehensive README with architecture diagrams and local reproduction guide',
    ],
    commonPitfalls: [
      'Processing webhooks synchronously without idempotency keys, causing duplicate billing on network retries',
      'Leaking server secrets in client bundle by referencing process.env variables without NEXT_PUBLIC guards',
      'Omitting database connection pooling in serverless environments, causing connection exhaustion',
    ],
    stretchGoals: [
      'Implement multi-region database read replicas for sub-50ms international read latency',
      'Add end-to-end automated synthetic tests running every 15 minutes to monitor uptime',
    ],
  },
];
