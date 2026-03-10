import fs from 'fs/promises';
import path from 'path';

/**
 * Strip prototype-polluting keys (__proto__, constructor, prototype)
 * from a parsed JSON object recursively.
 */
export function stripDangerousKeys(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(stripDangerousKeys);
  const safe: Record<string, unknown> = Object.create(null);
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
    safe[k] = stripDangerousKeys(v);
  }
  return safe;
}

const RATE_LIMIT_FILE = path.join(process.cwd(), 'data', 'rate-limits.json');
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

const LOGIN_RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const LOGIN_MAX_ATTEMPTS = 5;

interface RateLimitEntry {
  ip: string;
  lastRequest: number;
  attempts: number;
}

interface RateLimitData {
  entries: RateLimitEntry[];
  lastCleanup: number;
}

/**
 * Read rate limit data from file
 * Fail-open: if file doesn't exist or is corrupted, return empty data
 */
async function readRateLimitData(): Promise<RateLimitData> {
  try {
    const fileContent = await fs.readFile(RATE_LIMIT_FILE, 'utf-8');
    const data = JSON.parse(fileContent);
    return {
      entries: Array.isArray(data.entries) ? data.entries : [],
      lastCleanup: typeof data.lastCleanup === 'number' ? data.lastCleanup : 0,
    };
  } catch (error) {
    // File doesn't exist or is corrupted - return empty data
    console.warn('Rate limit file not found or corrupted, creating new one:', error);
    return {
      entries: [],
      lastCleanup: Date.now(),
    };
  }
}

/**
 * Write rate limit data to file
 * Fail-open: if write fails, just log error (don't block the request)
 */
async function writeRateLimitData(data: RateLimitData): Promise<void> {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(RATE_LIMIT_FILE);
    await fs.mkdir(dataDir, { recursive: true });

    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    // Log error but don't throw - fail-open strategy
    console.error('Failed to write rate limit data:', error);
  }
}

/**
 * Remove entries older than 1 hour to keep file size manageable
 */
function cleanupOldEntries(data: RateLimitData): RateLimitData {
  const now = Date.now();
  const oneHourAgo = now - CLEANUP_INTERVAL;

  return {
    entries: data.entries.filter(entry => entry.lastRequest > oneHourAgo),
    lastCleanup: now,
  };
}

/**
 * Check login brute-force: max 5 attempts per 15 minutes per IP.
 * Uses a "login:" prefix so it doesn't conflict with the apply rate limit.
 * Fail-closed: if anything goes wrong, deny the request.
 */
export async function checkLoginRateLimit(
  ip: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const key = `login:${ip}`;
  try {
    let data = await readRateLimitData();
    const now = Date.now();

    if (now - data.lastCleanup > CLEANUP_INTERVAL) {
      data = cleanupOldEntries(data);
    }

    const existing = data.entries.find(e => e.ip === key);

    if (existing) {
      const windowStart = now - LOGIN_RATE_LIMIT_WINDOW;

      if (existing.lastRequest <= windowStart) {
        // Window expired — reset counter
        existing.attempts = 1;
        existing.lastRequest = now;
      } else if (existing.attempts >= LOGIN_MAX_ATTEMPTS) {
        // Still inside window and max attempts reached — block
        const retryAfter = Math.ceil((existing.lastRequest + LOGIN_RATE_LIMIT_WINDOW - now) / 1000);
        return { allowed: false, retryAfter };
      } else {
        // Still inside window but under limit — count attempt
        existing.attempts += 1;
        existing.lastRequest = now;
      }
    } else {
      data.entries.push({ ip: key, lastRequest: now, attempts: 1 });
    }

    await writeRateLimitData(data);
    return { allowed: true };
  } catch (error) {
    console.error('Login rate limit check failed, denying request:', error);
    return { allowed: false, retryAfter: 60 };
  }
}

/**
 * Check if an IP address has exceeded the rate limit
 * Returns { allowed: boolean, retryAfter?: number }
 *
 * Fail-open strategy: if any error occurs, allow the request
 */
export async function checkRateLimit(
  ip: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  try {
    // Read current rate limit data
    let data = await readRateLimitData();

    const now = Date.now();

    // Perform cleanup if needed (every hour)
    if (now - data.lastCleanup > CLEANUP_INTERVAL) {
      data = cleanupOldEntries(data);
    }

    // Find existing entry for this IP
    const existingEntry = data.entries.find(entry => entry.ip === ip);

    if (existingEntry) {
      const timeSinceLastRequest = now - existingEntry.lastRequest;

      // If within rate limit window, deny request
      if (timeSinceLastRequest < RATE_LIMIT_WINDOW) {
        const retryAfter = Math.ceil((RATE_LIMIT_WINDOW - timeSinceLastRequest) / 1000);
        return {
          allowed: false,
          retryAfter,
        };
      }

      // Rate limit window has passed, update entry
      existingEntry.lastRequest = now;
      existingEntry.attempts += 1;
    } else {
      // New IP, create entry
      data.entries.push({
        ip,
        lastRequest: now,
        attempts: 1,
      });
    }

    // Save updated data
    await writeRateLimitData(data);

    return { allowed: true };
  } catch (error) {
    // Fail-closed: if anything goes wrong, deny the request
    console.error('Rate limit check failed, denying request:', error);
    return { allowed: false, retryAfter: 60 };
  }
}
