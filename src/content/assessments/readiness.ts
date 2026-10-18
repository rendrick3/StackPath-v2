import { ModuleQuiz } from '@/types/curriculum';

export const fullStackReadinessAssessment: ModuleQuiz = {
  id: 'assessment-readiness-exam',
  moduleId: 'readiness-final',
  title: 'Full-Stack Engineering Readiness Assessment',
  description:
    'A comprehensive, real-world assessment evaluating your practical tradeoffs, security mindset, debugging ability, database modeling, and deployment knowledge. Passing requires 80% or higher.',
  passingScore: 80,
  questions: [
    {
      id: 'rq-1',
      question:
        'A user reports that your web application becomes unresponsive when typing into a search input that filters a list of 5,000 items in real time. What is the most effective architectural fix?',
      options: [
        'Add debounce to the search input and paginate the displayed results',
        'Add a CSS transition to make the typing feel smoother',
        'Store the entire list inside a global React context',
        'Convert all components to React Server Components with no client JavaScript',
      ],
      correctIndex: 0,
      explanations: {
        0: 'Correct! Debouncing delays execution until the user stops typing (e.g. 250ms), and pagination or windowing reduces DOM node count from 5,000 to 20-50 items, keeping the main thread responsive.',
        1: 'Incorrect. CSS transitions do not solve JavaScript main-thread CPU blocking or heavy DOM re-rendering.',
        2: 'Incorrect. Placing 5,000 items in React Context will actually worsen performance, as any context update triggers re-renders across all subscribing consumers.',
        3: 'Incorrect. While Server Components reduce client JS, an instant client-side search input requires interactive client state.',
      },
    },
    {
      id: 'rq-2',
      question:
        'You need to store an authenticated user\'s session token. Which storage strategy provides the highest defense against Cross-Site Scripting (XSS) token theft?',
      options: [
        'localStorage using a unique key',
        'An HttpOnly, Secure, SameSite=Lax cookie sent by the server',
        'sessionStorage inside an encrypted string variable',
        'A global JavaScript window variable in the browser',
      ],
      correctIndex: 1,
      explanations: {
        0: 'Incorrect. Any malicious script executed via XSS can read localStorage.getItem() and transmit tokens immediately to an attacker server.',
        1: 'Correct! The HttpOnly flag prevents client-side JavaScript (including injected XSS scripts) from accessing the cookie via document.cookie.',
        2: 'Incorrect. sessionStorage is still directly accessible to JavaScript and vulnerable to XSS.',
        3: 'Incorrect. Any global window variable is immediately accessible to any running script in the browser origin.',
      },
    },
    {
      id: 'rq-3',
      question:
        'In PostgreSQL, your query "SELECT * FROM orders WHERE customer_id = 100 ORDER BY created_at DESC" is taking 800ms on a table with 2,000,000 rows. What index should you create?',
      options: [
        'CREATE INDEX idx_orders_customer_id ON orders(customer_id);',
        'CREATE INDEX idx_orders_customer_created ON orders(customer_id, created_at DESC);',
        'CREATE INDEX idx_orders_all ON orders(id, customer_id, total, status, created_at);',
        'No index is needed; PostgreSQL automatically optimizes all WHERE clauses.',
      ],
      correctIndex: 1,
      explanations: {
        0: 'Partially helpful, but the database will still need to perform a separate sort step for ORDER BY created_at DESC.',
        1: 'Correct! A composite index on (customer_id, created_at DESC) allows the database engine to find the customer’s orders AND return them already pre-sorted in index order without an expensive in-memory sort.',
        2: 'Incorrect. Indexing unnecessary columns wastes storage and slows down INSERT/UPDATE statements unnecessarily.',
        3: 'Incorrect. PostgreSQL cannot magically scan 2 million rows without indexes; it requires an explicit B-Tree index to perform logarithmic seeks.',
      },
    },
    {
      id: 'rq-4',
      question:
        'When designing a RESTful API, which HTTP status code and response should be returned when a client tries to create an issue with missing required fields?',
      options: [
        '200 OK with { "status": "error", "message": "Missing title" }',
        '400 Bad Request with structured field validation errors',
        '404 Not Found',
        '500 Internal Server Error',
      ],
      correctIndex: 1,
      explanations: {
        0: 'Incorrect. Returning 200 OK for errors confuses HTTP proxies, client caches, and standard fetch libraries.',
        1: 'Correct! 400 Bad Request indicates that the server cannot process the request due to client error (invalid payload or failed validation schema).',
        2: 'Incorrect. 404 indicates that the URI resource was not found, which is not the case for a validation failure on an existing endpoint.',
        3: 'Incorrect. 500 represents an unexpected server crash or unhandled exception, not an expected client validation error.',
      },
    },
    {
      id: 'rq-5',
      question:
        'Why should you validate data on the backend server using Zod even if your React frontend already validates the form before submission?',
      options: [
        'Because frontend validation runs slower than backend validation',
        'Because any client can bypass frontend validation by using cURL, Postman, or editing network scripts',
        'Because Zod only works on Node.js servers and cannot run in browsers',
        'Because SQL databases reject data that was only validated on the client',
      ],
      correctIndex: 1,
      explanations: {
        0: 'Incorrect. Frontend validation is instantaneous in the browser and does not involve network hops.',
        1: 'Correct! Never trust client input. Anyone can inspect network traffic or send direct HTTP requests that bypass browser UI validation entirely.',
        2: 'Incorrect. Zod is isomorphic and runs seamlessly in both browser and server environments.',
        3: 'Incorrect. Databases will accept whatever SQL string is sent unless constrained by schema types or server validation.',
      },
    },
    {
      id: 'rq-6',
      question:
        'In Next.js App Router, which scenario represents a correct reason to declare a component with "use client"?',
      options: [
        'The component connects directly to the PostgreSQL database with credentials',
        'The component reads process.env.DATABASE_URL to fetch confidential settings',
        'The component uses useState, useEffect, or attaches onClick event listeners',
        'The component renders static SEO blog content that rarely changes',
      ],
      correctIndex: 2,
      explanations: {
        0: 'Incorrect! Connecting to databases in client components exposes credentials to the browser.',
        1: 'Incorrect! Server secrets must never be exposed to client components.',
        2: 'Correct! The "use client" directive marks a boundary where client-side interactivity (state, effects, browser events) is required.',
        3: 'Incorrect. Static SEO content is best served as a Server Component for zero client JavaScript and faster delivery.',
      },
    },
    {
      id: 'rq-7',
      question:
        'What is the primary difference between a database migration and a schema declaration?',
      options: [
        'A migration is a versioned script that alters existing database tables over time, while a schema declaration describes the desired target state in code',
        'A migration only runs in local development, whereas schema declarations only run in production',
        'Schema declarations delete all existing data on every deployment',
        'Migrations are only used for NoSQL databases like MongoDB',
      ],
      correctIndex: 0,
      explanations: {
        0: 'Correct! Schema definitions (e.g. in Drizzle ORM) describe the ideal model structure. Migrations are chronological SQL delta scripts that transition the live database safely from version A to version B without data loss.',
        1: 'Incorrect. Migrations are crucial for applying changes reliably in production environments.',
        2: 'Incorrect. Schema declarations define structure; they do not delete data unless explicit DROP instructions are executed.',
        3: 'Incorrect. Migrations are standard practice in relational databases (PostgreSQL, MySQL, SQLite).',
      },
    },
    {
      id: 'rq-8',
      question:
        'During a production deployment, what is the safest approach when modifying a database column name (e.g. renaming "fullName" to "name")?',
      options: [
        'Run ALTER TABLE orders RENAME COLUMN fullName TO name in production immediately while deploying new code',
        'Follow expand-and-contract: add "name" column, write to both, backfill data, deploy code reading "name", then drop "fullName"',
        'Shut down the web server for 48 hours while the database rebuilds',
        'Never change column names; create a new database from scratch each time',
      ],
      correctIndex: 1,
      explanations: {
        0: 'Incorrect. A sudden rename will crash older server instances that are still running during the rolling deployment.',
        1: 'Correct! The expand-and-contract pattern ensures zero downtime and backwards compatibility between concurrently running application versions.',
        2: 'Incorrect. 48 hours of downtime is unacceptable in modern software engineering.',
        3: 'Incorrect. Creating databases from scratch loses user data.',
      },
    },
    {
      id: 'rq-9',
      question:
        'You notice your React component is causing a memory leak warning in the browser console when navigating between pages. What is the most likely cause?',
      options: [
        'A setInterval or event listener in useEffect was not cleaned up in the return function',
        'The component is using too many CSS utility classes',
        'The component is imported dynamically with React.lazy',
        'The component has more than 5 useState hooks',
      ],
      correctIndex: 0,
      explanations: {
        0: 'Correct! When a component unmounts, any active timers or event listeners that continue to run and reference the unmounted component cause memory leaks.',
        1: 'Incorrect. CSS utility classes are processed at build time and do not cause JavaScript memory leaks.',
        2: 'Incorrect. React.lazy enables code splitting and does not inherently leak memory.',
        3: 'Incorrect. React easily handles numerous useState hooks without memory leaks.',
      },
    },
    {
      id: 'rq-10',
      question:
        'In Git, what is the best practice before submitting a pull request to ensure your branch does not introduce unexpected merge conflicts with the main branch?',
      options: [
        'Delete your local repository and clone main again',
        'Fetch latest main and rebase or merge main into your feature branch, resolving any conflicts locally and running tests',
        'Force push directly to the remote main branch with git push -f origin main',
        'Commit all node_modules files to the branch',
      ],
      correctIndex: 1,
      explanations: {
        0: 'Incorrect. Deleting your repo wipes out all your unmerged feature code.',
        1: 'Correct! Merging or rebasing main into your feature branch allows you to test the integrated code locally before opening or merging the PR.',
        2: 'Incorrect. Force pushing to main can destroy teammates\' work and destabilize production.',
        3: 'Incorrect. node_modules should always be in .gitignore and never committed to source control.',
      },
    },
  ],
};
