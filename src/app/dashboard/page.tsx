'use client';

import React from 'react';
import Link from 'next/link';
import { useProgressStore } from '@/features/progress/useProgressStore';
import { allPhases, getAllLessons } from '@/content/curriculum';
import { capstoneProjects } from '@/content/projects';
import {
  ArrowRight,
  Flame,
  Clock,
  CheckCircle2,
  BookOpen,
  FolderGit2,
  Bookmark,
  FileText,
  Sparkles,
  Trophy,
  Layers,
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const { payload } = useProgressStore();

  const allLessons = getAllLessons();

  const totalLessons = allLessons.length;
  const completedLessonCount = Object.keys(payload.completedLessons).length;
  const progressPercentage = Math.round((completedLessonCount / totalLessons) * 100) || 0;

  // Determine "Continue Learning" target
  let continueTarget = {
    moduleSlug: allLessons[0]?.moduleSlug || 'foundations-web-architecture',
    lessonSlug: allLessons[0]?.slug || 'what-full-stack-means',
    title: allLessons[0]?.title || 'What Full-Stack Development Actually Means',
    moduleTitle: allLessons[0]?.moduleTitle || 'How Websites & the Internet Work',
  };

  if (payload.currentLesson) {
    const current = allLessons.find(
      (l) => l.moduleSlug === payload.currentLesson?.moduleSlug && l.slug === payload.currentLesson?.lessonSlug
    );
    if (current) {
      continueTarget = {
        moduleSlug: current.moduleSlug,
        lessonSlug: current.slug,
        title: current.title,
        moduleTitle: current.moduleTitle,
      };
    }
  } else {
    // Find first uncompleted lesson
    const firstUncompleted = allLessons.find((l) => !payload.completedLessons[l.id]);
    if (firstUncompleted) {
      continueTarget = {
        moduleSlug: firstUncompleted.moduleSlug,
        lessonSlug: firstUncompleted.slug,
        title: firstUncompleted.title,
        moduleTitle: firstUncompleted.moduleTitle,
      };
    }
  }

  const recentNotes = Object.values(payload.notes).slice(-3).reverse();
  const recentBookmarks = Object.values(payload.bookmarks).slice(-3).reverse();

  // Milestone calculation
  let upcomingMilestone = 'Phase 0: Digital Foundations';
  if (completedLessonCount >= 4) upcomingMilestone = 'Phase 1: Web Foundations & Portfolio Capstone';
  if (completedLessonCount >= 8) upcomingMilestone = 'Phase 2: JavaScript DOM & Habit Tracker Capstone';
  if (completedLessonCount >= 14) upcomingMilestone = 'Phase 4: React Productivity Studio';
  if (completedLessonCount >= 20) upcomingMilestone = 'Phase 7: Full-Stack Issue Tracker';
  if (completedLessonCount >= 26) upcomingMilestone = 'Phase 10: Production SaaS & Career Readiness';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-500/10 via-slate-50 to-teal-500/10 dark:from-indigo-950/40 dark:via-slate-900 dark:to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Active Track: {payload.profile.goal.replace('-', ' ').toUpperCase()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Keep Going. Small, Consistent Steps Win.
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Targeting <strong>{payload.profile.weeklyCommitmentHours} hrs/week</strong> at a{' '}
            <strong className="capitalize">{payload.profile.pace}</strong> study pace. You have completed{' '}
            <strong>{completedLessonCount}</strong> of <strong>{totalLessons}</strong> lessons.
          </p>
        </div>

        {/* Primary Action Button */}
        <Link
          href={`/curriculum/${continueTarget.moduleSlug}/${continueTarget.lessonSlug}`}
          className="w-full md:w-auto px-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-3 transition-all shadow-md shadow-indigo-500/25 shrink-0 min-h-[44px]"
        >
          <div className="text-left">
            <div className="text-[10px] uppercase font-mono text-indigo-200">Continue Learning</div>
            <div className="font-bold text-sm line-clamp-1">{continueTarget.title}</div>
          </div>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Completion */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Overall Progress</span>
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {progressPercentage}%
            </span>
            <span className="text-xs text-slate-500">
              ({completedLessonCount}/{totalLessons})
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Learning Streak */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {payload.streak.currentStreak}
            </span>
            <span className="text-xs text-slate-500">days active</span>
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Best: {payload.streak.longestStreak} days</span>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Weekly Commitment</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {payload.profile.weeklyCommitmentHours}h
            </span>
            <span className="text-xs text-slate-500">per week</span>
          </div>
          <div className="mt-3 text-xs text-slate-500 capitalize">
            Pace: {payload.profile.pace}
          </div>
        </div>

        {/* Upcoming Milestone */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Next Milestone</span>
            <Layers className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-3 font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
            {upcomingMilestone}
          </div>
          <div className="mt-3 text-xs text-purple-600 dark:text-purple-400 font-medium">
            Keep moving forward &rarr;
          </div>
        </div>
      </div>

      {/* Visual Learning Roadmap (Phases 0 through 10) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Visual Curriculum Roadmap</span>
          </h2>
          <Link
            href="/curriculum"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline min-h-[36px] flex items-center"
          >
            View all 11 phases &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPhases.slice(0, 6).map((phase) => {
            const phaseLessonIds = phase.modules.flatMap((m) => m.lessons.map((l) => l.id));
            const completedInPhase = phaseLessonIds.filter((id) => payload.completedLessons[id]).length;
            const isPhaseCompleted = completedInPhase === phaseLessonIds.length && phaseLessonIds.length > 0;
            const isStarted = completedInPhase > 0;

            return (
              <div
                key={phase.phase}
                className={cn(
                  'p-5 rounded-2xl border transition-all',
                  isPhaseCompleted
                    ? 'border-teal-500/30 bg-teal-50/20 dark:bg-teal-950/10'
                    : isStarted
                    ? 'border-indigo-500/40 bg-white dark:bg-slate-900 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    Phase {phase.phase}
                  </span>
                  {isPhaseCompleted ? (
                    <span className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">
                      {completedInPhase} / {phaseLessonIds.length} lessons
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-bold text-base text-slate-900 dark:text-slate-100 line-clamp-1">
                  {phase.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {phase.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="w-24 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{
                        width: `${Math.round((completedInPhase / phaseLessonIds.length) * 100) || 0}%`,
                      }}
                    />
                  </div>
                  <Link
                    href={`/curriculum/${phase.modules[0]?.slug}/${phase.modules[0]?.lessons[0]?.slug}`}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline min-h-[36px] flex items-center"
                  >
                    Explore &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capstone Projects Summary */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Capstone Portfolio Projects</span>
          </h2>
          <Link
            href="/projects"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline min-h-[36px] flex items-center"
          >
            Open Project Hub &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capstoneProjects.slice(0, 3).map((proj) => {
            const progress = payload.projectMilestones[proj.id];
            const completedCount = progress?.completedMilestoneIds.length || 0;
            const totalMilestones = proj.milestones.length;

            return (
              <div
                key={proj.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold">
                      {proj.badge}
                    </span>
                    <span className="text-xs text-slate-500">~{proj.estimatedHours} hrs</span>
                  </div>
                  <h3 className="mt-2.5 font-bold text-sm text-slate-900 dark:text-slate-100">
                    {proj.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {proj.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {completedCount} / {totalMilestones} milestones
                  </span>
                  <Link
                    href="/projects"
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline min-h-[36px] flex items-center"
                  >
                    View Brief &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Notes & Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Notes */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>Recent Notes</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {Object.keys(payload.notes).length} total
            </span>
          </div>

          {recentNotes.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4 text-center">
              No private notes written yet. Jot down takeaways while reading any lesson!
            </p>
          ) : (
            <div className="space-y-3">
              {recentNotes.map((note) => (
                <Link
                  key={note.id}
                  href={`/curriculum/${note.moduleSlug}/${note.lessonSlug}`}
                  className="block p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="font-semibold text-xs text-indigo-600 dark:text-indigo-400">
                    {note.lessonTitle}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {note.content}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-400 font-mono">
                    Updated {formatDate(note.updatedAt)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bookmarks */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-teal-500" />
              <span>Saved Bookmarks</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {Object.keys(payload.bookmarks).length} total
            </span>
          </div>

          {recentBookmarks.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4 text-center">
              No bookmarks saved yet. Click the bookmark icon on any lesson to save it for quick review.
            </p>
          ) : (
            <div className="space-y-3">
              {recentBookmarks.map((bm) => (
                <Link
                  key={bm.id}
                  href={`/curriculum/${bm.moduleSlug}/${bm.lessonSlug}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors min-h-[44px]"
                >
                  <div>
                    <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                      {bm.lessonTitle}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Saved {formatDate(bm.savedAt)}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
