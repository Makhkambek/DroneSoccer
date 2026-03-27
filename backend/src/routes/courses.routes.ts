import { Router, Request, Response } from "express";
import { readJson, writeJson } from "../utils/fileStore";
import { Course } from "../models";
import { authenticate, adminOnly, optionalAuth } from "../middleware/auth";

const router = Router();
const FILE = "courses.json";

/**
 * @swagger
 * /api/courses:
 *   get:
 *     tags: [Courses]
 *     summary: List courses (admin sees all, public sees published only)
 *     responses:
 *       200: { description: "Array of courses" }
 */
router.get("/", optionalAuth, async (req: Request, res: Response) => {
  const courses = await readJson<Course>(FILE);
  if (req.user?.role === "admin") {
    res.json(courses);
  } else {
    res.json(courses.filter((c) => c.published));
  }
});

/**
 * @swagger
 * /api/courses:
 *   post:
 *     tags: [Courses]
 *     summary: Create a course (admin only)
 *     security: [{ BearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               duration: { type: string }
 *               level: { type: string }
 *               published: { type: boolean }
 *     responses:
 *       201: { description: "Course created" }
 */
router.post("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const { title, description, price, duration, level, published } = req.body;
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const courses = await readJson<Course>(FILE);
  const maxId = courses.reduce((m, c) => Math.max(m, parseInt(c.id) || 0), 0);

  const course: Course = {
    id: String(maxId + 1),
    title: title.trim().slice(0, 200),
    description: (description || "").slice(0, 2000),
    price: Math.max(0, parseInt(price) || 0),
    currency: "usd",
    duration: (duration || "").slice(0, 50),
    level: (level || "Beginner").slice(0, 50),
    published: published ?? false,
  };

  courses.push(course);
  await writeJson(FILE, courses);
  res.status(201).json(course);
});

/**
 * @swagger
 * /api/courses:
 *   put:
 *     tags: [Courses]
 *     summary: Update a course (admin only)
 *     security: [{ BearerAuth: [] }]
 *     responses:
 *       200: { description: "Course updated" }
 */
router.put("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const { id, ...updates } = req.body;
  if (!id) { res.status(400).json({ error: "id is required" }); return; }

  const courses = await readJson<Course>(FILE);
  const course = courses.find((c) => c.id === id);
  if (!course) { res.status(404).json({ error: "Course not found" }); return; }

  if (updates.title !== undefined) course.title = String(updates.title).slice(0, 200);
  if (updates.description !== undefined) course.description = String(updates.description).slice(0, 2000);
  if (updates.price !== undefined) course.price = Math.max(0, parseInt(updates.price) || 0);
  if (updates.duration !== undefined) course.duration = String(updates.duration).slice(0, 50);
  if (updates.level !== undefined) course.level = String(updates.level).slice(0, 50);
  if (updates.published !== undefined) course.published = Boolean(updates.published);

  await writeJson(FILE, courses);
  res.json(course);
});

/**
 * @swagger
 * /api/courses:
 *   delete:
 *     tags: [Courses]
 *     summary: Delete a course (admin only)
 *     security: [{ BearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: "Course deleted" }
 */
router.delete("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (!id) { res.status(400).json({ error: "id query param required" }); return; }

  const courses = await readJson<Course>(FILE);
  const filtered = courses.filter((c) => c.id !== id);
  if (filtered.length === courses.length) { res.status(404).json({ error: "Course not found" }); return; }

  await writeJson(FILE, filtered);
  res.json({ success: true });
});

export default router;
