import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { checkRateLimit, stripDangerousKeys } from "@/lib/fileRateLimit";
import { createUser, generatePassword, getUserByEmail } from "@/lib/users";
import { createVerifyToken } from "@/lib/verifyTokens";

const DATA_FILE = path.join(process.cwd(), "data", "applications.json");

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  telegram: string;
  age: string;
  experience: string;
  course: string;
  message: string;
  submittedAt: string;
}

async function getApplications(): Promise<Application[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return stripDangerousKeys(JSON.parse(data)) as Application[];
  } catch {
    return [];
  }
}

async function saveApplications(applications: Application[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(applications, null, 2));
}

const experienceLabels: Record<string, string> = {
  none: "No Experience",
  beginner: "Beginner (0-6 months)",
  intermediate: "Intermediate (6-24 months)",
  advanced: "Advanced (2+ years)",
  professional: "Professional",
};

const courseLabels: Record<string, string> = {
  general: "General Drone Course",
  racing: "Drone Racing",
  "soccer-40": "Drone Soccer - Class 40",
  "soccer-20": "Drone Soccer - Class 20",
};

function buildEmailHtml(data: Omit<Application, "id" | "submittedAt">, submittedAt: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0066CC, #DC143C); padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .field { margin-bottom: 16px; }
        .field-label { font-weight: bold; color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .field-value { color: #555; font-size: 16px; margin-top: 4px; }
        .divider { border-top: 1px solid #eee; margin: 20px 0; }
        .footer { background: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Application Received</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">Full Name</div>
            <div class="field-value">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</div>
          </div>
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">${escapeHtml(data.email)}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone</div>
            <div class="field-value">${escapeHtml(data.phone)}</div>
          </div>
          <div class="field">
            <div class="field-label">Telegram</div>
            <div class="field-value">@${escapeHtml(data.telegram)}</div>
          </div>
          <div class="divider"></div>
          <div class="field">
            <div class="field-label">Age</div>
            <div class="field-value">${escapeHtml(data.age)}</div>
          </div>
          <div class="field">
            <div class="field-label">Experience Level</div>
            <div class="field-value">${experienceLabels[data.experience] || escapeHtml(data.experience)}</div>
          </div>
          <div class="field">
            <div class="field-label">Preferred Course</div>
            <div class="field-value">${courseLabels[data.course] || escapeHtml(data.course)}</div>
          </div>
          ${data.message ? `
          <div class="divider"></div>
          <div class="field">
            <div class="field-label">Additional Information</div>
            <div class="field-value">${escapeHtml(data.message)}</div>
          </div>
          ` : ""}
        </div>
        <div class="footer">
          <p>Submitted on ${submittedAt}</p>
          <p>DroneSoccer Application System</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    // Extract IP address from headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0].trim()
      || request.headers.get('x-real-ip')
      || request.headers.get('cf-connecting-ip')
      || 'unknown';

    // Check rate limit
    const rateLimitResult = await checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter || 300),
          },
        }
      );
    }

    const body = await request.json();

    const requiredFields = ["firstName", "lastName", "email", "phone", "telegram", "age", "experience", "course"];
    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { error: `Field "${field}" is required` },
          { status: 400 }
        );
      }
    }

    const fieldMaxLengths: Record<string, number> = {
      firstName: 100,
      lastName: 100,
      email: 254,
      phone: 30,
      telegram: 50,
      age: 3,
      experience: 50,
      course: 50,
      message: 2000,
    };
    for (const [field, maxLen] of Object.entries(fieldMaxLengths)) {
      if (body[field] && String(body[field]).length > maxLen) {
        return NextResponse.json(
          { error: `Field "${field}" exceeds maximum length of ${maxLen} characters` },
          { status: 400 }
        );
      }
    }

    const validExperience = ["none", "beginner", "intermediate", "advanced", "professional"];
    if (!validExperience.includes(body.experience)) {
      return NextResponse.json({ error: "Invalid experience value" }, { status: 400 });
    }

    const validCourses = ["general", "racing", "soccer-40", "soccer-20"];
    if (!validCourses.includes(body.course)) {
      return NextResponse.json({ error: "Invalid course value" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();

    // Save to JSON file
    const applications = await getApplications();
    const maxId = applications.reduce(
      (max: number, a: Application) => Math.max(max, parseInt(a.id) || 0),
      0
    );

    const newApplication: Application = {
      id: String(maxId + 1),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      telegram: body.telegram,
      age: body.age,
      experience: body.experience,
      course: body.course,
      message: body.message || "",
      submittedAt,
    };

    applications.push(newApplication);
    await saveApplications(applications);

    // Create student account (if email not already registered)
    let studentPassword: string | null = null;
    const existingUser = await getUserByEmail(body.email);
    if (!existingUser) {
      studentPassword = generatePassword();
      await createUser({
        email: body.email,
        password: studentPassword,
        name: `${body.firstName} ${body.lastName}`,
        applicationId: newApplication.id,
      });
    }

    // Send email notification
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!smtpEmail || !smtpPassword || !notificationEmail) {
      console.error("SMTP environment variables not configured");
      return NextResponse.json(
        { success: true, message: "Application saved but email notification could not be sent" },
        { status: 201 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    // Notify admin
    await transporter.sendMail({
      from: `"DroneSoccer Applications" <${smtpEmail}>`,
      to: notificationEmail,
      subject: `New Application: ${body.firstName} ${body.lastName} - ${courseLabels[body.course] || body.course}`,
      html: buildEmailHtml(body, new Date(submittedAt).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })),
    });

    // Send login credentials + verification link to the student
    if (studentPassword) {
      const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      const verifyToken = await createVerifyToken(body.email);
      const verifyUrl = `${siteUrl}/api/auth/verify-email?token=${verifyToken}`;
      await transporter.sendMail({
        from: `"DroneSoccer" <${smtpEmail}>`,
        to: body.email,
        subject: "Your DroneSoccer account has been created",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#0066CC,#DC143C);padding:30px;text-align:center;">
              <h1 style="color:#fff;margin:0;">Welcome to DroneSoccer!</h1>
            </div>
            <div style="padding:30px;">
              <p>Hi ${escapeHtml(body.firstName)},</p>
              <p>Your application has been received and your account is ready.</p>
              <div style="background:#f4f4f4;padding:20px;border-radius:8px;margin:20px 0;">
                <p style="margin:0;"><strong>Email:</strong> ${escapeHtml(body.email)}</p>
                <p style="margin:8px 0 0;"><strong>Password:</strong> ${escapeHtml(studentPassword)}</p>
              </div>
              <p style="text-align:center;margin:24px 0;">
                <a href="${verifyUrl}" style="background:#0066CC;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
                  Confirm Email & Log In
                </a>
              </p>
              <p style="color:#999;font-size:12px;">Please change your password after first login. If you didn't apply, ignore this email.</p>
            </div>
          </div>`,
      });
    }

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to process application:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}
