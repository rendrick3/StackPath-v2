import { Phase } from '@/types/curriculum';

export const phase5: Phase = {
  phase: 5,
  title: 'Next.js Full-Stack Development',
  subtitle: 'The modern React production framework: App Router, Server Components, and Server Actions.',
  description:
    'Build full-stack web applications with Next.js App Router. Master file-based routing, Server vs Client component boundaries, Server Actions, Route Handlers, and SEO optimization.',
  modules: [
    {
      id: 'mod-09-nextjs-architecture',
      slug: 'nextjs-app-router-architecture',
      title: 'Next.js App Router Architecture',
      phase: 5,
      phaseTitle: 'Phase 5 — Next.js Full-Stack Development',
      description: 'Master the Next.js App Router mental model: directory conventions, layout trees, React Server Components (RSC), and edge-ready server actions.',
      estimatedHours: 14,
      outcomes: [
        'Understand file-based routing: layout.tsx, page.tsx, loading.tsx, error.tsx',
        'Know precisely when to keep a component on the server vs when to add "use client"',
        'Perform secure mutations with Server Actions and revalidateTag / revalidatePath',
        'Build RESTful API endpoints using Route Handlers (route.ts)',
      ],
      prerequisites: ['Phase 4: Modern Frontend with React'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-09',
        moduleId: 'mod-09-nextjs-architecture',
        title: 'Next.js App Router Checkpoint',
        description: 'Verify your understanding of Server Components, routing conventions, and data mutations.',
        passingScore: 75,
        questions: [
          {
            id: 'q5-1',
            question: 'What is the primary benefit of React Server Components (RSC) by default in Next.js?',
            options: [
              'They execute exclusively on the server, sending zero JavaScript bundle weight to the browser and keeping secrets/database access private',
              'They allow users to write HTML directly inside CSS stylesheets',
              'They automatically convert all SQL queries into MongoDB documents',
              'They force the user\'s browser to download Node.js',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! Server Components run on the server, fetch data right next to the database, and stream pre-rendered HTML without adding JavaScript to the client bundle.',
              1: 'Incorrect. RSC does not change CSS syntax.',
              2: 'Incorrect. RSC is database agnostic.',
              3: 'Incorrect. The client browser never runs Node.js.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-17-app-router-mental-model',
          slug: 'app-router-routing-and-layouts',
          title: 'Next.js App Router, Layouts, and Server Components',
          moduleSlug: 'nextjs-app-router-architecture',
          moduleTitle: 'Next.js App Router Architecture',
          phase: 5,
          phaseTitle: 'Phase 5 — Next.js Full-Stack Development',
          readingTimeMinutes: 14,
          objective: 'Master directory-based routing, nested layouts, and the boundary between Server Components and Client Components.',
          whyItMatters:
            'Next.js is the industry standard for production React engineering. Understanding its server-first architecture lets you build blazing-fast applications that rank high on Google and load instantly on mobile phones.',
          prerequisites: ['Phase 4: Modern Frontend with React'],
          sections: [
            {
              id: 'sec-1',
              title: 'File-Based Routing Conventions',
              content:
                'Next.js uses folder paths to define routes:\n\n- `src/app/page.tsx` -> maps to `/` (Homepage)\n- `src/app/dashboard/page.tsx` -> maps to `/dashboard`\n- `src/app/curriculum/[slug]/page.tsx` -> Dynamic route matching `/curriculum/web-basics`\n\nSpecial file roles:\n- `layout.tsx`: Wraps child routes and preserves state during navigation (e.g. site header & navigation drawer).\n- `loading.tsx`: Automatically wraps the route in a React Suspense boundary with instant fallback skeletons.\n- `error.tsx`: Catches runtime errors in the route tree and renders a recovery interface without crashing the entire website.',
            },
            {
              id: 'sec-2',
              title: 'Server Components vs Client Components',
              content:
                'In Next.js App Router, **every component is a Server Component by default**.\n\n- **Server Component**: Can directly connect to databases, read environment variables (`process.env.SECRET`), and has 0 KB JavaScript sent to the browser.\n- **Client Component (`"use client"`)**: Needed only when you require browser APIs, state (`useState`), effects (`useEffect`), or event listeners (`onClick`, `onChange`).',
              codeExample: {
                language: 'tsx',
                filename: 'src/app/dashboard/page.tsx',
                code: `// This is a React Server Component (RSC)
import { getSnapshot } from '@/lib/db';
import { DashboardClientView } from '@/components/dashboard/DashboardClientView';

export default async function DashboardPage() {
  // Fetch data directly on the server without internal HTTP fetches!
  const data = await getSnapshot('system-overview');

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Learner Studio</h1>
      {/* Pass server data into client interactive component */}
      <DashboardClientView initialData={data} />
    </main>
  );
}`,
              },
            },
          ],
          recap: [
            'Next.js maps folders to URL paths.',
            'layout.tsx persists across navigations without re-rendering.',
            'Default to Server Components for performance and security; use "use client" only for interactivity.',
            'Server Components can query databases and read secret keys directly.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-5-1',
              question: 'Where should database connection secrets (like DATABASE_URL) be accessed in Next.js?',
              options: [
                'Exclusively in Server Components, Server Actions, or Route Handlers; NEVER in "use client" files',
                'Inside client components with useState',
                'In the public/ directory inside a JSON file',
                'Inside local storage in the browser',
              ],
              correctIndex: 0,
              explanation: 'Database credentials must remain strictly on the server to prevent exposure to end users.',
            },
          ],
          practicalTask: {
            title: 'Identify Server vs Client Boundaries',
            instruction: 'Review the StackPath architecture. Notice how page routes fetch static data on the server, while interactive quiz widgets use "use client" to handle button clicks.',
            hints: ['Search for "use client" at the top of interactive components.'],
            expectedOutcome: 'Clear conceptual understanding of hybrid server/client architectures.',
          },
          glossaryTerms: ['server-component', 'react-component', 'nextjs'],
        },
        {
          id: 'les-18-server-actions-apis',
          slug: 'server-actions-and-route-handlers',
          title: 'Server Actions vs Route Handlers: When to Use Each',
          moduleSlug: 'nextjs-app-router-architecture',
          moduleTitle: 'Next.js App Router Architecture',
          phase: 5,
          phaseTitle: 'Phase 5 — Next.js Full-Stack Development',
          readingTimeMinutes: 12,
          objective: 'Mutate data securely using Next.js Server Actions and build REST endpoints with Route Handlers.',
          whyItMatters:
            'Modern full-stack React eliminates boilerplate API glue code. Knowing when to use a simple Server Action vs when an external REST Route Handler is needed makes your code clean and scalable.',
          prerequisites: ['Next.js App Router, Layouts, and Server Components'],
          sections: [
            {
              id: 'sec-1',
              title: 'Server Actions: Direct Server Mutations from UI',
              content:
                'Server Actions are asynchronous functions declared with `"use server"`. You can call them directly from form actions or button handlers like regular functions, but Next.js automatically executes them on the server via secure POST requests under the hood!\n\nUse Server Actions for:\n- Form submissions\n- Creating, updating, or deleting records within your Next.js app\n- Triggering cache revalidation with `revalidatePath("/dashboard")`.',
            },
            {
              id: 'sec-2',
              title: 'Route Handlers: Standard HTTP REST Endpoints',
              content:
                'Route Handlers (`src/app/api/.../route.ts`) provide traditional HTTP request handling (`GET`, `POST`, `PUT`, `DELETE`).\n\nUse Route Handlers for:\n- Public REST APIs consumed by mobile apps or third-party webhooks (e.g. Stripe webhooks)\n- Cross-domain requests requiring custom CORS headers\n- Endpoints returning non-JSON formats (e.g. generating dynamic SVG badges or streaming file downloads).',
              codeExample: {
                language: 'typescript',
                filename: 'src/app/api/sync/route.ts',
                code: `import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Read body and headers directly
  const body = await request.json();
  
  // Return standard HTTP response
  return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
}`,
              },
            },
          ],
          recap: [
            'Server Actions ("use server") provide RPC-style mutations directly from React components.',
            'Route Handlers (route.ts) provide standard HTTP endpoints for webhooks and public REST APIs.',
            'Both run securely on the server with full database access.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-5-2',
              question: 'Which mechanism is best suited for receiving incoming payment webhooks from Stripe into your Next.js application?',
              options: [
                'A Route Handler (route.ts) with an exported POST method',
                'A Client Component with onClick',
                'A CSS stylesheet with media queries',
                'A localStorage event listener in the browser',
              ],
              correctIndex: 0,
              explanation: 'Third-party webhooks require a standardized HTTP URL with a POST method and custom signature verification, which Route Handlers provide.',
            },
          ],
          practicalTask: {
            title: 'Inspect the /api/sync Route in StackPath',
            instruction: 'Open `src/app/api/sync/route.ts`. Observe how GET queries the database snapshot and POST validates the encrypted payload with Zod.',
            hints: ['Check how rate limiting and conflict detection are handled.'],
            expectedOutcome: 'Understanding how production route handlers are constructed.',
          },
          glossaryTerms: ['server-component', 'rest-api'],
        },
      ],
    },
  ],
};
