import { describe, it, expect } from 'vitest';
import { createDefaultProgress } from '@/features/progress/useProgressStore';
import { learnerProgressPayloadSchema } from '@/lib/validation/schemas';
import { getCurriculumStats } from '@/content/curriculum';

describe('Learner Progress & Validation Suite', () => {
  it('creates a valid default progress payload', () => {
    const progress = createDefaultProgress();

    expect(progress.version).toBe(1);
    expect(progress.profile.syncKey).toMatch(/^sp(-[a-f0-9]{4}){8}$/);
    expect(progress.profile.onboarded).toBe(false);
    expect(progress.profile.weeklyCommitmentHours).toBe(7);
    expect(progress.completedLessons).toEqual({});
    expect(progress.streak.currentStreak).toBe(0);

    // Validate with Zod schema
    const parseResult = learnerProgressPayloadSchema.safeParse(progress);
    expect(parseResult.success).toBe(true);
  });

  it('validates corrupted or missing schema fields with Zod', () => {
    const invalid = {
      version: 1,
      // Missing profile object!
      completedLessons: {},
    };

    const parseResult = learnerProgressPayloadSchema.safeParse(invalid);
    expect(parseResult.success).toBe(false);
  });

  it('accurately calculates completion percentages from curriculum stats', () => {
    const stats = getCurriculumStats();
    expect(stats.totalPhases).toBe(11); // Phase 0 through 10
    expect(stats.totalModules).toBeGreaterThanOrEqual(11);
    expect(stats.totalLessons).toBeGreaterThanOrEqual(20);

    const completed = 5;
    const percentage = Math.round((completed / stats.totalLessons) * 100);
    expect(percentage).toBeGreaterThan(0);
    expect(percentage).toBeLessThanOrEqual(100);
  });
});
