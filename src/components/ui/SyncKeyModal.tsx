'use client';

import React, { useState } from 'react';
import { useProgressStore } from '@/features/progress/useProgressStore';
import { X, Copy, Check, ShieldCheck, KeyRound, AlertTriangle } from 'lucide-react';

interface SyncKeyModalProps {
  onClose: () => void;
}

export function SyncKeyModal({ onClose }: SyncKeyModalProps) {
  const { payload, restoreFromSyncKey } = useProgressStore();
  const [copied, setCopied] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isRestoreMode, setIsRestoreMode] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payload.profile.syncKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleRestore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    setIsRestoring(true);
    setRestoreMessage(null);

    const result = await restoreFromSyncKey(inputKey);
    setIsRestoring(false);
    setRestoreMessage(result.message);
    if (result.success) {
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sync-key-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 id="sync-key-title" className="text-lg font-bold">
                {isRestoreMode ? 'Restore from Sync Key' : 'Personal Sync Key'}
              </h2>
              <p className="text-xs text-slate-500">Zero-knowledge cross-device progress</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isRestoreMode ? (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              StackPath does not require email, passwords, or personal accounts. Your progress is encrypted directly in your browser using <strong>Web Crypto AES-GCM</strong>.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Your Private Recovery Key
              </label>
              <div className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-mono text-sm break-all select-all">
                <span className="flex-1 text-indigo-600 dark:text-indigo-400 font-medium">
                  {payload.profile.syncKey}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 min-h-[36px]"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Key'}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <strong>Important Warning:</strong> If you lose this device’s local data AND your Sync Key, your learning progress cannot be recovered. Store this key in a password manager or secure notes.
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/50 dark:bg-teal-950/20 text-xs text-teal-800 dark:text-teal-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-teal-600" />
              <div>
                <strong>Zero-Knowledge Privacy:</strong> The cloud database only stores an encrypted binary snapshot. No one—not even server administrators—can read your notes, quizzes, or progress.
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => setIsRestoreMode(true)}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium min-h-[36px] flex items-center"
              >
                Already have a key from another device? Enter it here &rarr;
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium min-h-[36px]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRestore} className="mt-4 space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Enter your Personal Sync Key below to restore your lessons, quiz scores, project notes, and bookmarks onto this device.
            </p>

            <div>
              <label htmlFor="restore-key-input" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Paste Sync Key
              </label>
              <input
                id="restore-key-input"
                type="text"
                placeholder="sp-xxxx-xxxx-xxxx-xxxx"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
            </div>

            {restoreMessage && (
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {restoreMessage}
              </p>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsRestoreMode(false)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 min-h-[36px] flex items-center"
              >
                &larr; Back to my key
              </button>
              <button
                type="submit"
                disabled={isRestoring || !inputKey.trim()}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors min-h-[44px]"
              >
                {isRestoring ? 'Decrypting...' : 'Restore Progress'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
