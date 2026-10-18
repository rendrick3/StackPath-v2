'use client';

import React, { useState } from 'react';
import { useProgressStore } from '@/features/progress/useProgressStore';
import { capstoneProjects } from '@/content/projects';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ExternalLink,
  GitBranch,
  Layers,
  Check,
  AlertCircle,
  FileCode,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ProjectsHubPage() {
  const { payload, toggleProjectMilestone, saveProjectNotes } = useProgressStore();
  const [activeProjectId, setActiveProjectId] = useState<string>(capstoneProjects[0].id);

  const activeProject = capstoneProjects.find((p) => p.id === activeProjectId) || capstoneProjects[0];
  const projectProgress = payload.projectMilestones[activeProject.id] || {
    projectId: activeProject.id,
    completedMilestoneIds: [],
    notes: '',
    repoUrl: '',
    liveUrl: '',
    updatedAt: '',
  };

  const [notes, setNotes] = useState(projectProgress.notes || '');
  const [repoUrl, setRepoUrl] = useState(projectProgress.repoUrl || '');
  const [liveUrl, setLiveUrl] = useState(projectProgress.liveUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state when active project changes
  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    const prog = payload.projectMilestones[id];
    setNotes(prog?.notes || '');
    setRepoUrl(prog?.repoUrl || '');
    setLiveUrl(prog?.liveUrl || '');
    setSavedSuccess(false);
  };

  const handleToggleMilestone = (milestoneId: string) => {
    const isNowDone = !projectProgress.completedMilestoneIds.includes(milestoneId);
    if (isNowDone) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
    toggleProjectMilestone(activeProject.id, milestoneId);
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    saveProjectNotes(activeProject.id, notes, repoUrl, liveUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const completedMilestonesCount = projectProgress.completedMilestoneIds.length;
  const isProjectComplete = completedMilestonesCount === activeProject.milestones.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <FolderGit2 className="w-3.5 h-3.5 text-indigo-500" />
          <span>5 Escalating Full-Stack Capstones</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Portfolio Capstones Studio
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Real engineering projects designed to impress technical hiring managers. Each capstone features complete acceptance criteria, suggested folder structures, architecture descriptions, pitfalls to avoid, and private note tracking.
        </p>
      </div>

      {/* Project Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {capstoneProjects.map((p) => {
          const prog = payload.projectMilestones[p.id];
          const count = prog?.completedMilestoneIds.length || 0;
          const isDone = count === p.milestones.length && p.milestones.length > 0;
          const isSelected = activeProject.id === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectProject(p.id)}
              className={cn(
                'p-4 rounded-2xl border text-left transition-all min-h-[44px]',
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              )}
            >
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  #{p.number}
                </span>
                {isDone ? (
                  <span className="text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Done
                  </span>
                ) : (
                  <span className="text-slate-400">
                    {count}/{p.milestones.length}
                  </span>
                )}
              </div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                {p.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Project Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Project Brief & Architecture */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold">
                  {activeProject.badge}
                </span>
                {isProjectComplete && (
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold">
                    ✓ All Milestones Completed
                  </span>
                )}
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{activeProject.estimatedHours} hours</span>
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {activeProject.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {activeProject.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Core Feature List */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Features to Implement:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {activeProject.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Overview */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>System Architecture Description:</span>
              </div>
              <p className="font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeProject.architectureDescription}
              </p>
            </div>

            {/* Suggested Folder Structure */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-4 h-4" />
                <span>Suggested File & Folder Tree:</span>
              </h3>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                <code>{activeProject.suggestedFolderStructure}</code>
              </pre>
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Implementation Milestones ({completedMilestonesCount}/{activeProject.milestones.length})</span>
              </h3>

              <div className="space-y-3">
                {activeProject.milestones.map((ms) => {
                  const isMsDone = projectProgress.completedMilestoneIds.includes(ms.id);
                  return (
                    <div
                      key={ms.id}
                      onClick={() => handleToggleMilestone(ms.id)}
                      className={cn(
                        'p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5',
                        isMsDone
                          ? 'border-teal-500/40 bg-teal-50/20 dark:bg-teal-950/20 text-slate-900 dark:text-slate-100'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      )}
                    >
                      <div
                        className={cn(
                          'w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                          isMsDone
                            ? 'bg-teal-500 text-white'
                            : 'border-2 border-slate-300 dark:border-slate-600'
                        )}
                      >
                        {isMsDone && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-1">
                        <div className={cn('text-sm font-bold', isMsDone && 'line-through text-slate-400')}>
                          {ms.title}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {ms.description}
                        </p>
                        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold pt-1">
                          Deliverable: {ms.deliverable}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pitfalls & Definition of Done */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Definition of Done */}
              <div className="p-4 rounded-2xl border border-teal-200 dark:border-teal-900/50 bg-teal-50/20 dark:bg-teal-950/10 space-y-2">
                <div className="font-bold text-xs text-teal-800 dark:text-teal-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span>Definition of Done</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeProject.definitionOfDone.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-teal-500 font-bold">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Pitfalls */}
              <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-950/10 space-y-2">
                <div className="font-bold text-xs text-amber-800 dark:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Common Pitfalls</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeProject.commonPitfalls.map((pit, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">⚠</span>
                      <span>{pit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Private Project Notes & Deployed Links */}
        <div className="space-y-6">
          <form
            onSubmit={handleSaveNotes}
            className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-500" />
                <span>Project Workspace</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Encrypted</span>
            </div>

            {/* GitHub Repo URL */}
            <div>
              <label htmlFor="repo-input" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub Repository URL</span>
              </label>
              <input
                id="repo-input"
                type="url"
                placeholder="https://github.com/username/project"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Live Deployed URL */}
            <div>
              <label htmlFor="live-input" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live HTTPS Demo URL</span>
              </label>
              <input
                id="live-input"
                type="url"
                placeholder="https://my-app.vercel.app"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Private Notes & Architecture Reflections */}
            <div>
              <label htmlFor="notes-input" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Private Engineering Notes & Reflection
              </label>
              <textarea
                id="notes-input"
                rows={8}
                placeholder="Record tradeoffs, bugs solved, or ideas for stretch goals..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess ? (
                <span className="text-xs text-teal-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Saved & Synced!
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">Auto-saved to device</span>
              )}

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors min-h-[36px]"
              >
                Save Project Data
              </button>
            </div>
          </form>

          {/* Quick Links */}
          {liveUrl && (
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs flex items-center justify-between">
              <span className="font-semibold text-indigo-900 dark:text-indigo-200">Open Live Demo</span>
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Launch Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
