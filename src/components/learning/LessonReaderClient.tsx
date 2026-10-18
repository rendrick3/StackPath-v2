'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProgressStore } from '@/features/progress/useProgressStore';
import { getNextAndPrevLesson } from '@/content/curriculum';
import { Lesson, Module } from '@/types/curriculum';
import {
  Check,
  Bookmark,
  BookmarkCheck,
  FileText,
  Clock,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Copy,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Menu,
  X,
  Code,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SystemDiagram } from '@/components/diagrams/SystemDiagram';
import confetti from 'canvas-confetti';

interface LessonReaderClientProps {
  moduleSlug: string;
  lessonSlug: string;
  currentModule: Module;
  currentLesson: Lesson;
}

export function LessonReaderClient({
  moduleSlug,
  lessonSlug,
  currentModule,
  currentLesson,
}: LessonReaderClientProps) {
  const {
    payload,
    markLessonComplete,
    setCurrentLesson,
    saveNote,
    deleteNote,
    toggleBookmark,
  } = useProgressStore();

  const isCompleted = !!payload.completedLessons[currentLesson.id];
  const isBookmarked = !!payload.bookmarks[currentLesson.id];
  const existingNote = payload.notes[currentLesson.id]?.content || '';

  const [noteContent, setNoteContent] = useState(existingNote);
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showTaskSolution, setShowTaskSolution] = useState(false);
  const [showTaskHints, setShowTaskHints] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update store's current position
  useEffect(() => {
    setCurrentLesson(moduleSlug, lessonSlug);
  }, [moduleSlug, lessonSlug, setCurrentLesson]);

  // Reading progress scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { prev, next } = getNextAndPrevLesson(currentLesson.id);

  const handleMarkComplete = () => {
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    }
    markLessonComplete(currentLesson.id, currentLesson.readingTimeMinutes * 60);
  };

  const handleCopyCode = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeIndex(index);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    } catch {}
  };

  const handleSaveNote = () => {
    saveNote(currentLesson.id, currentLesson.title, moduleSlug, lessonSlug, noteContent);
  };

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 z-30 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Course Sidebar (Desktop) */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-72 lg:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 overflow-y-auto transition-transform lg:translate-x-0 lg:static lg:h-[calc(100vh-4.25rem)] lg:sticky lg:top-16 shrink-0',
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 lg:hidden">
            <span className="font-bold text-sm">Course Navigation</span>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-2">
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Roadmap</span>
            </Link>

            <div className="text-[11px] font-mono uppercase text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider">
              {currentModule.phaseTitle}
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 mb-4 leading-tight">
              {currentModule.title}
            </h2>

            {/* Module Lessons List */}
            <div className="space-y-1">
              {currentModule.lessons.map((les, i) => {
                const isLesActive = les.slug === currentLesson.slug;
                const isLesDone = !!payload.completedLessons[les.id];

                return (
                  <Link
                    key={les.id}
                    href={`/curriculum/${currentModule.slug}/${les.slug}`}
                    onClick={() => setShowSidebar(false)}
                    className={cn(
                      'flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium transition-colors min-h-[40px]',
                      isLesActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-mono',
                        isLesDone
                          ? 'bg-teal-500 text-white font-bold'
                          : isLesActive
                          ? 'border-2 border-indigo-600 text-indigo-600'
                          : 'border border-slate-300 dark:border-slate-700 text-slate-400'
                      )}
                    >
                      {isLesDone ? <Check className="w-3 h-3" /> : i + 1}
                    </div>
                    <span className="line-clamp-2 leading-snug flex-1">{les.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Reading Canvas */}
        <main
          id="main-content"
          className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 focus:outline-none"
        >
          {/* Top Breadcrumb & Actions Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 min-h-[40px]"
                aria-label="Toggle course outline sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="text-xs text-slate-500 font-medium">
                <span>{currentModule.title}</span>
              </div>
            </div>

            {/* Bookmark & Note Quick Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  toggleBookmark(currentLesson.id, currentLesson.title, moduleSlug, lessonSlug)
                }
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                className={cn(
                  'p-2 rounded-lg border transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center',
                  isBookmarked
                    ? 'border-teal-500/40 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setShowNotesDrawer(!showNotesDrawer)}
                title="Lesson notes"
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors min-h-[40px]',
                  noteContent
                    ? 'border-indigo-500/40 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                <FileText className="w-4 h-4" />
                <span>Notes {noteContent ? '•' : ''}</span>
              </button>
            </div>
          </div>

          {/* Lesson Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentLesson.readingTimeMinutes} min read</span>
              </span>
              <span>•</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">
                Phase {currentLesson.phase}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              {currentLesson.title}
            </h1>

            {/* Objective Card */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300">
                <Lightbulb className="w-4 h-4" />
                <span>Learning Objective</span>
              </div>
              <p className="leading-relaxed">{currentLesson.objective}</p>
            </div>

            {/* Why This Matters */}
            <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">
                Why this matters in a real job:
              </div>
              <p className="leading-relaxed">{currentLesson.whyItMatters}</p>
            </div>
          </div>

          {/* Structured Content Sections */}
          <div className="space-y-8 leading-relaxed text-slate-800 dark:text-slate-200 text-base">
            {currentLesson.sections.map((section, idx) => (
              <section key={section.id || idx} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                  {section.title}
                </h2>

                <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {section.content}
                </div>

                {/* System Diagram if present */}
                {section.diagramId && (
                  <SystemDiagram diagramId={section.diagramId} title={section.title} />
                )}

                {/* Annotated Code Block if present */}
                {section.codeExample && (
                  <div className="my-4 rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-lg">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
                      <span>{section.codeExample.filename || section.codeExample.language}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(section.codeExample!.code, idx)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-teal-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
                      <code>{section.codeExample.code}</code>
                    </pre>

                    {/* Code Annotations */}
                    {section.codeExample.annotations && section.codeExample.annotations.length > 0 && (
                      <div className="p-3 bg-slate-900/80 border-t border-slate-800 text-xs space-y-1">
                        <div className="font-semibold text-indigo-400">Code Annotations:</div>
                        {section.codeExample.annotations.map((ann, aIdx) => (
                          <div key={aIdx} className="text-slate-400 flex items-start gap-2">
                            <span className="font-mono text-indigo-400">Line {ann.line}:</span>
                            <span>{ann.comment}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Callout box (Beginner Mistake / Tip) */}
                {section.callout && (
                  <div
                    className={cn(
                      'p-4 rounded-2xl border text-xs sm:text-sm space-y-1',
                      section.callout.type === 'mistake'
                        ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
                        : 'bg-teal-50/60 dark:bg-teal-950/20 border-teal-300 dark:border-teal-900/60 text-teal-900 dark:text-teal-200'
                    )}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {section.callout.type === 'mistake' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Lightbulb className="w-4 h-4 text-teal-600" />
                      )}
                      <span>{section.callout.title}</span>
                    </div>
                    <p className="leading-relaxed">{section.callout.text}</p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Key Takeaways / Recap */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Key Takeaways</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {currentLesson.recap.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Self-Check Questions (Interactive Quiz) */}
          {currentLesson.selfCheckQuestions.length > 0 && (
            <div className="p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Self-Check Checkpoint</span>
              </h3>

              {currentLesson.selfCheckQuestions.map((q) => {
                const selected = quizAnswers[q.id];
                const hasAnswered = selected !== undefined;
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={q.id} className="space-y-3 pt-2">
                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                      {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selected === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })}
                            className={cn(
                              'w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all min-h-[44px]',
                              isThisSelected
                                ? isCorrect
                                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950 text-teal-900 dark:text-teal-200 font-medium'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-200'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                            )}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {hasAnswered && (
                      <div
                        className={cn(
                          'p-3 rounded-lg text-xs leading-relaxed animate-in fade-in',
                          isCorrect
                            ? 'bg-teal-100/70 dark:bg-teal-950/50 text-teal-900 dark:text-teal-200'
                            : 'bg-rose-100/70 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200'
                        )}
                      >
                        <span className="font-bold">{isCorrect ? '✅ Correct! ' : '❌ Review: '}</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Practical Hands-On Task */}
          {currentLesson.practicalTask && (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Code className="w-4 h-4 text-indigo-500" />
                  <span>Practical Exercise: {currentLesson.practicalTask.title}</span>
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentLesson.practicalTask.instruction}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTaskHints(!showTaskHints)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors min-h-[36px]"
                >
                  {showTaskHints ? 'Hide Hints' : '💡 Show Hints'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowTaskSolution(!showTaskSolution)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-colors min-h-[36px]"
                >
                  {showTaskSolution ? 'Hide Solution' : 'Reveal Solution'}
                </button>
              </div>

              {showTaskHints && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="font-semibold text-indigo-600 dark:text-indigo-400">Hints:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                    {currentLesson.practicalTask.hints.map((hint, hIdx) => (
                      <li key={hIdx}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              {showTaskSolution && (
                <div className="p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 text-xs space-y-2">
                  <div className="font-semibold text-teal-400">Reference Solution:</div>
                  <pre className="overflow-x-auto font-mono text-xs text-slate-300">
                    <code>{currentLesson.practicalTask.solutionCode || 'Check solution guidance in documentation.'}</code>
                  </pre>
                  <div className="text-[11px] text-slate-400 mt-2">
                    Expected outcome: {currentLesson.practicalTask.expectedOutcome}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Explicit Lesson Completion Action */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-base text-slate-900 dark:text-slate-100">
                Ready to complete this lesson?
              </div>
              <div className="text-xs text-slate-500">
                Lessons are tracked explicitly when you finish, never on passive page views.
              </div>
            </div>

            <button
              type="button"
              onClick={handleMarkComplete}
              className={cn(
                'w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all min-h-[44px]',
                isCompleted
                  ? 'bg-teal-500 hover:bg-teal-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
              )}
            >
              <Check className="w-4 h-4" />
              <span>{isCompleted ? 'Completed ✓ (Click to re-confirm)' : 'Mark Lesson as Complete'}</span>
            </button>
          </div>

          {/* Previous / Next Lesson Navigation */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            {prev ? (
              <Link
                href={`/curriculum/${prev.moduleSlug}/${prev.slug}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="line-clamp-1">Prev: {prev.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                href={`/curriculum/${next.moduleSlug}/${next.slug}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
              >
                <span className="line-clamp-1">Next: {next.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </main>

        {/* Private Notes Drawer / Right Panel */}
        {showNotesDrawer && (
          <aside className="fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>Private Notes</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNotesDrawer(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 min-h-[36px]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Jot down your questions, key mental models, or code ideas. Notes are encrypted with your Personal Sync Key.
              </p>

              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your personal study notes here..."
                rows={10}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-sans"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              {noteContent && (
                <button
                  type="button"
                  onClick={() => {
                    deleteNote(currentLesson.id);
                    setNoteContent('');
                  }}
                  className="text-xs text-rose-500 hover:underline min-h-[36px]"
                >
                  Delete note
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  handleSaveNote();
                  setShowNotesDrawer(false);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold ml-auto min-h-[36px]"
              >
                Save & Close
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
