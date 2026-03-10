import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUsers, getUserById } from "@/lib/users";
import { getUserPurchases, recordPurchase } from "@/lib/purchases";
import { createNotification } from "@/lib/notifications";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const PURCHASES_FILE = path.join(process.cwd(), "data", "purchases.json");
const COURSES_FILE = path.join(process.cwd(), "data", "courses.json");

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

async function getCourseTitle(courseId: string): Promise<string> {
  try {
    const data = await fs.readFile(COURSES_FILE, "utf-8");
    const courses = JSON.parse(data);
    return courses.find((c: any) => c.id === courseId)?.title ?? `Course #${courseId}`;
  } catch {
    return `Course #${courseId}`;
  }
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

  const [user, courseTitle] = await Promise.all([
    getUserById(userId),
    getCourseTitle(courseId),
  ]);

  // In-app notification
  await createNotification({
    userId,
    title: "Course Access Granted",
    message: `You now have full access to "${courseTitle}". Start learning today!`,
    link: `/lessons/${courseId}`,
  });

  // Email notification (fire-and-forget, don't fail the request)
  if (user?.email) {
    const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    sendCourseAccessEmail(user.email, user.name ?? "Student", courseTitle, courseId, siteUrl).catch(console.error);
  }

  return NextResponse.json({ success: true });
}

async function sendCourseAccessEmail(
  email: string,
  name: string,
  courseTitle: string,
  courseId: string,
  siteUrl: string
) {
  const smtpEmail = process.env.SMTP_EMAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;
  if (!smtpEmail || !smtpPassword) return;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user: smtpEmail, pass: smtpPassword },
  });

  await transporter.sendMail({
    from: `"DroneSoccer" <${smtpEmail}>`,
    to: email,
    subject: `You now have access to "${courseTitle}"`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#0066CC,#DC143C);padding:30px;text-align:center;border-radius:8px 8px 0 0;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;">Course Access Granted!</h1>
        </div>
        <div style="padding:30px;background:#fff;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px;">
          <p style="color:#333;">Hi ${name},</p>
          <p style="color:#333;">Great news! You now have full access to <strong>${courseTitle}</strong>.</p>
          <div style="background:#f0f7ff;border-left:4px solid #0066CC;padding:16px;margin:20px 0;border-radius:4px;">
            <p style="margin:0;color:#0066CC;font-weight:bold;">${courseTitle}</p>
            <p style="margin:6px 0 0;color:#555;font-size:14px;">Lifetime access · All lessons unlocked</p>
          </div>
          <p style="text-align:center;margin:28px 0;">
            <a href="${siteUrl}/lessons/${courseId}"
               style="background:#0066CC;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">
              Start Learning →
            </a>
          </p>
          <p style="color:#999;font-size:12px;text-align:center;">
            Log in at <a href="${siteUrl}" style="color:#0066CC;">${siteUrl}</a>
          </p>
        </div>
      </div>
    `,
  });
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
