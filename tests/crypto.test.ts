import { describe, it, expect } from 'vitest';
import {
  generateSyncKey,
  isValidSyncKey,
  normalizeSyncKey,
  deriveSyncId,
  encryptData,
  decryptData,
} from '@/lib/security/crypto';

describe('Web Crypto AES-GCM & Sync Key Suite', () => {
  it('generates a cryptographically random, formatted personal sync key', () => {
    const key = generateSyncKey();
    expect(key).toMatch(/^sp(-[a-f0-9]{4}){8}$/);
    expect(isValidSyncKey(key)).toBe(true);
  });

  it('validates correct sync keys and rejects invalid ones', () => {
    expect(isValidSyncKey('sp-a1b2-c3d4-e5f6-7890-1234-5678-9abc-def0')).toBe(true);
    expect(isValidSyncKey('invalid-key')).toBe(false);
    expect(isValidSyncKey('sp-short-key')).toBe(false);
    expect(isValidSyncKey('')).toBe(false);
    // @ts-expect-error - testing invalid runtime null argument
    expect(isValidSyncKey(null)).toBe(false);
  });

  it('normalizes sync keys by trimming and lowercasing', () => {
    const key = '  SP-A1B2-C3D4-E5F6-7890-1234-5678-9ABC-DEF0  ';
    expect(normalizeSyncKey(key)).toBe('sp-a1b2-c3d4-e5f6-7890-1234-5678-9abc-def0');
  });

  it('derives a deterministic 64-character SHA-256 sync ID from the key', async () => {
    const key = 'sp-a1b2-c3d4-e5f6-7890-1234-5678-9abc-def0';
    const id1 = await deriveSyncId(key);
    const id2 = await deriveSyncId(key);

    expect(id1).toHaveLength(64);
    expect(id1).toBe(id2);
    expect(/^[a-f0-9]{64}$/.test(id1)).toBe(true);
  });

  it('encrypts and decrypts learner data accurately with AES-GCM', async () => {
    const key = generateSyncKey();
    const testData = {
      completedLessons: {
        'les-01': { completedAt: '2026-10-18T10:00:00Z' },
      },
      notes: {
        'les-01': { content: 'Secret learner note that server must never read.' },
      },
      score: 95,
    };

    const { ciphertext, iv } = await encryptData(testData, key);

    expect(typeof ciphertext).toBe('string');
    expect(ciphertext.length).toBeGreaterThan(20);
    expect(typeof iv).toBe('string');
    expect(iv.length).toBeGreaterThan(10);

    // Decrypt with correct key
    const decrypted = await decryptData<typeof testData>(ciphertext, iv, key);
    expect(decrypted).toEqual(testData);
  });

  it('fails to decrypt if the wrong sync key is provided', async () => {
    const key1 = generateSyncKey();
    const key2 = generateSyncKey();

    const { ciphertext, iv } = await encryptData({ message: 'Hello' }, key1);

    await expect(decryptData(ciphertext, iv, key2)).rejects.toThrow();
  });
});
