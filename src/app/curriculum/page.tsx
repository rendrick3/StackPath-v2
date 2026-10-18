'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useProgressStore } from '@/features/progress/useProgressStore';
import { allPhases } from '@/content/curriculum';
import {
  Search,
  Clock,
  BookOpen,
  ArrowRight,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CurriculumPage() {
  const { payload } = useProgressStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in-progress' | 'unstarted'>('all');

  const filteredPhases = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allPhases
      .map((phase) => {
        const matchingModules = phase.modules.filter((mod) => {
          // Search query check
          const matchesSearch =
            !q ||
            mod.title.toLowerCase().includes(q) ||
            mod.description.toLowerCase().includes(q) ||
            mod.outcomes.some((o) => o.toLowerCase().includes(q)) ||
            mod.lessons.some((l) => l.title.toLowerCase().includes(q));

          if (!matchesSearch) return false;

          // Status check
          const modLessonIds = mod.lessons.map((l) => l.id);
          const completedCount = modLessonIds.filter((id) => payload.completedLessons[id]).length;
          const isComplete = completedCount === modLessonIds.length && modLessonIds.length > 0;
          const isInProgress = completedCount > 0 && !isComplete;

          if (statusFilter === 'completed' && !isComplete) return false;
          if (statusFilter === 'in-progress' && !isInProgress) return false;
          if (statusFilter === 'unstarted' && completedCount > 0) return false;

          return true;
        });

        return {
          ...phase,
          modules: matchingModules,
        };
      })
      .filter((phase) => phase.modules.length > 0);
  }, [searchQuery, statusFilter, payload.completedLessons]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Curriculum & Learning Roadmap
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          11 comprehensive phases guiding you from complete novice to full-stack production engineer. Every lesson is focused, practical, and includes hands-on tasks and self-check checkpoints.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search lessons, concepts, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'completed', 'in-progress', 'unstarted'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors min-h-[36px]',
                statusFilter === filter
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              )}
            >
              {filter.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Sections */}
      {filteredPhases.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-400" />
          <p className="text-base font-semibold">No modules match your search.</p>
          <p className="text-xs mt-1">Try searching for keywords like &quot;HTML&quot;, &quot;React&quot;, &quot;PostgreSQL&quot;, or &quot;Docker&quot;.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredPhases.map((phase) => (
            <section key={phase.phase} className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
                <div>
                  <div className="text-xs font-mono font-semibold uppercase text-indigo-600 dark:text-indigo-400">
                    Phase {phase.phase}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {phase.title}
                  </h2>
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {phase.modules.length} module{phase.modules.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.modules.map((mod) => {
                  const modLessonIds = mod.lessons.map((l) => l.id);
                  const completedLessons = modLessonIds.filter((id) => payload.completedLessons[id]).length;
                  const isCompleted = completedLessons === modLessonIds.length && modLessonIds.length > 0;
                  const isInProgress = completedLessons > 0 && !isCompleted;

                  return (
                    <div
                      key={mod.id}
                      className={cn(
                        'p-6 rounded-2xl border transition-all flex flex-col justify-between',
                        isCompleted
                          ? 'border-teal-500/40 bg-teal-50/20 dark:bg-teal-950/10'
                          : isInProgress
                          ? 'border-indigo-500/40 bg-white dark:bg-slate-900 shadow-md shadow-indigo-500/5'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                      )}
                    >
                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>~{mod.estimatedHours} hrs</span>
                          </span>

                          {isCompleted ? (
                            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold text-[11px]">
                              <Check className="w-3 h-3" /> Completed
                            </span>
                          ) : isInProgress ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">
                              {completedLessons}/{mod.lessons.length} In Progress
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium text-[11px]">
                              Available
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {mod.title}
                        </h3>

                        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {mod.description}
                        </p>

                        {/* Lessons List inside Module */}
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Lessons in this module:
                          </div>
                          {mod.lessons.map((lesson) => {
                            const isLessonDone = !!payload.completedLessons[lesson.id];
                            return (
                              <Link
                                key={lesson.id}
                                href={`/curriculum/${mod.slug}/${lesson.slug}`}
                                className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <div className={cn(
                                    'w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px]',
                                    isLessonDone
                                      ? 'bg-teal-500 text-white'
                                      : 'border border-slate-300 dark:border-slate-600 text-slate-400'
                                  )}>
                                    {isLessonDone && <Check className="w-2.5 h-2.5" />}
                                  </div>
                                  <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {lesson.readingTimeMinutes}m
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-medium">
                          Quiz: {mod.quiz.questions.length} questions
                        </span>
                        <Link
                          href={`/curriculum/${mod.slug}/${mod.lessons[0]?.slug}`}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[36px]"
                        >
                          <span>Start Module</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
