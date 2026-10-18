/**
 * Web Crypto AES-GCM + PBKDF2 zero-knowledge client-side encryption.
 * The server never sees the raw Sync Key or unencrypted progress data.
 */

const SALT_STRING = 'StackPath-ZeroKnowledge-V1-Salt-2026';

function getCryptoSubtle(): SubtleCrypto {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
    return globalThis.crypto.subtle;
  }
  throw new Error('WebCrypto subtle is not available in this environment');
}

function getRandomValues(array: Uint8Array): Uint8Array {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    return globalThis.crypto.getRandomValues(array);
  }
  throw new Error('WebCrypto getRandomValues is not available');
}

// Helper: Convert ArrayBuffer to Hex string
export function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper: Convert ArrayBuffer to Base64
export function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper: Convert Base64 to Uint8Array
export function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Generate a cryptographically secure, readable personal sync key.
 * Format: sp-xxxx-xxxx-xxxx-xxxx (32 hex characters)
 */
export function generateSyncKey(): string {
  const bytes = new Uint8Array(16);
  getRandomValues(bytes);

  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return `sp-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 24)}-${hex.slice(24, 28)}-${hex.slice(28, 32)}`;
}

/**
 * Validate sync key format: sp-[4 hex]-[4 hex]...
 */
export function isValidSyncKey(key: string): boolean {
  if (!key || typeof key !== 'string') return false;
  const clean = key.trim().toLowerCase();
  const pattern = /^sp(-[a-f0-9]{4}){8}$/;
  return pattern.test(clean);
}

/**
 * Normalizes a sync key by trimming and lowercasing.
 */
export function normalizeSyncKey(key: string): string {
  return key.trim().toLowerCase();
}

/**
 * Derives an opaque Sync ID from the sync key using SHA-256.
 * The server only receives this non-guessable hash to index records.
 */
export async function deriveSyncId(syncKey: string): Promise<string> {
  const normalized = normalizeSyncKey(syncKey);
  const enc = new TextEncoder();
  const data = enc.encode(normalized);
  const subtle = getCryptoSubtle();

  const hashBuffer = await subtle.digest('SHA-256', data as unknown as BufferSource);
  return bufferToHex(hashBuffer);
}

/**
 * Derives an AES-GCM 256-bit CryptoKey from the sync key using PBKDF2 (100,000 iterations).
 */
async function deriveAesKey(syncKey: string): Promise<CryptoKey> {
  const normalized = normalizeSyncKey(syncKey);
  const enc = new TextEncoder();
  const keyMaterialBytes = enc.encode(normalized);
  const saltBytes = enc.encode(SALT_STRING);
  const subtle = getCryptoSubtle();

  const baseKey = await subtle.importKey(
    'raw',
    keyMaterialBytes as unknown as BufferSource,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBytes as unknown as BufferSource,
      iterations: 100_000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts an arbitrary object into Base64 ciphertext and IV using AES-GCM.
 */
export async function encryptData<T>(data: T, syncKey: string): Promise<{ ciphertext: string; iv: string }> {
  const key = await deriveAesKey(syncKey);
  const enc = new TextEncoder();
  const plaintext = enc.encode(JSON.stringify(data));
  const subtle = getCryptoSubtle();

  const iv = new Uint8Array(12);
  getRandomValues(iv);

  const ciphertextBuffer = await subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv as unknown as BufferSource,
    },
    key,
    plaintext as unknown as BufferSource
  );

  return {
    ciphertext: bufferToBase64(ciphertextBuffer),
    iv: bufferToBase64(iv.buffer),
  };
}

/**
 * Decrypts Base64 ciphertext and IV using AES-GCM back into the original object.
 */
export async function decryptData<T>(ciphertextBase64: string, ivBase64: string, syncKey: string): Promise<T> {
  const key = await deriveAesKey(syncKey);
  const ciphertextBytes = base64ToBuffer(ciphertextBase64);
  const ivBytes = base64ToBuffer(ivBase64);
  const subtle = getCryptoSubtle();

  try {
    const decryptedBuffer = await subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: ivBytes as unknown as BufferSource,
      },
      key,
      ciphertextBytes as unknown as BufferSource
    );

    const dec = new TextDecoder();
    const jsonStr = dec.decode(decryptedBuffer);
    return JSON.parse(jsonStr) as T;
  } catch {
    throw new Error('Failed to decrypt data. Check that the Sync Key is correct.');
  }
}
