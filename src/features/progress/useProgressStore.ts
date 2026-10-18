import { create } from 'zustand';
import {
  LearnerProgressPayload,
  LearnerGoal,
  LearnerPace,
  LearnerPreferences,
} from '@/types/progress';
import { generateSyncKey, deriveSyncId, encryptData, decryptData, isValidSyncKey } from '@/lib/security/crypto';
import { learnerProgressPayloadSchema } from '@/lib/validation/schemas';

const LOCAL_STORAGE_KEY = 'stackpath_learner_progress_v1';

export function createDefaultProgress(): LearnerProgressPayload {
  const syncKey = generateSyncKey();
  const now = new Date().toISOString();

  return {
    version: 1,
    profile: {
      onboarded: false,
      goal: 'career-switch',
      weeklyCommitmentHours: 7,
      pace: 'steady',
      syncKey,
      createdAt: now,
      lastSyncedAt: null,
    },
    preferences: {
      theme: 'system',
      fontSize: 'base',
      readingWidth: 'standard',
      reducedMotion: false,
    },
    completedLessons: {},
    completedModules: {},
    currentLesson: null,
    notes: {},
    bookmarks: {},
    quizAttempts: {},
    projectMilestones: {},
    practiceCompleted: {},
    activityHistory: {},
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    },
  };
}

function updateStreak(streak: LearnerProgressPayload['streak'], activityHistory: Record<string, number>) {
  const today = new Date().toISOString().slice(0, 10);
  const updatedHistory = { ...activityHistory, [today]: (activityHistory[today] || 0) + 1 };

  if (streak.lastActiveDate === today) {
    return { streak, activityHistory: updatedHistory };
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let newStreak = 1;
  if (streak.lastActiveDate === yesterday) {
    newStreak = streak.currentStreak + 1;
  }

  const newLongest = Math.max(newStreak, streak.longestStreak);

  return {
    streak: {
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastActiveDate: today,
    },
    activityHistory: updatedHistory,
  };
}

interface ProgressState {
  payload: LearnerProgressPayload;
  isHydrated: boolean;
  isSyncing: boolean;
  syncError: string | null;
  conflictData: LearnerProgressPayload | null;

  // Actions
  hydrate: () => void;
  completeOnboarding: (goal: LearnerGoal, hours: number, pace: LearnerPace) => void;
  markLessonComplete: (lessonId: string, timeSpentSeconds?: number) => void;
  setCurrentLesson: (moduleSlug: string, lessonSlug: string) => void;
  saveNote: (lessonId: string, lessonTitle: string, moduleSlug: string, lessonSlug: string, content: string) => void;
  deleteNote: (lessonId: string) => void;
  toggleBookmark: (lessonId: string, lessonTitle: string, moduleSlug: string, lessonSlug: string) => void;
  recordQuizAttempt: (quizId: string, score: number, totalQuestions: number, answers: Record<string, number>, passingScore: number) => void;
  toggleProjectMilestone: (projectId: string, milestoneId: string) => void;
  saveProjectNotes: (projectId: string, notes: string, repoUrl?: string, liveUrl?: string) => void;
  togglePracticeCompleted: (challengeId: string) => void;
  updatePreferences: (prefs: Partial<LearnerPreferences>) => void;
  restoreFromSyncKey: (syncKey: string) => Promise<{ success: boolean; message: string }>;
  syncWithServer: () => Promise<{ success: boolean; conflict?: boolean; message?: string }>;
  resolveConflict: (keepRemote: boolean) => void;
  exportProgressJson: () => string;
  importProgressJson: (jsonStr: string) => { success: boolean; error?: string };
  resetAllData: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  payload: createDefaultProgress(),
  isHydrated: false,
  isSyncing: false,
  syncError: null,
  conflictData: null,

  hydrate: () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const validated = learnerProgressPayloadSchema.safeParse(parsed);
        if (validated.success) {
          set({ payload: validated.data, isHydrated: true });
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read saved progress from localStorage:', e);
    }
    const fresh = createDefaultProgress();
    set({ payload: fresh, isHydrated: true });
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fresh));
    } catch {}
  },

  completeOnboarding: (goal, hours, pace) => {
    const { payload } = get();
    const updated: LearnerProgressPayload = {
      ...payload,
      profile: {
        ...payload.profile,
        onboarded: true,
        goal,
        weeklyCommitmentHours: hours,
        pace,
      },
    };
    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    get().syncWithServer().catch(() => {});
  },

  markLessonComplete: (lessonId, timeSpentSeconds) => {
    const { payload } = get();
    const now = new Date().toISOString();
    const { streak, activityHistory } = updateStreak(payload.streak, payload.activityHistory);

    const updated: LearnerProgressPayload = {
      ...payload,
      completedLessons: {
        ...payload.completedLessons,
        [lessonId]: {
          completedAt: now,
          timeSpentSeconds: timeSpentSeconds ?? 0,
        },
      },
      streak,
      activityHistory,
    };

    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    get().syncWithServer().catch(() => {});
  },

  setCurrentLesson: (moduleSlug, lessonSlug) => {
    const { payload } = get();
    const updated: LearnerProgressPayload = {
      ...payload,
      currentLesson: {
        moduleSlug,
        lessonSlug,
        updatedAt: new Date().toISOString(),
      },
    };
    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },

  saveNote: (lessonId, lessonTitle, moduleSlug, lessonSlug, content) => {
    const { payload } = get();
    const now = new Date().toISOString();
    const updated: LearnerProgressPayload = {
      ...payload,
      notes: {
        ...payload.notes,
        [lessonId]: {
          id: lessonId,
          lessonId,
          lessonTitle,
          moduleSlug,
          lessonSlug,
          content,
          updatedAt: now,
        },
      },
    };
    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    get().syncWithServer().catch(() => {});
  },

  deleteNote: (lessonId) => {
    const { payload } = get();
    const newNotes = { ...payload.notes };
    delete newNotes[lessonId];
    const updated: LearnerProgressPayload = { ...payload, notes: newNotes };
    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    get().syncWithServer().catch(() => {});
  },

  toggleBookmark: (lessonId, lessonTitle, moduleSlug, lessonSlug) => {
    const { payload } = get();
    const newBookmarks = { ...payload.bookmarks };
    if (newBookmarks[lessonId]) {
      delete newBookmarks[lessonId];
    } else {
      newBookmarks[lessonId] = {
        id: lessonId,
        lessonId,
        lessonTitle,
        moduleSlug,
        lessonSlug,
        savedAt: new Date().toISOString(),
      };
    }
    const updated: LearnerProgressPayload = { ...payload, bookmarks: newBookmarks };
    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    get().syncWithServer().catch(() => {});
  },

  recordQuizAttempt: (quizId, score, totalQuestions, answers, passingScore) => {
    const { payload } = get();
    const now = new Date().toISOString();
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= passingScore;

    const existing = payload.quizAttempts[quizId] || {
      quizId,
      bestPercentage: 0,
      attempts: [],
    };

    const newAttempt = {
      score,
      totalQuestions,
      percentage,
      passed,
      answers,
      timestamp: now,
    };

    const { streak, activityHistory } = updateStreak(payload.streak, payload.activityHistory);

    const updated: LearnerProgressPayload = {
      ...payload,
      quizAttempts: {
        ...payload.quizAttempts,
        [quizId]: {
          quizId,
          bestPercentage: Math.max(existing.bestPercentage, percentage),
          attempts: [newAttempt, ...existing.attempts],
        },
      },
      streak,
      activityHistory,
    };

    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    get().syncWithServer().catch(() => {});
  },

  toggleProjectMilestone: (projectId, milestoneId) => {
    const { payload } = get();
    const now = new Date().toISOString();
    const existing = payload.projectMilestones[projectId] || {
      projectId,
      completedMilestoneIds: [],
      notes: '',
      updatedAt: now,
    };

    const hasMilestone = existing.completedMilestoneIds.includes(milestoneId);
    const nextMilestones = hasMilestone
      ? existing.completedMilestoneIds.filter((id) => id !== milestoneId)
      : [...existing.completedMilestoneIds, milestoneId];

    const { streak, activityHistory } = updateStreak(payload.streak, payload.activityHistory);

    const updated: LearnerProgressPayload = {
      ...payload,
      projectMilestones: {
        ...payload.projectMilestones,
        [projectId]: {
          ...existing,
          completedMilestoneIds: nextMilestones,
          updatedAt: now,
        },
      },
      streak,
      activityHistory,
    };

    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    get().syncWithServer().catch(() => {});
  },

  saveProjectNotes: (projectId, notes, repoUrl, liveUrl) => {
    const { payload } = get();
    const now = new Date().toISOString();
    const existing = payload.projectMilestones[projectId] || {
      projectId,
      completedMilestoneIds: [],
      notes: '',
      updatedAt: now,
    };

    const updated: LearnerProgressPayload = {
      ...payload,
      projectMilestones: {
        ...payload.projectMilestones,
        [projectId]: {
          ...existing,
          notes,
          repoUrl: repoUrl ?? existing.repoUrl,
          liveUrl: liveUrl ?? existing.liveUrl,
          updatedAt: now,
        },
      },
    };

    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    get().syncWithServer().catch(() => {});
  },

  togglePracticeCompleted: (challengeId) => {
    const { payload } = get();
    const now = new Date().toISOString();
    const nextCompleted = { ...payload.practiceCompleted };

    if (nextCompleted[challengeId]) {
      delete nextCompleted[challengeId];
    } else {
      nextCompleted[challengeId] = { completedAt: now };
    }

    const { streak, activityHistory } = updateStreak(payload.streak, payload.activityHistory);

    const updated: LearnerProgressPayload = {
      ...payload,
      practiceCompleted: nextCompleted,
      streak,
      activityHistory,
    };

    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    get().syncWithServer().catch(() => {});
  },

  updatePreferences: (prefs) => {
    const { payload } = get();
    const updated: LearnerProgressPayload = {
      ...payload,
      preferences: {
        ...payload.preferences,
        ...prefs,
      },
    };
    set({ payload: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  },

  syncWithServer: async () => {
    const { payload } = get();
    if (!payload.profile.syncKey) {
      return { success: false, message: 'No sync key available' };
    }

    set({ isSyncing: true, syncError: null });

    try {
      const syncId = await deriveSyncId(payload.profile.syncKey);
      const { ciphertext, iv } = await encryptData(payload, payload.profile.syncKey);
      const clientTimestamp = new Date().toISOString();

      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syncId,
          ciphertext,
          iv,
          version: payload.version,
          clientTimestamp,
        }),
      });

      const data = await response.json();

      if (data.conflict && data.remoteSnapshot) {
        // Decrypt remote snapshot to show conflict comparison
        const decryptedRemote = await decryptData<LearnerProgressPayload>(
          data.remoteSnapshot.ciphertext,
          data.remoteSnapshot.iv,
          payload.profile.syncKey
        );

        set({ isSyncing: false, conflictData: decryptedRemote });
        return { success: false, conflict: true, message: 'Sync conflict detected' };
      }

      if (!response.ok) {
        throw new Error(data.error || 'Sync request failed');
      }

      const updatedPayload: LearnerProgressPayload = {
        ...payload,
        profile: {
          ...payload.profile,
          lastSyncedAt: new Date().toISOString(),
        },
      };

      set({ payload: updatedPayload, isSyncing: false });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPayload));
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sync failed';
      console.warn('Background sync failed:', message);
      set({ isSyncing: false, syncError: message });
      return { success: false, message };
    }
  },

  restoreFromSyncKey: async (rawKey: string) => {
    const cleanKey = rawKey.trim();
    if (!isValidSyncKey(cleanKey)) {
      return { success: false, message: 'Invalid key format. Expected format: sp-xxxx-xxxx-xxxx-xxxx' };
    }

    set({ isSyncing: true, syncError: null });

    try {
      const syncId = await deriveSyncId(cleanKey);
      const res = await fetch(`/api/sync?syncId=${syncId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch cloud backup');
      }

      if (!data.found || !data.snapshot) {
        return { success: false, message: 'No progress found in cloud for this key.' };
      }

      const decrypted = await decryptData<LearnerProgressPayload>(
        data.snapshot.ciphertext,
        data.snapshot.iv,
        cleanKey
      );

      const parsed = learnerProgressPayloadSchema.safeParse(decrypted);
      if (!parsed.success) {
        return { success: false, message: 'Decrypted data failed schema validation.' };
      }

      const restoredPayload = {
        ...parsed.data,
        profile: {
          ...parsed.data.profile,
          syncKey: cleanKey,
          lastSyncedAt: new Date().toISOString(),
        },
      };

      set({ payload: restoredPayload, isSyncing: false });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(restoredPayload));

      return { success: true, message: 'Progress successfully restored from cloud!' };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not decrypt progress with this key.';
      set({ isSyncing: false, syncError: message });
      return { success: false, message };
    }
  },

  resolveConflict: (keepRemote: boolean) => {
    const { payload, conflictData } = get();
    if (keepRemote && conflictData) {
      set({ payload: conflictData, conflictData: null });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(conflictData));
    } else {
      // Force keep local: update timestamp to now so server accepts
      const forced: LearnerProgressPayload = {
        ...payload,
        profile: {
          ...payload.profile,
          lastSyncedAt: new Date().toISOString(),
        },
      };
      set({ payload: forced, conflictData: null });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forced));
      get().syncWithServer().catch(() => {});
    }
  },

  exportProgressJson: () => {
    const { payload } = get();
    return JSON.stringify(payload, null, 2);
  },

  importProgressJson: (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const result = learnerProgressPayloadSchema.safeParse(parsed);
      if (!result.success) {
        return { success: false, error: 'JSON does not match the valid StackPath progress format.' };
      }

      set({ payload: result.data });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result.data));
      get().syncWithServer().catch(() => {});
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, error: 'Invalid JSON file: ' + message };
    }
  },

  resetAllData: () => {
    const fresh = createDefaultProgress();
    set({ payload: fresh, conflictData: null });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fresh));
  },
}));
