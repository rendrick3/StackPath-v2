export type PracticeDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type PracticeCategory = 'html' | 'css' | 'javascript' | 'typescript' | 'react' | 'backend' | 'database';

export interface PracticeChallenge {
  id: string;
  title: string;
  difficulty: PracticeDifficulty;
  category: PracticeCategory;
  estimatedMinutes: number;
  description: string;
  inputsAndRequirements: string[];
  expectedOutcome: string;
  starterCode: string;
  starterFiles?: { name: string; content: string }[];
  hints: string[];
  solutionCode: string;
  solutionExplanation: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface CapstoneProject {
  id: string;
  number: number;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  phaseRequired: number;
  estimatedHours: number;
  features: string[];
  architectureDiagramId: string;
  architectureDescription: string;
  suggestedFolderStructure: string;
  milestones: ProjectMilestone[];
  definitionOfDone: string[];
  commonPitfalls: string[];
  stretchGoals: string[];
}

export type InterviewCategory = 'behavioral' | 'frontend' | 'backend' | 'databases' | 'apis' | 'system-design' | 'debugging' | 'deployment';
export type InterviewLevel = 'junior' | 'mid';

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  level: InterviewLevel;
  question: string;
  whyAsked: string;
  simpleExplanation: string; // "Explain it simply" mode
  structuredAnswer: {
    coreConcept: string;
    practicalExample: string;
    tradeoffsOrEdgeCases: string;
  };
  followUpQuestions: string[];
  proTips: string[];
}
