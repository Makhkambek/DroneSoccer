import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { upsertProgress, getCourseProgress, hasCompletedIntro } from "@/lib/progress";

// GET /api/progress?courseId=X or /api/progress?type=intro
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any)?.id;
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const type = searchParams.get("type");

    if (type === "intro") {
      const completed = await hasCompletedIntro(userId);
      return NextResponse.json({ completed });
    }

    if (courseId) {
      const progress = await getCourseProgress(userId, courseId);
      return NextResponse.json(progress);
    }

    return NextResponse.json({ error: "courseId or type=intro required" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

// POST /api/progress — save watch progress
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any)?.id;
    const body = await request.json();

    if (body.type === "intro") {
      const entry = await upsertProgress({
        userId,
        type: "intro",
        watchedSeconds: typeof body.watchedSeconds === "number" ? body.watchedSeconds : 0,
        completed: body.completed === true,
      });
      return NextResponse.json(entry);
    }

    if (body.type === "lesson" && body.lessonId && body.courseId) {
      const entry = await upsertProgress({
        userId,
        type: "lesson",
        lessonId: String(body.lessonId),
        courseId: String(body.courseId),
        watchedSeconds: typeof body.watchedSeconds === "number" ? body.watchedSeconds : 0,
        completed: body.completed === true,
      });
      return NextResponse.json(entry);
    }

    return NextResponse.json({ error: "Invalid progress data" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}
