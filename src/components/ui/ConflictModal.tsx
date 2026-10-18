'use client';

import React from 'react';
import { useProgressStore } from '@/features/progress/useProgressStore';
import { AlertCircle, Clock, CheckCircle2, Laptop, Cloud } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function ConflictModal() {
  const { payload, conflictData, resolveConflict } = useProgressStore();

  if (!conflictData) return null;

  const localLessonsCount = Object.keys(payload.completedLessons).length;
  const remoteLessonsCount = Object.keys(conflictData.completedLessons).length;

  const localTimestamp = payload.profile.lastSyncedAt || payload.profile.createdAt;
  const remoteTimestamp = conflictData.profile.lastSyncedAt || conflictData.profile.createdAt;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="conflict-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in"
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl text-slate-900 dark:text-slate-100">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 id="conflict-title" className="text-lg font-bold">
              Simultaneous Device Conflict
            </h2>
            <p className="text-xs text-slate-500">Progress has been updated from another device</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The cloud snapshot is newer than the last sync on this device. Review the comparison below and select which progress snapshot you would like to keep.
        </p>

        {/* Side by side comparison */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          {/* Local Device */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200 mb-2">
              <Laptop className="w-4 h-4 text-indigo-500" />
              <span>This Device</span>
            </div>
            <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>{localLessonsCount} completed lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated:</span>
              </div>
              <div className="font-mono text-[11px] text-slate-500 pl-4">
                {formatDate(localTimestamp)}
              </div>
            </div>
          </div>

          {/* Remote Cloud */}
          <div className="p-3.5 rounded-xl border-2 border-indigo-500/40 bg-indigo-50/30 dark:bg-indigo-950/20">
            <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300 mb-2">
              <Cloud className="w-4 h-4 text-indigo-500" />
              <span>Other Device (Cloud)</span>
            </div>
            <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>{remoteLessonsCount} completed lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated:</span>
              </div>
              <div className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 pl-4 font-semibold">
                {formatDate(remoteTimestamp)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => resolveConflict(true)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-sm min-h-[44px]"
          >
            Load Newer Version from Cloud
          </button>
          <button
            type="button"
            onClick={() => resolveConflict(false)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors min-h-[44px]"
          >
            Keep This Device’s Version
          </button>
        </div>
      </div>
    </div>
  );
}
