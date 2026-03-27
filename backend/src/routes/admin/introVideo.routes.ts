import { Router, Request, Response } from "express";
import { readSingleJson, writeSingleJson } from "../../utils/fileStore";
import { IntroVideo } from "../../models";
import { authenticate, adminOnly } from "../../middleware/auth";

const router = Router();
const FILE = "intro-video.json";
const DEFAULT: IntroVideo = { videoFile: null, duration: 0 };

/**
 * @swagger
 * /api/admin/intro-video:
 *   get:
 *     tags: [Admin]
 *     summary: Get intro video config (admin only)
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       200: { description: "Intro video configuration" }
 */
router.get("/", authenticate, adminOnly, async (_req: Request, res: Response) => {
  res.json(await readSingleJson<IntroVideo>(FILE, DEFAULT));
});

/**
 * @swagger
 * /api/admin/intro-video:
 *   put:
 *     tags: [Admin]
 *     summary: Update intro video config (admin only)
 *     security: [{ BearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoFile: { type: string, nullable: true }
 *               duration: { type: number }
 *     responses:
 *       200: { description: "Updated" }
 */
router.put("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const current = await readSingleJson<IntroVideo>(FILE, DEFAULT);
  if (req.body.videoFile !== undefined) current.videoFile = req.body.videoFile || null;
  if (req.body.duration !== undefined) current.duration = Math.max(1, Math.min(120, parseInt(req.body.duration) || 0));
  await writeSingleJson(FILE, current);
  res.json({ success: true });
});

export default router;
