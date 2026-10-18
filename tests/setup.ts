import { webcrypto } from 'crypto';

// Polyfill WebCrypto for Node environment if missing
if (!globalThis.crypto) {
  // @ts-expect-error - Polyfill crypto on globalThis for Node test environment
  globalThis.crypto = webcrypto;
} else if (!globalThis.crypto.subtle) {
  // @ts-expect-error - Polyfill subtle on globalThis.crypto for Node test environment
  globalThis.crypto.subtle = webcrypto.subtle;
}
