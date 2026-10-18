'use client';

import React, { useState } from 'react';
import { interviewQuestions } from '@/content/interview';
import { InterviewCategory } from '@/types/features';
import {
  MessageSquareCode,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InterviewPrepPage() {
  const [selectedCategory, setSelectedCategory] = useState<InterviewCategory | 'all'>('all');
  const [simpleMode, setSimpleMode] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(interviewQuestions[0].id);

  const filtered = interviewQuestions.filter((q) => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <MessageSquareCode className="w-3.5 h-3.5 text-indigo-500" />
            <span>Full-Stack Engineering Question Bank</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Technical & Behavioral Interview Prep
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Prepare for senior engineer interviews with structured model answers (Concept, Example, Tradeoffs), likely follow-up questions, and our signature <strong>&quot;Explain It Simply&quot;</strong> mode for intuitive understanding.
          </p>
        </div>

        {/* Explain It Simply Toggle */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 flex items-center gap-3 shrink-0">
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Explain It Simply Mode
            </div>
            <div className="text-[11px] text-slate-500">
              Jargon-free analogies & plain English
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSimpleMode(!simpleMode)}
            className="text-indigo-600 dark:text-indigo-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Explain It Simply mode"
          >
            {simpleMode ? (
              <ToggleRight className="w-8 h-8 text-indigo-600" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {(
          [
            'all',
            'frontend',
            'backend',
            'databases',
            'apis',
            'system-design',
            'debugging',
            'behavioral',
            'deployment',
          ] as const
        ).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors min-h-[36px]',
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            )}
          >
            {cat.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors min-h-[44px]"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      {item.level} level
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                    {item.question}
                  </h2>
                </div>

                <div className="p-1 rounded-lg text-slate-400 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-6 animate-in fade-in">
                  {/* Why this is asked */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Why Interviewers Ask This:
                    </span>
                    <p className="leading-relaxed">{item.whyAsked}</p>
                  </div>

                  {/* Explain It Simply Mode (if enabled) */}
                  {simpleMode ? (
                    <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-2">
                      <div className="font-bold text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span>Explain It Simply (The Intuitive Analogy)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed font-sans">
                        {item.simpleExplanation}
                      </p>
                    </div>
                  ) : (
                    /* Structured Senior Model Answer */
                    <div className="space-y-4 text-xs sm:text-sm">
                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[11px] tracking-wider">
                          1. Core Concept:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {item.structuredAnswer.coreConcept}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="font-bold text-teal-600 dark:text-teal-400 uppercase text-[11px] tracking-wider">
                          2. Practical Example:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {item.structuredAnswer.practicalExample}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[11px] tracking-wider">
                          3. Tradeoffs & Edge Cases:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {item.structuredAnswer.tradeoffsOrEdgeCases}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Follow-up Questions & Pro Tips */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Follow Up */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-indigo-500" />
                        <span>Expected Follow-Up Questions:</span>
                      </div>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                        {item.followUpQuestions.map((fq, fqIdx) => (
                          <li key={fqIdx} className="flex items-start gap-1.5">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{fq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pro Tips */}
                    <div className="p-4 rounded-2xl bg-teal-50/30 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60 text-xs space-y-2">
                      <div className="font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        <span>Interview Pro-Tips:</span>
                      </div>
                      <ul className="space-y-1 text-teal-900 dark:text-teal-200">
                        {item.proTips.map((pt, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-1.5">
                            <span className="text-teal-500 font-bold">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
