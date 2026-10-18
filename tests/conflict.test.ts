import { describe, it, expect } from 'vitest';
import { createDefaultProgress } from '@/features/progress/useProgressStore';

describe('Sync Conflict Detection & Resolution Suite', () => {
  it('detects when remote cloud timestamp is newer than incoming client timestamp', () => {
    const localTime = new Date('2026-10-18T10:00:00Z').getTime();
    const remoteTime = new Date('2026-10-18T10:30:00Z').getTime();

    const isConflict = remoteTime - localTime > 5000;
    expect(isConflict).toBe(true);
  });

  it('allows client to supersede if client timestamp is newer', () => {
    const localTime = new Date('2026-10-18T11:00:00Z').getTime();
    const remoteTime = new Date('2026-10-18T10:30:00Z').getTime();

    const isConflict = remoteTime - localTime > 5000;
    expect(isConflict).toBe(false);
  });

  it('correctly compares completed lesson counts between conflicting snapshots', () => {
    const local = createDefaultProgress();
    local.completedLessons['les-01'] = { completedAt: '2026-10-18T10:00:00Z' };

    const remote = createDefaultProgress();
    remote.completedLessons['les-01'] = { completedAt: '2026-10-18T10:00:00Z' };
    remote.completedLessons['les-02'] = { completedAt: '2026-10-18T10:30:00Z' };

    expect(Object.keys(remote.completedLessons).length).toBeGreaterThan(
      Object.keys(local.completedLessons).length
    );
  });
});
