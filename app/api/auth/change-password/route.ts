import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { getUserById, verifyPassword, getUsers } from '@/lib/users';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = (session.user as any)?.id;
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: 'Current password and new password (min 6 chars) are required' }, { status: 400 });
    }

    const user = await getUserById(userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const valid = await verifyPassword(user, currentPassword);
    if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });

    const users = await getUsers();
    const idx = users.findIndex(u => u.id === userId);
    users[idx].passwordHash = await bcrypt.hash(newPassword, 12);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
