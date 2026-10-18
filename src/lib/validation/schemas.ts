import { z } from 'zod';

export const syncPayloadSchema = z.object({
  syncId: z.string().length(64, 'Invalid sync identifier'),
  ciphertext: z.string().min(1, 'Missing ciphertext').max(1_000_000, 'Payload exceeds limit'),
  iv: z.string().min(1, 'Missing IV'),
  version: z.number().int().positive(),
  clientTimestamp: z.string().datetime({ offset: true }).or(z.string().min(10)),
});

export const learnerPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  fontSize: z.enum(['sm', 'base', 'lg', 'xl']).default('base'),
  readingWidth: z.enum(['standard', 'wide', 'full']).default('standard'),
  reducedMotion: z.boolean().default(false),
});

export const learnerProfileSchema = z.object({
  onboarded: z.boolean().default(false),
  goal: z.enum(['career-switch', 'college', 'freelance', 'personal-projects']).default('career-switch'),
  weeklyCommitmentHours: z.number().min(1).max(80).default(7),
  pace: z.enum(['chill', 'steady', 'accelerated']).default('steady'),
  syncKey: z.string().min(10),
  createdAt: z.string(),
  lastSyncedAt: z.string().nullable().default(null),
});

export const completedLessonSchema = z.object({
  completedAt: z.string(),
  timeSpentSeconds: z.number().optional(),
});

export const noteItemSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  lessonTitle: z.string(),
  moduleSlug: z.string(),
  lessonSlug: z.string(),
  content: z.string().max(50_000),
  updatedAt: z.string(),
});

export const bookmarkItemSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  lessonTitle: z.string(),
  moduleSlug: z.string(),
  lessonSlug: z.string(),
  savedAt: z.string(),
});

export const quizAttemptRecordSchema = z.object({
  score: z.number(),
  totalQuestions: z.number(),
  percentage: z.number(),
  passed: z.boolean(),
  answers: z.record(z.string(), z.number()),
  timestamp: z.string(),
});

export const quizProgressSchema = z.object({
  quizId: z.string(),
  bestPercentage: z.number(),
  attempts: z.array(quizAttemptRecordSchema),
});

export const projectProgressSchema = z.object({
  projectId: z.string(),
  completedMilestoneIds: z.array(z.string()),
  notes: z.string().max(20_000).default(''),
  repoUrl: z.string().url().or(z.literal('')).optional(),
  liveUrl: z.string().url().or(z.literal('')).optional(),
  updatedAt: z.string(),
});

export const learnerProgressPayloadSchema = z.object({
  version: z.number().int().positive().default(1),
  profile: learnerProfileSchema,
  preferences: learnerPreferencesSchema,
  completedLessons: z.record(z.string(), completedLessonSchema).default({}),
  completedModules: z.record(z.string(), z.object({ completedAt: z.string() })).default({}),
  currentLesson: z
    .object({
      moduleSlug: z.string(),
      lessonSlug: z.string(),
      updatedAt: z.string(),
    })
    .nullable()
    .default(null),
  notes: z.record(z.string(), noteItemSchema).default({}),
  bookmarks: z.record(z.string(), bookmarkItemSchema).default({}),
  quizAttempts: z.record(z.string(), quizProgressSchema).default({}),
  projectMilestones: z.record(z.string(), projectProgressSchema).default({}),
  practiceCompleted: z.record(z.string(), z.object({ completedAt: z.string() })).default({}),
  activityHistory: z.record(z.string(), z.number()).default({}),
  streak: z.object({
    currentStreak: z.number().nonnegative().default(0),
    longestStreak: z.number().nonnegative().default(0),
    lastActiveDate: z.string().nullable().default(null),
  }),
});

export type ValidatedLearnerProgress = z.infer<typeof learnerProgressPayloadSchema>;
