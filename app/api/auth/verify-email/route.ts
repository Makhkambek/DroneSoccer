import { NextResponse } from 'next/server';
import { consumeVerifyToken } from '@/lib/verifyTokens';
import { getUsers } from '@/lib/users';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    if (!token) return NextResponse.redirect(new URL('/auth/login?verified=invalid', request.url));

    const email = await consumeVerifyToken(token);
    if (!email) return NextResponse.redirect(new URL('/auth/login?verified=invalid', request.url));

    const users = await getUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === email);
    if (idx === -1) return NextResponse.redirect(new URL('/auth/login?verified=invalid', request.url));

    (users[idx] as any).emailVerified = true;
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    return NextResponse.redirect(new URL('/auth/login?verified=true', request.url));
  } catch {
    return NextResponse.redirect(new URL('/auth/login?verified=invalid', request.url));
  }
}
