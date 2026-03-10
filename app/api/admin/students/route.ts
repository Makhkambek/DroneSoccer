import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUsers } from "@/lib/users";
import { getUserPurchases, recordPurchase } from "@/lib/purchases";
import fs from "fs/promises";
import path from "path";

const PURCHASES_FILE = path.join(process.cwd(), "data", "purchases.json");

async function getPurchases() {
  try {
    const data = await fs.readFile(PURCHASES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function savePurchases(purchases: any[]) {
  await fs.writeFile(PURCHASES_FILE, JSON.stringify(purchases, null, 2));
}

// GET /api/admin/students — list all students with their course access
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await getUsers();
  const result = await Promise.all(
    users.map(async (u) => {
      const purchases = await getUserPurchases(u.id);
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        createdAt: u.createdAt,
        courseIds: purchases.map((p) => p.courseId),
      };
    })
  );

  return NextResponse.json(result);
}

// POST /api/admin/students — grant course access manually
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, courseId } = await request.json();
  if (!userId || !courseId) {
    return NextResponse.json({ error: "userId and courseId required" }, { status: 400 });
  }

  await recordPurchase({
    userId,
    courseId,
    stripeSessionId: `manual_${Date.now()}`,
    amount: 0,
    currency: "usd",
  });

  return NextResponse.json({ success: true });
}

// DELETE /api/admin/students — revoke course access
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, courseId } = await request.json();
  if (!userId || !courseId) {
    return NextResponse.json({ error: "userId and courseId required" }, { status: 400 });
  }

  const purchases = await getPurchases();
  const filtered = purchases.filter(
    (p: any) => !(p.userId === userId && p.courseId === courseId)
  );
  await savePurchases(filtered);

  return NextResponse.json({ success: true });
}
