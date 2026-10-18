# StackPath Academy

> **A polished, production-ready, single-user full-stack engineering platform.**  
> Takes a complete beginner from zero programming knowledge to designing, building, testing, deploying, and interviewing for modern full-stack web applications.

---

## 🌟 Product Mission & Architecture

StackPath is designed around a core pedagogical premise: **the learner starts with zero knowledge**. Concepts are explained in clear, plain English, building step-by-step without assuming prior technical jargon.

### Key Pillars
- **Zero-Account Privacy Architecture**: No conventional registration, email passwords, or third-party trackers.
- **End-to-End Cryptographic Sync**: A **Personal Sync Key** enables seamless progress restoration across multiple devices using Web Crypto (`AES-GCM 256-bit` + `PBKDF2`). The server and database **never** see plaintext notes or learner data.
- **Comprehensive 11-Phase Curriculum**: 42+ structured lessons spanning developer foundations, HTML/CSS, JavaScript, TypeScript, React 19, Next.js App Router, REST APIs, PostgreSQL/Drizzle, security, CI/CD, and interview preparation.
- **5 Escalating Capstone Projects**: From a semantic portfolio to a production SaaS application with architecture briefs, milestone checklists, and definitions of done.
- **Interactive Practice Studio & Readiness Assessment**: Coding challenges, self-check quizzes, and a comprehensive 10-domain readiness exam.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack, Partial Prerendering) |
| **Language** | TypeScript 5 (Strict Mode) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Zustand with LocalStorage Persistence & Background Sync |
| **Validation** | Zod Schema Validation |
| **Cryptography** | Web Crypto API (`AES-GCM 256`, `PBKDF2`, `SHA-256`) |
| **Database & ORM** | Drizzle ORM + Neon Serverless PostgreSQL (with offline memory fallback) |
| **Testing** | Vitest (Unit & Integration tests) with JSDOM |
| **Icons & Effects** | Lucide React, Canvas Confetti |

---

## 🔐 Personal Sync Key: Zero-Knowledge Security Flow

StackPath solves cross-device synchronization without compromising learner privacy or requiring accounts:

```text
[ Learner Device A ]
        │
        ▼ Generates
[ Personal Sync Key (sp-xxxx-xxxx-...) ]
        │
        ├─► PBKDF2 (100,000 iterations, SHA-256) ──► AES-GCM 256-bit Key
        │                                                     │
        │                                                     ▼
        │   Plaintext Progress & Notes ──────────────► Encrypt Payload
        │                                                     │
        └─► SHA-256 Hash ──► Opaque Sync ID (64 hex)          ▼
                                   │                   Ciphertext + IV
                                   ▼                          │
                        [ HTTPS POST /api/sync ] ◄────────────┘
                                   │
                                   ▼
                   [ Neon Serverless PostgreSQL ]
                    stores ONLY:
                    - sync_id (SHA-256 hash)
                    - encrypted_payload (ciphertext)
                    - iv, version, updated_at
```

### Conflict Resolution
When opening StackPath on a second device with a desynchronized timestamp, StackPath displays a **Side-by-Side Conflict Resolution Modal** showing the local device timestamp vs. cloud snapshot timestamp, letting the learner choose which version to retain.

### Local Backup & Portability
Learners can export their unencrypted or encrypted progress to a local `.json` file at any time from **Settings > Data Management**, or restore an exported backup.

---

## 📚 Curriculum Roadmap Overview

### Phase 0: Start Here — Digital & Developer Foundations
- What full-stack engineering actually means
- How the web works (DNS, HTTP, browsers, servers, databases)
- Terminal, files, Git & debugging mental models

### Phase 1: Web Foundations (HTML & CSS)
- Semantic HTML and accessibility principles (WCAG 2.2 AA)
- Modern CSS layouts: Flexbox, Grid, Box Model, and responsive design
- Touch targets, mobile-first design, and browser DevTools

### Phase 2: JavaScript Fundamentals
- Execution models, variables, data types, control flow
- Functions, arrays, objects, immutable patterns
- DOM manipulation, events, Promises, async/await, and Fetch API

### Phase 3: Professional JavaScript & TypeScript
- Clean code architecture, modular design, error handling
- TypeScript type systems, interfaces, unions, generics, and narrowing
- Runtime validation (Zod) vs compile-time checks

### Phase 4: Modern Frontend with React
- Component mental models, JSX, props, state, and unidirectional data flow
- Hooks (`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`)
- Component accessibility, performance optimization, and testing

### Phase 5: Next.js Full-Stack Architecture
- App Router, Server Components vs Client Components
- Dynamic routing, layouts, streaming, metadata, and loading states
- Server Actions vs Route Handlers, caching strategies

### Phase 6: Backend & REST API Engineering
- RESTful principles, HTTP methods, status codes, query pagination
- Cookies, sessions, JWTs, and secure authentication architecture
- Rate limiting, input validation, and defensive API design

### Phase 7: Databases & Data Modeling
- Relational databases, SQL tables, primary & foreign keys, constraints
- PostgreSQL, Drizzle ORM schema design, queries, and migrations
- Real-world data modeling and transaction isolation

### Phase 8: Security, Quality & Reliability
- OWASP Top 10 defenses: XSS, CSRF, SQL Injection, CSP headers
- Unit, integration, and end-to-end testing strategies
- Error boundaries, observability, structured logging, and debugging

### Phase 9: Deployment & Production Engineering
- CI/CD pipelines, Git workflows, environment configuration
- Vercel deployments, custom domains, database migrations, rollbacks
- Core Web Vitals, performance profiling, and production checklists

### Phase 10: Portfolio, Interviews & Career Readiness
- Portfolio curation, GitHub presence, and code storytelling
- Technical interview problem solving and STAR behavioral frameworks
- System design foundations for junior developers

---

## 🏆 Capstone Projects

1. **Semantic Developer Portfolio**: Accessible, responsive personal developer site built with pure semantic HTML & CSS.
2. **Browser Task & Habit Engine**: Interactive client-side productivity app using vanilla TypeScript and `localStorage`.
3. **React Studio Dashboard**: Multi-view dashboard with data visualizations, state persistence, and keyboard shortcuts.
4. **Full-Stack Issue Tracker**: Next.js App Router application with PostgreSQL database CRUD, filtering, and validation.
5. **Production SaaS Capstone**: Multi-tenant team workspace application with database relationships, API endpoints, rate limiting, and automated CI test suite.

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** 20.x or 22.x+
- **npm** 10.x+

### 1. Clone & Install
```bash
git clone https://github.com/your-username/stackpath-academy.git
cd stackpath-academy
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(Optional)* Add your Neon PostgreSQL URL to `DATABASE_URL`. If omitted, StackPath automatically falls back to an in-memory database store for seamless local and offline testing.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Test Suite
```bash
npm run test
```
Executes all unit and integration tests (cryptography, curriculum integrity, progress calculations, conflict resolution).

### 5. Run Lint & Static Type Check
```bash
npm run lint
npx tsc --noEmit
```

### 6. Create Production Build
```bash
npm run build
npm run start
```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your StackPath repository.
4. In **Environment Variables**, add:
   - `DATABASE_URL`: Your serverless Neon PostgreSQL connection string (`postgresql://...`).
   - `NEXT_PUBLIC_APP_URL`: Your production domain (e.g. `https://stackpath.yourdomain.com`).
5. Click **Deploy**. Vercel will build the Next.js App Router application and host it on edge-ready serverless infrastructure.

---

## ♿ Accessibility & Visual System

- **WCAG 2.2 AA Contrast Compliance**: High-contrast, typography-optimized reading palette in both Light and Dark themes.
- **Accessible System Diagrams**: All architectural SVGs include semantic titles, role definitions, and textual descriptions for screen readers.
- **Keyboard Navigation**: Skip-to-content links, visible focus rings, and full keyboard traversability across quizzes, sidebars, and dialogs.
- **Motion Preferences**: Respects `prefers-reduced-motion` to suppress animations for sensitive users.
- **Responsive Layouts**: Validated down to 320px mobile screens with thumb-friendly touch targets (min 44x44px).

---

## 📄 License
MIT License. Built for full-stack learners everywhere.
#   S t a c k P a t h - v 2  
 