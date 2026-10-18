export type LearnerGoal = 'career-switch' | 'college' | 'freelance' | 'personal-projects';
export type LearnerPace = 'chill' | 'steady' | 'accelerated';

export interface LearnerPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  readingWidth: 'standard' | 'wide' | 'full';
  reducedMotion: boolean;
}

export interface LearnerProfile {
  onboarded: boolean;
  goal: LearnerGoal;
  weeklyCommitmentHours: number;
  pace: LearnerPace;
  syncKey: string;
  createdAt: string;
  lastSyncedAt: string | null;
}

export interface CompletedLessonData {
  completedAt: string;
  timeSpentSeconds?: number;
}

export interface NoteItem {
  id: string;
  lessonId: string;
  lessonTitle: string;
  moduleSlug: string;
  lessonSlug: string;
  content: string;
  updatedAt: string;
}

export interface BookmarkItem {
  id: string;
  lessonId: string;
  lessonTitle: string;
  moduleSlug: string;
  lessonSlug: string;
  savedAt: string;
}

export interface QuizAttemptRecord {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, number>;
  timestamp: string;
}

export interface QuizProgress {
  quizId: string;
  bestPercentage: number;
  attempts: QuizAttemptRecord[];
}

export interface ProjectProgress {
  projectId: string;
  completedMilestoneIds: string[];
  notes: string;
  repoUrl?: string;
  liveUrl?: string;
  updatedAt: string;
}

export interface LearnerProgressPayload {
  version: number;
  profile: LearnerProfile;
  preferences: LearnerPreferences;
  completedLessons: Record<string, CompletedLessonData>;
  completedModules: Record<string, { completedAt: string }>;
  currentLesson: {
    moduleSlug: string;
    lessonSlug: string;
    updatedAt: string;
  } | null;
  notes: Record<string, NoteItem>;
  bookmarks: Record<string, BookmarkItem>;
  quizAttempts: Record<string, QuizProgress>;
  projectMilestones: Record<string, ProjectProgress>;
  practiceCompleted: Record<string, { completedAt: string }>;
  activityHistory: Record<string, number>; // date "YYYY-MM-DD" -> activity count / minutes
  streak: {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string | null;
  };
}

export interface SyncPayload {
  syncId: string; // SHA-256 of syncKey
  ciphertext: string; // Base64 encrypted JSON
  iv: string; // Base64 IV
  version: number;
  clientTimestamp: string;
}

export interface SyncResponse {
  success: boolean;
  message?: string;
  conflict?: boolean;
  remotePayload?: {
    ciphertext: string;
    iv: string;
    version: number;
    serverTimestamp: string;
  };
}
