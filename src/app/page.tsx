'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/features/progress/useProgressStore';
import { LearnerGoal, LearnerPace } from '@/types/progress';
import {
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Laptop,
  Lightbulb,
  KeyRound,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SyncKeyModal } from '@/components/ui/SyncKeyModal';

export default function OnboardingLandingPage() {
  const router = useRouter();
  const { payload, isHydrated, completeOnboarding } = useProgressStore();

  const [step, setStep] = useState<'welcome' | 'goal' | 'commitment' | 'ready'>('welcome');
  const [selectedGoal, setSelectedGoal] = useState<LearnerGoal>('career-switch');
  const [hours, setHours] = useState<number>(7);
  const [showSyncModal, setShowSyncModal] = useState(false);

  const goalOptions: { id: LearnerGoal; title: string; desc: string; icon: LucideIcon }[] = [
    {
      id: 'career-switch',
      title: 'Full-Stack Career Switch',
      desc: 'Transition into professional web development with portfolio capstones & interview prep.',
      icon: Briefcase,
    },
    {
      id: 'college',
      title: 'College & Academic Learning',
      desc: 'Master practical systems, databases, and algorithms to excel in computer science coursework.',
      icon: GraduationCap,
    },
    {
      id: 'freelance',
      title: 'Freelance & Independent Client Work',
      desc: 'Build, deploy, and maintain custom client web applications and SaaS products.',
      icon: Laptop,
    },
    {
      id: 'personal-projects',
      title: 'Personal Projects & Indie Hacking',
      desc: 'Bring your creative app ideas to life from zero programming knowledge to production.',
      icon: Lightbulb,
    },
  ];

  const getPace = (h: number): LearnerPace => {
    if (h <= 4) return 'chill';
    if (h <= 10) return 'steady';
    return 'accelerated';
  };

  const handleFinishOnboarding = () => {
    const pace = getPace(hours);
    completeOnboarding(selectedGoal, hours, pace);
    router.push('/dashboard');
  };

  if (isHydrated && payload.profile.onboarded) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
            <Layers className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Welcome Back to StackPath</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Your private progress is synced. Ready to pick up right where you left off?
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors min-h-[44px]"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push('/curriculum')}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors min-h-[44px]"
            >
              Browse Curriculum Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {step === 'welcome' && (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero Knowledge to Full-Stack Production</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
              Master Full-Stack Web Engineering with Calm, Step-by-Step Rigor.
            </h1>

            <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              No assumed jargon. No rushed video tutorials. An end-to-end curriculum from web anatomy and TypeScript to React, Next.js, PostgreSQL, security, and career interview prep.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setStep('goal')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-500/20 min-h-[44px]"
              >
                <span>Get Started (30 seconds)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowSyncModal(true)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-h-[44px]"
              >
                <KeyRound className="w-4 h-4 text-indigo-500" />
                <span>Restore with Sync Key</span>
              </button>
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">Zero Accounts Required</div>
                <div className="text-xs text-slate-500 mt-1">No passwords, trackers, or marketing emails. Pure learning.</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">Zero-Knowledge Sync</div>
                <div className="text-xs text-slate-500 mt-1">Client-side Web Crypto AES-GCM encrypted progress.</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">5 Capstone Projects</div>
                <div className="text-xs text-slate-500 mt-1">Portfolio-ready projects with architecture specs.</div>
              </div>
            </div>
          </div>
        )}

        {step === 'goal' && (
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
            <div>
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Step 1 of 2
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                What is your primary goal?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                This helps us tailor your study roadmap and project suggestions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goalOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedGoal === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedGoal(opt.id)}
                    className={cn(
                      'p-4 rounded-xl border text-left transition-all min-h-[44px]',
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center',
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                        {opt.title}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleFinishOnboarding()}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 min-h-[36px]"
              >
                Skip personalization &rarr;
              </button>
              <button
                type="button"
                onClick={() => setStep('commitment')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'commitment' && (
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
            <div>
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Step 2 of 2
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                Weekly Time Commitment
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                How many hours can you comfortably dedicate to coding each week?
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {hours} hours / week
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
                  {getPace(hours)} pace
                </span>
              </div>

              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600 cursor-pointer"
                aria-label="Weekly commitment hours slider"
              />

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200">Recommended Pace Insights:</div>
                <p>
                  At <strong>{hours} hrs/week</strong> (~{Math.round((hours / 7) * 10) / 10} hrs/day), you will complete the foundational curriculum, assessments, and all 5 capstone projects in approximately{' '}
                  <strong>{Math.ceil(130 / hours)} weeks</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep('goal')}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 min-h-[36px]"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => setStep('ready')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <span>Finalize Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'ready' && (
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 dark:bg-teal-950 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Your Personal Sync Key is Ready
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              We generated your secure cryptographic recovery key. Your progress is saved locally and synced with zero-knowledge AES-GCM encryption.
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 font-mono text-xs text-indigo-600 dark:text-indigo-400 break-all select-all">
              {payload.profile.syncKey}
            </div>

            <button
              type="button"
              onClick={handleFinishOnboarding}
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-500/20 min-h-[44px]"
            >
              <span>Launch Dashboard & Start Learning</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {showSyncModal && <SyncKeyModal onClose={() => setShowSyncModal(false)} />}
    </div>
  );
}
