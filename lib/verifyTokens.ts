import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const FILE = path.join(process.cwd(), 'data', 'verify-tokens.json');

interface VerifyToken {
  token: string;
  email: string;
  createdAt: string;
}

async function getTokens(): Promise<VerifyToken[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf-8'));
  } catch {
    return [];
  }
}

async function saveTokens(tokens: VerifyToken[]) {
  await fs.writeFile(FILE, JSON.stringify(tokens, null, 2));
}

export async function createVerifyToken(email: string): Promise<string> {
  const tokens = await getTokens();
  const filtered = tokens.filter(t => t.email.toLowerCase() !== email.toLowerCase());
  const token = crypto.randomBytes(32).toString('hex');
  filtered.push({ token, email: email.toLowerCase(), createdAt: new Date().toISOString() });
  await saveTokens(filtered);
  return token;
}

export async function consumeVerifyToken(token: string): Promise<string | null> {
  const tokens = await getTokens();
  const entry = tokens.find(t => t.token === token);
  if (!entry) return null;
  await saveTokens(tokens.filter(t => t.token !== token));
  return entry.email;
}
