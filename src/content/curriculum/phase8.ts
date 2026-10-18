import { Phase } from '@/types/curriculum';

export const phase8: Phase = {
  phase: 8,
  title: 'Security, Quality & Reliability',
  subtitle: 'Defensive engineering, OWASP top vulnerabilities, automated testing, and observability.',
  description:
    'Build applications that stand up to real-world threats and high loads. Learn the OWASP Top 10, input sanitization, automated Vitest unit testing, Playwright E2E testing, and production error boundaries.',
  modules: [
    {
      id: 'mod-12-security-quality',
      slug: 'security-owasp-defenses',
      title: 'Web Security, OWASP & Automated Testing',
      phase: 8,
      phaseTitle: 'Phase 8 — Security, Quality & Reliability',
      description: 'Protect your apps against Cross-Site Scripting (XSS), SQL Injection, and CSRF. Write reliable test suites using Vitest and Playwright.',
      estimatedHours: 12,
      outcomes: [
        'Identify and prevent OWASP Top 10 vulnerabilities (XSS, CSRF, SQL Injection)',
        'Configure Content Security Policy (CSP) and secure HTTP response headers',
        'Write automated unit and integration tests with Vitest',
        'Implement friendly React Error Boundaries to catch crashes gracefully',
      ],
      prerequisites: ['Phase 7: Databases & Data Modeling'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-12',
        moduleId: 'mod-12-security-quality',
        title: 'Security & Testing Checkpoint',
        description: 'Verify your understanding of web security defenses and automated test strategies.',
        passingScore: 75,
        questions: [
          {
            id: 'q8-1',
            question: 'How do parameterized queries (or modern ORMs like Drizzle) eliminate SQL Injection attacks?',
            options: [
              'By keeping SQL command code and user data parameters separate, so user input is never interpreted as executable SQL syntax',
              'By scrambling the user\'s password with MD5',
              'By running queries twice to check for viruses',
              'By blocking all incoming network traffic from other countries',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! Parameterized queries pass user input as pure data values to the database engine, making it impossible for quotes or SQL fragments to alter the query logic.',
              1: 'Incorrect. MD5 is an outdated hashing algorithm, not a SQLi defense.',
              2: 'Incorrect. Running queries twice does not prevent injection.',
              3: 'Incorrect. SQL injection occurs regardless of geographic origin.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-23-owasp-defenses',
          slug: 'owasp-top-10-and-web-defenses',
          title: 'The OWASP Top 10: Defending Against XSS, CSRF, and SQLi',
          moduleSlug: 'security-owasp-defenses',
          moduleTitle: 'Web Security, OWASP & Automated Testing',
          phase: 8,
          phaseTitle: 'Phase 8 — Security, Quality & Reliability',
          readingTimeMinutes: 14,
          objective: 'Understand how attackers exploit web vulnerabilities and implement defense-in-depth protections.',
          whyItMatters:
            'A single vulnerability can leak millions of customer records or destroy your company. Writing secure code from day one is the hallmark of a senior software engineer.',
          prerequisites: ['Backend & API Engineering'],
          sections: [
            {
              id: 'sec-1',
              title: 'SQL Injection: The Classic Nightmare',
              content:
                'SQL injection occurs when un-sanitized user input is concatenated directly into a raw SQL query string:\n\n```sql\n-- BAD: Vulnerable to SQL Injection!\nconst query = `SELECT * FROM users WHERE email = \'${userInput}\'`;\n```\n\nIf the attacker enters `admin@site.com\' OR \'1\'=\'1`, the database evaluates `OR \'1\'=\'1\'` (which is always true) and dumps the entire user table!\n\n**The Solution**: Always use parameterized queries or an ORM like Drizzle:\n\n```typescript\n// SAFE: Drizzle passes inputs as parameters\nawait db.select().from(users).where(eq(users.email, userInput));\n```',
            },
            {
              id: 'sec-2',
              title: 'Cross-Site Scripting (XSS) and Content Security Policy',
              content:
                'XSS occurs when malicious scripts are injected into web pages viewed by other users. React automatically escapes variables in JSX expressions, but you must still:\n\n- Never use `dangerouslySetInnerHTML` with untrusted data.\n- Store authentication credentials in `HttpOnly` cookies.\n- Set a strict **Content Security Policy (CSP)** header to restrict which domains can execute scripts on your page.',
              callout: {
                type: 'tip',
                title: 'Defense-in-Depth Principle',
                text: 'Never rely on a single layer of security. Use input validation (Zod) + parameterized queries (Drizzle) + HttpOnly cookies + CSP headers. If one layer fails, the others protect your users.',
              },
            },
          ],
          recap: [
            'Never concatenate raw strings into SQL queries; always use parameterized statements or ORMs.',
            'React auto-escapes JSX strings to prevent XSS.',
            'HttpOnly cookies protect session tokens from script theft.',
            'Apply defense-in-depth across every layer of the full stack.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-8-1',
              question: 'Which React attribute should be avoided unless user input is thoroughly sanitized with a tool like DOMPurify?',
              options: ['dangerouslySetInnerHTML', 'className', 'style', 'onClick'],
              correctIndex: 0,
              explanation: 'dangerouslySetInnerHTML bypasses React\'s automatic escaping and can lead directly to XSS vulnerabilities if passed unsanitized user content.',
            },
          ],
          practicalTask: {
            title: 'Verify Cryptographic Zero-Knowledge Sync in StackPath',
            instruction: 'Review `src/lib/security/crypto.ts`. Observe how PBKDF2 with 100,000 iterations derives an AES-GCM 256-bit key from the user\'s sync key entirely in the browser before sending data to the server.',
            hints: ['The server only sees an opaque SHA-256 hash as the index key.'],
            expectedOutcome: 'Understanding client-side cryptographic zero-knowledge architecture.',
          },
          glossaryTerms: ['xss', 'sql'],
        },
        {
          id: 'les-24-automated-testing-vitest',
          slug: 'testing-with-vitest-and-playwright',
          title: 'Automated Testing: Unit, Integration, and E2E Tests',
          moduleSlug: 'security-owasp-defenses',
          moduleTitle: 'Web Security, OWASP & Automated Testing',
          phase: 8,
          phaseTitle: 'Phase 8 — Security, Quality & Reliability',
          readingTimeMinutes: 14,
          objective: 'Write automated test suites using Vitest for unit logic and understand Playwright for end-to-end user flows.',
          whyItMatters:
            'Manual testing is slow, error-prone, and doesn\'t scale. Automated tests give you the confidence to refactor code, upgrade packages, and ship to production on Friday afternoon without fear.',
          prerequisites: ['The OWASP Top 10: Defending Against XSS, CSRF, and SQLi'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Testing Trophy',
              content:
                'Modern testing balances three layers:\n\n1. **Unit Tests (Fast & Isolated)**: Test pure functions, calculation utilities, and cryptographic engines (e.g. testing `encryptData` and `decryptData`).\n2. **Integration Tests (Component & API)**: Test how multiple units collaborate (e.g. testing that a form validation schema and API route work together).\n3. **End-to-End (E2E) Tests (Real Browser Flows)**: Using tools like Playwright to launch a headless browser, click buttons, fill out inputs, and assert that the full flow works end-to-end.',
            },
            {
              id: 'sec-2',
              title: 'Writing Tests with Vitest',
              content:
                'Vitest is a blazing-fast unit test runner built on Vite:\n\n```typescript\nimport { describe, it, expect } from \'vitest\';\nimport { isValidSyncKey, generateSyncKey } from \'@/lib/security/crypto\';\n\ndescribe(\'Personal Sync Key Security\', () => {\n  it(\'generates valid sync keys in the expected format\', () => {\n    const key = generateSyncKey();\n    expect(isValidSyncKey(key)).toBe(true);\n  });\n\n  it(\'rejects malformed sync keys\', () => {\n    expect(isValidSyncKey(\'invalid-random-string\')).toBe(false);\n  });\n});\n```',
            },
          ],
          recap: [
            'Unit tests verify isolated pure logic quickly.',
            'Integration tests verify component and API interactions.',
            'Playwright E2E tests verify complete user journeys in real headless browsers.',
            'Continuous Integration (CI) runs tests automatically before merging code.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-8-2',
              question: 'Which test runner provides fast native TypeScript and ESM execution with Jest-compatible APIs?',
              options: ['Vitest', 'Photoshop', 'PostgreSQL', 'CSS Grid'],
              correctIndex: 0,
              explanation: 'Vitest is the modern test runner designed for speed, Vite integration, and Jest API compatibility.',
            },
          ],
          practicalTask: {
            title: 'Run StackPath\'s Unit Tests',
            instruction: 'Run `npm run test` in your terminal to see Vitest execute the test suite for crypto, conflict resolution, and progress validation.',
            hints: ['Observe the test execution speed and clear reporting.'],
            expectedOutcome: 'All test suites pass cleanly.',
          },
          glossaryTerms: ['ci-cd'],
        },
      ],
    },
  ],
};
