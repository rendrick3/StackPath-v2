'use client';

import React, { useState } from 'react';
import { useProgressStore } from '@/features/progress/useProgressStore';
import { practiceChallenges } from '@/content/practice';
import { PracticeDifficulty, PracticeCategory } from '@/types/features';
import {
  Code2,
  CheckCircle2,
  Copy,
  Check,
  Lightbulb,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function PracticeLabPage() {
  const { payload, togglePracticeCompleted } = useProgressStore();
  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<PracticeDifficulty | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const filtered = practiceChallenges.filter((ch) => {
    if (selectedCategory !== 'all' && ch.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && ch.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const completedCount = Object.keys(payload.practiceCompleted).length;

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const handleToggleComplete = (id: string) => {
    const isNowDone = !payload.practiceCompleted[id];
    if (isNowDone) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
    togglePracticeCompleted(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Code2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Interactive Code Exercises</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            The Practice Lab
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Deliberate coding challenges designed to build muscle memory. Each exercise includes strict requirements, expected outcomes, copyable starter templates, and verified solutions.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-right shrink-0">
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {completedCount} / {practiceChallenges.length}
          </div>
          <div className="text-xs text-slate-500">Challenges Solved</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'html', 'css', 'javascript', 'typescript', 'backend'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors min-h-[36px]',
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as PracticeDifficulty | 'all')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Challenges List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((ch) => {
          const isDone = !!payload.practiceCompleted[ch.id];
          const hasSolution = !!revealedSolutions[ch.id];
          const hasHints = !!revealedHints[ch.id];

          return (
            <div
              key={ch.id}
              className={cn(
                'p-6 rounded-3xl border transition-all flex flex-col justify-between bg-white dark:bg-slate-900',
                isDone
                  ? 'border-teal-500/40 bg-teal-50/10 dark:bg-teal-950/10'
                  : 'border-slate-200 dark:border-slate-800 shadow-sm'
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-semibold">
                      {ch.category}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-semibold uppercase px-2 py-0.5 rounded',
                        ch.difficulty === 'beginner'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                          : ch.difficulty === 'intermediate'
                          ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                          : 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400'
                      )}
                    >
                      {ch.difficulty}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{ch.estimatedMinutes}m</span>
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {ch.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ch.description}
                </p>

                {/* Requirements checklist */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                    Requirements:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {ch.inputsAndRequirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1.5">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Copyable Starter Code */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 text-slate-200 overflow-hidden text-xs">
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                    <span>Starter Template</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(ch.id, ch.starterCode)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]"
                    >
                      {copiedId === ch.id ? <Check className="w-3 h-3 text-teal-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === ch.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3 overflow-x-auto font-mono text-[11px] leading-relaxed">
                    <code>{ch.starterCode}</code>
                  </pre>
                </div>

                {/* Hints toggle */}
                {hasHints && (
                  <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    <div className="font-semibold flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Hints:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-amber-800 dark:text-amber-300">
                      {ch.hints.map((hint, hIdx) => (
                        <li key={hIdx}>{hint}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Solution Reveal */}
                {hasSolution && (
                  <div className="p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 text-xs space-y-2">
                    <div className="font-bold text-teal-400">Verified Model Solution:</div>
                    <pre className="overflow-x-auto font-mono text-[11px] text-slate-300 leading-relaxed">
                      <code>{ch.solutionCode}</code>
                    </pre>
                    <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                      {ch.solutionExplanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setRevealedHints({ ...revealedHints, [ch.id]: !hasHints })
                    }
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium min-h-[36px]"
                  >
                    {hasHints ? 'Hide Hints' : '💡 Hints'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setRevealedSolutions({ ...revealedSolutions, [ch.id]: !hasSolution })
                    }
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold min-h-[36px]"
                  >
                    {hasSolution ? 'Hide Solution' : 'Reveal Solution'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleComplete(ch.id)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors min-h-[40px]',
                    isDone
                      ? 'bg-teal-500 hover:bg-teal-600 text-white'
                      : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  )}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDone ? 'Completed ✓' : 'Mark as Solved'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
