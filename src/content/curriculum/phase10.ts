import { Phase } from '@/types/curriculum';

export const phase10: Phase = {
  phase: 10,
  title: 'Portfolio, Interviews & Career Readiness',
  subtitle: 'High-impact portfolios, technical & behavioral interviews, and career transition.',
  description:
    'Turn your full-stack engineering skills into a thriving software career. Learn how to showcase your 5 capstone projects, write a developer resume that passes screenings, ace technical interviews, and master the STAR behavioral method.',
  modules: [
    {
      id: 'mod-14-career-interviews',
      slug: 'career-interviews-portfolio',
      title: 'Developer Portfolio, Interviews & Career Launch',
      phase: 10,
      phaseTitle: 'Phase 10 — Portfolio, Interviews & Career Readiness',
      description: 'Prepare for software engineering interviews, structure compelling project case studies, and navigate your full-stack career transition.',
      estimatedHours: 12,
      outcomes: [
        'Curate a standout GitHub profile and write compelling project READMEs with architecture diagrams',
        'Master the STAR method (Situation, Task, Action, Result) for behavioral interview questions',
        'Approach technical live-coding and system design challenges methodically',
        'Complete the Full-Stack Engineering Readiness Assessment and launch your capstones',
      ],
      prerequisites: ['Phase 9: Deployment & Production Engineering'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-14',
        moduleId: 'mod-14-career-interviews',
        title: 'Career Readiness Checkpoint',
        description: 'Verify your interview strategy and portfolio presentation skills.',
        passingScore: 75,
        questions: [
          {
            id: 'q10-1',
            question: 'What makes a project case study in your portfolio memorable and convincing to senior hiring managers?',
            options: [
              'Explaining the real architectural tradeoffs made, challenges overcome, and showing live deployed demos with tests and clean documentation',
              'Listing 50 different buzzwords in a long bulleted list',
              'Copying a 10-minute tutorial project without changing any code',
              'Claiming that your code never has any bugs or errors',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! Senior engineers care deeply about how you think through tradeoffs, handle edge cases, write tests, and document your systems.',
              1: 'Incorrect. Buzzword lists without depth are red flags to technical interviewers.',
              2: 'Incorrect. Generic tutorial clones fail to demonstrate independent engineering ability.',
              3: 'Incorrect. Claiming zero bugs indicates a lack of real production experience.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-27-portfolio-presentation',
          slug: 'curating-your-developer-portfolio',
          title: 'Curating a High-Impact Developer Portfolio & GitHub',
          moduleSlug: 'career-interviews-portfolio',
          moduleTitle: 'Developer Portfolio, Interviews & Career Launch',
          phase: 10,
          phaseTitle: 'Phase 10 — Portfolio, Interviews & Career Readiness',
          readingTimeMinutes: 12,
          objective: 'Present your 5 capstone projects as professional case studies that prove your full-stack capabilities.',
          whyItMatters:
            'Recruiters spend an average of 30 seconds reviewing a portfolio. A polished, accessible personal site with live HTTPS links and clean architecture diagrams immediately puts you in the top 5% of junior applicants.',
          prerequisites: ['Deployment & Production Engineering'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Anatomy of a Compelling Project Case Study',
              content:
                'Instead of just showing a screenshot, structure each capstone project as an engineering case study:\n\n1. **The Problem**: What real user need does this solve?\n2. **The Tech Stack & Rationale**: Why did you choose Next.js and PostgreSQL over other options?\n3. **Architecture Diagram**: Visualizing data flow between client, serverless edge, and database.\n4. **Key Engineering Challenges**: A difficult bug or performance bottleneck you diagnosed and resolved.\n5. **Tests & Live Demo**: A one-click live HTTPS link and a link to the GitHub repository with clean test suites.',
            },
            {
              id: 'sec-2',
              title: 'Polishing Your GitHub Presence',
              content:
                'Your GitHub profile is your public engineering workshop:\n\n- Write clear, informative commit messages (`"Add Zod schema for issue creation"` instead of `"fix stuff"`).\n- Pin your top 3 full-stack repositories.\n- Provide a comprehensive `README.md` for every project: overview, features, architecture diagram, local setup instructions, and test commands.',
            },
          ],
          recap: [
            'Present projects as engineering case studies highlighting problems and tradeoffs.',
            'Include live deployed demos and links to public GitHub repos with tests.',
            'Maintain clean Git commit histories and comprehensive README files.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-10-1',
              question: 'What is the most effective element to include in a project README for technical reviewers?',
              options: [
                'An architecture overview diagram, clear local setup instructions, and explanation of tradeoffs',
                'A collection of colorful memes',
                'An unedited copy of the React documentation',
                'No instructions at all to make it mysterious',
              ],
              correctIndex: 0,
              explanation: 'A great README lets any engineer understand the system architecture and run the project locally in under 2 minutes.',
            },
          ],
          practicalTask: {
            title: 'Review the 5 StackPath Capstone Projects',
            instruction: 'Navigate to the Projects section in the navigation bar. Review the milestones, architecture diagrams, and definition of done for the 5 capstone projects.',
            hints: ['Notice how each project builds upon skills mastered in earlier phases.'],
            expectedOutcome: 'A clear roadmap for building your personal portfolio showcase.',
          },
          glossaryTerms: ['ci-cd'],
        },
        {
          id: 'les-28-technical-interviews-star',
          slug: 'technical-and-behavioral-interviews',
          title: 'The Full-Stack Interview: Technical Strategy & STAR Method',
          moduleSlug: 'career-interviews-portfolio',
          moduleTitle: 'Developer Portfolio, Interviews & Career Launch',
          phase: 10,
          phaseTitle: 'Phase 10 — Portfolio, Interviews & Career Readiness',
          readingTimeMinutes: 14,
          objective: 'Master technical problem-solving communication and practice behavioral interview questions using the STAR framework.',
          whyItMatters:
            'Many talented developers fail interviews not because they can\'t code, but because they don\'t communicate their thought process out loud. Interviewing is a learnable skill that improves with deliberate practice.',
          prerequisites: ['Curating a High-Impact Developer Portfolio & GitHub'],
          sections: [
            {
              id: 'sec-1',
              title: 'The Five Steps of Technical Problem Solving',
              content:
                'When presented with a coding problem in an interview:\n\n1. **Clarify Inputs and Edge Cases**: Don\'t start typing immediately! Ask questions: *"Can the input array be empty? Can numbers be negative?"*\n2. **State Your Approach Out Loud**: Explain your mental model in plain English before writing code.\n3. **Write Clean, Step-by-Step Code**: Break the problem down into small helper functions.\n4. **Manually Trace with an Example**: Walk through your code line by line with sample inputs.\n5. **Analyze Time & Space Complexity**: State the Big-O complexity (e.g. O(N) time and O(1) space).',
            },
            {
              id: 'sec-2',
              title: 'The STAR Method for Behavioral Questions',
              content:
                'Questions like *"Tell me about a time you had a conflict with a teammate"* or *"Describe a difficult bug you solved"* should be answered using **STAR**:\n\n- **Situation (20%)**: Brief background context.\n- **Task (10%)**: Your specific goal or responsibility.\n- **Action (50%)**: The concrete, methodical steps YOU took.\n- **Result (20%)**: The measurable outcome, lessons learned, and long-term impact.',
              callout: {
                type: 'tip',
                title: 'Use StackPath\'s Interview Prep Studio',
                text: 'Visit our dedicated Interview Prep section in the navigation menu! You can toggle "Explain It Simply" mode on any question to master intuitive, jargon-free explanations.',
              },
            },
          ],
          recap: [
            'Clarify requirements and think out loud during technical interviews.',
            'Use the STAR method (Situation, Task, Action, Result) for structured behavioral answers.',
            'Normalize debugging and explain tradeoffs candidly.',
            'Take the Full-Stack Engineering Readiness Assessment to verify your mastery!',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-10-2',
              question: 'In the STAR interview method, which part should you spend the majority (~50%) of your time explaining?',
              options: [
                'Action: The specific technical and collaborative steps YOU took to solve the problem',
                'Situation: The history of the company from 10 years ago',
                'Task: The assigned Jira ticket number',
                'Result: Listing your favorite hobbies',
              ],
              correctIndex: 0,
              explanation: 'Interviewers evaluate your personal actions, problem-solving decisions, and initiative.',
            },
          ],
          practicalTask: {
            title: 'Take the Full-Stack Readiness Assessment',
            instruction: 'Click "Assessments" in the header navigation and take the comprehensive 10-question Full-Stack Engineering Readiness Assessment. Aim for 80% or higher.',
            hints: ['Read each explanation for both correct and incorrect choices.'],
            expectedOutcome: 'Comprehensive evaluation of your full-stack engineering readiness.',
          },
          glossaryTerms: ['rest-api', 'sql'],
        },
      ],
    },
  ],
};
