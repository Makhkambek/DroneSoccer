import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserPurchases, hasPurchasedCourse } from "@/lib/purchases";

// GET /api/purchases — list current user's purchases
// GET /api/purchases?courseId=X — check if user owns a course
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any)?.id;
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (courseId) {
      const owned = await hasPurchasedCourse(userId, courseId);
      return NextResponse.json({ owned });
    }

    const purchases = await getUserPurchases(userId);
    return NextResponse.json(purchases);
  } catch {
    return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 });
  }
}
