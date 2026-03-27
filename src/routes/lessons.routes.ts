import { Router, Request, Response } from "express";
import { readJson, writeJson } from "../utils/fileStore";
import { Lesson, Purchase } from "../models";
import { authenticate, adminOnly, optionalAuth } from "../middleware/auth";

const router = Router();
const FILE = "lessons.json";

/**
 * @swagger
 * /api/lessons:
 *   get:
 *     tags: [Lessons]
 *     summary: List lessons for a course
 *     parameters:
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: "Array of lessons" }
 */
router.get("/", optionalAuth, async (req: Request, res: Response) => {
  const courseId = req.query.courseId as string;
  if (!courseId) { res.status(400).json({ error: "courseId required" }); return; }

  const allLessons = await readJson<Lesson>(FILE);
  let lessons = allLessons.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order);

  if (req.user?.role === "admin") {
    res.json(lessons);
    return;
  }

  // Check purchase for authenticated users
  if (req.user) {
    const purchases = await readJson<Purchase>("purchases.json");
    const owned = purchases.some((p) => p.userId === req.user!.sub && p.courseId === courseId);
    if (owned) { res.json(lessons); return; }
  }

  // Public: hide video files
  res.json(lessons.map((l) => ({ ...l, videoFile: null })));
});

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     tags: [Lessons]
 *     summary: Create a lesson (admin only)
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       201: { description: "Lesson created" }
 */
router.post("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const { courseId, title, description, videoFile, durationSeconds, order } = req.body;
  if (!courseId || !title) { res.status(400).json({ error: "courseId and title required" }); return; }

  const lessons = await readJson<Lesson>(FILE);
  const maxId = lessons.reduce((m, l) => Math.max(m, parseInt(l.id) || 0), 0);
  const courseLessons = lessons.filter((l) => l.courseId === courseId);
  const maxOrder = courseLessons.reduce((m, l) => Math.max(m, l.order), 0);

  const lesson: Lesson = {
    id: String(maxId + 1),
    courseId,
    title: String(title).slice(0, 200),
    description: (description || "").slice(0, 2000),
    order: order ?? maxOrder + 1,
    durationSeconds: parseInt(durationSeconds) || 0,
    videoFile: videoFile || null,
  };

  lessons.push(lesson);
  await writeJson(FILE, lessons);
  res.status(201).json(lesson);
});

/**
 * @swagger
 * /api/lessons:
 *   put:
 *     tags: [Lessons]
 *     summary: Update a lesson (admin only)
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       200: { description: "Lesson updated" }
 */
router.put("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const { id, ...updates } = req.body;
  if (!id) { res.status(400).json({ error: "id required" }); return; }

  const lessons = await readJson<Lesson>(FILE);
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) { res.status(404).json({ error: "Lesson not found" }); return; }

  if (updates.title !== undefined) lesson.title = String(updates.title).slice(0, 200);
  if (updates.description !== undefined) lesson.description = String(updates.description).slice(0, 2000);
  if (updates.durationSeconds !== undefined) lesson.durationSeconds = parseInt(updates.durationSeconds) || 0;
  if (updates.order !== undefined) lesson.order = parseInt(updates.order) || 0;
  if (updates.videoFile !== undefined) lesson.videoFile = updates.videoFile || null;

  await writeJson(FILE, lessons);
  res.json(lesson);
});

/**
 * @swagger
 * /api/lessons:
 *   delete:
 *     tags: [Lessons]
 *     summary: Delete a lesson (admin only)
 *     security: [{ BearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: "Lesson deleted" }
 */
router.delete("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (!id) { res.status(400).json({ error: "id required" }); return; }

  const lessons = await readJson<Lesson>(FILE);
  const filtered = lessons.filter((l) => l.id !== id);
  if (filtered.length === lessons.length) { res.status(404).json({ error: "Not found" }); return; }

  await writeJson(FILE, filtered);
  res.json({ success: true });
});

export default router;
