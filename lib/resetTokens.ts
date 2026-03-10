import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const FILE = path.join(process.cwd(), 'data', 'reset-tokens.json');
const TTL_MS = 60 * 60 * 1000; // 1 hour

interface ResetToken {
  token: string;
  email: string;
  expiresAt: string;
}

async function getTokens(): Promise<ResetToken[]> {
  try {
    const data = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveTokens(tokens: ResetToken[]) {
  await fs.writeFile(FILE, JSON.stringify(tokens, null, 2));
}

export async function createResetToken(email: string): Promise<string> {
  const tokens = await getTokens();
  // Remove existing tokens for this email
  const filtered = tokens.filter(t => t.email.toLowerCase() !== email.toLowerCase());
  const token = crypto.randomBytes(32).toString('hex');
  filtered.push({ token, email: email.toLowerCase(), expiresAt: new Date(Date.now() + TTL_MS).toISOString() });
  await saveTokens(filtered);
  return token;
}

export async function verifyResetToken(token: string): Promise<string | null> {
  const tokens = await getTokens();
  const entry = tokens.find(t => t.token === token);
  if (!entry) return null;
  if (new Date(entry.expiresAt) < new Date()) {
    // Expired — clean up
    await saveTokens(tokens.filter(t => t.token !== token));
    return null;
  }
  return entry.email;
}

export async function deleteResetToken(token: string) {
  const tokens = await getTokens();
  await saveTokens(tokens.filter(t => t.token !== token));
}
