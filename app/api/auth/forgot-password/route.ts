import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getUserByEmail } from '@/lib/users';
import { createResetToken } from '@/lib/resetTokens';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Always return success to prevent email enumeration
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ success: true });
    }

    const token = await createResetToken(email);
    const siteUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${siteUrl}/auth/reset-password?token=${token}`;

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    if (!smtpEmail || !smtpPassword) {
      console.error('SMTP not configured');
      return NextResponse.json({ success: true });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user: smtpEmail, pass: smtpPassword },
    });

    await transporter.sendMail({
      from: `"DroneSoccer" <${smtpEmail}>`,
      to: email,
      subject: 'Reset your DroneSoccer password',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#0066CC,#DC143C);padding:30px;text-align:center;">
            <h1 style="color:#fff;margin:0;">Password Reset</h1>
          </div>
          <div style="padding:30px;">
            <p>Hi ${user.name},</p>
            <p>You requested a password reset. Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
            <p style="text-align:center;margin:30px 0;">
              <a href="${resetUrl}" style="background:#0066CC;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">
                Reset Password
              </a>
            </p>
            <p style="color:#999;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
