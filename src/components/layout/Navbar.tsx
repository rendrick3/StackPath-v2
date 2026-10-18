'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgressStore } from '@/features/progress/useProgressStore';
import {
  Layers,
  BookOpen,
  Code2,
  FolderGit2,
  CheckCircle2,
  MessageSquareCode,
  BookMarked,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  Flame,
  Cloud,
  CloudOff,
  RefreshCw,
  KeyRound,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConflictModal } from '@/components/ui/ConflictModal';
import { SyncKeyModal } from '@/components/ui/SyncKeyModal';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const { payload, isHydrated, hydrate, isSyncing, syncError, conflictData, updatePreferences, syncWithServer } = useProgressStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (!isHydrated) return;
    const isDark =
      payload.preferences.theme === 'dark' ||
      (payload.preferences.theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [payload.preferences.theme, isHydrated]);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Layers },
    { href: '/curriculum', label: 'Curriculum', icon: BookOpen },
    { href: '/practice', label: 'Practice Lab', icon: Code2 },
    { href: '/projects', label: 'Projects', icon: FolderGit2 },
    { href: '/assessments', label: 'Assessments', icon: CheckCircle2 },
    { href: '/interview-prep', label: 'Interview Prep', icon: MessageSquareCode },
    { href: '/glossary', label: 'Glossary', icon: BookMarked },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const toggleTheme = () => {
    const nextTheme = payload.preferences.theme === 'dark' ? 'light' : 'dark';
    updatePreferences({ theme: nextTheme });
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-lg font-medium"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-950/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 dark:text-slate-50 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1.5">
                StackPath
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold">
                  Academy
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main desktop navigation">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors min-h-[36px]',
                      isActive
                        ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Learning Streak */}
            {isHydrated && payload.streak.currentStreak > 0 && (
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 text-xs font-semibold"
                title={`${payload.streak.currentStreak} day learning streak!`}
              >
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{payload.streak.currentStreak}d</span>
              </div>
            )}

            {/* Cloud Sync Status */}
            <button
              type="button"
              onClick={() => syncWithServer()}
              title={
                isSyncing
                  ? 'Syncing progress...'
                  : syncError
                  ? `Sync error: ${syncError}. Click to retry.`
                  : 'Cloud Synced (Zero-Knowledge encrypted). Click to sync now.'
              }
              aria-label="Synchronize progress with cloud backup"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              {isSyncing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
              ) : syncError ? (
                <CloudOff className="w-4 h-4 text-amber-500" />
              ) : (
                <Cloud className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              )}
            </button>

            {/* Sync Key Quick Access */}
            <button
              type="button"
              onClick={() => setShowSyncModal(true)}
              title="Personal Sync Key"
              aria-label="View and backup personal sync key"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors min-h-[36px]"
            >
              <KeyRound className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sync Key</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              {isHydrated && payload.preferences.theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors min-h-[44px]',
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  )}
                >
                  <Icon className="w-5 h-5 text-indigo-500" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setShowSyncModal(true);
                }}
                className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold py-2"
              >
                <KeyRound className="w-4 h-4" />
                Backup My Sync Key
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Sync Key Modal */}
      {showSyncModal && <SyncKeyModal onClose={() => setShowSyncModal(false)} />}

      {/* Conflict Resolution Modal */}
      {conflictData && <ConflictModal />}
    </>
  );
}
