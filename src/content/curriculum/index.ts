import { Phase, Module, Lesson } from '@/types/curriculum';
import { phase0 } from './phase0';
import { phase1 } from './phase1';
import { phase2 } from './phase2';
import { phase3 } from './phase3';
import { phase4 } from './phase4';
import { phase5 } from './phase5';
import { phase6 } from './phase6';
import { phase7 } from './phase7';
import { phase8 } from './phase8';
import { phase9 } from './phase9';
import { phase10 } from './phase10';

export const allPhases: Phase[] = [
  phase0,
  phase1,
  phase2,
  phase3,
  phase4,
  phase5,
  phase6,
  phase7,
  phase8,
  phase9,
  phase10,
];

export function getAllModules(): Module[] {
  return allPhases.flatMap((p) => p.modules);
}

export function getAllLessons(): Lesson[] {
  return getAllModules().flatMap((m) => m.lessons);
}

export function getModuleBySlug(moduleSlug: string): Module | undefined {
  return getAllModules().find((m) => m.slug === moduleSlug);
}

export function getLessonBySlug(moduleSlug: string, lessonSlug: string): Lesson | undefined {
  const mod = getModuleBySlug(moduleSlug);
  if (!mod) return undefined;
  return mod.lessons.find((l) => l.slug === lessonSlug);
}

export function getNextAndPrevLesson(currentLessonId: string): {
  prev: Lesson | null;
  next: Lesson | null;
} {
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
  };
}

export function getCurriculumStats() {
  const modules = getAllModules();
  const lessons = getAllLessons();
  const totalHours = modules.reduce((sum, m) => sum + m.estimatedHours, 0);

  return {
    totalPhases: allPhases.length,
    totalModules: modules.length,
    totalLessons: lessons.length,
    totalEstimatedHours: totalHours,
  };
}
