import { Phase } from '@/types/curriculum';

export const phase1: Phase = {
  phase: 1,
  title: 'Web Foundations: HTML & CSS',
  subtitle: 'Crafting accessible semantics, responsive layouts, and modern design systems.',
  description:
    'Learn how to write clean, semantic HTML5 and engineer flexible, responsive CSS layouts using the Box Model, Flexbox, and CSS Grid.',
  modules: [
    {
      id: 'mod-03-html-semantics',
      slug: 'html-semantics-accessibility',
      title: 'Semantic HTML & Accessibility (a11y)',
      phase: 1,
      phaseTitle: 'Phase 1 — Web Foundations',
      description: 'Stop building "div soup". Build accessible, SEO-friendly web pages with semantic landmarks, accessible forms, and clean heading hierarchies.',
      estimatedHours: 6,
      outcomes: [
        'Understand when to use <header>, <nav>, <main>, <article>, <section>, and <footer>',
        'Build accessible forms with proper <label> associations and input types',
        'Ensure screen reader compatibility with ARIA attributes and descriptive alt tags',
      ],
      prerequisites: ['Phase 0: Digital Foundations'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-03',
        moduleId: 'mod-03-html-semantics',
        title: 'Semantic HTML Checkpoint',
        description: 'Verify your knowledge of semantic elements and web accessibility standards.',
        passingScore: 75,
        questions: [
          {
            id: 'q1-1',
            question: 'Why should you use a <button> tag instead of a <div> with an onClick handler for an action?',
            options: [
              '<button> is automatically keyboard accessible with Tab, Enter, and Space keys and is announced correctly to screen readers',
              '<div> tags are not allowed in HTML5 documents',
              '<button> tags render faster in the browser engine',
              '<div> tags cannot be styled with CSS',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! Native <button> elements provide keyboard navigation (Tab, Enter, Space) and screen reader roles out of the box without complex custom JavaScript.',
              1: 'Incorrect. <div> is completely valid HTML5, but lacks semantic meaning.',
              2: 'Incorrect. Rendering speed difference is negligible; accessibility is the primary reason.',
              3: 'Incorrect. <div> tags can easily be styled with CSS.',
            },
          },
          {
            id: 'q1-2',
            question: 'How should an accessible form input be connected to its visible text label?',
            options: [
              'By putting them in the same row with CSS Flexbox',
              'By matching the label\'s "for" (or htmlFor) attribute to the input\'s "id" attribute',
              'By giving both the label and input the exact same class name',
              'Labels are optional if placeholder text is provided',
            ],
            correctIndex: 1,
            explanations: {
              0: 'Incorrect. Visual placement does not connect elements in the accessibility tree.',
              1: 'Correct! Setting <label for="user-email"> and <input id="user-email"> establishes a programmatic connection so clicking the label focuses the input and screen readers announce the label.',
              2: 'Incorrect. Class names are for CSS styling, not programmatic accessibility associations.',
              3: 'Incorrect. Placeholders are low-contrast and disappear on focus; they are never an accessible replacement for real labels.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-05-semantic-scaffolding',
          slug: 'semantic-html-landmarks',
          title: 'Semantic HTML5 and Accessible Document Structure',
          moduleSlug: 'html-semantics-accessibility',
          moduleTitle: 'Semantic HTML & Accessibility (a11y)',
          phase: 1,
          phaseTitle: 'Phase 1 — Web Foundations',
          readingTimeMinutes: 10,
          objective: 'Replace unsemantic div tags with meaningful HTML5 landmark tags that enhance SEO and assistive technology.',
          whyItMatters:
            'Over 1 billion people worldwide rely on accessible digital interfaces. Writing semantic HTML is the single highest-impact accessibility practice and also improves search engine rankings.',
          prerequisites: ['What Full-Stack Development Actually Means'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Danger of "Div Soup"',
              content:
                'In the early days of web development, developers wrapped everything in generic `<div>` tags:\n\n```html\n<!-- BAD: Div Soup (Screen readers cannot navigate this) -->\n<div class="header">\n  <div class="nav">\n    <div class="nav-item">Home</div>\n  </div>\n</div>\n```\n\nTo a screen reader, every `<div>` is just generic "grouping". There are no landmarks to jump between. Semantic HTML5 introduced purpose-built tags:\n\n- `<header>`: Introductory content or site branding.\n- `<nav>`: Major navigation links.\n- `<main>`: The unique primary content of this specific page (only one per page).\n- `<article>`: Self-contained content that makes sense on its own (e.g. blog post, product card).\n- `<section>`: Thematic grouping of content with a heading.\n- `<footer>`: Closing metadata, copyright, and secondary links.',
              callout: {
                type: 'mistake',
                title: 'Common Mistake: Multiple <main> Elements',
                text: 'A page should have exactly ONE <main> element representing the primary content. Never place site-wide navigation or footers inside <main>.',
              },
            },
            {
              id: 'sec-2',
              title: 'Heading Hierarchy Done Right',
              content:
                'Headings (`<h1>` through `<h6>`) act as the table of contents of your document:\n\n- Always have exactly ONE `<h1>` on a page describing the page\'s main title.\n- Subsections inside that topic use `<h2>`.\n- Sub-subsections under an `<h2>` use `<h3>`.\n- **Never skip heading levels for styling!** If an `<h2>` looks too large, change its font-size with CSS; do not skip from `<h1>` directly to `<h4>`.',
              codeExample: {
                language: 'html',
                filename: 'semantic-page.html',
                code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alex Morgan — Full-Stack Engineer</title>
</head>
<body>
  <header>
    <nav aria-label="Main menu">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Alex Morgan</h1>
    <p>Full-stack developer building accessible web applications.</p>

    <section id="projects">
      <h2>Featured Projects</h2>
      <article>
        <h3>Issue Tracker</h3>
        <p>A full-stack task management platform.</p>
      </article>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Morgan. Built with semantic HTML.</p>
  </footer>
</body>
</html>`,
              },
            },
          ],
          recap: [
            'Semantic tags describe content meaning to browsers, search engines, and screen readers.',
            'Use one <main> per page.',
            'Maintain strict heading hierarchies (h1 -> h2 -> h3) without skipping levels.',
            'Wrap primary links in <nav aria-label="...">.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-1-1',
              question: 'Which element should be used for a blog post card that could be reused or syndicated independently?',
              options: ['<section>', '<article>', '<div>', '<span>'],
              correctIndex: 1,
              explanation: '<article> is designed specifically for self-contained, independent items of content.',
            },
          ],
          practicalTask: {
            title: 'Audit an HTML Snippet for Semantic Landmarks',
            instruction: 'Look at your personal projects or sample templates. Replace any `<div class="nav">` with `<nav>` and `<div class="footer">` with `<footer>`. Run the W3C markup validator to verify zero errors.',
            hints: ['Ensure <nav> contains a <ul> of navigation items.'],
            expectedOutcome: 'A clean document with clear landmark regions.',
          },
          glossaryTerms: ['semantic-html', 'accessibility', 'dom'],
        },
        {
          id: 'les-06-accessible-forms',
          slug: 'accessible-forms-and-inputs',
          title: 'Accessible Forms, Inputs, and User Validation',
          moduleSlug: 'html-semantics-accessibility',
          moduleTitle: 'Semantic HTML & Accessibility (a11y)',
          phase: 1,
          phaseTitle: 'Phase 1 — Web Foundations',
          readingTimeMinutes: 10,
          objective: 'Build forms that anyone can fill out using keyboards, screen readers, or mobile touch screens.',
          whyItMatters:
            'Forms are where businesses collect revenue, registrations, and feedback. An inaccessible form literally locks out potential customers and creates severe legal compliance liabilities.',
          prerequisites: ['Semantic HTML5 and Accessible Document Structure'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Sacred Label-Input Relationship',
              content:
                'Every single text field, checkbox, and dropdown must have an associated `<label>`:\n\n```html\n<!-- Proper association -->\n<label for="contact-email">Email Address</label>\n<input type="email" id="contact-email" name="email" required autocomplete="email">\n```\n\nWhy this matters:\n1. Screen readers announce "Email Address, edit text" when focusing the input.\n2. Clicking on the text label automatically focuses the input box (great for small checkboxes on mobile screens!).\n3. Browsers use `autocomplete="email"` to auto-fill saved user addresses seamlessly.',
            },
            {
              id: 'sec-2',
              title: 'Accessible Error Messaging with aria-describedby',
              content:
                'When a user submits an invalid field, placing a red border alone is not enough—colorblind users may not notice the red color, and screen readers cannot see colors.\n\nUse `aria-describedby` to link the input directly to the error message text:\n\n```html\n<label for="pwd">Password</label>\n<input \n  type="password" \n  id="pwd" \n  aria-invalid="true" \n  aria-describedby="pwd-error"\n>\n<p id="pwd-error" class="error-msg">Password must be at least 8 characters long.</p>\n```\n\nNow, when the user tabs to the password input, their screen reader announces the field AND immediately reads the error message aloud!',
              callout: {
                type: 'tip',
                title: 'Touch Target Sizing',
                text: 'WCAG 2.2 requires interactive touch targets to be at least 44x44 pixels (or 24x24 minimum with adequate spacing). Never create tiny 12px clickable buttons!',
              },
            },
          ],
          recap: [
            'Connect every input to a label using matching for/id attributes.',
            'Use semantic input types (type="email", type="tel", type="number") to trigger the correct mobile keyboard.',
            'Connect error messages with aria-describedby.',
            'Ensure interactive buttons have at least 44x44px touch targets.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-1-2',
              question: 'Why should you avoid using only placeholder text instead of a visible <label>?',
              options: [
                'Placeholder text disappears when the user starts typing and has poor contrast',
                'Placeholders slow down server response times',
                'Placeholders require paid third-party licenses',
                'Placeholders only work on desktop computers',
              ],
              correctIndex: 0,
              explanation: 'Placeholders disappear as soon as typing begins, causing users to forget what was requested, and fail color contrast standards.',
            },
          ],
          practicalTask: {
            title: 'Build a 3-Field Accessible Contact Form',
            instruction: 'Create an accessible form with Name, Email, and Message fields. Ensure every input has a label, type, required attribute, and minimum 44px button.',
            hints: ['Use <textarea> for the message field.', 'Set <button type="submit"> for the send action.'],
            expectedOutcome: 'Clicking any label focuses the corresponding input box.',
          },
          glossaryTerms: ['accessibility', 'semantic-html'],
        },
      ],
    },
    {
      id: 'mod-04-css-box-model-layout',
      slug: 'css-box-model-layout',
      title: 'Modern CSS, Box Model & Flexbox/Grid',
      phase: 1,
      phaseTitle: 'Phase 1 — Web Foundations',
      description: 'Master the CSS Box Model, the cascade, specificity, and modern responsive layouts using Flexbox and CSS Grid.',
      estimatedHours: 8,
      outcomes: [
        'Master the 4 layers of the Box Model (Content, Padding, Border, Margin) and box-sizing: border-box',
        'Build 1-dimensional layouts effortlessly with Flexbox',
        'Build 2-dimensional page layouts with CSS Grid',
        'Implement CSS Custom Properties (variables) for theme switching',
      ],
      prerequisites: ['Semantic HTML & Accessibility'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-04',
        moduleId: 'mod-04-css-box-model-layout',
        title: 'CSS Layout Checkpoint',
        description: 'Verify your understanding of Box Model calculations and modern CSS layout engines.',
        passingScore: 75,
        questions: [
          {
            id: 'q1-3',
            question: 'What does "box-sizing: border-box;" do in CSS?',
            options: [
              'Includes padding and border inside the specified width and height of an element',
              'Removes all borders from the webpage',
              'Converts all text into uppercase letters',
              'Centers an element horizontally on the screen',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! With border-box, if you set width: 300px and padding: 20px, the total width remains 300px. In the old content-box model, the total width would blow out to 340px.',
              1: 'Incorrect. Border-box controls sizing calculation, not border visibility.',
              2: 'Incorrect. Uppercase conversion is done with text-transform: uppercase.',
              3: 'Incorrect. Centering is done with margin: auto or Flexbox.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-07-box-model',
          slug: 'css-box-model-fundamentals',
          title: 'The CSS Box Model & Specificity',
          moduleSlug: 'css-box-model-layout',
          moduleTitle: 'Modern CSS, Box Model & Flexbox/Grid',
          phase: 1,
          phaseTitle: 'Phase 1 — Web Foundations',
          readingTimeMinutes: 10,
          objective: 'Understand how browsers calculate element dimensions and resolve competing CSS rules.',
          whyItMatters:
            '80% of unexpected layout bugs (unwanted scrollbars, elements overlapping, broken widths) stem from misunderstanding the Box Model and box-sizing.',
          prerequisites: ['Semantic HTML Landmarks'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Four Layers of the Box Model',
              content:
                'Every single HTML element on a webpage is a rectangular box with four concentric layers:\n\n1. **Content**: The text, image, or video itself.\n2. **Padding**: The clear space INSIDE the border, between the content and the edge.\n3. **Border**: The outline surrounding the padding.\n4. **Margin**: The clear space OUTSIDE the border, pushing other elements away.',
              diagramId: 'diagram-box-model-layers',
              codeExample: {
                language: 'css',
                filename: 'box-model-reset.css',
                code: `/* The Universal Modern Box Sizing Reset */
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 320px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  margin: 16px auto;
  background-color: white;
}`,
              },
            },
            {
              id: 'sec-2',
              title: 'Understanding CSS Specificity',
              content:
                'When two CSS rules target the same element, the browser uses a point system called **Specificity** to decide which rule wins:\n\n1. **Inline styles** (`style="..."`): 1000 points (Avoid these in modern CSS!)\n2. **IDs** (`#user-profile`): 100 points\n3. **Classes, attributes, pseudo-classes** (`.btn`, `[type="text"]`, `:hover`): 10 points\n4. **Element tags** (`p`, `button`, `div`): 1 point\n\nAvoid using `#id` selectors for styling, and never use `!important` as a blunt hammer. Rely on clean class names for predictable styles.',
              callout: {
                type: 'tip',
                title: 'The Golden Rule of Margins',
                text: 'Always use margin for spacing BETWEEN components, and padding for spacing INSIDE a component. Vertical margins between adjacent block elements collapse into the larger margin size.',
              },
            },
          ],
          recap: [
            'Every HTML element is a box with Content, Padding, Border, and Margin.',
            'Always apply `*, *::before, *::after { box-sizing: border-box; }`.',
            'Specificity determines which CSS rule wins: IDs > Classes > Tags.',
            'Never use !important to fix specificity conflicts; structure your class names cleanly.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-1-3',
              question: 'If .btn has 10 points of specificity and div has 1 point, which rule will win when both target a button?',
              options: ['.btn', 'div', 'Neither, it is a syntax error', 'They cancel each other out'],
              correctIndex: 0,
              explanation: 'Classes (.btn = 10 points) override basic element selectors (div = 1 point).',
            },
          ],
          practicalTask: {
            title: 'Inspect the Box Model in DevTools',
            instruction: 'Open DevTools (F12), inspect any card or button on this page, and scroll down in the "Styles" tab to view the interactive color-coded Box Model diagram showing exact pixel values for Margin, Border, Padding, and Content.',
            hints: ['Hover over the numbers in DevTools to see them highlighted directly on the page.'],
            expectedOutcome: 'You can clearly identify the 4 layers on any live element.',
          },
          glossaryTerms: ['box-model'],
        },
        {
          id: 'les-08-flexbox-grid',
          slug: 'flexbox-and-css-grid',
          title: 'Responsive Layouts with Flexbox & CSS Grid',
          moduleSlug: 'css-box-model-layout',
          moduleTitle: 'Modern CSS, Box Model & Flexbox/Grid',
          phase: 1,
          phaseTitle: 'Phase 1 — Web Foundations',
          readingTimeMinutes: 12,
          objective: 'Know exactly when to use Flexbox (1D layouts) vs CSS Grid (2D layouts) to build fluid, mobile-responsive interfaces.',
          whyItMatters:
            'Floats and table layouts are dead. Modern CSS layout engines let you build complex, responsive grids in 3 lines of code without JavaScript or math calculations.',
          prerequisites: ['The CSS Box Model & Specificity'],
          sections: [
            {
              id: 'sec-1',
              title: 'Flexbox: The One-Dimensional Master',
              content:
                'Use **Flexbox** (`display: flex`) when aligning items in a **single direction** (either along a row OR a column):\n\n- Header navigation bars\n- Button groups\n- Centering an item vertically and horizontally\n\nKey properties on the parent container:\n- `flex-direction: row | column`\n- `justify-content`: aligns along the main axis (e.g. `space-between`, `center`)\n- `align-items`: aligns along the cross axis (e.g. `center`, `stretch`)\n- `gap`: spacing between items without negative margins.',
              codeExample: {
                language: 'css',
                filename: 'flexbox-center.css',
                code: `/* Perfect centering in 3 lines */
.center-box {
  display: flex;
  justify-content: center; /* horizontal center */
  align-items: center;     /* vertical center */
  min-height: 200px;
}`,
              },
            },
            {
              id: 'sec-2',
              title: 'CSS Grid: The Two-Dimensional Powerhouse',
              content:
                'Use **CSS Grid** (`display: grid`) when aligning items across **both rows AND columns simultaneously**:\n\n- Product showcases\n- Dashboard widget matrices\n- Full page layouts (sidebar + header + content)\n\nThe magic responsive grid formula:\n\n```css\n.responsive-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}\n```\n\nThis single rule creates a multi-column grid that automatically adjusts column counts from 4 columns on large screens down to 1 column on mobile phones with ZERO media queries!',
              callout: {
                type: 'tip',
                title: 'When to Use Which?',
                text: 'Rule of thumb: Content-first (distributing items based on their size, like a navbar) -> use Flexbox. Layout-first (rigid grid structure, like cards in a gallery) -> use CSS Grid.',
              },
            },
          ],
          recap: [
            'Flexbox is 1D (rows or columns); perfect for navbars and centering.',
            'CSS Grid is 2D (rows and columns); perfect for galleries and dashboard layouts.',
            'Use repeat(auto-fit, minmax(...)) for automatic responsive cards without media queries.',
            'Use gap instead of margins for clean spacing between children.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-1-4',
              question: 'Which layout engine is best suited for a 2-dimensional dashboard with rows and columns of widgets?',
              options: ['CSS Grid', 'Flexbox', 'HTML Tables', 'Inline-block with floats'],
              correctIndex: 0,
              explanation: 'CSS Grid was built specifically for 2-dimensional grid layouts.',
            },
          ],
          practicalTask: {
            title: 'Build a Responsive Card Gallery',
            instruction: 'Write a CSS class using `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;`. Resize your browser window from desktop to phone width to see cards adapt automatically.',
            hints: ['Place at least 4 child <div> cards inside the container.'],
            expectedOutcome: 'Cards stack neatly into 1 column on mobile and 3-4 columns on desktop.',
          },
          glossaryTerms: ['box-model'],
        },
      ],
    },
  ],
};
