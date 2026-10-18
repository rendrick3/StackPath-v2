import { PracticeChallenge } from '@/types/features';

export const practiceChallenges: PracticeChallenge[] = [
  {
    id: 'challenge-1-semantic-card',
    title: 'Accessible Profile Card Scaffolding',
    difficulty: 'beginner',
    category: 'html',
    estimatedMinutes: 15,
    description:
      'Build a semantically structured profile card with an avatar, heading, bio paragraph, list of social links, and an action button. Do not use generic <div> tags where semantic tags apply.',
    inputsAndRequirements: [
      'Use an <article> tag as the outer container.',
      'Include an <img> with descriptive alt text.',
      'Use an <h2> for the person\'s name.',
      'Represent social links inside a <nav> containing an unordered list (<ul>/<li>).',
      'Use a native <button> tag for the "Follow" action with type="button".',
    ],
    expectedOutcome:
      'An accessible HTML structure that provides clear landmark navigation and headings when inspected in screen readers and accessibility trees.',
    starterCode: `<!-- TODO: Replace generic divs with semantic elements -->
<div class="profile-card">
  <div class="avatar-wrapper">
    <img src="/avatar.jpg">
  </div>
  <div class="name">Alex Morgan</div>
  <div class="bio">Full-stack software engineer passionate about web standards.</div>
  <div class="socials">
    <a href="https://github.com">GitHub</a>
    <a href="https://linkedin.com">LinkedIn</a>
  </div>
  <div class="action-btn" onclick="follow()">Follow</div>
</div>`,
    hints: [
      'The outer container represents a standalone content card; consider <article>.',
      'Interactive actions like "Follow" must be a <button>, not a <div> with an onclick handler.',
      'Social links are a navigation group; wrap them in <nav aria-label="Social links">.',
    ],
    solutionCode: `<article class="profile-card">
  <header>
    <img src="/avatar.jpg" alt="Alex Morgan smiling in a studio portrait" width="96" height="96" />
    <h2>Alex Morgan</h2>
  </header>
  <p class="bio">Full-stack software engineer passionate about web standards.</p>
  <nav aria-label="Alex Morgan's social profiles">
    <ul>
      <li><a href="https://github.com" rel="noopener noreferrer">GitHub</a></li>
      <li><a href="https://linkedin.com" rel="noopener noreferrer">LinkedIn</a></li>
    </ul>
  </nav>
  <footer>
    <button type="button" class="btn-primary">Follow</button>
  </footer>
</article>`,
    solutionExplanation:
      'Semantic tags communicate meaning to the browser and assistive technology. Using <article>, <header>, <nav>, <ul>, and <button> allows screen reader users to jump directly between landmarks and interact with the button via Enter and Space keys automatically.',
  },
  {
    id: 'challenge-2-flexbox-nav',
    title: 'Responsive Flexbox Header Bar',
    difficulty: 'beginner',
    category: 'css',
    estimatedMinutes: 20,
    description:
      'Create a modern navigation header where the logo sits on the far left, navigation links are centered, and user actions (search & profile button) are pinned to the far right. Ensure vertical centering and responsive behavior.',
    inputsAndRequirements: [
      'Header container must use display: flex and align-items: center.',
      'Use justify-content: space-between on the header container.',
      'Ensure navigation links have comfortable touch targets (at least 44px height or padding).',
      'Support gap between navigation items without margin hacks.',
    ],
    expectedOutcome:
      'A flexible header bar that neatly distributes the three groups across any screen width without wrapping or overlapping.',
    starterCode: `.site-header {
  /* Add Flexbox properties here */
}

.site-nav ul {
  /* Align list items horizontally with gap */
}

.user-actions {
  /* Ensure actions align horizontally */
}`,
    hints: [
      'Use display: flex and justify-content: space-between on .site-header.',
      'To remove default list styling, set list-style: none and margin: 0; padding: 0 on ul.',
      'Use gap: 1.5rem to space items naturally instead of margin-right on children.',
    ],
    solutionCode: `.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
}

.site-nav ul {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-nav a {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  min-height: 44px;
  line-height: calc(44px - 1rem);
  text-decoration: none;
  color: var(--text-secondary);
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}`,
    solutionExplanation:
      'Flexbox space-between pushes the first child to the left edge, the middle child to the center (when widths are balanced), and the last child to the right edge. Using gap replaces old negative-margin hacks.',
  },
  {
    id: 'challenge-3-immutable-state',
    title: 'Immutable Array & Object Updates',
    difficulty: 'intermediate',
    category: 'javascript',
    estimatedMinutes: 25,
    description:
      'In modern React and JavaScript engineering, mutating arrays and objects directly causes stale state bugs. Write pure functions to add, toggle, and delete items from an array of todo items without mutating the original array.',
    inputsAndRequirements: [
      'Implement addTodo(todos, text): returns a new array with a new item added.',
      'Implement toggleTodo(todos, id): returns a new array where the matching item has completed flipped.',
      'Implement removeTodo(todos, id): returns a new array excluding the matching item.',
      'NEVER use push, splice, or assign directly to todos[i].completed.',
    ],
    expectedOutcome:
      'Pure functions that produce new array references, preserving the original array unchanged.',
    starterCode: `interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function addTodo(todos: Todo[], text: string): Todo[] {
  // TODO: return new array with new item
  return todos;
}

function toggleTodo(todos: Todo[], id: string): Todo[] {
  // TODO: return new array with toggled item
  return todos;
}

function removeTodo(todos: Todo[], id: string): Todo[] {
  // TODO: return new array without item
  return todos;
}`,
    hints: [
      'Use the spread operator [...todos, newItem] to add without push.',
      'Use todos.map() to return a new array where item.id === id returns a copy { ...item, completed: !item.completed }.',
      'Use todos.filter() to return all items where item.id !== id.',
    ],
    solutionCode: `interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function addTodo(todos: readonly Todo[], text: string): Todo[] {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
  };
  return [...todos, newTodo];
}

function toggleTodo(todos: readonly Todo[], id: string): Todo[] {
  return todos.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item
  );
}

function removeTodo(todos: readonly Todo[], id: string): Todo[] {
  return todos.filter((item) => item.id !== id);
}`,
    solutionExplanation:
      'Array.prototype.map and Array.prototype.filter always return a brand-new array. When an item matches, creating a new object copy with { ...item, completed: !item.completed } ensures shallow immutability, which allows React to detect state changes efficiently.',
  },
  {
    id: 'challenge-4-typescript-discriminated-unions',
    title: 'Type-Safe Async State with Discriminated Unions',
    difficulty: 'intermediate',
    category: 'typescript',
    estimatedMinutes: 20,
    description:
      'Avoid "impossible states" (such as isLoading: true AND error: "Network error" at the same time). Model an asynchronous API response state using TypeScript Discriminated Unions and write an exhaustive switch handler.',
    inputsAndRequirements: [
      'Define an AsyncState<T> union with four states: "idle", "loading", "success", and "error".',
      'The "success" state must hold data: T.',
      'The "error" state must hold errorMessage: string.',
      'Write a renderMessage function with an exhaustive switch checking state.status.',
    ],
    expectedOutcome:
      'TypeScript compiler verifies that you cannot access data when status is "loading", and enforces handling of all union members.',
    starterCode: `// Bad pattern: all optional booleans and properties
interface BadState<T> {
  isLoading: boolean;
  isError: boolean;
  data?: T;
  error?: string;
}

// TODO: Define Discriminated Union AsyncState<T>
type AsyncState<T> = any;

function renderStatus<T>(state: AsyncState<T>): string {
  // TODO: Implement exhaustive check
  return '';
}`,
    hints: [
      'Define separate types: IdleState, LoadingState, SuccessState<T>, ErrorState, each with status: "idle" | "loading" | "success" | "error".',
      'Union them: type AsyncState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;',
      'Use an exhaustive default case: const _exhaustive: never = state; return _exhaustive;',
    ],
    solutionCode: `type IdleState = { status: 'idle' };
type LoadingState = { status: 'loading' };
type SuccessState<T> = { status: 'success'; data: T };
type ErrorState = { status: 'error'; errorMessage: string };

export type AsyncState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;

export function renderStatus<T>(state: AsyncState<T>): string {
  switch (state.status) {
    case 'idle':
      return 'Ready to fetch';
    case 'loading':
      return 'Loading data...';
    case 'success':
      return \`Loaded: \${JSON.stringify(state.data)}\`;
    case 'error':
      return \`Error occurred: \${state.errorMessage}\`;
    default: {
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
    }
  }
}`,
    solutionExplanation:
      'Discriminated unions leverage a common literal field (here status) to narrow types. The compiler knows that state.data only exists inside the case "success" branch. The never check guarantees that if a new status is added later, TypeScript will produce a compile error until it is handled.',
  },
  {
    id: 'challenge-5-zod-api-guard',
    title: 'Server-Side Input Validation with Zod',
    difficulty: 'advanced',
    category: 'backend',
    estimatedMinutes: 30,
    description:
      'Build a production-grade Zod schema for creating a new user issue/ticket. Reject invalid inputs, sanitize whitespace, enforce email formats, and return friendly field-level validation errors.',
    inputsAndRequirements: [
      'Title: string between 5 and 100 characters, trimmed.',
      'Description: string between 10 and 2000 characters.',
      'Priority: enum of "low" | "medium" | "high" | "urgent".',
      'AssignedEmail: optional valid email string.',
      'Tags: array of strings, max 5 tags, each tag alphanumeric.',
    ],
    expectedOutcome:
      'A safe Zod schema that parses valid payloads and returns structured issues for invalid inputs.',
    starterCode: `import { z } from 'zod';

export const createIssueSchema = z.object({
  // TODO: Define validated fields
});

export type CreateIssueInput = z.infer<typeof createIssueSchema>;`,
    hints: [
      'Use z.string().trim().min(5).max(100) for title.',
      'Use z.enum(["low", "medium", "high", "urgent"]) for priority.',
      'Use z.string().email().optional() for assignedEmail.',
      'Use z.array(z.string().regex(/^[a-z0-9-]+$/i)).max(5) for tags.',
    ],
    solutionCode: `import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),
  priority: z.enum(['low', 'medium', 'high', 'urgent'], {
    errorMap: () => ({ message: 'Priority must be low, medium, high, or urgent' }),
  }),
  assignedEmail: z
    .string()
    .trim()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  tags: z
    .array(
      z.string().trim().regex(/^[a-zA-Z0-9_-]+$/, 'Tags can only contain letters, numbers, and dashes')
    )
    .max(5, 'Maximum of 5 tags allowed')
    .default([]),
});

export type CreateIssueInput = z.infer<typeof createIssueSchema>;`,
    solutionExplanation:
      'Zod performs runtime validation at the perimeter of your application. Parsing with safeParse guarantees that all data passed downstream into database queries satisfies our business rules and prevents SQL injection or data corruption.',
  },
];
