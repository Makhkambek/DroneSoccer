import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getLessonsByCourse, createLesson, updateLesson, deleteLesson } from "@/lib/courses";
import { hasPurchasedCourse, getUserPurchases } from "@/lib/purchases";
import { getUsers } from "@/lib/users";
import nodemailer from "nodemailer";

// GET /api/lessons?courseId=X — authenticated + purchased students, or admin
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    if (!courseId) return NextResponse.json({ error: "courseId required" }, { status: 400 });

    const role = (session.user as any)?.role;
    if (role !== "admin") {
      const userId = (session.user as any)?.id;
      const purchased = await hasPurchasedCourse(userId, courseId);
      if (!purchased) return NextResponse.json({ error: "Purchase required" }, { status: 403 });
    }

    const lessons = await getLessonsByCourse(courseId);
    return NextResponse.json(lessons);
  } catch {
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    if (!body.courseId || !body.title) {
      return NextResponse.json({ error: "courseId and title are required" }, { status: 400 });
    }
    const lesson = await createLesson({
      courseId: String(body.courseId),
      title: String(body.title).trim().slice(0, 200),
      description: (body.description ?? "").slice(0, 2000),
      videoFile: null,
      durationSeconds: typeof body.durationSeconds === "number" ? body.durationSeconds : 0,
      order: typeof body.order === "number" ? body.order : 999,
    });

    // Notify students who purchased this course
    try {
      const smtpEmail = process.env.SMTP_EMAIL;
      const smtpPassword = process.env.SMTP_PASSWORD;
      const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      if (smtpEmail && smtpPassword) {
        const allUsers = await getUsers();
        // Find all users who purchased this course
        const buyerEmails: string[] = [];
        for (const user of allUsers) {
          const userPurchases = await getUserPurchases(user.id);
          if (userPurchases.some(p => p.courseId === String(body.courseId))) {
            buyerEmails.push(user.email);
          }
        }
        if (buyerEmails.length > 0) {
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", port: 587, secure: false, requireTLS: true,
            auth: { user: smtpEmail, pass: smtpPassword },
          });
          await Promise.all(buyerEmails.map(email =>
            transporter.sendMail({
              from: `"DroneSoccer" <${smtpEmail}>`,
              to: email,
              subject: `New lesson added: ${lesson.title}`,
              html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                  <div style="background:linear-gradient(135deg,#0066CC,#DC143C);padding:30px;text-align:center;">
                    <h1 style="color:#fff;margin:0;">New Lesson Available!</h1>
                  </div>
                  <div style="padding:30px;">
                    <p>A new lesson has been added to your course:</p>
                    <div style="background:#f4f4f4;padding:20px;border-radius:8px;margin:20px 0;">
                      <p style="margin:0;font-size:18px;font-weight:bold;">${lesson.title}</p>
                      ${lesson.description ? `<p style="margin:8px 0 0;color:#666;">${lesson.description}</p>` : ""}
                    </div>
                    <p style="text-align:center;">
                      <a href="${siteUrl}/lessons/${body.courseId}" style="background:#0066CC;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
                        Watch Now
                      </a>
                    </p>
                  </div>
                </div>`,
            }).catch(() => {})
          ));
        }
      }
    } catch (e) {
      console.error("Failed to send new lesson notifications:", e);
    }

    return NextResponse.json(lesson, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create lesson" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const updated = await updateLesson(body.id, {
      ...(body.title && { title: String(body.title).trim().slice(0, 200) }),
      ...(body.description !== undefined && { description: String(body.description).slice(0, 2000) }),
      ...(typeof body.durationSeconds === "number" && { durationSeconds: body.durationSeconds }),
      ...(typeof body.order === "number" && { order: body.order }),
      ...(body.videoFile !== undefined && { videoFile: body.videoFile }),
    });
    if (!updated) return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const deleted = await deleteLesson(id);
    if (!deleted) return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 });
  }
}
