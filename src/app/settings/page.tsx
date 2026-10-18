'use client';

import React, { useState } from 'react';
import { useProgressStore } from '@/features/progress/useProgressStore';
import {
  Settings,
  Sun,
  Moon,
  Laptop,
  KeyRound,
  Download,
  Upload,
  ShieldCheck,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SyncKeyModal } from '@/components/ui/SyncKeyModal';

export default function SettingsPage() {
  const {
    payload,
    updatePreferences,
    exportProgressJson,
    importProgressJson,
    resetAllData,
  } = useProgressStore();

  const [showSyncModal, setShowSyncModal] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleExport = () => {
    const data = exportProgressJson();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stackpath-progress-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importProgressJson(content);
      if (res.success) {
        setImportStatus('✅ Progress successfully restored from JSON file!');
      } else {
        setImportStatus(`❌ Import failed: ${res.error}`);
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(payload.profile.syncKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } catch {}
  };

  const handleConfirmReset = () => {
    resetAllData();
    setShowConfirmReset(false);
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Settings className="w-3.5 h-3.5 text-indigo-500" />
          <span>Learner Studio Preferences</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Settings & Private Data
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Customize your reading experience, back up or restore your Personal Sync Key, and control your local storage.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance & Reading Experience */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Reading & Appearance
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Theme Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Color Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                  { id: 'system', label: 'System', icon: Laptop },
                ].map((th) => {
                  const Icon = th.icon;
                  const isSelected = payload.preferences.theme === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => updatePreferences({ theme: th.id as 'light' | 'dark' | 'system' })}
                      className={cn(
                        'flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all min-h-[44px]',
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-600/30'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{th.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Reading Font Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sm', label: 'Compact' },
                  { id: 'base', label: 'Standard' },
                  { id: 'lg', label: 'Comfort' },
                ].map((sz) => {
                  const isSelected = payload.preferences.fontSize === sz.id;
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => updatePreferences({ fontSize: sz.id as 'sm' | 'base' | 'lg' | 'xl' })}
                      className={cn(
                        'py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all min-h-[44px]',
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-600/30'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      )}
                    >
                      {sz.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    Reduced Motion Preference
                  </div>
                  <div className="text-xs text-slate-500">
                    Minimizes animations, transitions, and celebration effects
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={payload.preferences.reducedMotion}
                  onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
                  className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                  aria-label="Toggle reduced motion preference"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Personal Sync Key & Cloud Backup */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-indigo-500" />
                <span>Personal Sync Key (Cross-Device)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Zero-knowledge cryptographic key used to restore your progress on another phone or laptop.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs text-indigo-600 dark:text-indigo-400 break-all select-all">
              {payload.profile.syncKey}
            </div>
            <button
              type="button"
              onClick={handleCopyKey}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0 min-h-[44px]"
            >
              {copiedKey ? <Check className="w-4 h-4" /> : <KeyRound className="w-4 h-4" />}
              <span>{copiedKey ? 'Key Copied!' : 'Copy Key'}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowSyncModal(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors shrink-0 min-h-[44px]"
            >
              Sync Details & Restore
            </button>
          </div>
        </div>

        {/* Data Portability: Export & Import JSON */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Data Portability & Offline Backup
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            You own 100% of your data. You can download an unencrypted local JSON file containing all your completed lessons, quiz scores, project milestones, and private notes.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-xs font-bold flex items-center gap-2 transition-colors min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              <span>Export Progress (JSON)</span>
            </button>

            <label className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors min-h-[44px]">
              <Upload className="w-4 h-4" />
              <span>Import Progress (JSON)</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>

          {importStatus && (
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 pt-1">
              {importStatus}
            </p>
          )}
        </div>

        {/* Privacy Policy Explained in Plain English */}
        <div className="p-6 sm:p-8 rounded-3xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/30 dark:bg-teal-950/10 space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-teal-800 dark:text-teal-300">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>Our Plain-English Privacy Commitment</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            StackPath does not use advertising trackers, sell user profiles, or require corporate identity logins. Your learning progress is encrypted on your computer with the <strong>Web Crypto API</strong> before reaching our serverless storage. Even with direct database access, no administrator can read your personal notes, scores, or code.
          </p>
        </div>

        {/* Danger Zone: Clear Local Cache */}
        <div className="p-6 sm:p-8 rounded-3xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/20 dark:bg-rose-950/10 space-y-4">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Danger Zone: Clear Local Data</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Wipes all local progress, quiz scores, and preferences from this browser. If you have not backed up your Personal Sync Key or exported your JSON file, this action cannot be undone.
          </p>

          {!showConfirmReset ? (
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors min-h-[40px]"
            >
              Reset Local Storage
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-400 dark:border-rose-800 space-y-3 animate-in fade-in">
              <p className="text-xs font-bold text-rose-600">
                Are you absolutely certain? This will wipe your local progress.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors min-h-[36px]"
                >
                  Yes, Wipe Everything
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[36px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSyncModal && <SyncKeyModal onClose={() => setShowSyncModal(false)} />}
    </div>
  );
}
