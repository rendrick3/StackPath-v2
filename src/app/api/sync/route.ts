import { NextRequest, NextResponse } from 'next/server';
import { syncPayloadSchema } from '@/lib/validation/schemas';
import { getSnapshot, saveSnapshot } from '@/lib/db';

// Rate limiting in-memory map (IP/SyncId based)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, limit = 60, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const syncId = searchParams.get('syncId');

    if (!syncId || typeof syncId !== 'string' || syncId.length !== 64 || !/^[a-f0-9]{64}$/.test(syncId)) {
      return NextResponse.json(
        { error: 'Invalid or missing syncId parameter. Must be 64-char hex string.' },
        { status: 400 }
      );
    }

    // Rate limiting
    if (!checkRateLimit(`get-${syncId}`)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429 }
      );
    }

    const snapshot = await getSnapshot(syncId);

    if (!snapshot) {
      return NextResponse.json({
        found: false,
        message: 'No remote progress found for this key.',
      });
    }

    return NextResponse.json({
      found: true,
      snapshot: {
        syncId: snapshot.syncId,
        ciphertext: snapshot.ciphertext,
        iv: snapshot.iv,
        version: snapshot.version,
        clientTimestamp: snapshot.clientTimestamp,
        updatedAt: snapshot.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Sync GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error while retrieving sync snapshot' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check Content-Length to prevent huge payloads
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 1_048_576) {
      return NextResponse.json(
        { error: 'Payload too large. Maximum size is 1MB.' },
        { status: 413 }
      );
    }

    const body = await request.json();
    const parseResult = syncPayloadSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid sync payload', details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const payload = parseResult.data;

    // Rate limit per syncId
    if (!checkRateLimit(`post-${payload.syncId}`, 30, 60_000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before syncing again.' },
        { status: 429 }
      );
    }

    // Check existing snapshot for conflicts
    const existing = await getSnapshot(payload.syncId);

    // If existing exists and is newer than client payload by more than 5 seconds
    if (existing) {
      const existingTime = new Date(existing.clientTimestamp).getTime();
      const incomingTime = new Date(payload.clientTimestamp).getTime();

      // If incoming is strictly older by > 5 seconds, flag a conflict
      if (existingTime - incomingTime > 5000) {
        return NextResponse.json({
          success: false,
          conflict: true,
          message: 'Server has a newer version of progress from another device.',
          remoteSnapshot: {
            ciphertext: existing.ciphertext,
            iv: existing.iv,
            version: existing.version,
            clientTimestamp: existing.clientTimestamp,
            updatedAt: existing.updatedAt.toISOString(),
          },
        });
      }
    }

    // Save snapshot
    const saved = await saveSnapshot({
      syncId: payload.syncId,
      ciphertext: payload.ciphertext,
      iv: payload.iv,
      version: payload.version,
      clientTimestamp: payload.clientTimestamp,
    });

    return NextResponse.json({
      success: true,
      conflict: false,
      updatedAt: saved.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('Sync POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error while saving sync snapshot' },
      { status: 500 }
    );
  }
}
