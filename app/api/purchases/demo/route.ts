import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getCourseById } from "@/lib/courses";
import { hasPurchasedCourse, recordPurchase } from "@/lib/purchases";

// Demo checkout — grants course access without real payment (for testing only)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId } = await request.json();
  if (!courseId) return NextResponse.json({ error: "courseId required" }, { status: 400 });

  const course = await getCourseById(courseId);
  if (!course || !course.published) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const userId = (session.user as any)?.id;
  const alreadyOwned = await hasPurchasedCourse(userId, courseId);
  if (alreadyOwned) {
    return NextResponse.json({ error: "You already own this course" }, { status: 400 });
  }

  await recordPurchase({
    userId,
    courseId,
    stripeSessionId: `demo_${Date.now()}`,
    amount: course.price,
    currency: course.currency ?? "usd",
  });

  return NextResponse.json({ success: true });
}
