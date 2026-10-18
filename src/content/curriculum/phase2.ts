import { Phase } from '@/types/curriculum';

export const phase2: Phase = {
  phase: 2,
  title: 'JavaScript Fundamentals',
  subtitle: 'The programming language of the modern web: from primitives to async/await.',
  description:
    'Learn programming from the ground up: variables, functions, scopes, arrays, objects, DOM manipulation, browser events, and asynchronous fetch APIs.',
  modules: [
    {
      id: 'mod-05-js-core',
      slug: 'js-core-foundations',
      title: 'JavaScript Language Foundations',
      phase: 2,
      phaseTitle: 'Phase 2 — JavaScript Fundamentals',
      description: 'Master variables (const vs let), data types, operators, conditional branching, functions, and scopes.',
      estimatedHours: 10,
      outcomes: [
        'Understand the 7 primitive types and reference types (Objects & Arrays)',
        'Master functions, arrow functions, and lexical scope closures',
        'Manipulate arrays immutably with map, filter, and reduce',
      ],
      prerequisites: ['Phase 1: Web Foundations'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-05',
        moduleId: 'mod-05-js-core',
        title: 'JavaScript Core Checkpoint',
        description: 'Verify your understanding of JavaScript variable declarations, types, and closures.',
        passingScore: 75,
        questions: [
          {
            id: 'q2-1',
            question: 'Why is "const" preferred over "let" for variables that are not reassigned in modern JavaScript?',
            options: [
              'const prevents accidental reassignment and signals developer intent clearly',
              'const variables make JavaScript code run 10x faster',
              'const variables cannot hold arrays or objects',
              'let has been deprecated in modern ECMAScript standards',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! const communicates that this binding will never be reassigned, preventing subtle accidental overwrite bugs.',
              1: 'Incorrect. Performance difference is negligible.',
              2: 'Incorrect. const CAN hold arrays and objects (their contents can be mutated unless frozen).',
              3: 'Incorrect. let is alive and well for variables that need re-assignment (like loop counters).',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-09-js-types-functions',
          slug: 'js-variables-types-functions',
          title: 'Variables, Types, and Functions',
          moduleSlug: 'js-core-foundations',
          moduleTitle: 'JavaScript Language Foundations',
          phase: 2,
          phaseTitle: 'Phase 2 — JavaScript Fundamentals',
          readingTimeMinutes: 12,
          objective: 'Declare variables safely with const and let, understand JavaScript data types, and write reusable functions.',
          whyItMatters:
            'JavaScript powers every interactive feature in the browser and full-stack servers. Mastering functions and types is the bedrock of your engineering career.',
          prerequisites: ['Phase 1: Web Foundations'],
          sections: [
            {
              id: 'sec-1',
              title: 'Variables: const vs let (and why var is dead)',
              content:
                'Never use `var` in modern JavaScript. `var` has confusing function-scoping and hoisting rules that cause silent bugs.\n\n- Use `const` by default for everything: variables, functions, and objects.\n- Use `let` only when you explicitly plan to reassign a value (like an incrementing counter in a loop).\n\n```javascript\nconst maxAttempts = 3; // Immutable reference\nlet currentAttempt = 0; // Reassignable\ncurrentAttempt++;\n```',
            },
            {
              id: 'sec-2',
              title: 'The Seven Primitive Types vs Objects',
              content:
                'JavaScript values fall into two categories:\n\n1. **Primitives** (Stored directly by value):\n   - `string`: `"Hello, StackPath"`\n   - `number`: `42` or `3.14`\n   - `boolean`: `true` or `false`\n   - `null`: Intentional absence of any value\n   - `undefined`: Variable declared but not yet assigned\n   - `symbol` & `bigint`: Advanced unique identifiers and large numbers\n\n2. **Reference Types** (Stored as references in memory):\n   - `Object`: `{ name: "Alex", role: "Dev" }`\n   - `Array`: `["HTML", "CSS", "JS"]`\n   - `Function`: `(a, b) => a + b`\n\nWhen you assign an object to a new variable, you are copying the pointer/address, NOT creating a new object!',
              callout: {
                type: 'mistake',
                title: 'The Mutation Trap',
                text: 'const user = { name: "Alex" }; user.name = "Sam"; // This works! const protects the binding pointer, not the internal properties of the object.',
              },
            },
          ],
          recap: [
            'Always use `const` by default; use `let` only when reassignment is needed. Avoid `var`.',
            'Primitives are compared by value; objects and arrays are compared by reference.',
            'Arrow functions provide concise syntax and inherit lexical `this`.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-2-1',
              question: 'What is the result of typeof null in JavaScript?',
              options: ['"object"', '"null"', '"undefined"', '"number"'],
              correctIndex: 0,
              explanation: 'In JavaScript, typeof null returns "object" due to a historical legacy bug from 1995 that remains for backwards compatibility.',
            },
          ],
          practicalTask: {
            title: 'Experiment with Types in the Console',
            instruction: 'Open DevTools Console (F12 -> Console) and type `typeof 42`, `typeof "hello"`, and `typeof { name: "test" }`. Verify the outputs.',
            hints: ['You can type multiline JavaScript in the console using Shift+Enter.'],
            expectedOutcome: 'Console returns "number", "string", and "object".',
          },
          glossaryTerms: ['closure', 'dom'],
        },
        {
          id: 'les-10-arrays-objects-immutability',
          slug: 'arrays-objects-and-immutability',
          title: 'Arrays, Objects, and Immutable Transformations',
          moduleSlug: 'js-core-foundations',
          moduleTitle: 'JavaScript Language Foundations',
          phase: 2,
          phaseTitle: 'Phase 2 — JavaScript Fundamentals',
          readingTimeMinutes: 12,
          objective: 'Transform data using modern array methods (map, filter, reduce) and spread operators without mutating the original state.',
          whyItMatters:
            'React, Redux, and modern full-stack frameworks rely on immutability to detect state changes. Writing clean array transformations will make React feel intuitive and effortless.',
          prerequisites: ['Variables, Types, and Functions'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Big Three: map, filter, and reduce',
              content:
                'Instead of writing clumsy for-loops, modern JavaScript uses expressive declarative array methods:\n\n- `map()`: Transforms every item into something new (e.g. converting prices to formatted strings).\n- `filter()`: Keeps only items that pass a true/false condition.\n- `find()`: Returns the first single item that matches.',
              codeExample: {
                language: 'javascript',
                filename: 'transformations.js',
                code: `const lessons = [
  { id: 1, title: 'HTML Basics', completed: true },
  { id: 2, title: 'CSS Layout', completed: false },
  { id: 3, title: 'JS Loops', completed: true },
];

// 1. Filter: Get only completed lessons
const completedLessons = lessons.filter((les) => les.completed);

// 2. Map: Extract just the titles
const titles = completedLessons.map((les) => les.title);
console.log(titles); // ['HTML Basics', 'JS Loops']`,
              },
            },
            {
              id: 'sec-2',
              title: 'The Spread Operator: Cloning and Updating',
              content:
                'Use the spread operator (`...`) to create shallow copies when updating objects or arrays:\n\n```javascript\n// Safe array addition\nconst nextTodos = [...todos, { id: 4, text: "Learn React" }];\n\n// Safe object property update\nconst updatedUser = { ...user, role: "Senior Developer" };\n```\n\nThis ensures the original `todos` and `user` objects are never modified directly.',
            },
          ],
          recap: [
            'map transforms each item; filter keeps matching items.',
            'Never mutate state directly; always create fresh copies with spread (...) or array methods.',
            'Immutability prevents race conditions and makes bug tracking straightforward.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-2-2',
              question: 'Which method returns a brand new array with only elements that satisfy a condition?',
              options: ['filter()', 'map()', 'push()', 'forEach()'],
              correctIndex: 0,
              explanation: 'filter() evaluates a test function on each element and returns a new array with all elements that returned true.',
            },
          ],
          practicalTask: {
            title: 'Filter and Map an Array of Products',
            instruction: 'In your browser console, create an array of 3 products with prices. Use `.filter()` to keep items under $50, then `.map()` to double their quantities.',
            hints: ['Chain them together: products.filter(...).map(...)'],
            expectedOutcome: 'A new transformed array without modifying the original product list.',
          },
          glossaryTerms: ['closure', 'dom'],
        },
      ],
    },
    {
      id: 'mod-06-js-async-dom',
      slug: 'js-dom-events-async',
      title: 'DOM Manipulation, Events & Async/Await',
      phase: 2,
      phaseTitle: 'Phase 2 — JavaScript Fundamentals',
      description: 'Interact with webpage elements, listen for clicks and keystrokes, and master Promises, async/await, and fetching remote JSON APIs.',
      estimatedHours: 12,
      outcomes: [
        'Query and manipulate DOM nodes dynamically',
        'Handle user events with addEventListener and event delegation',
        'Master the Event Loop, Promises, and async/await syntax',
        'Fetch remote data from REST APIs using window.fetch()',
      ],
      prerequisites: ['JavaScript Language Foundations'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-06',
        moduleId: 'mod-06-js-async-dom',
        title: 'DOM & Async JavaScript Checkpoint',
        description: 'Test your understanding of browser events, asynchronous operations, and fetch API.',
        passingScore: 75,
        questions: [
          {
            id: 'q2-2',
            question: 'What does "await fetch(url)" do in an async function?',
            options: [
              'Freezes the user\'s entire operating system until the download finishes',
              'Pauses execution of the async function non-blockingly until the Promise resolves with the response',
              'Saves the downloaded file directly to the user\'s desktop',
              'Converts the JSON string into HTML automatically',
            ],
            correctIndex: 1,
            explanations: {
              0: 'Incorrect. JavaScript is asynchronous and non-blocking; the browser continues rendering and handling user clicks.',
              1: 'Correct! await pauses the async function cleanly until the network request completes, without blocking the browser main thread.',
              2: 'Incorrect. fetch returns an HTTP Response object into memory.',
              3: 'Incorrect. You must call response.json() to parse JSON data.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-11-dom-and-events',
          slug: 'dom-manipulation-and-events',
          title: 'DOM Manipulation, Events, and Event Delegation',
          moduleSlug: 'js-dom-events-async',
          moduleTitle: 'DOM Manipulation, Events & Async/Await',
          phase: 2,
          phaseTitle: 'Phase 2 — JavaScript Fundamentals',
          readingTimeMinutes: 12,
          objective: 'Select elements, listen to user interactions, and update the DOM securely.',
          whyItMatters:
            'Everything that moves, opens, closes, or updates on a web page happens by manipulating the DOM in response to events.',
          prerequisites: ['Arrays, Objects, and Immutability'],
          sections: [
            {
              id: 'sec-1',
              title: 'Selecting Elements with querySelector',
              content:
                'Use standard CSS selectors to find elements:\n\n- `document.querySelector(".btn-save")`: Finds the first match.\n- `document.querySelectorAll("li.item")`: Returns a NodeList of all matches.\n\nTo update content safely, always use `element.textContent` instead of `element.innerHTML` to prevent Cross-Site Scripting (XSS) attacks.',
            },
            {
              id: 'sec-2',
              title: 'Event Delegation: The Professional Secret',
              content:
                'Imagine you have a list of 500 tasks. Attaching 500 separate click listeners consumes heavy memory and breaks whenever new tasks are added dynamically.\n\nInstead, attach ONE listener to the parent `<ul>` container. Because events **bubble up** through the DOM tree, the parent can check `event.target` to know exactly which child button was clicked!',
              codeExample: {
                language: 'javascript',
                filename: 'event-delegation.js',
                code: `const list = document.querySelector('#todo-list');

list.addEventListener('click', (event) => {
  // Check if the clicked element is a delete button
  if (event.target.matches('button.delete-btn')) {
    const item = event.target.closest('li');
    item.remove();
  }
});`,
              },
            },
          ],
          recap: [
            'Use querySelector and querySelectorAll to locate elements with CSS syntax.',
            'Use textContent to set text safely; avoid innerHTML with user input.',
            'Event delegation leverages event bubbling to handle dynamic child elements efficiently.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-2-3',
              question: 'Why is element.textContent safer than element.innerHTML when displaying user-submitted comments?',
              options: [
                'textContent automatically treats HTML tags as plain text, preventing malicious script execution (XSS)',
                'textContent renders in bold font',
                'textContent is supported only in Google Chrome',
                'innerHTML is deprecated',
              ],
              correctIndex: 0,
              explanation: 'textContent treats all input as literal strings, neutralizing any injected <script> tags.',
            },
          ],
          practicalTask: {
            title: 'Add a Click Listener in DevTools',
            instruction: 'In the console, run `document.body.addEventListener("click", () => console.log("Clicked!"))`. Click anywhere on the webpage and see your clicks logged.',
            hints: ['Reloading the page clears the listener.'],
            expectedOutcome: '"Clicked!" appears in the console on every click.',
          },
          glossaryTerms: ['dom', 'xss'],
        },
        {
          id: 'les-12-async-promises-fetch',
          slug: 'promises-async-await-and-fetch',
          title: 'Asynchronous JavaScript: Promises, Async/Await & Fetch',
          moduleSlug: 'js-dom-events-async',
          moduleTitle: 'DOM Manipulation, Events & Async/Await',
          phase: 2,
          phaseTitle: 'Phase 2 — JavaScript Fundamentals',
          readingTimeMinutes: 14,
          objective: 'Master the JavaScript Event Loop, understand how Promises work, and fetch JSON data from remote servers with try/catch error handling.',
          whyItMatters:
            'Web applications constantly communicate over networks. Because networks have latency, mastering asynchronous non-blocking programming is required for every full-stack developer.',
          prerequisites: ['DOM Manipulation and Events'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Restaurant Buzzer Analogy of Promises',
              content:
                'JavaScript is **single-threaded**—it can only execute one line of code at a time on the main CPU thread.\n\nIf downloading a photo took 3 seconds synchronously, the user\'s screen would freeze completely. To avoid this, JavaScript uses **Promises**.\n\nA Promise is like a restaurant pager: you order food, get a pager, and keep chatting. When the food is ready, the pager vibrates with your meal (Resolved). If the kitchen is out of food, the pager flashes red (Rejected).',
            },
            {
              id: 'sec-2',
              title: 'Clean Network Calls with async/await and try/catch',
              content:
                '`async/await` is modern syntactic sugar over Promises that allows asynchronous code to read as cleanly as synchronous code:',
              codeExample: {
                language: 'javascript',
                filename: 'fetch-users.js',
                code: `async function loadUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    // Always check if HTTP status is 2xx
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const users = await response.json();
    console.log(\`Successfully loaded \${users.length} users!\`);
    return users;
  } catch (error) {
    console.error('Failed to load users:', error.message);
    // Show friendly recovery UI to the user
  }
}`,
              },
              callout: {
                type: 'mistake',
                title: 'The response.ok Trap',
                text: 'fetch() does NOT reject on 404 or 500 HTTP errors! It only rejects if there is a network outage or DNS failure. You MUST always check if (!response.ok) manually.',
              },
            },
          ],
          recap: [
            'Promises represent future values (Pending, Fulfilled, Rejected).',
            'async/await makes asynchronous flows readable and sequential.',
            'Always wrap network calls in try/catch blocks.',
            'Remember: fetch() only rejects on network failures; check response.ok for HTTP errors.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-2-4',
              question: 'Does fetch() throw an error if the server returns a 404 Not Found response?',
              options: [
                'No, fetch only rejects on network failures; response.ok will be false and response.status will be 404',
                'Yes, fetch throws an error on any status code other than 200',
                'It depends on whether you are using Google Chrome or Firefox',
                'fetch only supports 200 OK responses',
              ],
              correctIndex: 0,
              explanation: 'fetch resolves successfully as long as a response is received, even if the status code is 404 or 500. Always check response.ok.',
            },
          ],
          practicalTask: {
            title: 'Fetch Real Data in Your Browser Console',
            instruction: 'Open the console and run `const res = await fetch("https://api.github.com/zen"); console.log(await res.text());`. Observe GitHub\'s daily engineering quote.',
            hints: ['Modern browser consoles support top-level await.'],
            expectedOutcome: 'A philosophical programming quote is printed to the console.',
          },
          glossaryTerms: ['promise', 'http', 'rest-api'],
        },
      ],
    },
  ],
};
