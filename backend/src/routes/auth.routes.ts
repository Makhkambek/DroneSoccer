import { Router, Request, Response } from "express";
import { getUserByEmail, verifyPassword } from "../services/user.service";
import { signToken, authenticate } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";
import { readJson, writeJson } from "../utils/fileStore";

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "student@test.com" }
 *               password: { type: string, example: "Student#1234" }
 *     responses:
 *       200: { description: "JWT token returned" }
 *       401: { description: "Invalid credentials" }
 *       429: { description: "Too many login attempts" }
 */
router.post(
  "/login",
  rateLimit({ windowMs: 15 * 60 * 1000, max: 5, prefix: "login" }),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }

    // Admin check
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = signToken({ sub: "admin", email, name: "Admin", role: "admin" });
      res.json({ token, user: { id: "admin", email, name: "Admin", role: "admin" } });
      return;
    }

    // Student check
    const user = await getUserByEmail(email);
    if (user && (await verifyPassword(user, password))) {
      const token = signToken({ sub: user.id, email: user.email, name: user.name, role: "student" });
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: "student" } });
      return;
    }

    res.status(401).json({ error: "Invalid email or password" });
  }
);

/**
 * @swagger
 * /api/auth/session:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user session
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       200: { description: "Current user info" }
 *       401: { description: "Not authenticated" }
 */
router.get("/session", authenticate, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     tags: [Auth]
 *     summary: Verify email with token
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       302: { description: "Redirect to frontend" }
 */
router.get("/verify-email", async (req: Request, res: Response) => {
  const { token } = req.query;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  if (!token || typeof token !== "string") {
    res.redirect(`${frontendUrl}/auth/login?verified=invalid`);
    return;
  }

  interface VerifyToken { token: string; email: string; createdAt: string; }
  const tokens = await readJson<VerifyToken>("verify-tokens.json");
  const idx = tokens.findIndex((t) => t.token === token);

  if (idx === -1) {
    res.redirect(`${frontendUrl}/auth/login?verified=invalid`);
    return;
  }

  const entry = tokens[idx];
  tokens.splice(idx, 1);
  await writeJson("verify-tokens.json", tokens);

  // Mark user as verified
  const { getUserByEmail } = await import("../services/user.service");
  const user = await getUserByEmail(entry.email);
  if (user) {
    const { readJson: rj, writeJson: wj } = await import("../utils/fileStore");
    const users = await rj<any>("users.json");
    const u = users.find((u: any) => u.id === user.id);
    if (u) {
      u.emailVerified = true;
      await wj("users.json", users);
    }
  }

  res.redirect(`${frontendUrl}/auth/login?verified=true`);
});

export default router;
