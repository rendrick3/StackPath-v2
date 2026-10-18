import { Phase } from '@/types/curriculum';

export const phase3: Phase = {
  phase: 3,
  title: 'Professional JS & TypeScript',
  subtitle: 'Clean code, modern ES6+ patterns, strict typing, and runtime validation.',
  description:
    'Level up from beginner scripts to enterprise-grade TypeScript: interfaces, generics, type narrowing, discriminated unions, and runtime validation with Zod.',
  modules: [
    {
      id: 'mod-07-typescript-core',
      slug: 'typescript-foundations-strict',
      title: 'TypeScript Core & Type Safety',
      phase: 3,
      phaseTitle: 'Phase 3 — Professional JS & TypeScript',
      description: 'Understand how TypeScript adds static compile-time checking to JavaScript, preventing undefined errors before code ever runs in production.',
      estimatedHours: 10,
      outcomes: [
        'Understand why TypeScript exists and configure tsconfig.json with strict: true',
        'Model data structures using type aliases and interfaces',
        'Master unions, generics, and type narrowing with type guards',
        'Understand the critical difference between compile-time TypeScript and runtime validation',
      ],
      prerequisites: ['Phase 2: JavaScript Fundamentals'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-07',
        moduleId: 'mod-07-typescript-core',
        title: 'TypeScript Foundations Checkpoint',
        description: 'Verify your understanding of TypeScript types, generics, and narrowing.',
        passingScore: 75,
        questions: [
          {
            id: 'q3-1',
            question: 'What happens to TypeScript type annotations when your code is compiled and delivered to the browser?',
            options: [
              'All types are completely erased; browsers only execute pure standard JavaScript',
              'The browser compiles the types into WebAssembly at runtime',
              'Types are stored in the DOM for search engine indexing',
              'Types are converted into CSS variables',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! TypeScript types exist solely during development and build time. The compiler strips away all types, leaving lean JavaScript.',
              1: 'Incorrect. TypeScript does not run in WebAssembly; it compiles to standard JS.',
              2: 'Incorrect. Types are completely erased from the runtime bundle.',
              3: 'Incorrect. Types have no relationship with CSS variables.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-13-typescript-basics',
          slug: 'typescript-types-and-interfaces',
          title: 'TypeScript Types, Interfaces, and Strict Mode',
          moduleSlug: 'typescript-foundations-strict',
          moduleTitle: 'TypeScript Core & Type Safety',
          phase: 3,
          phaseTitle: 'Phase 3 — Professional JS & TypeScript',
          readingTimeMinutes: 12,
          objective: 'Define clear data contracts for your functions, objects, and APIs using TypeScript.',
          whyItMatters:
            'The dreaded "TypeError: Cannot read properties of undefined" causes millions of dollars in production outages. TypeScript catches these bugs in your editor before you even save the file.',
          prerequisites: ['JavaScript Fundamentals'],
          sections: [
            {
              id: 'sec-1',
              title: 'Type Annotations & Inferences',
              content:
                'TypeScript extends JavaScript by adding type annotations:\n\n```typescript\n// Explicit annotations\nlet username: string = "alex";\nlet age: number = 28;\nlet isCompleted: boolean = false;\n\n// TypeScript also infers types automatically!\nconst platform = "StackPath"; // inferred as type "StackPath"\n```\n\nAlways enable `"strict": true` in your `tsconfig.json`. This turns on checks like `noImplicitAny` and `strictNullChecks`, forcing you to handle potential `null` or `undefined` values explicitly.',
            },
            {
              id: 'sec-2',
              title: 'Types vs Interfaces',
              content:
                'Both `type` and `interface` define shapes of objects. In modern TypeScript:\n\n- Use `interface` when modeling object structures that might be extended.\n- Use `type` when creating unions, primitives, tuples, or complex mapped types.',
              codeExample: {
                language: 'typescript',
                filename: 'user-contract.ts',
                code: `export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'mentor'; // Union literal
  avatarUrl?: string; // Optional field
}

export function formatGreeting(user: UserProfile): string {
  // TypeScript guarantees user.name exists and is a string!
  return \`Welcome back, \${user.name} (\${user.role})\`;
}`,
              },
            },
          ],
          recap: [
            'TypeScript compiles down to clean JavaScript; types do not exist at runtime.',
            'Always configure `"strict": true` to eliminate null/undefined crashes.',
            'Use union literals (`"admin" | "student"`) instead of loose strings.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-3-1',
              question: 'What does the question mark in "avatarUrl?: string;" indicate?',
              options: [
                'The property is optional and can be undefined or omitted',
                'The property will prompt the user with a question dialog',
                'The property is private and cannot be read outside the file',
                'The property is a regular expression',
              ],
              correctIndex: 0,
              explanation: 'The ? operator marks an optional property on an interface or type.',
            },
          ],
          practicalTask: {
            title: 'Define a TypeScript Course Interface',
            instruction: 'Write a TypeScript interface `CourseModule` with fields for id (string), title (string), lessonCount (number), and status ("locked" | "active" | "completed").',
            hints: ['Use union literals for status.'],
            expectedOutcome: 'A strict interface that rejects arbitrary status strings like "pending".',
          },
          glossaryTerms: ['dom'],
        },
        {
          id: 'les-14-generics-zod-validation',
          slug: 'generics-and-runtime-validation',
          title: 'Generics & Runtime Validation with Zod',
          moduleSlug: 'typescript-foundations-strict',
          moduleTitle: 'TypeScript Core & Type Safety',
          phase: 3,
          phaseTitle: 'Phase 3 — Professional JS & TypeScript',
          readingTimeMinutes: 14,
          objective: 'Write flexible reusable utilities using Generics, and protect application boundaries with runtime Zod schemas.',
          whyItMatters:
            'Because TypeScript types disappear at runtime, a malicious user or corrupted API response can easily send invalid data. Combining TypeScript with Zod gives you end-to-end type safety at runtime.',
          prerequisites: ['TypeScript Types, Interfaces, and Strict Mode'],
          sections: [
            {
              id: 'sec-1',
              title: 'What are Generics?',
              content:
                'Think of a generic like a function parameter, but for types instead of values. It allows you to write reusable components and functions that work over a variety of types while preserving type safety:\n\n```typescript\n// Generic API response container\ninterface ApiResponse<TData> {\n  success: boolean;\n  data: TData;\n  timestamp: string;\n}\n\n// Usage with different types\ntype UserResponse = ApiResponse<UserProfile>;\ntype LessonResponse = ApiResponse<Lesson[]>;\n```',
            },
            {
              id: 'sec-2',
              title: 'Runtime Validation with Zod: The Missing Piece',
              content:
                'TypeScript alone cannot protect your app from bad network payloads:\n\n```typescript\n// DANGEROUS: Type assertion bypasses checks\nconst user = (await res.json()) as UserProfile;\n```\n\nIf the server sent `{ status: 500, error: "Database down" }`, TypeScript won\'t complain, but `user.name` will crash your frontend! Enter **Zod**:',
              codeExample: {
                language: 'typescript',
                filename: 'zod-safe-fetch.ts',
                code: `import { z } from 'zod';

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
});

// Infer TypeScript type automatically from schema!
export type ValidatedUser = z.infer<typeof userSchema>;

export async function fetchUserSafe(id: string): Promise<ValidatedUser> {
  const res = await fetch(\`/api/users/\${id}\`);
  const rawData = await res.json();

  // Validate at runtime! Throws descriptive error if shape is wrong
  return userSchema.parse(rawData);
}`,
              },
            },
          ],
          recap: [
            'Generics (<T>) allow reusable data structures and functions without losing specific type information.',
            'TypeScript types are compile-time only and do NOT validate incoming network data.',
            'Zod validates real runtime data and automatically infers corresponding TypeScript types with `z.infer<typeof schema>`.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-3-2',
              question: 'Why should you use Zod to parse data received from an external API or form submit?',
              options: [
                'To verify at runtime that the actual data matches our expected shape and types, catching invalid data before it causes runtime crashes',
                'Because Zod makes internet downloads 50% smaller',
                'Because TypeScript compile errors appear on the user\'s screen',
                'Zod replaces the need for a database',
              ],
              correctIndex: 0,
              explanation: 'Zod verifies real runtime data at system boundaries, ensuring only valid data enters your application logic.',
            },
          ],
          practicalTask: {
            title: 'Create a Zod Schema with Inferred Type',
            instruction: 'Write a Zod schema `bookmarkSchema` requiring url (valid URL) and title (string min 3 chars). Use `z.infer` to extract the TypeScript type.',
            hints: ['Use z.string().url() for the url validation.'],
            expectedOutcome: 'A schema that parses valid URLs and rejects strings like "not-a-url".',
          },
          glossaryTerms: ['rest-api'],
        },
      ],
    },
  ],
};
