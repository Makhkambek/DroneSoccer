import { Router, Request, Response } from "express";
import { readJson, writeJson } from "../../utils/fileStore";
import { User, Purchase, Notification } from "../../models";
import { authenticate, adminOnly } from "../../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/admin/students:
 *   get:
 *     tags: [Admin]
 *     summary: List all students with their course access
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       200: { description: "Array of students with courseIds" }
 */
router.get("/", authenticate, adminOnly, async (_req: Request, res: Response) => {
  const users = await readJson<User>("users.json");
  const purchases = await readJson<Purchase>("purchases.json");

  const result = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt,
    courseIds: purchases.filter((p) => p.userId === u.id).map((p) => p.courseId),
  }));

  res.json(result);
});

/**
 * @swagger
 * /api/admin/students:
 *   post:
 *     tags: [Admin]
 *     summary: Grant course access to a student
 *     security: [{ BearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, courseId]
 *             properties:
 *               userId: { type: string }
 *               courseId: { type: string }
 *     responses:
 *       200: { description: "Access granted" }
 */
router.post("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) { res.status(400).json({ error: "userId and courseId required" }); return; }

  const purchases = await readJson<Purchase>("purchases.json");
  const exists = purchases.some((p) => p.userId === userId && p.courseId === courseId);
  if (exists) { res.json({ success: true, message: "Already has access" }); return; }

  const maxId = purchases.reduce((m, p) => Math.max(m, parseInt(p.id) || 0), 0);
  purchases.push({
    id: String(maxId + 1),
    userId,
    courseId,
    amount: 0,
    currency: "usd",
    stripeSessionId: `admin_grant_${Date.now()}`,
    purchasedAt: new Date().toISOString(),
  });
  await writeJson("purchases.json", purchases);

  // Add notification
  const notifications = await readJson<Notification>("notifications.json");
  notifications.push({
    id: `notif_${Date.now()}`,
    userId,
    title: "Course Access Granted",
    message: "You have been granted access to a new course.",
    read: false,
    createdAt: new Date().toISOString(),
  });
  await writeJson("notifications.json", notifications);

  res.json({ success: true });
});

/**
 * @swagger
 * /api/admin/students:
 *   delete:
 *     tags: [Admin]
 *     summary: Revoke course access from a student
 *     security: [{ BearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, courseId]
 *             properties:
 *               userId: { type: string }
 *               courseId: { type: string }
 *     responses:
 *       200: { description: "Access revoked" }
 */
router.delete("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) { res.status(400).json({ error: "userId and courseId required" }); return; }

  const purchases = await readJson<Purchase>("purchases.json");
  const filtered = purchases.filter((p) => !(p.userId === userId && p.courseId === courseId));
  await writeJson("purchases.json", filtered);

  res.json({ success: true });
});

export default router;
