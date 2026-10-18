export interface SelfCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticalTask {
  title: string;
  instruction: string;
  hints: string[];
  expectedOutcome: string;
  starterCode?: string;
  solutionCode?: string;
}

export interface CodeAnnotation {
  line: number;
  comment: string;
}

export interface CodeExample {
  language: string;
  filename?: string;
  code: string;
  annotations?: CodeAnnotation[];
}

export interface LessonCallout {
  type: 'mistake' | 'tip' | 'deep-dive';
  title: string;
  text: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  diagramId?: string;
  codeExample?: CodeExample;
  callout?: LessonCallout;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  moduleSlug: string;
  moduleTitle: string;
  phase: number;
  phaseTitle: string;
  readingTimeMinutes: number;
  objective: string;
  whyItMatters: string;
  prerequisites: string[];
  sections: LessonSection[];
  recap: string[];
  selfCheckQuestions: SelfCheckQuestion[];
  practicalTask: PracticalTask;
  glossaryTerms: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanations: Record<number, string>; // Explanations for all options (correct & incorrect)
}

export interface ModuleQuiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  passingScore: number; // percentage (e.g. 75)
  questions: QuizQuestion[];
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  phase: number;
  phaseTitle: string;
  description: string;
  estimatedHours: number;
  outcomes: string[];
  prerequisites: string[];
  lessonCount: number;
  lessons: Lesson[];
  quiz: ModuleQuiz;
}

export interface Phase {
  phase: number;
  title: string;
  subtitle: string;
  description: string;
  modules: Module[];
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  category: 'web-basics' | 'frontend' | 'backend' | 'database' | 'devops' | 'testing';
  pronunciation?: string;
  definition: string;
  analogy: string;
  relatedTerms: string[];
  moduleSlug?: string;
}
