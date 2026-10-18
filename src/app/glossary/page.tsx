'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { glossaryTerms } from '@/content/glossary';
import {
  BookMarked,
  Search,
  Volume2,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return glossaryTerms.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.analogy.toLowerCase().includes(q)
      );
    });
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <BookMarked className="w-3.5 h-3.5 text-indigo-500" />
          <span>Plain-English Technical Dictionary</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          The Full-Stack Glossary
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Unfamiliar technical words demystified with intuitive real-world analogies, pronunciations, and links to in-depth curriculum lessons.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search terms, concepts, or analogies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'web-basics', 'frontend', 'backend', 'database', 'devops', 'testing'] as const).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors min-h-[36px]',
                  category === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                )}
              >
                {cat.replace('-', ' ')}
              </button>
            )
          )}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.slug}
            className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
                  {item.category}
                </span>

                {item.pronunciation && (
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{item.pronunciation}</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {item.term}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.definition}
              </p>

              {/* Intuitive Real-World Analogy */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>The Real-World Analogy:</span>
                </div>
                <p className="leading-relaxed">{item.analogy}</p>
              </div>
            </div>

            {/* Related Terms / Module Link */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-400 text-[11px]">Related:</span>
                {item.relatedTerms.map((rt) => (
                  <span
                    key={rt}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300"
                  >
                    #{rt}
                  </span>
                ))}
              </div>

              {item.moduleSlug && (
                <Link
                  href={`/curriculum`}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 min-h-[36px]"
                >
                  <span>Learn in Course</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
