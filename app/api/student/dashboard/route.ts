import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserPurchases } from "@/lib/purchases";
import { getLessonsByCourse } from "@/lib/courses";
import { getCourseProgress } from "@/lib/progress";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any)?.id;

  const [purchases, coursesRaw] = await Promise.all([
    getUserPurchases(userId),
    fs.readFile(path.join(process.cwd(), "data", "courses.json"), "utf-8").then(JSON.parse).catch(() => []),
  ]);

  const courseData = await Promise.all(
    purchases.map(async (p) => {
      const course = (coursesRaw as any[]).find((c: any) => c.id === p.courseId);
      const [lessons, progress] = await Promise.all([
        getLessonsByCourse(p.courseId),
        getCourseProgress(userId, p.courseId),
      ]);
      const completed = progress.filter((pr) => pr.completed).length;
      const lastWatched = progress
        .filter((pr) => pr.watchedSeconds > 0)
        .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime())[0];
      const lastLesson = lastWatched ? lessons.find((l) => l.id === lastWatched.lessonId) : null;
      return {
        courseId: p.courseId,
        title: course?.title ?? `Course #${p.courseId}`,
        level: course?.level ?? "",
        totalLessons: lessons.length,
        completedLessons: completed,
        paidAt: p.paidAt,
        amount: p.amount,
        currency: p.currency,
        lastLesson: lastLesson ? { id: lastLesson.id, title: lastLesson.title } : null,
      };
    })
  );

  return NextResponse.json({
    user: { name: session.user?.name, email: session.user?.email, id: userId },
    courses: courseData,
  });
}
