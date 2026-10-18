import { pgTable, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const progressSnapshots = pgTable('progress_snapshots', {
  syncId: varchar('sync_id', { length: 64 }).primaryKey(),
  ciphertext: text('ciphertext').notNull(),
  iv: varchar('iv', { length: 64 }).notNull(),
  version: integer('version').default(1).notNull(),
  clientTimestamp: varchar('client_timestamp', { length: 64 }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type ProgressSnapshotRow = typeof progressSnapshots.$inferSelect;
export type NewProgressSnapshotRow = typeof progressSnapshots.$inferInsert;
