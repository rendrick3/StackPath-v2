import { describe, it, expect } from 'vitest';
import {
  allPhases,
  getAllModules,
  getAllLessons,
  getNextAndPrevLesson,
} from '@/content/curriculum';

describe('Curriculum Structure & Integrity Suite', () => {
  it('includes all 11 phases (Phase 0 through Phase 10)', () => {
    expect(allPhases).toHaveLength(11);
    const phaseNumbers = allPhases.map((p) => p.phase);
    expect(phaseNumbers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('verifies that every module has lessons and a formative quiz with answer explanations', () => {
    const modules = getAllModules();
    expect(modules.length).toBeGreaterThanOrEqual(11);

    modules.forEach((mod) => {
      expect(mod.lessons.length).toBeGreaterThan(0);
      expect(mod.quiz).toBeDefined();
      expect(mod.quiz.questions.length).toBeGreaterThan(0);

      mod.quiz.questions.forEach((q) => {
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.explanations).toBeDefined();
      });
    });
  });

  it('verifies that every lesson has all required pedagogical components', () => {
    const lessons = getAllLessons();

    lessons.forEach((lesson) => {
      expect(lesson.title.length).toBeGreaterThan(5);
      expect(lesson.objective.length).toBeGreaterThan(10);
      expect(lesson.whyItMatters.length).toBeGreaterThan(10);
      expect(lesson.sections.length).toBeGreaterThan(0);
      expect(lesson.recap.length).toBeGreaterThan(0);
      expect(lesson.selfCheckQuestions.length).toBeGreaterThan(0);
      expect(lesson.practicalTask).toBeDefined();
    });
  });

  it('correctly calculates next and previous lesson navigation links', () => {
    const allLessons = getAllLessons();
    const firstLesson = allLessons[0];
    const secondLesson = allLessons[1];
    const lastLesson = allLessons[allLessons.length - 1];

    const firstNav = getNextAndPrevLesson(firstLesson.id);
    expect(firstNav.prev).toBeNull();
    expect(firstNav.next?.id).toBe(secondLesson.id);

    const lastNav = getNextAndPrevLesson(lastLesson.id);
    expect(lastNav.next).toBeNull();
    expect(lastNav.prev).not.toBeNull();
  });
});
