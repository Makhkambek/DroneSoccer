import { Router, Request, Response } from "express";
import { readJson, writeJson } from "../utils/fileStore";
import { Notification } from "../models";
import { authenticate } from "../middleware/auth";

const router = Router();
const FILE = "notifications.json";

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Get current user's notifications
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       200: { description: "Notifications with unread count" }
 */
router.get("/", authenticate, async (req: Request, res: Response) => {
  const all = await readJson<Notification>(FILE);
  const mine = all.filter((n) => n.userId === req.user!.sub).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  res.json({
    notifications: mine,
    unreadCount: mine.filter((n) => !n.read).length,
  });
});

/**
 * @swagger
 * /api/notifications:
 *   patch:
 *     tags: [Notifications]
 *     summary: Mark notification(s) as read
 *     security: [{ BearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id: { type: string, description: "Specific notification ID, or omit to mark all read" }
 *     responses:
 *       200: { description: "Marked as read" }
 */
router.patch("/", authenticate, async (req: Request, res: Response) => {
  const all = await readJson<Notification>(FILE);
  const { id } = req.body;

  if (id) {
    const notif = all.find((n) => n.id === id && n.userId === req.user!.sub);
    if (notif) notif.read = true;
  } else {
    all.filter((n) => n.userId === req.user!.sub).forEach((n) => (n.read = true));
  }

  await writeJson(FILE, all);
  res.json({ success: true });
});

export default router;
