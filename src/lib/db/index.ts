import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { ProgressSnapshotRow, NewProgressSnapshotRow } from './schema';

// In-memory fallback map for environments without DATABASE_URL (e.g. offline dev, test suites)
const inMemoryStore = new Map<string, ProgressSnapshotRow>();

function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return null;
  }
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

export async function getSnapshot(syncId: string): Promise<ProgressSnapshotRow | null> {
  const db = getDb();
  if (!db) {
    return inMemoryStore.get(syncId) || null;
  }

  try {
    const results = await db
      .select()
      .from(schema.progressSnapshots)
      .where(eq(schema.progressSnapshots.syncId, syncId))
      .limit(1);

    return results[0] || null;
  } catch (error) {
    console.warn('Database query failed, falling back to memory store:', error);
    return inMemoryStore.get(syncId) || null;
  }
}

export async function saveSnapshot(data: NewProgressSnapshotRow): Promise<ProgressSnapshotRow> {
  const db = getDb();
  const now = new Date();
  const record: ProgressSnapshotRow = {
    ...data,
    version: data.version ?? 1,
    updatedAt: now,
  };

  // Always update in-memory cache as well
  inMemoryStore.set(data.syncId, record);

  if (!db) {
    return record;
  }

  try {
    await db
      .insert(schema.progressSnapshots)
      .values({
        syncId: data.syncId,
        ciphertext: data.ciphertext,
        iv: data.iv,
        version: data.version ?? 1,
        clientTimestamp: data.clientTimestamp,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: schema.progressSnapshots.syncId,
        set: {
          ciphertext: data.ciphertext,
          iv: data.iv,
          version: data.version ?? 1,
          clientTimestamp: data.clientTimestamp,
          updatedAt: now,
        },
      });

    return record;
  } catch (error) {
    console.warn('Database save failed, cached in memory:', error);
    return record;
  }
}
