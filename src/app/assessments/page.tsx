'use client';

import React, { useState } from 'react';
import { useProgressStore } from '@/features/progress/useProgressStore';
import { getAllModules } from '@/content/curriculum';
import { fullStackReadinessAssessment } from '@/content/assessments/readiness';
import { ModuleQuiz } from '@/types/curriculum';
import {
  CheckCircle2,
  RotateCcw,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function AssessmentsPage() {
  const { payload, recordQuizAttempt } = useProgressStore();
  const allModules = getAllModules();

  // Combine module quizzes + readiness exam
  const quizzes: ModuleQuiz[] = [
    fullStackReadinessAssessment,
    ...allModules.map((m) => m.quiz),
  ];

  const [activeQuizId, setActiveQuizId] = useState<string>(fullStackReadinessAssessment.id);
  const activeQuiz = quizzes.find((q) => q.id === activeQuizId) || fullStackReadinessAssessment;

  const quizProgress = payload.quizAttempts[activeQuiz.id];

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: optionIdx });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    activeQuiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    const percentage = Math.round((score / activeQuiz.questions.length) * 100);
    const passed = percentage >= activeQuiz.passingScore;

    if (passed) {
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
    }

    recordQuizAttempt(
      activeQuiz.id,
      score,
      activeQuiz.questions.length,
      answers,
      activeQuiz.passingScore
    );
    setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // Switch quiz
  const handleSelectQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = activeQuiz.questions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Formative Quizzes & Engineering Readiness</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Knowledge Checkpoints & Assessments
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Every checkpoint tests genuine comprehension and practical engineering tradeoffs. Review detailed explanations for BOTH correct and incorrect choices, and retake assessments anytime.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quiz Selector */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Available Assessments ({quizzes.length})
          </div>

          <div className="space-y-2">
            {quizzes.map((q) => {
              const prog = payload.quizAttempts[q.id];
              const bestScore = prog?.bestPercentage ?? null;
              const hasPassed = bestScore !== null && bestScore >= q.passingScore;
              const isSelected = activeQuiz.id === q.id;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleSelectQuiz(q.id)}
                  className={cn(
                    'w-full text-left p-4 rounded-2xl border transition-all min-h-[44px]',
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  )}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono text-slate-500 font-semibold">
                      {q.questions.length} questions • Pass {q.passingScore}%
                    </span>
                    {hasPassed ? (
                      <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Passed ({bestScore}%)
                      </span>
                    ) : bestScore !== null ? (
                      <span className="text-amber-600 font-semibold">
                        Score: {bestScore}%
                      </span>
                    ) : (
                      <span className="text-slate-400">Unattempted</span>
                    )}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    {q.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Quiz Runner & Detailed Explanations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                  Passing Score: {activeQuiz.passingScore}%
                </span>
                {quizProgress && (
                  <span className="text-xs text-slate-500">
                    {quizProgress.attempts.length} previous attempt{quizProgress.attempts.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                {activeQuiz.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {activeQuiz.description}
              </p>
            </div>

            {/* Questions list */}
            <div className="space-y-8 pt-4 border-t border-slate-200 dark:border-slate-800">
              {activeQuiz.questions.map((q, qIdx) => {
                const selected = answers[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={q.id} className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 mt-0.5">
                        Q{qIdx + 1}
                      </span>
                      <p className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-snug">
                        {q.question}
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 pl-7">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selected === optIdx;
                        const isThisTheCorrectAnswer = q.correctIndex === optIdx;

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={submitted}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={cn(
                              'w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all min-h-[44px]',
                              submitted
                                ? isThisTheCorrectAnswer
                                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-semibold'
                                  : isThisSelected
                                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                                  : 'border-slate-200 dark:border-slate-800 opacity-60'
                                : isThisSelected
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium ring-2 ring-indigo-600/30'
                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                            )}
                          >
                            <div className="flex items-start gap-2">
                              <span className="font-mono text-xs font-semibold text-slate-400 shrink-0">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span>{opt}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanations for correct and incorrect choices (Visible after submit) */}
                    {submitted && (
                      <div className="mt-3 ml-7 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                        <div className="font-bold text-slate-700 dark:text-slate-200">
                          {isCorrect ? '✅ Well done!' : '❌ Explanation & Learning Point:'}
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {q.explanations[selected ?? -1] || q.explanations[q.correctIndex]}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit or Retake Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!submitted ? (
                <>
                  <div className="text-xs text-slate-500">
                    {activeQuiz.questions.filter((q) => answers[q.id] !== undefined).length} of{' '}
                    {activeQuiz.questions.length} answered
                  </div>
                  <button
                    type="button"
                    disabled={!allAnswered}
                    onClick={handleSubmitQuiz}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm transition-colors min-h-[44px]"
                  >
                    Submit Assessment
                  </button>
                </>
              ) : (
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Score: </span>
                    <strong className="text-indigo-600 dark:text-indigo-400 text-lg">
                      {Math.round(
                        (activeQuiz.questions.filter((q) => answers[q.id] === q.correctIndex).length /
                          activeQuiz.questions.length) *
                          100
                      )}
                      %
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Assessment</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
