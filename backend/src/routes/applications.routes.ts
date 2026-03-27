import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import nodemailer from "nodemailer";
import { readJson, writeJson, getDataDir } from "../utils/fileStore";
import { Application } from "../models";
import { createUser, generatePassword, getUserByEmail } from "../services/user.service";
import { escapeHtml } from "../utils/sanitize";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();
const FILE = "applications.json";

const PHOTOS_DIR = path.join(getDataDir(), "passport-photos");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    cb(null, allowed.includes(file.mimetype));
  },
});

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

/**
 * @swagger
 * /api/apply:
 *   post:
 *     tags: [Applications]
 *     summary: Submit a student application
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, phone, telegram, passportNumber, passportPhoto, age, experience, course]
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string, format: email }
 *               phone: { type: string }
 *               telegram: { type: string }
 *               passportNumber: { type: string, example: "AD1234567" }
 *               passportPhoto: { type: string, format: binary }
 *               age: { type: string }
 *               experience: { type: string, enum: [none, beginner, intermediate, advanced, professional] }
 *               course: { type: string, enum: [general, racing, soccer-40, soccer-20] }
 *               message: { type: string }
 *     responses:
 *       201: { description: "Application submitted" }
 *       400: { description: "Validation error" }
 *       429: { description: "Rate limited" }
 */
router.post(
  "/",
  rateLimit({ windowMs: 5 * 60 * 1000, max: 1, prefix: "apply" }),
  upload.single("passportPhoto"),
  async (req: Request, res: Response) => {
    try {
      const body = req.body;

      // Validate required fields
      const required = ["firstName", "lastName", "email", "phone", "telegram", "passportNumber", "age", "experience", "course"];
      for (const field of required) {
        if (!body[field] || String(body[field]).trim() === "") {
          res.status(400).json({ error: `Field "${field}" is required` });
          return;
        }
      }

      // Validate passport number
      const passportRegex = /^[A-Z]{2}\d{7}$/;
      body.passportNumber = body.passportNumber.toUpperCase();
      if (!passportRegex.test(body.passportNumber)) {
        res.status(400).json({ error: "Invalid passport number. Format: 2 letters + 7 digits (e.g. AD1234567)" });
        return;
      }

      // Validate passport photo
      if (!req.file) {
        res.status(400).json({ error: "Passport photo is required" });
        return;
      }

      // Validate experience and course
      if (!experienceLabels[body.experience]) {
        res.status(400).json({ error: "Invalid experience value" });
        return;
      }
      if (!courseLabels[body.course]) {
        res.status(400).json({ error: "Invalid course value" });
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        res.status(400).json({ error: "Invalid email address" });
        return;
      }

      const submittedAt = new Date().toISOString();
      const applications = await readJson<Application>(FILE);
      const maxId = applications.reduce((m, a) => Math.max(m, parseInt(a.id) || 0), 0);
      const appId = String(maxId + 1);

      // Save passport photo
      await fs.mkdir(PHOTOS_DIR, { recursive: true });
      const ext = req.file.mimetype === "image/png" ? ".png" : req.file.mimetype === "image/webp" ? ".webp" : ".jpg";
      const photoFilename = `${appId}_${Date.now()}${ext}`;
      await fs.writeFile(path.join(PHOTOS_DIR, photoFilename), req.file.buffer);

      const application: Application = {
        id: appId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        telegram: body.telegram,
        passportNumber: body.passportNumber,
        passportPhoto: photoFilename,
        age: body.age,
        experience: body.experience,
        course: body.course,
        message: body.message || "",
        submittedAt,
      };

      applications.push(application);
      await writeJson(FILE, applications);

      // Create student account
      let studentPassword: string | null = null;
      const existingUser = await getUserByEmail(body.email);
      if (!existingUser) {
        studentPassword = generatePassword();
        await createUser({
          email: body.email,
          password: studentPassword,
          name: `${body.firstName} ${body.lastName}`,
          applicationId: appId,
        });
      }

      // Send emails (fire and forget)
      sendEmails(body, submittedAt, studentPassword).catch(console.error);

      res.status(201).json({ success: true, message: "Application submitted successfully" });
    } catch (error) {
      console.error("Failed to process application:", error);
      res.status(500).json({ error: "Failed to process application" });
    }
  }
);

async function sendEmails(body: any, submittedAt: string, studentPassword: string | null) {
  const smtpEmail = process.env.SMTP_EMAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  if (!smtpEmail || !smtpPassword || !notificationEmail) return;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user: smtpEmail, pass: smtpPassword },
  });

  // Admin notification
  await transporter.sendMail({
    from: `"DroneSoccer" <${smtpEmail}>`,
    to: notificationEmail,
    subject: `New Application: ${body.firstName} ${body.lastName} - ${courseLabels[body.course] || body.course}`,
    html: `<p><strong>${escapeHtml(body.firstName)} ${escapeHtml(body.lastName)}</strong> applied for ${courseLabels[body.course]}.</p>
           <p>Email: ${escapeHtml(body.email)} | Passport: ${escapeHtml(body.passportNumber)} | Telegram: @${escapeHtml(body.telegram)}</p>`,
  });

  // Student welcome email
  if (studentPassword) {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    await transporter.sendMail({
      from: `"DroneSoccer" <${smtpEmail}>`,
      to: body.email,
      subject: "Your DroneSoccer account has been created",
      html: `<p>Hi ${escapeHtml(body.firstName)},</p>
             <p>Your account is ready.</p>
             <p><strong>Email:</strong> ${escapeHtml(body.email)}<br>
             <strong>Password:</strong> ${escapeHtml(studentPassword)}</p>
             <p><a href="${frontendUrl}/auth/login">Log in here</a></p>`,
    });
  }
}

export default router;
