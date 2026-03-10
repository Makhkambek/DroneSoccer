import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyResetToken, deleteResetToken } from '@/lib/resetTokens';
import { getUsers } from '@/lib/users';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password || password.length < 6) {
      return NextResponse.json({ error: 'Token and password (min 6 chars) are required' }, { status: 400 });
    }

    const email = await verifyResetToken(token);
    if (!email) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 });
    }

    const users = await getUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === email);
    if (idx === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    users[idx].passwordHash = await bcrypt.hash(password, 12);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    await deleteResetToken(token);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}
