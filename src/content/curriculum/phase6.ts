import { Phase } from '@/types/curriculum';

export const phase6: Phase = {
  phase: 6,
  title: 'Backend & API Engineering',
  subtitle: 'Scalable server architecture, RESTful contracts, authentication, and secure API design.',
  description:
    'Design and build reliable backend systems: HTTP protocols, RESTful principles, request validation pipelines, authentication tokens/cookies, pagination, rate limiting, and error handling.',
  modules: [
    {
      id: 'mod-10-backend-rest',
      slug: 'backend-rest-architecture',
      title: 'REST Architecture, Validation & Security',
      phase: 6,
      phaseTitle: 'Phase 6 — Backend & API Engineering',
      description: 'Engineer production-ready APIs with clear data contracts, status codes, Zod validation guards, and rate limiting.',
      estimatedHours: 12,
      outcomes: [
        'Design resource-oriented RESTful API endpoints using standard HTTP verbs',
        'Return meaningful HTTP status codes (2xx, 4xx, 5xx) and standardized error responses',
        'Implement cursor and offset pagination for large data collections',
        'Understand authentication mechanisms: Session cookies vs JWT tokens',
      ],
      prerequisites: ['Phase 5: Next.js Full-Stack Development'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-10',
        moduleId: 'mod-10-backend-rest',
        title: 'API Engineering Checkpoint',
        description: 'Verify your understanding of REST design, status codes, and API security.',
        passingScore: 75,
        questions: [
          {
            id: 'q6-1',
            question: 'What is the main distinction between authentication (authn) and authorization (authz)?',
            options: [
              'Authentication verifies WHO you are; Authorization determines WHAT you are allowed to do',
              'Authentication is for databases; Authorization is for CSS stylesheets',
              'Authentication encrypts passwords; Authorization deletes old accounts',
              'They are identical terms with no difference',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! Authn asks "Who is the user?" (e.g. login credentials). Authz asks "Does this verified user have permission to delete this project?"',
              1: 'Incorrect. Both apply across all software layers.',
              2: 'Incorrect. Neither is about account deletion.',
              3: 'Incorrect. Confusing Authn and Authz is a common security pitfall.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-19-rest-api-principles',
          slug: 'rest-api-design-and-status-codes',
          title: 'REST API Principles, Status Codes, and Validation',
          moduleSlug: 'backend-rest-architecture',
          moduleTitle: 'REST Architecture, Validation & Security',
          phase: 6,
          phaseTitle: 'Phase 6 — Backend & API Engineering',
          readingTimeMinutes: 12,
          objective: 'Design clean, predictable REST APIs that client developers love to consume.',
          whyItMatters:
            'APIs are the contracts connecting client applications to backend databases. Poorly designed APIs cause frontend bugs, duplicate logic, and maintenance nightmares.',
          prerequisites: ['Phase 5: Next.js Full-Stack Development'],
          sections: [
            {
              id: 'sec-1',
              title: 'Resource-Oriented URI Naming',
              content:
                'RESTful endpoints represent **resources** (nouns, not verbs):\n\n- `GET /api/issues`: List all issues\n- `POST /api/issues`: Create a new issue\n- `GET /api/issues/42`: Retrieve specific issue #42\n- `PATCH /api/issues/42`: Update fields on issue #42\n- `DELETE /api/issues/42`: Remove issue #42\n\nAvoid messy RPC-style endpoints like `/api/getIssues` or `/api/deleteIssueById`. Use standard HTTP verbs to express the action.',
            },
            {
              id: 'sec-2',
              title: 'Standardized Error Response Structure',
              content:
                'Never return plain strings or HTML error pages from an API. Return structured JSON so client apps can parse and display user-friendly notices:\n\n```json\n{\n  "error": "VALIDATION_FAILED",\n  "message": "The issue title must be at least 5 characters.",\n  "field": "title",\n  "statusCode": 400\n}\n```\n\nHTTP status code rules:\n- `200 OK`: Request succeeded\n- `201 Created`: Resource successfully created\n- `400 Bad Request`: Invalid payload / failed validation\n- `401 Unauthorized`: Authentication missing or invalid\n- `403 Forbidden`: Authenticated, but not permitted to access this resource\n- `404 Not Found`: Resource does not exist\n- `500 Internal Error`: Unexpected server failure.',
            },
          ],
          recap: [
            'Use nouns for URIs (/api/projects) and HTTP verbs (GET, POST, PATCH, DELETE) for actions.',
            'Always return structured JSON error payloads with accurate status codes.',
            'Validate every incoming request body with Zod at the perimeter.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-6-1',
              question: 'Which HTTP method should be used to partially update an existing record?',
              options: ['PATCH', 'GET', 'POST', 'OPTIONS'],
              correctIndex: 0,
              explanation: 'PATCH updates a partial subset of fields on an existing resource; PUT replaces the entire resource.',
            },
          ],
          practicalTask: {
            title: 'Design an API Contract for a Habit Tracker',
            instruction: 'Draft the REST endpoints for a habit tracker: creating a habit, marking it completed for today, and fetching habit streaks.',
            hints: ['Think in terms of resources: `/api/habits` and sub-resources `/api/habits/:id/completions`.'],
            expectedOutcome: 'A clean, RESTful endpoint specification.',
          },
          glossaryTerms: ['rest-api', 'http'],
        },
        {
          id: 'les-20-auth-tokens-cookies',
          slug: 'authentication-cookies-and-sessions',
          title: 'Authentication & Security: Cookies, Sessions, and JWTs',
          moduleSlug: 'backend-rest-architecture',
          moduleTitle: 'REST Architecture, Validation & Security',
          phase: 6,
          phaseTitle: 'Phase 6 — Backend & API Engineering',
          readingTimeMinutes: 14,
          objective: 'Understand how users authenticate securely without exposing passwords or tokens to browser theft.',
          whyItMatters:
            'Security breaches destroy companies and compromise user privacy. Storing authentication tokens improperly in browser storage is the #1 vulnerability on the modern web.',
          prerequisites: ['REST API Principles, Status Codes, and Validation'],
          sections: [
            {
              id: 'sec-1',
              title: 'Why localStorage is Dangerous for Auth Tokens',
              content:
                'Many beginners store authentication tokens in `localStorage.setItem("token", jwt)`. This is a critical security vulnerability:\n\nAny script running on your webpage—including malicious third-party analytics, compromised npm packages, or XSS attacks—can read `localStorage` and transmit the user\'s token to an attacker server in 1 line of code.',
            },
            {
              id: 'sec-2',
              title: 'The Gold Standard: HttpOnly Secure Cookies',
              content:
                'Instead, store authentication sessions in **HttpOnly, Secure, SameSite=Lax** cookies:\n\n- **HttpOnly**: JavaScript running in the browser CANNOT read `document.cookie`. Even if an attacker finds an XSS vulnerability, they cannot steal the cookie!\n- **Secure**: The cookie is only transmitted over encrypted HTTPS connections.\n- **SameSite=Lax**: The browser will not send the cookie during cross-site requests, protecting against Cross-Site Request Forgery (CSRF).',
              callout: {
                type: 'tip',
                title: 'StackPath\'s Zero-Knowledge Alternative',
                text: 'In StackPath, we take privacy even further: zero accounts! Progress is encrypted on your device using Web Crypto AES-GCM, and the server only holds an opaque hash snapshot. True zero-knowledge.',
              },
            },
          ],
          recap: [
            'Never store sensitive auth tokens in localStorage or sessionStorage.',
            'HttpOnly cookies shield session tokens from JavaScript and XSS theft.',
            'SameSite cookie attributes defend against CSRF attacks.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-6-2',
              question: 'What does the HttpOnly flag on a cookie prevent?',
              options: [
                'It prevents client-side JavaScript from reading the cookie via document.cookie',
                'It prevents the cookie from being sent to the server',
                'It forces the cookie to expire after 5 seconds',
                'It allows any website to read the cookie',
              ],
              correctIndex: 0,
              explanation: 'HttpOnly instructs the browser that the cookie is strictly for HTTP requests and must never be exposed to JavaScript APIs.',
            },
          ],
          practicalTask: {
            title: 'Inspect Cookies in Chrome DevTools',
            instruction: 'Open DevTools -> Application tab -> Cookies. Inspect any website you are logged into (like GitHub). Notice the checkmarks under "HttpOnly" and "Secure".',
            hints: ['Look for session or token cookie names.'],
            expectedOutcome: 'Understanding how production platforms protect session cookies.',
          },
          glossaryTerms: ['xss'],
        },
      ],
    },
  ],
};
