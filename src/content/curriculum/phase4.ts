import { Phase } from '@/types/curriculum';

export const phase4: Phase = {
  phase: 4,
  title: 'Modern Frontend with React',
  subtitle: 'Component-driven user interfaces, reactive state, and custom hooks.',
  description:
    'Transition from manual DOM manipulation to declarative component-driven development. Master JSX, props, useState, useEffect, custom hooks, and clean UI architecture.',
  modules: [
    {
      id: 'mod-08-react-foundations',
      slug: 'react-components-state',
      title: 'React Components, Props & Reactive State',
      phase: 4,
      phaseTitle: 'Phase 4 — Modern Frontend with React',
      description: 'Break complex UIs into independent, composable components. Learn how state triggers re-renders and how to pass data via props.',
      estimatedHours: 12,
      outcomes: [
        'Understand component composition and write JSX with confidence',
        'Pass typed data down to child components via props',
        'Manage component memory with useState and handle immutable state updates',
        'Render lists with unique keys and handle conditional rendering cleanly',
      ],
      prerequisites: ['Phase 3: Professional JS & TypeScript'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-08',
        moduleId: 'mod-08-react-foundations',
        title: 'React Foundations Checkpoint',
        description: 'Test your understanding of component re-renders, JSX rules, and state management.',
        passingScore: 75,
        questions: [
          {
            id: 'q4-1',
            question: 'Why must every item rendered in a React list have a unique "key" prop?',
            options: [
              'Keys help React identify which items have changed, been added, or been removed, avoiding unnecessary re-renders or DOM recreation',
              'Keys are used by Google to index the webpage for search',
              'The key prop is used for CSS styling in Tailwind',
              'Without a key, the browser will throw an uncatchable fatal crash',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! React uses keys during the reconciliation phase to match virtual DOM nodes with actual DOM nodes efficiently.',
              1: 'Incorrect. Keys are internal to React reconciliation and not used by search engines.',
              2: 'Incorrect. Keys are not CSS selectors.',
              3: 'Incorrect. Missing keys produce a console warning, not a fatal browser crash.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-15-react-components-props',
          slug: 'components-jsx-and-props',
          title: 'Component Architecture, JSX, and Typed Props',
          moduleSlug: 'react-components-state',
          moduleTitle: 'React Components, Props & Reactive State',
          phase: 4,
          phaseTitle: 'Phase 4 — Modern Frontend with React',
          readingTimeMinutes: 12,
          objective: 'Deconstruct complex user interfaces into self-contained, reusable React components with typed props.',
          whyItMatters:
            'Instead of writing thousands of lines in one giant HTML file, React lets you build reusable UI blocks like Lego bricks that can be tested, styled, and maintained independently.',
          prerequisites: ['Phase 3: Professional JS & TypeScript'],
          sections: [
            {
              id: 'sec-1',
              title: 'What is a React Component?',
              content:
                'A React component is simply a JavaScript function that accepts inputs (called **props**) and returns a description of the user interface using **JSX**:\n\n```tsx\ninterface BadgeProps {\n  label: string;\n  variant?: \'success\' | \'warning\' | \'neutral\';\n}\n\nexport function Badge({ label, variant = \'neutral\' }: BadgeProps) {\n  return (\n    <span className={`badge badge-\${variant}`}>\n      {label}\n    </span>\n  );\n}\n```\n\nNotice that JSX looks like HTML, but allows you to seamlessly embed JavaScript expressions inside curly braces `{label}`.',
            },
            {
              id: 'sec-2',
              title: 'The Rules of JSX',
              content:
                '1. **Return a single root element**: If you have multiple elements, wrap them in a fragment `<> ... </>`.\n2. **Close all tags**: `<img />`, `<input />`, and `<br />` must be self-closing.\n3. **camelCase naming**: Use `className` instead of `class`, `htmlFor` instead of `for`, and `onClick` instead of `onclick`.',
            },
          ],
          recap: [
            'Components are pure functions returning JSX descriptions of UI.',
            'Props are read-only inputs passed from parent components to child components.',
            'Use fragments (<> ... </>) to group siblings without extra DOM divs.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-4-1',
              question: 'Can a child component directly modify the props it receives from its parent?',
              options: [
                'No, props are strictly read-only and immutable in React',
                'Yes, any component can reassign its props directly',
                'Only if the prop is a number',
                'Only inside a useEffect hook',
              ],
              correctIndex: 0,
              explanation: 'Props are strictly read-only snapshots. If a child needs to communicate a change to a parent, the parent passes a callback function as a prop.',
            },
          ],
          practicalTask: {
            title: 'Build a Reusable Card Component',
            instruction: 'Write a React functional component `CourseCard` taking props: `title: string`, `hours: number`, and `isCompleted: boolean`. Conditionally render a checkmark icon if completed.',
            hints: ['Use ternary expression `{isCompleted ? "✅" : "⏳"}` inside JSX.'],
            expectedOutcome: 'A reusable component ready to display course modules.',
          },
          glossaryTerms: ['react-component', 'react-state'],
        },
        {
          id: 'les-16-react-state-hooks',
          slug: 'state-management-and-hooks',
          title: 'Reactive State with useState and useEffect',
          moduleSlug: 'react-components-state',
          moduleTitle: 'React Components, Props & Reactive State',
          phase: 4,
          phaseTitle: 'Phase 4 — Modern Frontend with React',
          readingTimeMinutes: 14,
          objective: 'Manage reactive component memory with useState, handle side effects and cleanup with useEffect, and write custom hooks.',
          whyItMatters:
            'State is the beating heart of interactive applications. Understanding how state updates trigger re-renders enables you to build snappy, bug-free web experiences.',
          prerequisites: ['Component Architecture, JSX, and Typed Props'],
          sections: [
            {
              id: 'sec-1',
              title: 'Understanding useState',
              content:
                'Regular JavaScript variables disappear when a function finishes executing. `useState` is a React Hook that preserves a value across re-renders:\n\n```tsx\nimport { useState } from \'react\';\n\nexport function Counter() {\n  const [count, setCount] = useState<number>(0);\n\n  return (\n    <button onClick={() => setCount((prev) => prev + 1)}>\n      Count: {count}\n    </button>\n  );\n}\n```\n\nWhenever `setCount` is called, React schedules a re-render of the component with the new count value.',
            },
            {
              id: 'sec-2',
              title: 'Side Effects and the Sacred Cleanup Function',
              content:
                '`useEffect` lets you synchronize your component with external systems (network requests, browser storage, subscriptions, timers):\n\n```tsx\nuseEffect(() => {\n  const timer = setInterval(() => {\n    console.log(\'Heartbeat ping\');\n  }, 1000);\n\n  // CRITICAL: Cleanup function runs when component unmounts!\n  return () => clearInterval(timer);\n}, []); // Empty dependency array = run once on mount\n```\n\nAlways provide the cleanup function when setting up timers, subscriptions, or event listeners to prevent severe memory leaks!',
              callout: {
                type: 'mistake',
                title: 'The Stale Dependency Bug',
                text: 'If your effect uses a prop or state variable inside, you MUST include it in the dependency array [myVar], or React will capture a stale, frozen snapshot from the initial render.',
              },
            },
          ],
          recap: [
            'useState preserves state across renders and triggers UI updates.',
            'Always use updater functions (prev => prev + 1) when next state depends on current state.',
            'useEffect connects components to external systems; always return a cleanup function for timers/subscriptions.',
            'Custom hooks (e.g. useLocalStorage) package stateful logic for reuse across multiple components.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-4-2',
              question: 'When does the cleanup function returned by useEffect execute?',
              options: [
                'When the component unmounts or before re-running the effect on dependency change',
                'Only when the browser window is closed',
                'Immediately before the component renders for the first time',
                'Only if an uncaught error is thrown',
              ],
              correctIndex: 0,
              explanation: 'React runs the cleanup function to clean up previous subscriptions whenever the component unmounts or before re-executing the effect with new dependencies.',
            },
          ],
          practicalTask: {
            title: 'Build a Custom useDebounce Hook',
            instruction: 'Write a custom hook `useDebounce<T>(value: T, delayMs: number): T` that delays updating its return value until the specified milliseconds have passed without changes.',
            hints: ['Use useState for debouncedValue and useEffect with setTimeout and clearTimeout in the cleanup return.'],
            expectedOutcome: 'A rock-solid debouncing hook that prevents excessive search API requests.',
          },
          glossaryTerms: ['react-state', 'react-component'],
        },
      ],
    },
  ],
};
