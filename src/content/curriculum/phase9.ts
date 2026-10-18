import { Phase } from '@/types/curriculum';

export const phase9: Phase = {
  phase: 9,
  title: 'Deployment & Production Engineering',
  subtitle: 'CI/CD pipelines, Vercel serverless deployment, Core Web Vitals, and launch checklists.',
  description:
    'Take your full-stack applications from local `localhost` to global high-availability production. Master Vercel deployment, environment configuration, database connection pooling, Core Web Vitals, and zero-downtime rollouts.',
  modules: [
    {
      id: 'mod-13-deployment-production',
      slug: 'deployment-pipelines-vercel',
      title: 'Vercel Deployment & Production Operations',
      phase: 9,
      phaseTitle: 'Phase 9 — Deployment & Production Engineering',
      description: 'Ship full-stack Next.js applications to Vercel edge networks, configure serverless environment variables, and master Core Web Vitals.',
      estimatedHours: 10,
      outcomes: [
        'Deploy Next.js apps with automated preview deployments on Vercel',
        'Configure environment variables securely without leaking secrets',
        'Optimize Core Web Vitals: LCP, CLS, and INP',
        'Follow a rigorous pre-launch production verification checklist',
      ],
      prerequisites: ['Phase 8: Security, Quality & Reliability'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-13',
        moduleId: 'mod-13-deployment-production',
        title: 'Deployment & Operations Checkpoint',
        description: 'Verify your knowledge of production deployments, environment variables, and web vitals.',
        passingScore: 75,
        questions: [
          {
            id: 'q9-1',
            question: 'What is the role of NEXT_PUBLIC_ prefix in Next.js environment variables?',
            options: [
              'Variables prefixed with NEXT_PUBLIC_ are bundled into client-side JavaScript sent to browsers; variables WITHOUT this prefix remain strictly private to the server',
              'NEXT_PUBLIC_ makes database passwords run 10x faster',
              'It publishes the website to Google Search automatically',
              'It changes the color scheme of the website to blue',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! Never prefix confidential server keys (like DATABASE_URL or STRIPE_SECRET_KEY) with NEXT_PUBLIC_, as that exposes them in the browser bundle.',
              1: 'Incorrect. Environment variables have no effect on database execution speed.',
              2: 'Incorrect. SEO indexing is managed through metadata and sitemaps.',
              3: 'Incorrect. Env variables do not alter CSS colors.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-25-vercel-deployment-env',
          slug: 'deploying-to-vercel-and-serverless',
          title: 'Deploying Full-Stack Next.js to Vercel',
          moduleSlug: 'deployment-pipelines-vercel',
          moduleTitle: 'Vercel Deployment & Production Operations',
          phase: 9,
          phaseTitle: 'Phase 9 — Deployment & Production Engineering',
          readingTimeMinutes: 12,
          objective: 'Deploy a full-stack Next.js app to Vercel with custom domains, SSL certificates, and serverless database connections.',
          whyItMatters:
            'A project that only lives on your laptop cannot help users or impress employers. Deploying to a global serverless cloud gives you instant worldwide reach with automated scaling.',
          prerequisites: ['Phase 8: Security, Quality & Reliability'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Modern Git-Driven Deployment Pipeline',
              content:
                'Gone are the days of manual FTP uploads or managing physical Linux server boxes. When you connect your GitHub repository to Vercel:\n\n1. Every `git push` to a feature branch automatically creates a unique **Preview Deployment URL** where teammates can test live.\n2. When your Pull Request is merged into `main`, Vercel builds the production bundle and executes a zero-downtime atomic swap on the live domain.\n3. Automatic SSL/TLS certificates and global CDN edge routing are configured out of the box.',
            },
            {
              id: 'sec-2',
              title: 'Configuring Serverless Environment Variables',
              content:
                'Never commit `.env` or `.env.local` files to Git. Instead:\n\n1. Create `.env.example` with blank keys to document required configurations for other developers.\n2. In Vercel Project Settings -> Environment Variables, input production credentials (e.g. `DATABASE_URL` from Neon).\n3. Differentiate between `Production`, `Preview`, and `Development` scopes.',
              callout: {
                type: 'tip',
                title: 'Neon + Vercel Integration',
                text: 'Neon PostgreSQL connects natively to Vercel. Because serverless functions scale up and down dynamically, Neon provides built-in connection pooling (`pooler.neon.tech`) so thousands of serverless functions never exhaust database connection limits.',
              },
            },
          ],
          recap: [
            'Vercel builds and deploys automatically on every Git commit.',
            'Keep confidential environment variables in Vercel settings, never in Git.',
            'Use connection poolers for relational databases in serverless environments.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-9-1',
              question: 'Should `.env.local` containing live database passwords ever be committed to a public Git repository?',
              options: [
                'No, .env.local must always be listed in .gitignore to prevent secret leaks',
                'Yes, so teammates can see the passwords easily',
                'Only if the repository is on GitHub',
                'It does not matter',
              ],
              correctIndex: 0,
              explanation: 'Never commit secrets to Git. Publicly committed credentials are scanned and exploited by automated bots within seconds.',
            },
          ],
          practicalTask: {
            title: 'Verify .env.example in StackPath',
            instruction: 'Inspect `.env.example` in this project. Notice how DATABASE_URL is documented without disclosing real secret credentials.',
            hints: ['Check how documentation guides new developers.'],
            expectedOutcome: 'Clear understanding of production environment configuration.',
          },
          glossaryTerms: ['ci-cd', 'server-component'],
        },
        {
          id: 'les-26-core-web-vitals-launch',
          slug: 'core-web-vitals-and-production-launch',
          title: 'Core Web Vitals & The Production Launch Checklist',
          moduleSlug: 'deployment-pipelines-vercel',
          moduleTitle: 'Vercel Deployment & Production Operations',
          phase: 9,
          phaseTitle: 'Phase 9 — Deployment & Production Engineering',
          readingTimeMinutes: 14,
          objective: 'Measure real-world performance using Google Core Web Vitals and follow a pre-launch production checklist.',
          whyItMatters:
            'Fast websites convert visitors into paying customers and rank higher in Google search. Slow or shifting layouts frustrate users and drive them away.',
          prerequisites: ['Deploying Full-Stack Next.js to Vercel'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Three Core Web Vitals',
              content:
                'Google evaluates web performance using three key metrics:\n\n1. **Largest Contentful Paint (LCP)**: How fast does the primary content appear? (Target: Under 2.5s). Optimize by using Next.js `<Image>` with priority for hero images.\n2. **Interaction to Next Paint (INP)**: How responsive is the page when a user clicks a button or taps an input? (Target: Under 200ms). Avoid blocking the main thread with heavy synchronous calculations.\n3. **Cumulative Layout Shift (CLS)**: Does content jump around unexpectedly while images or ads load? (Target: Under 0.1). Always specify `width` and `height` dimensions on images and reserve space for dynamic widgets.',
            },
            {
              id: 'sec-2',
              title: 'The Pre-Launch Production Checklist',
              content:
                'Before sharing your application with real users, verify:\n\n- [ ] **Accessibility**: All buttons have accessible text; colors meet WCAG AA 4.5:1 contrast.\n- [ ] **Responsive**: Tested at 320px mobile width with zero horizontal overflow.\n- [ ] **SEO & OpenGraph**: Meaningful `<title>`, `<meta description>`, and social share image preview.\n- [ ] **Error Handling**: Friendly 404 and 500 error boundaries with recovery buttons.\n- [ ] **Security**: Sensitive routes protected; zero database secrets in client bundle.',
            },
          ],
          recap: [
            'Core Web Vitals measure real user experience: LCP (loading), INP (interactivity), and CLS (visual stability).',
            'Always set explicit image dimensions to eliminate layout shifts.',
            'Run through the production launch checklist before every major public release.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-9-2',
              question: 'Which metric measures unexpected visual jumping of content as a webpage loads?',
              options: ['Cumulative Layout Shift (CLS)', 'DNS lookup time', 'RAM consumption', 'SQL query count'],
              correctIndex: 0,
              explanation: 'CLS measures the sum total of all unexpected layout shifts that occur during the entire lifespan of the page.',
            },
          ],
          practicalTask: {
            title: 'Run a Lighthouse Audit on StackPath',
            instruction: 'Open Chrome DevTools -> Lighthouse tab -> select "Desktop" and "Performance, Accessibility, Best Practices, SEO" -> click "Analyze page load".',
            hints: ['Notice the high scores resulting from server-first rendering and semantic HTML.'],
            expectedOutcome: 'High performance and accessibility scores across all categories.',
          },
          glossaryTerms: ['ci-cd'],
        },
      ],
    },
  ],
};
