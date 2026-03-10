import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserNotifications, markAllRead, markOneRead } from "@/lib/notifications";

// GET /api/notifications — get current user's notifications
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any)?.id;
  const notifications = await getUserNotifications(userId);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return NextResponse.json({ notifications, unreadCount });
}

// PATCH /api/notifications — mark as read
// body: { id?: string } — if id provided, mark one; else mark all
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any)?.id;
  const body = await request.json().catch(() => ({}));

  if (body.id) {
    await markOneRead(body.id, userId);
  } else {
    await markAllRead(userId);
  }

  return NextResponse.json({ success: true });
}
